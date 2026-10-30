import { Link } from 'react-router-dom';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Placeholder from '../components/ui/Placeholder';
import CTASection from '../components/ui/CTASection';
import { SectionHeading } from '../components/ui/Heading';
import { BookingButton, PhoneButton } from '../components/ui/BookingButtons';
import { ContactDetails, OpeningHours, Directions } from '../components/ui/PracticeInfo';
import ReferralInfo from '../components/ui/ReferralInfo';
import PatientPortal from '../components/PatientPortal';
import { MAPS_ROUTE_URL, MAPS_PLACE_URL, HOLIDAYS, ACCESSIBILITY, CANCELLATION, PHONE_DISPLAY, PHONE_HREF } from '../data/practice';
import Picture from '../components/ui/Picture';
import { IMAGE_BRIEFS } from '../data/imageBriefs';

const CardTitle = ({ id, children }) => (
  <h2 id={id} className="mb-5 font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{children}</h2>
);

const KontaktPage = () => (
  <>
    <Hero
      breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Praxis und Kontakt' }]}
      title="Praxis und Kontakt"
      lead="Röntgen am Kai – Fachärzte für Radiologie, Körösistraße 9, 8010 Graz."
      actions={<><BookingButton size="lg" /><PhoneButton size="lg" /></>}
    />

    <Section labelledBy="kontakt-title">
      <h2 id="kontakt-title" className="sr-only">Kontakt, Öffnungszeiten und Anfahrt</h2>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card as="section" aria-labelledby="k-kontakt">
          <CardTitle id="k-kontakt">Kontakt</CardTitle>
          <ContactDetails />
        </Card>
        <Card as="section" aria-labelledby="k-zeiten">
          <CardTitle id="k-zeiten">Öffnungszeiten</CardTitle>
          <OpeningHours />
          <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-700" data-holidays>
            <h3 className="mb-2 font-display text-base font-semibold text-slate-900 dark:text-white">{HOLIDAYS.title}</h3>
            <p className="text-slate-700 dark:text-slate-300">{HOLIDAYS.text}</p>
            <p className="mt-2">
              <a href={MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold text-brand underline underline-offset-4 dark:text-brand-300">
                {HOLIDAYS.linkLabel}<span className="sr-only"> (öffnet in neuem Fenster)</span>
              </a>
            </p>
          </div>
        </Card>
        <Card as="section" aria-labelledby="k-anfahrt">
          <CardTitle id="k-anfahrt">Anfahrt</CardTitle>
          {/* Praxisfoto B019 (Übergang: Außenansicht mit Praxisschild) */}
          <figure className="mb-5" data-photo="aussenansicht-koerosistrasse">
            <Picture
              name="aussenansicht-koerosistrasse"
              alt={IMAGE_BRIEFS.access.alt}
              width={1920}
              height={1280}
              sizes="(max-width: 1023px) 100vw, 400px"
              className="aspect-[3/2] h-auto w-full rounded-xl object-cover"
            />
            <figcaption className="mt-2 text-sm text-slate-600 dark:text-slate-300">Unser Praxisschild vor dem Haus Körösistraße 9</figcaption>
          </figure>
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
          <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-700" data-accessibility>
            <h3 className="mb-2 font-display text-base font-semibold text-slate-900 dark:text-white">{ACCESSIBILITY.title}</h3>
            <p className="text-slate-700 dark:text-slate-300">{ACCESSIBILITY.text}</p>
          </div>
        </Card>
      </div>
      <Card as="section" aria-labelledby="k-absage" className="mt-5" data-cancellation>
        <CardTitle id="k-absage">{CANCELLATION.title}</CardTitle>
        <p className="max-w-3xl text-slate-700 dark:text-slate-300">
          {CANCELLATION.beforePhone}{' '}
          <a href={PHONE_HREF} className="whitespace-nowrap font-semibold text-brand underline underline-offset-4 dark:text-brand-300">{PHONE_DISPLAY}</a>{' '}
          {CANCELLATION.afterPhone}
        </p>
      </Card>
    </Section>

    <Section tone="muted" labelledBy="kasse-title">
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 id="kasse-title" className="sr-only">Überweisung und Kasse</h2>
          <ReferralInfo headingLevel={3} />
        </Card>
        <Card>
          <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-white">Unsere Ärzte</h3>
          <ul className="space-y-2">
            <li><Link className="font-semibold text-brand underline underline-offset-4 dark:text-brand-300" to="/unser-team/dr-georg-riegler">Priv. Doz. Dr. Georg Riegler</Link> – Facharzt für Radiologie</li>
            <li><Link className="font-semibold text-brand underline underline-offset-4 dark:text-brand-300" to="/unser-team/dr-peter-kalmar">Priv. Doz. Dr. Peter Kalmar</Link> – Facharzt für Radiologie</li>
          </ul>
        </Card>
      </div>
    </Section>

    <PatientPortal />

    <Section labelledBy="praxis-title">
      <SectionHeading id="praxis-title" title="Unsere Praxis" />
      <Placeholder>Kurzvorstellung der Praxis (Text von der Praxis)</Placeholder>
    </Section>

    <CTASection />
  </>
);

export default KontaktPage;
