"""E2E Interaktionen (Prompt 5): A-/B-Platzhalter, Tastaturbedienung (Menü, FAQ, Slider, Hotspots, Navigator,
Risikocheck), Buchungs-/Telefonlinks, Einblenden mit/ohne „Bewegung reduzieren“, Layoutstabilität (CLS) beim Scrollen,
Videos ohne Ton-Autoplay, axe nach vollständigem Einblenden. Desktop 1440 und Handy 390.
Aufruf: /opt/homebrew/bin/python3 tests/e2e_interaktionen.py (vite preview auf :4174)."""
import json, re, subprocess, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()
fails, oks = [], 0


def check(cond, msg):
    global oks
    if cond:
        oks += 1
        print("OK  ", msg)
    else:
        fails.append(msg)
        print("FAIL", msg)


plan = json.loads(subprocess.run(["node", "--input-type=module", "-e", """
const a = await import('./src/data/mediaPlan.js'); const b = await import('./src/data/imageBriefs.js');
const r = await import('./src/data/routes.js');
console.log(JSON.stringify({ A: Object.keys(a.ANIMATIONS), B: Object.fromEntries(Object.entries(b.IMAGE_BRIEFS).filter(([, v]) => v.id).map(([k, v]) => [k, v.id])), routes: r.routes.map((x) => x.path) }));
"""], cwd=ROOT, capture_output=True, text=True, check=True).stdout)

# Nummern eindeutig: dieselbe B-Nummer nur für dasselbe Motiv (Social-Media-Zuschnitt og* / gemeinsame Aufnahme)
by_id = {}
for k, v in plan["B"].items():
    by_id.setdefault(v, []).append(k)
dupes = {i: ks for i, ks in by_id.items() if len(ks) > 1 and not all(k.startswith("og") or k in ks[:1] or k == "ratgeberAbnehmspritze" for k in ks[1:])}
check(not dupes, f"B-Nummern nicht doppelt vergeben {dupes or ''}")
check(sorted(set(plan["B"].values())) == [f"B{n:03d}" for n in range(1, 20)], "B001–B019 lückenlos")
check(plan["A"] == [f"A{n:03d}" for n in range(1, 7)], "A001–A006 lückenlos")

EXPECT_A = {"/mammographie-graz": ["A001"], "/knochendichtemessung-graz": ["A002"], "/koerperanalyse-graz": ["A003"],
            "/roentgen-graz": ["A004", "A005"], "/weitere-untersuchungen": ["A005"], "/zahnroentgen-dvt-graz": ["A006"]}

CLS_JS = """async () => {
  let cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  const H = document.documentElement.scrollHeight;
  for (let y = 0; y < H; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
  await new Promise(r => setTimeout(r, 300)); return cls; }"""

