import { useLocation } from 'react-router-dom';
import { CalendarCheck, Phone, MapPin } from 'lucide-react';
import { BOOKING_URL, PHONE_HREF, PHONE_DISPLAY, MAPS_ROUTE_URL } from '../data/practice';
import { AREAS } from '../data/examinations';

// Feste Aktionsleiste am Handy: Termin buchen · Anrufen · Anfahrt.
// Auf Seiten von Untersuchungen, die nur telefonisch vereinbart werden (Ultraschall, Spezialröntgen,
// Phlebographie, Zahnröntgen/DVT), ist „Termin telefonisch“ der hervorgehobene erste Knopf und die
// Online-Buchung entfällt dort – sonst widerspräche die Leiste dem Hinweis „nicht online buchbar“.
// Ruhig (keine Einblend-Animation), berücksichtigt den unteren Sicherheitsbereich (iPhone).
const item = 'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold';

const PHONE_ONLY_PATHS = [
  ...Object.values(AREAS).filter((a) => !a.walkIn && !a.onlineBooking && a.path).map((a) => a.path),
  '/unser-angebot/phlebographie',
];

export const isPhoneOnlyPath = (pathname) => {
  const p = pathname.replace(/\/+$/, '') || '/';
  return PHONE_ONLY_PATHS.includes(p);
};

const MobileActions = () => {
  const { pathname } = useLocation();
  const phoneOnly = isPhoneOnlyPath(pathname);
  return (
    <nav
      aria-label="Schnellzugriff"
      data-phone-only={phoneOnly ? 'true' : undefined}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 md:hidden"
    >
      <ul className="flex">
        {phoneOnly ? (
          <li className="flex flex-[1.4]">
            <a href={PHONE_HREF} data-cta="phone" className={`${item} bg-brand text-white`}>
              <Phone size={22} aria-hidden="true" />
              Termin telefonisch<span className="sr-only">: {PHONE_DISPLAY}</span>
            </a>
          </li>
        ) : (
          <>
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
          </>
        )}
        <li className="flex flex-1">
          <a href={MAPS_ROUTE_URL} target="_blank" rel="noopener noreferrer" className={`${item} text-slate-800 dark:text-slate-100`}>
            <MapPin size={22} aria-hidden="true" className="text-brand dark:text-brand-300" />
            Anfahrt<span className="sr-only"> (öffnet in neuem Fenster)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MobileActions;
