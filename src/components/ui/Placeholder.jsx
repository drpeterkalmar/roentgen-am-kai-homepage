import { cx } from './cx';

// Interne Notizen für die Praxis nur im Staging-/Entwicklungs-Build zeigen (VITE_INTERNAL_NOTES=1:
// .env.development, .env.staging, GitHub-Actions-Build für github.io). Der Release-Build ohne die
// Variable blendet sie aus – Patientinnen, Patienten und Google sehen sie dann nicht.
export const SHOW_INTERNAL = import.meta.env.VITE_INTERNAL_NOTES === '1';

// Deutlich sichtbarer Platzhalter für Angaben, die die Praxis noch liefern muss.
// Alle Vorkommen sind per [data-placeholder] auffindbar (Tests, Abnahme).
// internal: interne Notiz für die Praxis (Angabe offen / zu bestätigen) – vor Veröffentlichung klären.
// Nicht-interne Platzhalter (fehlende Praxisangaben) bleiben in jedem Build sichtbar.
const Placeholder = ({ children, inline = false, internal = false, className }) => {
  if (internal && !SHOW_INTERNAL) return null;
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
      {/* SHOW_INTERNAL zuerst: im Release-Build fällt die Beschriftung „Interner Platzhalter“ ganz aus dem Bundle */}
      <strong className="font-semibold">{SHOW_INTERNAL && internal ? 'Interner Platzhalter:' : 'Platzhalter:'}</strong> {children}
    </Tag>
  );
};

export default Placeholder;
