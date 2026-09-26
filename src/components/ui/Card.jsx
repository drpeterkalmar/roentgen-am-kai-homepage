import React from 'react';
import { cx } from './cx';

// Ruhige Karte: weiße Fläche, feine Kontur, dezenter Schatten – kein Glas-/Blur-Effekt.
const tones = {
  default: 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-700',
  muted: 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-700',
  brand: 'bg-brand-50 border-brand-100 dark:bg-slate-900 dark:border-brand-900',
  dark: 'bg-slate-900 border-slate-900 text-white dark:bg-slate-800 dark:border-slate-700',
};

const Card = ({ as: Tag = 'div', tone = 'default', padding = 'p-6 sm:p-8', className, children, ...rest }) => (
  <Tag className={cx('rounded-2xl border shadow-sm', tones[tone], padding, className)} {...rest}>
    {children}
  </Tag>
);

export default Card;
