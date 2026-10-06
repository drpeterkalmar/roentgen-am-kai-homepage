import { Home, BookOpen, Phone } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { BookingButton } from '../components/ui/BookingButtons';
import { PHONE_HREF, PHONE_DISPLAY } from '../data/practice';

// Seite „nicht gefunden“ innerhalb der App (unbekannte Pfade bzw. unbekannte Ratgeber-Artikel).
// Statische Variante für direkte Aufrufe: dist/404.html (scripts/postbuild.mjs). RouteMeta setzt noindex.
const NotFoundPage = () => (
  <section aria-labelledby="page-title" className="bg-slate-50 dark:bg-slate-900">
    <Container size="narrow" className="py-16 text-center sm:py-24">
      <p className="text-sm font-semibold text-brand dark:text-brand-300">Fehler 404</p>
      <h1 id="page-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Seite nicht gefunden
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
        Diese Adresse gibt es auf unserer Website nicht (mehr). Vielleicht hilft Ihnen einer dieser Wege weiter:
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
        <Button to="/" icon={Home}>Zur Startseite</Button>
        <Button to="/ratgeber" variant="secondary" icon={BookOpen}>Zum Ratgeber</Button>
        <BookingButton variant="secondary" />
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

export default NotFoundPage;
