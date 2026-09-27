#!/usr/bin/env python3
"""Qualitätskontrolle Gesundheitsziele: Übersicht /gesundheitsziele + 7 Zielseiten (Playwright headless, axe-core).
Voraussetzung: `npm run build` und `npx vite preview --port 4174`.
Soll-Daten (Pfade, Titel, H1, Karten) kommen direkt aus src/data/healthGoals.js (node-Import) – keine Kopie.
Prüft je Seite: statisches HTML (title, canonical, genau eine H1), 200, Laufzeit-Titel/H1/Canonical,
JSON-LD gültig + BreadcrumbList, keine Konsolenfehler, kein horizontales Scrollen (320/360/390/768/1440),
Buttons (MiraNext, _blank, noopener), tel:-Links, Bilder geladen + alt, interne Links erreichbar,
verbotene Aussagen, Überschriftenfolge ohne Sprünge, Tastatur (Skip-Link, Fokusrahmen), axe WCAG AA hell/dunkel.
Hub: 6 Zielkarten → Zielseiten, Sonderseite Sport verlinkt; alte Anker → neue Seiten; Sitemap.
Screenshots: ~/Desktop/relaunch-screenshots-gesundheitsziele/ (für Vision-Prüfung).
"""
import json, sys, pathlib, subprocess, urllib.request, urllib.error
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
SITE = "https://www.xn--rntgen-am-kai-imb.at"
TEL = "tel:+43" + "3168409050"
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()
SHOTS = pathlib.Path.home() / "Desktop/relaunch-screenshots-gesundheitsziele"
SHOTS.mkdir(parents=True, exist_ok=True)
FORBIDDEN = ["Terminanfrage", "Online-Terminvergabe", "script.google.com", "Sonografie", "Wahlarzt für",
             "Ergebnisgespräch inklusive", "garantiert", "heilt ", "Heilung"]

data = json.loads(subprocess.run(
    ["node", "--input-type=module", "-e",
     "const m = await import('./src/data/healthGoals.js');"
     "console.log(JSON.stringify({routes: m.GOAL_ROUTES.map(r => ({path: r.path, title: r.fullTitle, h1: r.h1})),"
     " hub: m.HUB_GOALS.map(g => ({path: g.path, card: g.card.title})),"
     " special: m.HEALTH_GOALS.filter(g => g.special).map(g => m.goalPath(g)),"
     " legacy: m.LEGACY_GOAL_ANCHORS}))"],
    cwd=ROOT, capture_output=True, text=True, check=True).stdout)
ROUTES, HUB, SPECIAL, LEGACY = data["routes"], data["hub"], data["special"], data["legacy"]
fails = []


def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


def esc(s):
    return s.replace("&", "&amp;")


def status(url):
    try:
        with urllib.request.urlopen(url) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code


check(len(ROUTES) == 8 and len(HUB) == 6 and len(SPECIAL) == 1, f"Datenquelle: {len(ROUTES)} Routen, {len(HUB)} Hub-Karten, {len(SPECIAL)} Sonderseite")

# --- 1. Statisches HTML + Sitemap ---
sm = urllib.request.urlopen(BASE + "/sitemap.xml").read().decode()
for r in ROUTES:
    html = urllib.request.urlopen(BASE + r["path"]).read().decode()
    ok = (f"<title>{esc(r['title'])}</title>" in html and f'<link rel="canonical" href="{SITE}{r["path"]}"' in html
          and html.count("<h1") == 1 and esc(r["h1"]) in html)
    check(ok, f"statisch {r['path']}: title/canonical/eine H1")
    check(f"{SITE}{r['path']}</loc>" in sm, f"sitemap enthält {r['path']}")
    check(len(r["title"]) <= 70, f"Titel ≤ 70 Zeichen ({len(r['title'])}) {r['path']}")

VIEWS = [("320", dict(viewport={"width": 320, "height": 640}, is_mobile=True, has_touch=True, device_scale_factor=2)),
         ("360", dict(viewport={"width": 360, "height": 740}, is_mobile=True, has_touch=True, device_scale_factor=2)),
         ("390", dict(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2)),
         ("768", dict(viewport={"width": 768, "height": 1024}, is_mobile=True, has_touch=True, device_scale_factor=2)),
         ("1440", dict(viewport={"width": 1440, "height": 900}))]

