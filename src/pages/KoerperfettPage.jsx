import React from 'react';
import { Scale, AlertCircle } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';

const KoerperfettPage = () => {
  return (
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
      imageUrl="/assets/images/koerperfett.jpg"
    >
      <section className="bg-amber-50 rounded-[32px] p-6 border border-amber-200 mb-12 flex items-start gap-4">
        <AlertCircle className="text-amber-600 shrink-0 mt-1" size={24} />
        <p className="text-sm font-medium text-amber-800">
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
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
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
    </ServiceLayout>
  );
};

export default KoerperfettPage;
