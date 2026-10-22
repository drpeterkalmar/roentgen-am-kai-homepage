#!/usr/bin/env python3
"""Qualitätskontrolle KI-Ratgeberserie „Röntgen am K[AI]“ (21.10.2026): Übersicht + acht Artikel.
Voraussetzung: `npm run build` und `npx vite preview --port 4174 --strictPort`.
Soll-Daten direkt aus src/data/kiSeries.js und kiContent.js (node-Import).
Prüft: statisches HTML (title, description 145–160, canonical, noindex nicht gesetzt), Sitemap, Weiterleitung des alten
KI-Artikels, Wortzahlen laut Auftrag, Laufzeit (eine H1, Serienname mit [AI], Brotkrumen 3/4 Ebenen = BreadcrumbList,
CollectionPage + ItemList (8), Article + FAQPage mit Sollzahl, Kacheln + „bei uns im Einsatz“ nur bei bestätigtem
Einsatz, Pflichtlinks, CTA-Texte laut Auftrag), Bildblöcke (Folien laden, Alt-Texte individuell, Slider per Knopf und
Pfeiltaste, Vergrößern-Dialog mit Esc, Hotspots + Legende, Platzhalter-IDs), verbotene Aussagen, kein Header-/Footer-
Namenswechsel, 360 px ohne Überlauf, axe WCAG AA hell + dunkel.
"""
import json, re, sys, pathlib, subprocess, urllib.request
from playwright.sync_api import sync_playwright
from _paths import shots

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
SITE = "https://www.xn--rntgen-am-kai-imb.at"
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()
SHOTS = shots("relaunch-screenshots-ki-ratgeber")

data = json.loads(subprocess.run(
    ["node", "--input-type=module", "-e",
     "const s = await import('./src/data/kiSeries.js'); const c = await import('./src/data/kiContent.js');"
     "const words = (h) => h.replace(/<!--.*?-->/g, ' ').replace(/<[^>]+>/g, ' ').split(/\\s+/).filter(Boolean).length;"
     "console.log(JSON.stringify({series: {path: s.KI_SERIES.path, title: s.KI_SERIES.title, seo: s.KI_SERIES.seoTitle,"
     " desc: s.KI_SERIES.description, words: words(c.KI_OVERVIEW_HTML), can: s.KI_SERIES.can.length, cannot: s.KI_SERIES.cannot.length},"
     " mods: s.KI_MODULES.map(m => { const k = c.KI_CONTENT[m.slug]; return {id: m.id, slug: m.slug, title: m.mod.TITLE, seo: m.seoTitle,"
     " desc: m.mod.DESCRIPTION, faq: m.mod.FAQ.length, inUse: m.inUse, cta: m.cta.title, logo: !!m.logo, tile: m.tile.title,"
     " words: words(k.html), markers: [...k.html.matchAll(/<!--media:([a-z]+)-->/g)].map(x => x[1]),"
     " media: Object.fromEntries(Object.entries(k.media).filter(([, v]) => v).map(([key, v]) => [key, v.slides ? {slides: v.slides.length,"
     " alts: v.slides.map(x => x.alt), hotspots: (v.hotspots || []).length} : {placeholder: v.id}]))}; })}))"],
    cwd=ROOT, capture_output=True, text=True, check=True).stdout)
S, MODS = data["series"], data["mods"]
fails = []

# Wortspannen laut Auftrag (Fließtext ohne FAQ)
WORDS = {"lama": (900, 1150), "hippo": (900, 1150), "koala": (900, 1100), "squirrel": (900, 1150), "frog": (900, 1150),
         "panda": (900, 1100), "rho": (950, 1200), "transpara": (1000, 1250)}
FAQ_N = {"rho": 6, "transpara": 6}
PLACEHOLDERS = {"koala": {"report": "KI-KOALA-01"}, "rho": {"ablauf": "KI-RHO-01"},   # KI-RHO-02: Demo-Berichte IB Lab seit 22.10.2026 als Galerie
                "transpara": {"report": "KI-TRANSPARA-01", "ablauf": "KI-TRANSPARA-02"}}
SLIDES = {"lama": 4, "hippo": 2, "squirrel": 1, "frog": 2, "panda": 1, "rho": 3}
HOTSPOTS = {"squirrel": 4, "panda": 4}
FORBIDDEN = ["Goldstandard", "100 %", "strahlungsfrei", "revolution", "modernste", "auf Expertenniveau",
             "ExpertInnen-Niveau", "15,8 Sekunden", "ICC 0,97", "300 %", "ersetzt die Radiologin nicht nur"]


