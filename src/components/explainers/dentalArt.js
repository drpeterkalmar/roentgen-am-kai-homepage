// Geometrie der Erklärgrafik A006 (Zahnröntgen 2D / DVT 3D) – reine Rechenfunktionen, kein React.
// Beide Zeichnungen zeigen das vollständige bleibende Gebiss: je Kiefer 16 Zähne inklusive der Weisheitszähne.
// 2D in viewBox-Einheiten (320 × 180); 3D in Millimetern, orthografisch projiziert und in die viewBox eingepasst.

const f = (n) => Math.round(n * 10) / 10;

// Zahntypen von der Mitte nach außen (je Quadrant 8): 1–2 Schneidezähne, 3 Eckzahn, 4–5 Prämolaren, 6–8 Molaren
const TYPES = ['i', 'i', 'c', 'p', 'p', 'm', 'm', 'm'];
// mesiodistale Breiten in mm (Durchschnittswerte)
const WIDTH = { upper: [8.6, 6.6, 7.6, 7, 6.6, 10.2, 9.2, 8.6], lower: [5.4, 5.9, 6.9, 7, 7.1, 11.2, 10.5, 10] };
const DEPTH = { i: 6.6, c: 8, p: 9, m: 10.6 }; // bukkolingual
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

// ─────────────────────────────── 3D: DVT-Volumen ───────────────────────────────

export const VOL = { w: 320, h: 180 };
const YAW = (-30 * Math.PI) / 180;
const PITCH = (30 * Math.PI) / 180;
const LIGHT = (() => {
  const v = [-0.4, 0.8, 0.45];
  const n = Math.hypot(...v);
  return v.map((c) => c / n);
})();

const rot = ([x, y, z]) => {
  const cy = Math.cos(YAW);
  const sy = Math.sin(YAW);
  const x1 = cy * x + sy * z;
  const z1 = -sy * x + cy * z;
  const cp = Math.cos(PITCH);
  const sp = Math.sin(PITCH);
  return [x1, cp * y - sp * z1, sp * y + cp * z1];
};
// Rohprojektion (Bildschirm-y nach unten, z = Nähe zum Betrachter); Einpassen in die viewBox erst am Ende
const raw = (p) => {
  const [x, y, z] = rot(p);
  return [x, -y, z];
};

// Zahnbogen: Ellipsenviertel (Front) + gerades Stück nach hinten, nach Bogenlänge abgetastet
const archLine = (W, D, back) => {
  const p = [];
  for (let i = 0; i <= 60; i += 1) {
    const a = (Math.PI / 2) * (i / 60);
    p.push([W * Math.sin(a), -D * (1 - Math.cos(a))]);
  }
  for (let i = 1; i <= 10; i += 1) p.push([W, -D - (back * i) / 10]);
  const len = [0];
  for (let i = 1; i < p.length; i += 1) len.push(len[i - 1] + Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]));
  const total = len[len.length - 1];
  const at = (sLen) => {
    let i = 1;
    while (i < len.length - 1 && len[i] < sLen) i += 1;
    const t = (sLen - len[i - 1]) / (len[i] - len[i - 1]);
    const [x0, z0] = p[i - 1];
    const [x1, z1] = p[i];
    const n = Math.hypot(x1 - x0, z1 - z0);
    return { x: x0 + (x1 - x0) * t, z: z0 + (z1 - z0) * t, tx: (x1 - x0) / n, tz: (z1 - z0) / n };
  };
  return { at, total };
};

const ARCH = { upper: archLine(25.5, 30, 20), lower: archLine(23.5, 28, 22) };
// Punkt auf dem Bogen (rechte Hälfte gerechnet, links gespiegelt), seitlich versetzt um o (positiv = außen)
const onArch = (arch, side, sLen, o = 0) => {
  const c = arch.at(sLen);
  return { x: side * (c.x - c.tz * o), z: c.z + c.tx * o, tx: side * c.tx, tz: c.tz, side };
};

// Kegelstumpf-Quader entlang des Bogens: Grundfläche (wA × dA in Höhe yA) → Deckfläche (wB × dB in Höhe yB)
const frustum = (c, wA, dA, yA, wB, dB, yB) => {
  const t = [c.tx, c.tz];
  const n = [c.tz * c.side, -c.tx * c.side];
  const P = (w, d, y, a, b) => [c.x + t[0] * (w / 2) * a + n[0] * (d / 2) * b, y, c.z + t[1] * (w / 2) * a + n[1] * (d / 2) * b];
  const A = [P(wA, dA, yA, -1, -1), P(wA, dA, yA, 1, -1), P(wA, dA, yA, 1, 1), P(wA, dA, yA, -1, 1)];
  const B = [P(wB, dB, yB, -1, -1), P(wB, dB, yB, 1, -1), P(wB, dB, yB, 1, 1), P(wB, dB, yB, -1, 1)];
  return [A, B, [A[0], A[1], B[1], B[0]], [A[1], A[2], B[2], B[1]], [A[2], A[3], B[3], B[2]], [A[3], A[0], B[0], B[3]]];
};

