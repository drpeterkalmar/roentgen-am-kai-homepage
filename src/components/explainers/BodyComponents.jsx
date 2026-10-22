import { Info } from 'lucide-react';
import ExplainerFigure from './ExplainerFigure';

// A003 – Drei Bestandteile des Körpers: Fettmasse, magere Weichteilmasse, Knochenmineral.
// Texte aus dem bestehenden Seitentext von /koerperanalyse-graz (RESULTS, BODY_LEAN_MASS_TEXT); keine Zahlen,
// keine Anteile – die Figuren sind rein schematisch. Desktop: drei Figuren mit „+“ dazwischen; Handy: gestapelt.

// Schematische Figur (viewBox 100 × 200): ein Umriss für alle drei, nur der hervorgehobene Bestandteil wechselt
const BODY =
  'M45 30 L55 30 L56 36 Q70 37 74 45 L81 93 Q82 100 76 100 Q72 99 72 94 L67 58 L66 80 L67 104 L65 186 Q65 192 59 192 ' +
  'L54 192 L52 118 Q50 113 48 118 L46 192 L41 192 Q35 192 35 186 L33 104 L34 80 L33 58 L28 94 Q28 99 24 100 Q18 100 19 93 ' +
  'L26 45 Q30 37 44 36 Z';
const Body = ({ className }) => (
  <g className={className} strokeWidth="1.5" strokeLinejoin="round">
    <circle cx="50" cy="17" r="11" />
    <path d={BODY} />
  </g>
);
const Skeleton = () => (
  <g className="fill-none stroke-slate-600 dark:stroke-slate-200" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M44 22 Q42 10 50 9 Q58 10 56 22 Q54 26 50 26 Q46 26 44 22 Z" />
    <path d="M50 28 V102" />
    <path d="M39 41 L61 41" />
    <path d="M41 46 Q50 42 59 46 L58 70 Q50 75 42 70 Z" />
    <path d="M42 54 Q50 50 58 54 M42 62 Q50 58 58 62" />
    <path d="M37 98 Q42 92 50 100 Q58 92 63 98 L60 110 Q50 106 40 110 Z" />
    <path d="M71 46 L75 70 L79 93 M29 46 L25 70 L21 93" />
    <path d="M44 110 L42 148 L41 186 M56 110 L58 148 L59 186" />
  </g>
);
const OUTLINE = 'stroke-slate-400 dark:stroke-slate-500';

const Figure = ({ part }) => (
  <svg viewBox="0 0 100 200" className="mx-auto h-28 w-auto md:h-44" aria-hidden="true" focusable="false">
    {part === 'fat' && <Body className={`fill-brand-200 dark:fill-brand-500 ${OUTLINE}`} />}
    {part === 'lean' && <Body className={`fill-brand-600 dark:fill-brand-300 ${OUTLINE}`} />}
    {part === 'bone' && (
      <>
        <Body className={`fill-white dark:fill-slate-900 ${OUTLINE}`} />
        <Skeleton />
      </>
    )}
  </svg>
);

const PARTS = [
  {
    key: 'fat',
    name: 'Fettmasse',
    text: 'Wie viel Ihres Körpergewichts aus Fett besteht – in Prozent und in Kilogramm.',
  },
  {
    key: 'lean',
    name: 'Magere Weichteilmasse',
    text: 'Alles, was weder Fett noch Knochen ist\u00A0– darunter die Muskulatur.',
  },
  {
    key: 'bone',
    name: 'Knochenmineral',
    text: 'Der Mineralgehalt des Skeletts als Teil der Körperzusammensetzung.',
  },
];

const Plus = () => (
  <li aria-hidden="true" className="flex items-center justify-center font-display text-3xl font-semibold text-slate-400 dark:text-slate-500">
    +
  </li>
);

const BodyComponents = ({ className }) => (
  <ExplainerFigure
    id="A003"
    className={className}
    subtitle="Die DEXA-Körperanalyse trennt Ihr Körpergewicht in drei Bestandteile."
    note="keine Messwerte, keine Anteile"
  >
    <ul className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-3" data-body-parts="">
      {PARTS.map((p, i) => [
        i > 0 && <Plus key={`plus-${p.key}`} />,
        <li key={p.key} className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 md:block md:text-center" data-part={p.key}>
          <div className="w-14 shrink-0 md:w-auto">
            <Figure part={p.key} />
          </div>
          <div className="min-w-0 md:mt-3">
            <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">{p.text}</p>
          </div>
        </li>,
      ])}
    </ul>
    <div className="mt-5 flex gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-950" data-lean-note="">
      <Info size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
      <p className="text-[0.95rem] leading-relaxed text-slate-800 dark:text-slate-100">
        <strong className="font-semibold text-slate-900 dark:text-white">Magermasse ist nicht gleich Muskelmasse.</strong>{' '}
        Die magere Weichteilmasse dient als Näherungswert für die Muskelmasse. Muskelkraft und Muskelqualität werden nicht
        direkt gemessen.
      </p>
    </div>
  </ExplainerFigure>
);

export default BodyComponents;
