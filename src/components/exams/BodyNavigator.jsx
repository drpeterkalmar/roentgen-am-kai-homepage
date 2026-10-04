import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowDown, CheckCircle2 } from 'lucide-react';
import { BODY_REGIONS, XRAY_GROUPS, WALK_IN } from '../../data/examinations';
import Placeholder from '../ui/Placeholder';

// Körpernavigator „Welche Körperregion soll geröntgt werden?“
// Leichtes Inline-SVG (schematisches Skelett, Vorder- und Rückansicht) – keine Bibliothek.
//  * Jede Region ist ein echter Link (<a href="#region-…">) → per Tastatur (Tab/Enter), Maus und Touch bedienbar.
//  * Ohne JavaScript springt der Link zum passenden Eintrag der Textliste darunter (vollständige Information).
//  * Mit JavaScript: Hervorhebung bei Hover/Fokus/Auswahl, Infokarte daneben (aria-live).
//  * Die Textliste ist immer vorhanden – für Mobilgeräte, Screenreader und ohne JavaScript.

const groupById = Object.fromEntries(XRAY_GROUPS.map((g) => [g.id, g]));
const regionById = Object.fromEntries(BODY_REGIONS.map((r) => [r.id, r]));

// ---- Geometrie -------------------------------------------------------------
// Anatomisch vereinfachtes Skelett: Röhrenknochen mit Gelenkenden, einzelne Rippen,
// Becken mit Foramina, Hand-/Fußstrahlen. Farben kommen ausschließlich aus CSS (.bn-*).
const F = 105; // Mitte Vorderansicht
const B = 315; // Mitte Rückansicht
const both = (fn) => [fn(-1), fn(1)];
const r1 = (v) => Math.round(v * 10) / 10;
const pt = (x, y) => `${r1(x)},${r1(y)}`;

// Röhrenknochen: schlanker Schaft, verbreiterte Gelenkenden, runde Kappen
const bone = (x1, y1, x2, y2, ws, w1 = ws * 1.7, w2 = ws * 1.7) => {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / L;
  const uy = (y2 - y1) / L;
  const P = (t, w) => pt(x1 + ux * t - uy * w, y1 + uy * t + ux * w);
  const a = Math.min(L * 0.3, w1 * 1.4);
  const b = Math.min(L * 0.3, w2 * 1.4);
  const h1 = w1 / 2;
  const h2 = w2 / 2;
  const hs = ws / 2;
  return [
    `M${P(0, -h1)}`,
    `C${P(a * 0.45, -h1)} ${P(a * 0.6, -hs)} ${P(a, -hs)}`,
    `L${P(L - b, -hs)}`,
    `C${P(L - b * 0.6, -hs)} ${P(L - b * 0.45, -h2)} ${P(L, -h2)}`,
    `C${P(L + h2 * 0.75, -h2)} ${P(L + h2 * 0.75, h2)} ${P(L, h2)}`,
    `C${P(L - b * 0.45, h2)} ${P(L - b * 0.6, hs)} ${P(L - b, hs)}`,
    `L${P(a, hs)}`,
    `C${P(a * 0.6, hs)} ${P(a * 0.45, h1)} ${P(0, h1)}`,
    `C${P(-h1 * 0.75, h1)} ${P(-h1 * 0.75, -h1)} ${P(0, -h1)} Z`,
  ].join(' ');
};
// Symmetrische Kontur: linke Hälfte als Kurven (dx < 0), rechte Hälfte gespiegelt
const sym = (C, start, segs) => {
  const pts = [start, ...segs.map((s) => [s[4], s[5]])];
  const left = segs.map(([a, b, c, d, e, f]) => `C${pt(C + a, b)} ${pt(C + c, d)} ${pt(C + e, f)}`);
  const right = segs.map((s, i) => `C${pt(C - s[2], s[3])} ${pt(C - s[0], s[1])} ${pt(C - pts[i][0], pts[i][1])}`).reverse();
  return `M${pt(C + start[0], start[1])} ${left.join(' ')} ${right.join(' ')} Z`;
};
const hole = (cx, cy, rx, ry) => `M${pt(cx - rx, cy)} a${rx},${ry} 0 1,0 ${r1(2 * rx)},0 a${rx},${ry} 0 1,0 ${r1(-2 * rx)},0 Z`;

