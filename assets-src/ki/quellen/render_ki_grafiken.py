#!/usr/bin/env python3
"""Schematische Grafiken der KI-Ratgeberserie (selbst gezeichnet, nicht KI-generiert), Stand 22.10.2026.

KI-RHO-01        rho-ablauf.png (16:9) + rho-ablauf-mobil.png (Hochformat)
KI-TRANSPARA-02  transpara-ablauf.png (16:9) + transpara-ablauf-mobil.png (Hochformat)
KI-TRANSPARA-01  transpara-auswertung.png (4:3) + transpara-auswertung-mobil.png (Hochformat)
Titelbild KOALA  titel-koala.png (16:9) – Kniegelenk von vorne mit markiertem Gelenkspalt (kein Beispielbericht vorhanden)

Stil: Linien-Piktogramme in Markenrot #8B2323 und Grau auf Weiß, Schrift Inter/Outfit aus src/assets/fonts.
Keine Personenfotos, keine echten Röntgenbilder, keine Herstellerbilder, keine Prozentzahlen oder Schwellenwerte.
Oben rechts bleibt Platz für den Knopf „Vergrößern“ der Galerie.

Aufruf (Playwright nötig):  /opt/homebrew/bin/python3 assets-src/ki/quellen/render_ki_grafiken.py [name …]
                            (ohne Namen alle Grafiken; mit Namen nur diese, z. B. titel-koala)
danach:                     npm run images:ki
"""
import pathlib
import tempfile
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = HERE.parent  # assets-src/ki
FONTS = ROOT / "src/assets/fonts"

RED = "#8B2323"
INK = "#1E293B"
TXT = "#334155"
GRAY = "#64748B"
LIGHT = "#CBD5E1"
LINE = "#E2E8F0"
SOFT = "#F8FAFC"

CSS = f"""
@font-face {{ font-family: 'InterL'; src: url('{(FONTS / 'inter-latin-wght-normal.woff2').as_uri()}') format('woff2'); font-weight: 100 900; }}
@font-face {{ font-family: 'InterX'; src: url('{(FONTS / 'inter-latin-ext-wght-normal.woff2').as_uri()}') format('woff2'); font-weight: 100 900; }}
@font-face {{ font-family: 'OutfitL'; src: url('{(FONTS / 'outfit-latin-wght-normal.woff2').as_uri()}') format('woff2'); font-weight: 100 900; }}
@font-face {{ font-family: 'OutfitX'; src: url('{(FONTS / 'outfit-latin-ext-wght-normal.woff2').as_uri()}') format('woff2'); font-weight: 100 900; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body {{ background: #fff; }}
body {{ font-family: 'InterL', 'InterX', sans-serif; color: {TXT}; -webkit-font-smoothing: antialiased; }}
#c {{ background: #fff; position: relative; overflow: hidden; }}
h1, .t {{ font-family: 'OutfitL', 'OutfitX', sans-serif; color: {INK}; font-weight: 600; letter-spacing: -0.01em; }}
.num {{ display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: {RED}; color: #fff; font-weight: 700; flex: none; }}
.card {{ border: 3px solid {LINE}; border-radius: 22px; background: #fff; }}
.dash {{ border: 3px dashed {RED}; border-radius: 22px; background: #fff; }}
.soft {{ background: {SOFT}; border: 3px solid {LINE}; border-radius: 18px; }}
svg {{ display: block; }}
"""

SW = 'fill="none" stroke-linecap="round" stroke-linejoin="round"'


def svg(w, h, body, size_w=None):
    sw = size_w or w
    return f'<svg viewBox="0 0 {w} {h}" width="{sw}" height="{sw * h / w:.1f}" aria-hidden="true">{body}</svg>'


# ---------- Piktogramme (Linien, 160 × 120) ----------
def ico_xray():
    return svg(160, 120, f"""
<g {SW} stroke="{GRAY}" stroke-width="4">
  <rect x="10" y="8" width="10" height="98" rx="3"/><path d="M4 110 H34"/><path d="M20 24 H52"/>
  <rect x="30" y="88" width="72" height="10" rx="3"/><path d="M42 98 V108 M90 98 V108"/>
</g>
<g {SW} stroke="{RED}" stroke-width="4">
  <rect x="46" y="14" width="40" height="24" rx="6"/>
  <path d="M56 38 L44 82 M76 38 L88 82" stroke-dasharray="6 7"/>
</g>
<g {SW} stroke="{GRAY}" stroke-width="4">
  <path d="M116 46 H142 L152 56 V100 H116 Z"/><path d="M142 46 V56 H152"/>
  <path d="M123 66 H145 M123 76 H145 M123 86 H137" stroke-width="3.5"/>
</g>""")


