import { Link } from 'react-router-dom';
import { ArrowRight, Bone, Activity, Footprints, Dumbbell, Utensils, BedDouble, TrendingDown, UserRound } from 'lucide-react';
import {
  GoalPage, GoalHero, OnThisPage, Section, Card, SectionHeading, BookingButton, P, H3, textLink,
  RelatedGoals, SourcesSection, SeeDoctor, MultiCTA, goalById,
} from '../../components/goals/GoalParts';
import { Button } from '../../components/ui';
import { DEXA_PRICE_TEXT } from '../../data/dexa';
import { BODY_PRICE_TEXT } from '../../data/bodyComposition';

// /gesundheitsziele/gesund-aelter-werden – Suchintention „Knochengesundheit im Alter“ (Vorbeugung).
// Keine Anti-Aging-Versprechen. Zwei getrennte Untersuchungswege. Konkreter Verdacht auf Sarkopenie → eigene Seite.

const TOPICS = [
  { icon: Bone, t: 'Osteoporose und Frakturrisiko', d: 'Bei Osteoporose verliert der Knochen an Dichte und Stabilität. Knochenbrüche – etwa an Hüfte, Wirbelsäule oder Handgelenk – können dann schon bei geringer Belastung auftreten.' },
  { icon: Activity, t: 'Weniger Muskelmasse und Kraft', d: 'Mit dem Alter nehmen Muskelmasse und Muskelkraft langsam ab. Das kann Gehen, Treppensteigen und Aufstehen erschweren.' },
  { icon: Dumbbell, t: 'Bewegung und Krafttraining', d: 'Regelmäßige Bewegung und gezieltes Krafttraining helfen, Muskulatur und Knochen zu erhalten – in jedem Alter und passend zur eigenen Belastbarkeit.' },
  { icon: Utensils, t: 'Energie und Nährstoffe', d: 'Muskeln und Knochen brauchen genug Energie, Eiweiß und Mineralstoffe. Was Sie persönlich brauchen, klären Sie mit Ihrer Ärztin, Ihrem Arzt oder einer Diätologin.' },
  { icon: Footprints, t: 'Wiederholte Stürze', d: 'Stürze haben oft mehrere Ursachen, etwa Kraft, Gleichgewicht, Sehen oder Medikamente. Sie gehören ärztlich abgeklärt.' },
  { icon: BedDouble, t: 'Inaktivität und Krankenhausaufenthalte', d: 'Längere Bettruhe oder Krankheit kann Muskelmasse und Kraft rasch verringern. Danach lohnt es sich, gezielt wieder aufzubauen.' },
  { icon: TrendingDown, t: 'Ungewollter Gewichtsverlust', d: 'Nehmen Sie ab, ohne es zu wollen, sollte die Ursache ärztlich abgeklärt werden – unabhängig von jeder Messung.' },
];

