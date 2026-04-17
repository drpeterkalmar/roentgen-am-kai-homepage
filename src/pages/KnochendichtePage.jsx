import React from 'react';
import { Maximize, CreditCard } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';

const KnochendichtePage = () => {
  return (
    <ServiceLayout
      title="Knochendichtemessung"
      subtitle="Wir bieten Ihnen ein einfaches und schonendes Verfahren zur Diagnose Ihrer Knochendichte bzw. Ihrer Körperfettanalyse im Zentrum von Graz."
      icon={<Maximize size={32} />}
      preparation={[
        'Keine spezielle Vorbereitung erforderlich.',
        'Sie müssen nicht nüchtern sein.',
        'DEXA-Untersuchungen sind bei uns jederzeit möglich.'
      ]}
      requirements={[
        'Überweisungsschein (Papier oder digital)',
        'Aktuelle e-Card',
        'Eventuelle Voraufnahmen zum Vergleich'
      ]}
      imageUrl="/assets/images/knochendichte.webp"
    >
      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">DEXA – der Goldstandard</h2>
        <p>
          Nach Europäischen Leitlinien ist die Dual Energy X-ray Absorptiometry (DXA/DEXA) das am meisten etablierte Verfahren zur Knochendichtemessung (Osteoporose-Diagnose). Dieses Verfahren ist eine spezielle Röntgentechnik mit minimaler Strahlendosis.
        </p>
        <p>
          Wenn Sie über DEXA eine Knochendichtemessung vornehmen lassen, wird eine beginnende Osteoporose frühzeitig diagnostiziert und das Risiko für Knochenbrüche kann durch gezielte Therapiemaßnahmen minimiert werden.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-[Outfit]">Bestimmte Werte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Knochendichte (BMD)',
            'Knochenmineralgehalt (BMC)',
            'Trabecular Bone Score (TBS)'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Wann ist eine Knochendichtemessung sinnvoll?</h2>
        <p>
          Die Knochendichtemessung ist die Standardmethode zur Früherkennung einer Osteoporose bzw. für die Verlaufskontrolle während einer Osteoporose-Behandlung.
        </p>
        <p>
          Unklare Knochenbrüche oder eine schlechte Heilung nach Knochenbrüchen, aber auch familiär gehäufte Fälle von Knochenschwund können ein Hinweis auf das Vorliegen einer Osteoporose sein. Ebenso können manche Krebserkrankungen, Fehlernährung sowie gewisse Medikamente (z.B. Kortison) Osteoporose zur Folge haben.
        </p>
      </section>

      <section className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[Outfit] flex items-center gap-3">
          <CreditCard size={24} className="text-[#8B2323]" />
          Verrechnung & Krankenkassen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-[#8B2323] mb-2 uppercase tracking-widest text-xs">Direktverrechnung</h4>
            <p className="text-sm text-gray-600">
              Mit Patienten, die bei der <strong>BVA, SVA und der KFA-Graz</strong> versichert sind, können wir die Knochendichtemessung vornehmen und nach Vorlage eines Überweisungsscheins direkt mit dem zuständigen Versicherungsträger verrechnen.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-red-50">
            <h4 className="font-bold text-[#8B2323] mb-2 uppercase tracking-widest text-xs">Wahlarzt (ÖGK)</h4>
            <p className="text-sm text-gray-600">
              Für die Knochendichtemessung besteht <strong>keine Direktverrechnung mit der ÖGK</strong>. Sie bezahlen die Untersuchung selbst und bekommen mit einer Überweisung einen Anteil von Ihrer Krankenkasse zurück.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Ganzkörperfettanalyse</h2>
        <p>
          Die Ganzkörperfettanalyse mit der DEXA-Methode liefert exakte und wertvolle Informationen über die Zusammensetzung Ihres Körpers:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            'Körperfett',
            'Muskelmasse',
            'Fettverteilung',
            'Body-Mass-Index (BMI)',
            'Relativer Skelett-/Muskelindex (RSMI)',
            'Ruhende Stoffwechselrate (RMR)'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
        <p>
          Anhand dieser Daten können ernährungs- oder trainingsbedingte Veränderungen zwischen Körperfett und Muskelmasse gezielt dargestellt und Diät- bzw. Trainingspläne entsprechend optimiert werden.
        </p>
        <p className="text-sm text-gray-500 italic">
          Die Körperfettanalyse ist eine reine Privatleistung und wird von der Krankenkasse nicht bezahlt. Knochendichtemessung und Körperfettmessung können beim selben Termin durchgeführt werden.
        </p>
      </section>
    </ServiceLayout>
  );
};

export default KnochendichtePage;
