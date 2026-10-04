"""E2E-Prüfung „Weitere Untersuchungen“ (erste Umsetzungsstufe, Prüfliste vom 04.10.2026).

Läuft gegen `vite preview` (Standard http://localhost:4174/roentgen-am-kai-homepage/) und das gebaute dist/.
Prüft Inhalt (Begriffe, Terminlogik, PUCmed, Doppelbezeichnungen, Strahlenbeispiele) und Technik
(Weiterleitungen, interne Links, SVG-Navigator per Maus/Touch/Tastatur, Textalternative, ohne JavaScript,
360 px ohne horizontales Scrollen/Überlappung, eindeutige Buttons, Fokus, axe-Kontrast).
"""
import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE_URL", "http://localhost:4174/roentgen-am-kai-homepage/")
ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
AXE = ROOT / "node_modules" / "axe-core" / "axe.min.js"

PAGES = ["weitere-untersuchungen", "roentgen-graz", "ultraschall-graz", "spezialroentgen", "zahnroentgen-dvt-graz"]
REDIRECTS = {
    "unser-angebot/roentgen": "/roentgen-graz",
    "unser-angebot/ultraschall": "/ultraschall-graz",
    "unser-angebot/dvt": "/zahnroentgen-dvt-graz",
    "unser-angebot/digitales-roentgen": "/roentgen-graz",
    "unser-angebot/digitales-roentgen/lungenroentgen": "/roentgen-graz",
    "unser-angebot/digitales-roentgen/wirbelsaeulenroentgen": "/roentgen-graz",
}
WALKIN_REQ = re.compile(r"Zuweisung[^.]{0,60}e-card|e-card[^.]{0,60}Zuweisung", re.I)

fails = []
oks = 0


def check(cond, msg):
    global oks
    if cond:
        oks += 1
    else:
        fails.append(msg)
        print("  FAIL:", msg)


