import { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Phone, RotateCw } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import { PHONE_HREF, PHONE_DISPLAY } from '../data/practice';

// Fehlergrenze um die Seiteninhalte (App.jsx). Typischer Fall: Nach einem Deploy gibt es den Seiten-Code
// mit dem alten Dateinamen nicht mehr (main.jsx lädt dann einmal automatisch neu, siehe lib/chunkReload.js).
// Klappt auch das nicht, bleiben Kopf- und Fußbereich stehen und hier erscheinen „Neu laden“, der Weg zur
// Startseite und die Telefonnummer – statt eines weißen Bildschirms.
// resetKey (Pfad): ein Seitenwechsel setzt den Fehler zurück, ohne Suspense und Seitenübergang neu einzuhängen.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false, resetKey: props.resetKey };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  static getDerivedStateFromProps(props, state) {
    return props.resetKey !== state.resetKey ? { failed: false, resetKey: props.resetKey } : null;
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section aria-labelledby="error-title" className="bg-slate-50 dark:bg-slate-900">
        <Container size="narrow" className="py-16 text-center sm:py-24">
          <h1 id="error-title" className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Diese Seite konnte nicht geladen werden
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Bitte laden Sie die Seite neu – meist ist sie danach wieder da.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button icon={RotateCw} onClick={() => window.location.reload()}>Neu laden</Button>
            <Button href={import.meta.env.BASE_URL} variant="secondary" icon={Home}>Zur Startseite</Button>
          </div>
          <p className="mt-8 text-slate-600 dark:text-slate-300">
            Termine und Fragen:{' '}
            <a href={PHONE_HREF} data-cta="phone" className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap font-semibold text-brand underline underline-offset-4 dark:text-brand-300">
              <Phone size={16} aria-hidden="true" /> {PHONE_DISPLAY}
            </a>
          </p>
        </Container>
      </section>
    );
  }
}

// Variante für App.jsx (innerhalb des Routers): Fehler gilt nur für den aktuellen Pfad.
export const RouteErrorBoundary = ({ children }) => {
  const { pathname } = useLocation();
  return <ErrorBoundary resetKey={pathname}>{children}</ErrorBoundary>;
};

export default ErrorBoundary;
