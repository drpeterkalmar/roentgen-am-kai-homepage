#!/usr/bin/env python3
"""Qualitätskontrolle Körperanalyse-Seite /koerperanalyse-graz (Playwright, headless, axe-core).
Voraussetzung: `npm run build` und `npx vite preview --port 4174`.
Prüft Metadaten, Weiterleitung, Geräteklassen, Pflichtaussagen, verbotene Aussagen, Buttons, interne Links,
Überschriften, FAQ (sichtbar vs. Schema, pending nicht im Schema), Tastatur, axe (hell/dunkel), Bilder, Menü.
"""
import json, sys, pathlib, urllib.request
from playwright.sync_api import sync_playwright
from _paths import shots

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
SHOTS = shots("relaunch-screenshots-koerperanalyse")
import subprocess
VISCERAL = bool(json.loads(subprocess.run(["node", "--input-type=module", "-e", "const m = await import('./src/data/bodyComposition.js'); console.log(JSON.stringify(m.BODY.visceralFat ?? null))"],
                                          capture_output=True, text=True, cwd=ROOT).stdout.strip() or "null"))
SITE = "https://www.xn--rntgen-am-kai-imb.at"
PAGE = "/koerperanalyse-graz"
OLD = "/unser-angebot/koerperfettmessung"
TEL = "tel:+43" + "3168409050"
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
TITLE = "Körperanalyse Graz: Körperfett & Muskelmasse messen"
DESC = "Medizinische Körperanalyse mit DEXA in Graz: Körperfett, Muskelmasse und deren Verteilung präzise erfassen und Veränderungen objektiv vergleichen."
H1 = "Medizinische Körperanalyse in Graz – Körperfett und Muskelmasse präzise messen"
FAQ_N = 14
FAQ_SCHEMA_N = FAQ_N if VISCERAL else FAQ_N - 1  # offene Frage (viszerales Fett) nur bis zur Bestätigung außerhalb des Schemas
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()
fails = []


def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


def ld(pg):
    out = []
    for raw in pg.eval_on_selector_all('script[type="application/ld+json"]', "s => s.map(x => x.textContent)"):
        try:
            out.append(json.loads(raw))
        except Exception as e:  # noqa
            out.append({"_invalid": str(e)})
    return out


def clean(t):
    return t.replace("\u00ad", "").replace("\u2011", "-")


