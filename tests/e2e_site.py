#!/usr/bin/env python3
"""E2E-Gesamtprüfung der Website (Playwright, headless).
Voraussetzung: `npm run build` und `npx vite preview --port 4174` laufen.
Aufruf: `npm test` bzw. `python3 -u tests/e2e_site.py`.
Prüft alle Routen (mobil + Desktop), Terminlinks, tel:-Links (byte-genau), eine H1 je Seite, Tastatur-
bedienung, mobiles Menü, erster Bildschirm der Startseite, kein horizontales Scrollen, keine externen Hosts.
"""
import sys, re
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4174/roentgen-am-kai-homepage"
TEL = "tel:+43" + "3168409050"
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
ROUTES = {
    "/": ("Radiologie Graz", "Moderne Radiologie in Graz"),
    "/unser-angebot/mammographie": ("Mammographie", "Häufige Fragen zur Mammographie"),
    "/unser-angebot/knochendichte": ("Knochendichte", "Häufige Fragen zur Knochendichtemessung"),
    "/unser-angebot/koerperfettmessung": ("DEXA-Körperanalyse", "Häufige Fragen zur DEXA-Körperanalyse"),
    "/unser-angebot/roentgen": ("Digitales Röntgen", "Häufige Fragen zum Röntgen"),
    "/unser-angebot/ultraschall": ("Sonographie", "Häufige Fragen"),
    "/unser-angebot/dvt": ("DVT", "Häufige Fragen"),
    "/unser-angebot/phlebographie": ("Phlebographie", "Häufige Fragen"),
    "/weitere-untersuchungen": ("Weitere Untersuchungen", "Durchleuchtung"),
    "/gesundheitsziele": ("Gesundheitsziele", "Osteoporosevorsorge"),
    "/ratgeber": ("Ratgeber", "Weiterlesen"),
    "/kontakt": ("Praxis und Kontakt", "Öffnungszeiten"),
    "/unser-team/dr-peter-kalmar": ("Peter Kalmar", "Publikationen"),
    "/unser-team/dr-georg-riegler": ("Georg Riegler", "Publikationen"),
    "/impressum": ("Impressum", "Offener Quellcode"),
    "/datenschutz": ("Datenschutz", "Verantwortlicher"),
}
LEGACY = {"/datenschutzerklarung": "/datenschutz", "/unser-angebot/mammographie/mammascreening": "/unser-angebot/mammographie"}
NAV = ["Startseite", "Mammographie", "Knochendichte", "DEXA-Körperanalyse", "Weitere Untersuchungen", "Gesundheitsziele", "Ratgeber", "Praxis und Kontakt"]
FORBIDDEN = ["Terminanfrage", "Online-Terminvergabe", "script.google.com", "Sonografie", "Wahlarzt für", "Wahlarztpraxis"]  # Lebenslauf-Einträge "Wahlarztordination 20xx" sind korrekt
fails, external = [], set()

def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond: fails.append(msg)

