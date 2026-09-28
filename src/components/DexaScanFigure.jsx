import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { cx } from './ui/cx';

// Schematische DEXA-Messung (Draufsicht, Rückenlage, Kopf links → obere Bildhälfte = linke Körperseite).
// Der Messarm fährt über den Messbereich, der gemessene Bereich färbt sich ein.
// Reines SVG + CSS (index.css → .dexa-*), keine Bibliothek. Startet einmal, sobald die Grafik ins Bild
// scrollt; „Erneut abspielen“ startet neu. „Bewegung reduzieren“, Druck, ohne JS: sofort das Endbild.
// Inhaltlich deckungsgleich mit dem Seitentext – keine zusätzlichen medizinischen Aussagen.
const MODES = {
  body: {
    start: 28,
    end: 574,
    dur: 4.8,
    title: 'Schema: DEXA-Ganzkörpermessung',
    desc: 'Eine Person liegt auf dem Rücken auf dem Untersuchungstisch. Der Messarm fährt vom Kopf bis zu den Füßen über den ganzen Körper; der gemessene Bereich ist farbig hervorgehoben.',
    caption: 'Schematische Darstellung: Der Messarm fährt über den ganzen Körper, während Sie ruhig auf dem Untersuchungstisch liegen.',
  },
  bone: {
    start: 176,
    end: 316,
    dur: 3.2,
    title: 'Schema: DEXA-Knochendichtemessung',
    desc: 'Eine Person liegt auf dem Rücken auf dem Untersuchungstisch. Der Messarm fährt über Lendenwirbelsäule und Hüfte; beide Messbereiche sind markiert.',
    caption: 'Schematische Darstellung: Der Messarm fährt über Lendenwirbelsäule und Hüfte, während Sie ruhig auf dem Rücken liegen.',
  },
};

// Körperumriss als Einzelformen (direkt in <clipPath> verwendbar – dort ist <g> nicht erlaubt)
const BODY_SHAPES = [
  <ellipse key="head" cx="60" cy="110" rx="24" ry="19" />,
  <rect key="neck" x="78" y="101" width="22" height="18" rx="5" />,
  <path key="torso" d="M122 50 C140 50 152 60 170 67 L172 68 C192 70 202 77 212 78 C236 78 256 70 272 72 Q288 74 288 92 L288 128 Q288 146 272 148 C256 150 236 142 212 142 C202 143 192 150 172 152 L170 153 C152 160 140 170 122 170 C106 170 97 150 97 128 L97 92 C97 70 106 50 122 50 Z" />,
  <path key="arm-l" d="M122 50 L262 55 Q272 60 262 65 L118 67 Q103 59 122 50 Z" />,
  <path key="arm-r" d="M122 170 L262 165 Q272 160 262 155 L118 153 Q103 161 122 170 Z" />,
  <ellipse key="hand-l" cx="272" cy="60" rx="13" ry="5.5" />,
  <ellipse key="hand-r" cx="272" cy="160" rx="13" ry="5.5" />,
  <path key="leg-l" d="M270 80 C380 84 460 91 522 96 Q532 97 532 101.5 L532 103.5 Q532 107 522 107.5 C470 108 400 110 340 110 L270 110 Z" />,
  <path key="leg-r" d="M270 140 C370 137 460 129 522 124 Q532 123 532 118.5 L532 116.5 Q532 113 522 112.5 C470 112 400 110 340 110 L270 110 Z" />,
  <ellipse key="foot-l" cx="540" cy="100.5" rx="13" ry="8" />,
  <ellipse key="foot-r" cx="540" cy="119.5" rx="13" ry="8" />,
];

// Skelett-Andeutung für die Knochendichte (Brustwirbelsäule, Becken, beide Oberschenkel)
const Skeleton = () => (
  <>
    <g opacity="0.55">
      <rect x="104" y="106" width="84" height="8" rx="4" />
      <rect x="244" y="100" width="11" height="20" rx="2.5" />
      <ellipse cx="258" cy="88" rx="15" ry="10" transform="rotate(-18 258 88)" />
      <ellipse cx="258" cy="132" rx="15" ry="10" transform="rotate(18 258 132)" />
      <path d="M257 103 L277 106 L277 114 L257 117 Z" />
      <circle cx="270" cy="132" r="7" />
      <path d="M272 134 L288 140" strokeWidth="7" strokeLinecap="round" className="stroke-white dark:stroke-slate-200" />
      <path d="M288 138 L382 126" strokeWidth="8" strokeLinecap="round" className="stroke-white dark:stroke-slate-200" />
    </g>
    {/* Lendenwirbel L1–L4 + linke Hüfte (Hüftkopf, Schenkelhals, Oberschenkel) */}
    {[192, 205, 218, 231].map((x) => (
      <rect key={x} x={x} y="99" width="11" height="22" rx="2.5" />
    ))}
    {[203, 216, 229].map((x) => (
      <rect key={`d${x}`} x={x} y="104" width="2" height="12" rx="1" opacity="0.4" />
    ))}
    <circle cx="270" cy="88" r="7" />
    <path d="M272 86 L288 80" strokeWidth="7" strokeLinecap="round" className="stroke-white dark:stroke-slate-200" />
    <path d="M288 82 L382 94" strokeWidth="8" strokeLinecap="round" className="stroke-white dark:stroke-slate-200" />
  </>
);

