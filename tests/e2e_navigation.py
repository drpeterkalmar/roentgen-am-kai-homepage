#!/usr/bin/env python3
"""E2E Navigation (Playwright headless) – Scroll, Fokus, Anker, Ladefehler.
Voraussetzung: `npm run build:staging` und `npx vite preview --port 4174`.
Prüft: Zurück behält die Scrollposition, neue Seite beginnt oben mit Fokus auf #main (Desktop und Handy-Menü),
Escape im Menü gibt den Fokus an „Menü“ zurück, Anker beim Erstaufruf (/roentgen-graz#lunge-brustkorb),
fehlender Seiten-Chunk nach Deploy → einmal neu laden, dann Fehlerseite statt weißem Bildschirm (Gutachten P1-1),
gesperrter Browser-Speicher (Safari, Cookies blockiert) → App startet trotzdem (P1-2),
vorgerenderte Seite bleibt beim Start sichtbar (kein Blinken, auch wenn der Seiten-Code verzögert kommt; P2-1),
Dunkelmodus schon beim ersten Bild (P2-14).
"""
import sys
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4174/roentgen-am-kai-homepage"
TEL = "tel:+43" + "3168409050"
NAV = 'header nav[aria-label="Hauptnavigation"]'
fails = []


def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


def h1(pg):
    return pg.locator("main h1").first.inner_text().replace("\xad", "")


