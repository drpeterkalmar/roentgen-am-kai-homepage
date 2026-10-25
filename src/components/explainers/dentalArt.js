// Geometrie der Erklärgrafik A006 (Zahnröntgen 2D / DVT 3D) – reine Rechenfunktionen, kein React.
// Beide Zeichnungen zeigen das vollständige bleibende Gebiss: je Kiefer 16 Zähne inklusive der Weisheitszähne.
// 2D in viewBox-Einheiten (320 × 180). Die 3D-Fassung (DVT) ist ein Blender-Render: assets-src/zahn/render_dvt.py.

const f = (n) => Math.round(n * 10) / 10;

// Zahntypen von der Mitte nach außen (je Quadrant 8): 1–2 Schneidezähne, 3 Eckzahn, 4–5 Prämolaren, 6–8 Molaren
const TYPES = ['i', 'i', 'c', 'p', 'p', 'm', 'm', 'm'];
// mesiodistale Breiten in mm (Durchschnittswerte)
const WIDTH = { upper: [8.6, 6.6, 7.6, 7, 6.6, 10.2, 9.2, 8.6], lower: [5.4, 5.9, 6.9, 7, 7.1, 11.2, 10.5, 10] };
const CROWN = { i: 10, c: 10.5, p: 8, m: 7 };
const ROOT = { i: 13, c: 16, p: 14, m: 12.5 };

// ─────────────────────────────── 2D: Panoramaschichtaufnahme (OPG) ───────────────────────────────

export const PANO = { w: 320, h: 180 };
const MID = 160;
const SPAN = { upper: 112, lower: 104 }; // halbe Breite der Zahnreihe
const occ = (x) => {
  // Kauebene als „Lächeln“: Mitte tiefer, außen höher
  const t = (x - MID) / 112;
  return 92 + 13 * (1 - t * t);
};

// Pfad aus Kubik-Segmenten: [start, [c1, c2, p], …] → vorwärts, rückwärts, gespiegelt
const seg = (start, curves) => ({ start, curves });
const fwd = ({ start, curves }, move = true) =>
  `${move ? `M${start[0]} ${start[1]} ` : ''}${curves.map(([a, b, c]) => `C${a[0]} ${a[1]} ${b[0]} ${b[1]} ${c[0]} ${c[1]}`).join(' ')}`;
const rev = ({ start, curves }) => {
  const pts = [start, ...curves.map((c) => c[2])];
  const out = [];
  for (let i = curves.length - 1; i >= 0; i -= 1) out.push([curves[i][1], curves[i][0], pts[i]]);
  return { start: pts[pts.length - 1], curves: out };
};
const mir = ({ start, curves }) => {
  const m = ([x, y]) => [f(2 * MID - x), y];
  return { start: m(start), curves: curves.map((c) => c.map(m)) };
};

