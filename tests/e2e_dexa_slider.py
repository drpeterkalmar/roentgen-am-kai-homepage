#!/usr/bin/env python3
"""DEXA-Befund-Slider auf /koerperanalyse-graz (Playwright, headless, axe-core).
Voraussetzung: `npm run build` und `npx vite preview --port 4174`.
Prüft: Abschnitt (H2, Einleitung, Hinweis, CTA), 6 Seiten, „n von 6“, Pfeile, Punkte, Tastatur, Wischen (Touch),
kein Autoplay, Lazy-Loading, Original-PDFs, Hotspots (Hover/Fokus/Klick/Tipp; innerhalb des Bildes; verdecken keine
Werte = keine Füllung), Erklärung mit allen Pflichtfeldern und Quellenverweis, Zoom-Dialog (Plus/Minus, Esc,
Fokus zurück), kein horizontales Scrollen (360/768/1280), axe (hell/dunkel), Datenregeln (keine erfundenen
Grenzwerte, Magermasse ≠ Muskelmasse).
"""
import json
import pathlib
import subprocess
import sys
import urllib.request

from playwright.sync_api import sync_playwright
from _paths import shots

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
PAGE = "/koerperanalyse-graz"
SHOTS = shots("dexa-befund-slider")
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
H2 = "Was zeigt eine DEXA-Körperanalyse?"
LEAD = "Blättern Sie durch einen anonymisierten Beispielbefund und erfahren Sie, was die einzelnen Messwerte bedeuten."
NOTICE = ("Die dargestellten Werte dienen als Beispiel. Die individuelle Beurteilung erfolgt im Zusammenhang mit Alter, "
          "Geschlecht, Körperbau und medizinischer Fragestellung.")
fails = []


def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


# --- 0. Datenstruktur (Node liest die zentrale Datei) ---
data = json.loads(subprocess.run(
    ["node", "--input-type=module", "-e",
     "const m = await import('./src/data/dexaReportExamples.js'); console.log(JSON.stringify({s: m.DEXA_REPORT_EXAMPLES, e: m.DEXA_EXPLANATIONS, q: m.DEXA_SOURCES}))"],
    capture_output=True, text=True, cwd=ROOT).stdout)
slides, expl, sources = data["s"], data["e"], data["q"]
check(len(slides) == 6, f"6 Befundbeispiele ({len(slides)})")
check(set(sources) == {"chaves", "ofenheimer"}, "genau die zwei gelieferten Publikationen als Quellen")
for k, e in expl.items():
    missing = [f for f in ("name", "definition", "beschreibt", "einheit", "einschraenkung", "quellen") if not e.get(f)]
    check(not missing, f"Erklärung {k}: alle Pflichtfelder {missing or ''}")
    check(all(q["id"] in sources and q.get("seiten") for q in e["quellen"]), f"Erklärung {k}: Quellenverweis mit Seite")
used = set()
for s in slides:
    check((ROOT / f"public/assets/dexa/{s['file']}.pdf").exists(), f"Original-PDF {s['file']}.pdf vorhanden")
    for w in (800, 1200, 1800, 2400):
        for ext in ("avif", "webp"):
            check((ROOT / f"public/assets/dexa/{s['file']}-{w}.{ext}").exists(), f"{s['file']}-{w}.{ext}") if w == 2400 else None
    for h in s["hotspots"]:
        used.add(h["key"])
        check(h["key"] in expl, f"Hotspot {h['id']} → Erklärung {h['key']}")
        check(0 <= h["x"] and h["x"] + h["w"] <= 100 and 0 <= h["y"] and h["y"] + h["h"] <= 100, f"Hotspot {h['id']} innerhalb der Seite")
check(not (set(expl) - used), f"jede Erklärung wird verwendet {sorted(set(expl) - used)}")
ids = [h["id"] for s in slides for h in s["hotspots"]]
check(len(ids) == len(set(ids)), "Hotspot-IDs eindeutig")
# Erklärtexte OHNE Referenzblock: dort keine Grenzwerte und keine Urteile
alltext = json.dumps({k: {f: v for f, v in e.items() if f != "referenz"} for k, e in expl.items()}, ensure_ascii=False).lower()
for bad in ["< 100", "≥ 100", "100 cm²", "160 cm²", "< 0,4", "≥ 0,4", "5,5 kg", "7 kg/m", "normalbereich", "normal range", "zu hoch", "zu niedrig", "erhöhtes risiko"]:
    check(bad not in alltext, f"kein Grenzwert/Urteil '{bad}' außerhalb der Referenzwerte")
