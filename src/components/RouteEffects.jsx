import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Scroll- und Fokusverhalten bei Seitenwechseln (ersetzt ScrollToHash; Gutachten P2-2 und P2-3):
//   * Zurück/Vor (POP): nichts tun – der Browser stellt die vorherige Position wieder her.
//   * Erstaufruf/Neuladen ohne Anker: nichts tun – Browser-Wiederherstellung bzw. Seitenanfang gelten.
//   * Anker (#…): Ziel suchen, bis es gerendert ist (Seiten-Code kann noch laden), dann weich hinscrollen;
//     den Abstand zum Kopfbereich hält scroll-padding-top (index.css). Gilt auch beim Erstaufruf, weil das
//     Ziel bei nachgeladenen Seiten erst mit dem Seiten-Code entsteht.
//   * Neue Seite ohne Anker (PUSH/REPLACE): sofort nach oben (ohne Scrollfahrt) und Fokus auf den Inhalt
//     (#main), damit Tastatur- und Screenreader-Nutzer auf der neuen Seite beginnen statt im Menü.
// Keine eigene Scroll-Wiederherstellung (BrowserRouter, Browser-Standard).
const NAV_WAIT_MS = 1000; // Seitenwechsel in der App: Seite ist beim Effekt schon gerendert
const FIRST_LOAD_WAIT_MS = 10000; // Erstaufruf: Seiten-Code lädt evtl. erst (langsames Netz)

const toTopAndFocusMain = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.getElementById('main')?.focus({ preventScroll: true });
};

const RouteEffects = () => {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const mountKey = useRef(key);
  const navigated = useRef(false);
  const lastPath = useRef(pathname);

  useEffect(() => {
    // Erstaufruf = noch keine Navigation seit dem Laden (auch bei doppeltem Effekt im StrictMode)
    const first = !navigated.current && key === mountKey.current;
    if (!first) navigated.current = true;
    const pathChanged = lastPath.current !== pathname;
    lastPath.current = pathname;
    if (navType === 'POP' && !first) return undefined;
    if (!hash) {
      if (!first) toTopAndFocusMain();
      return undefined;
    }
    let id = hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* ungültige Kodierung: Anker wie geschrieben */ }
    const until = performance.now() + (first ? FIRST_LOAD_WAIT_MS : NAV_WAIT_MS);
    let frame = 0;
    const find = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (performance.now() < until) frame = requestAnimationFrame(find);
      else if (pathChanged && !first) toTopAndFocusMain(); // Anker fehlt auf der neuen Seite: wie Seitenwechsel
    };
    find();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key, navType]);

  return null;
};

export default RouteEffects;
