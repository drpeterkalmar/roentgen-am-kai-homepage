import ExplainerFigure from './ExplainerFigure';
import {
  CANAL, FORAMEN, FOSSA, MANDIBLE_FILL, MANDIBLE_OUTLINE, MENTAL, NASAL, PALATE, PANO, PANO_TEETH, SEPTUM, SINUS, TURBINATES, VOL,
  VOLUME, ZYGOMA,
} from './dentalArt';

// A006 – 2D-Zahnröntgen oder 3D-DVT? Panoramaaufnahme als Fläche, DVT als Volumen (Neuzeichnung 25.10.2026).
// Texte aus dem bestehenden Seitentext von /zahnroentgen-dvt-graz (Hero, Gruppen-Leads, DENTAL_SERVICES, Hinweis
// „Welche Aufnahme brauche ich?“) – keine neuen Indikationen. Desktop: zwei Felder nebeneinander; Handy: gestapelt.
// Beide Zeichnungen im Röntgen-Look (helle Strukturen auf dunklem Grund, in hellem wie dunklem Seitenmodus gleich),
// je Kiefer 16 Zähne inklusive Weisheitszähne. Geometrie in ./dentalArt.js.

const BONE = 'rgba(226,232,240,0.62)'; // Kortikalis-Linie
const SOFT = 'rgba(148,163,184,0.32)';
const NERVE = '#F28B82'; // brand-300: Nervenkanal als einziger Farbakzent
const BG = (id) => (
  <radialGradient id={id} cx="50%" cy="50%" r="70%">
    <stop offset="0%" stopColor="#1e293b" />
    <stop offset="100%" stopColor="#020617" />
  </radialGradient>
);

// 2D: Panoramaschichtaufnahme (OPG)
const Panorama = () => (
  <svg viewBox={`0 0 ${PANO.w} ${PANO.h}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <defs>
      {BG('a006-pano-bg')}
      <linearGradient id="a006-enamel-upper" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="a006-enamel-lower" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <filter id="a006-glow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="1.6" />
      </filter>
    </defs>
    <rect width={PANO.w} height={PANO.h} fill="url(#a006-pano-bg)" />
    {/* Mittelgesicht: Nasenhöhle, Kieferhöhlen, Jochbogen, Gaumen, Gelenkgruben – zarte Schatten */}
    <path d={NASAL} fill="rgba(2,6,23,0.35)" stroke={SOFT} strokeWidth="1" />
    {TURBINATES.map((d) => <path key={d} d={d} fill="none" stroke={SOFT} strokeWidth="1" strokeLinecap="round" />)}
    <path d={SEPTUM} stroke={SOFT} strokeWidth="1.2" />
    {SINUS.map((d) => <path key={d} d={d} fill="rgba(2,6,23,0.3)" stroke={SOFT} strokeWidth="1" />)}
    {ZYGOMA.map((d) => <path key={d} d={d} fill="none" stroke="rgba(203,213,225,0.3)" strokeWidth="2.2" strokeLinecap="round" />)}
    <path d={PALATE} fill="none" stroke="rgba(203,213,225,0.38)" strokeWidth="1.8" strokeLinecap="round" />
    {FOSSA.map((d) => <path key={d} d={d} fill="none" stroke={SOFT} strokeWidth="1.3" strokeLinecap="round" />)}
    {/* Unterkiefer */}
    <path d={MANDIBLE_FILL} fill="rgba(148,163,184,0.11)" />
    {MANDIBLE_OUTLINE.map((d) => (
      <g key={d}>
        <path d={d} fill="none" stroke="rgba(226,232,240,0.16)" strokeWidth="3.5" filter="url(#a006-glow)" />
        <path d={d} fill="none" stroke={BONE} strokeWidth="1.7" />
      </g>
    ))}
    {/* Nervenkanal: Band mit zwei feinen Rändern */}
    {CANAL.map((d) => (
      <g key={d}>
        <path d={d} fill="none" stroke={NERVE} strokeOpacity="0.75" strokeWidth="4" strokeLinecap="round" />
        <path d={d} fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </g>
    ))}
    {FORAMEN.map(({ cx, cy }) => <ellipse key={cx} cx={cx} cy={cy} rx="2" ry="2.8" fill="#0f172a" stroke={NERVE} strokeOpacity="0.85" strokeWidth="1.1" />)}
    {MENTAL.map(({ cx, cy }) => <circle key={cx} cx={cx} cy={cy} r="2.3" fill="#0f172a" stroke={NERVE} strokeOpacity="0.85" strokeWidth="1.1" />)}
    {/* Zähne: Wurzeln (Dentin), Kronen (Schmelz, heller), Pulpa (dunkel) */}
    {PANO_TEETH.map(({ key, jaw, crown, roots, back, pulp, chamber, rot }) => (
      <g key={key} transform={rot}>
        {back.map((d) => <path key={d} d={d} fill="rgba(203,213,225,0.3)" />)}
        {roots.map((d) => <path key={d} d={d} fill="rgba(203,213,225,0.66)" stroke="rgba(241,245,249,0.45)" strokeWidth="0.5" />)}
        <path d={crown} fill={`url(#a006-enamel-${jaw})`} stroke="#ffffff" strokeWidth="0.4" />
        {chamber && <path d={chamber} fill="rgba(15,23,42,0.28)" />}
        <path d={pulp} fill="none" stroke="rgba(15,23,42,0.5)" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ))}
  </svg>
);

