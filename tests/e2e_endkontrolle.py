#!/usr/bin/env python3
"""Technische Endkontrolle der GESAMTEN Website (Playwright headless, axe-core).
Voraussetzung: `npm run build` und `npx vite preview --port 4174`.
Alle Routen kommen aus src/data/routes.js (node-Import) – neue Seiten werden automatisch mitgeprüft.
Prüft je Route: 200, Titel/Description/Canonical/OG eindeutig + korrekt, eine H1, Überschriften ohne Sprünge,
JSON-LD gültig (keine Preise/Bewertungen, FAQPage nur bei sichtbarer FAQ), Bilder mit alt + nicht übergroß,
Touch-Ziele ≥ 44 px (Schaltflächen/CTAs), kein horizontales Scrollen (360 px), Termin-/Telefon-/Mail-Links,
axe WCAG AA (hell), interne Links (Crawl) erreichbar.
Global: 404 (statisch + in der App), robots/sitemap, Formular (Risikocheck: nichts wird gesendet),
keine Cookies/kein localStorage ohne Aktion, keine externen Hosts, CTA-Ereignis rak:cta ohne Datenversand,
Bundle- und Bildgrößen, Ladezeiten (lokal).
"""
import json, sys, pathlib, subprocess, urllib.request, urllib.error, gzip
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
SITE = "https://www.xn--rntgen-am-kai-imb.at"
TEL = "tel:+43" + "3168409050"
TEL_OK = {TEL, "tel:0800" + "500181", "tel:144"}
MAIL = "mailto:office@roentgen-am-kai.at"
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()
REPORT = pathlib.Path.home() / "Desktop/relaunch-endkontrolle.txt"

R = json.loads(subprocess.run(
    ["node", "--input-type=module", "-e",
     "const r = await import('./src/data/routes.js');"
     "console.log(JSON.stringify(r.routes.map(x => ({path: x.path, title: r.fullTitle(x), desc: x.description, noindex: !!x.noindex}))))"],
    cwd=ROOT, capture_output=True, text=True, check=True).stdout)
fails, notes = [], []


def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


def note(msg):
    print("INFO " + msg)
    notes.append(msg)


def status(url):
    try:
        with urllib.request.urlopen(url) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code


# --- 1. Metadaten-Eindeutigkeit (Quelle) ---
titles = [r["title"] for r in R]; descs = [r["desc"] for r in R]
check(len(set(titles)) == len(titles), f"alle {len(R)} Seitentitel eindeutig")
check(len(set(descs)) == len(descs), "alle Meta-Descriptions eindeutig")
long_t = [(r["path"], len(r["title"])) for r in R if len(r["title"]) > 70]
bad_d = [(r["path"], len(r["desc"])) for r in R if not 50 <= len(r["desc"]) <= 165]
check(not long_t, f"Titel ≤ 70 Zeichen {long_t}")
check(not bad_d, f"Descriptions 50–165 Zeichen {bad_d}")

# --- 2. Statisch: robots, sitemap, 404 ---
robots = urllib.request.urlopen(BASE + "/robots.txt").read().decode()
sm = urllib.request.urlopen(BASE + "/sitemap.xml").read().decode()
check("User-agent: *" in robots and f"Sitemap: {SITE}/sitemap.xml" in robots, "robots.txt vorhanden, verweist auf Sitemap")
missing = [r["path"] for r in R if not r["noindex"] and f"<loc>{SITE}{'/' if r['path'] == '/' else r['path']}</loc>" not in sm]
extra = [r["path"] for r in R if r["noindex"] and f"{SITE}{r['path']}</loc>" in sm]
check(not missing and not extra, f"Sitemap = alle indexierbaren Routen ({sm.count('<url>')}) fehlend={missing} noindex-drin={extra}")
check(sm.count("<url>") == len(set(sm.split("<loc>")[1:])), "Sitemap ohne Duplikate")
# GitHub Pages liefert bei unbekannten Pfaden dist/404.html mit Status 404 (vite preview dagegen die App → App-404 unten)
html404 = (ROOT / "dist/404.html").read_text()
check('name="robots" content="noindex"' in html404 and "Zur Startseite" in html404 and TEL in html404 and html404.count("<h1") == 1,
      "statische 404.html: noindex, eine H1, Weg zur Startseite + Telefon")
