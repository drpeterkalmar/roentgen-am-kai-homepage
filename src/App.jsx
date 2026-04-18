import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import RoentgenPage from './pages/RoentgenPage'
import UltraschallPage from './pages/UltraschallPage'
import MammographiePage from './pages/MammographiePage'
import KnochendichtePage from './pages/KnochendichtePage'
import DVTPage from './pages/DVTPage'
import PhlebographiePage from './pages/PhlebographiePage'
import KoerperfettPage from './pages/KoerperfettPage'
import ImpressumPage from './pages/ImpressumPage'
import DatenschutzPage from './pages/DatenschutzPage'
import SchemaMarkup from './components/SchemaMarkup'
import MobileActions from './components/MobileActions'

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
      <div className="min-h-screen bg-white selection:bg-red-100 selection:text-[#8B2323]">
        <Navbar highContrast={highContrast} setHighContrast={setHighContrast} />
        <main>
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
          </Routes>
        </main>
        <Footer />
        <MobileActions />
      </div>
    </Router>
  )
}

export default App
