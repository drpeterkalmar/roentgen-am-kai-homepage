import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import {
  GoalPage, GoalHero, OnThisPage, Section, Card, Notice, SectionHeading, BookingButton, PhoneButton,
  P, H3, Bullets, textLink, RelatedGoals, SourcesSection, BodyPriceNote, goalById,
} from '../../components/goals/GoalParts';

// /gesundheitsziele/abnehmspritze-koerperanalyse – Suchintention „Abnehmspritze Muskelverlust / Körperanalyse Abnehmspritze“.
// Nur medikamentöse Therapie; allgemeines Abnehmen → Seite „Gesund abnehmen“.
// KEINE Studienzahlen als Erwartung, keine Präparat-Empfehlung, Therapiehoheit bei der behandelnden Ärztin/dem Arzt.

const EXPLAIN = [
  { key: 'a', content: <>Medikamente auf Basis von <strong className="whitespace-nowrap">GLP-1</strong> <strong>beziehungsweise</strong> <strong className="whitespace-nowrap">GLP-1/GIP</strong> können bei entsprechender Indikation eine deutliche Gewichtsreduktion unterstützen.</> },
  { key: 'b', content: <>Studien mit DEXA-Messungen zeigen <strong>im Mittel eine stärkere Abnahme der Fettmasse</strong>. Gleichzeitig kann jedoch auch <strong>Magermasse zurückgehen</strong>.</> },
  { key: 'c', content: <>Wie sich <strong>Ihr</strong> Körper verändert, lässt sich aus dem Gewichtsverlust allein nicht ableiten – Mittelwerte aus Studien sagen wenig über die einzelne Person.</> },
  { key: 'd', content: <>Eine <strong>DEXA-Ausgangsmessung</strong> und eine spätere <strong>Verlaufskontrolle</strong> können diese Entwicklung dokumentieren.</> },
];

const LIMITS = [
  'DEXA entscheidet nicht über Beginn, Dosis oder Absetzen eines Medikaments.',
  'Die Messung ersetzt keine ärztliche Betreuung und keine Ernährungsberatung.',
  'Änderungen der Therapie erfolgen ausschließlich durch die behandelnde Ärztin oder den behandelnden Arzt.',
  'Magermasse ist nicht identisch mit direkt gemessener Muskelmasse oder Muskelkraft.',
];

const AbnehmspritzePage = () => (
  <GoalPage>
    <GoalHero
      goalId="abnehmspritze"
      eyebrow="Körperanalyse bei Abnehmspritze"
      lead="Abnehmspritzen können beim Abnehmen stark helfen. Doch was verliert der Körper dabei? Eine Körperanalyse mit DEXA dokumentiert vor und während der Behandlung, wie sich Fettmasse und Magermasse verändern."
      keyMessage="Verlieren Sie Fett – oder auch wertvolle Muskelmasse?"
      actions={<BookingButton size="lg" label="Ausgangsmessung oder Verlaufskontrolle buchen" service="koerperanalyse" />}
    />
    <OnThisPage items={[
      { href: '#muskelverlust', label: 'Fett und Magermasse' },
      { href: '#grenzen', label: 'Was die Messung nicht kann' },
      { href: '#ablauf', label: 'Ausgangs- und Verlaufsmessung' },
    ]} />

    <Section id="muskelverlust" labelledBy="muskel-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="muskel-title" title="Abnehmspritze und Muskelverlust: was Studien zeigen" className="!mb-6" />
          <Bullets items={EXPLAIN} />
        </div>
        <Card tone="muted" className="self-start">
          <H3>Warum wir keine Studienwerte als Erwartung nennen</H3>
          <P className="mt-2">
            Die großen Zulassungsstudien haben die Körperzusammensetzung nur in Teilgruppen mit DEXA untersucht. Ihre
            Ergebnisse sind Mittelwerte bestimmter Studiengruppen unter Studienbedingungen. Wie viel Fett- und Magermasse Sie
            persönlich verlieren, hängt unter anderem von Ausgangsgewicht, Alter, Ernährung, Bewegung und Tempo der
            Abnahme ab.
          </P>
          <p className="mt-4">
            <Link to="/ratgeber/abnehmspritze-muskelmasse-koerperanalyse" className={textLink}>
              <BookOpen size={18} aria-hidden="true" /> Ratgeber: Abnehmspritze und Muskelmasse
            </Link>
          </p>
        </Card>
      </div>
    </Section>

    <Section id="grenzen" tone="muted" labelledBy="grenzen-title">
      <div className="max-w-3xl">
        <div className="flex items-start gap-3">
          <ShieldCheck size={26} aria-hidden="true" className="mt-1 shrink-0 text-brand dark:text-brand-300" />
          <h2 id="grenzen-title" className="font-display text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl dark:text-white">Was die Körperanalyse bei einer Abnehmspritze nicht leistet</h2>
        </div>
        <div className="mt-6">
          <Bullets items={LIMITS} />
        </div>
        <Notice tone="info" className="mt-6" title="Ihre Behandlung bleibt in ärztlicher Hand" headingLevel={3}>
          <p>
            Wir messen und dokumentieren. Ihren Bericht besprechen Sie mit der Ärztin oder dem Arzt, die Ihre Therapie
            verordnet haben und begleiten.
          </p>
        </Notice>
      </div>
    </Section>

    <Section id="ablauf" labelledBy="ablauf-title">
      <SectionHeading id="ablauf-title" title="Körperanalyse bei Abnehmspritze: Ausgangsmessung und Verlaufskontrolle" />
      <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          { t: 'Vor Beginn der Behandlung', d: 'Die Ausgangsmessung hält Fettmasse, Magermasse und deren Verteilung fest – die Referenz für jeden späteren Vergleich.' },
          { t: 'Während der Behandlung', d: 'Eine Verlaufskontrolle erfolgt häufig nach mehreren Monaten. Den passenden Abstand stimmen Sie mit Ihrer behandelnden Ärztin oder Ihrem Arzt ab.' },
          { t: 'Nach dem Absetzen', d: 'Auch danach kann eine weitere Messung zeigen, wie sich die Körperzusammensetzung entwickelt.' },
        ].map((s, i) => (
          <li key={s.t} className="flex">
            <Card className="w-full" padding="p-5 sm:p-6">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">{i + 1}</span>
              <H3 className="mt-4 !text-lg">{s.t}</H3>
              <P className="mt-2">{s.d}</P>
            </Card>
          </li>
        ))}
      </ol>
      <P className="mt-6 max-w-3xl">
        Vergleichbar sind Messungen am selben Gerät und unter ähnlichen Bedingungen: etwa zur gleichen Tageszeit, nüchtern
        und mit entleerter Harnblase.
      </P>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <BookingButton size="lg" label="Ausgangsmessung oder Verlaufskontrolle buchen" service="koerperanalyse" />
        <PhoneButton size="lg" service="koerperanalyse" />
      </div>
      <BodyPriceNote className="mt-4 max-w-3xl" />
      <p className="mt-4 flex flex-col gap-1 sm:flex-row sm:gap-6">
        <Link to="/koerperanalyse-graz" className={textLink}>
          Zur medizinischen Körperanalyse <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link to={goalById.abnehmen.path} className={textLink}>
          Abnehmen ohne Medikamente <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </Section>

    <RelatedGoals ids={['abnehmen', 'sarkopenie', 'fitness']} />
    <SourcesSection keys={['step1', 'surmount1', 'iscd']} />
  </GoalPage>
);

export default AbnehmspritzePage;
