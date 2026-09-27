import React from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import Button from './Button';
import { BOOKING_URL, PHONE_HREF, PHONE_DISPLAY } from '../../data/practice';

// „Termin online buchen“ – führt zur Online-Buchung der Praxis (MiraNext, neues Fenster).
// service: Untersuchung (z. B. 'koerperanalyse') → data-cta-service für die CTA-Messung (src/lib/ctaTracking.js)
export const BookingButton = ({ label, service, ...rest }) => (
  <Button href={BOOKING_URL} external icon={CalendarCheck} data-cta="booking" data-cta-service={service} {...rest}>
    {label || 'Termin online buchen'}
  </Button>
);

// Telefon-Schaltfläche mit Nummer aus den zentralen Praxisdaten.
export const PhoneButton = ({ label, variant = 'secondary', service, ...rest }) => (
  <Button href={PHONE_HREF} variant={variant} icon={Phone} data-cta="phone" data-cta-service={service} {...rest}>
    <span className="whitespace-nowrap">{label || PHONE_DISPLAY}</span>
    {label && <span className="sr-only">: {PHONE_DISPLAY}</span>}
  </Button>
);