with sync_playwright() as p:
    b = p.chromium.launch()
    seen_ids = set()
    for vp, tag, mob in [({"width": 1440, "height": 900}, "Desktop", False), ({"width": 390, "height": 844}, "Handy", True)]:
        ctx = b.new_context(viewport=vp, is_mobile=mob, has_touch=mob)
        pg = ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)[:150]))

        # 1. Platzhalter, Einblenden, CLS, Links, Videos auf allen Routen
        for r in plan["routes"]:
            pg.goto(BASE + r, wait_until="networkidle")
            ids = pg.evaluate("[...document.querySelectorAll('[data-media-id]')].map(e => e.dataset.mediaId)")
            seen_ids.update(ids)
            for a in EXPECT_A.get(r, []):
                check(a in ids, f"[{tag}] {r}: {a} platziert")
            aph = pg.evaluate("""[...document.querySelectorAll('[data-animation-placeholder]')].map(e => ({ t: e.innerText, h: e.getBoundingClientRect().height }))""")
            check(all("Format:" in x["t"] and x["h"] >= 200 for x in aph), f"[{tag}] {r}: A-Platzhalter mit Titel/Funktion/Format und fester Fläche")
            cls = pg.evaluate(CLS_JS)
            check(cls < 0.02, f"[{tag}] {r}: CLS beim Scrollen {cls:.4f}")
            bad = pg.evaluate("""[...document.querySelectorAll('a[href*="miranext"]')].filter(a => a.target !== '_blank' || !/noopener/.test(a.rel)).length""")
            check(bad == 0, f"[{tag}] {r}: Buchungslinks neuer Tab + noopener")
            tel = pg.evaluate("""[...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href'))""")
            check(len(tel) > 0 and all(re.fullmatch(r"tel:(\+43\d+|0800\d+|144)", t) for t in tel), f"[{tag}] {r}: Telefon antippbar ({len(tel)})")
            vids = pg.evaluate("[...document.querySelectorAll('video')].map(v => ({ auto: v.autoplay, muted: v.muted }))")
            check(all(not v["auto"] or v["muted"] for v in vids), f"[{tag}] {r}: kein Video mit Ton im Autoplay")
            if r in ("/", "/koerperanalyse-graz", "/roentgen-graz", "/kontakt"):
                anim = pg.evaluate("[...document.querySelectorAll('.section-reveal')].map(e => getComputedStyle(e).animationName).find(n => n !== 'none') || 'none'")
                check(anim == "rak-reveal", f"[{tag}] {r}: Abschnitte blenden ein ({anim})")
                pg.evaluate("scrollTo(0, document.documentElement.scrollHeight)"); pg.wait_for_timeout(600)
                pg.evaluate(AXE)
                v = pg.evaluate("async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa'] } })).violations.map(v => v.id + ':' + v.nodes.length + ' ' + v.nodes.slice(0, 2).map(n => n.target.join(' ').slice(0, 70)).join(' | '))")
                check(not v, f"[{tag}] {r}: axe nach Einblenden {v}")
        check(not errs, f"[{tag}] keine JS-Fehler {errs[:2]}")

        # 2. Menü per Tastatur
        pg.goto(BASE + "/", wait_until="networkidle")
        if mob:
            btn = pg.locator("button[aria-controls='mobile-menu']")
            btn.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(300)
            check(btn.get_attribute("aria-expanded") == "true", f"[{tag}] Menü öffnet per Enter")
            pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
            check(btn.get_attribute("aria-expanded") == "false", f"[{tag}] Menü schließt per Escape")
        else:
            sub = pg.locator("header nav button[aria-expanded]").first
            sub.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(200)
            check(sub.get_attribute("aria-expanded") == "true", f"[{tag}] Untermenü öffnet per Enter")
            pg.keyboard.press("Escape"); pg.wait_for_timeout(200)
            check(sub.get_attribute("aria-expanded") == "false", f"[{tag}] Untermenü schließt per Escape")

        # 3. FAQ-Akkordeon per Tastatur
        pg.goto(BASE + "/mammographie-graz", wait_until="networkidle")
        q = pg.locator("#faq button[aria-expanded]").first
        before = q.get_attribute("aria-expanded")
        q.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(250)
        check(q.get_attribute("aria-expanded") != before, f"[{tag}] FAQ klappt per Enter um")
        pg.keyboard.press("Space"); pg.wait_for_timeout(250)
        check(q.get_attribute("aria-expanded") == before, f"[{tag}] FAQ klappt per Leertaste zurück")

        # 4. Befund-Slider + Hotspots per Tastatur
        pg.goto(BASE + "/knochendichtemessung-graz#befund-lesen", wait_until="networkidle")
        nxt = pg.locator("[data-dexa-slider] button[aria-label^='Nächste']").first
        cnt = pg.locator("[data-dexa-counter]").first
        c0 = cnt.inner_text()
        nxt.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(400)
        check(cnt.inner_text() != c0, f"[{tag}] Slider blättert per Enter ({c0} → {cnt.inner_text()})")
        hs = pg.locator("[data-dexa-slider] button[aria-label]").evaluate_all("bs => bs.filter(b => b.offsetParent).map(b => b.getAttribute('aria-label'))")
        check(len(hs) >= 5 and all(len(x) > 3 for x in hs), f"[{tag}] Slider-/Hotspot-Knöpfe beschriftet ({len(hs)})")

        # 5. Körpernavigator per Tastatur
        pg.goto(BASE + "/roentgen-graz", wait_until="networkidle")
        reg = pg.locator("[data-region]").first
        reg.focus(); pg.keyboard.press("Enter"); pg.wait_for_timeout(200)
        check(pg.locator("[data-region][aria-pressed='true'], [data-region][aria-current='true']").count() >= 1, f"[{tag}] Körperregion per Enter wählbar")

        # 6. Risikocheck (Formular) per Tastatur
        pg.goto(BASE + "/knochendichtemessung-graz", wait_until="networkidle")
        inp = pg.locator("#wann input, #wann button").first
        check(inp.count() == 1, f"[{tag}] Risikocheck hat bedienbare Felder")
        unlabeled = pg.evaluate("""[...document.querySelectorAll('#wann input')].filter(i => !(i.labels && i.labels.length) && !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby')).length""")
        check(unlabeled == 0, f"[{tag}] Risikocheck: alle Felder beschriftet")
        ctx.close()

    # 7. Bewegung reduzieren: kein Einblenden
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    pg = ctx.new_page(); pg.goto(BASE + "/koerperanalyse-graz", wait_until="networkidle")
    anim = pg.evaluate("[...document.querySelectorAll('.section-reveal')].map(e => getComputedStyle(e).animationName).filter(n => n !== 'none').length")
    check(anim == 0, "Bewegung reduzieren: keine Einblend-Animation")
    ctx.close()
    b.close()

check(seen_ids >= set(plan["A"]), f"alle A-Nummern auf der Website sichtbar (fehlend: {sorted(set(plan['A']) - seen_ids)})")
check(seen_ids <= set(plan["A"]) | set(plan["B"].values()), "keine unbekannten Nummern auf der Website")
(ROOT / "node_modules/.cache/media_ids_seen.json").write_text(json.dumps(sorted(seen_ids)))
print(f"\n{oks} OK, {len(fails)} Fehler")
print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
