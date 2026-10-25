import ExplainerFigure from './ExplainerFigure';
import {
  CANAL, FORAMEN, FOSSA, MANDIBLE_FILL, MANDIBLE_OUTLINE, MENTAL, NASAL, PALATE, PANO, PANO_TEETH, SEPTUM, SINUS, TURBINATES, ZYGOMA,
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

// 3D: Blender-Render (assets-src/zahn/render_dvt.py → npm run images:zahn): Unterkiefer aus „Glas“ mit 16 Zähnen
// inkl. Weisheitszähnen, Nervenkanal und zylindrischem DVT-Aufnahmefeld. Hintergrund im Bild = Verlauf der SVG-Felder.
const ZAHN = `${import.meta.env?.BASE_URL ?? '/'}assets/zahn/`;
const set = (ext) => [800, 1200, 1600].map((w) => `${ZAHN}dvt-volumen-${w}.${ext} ${w}w`).join(', ');
const SIZES = '(min-width: 1280px) 560px, (min-width: 768px) 45vw, 90vw';
const Volume = () => (
  <picture>
    <source type="image/avif" srcSet={set('avif')} sizes={SIZES} />
    <img
      src={`${ZAHN}dvt-volumen-1200.webp`}
      srcSet={set('webp')}
      sizes={SIZES}
      width="1600"
      height="900"
      loading="lazy"
      decoding="async"
      alt="Schematische 3D-Darstellung: Unterkiefer mit Zähnen und Nervenkanal im zylindrischen Aufnahmefeld der DVT"
      className="h-full w-full object-cover"
      data-dvt-render=""
    />
  </picture>
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
