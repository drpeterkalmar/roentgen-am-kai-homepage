import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bone, Activity, Repeat } from 'lucide-react';
import {
  GoalPage, GoalHero, Section, Card, Notice, SectionHeading, P, H3, Bullets, textLink,
  RelatedGoals, SourcesSection, SeeDoctor, MultiCTA, Placeholder,
} from '../../components/goals/GoalParts';

// /gesundheitsziele/dexa-sportler-red-s – Spezialthema, NICHT im Hauptmenü (Auftrag 27.09.2026).
// Suchintention „DEXA für Sportler Graz“. RED-S ausschließlich nach IOC-Konsensus 2023 (Mountjoy et al., BJSM).
// Später ausbaubar für Kooperationen mit Sportmedizin und Vereinen.

const CORE = [
  'Eine längerfristig zu geringe Energieverfügbarkeit – also zu wenig Energie für den Körper, nachdem das Training „bezahlt“ ist – kann Gesundheit und Leistungsfähigkeit beeinträchtigen.',
  'RED-S kann Frauen und Männer betreffen.',
  'Mögliche Auswirkungen betreffen unter anderem den Knochenstoffwechsel, das Hormonsystem und die Regeneration.',
  'Die Energielücke entsteht nicht immer absichtlich – etwa wenn bei steigendem Trainingsumfang die Ernährung nicht mitwächst.',
];

const WARN = ['wiederkehrende Stressfrakturen', 'ausbleibende Menstruation', 'starke Erschöpfung', 'deutlicher Gewichtsverlust'];

const GROUPS = [
  'Ausdauersport',
  'Radsport und Triathlon',
  'Gewichtsklassensport',
  'ästhetische Sportarten',
  'Athletinnen und Athleten mit Stressfrakturen',
  'sehr hohe Trainingsbelastung bei geringer Energieaufnahme',
];

const ROLE = [
  { icon: Bone, t: 'Knochenmineraldichte', d: 'Die Knochendichtemessung zeigt, ob die Knochendichte für Alter und Geschlecht niedrig ist.' },
  { icon: Activity, t: 'Körperzusammensetzung', d: 'Die Körperanalyse erfasst Fettmasse und magere Weichteilmasse und deren Verteilung.' },
  { icon: Repeat, t: 'Verlauf', d: 'Wiederholte Messungen dokumentieren Veränderungen während Behandlung und Trainingsanpassung.' },
];

const SportPage = () => (
  <GoalPage>
    <GoalHero
      goalId="sport"
      eyebrow="DEXA für Sportlerinnen und Sportler"
      lead="Hohe Trainingsbelastung braucht ausreichend Energie. Fehlt sie über längere Zeit, können Knochen, Hormonsystem und Leistungsfähigkeit leiden – ein Zustand, den das Internationale Olympische Komitee als RED-S beschreibt."
      facts={['Knochendichte', 'Körperzusammensetzung', 'Verlaufskontrolle']}
    />

    <Section labelledBy="reds-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="reds-title" title="Was ist RED-S?" className="!mb-6" />
          <P className="mb-5">
            RED-S steht für „Relative Energy Deficiency in Sport“, auf Deutsch relatives Energiedefizit im Sport. Grundlage
            dieser Seite ist der Konsensus des Internationalen Olympischen Komitees (IOC) aus dem Jahr 2023.
          </P>
          <Bullets items={CORE} />
        </div>
        <SeeDoctor title="Diese Warnzeichen brauchen eine medizinische Abklärung" className="self-start">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {WARN.map((w) => <li key={w}>{w}</li>)}
          </ul>
          <p className="mt-3">
            Erste Anlaufstelle ist eine Sportmedizinerin, ein Sportmediziner oder Ihre Hausärztin bzw. Ihr Hausarzt.
          </p>
        </SeeDoctor>
      </div>
    </Section>

    <Section tone="muted" labelledBy="gruppen-title">
      <SectionHeading id="gruppen-title" title="DEXA für Sportler: wen RED-S häufiger betrifft" />
      <Bullets items={GROUPS} cols />
    </Section>

    <Section labelledBy="rolle-title">
      <SectionHeading id="rolle-title" title="Was die DEXA-Messung beitragen kann" />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ROLE.map((r) => (
          <li key={r.t} className="flex">
            <Card className="w-full" padding="p-5 sm:p-6">
              <r.icon size={24} aria-hidden="true" className="text-brand dark:text-brand-300" />
              <H3 className="mt-3 !text-lg">{r.t}</H3>
              <P className="mt-2">{r.d}</P>
            </Card>
          </li>
        ))}
      </ul>
      <Notice tone="important" className="mt-8 max-w-4xl" title="DEXA allein diagnostiziert kein RED-S" headingLevel={3}>
        <p>
          Erforderlich ist eine umfassende sportmedizinische und gegebenenfalls ernährungsmedizinische Beurteilung. Der
          IOC-Konsensus enthält zudem eigene Empfehlungen für einen sicheren, verantwortungsvollen Umgang mit
          Körper{'\u00AD'}zusammensetzungs{'\u00AD'}messungen im Sport – Messwerte sollen die Gesundheit schützen und nicht Druck auf Gewicht
          oder Aussehen erzeugen.
        </p>
      </Notice>
      <Placeholder internal className="mt-6 max-w-4xl">
        Spezialthema für spätere Kooperationen mit Sportmedizin und Vereinen (Ansprechpartner, Zuweisungsweg) – noch offen.
      </Placeholder>
      <p className="mt-6 flex flex-col gap-1 sm:flex-row sm:gap-6">
        <Link to="/gesundheitsziele/fitness-muskelaufbau" className={textLink}>
          Körperanalyse für Fitness und Training <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </Section>

    <RelatedGoals ids={['fitness', 'wechseljahre']} />
    <SourcesSection keys={['ioc2023', 'iscd']} />

    <MultiCTA
      id="sport-cta-title"
      title="Messung nach ärztlicher Abklärung"
      text="Knochendichte und Körperzusammensetzung sind zwei getrennte Untersuchungen."
      items={[
        { service: 'knochendichte', title: 'Knochendichtemessung', bookingLabel: 'Knochendichte buchen', to: '/knochendichtemessung-graz', linkLabel: 'Zur Knochendichtemessung' },
        { service: 'koerperanalyse', title: 'Körperanalyse', bookingLabel: 'Körperanalyse buchen', to: '/koerperanalyse-graz', linkLabel: 'Zur Körperanalyse' },
      ]}
    />
  </GoalPage>
);

export default SportPage;
