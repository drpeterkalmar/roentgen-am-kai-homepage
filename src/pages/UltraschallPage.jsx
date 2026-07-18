import React from 'react';
import { Waves } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';

const UltraschallPage = () => {
  return (
    <ServiceLayout
      title="Ultraschall"
      subtitle="Ultraschall für Organe, Gelenke und Gefäße. Eine der häufigsten Untersuchungen in unserer Praxis."
      icon={<Waves size={32} />}
      preparation={[
        'Oberbauch-Ultraschall: Bitte kommen Sie nüchtern – mindestens 6 Stunden vorher nicht essen, nicht rauchen, kein Kaffee. Stilles Wasser ist erlaubt.',
        'Unterbauch-Ultraschall: Bitte mit gefüllter Blase zur Untersuchung erscheinen.',
        'Schilddrüse/Hals/Brust/Gelenke: Keine spezielle Vorbereitung erforderlich.',
        'Ultraschalluntersuchungen sind nur mit Voranmeldung möglich!'
      ]}
      requirements={[
        'Überweisungsschein (Papier oder digital)',
        'Aktuelle e-Card',
        'Eventuelle Voraufnahmen zum Vergleich'
      ]}
      imageUrl="/assets/images/ultraschall.avif"
    >
      <section className="space-y-6 mb-12">
        <p>
          Der Ultraschall wird zu diagnostischen Zwecken bzw. als Vorsorgeuntersuchung eingesetzt, auch der Verlauf einer Therapie kann damit kontrolliert werden.
        </p>
        <p>
          Wir arbeiten mit modernsten Ultraschallgeräten der Firma GE.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-[Outfit]">Unser Untersuchungsspektrum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Oberbauchorgane (Leber, Gallenblase, Milz, Bauchspeicheldrüse)',
            'Unterbauchorgane (Blase, Gebärmutter, Eierstöcke)',
            'Nieren und ableitende Harnwege',
            'Halsorgane (Speicheldrüse, Schilddrüse)',
            'Darstellung von Lymphknoten',
            'Weichteil- und Gelenkssonographie (Sehnen, Schleimbeutel, Muskulatur)',
            'Brustdiagnostik',
            'Farbdoppler: Beinvenen und -arterien (Thrombosen, Gefäßverschlüsse)',
            'Farbdoppler: Große Halsgefäße (Carotiden)',
            'Hochauflösender Nervenultraschall (Privatleistung)'
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0 mt-1.5" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </ServiceLayout>
  );
};

export default UltraschallPage;