def ico_check_image():
    return svg(160, 120, f"""
<g {SW} stroke="{GRAY}" stroke-width="4"><rect x="22" y="10" width="96" height="92" rx="8"/></g>
<g {SW} stroke="{LIGHT}" stroke-width="4">
  <rect x="58" y="20" width="24" height="14" rx="5"/><rect x="58" y="40" width="24" height="14" rx="5"/>
  <rect x="58" y="60" width="24" height="14" rx="5"/><rect x="58" y="80" width="24" height="14" rx="5"/>
  <path d="M50 30 C40 32 36 40 34 50 M90 30 C100 32 104 40 106 50 M50 50 C42 52 38 60 36 68 M90 50 C98 52 102 60 104 68"/>
</g>
<circle cx="122" cy="88" r="24" fill="#fff" stroke="{RED}" stroke-width="4"/>
<path d="M110 88 L119 97 L135 79" {SW} stroke="{RED}" stroke-width="5"/>""")


def ico_scale():
    segs = "".join(f'<path d="M{20 + i * 12} 58 V74"/>' for i in range(1, 10))
    return svg(160, 120, f"""
<g {SW} stroke="{GRAY}" stroke-width="4"><rect x="20" y="58" width="120" height="16" rx="4"/></g>
<g {SW} stroke="{GRAY}" stroke-width="2.5">{segs}</g>
<text x="26" y="110" font-size="28" font-weight="700" fill="{GRAY}" text-anchor="middle" font-family="InterL">1</text>
<text x="134" y="110" font-size="28" font-weight="700" fill="{GRAY}" text-anchor="middle" font-family="InterL">10</text>
<path d="M86 22 H110 L98 46 Z" fill="{RED}" stroke="{RED}" stroke-width="3" stroke-linejoin="round"/>""")


def ico_doctor_monitor():
    return svg(160, 120, f"""
<g {SW} stroke="{GRAY}" stroke-width="4">
  <rect x="60" y="12" width="92" height="64" rx="6"/><path d="M106 76 V92 M88 94 H124"/>
</g>
<g {SW} stroke="{GRAY}" stroke-width="3.5"><path d="M74 30 H118 M74 42 H136 M74 54 H110"/></g>
<g {SW} stroke="{RED}" stroke-width="4">
  <circle cx="34" cy="50" r="14"/><path d="M8 110 C8 84 60 84 60 110"/>
</g>""")


def ico_talk():
    return svg(160, 120, f"""
<g {SW} stroke="{RED}" stroke-width="4"><path d="M14 20 H86 Q94 20 94 28 V60 Q94 68 86 68 H44 L28 82 V68 H22 Q14 68 14 60 V28 Q14 20 22 20 Z"/></g>
<g {SW} stroke="{GRAY}" stroke-width="4"><path d="M108 46 H140 Q148 46 148 54 V84 Q148 92 140 92 H136 V104 L122 92 H82 Q74 92 74 84 V80"/></g>""")