def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


# --- 0. Daten ---
check(len(MODS) == 8 and [m["id"] for m in MODS] == ["lama", "hippo", "koala", "squirrel", "frog", "panda", "rho", "transpara"], "8 Module in Auftragsreihenfolge")
check(S["seo"] == "Künstliche Intelligenz in der Radiologie | Graz" and S["title"] == "Röntgen am K[AI]: Wie KI unsere Radiologie unterstützt", "Übersicht: SEO-Titel und H1 laut Auftrag")
check(145 <= len(S["desc"]) <= 160, f"Übersicht: Description {len(S['desc'])} Zeichen (145–160)")
check(500 <= S["words"] <= 700, f"Übersicht: {S['words']} Wörter (500–700)")
check(S["can"] >= 3 and S["cannot"] >= 3, "Übersicht: Listen „Was KI kann“ / „was nicht“")
REVIEWED = {"uebersicht", "rho", "panda", "transpara"}   # Peter „gelesen“ 21.10.2026
REVIEW_TXT = "Medizinisch geprüft von Priv.-Doz. Dr. Peter Kalmar – Stand 21.10.2026"
IN_USE = ["lama", "hippo", "koala", "squirrel", "frog", "panda", "rho", "transpara"]   # Praxis: Rho 26.09., IB Lab 21.10., Transpara 21.10.2026 abends
check(sorted(m["id"] for m in MODS if m["inUse"]) == sorted(IN_USE), "„bei uns im Einsatz“ nur für bestätigten Einsatz (Rho, IB Lab, Transpara)")
AUTHOR = "Priv.-Doz. Dr. Peter Kalmar"
AUTHORED = {"uebersicht", "rho", "panda", "transpara"}   # Peter = Autor seiner Artikel; Georgs fünf: Praxis als Herausgeberin
check("report" in next(m for m in MODS if m["id"] == "rho")["markers"], "rho: Beispielberichte (KI-RHO-02) im Text")
for m in MODS:
    lo, hi = WORDS[m["id"]]
    check(lo <= m["words"] <= hi, f"{m['id']}: {m['words']} Wörter ({lo}–{hi})")
    check(145 <= len(m["desc"]) <= 165, f"{m['id']}: Description {len(m['desc'])} Zeichen")
    check(len(m["seo"]) <= 60, f"{m['id']}: SEO-Titel {len(m['seo'])} Zeichen")
    check(m["faq"] == FAQ_N.get(m["id"], 5), f"{m['id']}: {m['faq']} FAQ (Soll {FAQ_N.get(m['id'], 5)})")
    for key, pid in PLACEHOLDERS.get(m["id"], {}).items():
        check(m["media"].get(key, {}).get("placeholder") == pid and key in m["markers"], f"{m['id']}: Platzhalter {pid} im Text")
    if m["id"] in SLIDES:
        r = m["media"].get("report", {})
        check(r.get("slides") == SLIDES[m["id"]] and "report" in m["markers"], f"{m['id']}: {r.get('slides')} Bild(er) im Bildblock")
        alts = r.get("alts", [])
        check(all(alts) and len(set(alts)) == len(alts) and all(len(a) >= 40 for a in alts), f"{m['id']}: individuelle Alt-Texte")
        check(r.get("hotspots", 0) == HOTSPOTS.get(m["id"], 0), f"{m['id']}: {r.get('hotspots', 0)} Hotspots")
check(len({m["seo"] for m in MODS}) == 8 and len({m["desc"] for m in MODS}) == 8, "SEO-Titel und Descriptions eindeutig")

# --- 1. statisches HTML, Sitemap, Weiterleitung ---
def get(path):
    with urllib.request.urlopen(BASE + path) as r:
        return r.status, r.read().decode()

PAGES = [{"path": S["path"], "seo": S["seo"], "desc": S["desc"], "id": "uebersicht"}] + [
    {"path": f"/ratgeber/{m['slug']}", "seo": m["seo"], "desc": m["desc"], "id": m["id"], "m": m} for m in MODS]
for p in PAGES:
    st, html = get(p["path"])
    esc = lambda s: s.replace("&", "&amp;").replace('"', "&quot;")
    check(st == 200 and f"<title>{esc(p['seo'])}</title>" in html, f"{p['path']}: 200 + Titel")
    check(f'content="{esc(p["desc"])}"' in html, f"{p['path']}: Description im HTML")
    check(f'<link rel="canonical" href="{SITE}{p["path"]}"' in html and "noindex" not in html, f"{p['path']}: Canonical, indexierbar")
