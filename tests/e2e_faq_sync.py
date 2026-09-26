#!/usr/bin/env python3
"""FAQ-E2E für alle Leistungsseiten (Playwright headless, kein Chrome nötig).

Prüft je Route: sichtbare FAQ-Fragen == FAQPage-Schema-Fragen == Sollzahl,
Antwort-Rendercheck (2. Frage aufklappen, Stichwort muss im FAQ-Text stehen),
JS-Error-Sweep. Exit 0 = alles OK.

Usage:
  1. npx vite preview --port 4174   (terminal background=true, danach killen)
  2. ROUTES unten anpassen. WICHTIG: der Probe-String muss aus der ANTWORT der
     2. Frage stammen (das Skript klickt Frage 2 auf) — nicht aus einer anderen.
  3. python3 -u scripts/e2e_faq_sync_check.py [port]   (default 4174)

Stand Sep 2026 (Commit 934b1c2): 12 Sets/43 Q&A in faqData.js, 7 Live-Routen.
Die 5 Unterseiten-Sets (lungenroentgen, wirbelsaeulenroentgen, roentgenNachUnfall,
mammascreening, angebot) werden hier ergänzt, sobald die Routen live gehen.
"""
import sys
from playwright.sync_api import sync_playwright

PORT = sys.argv[1] if len(sys.argv) > 1 else "4174"
BASE = f"http://localhost:{PORT}/roentgen-am-kai-homepage/"

# EDIT PER CHECK: route -> (faqKey in faqData.js, Sollzahl Fragen, Stichwort aus der ANTWORT der 2. Frage)
ROUTES = {
    "/unser-angebot/roentgen": ("roentgen", 4, "klassische Filmtechnik"),
    "/unser-angebot/ultraschall": ("ultraschall", 4, "natürliches Schallfenster"),
    "/unser-angebot/mammographie": ("mammographie", 4, "Unser Mammographiegerät passt den Kompressionsdruck"),
    "/unser-angebot/dvt": ("dvt", 3, "Zahnimplantaten"),
    "/unser-angebot/knochendichte": ("knochendichte", 4, "BVAEB, SVS und KFA"),
    "/unser-angebot/koerperfettmessung": ("koerperfett", 3, "viszeralen Fetts"),
    "/unser-angebot/phlebographie": ("phlebographie", 4, "Venenklappen bei venöser Insuffizienz"),
}

errors, failures = [], []
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1280, "height": 900})
    pg.on("pageerror", lambda e: errors.append(f"PAGEERROR: {e}"))
    pg.on("console", lambda m: errors.append(f"CONSOLE-ERR: {m.text}") if m.type == "error" else None)

    for route, (key, want, answer_probe) in ROUTES.items():
        pg.goto(BASE.rstrip("/") + route, wait_until="networkidle")
        pg.wait_for_timeout(1200)
        visible = pg.locator("#faq button").count()
        schema_q = pg.evaluate("""() => {
            const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
            for (const s of scripts) {
                try {
                    const d = JSON.parse(s.innerHTML);
                    if (d["@type"] === "FAQPage") return d.mainEntity.length;
                } catch (e) {}
            }
            return null;
        }""")
        ok_cnt = (visible == want and schema_q == want)
        print(f"{route}: sichtbar={visible} schema={schema_q} soll={want} -> {'OK' if ok_cnt else 'FAIL'}")
        if not ok_cnt:
            failures.append(route)
        # Antwort-Rendercheck: zweite Frage aufklappen, Probe-String muss erscheinen
        if visible >= 2:
            pg.locator("#faq button").nth(1).click()
            pg.wait_for_timeout(500)
            faq_text = pg.locator("#faq").inner_text()
            ok_ans = answer_probe in faq_text
            print(f"   Antwort-Check {answer_probe[:45]!r}: {'OK' if ok_ans else 'MISSING'}")
            if not ok_ans:
                failures.append(route + " (Antwort)")
        print(f"   erste Frage sichtbar: {pg.locator('#faq button').nth(0).inner_text()[:60]}")
    b.close()

print("JS errors:", errors if errors else "none")
sys.exit(1 if failures or errors else 0)
