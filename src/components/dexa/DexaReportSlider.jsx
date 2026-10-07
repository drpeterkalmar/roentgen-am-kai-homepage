import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react';
import { cx } from '../ui/cx';
import { DEXA_EXPLANATIONS, DEXA_IMAGE, DEXA_REPORT_EXAMPLES, DEXA_SOURCES } from '../../data/dexaReportExamples';

// Befund-Slider der Körperanalyse-Seite: sechs anonymisierte DEXA-Beispielseiten mit erklärten Messwerten.
// Inhalte, Hotspot-Positionen und Erklärungen kommen ausschließlich aus src/data/dexaReportExamples.js.
//
// Bedienung
// - Pfeile, Seitenpunkte, „n von 6“, Wischen (Pointer-Events), Pfeiltasten/Pos1/Ende im Slider. Kein Autoplay.
// - Messwerte: Markierungen im Bild (Maus: Hover zeigt, Klick hält fest; Touch: Antippen) und eine Liste
//   „Messwerte auf dieser Seite“ (Tastatur: Fokus zeigt, Enter/Leertaste hält fest). Die Markierung ist nur ein
//   Rahmen ohne Füllung, die Erklärung steht neben (Desktop) bzw. unter dem Bild (Handy) – nichts verdeckt Werte.
// - Zoom: Vollbild-Dialog (<dialog>), Plus/Minus, Strg+Mausrad, Zwei-Finger-Zoom, Verschieben per Scrollen/Ziehen.
// - Bilder: AVIF/WebP mit srcset; geladen werden nur die aktuelle und die Nachbarseiten, der Rest bei Bedarf.

const BASE = `${import.meta.env.BASE_URL}assets/dexa/`;
const srcSet = (file, ext) => DEXA_IMAGE.widths.map((w) => `${BASE}${file}-${w}.${ext} ${w}w`).join(', ');
const pdfUrl = (file) => `${BASE}${file}.pdf`;
const N = DEXA_REPORT_EXAMPLES.length;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const clampZoom = (z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z * 100) / 100));

