#!/usr/bin/env python3
"""Funktionsprüfung der Animationen (Playwright headless) gegen vite preview :4174."""
import pathlib
from playwright.sync_api import sync_playwright
import json
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
VISCERAL = bool(json.loads(subprocess.run(["node", "--input-type=module", "-e", "const m = await import('./src/data/bodyComposition.js'); console.log(JSON.stringify(m.BODY.visceralFat ?? null))"],
                                          capture_output=True, text=True, cwd=ROOT).stdout.strip() or "null"))

BASE = "http://localhost:4174/roentgen-am-kai-homepage"
OUT = pathlib.Path.home() / "Desktop/relaunch-screenshots-animationen"
OUT.mkdir(parents=True, exist_ok=True)
fails = []


def check(c, m):
    print(("OK   " if c else "FAIL ") + m)
    if not c:
        fails.append(m)


with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    pg = ctx.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)

    # 1. Erstes Laden: kein Seiten-Einblenden
    pg.goto(BASE + "/", wait_until="networkidle")
    check(pg.locator("main .anim-page-in").count() == 0, "Erstes Laden: kein Einblenden (LCP unberührt)")
    # 2. Karte hebt sich beim Überfahren
    card = pg.locator("main article.card-lift").first
    card.scroll_into_view_if_needed(); card.hover(); pg.wait_for_timeout(350)
    t = card.evaluate("e => getComputedStyle(e).transform")
    check(t not in ("none", "") and "-3" in t, f"Karte hebt sich beim Überfahren ({t})")
    # 3. Seitenwechsel: neue Seite blendet ein
    pg.locator('header nav[aria-label="Hauptnavigation"] a[href$="/koerperanalyse-graz"]').first.click()
    try:
        pg.wait_for_selector("main .anim-page-in", state="attached", timeout=5000)
    except Exception:
        pass
    anim = pg.evaluate("(() => { const d = document.querySelector('main .anim-page-in'); return d ? getComputedStyle(d).animationName : null; })()")
    check(anim == "rak-fade-in", f"Seitenwechsel blendet ein ({anim})")
    pg.wait_for_timeout(600)
    # 4. DEXA-Schema Körperanalyse: startet erst im Bild, läuft durch
    fig = pg.locator('[data-dexa-figure="body"]')
    check(fig.count() == 1 and "is-playing" not in (fig.get_attribute("class") or ""), "Körperanalyse-Schema wartet, bis es im Bild ist")
    vat = fig.locator("[data-vat]")
    roi = fig.locator("[data-android]")
    opa = lambda loc: float(loc.evaluate("e => getComputedStyle(e).opacity"))
    if VISCERAL:
        check(vat.count() == 1 and roi.count() == 1 and opa(vat) == 0 and opa(roi) == 0, "Viszerales Fett + Messbereich: vor dem Abspielen verborgen")
        bb = lambda loc: loc.evaluate("e => { const b = e.getBBox(); return [b.x, b.y, b.x + b.width, b.y + b.height]; }")
        v, r = bb(vat), bb(roi)
        check(r[0] < v[0] and r[1] < v[1] and v[2] < r[2] and v[3] < r[3], f"Viszerales Fett liegt im Messbereich ({[round(x) for x in v]} in {[round(x) for x in r]})")
    else:
        check(vat.count() == 0 and roi.count() == 0, "Viszerales Fett: nicht eingezeichnet (visceralFat nicht bestätigt)")
    fig.scroll_into_view_if_needed(); pg.wait_for_timeout(1800)
    check("is-playing" in fig.get_attribute("class"), "Körperanalyse-Schema startet im Bild")
    fig.screenshot(path=str(OUT / "dexa-koerperanalyse-mitte.png"))
    pg.wait_for_timeout(3800)
    fig.screenshot(path=str(OUT / "dexa-koerperanalyse-ende.png"))
    if VISCERAL:
        check(opa(vat) == 1 and opa(roi) == 1 and fig.get_by_text("Viszerales Fett (inneres Bauchfett)").is_visible()
              and fig.get_by_text("Messbereich für das Bauchfett").is_visible(),
              "Viszerales Fett + Messbereich: nach der Messung eingezeichnet + Legende")
    arm = fig.locator(".dexa-arm").evaluate("e => getComputedStyle(e).transform")
    check(arm.endswith("574, 0)"), f"Messarm am Ende ({arm})")
    tint = fig.locator(".dexa-tint").evaluate("e => { const r = e.getBoundingClientRect(); return [r.width, getComputedStyle(e).fill]; }")
    clip_ok = fig.evaluate("e => { const c = e.querySelector('clipPath'); return c.children.length > 5 && ![...c.children].some(x => x.tagName === 'g'); }")
    check(tint[0] > 200 and clip_ok, f"gemessener Bereich eingefärbt (Breite {tint[0]:.0f}px, clipPath ohne <g>: {clip_ok})")
    fig.get_by_role("button", name="Erneut abspielen").click(); pg.wait_for_timeout(300)
    arm2 = fig.locator(".dexa-arm").evaluate("e => getComputedStyle(e).transform")
    check(not arm2.endswith("574, 0)"), f"'Erneut abspielen' startet neu ({arm2})")
    # 5. FAQ gleitet auf, geschlossen nicht fokussierbar/unsichtbar
    q = pg.locator("#faq button[aria-expanded]").first
    reg = pg.locator('[id="' + q.get_attribute("aria-controls") + '"]')
    check(reg.evaluate("e => getComputedStyle(e).visibility") == "hidden" and not reg.is_visible(), "FAQ geschlossen: Antwort unsichtbar")
    reg_id = q.get_attribute("aria-controls")
    pg.evaluate("""(id) => { window.__h = []; const el = document.getElementById(id); const t0 = performance.now();
      const tick = () => { window.__h.push(el.getBoundingClientRect().height); if (performance.now() - t0 < 900) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); }""", reg_id)
    q.click(); pg.wait_for_timeout(1000)
    hs = pg.evaluate("window.__h"); h_end = max(hs)
    mids = [h for h in hs if 0 < h < h_end]
    check(h_end > 0 and len(mids) >= 2 and reg.is_visible(), f"FAQ gleitet auf ({len(mids)} Zwischenbilder, 0 → {h_end:.0f}px)")
    q.click()
    try:
        reg.wait_for(state="hidden", timeout=3000)
    except Exception:
        pass
    pg.wait_for_timeout(100)
    check(reg.evaluate("e => getComputedStyle(e).visibility") == "hidden" and reg.evaluate("e => e.getBoundingClientRect().height") == 0, "FAQ schließt wieder vollständig")
    # 6. Knochendichte-Schema
    pg.goto(BASE + "/knochendichtemessung-graz", wait_until="networkidle")
    f2 = pg.locator('[data-dexa-figure="bone"]'); f2.scroll_into_view_if_needed(); pg.wait_for_timeout(1500)
    f2.screenshot(path=str(OUT / "dexa-knochendichte-mitte.png"))
    pg.wait_for_timeout(2600)
    f2.screenshot(path=str(OUT / "dexa-knochendichte-ende.png"))
    hits = f2.locator(".dexa-hit").evaluate_all("es => es.map(e => +getComputedStyle(e).opacity)")
    check(hits == [1, 1], f"Knochendichte: beide Messbereiche markiert ({hits})")
    # 7. Desktop-Untermenü klappt weich auf
    btn = pg.locator('header nav[aria-label="Hauptnavigation"]').get_by_role("button", name="Weitere Untersuchungen")
    btn.click(); pg.wait_for_timeout(30)
    an = pg.evaluate("getComputedStyle(document.getElementById(document.querySelector('header nav [aria-controls]').getAttribute('aria-controls'))).animationName")
    check(an == "rak-drop-in", f"Untermenü blendet ein ({an})")
    check(not errs, f"keine Konsolenfehler {errs[:2]}")
    ctx.close()

    # 8. Dunkelmodus-Ansicht der Schemata
    c = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2, color_scheme="dark")
    c.add_init_script("localStorage.setItem('theme', 'dark')")
    p2 = c.new_page()
    for path, mode in [("/koerperanalyse-graz", "body"), ("/knochendichtemessung-graz", "bone")]:
        p2.goto(BASE + path, wait_until="networkidle")
        f = p2.locator(f'[data-dexa-figure="{mode}"]'); f.scroll_into_view_if_needed(); p2.wait_for_timeout(5600)
        f.screenshot(path=str(OUT / f"dexa-{mode}-dunkel.png"))
    c.close()

    # 9. Handy: Menü gleitet herein; Schema passt in die Breite
    m = b.new_context(viewport={"width": 360, "height": 740}, device_scale_factor=2, is_mobile=True, has_touch=True)
    p3 = m.new_page()
    p3.goto(BASE + "/koerperanalyse-graz", wait_until="networkidle")
    p3.get_by_role("button", name="Menü").click(); p3.wait_for_timeout(30)
    an = p3.evaluate("getComputedStyle(document.getElementById('mobile-menu')).animationName")
    check(an == "rak-panel-in", f"Handy-Menü gleitet herein ({an})")
    p3.keyboard.press("Escape"); p3.wait_for_timeout(200)
    f = p3.locator('[data-dexa-figure="body"]'); f.scroll_into_view_if_needed(); p3.wait_for_timeout(5600)
    f.screenshot(path=str(OUT / "dexa-koerperanalyse-handy.png"))
    ow = p3.evaluate("Math.max(document.documentElement.scrollWidth, window.innerWidth) - 360")
    check(ow <= 0, f"Handy 360 px: kein seitliches Scrollen ({ow})")
    m.close()

    # 10. „Bewegung reduzieren“: sofort Endbild, kein Abspiel-Knopf, keine Animationen
    r = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    p4 = r.new_page()
    p4.goto(BASE + "/knochendichtemessung-graz", wait_until="networkidle")
    f = p4.locator('[data-dexa-figure="bone"]'); f.scroll_into_view_if_needed(); p4.wait_for_timeout(300)
    arm = f.locator(".dexa-arm").evaluate("e => getComputedStyle(e).transform")
    hits = f.locator(".dexa-hit").evaluate_all("es => es.map(e => +getComputedStyle(e).opacity)")
    check(arm.endswith("316, 0)") and hits == [1, 1], f"Bewegung reduziert: Endbild sofort ({arm}, {hits})")
    check(not f.get_by_role("button", name="Erneut abspielen").is_visible(), "Bewegung reduziert: kein Abspiel-Knopf")
    q = p4.locator("#faq button[aria-expanded]").first; rid = q.get_attribute("aria-controls")
    p4.evaluate("""(id) => { window.__h = []; const el = document.getElementById(id); const t0 = performance.now();
      const tick = () => { window.__h.push(el.getBoundingClientRect().height); if (performance.now() - t0 < 900) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); }""", rid)
    q.click(); p4.wait_for_timeout(1000)
    hs = p4.evaluate("window.__h"); h_end = max(hs); mids = [h for h in hs if 0 < h < h_end]
    check(h_end > 20 and not mids, f"Bewegung reduziert: FAQ sofort offen (Zwischenbilder: {len(mids)})")
    r.close()
    b.close()

print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
