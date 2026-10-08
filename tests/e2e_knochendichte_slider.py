#!/usr/bin/env python3
"""Knochendichte-Befund-Slider auf /knochendichtemessung-graz#befund-lesen (Playwright, headless, axe-core).
Voraussetzung: `npm run build` und `npx vite preview --port 4174`.
Prüft: Datenstruktur (Folien, Hotspots, Erklärungen mit Fundstelle, Dateien, keine Rahmen über Seitenrand),
Abschnittstexte aus BONE_SECTION (T-Wert-Bereiche + Altersgruppen-Hinweis direkt darunter, Diagnose, Unterarm,
DEXA-Text, CTA + Telefon, Kombi-Hinweis telefonisch), 6 Folien, Vorschaubilder, Pfeile/Punkte/Tastatur, Wischen,
Hover/Klick/Fokus, Hinweis schließen (Esc, Schließen-Knopf, Klick außerhalb), Vollbild-Dialog, Vergrößern, kein
horizontales Scrollen (320/360/390/768/1024/1280), axe hell/dunkel, keine JS-Fehler, Körperanalyse-Slider unberührt.
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
PAGE = "/knochendichtemessung-graz"
SHOTS = shots("knochendichte-befund-slider")
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
fails = []


def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


# --- 0. Datenstruktur ---
data = json.loads(subprocess.run(
    ["node", "--input-type=module", "-e",
     "const m = await import('./src/data/boneDensityReportExamples.js'); console.log(JSON.stringify({s: m.BONE_REPORT_EXAMPLES, e: m.BONE_EXPLANATIONS, q: m.BONE_SOURCES, t: m.BONE_SECTION}))"],
    capture_output=True, text=True, cwd=ROOT).stdout)
slides, expl, sources, T = data["s"], data["e"], data["q"], data["t"]
N = len(slides)
check(N == 6, f"6 Folien ({N})")
for k, e in expl.items():
    missing = [f for f in ("name", "definition", "beschreibt", "einschraenkung", "quellen") if not e.get(f)]
    check(not missing, f"Erklärung {k}: Pflichtfelder {missing or ''}")
    check(all(q["id"] in sources and q.get("stelle") for q in e["quellen"]), f"Erklärung {k}: Quelle mit Fundstelle")
used = set()
for s in slides:
    d = ROOT / "public/assets/knochendichte"
    check((d / f"{s['file']}.pdf").exists(), f"PDF {s['file']}")
    check(all((d / f"{s['file']}-{w}.{x}").exists() for w in (800, 1200, 1800, 2400) for x in ("avif", "webp")), f"Bildvarianten {s['file']}")
    check((d / f"{s['file']}-thumb.webp").exists(), f"Vorschaubild {s['file']}")
    for h in s["hotspots"]:
        used.add(h["key"])
        check(h["key"] in expl, f"Hotspot {h['id']} → {h['key']}")
        check(0 <= h["x"] and h["x"] + h["w"] <= 100 and 0 <= h["y"] and h["y"] + h["h"] <= 100, f"Hotspot {h['id']} innerhalb der Seite")
check(not (set(expl) - used), f"jede Erklärung wird verwendet {sorted(set(expl) - used)}")
# Veröffentlichte PDFs: keine Metadaten, keine ungeschwärzten Felder im Text
try:
    import fitz  # PyMuPDF (optional, im Hermes-venv vorhanden)
    for s in slides:
        doc = fitz.open(ROOT / f"public/assets/knochendichte/{s['file']}.pdf")
        meta = {k: v for k, v in (doc.metadata or {}).items() if v and k not in ("format", "encryption")}
        check(not meta, f"PDF {s['file']}: Metadaten leer {meta}")
        txt = "".join(p.get_text() for p in doc)
        check("Zuweiser" not in txt or "####" in txt.split("Zuweiser", 1)[1][:40], f"PDF {s['file']}: Zuweisernummer geschwärzt")
except ImportError:
    print("INFO PyMuPDF fehlt – PDF-Prüfung übersprungen")

with sync_playwright() as p:
    b = p.chromium.launch()
    # --- 1. Desktop ---
    c = b.new_context(viewport={"width": 1280, "height": 900})
    pg = c.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto(BASE + PAGE, wait_until="networkidle")
    sec = pg.locator("#befund-lesen")
    check(sec.count() == 1, "Abschnitt #befund-lesen vorhanden")
    check(sec.locator("h2").first.inner_text().strip() == T["title"], f"H2 „{T['title']}“")
    txt = sec.inner_text()
    for key in ("lead", "tScoreCaveat", "diagnosisText", "forearmText", "notice", "dexaText"):
        check(T[key] in txt, f"Text {key} sichtbar")
    for band in T["tScoreBands"]:
        check(band["text"] in txt, f"T-Wert-Bereich „{band['range']}“")
    # Hinweis auf Altersgruppen direkt unter den Bereichen
    lst = sec.locator("[data-kd-tscore] ul").bounding_box(); cav = sec.locator("[data-kd-tscore-caveat]").bounding_box()
    check(0 <= cav["y"] - (lst["y"] + lst["height"]) < 40, "Altersgruppen-Hinweis direkt unter den T-Wert-Bereichen")
    cta = sec.locator("a[data-cta=booking]")
    check(cta.count() == 1 and T["cta"] in cta.inner_text() and cta.get_attribute("href") == BOOK
          and cta.get_attribute("target") == "_blank", "CTA → MiraNext, neues Fenster")
    check(sec.locator("a[data-cta=phone]").count() == 1, "Telefon neben dem CTA")
    check("telefonisch" in sec.locator("[data-kd-kombi]").inner_text(), "Kombi mit Mammographie: telefonisch")
    for bad in ("Goldstandard", "strahlungsfrei", "beste Methode", "100 %"):
        check(bad not in txt, f"kein „{bad}“")
    check(len(pg.locator("main h1").all()) == 1, "genau eine H1")

    sl = sec.locator("[data-dexa-slider]")
    sl.scroll_into_view_if_needed(); pg.wait_for_timeout(700)
    counter = sl.locator("[data-dexa-counter]")
    check(counter.inner_text() == f"1 von {N}", "Zähler 1 von 6")
    # Vorschaubilder
    th = sl.locator("[data-dexa-thumb]")
    check(th.count() == N, f"{N} Vorschaubilder ({th.count()})")
    th.nth(4).click(); pg.wait_for_timeout(450)
    check(counter.inner_text() == f"5 von {N}", "Klick auf Vorschaubild 5 → 5 von 6")
    check(th.nth(4).get_attribute("aria-current") == "true", "aktives Vorschaubild markiert (aria-current)")
    # Pfeile, Punkte, Tastatur
    sl.locator("[data-dexa-next]").click(); pg.wait_for_timeout(400)
    check(counter.inner_text() == f"6 von {N}", "Pfeil weiter")
    sl.locator("[data-dexa-next]").click(); pg.wait_for_timeout(400)
    check(counter.inner_text() == f"1 von {N}", "Pfeil am Ende → Anfang")
    sl.locator(f"[data-dexa-dot='{slides[2]['id']}']").click(); pg.wait_for_timeout(400)
    check(counter.inner_text() == f"3 von {N}", "Punkt 3")
    sl.locator("[data-dexa-next]").focus(); pg.keyboard.press("ArrowLeft"); pg.wait_for_timeout(400)
    check(counter.inner_text() == f"2 von {N}", "Pfeiltaste links")
    pg.keyboard.press("Home"); pg.wait_for_timeout(400)
    check(counter.inner_text() == f"1 von {N}", "Pos1")
    # Alle Folien: Bild geladen, Markierungen im Bild
    for s in slides:
        sl.locator(f"[data-dexa-dot='{s['id']}']").click(); pg.wait_for_timeout(450)
        hs = sl.locator(f"[data-dexa-slide='{s['id']}'] [data-hotspot]")
        check(hs.count() == len(s["hotspots"]), f"Folie {s['id']}: {len(s['hotspots'])} Markierungen")
        ok = pg.evaluate(f"() => {{ const i = document.querySelector(\"#befund-lesen [data-dexa-slide='{s['id']}'] img\"); return !!(i && i.complete && i.naturalWidth > 0); }}")
        check(ok, f"Folie {s['id']}: Bild geladen")
    # Hover → Klick hält fest → Esc schließt
    s0 = slides[0]; h0 = s0["hotspots"][3]; h1 = s0["hotspots"][4]
    sl.locator(f"[data-dexa-dot='{s0['id']}']").click(); pg.wait_for_timeout(450)
    panel = sl.locator("[data-dexa-panel]")
    hs = sl.locator(f"[data-hotspot='{h0['id']}']")
    hs.hover(); pg.wait_for_timeout(200)
    check(expl[h0["key"]]["name"] in panel.inner_text(), "Hover zeigt Erklärung")
    pg.mouse.move(5, 5); pg.wait_for_timeout(200)
    check(expl[h0["key"]]["name"] not in panel.inner_text(), "Hover weg → Erklärung weg")
    hs.click(); pg.wait_for_timeout(200); pg.mouse.move(5, 5); pg.wait_for_timeout(200)
    check(expl[h0["key"]]["name"] in panel.inner_text(), "Klick hält Erklärung fest")
    for lbl in ("Kurz erklärt", "Was der Wert beschreibt", "Wichtig", "Quelle"):
        check(lbl in panel.inner_text(), f"Erklärung enthält „{lbl}“")
    pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
    check(expl[h0["key"]]["name"] not in panel.inner_text(), "Escape schließt den Hinweis")
    # Schließen-Knopf
    hs.click(); pg.wait_for_timeout(200)
    close = sl.locator("[data-dexa-close]")
    check(close.count() == 1 and close.is_visible(), "Schließen-Knopf sichtbar")
    close.click(); pg.wait_for_timeout(200)
    check(expl[h0["key"]]["name"] not in panel.inner_text(), "Schließen-Knopf schließt")
    # Klick außerhalb
    sl.locator(f"[data-hotspot='{h1['id']}']").click(); pg.wait_for_timeout(200)
    check(expl[h1["key"]]["name"] in panel.inner_text(), "zweiter Messwert festgehalten")
    sec.locator("h2").first.click(); pg.wait_for_timeout(200)
    check(expl[h1["key"]]["name"] not in panel.inner_text(), "Klick außerhalb schließt")
    # Tastatur: Fokus zeigt, Enter hält fest
    chip = sl.locator(f"[data-dexa-chip='{h0['id']}']")
    chip.focus(); pg.wait_for_timeout(150)
    check(expl[h0["key"]]["name"] in panel.inner_text(), "Fokus auf Messwert zeigt Erklärung")
    pg.keyboard.press("Enter"); pg.wait_for_timeout(150)
    check(chip.get_attribute("aria-pressed") == "true", "Enter hält fest (aria-pressed)")
    pg.keyboard.press("Escape"); pg.wait_for_timeout(150)
    check(chip.get_attribute("aria-pressed") == "false", "Escape löst die Tastatur-Auswahl")
    # Erklärung neben dem Bild
    vb = sl.locator(f"[data-dexa-slide='{s0['id']}']").bounding_box(); pb = panel.bounding_box()
    check(pb["x"] >= vb["x"] + vb["width"] - 1, "Desktop: Erklärung neben dem Befund")
    # Quellenverweise haben Ziele
    hs.click(); pg.wait_for_timeout(200)
    hrefs = panel.locator("a[href^='#']").evaluate_all("as => as.map(a => a.getAttribute('href'))")
    check(hrefs and all(pg.locator(f"[id='{h[1:]}']").count() == 1 for h in hrefs), f"Quellenverweise mit Ziel {hrefs[:3]}")
    pg.keyboard.press("Escape")
    # PDF
    pdf = sl.locator("[data-dexa-pdf]")
    href = pdf.get_attribute("href")
    check(href.endswith(f"{s0['file']}.pdf") and pdf.get_attribute("target") == "_blank", "PDF der aktuellen Folie")
    r = urllib.request.urlopen("http://localhost:4174" + href)
    check(r.status == 200 and r.read(5) == b"%PDF-", "PDF ausgeliefert")
    pg.screenshot(path=str(SHOTS / "desktop-1280.png"))
    # Vollbild-Dialog
    sl.locator("[data-dexa-full]").click(); pg.wait_for_timeout(600)
    dlg = pg.locator("dialog.dexa-zoom")
    check(dlg.evaluate("d => d.open"), "Vollbild öffnet")
    check("Vollbild" in dlg.locator("h3").inner_text(), "Vollbild-Titel")
    ib = dlg.locator("img").bounding_box(); sb = dlg.locator(".dexa-zoom-scroller").bounding_box()
    check(ib["width"] <= sb["width"] + 2, f"Vollbild zeigt die ganze Seitenbreite ({ib['width']:.0f}/{sb['width']:.0f})")
    pg.screenshot(path=str(SHOTS / "desktop-vollbild.png"))
    pg.keyboard.press("Escape"); pg.wait_for_timeout(400)
    check(not dlg.evaluate("d => d.open"), "Escape schließt Vollbild")
    check(pg.evaluate("() => document.activeElement?.hasAttribute('data-dexa-full')"), "Fokus zurück auf „Vollbild“")
    sl.locator("[data-dexa-full]").click(); pg.wait_for_timeout(500)
    dlg.locator("[data-dexa-zoom-close]").click(); pg.wait_for_timeout(400)
    check(not dlg.evaluate("d => d.open"), "Schließen-Knopf schließt Vollbild")
    # Vergrößern
    sl.locator("[data-dexa-zoom]").click(); pg.wait_for_timeout(500)
    w1 = dlg.locator("img").bounding_box()["width"]
    dlg.get_by_role("button", name="Vergrößern").click(); pg.wait_for_timeout(300)
    w2 = dlg.locator("img").bounding_box()["width"]
    check(w2 > w1 * 1.3, f"Plus vergrößert ({w1:.0f} → {w2:.0f})")
    pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
    # axe
    for mode in ("hell", "dunkel"):
        if mode == "dunkel":
            pg.evaluate("document.documentElement.classList.add('dark')"); pg.wait_for_timeout(200)
        pg.add_script_tag(content=AXE)
        res = pg.evaluate("async () => (await axe.run(document.querySelector('#befund-lesen'), {runOnly: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']})).violations.map(v => v.id + ' ' + v.nodes.length)")
        check(not res, f"axe {mode}: {res}")
    pg.evaluate("document.documentElement.classList.remove('dark')")
    check(not errs, f"Desktop: keine JS-Fehler {errs[:2]}")
    c.close()

    # --- 2. Breiten: kein Überlauf, Touch ---
    for label, vp, touch in [("320", (320, 640), True), ("360", (360, 740), True), ("390", (390, 844), True),
                             ("768", (768, 1024), True), ("1024", (1024, 768), False), ("1280", (1280, 800), False)]:
        c = b.new_context(viewport={"width": vp[0], "height": vp[1]}, is_mobile=touch, has_touch=touch, device_scale_factor=2)
        pg = c.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(BASE + PAGE, wait_until="networkidle")
        # behavior 'instant': die Seite scrollt sonst sanft (scroll-behavior: smooth) und ist nach der Wartezeit noch unterwegs
        pg.evaluate("document.querySelector('#befund-lesen .dexa-viewport').scrollIntoView({block: 'center', behavior: 'instant'})"); pg.wait_for_timeout(700)
        ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vp[0]}")
        check(ow <= 0, f"[{label}] kein horizontales Scrollen ({ow}px)")
        sl = pg.locator("#befund-lesen [data-dexa-slider]")
        counter = sl.locator("[data-dexa-counter]")
        if touch:
            cdp = c.new_cdp_session(pg)
            pg.evaluate("document.querySelector('#befund-lesen .dexa-viewport').scrollIntoView({block: 'center', behavior: 'instant'})"); pg.wait_for_timeout(300)
            v = sl.locator(".dexa-viewport").bounding_box()
            y = min(max(v["y"] + 60, 120), vp[1] - 160)
            x0, x1 = v["x"] + v["width"] * 0.8, v["x"] + v["width"] * 0.15
            cdp.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": x0, "y": y}]})
            for k in range(1, 9):
                cdp.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": x0 + (x1 - x0) * k / 8, "y": y}]})
            cdp.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
            pg.wait_for_timeout(500)
            check(counter.inner_text() == f"2 von {N}", f"[{label}] Wischen → 2 von 6 ({counter.inner_text()})")
            # Antippen → Erklärung, Tipp außerhalb schließt
            sl.locator(f"[data-dexa-dot='{slides[0]['id']}']").tap(); pg.wait_for_timeout(450)
            h = slides[0]["hotspots"][3]
            sl.locator(f"[data-hotspot='{h['id']}']").tap(); pg.wait_for_timeout(500)
            panel = sl.locator("[data-dexa-panel]")
            check(expl[h["key"]]["name"] in panel.inner_text(), f"[{label}] Antippen zeigt Erklärung")
            ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vp[0]}")
            check(ow <= 0, f"[{label}] mit offener Erklärung kein Überlauf ({ow}px)")
            pg.locator("#befund-lesen h2").first.tap(); pg.wait_for_timeout(300)
            check(expl[h["key"]]["name"] not in panel.inner_text(), f"[{label}] Tipp außerhalb schließt")
            # Vorschaubilder erreichbar (in Leiste scrollbar, nicht über die Seite hinaus)
            tb = sl.locator("[data-dexa-thumbs]").bounding_box()
            check(tb["x"] >= -1 and tb["x"] + tb["width"] <= vp[0] + 1, f"[{label}] Vorschauleiste innerhalb der Breite")
        if label in ("320", "390", "1024"):
            pg.screenshot(path=str(SHOTS / f"breite-{label}.png"))
        check(not errs, f"[{label}] keine JS-Fehler {errs[:2]}")
        c.close()

    # --- 3. Körperanalyse-Slider läuft weiter (gleiche Komponente) ---
    c = b.new_context(viewport={"width": 1280, "height": 900})
    pg = c.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "/koerperanalyse-graz", wait_until="networkidle")
    ks = pg.locator("#beispielbefund [data-dexa-slider]")
    check(ks.count() == 1 and ks.locator("[data-dexa-thumb]").count() == 0, "Körperanalyse: Slider da, ohne Vorschaubilder")
    ks.locator("[data-dexa-next]").click(); pg.wait_for_timeout(400)
    check(ks.locator("[data-dexa-counter]").inner_text() == "2 von 6", "Körperanalyse: Blättern funktioniert")
    check(not errs, f"Körperanalyse: keine JS-Fehler {errs[:2]}")
    c.close()
    b.close()

print(f"\nRESULT: {len(fails)} Fehler")
sys.exit(1 if fails else 0)
