import React from 'react';
import { Heart, Phone, Info, ExternalLink } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';

const MammographiePage = () => {
  return (
    <ServiceLayout
      title="Mammographie"
      subtitle="Die Mammographie ist das am meisten etablierte Verfahren in der Brustdiagnostik. Die Brustdiagnostik bildet einen Schwerpunkt in unserer Praxis."
      icon={<Heart size={32} />}
      preparation={[
        'Am Tag der Untersuchung bitte kein Puder, Deo oder Körperlotion im Brustbereich verwenden.',
        'Bitte bringen Sie Voraufnahmen und Befunde von anderen Instituten mit – das ist sehr wichtig für den Vergleich!'
      ]}
      requirements={[
        'Überweisungsschein (Papier oder digital)',
        'Aktuelle e-Card',
        'Eventuelle Voraufnahmen zum Vergleich'
      ]}
      imageUrl="/assets/images/mammographie.webp"
    >
      <section className="space-y-6 mb-12">
        <p>
          Mit Hilfe von Röntgenstrahlen werden Aufnahmen der Brust erstellt. Dadurch können bereits kleinste Veränderungen im Gewebe diagnostiziert werden. Durch eine frühzeitige Behandlung wächst die Chance auf Erfolg selbst bei ernsthaften Erkrankungen wie Brustkrebs.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Modernstes Mammographiegerät</h2>
        <p>
          Mit dem Mammomat Inspiration der Firma Siemens steht uns das modernste digitale Mammographiegerät mit der neuesten Vollfeld-Detektortechnologie zur Verfügung. Ein weiterer Vorteil dieses Systems ist eine bis zu 50 % geringere Strahlendosis bei besserer Qualität.
        </p>
        <p>
          Unsere Praxis ist zertifizierter Screeningstandort im Rahmen des österreichischen Brustkrebsfrüherkennungs-Programms und wird regelmäßig überprüft hinsichtlich:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Bildqualität', 'Geräteausstattung', 'Fachwissen und laufende Fortbildung der Mitarbeiter'].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
        <p>
          Für uns ist bei der Mammographie die Doppelbefundung – d.h. Beurteilung jeder Mammographie durch zwei fachkundige Radiologen – selbstverständlich. Die leitenden Ärzte weisen eine jahrzehntelange Erfahrung in Brustdiagnostik mit mehr als 100.000 selbst befundeten Mammographien auf.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Mamma-Ultraschall</h2>
        <p>
          Der Ultraschall der Brust wird als Einzeluntersuchung oder bei Bedarf in Ergänzung zur Mammographie durchgeführt. Er wird insbesondere bei jungen Frauen und Frauen mit einem dichten Brustgewebe angewendet.
        </p>
        <p>
          Der Ultraschall wird in der Brustkrebsvorsorge als Zusatzuntersuchung zur Mammographie eingesetzt, er ersetzt jedoch nicht die Mammographie bei der Brustkrebsfrüherkennung, da gewisse Veränderungen wie z.B. Mikroverkalkungen mit dieser Methode nicht beurteilt werden können.
        </p>
      </section>

      <section className="bg-red-50 rounded-[32px] p-8 border border-red-100 mb-12">
        <h2 className="text-2xl font-bold text-[#8B2323] mb-4 font-[Outfit] flex items-center gap-3">
          <Info size={24} />
          Brustkrebs-Früherkennungsprogramm
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Bereits seit vielen Jahren sind wir zertifizierter Standort für Mamma-Screenings bzw. Brustkrebsvorsorge in Graz. Unsere Röntgeneinrichtung erfüllt alle Anforderungen an die beste Qualität, so dass wir für Sie höchst zuverlässige Untersuchungen im Rahmen der Brustkrebsfrüherkennung durchführen können.
          </p>
          <p>
            Im Rahmen des Programms erhalten alle Frauen in der Altersgruppe zwischen <strong>45 und 74 Jahren</strong> eine Einladung zur Brustkrebsuntersuchung als Vorsorgemaßnahme und können mit ihrer <strong>e-card alle 2 Jahre</strong> zur Brustkrebsfrüherkennungsuntersuchung kommen. <strong>Eine Überweisung ist im Rahmen dieses Programms nicht nötig.</strong>
          </p>
          <p>
            Wenn Sie zwischen 40 und 44 Jahre bzw. über 74 Jahre alt sind, können Sie auf eigenen Wunsch ebenfalls am Programm für Brustkrebsvorsorge teilnehmen:
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-red-50">
            <div className="flex items-center gap-3">
              <Phone className="text-[#8B2323]" size={20} />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Serviceline</p>
                <p className="text-lg font-bold text-[#8B2323]">0800 500 181</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">oder online auf</span>
            <a href="http://www.frueh-erkennen.at/" target="_blank" rel="noopener noreferrer" className="text-[#8B2323] font-bold flex items-center gap-1 hover:underline">
              www.frueh-erkennen.at
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default MammographiePage;
