import React from 'react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Placeholder from '../components/ui/Placeholder';
import CTASection from '../components/ui/CTASection';
import { SectionHeading } from '../components/ui/Heading';
import ServiceGrid from '../components/ServiceGrid';

// Gerüst: Einstieg über das Anliegen der Patientin / des Patienten statt über das Verfahren.
// Die Texte je Gesundheitsziel sind noch von der Praxis zu liefern und ärztlich freizugeben.
const goals = [
  { id: 'brust', title: 'Brustgesundheit', service: 'mammographie' },
  { id: 'knochen', title: 'Knochengesundheit', service: 'knochendichte' },
  { id: 'koerper', title: 'Körperzusammensetzung', service: 'koerperanalyse' },
];

const GesundheitszielePage = () => (
  <>
    <Hero
      breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Gesundheitsziele' }]}
      title="Gesundheitsziele"
      lead="Finden Sie die passende Untersuchung für Ihr Anliegen."
    >
      <Placeholder className="mt-6">Einleitungstext „Gesundheitsziele“ (ärztlich freizugeben)</Placeholder>
    </Hero>
    {goals.map((g, i) => (
      <Section key={g.id} tone={i % 2 ? 'muted' : 'white'} labelledBy={`ziel-${g.id}`}>
        <SectionHeading id={`ziel-${g.id}`} title={g.title} />
        <Placeholder className="mb-8 max-w-2xl">Text zum Gesundheitsziel „{g.title}“ (ärztlich freizugeben)</Placeholder>
        <ServiceGrid keys={[g.service]} featured columns={2} />
      </Section>
    ))}
    <CTASection />
  </>
);

export default GesundheitszielePage;
