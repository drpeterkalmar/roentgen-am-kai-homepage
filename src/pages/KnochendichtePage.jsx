import React from 'react';
import { Maximize, CreditCard } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

const KnochendichtePage = () => {
  const faqItems = [
    {
      question: "Was ist eine DEXA-Knochendichtemessung?",
      answer: "Die DEXA-Methode (Dual-Energy X-ray Absorptiometry) ist der weltweite Goldstandard zur Diagnose von Osteoporose. Sie misst präzise den Mineralgehalt der Knochen bei minimaler Strahlenbelastung."
    },
    {
      question: "Übernimmt die Krankenkasse die Kosten für die Knochendichtemessung?",
      answer: "Wir haben Direktverrechnungsverträge mit der BVAEB, SVS und KFA-Graz. Für ÖGK-Versicherte fungieren wir als Wahlarzt; Sie bezahlen die Untersuchung vorab und können den Anteil bei der ÖGK zur Rückerstattung einreichen."
    },
    {
      question: "Muss ich für die DEXA-Untersuchung nüchtern sein?",
      answer: "Nein, für eine Knochendichtemessung oder Körperfettanalyse ist keine spezielle Vorbereitung erforderlich. Sie müssen nicht nüchtern erscheinen."
    },
    {
      question: "Wie oft sollte die Knochendichte gemessen werden?",
      answer: "In der Regel ist eine Kontrolle alle 1-2 Jahre sinnvoll, um den Erfolg einer Therapie zu überwachen oder den Verlauf einer Osteopenie/Osteoporose zu dokumentieren."
    }
  ];

  return (
    <>
      <SEO 
        title="DEXA Knochendichtemessung" 
        description="DEXA-Knochendichtemessung und Osteoporose-Vorsorge in Graz. Goldstandard-Messung inklusive FRAX-Score und Manitoba Risikoklasse. Kurze Wartezeiten."
        keywords="Knochendichtemessung Graz, DEXA Messung Graz, Osteoporose Graz, Knochendichte messen, FRAX Score, Manitoba Studie, Radiologie Graz"
      />
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
      imageUrl="/assets/images/knochendichte_v3.avif"
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
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Umfassende Risikoanalyse: FRAX & Manitoba</h2>
        <p>
          Für eine optimale und individuell angepasste Therapieplanung reicht die alleinige Messung der Knochendichte oft nicht aus. Deshalb berechnen wir standardmäßig zwei weitere essenzielle Diagnose-Parameter für Sie mit:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-80 transition-opacity" />
            <h3 className="text-lg font-bold text-[#8B2323] mb-3 relative z-10">FRAX-Score</h3>
            <p className="text-sm text-gray-700 leading-relaxed relative z-10">
              Der <strong>FRAX-Algorithmus</strong> (Fracture Risk Assessment Tool) berechnet Ihr individuelles, prozentuales Risiko, innerhalb der nächsten 10 Jahre einen durch Osteoporose bedingten Knochenbruch zu erleiden. Hierbei fließen neben der reinen Knochendichte auch persönliche klinische Risikofaktoren (wie Alter, Gewicht, Vorerkrankungen und familiäre Vorbelastung) direkt in die Auswertung mit ein.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-80 transition-opacity" />
            <h3 className="text-lg font-bold text-[#8B2323] mb-3 relative z-10">Risikoklasse nach Manitoba</h3>
            <p className="text-sm text-gray-700 leading-relaxed relative z-10">
              Basierend auf den Erkenntnissen der groß angelegten kanadischen <strong>Manitoba-Studie</strong> ordnen wir Ihr tatsächliches Frakturrisiko noch genauer ein. Dieses System kombiniert Ihren Knochendichte-Wert systematisch mit weiteren Alters- und Risikofaktoren und stuft Sie in eine niedrige, mittlere oder hohe Risikoklasse ein. Dies bildet die perfekte Grundlage für eine ärztliche Therapieentscheidung.
            </p>
          </div>
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
        <p className="text-sm text-gray-500 italic mb-12">
          Die Körperfettanalyse ist eine reine Privatleistung und wird von der Krankenkasse nicht bezahlt. Knochendichtemessung und Körperfettmessung können beim selben Termin durchgeführt werden.
        </p>
      </section>

      <FAQ items={faqItems} title="Häufige Fragen zur Knochendichtemessung" />
    </ServiceLayout>
    </>
  );
};

export default KnochendichtePage;
