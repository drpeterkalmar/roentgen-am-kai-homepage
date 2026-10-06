import { Link } from 'react-router-dom';
import logo from '../assets/images/rak-logo-128.png';
import { MAIN_NAV, LEGAL_NAV, OTHER_EXAMS } from '../data/navigation';
import { MAPS_ROUTE_URL, PRACTICE_NAME } from '../data/practice';
import { ContactDetails, OpeningHours, Directions } from './ui/PracticeInfo';
import { BookingButton } from './ui/BookingButtons';
import { INSURANCE_SUMMARY } from './ui/ReferralInfo';

const FooterHeading = ({ id, children }) => (
  <h2 id={id} className="mb-4 font-display text-base font-semibold text-slate-900 dark:text-white">{children}</h2>
);

const linkCls = 'text-slate-700 underline-offset-4 hover:text-brand hover:underline dark:text-slate-300 dark:hover:text-brand-300';

const Footer = () => {
  const year = new Date().getFullYear();
  const mainLinks = MAIN_NAV.filter((i) => i.href !== '/');
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr] lg:px-8">
        <section aria-labelledby="f-kontakt">
          <div className="mb-5 flex items-center gap-3">
            <img src={logo} alt="" width="40" height="37" loading="lazy" className="h-10 w-auto" />
            <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">{PRACTICE_NAME}</p>
          </div>
          <FooterHeading id="f-kontakt">Kontakt</FooterHeading>
          <ContactDetails />
          <p className="mt-5 text-sm">{INSURANCE_SUMMARY}</p>
          <div className="mt-6 flex flex-col gap-3">
            <BookingButton />
          </div>
        </section>

        <section aria-labelledby="f-zeiten">
          <FooterHeading id="f-zeiten">Öffnungszeiten</FooterHeading>
          <OpeningHours />
        </section>

        <section aria-labelledby="f-anfahrt">
          <FooterHeading id="f-anfahrt">Anfahrt</FooterHeading>
          <a href={MAPS_ROUTE_URL} target="_blank" rel="noopener noreferrer" className="mb-5 block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/footer-map.avif`}
              alt="Lageplan: Körösistraße 9, 8010 Graz – Route in Google Maps öffnen (neues Fenster)"
              loading="lazy"
              width="400"
              height="150"
              className="h-[140px] w-full object-cover"
            />
          </a>
          <Directions />
        </section>

        <nav aria-labelledby="f-nav">
          <FooterHeading id="f-nav">Übersicht</FooterHeading>
          <ul className="space-y-2.5">
            {mainLinks.map((i) => (
              <li key={i.href}><Link to={i.href} className={linkCls}>{i.name}</Link></li>
            ))}
          </ul>
          <p id="f-weitere" className="mb-3 mt-6 text-sm font-semibold text-slate-900 dark:text-white">Weitere Untersuchungen</p>
          <ul aria-labelledby="f-weitere" className="space-y-2.5 text-sm">
            {OTHER_EXAMS.map((i) => (
              <li key={i.href}><Link to={i.href} className={linkCls}>{i.name}</Link></li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          {/* Jahr beim Vorrendern = Build-Jahr; nach einem Jahreswechsel übernimmt der Browser das aktuelle ohne Hydration-Fehler */}
          <p suppressHydrationWarning>© {year} {PRACTICE_NAME}</p>
          <p className="max-w-xl">
            Wir bieten kein CT und kein MRT an. Wir empfehlen hierfür z. B. das nahegelegene{' '}
            <a href="https://kreuzschwestern-graz.at/ct-mr-zentrum/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-brand dark:hover:text-brand-300">
              Institut der Kreuzschwestern Graz<span className="sr-only"> (öffnet in neuem Fenster)</span>
            </a>.
          </p>
          <ul className="flex gap-5">
            {LEGAL_NAV.map((l) => (
              <li key={l.href}><Link to={l.href} className="font-medium underline underline-offset-4 hover:text-brand dark:hover:text-brand-300">{l.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