const ReportImage = ({ slide, sizes, eager = false, className }) => (
  <picture>
    <source type="image/avif" srcSet={srcSet(slide.file, 'avif')} sizes={sizes} />
    <source type="image/webp" srcSet={srcSet(slide.file, 'webp')} sizes={sizes} />
    <img
      src={`${BASE}${slide.file}-1200.webp`}
      alt={slide.alt}
      width={DEXA_IMAGE.width}
      height={DEXA_IMAGE.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={cx('block h-auto w-full select-none', className)}
    />
  </picture>
);

// Markierungen über dem Bild – nur für Maus und Touch (Tastatur nutzt die Liste darunter, sonst doppelte Tab-Stopps).
const HotspotLayer = ({ slide, activeId, previewId, onPreview, onSelect }) => (
  <div className="absolute inset-0" data-hotspot-layer="">
    {slide.hotspots.map((h) => {
      const on = h.id === activeId || h.id === previewId;
      return (
        <button
          key={h.id}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          aria-label={h.label}
          data-hotspot={h.id}
          title={h.label}
          onPointerEnter={(e) => e.pointerType === 'mouse' && onPreview(h.id)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && onPreview(null)}
          onClick={() => onSelect(h.id)}
          // seitlich 3 px Abstand nach außen (berührt keine Ziffer), oben/unten nur 1 px (Tabellenzeilen liegen eng)
          style={{ left: `calc(${h.x}% - 3px)`, top: `calc(${h.y}% - 1px)`, width: `calc(${h.w}% + 6px)`, height: `calc(${h.h}% + 2px)` }}
          className={cx(
            'dexa-hotspot absolute rounded-[3px] outline-none',
            on ? 'dexa-hotspot-on' : ''
          )}
        />
      );
    })}
  </div>
);

// Referenztabelle (Werte wörtlich aus den Publikationen, siehe dexaReportExamples.js)
const ReferenceTable = ({ t }) => (
  <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
    <table className="w-full border-collapse text-left text-sm tabular-nums">
      <caption className="bg-slate-50 px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
        {t.titel}
      </caption>
      <thead>
        <tr className="border-b border-slate-200 dark:border-slate-700">
          {t.kopf.map((k) => (
            <th key={k} scope="col" className="px-2.5 py-1 font-semibold text-slate-900 dark:text-white">
              {k}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {t.zeilen.map((z) => (
          <tr key={z[0]} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
            <th scope="row" className="whitespace-nowrap px-2.5 py-1 font-normal text-slate-700 dark:text-slate-200">
              {z[0]}
            </th>
            {z.slice(1).map((c, i) => (
              <td key={i} className="whitespace-nowrap px-2.5 py-1">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Explanation = ({ hotspot, titleId }) => {
  const e = DEXA_EXPLANATIONS[hotspot.key];
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">Im Befund markiert</p>
      <h4 id={titleId} className="mt-1 font-display text-lg font-semibold leading-snug text-slate-900 dark:text-white">{e.name}</h4>
      <dl className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">
        <div>
          <dt className="font-semibold text-slate-900 dark:text-white">Kurz erklärt</dt>
          <dd>{e.definition}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900 dark:text-white">Was der Wert beschreibt</dt>
          <dd>{e.beschreibt}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900 dark:text-white">Einheit im Befund</dt>
          <dd>{e.einheit}</dd>
        </div>
        {e.referenz && (
          <div data-dexa-referenz="">
            <dt className="font-semibold text-slate-900 dark:text-white">Referenzwerte laut Fachliteratur</dt>
            <dd>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {e.referenz.punkte.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {e.referenz.tabelle && <ReferenceTable t={e.referenz.tabelle} />}
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {e.referenz.hinweis}{' '}
                <span>
                  Quelle:{' '}
                  {e.referenz.quellen.map((q, i) => (
                    <span key={q.id + q.seiten}>
                      {i > 0 && '; '}
                      {/* je Quelle Name + Seite zusammenhalten, zwischen den Quellen umbrechen (360 px) */}
                      <span className="whitespace-nowrap">
                        <a href={`#dexa-quelle-${q.id}`} className="underline underline-offset-2 hover:text-brand dark:hover:text-brand-300">
                          {DEXA_SOURCES[q.id].short}
                        </a>
                        , S. {q.seiten}
                      </span>
                    </span>
                  ))}
                </span>
              </p>
            </dd>
          </div>
        )}
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-50">
          <dt className="font-semibold">Wichtig</dt>
          <dd>{e.einschraenkung}</dd>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          <dt className="inline font-semibold">Quelle: </dt>
          <dd className="inline">
            {e.quellen.map((q, i) => (
              <span key={q.id}>
                {i > 0 && '; '}
                <a href={`#dexa-quelle-${q.id}`} className="underline underline-offset-2 hover:text-brand dark:hover:text-brand-300">
                  {DEXA_SOURCES[q.id].short}
                </a>
                , S. {q.seiten}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  );
};

// Zoom-Dialog: Bild mit Markierungen in wählbarer Vergrößerung. Pinch und Strg+Rad über Pointer-/Wheel-Events.
const ZoomDialog = ({ slide, open, onClose, activeId, onSelect }) => {
  const ref = useRef(null);
  const scroller = useRef(null);
  const pointers = useRef(new Map());
  const pinch = useRef(null);
  const drag = useRef(null);
  const [zoom, setZoom] = useState(2);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setZoom(2);
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open]);

  // Zoomen um einen Punkt (Bildschirmkoordinaten), damit die Stelle unter Finger/Maus stehen bleibt
  const zoomAt = useCallback((next, cx0, cy0) => {
    const s = scroller.current;
    const z = clampZoom(next);
    if (!s) return setZoom(z);
    const r = s.getBoundingClientRect();
    const px = (cx0 ?? r.left + r.width / 2) - r.left;
    const py = (cy0 ?? r.top + r.height / 2) - r.top;
    const fx = (s.scrollLeft + px) / s.scrollWidth;
    const fy = (s.scrollTop + py) / s.scrollHeight;
    setZoom(z);
    requestAnimationFrame(() => {
      s.scrollLeft = fx * s.scrollWidth - px;
      s.scrollTop = fy * s.scrollHeight - py;
    });
  }, []);

  useEffect(() => {
    const s = scroller.current;
    if (!s || !open) return undefined;
    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return; // normales Rad = Verschieben
      e.preventDefault();
      zoomAt(zoomRef.current * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY);
    };
    s.addEventListener('wheel', onWheel, { passive: false });
    return () => s.removeEventListener('wheel', onWheel);
  }, [open, zoomAt]);

  const onPointerDown = (e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), zoom: zoomRef.current };
      drag.current = null;
    } else if (e.pointerType === 'mouse') {
      drag.current = { x: e.clientX, y: e.clientY, left: scroller.current.scrollLeft, top: scroller.current.scrollTop, moved: false };
    }
  };
  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt(pinch.current.zoom * (dist / pinch.current.dist), (a.x + b.x) / 2, (a.y + b.y) / 2);
    } else if (drag.current) {
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.current.moved = true;
      scroller.current.scrollLeft = drag.current.left - dx;
      scroller.current.scrollTop = drag.current.top - dy;
    }
  };
  const onPointerUp = (e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };
  // Nach dem Ziehen mit der Maus keinen Klick auf eine Markierung auslösen
  const onClickCapture = (e) => {
    if (drag.current?.moved) {
      e.stopPropagation();
      e.preventDefault();
    }
    drag.current = null;
  };

  const titleId = useId();
  const active = slide.hotspots.find((h) => h.id === activeId);

  // Beim Öffnen und beim Wechsel der Markierung den markierten Bereich in die Mitte holen
  useEffect(() => {
    if (!open || !active) return undefined;
    const id = requestAnimationFrame(() => {
      const sc = scroller.current;
      const el = sc?.querySelector(`[data-hotspot='${active.id}']`);
      if (!sc || !el) return;
      const r = el.getBoundingClientRect();
      const sr = sc.getBoundingClientRect();
      sc.scrollLeft += r.left + r.width / 2 - (sr.left + sr.width / 2);
      sc.scrollTop += r.top + r.height / 2 - (sr.top + sr.height / 2);
    });
    return () => cancelAnimationFrame(id);
  }, [open, active, zoom]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={onClose}
      className="dexa-zoom m-0 h-[100dvh] max-h-none w-screen max-w-none bg-white p-0 text-slate-900 backdrop:bg-slate-950/70 dark:bg-slate-950 dark:text-white"
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-3 py-2 dark:border-slate-700 sm:px-5">
            <h3 id={titleId} className="mr-auto min-w-0 truncate font-display text-base font-semibold sm:text-lg">
              Vergrößerung: {slide.title}
            </h3>
            <div className="flex items-center gap-1" role="group" aria-label="Vergrößerung einstellen">
              <button type="button" className="dexa-icon-btn" onClick={() => zoomAt(zoom / 1.5)} disabled={zoom <= ZOOM_MIN} aria-label="Verkleinern">
                <Minus size={20} aria-hidden="true" />
              </button>
              <output className="w-14 text-center text-sm font-semibold tabular-nums" aria-live="polite">{Math.round(zoom * 100)} %</output>
              <button type="button" className="dexa-icon-btn" onClick={() => zoomAt(zoom * 1.5)} disabled={zoom >= ZOOM_MAX} aria-label="Vergrößern">
                <Plus size={20} aria-hidden="true" />
              </button>
              <button type="button" className="dexa-icon-btn" onClick={() => zoomAt(1)} aria-label="Ganze Seite zeigen">
                <RotateCcw size={18} aria-hidden="true" />
              </button>
            </div>
            <button type="button" className="dexa-icon-btn" onClick={onClose} aria-label="Vergrößerung schließen">
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <div
            ref={scroller}
            className="dexa-zoom-scroller relative min-h-0 flex-1 overflow-auto bg-slate-100 dark:bg-slate-900"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClickCapture={onClickCapture}
          >
            <div className="relative mx-auto my-3 bg-white shadow-sm" style={{ width: `min(${zoom * 100}%, ${zoom * 1100}px)` }}>
              <ReportImage slide={slide} sizes={`${Math.round(zoom * 100)}vw`} eager />
              <HotspotLayer slide={slide} activeId={activeId} previewId={null} onPreview={() => {}} onSelect={onSelect} />
            </div>
          </div>
          <div className="max-h-[40dvh] overflow-y-auto border-t border-slate-200 px-4 py-3 dark:border-slate-700 sm:px-6" aria-live="polite">
            {active ? (
              <Explanation hotspot={active} titleId={`${titleId}-e`} />
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Tippen oder klicken Sie auf eine Markierung, um den Messwert erklärt zu bekommen. Zoomen mit Plus/Minus,
                zwei Fingern oder Strg + Mausrad.
              </p>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
};

const DexaReportSlider = () => {
  const [index, setIndex] = useState(0);
  const [activeId, setActiveId] = useState(null); // festgehalten (Klick/Tipp/Enter)
  const [previewId, setPreviewId] = useState(null); // Hover/Fokus
  const [showMarks, setShowMarks] = useState(true);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));
  const [dragX, setDragX] = useState(0);
  const [near, setNear] = useState(false);
  const [more, setMore] = useState(false); // Desktop: Erklärung scrollt im Kasten weiter // Bilder erst laden, wenn der Slider in die Nähe des Bildschirms kommt
  const swipe = useRef(null);
  const viewport = useRef(null);
  const panelRef = useRef(null);
  const uid = useId();
  const slide = DEXA_REPORT_EXAMPLES[index];

  const go = useCallback((i) => {
    const next = (i + N) % N;
    setIndex(next);
    setActiveId(null);
    setPreviewId(null);
    setLoaded((prev) => new Set([...prev, next, (next + 1) % N, (next - 1 + N) % N]));
  }, []);

  const shownId = previewId ?? activeId;
  const shown = slide.hotspots.find((h) => h.id === shownId);

  const select = (id) => {
    setActiveId((cur) => (cur === id ? null : id));
    setPreviewId(null);
  };

  useEffect(() => {
    const el = viewport.current;
    if (!el || near) return undefined;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => entries.some((en) => en.isIntersecting) && setNear(true), { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  // Neue Erklärung beginnt oben (Desktop: Kasten scrollt in sich)
  const measureMore = useCallback(() => {
    const p = panelRef.current;
    setMore(!!p && p.scrollHeight - p.clientHeight - p.scrollTop > 8);
  }, []);
  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
    measureMore();
  }, [shownId, index, measureMore]);
  useEffect(() => {
    window.addEventListener('resize', measureMore);
    return () => window.removeEventListener('resize', measureMore);
  }, [measureMore]);

  // Am Handy die Erklärung nach dem Antippen ins Bild holen (sie steht unter dem Befund)
  useEffect(() => {
    if (!activeId || !panelRef.current || window.matchMedia('(min-width: 1024px)').matches) return;
    const r = panelRef.current.getBoundingClientRect();
    if (r.top > window.innerHeight - 120 || r.bottom < 0) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      panelRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    }
  }, [activeId]);

  const onKeyDown = (e) => {
    if (zoomOpen || e.target.closest('input, textarea')) return;
    const target = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: N - 1 }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    go(target);
  };

  // Wischen: nur waagrecht, senkrechtes Scrollen bleibt der Seite (touch-action: pan-y)
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse') return;
    swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId, horizontal: null };
  };
  const onPointerMove = (e) => {
    const s = swipe.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (s.horizontal === null && Math.abs(dx) + Math.abs(dy) > 8) s.horizontal = Math.abs(dx) > Math.abs(dy);
    if (s.horizontal) setDragX(dx);
  };
  const onPointerEnd = (e) => {
    const s = swipe.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    const width = viewport.current?.offsetWidth || 1;
    swipe.current = null;
    setDragX(0);
    if (s.horizontal && Math.abs(dx) > Math.min(60, width * 0.18)) go(index + (dx < 0 ? 1 : -1));
  };
  // Nach einem Wisch keinen Tipp auf eine Markierung auslösen
  const onClickCapture = (e) => {
    if (dragX !== 0) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Pfeiltasten für den Slider (Karussell-Muster) */}
      <section
        aria-roledescription="Karussell"
        aria-label="Anonymisierte DEXA-Beispielbefunde"
        onKeyDown={onKeyDown}
        className="dexa-slider"
        data-dexa-slider=""
      >
        {/* Steuerung oben: Zähler, Pfeile, Zoom */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <p className="mr-auto min-w-0 text-sm text-slate-700 dark:text-slate-200" aria-live="polite" aria-atomic="true">
            <span className="font-semibold tabular-nums text-slate-900 dark:text-white" data-dexa-counter="">
              {index + 1} von {N}
            </span>
            <span className="sr-only">: </span>
            <span className="ml-2">{slide.title}</span>
          </p>
          <button type="button" className="dexa-icon-btn" onClick={() => go(index - 1)} aria-label="Vorherige Befundseite" data-dexa-prev="">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" className="dexa-icon-btn" onClick={() => go(index + 1)} aria-label="Nächste Befundseite" data-dexa-next="">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:gap-8">
          <div className="min-w-0">
            {/* Bildbereich mit Wischsteuerung */}
            <div
              ref={viewport}
              className="dexa-viewport relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerEnd}
              onPointerCancel={onPointerEnd}
              onClickCapture={onClickCapture}
            >
              <div
                className="dexa-track flex"
                style={{ transform: `translateX(calc(${-index * 100}% + ${dragX}px))` }}
                data-dragging={dragX !== 0 ? '' : undefined}
              >
                {DEXA_REPORT_EXAMPLES.map((s, i) => (
                  <div
                    key={s.id}
                    role="group"
                    aria-roledescription="Folie"
                    aria-label={`${i + 1} von ${N}: ${s.title}`}
                    aria-hidden={i !== index}
                    inert={i !== index ? '' : undefined}
                    className="relative w-full shrink-0"
                    style={{ aspectRatio: `${DEXA_IMAGE.width} / ${DEXA_IMAGE.height}` }}
                    data-dexa-slide={s.id}
                  >
                    {near && loaded.has(i) && (
                      <ReportImage slide={s} sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 100vw" />
                    )}
                    {i === index && showMarks && (
                      <HotspotLayer slide={s} activeId={activeId} previewId={previewId} onPreview={setPreviewId} onSelect={select} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300 sm:hidden">
              Zum Lesen der Werte: „Vergrößern“ antippen.
            </p>

            {/* Seitenpunkte */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1" role="group" aria-label="Befundseite wählen">
              {DEXA_REPORT_EXAMPLES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Seite ${i + 1}: ${s.title}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="group grid h-11 w-11 place-items-center rounded-full"
                  data-dexa-dot={s.id}
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      'block h-2.5 rounded-full transition-[width,background-color] duration-200',
                      i === index ? 'w-6 bg-brand dark:bg-brand-300' : 'w-2.5 bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600'
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Werkzeuge */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <button type="button" className="dexa-tool-btn" onClick={() => setZoomOpen(true)} data-dexa-zoom="">
                <Maximize2 size={18} aria-hidden="true" /> Vergrößern
              </button>
              <button type="button" className="dexa-tool-btn" aria-pressed={showMarks} onClick={() => setShowMarks((v) => !v)} data-dexa-marks="">
                <span aria-hidden="true" className={cx('dexa-switch', showMarks && 'is-on')} />
                Markierungen
              </button>
              <a href={pdfUrl(slide.file)} target="_blank" rel="noopener noreferrer" className="dexa-tool-btn" data-dexa-pdf="">
                <FileText size={18} aria-hidden="true" /> PDF
                <span className="sr-only"> (Original) von Seite {index + 1}, öffnet in neuem Fenster</span>
              </a>
            </div>
          </div>

          {/* Erklärungen: Liste der Messwerte + Erklärung (Desktop rechts, Handy unter dem Bild).
              Desktop: Spalte hat eine FESTE Höhe (Fensterhöhe abzüglich Kopf und Steuerzeile, damit der Kasten schon vor dem Ankleben ganz zu sehen ist; höchstens 48rem), lange Erklärungen scrollen im Kasten. Wächst die
              mitlaufende Spalte beim Hover, schiebt das Ende des Rasters sie nach oben, der Knopf rutscht unter
              der Maus weg und Hover/Klick flackern in einer Schleife (Fehler vom 07.10.2026). */}
          <div
            className="min-w-0 lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:flex lg:h-[min(calc(100dvh-var(--header-height)-6rem),48rem)] lg:flex-col lg:self-start"
            data-dexa-aside=""
          >
            <h3 id={`${uid}-liste`} className="font-display text-base font-semibold text-slate-900 dark:text-white">
              Messwerte auf dieser Seite
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2" aria-labelledby={`${uid}-liste`} data-dexa-list="">
              {slide.hotspots.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    aria-pressed={activeId === h.id}
                    aria-controls={`${uid}-panel`}
                    data-hotspot-btn={h.id}
                    onFocus={() => setPreviewId(h.id)}
                    onBlur={() => setPreviewId(null)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setPreviewId(h.id)}
                    onPointerLeave={(e) => e.pointerType === 'mouse' && setPreviewId(null)}
                    onClick={() => select(h.id)}
                    className={cx(
                      'min-h-[44px] rounded-full border px-3.5 py-2 text-left text-sm font-semibold leading-tight transition-colors',
                      h.id === shownId
                        ? 'border-brand bg-brand text-white dark:border-brand-300 dark:bg-brand-300 dark:text-slate-950'
                        : 'border-slate-300 bg-white text-slate-800 hover:border-brand hover:text-brand dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-brand-300'
                    )}
                    data-dexa-chip={h.id}
                  >
                    {h.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="relative mt-4 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
            <div
              ref={panelRef}
              id={`${uid}-panel`}
              onScroll={measureMore}
              aria-live="polite"
              className="scroll-mb-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:min-h-0 lg:flex-1 lg:overflow-y-auto"
              data-dexa-panel=""
            >
              {shown ? (
                <Explanation hotspot={shown} titleId={`${uid}-e`} />
              ) : (
                <p className="text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
                  Wählen Sie einen Messwert aus der Liste oder tippen Sie im Befund auf eine Markierung. Am Computer genügt es,
                  mit der Maus über eine Markierung zu fahren.
                </p>
              )}
            </div>
            {more && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-px bottom-px hidden h-14 items-end justify-center rounded-b-2xl bg-gradient-to-t from-white via-white/90 to-transparent pb-1.5 text-xs font-semibold text-slate-600 dark:from-slate-900 dark:via-slate-900/90 dark:text-slate-300 lg:flex"
                data-dexa-more=""
              >
                Weiterlesen: im Kasten scrollen
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      <ZoomDialog slide={slide} open={zoomOpen} onClose={() => setZoomOpen(false)} activeId={activeId} onSelect={select} />
    </div>
  );
};

// Quellenangaben unter dem Slider (Ziele der Verweise #dexa-quelle-…)
export const DexaSources = ({ className }) => (
  <div className={className}>
    <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">Quellen der Erklärungen</h3>
    <ol className="mt-2 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
      {Object.entries(DEXA_SOURCES).map(([id, s]) => (
        <li key={id} id={`dexa-quelle-${id}`} className="scroll-mt-28">
          {s.citation}{' '}
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-2 hover:text-brand dark:hover:text-brand-300">
            {s.url.replace('https://', '')}
            <span className="sr-only"> (öffnet in neuem Fenster)</span>
          </a>
        </li>
      ))}
    </ol>
  </div>
);

export default DexaReportSlider;
