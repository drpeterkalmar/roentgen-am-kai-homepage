import ExplainerFigure from './ExplainerFigure';

// A002 – T-Wert-Skala. Genau die WHO-Grenzwerte, die auf /knochendichtemessung-graz im Text stehen:
// bis −1 normal, zwischen −1 und −2,5 verminderte Knochendichte (Osteopenie), ab −2,5 Hinweis auf Osteoporose.
// Keine weiteren Zahlen auf der Achse. Links höherer, rechts niedrigerer T-Score.
// Desktop: Farbband mit Grenzmarken, Legende in denselben Spalten darunter; Handy: Band + gestapelte Legende.
const ZONES = [
  {
    key: 'normal',
    name: 'Normal',
    range: 'T-Score bis −1',
    band: 'bg-slate-200 dark:bg-slate-600',
  },
  {
    key: 'osteopenie',
    name: 'Verminderte Knochendichte (Osteopenie)',
    range: 'T-Score zwischen −1 und −2,5',
    band: 'bg-brand-200 dark:bg-brand-500',
  },
  {
    key: 'osteoporose',
    name: 'Hinweis auf eine Osteoporose',
    range: 'T-Score ab −2,5',
    band: 'bg-brand-600 dark:bg-brand-300',
  },
];
// Spaltenbreiten (schematisch, gleich für Band und Legende)
const COLS = 'md:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,3fr)]';

const TScoreScale = ({ className }) => (
  <ExplainerFigure
    id="A002"
    className={className}
    subtitle="Einteilung nach der Definition der Weltgesundheitsorganisation (WHO)"
    note="die Breite der Bereiche ist nicht maßstäblich"
  >
    <div aria-hidden="true">
      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
        <span>← höherer T-Score</span>
        <span>niedrigerer T-Score →</span>
      </div>
      <div className="relative mt-2">
        <div className="grid h-6 grid-cols-[4fr_3fr_3fr] overflow-hidden rounded-full">
          {ZONES.map((z) => <span key={z.key} className={`${z.band} border-r-2 border-white last:border-r-0 dark:border-slate-900`} />)}
        </div>
        {/* Grenzmarken −1 und −2,5 */}
        {[
          { at: '40%', label: '−1' },
          { at: '70%', label: '−2,5' },
        ].map((m) => (
          <span key={m.label} className="absolute -top-1 flex -translate-x-1/2 flex-col items-center" style={{ left: m.at }}>
            <span className="block h-8 w-1 rounded-full bg-slate-900 ring-2 ring-white dark:bg-white dark:ring-slate-900" />
            <span className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">{m.label}</span>
          </span>
        ))}
      </div>
    </div>
    <ul className={`mt-9 grid grid-cols-1 gap-3 ${COLS} md:gap-0`} data-tscore-zones="">
      {ZONES.map((z) => (
        <li key={z.key} className="flex min-w-0 gap-3 md:pr-6" data-zone={z.key}>
          <span aria-hidden="true" className={`mt-1 h-4 w-4 shrink-0 rounded ring-1 ring-inset ring-slate-500/40 ${z.band}`} />
          <span className="min-w-0">
            <span className="block font-semibold text-slate-900 dark:text-white">{z.name}</span>
            <span className="block text-[0.95rem] text-slate-700 dark:text-slate-200">{z.range}</span>
          </span>
        </li>
      ))}
    </ul>
  </ExplainerFigure>
);

export default TScoreScale;
