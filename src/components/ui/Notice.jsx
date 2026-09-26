import React from 'react';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cx } from './cx';

// Informationshinweis. tone: info (neutral), important (Achtung), success (Bestätigung).
const tones = {
  info: { cls: 'bg-sky-50 border-sky-200 text-sky-950 dark:bg-sky-950/40 dark:border-sky-800 dark:text-sky-50', icon: Info, iconCls: 'text-sky-700 dark:text-sky-300' },
  important: { cls: 'bg-amber-50 border-amber-200 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-50', icon: AlertTriangle, iconCls: 'text-amber-700 dark:text-amber-300' },
  success: { cls: 'bg-emerald-50 border-emerald-200 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-50', icon: CheckCircle2, iconCls: 'text-emerald-700 dark:text-emerald-300' },
};

const Notice = ({ tone = 'info', title, children, className, headingLevel = 3 }) => {
  const t = tones[tone];
  const Icon = t.icon;
  const H = `h${headingLevel}`;
  return (
    <div role="note" className={cx('flex gap-3 rounded-xl border p-4 sm:p-5', t.cls, className)}>
      <Icon size={22} aria-hidden="true" className={cx('mt-0.5 shrink-0', t.iconCls)} />
      <div className="min-w-0 text-[0.95rem] leading-relaxed">
        {title && <H className="mb-1 font-sans text-base font-semibold">{title}</H>}
        {children}
      </div>
    </div>
  );
};

export default Notice;
