#!/usr/bin/env python3
"""Titelbilder (16:9) der KI-Ratgeberserie aus den Hersteller-Beispielberichten, Stand 22.10.2026.

Jedes Titelbild ist ein Ausschnitt aus einem Beispielbericht, der bereits im Artikel steht (assets-src/ki/*.png):
nur das Röntgenbild mit den eingezeichneten Messlinien – keine Tabellen, keine Textspalten, keine Fußzeile,
keine Personenangaben (die Vorlagen sind schon bereinigt; jeden Ausschnitt trotzdem per Bildprüfung kontrollieren).

  titel-lama.png       LAMA: Ganzbeinaufnahme mit Achsen + vergrößerter Kniebereich (lama-ganzbein-1)
  titel-hippo.png      HIPPO: Becken mit Winkeln (hippo-vor-op)
  titel-squirrel.png   SQUIRREL: Wirbelsäule mit Cobb-Winkeln + vergrößerte Brustwirbelsäule (squirrel-wirbelsaeule)
  titel-frog.png       FROG: Fuß von oben + seitlich (frog-dorsoplantar, frog-seitlich)
  titel-panda.png      PANDA: Handaufnahme (panda-knochenalter; eingebrannte Kürzel/Rahmen abgedeckt)
  titel-rho.png        Rho: die drei Röntgen-Vorschaubilder der Berichte (Brustkorb, BWS, Hand)
  titel-transpara.png  Transpara: Ausschnitt der eigenen Schemagrafik transpara-auswertung (vier Ansichten + Skala)
  titel-ki.png         Übersicht: Collage 2 × 2 (HIPPO, FROG seitlich, LAMA Knie, SQUIRREL)
  (titel-koala.png     KOALA: eigene Schemagrafik, render_ki_grafiken.py titel-koala)

Koordinaten = Pixel der Vorlagen (2382 × 2899 IB-Lab-Seiten, 1648 × 2100 PANDA, 1700 × 1399 Rho, 2400 × 1800 Schema).
Aufruf:  /opt/homebrew/bin/python3 assets-src/ki/quellen/render_ki_titelbilder.py   danach: npm run images:ki
"""
import pathlib
from PIL import Image

LANCZOS = Image.Resampling.LANCZOS

HERE = pathlib.Path(__file__).resolve().parent
KI = HERE.parent  # assets-src/ki
W, H = 1920, 1080
PAD = 40
GAP = 40
BLACK = (0, 0, 0)
NAVY = (12, 8, 50)  # Hintergrund der Rho-Berichte
SEP = (71, 85, 105)  # Trennfuge der Collage (slate-600)

# Röntgenbild-Rechtecke (Box = links, oben, rechts, unten) – ermittelt über die nicht-schwarze Fläche
XR = {
    'lama': ('lama-ganzbein-1', (1428, 139, 2258, 2472)),
    'hippo': ('hippo-vor-op', (373, 151, 2009, 1549)),
    'squirrel': ('squirrel-wirbelsaeule', (1215, 187, 2268, 1756)),
    'frog-dp': ('frog-dorsoplantar', (1158, 187, 2268, 2239)),
    'frog-lat': ('frog-seitlich', (432, 187, 1962, 1219)),
    'panda': ('panda-knochenalter', (1039, 797, 1330, 1217)),   # innerhalb des roten Randstrichs
    'rho-thorax': ('rho-thorax', (221, 319, 618, 719)),          # oben/unten 8 px unter den abgerundeten Ecken
    'rho-bws': ('rho-brustwirbelsaeule', (309, 319, 531, 719)),
    'rho-hand': ('rho-hand', (217, 346, 621, 694)),            # ohne hellen Detektorrand rechts
}
# Eingebrannte Kürzel im PANDA-Bild (rotes Kürzel oben links, „76 fda“ unten links) schwarz abdecken
PANDA_BG = (7, 9, 10)  # Hintergrund des Röntgenbilds (gemessen)
# (Fläche wird senkrecht aus den Pixelzeilen darüber/darunter aufgefüllt – kein dunkler Flicken)
PANDA_COVER = [(1034, 788, 1058, 812), (1033, 1168, 1090, 1196)]


