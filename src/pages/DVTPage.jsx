import React from 'react';
import { ScanSearch, AlertCircle } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';

const DVTPage = () => {
  return (
    <ServiceLayout
      title="Digitale Volumentomographie (DVT)"
      subtitle="Ein speziell für den Bereich des Gesichtsschädels entwickeltes 3D-Röntgenschichtaufnahmenverfahren. Ähnlich wie bei der Computertomographie wird das komplette Volumen dreidimensional erfasst."
      icon={<ScanSearch size={32} />}
      preparation={[
        'Keine spezielle Vorbereitung erforderlich.',
        'Schmuck und Piercings im Gesichtsbereich bitte ablegen.'
      ]}
      requirements={[
        'Überweisungsschein (Papier oder digital)',
        'Aktuelle e-Card',
        'Eventuelle Voraufnahmen zum Vergleich'
      ]}
      imageUrl="/assets/images/dvt_v3.avif"
    >
      <section className="bg-amber-50 rounded-[32px] p-6 border border-amber-200 mb-12 flex items-start gap-4">
        <AlertCircle className="text-amber-600 shrink-0 mt-1" size={24} />
        <p className="text-sm font-medium text-amber-800">
          <strong>Hinweis:</strong> Die DVT ist keine Kassenleistung.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-[Outfit]">Vorteile der DVT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Geringe Strahlenbelastung',
            'Nur geringe Metallartefakte durch Kronen oder Brücken',
            'Keine Platzangst'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 mb-12">
        <p>
          Ihr zuweisender Arzt erhält so für die Befundung und Ihre Behandlungsplanung wichtige und umfassende Informationen. Jede Behandlung kann mit dieser Bildgebung sorgfältig geplant und individuell optimal vorbereitet werden.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-[Outfit]">Einsatzgebiete</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Planung bei Zahnimplantaten (zur Abgrenzung der Nervenkanäle und Knochendichte des Ober- und Unterkiefers)',
            'Abklärung von überzähligen Zahnanlagen bei Kindern',
            'Darstellung der Strukturen im Kieferbereich (Knochen, Zähne, Nerven)',
            'Darstellung der Nasen-, Kiefer- und Nebenhöhlen',
            'Knochendichtebeurteilung im Kieferbereich',
            'Präoperative Planungsbilder ohne Platzangst'
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0 mt-1.5" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </ServiceLayout>
  );
};

export default DVTPage;