with sync_playwright() as p:
    b = p.chromium.launch()
    # --- 1. Statisches HTML ---
    html = urllib.request.urlopen(BASE + PAGE).read().decode()
    T_HTML = TITLE.replace("&", "&amp;")
    check(f"<title>{T_HTML}</title>" in html, "statisch: <title>")
    check(f'<meta name="description" content="{DESC}">' in html, "statisch: meta description")
    check(f'<link rel="canonical" href="{SITE}{PAGE}"' in html, "statisch: canonical (zentrale Domain)")
    check(f'property="og:title" content="{T_HTML}"' in html and f'property="og:url" content="{SITE}{PAGE}"' in html, "statisch: og:title + og:url")
    check(html.count("<h1") == 1 and H1 in html, "statisch: genau eine H1 mit Soll-Text")
    r = urllib.request.urlopen(BASE + OLD).read().decode()
    check(f"url=/roentgen-am-kai-homepage{PAGE}" in r and f'rel="canonical" href="{SITE}{PAGE}"' in r, f"Weiterleitung statisch {OLD} -> {PAGE}")
    sm = urllib.request.urlopen(BASE + "/sitemap.xml").read().decode()
    check(f"{SITE}{PAGE}</loc>" in sm and OLD not in sm, "sitemap: neue URL drin, alte nicht")

    # --- 2. Geräteklassen: erster Bildschirm, kein horizontales Scrollen ---
    for label, kw, bar in [
        ("Handy 390", dict(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2), 60),
        ("Handy 360", dict(viewport={"width": 360, "height": 740}, is_mobile=True, has_touch=True, device_scale_factor=2), 60),
        ("Tablet 768", dict(viewport={"width": 768, "height": 1024}, is_mobile=True, has_touch=True, device_scale_factor=2), 0),
        ("Desktop 1440", dict(viewport={"width": 1440, "height": 900}), 0),
    ]:
        c = b.new_context(**kw); pg = c.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(400)
        vw = kw["viewport"]["width"]; vh = kw["viewport"]["height"]
        first = pg.evaluate("""(lim) => { const inV = e => { if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.top >= 0 && r.bottom <= lim; };
          const m = document.querySelector('main');
          const bk = [...m.querySelectorAll('a[data-cta=booking]')].find(a => a.textContent.includes('Körperanalyse buchen'));
          return { h1: inV(m.querySelector('h1')), bookingTop: bk ? Math.round(bk.getBoundingClientRect().bottom) : null,
                   bar: !!document.querySelector('nav[aria-label=Schnellzugriff] a[data-cta=booking]') && getComputedStyle(document.querySelector('nav[aria-label=Schnellzugriff]')).display !== 'none' }; }""", vh - bar)
        check(first["h1"], f"[{label}] H1 im ersten Bildschirm")
        if bar:
            check(first["bar"], f"[{label}] feste Termin-Leiste sichtbar (Termin sofort erreichbar)")
        print(f"     [{label}] Hero-Button 'Körperanalyse buchen' Unterkante bei {first['bookingTop']}px (Bildschirm {vh - bar}px)")
        check(first["bookingTop"] is not None and first["bookingTop"] <= 2 * vh, f"[{label}] Hero-Buchungsbutton früh erreichbar")
        ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vw}")
        check(ow <= 0, f"[{label}] kein horizontales Scrollen ({ow}px)")
        # Vergleich: Handy Karten, ab Tablet Tabelle
        tbl = pg.locator("#vergleich table").is_visible()
        cards = pg.locator("#vergleich ul.md\\:hidden").is_visible()
        check((cards and not tbl) if vw < 768 else (tbl and not cards), f"[{label}] Vergleich: {'Karten' if vw < 768 else 'Tabelle'}")
        check(not errs, f"[{label}] keine JS-Fehler {errs[:1]}")
        pg.screenshot(path=str(SHOTS / f"ka-{label.replace(' ', '-')}.png"), full_page=True)
        c.close()

    # --- 3. Inhalte ---
    c = b.new_context(viewport={"width": 1440, "height": 900}); pg = c.new_page()
    pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(500)
    check(pg.title() == TITLE, f"Laufzeit-Titel {pg.title()!r}")
    check(pg.eval_on_selector("link[rel=canonical]", "e => e.href") == SITE + PAGE, "Laufzeit-Canonical")
    pg.evaluate("() => document.querySelectorAll('#faq button[aria-expanded=false]').forEach(b => b.click())"); pg.wait_for_timeout(200)
    body = clean(pg.locator("main").inner_text())
    low = body.lower()
    bad = [w for w in ["goldstandard", "100 prozent", "100 %", "fehlerfrei", "misst den stoffwechsel", "stoffwechselrate",
                       "sarkopenie-test", "sarkopenietest", "garantiert", "misst die muskelkraft", "misst muskelkraft",
                       "überweisungsschein", "e-card", "strahlungsfrei", "strahlenfrei", "ergebnisgespräch mit",
                       "abnehmen garantiert", "leistungssteigerung", "mikrosievert", "msv",
                       # VAT-Begriffe nur verboten, solange viszerales Fett nicht bestätigt ist (Befund-Slider erklärt es seit 07.10.2026)
                       *([] if VISCERAL else [" vat ", "(vat)", "cm³"]),
                       "bioresonanz-analyse", "bioresonanz (bia)", "bia (bioresonanz)"] if w in low]
    check(not bad, f"keine verbotenen Aussagen {bad}")
    check("dexa analyse" not in low and low.count("dexa-analyse") == 0, "'DEXA-Analyse' nicht als Hauptbegriff")
    check("DEXA Body Check" not in pg.locator("header").inner_text() and "DEXA Body Check" not in pg.locator("h1").inner_text(), "'DEXA Body Check' weder in Navigation noch H1")
    must = [H1, "Medizinische Ganzkörperanalyse mit DEXA", "Sehen Sie, was sich wirklich verändert: Fett, Muskelmasse oder beides.",
            "Medizinisch präzise Messung", "Regionale Auswertung", "Ideal für Verlaufskontrollen",
            "Was zeigt eine medizinische Körperanalyse?", "Körperfettanteil und gesamte Fettmasse", "Seitenvergleich links und rechts",
            "Muskelkraft und Muskelqualität werden nicht direkt gemessen.", "DEXA macht sichtbar, was Körpergewicht und BMI nicht unterscheiden können.",
            "Für wen ist eine DEXA-Körperanalyse interessant?", "Behandlung mit einer Abnehmspritze", "Welche Messung passt zu meinem Ziel?",
            "Abnehmen: Verlieren Sie Fett – oder auch wertvolle Muskelmasse?", "häufig nach mehreren Monaten",
            "ausschließlich durch die behandelnde Ärztin oder den behandelnden Arzt", "Ausgangsmessung oder Verlaufskontrolle buchen",
            "Trainingserfolg sichtbar machen", "misst aber weder Muskelkraft noch Ausdauer oder sportliche Leistungsfähigkeit",
            "Startmessung", "Einzelne Verlaufskontrolle", "Start- und Re-Check-Paket", "70 Euro", "130 Euro", "je nach Trainingsumfang und Ziel", "innerhalb von 2 Jahren",
            "am selben Gerät", "Meinen Fortschritt objektiv messen",
            "Muskelverlust und Sarkopenie frühzeitig abklären", "DEXA allein bestätigt oder widerlegt keine Sarkopenie.",
            "Ihr Bericht enthält daraus den RSMI", "Muskelmasse als Teil der Abklärung messen",
            "DEXA, Körperfettwaage oder BIA – was ist der Unterschied?", "Bioimpedanz (BIA) und Bioresonanz sind unterschiedliche Verfahren.",
            "gut geeignet für standardisierte Verlaufskontrollen",
            "So läuft Ihre Körperanalyse ab", "Termin auswählen", "Kurze Vorbereitung", "DEXA-Ganzkörpermessung", "Verständliche Auswertung",
            "etwa 20 Minuten", "nüchtern", "Harnblase", "leichte Kleidung", "Patientenportal", "ELGA", "ohne ärztliche Zuweisung buchbar", "Ein ärztliches Beratungsgespräch ist bei der Körperanalyse nicht vorgesehen.",
            "DEXA arbeitet mit einer sehr niedrigen Röntgendosis. Eine mögliche Schwangerschaft muss trotzdem vor der Untersuchung angegeben werden.",
            "Nicht verwechseln: Knochendichtemessung", "können getrennte Buchungen erfordern",
            "Häufige Fragen zur Körperanalyse", "Wissen, was sich im Körper wirklich verändert",
            "Lassen Sie Körperfett und Muskelmasse medizinisch präzise erfassen – als Ausgangswert oder zur objektiven Verlaufskontrolle.",
            "Körperanalyse in Graz buchen", "Frage zur Untersuchung stellen"]
    missing = [m for m in must if m not in body]
    check(not missing, f"alle Abschnitte/Pflichtsätze vorhanden {missing}")
    # viszerales Fett: nur nennen, wenn bodyComposition.js es bestätigt (visceralFat) – sonst nur als offene Frage
    vis = [s for s in body.split("\n") if "viszeral" in s.lower()]
    if VISCERAL:
        check(any("wertet die Software unseres Geräts das viszerale Fett" in s for s in vis)
              and "Viszerales Fett wird nicht versprochen" not in body and not any("setzt eine eigene" in s for s in vis),
              f"viszerales Fett bestätigt: genannt, ohne Platzhalter ({len(vis)} Stellen)")
    else:
        check(all(("setzt eine eigene" in s) or ("Wird auch viszerales Fett" in s) or ("Platzhalter" in s) for s in vis), f"viszerales Fett nicht versprochen ({len(vis)} Stellen)")
    heads = pg.eval_on_selector_all("main h1, main h2, main h3, main h4", "hs => hs.map(h => [+h.tagName[1], h.textContent.trim()])")
    jumps = [(a, b2) for a, b2 in zip(heads, heads[1:]) if b2[0] - a[0] > 1]
    check(sum(1 for h in heads if h[0] == 1) == 1 and heads[0][0] == 1 and not jumps, f"Überschriftenhierarchie ({len(heads)} Überschriften, Sprünge {jumps})")
    print("     H2:", [clean(h[1]) for h in heads if h[0] == 2])
    books = pg.eval_on_selector_all('a[data-cta="booking"]', 'as => as.map(a => [a.textContent.trim(), a.getAttribute("href"), a.target, a.rel])')
    check(len(books) >= 8 and all(x[1] == BOOK and x[2] == "_blank" and "noopener" in x[3] for x in books), f"Buchungsbuttons ({len(books)}) → MiraNext, neues Fenster")
    print("     Buchungsbuttons:", sorted({x[0].replace(' (öffnet in neuem Fenster)', '') for x in books}))
    tels = pg.eval_on_selector_all('main a[href^="tel:"]', 'as => as.map(a => a.getAttribute("href"))')
    check(len(tels) >= 4 and all(t == TEL for t in tels), f"tel-Links ({len(tels)}) = Praxisnummer")
    labels = pg.eval_on_selector_all("main a, main button", "es => es.map(e => (e.getAttribute('aria-label') || e.textContent).trim())")
    check(all(len(l) >= 3 for l in labels), "alle Buttons/Links haben eine Beschriftung")
    for anchor, target in [("#ablauf", "ablauf"), ("#faq", "faq"), ("#abnehmen", "abnehmen"), ("#training", "training"), ("#sarkopenie", "sarkopenie")]:
        check(pg.locator(f'main a[href="{anchor}"]').count() >= 1 and pg.locator(f"#{target}").count() == 1, f"Anker {anchor} verlinkt und vorhanden")
    pg.click('main a[href="#ablauf"] >> nth=0'); pg.wait_for_timeout(1500)
    # sanftes Scrollen kann unter Last länger dauern: warten, bis scrollY zwei Messungen lang steht
    last = None
    for _ in range(40):
        y = pg.evaluate("scrollY")
        if y == last:
            break
        last = y; pg.wait_for_timeout(150)
    top = pg.evaluate("document.getElementById('ablauf').getBoundingClientRect().top")
    check(-5 <= top <= 260, f"'So funktioniert die Messung' springt zu #ablauf (top={round(top)})")
    hrefs = sorted(set(pg.eval_on_selector_all("a[href]", "as => as.map(a => a.href)")))
    for need in ["/knochendichtemessung-graz", "/gesundheitsziele/gesund-abnehmen", "/gesundheitsziele/fitness-muskelaufbau", "/gesundheitsziele/frauengesundheit-wechseljahre", "/kontakt", "/ratgeber/abnehmspritze-muskelmasse-koerperanalyse"]:
        check(any(h.endswith(need) for h in hrefs), f"interner Link: {need}")
    check(any("google.com/maps" in h for h in hrefs) and BOOK in hrefs, "Links Anfahrt (Maps) + Online-Buchung")
    internal = [h for h in hrefs if h.startswith(BASE)]
    broken = []
    for h in internal:
        try:
            code = urllib.request.urlopen(h.split("#")[0]).status
        except Exception as e:  # noqa
            code = str(e)
        if code != 200:
            broken.append((h, code))
    check(not broken, f"interne Links erreichbar ({len(internal)}) {broken}")
    alts = pg.eval_on_selector_all("main img", "is => is.map(i => i.alt)")
    check(alts and all(len(a) > 15 for a in alts), f"Bilder mit Alt-Text {alts}")
    ph = pg.eval_on_selector_all("[data-placeholder]", "e => e.map(x => x.getAttribute('data-placeholder').slice(0, 70))")
    print(f"     Platzhalter ({len(ph)}):", ph)

    # --- 4. Strukturierte Daten ---
    pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(500)
    schemas = ld(pg)
    types = [s.get("@type") for s in schemas]
    check(all("_invalid" not in s for s in schemas), f"JSON-LD gültig ({types})")
    check(sorted(types) == sorted(["BreadcrumbList", "MedicalWebPage", "Service", "MedicalBusiness", "FAQPage"]), f"Schema-Typen {types}")
    faq = next((s for s in schemas if s.get("@type") == "FAQPage"), None)
    vis_q = pg.eval_on_selector_all("#faq button[aria-expanded]", "bs => bs.map(b => b.textContent.trim())")
    sch_q = [q["name"] for q in faq["mainEntity"]] if faq else []
    check(len(vis_q) == FAQ_N and len(sch_q) == FAQ_SCHEMA_N and all(q in vis_q for q in sch_q), f"FAQ: {len(vis_q)} sichtbar, {len(sch_q)} im Schema (alle sichtbar)")
    pg.evaluate("() => document.querySelectorAll('#faq button[aria-expanded=false]').forEach(b => b.click())"); pg.wait_for_timeout(200)
    regions = pg.eval_on_selector_all("#faq [role=region]", "rs => rs.map(r => [r.querySelector('p').textContent.trim(), !!r.querySelector('[data-placeholder]')])")
    by_q = dict(zip(vis_q, regions))
    ok_ans = all(by_q[q["name"]][0] == q["acceptedAnswer"]["text"] and not by_q[q["name"]][1] for q in (faq["mainEntity"] if faq else []))
    check(ok_ans, "FAQ-Schema: Antworten == sichtbarer Text, keine Frage mit Platzhalter im Schema")
    pend = [q for q, (_, hasph) in by_q.items() if hasph]
    check(len(pend) == FAQ_N - FAQ_SCHEMA_N and not any(q in sch_q for q in pend), f"offene FAQ sichtbar mit Platzhalter, nicht im Schema: {pend}")
    blob = json.dumps(schemas, ensure_ascii=False).lower()
    check(not any(w in blob for w in ["rating", "review", "award", "offers", "price", "goldstandard", "[preis]"]), "Schema ohne Bewertungen/Preise/Platzhalter")
    svc = next((s for s in schemas if s.get("@type") == "Service"), None)
    check(svc and svc["url"] == SITE + PAGE and svc["provider"]["@id"] == SITE + "/#praxis", "Service → provider = zentrale Praxis")
    bc = next((s for s in schemas if s.get("@type") == "BreadcrumbList"), None)
    vis_bc = pg.eval_on_selector_all('nav[aria-label="Brotkrumen"] li', "ls => ls.map(l => l.textContent.trim())")
    check(bc and [i["name"] for i in bc["itemListElement"]] == vis_bc, f"BreadcrumbList == sichtbar {vis_bc}")

    # --- 5. Tastatur/Fokus ---
    pg.keyboard.press("Tab")
    check(pg.evaluate("document.activeElement.textContent") == "Zum Inhalt springen", "erster Tab = Skip-Link")
    seen, ok_ring = [], True
    for _ in range(30):
        pg.keyboard.press("Tab")
        info = pg.evaluate("(() => { const e = document.activeElement; const cs = getComputedStyle(e); return [e.textContent.trim().slice(0, 40), cs.outlineStyle, cs.outlineWidth]; })()")
        seen.append(info[0])
        if info[1] == "none" or info[2] == "0px":
            ok_ring = False
    check(ok_ring, "Fokusrahmen sichtbar bei 30 Tab-Stopps")
    check(any("Körperanalyse buchen" in s for s in seen) and any("So funktioniert" in s for s in seen), "Hero-Buttons per Tastatur erreichbar")
    pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(300)
    q = pg.locator("#faq button[aria-expanded]").first
    q.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(150)
    ok1 = q.get_attribute("aria-expanded") == "true"
    pg.keyboard.press("Space"); pg.wait_for_timeout(150)
    check(ok1 and q.get_attribute("aria-expanded") == "false", "Akkordeon per Tastatur (Enter öffnet, Leertaste schließt)")
    check(q.get_attribute("aria-controls") and pg.locator(f"#{q.get_attribute('aria-controls').replace(':', chr(92) + ':')}").count() == 1, "Akkordeon: aria-controls verweist auf Antwort")
    c.close()

    # --- 6. axe WCAG AA hell + dunkel ---
    for scheme in ["light", "dark"]:
        for vw_, vh_ in [(1440, 900), (390, 844)]:
            c2 = b.new_context(viewport={"width": vw_, "height": vh_}, color_scheme=scheme); p2 = c2.new_page()
            p2.goto(BASE + PAGE, wait_until="networkidle"); p2.wait_for_timeout(500)
            p2.evaluate("() => document.querySelectorAll('#faq button[aria-expanded=false]').forEach(b => b.click())")
            p2.add_script_tag(content=AXE)
            res = p2.evaluate("async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return r.violations.map(v => [v.id, v.impact, v.nodes.length, v.nodes.slice(0,3).map(n => n.target.join(' '))]); }")
            check(not res, f"axe WCAG AA ({scheme}, {vw_}px): {res}")
            c2.close()

    # --- 7. Bildgewicht Handy ---
    c3 = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, device_scale_factor=2); p3 = c3.new_page()
    p3.goto(BASE + PAGE, wait_until="networkidle"); p3.wait_for_timeout(800)
    perf = p3.evaluate("""(() => { const r = performance.getEntriesByType('resource');
      return { img: r.filter(x => x.initiatorType === 'img').reduce((a, x) => a + (x.decodedBodySize || 0), 0), imgs: r.filter(x => x.initiatorType === 'img').map(x => [x.name.split('/').pop(), x.decodedBodySize]) }; })()""")
    print("     Handy-Bilder:", perf["imgs"])
    check(perf["img"] < 400 * 1024, f"Bildgewicht Handy {round(perf['img'] / 1024)} KB < 400 KB")
    c3.close()

    # --- 8. Menü, Footer, Startseite, alte URL ---
    c4 = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2); p4 = c4.new_page()
    p4.goto(BASE + "/", wait_until="networkidle"); p4.wait_for_timeout(400)
    p4.get_by_role("button", name="Menü").click(); p4.wait_for_timeout(300)
    ml = p4.get_by_role("dialog").get_by_role("link", name="Körperanalyse", exact=True)
    check(ml.get_attribute("href").endswith(PAGE), "Handy-Menü: 'Körperanalyse' → neue URL")
    ml.click(); p4.wait_for_timeout(800)
    check(p4.url.endswith(PAGE) and clean(p4.locator("h1").inner_text()) == H1, "Handy-Menü führt zur Seite")
    p4.goto(BASE + "/", wait_until="networkidle"); p4.wait_for_timeout(300)
    check(p4.locator(f'main a[href$="{PAGE}"]').count() >= 1 and p4.locator(f'a[href$="{OLD}"]').count() == 0, "Startseite verlinkt neue URL, nicht die alte")
    check(p4.locator(f'footer a[href$="{PAGE}"]').count() >= 1, "Footer verlinkt neue URL")
    c4.close()
    c5 = b.new_context(viewport={"width": 1440, "height": 900}); p5 = c5.new_page()
    p5.goto(BASE + OLD, wait_until="networkidle"); p5.wait_for_timeout(800)
    check(p5.url.endswith(PAGE), f"alte URL leitet im Browser weiter ({p5.url})")
    dl = p5.locator('header nav[aria-label="Hauptnavigation"] a[aria-current="page"]')
    check(dl.count() == 1 and dl.inner_text() == "Körperanalyse", "Desktop-Hauptmenü: 'Körperanalyse' aktiv")
    p5.goto(BASE + "/knochendichtemessung-graz", wait_until="networkidle"); p5.wait_for_timeout(300)
    check(p5.locator(f'main a[href$="{PAGE}"]').count() >= 1, "Knochendichte-Seite verlinkt Körperanalyse")
    c5.close()
    b.close()

print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
