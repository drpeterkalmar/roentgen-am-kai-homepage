import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { installCtaTracking } from './lib/ctaTracking'
import { installChunkReload } from './lib/chunkReload'

installCtaTracking()

// Seiten-Code nach einem Deploy nicht mehr vorhanden → einmal neu laden, sonst Fehlergrenze (lib/chunkReload.js)
installChunkReload()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
