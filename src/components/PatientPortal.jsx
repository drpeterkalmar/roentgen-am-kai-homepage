import { Image } from 'lucide-react';
import { PORTAL_URL } from '../data/practice';
import Container from './ui/Container';

// Hinweis auf das Befund-/Bilderportal (Text und QR-Code von der Praxis freigegeben, 02.09.2026).
const PatientPortal = () => (
  <section aria-labelledby="portal-title" className="bg-white py-8 dark:bg-slate-950">
    <Container>
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row md:p-8">
        <div aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand dark:bg-brand-950 dark:text-brand-300">
          <Image size={26} />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 id="portal-title" className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Ihre Bilder und Befunde online
          </h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            Ihre Bilder und Befunde sind online verfügbar unter{' '}
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-semibold text-brand underline underline-offset-4 hover:text-brand-700 dark:text-brand-300"
            >
              portal.marc.at<span className="sr-only"> (öffnet in neuem Fenster)</span>
            </a>
          </p>
        </div>
        <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="flex shrink-0 flex-col items-center gap-1.5 rounded-xl">
          <span className="rounded-xl border border-slate-200 bg-white p-2">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/portal-qr.avif`}
              alt="QR-Code zum Patientenportal portal.marc.at"
              width="96"
              height="96"
              className="h-24 w-24"
              loading="lazy"
            />
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300">Zum Portal</span>
        </a>
      </div>
    </Container>
  </section>
);

export default PatientPortal;
