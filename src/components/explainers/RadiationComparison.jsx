import ExplainerFigure, { de } from './ExplainerFigure';
import { RADIATION_EXAMPLES } from '../../data/examinations';

// A005 – Strahlenbelastung im Vergleich. Werte NUR aus RADIATION_EXAMPLES (src/data/examinations.js, Felder
// mSv/days/below = dieselben Zahlen wie im Text). Logarithmische Skala 0,001–0,1 mSv; jeder Wert steht zusätzlich
// als Text neben bzw. unter dem Balken – mit Bezug zur natürlichen Hintergrundstrahlung.
// Desktop: Balken links, Wert rechts; Handy: Bezeichnung, Balken und Wert untereinander. Neutrale Grautöne
// (keine Warnfarbe); „unter“ = auslaufender Balken mit gestrichelter Obergrenze.
const MIN = -3; // log10(0,001)
const MAX = -1; // log10(0,1)
const pos = (v) => `${(((Math.log10(v) - MIN) / (MAX - MIN)) * 100).toFixed(1)}%`;
const TICKS = [0.001, 0.01, 0.1];
const MINOR = [0.002, 0.005, 0.02, 0.05]; // unbeschriftete Zwischenmarken (2 und 5 je Zehnerstufe)

const valueText = (e) => `${e.below ? 'unter' : 'etwa'} ${de(e.mSv)} mSv`;
const daysText = (e) => `${e.below ? 'weniger als etwa' : 'ungefähr'} ${de(e.days)} Tage natürliche Hintergrundstrahlung`;

const ROW = 'grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-[minmax(0,1fr)_16rem]';

const RadiationComparison = ({ ids, className }) => {
  const rows = RADIATION_EXAMPLES.filter((e) => ids.includes(e.id) && e.mSv);
  return (
    <ExplainerFigure
      id="A005"
      className={className}
      subtitle="Typische Orientierungswerte je Röntgenaufnahme, in Millisievert (mSv)"
      note="logarithmische Skala: Von einer beschrifteten Marke zur nächsten verzehnfacht sich die Dosis. Die tatsächliche Dosis hängt unter anderem von Untersuchungsregion, Anzahl der Aufnahmen, Körperbau, Gerät und Untersuchungsprotokoll ab"
    >
      <ul className="space-y-5" data-radiation-chart="">
        {rows.map((e) => (
          <li key={e.id} className={ROW} data-dose={e.id}>
            <p className="font-semibold text-slate-900 dark:text-white sm:col-span-2">{e.label}</p>
            <div aria-hidden="true" className="relative h-7 self-center rounded-md bg-slate-100 dark:bg-slate-800">
              <span
                className={
                  e.below
                    ? 'absolute inset-y-0 left-0 rounded-l-md bg-gradient-to-r from-slate-500 from-30% to-transparent dark:from-slate-400'
                    : 'absolute inset-y-0 left-0 rounded-l-md bg-slate-500 dark:bg-slate-400'
                }
                style={{ width: pos(e.mSv) }}
              />
              {e.below && (
                <span className="absolute inset-y-0 border-l-2 border-dashed border-slate-500 dark:border-slate-400" style={{ left: pos(e.mSv) }} />
              )}
            </div>
            <p className="self-start text-[0.95rem] leading-snug text-slate-700 [text-wrap:balance] dark:text-slate-200">
              <strong className="font-semibold text-slate-900 dark:text-white">{valueText(e)}</strong>
              <span className="block">{daysText(e)}</span>
            </p>
          </li>
        ))}
      </ul>
      {/* Achse (nur unter der Balkenspalte): beschriftete Zehnerstufen, unbeschriftete Zwischenmarken */}
      <div aria-hidden="true" className={`${ROW} mt-3`}>
        <div>
          <div className="relative h-7 border-t border-slate-300 dark:border-slate-600">
            {MINOR.map((t) => (
              <span key={t} className="absolute top-0 block h-1.5 w-px bg-slate-300 dark:bg-slate-600" style={{ left: pos(t) }} />
            ))}
            {TICKS.map((t, i) => {
              const end = i === 0 ? 'items-start' : i === TICKS.length - 1 ? '-translate-x-full items-end' : '-translate-x-1/2 items-center';
              return (
                <span key={t} className={`absolute top-0 flex flex-col text-[0.8rem] font-semibold text-slate-600 dark:text-slate-300 ${end}`} style={{ left: pos(t) }}>
                  <span className="block h-2.5 w-px bg-slate-500 dark:bg-slate-400" />
                  <span className="mt-0.5 whitespace-nowrap">{de(t)}</span>
                </span>
              );
            })}
          </div>
          <p className="text-center text-[0.8rem] text-slate-600 dark:text-slate-300">Millisievert (mSv), logarithmische Skala</p>
        </div>
      </div>
    </ExplainerFigure>
  );
};

export default RadiationComparison;