const centroid = (poly) => poly.reduce((a, p) => [a[0] + p[0] / poly.length, a[1] + p[1] / poly.length, a[2] + p[2] / poly.length], [0, 0, 0]);
// Sichtbarkeit und Helligkeit einer Fläche (konvexer Körper: Normale zeigt vom Körperschwerpunkt weg)
const shade = (poly, bodyCenter) => {
  const c = centroid(poly);
  const e1 = poly[1].map((v, i) => v - poly[0][i]);
  const e2 = poly[poly.length - 1].map((v, i) => v - poly[0][i]);
  let nrm = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  const out = c.map((v, i) => v - bodyCenter[i]);
  if (nrm[0] * out[0] + nrm[1] * out[1] + nrm[2] * out[2] < 0) nrm = nrm.map((v) => -v);
  const len = Math.hypot(...nrm) || 1;
  const nr = rot(nrm.map((v) => v / len));
  return { facing: nr[2], light: Math.max(0, nr[0] * LIGHT[0] + nr[1] * LIGHT[1] + nr[2] * LIGHT[2]) };
};

// Kronenform je Zahntyp: Okklusalfläche/Schneidekante, Bauch, Hals (Breite, Tiefe relativ zum Zahn)
const CROWN_SHAPE = {
  i: { occ: [0.96, 0.22], belly: [0.98, 0.8], neck: [0.7, 0.72] }, // Schneidekante schmal
  c: { occ: [0.3, 0.35], belly: [0.98, 0.95], neck: [0.68, 0.78] }, // Spitze
  p: { occ: [0.7, 0.72], belly: [0.98, 0.98], neck: [0.7, 0.78] },
  m: { occ: [0.86, 0.84], belly: [1, 1], neck: [0.8, 0.82] },
};

const teeth3d = (jaw) => {
  const bodies = [];
  const s = jaw === 'upper' ? 1 : -1; // Oberkiefer: Wurzeln nach oben
  const arch = ARCH[jaw];
  const widths = WIDTH[jaw];
  const gap = 0.45;
  const need = widths.reduce((a, b) => a + b, 0) + gap * 8;
  const k = Math.min(1, (arch.total - 1) / need);
  for (const side of [-1, 1]) {
    let pos = gap / 2;
    widths.forEach((wmm, i) => {
      const w = wmm * k;
      const c = onArch(arch, side, pos + w / 2);
      pos += w + gap;
      const type = TYPES[i];
      const d = DEPTH[type] * (jaw === 'lower' ? 0.92 : 1);
      const sh = CROWN_SHAPE[type];
      const y0 = s * 1.1 + (i === 7 ? s * 1.2 : 0);
      const hc = CROWN[type] * 0.85;
      const yb = y0 + s * hc * 0.45;
      const yc = y0 + s * hc;
      const yr = yc + s * ROOT[type] * 0.8;
      const parts = [
        { kind: 'crown', faces: frustum(c, w * sh.occ[0], d * sh.occ[1], y0, w * sh.belly[0], d * sh.belly[1], yb) },
        { kind: 'crown', faces: frustum(c, w * sh.belly[0], d * sh.belly[1], yb, w * sh.neck[0], d * sh.neck[1], yc) },
        { kind: 'root', faces: frustum(c, w * sh.neck[0] * 0.95, d * sh.neck[1] * 0.95, yc, w * 0.2, d * 0.28, yr) },
      ];
      for (const part of parts) {
        const bc = centroid(part.faces.flat());
        const faces = [];
        part.faces.forEach((poly) => {
          const sd = shade(poly, bc);
          if (sd.facing > 0.01) faces.push({ poly, light: sd.light });
        });
        bodies.push({ key: `${jaw}${side}${i}${part.kind}${bodies.length}`, kind: part.kind, z: raw(bc)[2], faces });
      }
    });
  }
  return bodies.sort((a, b) => a.z - b.z);
};

// Unterkiefer als durchscheinende Hülle: Hufeisen (Unterrand + Alveolarkamm) und je ein Ast mit Gelenkfortsatz
const mandible3d = () => {
  const arch = ARCH.lower;
  const L = arch.total;
  const ring = (o, y, to = L + 4) => {
    const seq = [];
    for (const side of [-1, 1]) {
      const part = [];
      for (let i = 0; i <= 30; i += 1) {
        const c = onArch(arch, side, to * (i / 30), o);
        part.push([c.x, y, c.z]);
      }
      seq.push(side < 0 ? part.reverse() : part.slice(1));
    }
    return seq.flat();
  };
  const crestOut = ring(5.2, -2);
  const baseOut = ring(6.2, -27);
  const baseIn = ring(-4, -25);
  // Äste: senkrecht außen am hinteren Bogenende, nach oben bis über die Kauebene (Gelenkkopf, Incisura, Coronoid)
  const end = onArch(arch, 1, L + 2, 5.5);
  const rami = [-1, 1].map((side) =>
    [
      [4, -27], [-6, -30], [-16, -28], [-21, -18], [-21, 2], [-20, 14], [-23, 19], [-19, 23], [-15, 19],
      [-12, 11], [-7, 12], [-3, 18], [0, 13], [3, 2], [4, -6],
    ].map(([dz, y]) => [side * (end.x + 2), y, end.z + dz])
  );
  return { crestOut, baseOut, baseIn, rami };
};