def breast_path(w, h, view, x0=0, y0=0, flip=False):
    """Schematische Brustkontur (keine echte Aufnahme). Brustwand rechts, Mamille links; flip = linke Brust."""
    def X(f):
        return x0 + (w * (1 - f) if flip else w * f)

    def Y(f):
        return y0 + h * f
    if view == "cc":
        d = (f"M{X(1):.1f} {Y(.12):.1f} C{X(.42):.1f} {Y(.12):.1f} {X(.1):.1f} {Y(.32):.1f} {X(.1):.1f} {Y(.5):.1f} "
             f"C{X(.1):.1f} {Y(.68):.1f} {X(.42):.1f} {Y(.88):.1f} {X(1):.1f} {Y(.88):.1f} Z")
        muscle = ""
        tissue = [(.95, .3, .45, .4, .22, .48), (.95, .5, .5, .5, .2, .52), (.95, .7, .45, .62, .24, .55)]
        nip = (.1, .5)
    else:
        d = (f"M{X(1):.1f} {Y(.02):.1f} C{X(.62):.1f} {Y(.14):.1f} {X(.14):.1f} {Y(.44):.1f} {X(.14):.1f} {Y(.64):.1f} "
             f"C{X(.14):.1f} {Y(.84):.1f} {X(.48):.1f} {Y(.96):.1f} {X(1):.1f} {Y(.96):.1f} Z")
        muscle = f"M{X(1):.1f} {Y(.02):.1f} L{X(.7):.1f} {Y(.12):.1f} L{X(1):.1f} {Y(.52):.1f} Z"
        tissue = [(.92, .4, .5, .48, .26, .6), (.92, .62, .5, .64, .24, .66), (.92, .82, .52, .78, .3, .72)]
        nip = (.14, .64)
    t = f'<circle cx="{X(nip[0] - .03):.1f}" cy="{Y(nip[1]):.1f}" r="{w * .025:.1f}" fill="#AAB3BF" stroke="#8A94A3" stroke-width="2.5"/>' + "".join(f'<path d="M{X(a):.1f} {Y(b):.1f} Q{X(c):.1f} {Y(e):.1f} {X(f):.1f} {Y(g):.1f}"/>' for a, b, c, e, f, g in tissue)
    return d, muscle, t


def mammo_view(w, h, view, flip, marker=None, label_size=None):
    d, muscle, t = breast_path(w, h, view, flip=flip)
    m = f'<path d="{muscle}" fill="#B8C0CB" stroke="none"/>' if muscle else ""
    mk = ""
    if marker:
        cx, cy, r, val, fs = marker
        cx, cy = (w * (1 - cx) if flip else w * cx), h * cy
        bw, bh = fs * 1.8, fs * 1.4
        bx, by = w - bw - 14, 14
        mk = (f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r}" fill="none" stroke="{RED}" stroke-width="5"/>'
              f'<path d="M{cx + r * .72:.1f} {cy - r * .72:.1f} L{bx + bw / 2:.1f} {by + bh:.1f}" stroke="{RED}" stroke-width="3.5" stroke-linecap="round"/>'
              f'<rect x="{bx:.1f}" y="{by:.1f}" width="{bw:.1f}" height="{bh:.1f}" rx="{fs * .25:.1f}" fill="{RED}"/>'
              f'<text x="{bx + bw / 2:.1f}" y="{by + bh / 2 + fs * .36:.1f}" font-size="{fs}" font-weight="700" fill="#fff" '
              f'text-anchor="middle" font-family="InterL">{val}</text>')
    return (f'<svg viewBox="0 0 {w} {h}" width="100%" aria-hidden="true">'
            f'<rect width="{w}" height="{h}" rx="14" fill="#EEF1F4"/>'
            f'<path d="{d}" fill="#D3D9E0" stroke="#8A94A3" stroke-width="3"/>{m}'
            f'<g fill="none" stroke="#97A1AE" stroke-width="3" stroke-linecap="round">{t}</g>{mk}</svg>')


def ico_mammo_2d():
    """Vier Ansichten: je Brust von oben und schräg (gespiegelt, Brustwände zueinander)."""
    parts = []
    for col, (x, flip) in enumerate([(14, False), (82, True)]):
        for row, (y, view) in enumerate([(8, "mlo"), (64, "cc")]):
            d = breast_path(56, 46, view, x + 4, y + 2, flip=flip)[0]
            parts.append(f'<rect x="{x}" y="{y}" width="64" height="50" rx="5" fill="none" stroke="{GRAY}" stroke-width="3.5"/>'
                         f'<path d="{d}" fill="none" stroke="{RED}" stroke-width="3"/>')
    return svg(160, 120, "".join(parts))


def ico_store():
    return svg(160, 120, f"""
<g {SW} stroke="{GRAY}" stroke-width="4">
  <ellipse cx="38" cy="26" rx="26" ry="9"/><path d="M12 26 V90 C12 100 64 100 64 90 V26"/>
  <path d="M12 48 C12 58 64 58 64 48 M12 70 C12 80 64 80 64 70"/>
  <rect x="100" y="30" width="52" height="40" rx="5"/><path d="M126 70 V82 M114 84 H138"/>
</g>
<g {SW} stroke="{RED}" stroke-width="4"><path d="M72 52 H92 M84 44 L92 52 L84 60"/></g>""")


