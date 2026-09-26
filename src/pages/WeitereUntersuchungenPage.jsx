import React from 'react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Notice from '../components/ui/Notice';
import Placeholder from '../components/ui/Placeholder';
import CTASection from '../components/ui/CTASection';
import { PhoneButton } from '../components/ui/BookingButtons';
import ServiceGrid from '../components/ServiceGrid';

const WeitereUntersuchungenPage = () => (
  <>
    <Hero
      breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Weitere Untersuchungen' }]}
      title="Weitere Untersuchungen"
      lead="Digitales Röntgen, Ultraschall, Durchleuchtung, Phlebographie sowie DVT und Zahnröntgen. Röntgen können Sie online buchen, alle anderen Untersuchungen telefonisch."
      actions={<PhoneButton variant="primary" />}
    />
    <Section labelledBy="uebersicht-title">
      <h2 id="uebersicht-title" className="sr-only">Übersicht</h2>
      <ServiceGrid keys={['roentgen', 'ultraschall', 'durchleuchtung', 'phlebographie', 'dvt']} headingLevel={3} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Notice tone="info" title="Durchleuchtung">
          Videoschluckakt, Untersuchung der Speiseröhre (Ösophagus), Magen und Phlebographie.
          <Placeholder className="mt-3">Eigene Seite „Durchleuchtung“ mit Ablauf und Vorbereitung</Placeholder>
        </Notice>
        <Notice tone="info" title="Kein CT und kein MRT">
          Wir bieten kein CT und kein MRT an. Wir empfehlen hierfür z. B. das nahegelegene Institut der Kreuzschwestern Graz.
        </Notice>
      </div>
    </Section>
    <CTASection />
  </>
);

export default WeitereUntersuchungenPage;
