import { Link } from 'react-router-dom';
import { CalendarClock, CheckCircle2, FileText, MapPin, Phone, Info, ArrowRight } from 'lucide-react';
import { cx } from '../ui/cx';
import Container from '../ui/Container';
import Button, { buttonClasses } from '../ui/Button';
import { BookingButton, PhoneButton } from '../ui/BookingButtons';
import Placeholder from '../ui/Placeholder';
import { PHONE_DISPLAY, PHONE_HREF } from '../../data/practice';
import {
  AREAS, WALK_IN, APPOINTMENT_REQUIRED, CALLBACK, WALK_IN_HREF,
  RADIATION_EXAMPLES, RADIATION_DISCLAIMER, RADIATION_DEPENDS, ULTRASOUND_RADIATION, PREGNANCY_NOTE,
} from '../../data/examinations';

// Bausteine für „Weitere Untersuchungen“ – einheitliche Terminlogik auf Übersicht, Karten, Hero und Abschluss-CTA.
// Röntgen: „Ohne vorherige Terminvereinbarung möglich“ steht NIE ohne den Zusatz „mit gültiger ärztlicher Zuweisung und e-card“.

// --- Terminstatus (Badge) ---------------------------------------------------
// tone: light (helle Flächen) | dark (dunkles Abschlussband)
export const StatusBadge = ({ area, tone = 'light', size = 'md', text, className }) => {
  const a = typeof area === 'string' ? AREAS[area] : area;
  const walkIn = a.walkIn;
  const pill = cx(
    'inline-flex items-center gap-2 rounded-full border font-semibold',
    size === 'sm' ? 'px-3 py-1 text-sm' : 'px-3.5 py-1.5 text-sm sm:text-base',
    tone === 'dark'
      ? 'border-white/50 bg-white text-brand-800'
      : walkIn
        ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-100'
        : 'border-brand-200 bg-white text-brand-800 dark:border-brand-800 dark:bg-slate-950 dark:text-brand-200'
  );
  const Icon = walkIn ? CheckCircle2 : CalendarClock;
  return (
    <div className={cx('flex flex-col items-start gap-1.5', className)} data-status={walkIn ? 'walk-in' : 'appointment'}>
      <p className={pill}>
        <Icon size={18} aria-hidden="true" className="shrink-0" />
        {text || (walkIn ? WALK_IN.badge : APPOINTMENT_REQUIRED.badge)}
      </p>
      {walkIn && (
        <p
          className={cx(
            'inline-flex items-center gap-2 text-sm font-semibold',
            tone === 'dark' ? 'text-white' : 'text-slate-800 dark:text-slate-100'
          )}
          data-requirement
        >
          <FileText size={16} aria-hidden="true" className="shrink-0" />
          {WALK_IN.requirement}
        </p>
      )}
    </div>
  );
};

// --- „Direkt vorbeikommen“ – sieht bewusst NICHT wie eine Buchung aus (kein Kalender, Unterzeile) ---
export const WalkInButton = ({ variant = 'secondary', size = 'md', className, inverse = false }) => (
  <Link
    to={WALK_IN_HREF}
    data-cta="walk_in"
    data-cta-service="roentgen"
    className={buttonClasses({
      variant,
      size,
      className: cx(
        'flex-col !items-start !gap-0 text-left',
        inverse && '!border-white/60 !bg-transparent !text-white hover:!bg-white/10',
        className
      ),
    })}
  >
    <span className="inline-flex items-center gap-2">
      <MapPin size={20} aria-hidden="true" className="shrink-0" />
      {WALK_IN.walkInLabel}
    </span>
    <span className={cx('pl-7 text-sm font-normal', inverse ? 'text-brand-50' : variant === 'primary' ? 'text-white' : 'text-slate-600 dark:text-slate-300')}>
      {WALK_IN.walkInSub}
    </span>
  </Link>
);

export const ReserveButton = (props) => (
  <BookingButton label={WALK_IN.reserveLabel} service="roentgen" {...props} />
);

// --- Terminweg je Bereich (Schaltflächen + Hinweise) ---------------------------
// Nicht online buchbar → Telefon als antippbarer Link, Rückruf nur wenn vorhanden, Hinweis was zu nennen ist.
export const AppointmentActions = ({ area, tone = 'light', size = 'md', label, primaryWalkIn = true }) => {
  const a = typeof area === 'string' ? AREAS[area] : area;
  const dark = tone === 'dark';
  if (a.walkIn) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <WalkInButton size={size} variant={dark ? 'secondary' : primaryWalkIn ? 'primary' : 'secondary'} inverse={dark} />
        <ReserveButton size={size} variant={dark ? 'inverse' : primaryWalkIn ? 'secondary' : 'primary'} />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {a.onlineBooking ? (
          <BookingButton label={label || APPOINTMENT_REQUIRED.buttonLabel} service={a.key} size={size} variant={dark ? 'inverse' : 'primary'} />
        ) : (
          <PhoneButton
            label={label || APPOINTMENT_REQUIRED.buttonLabel}
            service={a.key}
            size={size}
            variant={dark ? 'secondary' : 'primary'}
            className={dark ? '!border-white/60 !bg-white !text-brand-800 hover:!bg-brand-50' : undefined}
          />
        )}
        {CALLBACK && (
          <Button href={CALLBACK.href} variant="secondary" size={size}>{CALLBACK.label}</Button>
        )}
      </div>
      {!a.onlineBooking && a.phoneHint && (
        <p className={cx('flex gap-2 text-sm', dark ? 'text-brand-50' : 'text-slate-700 dark:text-slate-200')} data-phone-hint>
          <Phone size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>
            Termine vereinbaren Sie telefonisch unter{' '}
            <a href={PHONE_HREF} className={cx('whitespace-nowrap font-semibold underline underline-offset-4', dark ? 'text-white' : 'text-brand-800 dark:text-brand-200')}>{PHONE_DISPLAY}</a>
            {' '}(nicht online buchbar). Bitte nennen Sie dabei {a.phoneHint}.
          </span>
        </p>
      )}
    </div>
  );
};