const Strut = ({ d, w, e = 1.6 }) => (
  <>
    <path className="bn-ol" d={d} strokeWidth={w + e} />
    <path className="bn-il" d={d} strokeWidth={w} />
  </>
);
const Bone = (p) => <path className="bn-shape" d={bone(p.x1, p.y1, p.x2, p.y2, p.ws, p.w1, p.w2)} />;
const HitLine = ({ x1, y1, x2, y2, w }) => <line className="bn-hit" x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w} />;

// -- Schädel, Wirbelsäule, Rumpf
const skullFront = (C) =>
  sym(C, [0, 7], [[-9, 7, -17, 15, -14.5, 31], [-14, 37, -10.5, 40.5, -7, 41.5], [-4, 42, -2, 42, 0, 42]]) +
  hole(C - 6, 27, 4.3, 3.5) + hole(C + 6, 27, 4.3, 3.5) +
  `M${pt(C, 31)} L${pt(C - 2.5, 36.5)} Q${pt(C, 38.2)} ${pt(C + 2.5, 36.5)} Z`;
const jaw = (C) =>
  `M${pt(C - 12.5, 35.5)} C${pt(C - 12.5, 45)} ${pt(C - 7, 50.5)} ${pt(C, 50.5)} C${pt(C + 7, 50.5)} ${pt(C + 12.5, 45)} ${pt(C + 12.5, 35.5)} ` +
  `L${pt(C + 9.5, 38.5)} C${pt(C + 9, 44)} ${pt(C + 5, 47)} ${pt(C, 47)} C${pt(C - 5, 47)} ${pt(C - 9, 44)} ${pt(C - 9.5, 38.5)} Z`;
const skullBack = (C) => sym(C, [0, 7], [[-9, 7, -16.5, 14, -16, 27], [-15.5, 37, -11, 43, -5, 44.5], [-3, 45, -1.5, 45, 0, 45]]);
const Column = ({ cx, y0, n, step, h, w, mark = false }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <React.Fragment key={i}>
        <rect className="bn-shape" x={r1(cx - w / 2)} y={r1(y0 + i * step)} width={w} height={h} rx="1.4" />
        {mark && <path className="bn-ol" d={`M${pt(cx, y0 + i * step + 1)} V${r1(y0 + i * step + h - 1)}`} strokeWidth="1.3" />}
      </React.Fragment>
    ))}
  </>
);
const ribcageHit = (C) => `M${pt(C - 25, 62)} C${pt(C - 37, 82)} ${pt(C - 37, 114)} ${pt(C - 29, 134)} L${pt(C + 29, 134)} C${pt(C + 37, 114)} ${pt(C + 37, 82)} ${pt(C + 25, 62)} Z`;
const RIB_W = [21, 26, 29.5, 31.5, 32.5, 33, 33, 32];
const frontRib = (C, s, i) => {
  const y = 69 + i * 6.4;
  const w = RIB_W[i];
  return `M${pt(C + s * 4, y)} C${pt(C + s * w * 0.55, y - 5)} ${pt(C + s * (w - 2), y - 8)} ${pt(C + s * w, y - 4)} C${pt(C + s * (w + 1.5), y - 1)} ${pt(C + s * (w + 1.5), y + 4)} ${pt(C + s * (w + 0.5), y + 8)}`;
};
const backRib = (C, s, i) => {
  const y = 66 + i * 4.85;
  const w = [17, 22, 26, 29, 30.5, 31.5, 32, 31.5, 30, 27.5, 22, 16][i];
  return `M${pt(C + s * 5.5, y)} C${pt(C + s * w * 0.45, y - 0.5)} ${pt(C + s * w * 0.9, y + 2.5)} ${pt(C + s * w, y + 9)}`;
};
const sternum = (C) => `M${pt(C - 4.5, 63.5)} L${pt(C + 4.5, 63.5)} L${pt(C + 3.6, 71)} L${pt(C + 3.2, 106)} L${pt(C, 113)} L${pt(C - 3.2, 106)} L${pt(C - 3.6, 71)} Z`;
const scapula = (C, s) =>
  `M${pt(C + s * 13, 69)} C${pt(C + s * 20, 66)} ${pt(C + s * 28, 65)} ${pt(C + s * 33, 66.5)} C${pt(C + s * 33, 72)} ${pt(C + s * 30, 78)} ${pt(C + s * 27, 86)} ` +
  `C${pt(C + s * 24.5, 94)} ${pt(C + s * 21.5, 100)} ${pt(C + s * 19.5, 104)} C${pt(C + s * 16, 96)} ${pt(C + s * 13, 82)} ${pt(C + s * 13, 69)} Z`;
