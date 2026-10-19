#!/usr/bin/env python3
"""Funktionsprüfung der Animationen (Playwright headless) gegen vite preview :4174."""
import pathlib
import sys
from playwright.sync_api import sync_playwright
from _paths import shots
import json
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
VISCERAL = bool(json.loads(subprocess.run(["node", "--input-type=module", "-e", "const m = await import('./src/data/bodyComposition.js'); console.log(JSON.stringify(m.BODY.visceralFat ?? null))"],
                                          capture_output=True, text=True, cwd=ROOT).stdout.strip() or "null"))

BASE = "http://localhost:4174/roentgen-am-kai-homepage"
OUT = shots("relaunch-screenshots-animationen")
fails = []


def check(c, m):
    print(("OK   " if c else "FAIL ") + m)
    if not c:
        fails.append(m)


with sync_playwright() as p:
    b = p.chromium.launch(args=["--mute-audio"])
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
    # 4. Erklärfilm Körperanalyse (seit 11.10.2026 statt SVG-Schema): lädt/spielt erst im Bild
    fig = pg.locator("[data-dexa-video]")
    vid = fig.locator("video")
    vstate = lambda: vid.evaluate("v => ({paused: v.paused, t: v.currentTime, net: v.networkState, src: v.currentSrc.split('/').pop(), pre: v.preload, muted: v.muted, loop: v.loop})")
    s0 = vstate()
    check(fig.count() == 1 and s0["paused"] and s0["pre"] == "none" and s0["t"] == 0, f"Körperanalyse-Film wartet, bis er im Bild ist ({s0})")
    check(pg.locator('[data-dexa-figure="body"]').count() == 0, "altes Körperanalyse-Schema entfernt")
    fig.scroll_into_view_if_needed(); pg.wait_for_timeout(2500)
    s1 = vstate()
    check(not s1["paused"] and s1["t"] > 0.5 and s1["muted"] and s1["loop"], f"Körperanalyse-Film spielt im Bild, stumm, in Schleife ({s1})")
    fig.screenshot(path=str(OUT / "dexa-koerperanalyse-film.png"))
    check("KI-generiert" not in fig.inner_text() and fig.locator("[data-ai-badge]").count() == 0 and "Schematische Darstellung" in fig.inner_text(), "Film: ohne KI-Kennzeichnung (Wunsch der Praxis), „Schematische Darstellung“")
    check(vid.get_attribute("data-variant") == "desktop" and "desktop-1280" in s1["src"], f"Desktop: Desktop-Fassung ({s1['src']})")
    fig.locator("summary").click(); pg.wait_for_timeout(150)
    tr = fig.locator("[data-dexa-transcript]").inner_text()
    check(all(x in tr for x in ["Scanarm", "Knochenmineraldichte", "Muskelmasse", "Magermasse (dazu zählen z. B. auch die Organe)", "viszerale Fett", "keine Patientenaufnahme"]), "Film: Inhalt als Text aufklappbar")
    # Startseite: dezenter Farbschimmer im Hero (dekorativ, nur transform, Inhalt bleibt darüber)
    p0 = pg.context.new_page(); p0.goto(BASE + "/", wait_until="networkidle")
    g = p0.locator("[data-ambient=glow]")
    check(g.count() == 1 and g.get_attribute("aria-hidden") == "true", "Startseite: Farbschimmer vorhanden, aria-hidden")
    anim = p0.evaluate("getComputedStyle(document.querySelector('.hero-glow-a')).animationName")
    check(anim == "hero-drift-a", f"Farbschimmer bewegt sich ({anim})")
    check(p0.locator("[data-ambient=scan]").count() == 0, "keine Messlinie über dem Foto")
    p0.close()
    # Anhalten (WCAG 2.2.2): Film steht, Knopf wird zu „Abspielen“
    fig.get_by_role("button", name="Anhalten").click(); pg.wait_for_timeout(300)
    a1 = vstate()["t"]; pg.wait_for_timeout(1200)
    check(vstate()["paused"] and vstate()["t"] == a1 and fig.get_by_role("button", name="Abspielen").get_attribute("aria-pressed") == "true", "„Anhalten“ hält den Film an")
    fig.get_by_role("button", name="Abspielen").click(); pg.wait_for_timeout(800)
    check(not vstate()["paused"] and vstate()["t"] > a1, "„Abspielen“ startet wieder")
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
    for path, sel, mode in [("/koerperanalyse-graz", "[data-dexa-video]", "body"), ("/knochendichtemessung-graz", '[data-dexa-figure="bone"]', "bone")]:
        p2.goto(BASE + path, wait_until="networkidle")
        f = p2.locator(sel); f.scroll_into_view_if_needed(); p2.wait_for_timeout(5600)
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
    f = p3.locator("[data-dexa-video]"); f.scroll_into_view_if_needed(); p3.wait_for_timeout(3000)
    f.screenshot(path=str(OUT / "dexa-koerperanalyse-handy.png"))
    hv = f.locator("video").evaluate("v => ({paused: v.paused, src: v.currentSrc.split('/').pop(), w: Math.round(v.getBoundingClientRect().width), variant: v.dataset.variant})")
    check(not hv["paused"] and hv["variant"] == "mobil" and "mobil-960" in hv["src"], f"Handy: Handy-Fassung spielt (playsinline, stumm) ({hv})")
    check(hv["w"] >= 300, f"Handy: Film nutzt die Breite ({hv['w']} px)")
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
    check(not f.locator("[data-dexa-toggle]").is_visible(), "Bewegung reduziert: kein Abspiel-Knopf")
    p4.goto(BASE + "/koerperanalyse-graz", wait_until="networkidle")
    f = p4.locator("[data-dexa-video]"); f.scroll_into_view_if_needed(); p4.wait_for_timeout(1500)
    rv = f.locator("video").evaluate("v => ({paused: v.paused, t: v.currentTime, poster: v.poster.split('/').pop()})")
    check(rv["paused"] and rv["t"] == 0 and rv["poster"].endswith("poster.webp") and f.get_by_role("button", name="Abspielen").is_visible(),
          f"Bewegung reduziert: Film startet nicht von selbst, Standbild + „Abspielen“ ({rv})")
    p4.goto(BASE + "/", wait_until="networkidle")
    an = p4.evaluate("getComputedStyle(document.querySelector('.hero-glow-a')).animationName")
    check(an == "none", f"Bewegung reduziert: Farbschimmer steht ({an})")
    p4.goto(BASE + "/knochendichtemessung-graz", wait_until="networkidle")
    f = p4.locator('[data-dexa-figure="bone"]'); f.scroll_into_view_if_needed()
    p4.wait_for_timeout(9000)
    check(f.locator(".dexa-arm").evaluate("e => getComputedStyle(e).transform").endswith("312, 0)") or f.locator(".dexa-arm").evaluate("e => getComputedStyle(e).transform").endswith("316, 0)"), "Bewegung reduziert: keine Schleife, Endbild bleibt")
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
sys.exit(1 if fails else 0)