def ico_ki():
    a = breast_path(84, 82, "mlo", 34, 18)
    return svg(160, 120, f"""
<g {SW} stroke="{GRAY}" stroke-width="4"><rect x="30" y="10" width="100" height="94" rx="8"/></g>
<path d="{a[0]}" fill="none" stroke="{GRAY}" stroke-width="3"/>
<circle cx="70" cy="62" r="15" fill="none" stroke="{RED}" stroke-width="4" stroke-dasharray="7 5"/>
<g {SW} stroke="{RED}" stroke-width="3.5"><rect x="94" y="66" width="64" height="36" rx="6" fill="#fff"/></g>
<text x="126" y="92" font-size="22" font-weight="700" fill="{RED}" text-anchor="middle" font-family="InterL">1–99</text>""")


def ico_report():
    return svg(160, 120, f"""
<g {SW} stroke="{GRAY}" stroke-width="4"><path d="M30 8 H88 L108 28 V112 H30 Z"/><path d="M88 8 V28 H108"/></g>
<g {SW} stroke="{GRAY}" stroke-width="3.5"><path d="M42 40 H84 M42 54 H96 M42 68 H90 M42 82 H70"/></g>
<g {SW} stroke="{RED}" stroke-width="4"><path d="M146 34 L156 44 L110 90 L96 96 L102 82 Z"/><path d="M138 42 L148 52"/>
<path d="M44 100 C54 92 60 104 70 96 S84 98 90 100"/></g>""")


def check_icon(size):
    return svg(48, 48, f'<circle cx="24" cy="24" r="20" fill="none" stroke="{RED}" stroke-width="3.5"/>'
                       f'<path d="M15 24 L21 30 L33 17" {SW} stroke="{RED}" stroke-width="4"/>', size)


def info_icon(size):
    return svg(48, 48, f'<circle cx="24" cy="24" r="20" fill="none" stroke="{RED}" stroke-width="3.5"/>'
                       f'<path d="M24 22 V34" {SW} stroke="{RED}" stroke-width="4"/><circle cx="24" cy="14.5" r="2.6" fill="{RED}"/>', size)


def arrow_right(w=40):
    return svg(44, 40, f'<path d="M4 20 H36 M26 10 L37 20 L26 30" {SW} stroke="#475569" stroke-width="5"/>', w)


def arrow_down(w=40, dashed=False, color="#475569"):
    da = ' stroke-dasharray="7 7"' if dashed else ''
    return svg(40, 56, f'<path d="M20 4 V44"{da} {SW} stroke="{color}" stroke-width="5"/>'
                       f'<path d="M9 35 L20 47 L31 35" {SW} stroke="{color}" stroke-width="5"/>', w)


def page(w, h, inner, extra_css=""):
    hh = f"height:{h}px;" if h else ""
    return f"""<!doctype html><html lang="de-AT"><head><meta charset="utf-8"><style>{CSS}{extra_css}</style></head>
<body><div id="c" style="width:{w}px;{hh}">{inner}</div></body></html>"""


# ---------- Ablauf (gemeinsamer Aufbau) ----------
def flow_desktop(title, steps, below, fs):
    """steps: [(icon, titel, text)], below: HTML unter der Schrittreihe."""
    n = len(steps)
    cols = f" {fs.get('gap', 52)}px ".join(["minmax(0,1fr)"] * n)
    cells = []
    for i, (ico, t, txt) in enumerate(steps, 1):
        cells.append(f"""<div class="card" style="padding:24px {fs.get('pad', 24)}px 26px;display:flex;flex-direction:column;">
  <div style="display:flex;align-items:flex-start;gap:12px;"><span class="num" style="width:{fs['num']}px;height:{fs['num']}px;font-size:{fs['num'] * .55:.0f}px">{i}</span>
  <div style="flex:1;display:flex;justify-content:center;">{ico.replace('<svg ', f'<svg style="width:{fs["ico"]}px;height:auto" ', 1)}</div></div>
  <p class="t" style="font-size:{fs['title']}px;line-height:1.15;margin-top:18px;min-height:2.3em;">{t}</p>
  <p style="font-size:{fs['text']}px;line-height:1.32;margin-top:10px;">{txt}</p></div>""")
        if i < n:
            cells.append(f'<div style="display:flex;align-items:center;justify-content:center;">{arrow_right(fs.get("gap", 52) - 10)}</div>')
    return f"""<div style="padding:44px 52px 40px;height:100%;display:flex;flex-direction:column;">
<h1 style="font-size:{fs['h1']}px;line-height:1.1;max-width:1100px;">{title}</h1>
<div style="display:grid;grid-template-columns:{cols};margin-top:30px;">{''.join(cells)}</div>
{below}</div>"""


