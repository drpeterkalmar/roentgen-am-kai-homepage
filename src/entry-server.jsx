// Vorrendern für Seiten, die auch ohne JavaScript vollständig nutzbar sein müssen (routes.js: prerender: true).
// Wird von `vite build --ssr` gebaut und von scripts/postbuild.mjs aufgerufen. Im Browser übernimmt main.jsx
// das HTML per hydrateRoot – deshalb derselbe Seitenrahmen wie in der App (AppShell) und dieselbe Struktur
// (Routes → Seite). Die Seiten werden hier direkt geladen (kein lazy, sonst käme nur der Ladeplatzhalter).
import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import AppShell from './AppShell';
import { routes } from './data/routes';

// Build-Variante (Staging mit internen Platzhaltern oder Release) – für die Prüfung der Build-Ausgabe (tests/unit/dist.test.mjs)
export { SHOW_INTERNAL } from './components/ui/Placeholder';

const modules = import.meta.glob('./pages/**/*.jsx', { eager: true });

// Seiten zum Vorrendern: alle Routen mit prerender: true aus der Routentabelle
export const PAGES = Object.fromEntries(
  routes.filter((r) => r.prerender).map((r) => [r.path, modules[`./pages/${r.page}.jsx`].default])
);

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
