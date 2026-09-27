import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse, Bone, Activity, CalendarClock } from 'lucide-react';
import {
  GoalPage, GoalHero, OnThisPage, Section, Card, Notice, SectionHeading, BookingButton, P, H3, Bullets, textLink,
  RelatedGoals, SourcesSection, MultiCTA, NewWindow, shy,
} from '../../components/goals/GoalParts';
import { SCREENING, INTERVAL_TEXT, SCREENING_ONLY_WITHOUT_SYMPTOMS } from '../../data/screening';
import { DEXA, DEXA_PRICE_TEXT, DEXA_OTHER_CARRIERS } from '../../data/dexa';
import { PHONE_HREF, PHONE_DISPLAY } from '../../data/practice';

// /gesundheitsziele/frauengesundheit-wechseljahre – Suchintention „Wechseljahre Vorsorge Graz / Frauengesundheit Graz“.
// Drei medizinisch getrennte Bereiche mit je eigener Indikation und eigenem Buchungsweg. KEIN Paket, KEINE Tomosynthese.
// Screening-Regeln aus screening.js, Knochendichte-Kosten aus dexa.js (Wortlaut Auftrag 27.09.2026).

const SCREENING_KEY_SENTENCE = `Frauen von ${SCREENING.ageFrom} bis ${SCREENING.ageTo} Jahren können bei freigeschalteter e-card ${INTERVAL_TEXT} ohne ärztliche Zuweisung und ohne Einladungsschreiben zur Screening-Mammographie kommen.`;
const DEXA_COST_SENTENCE = `Bei der ÖGK kostet die Untersuchung privat ${DEXA_PRICE_TEXT}; eine mögliche Rückerstattung ist von der Kasse abhängig. Bei den anderen in der Praxis akzeptierten Kassen (${DEXA_OTHER_CARRIERS}) wird die Leistung bei erfüllten Voraussetzungen übernommen – dazu gehört eine ärztliche Zuweisung.`;

const Area = ({ id, icon: Icon, number, title, children, tone = 'white' }) => (
  <Section id={id} tone={tone} labelledBy={`${id}-title`}>
    <div className="flex items-start gap-4">
      <span aria-hidden="true" className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand sm:flex dark:bg-slate-800 dark:text-brand-300">
        <Icon size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-brand dark:text-brand-300">Bereich {number} von 3</p>
        <h2 id={`${id}-title`} className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl dark:text-white">{shy(title)}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  </Section>
);

