import ExplainerFigure from './ExplainerFigure';

// A006 – 2D-Zahnröntgen oder 3D-DVT? Panoramaaufnahme als Fläche, DVT als Volumen.
// Texte aus dem bestehenden Seitentext von /zahnroentgen-dvt-graz (Hero, Gruppen-Leads, DENTAL_SERVICES, Hinweis
// „Welche Aufnahme brauche ich?“) – keine neuen Indikationen. Desktop: zwei Felder nebeneinander; Handy: gestapelt.

// Gemeinsamer Strich für beide Zeichnungen (Grautöne), Markenrot nur als Akzent der Zähne
const LINE = 'fill-none stroke-slate-500 dark:stroke-slate-400';
const TOOTH = 'fill-white stroke-slate-500 dark:fill-slate-200 dark:stroke-slate-400';

// Panoramabild: Zähne entlang der Kauebene (Lächelkurve), außen breitere Backenzähne, durchgehender Unterkiefer
const N = 14;
const GAP = 1.6;
const widths = Array.from({ length: N }, (_, i) => {
  const t = Math.abs((i - (N - 1) / 2) / ((N - 1) / 2));
  return 8 + 5 * t * t;
});
const total = widths.reduce((a, b) => a + b, 0) + GAP * (N - 1);
const TEETH = widths.map((w, i) => {
  const x = 120 - total / 2 + widths.slice(0, i).reduce((a, b) => a + b, 0) + GAP * i;
  const t = (x + w / 2 - 120) / (total / 2);
  return { x, w, y: 62 + 7 * (1 - t * t) };
});

const Panorama = () => (
  <svg viewBox="0 0 240 130" className="h-full w-auto max-w-full" aria-hidden="true" focusable="false">
    <rect x="4" y="4" width="232" height="122" rx="10" className="fill-slate-100 stroke-slate-300 dark:fill-slate-900 dark:stroke-slate-600" strokeWidth="1.5" />
    {/* Oberkiefer */}
    <path d="M36 42 Q120 22 204 42" className={LINE} strokeWidth="2" />
    {/* Unterkiefer: Gelenkfortsatz – Ast – Körper – Ast – Gelenkfortsatz */}
    <path d="M24 24 Q20 62 28 90 Q44 112 120 113 Q196 112 212 90 Q220 62 216 24" className={LINE} strokeWidth="2" />
    <ellipse cx="24" cy="21" rx="6" ry="4" className={LINE} strokeWidth="2" />
    <ellipse cx="216" cy="21" rx="6" ry="4" className={LINE} strokeWidth="2" />
    {TEETH.map(({ x, w, y }) => (
      <g key={x} className={TOOTH} strokeWidth="1.2">
        <rect x={x} y={y - 21} width={w} height="20" rx="3" />
        <rect x={x} y={y + 1} width={w} height="20" rx="3" />
      </g>
    ))}
  </svg>
);

// Volumen: Würfel in Schrägansicht; Zahnbogen als Hufeisen auf einer waagrechten Ebene im Inneren
const D = { x: 45, y: -38 }; // Tiefe
const F = { l: 40, r: 150, t: 60, b: 160 }; // Vorderfläche
const P = (u, y, z) => [u + D.x * z, y + D.y * z]; // Punkt (Breite u, Höhe y, Tiefe z 0…1)
const ARCH = Array.from({ length: 13 }, (_, i) => {
  const a = Math.PI * (i / 12);
  return P(95 - 34 * Math.cos(a), 118, 0.78 - 0.56 * Math.sin(a));
});
const archPath = ARCH.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
const B = { l: F.l + D.x, r: F.r + D.x, t: F.t + D.y, b: F.b + D.y }; // Rückfläche

const Volume = () => (
  <svg viewBox="0 0 240 170" className="h-full w-auto max-w-full" aria-hidden="true" focusable="false">
    {/* Flächen */}
    <path d={`M${F.l} ${F.t} L${F.r} ${F.t} L${B.r} ${B.t} L${B.l} ${B.t} Z`} className="fill-slate-100 dark:fill-slate-900" />
    <path d={`M${F.r} ${F.t} L${B.r} ${B.t} L${B.r} ${B.b} L${F.r} ${F.b} Z`} className="fill-slate-200/70 dark:fill-slate-900/70" />
    {/* verdeckte Kanten */}
    <path
      d={`M${B.l} ${B.t} L${B.l} ${B.b} L${B.r} ${B.b} M${B.l} ${B.b} L${F.l} ${F.b}`}
      className="fill-none stroke-slate-400 dark:stroke-slate-500"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    {/* Zahnbogen */}
    <path d={archPath} className="fill-none stroke-brand-200 dark:stroke-brand-800" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    {ARCH.map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x - 3.5} y={y - 3.5} width="7" height="7" rx="2" className="fill-white stroke-brand-600 dark:fill-slate-200 dark:stroke-brand-400" strokeWidth="1.2" />
    ))}
    {/* sichtbare Kanten */}
    <path
      d={`M${F.l} ${F.t} L${F.r} ${F.t} L${F.r} ${F.b} L${F.l} ${F.b} Z M${F.l} ${F.t} L${B.l} ${B.t} L${B.r} ${B.t} L${F.r} ${F.t} M${B.r} ${B.t} L${B.r} ${B.b} L${F.r} ${F.b}`}
      className={LINE}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const PANELS = [
  {
    key: '2d',
    badge: '2D',
    title: 'Zahnröntgen und Panoramaröntgen',
    kind: 'Eine Fläche',
    text: 'Zweidimensionale Übersichts- und Detailaufnahmen. Das Panoramaröntgen zeigt alle Zähne, beide Kiefer und die Kiefergelenke in einem Bild.',
    Art: Panorama,
  },
  {
    key: '3d',
    badge: '3D',
    title: 'Digitale Volumentomographie (DVT)',
    kind: 'Ein Volumen',
    text: 'Die DVT stellt Zähne, Kiefer und angrenzende Strukturen dreidimensional dar – etwa Kieferknochen und Nervenkanäle.',
    Art: Volume,
  },
];

const DentalDimensions = ({ className }) => (
  <ExplainerFigure
    id="A006"
    className={className}
    note="Welche Aufnahme gemacht wird, legt Ihre Zuweisung fest, je nach zahnärztlicher beziehungsweise fachärztlicher Fragestellung"
  >
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6" data-dental-compare="">
      {PANELS.map(({ key, badge, title, kind, text, Art }) => (
        <li key={key} className="flex min-w-0 flex-col rounded-xl bg-slate-50 p-5 dark:bg-slate-800/60" data-panel={key}>
          <div className="flex h-36 items-center justify-center sm:h-44">
            <Art />
          </div>
          <p className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-full bg-brand-600 px-2 text-sm font-semibold text-white dark:bg-brand-300 dark:text-slate-900">
              {badge}
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">{kind}</span>
          </p>
          <p className="mt-2 font-semibold text-slate-900 dark:text-white">{title}</p>
          <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">{text}</p>
        </li>
      ))}
    </ul>
  </ExplainerFigure>
);

export default DentalDimensions;