for r in R:
    html = urllib.request.urlopen(BASE + r["path"]).read().decode()
    canon = f'<link rel="canonical" href="{SITE}{"/" if r["path"] == "/" else r["path"]}"'
    ok = (canon in html and html.count('rel="canonical"') == 1 and 'property="og:title"' in html and 'property="og:image"' in html
          and 'property="og:url" content="' + SITE in html and html.count("<h1") <= 1)
    check(ok, f"statisch {r['path']}: 1 Canonical, OG-Daten")

# --- 3. Bundle- und Bildgrößen ---
dist = ROOT / "dist"
js = sorted(dist.glob("assets/*.js"), key=lambda f: -f.stat().st_size)
gz = {f.name: len(gzip.compress(f.read_bytes())) for f in js[:3]}
check(all(v < 80_000 for v in gz.values()), f"größte JS-Dateien gzip < 80 kB: { {k: f'{v/1024:.0f} kB' for k, v in gz.items()} }")
imgs = [f for f in (dist / "assets/images").glob("*") if f.suffix in (".avif", ".jpg", ".png", ".webp")]
big = [(f.name, f.stat().st_size // 1024) for f in imgs if f.stat().st_size > 350_000]
check(not big, f"keine Bilddatei > 350 kB ({len(imgs)} Dateien) {big}")
unused = []
src_text = "".join(p.read_text() for p in list((ROOT / "src").rglob("*.js*")) + [ROOT / "index.html"])
for f in (ROOT / "public/assets/images").glob("*.avif"):
    base = f.stem.replace("-mobile", "").replace("-tablet", "")
    if base not in src_text:
        unused.append(f.name)
note(f"nicht referenzierte Bilddateien in public/ (nur Speicherplatz, werden nicht geladen): {len(unused)}")

with sync_playwright() as p:
    b = p.chromium.launch()
    external, internal = set(), set()

    # --- 4. Alle Routen: mobil 360 px ---
    ctx = b.new_context(viewport={"width": 360, "height": 740}, is_mobile=True, has_touch=True, device_scale_factor=2)
    pg = ctx.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.on("request", lambda q: external.add(q.url.split('/')[2]) if not q.url.startswith(("http://localhost", "data:", "blob:")) else None)
    timings = []
    for r in R:
        errs.clear()
        resp = pg.goto(BASE + r["path"], wait_until="networkidle"); pg.wait_for_timeout(250)
        nav = pg.evaluate("(() => { const n = performance.getEntriesByType('navigation')[0]; const res = performance.getEntriesByType('resource');"
                          " return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd),"
                          " kb: Math.round((n.transferSize + res.reduce((s, x) => s + (x.transferSize || 0), 0)) / 1024) }; })()")
        timings.append((r["path"], nav))
        h1 = pg.locator("h1").count()
        ow = pg.evaluate("Math.max(document.documentElement.scrollWidth, window.innerWidth) - 360")
        desc = pg.eval_on_selector('meta[name=description]', 'e => e.content')
        robots_meta = pg.eval_on_selector_all('meta[name=robots]', 'es => es.map(e => e.content)')
        ok = (resp.status == 200 and pg.title() == r["title"] and desc == r["desc"] and h1 == 1 and ow <= 0 and not errs
              and bool(robots_meta) == r["noindex"])
        check(ok, f"[360] {r['path']} h1={h1} overflow={ow} robots={robots_meta} errs={errs[:1]}")
        levels = pg.eval_on_selector_all("main h1, main h2, main h3, main h4, main h5", "hs => hs.map(h => +h.tagName[1])")
        jumps = [(x, y) for x, y in zip(levels, levels[1:]) if y > x + 1]
        check(levels[:1] == [1] and not jumps, f"Überschriftenfolge {r['path']} {jumps}")
        # JSON-LD
        lds = []
        for raw in pg.eval_on_selector_all('script[type="application/ld+json"]', "s => s.map(x => x.textContent)"):
            try:
                lds.append(json.loads(raw))
            except Exception as e:  # noqa
                lds.append({"_invalid": str(e)})
        flat = json.dumps(lds)
        faq_visible = pg.locator("main [aria-expanded][aria-controls]").count() > 0 or pg.locator("main #faq").count() > 0
        check("_invalid" not in flat and "aggregateRating" not in flat and '"price"' not in flat and ("FAQPage" not in flat or faq_visible),
              f"JSON-LD gültig {r['path']} ({[x.get('@type') for x in lds]})")
        # Bilder: alt vorhanden (dekorativ = alt=""), nicht übergroß geladen
        im = pg.evaluate("""(async () => { const is = [...document.querySelectorAll('main img')];
            for (const i of is) { i.loading = 'eager'; if (!i.complete) await new Promise(res => { i.onload = i.onerror = res; }); }
            return is.map(i => ({ src: i.currentSrc.split('/').pop(), nw: i.naturalWidth, w: Math.round(i.getBoundingClientRect().width), alt: i.getAttribute('alt') })); })()""")
        no_alt = [x["src"] for x in im if x["alt"] is None]
        broken = [x["src"] for x in im if x["nw"] == 0]
        oversized = [(x["src"], x["nw"], x["w"]) for x in im if x["w"] > 0 and x["nw"] > x["w"] * 2 * 1.6 and x["nw"] > 900]
        check(not no_alt and not broken, f"Bilder {r['path']}: {len(im)} ok, ohne alt={no_alt}, defekt={broken}")
        check(not oversized, f"Bildgrößen passend (srcset) {r['path']} {oversized}")
        # Touch-Ziele: Schaltflächen und CTAs ≥ 44 px hoch
        small = pg.evaluate("""[...document.querySelectorAll('main a[data-cta], main button, header button, nav[aria-label=Schnellzugriff] a')]
            .filter(e => e.offsetParent !== null)
            // WCAG 2.5.8: Links im Fließtext (inline) sind von der Mindestgröße ausgenommen
            .filter(e => !(getComputedStyle(e).display === 'inline' && e.closest('p, li')))
            .map(e => [e.textContent.trim().slice(0, 30), Math.round(e.getBoundingClientRect().height)])
            .filter(x => x[1] < 44)""")
        check(not small, f"Touch-Ziele ≥ 44 px {r['path']} {small[:3]}")
        # Termin-, Telefon-, Mail-Links
        tels = pg.eval_on_selector_all('a[href^="tel:"]', 'as => as.map(a => a.getAttribute("href"))')
        mails = pg.eval_on_selector_all('a[href^="mailto:"]', 'as => as.map(a => a.getAttribute("href"))')
        books = pg.eval_on_selector_all('a[href*="miranext"]', 'as => as.map(a => [a.getAttribute("href"), a.target, a.rel, a.dataset.cta || ""])')
        check(TEL in tels and all(t in TEL_OK for t in tels) and all(m.split("?")[0] == MAIL for m in mails),
              f"Telefon/Mail {r['path']} (tel {len(tels)}, mail {len(mails)})")
        check(books and all(x[0] == BOOK and x[1] == "_blank" and "noopener" in x[2] and x[3] == "booking" for x in books),
              f"Terminbuttons → MiraNext, neues Fenster, data-cta=booking {r['path']} ({len(books)})")
        for h in pg.eval_on_selector_all("a[href]", "as => as.map(a => a.href)"):
            if h.startswith(BASE):
                internal.add(h.split("#")[0].split("?")[0])
    ctx.close()

    bad_links = sorted(h for h in internal if status(h) != 200)
    check(not bad_links, f"alle internen Links erreichbar ({len(internal)}) {bad_links}")
    check(not external, f"keine externen Hosts beim Laden {sorted(external)}")
    slow = [(pth, t["load"]) for pth, t in timings if t["load"] > 2500]
    heavy = [(pth, t["kb"]) for pth, t in timings if t["kb"] > 1200]
    check(not slow, f"Ladezeit lokal < 2,5 s je Seite {slow}")
    check(not heavy, f"Übertragung je Seite < 1,2 MB {heavy}")
    avg = sum(t["load"] for _, t in timings) / len(timings)
    note(f"Ladezeit lokal (Preview, ohne Netzdrosselung): Ø {avg:.0f} ms, max {max(t['load'] for _, t in timings)} ms; "
         f"Übertragung Ø {sum(t['kb'] for _, t in timings) / len(timings):.0f} kB, max {max(t['kb'] for _, t in timings)} kB")

    # --- 5. 404 in der App (Navigation auf unbekannte Adresse) ---
    pg = b.new_page(viewport={"width": 390, "height": 844})
    pg.goto(BASE + "/", wait_until="networkidle")
    pg.evaluate("window.history.pushState({}, '', '/roentgen-am-kai-homepage/gibt-es-nicht'); window.dispatchEvent(new PopStateEvent('popstate'))")
    pg.wait_for_timeout(600)
    check(pg.locator("h1").inner_text() == "Seite nicht gefunden" and pg.eval_on_selector_all('meta[name=robots]', 'es => es.map(e => e.content)') == ["noindex, follow"]
          and pg.locator('main a[href$="/roentgen-am-kai-homepage/"]').count() >= 1, "App-404: Überschrift, noindex, Link zur Startseite")
    pg.goto(BASE + "/ratgeber/gibt-es-nicht", wait_until="networkidle"); pg.wait_for_timeout(300)
    check(pg.locator("h1").inner_text() == "Seite nicht gefunden", "unbekannter Ratgeber-Artikel → 404-Inhalt")
    pg.close()

    # --- 6. Datenschutz: keine Cookies / kein Speicher ohne Aktion; CTA-Ereignis ohne Datenversand ---
    ctx = b.new_context(viewport={"width": 1440, "height": 900}); pg = ctx.new_page()
    sent = []
    pg.on("request", lambda q: sent.append(q.url) if not q.url.startswith(("http://localhost", "data:", "blob:")) else None)
    for pth in ["/", "/knochendichtemessung-graz", "/ratgeber/mammascreening-oesterreich"]:
        pg.goto(BASE + pth, wait_until="networkidle")
    check(ctx.cookies() == [] and pg.evaluate("localStorage.length + sessionStorage.length") == 0, "keine Cookies, kein Web-Speicher ohne Nutzeraktion")
    pg.evaluate("window.__cta = []; window.addEventListener('rak:cta', e => window.__cta.push(e.detail))")
    with ctx.expect_page() as popup:
        pg.locator('main a[data-cta="booking"]').first.click()
    popup.value.close()
    ev = pg.evaluate("window.__cta")
    check(len(ev) == 1 and ev[0]["event"] == "booking_start" and ev[0]["service"] == "mammographie", f"CTA-Ereignis Buchungsbeginn mit Untersuchung: {ev}")
    check(not [u for u in sent if "miranext" not in u], f"kein Datenversand an Dritte (außer Absprung ins Buchungsportal): {sent[:3]}")
    check(pg.evaluate("typeof window.dataLayer") == "undefined" and pg.locator('script[src*="gtag"], script[src*="googletagmanager"], script[src*="matomo"], script[src*="facebook"]').count() == 0,
          "kein Analyse-/Werbe-Tracker eingebunden (kein dataLayer, kein gtag/Matomo/Pixel)")
    # --- 7. Formular: Risikocheck (einziges Formular) – Validierung + nichts wird gesendet ---
    forms = []
    for r in R:
        pg.goto(BASE + r["path"], wait_until="domcontentloaded"); pg.wait_for_timeout(150)
        if pg.locator("main form").count():
            forms.append(r["path"])
    check(forms == ["/knochendichtemessung-graz"], f"Formulare auf der Website: {forms}")
    pg.goto(BASE + "/knochendichtemessung-graz", wait_until="networkidle")
    before = len(sent)
    f = pg.locator("main form").first
    f.get_by_role("button", name="Ergebnis anzeigen").click(); pg.wait_for_timeout(150)
    res = pg.locator("[data-risk-result]").inner_text()
    check("9 Fragen haben Sie nicht beantwortet" in res.replace("\n", " ") and "keine Diagnose" in res, "Formular leer abgeschickt → Hinweis auf unbeantwortete Fragen, keine Diagnose")
    check(len(sent) == before and pg.url.endswith("/knochendichtemessung-graz"), "Formular sendet nichts und lädt die Seite nicht neu")
    ctx.close()

    # --- 8. axe WCAG AA (hell, 390 px) – alle Routen ---
    c = b.new_context(viewport={"width": 390, "height": 900}); p2 = c.new_page()
    for r in R:
        p2.goto(BASE + r["path"], wait_until="networkidle"); p2.wait_for_timeout(200)
        p2.add_script_tag(content=AXE)
        res = p2.evaluate("async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return r.violations.map(v => [v.id, v.impact, v.nodes.length, v.nodes.slice(0,2).map(n => n.target.join(' '))]); }")
        check(not res, f"axe WCAG AA {r['path']}: {res}")
    c.close()
    b.close()

summary = "\n".join([f"Endkontrolle Röntgen am Kai – {len(R)} Routen", "RESULT: " + ("ALL GREEN" if not fails else f"{len(fails)} FAIL"), ""]
                    + ["FAIL " + x for x in fails] + ["INFO " + x for x in notes])
REPORT.write_text(summary + "\n")
print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
