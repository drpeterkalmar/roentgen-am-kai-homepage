import { useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Image as ImageIcon, X } from 'lucide-react';
import { SHOW_INTERNAL } from '../ui/Placeholder';

// Bausteine der KI-Ratgeberserie „Röntgen am K[AI]“ (Artikel /ratgeber/<ki-slug>):
// * ReportGallery – Beispielberichte als barrierefreier Slider (1–n Folien), vergrößerbar (Dialog), optional
//   nummerierte Hotspots (nur bei einer Folie) mit immer sichtbarer Legende.
// * MediaPlaceholder – deutlich markierter Platzhalter: Nummer, Titel, Format; im Staging zusätzlich das Briefing
//   (gewünschte Inhalte, sicherer Zuschnitt), im Release-Build nicht.
// * ProductLogo – Produktlogo des Herstellers (auf hellem Grund, auch im Dunkelmodus lesbar).
// Daten (Bildgrößen, Hotspot-Positionen, Texte) kommen aus src/data/kiSeries.js.

const BASE = `${import.meta.env.BASE_URL}assets/ki/`;
const WIDTHS = [800, 1200, 1800];
const srcSet = (name, ext) => WIDTHS.map((w) => `${BASE}${name}-${w}.${ext} ${w}w`).join(', ');

const ReportPicture = ({ slide, sizes, className = '', eager = false }) => (
  <picture>
    <source type="image/avif" srcSet={srcSet(slide.key, 'avif')} sizes={sizes} />
    <img
      src={`${BASE}${slide.key}-1200.webp`}
      srcSet={srcSet(slide.key, 'webp')}
      sizes={sizes}
      width={slide.width}
      height={slide.height}
      alt={slide.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  </picture>
);

export const ProductLogo = ({ logo, className = '' }) => (
  <span className={`inline-flex items-center rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200 dark:ring-slate-600 ${className}`}>
    <picture>
      <source type="image/webp" srcSet={`${BASE}${logo.key}.webp`} />
      <img src={`${BASE}${logo.key}.png`} width={logo.width} height={logo.height} alt={logo.alt} className="h-7 w-auto sm:h-8" loading="eager" decoding="async" />
    </picture>
  </span>
);

export const MediaPlaceholder = ({ p }) => (
  <figure
    className="not-prose my-8 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-600 dark:bg-slate-800/60 sm:p-6"
    data-placeholder={`Grafik: ${p.title}`}
    data-ki-media-id={p.id}
  >
    <div className="flex items-start gap-3">
      <ImageIcon size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-slate-500 dark:text-slate-300" />
      <div className="min-w-0">
        <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">Bildplatzhalter</p>
        <p className="mt-1 font-display text-lg font-semibold text-slate-900 dark:text-white">{p.title}</p>
        {p.format && (
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            <strong>Format:</strong> {p.format}
          </p>
        )}
        {/* Briefing (Inhalte, Zuschnitt, Hinweise für die Grafik) nur im Staging-Build – im Release nur Nummer, Titel, Format */}
        {SHOW_INTERNAL && p.inhalte?.length > 0 && (
          <>
            <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Gewünschte Inhalte (Briefing, intern):</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-200">
              {p.inhalte.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </>
        )}
        {SHOW_INTERNAL && p.zuschnitt && (
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            <strong>Sicherer Zuschnitt:</strong> {p.zuschnitt}
          </p>
        )}
      </div>
    </div>
  </figure>
);

// Vergrößerte Ansicht als modaler Dialog (native <dialog>: Esc schließt, Fokus bleibt im Dialog)
const ZoomDialog = ({ slide, open, onClose, titleId }) => {
  const ref = useRef(null);
  const [full, setFull] = useState(false);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  useEffect(() => { if (!open) setFull(false); }, [open]);
  return (
    // Klick auf den abgedunkelten Hintergrund schließt (Tastatur: Esc, Knopf „Schließen“)
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className="m-auto h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-5xl rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/70 dark:bg-slate-900 dark:text-white"
      data-ki-zoom=""
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-2 dark:border-slate-700">
            <p id={titleId} className="min-w-0 truncate font-semibold">{slide.label || 'Beispielbericht'}</p>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => setFull((v) => !v)} aria-pressed={full} className="min-h-[44px] rounded-lg border border-slate-300 px-3 text-sm font-semibold hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                {full ? 'Einpassen' : 'Originalgröße'}
              </button>
              <button type="button" onClick={onClose} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                <X size={20} aria-hidden="true" />
                <span className="sr-only">Vergrößerung schließen</span>
              </button>
            </div>
          </div>
          {/* tabIndex: Bildbereich per Tastatur scrollbar (Pfeiltasten) */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div className="min-h-0 flex-1 overflow-auto bg-slate-900 p-2" tabIndex={0} aria-label="Bildbereich, mit Pfeiltasten scrollen">
            <ReportPicture slide={slide} sizes={full ? '1800px' : '100vw'} eager className={full ? 'mx-auto block max-w-none w-[1800px]' : 'mx-auto block h-full w-auto max-w-full object-contain'} />
          </div>
        </div>
      )}
    </dialog>
  );
};

