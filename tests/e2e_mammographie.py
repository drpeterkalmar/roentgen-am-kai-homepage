#!/usr/bin/env python3
"""Qualitätskontrolle Mammographie-Seite + Startseitenbereiche (Playwright, headless, axe-core).
Voraussetzung: `npm run build` und `npx vite preview --port 4174`.
"""
import json, re, sys, pathlib, urllib.request
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
SITE = "https://www.xn--rntgen-am-kai-imb.at"
PAGE = "/mammographie-graz"
TEL = "tel:+43" + "3168409050"
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
TITLE = "Mammographie Graz ohne Zuweisung | Röntgen am Kai"
DESC = "Mammographie in Graz: Frauen von 45 bis 74 Jahren können alle zwei Jahre ohne Zuweisung mit ihrer freigeschalteten e-card zum Screening kommen."
H1 = "Mammographie in Graz – für Ihre Brustgesundheit"
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

with sync_playwright() as p:
    b = p.chromium.launch()
    # --- 1. Statisches HTML (ohne JS): Meta, Canonical, OG, H1 ---
    html = urllib.request.urlopen(BASE + PAGE).read().decode()
    check(f"<title>{TITLE}</title>" in html, "statisch: <title>")
    check(f'<meta name="description" content="{DESC}">' in html, "statisch: meta description")
    check(f'<link rel="canonical" href="{SITE}{PAGE}"' in html, "statisch: canonical")
    check(f'property="og:title" content="{TITLE}"' in html and f'property="og:description" content="{DESC}"' in html, "statisch: og:title + og:description")
    check('property="og:image"' in html and f'property="og:url" content="{SITE}{PAGE}"' in html, "statisch: og:image + og:url")
    check(html.count("<h1") == 1 and H1 in html, "statisch: genau eine H1 mit Soll-Text")
    for old in ["/unser-angebot/mammographie", "/unser-angebot/mammographie/mammascreening"]:
        r = urllib.request.urlopen(BASE + old).read().decode()
        check(f'url=/roentgen-am-kai-homepage{PAGE}' in r and f'rel="canonical" href="{SITE}{PAGE}"' in r, f"Weiterleitung statisch {old} -> {PAGE}")

    # --- 2. Geräteklassen ---
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
          return { h1: inV(m.querySelector('h1')), hinweis: [...m.querySelectorAll('p')].some(p => p.textContent.includes('Ohne Zuweisung · mit e-card · alle 2 Jahre') && inV(p)),
                   termin: [...m.querySelectorAll('a[data-cta=booking]')].some(a => a.textContent.includes('Mammographie-Termin buchen') && inV(a)) }; }""", vh - bar)
        check(all(first.values()), f"[{label}] erster Bildschirm (H1, Hinweis, Terminbutton): {first}")
        ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vw}")
        check(ow <= 0, f"[{label}] kein horizontales Scrollen ({ow}px)")
        check(not errs, f"[{label}] keine JS-Fehler {errs[:1]}")
        pg.screenshot(path=f"/tmp/mammo-{label.replace(' ', '-')}.png", full_page=True)
        c.close()

    # --- 3. Desktop-Detailprüfung ---
    c = b.new_context(viewport={"width": 1440, "height": 900}); pg = c.new_page()
    pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(500)
    check(pg.title() == TITLE, f"Laufzeit-Titel {pg.title()!r}")
    check(pg.eval_on_selector('meta[name=description]', 'e => e.content') == DESC, "Laufzeit-Description")
    check(pg.eval_on_selector('link[rel=canonical]', 'e => e.href') == SITE + PAGE, "Laufzeit-Canonical")
    body = pg.locator("body").inner_text()
    bad = [w for w in ["Tomosynth", "3D-Mammo", "3D Mammo", "dreidimensionale Mammo", "Mammomat", "Siemens", "50 %"] if w.lower() in body.lower()]
    check(not bad, f"keine Tomosynthese/3D/Geräte-/Dosisversprechen im Text {bad}")
    must = ["Ohne Zuweisung · mit e-card · alle 2 Jahre", "Brustkrebsvorsorge ohne Zuweisung", "Screening-Termin vereinbaren",
            "Was ist eine Mammographie?", "Screening oder diagnostische Abklärung", "Beschwerden rasch abklären",
            "neu tastbaren Knoten", "Das Brustkrebs-Screening ist für Frauen ohne Beschwerden vorgesehen.", "Kontakt bei Beschwerden",
            "Ablauf der Mammographie", "Vorbereitung", "Brustultraschall", "Dichtes Brustgewebe", "Häufige Fragen zur Mammographie",
            "Mammographie-Termin in Graz vereinbaren", "nicht mit völliger Sicherheit ausschließen", "kurative Mammographie"]
    missing = [m for m in must if m not in body]
    check(not missing, f"alle Abschnitte/Pflichtsätze vorhanden {missing}")
    heads = pg.eval_on_selector_all("main h1, main h2, main h3, main h4", "hs => hs.map(h => [+h.tagName[1], h.textContent.trim()])")
    jumps = [(a, b2) for a, b2 in zip(heads, heads[1:]) if b2[0] - a[0] > 1]
    check(sum(1 for h in heads if h[0] == 1) == 1 and heads[0][0] == 1 and not jumps, f"Überschriftenhierarchie ({len(heads)} Überschriften, Sprünge {jumps})")
    print("     H2:", [h[1] for h in heads if h[0] == 2])
    books = pg.eval_on_selector_all('a[data-cta="booking"]', 'as => as.map(a => [a.textContent.trim(), a.getAttribute("href"), a.target, a.rel])')
    check(len(books) >= 4 and all(x[1] == BOOK and x[2] == "_blank" and "noopener" in x[3] for x in books), f"Terminbuttons ({len(books)}): {[x[0][:30] for x in books]}")
    tels = pg.eval_on_selector_all('main a[href^="tel:"], footer a[href^="tel:"]', 'as => as.map(a => a.getAttribute("href"))')
    check(TEL in tels and all(t in (TEL, "tel:0800" + "500181") for t in tels), f"tel-Links ({len(tels)}) nur Praxis + Serviceline")
    imgs = pg.eval_on_selector_all("main img", "is => is.map(i => [i.getAttribute('src'), i.getAttribute('alt')])")
    check(all(a is not None for _, a in imgs), f"alle Bilder mit alt-Attribut ({len(imgs)})")
    phs = pg.eval_on_selector_all("[data-placeholder]", "es => es.map(e => e.getAttribute('data-placeholder'))")
    check(sum(1 for x in phs if x.startswith("Foto:")) == 4, f"4 Bildplatzhalter mit Motiv ({[x[:40] for x in phs if x.startswith('Foto:')]})")
    # interne Links → HTTP 200
    hrefs = sorted(set(pg.eval_on_selector_all("a[href]", "as => as.map(a => a.href)")))
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
    ext = sorted({h.split('/')[2] for h in hrefs if h.startswith('http') and not h.startswith(BASE)})
    print("     externe Linkziele:", ext)
    # Sprungmarke
    pg.click('main a[href="#screening"]'); pg.wait_for_timeout(900)
    top = pg.evaluate("document.getElementById('screening').getBoundingClientRect().top")
    check(-5 <= top <= 260, f"'So funktioniert das Screening' springt zu #screening (top={round(top)})")
    # FAQ: sichtbar == Schema
    pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(500)
    schemas = ld(pg)
    types = [s.get("@type") for s in schemas]
    check(all("_invalid" not in s for s in schemas), f"alle JSON-LD-Blöcke gültiges JSON ({types})")
    faq = next((s for s in schemas if s.get("@type") == "FAQPage"), None)
    vis_q = pg.eval_on_selector_all("#faq button[aria-expanded]", "bs => bs.map(b => b.textContent.trim())")
    sch_q = [q["name"] for q in faq["mainEntity"]] if faq else []
    check(len(vis_q) == 13 and vis_q == sch_q, f"FAQ: 13 sichtbar == Schema ({len(vis_q)}/{len(sch_q)})")
    check(all(q.get("acceptedAnswer", {}).get("text") for q in (faq or {}).get("mainEntity", [])), "FAQ-Schema: jede Frage mit Antwort")
    bc = next((s for s in schemas if s.get("@type") == "BreadcrumbList"), None)
    vis_bc = pg.eval_on_selector_all('nav[aria-label="Brotkrumen"] li', "ls => ls.map(l => l.textContent.trim())")
    check(bc and [i["name"] for i in bc["itemListElement"]] == vis_bc and bc["itemListElement"][-1]["item"] == SITE + PAGE, f"BreadcrumbList == sichtbare Brotkrumen {vis_bc}")
    mb = next((s for s in schemas if s.get("@type") == "MedicalBusiness"), None)
    mb_ok = mb and mb.get("telephone") == "+43" + "3168409050" and mb["address"]["postalCode"] == "8010" and "priceRange" not in mb and "aggregateRating" not in mb and "review" not in mb
    check(bool(mb_ok), "MedicalBusiness: Telefon/Adresse, keine Preise/Bewertungen")
    wp = next((s for s in schemas if s.get("@type") == "MedicalWebPage"), None)
    check(wp and wp["url"] == SITE + PAGE and wp["about"]["@type"] == "MedicalProcedure", "MedicalWebPage + MedicalProcedure")
    blob = json.dumps(schemas, ensure_ascii=False).lower()
    check(not any(w in blob for w in ["tomosynth", "3d-mammo", "3d mammo", "rating", "award"]), "strukturierte Daten ohne Tomosynthese/Bewertungen/Auszeichnungen")
    # Tastatur
    pg.keyboard.press("Tab")
    check(pg.evaluate("document.activeElement.textContent") == "Zum Inhalt springen", "Tastatur: erster Tab = Skip-Link")
    seen, ok_ring = [], True
    for _ in range(25):
        pg.keyboard.press("Tab")
        info = pg.evaluate("(() => { const e = document.activeElement; const cs = getComputedStyle(e); return [e.textContent.trim().slice(0, 30), cs.outlineStyle, cs.outlineWidth]; })()")
        seen.append(info[0])
        if info[1] == "none" or info[2] == "0px":
            ok_ring = False
    check(ok_ring, "Fokusrahmen sichtbar bei 25 Tab-Stopps")
    check(any("Mammographie-Termin buchen" in s for s in seen), f"Terminbutton per Tastatur erreichbar ({seen})")
    q = pg.locator("#faq button[aria-expanded]").first
    q.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(150)
    check(q.get_attribute("aria-expanded") == "true", "FAQ per Tastatur (Enter) aufklappbar")
    # Kontrast + a11y (axe-core, WCAG 2 AA)
    for scheme in ["light", "dark"]:
        c2 = b.new_context(viewport={"width": 1440, "height": 900}, color_scheme=scheme); p2 = c2.new_page()
        p2.goto(BASE + PAGE, wait_until="networkidle"); p2.wait_for_timeout(500)
        p2.evaluate("() => document.querySelectorAll('#faq button[aria-expanded=false]').forEach(b => b.click())")
        p2.add_script_tag(content=AXE)
        res = p2.evaluate("async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return r.violations.map(v => [v.id, v.impact, v.nodes.length, v.nodes.slice(0,3).map(n => n.target.join(' '))]); }")
        check(not res, f"axe WCAG AA ({scheme}): {res}")
        c2.close()
    # Ladezeit/Bildgrößen (Handy)
    c3 = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, device_scale_factor=2); p3 = c3.new_page()
    p3.goto(BASE + PAGE, wait_until="networkidle"); p3.wait_for_timeout(800)
    perf = p3.evaluate("""(() => { const r = performance.getEntriesByType('resource'); const nav = performance.getEntriesByType('navigation')[0];
      const sum = t => r.filter(x => x.initiatorType === t).reduce((a, x) => a + (x.decodedBodySize || 0), 0);
      return { js: sum('script') + sum('link'), img: sum('img'), css: sum('css'), n: r.length, dcl: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd),
               imgs: r.filter(x => x.initiatorType === 'img').map(x => [x.name.split('/').pop(), x.decodedBodySize]) }; })()""")
    print("     Handy: Ressourcen", perf["n"], "| JS+CSS", round((perf["js"] + perf["css"]) / 1024), "KB (entpackt) | Bilder", round(perf["img"] / 1024), "KB", perf["imgs"], "| DOMContentLoaded", perf["dcl"], "ms")
    check(perf["img"] < 400 * 1024, "Bildgewicht Handy < 400 KB")
    c3.close()
    # Startseite: Mammographie-Karte, Hinweiszeile, Menü, Footer
    c4 = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2); p4 = c4.new_page()
    p4.goto(BASE + "/", wait_until="networkidle"); p4.wait_for_timeout(400)
    hb = p4.locator("main").inner_text()
    check("Brustkrebsvorsorge in Graz: Alle zwei Jahre ohne Zuweisung – für Frauen von 45 bis 74 mit automatisch freigeschalteter e-card." in hb, "Startseite: Hinweiszeile Brustkrebsvorsorge")
    card = p4.locator("#services article").first
    check("Mammographie & Brustgesundheit" in card.inner_text() and "Früherkennung gibt Sicherheit" in card.inner_text() and "Mammographie-Termin buchen" in card.inner_text(), "Startseite: Karte Titel/Text/CTA")
    check(card.locator("h3 a").get_attribute("href").endswith(PAGE), "Startseite: Karte verlinkt /mammographie-graz")
    check(not any(w.lower() in p4.locator("body").inner_text().lower() for w in ["Tomosynth", "3D-Mammo", "3D Mammo"]), "Startseite: keine Tomosynthese/3D")
    p4.get_by_role("button", name="Menü").click(); p4.wait_for_timeout(300)
    ml = p4.get_by_role("dialog").get_by_role("link", name="Mammographie & Brustgesundheit")
    check(ml.get_attribute("href").endswith(PAGE), "Handy-Menü: Link Mammographie & Brustgesundheit")
    ml.click(); p4.wait_for_timeout(800)
    check(p4.url.endswith(PAGE) and p4.locator("h1").inner_text() == H1, "Handy-Menü führt zur Seite")
    fl = p4.locator("footer").get_by_role("link", name="Mammographie & Brustgesundheit")
    check(fl.count() == 1 and fl.get_attribute("href").endswith(PAGE), "Footer-Link Mammographie")
    c4.close()
    c5 = b.new_context(viewport={"width": 1440, "height": 900}); p5 = c5.new_page()
    p5.goto(BASE + "/", wait_until="networkidle")
    dl = p5.locator('header nav[aria-label="Hauptnavigation"]').get_by_role("link", name="Mammographie & Brustgesundheit")
    check(dl.get_attribute("href").endswith(PAGE), "Desktop-Hauptmenü: Link")
    dl.click(); p5.wait_for_timeout(600)
    check(p5.locator('header nav[aria-label="Hauptnavigation"] a[aria-current="page"]').inner_text() == "Mammographie & Brustgesundheit", "Desktop-Hauptmenü: aktiv markiert")
    c5.close()
    b.close()

print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
