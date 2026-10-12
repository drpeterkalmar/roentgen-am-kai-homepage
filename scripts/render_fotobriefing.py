"""Rendert docs/Fotobriefing-Roentgen-am-Kai.md als PDF und prüft die Bildnummern.

Ablauf: Markdown → HTML (Python-Paket `markdown`) → PDF (Playwright/Chromium, A4).
Prüfung: alle B-/A-Nummern aus src/data/imageBriefs.js und src/data/mediaPlan.js kommen im Briefing als
Eintrag vor, keine Nummer hat zwei Einträge, und das Briefing enthält keine Nummer, die es im Code nicht gibt.

Aufruf (zwei Interpreter, weil `markdown` und Playwright in verschiedenen Umgebungen liegen dürfen):
  python3 scripts/render_fotobriefing.py            # mit einem Python, das markdown UND playwright hat
  oder: PY_MD=<python mit markdown> /opt/homebrew/bin/python3 scripts/render_fotobriefing.py
"""
import json, os, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MD = ROOT / "docs/Fotobriefing-Roentgen-am-Kai.md"
PDF = ROOT / "docs/Fotobriefing-Roentgen-am-Kai.pdf"
HTML = ROOT / "node_modules/.cache/fotobriefing.html"

text = MD.read_text()

# --- Nummernabgleich ---
codes = json.loads(subprocess.run(["node", "--input-type=module", "-e", """
const a = await import('./src/data/mediaPlan.js'); const b = await import('./src/data/imageBriefs.js');
console.log(JSON.stringify([...new Set([...Object.keys(a.ANIMATIONS), ...Object.values(b.IMAGE_BRIEFS).map((v) => v.id).filter(Boolean)])]));
"""], cwd=ROOT, capture_output=True, text=True, check=True).stdout)
entries = re.findall(r"^### ([AB]\d{3}) – ", text, flags=re.M)
dupes = sorted({e for e in entries if entries.count(e) > 1})
missing = sorted(set(codes) - set(entries))
unknown = sorted(set(entries) - set(codes))
print(f"Einträge: {len(entries)} · im Code: {len(codes)} · doppelt: {dupes} · fehlen: {missing} · unbekannt: {unknown}")
seen_file = ROOT / "node_modules/.cache/media_ids_seen.json"
if seen_file.exists():
    seen = json.loads(seen_file.read_text())
    not_in_pdf = sorted(set(seen) - set(entries))
    print(f"Auf der Website sichtbare Nummern ({len(seen)}) ohne Eintrag: {not_in_pdf}")
    if not_in_pdf:
        sys.exit("FEHLER: Website-Nummer fehlt im Briefing")
if dupes or missing or unknown:
    sys.exit("FEHLER: Nummernabgleich")

# --- HTML ---
py_md = os.environ.get("PY_MD", sys.executable)
body = subprocess.run([py_md, "-c", "import sys, markdown; print(markdown.markdown(sys.stdin.read(), extensions=['tables']))"],
                      input=text, capture_output=True, text=True, check=True).stdout
css = """
@page { size: A4; margin: 16mm 15mm 18mm 15mm; }
* { box-sizing: border-box; }
body { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; font-size: 10pt; line-height: 1.45; color: #1e293b; }
h1 { font-size: 22pt; color: #8B2323; margin: 0 0 6mm; }
h2 { font-size: 15pt; color: #8B2323; border-bottom: 1.5pt solid #8B2323; padding-bottom: 2mm; margin: 8mm 0 4mm; break-after: avoid; }
h2.newpage { break-before: page; margin-top: 0; }
table.overview { font-size: 8.5pt; }
table.overview td, table.overview th { padding: 1.1mm 1.6mm; }
table.overview td:first-child { width: auto; white-space: nowrap; }
table.overview td:nth-child(3) { white-space: nowrap; }
h3 { font-size: 12pt; margin: 6mm 0 2mm; break-after: avoid; color: #0f172a; }
p, li { orphans: 3; widows: 3; }
table { width: 100%; border-collapse: collapse; margin: 2mm 0 4mm; font-size: 9pt; }
th, td { border: 0.6pt solid #cbd5e1; padding: 1.6mm 2mm; vertical-align: top; text-align: left; }
th { background: #f1f5f9; }
tr { break-inside: avoid; }
td:first-child { width: 30%; }
code { font-size: 8.5pt; background: #f1f5f9; padding: 0 0.4mm; white-space: nowrap; }
table.wide td:nth-child(3) { width: 22%; }
table.wide td:last-child, table.wide th:last-child { white-space: nowrap; }
/* Einzelner Bildeintrag: Überschrift + Tabelle möglichst zusammen */
h3 + table { break-before: avoid; }
.entry { break-inside: avoid; }
"""
# Schlüssel/Wert-Tabellen haben in Markdown eine leere Kopfzeile („| | |“) → entfernen
body = re.sub(r"<thead>\s*<tr>\s*<th></th>\s*<th></th>\s*</tr>\s*</thead>\s*", "", body)
# Bildeinträge als Block zusammenhalten (h3 + Tabelle)
body = re.sub(r"(<h3>[AB]\d{3} – .*?</h3>\s*<table>.*?</table>)", r'<section class="entry">\1</section>', body, flags=re.S)
# Neue Seite nur für die großen Kapitel 2 und 3; Übersichtstabelle der Fotos kompakt
body = re.sub(r"<h2>([23]\. )", r'<h2 class="newpage">\1', body)
body = re.sub(r'(<h2 class="newpage">2\. .*?</h2>\s*)<table>', r'\1<table class="overview">', body, count=1, flags=re.S)
# Übersichtstabellen: erste Spalte nicht 30 %
body = body.replace("<table>\n<thead>\n<tr>\n<th>Block", '<table class="wide">\n<thead>\n<tr>\n<th>Block')
HTML.parent.mkdir(parents=True, exist_ok=True)
HTML.write_text(f"<!doctype html><html lang='de'><head><meta charset='utf-8'><title>Foto- und Medienbriefing Röntgen am Kai</title><style>{css} table.wide td:first-child {{ width: auto; }}</style></head><body>{body}</body></html>")

# --- PDF ---
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto(HTML.as_uri(), wait_until="load")
    pg.pdf(path=str(PDF), format="A4", print_background=True, display_header_footer=True,
           header_template="<span></span>",
           footer_template="<div style='font-family:-apple-system,Helvetica Neue,Arial,sans-serif;font-size:8.5pt;color:#475569;width:100%;padding:0 15mm;display:flex;justify-content:space-between'><span>Foto- und Medienbriefing Röntgen am Kai · Stand 12.10.2026</span><span>Seite <span class='pageNumber'></span> / <span class='totalPages'></span></span></div>",
           margin={"top": "16mm", "bottom": "18mm", "left": "15mm", "right": "15mm"})
    b.close()
print("PDF:", PDF, PDF.stat().st_size // 1024, "KB")