const HotspotMarkers = ({ hotspots, active, setActive, legendId }) => (
  <div className="pointer-events-none absolute inset-0">
    {hotspots.map((h) => (
      <button
        key={h.n}
        type="button"
        onClick={() => setActive(active === h.n ? null : h.n)}
        aria-pressed={active === h.n}
        aria-describedby={`${legendId}-${h.n}`}
        data-hotspot={h.n}
        style={{ left: `${h.x}%`, top: `${h.y}%` }}
        className={`pointer-events-auto absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white font-bold text-white shadow-lg ring-2 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white ${
          active === h.n ? 'scale-110 bg-brand-700 ring-brand-300' : 'bg-brand ring-black/30 hover:scale-105'
        }`}
      >
        <span aria-hidden="true">{h.n}</span>
        <span className="sr-only">Punkt {h.n}: {h.label}</span>
      </button>
    ))}
  </div>
);

export const ReportGallery = ({ media, title = 'Beispielbericht' }) => {
  const uid = useId().replace(/:/g, '');
  const slides = media.slides;
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [active, setActive] = useState(null);
  const many = slides.length > 1;
  const s = slides[i];
  const go = (d) => setI((v) => (v + d + slides.length) % slides.length);
  const onKey = (e) => {
    if (!many) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };
  const hotspots = !many && media.hotspots?.length ? media.hotspots : null;
  const legendId = `${uid}-hs`;

  return (
    <figure className="not-prose my-10" data-ki-gallery={media.id} aria-labelledby={`${uid}-title`}>
      <p id={`${uid}-title`} className="sr-only">{title}</p>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Pfeiltasten wechseln die Folie */}
      <div
        role="region"
        aria-roledescription={many ? 'Karussell' : undefined}
        aria-label={many ? `${title}: ${slides.length} Bilder` : title}
        onKeyDown={onKey}
        className="rounded-2xl border border-slate-200 bg-slate-950 p-2 dark:border-slate-700 sm:p-3"
      >
        {many && (
          <div className="mb-2 flex flex-wrap gap-2" role="group" aria-label="Bild auswählen">
            {slides.map((sl, n) => (
              <button
                key={sl.key}
                type="button"
                onClick={() => setI(n)}
                aria-pressed={n === i}
                data-slide-tab={n}
                className={`min-h-[44px] rounded-lg px-3 text-left text-sm font-semibold ${
                  n === i ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                }`}
              >
                <span className="sr-only">Bild {n + 1} von {slides.length}: </span>
                {sl.label || `Bild ${n + 1}`}
              </button>
            ))}
          </div>
        )}
        <div className="relative">
          <button type="button" onClick={() => setZoom(true)} className="group block w-full cursor-zoom-in rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-300" data-ki-zoom-open="">
            <ReportPicture slide={s} sizes="(max-width: 767px) 100vw, 720px" className="mx-auto h-auto w-full rounded-lg" />
            <span className="absolute right-2 top-2 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-white/95 px-3 text-sm font-semibold text-slate-900 shadow group-hover:bg-white">
              <Expand size={16} aria-hidden="true" /> Vergrößern
            </span>
          </button>
          {hotspots && <HotspotMarkers hotspots={hotspots} active={active} setActive={setActive} legendId={legendId} />}
          {many && (
            <>
              <button type="button" onClick={() => go(-1)} className="absolute left-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow hover:bg-white">
                <ChevronLeft size={22} aria-hidden="true" />
                <span className="sr-only">Vorheriges Bild</span>
              </button>
              <button type="button" onClick={() => go(1)} className="absolute right-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow hover:bg-white">
                <ChevronRight size={22} aria-hidden="true" />
                <span className="sr-only">Nächstes Bild</span>
              </button>
            </>
          )}
        </div>
      </div>
      <figcaption className="mt-3 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200" aria-live={many ? 'polite' : undefined}>
        {many && <span className="font-semibold">Bild {i + 1} von {slides.length}{s.label ? ` – ${s.label}` : ''}: </span>}
        {s.caption}
        {media.note && <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">{media.note}</span>}
      </figcaption>
      {hotspots && (
        <ol className="mt-4 space-y-2" aria-label="Erklärung der markierten Stellen">
          {hotspots.map((h) => (
            <li
              key={h.n}
              id={`${legendId}-${h.n}`}
              className={`flex gap-3 rounded-xl border p-3 text-[0.95rem] leading-relaxed ${
                active === h.n ? 'border-brand-300 bg-brand-50 dark:border-brand-700 dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{h.n}</span>
              <span className="text-slate-700 dark:text-slate-200"><strong className="text-slate-900 dark:text-white">{h.label}:</strong> {h.text}</span>
            </li>
          ))}
        </ol>
      )}
      <ZoomDialog slide={s} open={zoom} onClose={() => setZoom(false)} titleId={`${uid}-zoom`} />
    </figure>
  );
};

// Ein Medienblock laut kiSeries (Galerie oder Platzhalter)
export const KiMedia = ({ block, title }) => {
  if (!block) return null;
  if (block.slides) return <ReportGallery media={block} title={title} />;
  return <MediaPlaceholder p={block} />;
};