// Unterkiefer, linke Hälfte: vom Kinn (Menton) über Unterrand, Kieferwinkel, Hinterrand des Asts, Gelenkkopf,
// Incisura und Processus coronoideus bis zur Linea obliqua
const MAND_L = seg([160, 167], [
  [[130, 167], [100, 164], [78, 157]],
  [[66, 153], [60, 150], [50, 148]],
  [[36, 146], [24, 142], [20, 131]],
  [[16, 120], [16, 96], [17, 72]],
  [[18, 58], [17, 46], [15, 40]],
  [[12, 32], [17, 25], [24, 25]],
  [[31, 25], [34, 31], [32, 38]],
  [[35, 46], [38, 50], [41, 51]],
  [[44, 50], [46, 43], [49, 38]],
  [[51, 35], [54, 36], [54, 41]],
  [[56, 54], [57, 72], [60, 90]],
  [[62, 98], [66, 104], [74, 108]],
]);
export const MANDIBLE_OUTLINE = [fwd(MAND_L), fwd(mir(MAND_L))];
// Fläche: linke Hälfte rückwärts bis zum Kinn, rechte Hälfte vorwärts, dann unter den Zähnen zurück
export const MANDIBLE_FILL = `${fwd(rev(MAND_L))} ${fwd(mir(MAND_L), false)} C230 116 196 121 160 121 C124 121 90 116 74 108 Z`;
// Kanal des Unterkiefernervs: vom Foramen mandibulae im Ast bogenförmig unter den Wurzeln zum Foramen mentale
const CANAL_L = seg([33, 90], [
  [[36, 110], [46, 132], [68, 142]],
  [[86, 149], [104, 148], [116, 143]],
]);
export const CANAL = [fwd(CANAL_L), fwd(mir(CANAL_L))];
export const MENTAL = [
  { cx: 118, cy: 142 },
  { cx: 202, cy: 142 },
];
// Foramen mandibulae (Eintritt des Nervs im Ast)
export const FORAMEN = [
  { cx: 33, cy: 89 },
  { cx: 287, cy: 89 },
];
// Kieferhöhlen (Boden zwischen den Molarenwurzeln eingebuchtet), Nasenhöhle mit Muscheln, Gaumen, Gelenkgruben,
// Jochbogen mit Crista zygomaticoalveolaris, Tuber maxillae
const both = (d) => [d, d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${f(2 * MID - Number(x))} ${y}`)];
export const SINUS = both('M64 57 C60 44 64 30 82 26 C100 22 120 26 126 38 C130 46 129 54 124 59 C116 61 108 59 100 62 C92 65 84 62 76 63 C70 63 66 61 64 57 Z');
export const NASAL = 'M142 54 C137 42 140 26 150 17 C155 12 165 12 170 17 C180 26 183 42 178 54 C172 51 166 52 160 54 C154 52 148 51 142 54 Z';
export const TURBINATES = both('M145 34 C149 31 154 32 157 36 M144 44 C148 41 153 42 156 46');
export const SEPTUM = 'M160 15 L160 53';
export const PALATE = 'M66 59 C98 55 130 54 160 54 C190 54 222 55 254 59';
export const FOSSA = both('M10 33 C12 22 20 18 28 21 C33 23 36 28 40 31 C43 33 45 35 49 35');
export const ZYGOMA = both('M30 40 C46 37 62 38 80 42 C86 44 89 50 90 58');

// Ein Zahn als Krone + Wurzel(n) + Pulpa; s = +1 Unterkiefer (Wurzeln nach unten), −1 Oberkiefer
const tooth2d = ({ cx, w, type, s, k, i, jaw }) => {
  const over = jaw === 'upper' && i < 2 ? 2.4 : 0; // Überbiss der oberen Schneidezähne
  const erupt = i === 7 && jaw === 'lower' ? 1.4 : 0; // unterer Weisheitszahn etwas tiefer im Kiefer
  const y0 = occ(cx) + s * 1.6 - s * over + s * erupt;
  const hc = CROWN[type] * k;
  const hr = ROOT[type] * k * (jaw === 'lower' && type !== 'm' ? 0.8 : 0.92);
  const yc = y0 + s * hc; // Schmelz-Zement-Grenze
  const half = w / 2;
  const neck = half * (type === 'm' ? 0.84 : 0.72);
  // Krone: Okklusalfläche mit Höckern, Bauch nach außen, Hals eingezogen
  const cusps = type === 'm' ? 3 : type === 'p' ? 2 : type === 'c' ? 1 : 0;
  let top = '';
  if (cusps === 0) top = `Q${f(cx)} ${f(y0 - s * 0.5)} ${f(cx + half * 0.9)} ${f(y0 + s * 0.3)} `;
  else if (cusps === 1) top = `Q${f(cx)} ${f(y0 - s * 3)} ${f(cx + half * 0.9)} ${f(y0 + s * 0.8)} `;
  else {
    const step = (half * 1.8) / cusps;
    for (let c = 0; c < cusps; c += 1) {
      const xa = cx - half * 0.9 + step * (c + 0.5);
      const xb = cx - half * 0.9 + step * (c + 1);
      top += `Q${f(xa)} ${f(y0 - s * 1.6)} ${f(xb)} ${f(y0 + s * 0.4)} `;
    }
  }
  const crown =
    `M${f(cx - neck)} ${f(yc)} C${f(cx - half * 1.06)} ${f(yc - s * hc * 0.45)} ${f(cx - half)} ${f(y0 + s * 1.2)} ` +
    `${f(cx - half * 0.9)} ${f(y0 + s * 0.4)} ${top}` +
    `C${f(cx + half)} ${f(y0 + s * 1.2)} ${f(cx + half * 1.06)} ${f(yc - s * hc * 0.45)} ${f(cx + neck)} ${f(yc)} Z`;
  // Wurzeln: Front/Prämolaren einwurzelig (oberer erster Prämolar zwei), Molaren zwei, obere Molaren dazu palatinal
  const root = (x0, x1, apexX, len) =>
    `M${f(x0)} ${f(yc - s * 0.8)} C${f(x0)} ${f(yc + s * len * 0.55)} ${f(apexX - 1)} ${f(yc + s * len * 0.95)} ${f(apexX)} ${f(yc + s * len)} ` +
    `C${f(apexX + 1)} ${f(yc + s * len * 0.95)} ${f(x1)} ${f(yc + s * len * 0.55)} ${f(x1)} ${f(yc - s * 0.8)} Z`;
  const roots = [];
  const back = [];
  if (type === 'm') {
    const gap = neck * 0.16;
    if (jaw === 'upper') back.push(root(cx - neck * 0.45, cx + neck * 0.45, cx, hr * 1.02));
    roots.push(root(cx - neck, cx - gap, cx - neck * 0.78, hr * 0.92), root(cx + gap, cx + neck, cx + neck * 0.72, hr * 0.86));
  } else if (jaw === 'upper' && i === 3) {
    roots.push(root(cx - neck, cx - neck * 0.08, cx - neck * 0.5, hr * 0.9), root(cx + neck * 0.08, cx + neck, cx + neck * 0.5, hr * 0.9));
  } else roots.push(root(cx - neck, cx + neck, cx, hr));
  // Pulpa: Kammer auf Höhe des Zahnhalses, Kanäle bis kurz vor die Wurzelspitzen
  const ya = yc + s * hr;
  let pulp;
  let chamber = null;
  if (type === 'm') {
    const t0 = yc - s * hc * 0.28;
    const t1 = yc + s * 2.2;
    chamber =
      `M${f(cx - neck * 0.42)} ${f(t1)} L${f(cx - neck * 0.42)} ${f(t0 + s * 1.5)} Q${f(cx - neck * 0.42)} ${f(t0)} ${f(cx - neck * 0.22)} ${f(t0)} ` +
      `L${f(cx + neck * 0.22)} ${f(t0)} Q${f(cx + neck * 0.42)} ${f(t0)} ${f(cx + neck * 0.42)} ${f(t0 + s * 1.5)} L${f(cx + neck * 0.42)} ${f(t1)} Z`;
    pulp =
      `M${f(cx - neck * 0.42)} ${f(t1)} Q${f(cx - neck * 0.72)} ${f(yc + s * hr * 0.5)} ${f(cx - neck * 0.76)} ${f(ya - s * hr * 0.2)} ` +
      `M${f(cx + neck * 0.42)} ${f(t1)} Q${f(cx + neck * 0.7)} ${f(yc + s * hr * 0.5)} ${f(cx + neck * 0.7)} ${f(ya - s * hr * 0.26)}`;
  } else pulp = `M${f(cx)} ${f(yc - s * hc * 0.45)} L${f(cx)} ${f(ya - s * hr * 0.12)}`;
  // Weisheitszähne leicht gekippt (wie häufig im Panoramabild)
  const tilt = i === 7 ? (cx < MID ? 1 : -1) * s * (jaw === 'lower' ? 8 : 5) : 0;
  const rot = tilt ? `rotate(${tilt} ${f(cx)} ${f(yc)})` : undefined;
  return { crown, roots, back, pulp, chamber, rot };
};

const row2d = (jaw) => {
  const s = jaw === 'upper' ? -1 : 1;
  const widths = WIDTH[jaw];
  const gap = 1;
  const scale = (SPAN[jaw] - gap * 7.5) / widths.reduce((a, b) => a + b, 0);
  const out = [];
  for (const side of [-1, 1]) {
    let x = MID + side * gap * 0.5;
    widths.forEach((wmm, i) => {
      const w = wmm * scale * (i === 7 ? 0.94 : 1);
      const cx = x + (side * w) / 2;
      x += side * (w + gap);
      out.push({ key: `${jaw}-${side}-${i + 1}`, jaw, ...tooth2d({ cx, w, type: TYPES[i], s, k: 1.6, i, jaw }) });
    });
  }
  return out;
};

// Reihenfolge: Unterkiefer zuerst, damit die oberen Schneidezähne den Überbiss überdecken
export const PANO_TEETH = [...row2d('lower'), ...row2d('upper')];
