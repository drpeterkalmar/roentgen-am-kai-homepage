import { Link } from 'react-router-dom';
import { ArrowRight, Phone, HelpCircle, CreditCard, FileCheck, HeartPulse } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ServiceCard from '../components/ui/ServiceCard';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import CTASection from '../components/ui/CTASection';
import Button, { buttonClasses } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/Heading';
import { BookingButton, PhoneButton } from '../components/ui/BookingButtons';
import { ContactDetails, OpeningHours, Directions } from '../components/ui/PracticeInfo';
import { INSURANCE_SUMMARY } from '../components/ui/ReferralInfo';
import { badgesFor } from '../components/ServiceGrid';
import { AreaCard } from '../components/exams/ExamParts';
import { Scan, Waves, Monitor } from 'lucide-react';
import { ToothIcon } from '../components/CustomIcons';
import PatientPortal from '../components/PatientPortal';
import { services } from '../data/services';
import { SCREENING_HOME_LINE, SCREENING_HOME_CARD } from '../data/screening';
import { IMAGE_BRIEFS } from '../data/imageBriefs';
import { goals } from '../data/goals';
import { PHONE_HREF, PHONE_DISPLAY, OPENING_HOURS_SHORT, MAPS_ROUTE_URL, ADDRESS } from '../data/practice';
import Picture, { imageUrl, imageSrcSet } from '../components/ui/Picture';
import { listDE } from '../lib/text';

const AREA_ICONS = { roentgen: Scan, ultraschall: Waves, spezialroentgen: Monitor, zahn: ToothIcon };

// Vorhandene Praxisfotos (AVIF mit Handy-/Tablet-Varianten aus scripts/optimize-images.js)
const Photo = ({ name, alt = '', sizes = '(max-width: 767px) 100vw, 400px' }) => (
  <Picture name={name} sizes={sizes} alt={alt} width="800" height="500" className="aspect-[16/10] w-full object-cover" />
);

const hours = OPENING_HOURS_SHORT;
const ONLINE = listDE(Object.values(services).filter((s) => s.onlineBooking).map((s) => s.short));

// Die drei Schwerpunkte (Texte von der Praxis vorgegeben, 26.09.2026)
const FEATURED = [
  {
    key: 'mammographie',
    title: 'Mammographie & Brustgesundheit',
    text: SCREENING_HOME_CARD,
    cta: 'Mammographie-Termin buchen',
    // Freigegebenes Foto des realen Geräts fehlt noch (bisheriges Bild zeigt vermutlich ein Fremdgerät)
    media: <ImagePlaceholder brief={IMAGE_BRIEFS.mammoDevice} className="aspect-[16/10] border-0 border-b-2" />,
  },
  {
    key: 'knochendichte',
    title: 'Knochendichtemessung mit DEXA',
    text: 'Osteoporose früh erkennen – besonders wichtig ab der Lebensmitte und bei erhöhtem Risiko.',
    cta: 'Zur Knochendichte',
    media: <Photo name="knochendichte_v3" />,
  },
  {
    key: 'koerperanalyse',
    title: 'Körperanalyse mit DEXA',
    text: 'Körperfett und Muskelmasse präzise messen – mit regionaler Auswertung und für Verlaufskontrollen.',
    cta: 'Zur Körperanalyse',
    media: (
      <ImagePlaceholder
        className="aspect-[16/10] border-0 border-b-2"
        motif="DEXA-Körperanalyse in der Praxis: Person in Sportkleidung liegt auf dem DEXA-Messtisch, Mitarbeiterin daneben; heller Raum, Querformat 16:10."
      />
    ),
  },
];

const StepTitle = ({ children }) => (
  <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{children}</h3>
);