def flow_mobile(title, steps, below, fs):
    rows = []
    for i, (ico, t, txt) in enumerate(steps, 1):
        rows.append(f"""<div class="card" style="display:grid;grid-template-columns:{fs['ico'] + 20}px 1fr;gap:22px;padding:26px 28px;align-items:start;">
  <div style="display:flex;flex-direction:column;align-items:center;gap:14px;">
    <span class="num" style="width:{fs['num']}px;height:{fs['num']}px;font-size:{fs['num'] * .55:.0f}px">{i}</span>
    {ico.replace('<svg ', f'<svg style="width:{fs["ico"]}px;height:auto" ', 1)}</div>
  <div><p class="t" style="font-size:{fs['title']}px;line-height:1.15;">{t}</p>
  <p style="font-size:{fs['text']}px;line-height:1.32;margin-top:10px;">{txt}</p></div></div>""")
        if i < len(steps):
            rows.append(f'<div style="display:flex;padding-left:{3 + 28 + (fs["ico"] + 20) / 2 - 18:.0f}px;margin:4px 0;">{arrow_down(36)}</div>')
    return f"""<div style="padding:40px 40px 44px;">
<h1 style="font-size:{fs['h1']}px;line-height:1.12;max-width:540px;">{title}</h1>
<div style="margin-top:30px;">{''.join(rows)}</div>{below}</div>"""


# ---------- KI-RHO-01 ----------
RHO_TITLE = "Zusatzanalyse mit Rho – so läuft sie ab"
RHO_STEPS = [
    (ico_xray(), "Röntgen wie gewohnt", "Aufnahme für die Fragestellung auf der Zuweisung"),
    (ico_check_image(), "Geeignete Aufnahme?", "Person ab 50, geeignete Frontalaufnahme nach den Kriterien der Praxis"),
    (ico_scale(), "Rho-Score 1–10", "Software berechnet im Hintergrund einen Wahrscheinlichkeits&shy;wert"),
    (ico_doctor_monitor(), "Ärztliche Beurteilung", "Die Radiologin bzw. der Radiologe prüft das Ergebnis&nbsp;– bei auffälligem Wert Hinweis im Befund"),
]
RHO_BRANCH = "<strong style='color:%s'>Bei Hinweis:</strong> Gespräch mit der Ärztin bzw. dem Arzt&nbsp;– gegebenenfalls Knochen&shy;dichtemessung&nbsp;(DEXA)" % RED
RHO_FOOT = ["Keine zusätzliche Röntgenaufnahme", "Keine Diagnose – kein Ersatz für DEXA"]


def foot_boxes(items, fs, direction="row"):
    icons = [check_icon, info_icon]
    return f"""<div style="display:flex;flex-direction:{direction};gap:18px;">{''.join(
        f'<div class="soft" style="flex:1;display:flex;align-items:center;gap:16px;padding:18px 22px;">{icons[i](fs["fi"])}'
        f'<span style="font-size:{fs["foot"]}px;line-height:1.25;font-weight:600;color:{INK}">{t}</span></div>' for i, t in enumerate(items))}</div>"""


def rho_desktop():
    fs = dict(h1=50, title=35, text=29, num=46, ico=168, foot=28, fi=44)
    below = f"""<div style="display:grid;grid-template-columns:minmax(0,1fr) 52px minmax(0,1fr) 52px minmax(0,1fr) 52px minmax(0,1fr);margin-top:6px;">
  <div style="grid-column:7;grid-row:1;display:flex;justify-content:center;">{arrow_down(34, True, RED)}</div>
  <div style="grid-column:1 / 4;grid-row:2;">{foot_boxes(RHO_FOOT, fs, direction="column")}</div>
  <div class="dash" style="grid-column:5 / 8;grid-row:2;align-self:stretch;display:flex;gap:18px;align-items:center;padding:20px 24px;">{ico_talk().replace('<svg ', '<svg style="width:96px;height:auto;flex:none" ', 1)}
    <p style="font-size:{fs['text']}px;line-height:1.3;color:{INK}">{RHO_BRANCH}</p></div></div>"""
    return page(1600, 900, flow_desktop(RHO_TITLE, RHO_STEPS, below, fs))