const pelvisOuter = (C) =>
  sym(C, [0, 151], [[-6, 148, -15, 139, -26, 141.5], [-33, 143, -33, 153, -28.5, 163], [-26.5, 167, -26, 170, -26.5, 173], [-26, 179, -22, 186, -16.5, 187.5], [-11.5, 189, -7, 186, -4.5, 183], [-2.5, 181.5, -1.5, 181, 0, 181]]);
const pelvis = (C) => pelvisOuter(C) + hole(C, 164, 11, 8.5) + hole(C - 11.5, 181.5, 3.4, 3) + hole(C + 11.5, 181.5, 3.4, 3);
const sacrum = (C) => sym(C, [0, 150], [[-5, 150, -10, 150.5, -10.5, 152.5], [-9.5, 160, -5.5, 169, -2, 174], [-1, 175.5, -0.5, 176, 0, 176]]);
const knee = (cx) => `M${pt(cx - 6.2, 241)} L${pt(cx - 6.6, 247.5)} Q${pt(cx - 6.4, 250.4)} ${pt(cx - 3.4, 250.4)} Q${pt(cx - 1, 250.4)} ${pt(cx, 248.6)} Q${pt(cx + 1, 250.4)} ${pt(cx + 3.4, 250.4)} Q${pt(cx + 6.4, 250.4)} ${pt(cx + 6.6, 247.5)} L${pt(cx + 6.2, 241)} Z`;
const heel = (cx) => sym(cx, [0, 306.6], [[-2.5, 306.6, -4.3, 307.2, -4.5, 309.4], [-4.8, 312, -6.2, 315.5, -5.8, 318.5], [-5.2, 321.5, -2.6, 322.3, 0, 322.3]]);

// -- Gliedmaßen (Teile werden in Vorderansicht als Regionen und in der Rückansicht als Kontext genutzt)
const Clavicle = ({ C, s }) => <Strut d={`M${pt(C + s * 4, 61.5)} C${pt(C + s * 13, 57.5)} ${pt(C + s * 22, 64)} ${pt(C + s * 34, 60.5)}`} w={3} />;
const Humerus = ({ C, s }) => <Bone x1={C + s * 38.5} y1={73.5} x2={C + s * 43.6} y2={133} ws={5} w1={7} w2={10} />;
const Elbow = () => null;
const Forearm = ({ C, s }) => (
  <>
    <Bone x1={C + s * 41.6} y1={136.5} x2={C + s * 45.5} y2={190} ws={2.6} w1={4.8} w2={3.4} />
    <Bone x1={C + s * 46.8} y1={137} x2={C + s * 52.5} y2={190} ws={2.6} w1={3.6} w2={5.2} />
  </>
);
const Hand = ({ C, s }) => {
  const hc = C + s * 49.5;
  const fingers = [[-4.2, 220.5], [-1.4, 223.5], [1.4, 225], [4.2, 223.5]];
  return (
    <>
      <rect className="bn-shape" x={hc - 6} y={193} width={12} height={8} rx={3} />
      {fingers.map(([dx, end]) => (
        <React.Fragment key={dx}>
          <Strut d={`M${pt(hc + s * dx * 0.9, 203)} L${pt(hc + s * dx * 1.12, 212.5)}`} w={2} />
          <Strut d={`M${pt(hc + s * dx * 1.16, 214.6)} L${pt(hc + s * dx * 1.3, end)}`} w={1.7} />
        </React.Fragment>
      ))}
      <Strut d={`M${pt(hc + s * 5.6, 200)} L${pt(hc + s * 9, 207.5)}`} w={2.2} />
      <Strut d={`M${pt(hc + s * 9.8, 209.6)} L${pt(hc + s * 12, 215.5)}`} w={1.9} />
    </>
  );
};
const Femur = ({ C, s }) => (
  <>
    <Bone x1={C + s * 26.5} y1={179} x2={C + s * 17} y2={243} ws={6} w1={8} w2={11.5} />
    <Bone x1={C + s * 20.5} y1={172.5} x2={C + s * 26.5} y2={181} ws={4.2} w1={8.6} w2={6.5} />
  </>
);
const Leg = ({ C, s }) => (
  <>
    <Bone x1={C + s * 16.4} y1={254.5} x2={C + s * 15} y2={300} ws={4.6} w1={10.5} w2={7} />
    <Bone x1={C + s * 22.2} y1={257} x2={C + s * 20.8} y2={303} ws={1.9} w1={3.2} w2={3.8} />
  </>
);
const Talus = ({ C, s }) => <ellipse className="bn-shape" cx={C + s * 16.2} cy={304.6} rx={4.4} ry={2.6} />;
const FootFront = ({ C, s }) => {
  // Von vorn verkürzt: Fußrücken als Trapez, Zehen als kurze Reihe; Großzehe medial
  const cx = C + s * 16;
  return (
    <>
      <path className="bn-shape" d={`M${pt(cx - 5, 307.4)} L${pt(cx + 5, 307.4)} L${pt(cx + 8.4, 314.6)} L${pt(cx - 8.4, 314.6)} Z`} strokeLinejoin="round" />
      {[-6.2, -2.9, 0, 2.7, 5.3].map((dx) => {
        const isBig = dx < -6; // Versatz s*dx < 0 → zur Körpermitte (medial)
        return <ellipse key={dx} className="bn-shape" cx={cx + s * dx} cy={317.6} rx={isBig ? 2.1 : 1.35} ry={isBig ? 2.5 : 2} />;
      })}
    </>
  );
};

