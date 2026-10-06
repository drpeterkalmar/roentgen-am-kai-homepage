import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cx } from './ui/cx';
import Placeholder from './ui/Placeholder';

// Barrierearme FAQ (Disclosure-Muster): Frage = Schaltfläche in einer Überschrift,
// aria-expanded/aria-controls, Antwort-Region. Inhalte aus src/data/faqData.js
// (dieselbe Quelle speist das FAQPage-Schema in SchemaMarkup.jsx).
// pending: offene Praxisangabe → sichtbarer Platzhalter, Frage NICHT im Schema.
const FAQItem = ({ question, answer, pending, headingLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const H = `h${headingLevel}`;
  return (
    <div className="border-b border-slate-200 last:border-0 dark:border-slate-700">
      <H className="font-sans text-base font-normal">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          onClick={() => setIsOpen((o) => !o)}
          className="flex w-full items-start justify-between gap-4 py-5 text-left text-lg font-semibold text-slate-900 hover:text-brand dark:text-white dark:hover:text-brand-300"
        >
          <span>{question}</span>
          <ChevronDown size={22} aria-hidden="true" className={cx('mt-1 shrink-0 text-slate-500 transition-transform', isOpen && 'rotate-180')} />
        </button>
      </H>
      {/* .disclosure (index.css): Antwort gleitet auf; geschlossen visibility:hidden = wie [hidden] */}
      <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} data-open={isOpen} className="disclosure">
        <div>
          <div className="pb-5 pr-10 leading-relaxed text-slate-700 dark:text-slate-200">
            <p>{answer}</p>
            {pending && <Placeholder internal className="mt-3">{pending}</Placeholder>}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = ({ items, title = 'Häufig gestellte Fragen', headingLevel = 2, align = 'center' }) => {
  const itemLevel = Math.min(headingLevel + 1, 6);
  const H = `h${headingLevel}`;
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-14 sm:py-20">
      <div className={align === "left" ? "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8" : "mx-auto max-w-3xl px-5 sm:px-6"}>
        <H id="faq-title" className="mb-6 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </H>
        <div className={`rounded-2xl border border-slate-200 bg-white px-5 sm:px-8 dark:border-slate-700 dark:bg-slate-900 ${align === "left" ? "max-w-4xl" : ""}`}>
          {items.map((item) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} pending={item.pending} headingLevel={itemLevel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
