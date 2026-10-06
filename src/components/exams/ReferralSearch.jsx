import { useId, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Mail } from 'lucide-react';
import { searchTerms, normalize, TERMS_ALPHABETICAL } from '../../data/referralTerms';
import Button from '../ui/Button';
import { PhoneButton } from '../ui/BookingButtons';

// „Was steht auf Ihrer Zuweisung?“ – Suchfeld mit Autovervollständigung (WAI-ARIA Combobox mit Listbox).
// Dient NUR der Navigation innerhalb der Website: keine medizinische Empfehlung, legt keine Untersuchung fest.
// Ohne JavaScript: vollständige Begriffsliste (A–Z) als normale Links im Aufklappbereich darunter.

const focusTarget = (hash) => {
  let tries = 0;
  const tick = () => {
    const el = document.getElementById(hash);
    if (el) {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    } else if (tries++ < 90) {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
};

const ReferralSearch = ({ headingLevel = 2 }) => {
  const H = `h${headingLevel}`;
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const uid = useId();
  const ids = { input: `${uid}-q`, list: `${uid}-list`, hint: `${uid}-hint`, status: `${uid}-status` };

  const results = useMemo(() => searchTerms(query), [query]);
  const searched = normalize(query).length >= 2;
  const noMatch = searched && results.length === 0;
  const showList = open && results.length > 0;

  const go = (t) => {
    setOpen(false);
    setActiveIdx(-1);
    setQuery(t.term);
    navigate(t.to);
    const hash = t.to.split('#')[1];
    if (hash) focusTarget(hash);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!results.length) return;
      setOpen(true);
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!results.length) return;
      setOpen(true);
      setActiveIdx((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === 'Enter') {
      if (results.length) {
        e.preventDefault();
        go(results[activeIdx >= 0 ? activeIdx : 0]);
      }
    } else if (e.key === 'Escape') {
      if (open) setOpen(false);
      else setQuery('');
      setActiveIdx(-1);
    }
  };

  return (
    <div id="zuweisung-suche" data-referral-search>
      <H id="zuweisung-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Was steht auf Ihrer Zuweisung?
      </H>
      <p id={ids.hint} className="mt-3 max-w-3xl text-slate-700 dark:text-slate-200">
        Geben Sie den Begriff von Ihrer Zuweisung ein, zum Beispiel „HWS“, „Thorax“ oder „OSG“. Die Suche hilft Ihnen nur,
        die passende Information auf unserer Website zu finden. Sie legt keine Untersuchung fest und gibt keine medizinische
        Empfehlung – welche Aufnahmen gemacht werden, bestimmt Ihre ärztliche Zuweisung.
      </p>

      <div role="search" className="relative mt-6 max-w-2xl">
        <label htmlFor={ids.input} className="mb-2 block font-semibold text-slate-900 dark:text-white">
          Begriff von Ihrer Zuweisung
        </label>
        <div className="relative">
          <Search size={20} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          <input
            id={ids.input}
            type="text"
            role="combobox"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            aria-autocomplete="list"
            aria-expanded={showList}
            aria-controls={ids.list}
            aria-describedby={ids.hint}
            aria-activedescendant={showList && activeIdx >= 0 ? `${ids.list}-${activeIdx}` : undefined}
            placeholder="z. B. HWS, Thorax oder Knie stehend"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIdx(-1); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
            className="block min-h-[52px] w-full rounded-xl border border-slate-400 bg-white pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-500 focus:border-brand dark:border-slate-500 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-400"
          />
        </div>
        <ul
          id={ids.list}
          role="listbox"
          aria-label="Vorschläge"
          hidden={!showList}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 overflow-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {results.map((t, i) => (
            <li
              key={t.term}
              id={`${ids.list}-${i}`}
              role="option"
              tabIndex={-1}
              aria-selected={i === activeIdx}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(t)}
              onKeyDown={() => {}}
              className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100 aria-selected:bg-brand-50 aria-selected:text-brand-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:aria-selected:bg-slate-800 dark:aria-selected:text-white"
            >
              <span>
                <span className="font-semibold">{t.term}</span>
                <span aria-hidden="true" className="mx-2 text-slate-400">→</span>
                <span className="sr-only">: </span>
                <span>{t.label}</span>
              </span>
              <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-slate-400" />
            </li>
          ))}
        </ul>
        <p id={ids.status} role="status" className="sr-only">
          {searched ? (results.length ? `${results.length} Vorschläge. Mit Pfeiltasten auswählen, Eingabetaste öffnet den Abschnitt.` : 'Kein passender Begriff gefunden.') : ''}
        </p>
      </div>

      {noMatch && (
        <div className="mt-5 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900" data-no-match>
          <p className="font-semibold text-slate-900 dark:text-white">
            Ihre Untersuchung ist nicht angeführt? Kontaktieren Sie uns – wir helfen Ihnen gerne weiter.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <PhoneButton label="Ordination anrufen" variant="primary" />
            <Button to="/kontakt" variant="secondary" icon={Mail}>Kontakt aufnehmen</Button>
          </div>
        </div>
      )}

      <noscript>
        <p className="mt-4 max-w-2xl text-slate-700 dark:text-slate-200">
          Die Vorschläge im Suchfeld benötigen JavaScript. Alle Begriffe finden Sie in der Liste „Alle Begriffe von A bis Z“.
        </p>
      </noscript>

      <details className="group mt-6 max-w-3xl rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <summary className="flex min-h-[48px] cursor-pointer items-center px-4 font-semibold text-slate-900 dark:text-white">
          Alle Begriffe von A bis Z
        </summary>
        <ul className="grid gap-x-6 border-t border-slate-200 px-4 py-3 dark:border-slate-700 sm:grid-cols-2" data-terms-all>
          {TERMS_ALPHABETICAL.map((t) => (
            <li key={t.term}>
              <Link to={t.to} className="inline-flex min-h-[44px] items-center gap-1.5 text-[0.95rem] text-slate-800 underline-offset-4 hover:text-brand hover:underline dark:text-slate-100 dark:hover:text-brand-300">
                <span className="font-semibold">{t.term}</span>
                <span aria-hidden="true">→</span>
                <span className="sr-only">: </span>
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-700">
          <p className="text-[0.95rem] text-slate-700 dark:text-slate-200">
            Ihre Untersuchung ist nicht angeführt? Kontaktieren Sie uns – wir helfen Ihnen gerne weiter.
          </p>
        </div>
      </details>
    </div>
  );
};

export default ReferralSearch;
