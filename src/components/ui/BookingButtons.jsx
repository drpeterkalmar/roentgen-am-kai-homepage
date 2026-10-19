import { createContext, useContext } from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import Button from './Button';
import { bookingUrl, PHONE_HREF, PHONE_DISPLAY } from '../../data/practice';

// Leistung der Seite (z. B. 'knochendichte'): Buchungsknöpfe ohne eigenes service-Prop übernehmen sie.
// Mammographie-Screening und DEXA führen so zur eigenen Online-Buchung (ONLINE_TERMIN_LINKS), der Rest zu BOOKING_URL.
const BookingServiceContext = createContext(undefined);
export const BookingService = ({ service, children }) => (
  <BookingServiceContext.Provider value={service}>{children}</BookingServiceContext.Provider>
);
export const useBookingService = () => useContext(BookingServiceContext);

// „Termin online buchen“ – führt zur Online-Buchung der Praxis (neues Fenster).
// service: Untersuchung (z. B. 'koerperanalyse') → Buchungsadresse und data-cta-service für die CTA-Messung
// (src/lib/ctaTracking.js)
export const BookingButton = ({ label, service, ...rest }) => {
  const seite = useBookingService();
  const key = service || seite;
  return (
    <Button href={bookingUrl(key)} external icon={CalendarCheck} data-cta="booking" data-cta-service={key} {...rest}>
      {label || 'Termin online buchen'}
    </Button>
  );
};

// Telefon-Schaltfläche mit Nummer aus den zentralen Praxisdaten.
export const PhoneButton = ({ label, variant = 'secondary', service, ...rest }) => (
  <Button href={PHONE_HREF} variant={variant} icon={Phone} data-cta="phone" data-cta-service={service} {...rest}>
    <span className={label ? "sm:whitespace-nowrap" : "whitespace-nowrap"}>{label || PHONE_DISPLAY}</span>
    {label && <span className="sr-only">: {PHONE_DISPLAY}</span>}
  </Button>
);
