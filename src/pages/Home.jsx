import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import { SectionHeading } from '../components/ui/Heading';
import { BookingButton, PhoneButton } from '../components/ui/BookingButtons';
import Card from '../components/ui/Card';
import CTASection from '../components/ui/CTASection';
import Notice from '../components/ui/Notice';
import { buttonClasses } from '../components/ui/Button';
import { INSURANCE_SUMMARY } from '../components/ui/ReferralInfo';
import ServiceGrid from '../components/ServiceGrid';
import PatientPortal from '../components/PatientPortal';
import { OPENING_HOURS } from '../data/practice';

const img = (name) => `${import.meta.env.BASE_URL}assets/images/${name}`;

const Home = () => (
  <>
    <Hero
      eyebrow="Fachärzte für Radiologie"
      title="Radiologie in Graz"
      lead="Mammographie und Brustvorsorge, DEXA-Knochendichtemessung und DEXA-Körperanalyse – dazu digitales Röntgen, Ultraschall und weitere Untersuchungen. Alle Kassen und privat."
      actions={<><BookingButton size="lg" /><PhoneButton size="lg" /></>}
      meta={<>Öffnungszeiten: {OPENING_HOURS.map((h) => `${h.short} ${h.opens}–${h.closes}`).join(', ')} Uhr · Körösistraße 9, 8010 Graz</>}
      image={{
        // identisch zum Preload in index.html (srcset/sizes), sonst lädt der Browser doppelt
        src: img('hero-slide-1.avif'),
        srcSet: `${img('hero-slide-1-mobile.avif')} 800w, ${img('hero-slide-1-tablet.avif')} 1200w, ${img('hero-slide-1.avif')} 1920w`,
        sizes: '(max-width: 1023px) 100vw, 50vw',
        alt: 'Eingang der Ordination Röntgen am Kai in der Körösistraße 9, Graz',
        width: 800,
        height: 600,
        priority: true,
      }}
    />

    <PatientPortal />

    <Section id="services" labelledBy="schwerpunkte-title">
      <SectionHeading
        id="schwerpunkte-title"
        eyebrow="Unsere Schwerpunkte"
        title="Vorsorge und Diagnostik"
        lead="Diese Untersuchungen können Sie online buchen."
      />
      <ServiceGrid keys={['mammographie', 'knochendichte', 'koerperanalyse']} featured />
    </Section>

    <Section tone="muted" labelledBy="weitere-title">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading id="weitere-title" title="Weitere Untersuchungen" className="mb-0" />
        <Link to="/weitere-untersuchungen" className={buttonClasses({ variant: 'ghost', className: '-ml-3 sm:ml-0' })}>
          Alle ansehen <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <ServiceGrid keys={['roentgen', 'ultraschall', 'durchleuchtung', 'dvt']} columns={2} />
    </Section>

    <Section labelledBy="info-title">
      <SectionHeading id="info-title" title="Gut zu wissen" />
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Überweisung und Kasse</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {INSURANCE_SUMMARY} Bitte bringen Sie Ihre e-Card und – falls vorhanden – Ihre Überweisung mit.
          </p>
        </Card>
        <Card>
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Voraufnahmen</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Bringen Sie Voraufnahmen und Befunde anderer Institute mit – sie sind für den Vergleich wichtig.
          </p>
        </Card>
      </div>
      <Notice tone="info" title="Kein CT und kein MRT" className="mt-5">
        Wir bieten kein CT und kein MRT an. Wir empfehlen hierfür z. B. das nahegelegene{' '}
        <a href="https://kreuzschwestern-graz.at/ct-mr-zentrum/" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
          Institut der Kreuzschwestern Graz<span className="sr-only"> (öffnet in neuem Fenster)</span>
        </a>.
      </Notice>
    </Section>

    <Section tone="muted" labelledBy="team-title">
      <SectionHeading
        id="team-title"
        title="Unsere Ärzte"
        lead="Dr. Kalmar und Dr. Riegler, Fachärzte für Radiologie mit langjähriger Erfahrung in Diagnostik und Intervention."
      />
      <ul className="grid gap-5 md:grid-cols-2">
        {[
          { name: 'Priv. Doz. Dr. Georg Riegler', href: '/unser-team/dr-georg-riegler' },
          { name: 'Priv. Doz. Dr. Peter Kalmar', href: '/unser-team/dr-peter-kalmar' },
        ].map((d) => (
          <li key={d.href}>
            <Card className="flex h-full items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  <Link to={d.href} className="underline-offset-4 hover:text-brand hover:underline dark:hover:text-brand-300">{d.name}</Link>
                </h3>
                <p className="text-slate-600 dark:text-slate-300">Facharzt für Radiologie</p>
              </div>
              <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" />
            </Card>
          </li>
        ))}
      </ul>
    </Section>

    <CTASection />
  </>
);

export default Home;
