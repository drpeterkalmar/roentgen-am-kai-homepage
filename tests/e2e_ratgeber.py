#!/usr/bin/env python3
"""Qualitätskontrolle Ratgeber: Übersicht /ratgeber + Artikelseiten /ratgeber/<slug> (Playwright headless, axe-core).
Voraussetzung: `npm run build` und `npx vite preview --port 4174`.
Soll-Daten kommen direkt aus src/data/ratgeber.js (node-Import) – keine Kopie.
Prüft: statisches HTML (title, description, canonical, og:type article + Datum, noindex nur beim Platzhalter),
Sitemap (Artikel drin, Platzhalter nicht), Laufzeit (eine H1, Breadcrumbs sichtbar + BreadcrumbList, Article-Schema nur
bei veröffentlichten Artikeln, FAQPage nur bei sichtbarer FAQ), CTA im Artikel + am Ende (Zielseite zuerst, Buchung,
Telefon), Kategorien-Filter, Platzhalter-Artikel ohne erfundenen Text, Titel/Kurzfassung = blogPosts.js,
Überschriften ohne Sprünge, Bilder mit alt, kein horizontales Scrollen (320/390/1440), Tastatur, axe hell/dunkel.
"""
import json, sys, pathlib, subprocess, urllib.request
from playwright.sync_api import sync_playwright
from _paths import shots

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "http://localhost:4174/roentgen-am-kai-homepage"
SITE = "https://www.xn--rntgen-am-kai-imb.at"
TEL = "tel:+43" + "3168409050"
BOOK = "https://patient-portal.miranext.ai/patient-booking?c_Id=23"
AXE = (ROOT / "node_modules/axe-core/axe.min.js").read_text()
SHOTS = shots("relaunch-screenshots-ratgeber")

data = json.loads(subprocess.run(
    ["node", "--input-type=module", "-e",
     "const m = await import('./src/data/ratgeber.js'); const b = await import('./src/data/blogPosts.js');"
     "const r = await import('./src/data/routes.js');"
     "console.log(JSON.stringify({arts: m.ARTICLES.map(a => ({slug: a.slug, path: a.path, title: a.title, seo: a.seoTitle,"
     " desc: a.description, status: a.status, cat: a.category, target: m.TARGETS[a.target].to, faq: !!(a.faq && a.faq.length),"
     " date: a.datePublished, id: a.id || null, excerpt: a.excerpt})), cats: m.CATEGORIES,"
     " posts: b.blogPosts.map(p => ({id: p.id, title: p.title, excerpt: p.excerpt})),"
     " hub: r.fullTitle(r.findRoute('/ratgeber'))}))"],
    cwd=ROOT, capture_output=True, text=True, check=True).stdout)
ARTS, CATS, POSTS = data["arts"], data["cats"], {p["id"]: p for p in data["posts"]}
fails = []


def check(cond, msg):
    print(("OK   " if cond else "FAIL ") + msg)
    if not cond:
        fails.append(msg)


def esc(s):
    return s.replace("&", "&amp;").replace('"', "&quot;")


# --- 0. Datenquelle ---
check(ARTS[0]["slug"] == "abnehmspritze-muskelverlust" and ARTS[0]["title"] == "Abnehmspritze und Muskelverlust: Was passiert während der Gewichtsabnahme?"
      and ARTS[0]["status"] == "placeholder", "erster Artikel = vorbereitete Inhaltsseite „Abnehmspritze und Muskelverlust“ (Platzhalter)")
check((ROOT / "content/ratgeber/abnehmspritze-muskelverlust.md").exists(), "Inhaltsdatei content/ratgeber/abnehmspritze-muskelverlust.md vorhanden")
check({c["name"] for c in CATS} == {"DEXA & Körperanalyse", "Knochengesundheit", "Mammographie", "Röntgen"}, "4 Kategorien laut Auftrag")
check(all(any(a["cat"] == c["id"] for a in ARTS) for c in CATS), "jede Kategorie hat mindestens einen Artikel")
for a in ARTS:
    if a["id"]:
        p = POSTS[a["id"]]
        check(p["title"] == a["title"] and p["excerpt"] == a["excerpt"], f"Titel/Kurzfassung = blogPosts.js ({a['slug']})")
    check(len(a["seo"]) <= 60 and 70 <= len(a["desc"]) <= 160, f"SEO-Titel {len(a['seo'])} / Description {len(a['desc'])} Zeichen ({a['slug']})")