def inpaint(im, box):
    """Rechteck füllen: je Spalte linear zwischen der Zeile darüber und darunter (oben am Bildrand: nur von unten)."""
    x0, y0, x1, y1 = box
    px = im.load()
    for x in range(x0, x1 + 1):
        below = px[x, y1 + 1]
        above = px[x, y0 - 1] if y0 > 800 else below  # oben links grenzt der rote Randstrich an → nur von unten
        for y in range(y0, y1 + 1):
            t = (y - y0 + 1) / (y1 - y0 + 2)
            px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(above, below))


def load(key, sub=None):
    name, box = XR[key]
    im = Image.open(KI / f'{name}.png').convert('RGB')
    if key == 'panda':
        for r in PANDA_COVER:
            inpaint(im, r)
    im = im.crop(box)
    if sub:  # Teilausschnitt relativ zum Röntgenbild
        im = im.crop(sub)
    return im


def bright_rows(im, thr=200, cols=None):
    """Je Zeile die Zahl heller Pixel (Schrift/Ziffern) – nur in den Spalten cols (Lineal, Beschriftung)."""
    if cols:
        parts = [im.crop((a, 0, b, im.height)) for a, b in cols]
        im = Image.new('RGB', (sum(p.width for p in parts), im.height))
        x = 0
        for p in parts:
            im.paste(p, (x, 0))
            x += p.width
    g = im.convert('L').point(lambda p: 255 if p > thr else 0)
    w = im.width
    data = g.tobytes()
    return [data[y * w:(y + 1) * w].count(255) for y in range(im.height)]


def snap_crop(im, w, h, cx=0.5, cy=0.5, window=90, cols=None):
    """Wie cover(), verschiebt den Ausschnitt aber senkrecht (± window px), bis Ober- und Unterkante
    durch Zeilen ohne Schrift laufen – damit keine Lineal-Ziffer oder Beschriftung angeschnitten wird."""
    r = w / h
    cw, ch = (round(im.height * r), im.height) if im.width / im.height > r else (im.width, round(im.width / r))
    x = min(max(0, round(im.width * cx - cw / 2)), im.width - cw)
    y = min(max(0, round(im.height * cy - ch / 2)), im.height - ch)
    rows = bright_rows(im, cols=cols)
    band = lambda yy: sum(rows[max(0, yy - 8):yy + 9])
    best = min(
        (s for s in range(-window, window + 1) if 0 <= y + s and y + s + ch <= im.height),
        key=lambda s: (band(y + s) + band(y + s + ch - 1), abs(s)),
    )
    y += best
    return im.crop((x, y, x + cw, y + ch)).resize((w, h), LANCZOS)


def fit(im, w, h):
    s = min(w / im.width, h / im.height)
    return im.resize((round(im.width * s), round(im.height * s)), LANCZOS)


def cover(im, w, h, cx=0.5, cy=0.5):
    """Auf w × h zuschneiden (Bildmitte cx/cy als Anteil), dann skalieren."""
    r = w / h
    if im.width / im.height > r:
        cw, ch = round(im.height * r), im.height
    else:
        cw, ch = im.width, round(im.width / r)
    x = min(max(0, round(im.width * cx - cw / 2)), im.width - cw)
    y = min(max(0, round(im.height * cy - ch / 2)), im.height - ch)
    return im.crop((x, y, x + cw, y + ch)).resize((w, h), LANCZOS)


def canvas(bg=BLACK):
    return Image.new('RGB', (W, H), bg)


