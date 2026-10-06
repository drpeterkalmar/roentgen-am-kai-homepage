import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Info } from 'lucide-react';
import {
  GoalPage, GoalHero, OnThisPage, Section, Card, Notice, Placeholder, SectionHeading, BookingButton, PhoneButton,
  P, H3, Bullets, textLink, RelatedGoals, SourcesSection, BodyPriceNote, goalById,
} from '../../components/goals/GoalParts';
import { BODY_DURATION_TEXT } from '../../data/bodyComposition';

// /gesundheitsziele/gesund-abnehmen – Suchintention „gesund abnehmen Graz“ (allgemeine Gewichtsabnahme:
// Ernährung, Training, Operation). Medikamente nur als Querverweis auf die Abnehmspritze-Seite.
// KEINE Prozentangaben zum Verlust von Fett- oder Magermasse (Auftrag 27.09.2026).

const CORE = [
  { key: 'a', content: <>Bei einer größeren Gewichtsabnahme können <strong>Fettmasse und fettfreie Masse</strong> abnehmen – wie viel von beidem, ist von Person zu Person verschieden.</> },
  { key: 'b', content: <>Die fettfreie beziehungsweise magere Masse ist <strong>nicht dasselbe wie reine Skelettmuskelmasse</strong>. Sie umfasst neben der Muskulatur auch Organe, Bindegewebe und Körperwasser.</> },
  { key: 'c', content: <>Eine DEXA-Körperanalyse dokumentiert <strong>Fettmasse, magere Weichteilmasse und deren Verteilung</strong> auf Arme, Beine und Rumpf.</> },
  { key: 'd', content: <>Muskelkraft, Ernährungszustand und Stoffwechsel werden dabei <strong>nicht direkt gemessen</strong>.</> },
];

const GROUPS = [
  { t: 'Ernährungsumstellung oder Diät', d: 'Sie möchten wissen, ob die verlorenen Kilos vor allem aus Fett stammen.' },
  { t: 'Größere geplante Gewichtsabnahme', d: 'Ein Ausgangswert vor dem Start macht spätere Veränderungen vergleichbar.' },
  { t: 'Gewichtsreduktion mit Krafttraining', d: 'Sie wollen sehen, ob die magere Masse trotz Kaloriendefizit erhalten bleibt.' },
  { t: 'Bariatrische Operation', d: 'Die Messung dokumentiert den Verlauf vor und nach dem Eingriff.' },
  { t: 'Ausgangs- und Verlaufsmessung', d: 'Zwei Messungen unter gleichen Bedingungen zeigen, was sich verändert hat.' },
];

const STEPS = [
  { t: 'Ausgangsmessung', d: 'Vor Beginn der Gewichtsabnahme halten Sie mit einer Körperanalyse fest, wie sich Ihr Körper aus Fett- und Magermasse zusammensetzt.' },
  { t: 'Gewichtsreduktionsphase', d: 'Sie setzen Ihr Vorhaben um – begleitet von Ihrer Ärztin, Ihrem Arzt oder einer Ernährungsfachkraft.' },
  { t: 'Verlaufskontrolle nach mehreren Monaten', d: 'Die zweite Messung erfolgt am selben Gerät und unter möglichst gleichen Bedingungen: ähnliche Tageszeit, nüchtern, mit entleerter Harnblase.' },
  { t: 'Verständlicher Ergebnisvergleich', d: 'Im Bericht sehen Sie, wie sich Fettmasse und magere Masse gesamt und je Körperregion verändert haben.' },
];