def rho_mobile():
    fs = dict(h1=54, title=44, text=38, num=50, ico=130, foot=36, fi=52)
    below = f"""<div style="display:flex;padding-left:{3 + 28 + (fs['ico'] + 20) / 2 - 18:.0f}px;margin:4px 0;">{arrow_down(36, True, RED)}</div>
<div class="dash" style="padding:24px 28px;"><p style="font-size:{fs['text']}px;line-height:1.3;color:{INK}">{RHO_BRANCH}</p></div>
<div style="margin-top:44px;">{foot_boxes(RHO_FOOT, fs, direction="column")}</div>"""
    return page(1000, None, flow_mobile(RHO_TITLE, RHO_STEPS, below, fs))


# ---------- KI-TRANSPARA-02 ----------
TP_TITLE = "KI-unterstützte Mammographie – der Ablauf"
TP_STEPS = [
    (ico_mammo_2d(), "Mammographie", "Zwei <span style='white-space:nowrap'>2D-Aufnahmen</span> je Brust"),
    (ico_store(), "Bilder bereitstellen", "Die Bilder werden gespeichert und für die Befundung bereitgestellt"),
    (ico_ki(), "KI-Auswertung", "Die Software markiert auffällige Bereiche und gibt je Markierung einen Wert <span style='white-space:nowrap'>(1–99)</span> an"),
    (ico_doctor_monitor(), "Ärztliche Beurteilung", "Radiologin oder Radiologe beurteilt alle Bilder und prüft die Markierungen"),
    (ico_report(), "Ärztlicher Befund", "Bei Auffälligkeiten entscheiden Ärztinnen und Ärzte über die weitere Abklärung"),
]
TP_NOTE = ("<strong style='color:%s'>Ablauf bei Röntgen am Kai</strong> – die KI-Auswertung läuft lokal in der Praxis "
           "und stellt keine&nbsp;Diagnose" % RED)


def tp_desktop():
    fs = dict(h1=50, title=31, text=27, num=40, ico=128, foot=30, fi=48, gap=36, pad=20)
    below = f"""<div class="soft" style="margin-top:auto;display:flex;align-items:center;gap:20px;padding:24px 30px;">{info_icon(52)}
<p style="font-size:{fs['foot']}px;line-height:1.3;color:{INK}">{TP_NOTE}</p></div>"""
    return page(1600, 900, flow_desktop(TP_TITLE, TP_STEPS, below, fs))


def tp_mobile():
    fs = dict(h1=54, title=44, text=38, num=50, ico=130, foot=38, fi=56)
    below = f"""<div class="soft" style="margin-top:30px;display:flex;align-items:flex-start;gap:20px;padding:26px 28px;">{info_icon(56)}
<p style="font-size:{fs['foot']}px;line-height:1.3;color:{INK}">{TP_NOTE}</p></div>"""
    return page(1000, None, flow_mobile(TP_TITLE, TP_STEPS, below, fs))


# ---------- KI-TRANSPARA-01 ----------
VIEWS = [("rechts, schräg", "mlo", False), ("links, schräg", "mlo", True), ("rechts, von oben", "cc", False), ("links, von oben", "cc", True)]
HINT = "Markierung = Hinweis zur ärztlichen Prüfung, keine Diagnose"


def scale_row(cell, fs, hi=72):
    """Wert der Markierung als Balken 1–99 (Praxis: Region Score am Befundplatz), Beispielwert hervorgehoben.
    Bewusst ohne Schwellen-/Ampelzonen: die praxisinterne Schwelle wird nicht veröffentlicht."""
    pos = (hi - 1) / 98 * 100
    bar = (f'<div style="position:relative;height:{cell}px;">'
           f'<div style="position:absolute;left:0;right:0;top:{cell * .3:.0f}px;height:{cell * .4:.0f}px;border-radius:999px;'
           f'border:3px solid {LIGHT};background:linear-gradient(90deg,#F8FAFC,#E2E8F0);"></div>'
           f'<div style="position:absolute;left:{pos:.1f}%;top:0;transform:translateX(-50%);height:{cell}px;min-width:{cell * 1.25:.0f}px;'
           f'padding:0 14px;border-radius:12px;background:{RED};color:#fff;display:flex;align-items:center;justify-content:center;'
           f'font-size:{fs}px;font-weight:700;">{hi}</div></div>')
    ends = (f'<div style="display:flex;justify-content:space-between;margin-top:10px;font-size:{fs * .8:.0f}px;color:{GRAY};">'
            f'<span><strong style="color:{TXT}">1</strong>&nbsp; ← weniger auffällig</span><span>auffälliger → &nbsp;<strong style="color:{TXT}">99</strong></span></div>')
    return bar + ends


