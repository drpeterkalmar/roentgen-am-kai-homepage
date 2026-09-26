import React from 'react';
import { cx } from './cx';

// Typografie-Skala (mobile-first). Die Ebene (h1–h4) bestimmt die Semantik,
// `look` optional die Optik – so bleibt die Überschriftenhierarchie korrekt.
const looks = {
  display: 'text-[2rem] sm:text-5xl lg:text-[3.25rem] leading-[1.1]',
  h1: 'text-3xl sm:text-4xl lg:text-5xl leading-[1.15]',
  h2: 'text-2xl sm:text-3xl leading-tight',
  h3: 'text-xl sm:text-2xl leading-snug',
  h4: 'text-lg leading-snug',
};

export const Heading = ({ level = 2, look, id, className, children }) => {
  const Tag = `h${level}`;
  return (
    <Tag id={id} className={cx('font-display font-semibold tracking-tight text-slate-900 dark:text-white', looks[look || `h${level}`], className)}>
      {children}
    </Tag>
  );
};

export const Eyebrow = ({ className, children }) => (
  <p className={cx('mb-3 text-sm font-semibold text-brand dark:text-brand-300', className)}>{children}</p>
);

export const Lead = ({ className, children }) => (
  <p className={cx('text-lg leading-relaxed text-slate-600 dark:text-slate-300', className)}>{children}</p>
);

// Kombi aus Dachzeile, Überschrift und Einleitung für Abschnittsköpfe.
export const SectionHeading = ({ eyebrow, title, lead, level = 2, id, align = 'left', className }) => (
  <div className={cx('mb-10 max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <Heading level={level} id={id}>{title}</Heading>
    {lead && <Lead className="mt-4">{lead}</Lead>}
  </div>
);

export default Heading;