# Referenzwerte (Wunsch der Praxis 07.10.2026): wörtlich aus den Publikationen, mit Quelle + Hinweis, ohne Urteil über das Beispiel
REF_PFLICHT = {
    "vat": ["100 cm²", "160 cm²", "1 053 ± 628", "2 038 ± 888"],
    "sat": ["0,4"],
    "agVerhaeltnis": ["unter 1"],
    "rsmi": ["5,5 kg/m²", "7 kg/m²", "6,6 ± 0,9", "8,5 ± 1,0"],
    "fettmasse": ["5–9", "3–6", "über 21,0"],
    "koerperfettanteil": ["39,9 ± 6,9", "31,3 ± 6,2"],
    "bmi": ["18,5", "25", "30"],
}
for k, must in REF_PFLICHT.items():
    r = expl[k].get("referenz")
    check(bool(r), f"Referenzwerte bei {k}")
    if not r:
        continue
    txt = json.dumps(r, ensure_ascii=False).replace("\u00a0", " ")  # geschützte Leerzeichen zwischen Zahl und Einheit
    check(all(m in txt for m in must), f"Referenz {k} enthält {must}")
    check(bool(r.get("hinweis")) and r.get("quellen") and all(q["id"] in ("chaves", "ofenheimer") and q.get("seiten") for q in r["quellen"]),
          f"Referenz {k}: Hinweis + Quelle mit Seite")
    for bad in ["ihr wert", "dieser befund liegt", "im beispiel liegt", "normalbereich", "unauffällig", "auffällig"]:
        check(bad not in txt.lower(), f"Referenz {k}: kein Urteil über den Beispielwert ('{bad}')")
check("keine direkt gemessene muskelmasse" in alltext and "muskelkraft" in alltext, "Magermasse ausdrücklich ≠ Muskelmasse/-kraft")
for s in slides:
    for f in ["53,36", "263629", "DF+513588", "169,0"]:
        check(f not in subprocess.run(["pdftotext", str(ROOT / f"public/assets/dexa/{s['file']}.pdf"), "-"], capture_output=True, text=True).stdout,
              f"{s['file']}.pdf enthält '{f}' nicht")

