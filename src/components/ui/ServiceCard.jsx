import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { cx } from './cx';
import Placeholder from './Placeholder';

// Leistungskarte. Die ganze Karte ist klickbar (Stretched-Link über den Titel-Link),
// für Screenreader gibt es trotzdem nur EINEN Link mit sprechendem Namen.
const ServiceCard = ({ title, description, href, icon: Icon, media, badges = [], featured = false, headingLevel = 3, linkLabel = 'Mehr erfahren', className }) => {
  const H = `h${headingLevel}`;
  return (
    <article
      className={cx(
        'group relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-shadow duration-150 dark:bg-slate-900',
        href && 'card-lift hover:shadow-md focus-within:shadow-md',
        featured ? 'border-brand-200 shadow-md dark:border-brand-800' : 'border-slate-200 dark:border-slate-700',
        media && 'overflow-hidden',
        className
      )}
    >
      {media && <div className="-mx-6 -mt-6 mb-6 bg-slate-100 dark:bg-slate-800">{media}</div>}
      {Icon && !media && (
        <div className={cx('mb-5 flex h-12 w-12 items-center justify-center rounded-xl', featured ? 'bg-brand-50 text-brand dark:bg-brand-950 dark:text-brand-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200')}>
          <Icon size={24} aria-hidden="true" />
        </div>
      )}
      <H className="font-display font-semibold tracking-tight text-xl sm:text-[1.375rem] leading-snug text-slate-900 dark:text-white">
        {href ? (
          <Link to={href} className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none">
            {title}
          </Link>
        ) : (
          title
        )}
      </H>
      {description && <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>}
      {badges.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Merkmale">
          {badges.map((b) => (
            <li key={b} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {b === 'Online buchbar' && <CalendarCheck size={14} aria-hidden="true" />}
              {b}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-6">
        {href ? (
          <span aria-hidden="true" className="inline-flex items-center gap-2 font-semibold text-brand group-hover:gap-3 transition-[gap] dark:text-brand-300">
            {linkLabel} <ArrowRight size={18} />
          </span>
        ) : (
          <Placeholder inline>Eigene Seite folgt</Placeholder>
        )}
      </div>
    </article>
  );
};

export default ServiceCard;
