#!/usr/bin/env python3
# Blender-Render (RGBA) auf den dunklen Verlaufsgrund der Grafik setzen (wie die SVG-Felder: #1e293b → #020617)
import sys
from PIL import Image
import numpy as np

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGBA')
w, h = im.size
yy, xx = np.mgrid[0:h, 0:w]
# radialGradient r=70 % der Bilddiagonale-Box (objectBoundingBox → Ellipse)
r = np.sqrt(((xx - w / 2) / (w * 0.7)) ** 2 + ((yy - h / 2) / (h * 0.7)) ** 2)
t = np.clip(r, 0, 1)[..., None]
c0 = np.array([0x1e, 0x29, 0x3b], float)
c1 = np.array([0x02, 0x06, 0x17], float)
bg = (c0 * (1 - t) + c1 * t).astype(np.uint8)
base = Image.fromarray(bg, 'RGB').convert('RGBA')
out = Image.alpha_composite(base, im).convert('RGB')
out.save(dst)
print(dst, out.size)
