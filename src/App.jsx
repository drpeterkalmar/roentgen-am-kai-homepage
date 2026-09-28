import React, { useEffect, lazy, Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import SchemaMarkup from './components/SchemaMarkup'
import MobileActions from './components/MobileActions'
import ScrollToHash from './components/ScrollToHash'
import RouteMeta from './components/RouteMeta'
import PageTransition from './components/PageTransition'

// Lazy loaded pages
const RoentgenPage = lazy(() => import('./pages/RoentgenPage'))
const UltraschallPage = lazy(() => import('./pages/UltraschallPage'))
const MammographiePage = lazy(() => import('./pages/MammographiePage'))
const KnochendichtePage = lazy(() => import('./pages/KnochendichtePage'))
const DVTPage = lazy(() => import('./pages/DVTPage'))
const PhlebographiePage = lazy(() => import('./pages/PhlebographiePage'))
const KoerperanalysePage = lazy(() => import('./pages/KoerperanalysePage'))
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'))
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'))
const KalmarPage = lazy(() => import('./pages/KalmarPage'))
const RieglerPage = lazy(() => import('./pages/RieglerPage'))
const WeitereUntersuchungenPage = lazy(() => import('./pages/WeitereUntersuchungenPage'))
const GesundheitszielePage = lazy(() => import('./pages/GesundheitszielePage'))
const WechseljahrePage = lazy(() => import('./pages/goals/WechseljahrePage'))
const AbnehmenPage = lazy(() => import('./pages/goals/AbnehmenPage'))
const AbnehmspritzePage = lazy(() => import('./pages/goals/AbnehmspritzePage'))
const FitnessPage = lazy(() => import('./pages/goals/FitnessPage'))
const AelterWerdenPage = lazy(() => import('./pages/goals/AelterWerdenPage'))
const SarkopeniePage = lazy(() => import('./pages/goals/SarkopeniePage'))
const SportPage = lazy(() => import('./pages/goals/SportPage'))
const RatgeberPage = lazy(() => import('./pages/RatgeberPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const KontaktPage = lazy(() => import('./pages/KontaktPage'))

// ScrollToTop removed in favor of ScrollToHash

function App() {
  const [highContrast, setHighContrast] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Nur die CSS-Klasse setzen. Gespeichert wird ausschließlich nach aktivem Umschalten
  // (toggleTheme) – kein localStorage-Eintrag ohne Nutzeraktion (§ 165 Abs 3 TKG 2021).
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* privater Modus */ }
      return next;
    });
  };

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToHash />
      <RouteMeta />
      <SchemaMarkup />
      <div className="flex min-h-screen flex-col bg-white pb-[calc(56px+env(safe-area-inset-bottom))] text-slate-800 dark:bg-slate-950 dark:text-slate-200 md:pb-0">
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
          {/* bildschirmhoch: Solange der Seiten-Code lädt, bleibt der Footer unter dem sichtbaren Bereich.
              Mit 60vh sprang er beim Nachladen nach unten (Lighthouse: CLS 0,21–0,31 auf Unterseiten). */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/unser-angebot/roentgen" element={<RoentgenPage />} />
              <Route path="/unser-angebot/ultraschall" element={<UltraschallPage />} />
              <Route path="/mammographie-graz" element={<MammographiePage />} />
              {/* alte Adressen → dauerhaft neue Seite (statisch: scripts/postbuild.mjs) */}
              <Route path="/unser-angebot/mammographie" element={<Navigate to="/mammographie-graz" replace />} />
              <Route path="/unser-angebot/mammographie/mammascreening" element={<Navigate to="/mammographie-graz" replace />} />
              <Route path="/knochendichtemessung-graz" element={<KnochendichtePage />} />
              <Route path="/unser-angebot/knochendichte" element={<Navigate to="/knochendichtemessung-graz" replace />} />
              <Route path="/unser-angebot/dvt" element={<DVTPage />} />
              <Route path="/unser-angebot/phlebographie" element={<PhlebographiePage />} />
              <Route path="/koerperanalyse-graz" element={<KoerperanalysePage />} />
              <Route path="/unser-angebot/koerperfettmessung" element={<Navigate to="/koerperanalyse-graz" replace />} />
              <Route path="/weitere-untersuchungen" element={<WeitereUntersuchungenPage />} />
              <Route path="/gesundheitsziele" element={<GesundheitszielePage />} />
              <Route path="/gesundheitsziele/frauengesundheit-wechseljahre" element={<WechseljahrePage />} />
              <Route path="/gesundheitsziele/gesund-abnehmen" element={<AbnehmenPage />} />
              <Route path="/gesundheitsziele/abnehmspritze-koerperanalyse" element={<AbnehmspritzePage />} />
              <Route path="/gesundheitsziele/fitness-muskelaufbau" element={<FitnessPage />} />
              <Route path="/gesundheitsziele/gesund-aelter-werden" element={<AelterWerdenPage />} />
              <Route path="/gesundheitsziele/muskelverlust-sarkopenie" element={<SarkopeniePage />} />
              <Route path="/gesundheitsziele/dexa-sportler-red-s" element={<SportPage />} />
              <Route path="/ratgeber" element={<RatgeberPage />} />
              <Route path="/ratgeber/:slug" element={<ArticlePage />} />
              <Route path="/kontakt" element={<KontaktPage />} />
              <Route path="/impressum" element={<ImpressumPage />} />
              <Route path="/datenschutz" element={<DatenschutzPage />} />
              <Route path="/unser-team/dr-peter-kalmar" element={<KalmarPage />} />
              <Route path="/unser-team/dr-georg-riegler" element={<RieglerPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </PageTransition>
          </Suspense>
        </main>
        <Footer />
        <MobileActions />
      </div>
    </Router>
  )
}

export default App
