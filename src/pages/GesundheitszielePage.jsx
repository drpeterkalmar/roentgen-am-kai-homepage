import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Placeholder from '../components/ui/Placeholder';
import CTASection from '../components/ui/CTASection';
import { SectionHeading } from '../components/ui/Heading';
import { goals } from '../data/goals';
import { services } from '../data/services';

// Einstieg über das Anliegen. Ausführliche Texte je Ziel sind noch ärztlich freizugeben (Platzhalter).
const GesundheitszielePage = () => (
  <>
    <Hero
      breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Gesundheitsziele' }]}
      title="Gesundheitsziele"
      lead="Finden Sie die passende Untersuchung für Ihr Anliegen."
    />
    {goals.map((g, i) => (
      <Section key={g.id} id={g.id} tone={i % 2 ? 'muted' : 'white'} labelledBy={`ziel-${g.id}`}>
        <SectionHeading id={`ziel-${g.id}`} title={g.title} lead={g.text} />
        <Placeholder className="mb-6 max-w-2xl">Ausführlicher Text zum Gesundheitsziel „{g.title}“ (ärztlich freizugeben)</Placeholder>
        <ul className="flex flex-wrap gap-x-6" aria-label={`Passende Untersuchungen: ${g.title}`}>
          {g.services.map((k) => (
            <li key={k}>
              <Link to={services[k].href} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
                {services[k].title} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    ))}
    <CTASection />
  </>
);

export default GesundheitszielePage;