const WechseljahrePage = () => (
  <GoalPage>
    <GoalHero
      goalId="wechseljahre"
      eyebrow="Frauengesundheit in Graz"
      lead="Mit den Wechseljahren verändert sich der Hormonhaushalt – und damit können auch Knochen, Muskelmasse und Fettverteilung in Bewegung geraten. Für die Vorsorge rund um die Wechseljahre gibt es drei getrennte Untersuchungen mit jeweils eigener Fragestellung."
      facts={['Brustkrebs-Früherkennung', 'Knochendichtemessung', 'Körperanalyse']}
    />
    <OnThisPage items={[
      { href: '#brust', label: 'Brustgesundheit' },
      { href: '#knochen', label: 'Knochengesundheit' },
      { href: '#koerper', label: 'Körperzusammensetzung' },
      { href: '#termin', label: 'Termine' },
    ]} />

    <Section spacing="sm" labelledBy="ueberblick-title">
      <h2 id="ueberblick-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Wechseljahre-Vorsorge: welche Untersuchung wofür?</h2>
      <P className="mt-4 max-w-3xl">
        Nicht jede Frau braucht in den Wechseljahren alle drei Untersuchungen. Die Brustkrebs-Früherkennung richtet sich nach
        dem Alter, die Knochendichtemessung nach dem persönlichen Osteoporoserisiko, die Körperanalyse nach Ihrem eigenen
        Anliegen. Jede Untersuchung wird deshalb einzeln gebucht.
      </P>
    </Section>

    {/* 1. Brust */}
    <Area id="brust" icon={HeartPulse} number={1} title="Brustgesundheit: Früherkennung ohne Zuweisung" tone="muted">
      <Card tone="brand" className="max-w-3xl">
        <p className="font-display text-xl font-semibold leading-snug text-slate-900 dark:text-white">{SCREENING_KEY_SENTENCE}</p>
      </Card>
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <P>
            Das {SCREENING.programName} lädt Frauen dieser Altersgruppe regelmäßig zur Screening-Mammographie ein. Sie
            können aber auch ohne Brief kommen: Die e-card ist automatisch freigeschaltet, Sie vereinbaren lediglich einen
            Termin. Ob Sie teilnehmen, entscheiden Sie selbst.
          </P>
          <P className="mt-4">
            Frauen außerhalb dieser Altersgruppe können sich nach den aktuellen Programmregeln anmelden. Auskunft gibt die
            Serviceline des Programms unter{' '}
            <a href={SCREENING.serviceline.href} className="font-semibold text-brand underline underline-offset-4 dark:text-brand-300">{SCREENING.serviceline.display}</a>{' '}
            oder{' '}
            <a href={SCREENING.officialUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4 dark:text-brand-300">
              {SCREENING.officialUrlLabel}<NewWindow />
            </a>.
          </P>
        </div>
        <div className="flex flex-col gap-4">
          <Notice tone="important" title="Bei Beschwerden nicht auf das Screening warten" headingLevel={3}>
            <p>
              {SCREENING_ONLY_WITHOUT_SYMPTOMS} Tasten Sie einen Knoten oder bemerken Sie eine andere Veränderung der Brust,
              lassen Sie diese bitte zeitnah ärztlich abklären. Die Untersuchung erfolgt dann mit Zuweisung.
            </p>
          </Notice>
          <div className="flex flex-col gap-2">
            <BookingButton label="Screening-Mammographie buchen" service="mammographie" size="lg" />
            <Link to="/mammographie-graz" className={textLink}>
              Alles zur Mammographie in Graz <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </Area>

    {/* 2. Knochen */}
    <Area id="knochen" icon={Bone} number={2} title="Knochengesundheit nach der Menopause">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <P>
            Nach der Menopause fehlt die schützende Wirkung der Östrogene auf den Knochen. Der Knochenabbau kann dadurch
            zunehmen, und das Risiko für Osteoporose und Knochenbrüche gewinnt an Bedeutung.
          </P>
          <P className="mt-4">
            Eine Knochendichtemessung mit DEXA ist nicht für jede Frau automatisch nötig. Sie kann sinnvoll sein, wenn
            zusätzliche Risikofaktoren bestehen – zum Beispiel ein niedriges Körpergewicht, ein früherer Knochenbruch,
            Medikamente wie Cortison oder Erkrankungen, die den Knochen schwächen. Ob das bei Ihnen zutrifft, besprechen Sie
            am besten mit Ihrer Ärztin oder Ihrem Arzt.
          </P>
        </div>
        <div className="flex flex-col gap-4">
          <Card tone="muted">
            <H3>Kosten der Knochendichtemessung</H3>
            <P className="mt-2">{DEXA_COST_SENTENCE}</P>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{DEXA.askFirstText}</p>
          </Card>
          <div className="flex flex-col gap-2">
            <BookingButton label="Knochendichtemessung buchen" service="knochendichte" size="lg" />
            <Link to="/knochendichtemessung-graz" className={textLink}>
              Zur DEXA-Knochendichtemessung <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </Area>

    {/* 3. Körper */}
    <Area id="koerper" icon={Activity} number={3} title="Körperzusammensetzung: Muskelmasse und Fettverteilung" tone="muted">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <P>
            Rund um die Wechseljahre verschiebt sich bei vielen Frauen die Fettverteilung stärker zum Bauch, und die
            Muskelmasse kann langsam abnehmen – auch wenn sich das Körpergewicht kaum verändert.
          </P>
          <P className="mt-4">
            Eine medizinische Körperanalyse mit DEXA zeigt, wie sich Ihr Körper aus Fettmasse und magerer Weichteilmasse
            zusammensetzt und wie beides auf Arme, Beine und Rumpf verteilt ist. Die magere Masse ist ein Näherungswert für
            die Muskelmasse; Muskelkraft wird nicht gemessen. Eine Folgemessung zeigt, wie sich Bewegung, Krafttraining oder
            eine Ernährungsumstellung auswirken.
          </P>
        </div>
        <div className="flex flex-col gap-2 self-start">
          <BookingButton label="Körperanalyse buchen" service="koerperanalyse" size="lg" />
          <Link to="/koerperanalyse-graz" className={textLink}>
            Zur medizinischen Körperanalyse <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Area>

    <Section spacing="sm" labelledBy="kein-paket-title">
      <Card className="flex max-w-4xl gap-4">
        <CalendarClock size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
        <div>
          <H3 id="kein-paket-title">Kein Paket – jede Untersuchung für sich</H3>
          <P className="mt-2">
            Wir bieten kein pauschales „Wechseljahre-Paket“ an. Jede Untersuchung hat ihre eigene Indikation und ihren
            eigenen Termin. Möchten Sie Mammographie und Knochendichtemessung am selben Tag, vereinbaren Sie das bitte
            telefonisch unter{' '}
            <a href={PHONE_HREF} data-cta="phone" data-cta-service="wechseljahre" className="whitespace-nowrap font-semibold text-brand underline underline-offset-4 dark:text-brand-300">{PHONE_DISPLAY}</a>.
          </P>
        </div>
      </Card>
    </Section>

    <RelatedGoals ids={['aelter', 'abnehmen', 'sarkopenie']} />
    <SourcesSection keys={['fruehErkennen', 'iscd']} />

    <div id="termin">
      <MultiCTA
        id="wechseljahre-cta-title"
        title="Termin für die passende Untersuchung"
        text="Wählen Sie die Untersuchung, die zu Ihrer Fragestellung passt."
        items={[
          { service: 'mammographie', title: 'Screening-Mammographie', note: 'Ohne Zuweisung, mit e-card', bookingLabel: 'Mammographie buchen', to: '/mammographie-graz', linkLabel: 'Zur Mammographie' },
          { service: 'knochendichte', title: 'Knochendichtemessung', note: `ÖGK: privat ${DEXA_PRICE_TEXT}`, bookingLabel: 'Knochendichte buchen', to: '/knochendichtemessung-graz', linkLabel: 'Zur Knochendichtemessung' },
          { service: 'koerperanalyse', title: 'Körperanalyse', note: 'Privatleistung, ohne Zuweisung', bookingLabel: 'Körperanalyse buchen', to: '/koerperanalyse-graz', linkLabel: 'Zur Körperanalyse' },
        ]}
      />
    </div>
  </GoalPage>
);

export default WechseljahrePage;