// Regionen: Zeichnung je Region (Reihenfolge = Tabulator-Reihenfolge: Vorderansicht oben → unten, dann Rückansicht).
// Jede Region hat eine großzügige, unsichtbare Trefferfläche (.bn-hit) für Touch.
const SHAPES = {
  schulter: (
    <>
      {both((s) => <HitLine key={`h${s}`} x1={F + s * 6} y1={61} x2={F + s * 39} y2={66} w={16} />)}
      {both((s) => (
        <React.Fragment key={s}>
          <Clavicle C={F} s={s} />
          <circle className="bn-shape" cx={F + s * 38} cy={67} r={6} />
        </React.Fragment>
      ))}
    </>
  ),
  brustkorb: (
    <>
      <path className="bn-hit" d={ribcageHit(F)} />
      {both((s) => RIB_W.map((_, i) => <Strut key={`${s}${i}`} d={frontRib(F, s, i)} w={2.3} />))}
      {both((s) => <Strut key={`a${s}`} d={`M${pt(F + s * 3, 111)} C${pt(F + s * 10, 116)} ${pt(F + s * 20, 122)} ${pt(F + s * 29.5, 125)}`} w={2.6} />)}
      <path className="bn-shape" d={sternum(F)} strokeLinejoin="round" />
    </>
  ),
  oberarm: (
    <>
      {both((s) => <HitLine key={`h${s}`} x1={F + s * 39} y1={76} x2={F + s * 43} y2={127} w={18} />)}
      {both((s) => <Humerus key={s} C={F} s={s} />)}
    </>
  ),
  ellenbogen: (
    <>
      {both((s) => <HitLine key={`h${s}`} x1={F + s * 44} y1={134} x2={F + s * 49} y2={189} w={20} />)}
      {both((s) => (
        <React.Fragment key={s}>
          <Elbow C={F} s={s} />
          <Forearm C={F} s={s} />
        </React.Fragment>
      ))}
    </>
  ),
  hand: (
    <>
      {both((s) => <ellipse key={`h${s}`} className="bn-hit" cx={F + s * 50.5} cy={209} rx={15} ry={20} />)}
      {both((s) => <Hand key={s} C={F} s={s} />)}
    </>
  ),
  becken: (
    <>
      <path className="bn-hit" d={`M${F - 38},140 H${F + 38} V192 H${F - 38} Z`} />
      <path className="bn-shape" d={pelvis(F)} fillRule="evenodd" />
    </>
  ),
  oberschenkel: (
    <>
      {both((s) => <HitLine key={`h${s}`} x1={F + s * 25} y1={182} x2={F + s * 17.5} y2={236} w={20} />)}
      {both((s) => <Femur key={s} C={F} s={s} />)}
    </>
  ),
  knie: (
    <>
      {both((s) => <circle key={`h${s}`} className="bn-hit" cx={F + s * 17} cy={247.5} r={11} />)}
      {both((s) => (
        <React.Fragment key={s}>
          <path className="bn-shape" d={knee(F + s * 17)} strokeLinejoin="round" />
          <rect className="bn-shape" x={F + s * 16.5 - 5.6} y={251.3} width={11.2} height={3.2} rx={1.2} />
          <ellipse className="bn-shape" cx={F + s * 17} cy={243.5} rx={3.3} ry={4.2} />
        </React.Fragment>
      ))}
    </>
  ),
  unterschenkel: (
    <>
      {both((s) => <HitLine key={`h${s}`} x1={F + s * 17.5} y1={258} x2={F + s * 17} y2={296} w={20} />)}
      {both((s) => <Leg key={s} C={F} s={s} />)}
    </>
  ),
  sprunggelenk: (
    <>
      {both((s) => <circle key={`h${s}`} className="bn-hit" cx={F + s * 15.5} cy={303} r={8} />)}
      {both((s) => <Talus key={s} C={F} s={s} />)}
    </>
  ),
  fuss: (
    <>
      {both((s) => <rect key={`h${s}`} className="bn-hit" x={F + s * 16 - 11} y={307} width={22} height={17} rx={5} />)}
      {both((s) => <FootFront key={s} C={F} s={s} />)}
    </>
  ),
  hws: (
    <>
      <rect className="bn-hit" x={B - 12} y={44} width={24} height={17} rx={5} />
      <Column cx={B} y0={46} n={5} step={3.3} h={2.6} w={8} mark />
    </>
  ),
  bws: (
    <>
      <rect className="bn-hit" x={B - 12} y={63} width={24} height={60} rx={5} />
      <Column cx={B} y0={63.5} n={12} step={4.85} h={3.8} w={9} mark />
    </>
  ),
  lws: (
    <>
      <rect className="bn-hit" x={B - 13} y={122.5} width={26} height={28} rx={5} />
      <Column cx={B} y0={123} n={5} step={5.4} h={4.5} w={12} mark />
    </>
  ),
  fersenbein: (
    <>
      {both((s) => <rect key={`h${s}`} className="bn-hit" x={B + s * 15.5 - 11} y={300} width={22} height={27} rx={6} />)}
      {both((s) => <path key={s} className="bn-shape" d={heel(B + s * 15.5)} />)}
    </>
  ),
};
const SVG_ORDER = ['schulter', 'brustkorb', 'oberarm', 'ellenbogen', 'hand', 'becken', 'oberschenkel', 'knie', 'unterschenkel', 'sprunggelenk', 'fuss', 'hws', 'bws', 'lws', 'fersenbein'];