const AelterPage = () => (
  <GoalPage>
    <GoalHero
      goalId="aelter"
      eyebrow="Knochengesundheit im Alter"
      lead="Stabile Knochen, ausreichend Muskelkraft und Muskelmasse tragen dazu bei, dass Sie sicher gehen, stabil stehen und im Alltag selbstständig bleiben. Hier erfahren Sie, worauf es ankommt und welche Untersuchung welche Frage beantwortet."
      actions={
        <Button href="#untersuchungen" size="lg" data-cta="goal" data-cta-service="aelter-auswahl">
          Passende Untersuchung auswählen
        </Button>
      }
    />
    <OnThisPage items={[
      { href: '#themen', label: 'Worauf es ankommt' },
      { href: '#warnzeichen', label: 'Warnzeichen' },
      { href: '#untersuchungen', label: 'Zwei Untersuchungen' },
      { href: '#maenner', label: 'Männer' },
    ]} />

    <Section id="themen" labelledBy="themen-title">
      <SectionHeading
        id="themen-title"
        title="Knochen und Muskeln im Alter: worauf es ankommt"
        lead="Knochen und Muskulatur hängen eng zusammen: Kräftige Muskeln schützen vor Stürzen, stabile Knochen vor Brüchen."
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((t) => (
          <li key={t.t} className="flex">
            <Card className="w-full" padding="p-5 sm:p-6">
              <t.icon size={24} aria-hidden="true" className="text-brand dark:text-brand-300" />
              <H3 className="mt-3 !text-lg">{t.t}</H3>
              <P className="mt-2">{t.d}</P>
            </Card>
          </li>
        ))}
      </ul>
    </Section>

    <Section id="warnzeichen" tone="muted" spacing="sm" labelledBy="warn-title">
      <h2 id="warn-title" className="sr-only">Warnzeichen</h2>
      <SeeDoctor title="Bei Stürzen, Knochenbrüchen, deutlicher Schwäche oder ungewolltem Gewichtsverlust" className="max-w-4xl">
        <p>
          Lassen Sie diese Beschwerden bitte zuerst von Ihrer Hausärztin oder Ihrem Hausarzt abklären. Eine DEXA-Messung
          allein klärt die Ursache nicht. Sie kann aber ein Baustein der weiteren Abklärung sein, wenn Ihre Ärztin oder Ihr
          Arzt das für sinnvoll hält.
        </p>
      </SeeDoctor>
    </Section>

    <Section id="untersuchungen" labelledBy="wege-title">
      <SectionHeading
        id="wege-title"
        title="Zwei Untersuchungen, zwei Fragestellungen"
        lead="Beide Untersuchungen arbeiten mit DEXA, beantworten aber unterschiedliche medizinische Fragen – und werden getrennt gebucht."
      />
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <li className="flex">
          <Card className="flex w-full flex-col">
            <div className="flex items-start gap-3">
              <Bone size={26} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
              <H3>1. DEXA-Knochendichtemessung</H3>
            </div>
            <P className="mt-3"><strong>Frage:</strong> Wie dicht und stabil sind meine Knochen?</P>
            <P className="mt-2">
              Die Messung an Lendenwirbelsäule und Hüfte beurteilt die Knochenmineraldichte. Sie dient der Früherkennung und
              Verlaufskontrolle von Osteoporose und hilft, das Bruchrisiko einzuschätzen.
            </P>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">ÖGK: Privatleistung {DEXA_PRICE_TEXT}; andere Kassen nach den jeweiligen Voraussetzungen.</p>
            <div className="mt-auto flex flex-col gap-2 pt-5">
              <BookingButton label="Knochendichtemessung buchen" service="knochendichte" />
              <Link to="/knochendichtemessung-graz" className={textLink}>
                Zur Knochendichtemessung <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </li>
        <li className="flex">
          <Card className="flex w-full flex-col">
            <div className="flex items-start gap-3">
              <Activity size={26} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
              <H3>2. DEXA-Körperanalyse</H3>
            </div>
            <P className="mt-3"><strong>Frage:</strong> Wie viel Fett- und Magermasse habe ich, und wo?</P>
            <P className="mt-2">
              Die Ganzkörpermessung erfasst Fettmasse und magere Weichteilmasse – als Näherungswert für die Muskelmasse –
              getrennt nach Armen, Beinen und Rumpf. Muskelkraft wird dabei nicht gemessen.
            </P>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Privatleistung {BODY_PRICE_TEXT}, ohne Zuweisung.</p>
            <div className="mt-auto flex flex-col gap-2 pt-5">
              <BookingButton label="Körperanalyse buchen" service="koerperanalyse" />
              <Link to="/koerperanalyse-graz" className={textLink}>
                Zur medizinischen Körperanalyse <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </li>
      </ul>
      <P className="mt-6 max-w-3xl">
        Besteht bereits der Verdacht auf einen deutlichen Muskelverlust, lesen Sie weiter unter{' '}
        <Link to={goalById.sarkopenie.path} className="font-semibold text-brand underline underline-offset-4 dark:text-brand-300">Muskelverlust und Sarkopenie</Link>.
      </P>
    </Section>

    <Section id="maenner" tone="muted" labelledBy="maenner-title">
      <div className="flex max-w-3xl items-start gap-3">
        <UserRound size={26} aria-hidden="true" className="mt-1 shrink-0 text-brand dark:text-brand-300" />
        <div>
          <h2 id="maenner-title" className="font-display text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">Knochengesundheit im Alter betrifft auch Männer</h2>
          <P className="mt-4">
            Osteoporose gilt oft als Frauenthema, doch auch Männer verlieren mit den Jahren Knochen- und Muskelmasse. Die
            internationale Fachgesellschaft für Knochendichtemessung (ISCD) sieht eine Knochendichtemessung bei Männern ab
            70 Jahren vor, bei jüngeren Männern dann, wenn Risikofaktoren bestehen – etwa ein früherer Knochenbruch, ein
            niedriges Körpergewicht, bestimmte Medikamente oder Erkrankungen.
          </P>
        </div>
      </div>
    </Section>

    <RelatedGoals ids={['sarkopenie', 'wechseljahre', 'fitness']} />
    <SourcesSection keys={['iscd', 'ewgsop2']} />

    <MultiCTA
      id="aelter-cta-title"
      title="Passende Untersuchung auswählen"
      text="Knochendichte oder Körperzusammensetzung – jede Untersuchung hat ihren eigenen Termin."
      items={[
        { service: 'knochendichte', title: 'Knochendichtemessung', note: 'Knochenmineraldichte, Osteoporose', bookingLabel: 'Knochendichte buchen', to: '/knochendichtemessung-graz', linkLabel: 'Zur Knochendichtemessung' },
        { service: 'koerperanalyse', title: 'Körperanalyse', note: 'Fettmasse und magere Weichteilmasse', bookingLabel: 'Körperanalyse buchen', to: '/koerperanalyse-graz', linkLabel: 'Zur Körperanalyse' },
      ]}
    />
  </GoalPage>
);

export default AelterPage;
