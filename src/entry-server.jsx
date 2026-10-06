// Vorrendern für Seiten, die auch ohne JavaScript vollständig nutzbar sein müssen (routes.js: prerender: true).
// Wird von `vite build --ssr` gebaut und von scripts/postbuild.mjs aufgerufen; im Browser lädt die App wie gewohnt
// (main.jsx rendert neu – keine Hydration, daher keine Abweichungen durch Dunkelmodus o. Ä.).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileActions from './components/MobileActions';
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

const noop = () => {};

// Gleiche Grundstruktur wie App.jsx (Skip-Link, Header, main#main, Footer, Schnellzugriff am Handy)
export const render = (path, basename) => {
  const Page = PAGES[path];
  if (!Page) return null;
  return renderToString(
    <StaticRouter location={basename.replace(/\/$/, '') + path} basename={basename.replace(/\/$/, '')}>
      <div className="flex min-h-screen flex-col bg-white pb-[calc(56px+env(safe-area-inset-bottom))] text-slate-800 dark:bg-slate-950 dark:text-slate-200 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-brand focus:shadow-lg"
        >
          Zum Inhalt springen
        </a>
        <Header highContrast={false} setHighContrast={noop} isDark={false} toggleTheme={noop} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          <Page />
        </main>
        <Footer />
        <MobileActions />
      </div>
    </StaticRouter>
  );
};