with sync_playwright() as p:
    b = p.chromium.launch()
    errs = []

    # --- 1. Zurück behält die Position; neue Seite oben, Fokus auf dem Inhalt ---
    ctx = b.new_context(viewport={"width": 1280, "height": 900}); pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "/", wait_until="networkidle")
    pg.evaluate("window.scrollTo({ top: 1500, behavior: 'instant' })"); pg.wait_for_timeout(300)
    start_y = pg.evaluate("window.scrollY")
    pg.locator(f'{NAV} a[href$="/knochendichtemessung-graz"]').first.click()
    pg.wait_for_function("document.querySelector('main h1')?.textContent.replace(/\\u00ad/g, '').startsWith('Knochendichtemessung')")
    pg.wait_for_timeout(100)
    check(pg.evaluate("window.scrollY") == 0, f"neue Seite beginnt sofort oben (scrollY={pg.evaluate('window.scrollY')})")
    check(pg.evaluate("document.activeElement.id") == "main", f"Fokus nach Seitenwechsel auf #main ({pg.evaluate('document.activeElement.tagName')})")
    pg.go_back(); pg.wait_for_timeout(2000)  # länger als eine weiche Scrollfahrt nach oben (alter Fehler)
    back_y = pg.evaluate("window.scrollY")
    check(pg.url.rstrip("/").endswith("/roentgen-am-kai-homepage") and back_y > 300,
          f"Zurück zur Startseite behält die Position (vorher {start_y}, nachher {back_y})")
    # Anker innerhalb der Seite (Sprungmarke) bleibt weich und mit Abstand zum Kopfbereich
    pg.goto(BASE + "/knochendichtemessung-graz", wait_until="networkidle")
    pg.click('main a[href="#gemeinsam"] >> nth=0'); pg.wait_for_timeout(1500)
    top = pg.evaluate("document.getElementById('gemeinsam').getBoundingClientRect().top")
    check(-5 <= top <= 260, f"Sprungmarke #gemeinsam (top={round(top)})")

    # Alte Adresse innerhalb der App (ohne Neuladen) → Weiterleitung mit Anker wie die statische Seite
    pg.goto(BASE + "/", wait_until="networkidle")
    pg.evaluate("history.pushState({}, '', '/roentgen-am-kai-homepage/unser-angebot/digitales-roentgen/lungenroentgen'); dispatchEvent(new PopStateEvent('popstate'))")
    pg.wait_for_timeout(2000)
    top = pg.evaluate("document.getElementById('lunge-brustkorb')?.getBoundingClientRect().top ?? -1")
    check(pg.url.endswith("/roentgen-graz#lunge-brustkorb") and 0 <= top < 450,
          f"alte Adresse in der App → /roentgen-graz#lunge-brustkorb mit Sprung zur Gruppe ({pg.url.replace(BASE, '')}, top={round(top)})")
    ctx.close()

    # --- 2. Handy-Menü: Klick → neue Seite, Fokus auf #main; Escape → Fokus auf „Menü“ ---
    ctx = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2); pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "/", wait_until="networkidle")
    pg.get_by_role("button", name="Menü").click(); pg.wait_for_timeout(300)
    pg.get_by_role("dialog", name="Hauptmenü").get_by_role("link", name="Körperanalyse", exact=True).click()
    pg.wait_for_function("location.pathname.endsWith('/koerperanalyse-graz') && !!document.querySelector('main h1')"); pg.wait_for_timeout(300)
    check(pg.evaluate("document.activeElement.id") == "main", f"Handy-Menü: Fokus nach Klick auf #main ({pg.evaluate('document.activeElement.tagName + \" \" + document.activeElement.textContent.trim().slice(0, 20)')})")
    check(pg.evaluate("window.scrollY") == 0, "Handy-Menü: neue Seite beginnt oben")
    pg.get_by_role("button", name="Menü").click(); pg.wait_for_timeout(300)
    pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
    check(pg.evaluate("document.activeElement.textContent.includes('Menü')"), "Handy-Menü: Escape → Fokus zurück auf „Menü“")
    ctx.close()

    # --- 3. Anker beim Erstaufruf (leerer Cache) ---
    for label, kw in [("Desktop", dict(viewport={"width": 1280, "height": 900})),
                      ("Handy", dict(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2))]:
        ctx = b.new_context(**kw); pg = ctx.new_page()
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(BASE + "/roentgen-graz#lunge-brustkorb", wait_until="networkidle"); pg.wait_for_timeout(1500)
        r = pg.evaluate("(() => { const e = document.getElementById('lunge-brustkorb'); const b = e.getBoundingClientRect(); return [b.top, innerHeight]; })()")
        check(0 <= r[0] < r[1] * 0.6, f"[{label}] Erstaufruf /roentgen-graz#lunge-brustkorb: Gruppe im Bild (top={round(r[0])})")
        ctx.close()

    # --- 4. Seiten-Chunk nach Deploy weg (404 simuliert) → ein Reload, dann Fehlerseite ---
    ctx = b.new_context(viewport={"width": 1280, "height": 900}); pg = ctx.new_page()
    loads = []
    pg.on("load", lambda: loads.append(pg.url))
    pg.goto(BASE + "/", wait_until="networkidle")
    pg.route("**/assets/KnochendichtePage-*.js", lambda r: r.fulfill(status=404, body="weg"))
    pg.locator(f'{NAV} a[href$="/knochendichtemessung-graz"]').first.click()
    pg.wait_for_timeout(2500)
    check(len(loads) == 2, f"Chunk fehlt: genau ein automatischer Reload ({len(loads)} Ladevorgänge)")
    check(pg.locator("main h1").all_inner_texts() == ["Diese Seite konnte nicht geladen werden"]
          and pg.locator("main button", has_text="Neu laden").count() == 1 and pg.locator(f'main a[href="{TEL}"]').count() == 1
          and pg.locator("header").count() == 1 and pg.locator("footer").count() == 1,
          "Chunk fehlt: Fehlerseite mit „Neu laden“ und Telefon, Kopf- und Fußbereich bleiben")
    pg.locator(f'{NAV} a[href$="/kontakt"]').first.click(); pg.wait_for_timeout(800)
    check(h1(pg) == "Praxis und Kontakt", "Chunk fehlt: Seitenwechsel setzt die Fehlerseite zurück")
    pg.go_back(); pg.wait_for_timeout(800)
    pg.unroute("**/assets/KnochendichtePage-*.js")
    if pg.locator("main button", has_text="Neu laden").count():
        pg.locator("main button", has_text="Neu laden").click(); pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(300)
    check(h1(pg).startswith("Knochendichtemessung in Graz"), "Chunk wieder da: „Neu laden“ zeigt die Seite")
    ctx.close()

    # --- 5. Gesperrter Browser-Speicher (Safari „Alle Cookies blockieren“) ---
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    ctx.add_init_script("for (const k of ['localStorage', 'sessionStorage']) Object.defineProperty(window, k, { get() { throw new DOMException('The operation is insecure.', 'SecurityError'); } })")
    pg = ctx.new_page(); blocked = []
    pg.on("pageerror", lambda e: blocked.append(str(e)))
    pg.goto(BASE + "/", wait_until="networkidle"); pg.wait_for_timeout(300)
    check(pg.locator(f"{NAV} a").count() >= 4 and pg.locator(f'header a[href="{TEL}"]').count() >= 1 and not blocked,
          f"Speicher gesperrt: App startet (Navigation, Telefon) {blocked[:1]}")
    pg.locator("header").get_by_role("button", name="Dunkelmodus").first.click(); pg.wait_for_timeout(200)
    check(pg.evaluate("document.documentElement.classList.contains('dark')") and not blocked, "Speicher gesperrt: Dunkelmodus schaltbar ohne Fehler")
    ctx.close()

    # --- 6. Vorgerenderte Seite blinkt nicht: Seiten-Code 1,5 s verzögert, Überschrift darf nie verschwinden ---
    WATCH = """window.__h1Seen = false; window.__h1Lost = false;
      new MutationObserver(() => { const h = document.querySelector('main h1');
        if (h) window.__h1Seen = true; else if (window.__h1Seen) window.__h1Lost = true; })
        .observe(document, { childList: true, subtree: true });
      document.addEventListener('DOMContentLoaded', () => { window.__darkAtDCL = document.documentElement.classList.contains('dark'); });"""
    for scheme in ("light", "dark"):
        ctx = b.new_context(viewport={"width": 390, "height": 844}, color_scheme=scheme)
        ctx.add_init_script(WATCH)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.route("**/assets/RoentgenGrazPage-*.js", lambda r: (pg.wait_for_timeout(1500), r.continue_()))
        pg.goto(BASE + "/roentgen-graz", wait_until="networkidle"); pg.wait_for_timeout(500)
        st = pg.evaluate("({ seen: window.__h1Seen, lost: window.__h1Lost, dark: window.__darkAtDCL, hydrated: !!document.querySelector('#root [data-prerendered]') })")
        check(st["seen"] and not st["lost"] and st["hydrated"], f"[{scheme}] /roentgen-graz bleibt beim Start sichtbar (kein Blinken) {st}")
        check(st["dark"] == (scheme == "dark"), f"[{scheme}] Dunkelmodus schon beim ersten Bild (DOMContentLoaded: dark={st['dark']})")
        ctx.close()

    check(not errs, f"keine JS-Fehler {errs[:2]}")
    b.close()

print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
