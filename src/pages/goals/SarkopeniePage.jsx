import { Link } from 'react-router-dom';
import { ArrowRight, Hand, Gauge, Ruler, CheckCircle2, XCircle } from 'lucide-react';
import {
  GoalPage, GoalHero, OnThisPage, Section, Card, Notice, SectionHeading, BookingButton, PhoneButton,
  P, H3, Bullets, textLink, RelatedGoals, SourcesSection, SeeDoctor, BodyPriceNote,
} from '../../components/goals/GoalParts';
import { BODY } from '../../data/bodyComposition';

// /gesundheitsziele/muskelverlust-sarkopenie – Suchintention „Sarkopenie Graz / Muskelmasse messen Graz“.
// Fachlich nach EWGSOP2 (Cruz-Jentoft 2019). DEXA erfasst ALM; RSMI steht laut Praxis im Bericht (bodyComposition.js).
// ALMI wird nicht genannt (Ausgabe nicht bestätigt). Nie „Sarkopenie-Test“; DEXA allein bestätigt/widerlegt keine Sarkopenie.

const HINTS = [
  'nachlassende Kraft',
  'Schwierigkeiten beim Aufstehen',
  'langsameres Gehen',
  'Probleme beim Treppensteigen',
  'wiederholte Stürze',
  'längere Immobilität',
  'ungewollter Gewichtsverlust',
];

const STEPS = [
  { icon: Hand, n: '1', t: 'Muskelkraft', d: 'Nach EWGSOP2 ist eine niedrige Muskelkraft das wichtigste erste Kriterium. Sie wird ärztlich geprüft, zum Beispiel mit einer Handkraftmessung oder einem Aufstehtest vom Stuhl.', dexa: false },
  { icon: Ruler, n: '2', t: 'Muskelmenge', d: 'Eine niedrige Muskelmenge bestätigt den Verdacht. Hier setzt die DEXA-Messung an: Sie erfasst die appendikuläre Magermasse (ALM), also die magere Masse von Armen und Beinen.', dexa: true },
  { icon: Gauge, n: '3', t: 'Körperliche Leistungsfähigkeit', d: 'Ist zusätzlich die körperliche Leistungsfähigkeit eingeschränkt – etwa ein langsames Gehtempo –, spricht man von einer schweren Sarkopenie.', dexa: false },
];