// Nicht anklickbare Grundzeichnung (Kontext): Vorderansicht Schädel/HWS/LWS, Rückansicht alles außer Wirbelsäule/Fersenbein
const Base = () => (
  <g className="bn-base" aria-hidden="true">
    {/* Vorderansicht */}
    <path d={skullFront(F)} fillRule="evenodd" />
    <path d={jaw(F)} />
    <Column cx={F} y0={51} n={3} step={3.6} h={2.8} w={7} />
    <Column cx={F} y0={124} n={5} step={5.4} h={4.5} w={12} />
    <path d={sacrum(F)} />
    {/* Rückansicht */}
    <path d={skullBack(B)} />
    <path d={pelvis(B)} fillRule="evenodd" />
    <path d={sacrum(B)} />
    {both((s) => (
      <g key={`b${s}`}>
        {Array.from({ length: 12 }, (_, i) => <Strut key={i} d={backRib(B, s, i)} w={2} e={1.4} />)}
        <path d={scapula(B, s)} strokeLinejoin="round" />
        <circle cx={B + s * 38} cy={67} r={6} />
        <Humerus C={B} s={s} />
        <Elbow C={B} s={s} />
        <Forearm C={B} s={s} />
        <Hand C={B} s={s} />
        <Femur C={B} s={s} />
        <path d={knee(B + s * 17)} strokeLinejoin="round" />
        <rect x={B + s * 16.5 - 5.6} y={251.3} width={11.2} height={3.2} rx={1.2} />
        <Leg C={B} s={s} />
        <Talus C={B} s={s} />
      </g>
    ))}
  </g>
);

