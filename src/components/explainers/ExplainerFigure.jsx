import { cx } from '../ui/cx';
import { ANIMATIONS } from '../../data/mediaPlan';

// Rahmen der selbst gezeichneten Erklärgrafiken A001–A006 (ersetzt den gelben AnimationPlaceholder).
// Regeln (Fotobriefing Teil 3): Text als HTML, nicht im Bild; keine Bewegung; Farben aus dem Designsystem;
// Inhalte nur aus Datendateien bzw. dem bestehenden Seitentext. Zeichnungen sind aria-hidden, die Aussage
// steht immer zusätzlich als Text daneben.
// Test-Hooks: [data-media-id] (Nummer aus mediaPlan.js) und [data-explainer].
const ExplainerFigure = ({ id, title, subtitle, note, schematic = true, className, children }) => {
  const a = ANIMATIONS[id];
  const n = note ? note.replace(/\.$/, '') : '';
  const foot = schematic ? `Schematische Darstellung${n ? ` – ${n}` : ''}.` : n ? `${n}.` : '';
  return (
    <figure
      data-media-id={a.id}
      data-explainer={a.id}
      className={cx(
        'not-prose my-8 w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7',
        'dark:border-slate-700 dark:bg-slate-900',
        className
      )}
    >
      <figcaption>
        <span className="block font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white sm:text-xl">
          {title ?? a.title}
        </span>
        {subtitle && <span className="mt-1 block text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</span>}
      </figcaption>
      <div className="mt-5">{children}</div>
      {foot && <p className="mt-5 max-w-4xl text-sm text-slate-600 dark:text-slate-300">{foot}</p>}
    </figure>
  );
};

export default ExplainerFigure;

// Zahl im österreichischen Format (Dezimalkomma), ohne Intl-Abhängigkeit (läuft auch im SSR-Build)
export const de = (n) => String(n).replace('.', ',');

// „e-card“ nicht am Bindestrich umbrechen (sonst „e-/card“ in schmalen Spalten); der Text bleibt ein normaler
// Bindestrich, damit Suche und Tests ihn finden.
export const keepEcard = (text) =>
  text.split('e-card').flatMap((part, i) => (i ? [<span key={i} className="whitespace-nowrap">e-card</span>, part] : [part]));