const SarkopeniePage = () => (
  <GoalPage>
    <GoalHero
      goalId="sarkopenie"
      eyebrow="Sarkopenie in Graz abklären"
      lead="Sarkopenie bezeichnet einen fortschreitenden Verlust von Muskelkraft und Muskelmasse. Sie tritt häufiger im höheren Lebensalter auf, kann aber auch durch Erkrankungen, längere Inaktivität, Unterernährung oder starke Gewichtsabnahme begünstigt werden."
      keyMessage="Die DEXA-Messung schätzt die Muskelmasse über die Magermasse von Armen und Beinen – ein Baustein der ärztlichen Abklärung, nicht die ganze Diagnose."
      actions={<BookingButton size="lg" label="Muskelmasse als Teil der Abklärung messen" service="koerperanalyse" />}
    />
    <OnThisPage items={[
      { href: '#hinweise', label: 'Mögliche Hinweise' },
      { href: '#diagnose', label: 'Wie wird Sarkopenie festgestellt?' },
      { href: '#dexa', label: 'Was DEXA beiträgt' },
      { href: '#termin', label: 'Termin' },
    ]} />

    <Section id="hinweise" labelledBy="hinweise-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="hinweise-title" title="Mögliche Hinweise auf Muskelverlust" className="!mb-6" />
          <Bullets items={HINTS} cols />
        </div>
        <SeeDoctor title="Erster Schritt: ärztliche Abklärung" className="self-start">
          <p>
            Bemerken Sie solche Veränderungen, sprechen Sie bitte zuerst mit Ihrer Hausärztin oder Ihrem Hausarzt. Kraftverlust,
            Stürze oder ungewollter Gewichtsverlust können viele Ursachen haben, die untersucht werden müssen. Die DEXA-Messung
            ist dafür eine Ergänzung, kein Ersatz.
          </p>
        </SeeDoctor>
      </div>
    </Section>

    <Section id="diagnose" tone="muted" labelledBy="diagnose-title">
      <SectionHeading
        id="diagnose-title"
        title="Sarkopenie abklären: drei Schritte nach EWGSOP2"
        lead="Die Europäische Arbeitsgruppe für Sarkopenie (EWGSOP2) beschreibt, wie die Diagnose gestellt wird. Nur einer der drei Schritte lässt sich mit DEXA messen."
      />
      <ol className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.t} className="flex">
            <Card className={`w-full ${s.dexa ? 'ring-2 ring-brand dark:ring-brand-300' : ''}`} padding="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">{s.n}</span>
                <s.icon size={22} aria-hidden="true" className="text-brand dark:text-brand-300" />
              </div>
              <H3 className="mt-4 !text-lg">{s.t}</H3>
              <P className="mt-2">{s.d}</P>
              <p className={`mt-3 inline-flex items-center gap-2 text-sm font-semibold ${s.dexa ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300'}`}>
                {s.dexa ? <CheckCircle2 size={16} aria-hidden="true" /> : <XCircle size={16} aria-hidden="true" />}
                {s.dexa ? 'Mit DEXA messbar' : 'Nicht mit DEXA messbar'}
              </p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>

    <Section id="dexa" labelledBy="dexa-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="dexa-title" title="Muskelmasse messen: was DEXA beiträgt – und was nicht" className="!mb-6" />
          <H3 className="!text-lg">Das erfasst die Messung</H3>
          <P className="mt-2">
            Die Ganzkörpermessung bestimmt die magere Weichteilmasse von Armen und Beinen (appendikuläre Magermasse, ALM).
            {BODY.appendicularIndex && (
              <> In unserem Bericht finden Sie zusätzlich den {BODY.appendicularIndex} (relativer Skelettmuskelindex): die ALM im Verhältnis zur Körpergröße.</>
            )}{' '}
            Die magere Masse ist ein Näherungswert für die Muskelmasse, keine direkte Messung der Muskulatur.
          </P>
          <H3 className="mt-6 !text-lg">Das misst DEXA nicht</H3>
          <Bullets items={['Handkraft', 'Gehgeschwindigkeit', 'Aufstehfähigkeit']} />
        </div>
        <div className="flex flex-col gap-5 self-start">
          <Notice tone="important" title="DEXA allein bestätigt oder widerlegt keine Sarkopenie" headingLevel={3}>
            <p>
              Die Diagnose stellt Ihre Ärztin oder Ihr Arzt aus Kraftprüfung, Muskelmenge und gegebenenfalls Leistungstests.
              Ein unauffälliger DEXA-Wert schließt eine Sarkopenie nicht aus, ein niedriger Wert beweist sie nicht.
            </p>
          </Notice>
          <Card tone="muted" padding="p-5">
            <H3 className="!text-lg">Verlauf am selben Gerät</H3>
            <P className="mt-2">
              Messwerte verschiedener Geräte sind nicht direkt vergleichbar. Für Verlaufskontrollen empfiehlt sich deshalb
              dasselbe Gerät unter ähnlichen Bedingungen.
            </P>
          </Card>
        </div>
      </div>
    </Section>

    <Section id="termin" tone="brand" labelledBy="termin-title">
      <SectionHeading id="termin-title" title="Muskelmasse als Teil der Abklärung messen" className="!mb-5" />
      <P className="max-w-3xl">
        Die Messung erfolgt als Körperanalyse mit DEXA und ist ohne Zuweisung buchbar. Den Bericht erhalten Sie über das
        Patientenportal; besprechen Sie ihn mit Ihrer behandelnden Ärztin oder Ihrem behandelnden Arzt.
      </P>
      <BodyPriceNote className="mt-3 max-w-3xl" />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <BookingButton size="lg" label="Muskelmasse als Teil der Abklärung messen" service="koerperanalyse" />
        <PhoneButton size="lg" service="koerperanalyse" />
      </div>
      <p className="mt-5 flex flex-col gap-1 sm:flex-row sm:gap-6">
        <Link to="/koerperanalyse-graz" className={textLink}>
          Zur medizinischen Körperanalyse <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link to="/knochendichtemessung-graz" className={textLink}>
          Nach Stürzen: Knochendichtemessung <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </Section>

    <RelatedGoals ids={['aelter', 'abnehmspritze', 'abnehmen']} />
    <SourcesSection keys={['ewgsop2', 'iscd']} />
  </GoalPage>
);

export default SarkopeniePage;
