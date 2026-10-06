import { useEffect, useLayoutEffect, useMemo, useState, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SchemaMarkup from './components/SchemaMarkup'
import MobileActions from './components/MobileActions'
import RouteEffects from './components/RouteEffects'
import RouteMeta from './components/RouteMeta'
import PageTransition from './components/PageTransition'
import { RouteErrorBoundary } from './components/ErrorBoundary'
import { writeTheme } from './lib/storage'

// Seitenrahmen für den Browser (App.jsx) UND das Vorrendern (entry-server.jsx): derselbe Komponentenbaum auf
// beiden Seiten – Voraussetzung, damit vorgerenderte Seiten ohne Abweichung hydrieren (auch die useId-Werte).
// children = <Routes> mit der aktuellen Seite.

// Im Browser vor dem ersten Bild, beim Vorrendern ohne Wirkung (useLayoutEffect gibt es dort nicht)
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const AppShell = ({ prerendered = false, children }) => {
  const [highContrast, setHighContrast] = useState(false);
  // Dunkelmodus: index.html setzt die Klasse 'dark' schon vor dem ersten Bild (gespeicherte Wahl, sonst
  // Systemeinstellung – dieselbe Regel wie lib/storage.js). React beginnt wie das vorgerenderte HTML mit „hell“
  // (gleiches Markup → Hydration ohne Abweichung) und übernimmt den Wert aus der Klasse vor dem ersten Bild.
  const [isDark, setIsDark] = useState(false);
  useBrowserLayoutEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Gespeichert wird ausschließlich nach aktivem Umschalten – kein localStorage-Eintrag ohne Nutzeraktion
  // (§ 165 Abs 3 TKG 2021); der Zugriff ist abgesichert (lib/storage.js).
  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    writeTheme(next ? 'dark' : 'light');
    setIsDark(next);
  };

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Seiteninhalt hängt nicht am Dunkelmodus/Kontrast: gleiche Element-Referenz → beim Umschalten (und beim
  // Übernehmen des Dunkelmodus direkt nach der Hydration) wird die Seite nicht mitgerendert. Sonst träfe das
  // Update die noch nicht hydrierte Suspense-Grenze und React würde die Seite verwerfen und neu aufbauen.
  // Fehlergrenze: Seite lädt nicht (z. B. Chunk nach Deploy weg) → „Neu laden“ + Telefon statt weißem Bildschirm.
  // Ladeplatzhalter bildschirmhoch: Solange der Seiten-Code lädt, bleibt der Footer unter dem sichtbaren Bereich
  // (mit 60vh sprang er beim Nachladen nach unten, Lighthouse: CLS 0,21–0,31 auf Unterseiten).
  const content = useMemo(() => (
    <RouteErrorBoundary>
    <Suspense fallback={<div className="min-h-screen" />}>
      <PageTransition>
        {children}
      </PageTransition>
    </Suspense>
    </RouteErrorBoundary>
  ), [children]);

  return (
    <>
      <RouteEffects />
      <RouteMeta />
      <SchemaMarkup />
      <div data-prerendered={prerendered || undefined} className="flex min-h-screen flex-col bg-white pb-[calc(56px+env(safe-area-inset-bottom))] text-slate-800 dark:bg-slate-950 dark:text-slate-200 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-brand focus:shadow-lg"
        >
          Zum Inhalt springen
        </a>
        <Header
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {content}
        </main>
        <Footer />
        <MobileActions />
      </div>
    </>
  );
};

export default AppShell;