check(len({a["seo"] for a in ARTS}) == len(ARTS) and len({a["desc"] for a in ARTS}) == len(ARTS), "SEO-Titel und Descriptions eindeutig")

# --- 0b. Sarkopenie-Artikel (07.10.2026): fachliche Leitplanken im Text ---
SARKO = next(a for a in ARTS if a["slug"] == "sarkopenie-muskelverlust-dexa")
check(SARKO["seo"] == "Sarkopenie erkennen: Muskelverlust mit DEXA messen" and SARKO["title"] == "Sarkopenie: Wenn Muskelkraft und Muskelmasse unbemerkt abnehmen",
      "Sarkopenie-Artikel: SEO-Titel + H1 laut Auftrag")
check(SARKO["faq"] and SARKO["target"] == "/koerperanalyse-graz", "Sarkopenie-Artikel: FAQ vorhanden, Zielseite Körperanalyse")

# --- 1. Statisches HTML + Sitemap ---
sm = urllib.request.urlopen(BASE + "/sitemap.xml").read().decode()
robots = urllib.request.urlopen(BASE + "/robots.txt").read().decode()
check(f"Sitemap: {SITE}/sitemap.xml" in robots and "Disallow: /\n" not in robots, "robots.txt erlaubt Crawling + nennt Sitemap")
check(f"{SITE}/ratgeber</loc>" in sm, "Sitemap enthält /ratgeber")
for a in ARTS:
    html = urllib.request.urlopen(BASE + a["path"]).read().decode()
    pub = a["status"] == "published"
    ok = (f"<title>{esc(a['seo'])}</title>" in html and f'<link rel="canonical" href="{SITE}{a["path"]}"' in html
          and f'<meta name="description" content="{esc(a["desc"])}"' in html and 'og:type" content="article"' in html
          and html.count("<h1") == 1)
    check(ok, f"statisch {a['path']}: title/description/canonical/og:type article/eine H1")
    check(('name="robots" content="noindex' in html) == (not pub), f"noindex {'nur beim Platzhalter' if not pub else 'fehlt (richtig)'}: {a['path']}")
    check((f"{SITE}{a['path']}</loc>" in sm) == pub, f"Sitemap {'enthält' if pub else 'ohne'} {a['path']}")
    if pub:
        check(f'article:published_time" content="{a["date"]}"' in html, f"og article:published_time {a['path']}")

VIEWS = [("320", dict(viewport={"width": 320, "height": 640}, is_mobile=True, has_touch=True, device_scale_factor=2)),
         ("390", dict(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2)),
         ("1440", dict(viewport={"width": 1440, "height": 900}))]
PAGES = [{"path": "/ratgeber", "title": data["hub"], "h1": "Ratgeber"}] + [
    {"path": a["path"], "title": a["seo"], "h1": a["title"], "art": a} for a in ARTS]

