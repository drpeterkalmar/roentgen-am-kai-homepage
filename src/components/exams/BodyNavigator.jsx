import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowDown, CheckCircle2 } from 'lucide-react';
import { BODY_REGIONS, XRAY_GROUPS, WALK_IN } from '../../data/examinations';
import Placeholder from '../ui/Placeholder';

// Körpernavigator „Welche Körperregion soll geröntgt werden?“
// Leichtes Inline-SVG (schematisches Skelett, Vorder- und Rückansicht) – keine Bibliothek.
//  * Jede Region ist ein echter Link (<a href="#region-…">) → per Tastatur (Tab/Enter), Maus und Touch bedienbar.
//  * Ohne JavaScript springt der Link zum passenden Eintrag der Textliste darunter (vollständige Information).
//  * Mit JavaScript: Hervorhebung bei Hover/Fokus/Auswahl, Infokarte daneben (aria-live).
//  * Die Textliste ist immer vorhanden – für Mobilgeräte, Screenreader und ohne JavaScript.

const groupById = Object.fromEntries(XRAY_GROUPS.map((g) => [g.id, g]));
const regionById = Object.fromEntries(BODY_REGIONS.map((r) => [r.id, r]));

// ---- Geometrie -------------------------------------------------------------
const F = 105; // Mitte Vorderansicht
const B = 315; // Mitte Rückansicht
const both = (fn) => [fn(-1), fn(1)];

const Line = ({ x1, y1, x2, y2, w = 6 }) => (
  <>
    <line className="bn-hit" x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w + 14} strokeLinecap="round" />
    <line className="bn-line" x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w} strokeLinecap="round" />
  </>
);
const Dot = ({ cx, cy, r }) => (
  <>
    <circle className="bn-hit" cx={cx} cy={cy} r={r + 7} />
    <circle className="bn-shape" cx={cx} cy={cy} r={r} />
  </>
);
const Shape = ({ d }) => (
  <>
    <path className="bn-hit" d={d} strokeWidth="12" strokeLinejoin="round" />
    <path className="bn-shape" d={d} />
  </>
);
const Vertebrae = ({ cx, y0, n, step, h, w }) => (
  <>
    <rect className="bn-hit" x={cx - w / 2 - 8} y={y0 - 4} width={w + 16} height={n * step + 6} rx="6" />
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} className="bn-shape" x={cx - w / 2} y={y0 + i * step} width={w} height={h} rx="1.5" />
    ))}
  </>
);

const ribs = (C) =>
  [80, 90, 100, 110, 120].flatMap((y) => [
    `M${C - 3},${y - 4} Q${C - 30},${y - 3} ${C - 29},${y + 8}`,
    `M${C + 3},${y - 4} Q${C + 30},${y - 3} ${C + 29},${y + 8}`,
  ]);
const ribcage = (C) => `M${C - 27},70 C${C - 37},90 ${C - 35},118 ${C - 22},133 L${C + 22},133 C${C + 35},118 ${C + 37},90 ${C + 27},70 Z`;
const pelvis = (C) =>
  `M${C - 30},150 C${C - 35},163 ${C - 27},176 ${C - 13},179 L${C - 6},171 L${C + 6},171 L${C + 13},179 C${C + 27},176 ${C + 35},163 ${C + 30},150 C${C + 16},157 ${C - 16},157 ${C - 30},150 Z`;
const foot = (C, s) => `M${C + s * 11},309 C${C + s * 22},311 ${C + s * 27},317 ${C + s * 25},321 C${C + s * 20},323 ${C + s * 12},322 ${C + s * 9},317 Z`;

