import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import SchemaMarkup from './components/SchemaMarkup'
import MobileActions from './components/MobileActions'

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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [highContrast, setHighContrast] = React.useState(false);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <Router>
      <ScrollToTop />
      <SchemaMarkup />
      <div className="min-h-screen bg-transparent selection:bg-red-100 selection:text-[#8B2323]">
        <Navbar highContrast={highContrast} setHighContrast={setHighContrast} />
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
