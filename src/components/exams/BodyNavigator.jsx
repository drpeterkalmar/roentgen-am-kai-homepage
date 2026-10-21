import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowDown, CheckCircle2 } from 'lucide-react';
import { BODY_REGIONS, XRAY_GROUPS, WALK_IN } from '../../data/examinations';
import Placeholder from '../ui/Placeholder';

// Körpernavigator „Welche Körperregion soll geröntgt werden?“
// Skelett-Illustration (Bild) in einem SVG mit anklickbaren Regionen – keine Bibliothek.
//  * Jede Region ist ein echter Link (<a href="#region-…">) → per Tastatur (Tab/Enter), Maus und Touch bedienbar.
//  * Ohne JavaScript springt der Link zum passenden Eintrag der Textliste darunter (vollständige Information).
//  * Mit JavaScript: Hervorhebung bei Hover/Fokus/Auswahl, Infokarte daneben (aria-live).
//  * Die Textliste ist immer vorhanden – für Mobilgeräte, Screenreader und ohne JavaScript.

const groupById = Object.fromEntries(XRAY_GROUPS.map((g) => [g.id, g]));
const regionById = Object.fromEntries(BODY_REGIONS.map((r) => [r.id, r]));

// ---- Grafik ---------------------------------------------------------------
// Skelett-Illustration (Vorder- und Rückansicht) als Bild, darüber anklickbare Regionen.
// Vorlage: „Human skeleton front/back no-text no-color“ von Mariana Ruiz Villarreal (LadyofHats),
// Wikimedia Commons, gemeinfrei; bearbeitet von der Praxis (assets-src/skelett/LIESMICH.txt).
// Koordinaten = Pixel der Vorlage (2845 × 3000); ausgeliefert wird eine WebP mit 1140 px Breite.
const IMG = { src: `${import.meta.env.BASE_URL}assets/skelett/skelett-vorne-hinten.webp`, w: 2845, h: 3000 };
const VIEW = { x: 40, y: 40, w: 2765, h: 3010 }; // Ränder knapp, darunter Platz für die Beschriftung
const F = 662; // Körpermitte Vorderansicht
const B = 2190; // Körpermitte Rückansicht

const r1 = (v) => Math.round(v);
// Kapsel (Stadion) zwischen zwei Punkten – für Röhrenknochen
const capsule = (x1, y1, x2, y2, w) => {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / L) * (w / 2);
  const ny = ((x2 - x1) / L) * (w / 2);
  const r = w / 2;
  return `M${r1(x1 + nx)},${r1(y1 + ny)} L${r1(x2 + nx)},${r1(y2 + ny)} A${r},${r} 0 0 0 ${r1(x2 - nx)},${r1(y2 - ny)} L${r1(x1 - nx)},${r1(y1 - ny)} A${r},${r} 0 0 0 ${r1(x1 + nx)},${r1(y1 + ny)} Z`;
};
const Cap = (p) => <path className="bn-zone" data-shape="" d={capsule(p.x1, p.y1, p.x2, p.y2, p.w)} />;
const Ell = ({ cx, cy, rx, ry, rot = 0 }) => (
  <ellipse className="bn-zone" data-shape="" cx={cx} cy={cy} rx={rx} ry={ry} transform={rot ? `rotate(${rot} ${cx} ${cy})` : undefined} />
);
const Box = ({ x, y, w, h }) => <rect className="bn-zone" data-shape="" x={x} y={y} width={w} height={h} rx={Math.min(w, h) / 4} />;
// Koordinaten je Bildseite aus der Bildmaske gemessen (die Vorlage ist nicht exakt spiegelsymmetrisch).
const SHAPES = {
  schulter: (
    <>
      <Ell cx={415} cy={655} rx={135} ry={78} rot={8} />
      <Ell cx={909} cy={655} rx={135} ry={78} rot={-8} />
    </>
  ),
  brustkorb: <Ell cx={F} cy={895} rx={232} ry={245} />,
  oberarm: (
    <>
      <Cap x1={352} y1={765} x2={262} y2={1085} w={115} />
      <Cap x1={972} y1={765} x2={1028} y2={1085} w={115} />
    </>
  ),
  ellenbogen: (
    <>
      <Cap x1={250} y1={1140} x2={232} y2={1490} w={125} />
      <Cap x1={1040} y1={1140} x2={1168} y2={1490} w={125} />
    </>
  ),
  hand: (
    <>
      <Ell cx={205} cy={1660} rx={105} ry={148} />
      <Ell cx={1232} cy={1640} rx={118} ry={138} />
    </>
  ),
  becken: <Ell cx={F} cy={1365} rx={268} ry={172} />,
  oberschenkel: (
    <>
      <Cap x1={455} y1={1550} x2={550} y2={1995} w={130} />
      <Cap x1={858} y1={1550} x2={758} y2={1995} w={130} />
    </>
  ),
  knie: (
    <>
      <Ell cx={558} cy={2115} rx={80} ry={85} />
      <Ell cx={748} cy={2115} rx={80} ry={85} />
    </>
  ),
  unterschenkel: (
    <>
      <Cap x1={556} y1={2225} x2={583} y2={2615} w={130} />
      <Cap x1={748} y1={2225} x2={716} y2={2615} w={130} />
    </>
  ),
  sprunggelenk: (
    <>
      <Ell cx={590} cy={2700} rx={70} ry={50} />
      <Ell cx={706} cy={2700} rx={70} ry={50} />
    </>
  ),
  fuss: (
    <>
      <Ell cx={525} cy={2812} rx={118} ry={72} rot={-35} />
      <Ell cx={782} cy={2812} rx={118} ry={72} rot={35} />
    </>
  ),
  hws: <Box x={B - 62} y={352} w={124} h={168} />,
  bws: <Box x={B - 78} y={524} w={156} h={471} />,
  lws: <Box x={B - 95} y={1000} w={190} h={255} />,
  fersenbein: (
    <>
      <Ell cx={2113} cy={2845} rx={70} ry={55} />
      <Ell cx={2292} cy={2845} rx={70} ry={55} />
    </>
  ),
};
const SVG_ORDER = ['schulter', 'brustkorb', 'oberarm', 'ellenbogen', 'hand', 'becken', 'oberschenkel', 'knie', 'unterschenkel', 'sprunggelenk', 'fuss', 'hws', 'bws', 'lws', 'fersenbein'];

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
            viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
            className="bn-svg mx-auto block h-auto w-full max-w-[560px]"
            role="group"
            aria-label={`Skelett in Vorder- und Rückansicht mit ${SVG_ORDER.length} auswählbaren Körperregionen`}
            onMouseLeave={() => setPreview(null)}
          >
            <rect className="bn-bg" x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} rx="60" />
            <image href={IMG.src} x="0" y="0" width={IMG.w} height={IMG.h} aria-hidden="true" />
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
            <text x={F} y={3005} textAnchor="middle" className="bn-label">Vorderansicht</text>
            <text x={B} y={3005} textAnchor="middle" className="bn-label">Rückansicht</text>
          </svg>
          <figcaption id="navigator-hinweis" className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">
            Die Auswahl dient Ihrer Orientierung. Welche Aufnahmen erforderlich sind, richtet sich nach Ihrer ärztlichen Zuweisung.
            <span className="mt-1 block text-slate-600 dark:text-slate-300">Auswählbare Regionen sind zart markiert; die gewählte Region wird rot hervorgehoben.</span>
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