with sync_playwright() as p:
    b = p.chromium.launch()
    internal_links = set()
    # --- 2. Laufzeit je Seite und Gerät ---
    for label, args in VIEWS:
        ctx = b.new_context(**args); pg = ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        vw = args["viewport"]["width"]
        for r in ROUTES:
            errs.clear()
            resp = pg.goto(BASE + r["path"], wait_until="networkidle"); pg.wait_for_timeout(300)
            h1s = pg.locator("h1").all_inner_texts()
            ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vw}")
            ok = (resp.status == 200 and pg.title() == r["title"] and len(h1s) == 1
                  and h1s[0].replace("\u00ad", "").strip() == r["h1"]
                  and pg.eval_on_selector("link[rel=canonical]", "e => e.href") == SITE + r["path"] and not errs and ow <= 0)
            check(ok, f"[{label}] {r['path']} h1={len(h1s)} overflow={ow} errs={errs[:1]}")
            if label == "390":
                pg.screenshot(path=str(SHOTS / f"{r['path'].strip('/').replace('/', '_')}-handy.png"), full_page=True)
            if label == "1440":
                pg.screenshot(path=str(SHOTS / f"{r['path'].strip('/').replace('/', '_')}-desktop.png"), full_page=True)
                body = pg.locator("main").inner_text()
                bad = [f for f in FORBIDDEN if f.lower() in body.lower()]
                check(not bad, f"verbotene Aussagen {r['path']}: {bad}")
                books = pg.eval_on_selector_all('a[data-cta="booking"]', 'as => as.map(a => [a.getAttribute("href"), a.target, a.rel])')
                check(books and all(x[0] == BOOK and x[1] == "_blank" and "noopener" in x[2] for x in books), f"Termin-Buttons korrekt {r['path']} ({len(books)})")
                # Erlaubt neben der Praxisnummer: Notruf 144 und die Hotline von „früh erkennen“ (0800 500 181)
                tels = pg.eval_on_selector_all('a[href^="tel:"]', 'as => as.map(a => a.getAttribute("href"))')
                ALLOWED = {TEL, "tel:144", "tel:0800" + "500181"}
                check(tels and TEL in tels and all(t in ALLOWED for t in tels), f"tel:-Links korrekt {r['path']} ({len(tels)}, fremd: {sum(t not in ALLOWED for t in tels)})")
                imgs = pg.evaluate("""(async () => { const is = [...document.querySelectorAll('main img')];
                    for (const i of is) { i.loading = 'eager'; if (!i.complete) await new Promise(res => { i.onload = i.onerror = res; }); }
                    return is.map(i => [i.currentSrc.split('/').pop(), i.naturalWidth, i.alt]); })()""")
                check(all(w > 0 and alt.strip() for _, w, alt in imgs), f"Bilder geladen + alt {r['path']}: {[(n, w) for n, w, a in imgs if not (w > 0 and a.strip())]}")
                levels = pg.eval_on_selector_all("main h1, main h2, main h3, main h4", "hs => hs.map(h => +h.tagName[1])")
                jumps = [(a, c) for a, c in zip(levels, levels[1:]) if c > a + 1]
                check(not jumps, f"Überschriften ohne Sprünge {r['path']} {jumps}")
                lds = []
                for raw in pg.eval_on_selector_all('script[type="application/ld+json"]', "s => s.map(x => x.textContent)"):
                    try:
                        lds.append(json.loads(raw))
                    except Exception as e:  # noqa
                        lds.append({"_invalid": str(e)})
                flat = json.dumps(lds)
                check("_invalid" not in flat and "BreadcrumbList" in flat and '"price"' not in flat and "aggregateRating" not in flat,
                      f"JSON-LD gültig, Breadcrumb, ohne Preise/Bewertungen {r['path']}")
                for h in pg.eval_on_selector_all("a[href]", "as => as.map(a => a.href)"):
                    if h.startswith(BASE):
                        internal_links.add(h.split("#")[0].split("?")[0])
        ctx.close()

    broken = sorted(h for h in internal_links if status(h) != 200)
    check(not broken, f"interne Links erreichbar ({len(internal_links)}): {broken}")

    # --- 3. Hub: Karten + Sonderseite + alte Anker ---
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto(BASE + "/gesundheitsziele", wait_until="networkidle")
    for g in HUB:
        check(pg.locator(f'main a[href$="{g["path"]}"]').count() >= 1 and g["card"] in pg.locator("main").inner_text(), f"Hub-Karte '{g['card']}' → {g['path']}")
    check(pg.locator(f'main a[href$="{SPECIAL[0]}"]').count() >= 1, f"Hub verlinkt Sonderseite {SPECIAL[0]}")
    for anchor, target in LEGACY.items():
        pg.goto(f"{BASE}/gesundheitsziele#{anchor}", wait_until="networkidle"); pg.wait_for_timeout(600)
        landed = pg.url.replace(BASE, "").split("#")[0].rstrip("/")
        check(landed == target, f"alter Anker #{anchor} → {landed} (soll {target})")
    # Startseite verlinkt die Übersicht
    pg.goto(BASE + "/", wait_until="networkidle")
    check(pg.locator('main a[href$="/gesundheitsziele"], main a[href*="/gesundheitsziele/"]').count() >= 1, "Startseite verlinkt Gesundheitsziele")

    # --- 4. Tastatur ---
    pg.goto(BASE + ROUTES[2]["path"], wait_until="networkidle"); pg.keyboard.press("Tab")
    check(pg.evaluate("document.activeElement.textContent") == "Zum Inhalt springen", "erster Tab = Skip-Link")
    ring_ok = True
    for _ in range(30):
        pg.keyboard.press("Tab")
        o = pg.evaluate("(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 || s.boxShadow !== 'none'; })()")
        ring_ok = ring_ok and o
    check(ring_ok, "Fokusrahmen sichtbar bei 30 Tab-Stopps")
    pg.close()

    # --- 5. axe WCAG AA hell + dunkel (390 + 1440) ---
    for scheme in ["light", "dark"]:
        for vw_ in (390, 1440):
            c = b.new_context(viewport={"width": vw_, "height": 900}, color_scheme=scheme)
            if scheme == "dark":
                c.add_init_script("localStorage.setItem('theme', 'dark')")
            p2 = c.new_page()
            for r in ROUTES:
                p2.goto(BASE + r["path"], wait_until="networkidle"); p2.wait_for_timeout(300)
                if scheme == "dark":
                    p2.evaluate("document.documentElement.classList.add('dark')")
                p2.add_script_tag(content=AXE)
                res = p2.evaluate("async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return r.violations.map(v => [v.id, v.impact, v.nodes.length, v.nodes.slice(0,3).map(n => n.target.join(' '))]); }")
                check(not res, f"axe WCAG AA ({scheme}, {vw_}px) {r['path']}: {res}")
            c.close()
    b.close()

print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