with sync_playwright() as p:
    b = p.chromium.launch()
    for label, args in VIEWS:
        ctx = b.new_context(**args); pg = ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        vw = args["viewport"]["width"]
        for r in PAGES:
            errs.clear()
            resp = pg.goto(BASE + r["path"], wait_until="networkidle"); pg.wait_for_timeout(300)
            h1s = pg.locator("h1").all_inner_texts()
            ow = pg.evaluate(f"Math.max(document.documentElement.scrollWidth, window.innerWidth) - {vw}")
            ok = (resp.status == 200 and pg.title() == r["title"] and len(h1s) == 1 and h1s[0].replace("\u00ad", "").strip() == r["h1"]
                  and pg.eval_on_selector("link[rel=canonical]", "e => e.href") == SITE + r["path"] and not errs and ow <= 0)
            check(ok, f"[{label}] {r['path']} title={pg.title()[:40]!r} h1={len(h1s)} overflow={ow} errs={errs[:1]}")
            slug = r["path"].strip("/").replace("/", "_")
            if label == "390":
                pg.screenshot(path=str(SHOTS / f"{slug}-handy.png"), full_page=True)
            if label != "1440":
                continue
            pg.screenshot(path=str(SHOTS / f"{slug}-desktop.png"), full_page=True)
            # Breadcrumbs sichtbar + JSON-LD
            crumbs = pg.locator('nav[aria-label="Brotkrumen"] li').all_inner_texts()
            lds = [json.loads(x) for x in pg.eval_on_selector_all('script[type="application/ld+json"]', "s => s.map(x => x.textContent)")]
            types = [x.get("@type") for x in lds]
            bc = next((x for x in lds if x.get("@type") == "BreadcrumbList"), None)
            check(bc and [i["name"] for i in bc["itemListElement"]] == [c.strip() for c in crumbs], f"Breadcrumbs sichtbar = BreadcrumbList {r['path']} {crumbs}")
            levels = pg.eval_on_selector_all("main h1, main h2, main h3, main h4", "hs => hs.map(h => +h.tagName[1])")
            jumps = [(x, y) for x, y in zip(levels, levels[1:]) if y > x + 1]
            check(not jumps, f"Überschriften ohne Sprünge {r['path']} {jumps}")
            imgs = pg.evaluate("""(async () => { const is = [...document.querySelectorAll('main img')];
                for (const i of is) { i.loading = 'eager'; if (!i.complete) await new Promise(res => { i.onload = i.onerror = res; }); }
                return is.map(i => [i.currentSrc.split('/').pop(), i.naturalWidth, i.alt]); })()""")
            check(all(w > 0 and alt.strip() for _, w, alt in imgs), f"Bilder geladen + alt {r['path']} ({len(imgs)})")
            a = r.get("art")
            if not a:
                # Übersicht: alle Artikel verlinkt, Kategorien filtern
                for x in ARTS:
                    check(pg.locator(f'main a[href$="{x["path"]}"]').count() == 1, f"Übersicht verlinkt {x['path']}")
                first = pg.locator("main article h3").first.inner_text()
                check(first == ARTS[0]["title"], f"erster Artikel in der Übersicht: {first!r}")
                for c in CATS:
                    pg.get_by_role("button", name=c["name"]).click(); pg.wait_for_timeout(150)
                    shown = pg.locator("main article").count()
                    want = sum(1 for x in ARTS if x["cat"] == c["id"])
                    check(shown == want and pg.get_by_role("button", name=c["name"]).get_attribute("aria-pressed") == "true", f"Filter {c['name']}: {shown}/{want}")
                pg.get_by_role("button", name="Alle").click(); pg.wait_for_timeout(150)
                check(pg.locator("main article").count() == len(ARTS), "Filter Alle")
                continue
            pub = a["status"] == "published"
            check(("Article" in types) == pub, f"Article-Schema {'vorhanden' if pub else 'fehlt (Platzhalter)'} {r['path']}")
            art = next((x for x in lds if x.get("@type") == "Article"), None)
            if art:
                check(art["headline"] == a["title"] and art["datePublished"] == a["date"] and art["author"] and art["publisher"],
                      f"Article: headline/datePublished/author/publisher {r['path']}")
            check(("FAQPage" in types) == a["faq"], f"FAQPage nur bei sichtbarer FAQ {r['path']}")
            # CTA im Artikel und am Ende; Zielseite zuerst
            inline = pg.locator("aside[aria-labelledby=artikel-cta-inline]")
            end = pg.locator("section[aria-labelledby=artikel-cta-title]")
            check(inline.count() == 1 and inline.locator(f'a[href$="{a["target"]}"]').count() == 1 and inline.locator('a[data-cta="booking"]').count() == 1,
                  f"CTA im Artikel (Zielseite + Buchung) {r['path']}")
            check(end.locator('a[data-cta="booking"]').count() == 1 and end.locator(f'a[href="{TEL}"]').count() == 1 and end.locator(f'a[href$="{a["target"]}"]').count() == 1,
                  f"CTA am Ende (Buchung + Telefon + Zielseite) {r['path']}")
            first_link = pg.eval_on_selector("main article header a[data-cta=article-target]", "e => e.getAttribute('href')")
            check(first_link.endswith(a["target"]), f"primärer Link = Zielseite {a['target']} {r['path']}")
            books = pg.eval_on_selector_all('a[data-cta="booking"]', 'as => as.map(a => [a.getAttribute("href"), a.target, a.rel])')
            check(all(x[0] == BOOK and x[1] == "_blank" and "noopener" in x[2] for x in books), f"Termin-Buttons → MiraNext, neues Fenster {r['path']}")
            text = pg.locator("main article").inner_text()
            check(pg.locator("main article time").count() >= (1 if pub else 0), f"Veröffentlichungsdatum sichtbar {r['path']}")
            check(("Herausgegeben von" in text) or ("Von " in text), f"Autor/Herausgeber sichtbar {r['path']}")
            if not pub:
                ph = pg.eval_on_selector_all("[data-placeholder]", "es => es.length")
                body = pg.locator("main article .article-content").count()
                check(ph >= 2 and body == 0 and "in Vorbereitung" in text, f"Platzhalter-Artikel: deutlich markiert, kein erfundener Text ({ph} Platzhalter)")
            if a["slug"] == "sarkopenie-muskelverlust-dexa":
                t = " ".join(text.split())
                check("DEXA allein diagnostiziert keine Sarkopenie" in t and "Magermasse ist nicht gleich Muskelmasse" in t,
                      "Sarkopenie: Grenzen von DEXA ausdrücklich genannt")
                check("Bitte nicht zur Selbstdiagnose verwenden" in t and "EWGSOP2-Orientierungswerte" in t, "Sarkopenie: Grenzwerte als Orientierungswerte, keine Selbstdiagnose")
                bad = [w for w in ("Sarkopenie-Test", "Goldstandard", "heilt", "garantiert", "g Eiweiß", "Gramm Eiweiß", "pro Kilogramm Körpergewicht") if w in t]
                check(not bad, f"Sarkopenie: keine Heilversprechen / pauschalen Empfehlungen {bad}")
                base = "/roentgen-am-kai-homepage"
                hrefs = pg.eval_on_selector_all(".article-html a", "as => as.map(a => a.getAttribute('href'))")
                for need in ("/koerperanalyse-graz", "/knochendichtemessung-graz", "/gesundheitsziele/gesund-aelter-werden"):
                    check(base + need in hrefs, f"Sarkopenie: interner Link {need} (mit Basis-URL)")
                check(BOOK in hrefs, "Sarkopenie: Link zur Terminbuchung im Text")
                src = pg.locator("section[aria-labelledby=quellen-title] li").all_inner_texts()
                check(len(src) == 3 and all("doi" in s for s in src), f"Sarkopenie: 3 Quellen mit DOI am Ende ({len(src)})")
                check("Medizinisch geprüft" not in t, "Sarkopenie: kein Prüfvermerk-Platzhalter (Praxis 07.10.2026)")
                tbl = pg.locator(".article-table")
                check(tbl.count() == 1 and tbl.evaluate("e => e.scrollWidth - e.clientWidth") <= 0, "Sarkopenie: Tabelle ohne Überlauf (1440)")
        ctx.close()

    # --- Tastatur: Artikelkarte per Tab erreichbar, Fokusrahmen sichtbar ---
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto(BASE + "/ratgeber", wait_until="networkidle")
    pg.keyboard.press("Tab")
    check(pg.evaluate("document.activeElement.textContent") == "Zum Inhalt springen", "erster Tab = Skip-Link")
    reached = False
    for _ in range(40):
        pg.keyboard.press("Tab")
        info = pg.evaluate("(() => { const e = document.activeElement; const c = e.closest('article'); const s = c ? getComputedStyle(c) : null;"
                           " return { art: !!c, ring: s ? s.boxShadow !== 'none' : false }; })()")
        if info["art"]:
            reached = info["ring"]; break
    check(reached, "Artikelkarte per Tab erreichbar, Fokusrahmen sichtbar")
    pg.keyboard.press("Enter"); pg.wait_for_timeout(500)
    check("/ratgeber/" in pg.url, f"Enter öffnet Artikel ({pg.url.replace(BASE, '')})")
    pg.close()

    # --- axe WCAG AA hell + dunkel ---
    for scheme in ["light", "dark"]:
        c = b.new_context(viewport={"width": 390, "height": 900}, color_scheme=scheme)
        if scheme == "dark":
            c.add_init_script("localStorage.setItem('theme', 'dark')")
        p2 = c.new_page()
        for r in PAGES:
            p2.goto(BASE + r["path"], wait_until="networkidle"); p2.wait_for_timeout(300)
            p2.add_script_tag(content=AXE)
            res = p2.evaluate("async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return r.violations.map(v => [v.id, v.impact, v.nodes.length, v.nodes.slice(0,3).map(n => n.target.join(' '))]); }")
            check(not res, f"axe WCAG AA ({scheme}) {r['path']}: {res}")
        c.close()
    b.close()

print("RESULT:", "ALL GREEN" if not fails else f"{len(fails)} FAIL")
sys.exit(1 if fails else 0)