// --- Abschluss-CTA mit Terminstatus unmittelbar daneben ---------------------------
export const ExamCTA = ({ area, title, text, id = 'exam-cta-title', label }) => {
  const a = AREAS[area];
  return (
    <section aria-labelledby={id} className="bg-brand-800 text-white" data-exam-cta={a.key}>
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
            <StatusBadge area={a} tone="dark" className="mt-4" />
            <p className="mt-4 text-lg text-brand-50">{text || (a.walkIn ? WALK_IN.text : 'Für diese Untersuchung ist ein Termin erforderlich.')}</p>
          </div>
          <div className="shrink-0 lg:max-w-md">
            <AppointmentActions area={a} tone="dark" size="lg" label={label} />
          </div>
        </div>
      </Container>
    </section>
  );
};

// --- Strahleninformation (zurückhaltend, einheitlich) ---------------------------
// ids: Beispiele aus RADIATION_EXAMPLES; ultrasound: Ultraschall-Zusatz; xray: Schwangerschaftshinweis (Röntgenstrahlung)
export const RadiationInfo = ({ ids = [], ultrasound = false, xray = true, headingLevel = 2, id = 'strahlung-title', lead, className }) => {
  const H = `h${headingLevel}`;
  const examples = RADIATION_EXAMPLES.filter((e) => ids.includes(e.id));
  return (
    <div className={cx('rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8', className)} data-radiation>
      <H id={id} className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
        Wie hoch ist die Strahlenbelastung?
      </H>
      {lead && <p className="mt-3 text-slate-700 dark:text-slate-200">{lead}</p>}
      {examples.length > 0 && (
        <ul className="mt-5 space-y-3" data-radiation-examples>
          {examples.map((e) => (
            <li key={e.id} className="flex gap-3 text-slate-700 dark:text-slate-200">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
              <span><strong className="font-semibold text-slate-900 dark:text-white">{e.label}:</strong> {e.text}</span>
            </li>
          ))}
        </ul>
      )}
      {xray && examples.length > 0 && <p className="mt-5 text-[0.95rem] text-slate-600 dark:text-slate-300">{RADIATION_DISCLAIMER}</p>}
      {xray && examples.length === 0 && <p className="mt-4 text-slate-700 dark:text-slate-200">{RADIATION_DEPENDS}</p>}
      {ultrasound && (
        <p className="mt-4 flex gap-2 text-slate-700 dark:text-slate-200">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
          <span>{ULTRASOUND_RADIATION}</span>
        </p>
      )}
      {xray && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[0.95rem] text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-50" data-pregnancy>
          <strong className="font-semibold">Schwangerschaft:</strong> {PREGNANCY_NOTE}
        </p>
      )}
    </div>
  );
};

// --- Kurze Fakten-Zeile im ersten sichtbaren Bereich ---------------------------
export const FactList = ({ items, className }) => (
  <dl className={cx('grid gap-3 sm:grid-cols-2', className)}>
    {items.map((f) => (
      <div key={f.label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
        <dt className="text-sm font-semibold text-slate-900 dark:text-white">{f.label}</dt>
        <dd className="mt-1 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">
          {f.value}
          {f.placeholder && <Placeholder inline className="mt-2">{f.placeholder}</Placeholder>}
        </dd>
      </div>
    ))}
  </dl>
);

// --- Bereichskarte (Übersicht, Startseite) ---------------------------------------
export const AreaCard = ({ area, headingLevel = 3, featured = false, buttonLabel, icon: Icon }) => {
  const a = AREAS[area];
  const label = buttonLabel || (a.walkIn ? 'Mehr erfahren' : 'Mehr erfahren und Termin vereinbaren');
  const H = `h${headingLevel}`;
  return (
    <article
      className={cx(
        'flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-7',
        featured ? 'border-brand-200 dark:border-brand-800' : 'border-slate-200 dark:border-slate-700'
      )}
      data-area={a.key}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand dark:bg-brand-950 dark:text-brand-300">
            <Icon size={24} />
          </div>
        )}
        <H className="font-display text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-[1.375rem]">{a.title}</H>
      </div>
      <StatusBadge area={a} size="sm" className="mt-4" />
      <p className="mt-4 text-slate-600 dark:text-slate-300">{a.short}</p>
      <div className="mt-auto pt-6">
        <Link to={a.path} className={buttonClasses({ variant: 'secondary', block: true })}>
          {label}<span className="sr-only">: {a.title}</span>
          <ArrowRight size={18} aria-hidden="true" className="shrink-0" />
        </Link>
      </div>
    </article>
  );
};