const AbnehmenPage = () => (
  <GoalPage>
    <GoalHero
      goalId="abnehmen"
      eyebrow="Gesund abnehmen in Graz"
      lead="Wer gesund abnehmen möchte, will vor allem Körperfett verlieren und die Muskulatur möglichst erhalten. Ob das gelingt, lässt sich am Körpergewicht allein nicht ablesen."
      keyMessage="Die Waage zeigt, wie viele Kilogramm verloren wurden. Sie zeigt nicht, woraus dieser Gewichtsverlust besteht."
      actions={<BookingButton size="lg" label="Körperanalyse als Ausgangsmessung buchen" service="koerperanalyse" />}
    />
    <OnThisPage items={[
      { href: '#fett-muskel', label: 'Fett oder Muskel?' },
      { href: '#fuer-wen', label: 'Für wen?' },
      { href: '#bariatrisch', label: 'Nach einer Operation' },
      { href: '#ablauf', label: 'Ablauf' },
    ]} />

    <Section id="fett-muskel" labelledBy="fett-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="fett-title" title="Fettverlust oder Muskelverlust – was die Waage nicht zeigt" className="!mb-6" />
          <Bullets items={CORE} />
        </div>
        <div className="flex flex-col gap-5">
          <Card tone="muted">
            <div className="flex gap-3">
              <Scale size={22} aria-hidden="true" className="mt-1 shrink-0 text-brand dark:text-brand-300" />
              <div>
                <H3>Warum keine Durchschnittswerte?</H3>
                <P className="mt-2">
                  Wie viel Fett- und Magermasse beim Abnehmen verloren geht, unterscheidet sich zwischen Studien und zwischen
                  einzelnen Menschen deutlich – je nach Ausgangsgewicht, Alter, Ernährung, Bewegung und Tempo der Abnahme.
                  Deshalb nennen wir hier bewusst keine allgemeinen Prozentwerte. Aussagekräftig ist Ihr eigener Vergleich
                  zwischen zwei Messungen.
                </P>
              </div>
            </div>
          </Card>
          <Card tone="muted">
            <div className="flex gap-3">
              <Info size={22} aria-hidden="true" className="mt-1 shrink-0 text-brand dark:text-brand-300" />
              <div>
                <H3>Gesund abnehmen mit Medikamenten?</H3>
                <P className="mt-2">
                  Erhalten Sie eine Abnehmspritze, finden Sie die Besonderheiten dieser Behandlung auf einer eigenen Seite.
                </P>
                <Link to={goalById.abnehmspritze.path} data-cta="goal" data-cta-service="abnehmspritze" className={textLink}>
                  Abnehmspritze und Muskelverlust <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>

    <Section id="fuer-wen" tone="muted" labelledBy="wen-title">
      <SectionHeading id="wen-title" title="Für wen ist eine Körperanalyse beim Abnehmen sinnvoll?" />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <li key={g.t} className="flex">
            <Card className="w-full" padding="p-5 sm:p-6">
              <H3 className="!text-lg">{g.t}</H3>
              <P className="mt-2">{g.d}</P>
            </Card>
          </li>
        ))}
      </ul>
    </Section>

    <Section id="bariatrisch" labelledBy="bariatrisch-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="bariatrisch-title" title="Körperanalyse vor und nach einer Adipositas-Operation" className="!mb-6" />
          <P>
            Nach einer bariatrischen Operation nimmt das Gewicht oft rasch ab. Eine Körperanalyse vor dem Eingriff und in
            größeren Abständen danach dokumentiert, wie sich Fett- und Magermasse verändern.
          </P>
          <P className="mt-4">
            Die Messung beschreibt nur die Körperzusammensetzung. Über Ernährung, Nahrungsergänzung und weitere Behandlung
            entscheidet Ihr behandelndes Team – aus einer DEXA-Messung allein lassen sich keine Aussagen über Therapie oder
            Nährstoffversorgung ableiten.
          </P>
        </div>
        <Notice tone="info" title="Bei sehr hohem Körpergewicht" headingLevel={3} className="self-start">
          <p>
            Messtische haben eine Gewichts- und Breitengrenze. Bitte klären Sie bei sehr hohem Körpergewicht vorab telefonisch,
            ob die Messung möglich ist.
          </p>
          <Placeholder internal className="mt-3">Gewichts- und Breitengrenze des DEXA-Geräts (Praxis bitte angeben)</Placeholder>
        </Notice>
      </div>
    </Section>

    <Section id="ablauf" tone="muted" labelledBy="ablauf-title">
      <SectionHeading id="ablauf-title" title="So begleitet die Körperanalyse Ihre Gewichtsabnahme" />
      <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.t} className="flex">
            <Card className="w-full" padding="p-5 sm:p-6">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">{i + 1}</span>
              <H3 className="mt-4 !text-lg">{s.t}</H3>
              <P className="mt-2">{s.d}</P>
            </Card>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <BookingButton size="lg" label="Körperanalyse als Ausgangsmessung buchen" service="koerperanalyse" />
        <PhoneButton size="lg" service="koerperanalyse" />
      </div>
      <BodyPriceNote className="mt-4 max-w-3xl" />
      {BODY_DURATION_TEXT && <p className="mt-1 text-[0.95rem] text-slate-600 dark:text-slate-300">{BODY_DURATION_TEXT}</p>}
      <p className="mt-4">
        <Link to="/koerperanalyse-graz" className={textLink}>
          Alles zur medizinischen Körperanalyse <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </Section>

    <RelatedGoals ids={['abnehmspritze', 'fitness', 'wechseljahre']} />
    <SourcesSection keys={['iscd']} />
  </GoalPage>
);

export default AbnehmenPage;
