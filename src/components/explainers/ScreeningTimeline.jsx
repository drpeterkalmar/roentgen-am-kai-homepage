import ExplainerFigure, { keepEcard } from './ExplainerFigure';
import { SCREENING, SCREENING_ONLY_WITHOUT_SYMPTOMS } from '../../data/screening';

// A001 – Wer kann wann zur Mammographie? Zeitstrahl der Altersgruppen und Zugangswege.
// ALLE Zahlen und Regeln aus src/data/screening.js (keine eigenen Freischaltungsregeln).
// Desktop: drei Abschnitte nebeneinander (Altersband oben); Handy: gestapelt mit senkrechtem Band links.
const S = SCREENING;
const young = S.optIn.find((g) => g.id === 'jung');
const old = S.optIn.find((g) => g.id === 'alt');
const selfSignup = `Anmeldung entsprechend den aktuellen Programmregeln – über die Serviceline ${S.serviceline.display} oder unter ${S.officialUrlLabel}`;

const SEGMENTS = [
  young && {
    key: 'jung',
    ages: `${young.from}–${young.to} Jahre`,
    title: 'Frauen, auf eigenen Wunsch',
    who: young.label,
    how: selfSignup,
    core: false,
  },
  {
    key: 'kern',
    ages: `${S.ageFrom}–${S.ageTo} Jahre`,
    title: 'Frauen im Programm',
    who: `Frauen zwischen ${S.ageFrom} und ${S.ageTo} Jahren`,
    how: `Die e-card ist automatisch freigeschaltet. ${S.referralNeeded ? 'Mit ärztlicher Zuweisung' : 'Ohne ärztliche Zuweisung'}, alle ${S.intervalWord} Jahre – Termin vereinbaren und e-card mitbringen.`,
    core: true,
  },
  old && {
    key: 'alt',
    ages: `ab ${old.from} Jahren`,
    title: 'Frauen, auf eigenen Wunsch',
    who: old.label,
    how: selfSignup,
    core: false,
  },
].filter(Boolean);

// Punkte im Kernband: ein Punkt je möglichem Termin (alle intervalYears Jahre)
const visits = Math.floor((S.ageTo - S.ageFrom) / S.intervalYears) + 1;

const Band = ({ core }) => (
  <span
    aria-hidden="true"
    className={
      core
        ? 'flex w-3 shrink-0 flex-col items-center justify-between rounded-full bg-brand-600 py-3 dark:bg-brand-400 md:h-3.5 md:w-full md:flex-row md:px-3 md:py-0'
        : 'block w-3 shrink-0 rounded-full border-2 border-dashed border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950 md:h-3.5 md:w-full'
    }
  >
    {core && Array.from({ length: visits }, (_, i) => <span key={i} data-visit="" className="block h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-900" />)}
  </span>
);

const ScreeningTimeline = ({ className }) => (
  <ExplainerFigure
    id="A001"
    className={className}
    subtitle={`${S.programName} („${S.programShort}“): Altersgruppen und Weg zum Termin`}
    note={SCREENING_ONLY_WITHOUT_SYMPTOMS}
  >
    <ol className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] md:gap-8" data-screening-timeline="">
      {SEGMENTS.map((s) => (
        <li key={s.key} className="flex min-w-0 gap-4 md:block" data-segment={s.key}>
          <Band core={s.core} />
          <div className="min-w-0 md:mt-3">
            <p className={`font-display text-xl font-semibold tracking-tight ${s.core ? 'text-brand dark:text-brand-300' : 'text-slate-900 dark:text-white'}`}>
              {s.ages}
            </p>
            <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">{s.title}</p>
            <p className="sr-only">{s.who}.</p>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">{keepEcard(s.how)}</p>
          </div>
        </li>
      ))}
    </ol>
    <ul className="mt-6 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-8">
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="inline-flex h-3.5 w-10 shrink-0 items-center justify-around rounded-full bg-brand-600 px-1 dark:bg-brand-400">
          <span className="block h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-900" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-900" />
        </span>
        Jeder Punkt: ein möglicher Screening-Termin, alle {S.intervalWord} Jahre
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="block h-3.5 w-10 shrink-0 rounded-full border-2 border-dashed border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950" />
        Gestrichelt: Teilnahme nach Anmeldung
      </li>
    </ul>
  </ExplainerFigure>
);

export default ScreeningTimeline;
