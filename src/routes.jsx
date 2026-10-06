import { Navigate } from 'react-router-dom';
import { routes, findRoute, LEGACY_REDIRECTS } from './data/routes';
import { lazyPage } from './lib/lazyPage';
import Home from './pages/Home';

// Router-Konfiguration aus der zentralen Routentabelle (src/data/routes.js). routes.js nennt je Route nur den
// Schlüssel `page` (Dateiname unter src/pages, ohne .jsx) und bleibt so für Node lesbar (postbuild, Tests);
// hier wird daraus der Seiten-Code: die Startseite direkt im Haupt-Bundle, alle anderen Seiten erst bei Bedarf
// (je Seite ein eigener Chunk, lib/lazyPage.js).
const modules = import.meta.glob(['./pages/**/*.jsx', '!./pages/Home.jsx']);
const PAGES = { Home };
for (const [file, load] of Object.entries(modules)) PAGES[file.slice('./pages/'.length, -'.jsx'.length)] = lazyPage(load);

export const pageFor = (key) => PAGES[key];

// Vorgerenderte Seite (routes.js: prerender): Seiten-Code vor der Hydration laden (main.jsx)
export const preloadPrerenderedPage = (pathname) => {
  const route = findRoute(pathname);
  return route?.prerender ? PAGES[route.page]?.preload?.() : undefined;
};

const NotFoundPage = PAGES.NotFoundPage;

// Eine Route je Seite; Ratgeber-Artikel teilen sich eine Route (pattern /ratgeber/:slug)
const pageRoutes = [...new Map(routes.map((r) => [r.pattern || r.path, r.page])).entries()];

export const ROUTE_OBJECTS = [
  ...pageRoutes.map(([path, key]) => {
    const Page = PAGES[key];
    return { path, element: <Page /> };
  }),
  // alte Adressen → neue Seiten, mit Anker (statisch dieselbe Tabelle: scripts/postbuild.mjs)
  ...Object.entries(LEGACY_REDIRECTS).map(([from, to]) => ({ path: from, element: <Navigate to={to} replace /> })),
  // weitere Unterseiten der alten Rubrik „Digitales Röntgen“ ohne eigenen Eintrag
  { path: '/unser-angebot/digitales-roentgen/*', element: <Navigate to="/roentgen-graz" replace /> },
  { path: '*', element: <NotFoundPage /> },
];
