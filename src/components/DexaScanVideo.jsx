import { useEffect, useId, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { cx } from './ui/cx';

// Erklärfilm DEXA-Ganzkörpermessung (Körperanalyse, Ablauf Schritt 3) – von der Praxis geliefert.
// Zwei Fassungen (12.10.2026): „desktop“ (mit Legende, kleinere Schrift) und „mobil“ (große Schrift, ohne Legende).
// Die Fassung richtet sich nach der Bildschirmbreite (bis 767 px = mobil). Keine KI-Kennzeichnung (Wunsch der Praxis,
// 12.10.2026); im Film selbst steht „Schema(tische Darstellung) – keine Patientenaufnahme“.
// Vorlagen: assets-src/videos/koerperanalyse-dexa-scan-{desktop,mobil}.mp4 (1920 × 1080, 30 s, ohne Ton)
// → public/assets/videos/…-desktop-1280.{mp4,webm}, …-mobil-960.{mp4,webm} (H.264 / VP9) + …-poster.webp (bei 26 s).
// Verhalten:
// - lädt erst beim Abspielen (preload="none"), spielt stumm in Schleife, solange der Film im Bild ist;
// - „Anhalten“/„Abspielen“ (WCAG 2.2.2); bei „Bewegung reduzieren“ startet nichts von selbst (Standbild = Gesamtansicht);
// - alle Texte des Films stehen zusätzlich als Text darunter (aufklappbar) – Screenreader und Suchmaschinen.
const BASE = `${import.meta.env.BASE_URL}assets/videos/`;
const VARIANTS = {
  desktop: { file: 'koerperanalyse-dexa-scan-desktop', w: 1280, h: 720 },
  mobil: { file: 'koerperanalyse-dexa-scan-mobil', w: 960, h: 540 },
};
const SMALL = '(max-width: 767px)';

// Wortlaut der Einblendungen im Film (Reihenfolge wie im Film)
export const DEXA_VIDEO_TRANSCRIPT = [
  { title: 'Der Scan', text: 'Der Scanarm fährt vom Kopf bis zu den Füßen – mit sehr geringer Strahlendosis.' },
  {
    title: 'Die Analyse',
    text: 'Getrennt dargestellt werden die Knochenmineraldichte, die Muskelmasse, die Magermasse (dazu zählen z. B. auch die Organe), das Fettgewebe unter der Haut (subkutanes Fettgewebe) und das viszerale Fett im Bauchraum.',
  },
];

const DexaScanVideo = ({ className }) => {
  const ref = useRef(null);
  const video = useRef(null);
  const uid = useId();
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [userPaused, setUserPaused] = useState(null); // null = noch keine Entscheidung der Nutzerin/des Nutzers
  const [small, setSmall] = useState(false); // Vorrendern/erstes Bild: Desktop-Fassung; lädt ohnehin erst beim Abspielen

  useEffect(() => {
    const mq = window.matchMedia?.(SMALL);
    if (!mq) return undefined;
    setSmall(mq.matches);
    const on = (e) => setSmall(e.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  const variant = small ? 'mobil' : 'desktop';
  const V = VARIANTS[variant];

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return undefined;
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = userPaused ?? reduced;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visible && !paused) v.play().catch(() => {});
    else v.pause();
  }, [visible, paused, variant]);

  return (
    <figure
      ref={ref}
      className={cx(
        '-ml-[3.25rem] rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900 sm:ml-0 sm:p-5',
        className
      )}
      data-dexa-video=""
    >
      <div>
        <video
          key={variant}
          ref={video}
          className="block h-auto w-full rounded-xl bg-slate-100 dark:bg-slate-800"
          width={V.w}
          height={V.h}
          muted
          loop
          playsInline
          preload="none"
          poster={`${BASE}${V.file}-poster.webp`}
          aria-label="Erklärfilm ohne Ton: schematischer Ablauf einer DEXA-Ganzkörpermessung und ihrer Auswertung"
          aria-describedby={`${uid}-t`}
          data-paused={paused ? 'true' : 'false'}
          data-variant={variant}
        >
          <source src={`${BASE}${V.file}-${V.w}.mp4`} type="video/mp4" />
          <source src={`${BASE}${V.file}-${V.w}.webm`} type="video/webm" />
        </video>
      </div>
      <figcaption className="mt-3 px-1 text-[0.95rem] sm:px-0 leading-relaxed text-slate-600 dark:text-slate-300">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <span className="min-w-0 flex-1 basis-60">
            Schematische Darstellung: Der Scanarm fährt über den ganzen Körper. Anschließend werden Knochen,
            Magermasse und Fettgewebe getrennt ausgewertet.
          </span>
          <button
            type="button"
            data-dexa-toggle=""
            aria-pressed={paused}
            onClick={() => setUserPaused(!paused)}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg px-2 font-semibold text-brand hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-slate-800"
          >
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            {paused ? 'Abspielen' : 'Anhalten'}
          </button>
        </div>
        <details className="mt-2" data-dexa-transcript="">
          <summary className="inline-flex min-h-[44px] cursor-pointer items-center font-semibold text-slate-800 underline underline-offset-4 hover:text-brand dark:text-slate-100">
            Inhalt des Films als Text
          </summary>
          <div id={`${uid}-t`} className="mt-1 space-y-2">
            {DEXA_VIDEO_TRANSCRIPT.map((s) => (
              <p key={s.title}>
                <span className="font-semibold text-slate-800 dark:text-slate-100">{s.title}:</span> {s.text}
              </p>
            ))}
            <p>Schematische Darstellung – keine Patientenaufnahme.</p>
          </div>
        </details>
      </figcaption>
    </figure>
  );
};

export default DexaScanVideo;
