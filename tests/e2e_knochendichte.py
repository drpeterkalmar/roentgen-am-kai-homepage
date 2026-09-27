#!/usr/bin/env python3
"""Qualitätskontrolle Knochendichte-Seite /knochendichtemessung-graz (Playwright, headless, axe-core).
Voraussetzung: `npm run build` und `npx vite preview --port 4174`.
"""
import json, sys, pathlib, urllib.request
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
SITE = "https://www.xn--rntgen-am-kai-imb.at"
PAGE = "/knochendichtemessung-graz"
OLD = "/unser-angebot/knochendichte"
TEL = "tel:+43" + "3168409050"
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
TITLE = "Knochendichtemessung Graz mit DEXA | Röntgen am Kai"
DESC = "DEXA-Knochendichtemessung in Graz zur Osteoporose-Früherkennung. ÖGK-Privatleistung um 70 Euro, andere Kassen nach den jeweiligen Voraussetzungen."
H1 = "Knochendichtemessung in Graz mit DEXA"
FAQ_N = 16
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
    # --- 1. Statisches HTML: Meta, Canonical, OG, H1, Weiterleitung, Sitemap ---
    html = urllib.request.urlopen(BASE + PAGE).read().decode()
    check(f"<title>{TITLE}</title>" in html, "statisch: <title>")
    check(f'<meta name="description" content="{DESC}">' in html, "statisch: meta description")
    check(f'<link rel="canonical" href="{SITE}{PAGE}"' in html, "statisch: canonical")
    check(f'property="og:title" content="{TITLE}"' in html and f'property="og:description" content="{DESC}"' in html, "statisch: og:title + og:description")
    check('property="og:image"' in html and f'property="og:url" content="{SITE}{PAGE}"' in html, "statisch: og:image + og:url")
    check(html.count("<h1") == 1 and H1 in html, "statisch: genau eine H1 mit Soll-Text")
    r = urllib.request.urlopen(BASE + OLD).read().decode()
    check(f"url=/roentgen-am-kai-homepage{PAGE}" in r and f'rel="canonical" href="{SITE}{PAGE}"' in r, f"Weiterleitung statisch {OLD} -> {PAGE}")
    sm = urllib.request.urlopen(BASE + "/sitemap.xml").read().decode()
    check(f"{SITE}{PAGE}</loc>" in sm and OLD not in sm, "sitemap: neue URL drin, alte URL nicht")

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
          const m = document.querySelector('main'); const lis = [...m.querySelectorAll('ul[aria-label="Auf einen Blick"] li')];
          const f = t => lis.some(l => l.textContent.includes(t) && inV(l));
          return { h1: inV(m.querySelector('h1')), dexa: f('Untersuchung mit DEXA'), schmerzlos: f('Schmerzlos'), dosis: f('Geringe Strahlenbelastung'),
                   preis: f('Preis für ÖGK-Versicherte: 70 Euro'),
                   termin: [...m.querySelectorAll('a[data-cta=booking]')].some(a => a.textContent.includes('DEXA-Termin buchen') && inV(a)) }; }""", vh - bar)
        check(all(first.values()), f"[{label}] erster Bildschirm (H1, 3 Fakten, Preis, Terminbutton): {first}")
        combo = pg.evaluate("""(lim) => { const a = [...document.querySelectorAll('main a')].find(x => x.textContent.includes('Mammographie und Knochendichte gemeinsam buchen'));
          if (!a) return null; const r = a.getBoundingClientRect(); return Math.round(r.bottom - lim); }""", vh - bar)
        print(f"     [{label}] Kombi-Button unterkante relativ zum Bildschirmende: {combo}px")
        ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vw}")
        check(ow <= 0, f"[{label}] kein horizontales Scrollen ({ow}px)")
        check(not errs, f"[{label}] keine JS-Fehler {errs[:1]}")
        pg.screenshot(path=f"/tmp/dexa-{label.replace(' ', '-')}.png", full_page=True)
        c.close()

    # --- 3. Desktop-Detailprüfung ---
    c = b.new_context(viewport={"width": 1440, "height": 900}); pg = c.new_page()
    pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(500)
    check(pg.title() == TITLE, f"Laufzeit-Titel {pg.title()!r}")
    check(pg.eval_on_selector('meta[name=description]', 'e => e.content') == DESC, "Laufzeit-Description")
    check(pg.eval_on_selector('link[rel=canonical]', 'e => e.href') == SITE + PAGE, "Laufzeit-Canonical")
    body = pg.locator("body").inner_text()
    low = body.lower()
    bad = [w for w in ["goldstandard", "beste methode", "bestes verfahren", "einzige von der who", "strahlungsfrei", "strahlenfrei",
                       "bei jedem röntgen", "rho diagnostiziert", "ki diagnostiziert", "garantierte", "garantiert erstattet",
                       "jede frau ab 50", "alle frauen ab 50", "tomosynth"] if w in low]
    check(not bad, f"keine verbotenen Aussagen {bad}")
    body = body.replace("\u00ad", "").replace("\u2011", "-")
    must = ["Knochendichtemessung in Graz mit DEXA", "Osteoporose früh erkennen und das persönliche Knochenrisiko besser einschätzen",
            "DEXA-Termin buchen", "Mammographie und Knochendichte gemeinsam buchen",
            "Warum Knochendichtemessung mit DEXA?", "wissenschaftlich etablierte Standard- und Referenzmethode", "T-Score", "Z-Score",
            "ersetzt keine ärztliche Gesamtbeurteilung",
            "Kosten und Kostenübernahme",
            "Für ÖGK-Versicherte wird die DEXA-Knochendichtemessung als Privatleistung angeboten. Der Preis beträgt 70 Euro. Abhängig von den individuellen Voraussetzungen kann eine teilweise oder vollständige Kostenerstattung möglich sein. Eine Rückerstattung kann nicht garantiert werden.",
            "Bei den übrigen von uns betreuten Krankenversicherungsträgern kann die Untersuchung bei Vorliegen der erforderlichen ärztlichen Zuweisung als Kassenleistung abgerechnet werden.",
            "Bitte informieren Sie sich bei Unsicherheit vor der Terminvereinbarung bei unserer Ordination oder Ihrem Versicherungsträger.",
            "Wann ist eine Knochendichtemessung sinnvoll?",
            "Nicht jede Person benötigt automatisch ab einem bestimmten Alter eine DEXA. Ab dem 50. Lebensjahr ist jedoch eine persönliche Einschätzung des Osteoporoserisikos sinnvoll. Bei erhöhtem Risiko kann eine Knochendichtemessung zur weiteren Abklärung angezeigt sein.",
            "Kurzer Risikocheck", "Persönliches Knochenrisiko abklären",
            "Brustgesundheit und Knochengesundheit gemeinsam im Blick",
            "Mit zunehmendem Alter gewinnen sowohl Brustkrebsfrüherkennung als auch Knochengesundheit an Bedeutung. Bei Röntgen am Kai können Mammographie und DEXA-Knochendichtemessung nach Möglichkeit an einem gemeinsamen Termin durchgeführt werden.",
            "Gemeinsamen Termin anfragen", "Nur eine Terminvereinbarung", "Nur eine Anfahrt",
            "Zusätzlicher Blick auf die Knochengesundheit bei geeigneten Röntgenaufnahmen",
            "Geeignete Röntgenaufnahmen werden bei Personen ab 50 zusätzlich auf Hinweise für eine möglicherweise niedrige Knochendichte analysiert.",
            "keine zusätzliche Aufnahme und keine zusätzliche", "Das Ergebnis ist keine Osteoporosediagnose.",
            "Ablauf der Knochendichtemessung", "Schwangerschaft", "Metallteile",
            "Das Messergebnis allein ist keine Therapieempfehlung.", "Häufige Fragen zur Knochendichtemessung",
            "Nicht verwechseln: DEXA-Körperanalyse"]
    missing = [m for m in must if m not in body]
    check(not missing, f"alle Abschnitte/Pflichtsätze vorhanden {missing}")
    check(body.count("70 Euro") >= 4, f"Preis 70 Euro mehrfach sichtbar ({body.count('70 Euro')}×)")
    heads = pg.eval_on_selector_all("main h1, main h2, main h3, main h4", "hs => hs.map(h => [+h.tagName[1], h.textContent.trim()])")
    jumps = [(a, b2) for a, b2 in zip(heads, heads[1:]) if b2[0] - a[0] > 1]
    check(sum(1 for h in heads if h[0] == 1) == 1 and heads[0][0] == 1 and not jumps, f"Überschriftenhierarchie ({len(heads)} Überschriften, Sprünge {jumps})")
    print("     H2:", [h[1] for h in heads if h[0] == 2])
    books = pg.eval_on_selector_all('a[data-cta="booking"]', 'as => as.map(a => [a.textContent.trim(), a.getAttribute("href"), a.target, a.rel])')
    check(len(books) >= 4 and all(x[1] == BOOK and x[2] == "_blank" and "noopener" in x[3] for x in books), f"Terminbuttons ({len(books)}): {[x[0][:30] for x in books]}")
    tels = pg.eval_on_selector_all('main a[href^="tel:"], footer a[href^="tel:"]', 'as => as.map(a => a.getAttribute("href"))')
    check(len(tels) >= 3 and all(t == TEL for t in tels), f"tel-Links ({len(tels)}) alle = Praxisnummer")
    # Kombibutton führt zu #gemeinsam, dort Telefon-CTA + Link zur Mammographie
    pg.click('main a[href="#gemeinsam"] >> nth=0'); pg.wait_for_timeout(1800)
    top = pg.evaluate("document.getElementById('gemeinsam').getBoundingClientRect().top")
    check(-5 <= top <= 260, f"'gemeinsam buchen' springt zu #gemeinsam (top={round(top)})")
    sec = pg.locator("#gemeinsam")
    check(sec.locator('a[href^="tel:"]', has_text="Gemeinsamen Termin anfragen").count() == 1, "Kombi: 'Gemeinsamen Termin anfragen' = Anruf")
    check(sec.locator('a[href$="/mammographie-graz"]').count() >= 1, "Kombi: Link zu Mammographie & Brustgesundheit")
    # Interne Links → 200 und Pflichtziele vorhanden
    hrefs = sorted(set(pg.eval_on_selector_all("a[href]", "as => as.map(a => a.href)")))
    for need in ["/mammographie-graz", "/kontakt", "/ratgeber", "/koerperanalyse-graz"]:
        check(any(h.split("#")[0].endswith(need) for h in hrefs), f"interner Link vorhanden: {need}")
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
    ext = sorted({h.split('/')[2] for h in hrefs if h.startswith('http') and not h.startswith(BASE)})
    print("     externe Linkziele:", ext)
    check({"www.gesundheit.gv.at", "iscd.org", "www.imagebiopsy.com"} <= set(ext), "Quellen verlinkt: gesundheit.gv.at, ISCD, ImageBiopsy Lab")

    # --- 4. Risikocheck ---
    rc = pg.locator("form[aria-labelledby]").first
    n_q = rc.locator("fieldset").count()
    check(n_q == 9, f"Risikocheck: {n_q} Fragen")
    rc.get_by_role("button", name="Ergebnis anzeigen").click(); pg.wait_for_timeout(150)
    check(pg.locator("[data-risk-result=none]").count() == 1 and "keine Diagnose" in pg.locator("[data-risk-result]").inner_text(), "Risikocheck: 0× Ja → neutraler Hinweis, 'keine Diagnose'")
    fs = rc.locator("fieldset")
    fs.nth(0).get_by_text("Ja", exact=True).click(); fs.nth(3).get_by_text("Ja", exact=True).click()
    rc.get_by_role("button", name="Ergebnis anzeigen").click(); pg.wait_for_timeout(150)
    res = pg.locator("[data-risk-result]")
    check(res.get_attribute("data-risk-result") == "several" and res.locator('a[href^="tel:"]', has_text="Persönliches Knochenrisiko abklären").count() == 1,
          "Risikocheck: 2× Ja → Beratung + CTA 'Persönliches Knochenrisiko abklären'")
    check("Osteoporose haben" not in res.inner_text() and "Sie haben Osteoporose" not in res.inner_text(), "Risikocheck: keine Diagnose-Formulierung")
    # Tastatur im Risikocheck
    pg.locator("form[aria-labelledby] input[type=radio]").first.focus(); pg.keyboard.press("Space"); pg.wait_for_timeout(100)
    check(pg.locator("form[aria-labelledby] input[type=radio]").first.is_checked(), "Risikocheck per Tastatur bedienbar")

    # --- 5. Strukturierte Daten ---
    pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(500)
    schemas = ld(pg)
    types = [s.get("@type") for s in schemas]
    check(all("_invalid" not in s for s in schemas), f"alle JSON-LD-Blöcke gültiges JSON ({types})")
    check(sorted(types) == sorted(["BreadcrumbList", "MedicalWebPage", "MedicalBusiness", "FAQPage"]), f"Schema-Typen {types}")
    faq = next((s for s in schemas if s.get("@type") == "FAQPage"), None)
    vis_q = pg.eval_on_selector_all("#faq button[aria-expanded]", "bs => bs.map(b => b.textContent.trim())")
    sch_q = [q["name"] for q in faq["mainEntity"]] if faq else []
    check(len(vis_q) == FAQ_N and vis_q == sch_q, f"FAQ: {FAQ_N} sichtbar == Schema ({len(vis_q)}/{len(sch_q)})")
    # sichtbare Antworten == Schema-Antworten
    pg.evaluate("() => document.querySelectorAll('#faq button[aria-expanded=false]').forEach(b => b.click())"); pg.wait_for_timeout(200)
    vis_a = pg.eval_on_selector_all("#faq [role=region]", "rs => rs.map(r => r.textContent.trim())")
    sch_a = [q["acceptedAnswer"]["text"] for q in faq["mainEntity"]] if faq else []
    check(vis_a == sch_a, "FAQ: sichtbare Antworten == Schema-Antworten")
    faq_txt = " ".join(vis_a)
    check("Mikrosievert" in faq_txt and "0,001 mSv" in faq_txt and "drei Stunden natürlicher Hintergrundstrahlung" in faq_txt and "deutlich geringer als bei einer üblichen Röntgenaufnahme" in faq_txt,
          "FAQ Strahlenbelastung: Wortlaut + Vergleich Röntgen")
    check("kein fixes Intervall" in faq_txt and "Ausgangswert" in faq_txt and "Therapie" in faq_txt, "FAQ Wiederholung: kein pauschales Intervall")
    bc = next((s for s in schemas if s.get("@type") == "BreadcrumbList"), None)
    vis_bc = pg.eval_on_selector_all('nav[aria-label="Brotkrumen"] li', "ls => ls.map(l => l.textContent.trim())")
    check(bc and [i["name"] for i in bc["itemListElement"]] == vis_bc and bc["itemListElement"][-1]["item"] == SITE + PAGE, f"BreadcrumbList == sichtbare Brotkrumen {vis_bc}")
    mb = next((s for s in schemas if s.get("@type") == "MedicalBusiness"), None)
    mb_ok = mb and mb.get("telephone") == "+43" + "3168409050" and mb["address"]["postalCode"] == "8010" and not any(k in mb for k in ["priceRange", "aggregateRating", "review", "award"])
    check(bool(mb_ok), "MedicalBusiness: Telefon/Adresse, keine Preise/Bewertungen/Auszeichnungen")
    wp = next((s for s in schemas if s.get("@type") == "MedicalWebPage"), None)
    check(wp and wp["url"] == SITE + PAGE and wp["about"]["@type"] == "MedicalProcedure" and "DEXA" in wp["about"]["name"], "MedicalWebPage + MedicalProcedure (DEXA)")
    blob = json.dumps(schemas, ensure_ascii=False).lower()
    check(not any(w in blob for w in ["rating", "award", "goldstandard", "strahlungsfrei"]), "strukturierte Daten ohne Bewertungen/Auszeichnungen/Übertreibungen")

    # --- 6. Tastatur/Fokus ---
    pg.keyboard.press("Tab")
    check(pg.evaluate("document.activeElement.textContent") == "Zum Inhalt springen", "Tastatur: erster Tab = Skip-Link")
    seen, ok_ring = [], True
    for _ in range(25):
        pg.keyboard.press("Tab")
        info = pg.evaluate("(() => { const e = document.activeElement; const cs = getComputedStyle(e); return [e.textContent.trim().slice(0, 40), cs.outlineStyle, cs.outlineWidth]; })()")
        seen.append(info[0])
        if info[1] == "none" or info[2] == "0px":
            ok_ring = False
    check(ok_ring, "Fokusrahmen sichtbar bei 25 Tab-Stopps")
    check(any("DEXA-Termin buchen" in s for s in seen) and any("Knochendichte gemeinsam" in s for s in seen), "Beide Hero-Buttons per Tastatur erreichbar")
    pg.goto(BASE + PAGE, wait_until="networkidle"); pg.wait_for_timeout(300)
    q = pg.locator("#faq button[aria-expanded]").first
    q.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(150)
    check(q.get_attribute("aria-expanded") == "true", "FAQ per Tastatur (Enter) aufklappbar")

    # --- 7. Kontrast + a11y (axe-core, WCAG 2 AA), hell + dunkel, mit Risikocheck-Ergebnis ---
    for scheme in ["light", "dark"]:
        c2 = b.new_context(viewport={"width": 1440, "height": 900}, color_scheme=scheme); p2 = c2.new_page()
        p2.goto(BASE + PAGE, wait_until="networkidle"); p2.wait_for_timeout(500)
        p2.evaluate("() => document.querySelectorAll('#faq button[aria-expanded=false]').forEach(b => b.click())")
        f2 = p2.locator("form[aria-labelledby] fieldset")
        f2.nth(0).get_by_text("Ja", exact=True).click(); f2.nth(1).get_by_text("Ja", exact=True).click(); f2.nth(2).get_by_text("Nein", exact=True).click()
        p2.get_by_role("button", name="Ergebnis anzeigen").click(); p2.wait_for_timeout(150)
        p2.add_script_tag(content=AXE)
        res = p2.evaluate("async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return r.violations.map(v => [v.id, v.impact, v.nodes.length, v.nodes.slice(0,3).map(n => n.target.join(' '))]); }")
        check(not res, f"axe WCAG AA ({scheme}): {res}")
        c2.close()

    # --- 8. Ladezeit/Bildgrößen (Handy) ---
    c3 = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, device_scale_factor=2); p3 = c3.new_page()
    p3.goto(BASE + PAGE, wait_until="networkidle"); p3.wait_for_timeout(800)
    perf = p3.evaluate("""(() => { const r = performance.getEntriesByType('resource'); const nav = performance.getEntriesByType('navigation')[0];
      const sum = t => r.filter(x => x.initiatorType === t).reduce((a, x) => a + (x.decodedBodySize || 0), 0);
      return { js: sum('script') + sum('link'), img: sum('img'), css: sum('css'), n: r.length, dcl: Math.round(nav.domContentLoadedEventEnd),
               imgs: r.filter(x => x.initiatorType === 'img').map(x => [x.name.split('/').pop(), x.decodedBodySize]) }; })()""")
    print("     Handy: Ressourcen", perf["n"], "| JS+CSS", round((perf["js"] + perf["css"]) / 1024), "KB (entpackt) | Bilder", round(perf["img"] / 1024), "KB", perf["imgs"], "| DOMContentLoaded", perf["dcl"], "ms")
    check(perf["img"] < 400 * 1024, "Bildgewicht Handy < 400 KB")
    check(all("mobile" in n for n, _ in perf["imgs"] if n.startswith("knochendichte")), "Handy lädt Bild-Variante '-mobile'")
    c3.close()

    # --- 9. Menü, Footer, Startseite ---
    c4 = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2); p4 = c4.new_page()
    p4.goto(BASE + "/", wait_until="networkidle"); p4.wait_for_timeout(400)
    p4.get_by_role("button", name="Menü").click(); p4.wait_for_timeout(300)
    ml = p4.get_by_role("dialog").get_by_role("link", name="Knochendichte", exact=True)
    check(ml.get_attribute("href").endswith(PAGE), "Handy-Menü: 'Knochendichte' → neue URL")
    ml.click(); p4.wait_for_timeout(800)
    check(p4.url.endswith(PAGE) and p4.locator("h1").inner_text().replace("\u00ad", "") == H1, "Handy-Menü führt zur Seite")
    p4.goto(BASE + "/", wait_until="networkidle"); p4.wait_for_timeout(300)
    check(p4.locator(f'main a[href$="{PAGE}"]').count() >= 1 and p4.locator(f'main a[href$="{OLD}"]').count() == 0, "Startseite verlinkt neue URL, nicht die alte")
    check(p4.locator(f'footer a[href$="{PAGE}"]').count() >= 1, "Footer verlinkt neue URL")
    c4.close()
    c5 = b.new_context(viewport={"width": 1440, "height": 900}); p5 = c5.new_page()
    p5.goto(BASE + OLD, wait_until="networkidle"); p5.wait_for_timeout(800)
    check(p5.url.endswith(PAGE), f"alte URL leitet im Browser weiter ({p5.url})")
    dl = p5.locator('header nav[aria-label="Hauptnavigation"] a[aria-current="page"]')
    check(dl.count() == 1 and dl.inner_text() == "Knochendichte", "Desktop-Hauptmenü: 'Knochendichte' aktiv")
    c5.close()
    b.close()

print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