def view_cell(label, view, flip, marker, fs, w=300, h=440):
    return (f'<div><div>{mammo_view(w, h, view, flip, marker)}</div>'
            f'<p style="font-size:{fs}px;text-align:center;margin-top:10px;color:{TXT};font-weight:500">{label}</p></div>')


def legend(fs):
    circ = svg(48, 48, f'<circle cx="24" cy="24" r="17" fill="none" stroke="{RED}" stroke-width="4"/>', fs * 1.3)
    return (f'<div style="display:flex;align-items:center;gap:14px;">{circ}<span style="font-size:{fs}px;line-height:1.25">'
            f'Markierter Bereich mit zugehörigem Wert der Software (Beispiel)</span></div>')


def report_desktop():
    mk = (.62, .42, 36, "72", 34)
    views = "".join(view_cell(l, v, f, mk if i == 1 else None, 30) for i, (l, v, f) in enumerate(VIEWS))
    inner = f"""<div style="padding:44px 56px;height:100%;display:flex;flex-direction:column;">
<h1 style="font-size:50px;line-height:1.1;max-width:1100px;">KI-Auswertungsansicht – Schema</h1>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:28px;margin-top:30px;">{views}</div>
<div style="margin-top:22px;">{legend(30)}</div>
<div style="margin-top:30px;"><p class="t" style="font-size:36px;">Wert der Markierung <span style="font-weight:500;color:{GRAY}">(Skala 1–99, Beispielwert hervorgehoben)</span></p>
<div style="margin-top:16px;">{scale_row(78, 38)}</div></div>
<div class="dash" style="margin-top:auto;display:flex;align-items:center;gap:20px;padding:22px 28px;">{info_icon(56)}
<p style="font-size:36px;line-height:1.25;font-weight:600;color:{INK}">{HINT}</p></div></div>"""
    return page(1600, 1200, inner)


def report_mobile():
    mk = (.62, .42, 38, "72", 44)
    views = "".join(view_cell(l, v, f, mk if i == 1 else None, 34, h=340) for i, (l, v, f) in enumerate(VIEWS))
    inner = f"""<div style="padding:40px 40px 44px;">
<h1 style="font-size:54px;line-height:1.12;max-width:540px;">KI-Auswertungs-<br>ansicht&nbsp;– Schema</h1>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px 28px;margin-top:30px;padding:0 70px;">{views}</div>
<div style="margin-top:20px;">{legend(36)}</div>
<p class="t" style="font-size:44px;margin-top:34px;">Wert der Markierung</p>
<p style="font-size:34px;color:{GRAY};margin-top:4px;">Skala 1–99, Beispielwert hervorgehoben</p>
<div style="margin-top:16px;">{scale_row(84, 40)}</div>
<div class="dash" style="margin-top:34px;display:flex;align-items:center;gap:20px;padding:24px 26px;">{info_icon(60)}
<p style="font-size:40px;line-height:1.25;font-weight:600;color:{INK}">{HINT}</p></div></div>"""
    return page(1000, None, inner)


