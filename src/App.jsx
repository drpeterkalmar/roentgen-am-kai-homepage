import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import AppShell from './AppShell'
import { ROUTE_OBJECTS } from './routes'

// Seiten, Weiterleitungen und 404 aus der zentralen Routentabelle (src/data/routes.js → src/routes.jsx)
const AppRoutes = () => useRoutes(ROUTE_OBJECTS)

// prerendered: Seite kommt vorgerendert (entry-server.jsx) und wird hydriert – gleiches Markup wie beim Vorrendern
function App({ prerendered = false }) {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppShell prerendered={prerendered}>
        <AppRoutes />
      </AppShell>
    </Router>
  )
}

export default App