with sync_playwright() as p:
    b = p.chromium.launch()
    for label, ctxargs in [("mobil", dict(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)),
                           ("desktop", dict(viewport={"width": 1440, "height": 900}))]:
        ctx = b.new_context(**ctxargs)
        pg = ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.on("request", lambda r: external.add(r.url.split('/')[2]) if not r.url.startswith(("http://localhost", "data:", "blob:")) else None)
        for path, (tpart, bpart) in ROUTES.items():
            errs.clear()
            resp = pg.goto(BASE + path, wait_until="networkidle"); pg.wait_for_timeout(400)
            title = pg.title(); body = pg.locator("body").inner_text()
            canon = pg.eval_on_selector('link[rel=canonical]', 'e => e.href')
            tels = pg.eval_on_selector_all('a[href^="tel:"]', 'as => as.map(a => a.getAttribute("href"))')
            books = pg.eval_on_selector_all('a[data-cta="booking"]', 'as => as.map(a => [a.getAttribute("href"), a.target, a.rel])')
            h1 = pg.locator("h1").count()
            bad = [f for f in FORBIDDEN if f.lower() in body.lower()]
            ok = (resp.status == 200 and tpart in title and bpart.lower() in body.lower() and not errs
                  and canon.endswith(path) and not bad and tels and all(t == TEL for t in tels)
                  and books and all(x[0] == BOOK and x[1] == "_blank" and "noopener" in x[2] for x in books) and h1 == 1)
            check(ok, f"[{label}] {resp.status} {path} title={title[:45]!r} h1={h1} tel={len(tels)} booking={len(books)} bad={bad} errs={errs[:1]}")
        # horizontal overflow on every page (mobile)
        if label == "mobil":
            for path in ROUTES:
                pg.goto(BASE + path, wait_until="networkidle")
                # is_mobile weitet das Layout-Viewport bei Überbreite auf → gegen feste 390 px messen
                ow = pg.evaluate("Math.max(document.documentElement.scrollWidth, window.innerWidth) - 390")
                check(ow <= 0, f"[mobil] kein horizontales Scrollen {path} (Überhang {ow}px)")
        ctx.close()

    # Desktop: Navigation + Dropdown-Tastatur
    for w in (360, 320):
        c2 = b.new_context(viewport={"width": w, "height": 740}, is_mobile=True, device_scale_factor=2); p2 = c2.new_page()
        p2.goto(BASE + "/", wait_until="networkidle")
        ow = p2.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {w}")
        check(ow <= 0, f"[{w}px] kein horizontales Scrollen / (Überhang {ow}px)")
        c2.close()
    for w in (1280, 1440):
        c3 = b.new_context(viewport={"width": w, "height": 900}); p3 = c3.new_page()
        p3.goto(BASE + "/", wait_until="networkidle")
        hs = p3.evaluate("[...document.querySelectorAll('header nav[aria-label=Hauptnavigation] > ul > li > a, header nav[aria-label=Hauptnavigation] > ul > li > button')].map(e => Math.round(e.getBoundingClientRect().height))")
        check(len(set(hs)) == 1, f"[{w}px] Menüpunkte einzeilig, gleiche Höhe {hs}")
        c3.close()
    ctx = b.new_context(viewport={"width": 1440, "height": 900}); pg = ctx.new_page()
    pg.goto(BASE + "/", wait_until="networkidle")
    nav = pg.locator('header nav[aria-label="Hauptnavigation"]').first
    names = [t.strip() for t in nav.locator(":scope > ul > li > a, :scope > ul > li > button").all_inner_texts()]
    check(names == NAV, f"Hauptnavigation Reihenfolge: {names}")
    check(pg.locator('header a[data-cta="booking"]:visible').count() >= 1, "Header: 'Termin buchen' sichtbar (Desktop)")
    btn = nav.get_by_role("button", name="Weitere Untersuchungen")
    btn.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(150)
    check(btn.get_attribute("aria-expanded") == "true", "Dropdown öffnet per Enter (aria-expanded=true)")
    pg.keyboard.press("Tab"); pg.wait_for_timeout(100)
    focused = pg.evaluate("document.activeElement.textContent")
    check("weiteren Untersuchungen" in focused, f"Tab führt in das Untermenü ({focused!r})")
    pg.keyboard.press("Escape"); pg.wait_for_timeout(150)
    check(btn.get_attribute("aria-expanded") == "false" and pg.evaluate("document.activeElement.getAttribute('aria-expanded')") == "false", "Escape schließt Untermenü, Fokus zurück auf Schaltfläche")
    btn.focus(); pg.keyboard.press("ArrowDown"); pg.wait_for_timeout(200)
    check(btn.get_attribute("aria-expanded") == "true", "Pfeil-unten öffnet Untermenü")
    pg.keyboard.press("Escape")
    # Skip-Link
    pg.goto(BASE + "/kontakt", wait_until="networkidle"); pg.keyboard.press("Tab")
    check(pg.evaluate("document.activeElement.textContent") == "Zum Inhalt springen", "Erster Tab-Stopp = Skip-Link")
    # focus ring visible on booking button
    pg.locator('header a[data-cta="booking"]').first.focus()
    pg.keyboard.press("Shift+Tab"); pg.keyboard.press("Tab")
    ow = pg.evaluate("getComputedStyle(document.activeElement).outlineStyle + ' ' + getComputedStyle(document.activeElement).outlineWidth")
    check(ow.startswith("solid") and not ow.endswith(" 0px"), f"Fokusrahmen sichtbar am Terminbutton ({ow})")
    # FAQ aria
    pg.goto(BASE + "/unser-angebot/mammographie", wait_until="networkidle")
    q = pg.locator("#faq button[aria-expanded]").first
    q.click(); pg.wait_for_timeout(100)
    check(q.get_attribute("aria-expanded") == "true" and pg.locator('[id="' + q.get_attribute("aria-controls") + '"]').is_visible(), "FAQ: aria-expanded + Antwortregion sichtbar")
    pg.screenshot(path="/tmp/rak-new-mammo-desktop.png", full_page=False)
    pg.goto(BASE + "/", wait_until="networkidle"); pg.wait_for_timeout(500)
    pg.screenshot(path="/tmp/rak-new-home-desktop.png", full_page=True)
    pg.goto(BASE + "/kontakt", wait_until="networkidle"); pg.wait_for_timeout(300)
    pg.screenshot(path="/tmp/rak-new-kontakt-desktop.png", full_page=True)
    ctx.close()

    # Mobil: Menü-Dialog, Fokusfalle, MobileBar
    ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True); pg = ctx.new_page()
    pg.goto(BASE + "/", wait_until="networkidle"); pg.wait_for_timeout(400)
    pg.screenshot(path="/tmp/rak-new-home-mobile.png", full_page=False)
    pg.screenshot(path="/tmp/rak-new-home-mobile-full.png", full_page=True)
    bar = pg.locator('nav[aria-label="Schnellzugriff"]')
    check(bar.is_visible() and bar.locator('a[data-cta="booking"]').count() == 1, "Mobil: Schnellzugriff mit 'Termin buchen'")
    menu = pg.get_by_role("button", name="Menü")
    menu.click(); pg.wait_for_timeout(200)
    dlg = pg.get_by_role("dialog", name="Hauptmenü")
    check(dlg.is_visible(), "Mobil: Menü-Dialog öffnet")
    items = [t.strip() for t in dlg.locator('nav > ul > li > a, nav > ul > li > button').all_inner_texts()]
    check(items == NAV, f"Mobil: Menüeinträge {items}")
    box = dlg.bounding_box()
    check(box and box["height"] >= 700, f"Mobil: Menü-Panel volle Höhe ({box and round(box['height'])}px)")
    last = dlg.get_by_role("link", name="Praxis und Kontakt")
    check(last.is_visible() and last.bounding_box()["y"] < 844, "Mobil: letzter Menüpunkt im sichtbaren Bereich")
    pg.screenshot(path="/tmp/rak-new-menu-mobile.png")
    for _ in range(40): pg.keyboard.press("Tab")
    inside = pg.evaluate("!!document.activeElement.closest('[role=dialog]')")
    check(inside, "Mobil: Fokus bleibt im Menü (Fokusfalle)")
    pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
    check(not dlg.is_visible() and pg.evaluate("document.activeElement.textContent.includes('Menü')"), "Mobil: Escape schließt Menü, Fokus zurück auf 'Menü'")
    pg.goto(BASE + "/unser-angebot/koerperfettmessung", wait_until="networkidle"); pg.wait_for_timeout(300)
    pg.screenshot(path="/tmp/rak-new-koerper-mobile.png", full_page=True)
    ph = pg.eval_on_selector_all('[data-placeholder]', 'els => els.map(e => e.getAttribute("data-placeholder"))')
    check(len(ph) >= 1, f"Platzhalter sichtbar auf Körperanalyse-Seite: {ph}")
    ctx.close()

    # Startseite: erster Bildschirm zeigt Angebot, Terminbuchung, Orientierungshilfe und Telefon
    for vw, vh, lbl, mobile in [(390, 844, "mobil", True), (1280, 720, "laptop", False), (1440, 900, "desktop", False)]:
        c = b.new_context(viewport={"width": vw, "height": vh}, is_mobile=mobile, has_touch=mobile, device_scale_factor=2 if mobile else 1)
        q = c.new_page(); q.goto(BASE + "/", wait_until="networkidle"); q.wait_for_timeout(300)
        limit = vh - (60 if mobile else 0)  # mobile Schnellzugriffsleiste unten abziehen
        vis = q.evaluate("""(lim) => { const inV = e => { if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.top >= 0 && r.bottom <= lim; };
          const m = document.querySelector('main');
          return { h1: inV(m.querySelector('h1')), angebot: inV(m.querySelector('h1 + p')),
                   termin: [...m.querySelectorAll('a[data-cta=booking]')].some(inV),
                   orientierung: inV(m.querySelector('a[href="#ziele"]')),
                   telefon: [...m.querySelectorAll('a[href^="tel:"]')].some(inV) }; }""", limit)
        check(all(vis.values()), f"[{lbl} {vw}x{vh}] erster Bildschirm: {vis}")
        if lbl == "mobil":
            q.locator('main a[href="#ziele"]').click(); q.wait_for_timeout(1200)
            top = q.evaluate("document.getElementById('ziele').getBoundingClientRect().top")
            check(0 <= top <= 200, f"'Welche Untersuchung brauche ich?' springt zu #ziele (top={round(top)})")
            ph = q.eval_on_selector_all('[data-placeholder]', 'els => els.map(e => e.getAttribute("data-placeholder"))')
            check(any(x.startswith("Foto:") for x in ph), f"Bildplatzhalter mit Motivbeschreibung vorhanden ({len(ph)})")
            h2 = q.eval_on_selector_all('main h2', 'hs => hs.map(h => h.textContent.trim())')
            want = ["Vorsorge und Diagnostik", "Weitere Untersuchungen", "Was möchten Sie erreichen?", "Vom Termin bis zum Befund", "Ihre Radiologie im Zentrum von Graz", "Anfahrt und Kontakt", "Termin vereinbaren"]
            check(all(w in h2 for w in want), f"Startseiten-Abschnitte vorhanden: {h2}")
            desc = q.eval_on_selector('meta[name=description]', 'e => e.content')
            check("Radiologie" in q.title() and "Graz" in q.title() and 50 <= len(desc) <= 160, f"SEO: title={q.title()!r} ({len(q.title())}) desc={len(desc)} Zeichen")
        c.close()

    # Dark mode desktop
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, color_scheme="dark"); pg = ctx.new_page()
    pg.goto(BASE + "/", wait_until="networkidle"); pg.wait_for_timeout(400)
    pg.screenshot(path="/tmp/rak-new-home-dark.png")
    ctx.close()
    for old, new in LEGACY.items():
        pg2 = b.new_page(); pg2.goto(BASE + old, wait_until="networkidle"); pg2.wait_for_timeout(400)
        landed = pg2.url.replace(BASE, "").rstrip('/')
        check(landed == new, f"Weiterleitung {old} -> {landed}")
    b.close()

check(not external, f"keine externen Hosts beim Laden ({sorted(external)})")
print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