# ---------- Titelbild KOALA: Kniegelenk von vorne (Schema) ----------
def knee_svg():
    """Rechtes Knie von vorne (Wadenbein links im Bild = außen), Gelenkspalt innen und außen rot markiert."""
    fill = 'fill="#F1F5F9"'
    st = f'stroke="{GRAY}" stroke-width="5" stroke-linejoin="round"'
    femur = ("M715 -20 L715 230 C715 290 610 310 600 380 C592 440 620 478 680 482 C730 485 765 465 785 440 "
             "Q800 425 815 440 C835 465 870 485 920 482 C980 478 1008 440 1000 380 C990 310 885 290 885 230 L885 -20 Z")
    tibia = ("M585 532 C600 522 700 526 760 530 C772 530 776 512 787 510 C794 509 797 519 800 519 C803 519 806 509 813 510 "
             "C824 512 828 530 840 530 C900 526 1000 522 1015 532 "
             "C1022 560 1000 600 950 625 C905 648 895 680 893 720 L893 920 L707 920 L707 720 C705 680 695 648 650 625 "
             "C600 600 578 560 585 532 Z")
    fibula = ("M600 586 C584 582 560 598 562 628 C564 660 590 690 606 712 L612 920 L648 920 L646 712 "
              "C652 690 668 660 664 630 C660 602 628 584 600 586 Z")

    def gap(x, y0, y1):  # „Messbalken“ für die Gelenkspaltbreite
        return (f'<g stroke="{RED}" stroke-width="7" stroke-linecap="round"><path d="M{x} {y0} V{y1}"/>'
                f'<path d="M{x - 22} {y0} H{x + 22} M{x - 22} {y1} H{x + 22}"/></g>')

    def lead(x0, x1, y):
        return f'<path d="M{x0} {y} H{x1}" stroke="#94A3B8" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>'

    body = f"""
<path d="{fibula}" {fill} {st}/>
<path d="{tibia}" {fill} {st}/>
<path d="{femur}" {fill} {st}/>
<path d="M722 252 C722 216 760 200 800 200 C840 200 878 216 878 252 C878 302 840 358 800 392 C760 358 722 302 722 252 Z" fill="none" stroke="#94A3B8" stroke-width="5" stroke-dasharray="14 11"/>
{gap(668, 487, 526)}{gap(932, 487, 526)}
{lead(470, 630, 506)}{lead(970, 1130, 506)}"""
    return svg(1600, 900, body, 1600)


def koala_title():
    inner = f"""<div style="position:relative;width:1600px;height:900px;">
<div style="position:absolute;inset:0;">{knee_svg()}</div>
<p style="position:absolute;left:60px;top:446px;width:400px;text-align:right;font-size:52px;line-height:1.12;color:{INK};font-weight:500;">Gelenkspalt<br>außen</p>
<p style="position:absolute;left:1140px;top:446px;width:400px;font-size:52px;line-height:1.12;color:{INK};font-weight:500;">Gelenkspalt<br>innen</p>
<div style="position:absolute;left:56px;top:48px;">
  <h1 style="font-size:58px;line-height:1.1;">Kniegelenk von vorne</h1>
  <p style="font-size:44px;color:{TXT};margin-top:8px;">Schema, rechtes Knie</p>
</div>
</div>"""
    return page(1600, 900, inner)


JOBS = [
    ("rho-ablauf", rho_desktop, 2400), ("rho-ablauf-mobil", rho_mobile, 1800),
    ("transpara-ablauf", tp_desktop, 2400), ("transpara-ablauf-mobil", tp_mobile, 1800),
    ("transpara-auswertung", report_desktop, 2400), ("transpara-auswertung-mobil", report_mobile, 1800),
    ("titel-koala", koala_title, 1920),
]

if __name__ == "__main__":
    import sys
    only = set(sys.argv[1:])
    with sync_playwright() as pw:
        br = pw.chromium.launch()
        for name, fn, target in JOBS:
            if only and name not in only:
                continue
            html = fn()
            tmp = pathlib.Path(tempfile.mkdtemp()) / f"{name}.html"   # Zwischen-HTML (enthält lokale Schriftpfade) nicht ins Repo
            tmp.write_text(html, encoding="utf-8")
            w = 1600 if target in (2400, 1920) else 1000
            pg = br.new_page(viewport={"width": w, "height": 900}, device_scale_factor=target / w)
            pg.goto(tmp.as_uri())
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(200)
            fonts = pg.evaluate("[...document.fonts].filter(f => f.status === 'loaded').map(f => f.family)")
            el = pg.locator("#c")
            box = el.bounding_box()
            over = pg.evaluate("(() => { const c = document.querySelector('#c'); return [...c.querySelectorAll('*')].filter(e => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflow !== 'visible').length + (c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1 ? 100 : 0) + [...c.querySelectorAll(':scope > * *')].filter(e => e.getBoundingClientRect().right > c.clientWidth - 20).length * 1000; })()")
            el.screenshot(path=str(OUT / f"{name}.png"))
            print(f"{name}: {box['width']:.0f}×{box['height']:.0f} → {target}px, Schriften {sorted(set(fonts))}, Überlauf {over}")
            pg.close()
        br.close()