const Home = () => (
  <>
    {/* 1. Hero: Angebot + Terminbuchung im ersten Bildschirm */}
    <Hero
      title="Moderne Radiologie in Graz – rasch, persönlich und präzise"
      lead="Mammographie, Knochendichte, DEXA-Körperanalyse, Röntgen und Ultraschall. Alle Kassen und privat."
      actions={
        <>
          <BookingButton size="lg" label="Termin online buchen" />
          <Button href="#ziele" variant="secondary" size="lg" icon={HelpCircle}>
            Welche Untersuchung brauche ich?
          </Button>
        </>
      }
      meta={
        <div className="flex flex-col gap-1">
          <a
            href={PHONE_HREF}
            className="inline-flex min-h-[44px] items-center gap-2 self-start text-base font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-brand dark:text-white dark:decoration-slate-600 dark:hover:text-brand-300"
          >
            <Phone size={18} aria-hidden="true" className="text-brand dark:text-brand-300" />
            Telefonisch: {PHONE_DISPLAY}
          </a>
          <span>{hours} Uhr</span>
          <span>{ADDRESS.street}, {ADDRESS.zip} {ADDRESS.city}</span>
        </div>
      }
      image={{
        // identisch zum Preload in index.html (srcset/sizes), sonst lädt der Browser doppelt
        src: imageUrl('hero-slide-1'),
        srcSet: imageSrcSet('hero-slide-1'),
        sizes: '(max-width: 1023px) 100vw, 50vw',
        alt: 'Eingang der Ordination Röntgen am Kai in der Körösistraße 9, Graz',
        width: 800,
        height: 600,
        priority: true,
      }}
    />

    {/* 2. Drei Schwerpunkte */}
    <Section id="services" labelledBy="schwerpunkte-title">
      <SectionHeading id="schwerpunkte-title" eyebrow="Unsere Schwerpunkte" title="Vorsorge und Diagnostik" className="!mb-6" />
      <p className="mb-10 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-slate-800 dark:border-brand-900 dark:bg-slate-900 dark:text-slate-100">
        <HeartPulse size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
        <span>
          {SCREENING_HOME_LINE}{' '}
          <Link to="/mammographie-graz#screening" className="whitespace-nowrap font-semibold text-brand underline underline-offset-4 dark:text-brand-300">Mehr erfahren</Link>
        </span>
      </p>
      <ul className="grid gap-6 md:grid-cols-3">
        {FEATURED.map((f) => (
          <li key={f.key}>
            <ServiceCard
              title={f.title}
              description={f.text}
              href={services[f.key].href}
              media={f.media}
              badges={badgesFor(services[f.key])}
              linkLabel={f.cta}
              featured
            />
          </li>
        ))}
      </ul>
    </Section>

    {/* 3. Weitere Untersuchungen */}
    <Section tone="muted" labelledBy="weitere-title">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading id="weitere-title" title="Weitere Untersuchungen" className="!mb-0" />
        <Link to="/weitere-untersuchungen" className={buttonClasses({ variant: 'ghost', className: '-ml-3 self-start sm:ml-0 sm:self-auto' })}>
          Alle Untersuchungen <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {['roentgen', 'ultraschall', 'spezialroentgen', 'zahn'].map((k) => (
          <li key={k}><AreaCard area={k} icon={AREA_ICONS[k]} /></li>
        ))}
      </ul>
    </Section>

    {/* 4. Was möchten Sie erreichen? (Ziel des Hero-Buttons „Welche Untersuchung brauche ich?“) */}
    <Section id="ziele" labelledBy="ziele-title">
      <SectionHeading
        id="ziele-title"
        eyebrow="Welche Untersuchung brauche ich?"
        title="Was möchten Sie erreichen?"
        lead="Wählen Sie Ihr Anliegen – hier finden Sie die passende Untersuchung."
      />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((g) => (
          <li key={g.id}>
            <Card className="flex h-full flex-col">
              <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{g.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{g.text}</p>
              {g.goalPath && (
                <p className="pt-3">
                  <Link to={g.goalPath} data-cta="goal" data-cta-service={g.id} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-slate-900 underline underline-offset-4 hover:text-brand dark:text-white dark:hover:text-brand-300">
                    Mehr zum Gesundheitsziel<span className="sr-only">: {g.title}</span> <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </p>
              )}
              <ul className="mt-auto pt-2" aria-label={`Passende Untersuchungen: ${g.title}`}>
                {g.services.map((k) => (
                  <li key={k}>
                    <Link
                      to={services[k].href}
                      className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300"
                    >
                      {services[k].short} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
        <li>
          <Card tone="brand" className="flex h-full flex-col">
            <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Noch unsicher?</h3>
            <p className="mt-2 text-slate-700 dark:text-slate-200">Rufen Sie uns an – wir helfen Ihnen gerne weiter.</p>
            <div className="mt-auto pt-5">
              <PhoneButton variant="primary" />
            </div>
          </Card>
        </li>
      </ul>
    </Section>

    {/* 5. Ablauf von Termin bis Befund */}
    <Section tone="muted" labelledBy="ablauf-title">
      <SectionHeading id="ablauf-title" eyebrow="So läuft es ab" title="Vom Termin bis zum Befund" />
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            t: 'Termin vereinbaren',
            d: (
              <>
                Online für {ONLINE}. Alle Untersuchungen auch telefonisch unter{' '}
                <a href={PHONE_HREF} className="whitespace-nowrap font-semibold text-brand underline underline-offset-4 dark:text-brand-300">{PHONE_DISPLAY}</a>.
              </>
            ),
          },
          {
            t: 'Vorbereiten',
            d: 'Bitte e-Card, Überweisung (falls nötig) und Voraufnahmen mitbringen. Hinweise zur Vorbereitung finden Sie bei der jeweiligen Untersuchung.',
          },
          {
            t: 'Untersuchung',
            d: 'Nach der Anmeldung an der Rezeption folgt Ihre Untersuchung. Für die Körperanalyse planen Sie etwa 20 Minuten ein.',
          },
          {
            t: 'Befund',
            d: 'Ihre Aufnahmen werden digital befundet und archiviert und stehen Ihrem Haus- oder Facharzt rasch zur Verfügung. Ihre Bilder und Befunde sind zusätzlich über ELGA sowie online unter portal.marc.at verfügbar.',
          },
        ].map((step, i) => (
          <li key={step.t}>
            <Card className="h-full">
              <span aria-hidden="true" className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white">
                {i + 1}
              </span>
              <StepTitle>
                <span className="sr-only">Schritt {i + 1}: </span>
                {step.t}
              </StepTitle>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{step.d}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>

    <PatientPortal />

    {/* 6. Vertrauen: Praxis, Team, Technik, Kassen, ELGA */}
    <Section labelledBy="vertrauen-title">
      <SectionHeading id="vertrauen-title" eyebrow="Röntgen am Kai" title="Ihre Radiologie im Zentrum von Graz" />
      <ul className="grid gap-6 md:grid-cols-3">
        <li>
          <Card padding="p-0" className="h-full overflow-hidden">
            <Photo name="hero_interior" alt="Heller Wartebereich der Ordination Röntgen am Kai" />
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Unsere Praxis</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Zentral in der {ADDRESS.street} – mit Tiefgarage im Haus und guter Anbindung an Straßenbahn und Bus.
              </p>
            </div>
          </Card>
        </li>
        <li>
          <Card padding="p-0" className="h-full overflow-hidden">
            <Photo name="team-2025" alt="Priv. Doz. Dr. Georg Riegler und Priv. Doz. Dr. Peter Kalmar" />
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Unser Team</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                <Link to="/unser-team/dr-georg-riegler" className="font-semibold text-brand underline underline-offset-4 dark:text-brand-300">Priv. Doz. Dr. Georg Riegler</Link>{' '}
                und{' '}
                <Link to="/unser-team/dr-peter-kalmar" className="font-semibold text-brand underline underline-offset-4 dark:text-brand-300">Priv. Doz. Dr. Peter Kalmar</Link>,
                Fachärzte für Radiologie.
              </p>
            </div>
          </Card>
        </li>
        <li>
          <Card padding="p-0" className="h-full overflow-hidden">
            <Photo name="knochendichte_v3" alt="Gerät zur DEXA-Messung in der Ordination Röntgen am Kai" />
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Moderne Technik</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Röntgen und Mammographie in digitaler Technik, DEXA und Ultraschall – befundet von Fachärzten für Radiologie.
              </p>
            </div>
          </Card>
        </li>
      </ul>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        <li>
          <Card className="flex h-full gap-4">
            <CreditCard size={28} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" />
            <div>
              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Alle Kassen</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{INSURANCE_SUMMARY}</p>
            </div>
          </Card>
        </li>
        <li>
          <Card className="flex h-full gap-4">
            <FileCheck size={28} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" />
            <div>
              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">ELGA</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Ihre Bilder und Befunde sind über ELGA sowie online unter portal.marc.at verfügbar.
              </p>
            </div>
          </Card>
        </li>
      </ul>
    </Section>

    {/* 7. Anfahrt und Kontakt */}
    <Section tone="muted" id="kontakt" labelledBy="kontakt-title">
      <SectionHeading id="kontakt-title" title="Anfahrt und Kontakt" lead={`Röntgen am Kai, ${ADDRESS.street}, ${ADDRESS.zip} ${ADDRESS.city}`} />
      <div className="grid gap-5 lg:grid-cols-3">
        <Card as="section" aria-labelledby="hk-kontakt">
          <h3 id="hk-kontakt" className="mb-5 font-display text-xl font-semibold text-slate-900 dark:text-white">Kontakt</h3>
          <ContactDetails />
          <div className="mt-6">
            <BookingButton block />
          </div>
        </Card>
        <Card as="section" aria-labelledby="hk-zeiten">
          <h3 id="hk-zeiten" className="mb-5 font-display text-xl font-semibold text-slate-900 dark:text-white">Öffnungszeiten</h3>
          <OpeningHours />
        </Card>
        <Card as="section" aria-labelledby="hk-anfahrt">
          <h3 id="hk-anfahrt" className="mb-5 font-display text-xl font-semibold text-slate-900 dark:text-white">Anfahrt</h3>
          <a href={MAPS_ROUTE_URL} target="_blank" rel="noopener noreferrer" className="mb-5 block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <img
              src={imageUrl('footer-map')}
              alt="Lageplan: Körösistraße 9, 8010 Graz – Route in Google Maps öffnen (neues Fenster)"
              loading="lazy"
              width="400"
              height="150"
              className="h-[140px] w-full object-cover"
            />
          </a>
          <Directions />
        </Card>
      </div>
      <p className="mt-8">
        <Link to="/kontakt" className={buttonClasses({ variant: 'ghost', className: '-ml-3' })}>
          Mehr zu Praxis und Anfahrt <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </p>
    </Section>

    {/* 8. Abschließender Termin-Aufruf */}
    <CTASection id="cta-title" title="Termin vereinbaren" text="Buchen Sie Ihren Termin online oder rufen Sie uns an." />
  </>
);

export default Home;