_, sm = get("/sitemap.xml")
check(all(f"{SITE}{p['path']}</loc>" in sm for p in PAGES), "Sitemap enthält Übersicht + 8 Artikel")
check("ki-unterstuetzung-radiologie</loc>" not in sm, "alter KI-Artikel nicht mehr in der Sitemap")
_, old = get("/ratgeber/ki-unterstuetzung-radiologie")
check("kuenstliche-intelligenz-radiologie" in old and 'http-equiv="refresh"' in old, "alter KI-Artikel leitet auf die Übersicht weiter")

# --- 2. Laufzeit ---
with sync_playwright() as pw:
    br = pw.chromium.launch()
    ctx = br.new_context(viewport={"width": 1280, "height": 900})
    pg = ctx.new_page()
    errors = []
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)

    def schemas():
        out = []
        for t in pg.locator('script[type="application/ld+json"]').all_text_contents():
            j = json.loads(t)
            out += j if isinstance(j, list) else [j]
        return out

    def crumbs():
        bl = [s for s in schemas() if s.get("@type") == "BreadcrumbList"]
        return [i["name"] for i in bl[0]["itemListElement"]] if bl else None

    # Übersicht
    pg.goto(BASE + S["path"], wait_until="networkidle")
    check(pg.locator("h1").count() == 1 and "Wie KI unsere Radiologie unterstützt" in pg.locator("h1").inner_text(), "Übersicht: eine H1")
    h1 = pg.locator("h1").inner_text()
    check(h1.strip() == S["title"], f"Übersicht: H1 = {h1[:50]}")
    check("Röntgen am K[AI] – Künstliche Intelligenz, ärztlich verantwortet" in pg.locator("[data-ki-series-name]").inner_text(), "Serienname mit [AI] sichtbar")
    check(crumbs() == ["Startseite", "Ratgeber", "Röntgen am K[AI]"], f"Übersicht: BreadcrumbList {crumbs()}")
    cp = [s for s in schemas() if s.get("@type") == "CollectionPage"]
    items = cp[0]["mainEntity"]["itemListElement"] if cp else []
    check(len(cp) == 1 and cp[0]["mainEntity"]["@type"] == "ItemList" and len(items) == 8
          and all(i["url"].startswith(SITE + "/ratgeber/") for i in items), "Übersicht: CollectionPage + ItemList (8)")
    check(pg.locator("[data-reviewed]").count() == 1 and REVIEW_TXT in pg.locator("[data-reviewed]").inner_text(), "Übersicht: Prüfvermerk Kalmar 21.10.2026")
    check(f"Von {AUTHOR}" in pg.locator("main header").first.inner_text(), "Übersicht: Autor sichtbar")
    cps = [s for s in schemas() if s.get("@type") == "CollectionPage"]
    check(cps and cps[0].get("author") == {"@type": "Person", "name": AUTHOR}, "Übersicht: CollectionPage author = Person")
    tiles = pg.locator("[data-ki-tile]")
    check(tiles.count() == 8, f"Übersicht: {tiles.count()} Kacheln")
    check(pg.locator("[data-ki-tile] [data-in-use]").count() == len(IN_USE) and all(pg.locator(f'[data-ki-tile="{i}"] [data-in-use]').count() == 1 for i in IN_USE), "Kachel-Hinweis „bei uns im Einsatz“ nur bei bestätigten Modulen")
    hrefs = pg.eval_on_selector_all("main a[href]", "els => els.map(a => a.getAttribute('href'))")
    for need in ["/roentgen-graz", "/mammographie-graz", "/knochendichtemessung-graz"]:
        check(any(h.endswith(need) or (need + "#") in h for h in hrefs), f"Übersicht: Link {need}")
    for m in MODS:
        check(any(h.endswith("/ratgeber/" + m["slug"]) for h in hrefs), f"Übersicht: Kachel-Link {m['slug']}")
    check(pg.get_by_role("heading", name="Was KI kann – und was nicht").count() == 1, "Übersicht: Vertrauensabschnitt")
    hd = pg.eval_on_selector_all("main h1, main h2, main h3", "els => els.map(e => +e.tagName[1])")
    check(all(b - a <= 1 for a, b in zip(hd, hd[1:])), "Übersicht: Überschriften ohne Sprung")
    hf = pg.locator("header").first.inner_text() + pg.locator("footer").last.inner_text()
    check("[AI]" not in hf, "Header/Footer unverändert (kein [AI])")
    pg.screenshot(path=f"{SHOTS}/ki-uebersicht.png", full_page=True)

    # Artikel
    for p in PAGES[1:]:
        m = p["m"]
        pg.goto(BASE + p["path"], wait_until="networkidle")
        pg.wait_for_timeout(300)
        check(pg.locator("h1").count() == 1 and pg.locator("h1").inner_text().strip() == m["title"], f"{m['id']}: H1 laut Auftrag")
        c = crumbs()
        check(c == ["Startseite", "Ratgeber", "Röntgen am K[AI]", m["title"]], f"{m['id']}: BreadcrumbList 4 Ebenen")
        sc = schemas()
        check(any(s.get("@type") == "Article" for s in sc), f"{m['id']}: Article-Schema")
        art = next((s for s in sc if s.get("@type") == "Article"), {})
        head = pg.locator("main header").first.inner_text()
        if m["id"] in AUTHORED:
            check(art.get("author") == {"@type": "Person", "name": AUTHOR} and f"Von {AUTHOR}" in head, f"{m['id']}: Autor {AUTHOR} (sichtbar + Schema Person)")
        else:
            check(art.get("author", {}).get("@type") != "Person" and "Herausgegeben von Röntgen am Kai" in head, f"{m['id']}: Praxis als Herausgeberin")
        fq = [s for s in sc if s.get("@type") == "FAQPage"]
        check(len(fq) == 1 and len(fq[0]["mainEntity"]) == m["faq"], f"{m['id']}: FAQPage mit {m['faq']} Fragen")
        # Patiententext ohne Platzhalter/Briefings (interne Prüflisten zitieren verbotene Begriffe bewusst)
        body = pg.evaluate("(() => { const m = document.querySelector('main').cloneNode(true); m.querySelectorAll('[data-placeholder]').forEach(e => e.remove()); document.body.appendChild(m); m.style.position='absolute'; const t = m.innerText; m.remove(); return t; })()")
        check(m["cta"].rstrip(".") in body, f"{m['id']}: CTA „{m['cta'][:40]}…“")
        hrefs = pg.eval_on_selector_all("main a[href]", "els => els.map(a => a.getAttribute('href'))")
        check(any(h.endswith("/ratgeber/kuenstliche-intelligenz-radiologie") for h in hrefs), f"{m['id']}: Link zur KI-Übersicht")
        target = "/mammographie-graz" if m["id"] == "transpara" else ("/knochendichtemessung-graz" if m["id"] == "rho" else "/roentgen-graz")
        check(any(target in h for h in hrefs), f"{m['id']}: Link {target}")
        bad = [w for w in FORBIDDEN if w.lower() in body.lower()] + re.findall(r"(?<!keine )(?<!keinen )garantiert\w*", body, re.I)
        check(not bad, f"{m['id']}: keine verbotenen Aussagen {bad}")
        if m["id"] in REVIEWED:
            check(pg.locator("[data-reviewed]").count() == 1 and REVIEW_TXT in body, f"{m['id']}: Prüfvermerk Kalmar 21.10.2026")
        else:
            check(pg.locator("[data-reviewed]").count() == 0, f"{m['id']}: Prüfvermerk noch Platzhalter (wartet auf Durchsicht)")
        if m["id"] == "transpara":
            check(not re.search(r"tomosynth|\b3D\b|3-D", body, re.I), "transpara: keine Tomosynthese/3D")
            check("Transpara bei Röntgen am Kai" in body and "Rechnern in unserer Praxis" in body, "transpara: Einsatz in der Praxis beschrieben (lokal)")
            check(not re.search(r"temporal comparison|density|\d+\s?%", body, re.I), "transpara: kein Temporal Comparison/Density/Prozentwerte")
        if m["id"] == "rho":
            low = body.lower()
            check(not re.search(r"(?<!KI-)RHO", body) and "Rho™" not in body and "kostenlos" in low and "in einer anderen einrichtung" in low, "rho: Schreibweise „Rho“, kostenlos, externe DEXA-Hinweis")
            check(not re.search(r"(?<!nicht, dass )jedes röntgen\w* (wird|werden) (untersucht|ausgewertet)", low) and "keine osteoporosediagnose" in low and "kein frakturrisiko-rechner" in low and "kein ersatz für dexa" in low,
                  "rho: kein „jedes Röntgen“; keine Osteoporosediagnose / kein Frakturrisiko-Rechner / kein Ersatz für DEXA")
        if m["logo"]:
            lg = pg.locator("header img[alt^='Logo IB Lab']")
            check(lg.count() == 1 and lg.evaluate("i => i.complete && i.naturalWidth > 0"), f"{m['id']}: Produktlogo geladen")
        for key, pid in PLACEHOLDERS.get(m["id"], {}).items():
            check(pg.locator(f'[data-ki-media-id="{pid}"]').count() == 1, f"{m['id']}: Platzhalter {pid} sichtbar")
        if m["id"] in SLIDES:
            g = pg.locator("[data-ki-gallery]").first
            g.scroll_into_view_if_needed()
            pg.wait_for_timeout(400)
            img = g.locator("img").first
            check(img.evaluate("i => i.complete && i.naturalWidth > 0"), f"{m['id']}: Berichtsbild geladen")
            alt0 = img.get_attribute("alt")
            if SLIDES[m["id"]] > 1:
                g.get_by_role("button", name="Nächstes Bild").click()
                pg.wait_for_timeout(200)
                alt1 = g.locator("img").first.get_attribute("alt")
                check(alt1 != alt0 and "Bild 2 von" in g.locator("figcaption").inner_text(), f"{m['id']}: Slider wechselt per Knopf")
                g.locator("[role=region]").focus()
                pg.keyboard.press("ArrowLeft")
                pg.wait_for_timeout(200)
                check(g.locator("img").first.get_attribute("alt") == alt0, f"{m['id']}: Slider per Pfeiltaste")
                check(g.locator("[data-slide-tab]").count() == SLIDES[m["id"]], f"{m['id']}: Auswahlknöpfe je Bild")
            g.locator("[data-ki-zoom-open]").click()
            pg.wait_for_timeout(400)
            dlg = pg.locator("dialog[data-ki-zoom]")
            check(dlg.evaluate("d => d.open") and dlg.locator("img").evaluate("i => i.complete && i.naturalWidth > 0"), f"{m['id']}: Vergrößern öffnet Dialog mit Bild")
            pg.keyboard.press("Escape")
            pg.wait_for_timeout(200)
            check(not dlg.evaluate("d => d.open"), f"{m['id']}: Esc schließt Vergrößerung")
            if m["id"] in HOTSPOTS:
                hs = g.locator("[data-hotspot]")
                check(hs.count() == HOTSPOTS[m["id"]] and g.locator("ol li").count() == HOTSPOTS[m["id"]], f"{m['id']}: Hotspots + Legende")
                hs.first.click()
                check(hs.first.get_attribute("aria-pressed") == "true", f"{m['id']}: Hotspot auswählbar")
                g.screenshot(path=f"{SHOTS}/ki-{m['id']}-hotspots.png")
        hd = pg.eval_on_selector_all("main h1, main h2, main h3", "els => els.map(e => +e.tagName[1])")
        check(all(b - a <= 1 for a, b in zip(hd, hd[1:])), f"{m['id']}: Überschriften ohne Sprung")
        imgs = pg.eval_on_selector_all("main img", "els => els.filter(i => !i.closest('dialog')).map(i => i.getAttribute('alt'))")
        check(all(a is not None for a in imgs), f"{m['id']}: alle Bilder mit alt")
        pg.screenshot(path=f"{SHOTS}/ki-{m['id']}.png", full_page=True)
    check(not errors, f"keine Konsolenfehler {errors[:3]}")

    # 360 px + axe
    for scheme in ["light", "dark"]:
        c2 = br.new_context(viewport={"width": 360, "height": 780}, color_scheme=scheme)
        if scheme == "dark":
            c2.add_init_script("localStorage.setItem('theme', 'dark')")
        p2 = c2.new_page()
        for p in PAGES:
            p2.goto(BASE + p["path"], wait_until="networkidle")
            ov = p2.evaluate("Math.max(document.documentElement.scrollWidth, innerWidth) - 360")
            check(ov <= 0, f"360 px {scheme} ohne Überlauf {p['path']} ({ov})")
            p2.add_script_tag(content=AXE)
            res = p2.evaluate("async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return r.violations.map(v => [v.id, v.impact, v.nodes.length, v.nodes.slice(0,3).map(n => n.target.join(' '))]); }")
            check(not res, f"axe WCAG AA ({scheme}) {p['path']}: {res}")
            if p["id"] in ("uebersicht", "squirrel", "lama") and scheme == "light":
                p2.screenshot(path=f"{SHOTS}/ki-{p['id']}-360.png", full_page=True)
        c2.close()
    br.close()

print(f"\n{len(fails)} Fehler")
sys.exit(1 if fails else 0)
