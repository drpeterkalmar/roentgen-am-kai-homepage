import React from 'react';
import { Scale, AlertCircle } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';
import SEO from '../components/SEO';

import FAQ from '../components/FAQ';

const KoerperfettPage = () => {
  const faqItems = [
    {
      question: "Was ist eine DEXA-Körperfettmessung?",
      answer: "Die DEXA-Methode (Dual-Energy X-ray Absorptiometry) gilt als Goldstandard zur Bestimmung der Körperzusammensetzung. Sie liefert präzise Daten zu Körperfett, Muskelmasse und Fettverteilung."
    },
    {
      question: "Für wen ist eine Körperfettanalyse sinnvoll?",
      answer: "Die Messung ist ideal für Sportler zur Trainingsoptimierung, bei Diäten zur Kontrolle des Fettabbaus oder für gesundheitsbewusste Menschen zur Bestimmung des viszeralen Fetts."
    },
    {
      question: "Muss ich für die Messung nüchtern sein?",
      answer: "Nein, eine spezielle Vorbereitung ist nicht nötig. Sie können die Untersuchung jederzeit ohne Fasten durchführen lassen."
    }
  ];

  return (
    <>
      <SEO 
        title="Core Scan (DEXA) – Körperfett & Viszeralfett messen in Graz"
        description="Exakte DEXA-Körperfettmessung (Core Scan) in Graz. Goldstandard für Körperzusammensetzung, Viszeralfett, Muskelmasse (RSMI) & Stoffwechselrate (RMR). Für Sport, Diät, Gesundheit."
        keywords="Core Scan Graz, Körperfettmessung Graz, DEXA Scan Graz, Viszeralfett messen Graz, Muskelmasse messen, Körperzusammensetzung Analyse, Radiologie Graz"
      />
      <ServiceLayout
        title="Körperfettmessung"
      subtitle="Die DEXA-Methode gilt als Goldstandard bei der Bestimmung von Fett- und Muskelmasse. Mit einer Ganzkörperfettanalyse erhalten Sie exakte Informationen über Ihre Körperzusammensetzung."
      icon={<Scale size={32} />}
      preparation={[
        'Keine spezielle Vorbereitung erforderlich.',
        'Sie müssen nicht nüchtern sein.',
        'Kann beim selben Termin wie die Knochendichtemessung durchgeführt werden.'
      ]}
      requirements={[
        'Überweisungsschein (Papier oder digital)',
        'Aktuelle e-Card',
        'Eventuelle Voraufnahmen zum Vergleich'
      ]}
      imageUrl="/assets/images/koerperfett.avif"
    >
      <section className="bg-amber-50 dark:bg-amber-900/20 rounded-[32px] p-6 border border-amber-200 dark:border-amber-900/30 mb-12 flex items-start gap-4">
        <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-1" size={24} />
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          <strong>Hinweis:</strong> Die Körperfettanalyse ist eine reine Privatleistung und wird von der Krankenkasse nicht bezahlt.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Was ist DEXA?</h2>
        <p>
          DEXA steht für „Dual Energy X-ray Absorptiometry" (Dual-Röntgen-Absorptiometrie). Es handelt sich um eine spezielle Röntgentechnik mit minimaler Strahlendosierung. Nach europäischen Leitlinien ist DEXA das etablierteste Verfahren zur Messung der Knochendichte und zur Körperfettanalyse.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Für wen ist die Messung sinnvoll?</h2>
        <p>
          Eine Körperfettmessung mit DEXA ist für jeden sinnvoll, der seine Körperzusammensetzung aus Fett und Muskeln kennen möchte – z.B. Menschen, die ihr Gewicht durch Sport und Diät optimieren wollen, oder Sportler, die ihr Wettkampfgewicht optimieren möchten.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-[Outfit]">Was wird gemessen?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Körperfett',
            'Muskelmasse',
            'Fettverteilung',
            'Body-Mass-Index (BMI)',
            'Relativer Skelett-/Muskelindex (RSMI)',
            'Ruhende Stoffwechselrate (RMR)'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 mb-12">
        <p>
          Mit Hilfe dieser Informationen können Ernährung und Training so optimiert werden, dass Körperfett gezielt abgebaut und Muskelmasse aufgebaut wird. Die DEXA-Messung erlaubt es, anhand der Ergebnisse entsprechende Trainings- und Ernährungspläne zu erstellen.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Viszeralfett – das unterschätzte Gesundheitsrisiko</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Im Gegensatz zum subkutanen Fett (unter der Haut) liegt <strong>Viszeralfett</strong> tief im Bauchraum und umhüllt innere Organe wie Leber, Bauchspeicheldrüse und Darm. Es ist metabolisch hochaktiv, setzt Entzündungsbotenstoffe (Adipokine) und freie Fettsäuren direkt in die Pfortader frei und gilt als unabhängiger Risikofaktor für:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Typ-2-Diabetes & Insulinresistenz</li>
          <li>Herz-Kreislauf-Erkrankungen (Arteriosklerose, Bluthochdruck)</li>
          <li>Fettleber (NAFLD/NASH)</li>
          <li>Bestimmte Krebserkrankungen</li>
          <li>Sarkopenie (Muskelschwund im Alter)</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          Die DEXA-Messung (Core Scan) quantifiziert das Viszeralfettgewebe (VAT – Visceral Adipose Tissue) in Gramm und cm³ präzise und strahlenarm – genauer als Bauchumfang oder BMI.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#8B2323] text-white">
                <th className="p-3 text-left font-semibold">Gruppe</th>
                <th className="p-3 text-left font-semibold">Viszeralfett (VAT) Normbereich</th>
                <th className="p-3 text-left font-semibold">Erhöhtes Risiko ab</th>
                <th className="p-3 text-left font-semibold">Hohes Risiko ab</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">Männer</td>
                <td className="p-3 text-green-700 dark:text-green-400">&lt; 100 cm³ (bzw. &lt; 130 g)</td>
                <td className="p-3 text-amber-700 dark:text-amber-400">100–160 cm³</td>
                <td className="p-3 text-red-700 dark:text-red-400">&gt; 160 cm³</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-medium">Frauen</td>
                <td className="p-3 text-green-700 dark:text-green-400">&lt; 70 cm³ (bzw. &lt; 90 g)</td>
                <td className="p-3 text-amber-700 dark:text-amber-400">70–130 cm³</td>
                <td className="p-3 text-red-700 dark:text-red-400">&gt; 130 cm³</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
          * Referenzwerte basierend auf NHANES-Daten & DEXA-Validierungsstudien. Individuelle Risikobeurteilung immer im ärztlichen Kontext (Blutwerte, Familienanamnese, Lebensstil).
        </p>
      </section>

      <FAQ items={faqItems} title="Häufige Fragen zur Körperfettmessung" />
    </ServiceLayout>
    </>
  );
};

export default KoerperfettPage;
