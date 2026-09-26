import React, { useEffect, lazy, Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import SchemaMarkup from './components/SchemaMarkup'
import MobileActions from './components/MobileActions'
import ParticleBackground from './components/ParticleBackground'
import ScrollToHash from './components/ScrollToHash'
import RouteMeta from './components/RouteMeta'

// Lazy loaded pages
const RoentgenPage = lazy(() => import('./pages/RoentgenPage'))
const UltraschallPage = lazy(() => import('./pages/UltraschallPage'))
const MammographiePage = lazy(() => import('./pages/MammographiePage'))
const KnochendichtePage = lazy(() => import('./pages/KnochendichtePage'))
const DVTPage = lazy(() => import('./pages/DVTPage'))
const PhlebographiePage = lazy(() => import('./pages/PhlebographiePage'))
const KoerperfettPage = lazy(() => import('./pages/KoerperfettPage'))
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'))
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'))
const KalmarPage = lazy(() => import('./pages/KalmarPage'))
const RieglerPage = lazy(() => import('./pages/RieglerPage'))

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
      <div 
        className="relative min-h-screen selection:bg-red-100 selection:text-[#8B2323] transition-colors duration-300 overflow-x-hidden"
      >
        {/* Background Layer */}
        <div 
          className="fixed inset-0 -z-[20] pointer-events-none transition-colors duration-300"
          style={{
            backgroundImage: `linear-gradient(var(--bg-overlay), var(--bg-overlay)), url('${import.meta.env.BASE_URL}assets/images/glass-bg.avif')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <ParticleBackground isDark={isDark} />
        <Navbar 
          highContrast={highContrast} 
          setHighContrast={setHighContrast} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />
        <main>
          <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/unser-angebot/roentgen" element={<RoentgenPage />} />
              <Route path="/unser-angebot/ultraschall" element={<UltraschallPage />} />
              <Route path="/unser-angebot/mammographie" element={<MammographiePage />} />
              <Route path="/unser-angebot/knochendichte" element={<KnochendichtePage />} />
              <Route path="/unser-angebot/dvt" element={<DVTPage />} />
              <Route path="/unser-angebot/phlebographie" element={<PhlebographiePage />} />
              <Route path="/unser-angebot/koerperfettmessung" element={<KoerperfettPage />} />
              <Route path="/impressum" element={<ImpressumPage />} />
              <Route path="/datenschutz" element={<DatenschutzPage />} />
              <Route path="/unser-team/dr-peter-kalmar" element={<KalmarPage />} />
              <Route path="/unser-team/dr-georg-riegler" element={<RieglerPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileActions />
      </div>
    </Router>
  )
}

export default App
