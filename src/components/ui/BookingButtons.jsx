import React from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import Button from './Button';
import { BOOKING_URL, PHONE_HREF, PHONE_DISPLAY } from '../../data/practice';

// „Termin online buchen“ – führt zur Online-Buchung der Praxis (MiraNext, neues Fenster).
export const BookingButton = ({ label, ...rest }) => (
  <Button href={BOOKING_URL} external icon={CalendarCheck} data-cta="booking" {...rest}>
    {label || 'Termin online buchen'}
  </Button>
);

// Telefon-Schaltfläche mit Nummer aus den zentralen Praxisdaten.
export const PhoneButton = ({ label, variant = 'secondary', ...rest }) => (
  <Button href={PHONE_HREF} variant={variant} icon={Phone} data-cta="phone" {...rest}>
    <span className="whitespace-nowrap">{label || PHONE_DISPLAY}</span>
    {label && <span className="sr-only">: {PHONE_DISPLAY}</span>}
  </Button>
);
