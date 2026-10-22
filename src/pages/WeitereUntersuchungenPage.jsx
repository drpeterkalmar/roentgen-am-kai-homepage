import { Link } from 'react-router-dom';
import { Scan, Waves, Monitor, ArrowRight } from 'lucide-react';
import { ToothIcon } from '../components/CustomIcons';
import RadiationComparison from '../components/explainers/RadiationComparison';
import Hero from '../components/ui/Hero';
import { imageUrl, imageSrcSet } from '../components/ui/Picture';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Notice from '../components/ui/Notice';
import { SectionHeading } from '../components/ui/Heading';
import { StatusBadge, AppointmentActions, AreaCard, RadiationInfo } from '../components/exams/ExamParts';
import { AREAS, EXAMS_CRUMB, RADIATION_BY_AREA, XRAY_HOURS_NOTE, WALK_IN, APPOINTMENT_REQUIRED } from '../data/examinations';
import { OPENING_HOURS_SHORT, PHONE_DISPLAY } from '../data/practice';
import { PhoneButton } from '../components/ui/BookingButtons';
import { buttonClasses } from '../components/ui/Button';

// /weitere-untersuchungen – Übersicht, gegliedert nach der Terminlogik:
//   1. Ohne vorherige Terminvereinbarung (Röntgen – immer mit Zuweisung und e-card)
//   2. Termin erforderlich (Ultraschall, Spezialröntgen, Zahnröntgen und 3D-DVT)
const ICONS = { ultraschall: Waves, spezialroentgen: Monitor, zahn: ToothIcon };
const hours = OPENING_HOURS_SHORT + ' Uhr';

const WeitereUntersuchungenPage = () => {
  const xray = AREAS.roentgen;
  return (
    <>
      <Hero
        breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: EXAMS_CRUMB }]}
        // Echtes Praxisfoto (B015 Ultraschallgerät). Röntgenraum (B014) und Durchleuchtung (B016) gibt es noch nicht als
        // Foto – sobald vorhanden, hier das passendere Motiv (oder eine ruhige Collage) einsetzen.
        image={{
          src: imageUrl('ultraschall-geraet'),
          srcSet: imageSrcSet('ultraschall-geraet'),
          sizes: '(max-width: 1023px) 100vw, 50vw',
          alt: 'Ultraschallgerät mit Schallköpfen und Bedienpult in einem Untersuchungsraum von Röntgen am Kai in Graz',
          width: 1920,
          height: 1440,
          priority: true,
        }}
        mobileEarly
        title="Weitere radiologische Untersuchungen in Graz"
        lead="Vom unkomplizierten Röntgen ohne vorherige Terminvereinbarung bis zu Ultraschall, Spezialröntgen und 3D-Aufnahmen von Zähnen und Kiefer: Hier finden Sie die passende Untersuchung und den richtigen Buchungsweg."
      >
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:gap-8">
          <StatusBadge area={xray} text={`Röntgen: ${WALK_IN.badge.replace(/^O/, 'o')}`} />
          <StatusBadge area={AREAS.ultraschall} text={`Ultraschall, Spezialröntgen und DVT: ${APPOINTMENT_REQUIRED.badge}`} />
        </div>
        {/* Buchungsweg im ersten Bildschirm (Audit W11) – nach den Statuszeilen, damit „ohne Termin“
            direkt neben „mit Zuweisung und e-card“ steht */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PhoneButton variant="primary" size="lg" label={`Termin telefonisch: ${PHONE_DISPLAY.replace(/ /g, '\u00A0')}`} />
          <Link to={AREAS.roentgen.path} className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
            Röntgen: direkt vorbeikommen <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Hero>

      {/* 1. Ohne vorherige Terminvereinbarung */}
      <Section labelledBy="ohne-termin-title" spacing="sm" className="!pt-10 sm:!pt-14">
        <SectionHeading id="ohne-termin-title" title="Ohne vorherige Terminvereinbarung" className="!mb-6" />
        <article
          aria-labelledby="karte-roentgen"
          className="rounded-2xl border-2 border-brand-200 bg-white p-6 shadow-md dark:border-brand-800 dark:bg-slate-900 sm:p-8 lg:p-10"
          data-area="roentgen"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <div aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand dark:bg-brand-950 dark:text-brand-300">
                  <Scan size={28} />
                </div>
                <h3 id="karte-roentgen" className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  {xray.title}
                </h3>
              </div>
              <StatusBadge area={xray} className="mt-5" />
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-200">{xray.overviewText}</p>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">Röntgenzeiten: {hours}</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-200" data-xray-hours>{XRAY_HOURS_NOTE}</p>
            </div>
            <div className="lg:justify-self-end">
              <AppointmentActions area={xray} size="lg" />
              <p className="mt-4">
                <Link to={xray.path} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
                  Alles zum Röntgen in Graz <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </p>
            </div>
          </div>
        </article>
      </Section>

      {/* 2. Termin erforderlich */}
      <Section labelledBy="mit-termin-title" tone="muted" spacing="md">
        <SectionHeading
          id="mit-termin-title"
          title="Termin erforderlich"
          lead="Für diese Untersuchungen vereinbaren Sie bitte vorab einen Termin."
          className="!mb-8"
        />
        <ul className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {['ultraschall', 'spezialroentgen', 'zahn'].map((k) => (
            <li key={k}>
              <AreaCard area={k} icon={ICONS[k]} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Strahleninformation – auf der Übersicht nur die drei vorgegebenen Beispiele */}
      <Section labelledBy="strahlung-title" spacing="md">
        <RadiationComparison ids={RADIATION_BY_AREA.overview} className="!mt-0" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <RadiationInfo ids={RADIATION_BY_AREA.overview} ultrasound />
          <div id="kein-ct-mrt" className="self-start">
            <Notice tone="info" title="Kein CT und kein MRT" headingLevel={2}>
              Wir bieten kein CT und kein MRT an. Wir empfehlen hierfür z. B. das nahegelegene Institut der Kreuzschwestern Graz.
            </Notice>
          </div>
        </div>
      </Section>

      {/* Abschluss: Terminstatus unmittelbar beim CTA */}
      <section aria-labelledby="weitere-cta-title" className="bg-brand-800 text-white" data-exam-cta="overview">
        <Container className="py-14 sm:py-16">
          <h2 id="weitere-cta-title" className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            So kommen Sie zu Ihrer Untersuchung
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/25 p-6">
              <h3 className="font-display text-xl font-semibold text-white">Röntgen</h3>
              <StatusBadge area="roentgen" tone="dark" className="mt-3" />
              <div className="mt-5"><AppointmentActions area="roentgen" tone="dark" /></div>
            </div>
            <div className="rounded-2xl border border-white/25 p-6">
              <h3 className="font-display text-xl font-semibold text-white">Ultraschall, Spezialröntgen, Zahnröntgen und DVT</h3>
              <StatusBadge area="ultraschall" tone="dark" className="mt-3" />
              <div className="mt-5">
                <AppointmentActions area={{ ...AREAS.ultraschall, key: 'weitere', phoneHint: 'die Untersuchung, die auf Ihrer Zuweisung steht' }} tone="dark" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default WeitereUntersuchungenPage;
