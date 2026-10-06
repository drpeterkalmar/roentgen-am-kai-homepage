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
import { MAPS_ROUTE_URL, PLACEHOLDERS } from '../data/practice';

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
          <Placeholder className="mt-5">{PLACEHOLDERS.holidays}</Placeholder>
        </Card>
        <Card as="section" aria-labelledby="k-anfahrt">
          <CardTitle id="k-anfahrt">Anfahrt</CardTitle>
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
          <Placeholder className="mt-5">{PLACEHOLDERS.accessibility}</Placeholder>
        </Card>
      </div>
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
          <Placeholder className="mt-5">Praxisteam und Praxisfotos (Empfang, Wartebereich, Untersuchungsräume)</Placeholder>
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
