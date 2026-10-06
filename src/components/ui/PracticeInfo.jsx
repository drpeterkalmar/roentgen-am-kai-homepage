import { MapPin, Phone, Mail, Clock, Train, Car } from 'lucide-react';
import { ADDRESS, PHONE_DISPLAY, PHONE_HREF, EMAIL, OPENING_HOURS, TRANSPORT, MAPS_ROUTE_URL } from '../../data/practice';
import { cx } from './cx';

const Row = ({ icon: Icon, label, children }) => (
  <div className="flex gap-3">
    <Icon size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
    <div>
      <span className="sr-only">{label}: </span>
      {children}
    </div>
  </div>
);

const linkCls = 'inline-flex min-h-[44px] items-center underline decoration-slate-300 underline-offset-4 hover:text-brand hover:decoration-brand dark:decoration-slate-600 dark:hover:text-brand-300';

// Kontaktdaten (Adresse, Telefon, E-Mail) aus data/practice.js
export const ContactDetails = ({ className }) => (
  <address className={cx('not-italic space-y-4', className)}>
    <Row icon={MapPin} label="Adresse">
      {ADDRESS.street}<br />{ADDRESS.zip} {ADDRESS.city}
    </Row>
    <Row icon={Phone} label="Telefon">
      <a href={PHONE_HREF} className={linkCls}>{PHONE_DISPLAY}</a>
    </Row>
    <Row icon={Mail} label="E-Mail">
      <a href={`mailto:${EMAIL}`} className={cx(linkCls, 'break-all')}>{EMAIL}</a>
    </Row>
  </address>
);

// Öffnungszeiten als Definitionsliste
export const OpeningHours = ({ className, withIcon = true }) => (
  <div className={cx('flex gap-3', className)}>
    {withIcon && <Clock size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />}
    <dl className="flex-1 space-y-2">
      {OPENING_HOURS.map((h) => (
        <div key={h.days}>
          <dt className="font-medium text-slate-900 dark:text-white">{h.days}</dt>
          <dd className="whitespace-nowrap tabular-nums">{h.opens} – {h.closes} Uhr</dd>
        </div>
      ))}
    </dl>
  </div>
);

// Anfahrt: Öffis, Parken, Routenlink
export const Directions = ({ className }) => (
  <div className={cx('space-y-4', className)}>
    <Row icon={Train} label="Öffentlich">{TRANSPORT.public}</Row>
    <Row icon={Car} label="Parken">{TRANSPORT.parking}</Row>
    <p className="pl-8">
      <a href={MAPS_ROUTE_URL} target="_blank" rel="noopener noreferrer" className={cx(linkCls, 'font-semibold')}>
        Route in Google Maps öffnen<span className="sr-only"> (öffnet in neuem Fenster)</span>
      </a>
    </p>
  </div>
);