// Nervenkanal: vom Foramen mandibulae im Ast unter den Wurzeln nach vorn, Austritt beim zweiten Prämolar
const canal3d = () => {
  const arch = ARCH.lower;
  const L = arch.total;
  const end = onArch(arch, 1, L + 2, 5.5);
  return [-1, 1].map((side) => {
    const seq = [];
    for (let i = 0; i <= 6; i += 1) {
      const t = i / 6;
      seq.push([side * (end.x - 1.5), -6 - 14 * t * t, end.z - 12 + 12 * t]);
    }
    for (let i = 1; i <= 20; i += 1) {
      const t = i / 20;
      const c = onArch(arch, side, L - (L - 21) * t, 0.5);
      seq.push([c.x, -20 - 3 * Math.sin(Math.PI * t), c.z]);
    }
    const out = onArch(arch, side, 20, 5.6);
    seq.push([out.x, -18.5, out.z]);
    return seq;
  });
};

// Messfeld (Würfel) und axiale Schnittebene in der Kauebene
const BOX = { x: 40, y0: -34, y1: 30, z0: -76, z1: 9 };
const EDGES = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

export const VOLUME = (() => {
  const { x, y0, y1, z0, z1 } = BOX;
  const P = [
    [-x, y0, z0], [x, y0, z0], [x, y0, z1], [-x, y0, z1],
    [-x, y1, z0], [x, y1, z0], [x, y1, z1], [-x, y1, z1],
  ];
  // Einpassen: der Würfel füllt die viewBox mit Rand
  const proj = P.map(raw);
  const minX = Math.min(...proj.map((p) => p[0]));
  const maxX = Math.max(...proj.map((p) => p[0]));
  const minY = Math.min(...proj.map((p) => p[1]));
  const maxY = Math.max(...proj.map((p) => p[1]));
  const m = 10;
  const sc = Math.min((VOL.w - 2 * m) / (maxX - minX), (VOL.h - 2 * m) / (maxY - minY));
  const ox = (VOL.w - sc * (maxX + minX)) / 2;
  const oy = (VOL.h - sc * (maxY + minY)) / 2;
  const xy = (p) => {
    const [X, Y] = raw(p);
    return [f(ox + sc * X), f(oy + sc * Y)];
  };
  const str = (arr) => arr.map((p) => xy(p).join(',')).join(' ');

  const zs = P.map((p) => raw(p)[2]);
  const back = zs.indexOf(Math.min(...zs));
  const edges = EDGES.map(([a, b]) => {
    const [ax, ay] = xy(P[a]);
    const [bx, by] = xy(P[b]);
    return { d: `M${ax} ${ay} L${bx} ${by}`, hidden: a === back || b === back };
  });
  const axial = str([[-x, 0, z0], [x, 0, z0], [x, 0, z1], [-x, 0, z1]]);

  const teeth = (jaw) =>
    teeth3d(jaw).map((b) => ({
      key: b.key,
      kind: b.kind,
      faces: b.faces.map((fc, j) => ({ key: j, points: str(fc.poly), light: fc.light })),
    }));
  const mand = mandible3d();
  const mandible = {
    base: `${str(mand.baseOut)} ${str(mand.baseIn.slice().reverse())}`,
    crest: str(mand.crestOut),
    baseLine: str(mand.baseOut),
    rami: mand.rami.map(str),
    walls: mand.crestOut.slice(0, -1).map((p, i) => str([p, mand.crestOut[i + 1], mand.baseOut[i + 1], mand.baseOut[i]])),
  };
  const canal = canal3d().map(str);
  // Oberkiefer: zarte Kontur des Alveolarfortsatzes über den Wurzeln
  const upperRing = (() => {
    const arch = ARCH.upper;
    const seq = [];
    for (const side of [-1, 1]) {
      const part = [];
      for (let i = 0; i <= 30; i += 1) {
        const c = onArch(arch, side, (arch.total + 3) * (i / 30), 6);
        part.push([c.x, 14, c.z]);
      }
      seq.push(side < 0 ? part.reverse() : part.slice(1));
    }
    return str(seq.flat());
  })();
  return { edges, axial, lower: teeth('lower'), upper: teeth('upper'), mandible, canal, upperRing };
})();
