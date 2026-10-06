import { Link } from 'react-router-dom';
import { ArrowRight, Flag, Dumbbell, Zap, HeartPulse, TrendingDown, Repeat, Ban } from 'lucide-react';
import {
  GoalPage, GoalHero, OnThisPage, Section, Card, Notice, SectionHeading, BookingButton, PhoneButton,
  P, H3, textLink, RelatedGoals, SourcesSection, BodyPriceNote, goalById,
} from '../../components/goals/GoalParts';
import { BODY } from '../../data/bodyComposition';

// /gesundheitsziele/fitness-muskelaufbau – Suchintention „Körperanalyse Fitness Graz / Trainingserfolg messen“.
// Der Begriff „Körperanalyse Graz“ bleibt der Leistungsseite; ausführlicher Methodenvergleich steht dort (#vergleich).
// BIA nicht abwerten; DEXA „präzise, gut reproduzierbare medizinische Referenzmethode“ – nie „100 % genau“.

const USES = [
  { icon: Flag, t: 'Trainingsbeginn', d: 'Ein Ausgangswert für Fettmasse, magere Masse und deren Verteilung – bevor sich etwas verändert.' },
  { icon: Dumbbell, t: 'Muskelaufbau', d: 'Nimmt die magere Masse an Armen, Beinen und Rumpf zu? Die regionale Auswertung zeigt es getrennt.' },
  { icon: Zap, t: 'Krafttraining', d: 'Auch der Seitenvergleich links und rechts wird sichtbar, etwa nach einer Verletzung oder bei einseitiger Belastung.' },
  { icon: HeartPulse, t: 'Ausdauertraining', d: 'Veränderungen des Körperfetts und der mageren Masse im Verlauf einer Trainingsphase dokumentieren.' },
  { icon: TrendingDown, t: 'Gewichtsreduktion mit Training', d: 'Prüfen, ob beim Abnehmen vor allem Fett verloren geht und die magere Masse erhalten bleibt.' },
  { icon: Repeat, t: 'Standardisierte Verlaufsmessungen', d: 'Messungen am selben Gerät und unter gleichen Bedingungen machen Fortschritte vergleichbar.' },
];

const COMPARE = [
  { t: 'Körpergewicht und BMI', d: 'Sie zeigen Masse und das Verhältnis von Gewicht zu Größe, unterscheiden aber keine Gewebearten. Muskelzuwachs und Fettverlust können sich auf der Waage aufheben.' },
  { t: 'Körperfettwaagen und BIA', d: 'Sie schätzen die Körperzusammensetzung über elektrische Messwerte und Berechnungsmodelle. Das Ergebnis hängt unter anderem vom Wasserhaushalt ab. Für den Alltag und bei gleichbleibenden Bedingungen können sie sinnvoll sein.' },
  { t: 'DEXA-Körperanalyse', d: 'Sie liefert eine medizinisch etablierte, regionale Analyse von Fettmasse und magerer Weichteilmasse. DEXA gilt als präzise und gut reproduzierbare medizinische Referenzmethode – auch sie hat Messschwankungen und ist nicht unfehlbar.' },
];

const NOT_MEASURED = ['Muskelkraft', 'Ausdauer', 'Trainingsqualität', 'sportliche Leistungsfähigkeit'];

const FitnessPage = () => (
  <GoalPage>
    <GoalHero
      goalId="fitness"
      eyebrow="Körperanalyse für Fitness und Training"
      lead="Wer gleichzeitig Fett abbaut und Muskulatur aufbaut, sieht auf der Waage möglicherweise kaum eine Veränderung. Die Körperzusammensetzung kann sich dennoch deutlich entwickeln."
      actions={<BookingButton size="lg" label="Startmessung oder Re-Check buchen" service="koerperanalyse" />}
    />
    <OnThisPage items={[
      { href: '#nutzen', label: 'Nutzen im Training' },
      { href: '#vergleich', label: 'Waage, BIA, DEXA' },
      { href: '#grenzen', label: 'Was DEXA nicht misst' },
      { href: '#termin', label: 'Start und Re-Check' },
    ]} />

    <Section id="nutzen" labelledBy="nutzen-title">
      <SectionHeading id="nutzen-title" title="Trainingserfolg messen: wofür die Körperanalyse hilft" />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {USES.map((u) => (
          <li key={u.t} className="flex">
            <Card className="w-full" padding="p-5 sm:p-6">
              <u.icon size={24} aria-hidden="true" className="text-brand dark:text-brand-300" />
              <H3 className="mt-3 !text-lg">{u.t}</H3>
              <P className="mt-2">{u.d}</P>
            </Card>
          </li>
        ))}
      </ul>
    </Section>

    <Section id="vergleich" tone="muted" labelledBy="vergleich-title">
      <SectionHeading id="vergleich-title" title="Waage, BIA oder DEXA – was unterscheidet die Methoden?" />
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {COMPARE.map((c) => (
          <li key={c.t} className="flex">
            <Card className="w-full" padding="p-5 sm:p-6">
              <H3 className="!text-lg">{c.t}</H3>
              <P className="mt-2">{c.d}</P>
            </Card>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link to="/koerperanalyse-graz#vergleich" className={textLink}>
          Ausführlicher Vergleich auf der Seite Körperanalyse <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </Section>

    <Section id="grenzen" labelledBy="grenzen-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="grenzen-title" title="Was DEXA nicht misst" className="!mb-6" />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {NOT_MEASURED.map((n) => (
              <li key={n} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                <Ban size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> {n}
              </li>
            ))}
          </ul>
          <P className="mt-5">
            Die magere Weichteilmasse ist ein Näherungswert für die Muskelmasse. Wie kräftig oder ausdauernd Sie sind, zeigen
            Leistungstests im Training – nicht die Körperanalyse.
          </P>
        </div>
        <Notice tone="info" title="Vergleichbare Bedingungen" headingLevel={3} className="self-start">
          <p>
            Verlaufsmessungen sind am aussagekräftigsten am selben Gerät, zu einer ähnlichen Tageszeit, nüchtern und mit
            entleerter Harnblase – und nicht direkt nach einer intensiven Trainingseinheit.
          </p>
        </Notice>
      </div>
    </Section>

    <Section id="termin" tone="brand" labelledBy="termin-title">
      <SectionHeading id="termin-title" title="Startmessung und Re-Check" className="!mb-5" />
      <P className="max-w-3xl">
        Den Abstand bis zum Re-Check wählen Sie {BODY.recheckInterval}. Eine einzelne Messung ist ohne Zuweisung buchbar;
        Start- und Folgemessung gibt es auch als Paket.
      </P>
      <BodyPriceNote className="mt-3 max-w-3xl" />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <BookingButton size="lg" label="Startmessung oder Re-Check buchen" service="koerperanalyse" />
        <PhoneButton size="lg" label="Paket telefonisch vereinbaren" service="koerperanalyse" />
      </div>
      <p className="mt-5 flex flex-col gap-1 sm:flex-row sm:gap-6">
        <Link to="/koerperanalyse-graz" className={textLink}>
          Zur medizinischen Körperanalyse <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link to={goalById.sport.path} data-cta="goal" data-cta-service="sport" className={textLink}>
          Leistungssport: Knochengesundheit und RED-S <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </Section>

    <RelatedGoals ids={['abnehmen', 'abnehmspritze', 'aelter']} />
    <SourcesSection keys={['iscd']} />
  </GoalPage>
);

export default FitnessPage;
