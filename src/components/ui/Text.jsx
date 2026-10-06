import { isValidElement } from 'react';

// Textbausteine der Inhaltsseiten (Leistungsseiten, Gesundheitsziele) – eine Quelle statt Kopien je Seite.

export const H3 = ({ children, className = '', id }) => (
  <h3 id={id} className={`font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white ${className}`}>{children}</h3>
);

export const P = ({ children, className = '' }) => (
  <p className={`text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200 ${className}`}>{children}</p>
);

// Aufzählung mit Markenpunkt. items: Strings oder { key, content } (content = JSX); cols: zweispaltig ab md
export const Bullets = ({ items, cols = false }) => (
  <ul className={cols ? 'grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2' : 'space-y-3'}>
    {items.map((item) => (
      <li key={typeof item === 'string' ? item : item.key} className="flex gap-3 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">
        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
        <span>{typeof item === 'string' || isValidElement(item) ? item : item.content}</span>
      </li>
    ))}
  </ul>
);

// Screenreader-Hinweis für Links in einem neuen Fenster
export const NewWindow = () => <span className="sr-only"> (öffnet in neuem Fenster)</span>;

// Klassen für Links: Textlink mit Pfeil (Touch-Ziel 44 px), Zeilen-Link als Karte, Link im Fließtext (extern)
export const textLink = 'inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300';
export const linkRow =
  'flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300';
export const extLink = 'font-semibold text-brand underline underline-offset-4 hover:text-brand-700 dark:text-brand-300';