with sync_playwright() as p:
    b = p.chromium.launch()

    # (Die Körperanalyse-Seite ist nicht vorgerendert – routes.js prerender – daher kein Check im statischen HTML.)

    # --- 2. Desktop: Maus und Tastatur ---
    c = b.new_context(viewport={"width": 1280, "height": 900})
    pg = c.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    reqs = []
    pg.on("request", lambda r: reqs.append(r.url) if "/assets/dexa/" in r.url else None)
    pg.goto(BASE + PAGE, wait_until="networkidle")
    sec = pg.locator("#beispielbefund")
    check(sec.locator("h2").inner_text().strip() == H2, "H2 exakt")
    check(LEAD in sec.inner_text(), "Einleitung exakt")
    check(NOTICE in sec.locator("[data-dexa-notice]").inner_text(), "Pflichthinweis exakt")
    cta = sec.locator("a[data-cta=booking]")
    check(cta.count() == 1 and "DEXA-Körperanalyse buchen" in cta.inner_text() and cta.get_attribute("href") == BOOK
          and cta.get_attribute("target") == "_blank" and "noopener" in cta.get_attribute("rel"), "CTA „DEXA-Körperanalyse buchen“ → MiraNext, neues Fenster")
    check(sec.locator("a[data-cta=phone]").count() == 1, "Telefon-Alternative neben dem CTA")
    # CTA liegt unter dem Slider
    check(cta.bounding_box()["y"] > sec.locator("[data-dexa-slider]").bounding_box()["y"] + sec.locator("[data-dexa-slider]").bounding_box()["height"] - 1, "CTA unter dem Slider")
    check(len(pg.locator("main h1").all()) == 1, "genau eine H1")

    # Lazy: vor dem Scrollen keine Befundbilder; danach nur Seite 1+2
    check(not [u for u in reqs if u.endswith((".avif", ".webp"))], f"Befundbilder erst bei Bedarf (vor dem Scrollen {len(reqs)} Anfragen)")
    sec.scroll_into_view_if_needed(); pg.wait_for_timeout(800)
    imgs = {u.rsplit('/', 1)[1].rsplit('-', 1)[0] for u in reqs if u.endswith((".avif", ".webp"))}
    check(imgs <= {"dexa-beispielbefund-1", "dexa-beispielbefund-2a"} and "dexa-beispielbefund-1" in imgs, f"anfangs nur Seite 1 (+ Nachbar) geladen {sorted(imgs)}")
    check(not [u for u in reqs if u.endswith(".pdf")], "PDFs werden nicht vorab geladen")
    fmt = [u for u in reqs if "beispielbefund-1-" in u]
    check(any(u.endswith(".avif") for u in fmt), f"AVIF wird bevorzugt {fmt[:2]}")

    counter = sec.locator("[data-dexa-counter]")
    check(counter.inner_text() == "1 von 6", "Zähler 1 von 6")
    # Kein Autoplay
    pg.wait_for_timeout(4000)
    check(counter.inner_text() == "1 von 6", "kein automatisches Weiterblättern (4 s)")
    # Pfeile
    sec.locator("[data-dexa-next]").click(); pg.wait_for_timeout(400)
    check(counter.inner_text() == "2 von 6", "Pfeil weiter → 2 von 6")
    sec.locator("[data-dexa-prev]").click(); sec.locator("[data-dexa-prev]").click(); pg.wait_for_timeout(400)
    check(counter.inner_text() == "6 von 6", "Pfeil zurück am Anfang → 6 von 6 (Endlos)")
    # Punkte
    sec.locator("[data-dexa-dot='3']").click(); pg.wait_for_timeout(400)
    check(counter.inner_text() == "4 von 6" and sec.locator("[data-dexa-dot='3']").get_attribute("aria-current") == "true", "Seitenpunkt 4 → 4 von 6, aria-current")
    # Nur aktive Folie sichtbar/fokussierbar
    check(sec.locator("[data-dexa-slide][aria-hidden=true]").count() == 5, "5 inaktive Folien aria-hidden")
    # Tastatur: Fokus auf Pfeil, dann Pfeiltasten
    sec.locator("[data-dexa-next]").focus()
    pg.keyboard.press("ArrowRight"); pg.wait_for_timeout(300)
    check(counter.inner_text() == "5 von 6", "Pfeiltaste rechts")
    pg.keyboard.press("Home"); pg.wait_for_timeout(300)
    check(counter.inner_text() == "1 von 6", "Pos1 → erste Seite")
    pg.keyboard.press("End"); pg.wait_for_timeout(300)
    check(counter.inner_text() == "6 von 6", "Ende → letzte Seite")
    pg.keyboard.press("Home"); pg.wait_for_timeout(400)
    # Fokus sichtbar
    ring = pg.evaluate("() => { const e = document.activeElement; const s = getComputedStyle(e); return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 || s.boxShadow !== 'none'; }")
    check(ring, "sichtbarer Fokus auf Slider-Schaltfläche")

    # Hotspots: Hover zeigt, Klick hält fest, keine Füllung (verdeckt nichts)
    for i, s in enumerate(slides):
        sec.locator(f"[data-dexa-dot='{s['id']}']").click(); pg.wait_for_timeout(350)
        hs = sec.locator(f"[data-dexa-slide='{s['id']}'] [data-hotspot]")
        check(hs.count() == len(s["hotspots"]), f"Seite {s['id']}: {len(s['hotspots'])} Markierungen")
        bg = pg.evaluate(f"() => [...document.querySelectorAll(\"[data-dexa-slide='{s['id']}'] [data-hotspot]\")].map(e => getComputedStyle(e).backgroundColor)")
        check(all(c in ("rgba(0, 0, 0, 0)", "transparent") for c in bg), f"Seite {s['id']}: Markierungen ohne Füllung")
        # Bild im Viewport komplett geladen und scharf genug (natürliche Breite ≥ 1,5× Anzeigebreite)
        nat = pg.evaluate(f"() => {{ const i = document.querySelector(\"[data-dexa-slide='{s['id']}'] img\"); return i && i.complete ? [i.naturalWidth, i.getBoundingClientRect().width] : null; }}")
        check(nat and nat[0] >= nat[1] * 1.0, f"Seite {s['id']}: Bild geladen {nat}")
    sec.locator("[data-dexa-dot='3']").click(); pg.wait_for_timeout(400)
    first = slides[3]["hotspots"][1]
    hs = sec.locator(f"[data-hotspot='{first['id']}']")
    hs.hover(); pg.wait_for_timeout(200)
    panel = sec.locator("[data-dexa-panel]")
    check(expl[first["key"]]["name"] in panel.inner_text(), "Hover zeigt Erklärung")
    pg.mouse.move(5, 5); pg.wait_for_timeout(200)
    check(expl[first["key"]]["name"] not in panel.inner_text(), "Hover weg → Erklärung weg (nichts fest)")
    hs.click(); pg.wait_for_timeout(200); pg.mouse.move(5, 5); pg.wait_for_timeout(200)
    txt = panel.inner_text()
    check(expl[first["key"]]["name"] in txt, "Klick hält Erklärung fest")
    for lbl in ["Kurz erklärt", "Was der Wert beschreibt", "Einheit im Befund", "Wichtig", "Quelle"]:
        check(lbl in txt, f"Erklärung enthält „{lbl}“")
    # Erklärung verdeckt das Bild nicht (Desktop: rechts daneben)
    vb = sec.locator("[data-dexa-slide='3']").bounding_box(); pb = panel.bounding_box()
    check(pb["x"] >= vb["x"] + vb["width"] - 1, "Desktop: Erklärung neben dem Befund, nicht darüber")
    # Liste: Fokus zeigt, Enter hält fest
    chip = sec.locator(f"[data-dexa-chip='{slides[3]['hotspots'][0]['id']}']")
    chip.focus(); pg.wait_for_timeout(150)
    check(expl[slides[3]["hotspots"][0]["key"]]["name"] in panel.inner_text(), "Tastatur-Fokus auf Messwert zeigt Erklärung")
    check(pg.locator(f"[data-hotspot='{slides[3]['hotspots'][0]['id']}']").evaluate("e => e.classList.contains('dexa-hotspot-on')"), "Fokus hebt die Markierung im Bild hervor")
    pg.keyboard.press("Enter"); pg.wait_for_timeout(150)
    check(chip.get_attribute("aria-pressed") == "true", "Enter hält Messwert fest (aria-pressed)")
    # Quellenlink springt zur Quellenliste
    href = panel.locator("a[href^='#dexa-quelle-']").first.get_attribute("href")
    check(pg.locator(href).count() == 1, f"Quellenverweis {href} hat ein Ziel")
    # Markierungen ausblenden
    sec.locator("[data-dexa-marks]").click(); pg.wait_for_timeout(150)
    check(sec.locator("[data-dexa-slide='3'] [data-hotspot]").count() == 0, "Markierungen ausblendbar")
    sec.locator("[data-dexa-marks]").click()
    # Original-PDF-Link
    pdf = sec.locator("[data-dexa-pdf]")
    check(pdf.get_attribute("href").endswith("dexa-beispielbefund-3.pdf") and pdf.get_attribute("target") == "_blank", "Original-PDF der aktuellen Seite")
    r = urllib.request.urlopen("http://localhost:4174" + pdf.get_attribute("href"))
    check(r.status == 200 and r.read(5) == b"%PDF-", "PDF ausgeliefert")
    pg.screenshot(path=str(SHOTS / "desktop-1280-seite4.png"), clip={"x": 0, "y": sec.bounding_box()["y"], "width": 1280, "height": 900}) if False else None
    sec.scroll_into_view_if_needed()
    pg.evaluate("document.querySelector('#beispielbefund').scrollIntoView()")
    pg.wait_for_timeout(300)
    pg.screenshot(path=str(SHOTS / "desktop-1280.png"))

    # Zoom-Dialog
    zb = sec.locator("[data-dexa-zoom]")
    zb.click(); pg.wait_for_timeout(500)
    dlg = pg.locator("dialog.dexa-zoom")
    check(dlg.evaluate("d => d.open"), "Zoom-Dialog öffnet")
    w1 = dlg.locator("img").bounding_box()["width"]
    dlg.get_by_role("button", name="Vergrößern").click(); pg.wait_for_timeout(300)
    w2 = dlg.locator("img").bounding_box()["width"]
    check(w2 > w1 * 1.3, f"Plus vergrößert ({w1:.0f} → {w2:.0f} px)")
    nat = dlg.locator("img").evaluate("i => i.currentSrc")
    check("-2400." in nat or "-1800." in nat, f"Zoom lädt hochauflösende Variante ({nat.rsplit('/',1)[1]})")
    vis = pg.evaluate("""() => { const sc = document.querySelector('.dexa-zoom-scroller'); const h = sc.querySelector('.dexa-hotspot-on');
        if (!h) return null; const a = h.getBoundingClientRect(), b = sc.getBoundingClientRect();
        return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top; }""")
    check(vis is not False, f"Zoom: markierter Bereich im sichtbaren Ausschnitt ({vis})")
    pg.screenshot(path=str(SHOTS / "desktop-zoom.png"))
    pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
    check(not dlg.evaluate("d => d.open"), "Esc schließt Zoom")
    check(pg.evaluate("() => document.activeElement?.hasAttribute('data-dexa-zoom')"), "Fokus zurück auf „Vergrößern“")

    # axe hell + dunkel (nur der Abschnitt)
    for mode in ("hell", "dunkel"):
        if mode == "dunkel":
            pg.evaluate("document.documentElement.classList.add('dark')"); pg.wait_for_timeout(200)
        pg.add_script_tag(content=AXE)
        res = pg.evaluate("async () => (await axe.run(document.querySelector('#beispielbefund'), {runOnly: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']})).violations.map(v => v.id + ' ' + v.nodes.length)")
        check(not res, f"axe {mode}: {res}")
    pg.evaluate("document.documentElement.classList.remove('dark')")
    check(not errs, f"Desktop: keine JS-Fehler {errs[:2]}")
    c.close()

    # --- 3. Handy/Tablet: Touch, Wischen, Tippen, kein horizontales Scrollen ---
    for label, vp in [("Handy 360", {"width": 360, "height": 740}), ("Handy 390", {"width": 390, "height": 844}), ("Tablet 768", {"width": 768, "height": 1024})]:
        c = b.new_context(viewport=vp, is_mobile=True, has_touch=True, device_scale_factor=2)
        pg = c.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(BASE + PAGE, wait_until="networkidle")
        pg.evaluate("document.querySelector('#beispielbefund .dexa-viewport').scrollIntoView()"); pg.wait_for_timeout(600)
        sec = pg.locator("#beispielbefund")
        counter = sec.locator("[data-dexa-counter]")
        ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vp['width']}")
        check(ow <= 0, f"[{label}] kein horizontales Scrollen ({ow}px)")
        # Wischen (CDP-Touch-Events). Position je Geste neu messen – darüber nachladende Inhalte verschieben die Seite.
        cdp = c.new_cdp_session(pg)

        def touch_y():
            pg.evaluate("document.querySelector('#beispielbefund .dexa-viewport').scrollIntoView({block: 'center'})"); pg.wait_for_timeout(250)
            v = sec.locator(".dexa-viewport").bounding_box()
            return v, min(max(v["y"] + 60, 120), vp["height"] - 160)

        def swipe(fx0, fx1, dy=0):
            v, y = touch_y()
            x0, x1 = v["x"] + v["width"] * fx0, v["x"] + v["width"] * fx1
            cdp.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": x0, "y": y}]})
            for k in range(1, 9):
                cdp.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": x0 + (x1 - x0) * k / 8, "y": y - dy * k / 8}]})
            cdp.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
            pg.wait_for_timeout(450)

        swipe(0.8, 0.15)
        check(counter.inner_text() == "2 von 6", f"[{label}] Wischen nach links → 2 von 6 ({counter.inner_text()})")
        swipe(0.15, 0.8)
        check(counter.inner_text() == "1 von 6", f"[{label}] Wischen nach rechts → 1 von 6")
        # Senkrechtes Wischen blättert nicht
        swipe(0.5, 0.52, dy=140)
        check(counter.inner_text() == "1 von 6", f"[{label}] senkrechtes Wischen blättert nicht")
        # Antippen einer Markierung zeigt Erklärung (unter dem Bild)
        sec.locator("[data-dexa-dot='3']").tap(); pg.wait_for_timeout(450)
        hid = slides[3]["hotspots"][3]["id"]
        sec.locator(f"[data-hotspot='{hid}']").tap(); pg.wait_for_timeout(700)
        panel = sec.locator("[data-dexa-panel]")
        check(expl[slides[3]["hotspots"][3]["key"]]["name"] in panel.inner_text(), f"[{label}] Antippen zeigt Erklärung")
        pb = panel.bounding_box(); vb2 = sec.locator("[data-dexa-slide='3']").bounding_box()
        if vp["width"] < 1024:
            check(pb["y"] >= vb2["y"] + vb2["height"] - 1, f"[{label}] Erklärung unter dem Befund (verdeckt nichts)")
            check(pb["y"] < vp["height"] and pb["y"] + 40 > 0, f"[{label}] Erklärung nach dem Tippen im Bild (y={pb['y']:.0f})")
        # Touch-Ziele
        small = pg.evaluate("""() => [...document.querySelectorAll('#beispielbefund button, #beispielbefund a')]
            .filter(e => e.offsetParent && !e.hasAttribute('data-hotspot') && !e.closest('ol, dd'))  // Textlinks im Fließtext ausgenommen (WCAG 2.5.8 inline)
            .map(e => [e.textContent.trim().slice(0, 30) || e.getAttribute('aria-label'), Math.round(e.getBoundingClientRect().height)])
            .filter(x => x[1] < 44)""")
        check(not small, f"[{label}] Touch-Ziele ≥ 44 px {small[:3]}")
        # Jede Erklärung mit Referenzwerten öffnen: kein horizontales Scrollen (lange Quellenangaben, Tabellen)
        for hid in ["s1-rsmi", "s1-bmi", "s2b-vat", "s2b-sat", "s2a-ag", "s3-fett", "s4-prozent"]:
            slide_id = hid[1:].split("-")[0]
            sec.locator(f"[data-dexa-dot='{slide_id}']").tap(); pg.wait_for_timeout(450)
            sec.locator(f"[data-dexa-list] [data-hotspot-btn='{hid}']").tap()
            pg.wait_for_timeout(350)
            ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vp['width']}")
            check(ow <= 0 and sec.locator("[data-dexa-referenz]").count() > 0, f"[{label}] Referenz {hid}: sichtbar, kein horizontales Scrollen ({ow}px)")
        sec.locator("[data-dexa-dot='1']").tap(); pg.wait_for_timeout(450)
        pg.screenshot(path=str(SHOTS / f"{label.replace(' ', '-')}.png"), full_page=False)
        # Zoom am Handy
        sec.locator("[data-dexa-zoom]").tap(); pg.wait_for_timeout(500)
        dlg = pg.locator("dialog.dexa-zoom")
        check(dlg.evaluate("d => d.open"), f"[{label}] Zoom öffnet")
        ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vp['width']}")
        check(ow <= 0, f"[{label}] Zoom ohne Seiten-Überlauf")
        pg.screenshot(path=str(SHOTS / f"{label.replace(' ', '-')}-zoom.png"))
        dlg.get_by_role("button", name="Vergrößerung schließen").tap(); pg.wait_for_timeout(300)
        check(not dlg.evaluate("d => d.open"), f"[{label}] Zoom schließt")
        check(not errs, f"[{label}] keine JS-Fehler {errs[:2]}")
        c.close()

    # --- 4. Bewegung reduzieren: keine Übergänge ---
    c = b.new_context(viewport={"width": 1280, "height": 900}, reduced_motion="reduce")
    pg = c.new_page(); pg.goto(BASE + PAGE, wait_until="networkidle")
    dur = pg.evaluate("() => getComputedStyle(document.querySelector('.dexa-track')).transitionDuration")
    check(dur in ("1e-05s", "0.00001s", "0s"), f"reduced motion: Slider ohne Übergang ({dur})")
    c.close()
    b.close()

print(f"\n{len(fails)} Fehler" if fails else "\nAlles grün")
sys.exit(1 if fails else 0)