const DexaScanFigure = ({ mode = 'body', className }) => {
  const m = MODES[mode];
  const ref = useRef(null);
  const [run, setRun] = useState(0);
  const uid = `dexa-${mode}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setRun(1);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun((r) => r || 1);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const at = (x) => `${(((x - m.start) / (m.end - m.start)) * m.dur).toFixed(2)}s`;
  const box = 'dexa-hit fill-brand-500/10 stroke-brand dark:fill-white/10 dark:stroke-white';

  return (
    <figure
      ref={ref}
      className={cx('dexa-fig rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-5', run > 0 && 'is-playing', className)}
      style={{ '--arm-start': `${m.start}px`, '--arm-end': `${m.end}px`, '--dur': `${m.dur}s` }}
      data-dexa-figure={mode}
    >
      <svg key={run} viewBox="0 0 600 220" role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="block h-auto w-full">
        <title id={`${uid}-t`}>{m.title}</title>
        <desc id={`${uid}-d`}>{m.desc}</desc>
        <defs>
          <clipPath id={`${uid}-clip`}>{BODY_SHAPES}</clipPath>
        </defs>
        {/* Untersuchungstisch */}
        <rect x="16" y="36" width="568" height="148" rx="18" strokeWidth="2" className="fill-slate-50 stroke-slate-200 dark:fill-slate-800 dark:stroke-slate-600" />
        <g className="fill-slate-400 dark:fill-slate-500">{BODY_SHAPES}</g>
        {/* gemessener Bereich: färbt sich hinter dem Messarm ein (auf den Körper begrenzt) */}
        <g clipPath={`url(#${uid}-clip)`}>
          <rect
            className={cx('dexa-tint', mode === 'bone' ? 'fill-brand-400/40 dark:fill-brand-300/35' : 'fill-brand-400/70 dark:fill-brand-300/70')}
            x={m.start}
            y={mode === 'bone' ? 70 : 30}
            width={m.end - m.start}
            height={mode === 'bone' ? 58 : 160}
          />
        </g>
        {mode === 'bone' && (
          <>
            <g className="fill-white dark:fill-slate-200" clipPath={`url(#${uid}-clip)`}>
              <Skeleton />
            </g>
            <rect className={box} style={{ animationDelay: at(244) }} x="184" y="98" width="64" height="26" rx="6" strokeWidth="2.5" />
            <rect className={box} style={{ animationDelay: at(298) }} x="256" y="74" width="44" height="25" rx="6" strokeWidth="2.5" strokeDasharray="6 3" />
          </>
        )}
        {/* Messarm */}
        <g className="dexa-arm">
          <rect x="-7" y="22" width="14" height="176" rx="7" className="fill-slate-600 dark:fill-slate-400" />
          <rect x="-1.75" y="34" width="3.5" height="152" rx="1.75" className="fill-brand-300 dark:fill-brand-800" />
        </g>
      </svg>
      <figcaption className="mt-3 text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
        {mode === 'bone' && (
          <ul className="mb-2 flex flex-wrap gap-x-5 gap-y-1 font-medium text-slate-800 dark:text-slate-100">
            <li className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-3 w-4 rounded-[3px] border-2 border-brand dark:border-white" />
              Lendenwirbelsäule
            </li>
            <li className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-3 w-4 rounded-[3px] border-2 border-dashed border-brand dark:border-white" />
              Hüfte (Oberschenkelhals)
            </li>
          </ul>
        )}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <span className="min-w-0 flex-1 basis-60">{m.caption}</span>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg px-2 font-semibold text-brand hover:bg-brand-50 motion-reduce:hidden dark:text-brand-300 dark:hover:bg-slate-800"
          >
            <RotateCcw size={16} aria-hidden="true" /> Erneut abspielen
          </button>
        </div>
      </figcaption>
    </figure>
  );
};

export default DexaScanFigure;