def row(panels, bg=BLACK, gap=GAP, height=H - 2 * PAD):
    """Panels nebeneinander, gemeinsame Höhe (passt Breite an), mittig."""
    c = canvas(bg)
    ims = [fit(p, 10_000, height) for p in panels]
    total = sum(i.width for i in ims) + gap * (len(ims) - 1)
    if total > W - 2 * PAD:  # zu breit → alles verkleinern
        s = (W - 2 * PAD - gap * (len(ims) - 1)) / sum(i.width for i in ims)
        ims = [i.resize((round(i.width * s), round(i.height * s)), LANCZOS) for i in ims]
        total = sum(i.width for i in ims) + gap * (len(ims) - 1)
    x = (W - total) // 2
    for i in ims:
        c.paste(i, (x, (H - i.height) // 2))
        x += i.width + gap
    return c


SQ_TEXT = [(0, 200), (360, 600)]         # SQUIRREL: Lineal links, Wirbel-Beschriftung entlang der Wirbelsäule


def lama():
    """Ganzes Bein + vergrößerter Kniebereich. Lineal-Ziffern stehen im Abstand von ~45 px (Höhe ~22 px):
    Ober-/Unterkante des Ausschnitts liegen in den Lücken (1029 und 1617 im Röntgenbild)."""
    full = load('lama')
    c = canvas()
    h = H - 2 * PAD
    a = fit(full, 10_000, h)
    d = fit(full.crop((0, 1029, full.width, 1617)), 10_000, h)
    x = (W - a.width - GAP - d.width) // 2
    c.paste(a, (x, PAD))
    c.paste(d, (x + a.width + GAP, PAD))
    return c


def hippo():
    return cover(load('hippo'), W, H, cy=0.555)  # Hüftgelenke mit Winkeln, ohne Bildvermerk darunter


def squirrel():
    """Ganze Wirbelsäule + vergrößert T1–L5 mit allen drei Cobb-Winkeln samt Endplattenlinien (Detail schmaler als 16:9)."""
    full = load('squirrel')
    c = canvas()
    h = H - 2 * PAD
    a = fit(full, 10_000, h)
    # Kanten in Lücken der Beschriftung: oben zwischen C7/„124“ und T1, unten zwischen L5 und „80“
    d = fit(full.crop((0, 36, full.width, 1144)), 10_000, h)
    x = (W - a.width - GAP - d.width) // 2
    c.paste(a, (x, PAD))
    c.paste(d, (x + a.width + GAP, PAD))
    return c


def frog():
    return row([load('frog-dp'), load('frog-lat')], height=H - 2 * PAD)


def panda():
    return row([load('panda')], bg=PANDA_BG, height=H - 2 * PAD - 40)


def rho():
    return row([load('rho-thorax'), load('rho-bws'), load('rho-hand')], bg=NAVY, gap=48, height=660)


def transpara():
    im = Image.open(KI / 'transpara-auswertung.png').convert('RGB')
    return im.crop((48, 173, 2352, 1469)).resize((W, H), LANCZOS)  # vier Ansichten, Legende, Skala; ohne Titel/Hinweis


def collage():
    """2 × 2: HIPPO | FROG seitlich / LAMA Knie | SQUIRREL – Fugen in Schiefergrau."""
    g = 12
    tw, th = (W - g) // 2, (H - g) // 2
    lama_full = load('lama')
    sq = load('squirrel')
    tiles = [
        cover(load('hippo'), tw, th, cy=0.555),
        cover(load('frog-lat'), tw, th, cy=0.55),
        cover(load('lama', (11, 1075, lama_full.width - 11, 1527)), tw, th),  # Kanten in Lineal-Lücken
        snap_crop(load('squirrel', (0, 200, sq.width, 1100)), tw, th, cy=0.5, cols=SQ_TEXT),
    ]
    c = Image.new('RGB', (W, H), SEP)
    for i, t in enumerate(tiles):
        c.paste(t, ((i % 2) * (tw + g), (i // 2) * (th + g)))
    return c


JOBS = {
    'titel-lama': lama, 'titel-hippo': hippo, 'titel-squirrel': squirrel, 'titel-frog': frog,
    'titel-panda': panda, 'titel-rho': rho, 'titel-transpara': transpara, 'titel-ki': collage,
}

if __name__ == '__main__':
    import sys
    for name, fn in JOBS.items():
        if len(sys.argv) > 1 and name not in sys.argv[1:]:
            continue
        im = fn()
        assert im.size == (W, H), (name, im.size)
        im.save(KI / f'{name}.png', optimize=True)
        print(f'{name}: {im.width}×{im.height}')
