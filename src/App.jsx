import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AppShell from './AppShell'
import { lazyPage } from './lib/lazyPage'

// Seiten-Code je Seite erst bei Bedarf laden (lib/lazyPage.js: React.lazy mit preload)
const RoentgenGrazPage = lazyPage(() => import('./pages/RoentgenGrazPage'))
const UltraschallGrazPage = lazyPage(() => import('./pages/UltraschallGrazPage'))
const SpezialroentgenPage = lazyPage(() => import('./pages/SpezialroentgenPage'))
const ZahnroentgenDvtPage = lazyPage(() => import('./pages/ZahnroentgenDvtPage'))
const MammographiePage = lazyPage(() => import('./pages/MammographiePage'))
const KnochendichtePage = lazyPage(() => import('./pages/KnochendichtePage'))
const PhlebographiePage = lazyPage(() => import('./pages/PhlebographiePage'))
const KoerperanalysePage = lazyPage(() => import('./pages/KoerperanalysePage'))
const ImpressumPage = lazyPage(() => import('./pages/ImpressumPage'))
const DatenschutzPage = lazyPage(() => import('./pages/DatenschutzPage'))
const KalmarPage = lazyPage(() => import('./pages/KalmarPage'))
const RieglerPage = lazyPage(() => import('./pages/RieglerPage'))
const WeitereUntersuchungenPage = lazyPage(() => import('./pages/WeitereUntersuchungenPage'))
const GesundheitszielePage = lazyPage(() => import('./pages/GesundheitszielePage'))
const WechseljahrePage = lazyPage(() => import('./pages/goals/WechseljahrePage'))
const AbnehmenPage = lazyPage(() => import('./pages/goals/AbnehmenPage'))
const AbnehmspritzePage = lazyPage(() => import('./pages/goals/AbnehmspritzePage'))
const FitnessPage = lazyPage(() => import('./pages/goals/FitnessPage'))
const AelterWerdenPage = lazyPage(() => import('./pages/goals/AelterWerdenPage'))
const SarkopeniePage = lazyPage(() => import('./pages/goals/SarkopeniePage'))
const SportPage = lazyPage(() => import('./pages/goals/SportPage'))
const RatgeberPage = lazyPage(() => import('./pages/RatgeberPage'))
const ArticlePage = lazyPage(() => import('./pages/ArticlePage'))
const NotFoundPage = lazyPage(() => import('./pages/NotFoundPage'))
const KontaktPage = lazyPage(() => import('./pages/KontaktPage'))

// Vorgerenderte Seiten (routes.js: prerender) – main.jsx lädt ihren Code vor der Hydration (preload)
export const PRERENDERED_PAGES = {
  '/weitere-untersuchungen': WeitereUntersuchungenPage,
  '/roentgen-graz': RoentgenGrazPage,
  '/ultraschall-graz': UltraschallGrazPage,
  '/spezialroentgen': SpezialroentgenPage,
  '/zahnroentgen-dvt-graz': ZahnroentgenDvtPage,
  '/unser-angebot/phlebographie': PhlebographiePage,
}

// prerendered: Seite kommt vorgerendert (entry-server.jsx) und wird hydriert – gleiches Markup wie beim Vorrendern
function App({ prerendered = false }) {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppShell prerendered={prerendered}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Weitere Untersuchungen (04.10.2026): vier Hauptseiten; alte Adressen leiten weiter (postbuild.mjs) */}
          <Route path="/roentgen-graz" element={<RoentgenGrazPage />} />
          <Route path="/ultraschall-graz" element={<UltraschallGrazPage />} />
          <Route path="/spezialroentgen" element={<SpezialroentgenPage />} />
          <Route path="/zahnroentgen-dvt-graz" element={<ZahnroentgenDvtPage />} />
          <Route path="/unser-angebot/roentgen" element={<Navigate to="/roentgen-graz" replace />} />
          <Route path="/unser-angebot/ultraschall" element={<Navigate to="/ultraschall-graz" replace />} />
          <Route path="/unser-angebot/dvt" element={<Navigate to="/zahnroentgen-dvt-graz" replace />} />
          <Route path="/unser-angebot/digitales-roentgen/*" element={<Navigate to="/roentgen-graz" replace />} />
          <Route path="/mammographie-graz" element={<MammographiePage />} />
          {/* alte Adressen → dauerhaft neue Seite (statisch: scripts/postbuild.mjs) */}
          <Route path="/unser-angebot/mammographie" element={<Navigate to="/mammographie-graz" replace />} />
          <Route path="/unser-angebot/mammographie/mammascreening" element={<Navigate to="/mammographie-graz" replace />} />
          <Route path="/knochendichtemessung-graz" element={<KnochendichtePage />} />
          <Route path="/unser-angebot/knochendichte" element={<Navigate to="/knochendichtemessung-graz" replace />} />
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
      </AppShell>
    </Router>
  )
}

export default App