// 3D: DVT-Volumen des Unterkiefers mit Nervenkanal und Messfeld-Würfel (Übergang, bis die Blender-Fassung fertig ist)
const toothFill = (kind, jaw, light) => {
  const k = 0.45 + 0.55 * light;
  if (kind === 'root') return `rgba(${Math.round(150 + 70 * k)},${Math.round(165 + 62 * k)},${Math.round(185 + 50 * k)},0.42)`;
  // Oberkiefer etwas kühler, Unterkiefer etwas wärmer – so bleiben die beiden Zahnreihen unterscheidbar
  const [r, g, b] = jaw === 'upper' ? [138, 154, 178] : [160, 156, 150];
  return `rgb(${Math.round(r + (255 - r) * k)},${Math.round(g + (255 - g) * k)},${Math.round(b + (255 - b) * k)})`;
};
const Teeth = ({ jaw }) =>
  VOLUME[jaw].map(({ key, kind, faces }) => (
    <g key={key}>
      {faces.map(({ key: k, points, light }) => (
        <polygon
          key={k}
          points={points}
          fill={toothFill(kind, jaw, light)}
          stroke={kind === 'root' ? 'none' : 'rgba(15,23,42,0.3)'}
          strokeWidth="0.3"
          strokeLinejoin="round"
        />
      ))}
    </g>
  ));

const Volume = () => (
  <svg viewBox={`0 0 ${VOL.w} ${VOL.h}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <defs>
      {BG('a006-vol-bg')}
      <filter id="a006-nerve" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
    <rect width={VOL.w} height={VOL.h} fill="url(#a006-vol-bg)" />
    {/* Messfeld: verdeckte Kanten gestrichelt */}
    {VOLUME.edges.filter((e) => e.hidden).map((e) => (
      <path key={e.d} d={e.d} stroke="rgba(148,163,184,0.35)" strokeWidth="0.9" strokeDasharray="3 3" />
    ))}
    {/* Unterkiefer, durchscheinend: Äste, Unterrand, Außenwand */}
    {VOLUME.mandible.rami.map((p) => <polygon key={p} points={p} fill="rgba(148,163,184,0.1)" stroke={BONE} strokeWidth="1" strokeLinejoin="round" />)}
    <polygon points={VOLUME.mandible.base} fill="rgba(148,163,184,0.08)" />
    {VOLUME.mandible.walls.map((p) => <polygon key={p} points={p} fill="rgba(148,163,184,0.06)" />)}
    <polyline points={VOLUME.mandible.baseLine} fill="none" stroke={BONE} strokeWidth="1.1" strokeLinejoin="round" />
    {/* Nervenkanal */}
    {VOLUME.canal.map((p) => (
      <g key={p}>
        <polyline points={p} fill="none" stroke={NERVE} strokeOpacity="0.55" strokeWidth="3.5" filter="url(#a006-nerve)" strokeLinejoin="round" />
        <polyline points={p} fill="none" stroke={NERVE} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ))}
    <Teeth jaw="lower" />
    <polyline points={VOLUME.mandible.crest} fill="none" stroke="rgba(203,213,225,0.3)" strokeWidth="0.8" strokeLinejoin="round" />
    {/* Nur der Unterkiefer (Weisheitszahn und Nervenkanal); beide Zahnbögen würden sich in der Schrägansicht überlagern */}
    {/* Messfeld: sichtbare Kanten */}
    {VOLUME.edges.filter((e) => !e.hidden).map((e) => (
      <path key={e.d} d={e.d} stroke="rgba(203,213,225,0.5)" strokeWidth="1.1" strokeLinecap="round" />
    ))}
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
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-950 ring-1 ring-slate-900/10 dark:ring-white/10">
            <Art />
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-2">
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
