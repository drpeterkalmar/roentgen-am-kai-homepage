import React from 'react';
import { cx } from './cx';

// Deutlich sichtbarer Platzhalter für Angaben, die die Praxis noch liefern muss.
// Alle Vorkommen sind per [data-placeholder] auffindbar (Tests, Abnahme).
// internal: interne Notiz für die Praxis (Angabe offen / zu bestätigen) – vor Veröffentlichung klären.
const Placeholder = ({ children, inline = false, internal = false, className }) => {
  const Tag = inline ? 'span' : 'div';
  return (
    <Tag
      data-placeholder={typeof children === 'string' ? children : 'Platzhalter'}
      className={cx(
        'rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-100',
        inline ? 'inline-block px-2 py-0.5 text-sm' : 'block px-4 py-3 text-sm',
        className
      )}
    >
      <strong className="font-semibold">{internal ? 'Interner Platzhalter:' : 'Platzhalter:'}</strong> {children}
    </Tag>
  );
};

export default Placeholder;