def visible_text(page):
    return page.evaluate("() => document.querySelector('main').innerText")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # ---------- Inhalt ----------
        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        page.goto(BASE, wait_until="networkidle")
        nav = page.evaluate("() => [...document.querySelectorAll('header nav a, header nav button')].map(e => e.textContent.trim())")
        nav_text = " | ".join(nav)
        check("Digitales Röntgen" not in nav_text, f"Navigation enthält noch „Digitales Röntgen“: {nav_text}")
        page.goto(BASE + "weitere-untersuchungen", wait_until="networkidle")
        header_links = page.evaluate("() => [...document.querySelectorAll('header a')].map(a => a.textContent.trim())")
        for name in ["Röntgen", "Ultraschall", "Spezialröntgen mit Kontrastmittel", "Zahnröntgen und 3D-DVT"]:
            check(name in header_links, f"Header-Menü ohne Hauptbereich „{name}“")

        for slug in PAGES:
            page.goto(BASE + slug, wait_until="networkidle")
            txt = visible_text(page)
            h = page.evaluate("() => [...document.querySelectorAll('h1,h2,h3')].map(e => e.textContent)")
            check(not any("Digitales Röntgen" in x or "digitales Röntgen" in x for x in h), f"{slug}: „digitales Röntgen“ in Überschrift")
            check(page.locator("h1").count() == 1, f"{slug}: nicht genau eine H1")
            # „ohne Termin“ nie ohne Zuweisung + e-card
            for m in re.finditer(r"ohne (vorherige )?Termin", txt):
                ctx_txt = txt[max(0, m.start() - 220): m.end() + 260]
                check(WALKIN_REQ.search(ctx_txt) or "Ohne vorherige Terminvereinbarung" == txt[m.start()-0:m.end()+0], f"{slug}: „ohne Termin“ ohne Zuweisung/e-card nahe: …{ctx_txt[:120]}…")
            # Hero-Status
            hero_status = page.locator("main section").first.locator("[data-status]")
            check(hero_status.count() >= 1, f"{slug}: kein Terminstatus im Hero")
            # Status beim abschließenden CTA
            cta = page.locator("[data-exam-cta]").last
            check(cta.count() == 1 and cta.locator("[data-status]").count() >= 1, f"{slug}: kein Terminstatus beim Abschluss-CTA")

        # Übersicht: vier Bereiche, Röntgen walk-in, die anderen „Termin erforderlich“
        page.goto(BASE + "weitere-untersuchungen", wait_until="networkidle")
        txt = visible_text(page)
        check(page.locator("#ohne-termin-title").inner_text().strip() == "Ohne vorherige Terminvereinbarung", "Übersicht: Bereich 1 fehlt")
        check(page.locator("#mit-termin-title").inner_text().strip() == "Termin erforderlich", "Übersicht: Bereich 2 fehlt")
        xray_card = page.locator("[data-area='roentgen']").first
        xc = xray_card.inner_text()
        check("Ohne vorherige Terminvereinbarung möglich" in xc and WALKIN_REQ.search(xc), "Übersicht: Röntgenkarte ohne Status + Zuweisung/e-card")
        for k in ["ultraschall", "spezialroentgen", "zahn"]:
            card = page.locator(f"[data-area='{k}']").first
            check(card.count() == 1 and "Termin erforderlich" in card.inner_text(), f"Übersicht: Karte {k} ohne „Termin erforderlich“")
            check("Mehr erfahren und Termin vereinbaren" in card.inner_text(), f"Übersicht: Karte {k} ohne Button-Text")
        # Strahlenübersicht: nur 3 Beispiele, keine verbotenen
        rad = page.locator("[data-radiation]").first.inner_text()
        check(rad.count("mSv") == 3, f"Strahlenübersicht: {rad.count('mSv')} statt 3 mSv-Beispielen")
        for bad in ["Wirbelsäule", "Kontrastmittel", "Durchleuchtung", "DVT", "Banane", "Flug", "völlig ungefährlich", "strahlungsfrei"]:
            check(bad not in rad, f"Strahlenübersicht enthält „{bad}“")
        for good in ["Hand, Fuß oder einem peripheren Gelenk", "Panoramaröntgen der Zähne", "Einzelne Lungenröntgenaufnahme",
                     "typische Orientierungswerte", "Ultraschall verwendet keine ionisierende Röntgenstrahlung", "schwanger"]:
            check(good in rad, f"Strahlenübersicht ohne „{good}“")

        # Röntgen: „Direkt vorbeikommen“ → Info-Anker, kein Buchungslink
        page.goto(BASE + "roentgen-graz", wait_until="networkidle")
        dv = page.get_by_role("link", name=re.compile("^Direkt vorbeikommen"))
        check(dv.count() >= 1, "Röntgen: Button „Direkt vorbeikommen“ fehlt")
        hrefs = set(dv.evaluate_all("els => els.map(e => e.getAttribute('href'))"))
        check(all("#direkt-vorbeikommen" in h for h in hrefs), f"„Direkt vorbeikommen“ zielt nicht auf Infos: {hrefs}")
        check(all("miranext" not in h for h in hrefs), "„Direkt vorbeikommen“ führt zur Buchung")
        check(page.locator("#direkt-vorbeikommen").count() == 1, "Anker #direkt-vorbeikommen fehlt")
        dvt = page.locator("#direkt-vorbeikommen").inner_text()
        for w in ["Röntgenzeiten", "Zuweisung", "e-card", "Anfahrt"]:
            check(w in dvt, f"#direkt-vorbeikommen ohne „{w}“")
        wz = page.get_by_role("link", name=re.compile("^Wunschzeit reservieren"))
        check(wz.count() >= 1 and "miranext" in (wz.first.get_attribute("href") or ""), "„Wunschzeit reservieren“ nicht MiraNext")
        # Optik: Direkt vorbeikommen != Buchungsbutton (unterschiedliche Klassen / Hintergründe)
        bg1 = dv.first.evaluate("e => getComputedStyle(e).backgroundColor")
        bg2 = wz.first.evaluate("e => getComputedStyle(e).backgroundColor")
        check(bg1 != bg2, "„Direkt vorbeikommen“ sieht aus wie der Buchungsbutton")

        # Zuweisungssuche
        inp = page.locator("#zuweisung-suche input[role=combobox]")
        check(inp.count() == 1, "Zuweisungssuche fehlt")
        inp.fill("HWS")
        page.wait_for_timeout(100)
        opts = page.locator("[role=option]")
        check(opts.count() >= 1 and "Halswirbelsäule" in opts.first.inner_text(), "Suche HWS → Halswirbelsäule fehlt")
        inp.press("ArrowDown")
        check(inp.get_attribute("aria-activedescendant") is not None, "Suche: Pfeiltaste setzt aria-activedescendant nicht")
        inp.press("Enter")
        page.wait_for_timeout(300)
        check(any(k in page.url for k in ("region-hws", "halswirbelsaeule")), f"Suche Enter → falsches Ziel {page.url}")
        for term, target in [("Thorax", "Lunge"), ("OSG", "Sprunggelenk"), ("Beckenübersicht", "Becken"), ("Rippen", "Rippen"), ("Knie stehend", "Knie"), ("Hand ap/seitlich", "Hand")]:
            inp.fill(term)
            page.wait_for_timeout(80)
            check(page.locator("[role=option]").count() >= 1 and target in page.locator("[role=option]").first.inner_text(), f"Suche {term} → {target} fehlt")
        inp.fill("Qwxyz")
        page.wait_for_timeout(100)
        nr = page.locator("[data-no-match]")
        check(nr.count() == 1 and "Ihre Untersuchung ist nicht angeführt?" in nr.inner_text(), "Suche: Kein-Treffer-Text fehlt")
        check(nr.get_by_role("link", name=re.compile("Ordination anrufen")).count() == 1, "Kein Treffer: „Ordination anrufen“ fehlt")
        check(nr.get_by_role("link", name=re.compile("Kontakt aufnehmen")).count() == 1, "Kein Treffer: „Kontakt aufnehmen“ fehlt")
        stxt = page.locator("#zuweisung-suche").inner_text()
        check("keine medizinische Empfehlung" in stxt or "nur der Orientierung" in stxt, "Suche ohne Hinweis „keine medizinische Empfehlung“")
        # Suchziele existieren
        terms = json.loads((ROOT / "dist-ssr" / "terms.json").read_text()) if (ROOT / "dist-ssr" / "terms.json").exists() else None

        # Körpernavigator: Tastatur
        page.goto(BASE + "roentgen-graz", wait_until="networkidle")
        regions = page.locator("[data-region]")
        n = regions.count()
        check(n >= 14, f"Navigator: {n} statt ≥14 Regionen")
        names = set(regions.evaluate_all("els => els.map(e => e.dataset.region)"))
        check(len(names) == 14, f"Navigator: {len(names)} unterschiedliche Regionen statt 14")
        first = regions.first
        first.focus()
        check(page.evaluate("document.activeElement.dataset.region") is not None, "Navigator: Region nicht fokussierbar")
        page.keyboard.press("Enter")
        page.wait_for_timeout(150)
        info = page.locator("#navigator-info")
        check("Röntgen ohne vorherige Terminvereinbarung möglich" in info.inner_text(), "Navigator-Infokarte ohne Terminhinweis")
        check(WALKIN_REQ.search(info.inner_text()), "Navigator-Infokarte ohne Zuweisung/e-card")
        # Fokusring sichtbar
        outline = first.evaluate("e => { const s = getComputedStyle(e); return s.outlineStyle + ' ' + s.outlineWidth }")
        stroke = first.evaluate("e => getComputedStyle(e.querySelector('[data-shape]') || e).strokeWidth")
        check(("none" not in outline and not outline.endswith(" 0px")) or stroke not in ("0", "0px", "1px"), f"Navigator: kein sichtbarer Fokus ({outline}, stroke {stroke})")
        # Maus
        target = page.locator("[data-region='knie']").first
        target.locator("path, ellipse, rect, circle").first.click()
        page.wait_for_timeout(150)
        check("Knie" in info.inner_text(), "Navigator: Mausklick auf Knie zeigt keine Knie-Info")
        check(page.locator("[data-region='knie'][aria-pressed='true'], [data-region='knie'][aria-current='true']").count() >= 1, "Navigator: Auswahl nicht per aria-pressed/aria-current markiert")
        # Textliste
        tl = page.locator("#navigator-liste a")
        check(tl.count() >= 14, f"Textalternative: {tl.count()} statt ≥14 Links")
        check(page.locator("#navigator-hinweis").inner_text().startswith("Die Auswahl dient Ihrer Orientierung."), "Navigator-Hinweis fehlt")

        # PUCmed
        page.goto(BASE + "ultraschall-graz", wait_until="networkidle")
        pl = page.locator("a[href^='https://pucmed.at']")
        check(pl.count() >= 1, "PUCmed-Link fehlt")
        for i in range(pl.count()):
            a = pl.nth(i)
            check(a.get_attribute("href") == "https://pucmed.at/", f"PUCmed-Link falsch: {a.get_attribute('href')}")
            check(a.get_attribute("target") == "_blank", "PUCmed: kein target=_blank")
            check(set((a.get_attribute("rel") or "").split()) >= {"noopener", "noreferrer"}, "PUCmed: rel unvollständig")
            check("neuem" in a.inner_text() or "extern" in a.inner_text().lower(), "PUCmed: nicht als extern gekennzeichnet (Screenreader)")
        card = page.locator("#nervenultraschall").inner_text()
        check("Sie verlassen die Website von Röntgen am Kai und gelangen zum spezialisierten Angebot von PUCmed." in card, "PUCmed-Hinweis fehlt")
        check("Termin erforderlich" not in card and "Kasse" not in card.replace("Kassen-", ""), "Nervenultraschall wirkt wie Kassenleistung von RaK")
        check(page.locator("#nervenultraschall a[href*='miranext']").count() == 0, "Nervenultraschall mit MiraNext-Buchung")
        txt = visible_text(page)
        for w in ["Termin", "Zuweisung", "Kasse", "Vorbereitung"]:
            check(w in page.locator("main section").first.inner_text(), f"Ultraschall-Hero beantwortet „{w}“ nicht")

        # Spezialröntgen: Doppelbezeichnungen
        page.goto(BASE + "spezialroentgen", wait_until="networkidle")
        sp = page.locator("[data-special]")
        check(sp.count() == 4, f"Spezialröntgen: {sp.count()} statt 4 Karten")
        pairs = [("Schluckröntgen und Videoschluckakt", "Videokinematographie des Schluckaktes"),
                 ("Venenröntgen", "Phlebographie"),
                 ("Eileiterdurchgängigkeit mit Röntgen", "Hysterosalpingographie, HSG"),
                 ("Nierenröntgen mit Kontrastmittel", "Ausscheidungsurographie, IVP oder IVU")]
        for i, (lay, med) in enumerate(pairs):
            t = sp.nth(i).inner_text()
            check(lay in t and med in t, f"Spezialröntgen Karte {i+1}: Doppelbezeichnung fehlt")
            check("Termin erforderlich" in t and "Untersuchung ansehen" in t, f"Spezialröntgen Karte {i+1}: Label/Button fehlt")
        h = " ".join(page.evaluate("() => [...document.querySelectorAll('h1,h2')].map(e => e.textContent)"))
        check(not re.search(r"^\s*Durchleuchtung\s*$", h), "Spezialröntgen heißt nur „Durchleuchtung“")

        # DVT: nur bestätigte Leistungen
        page.goto(BASE + "zahnroentgen-dvt-graz", wait_until="networkidle")
        dent = page.locator("[data-dental]")
        check(dent.count() >= 1, "Zahnröntgen: keine Leistungen")
        ids = set(dent.evaluate_all("els => els.map(e => e.dataset.dental)"))
        check("dvt-verlagert" not in ids, "Nicht bestätigte Leistung DVT bei verlagerten Zähnen veröffentlicht")
        for want in ("dvt-gesicht", "dvt-kiefergelenk", "dvt-kraniozervikal"):
            check(want in ids, f"DVT: bestätigte Leistung {want} fehlt")
        t = visible_text(page)
        check("Art und Aufnahmebereich hängen von der zahnärztlichen beziehungsweise fachärztlichen Fragestellung ab" in t, "DVT: Hinweis Fragestellung fehlt")
        h = page.evaluate("() => [...document.querySelectorAll('h1,h2,h3,h4')].map(e => e.textContent.trim())")
        check("Digitale Volumentomographie" not in h, "„Digitale Volumentomographie“ als alleinige Überschrift")
        check(page.get_by_role("link", name=re.compile("Termin für Zahnröntgen oder DVT vereinbaren")).count() >= 1, "DVT: primärer CTA fehlt")

        # ---------- Technik: Weiterleitungen ----------
        for old, new in REDIRECTS.items():
            f = DIST / old / "index.html"
            check(f.exists(), f"Weiterleitung fehlt: {old}")
            if f.exists():
                html = f.read_text()
                check(new in html and 'http-equiv="refresh"' in html, f"Weiterleitung {old} → {new} falsch")
        # Phlebographie-URL bleibt erhalten
        check((DIST / "unser-angebot" / "phlebographie" / "index.html").exists(), "/unser-angebot/phlebographie fehlt")
        sm = (DIST / "sitemap.xml").read_text()
        for slug in PAGES:
            check(f"/{slug}</loc>" in sm, f"Sitemap ohne /{slug}")
        for old in ["unser-angebot/roentgen<", "unser-angebot/ultraschall<", "unser-angebot/dvt<"]:
            check(old not in sm, f"Sitemap enthält alte URL {old}")

        # ---------- Technik: interne Links ----------
        valid = {"/" + s for s in PAGES}
        seen = set()
        bad_links = []
        for slug in PAGES + ["unser-angebot/phlebographie", ""]:
            page.goto(BASE + slug, wait_until="networkidle")
            links = page.evaluate("() => [...document.querySelectorAll('a[href]')].map(a => a.href)")
            for href in links:
                u = urlparse(href)
                if u.netloc != urlparse(BASE).netloc or not u.path.startswith(urlparse(BASE).path):
                    continue
                key = u.path + ("#" + u.fragment if u.fragment else "")
                if key in seen:
                    continue
                seen.add(key)
                r = page.request.get(BASE.split("/roentgen")[0] + u.path)
                if r.status != 200:
                    bad_links.append((slug, href, r.status))
                    continue
                if u.fragment:
                    sub = browser.new_page()
                    sub.goto(href, wait_until="networkidle")
                    try:
                        sub.locator(f"[id='{u.fragment}']").first.wait_for(state="attached", timeout=5000)
                    except Exception:
                        bad_links.append((slug, href, "anker"))
                    sub.close()
        check(not bad_links, f"Defekte interne Links: {bad_links[:8]}")
        print(f"  interne Links geprüft: {len(seen)}")

        # ---------- Eindeutige Buttons ----------
        for slug in PAGES:
            page.goto(BASE + slug, wait_until="networkidle")
            data = page.evaluate("""() => {
              const m = new Map();
              for (const el of document.querySelectorAll('main a[href], main button')) {
                const name = (el.getAttribute('aria-label') || el.innerText || el.textContent || '').replace(/\\s+/g, ' ').trim();
                if (!name) { m.set('__EMPTY__', ['x']); continue; }
                const href = el.getAttribute('href') || 'button';
                const list = m.get(name) || []; list.push(href); m.set(name, list);
              }
              return [...m.entries()].filter(([n, h]) => n === '__EMPTY__' || new Set(h).size > 1);
            }""")
            check(not data, f"{slug}: gleiche Beschriftung, verschiedene Ziele / leere Namen: {data[:4]}")

        # ---------- Mobil 360 px + Touch ----------
        m = browser.new_context(viewport={"width": 360, "height": 780}, has_touch=True, is_mobile=True, device_scale_factor=2)
        mp = m.new_page()
        for slug in PAGES:
            mp.goto(BASE + slug, wait_until="networkidle")
            sw = mp.evaluate("document.documentElement.scrollWidth")
            check(sw <= 360, f"{slug} @360: horizontales Scrollen ({sw}px)")
            overlaps = mp.evaluate("""() => {
              const els = [...document.querySelectorAll('main a, main button, main [data-status], main h1, main h2, main h3')]
                .filter(e => e.checkVisibility() && !e.closest('svg') && !e.closest('details:not([open])'));
              const r = els.map(e => [e, e.getBoundingClientRect()]);
              const out = [];
              for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) {
                const [a, ra] = r[i], [b, rb] = r[j];
                if (a.contains(b) || b.contains(a)) continue;
                const ox = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
                const oy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
                if (ox > 2 && oy > 2) out.push([a.textContent.trim().slice(0, 30), b.textContent.trim().slice(0, 30)]);
              }
              return out.slice(0, 5);
            }""")
            check(not overlaps, f"{slug} @360: Überlappungen {overlaps}")
            small = mp.evaluate("""() => [...document.querySelectorAll('main a[href], main button, main input')]
              .filter(e => e.checkVisibility() && !e.closest('p, li > p, dd') && !e.closest('svg') && !e.closest('details:not([open])'))
              .map(e => [e.textContent.trim().slice(0, 30), e.getBoundingClientRect().height])
              .filter(([, h]) => h > 0 && h < 40)""")
            check(not small, f"{slug} @360: Touch-Ziele < 40px: {small[:5]}")
        mp.goto(BASE + "roentgen-graz", wait_until="networkidle")
        knie = mp.locator("[data-region='knie']").first
        knie.scroll_into_view_if_needed()
        knie.locator("path, ellipse, rect, circle").first.tap()
        mp.wait_for_timeout(200)
        check("Knie" in mp.locator("#navigator-info").inner_text(), "Navigator: Touch-Tap auf Knie wirkt nicht")
        m.close()

        # ---------- axe ----------
        axe_src = AXE.read_text()
        for slug in PAGES:
            for dark in (False, True):
                c = browser.new_context(viewport={"width": 1280, "height": 900}, color_scheme="dark" if dark else "light")
                pg = c.new_page()
                pg.goto(BASE + slug, wait_until="networkidle")
                pg.add_script_tag(content=axe_src)
                res = pg.evaluate("async () => (await axe.run(document, {runOnly: ['wcag2a','wcag2aa','wcag21aa','best-practice']})).violations.map(v => [v.id, v.nodes.length, v.nodes[0].target])")
                res = [r for r in res if r[0] not in ("region",)]
                check(not res, f"axe {slug} {'dark' if dark else 'light'}: {res}")
                c.close()

        # ---------- ohne JavaScript ----------
        nj = browser.new_context(java_script_enabled=False, viewport={"width": 1280, "height": 900})
        np = nj.new_page()
        for slug in PAGES + ["unser-angebot/phlebographie"]:
            np.goto(BASE + slug)
            t = np.locator("main").inner_text() if np.locator("main").count() else ""
            check(len(t) > 1500, f"{slug} ohne JS: kaum Inhalt ({len(t)} Zeichen)")
            check(np.locator("header nav a").count() >= 4, f"{slug} ohne JS: keine Navigation")
        np.goto(BASE + "roentgen-graz")
        check(np.locator("#navigator-liste a").count() >= 14, "ohne JS: Textliste des Navigators fehlt")
        check(np.locator("[data-region]").count() >= 14 and np.locator("a[data-region]").count() >= 14, "ohne JS: Navigator-Regionen sind keine Links")
        check(np.locator("[data-terms-all] a").count() >= 9, "ohne JS: Begriffsliste der Zuweisungssuche fehlt")
        check(np.locator("a[href*='#direkt-vorbeikommen']").count() >= 1, "ohne JS: „Direkt vorbeikommen“ fehlt")
        np.goto(BASE + "ultraschall-graz")
        check(np.locator("a[href='https://pucmed.at/'][rel~='noopener'][rel~='noreferrer']").count() >= 1, "ohne JS: PUCmed-Link fehlt")
        np.goto(BASE + "weitere-untersuchungen")
        hdr = np.locator("header").inner_text()
        check("Spezialröntgen" in hdr or np.locator("header a[href$='/spezialroentgen']").count() >= 1, "ohne JS: Unterpunkte im Header nicht erreichbar")
        nj.close()

        check(not errors, f"JS-Fehler: {errors[:3]}")
        browser.close()

    print(f"\ne2e_weitere_untersuchungen: {oks} OK, {len(fails)} Fehler")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
