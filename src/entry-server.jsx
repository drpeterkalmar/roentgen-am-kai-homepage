// Vorrendern für Seiten, die auch ohne JavaScript vollständig nutzbar sein müssen (routes.js: prerender: true).
// Wird von `vite build --ssr` gebaut und von scripts/postbuild.mjs aufgerufen. Im Browser übernimmt main.jsx
// das HTML per hydrateRoot – deshalb derselbe Seitenrahmen wie in der App (AppShell) und dieselbe Struktur
// (Routes → Seite). Die Seiten werden hier direkt importiert (kein lazy, sonst käme nur der Ladeplatzhalter).
import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import AppShell from './AppShell';
import WeitereUntersuchungenPage from './pages/WeitereUntersuchungenPage';
import RoentgenGrazPage from './pages/RoentgenGrazPage';
import UltraschallGrazPage from './pages/UltraschallGrazPage';
import SpezialroentgenPage from './pages/SpezialroentgenPage';
import ZahnroentgenDvtPage from './pages/ZahnroentgenDvtPage';
import PhlebographiePage from './pages/PhlebographiePage';

// Build-Variante (Staging mit internen Platzhaltern oder Release) – für die Prüfung der Build-Ausgabe (tests/unit/dist.test.mjs)
export { SHOW_INTERNAL } from './components/ui/Placeholder';

export const PAGES = {
  '/weitere-untersuchungen': WeitereUntersuchungenPage,
  '/roentgen-graz': RoentgenGrazPage,
  '/ultraschall-graz': UltraschallGrazPage,
  '/spezialroentgen': SpezialroentgenPage,
  '/zahnroentgen-dvt-graz': ZahnroentgenDvtPage,
  '/unser-angebot/phlebographie': PhlebographiePage,
};

export const render = (path, basename) => {
  const Page = PAGES[path];
  if (!Page) return null;
  // basename wie im Browser (import.meta.env.BASE_URL, mit Schrägstrich) – sonst weicht z. B. href des Logo-Links ab
  return renderToString(
    <StaticRouter location={basename.replace(/\/$/, '') + path} basename={basename}>
      <AppShell prerendered>
        <Routes>
          <Route path={path} element={<Page />} />
        </Routes>
      </AppShell>
    </StaticRouter>
  );
};
