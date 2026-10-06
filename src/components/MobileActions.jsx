import { CalendarCheck, Phone, MapPin } from 'lucide-react';
import { BOOKING_URL, PHONE_HREF, PHONE_DISPLAY, MAPS_ROUTE_URL } from '../data/practice';

// Feste Aktionsleiste am Handy: Termin buchen · Anrufen · Anfahrt.
// Ruhig (keine Einblend-Animation), berücksichtigt den unteren Sicherheitsbereich (iPhone).
const item = 'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold';

const MobileActions = () => (
  <nav
    aria-label="Schnellzugriff"
    className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 md:hidden"
  >
    <ul className="flex">
      <li className="flex flex-[1.4]">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="booking" className={`${item} bg-brand text-white`}>
          <CalendarCheck size={22} aria-hidden="true" />
          Termin buchen<span className="sr-only"> (öffnet in neuem Fenster)</span>
        </a>
      </li>
      <li className="flex flex-1">
        <a href={PHONE_HREF} className={`${item} text-slate-800 dark:text-slate-100`}>
          <Phone size={22} aria-hidden="true" className="text-brand dark:text-brand-300" />
          Anrufen<span className="sr-only">: {PHONE_DISPLAY}</span>
        </a>
      </li>
      <li className="flex flex-1">
        <a href={MAPS_ROUTE_URL} target="_blank" rel="noopener noreferrer" className={`${item} text-slate-800 dark:text-slate-100`}>
          <MapPin size={22} aria-hidden="true" className="text-brand dark:text-brand-300" />
          Anfahrt<span className="sr-only"> (öffnet in neuem Fenster)</span>
        </a>
      </li>
    </ul>
  </nav>
);

export default MobileActions;