const InfoCard = ({ region }) => {
  if (!region) {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
        <p className="font-semibold text-slate-900 dark:text-white">Wählen Sie eine Körperregion</p>
        <p className="mt-2">Tippen oder klicken Sie auf eine Region im Skelett – oder wählen Sie sie in der Liste unten.</p>
      </div>
    );
  }
  const g = groupById[region.group];
  return (
    <div className="h-full rounded-2xl border border-brand-200 bg-white p-6 shadow-sm dark:border-brand-800 dark:bg-slate-900" data-region-card={region.id}>
      <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">{region.name}</h3>
      <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">Typische Fragestellungen</p>
      <ul className="mt-2 space-y-1.5 text-slate-700 dark:text-slate-200">
        {region.questions.map((q) => (
          <li key={q} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
            <span>{q}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5">
        <a href={`#${g.id}`} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
          Angebotene Aufnahmen: {g.title} <ArrowDown size={18} aria-hidden="true" />
        </a>
      </p>
      <p className="mt-4 flex gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-[0.95rem] text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-50">
        <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
        <span><strong className="font-semibold">Röntgen ohne vorherige Terminvereinbarung möglich</strong> – {WALK_IN.requirement.replace(/^Mit/, 'mit')}.</span>
      </p>
    </div>
  );
};

const BodyNavigator = ({ headingLevel = 2 }) => {
  const H = `h${headingLevel}`;
  const { hash } = useLocation();
  const [active, setActive] = useState(null);
  const [preview, setPreview] = useState(null);

  // Sprung über die Zuweisungssuche (#region-…) wählt die Region auch im Skelett aus
  useEffect(() => {
    const id = hash.startsWith('#region-') ? hash.slice('#region-'.length) : null;
    if (id && regionById[id]) setActive(id);
  }, [hash]);

  const shown = regionById[preview || active] || null;

  return (
    <div id="koerpernavigator" data-body-navigator>
      <H id="navigator-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Welche Körperregion soll geröntgt werden?
      </H>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-stretch">
        <figure className="m-0 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950 sm:p-5">
          <svg
            viewBox="0 0 420 346"
            className="bn-svg mx-auto block h-auto w-full max-w-[560px]"
            role="group"
            aria-label={`Schematisches Skelett in Vorder- und Rückansicht mit ${SVG_ORDER.length} auswählbaren Körperregionen`}
            onMouseLeave={() => setPreview(null)}
          >
            <Base />
            {SVG_ORDER.map((id) => {
              const r = regionById[id];
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#region-${id}`}
                  className="bn-region"
                  data-region={id}
                  aria-label={r.name}
                  aria-current={isActive ? 'true' : undefined}
                  data-preview={preview === id ? 'true' : undefined}
                  onMouseEnter={() => setPreview(id)}
                  onFocus={() => setPreview(id)}
                  onBlur={() => setPreview(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(id);
                    setPreview(id);
                  }}
                >
                  {SHAPES[id]}
                </a>
              );
            })}
            <text x={F} y={341} textAnchor="middle" className="bn-label">Vorderansicht</text>
            <text x={B} y={341} textAnchor="middle" className="bn-label">Rückansicht</text>
          </svg>
          <figcaption id="navigator-hinweis" className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
            Die Auswahl dient Ihrer Orientierung. Welche Aufnahmen erforderlich sind, richtet sich nach Ihrer ärztlichen Zuweisung.
            <span className="mt-1 block text-slate-600 dark:text-slate-300">Kräftig gezeichnete Knochen sind auswählbar; blasse Teile dienen nur der Orientierung.</span>
          </figcaption>
        </figure>

        <div id="navigator-info" aria-live="polite" aria-atomic="true" className="min-h-[18rem]">
          <InfoCard region={shown} />
        </div>
      </div>

      {/* Vollständige Textliste: Mobilgeräte, Screenreader, ohne JavaScript */}
      <div className="mt-10">
        <h3 id="regionen-liste-title" className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Alle Körperregionen als Liste
        </h3>
        <p className="mt-2 text-slate-700 dark:text-slate-200">
          <strong className="font-semibold">Röntgen ohne vorherige Terminvereinbarung möglich</strong> – mit gültiger ärztlicher Zuweisung und e-card.
          Die Auswahl dient Ihrer Orientierung; welche Aufnahmen erforderlich sind, richtet sich nach Ihrer ärztlichen Zuweisung.
        </p>
        <ul id="navigator-liste" aria-labelledby="regionen-liste-title" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BODY_REGIONS.map((r) => {
            const g = groupById[r.group];
            return (
              <li key={r.id} id={`region-${r.id}`} className="bn-list-item rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900" data-active={active === r.id ? 'true' : undefined}>
                <h4 className="font-sans text-base font-semibold text-slate-900 dark:text-white">{r.name}</h4>
                <p className="mt-1 text-[0.95rem] text-slate-700 dark:text-slate-200">
                  <span className="sr-only">Typische Fragestellungen: </span>
                  {r.questions.join(' · ')}
                </p>
                <a href={`#${g.id}`} className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-[0.95rem] font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
                  Aufnahmen: {g.title}<span className="sr-only"> (zu {r.name})</span> <ArrowDown size={16} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <Placeholder internal className="mt-5">Typische Fragestellungen je Region: medizinische Freigabe durch die Praxis ausstehend</Placeholder>
      </div>
    </div>
  );
};

export default BodyNavigator;
