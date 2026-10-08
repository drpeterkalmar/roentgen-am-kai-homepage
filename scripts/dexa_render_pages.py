#!/usr/bin/env python3
"""DEXA-Beispielbefunde: anonymisierte PDFs (public/assets/dexa/*.pdf) → PNG-Vorlagen (assets-src/dexa/*.png).

Aufruf (lokal, PyMuPDF nötig): python3 scripts/dexa_render_pages.py [set]
  set = dexa (Standard, Körperanalyse) oder knochendichte (Knochendichte-Befunde, public/assets/knochendichte/).
Danach `npm run images:dexa` bzw. `npm run images:knochendichte` – erzeugt daraus AVIF/WebP (scripts/dexa-images.mjs).
Die PDFs sind die veröffentlichten, bereits anonymisierten Originale (Schwärzungen siehe Datenstruktur
src/data/dexaReportExamples.js); die getrennten Roh-Originale liegen NICHT im Repo.
Jede PDF-Datei hat genau eine Seite; gerendert wird 2400 px breit (≈ 290 dpi), damit Zoom und 2×-Displays scharf bleiben.
"""
import pathlib
import sys

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("PyMuPDF fehlt: pip install pymupdf (oder ~/.hermes/hermes-agent/venv/bin/python verwenden)")

ROOT = pathlib.Path(__file__).resolve().parent.parent
SET = sys.argv[1] if len(sys.argv) > 1 else "dexa"
if SET not in ("dexa", "knochendichte"):
    sys.exit(f"unbekanntes Set: {SET}")
SRC = ROOT / "public/assets" / SET
OUT = ROOT / "assets-src" / SET
WIDTH = 2400

OUT.mkdir(parents=True, exist_ok=True)
for pdf in sorted(SRC.glob("*.pdf")):
    doc = fitz.open(pdf)
    if doc.page_count != 1:
        sys.exit(f"{pdf.name}: {doc.page_count} Seiten – erwartet genau eine")
    page = doc[0]
    zoom = WIDTH / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    target = OUT / f"{pdf.stem}.png"
    pix.save(target)
    print(f"{target.relative_to(ROOT)}  {pix.width}×{pix.height}")
