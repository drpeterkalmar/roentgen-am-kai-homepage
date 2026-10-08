import { useEffect, useId, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { cx } from './ui/cx';

// Schematische DEXA-Messung (Draufsicht, Rückenlage, Kopf links → obere Bildhälfte = linke Körperseite).
// Der Messarm fährt über den Messbereich, der gemessene Bereich färbt sich ein.
// Reines SVG + CSS (index.css → .dexa-*), keine Bibliothek. Läuft in Schleife, solange die Grafik im Bild ist:
// Messung → kurz stehen lassen → sanft zurücksetzen → von vorn. „Anhalten“ stoppt (WCAG 2.2.2).
// „Bewegung reduzieren“, Druck, ohne JS: sofort das Endbild, keine Schleife.
const HOLD_MS = 2600;
const RESET_MS = 800;
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

// Körperumriss als Einzelformen (direkt in <clipPath> verwendbar – dort ist <g> nicht erlaubt).
// Proportionen nach Körpermaßen (Figur ≈ 175 cm, ≈ 7,5 Kopflängen): Schritt bei halber Körperlänge,
// Hände bis Mitte Oberschenkel, Ellbogen auf Taillenhöhe, Füße aus dem Unterschenkel heraus (keine Kugeln).
// Glatte Kurven (Catmull-Rom → Bézier), oben/unten spiegelbildlich um die Körperachse y 110.
const BODY_SHAPES = [
  <path key="head" d="M49.0 110.0 C49.0 106.0 50.2 101.4 52.0 98.0 C53.8 94.6 56.5 91.4 60.0 89.5 C63.5 87.6 68.2 86.8 73.0 86.5 C77.8 86.2 84.3 86.7 89.0 87.5 C93.7 88.3 97.7 90.0 101.0 91.5 C104.3 93.0 106.5 93.4 109.0 96.5 C111.5 99.6 116.0 105.5 116.0 110.0 C116.0 114.5 111.5 120.4 109.0 123.5 C106.5 126.6 104.3 127.0 101.0 128.5 C97.7 130.0 93.7 131.7 89.0 132.5 C84.3 133.3 77.8 133.8 73.0 133.5 C68.2 133.2 63.5 132.4 60.0 130.5 C56.5 128.6 53.8 125.4 52.0 122.0 C50.2 118.6 49.0 114.0 49.0 110.0 Z" />,
  <path key="torso" d="M100.0 110.0 C100.0 105.8 101.2 99.5 104.0 97.5 C106.8 95.5 113.8 98.5 117.0 98.0 C120.2 97.5 121.3 96.3 123.0 94.5 C124.7 92.7 125.3 90.4 127.0 87.0 C128.7 83.6 130.7 78.2 133.0 74.0 C135.3 69.8 138.0 65.2 141.0 62.0 C144.0 58.8 147.3 55.8 151.0 54.5 C154.7 53.2 158.8 53.3 163.0 54.5 C167.2 55.7 171.2 59.6 176.0 61.5 C180.8 63.4 186.0 64.6 192.0 66.0 C198.0 67.4 205.7 69.1 212.0 70.0 C218.3 70.9 224.3 71.6 230.0 71.5 C235.7 71.4 240.3 70.4 246.0 69.5 C251.7 68.6 258.3 66.8 264.0 66.0 C269.7 65.2 275.0 64.7 280.0 65.0 C285.0 65.3 290.0 65.5 294.0 68.0 C298.0 70.5 301.7 73.0 304.0 80.0 C306.3 87.0 308.0 100.0 308.0 110.0 C308.0 120.0 306.3 133.0 304.0 140.0 C301.7 147.0 298.0 149.5 294.0 152.0 C290.0 154.5 285.0 154.7 280.0 155.0 C275.0 155.3 269.7 154.8 264.0 154.0 C258.3 153.2 251.7 151.4 246.0 150.5 C240.3 149.6 235.7 148.6 230.0 148.5 C224.3 148.4 218.3 149.1 212.0 150.0 C205.7 150.9 198.0 152.6 192.0 154.0 C186.0 155.4 180.8 156.6 176.0 158.5 C171.2 160.4 167.2 164.3 163.0 165.5 C158.8 166.7 154.7 166.8 151.0 165.5 C147.3 164.2 144.0 161.2 141.0 158.0 C138.0 154.8 135.3 150.2 133.0 146.0 C130.7 141.8 128.7 136.4 127.0 133.0 C125.3 129.6 124.7 127.3 123.0 125.5 C121.3 123.7 120.2 122.5 117.0 122.0 C113.8 121.5 106.8 124.5 104.0 122.5 C101.2 120.5 100.0 114.2 100.0 110.0 Z" />,
  <path key="arm-l" d="M138.0 63.0 C136.8 59.5 142.0 54.8 145.0 52.0 C148.0 49.2 150.5 47.6 156.0 46.5 C161.5 45.4 170.0 45.6 178.0 45.5 C186.0 45.4 195.2 45.7 204.0 46.0 C212.8 46.3 222.3 47.2 231.0 47.5 C239.7 47.8 247.5 47.8 256.0 48.0 C264.5 48.2 275.0 48.7 282.0 49.0 C289.0 49.3 293.3 49.9 298.0 50.0 C302.7 50.1 305.0 49.5 310.0 49.5 C315.0 49.5 323.0 49.5 328.0 50.0 C333.0 50.5 337.2 51.5 340.0 52.5 C342.8 53.5 344.8 54.8 345.0 56.0 C345.2 57.2 343.5 58.8 341.0 59.5 C338.5 60.2 334.5 60.3 330.0 60.5 C325.5 60.7 319.0 60.6 314.0 60.5 C309.0 60.4 305.0 59.9 300.0 60.0 C295.0 60.1 291.0 60.6 284.0 61.0 C277.0 61.4 266.7 62.0 258.0 62.5 C249.3 63.0 240.7 63.8 232.0 64.2 C223.3 64.6 214.0 64.7 206.0 65.0 C198.0 65.3 190.7 65.4 184.0 66.0 C177.3 66.6 171.3 67.3 166.0 68.5 C160.7 69.7 156.7 73.9 152.0 73.0 C147.3 72.1 139.2 66.5 138.0 63.0 Z" />,
  <path key="arm-r" d="M138.0 157.0 C136.8 160.5 142.0 165.2 145.0 168.0 C148.0 170.8 150.5 172.4 156.0 173.5 C161.5 174.6 170.0 174.4 178.0 174.5 C186.0 174.6 195.2 174.3 204.0 174.0 C212.8 173.7 222.3 172.8 231.0 172.5 C239.7 172.2 247.5 172.2 256.0 172.0 C264.5 171.8 275.0 171.3 282.0 171.0 C289.0 170.7 293.3 170.1 298.0 170.0 C302.7 169.9 305.0 170.5 310.0 170.5 C315.0 170.5 323.0 170.5 328.0 170.0 C333.0 169.5 337.2 168.5 340.0 167.5 C342.8 166.5 344.8 165.2 345.0 164.0 C345.2 162.8 343.5 161.2 341.0 160.5 C338.5 159.8 334.5 159.7 330.0 159.5 C325.5 159.3 319.0 159.4 314.0 159.5 C309.0 159.6 305.0 160.1 300.0 160.0 C295.0 159.9 291.0 159.4 284.0 159.0 C277.0 158.6 266.7 158.0 258.0 157.5 C249.3 157.0 240.7 156.2 232.0 155.8 C223.3 155.4 214.0 155.3 206.0 155.0 C198.0 154.7 190.7 154.6 184.0 154.0 C177.3 153.4 171.3 152.7 166.0 151.5 C160.7 150.3 156.7 146.1 152.0 147.0 C147.3 147.9 139.2 153.5 138.0 157.0 Z" />,
  <path key="leg-l" d="M262.0 68.0 C264.0 65.4 273.7 65.0 280.0 64.5 C286.3 64.0 292.3 64.4 300.0 65.0 C307.7 65.6 317.3 66.9 326.0 68.0 C334.7 69.1 343.3 70.2 352.0 71.5 C360.7 72.8 370.3 74.2 378.0 75.5 C385.7 76.8 392.3 78.2 398.0 79.0 C403.7 79.8 407.3 80.4 412.0 80.5 C416.7 80.6 420.3 79.8 426.0 79.5 C431.7 79.2 439.0 78.6 446.0 79.0 C453.0 79.4 461.3 80.8 468.0 82.0 C474.7 83.2 480.7 85.3 486.0 86.5 C491.3 87.7 495.7 88.6 500.0 89.0 C504.3 89.4 508.3 89.3 512.0 89.0 C515.7 88.7 518.8 87.2 522.0 87.0 C525.2 86.8 528.5 86.7 531.0 87.5 C533.5 88.3 536.0 90.1 537.0 92.0 C538.0 93.9 538.0 97.2 537.0 99.0 C536.0 100.8 534.2 102.4 531.0 103.0 C527.8 103.6 522.2 102.9 518.0 102.8 C513.8 102.7 511.3 102.5 506.0 102.5 C500.7 102.5 493.0 102.6 486.0 102.8 C479.0 103.0 471.3 103.3 464.0 103.6 C456.7 103.9 448.7 104.3 442.0 104.4 C435.3 104.5 429.3 104.3 424.0 104.4 C418.7 104.5 415.7 104.8 410.0 105.0 C404.3 105.2 398.0 105.3 390.0 105.6 C382.0 105.9 371.3 106.3 362.0 106.6 C352.7 106.9 342.0 107.2 334.0 107.6 C326.0 108.0 319.5 108.4 314.0 108.8 C308.5 109.2 305.0 109.5 301.0 110.0 C297.0 110.5 293.5 114.0 290.0 112.0 C286.5 110.0 283.7 103.3 280.0 98.0 C276.3 92.7 271.0 85.0 268.0 80.0 C265.0 75.0 260.0 70.6 262.0 68.0 Z" />,
  <path key="leg-r" d="M262.0 152.0 C264.0 154.6 273.7 155.0 280.0 155.5 C286.3 156.0 292.3 155.6 300.0 155.0 C307.7 154.4 317.3 153.1 326.0 152.0 C334.7 150.9 343.3 149.8 352.0 148.5 C360.7 147.2 370.3 145.8 378.0 144.5 C385.7 143.2 392.3 141.8 398.0 141.0 C403.7 140.2 407.3 139.6 412.0 139.5 C416.7 139.4 420.3 140.2 426.0 140.5 C431.7 140.8 439.0 141.4 446.0 141.0 C453.0 140.6 461.3 139.2 468.0 138.0 C474.7 136.8 480.7 134.7 486.0 133.5 C491.3 132.3 495.7 131.4 500.0 131.0 C504.3 130.6 508.3 130.7 512.0 131.0 C515.7 131.3 518.8 132.8 522.0 133.0 C525.2 133.2 528.5 133.3 531.0 132.5 C533.5 131.7 536.0 129.9 537.0 128.0 C538.0 126.1 538.0 122.8 537.0 121.0 C536.0 119.2 534.2 117.6 531.0 117.0 C527.8 116.4 522.2 117.1 518.0 117.2 C513.8 117.3 511.3 117.5 506.0 117.5 C500.7 117.5 493.0 117.4 486.0 117.2 C479.0 117.0 471.3 116.7 464.0 116.4 C456.7 116.1 448.7 115.7 442.0 115.6 C435.3 115.5 429.3 115.7 424.0 115.6 C418.7 115.5 415.7 115.2 410.0 115.0 C404.3 114.8 398.0 114.7 390.0 114.4 C382.0 114.1 371.3 113.7 362.0 113.4 C352.7 113.1 342.0 112.8 334.0 112.4 C326.0 112.0 319.5 111.6 314.0 111.2 C308.5 110.8 305.0 110.5 301.0 110.0 C297.0 109.5 293.5 106.0 290.0 108.0 C286.5 110.0 283.7 116.7 280.0 122.0 C276.3 127.3 271.0 135.0 268.0 140.0 C265.0 145.0 260.0 149.4 262.0 152.0 Z" />,
];

// Viszerales Fett wie im Befund (GE Lunar CoreScan): ausgewertet in der Android-Region. Unterer Rand am
// Beckenkamm (x 243 = Oberkante der Beckenschaufel im Skelett), oberer Rand 20 % des Abstands Becken–Hals
// (Halsschnitt unter dem Kinn, x 88) darüber → x 212–243; seitlich bis zu den Armschnitten (Spalt Arm/Rumpf).
// Gelb = viszerales Fett innerhalb der Bauchwand, der rosa Rand bis zur Rumpfkontur = Unterhautfett.
// Glatte Form aus vier Bézier-Bögen (tangentenstetig, keine Wellen im Rand).
const ANDROID = { x: 212, y: 72, width: 31, height: 76 };
const VAT_PATH = 'M238.5 110 C238.5 127.3 235.4 134 227.5 134 C219.6 134 216.5 127.3 216.5 110 C216.5 92.7 219.6 86 227.5 86 C235.4 86 238.5 92.7 238.5 110 Z';

const LEGEND_BONE = [
  { label: 'Lendenwirbelsäule', swatch: 'border-2 border-brand dark:border-white' },
  { label: 'Hüfte (Oberschenkelhals)', swatch: 'border-2 border-dashed border-brand dark:border-white' },
];
const LEGEND_VAT = [
  { label: 'Viszerales Fett (inneres Bauchfett)', swatch: 'border border-amber-500 bg-amber-300 dark:border-amber-400' },
  { label: 'Messbereich für das Bauchfett', swatch: 'border-2 border-brand dark:border-white' },
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

// visceral: nur setzen, wenn der Bericht der Praxis viszerales Fett enthält (BODY.visceralFat in bodyComposition.js)
const DexaScanFigure = ({ mode = 'body', visceral = false, className }) => {
  const m = MODES[mode];
  const showVat = mode === 'body' && visceral;
  const desc = showVat
    ? `${m.desc} Die Software wertet das viszerale Fett (inneres Bauchfett) in einem umrahmten Messbereich knapp über dem Becken aus; es ist gelb markiert.`
    : m.desc;
  const legend = mode === 'bone' ? LEGEND_BONE : showVat ? LEGEND_VAT : [];
  const ref = useRef(null);
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [resetting, setResetting] = useState(false);
  // eindeutig je Figur (auch mehrere Figuren desselben Modus auf einer Seite); ohne „:“ für url(#…)
  const uid = `dexa-${mode}-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setRun(1);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setRun((r) => r || 1);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Schleife: nach Messung + Pause sanft zurücksetzen, dann neu starten. Nur sichtbar, nicht angehalten,
  // nicht bei „Bewegung reduzieren“.
  useEffect(() => {
    if (!run || !visible || paused) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t1 = setTimeout(() => setResetting(true), m.dur * 1000 + HOLD_MS);
    const t2 = setTimeout(() => {
      setResetting(false);
      setRun((r) => r + 1);
    }, m.dur * 1000 + HOLD_MS + RESET_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [run, visible, paused, m.dur]);

  const at = (x) => `${(((x - m.start) / (m.end - m.start)) * m.dur).toFixed(2)}s`;
  const box = 'dexa-hit fill-brand-500/10 stroke-brand dark:fill-white/10 dark:stroke-white';

  return (
    <figure
      ref={ref}
      className={cx('dexa-fig rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-5', run > 0 && 'is-playing', resetting && 'is-resetting', paused && 'is-paused', className)}
      style={{ '--arm-start': `${m.start}px`, '--arm-end': `${m.end}px`, '--dur': `${m.dur}s`, '--reset': `${RESET_MS}ms` }}
      data-dexa-figure={mode}
    >
      <svg key={run} viewBox="0 0 600 220" role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="block h-auto w-full">
        <title id={`${uid}-t`}>{m.title}</title>
        <desc id={`${uid}-d`}>{desc}</desc>
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
        {showVat && (
          <>
            <rect data-android="" className={box} style={{ animationDelay: at(ANDROID.x + ANDROID.width) }} {...ANDROID} rx="5" strokeWidth="3" />
            <path
              data-vat=""
              d={VAT_PATH}
              strokeWidth="1"
              style={{ animationDelay: at(ANDROID.x + ANDROID.width) }}
              className="dexa-hit fill-amber-300/85 stroke-amber-500 dark:stroke-amber-400"
            />
          </>
        )}
        {/* Messarm */}
        <g className="dexa-arm">
          <rect x="-7" y="22" width="14" height="176" rx="7" className="fill-slate-600 dark:fill-slate-400" />
          <rect x="-1.75" y="34" width="3.5" height="152" rx="1.75" className="fill-brand-300 dark:fill-brand-800" />
        </g>
      </svg>
      <figcaption className="mt-3 text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
        {legend.length > 0 && (
          <ul className="mb-2 flex flex-wrap gap-x-5 gap-y-1 font-medium text-slate-800 dark:text-slate-100">
            {legend.map((l) => (
              <li key={l.label} className="inline-flex items-start gap-2">
                <span aria-hidden="true" className={cx('mt-[0.48em] inline-block h-3 w-4 shrink-0 rounded-[3px]', l.swatch)} />
                {l.label}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <span className="min-w-0 flex-1 basis-60">{m.caption}</span>
          <button
            type="button"
            data-dexa-toggle=""
            aria-pressed={paused}
            onClick={() => {
              setResetting(false);
              if (paused) setRun((r) => r + 1);
              setPaused((v) => !v);
            }}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg px-2 font-semibold text-brand hover:bg-brand-50 motion-reduce:hidden dark:text-brand-300 dark:hover:bg-slate-800"
          >
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            {paused ? 'Abspielen' : 'Anhalten'}
          </button>
        </div>
      </figcaption>
    </figure>
  );
};

export default DexaScanFigure;