// Regionen: Zeichnung je Region (Reihenfolge = Tabulator-Reihenfolge: Vorderansicht oben → unten, dann Rückansicht)
const SHAPES = {
  schulter: (
    <>
      {both((s) => <Line key={`c${s}`} x1={F + s * 4} y1={63} x2={F + s * 33} y2={60} w={4} />)}
      {both((s) => <Dot key={`j${s}`} cx={F + s * 38} cy={66} r={6.5} />)}
    </>
  ),
  brustkorb: (
    <>
      <Shape d={ribcage(F)} />
      {ribs(F).map((d) => <path key={d} className="bn-line" d={d} strokeWidth="2.2" fill="none" />)}
      <line className="bn-line" x1={F} y1={68} x2={F} y2={114} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  oberarm: <>{both((s) => <Line key={s} x1={F + s * 40} y1={76} x2={F + s * 44} y2={128} w={8} />)}</>,
  ellenbogen: (
    <>
      {both((s) => (
        <React.Fragment key={s}>
          <Dot cx={F + s * 44} cy={135} r={5} />
          <Line x1={F + s * 45} y1={142} x2={F + s * 51} y2={188} w={4} />
          <line className="bn-line" x1={F + s * 41} y1={142} x2={F + s * 45} y2={188} strokeWidth="3.5" strokeLinecap="round" />
        </React.Fragment>
      ))}
    </>
  ),
  hand: (
    <>
      {both((s) => (
        <React.Fragment key={s}>
          <ellipse className="bn-hit" cx={F + s * 49} cy={208} rx={14} ry={20} />
          <ellipse className="bn-shape" cx={F + s * 49} cy={204} rx={6} ry={8} />
          {[-4, -1.3, 1.3, 4].map((dx) => (
            <line key={dx} className="bn-line" x1={F + s * (49 + dx)} y1={211} x2={F + s * (49 + dx * 1.5)} y2={225} strokeWidth="2.6" strokeLinecap="round" />
          ))}
          <line className="bn-line" x1={F + s * 44} y1={203} x2={F + s * 39} y2={213} strokeWidth="2.6" strokeLinecap="round" />
        </React.Fragment>
      ))}
    </>
  ),
  becken: (
    <>
      <Shape d={pelvis(F)} />
      {both((s) => <circle key={s} className="bn-shape" cx={F + s * 19} cy={176} r={5.5} />)}
    </>
  ),
  oberschenkel: <>{both((s) => <Line key={s} x1={F + s * 20} y1={183} x2={F + s * 16} y2={238} w={9} />)}</>,
  knie: <>{both((s) => <Dot key={s} cx={F + s * 16} cy={246} r={6.5} />)}</>,
  unterschenkel: (
    <>
      {both((s) => (
        <React.Fragment key={s}>
          <Line x1={F + s * 16} y1={256} x2={F + s * 15} y2={298} w={6} />
          <line className="bn-line" x1={F + s * 22} y1={258} x2={F + s * 20} y2={297} strokeWidth="2.6" strokeLinecap="round" />
        </React.Fragment>
      ))}
    </>
  ),
  sprunggelenk: <>{both((s) => <Dot key={s} cx={F + s * 15} cy={305} r={4.5} />)}</>,
  fuss: (
    <>
      {both((s) => (
        <React.Fragment key={s}>
          <path className="bn-hit" d={foot(F, s)} strokeWidth="12" strokeLinejoin="round" />
          <path className="bn-shape" d={foot(F, s)} />
        </React.Fragment>
      ))}
    </>
  ),
  hws: <Vertebrae cx={B} y0={50} n={4} step={4.6} h={3.6} w={10} />,
  bws: <Vertebrae cx={B} y0={70} n={10} step={5.9} h={4.6} w={11} />,
  lws: <Vertebrae cx={B} y0={131} n={5} step={5.8} h={4.9} w={14} />,
};
const SVG_ORDER = ['schulter', 'brustkorb', 'oberarm', 'ellenbogen', 'hand', 'becken', 'oberschenkel', 'knie', 'unterschenkel', 'sprunggelenk', 'fuss', 'hws', 'bws', 'lws'];

// Nicht anklickbare Grundzeichnung (Kontext)
const Base = () => (
  <g className="bn-base" aria-hidden="true">
    {/* Vorderansicht */}
    <ellipse cx={F} cy={29} rx={16} ry={19} />
    <path d={`M${F - 9},42 Q${F},52 ${F + 9},42`} fill="none" />
    <rect x={F - 5} y={48} width={10} height={13} rx={3} />
    {[136, 142].map((y) => <rect key={y} x={F - 6} y={y} width={12} height={4.5} rx={1.5} />)}
    {/* Rückansicht */}
    <ellipse cx={B} cy={29} rx={16} ry={19} />
    <path d={ribcage(B)} />
    {ribs(B).map((d) => <path key={d} d={d} fill="none" />)}
    {both((s) => <path key={`sc${s}`} d={`M${B + s * 12},72 L${B + s * 30},70 L${B + s * 20},100 Z`} />)}
    {both((s) => <line key={`cl${s}`} x1={B + s * 4} y1={63} x2={B + s * 33} y2={60} strokeWidth={4} strokeLinecap="round" />)}
    <path d={pelvis(B)} />
    {both((s) => (
      <g key={`l${s}`} strokeLinecap="round">
        <circle cx={B + s * 38} cy={66} r={6.5} />
        <line x1={B + s * 40} y1={76} x2={B + s * 44} y2={128} strokeWidth={8} />
        <line x1={B + s * 45} y1={142} x2={B + s * 51} y2={188} strokeWidth={4} />
        <ellipse cx={B + s * 49} cy={204} rx={6} ry={8} />
        <line x1={B + s * 20} y1={183} x2={B + s * 16} y2={238} strokeWidth={9} />
        <circle cx={B + s * 16} cy={246} r={6} />
        <line x1={B + s * 16} y1={256} x2={B + s * 15} y2={298} strokeWidth={6} />
        <ellipse cx={B + s * 15} cy={312} rx={5} ry={9} />
      </g>
    ))}
  </g>
);

const InfoCard = ({ region }) => {
  if (!region) {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
        <p className="font-semibold text-slate-900 dark:text-white">Wählen Sie eine Körperregion</p>
        <p className="mt-2">Tippen oder klicken Sie auf eine Region im Skelett – oder wählen Sie sie in der Liste unten.</p>
      </div>
    );
  }
  const g = groupById[region.group];
  return (
    <div className="h-full rounded-2xl border border-brand-200 bg-white p-6 shadow-sm dark:border-brand-800 dark:bg-slate-900" data-region-card={region.id}>
      <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">{region.name}</h3>
      <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">Typische Fragestellungen</p>
      <ul className="mt-2 space-y-1.5 text-slate-700 dark:text-slate-200">
        {region.questions.map((q) => (
          <li key={q} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
            <span>{q}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5">
        <a href={`#${g.id}`} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
          Angebotene Aufnahmen: {g.title} <ArrowDown size={18} aria-hidden="true" />
        </a>
      </p>
      <p className="mt-4 flex gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-[0.95rem] text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-50">
        <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
        <span><strong className="font-semibold">Röntgen ohne vorherige Terminvereinbarung möglich</strong> – {WALK_IN.requirement.replace(/^Mit/, 'mit')}.</span>
      </p>
    </div>
  );
};

const BodyNavigator = ({ headingLevel = 2 }) => {
  const H = `h${headingLevel}`;
  const { hash } = useLocation();
  const [active, setActive] = useState(null);
  const [preview, setPreview] = useState(null);

  // Sprung über die Zuweisungssuche (#region-…) wählt die Region auch im Skelett aus
  useEffect(() => {
    const id = hash.startsWith('#region-') ? hash.slice('#region-'.length) : null;
    if (id && regionById[id]) setActive(id);
  }, [hash]);

  const shown = regionById[preview || active] || null;

  return (
    <div id="koerpernavigator" data-body-navigator>
      <H id="navigator-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Welche Körperregion soll geröntgt werden?
      </H>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-stretch">
        <figure className="m-0 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950 sm:p-5">
          <svg
            viewBox="0 0 420 346"
            className="bn-svg mx-auto block h-auto w-full max-w-[560px]"
            role="group"
            aria-label="Schematisches Skelett in Vorder- und Rückansicht mit 14 auswählbaren Körperregionen"
            onMouseLeave={() => setPreview(null)}
          >
            <Base />
            {SVG_ORDER.map((id) => {
              const r = regionById[id];
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#region-${id}`}
                  className="bn-region"
                  data-region={id}
                  aria-label={r.name}
                  aria-current={isActive ? 'true' : undefined}
                  data-preview={preview === id ? 'true' : undefined}
                  onMouseEnter={() => setPreview(id)}
                  onFocus={() => setPreview(id)}
                  onBlur={() => setPreview(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(id);
                    setPreview(id);
                  }}
                >
                  {SHAPES[id]}
                </a>
              );
            })}
            <text x={F} y={341} textAnchor="middle" className="bn-label">Vorderansicht</text>
            <text x={B} y={341} textAnchor="middle" className="bn-label">Rückansicht</text>
          </svg>
          <figcaption id="navigator-hinweis" className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
            Die Auswahl dient Ihrer Orientierung. Welche Aufnahmen erforderlich sind, richtet sich nach Ihrer ärztlichen Zuweisung.
          </figcaption>
        </figure>

        <div id="navigator-info" aria-live="polite" aria-atomic="true" className="min-h-[18rem]">
          <InfoCard region={shown} />
        </div>
      </div>

      {/* Vollständige Textliste: Mobilgeräte, Screenreader, ohne JavaScript */}
      <div className="mt-10">
        <h3 id="regionen-liste-title" className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Alle Körperregionen als Liste
        </h3>
        <p className="mt-2 text-slate-700 dark:text-slate-200">
          <strong className="font-semibold">Röntgen ohne vorherige Terminvereinbarung möglich</strong> – mit gültiger ärztlicher Zuweisung und e-card.
          Die Auswahl dient Ihrer Orientierung; welche Aufnahmen erforderlich sind, richtet sich nach Ihrer ärztlichen Zuweisung.
        </p>
        <ul id="navigator-liste" aria-labelledby="regionen-liste-title" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BODY_REGIONS.map((r) => {
            const g = groupById[r.group];
            return (
              <li key={r.id} id={`region-${r.id}`} className="bn-list-item rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900" data-active={active === r.id ? 'true' : undefined}>
                <h4 className="font-sans text-base font-semibold text-slate-900 dark:text-white">{r.name}</h4>
                <p className="mt-1 text-[0.95rem] text-slate-700 dark:text-slate-200">
                  <span className="sr-only">Typische Fragestellungen: </span>
                  {r.questions.join(' · ')}
                </p>
                <a href={`#${g.id}`} className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-[0.95rem] font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
                  Aufnahmen: {g.title}<span className="sr-only"> (zu {r.name})</span> <ArrowDown size={16} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <Placeholder internal className="mt-5">Typische Fragestellungen je Region: medizinische Freigabe durch die Praxis ausstehend</Placeholder>
      </div>
    </div>
  );
};

export default BodyNavigator;
