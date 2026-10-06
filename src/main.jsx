import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { preloadPrerenderedPage } from './routes'
import './index.css'
import { installCtaTracking } from './lib/ctaTracking'
import { installChunkReload } from './lib/chunkReload'

installCtaTracking()

// Seiten-Code nach einem Deploy nicht mehr vorhanden → einmal neu laden, sonst Fehlergrenze (lib/chunkReload.js)
installChunkReload()

const root = document.getElementById('root')
const app = (prerendered) => (
  <React.StrictMode>
    <App prerendered={prerendered} />
  </React.StrictMode>
)

if (root.querySelector('[data-prerendered]')) {
  // Vorgerenderte Seite (entry-server.jsx): erst den Seiten-Code laden, dann das vorhandene HTML übernehmen
  // (hydrateRoot) – kein Neuaufbau, kein Weißblitz zwischen JavaScript-Start und Seiten-Code.
  const path = ('/' + window.location.pathname.slice(import.meta.env.BASE_URL.length)).replace(/\/+$/, '') || '/'
  Promise.resolve(preloadPrerenderedPage(path))
    .catch(() => { /* Ladefehler zeigt die Fehlergrenze bzw. lib/chunkReload.js */ })
    .then(() => ReactDOM.hydrateRoot(root, app(true)))
} else {
  ReactDOM.createRoot(root).render(app(false))
}
