import React, { useState, useId } from 'react';
import { ClipboardCheck, Phone } from 'lucide-react';
import Button from './ui/Button';
import { BookingButton } from './ui/BookingButtons';
import { PHONE_HREF, PHONE_DISPLAY } from '../data/practice';

// Kurzer Risikocheck Osteoporose (Ja/Nein). Rein informativ – KEINE Diagnose, keine Speicherung,
// keine Übertragung: Die Antworten bleiben im Browser und verschwinden beim Neuladen.
// Fragen orientieren sich an den Risikofaktoren auf gesundheit.gv.at bzw. ISCD (Stand 2023).
// review: Fragen und Auswertungstexte ärztlich freigeben.
export const RISK_QUESTIONS = [
  { id: 'alter', q: 'Sind Sie eine Frau ab 65 Jahren oder ein Mann ab 70 Jahren?' },
  { id: 'bruch', q: 'Hatten Sie im Erwachsenenalter einen Knochenbruch nach einem geringen Anlass, etwa einem Sturz aus dem Stand?' },
  { id: 'familie', q: 'Hatten Ihre Eltern oder Geschwister Osteoporose oder einen Hüftbruch?' },
  { id: 'cortison', q: 'Nehmen oder nahmen Sie über mehrere Monate Cortison-Tabletten ein?' },
  { id: 'medikamente', q: 'Nehmen Sie andere Medikamente, die den Knochenabbau fördern können – etwa bestimmte Hormon- oder Antihormontherapien?' },
  { id: 'menopause', q: 'Hatten Sie Ihre letzte Regelblutung vor dem 45. Lebensjahr (frühe Menopause)?' },
  { id: 'gewicht', q: 'Haben Sie Untergewicht oder hatten Sie eine Essstörung?' },
  { id: 'immobil', q: 'Waren Sie über längere Zeit bettlägerig oder stark in Ihrer Beweglichkeit eingeschränkt?' },
  { id: 'erkrankung', q: 'Haben Sie eine chronisch-entzündliche oder eine andere Erkrankung, die den Knochen schwächen kann – etwa rheumatoide Arthritis oder eine chronisch-entzündliche Darmerkrankung?' },
];

const RESULT = {
  none: {
    title: 'Aus Ihren Angaben ergibt sich kein Risikofaktor aus dieser Liste.',
    text: 'Das schließt eine Osteoporose nicht aus. Ab dem 50. Lebensjahr ist eine persönliche Einschätzung Ihres Osteoporoserisikos sinnvoll – sprechen Sie Ihre Hausärztin oder Ihren Hausarzt bei der nächsten Gelegenheit darauf an.',
  },
  one: {
    title: 'Eine Ihrer Angaben kann das Osteoporoserisiko erhöhen.',
    text: 'Besprechen Sie diesen Punkt mit Ihrer Ärztin oder Ihrem Arzt. Manche Faktoren – etwa ein Knochenbruch nach geringem Anlass oder eine längere Cortisontherapie – können schon allein Anlass für eine Knochendichtemessung sein.',
  },
  several: {
    title: 'Mehrere Ihrer Angaben können das Osteoporoserisiko erhöhen.',
    text: 'Lassen Sie sich zu Ihrem persönlichen Osteoporoserisiko ärztlich beraten. Eine Knochendichtemessung kann zur weiteren Abklärung sinnvoll sein. Gerne klären wir mit Ihnen, ob und wie ein Termin bei uns möglich ist.',
  },
};

const BoneRiskCheck = () => {
  const [answers, setAnswers] = useState({});
  const [shown, setShown] = useState(false);
  const uid = useId();
  const yes = Object.values(answers).filter((v) => v === 'ja').length;
  const answered = Object.keys(answers).length;
  const result = yes === 0 ? RESULT.none : yes === 1 ? RESULT.one : RESULT.several;

  const set = (id, v) => {
    setAnswers((a) => ({ ...a, [id]: v }));
    setShown(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
      <div className="flex items-start gap-3">
        <ClipboardCheck size={26} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
        <div>
          <h3 id={`${uid}-t`} className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Kurzer Risikocheck
          </h3>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            {RISK_QUESTIONS.length} Fragen mit Ja oder Nein. Der Check stellt keine Diagnose und ersetzt keine ärztliche Beratung.
            Ihre Antworten werden nicht gespeichert und nicht übertragen.
          </p>
        </div>
      </div>

      <form
        aria-labelledby={`${uid}-t`}
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          setShown(true);
        }}
      >
        <ol className="divide-y divide-slate-200 dark:divide-slate-700">
          {RISK_QUESTIONS.map((item, i) => (
            <li key={item.id} className="py-4">
              <fieldset>
                <legend className="text-[1.0625rem] leading-relaxed text-slate-800 dark:text-slate-100">
                  <span className="mr-1 font-semibold">{i + 1}.</span> {item.q}
                </legend>
                <div className="mt-3 flex gap-3">
                  {['ja', 'nein'].map((v) => (
                    <label
                      key={v}
                      className="relative inline-flex min-h-[44px] min-w-[88px] cursor-pointer items-center justify-center rounded-xl border border-slate-300 px-4 text-base font-semibold text-slate-800 has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand dark:border-slate-600 dark:text-slate-100"
                    >
                      <input
                        type="radio"
                        name={`${uid}-${item.id}`}
                        value={v}
                        checked={answers[item.id] === v}
                        onChange={() => set(item.id, v)}
                        className="sr-only"
                      />
                      {v === 'ja' ? 'Ja' : 'Nein'}
                    </label>
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit">Ergebnis anzeigen</Button>
          {answered > 0 && (
            <button
              type="button"
              onClick={() => { setAnswers({}); setShown(false); }}
              className="min-h-[44px] self-start rounded-lg px-2 text-sm font-semibold text-slate-600 underline underline-offset-4 hover:text-brand dark:text-slate-300"
            >
              Antworten zurücksetzen
            </button>
          )}
        </div>
      </form>

      <div aria-live="polite" className="mt-6">
        {shown && (
          <div data-risk-result={yes === 0 ? 'none' : yes === 1 ? 'one' : 'several'} className="rounded-xl border border-brand-100 bg-brand-50 p-5 text-slate-900 dark:border-brand-900 dark:bg-slate-800 dark:text-slate-50">
            <p className="font-semibold">{result.title}</p>
            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Dieses Ergebnis ist keine Diagnose.</p>
            <p className="mt-2 leading-relaxed">{result.text}</p>
            {answered < RISK_QUESTIONS.length && (
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                Hinweis: {RISK_QUESTIONS.length - answered === 1 ? 'Eine Frage haben' : `${RISK_QUESTIONS.length - answered} Fragen haben`} Sie nicht beantwortet.
              </p>
            )}
            {yes >= 1 && (
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={PHONE_HREF} icon={Phone} data-cta="phone">
                  Persönliches Knochenrisiko abklären
                  <span className="sr-only">: Anruf unter {PHONE_DISPLAY}</span>
                </Button>
                <BookingButton variant="secondary" label="DEXA-Termin buchen" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoneRiskCheck;
