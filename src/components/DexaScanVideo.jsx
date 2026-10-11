import { useEffect, useId, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { cx } from './ui/cx';

// Erklärfilm DEXA-Ganzkörpermessung (Körperanalyse, Ablauf Schritt 3) – von der Praxis geliefert (11.10.2026),
// KI-generiert und im Film selbst als „KI-generiert“ / „Schematische Darstellung – keine Patientenaufnahme“ gekennzeichnet.
// Vorlage: assets-src/videos/koerperanalyse-dexa-scan.mp4 (1920 × 1080, 30 s, ohne Ton)
// → public/assets/videos/…-1280.mp4 (H.264) + …-1280.webm (VP9) + …-poster.webp (Gesamtansicht bei 22,5 s).
// Verhalten:
// - lädt erst beim Abspielen (preload="none"), spielt stumm in Schleife, solange der Film im Bild ist;
// - „Anhalten“/„Abspielen“ (WCAG 2.2.2); bei „Bewegung reduzieren“ startet nichts von selbst (Standbild = Gesamtansicht);
// - alle Texte des Films stehen zusätzlich als Text darunter (aufklappbar) – Screenreader und Suchmaschinen.
const BASE = `${import.meta.env.BASE_URL}assets/videos/`;
const FILE = 'koerperanalyse-dexa-scan';

// Wortlaut der Einblendungen im Film (Reihenfolge wie im Film)
export const DEXA_VIDEO_TRANSCRIPT = [
  { title: 'Der Scan', text: 'Der Scanarm fährt vom Kopf bis zu den Füßen – mit sehr geringer Strahlendosis.' },
  {
    title: 'Die Analyse',
    text: 'Getrennt dargestellt werden die Knochenmineraldichte, die Magermasse (vor allem Muskulatur), das Fettgewebe unter der Haut (subkutanes Fettgewebe) und das viszerale Fett im Bauchraum.',
  },
];

const DexaScanVideo = ({ className }) => {
  const ref = useRef(null);
  const video = useRef(null);
  const uid = useId();
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [userPaused, setUserPaused] = useState(null); // null = noch keine Entscheidung der Nutzerin/des Nutzers

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
  }, [visible, paused]);

  return (
    <figure
      ref={ref}
      className={cx('rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-5', className)}
      data-dexa-video=""
    >
      <video
        ref={video}
        className="block h-auto w-full rounded-xl bg-slate-100 dark:bg-slate-800"
        width={1280}
        height={720}
        muted
        loop
        playsInline
        preload="none"
        poster={`${BASE}${FILE}-poster.webp`}
        aria-label="Erklärfilm ohne Ton: schematischer Ablauf einer DEXA-Ganzkörpermessung und ihrer Auswertung (KI-generiert)"
        aria-describedby={`${uid}-t`}
        data-paused={paused ? 'true' : 'false'}
      >
        <source src={`${BASE}${FILE}-1280.mp4`} type="video/mp4" />
        <source src={`${BASE}${FILE}-1280.webm`} type="video/webm" />
      </video>
      <figcaption className="mt-3 text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <span className="min-w-0 flex-1 basis-60">
            Schematische, KI-generierte Darstellung: Der Scanarm fährt über den ganzen Körper. Anschließend werden Knochen,
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
            <p>Schematische Darstellung, KI-generiert – keine Patientenaufnahme.</p>
          </div>
        </details>
      </figcaption>
    </figure>
  );
};

export default DexaScanVideo;
