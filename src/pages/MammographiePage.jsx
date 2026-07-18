import React from 'react';
import { HeartPulse, Phone, Info, ExternalLink } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

const MammographiePage = () => {
  const faqItems = [
    {
      question: "Wann ist eine Mammographie sinnvoll?",
      answer: "Im Rahmen des österreichischen Brustkrebs-Früherkennungsprogramms ist eine Vorsorgemammographie alle 2 Jahre für Frauen zwischen 45 und 74 Jahren ohne Überweisung möglich. Außerhalb dieses Bereichs oder bei Beschwerden ist eine Untersuchung ab 40 Jahren mit Überweisung ratsam."
    },
    {
      question: "Ist die Mammographie bei Röntgen am Kai schmerzhaft?",
      answer: "Wir verwenden den modernsten Mammomat Inspiration von Siemens. Dieses Gerät passt den Kompressionsdruck individuell an und reduziert die Strahlendosis um bis zu 50%, was die Untersuchung deutlich angenehmer macht und eine exzellente Bildqualität liefert."
    },
    {
      question: "Benötige ich für das Mammographie-Screening eine Überweisung?",
      answer: "Wenn Sie in die Altersgruppe der 45- bis 74-Jährigen fallen oder freiwillig am erweiterten Screening teilnehmen (40-44 Jahre, älter als 74 Jahre), benötigen Sie keine Überweisung. Ihre e-Card ist für das Früherkennungsprogramm alle 2 Jahre automatisch freigeschaltet."
    },
    {
      question: "Was ist der Vorteil einer Doppelbefundung?",
      answer: "Bei der Doppelbefundung wird jede Aufnahme von zwei speziell zertifizierten Radiologen unabhängig voneinander beurteilt. Das erhöht die Genauigkeit der Diagnose."
    }
  ];

  return (
    <>
      <SEO 
        title="Mammographie & Brust-Ultraschall" 
        description="Mammographie und Brust-Ultraschall in Graz. Zertifizierter Standort für das österreichische Brustkrebs-Früherkennungsprogramm mit Doppelbefundung."
        keywords="Mammographie Graz, Brustkrebsvorsorge Graz, Brust Ultraschall Graz, Mammographie Screening, Radiologe Brustkrebs Graz"
      />
      <ServiceLayout
        title="Mammographie"
      subtitle="Die Mammographie ist das am meisten etablierte Verfahren in der Brustdiagnostik. Die Brustdiagnostik bildet einen Schwerpunkt in unserer Praxis."
      icon={<HeartPulse size={32} />}
      preparation={[
        'Am Tag der Untersuchung bitte kein Puder, Deo oder Körperlotion im Brustbereich verwenden.',
        'Bitte bringen Sie Voraufnahmen und Befunde von anderen Instituten mit – das ist sehr wichtig für den Vergleich!'
      ]}
      requirements={[
        'Überweisungsschein (Papier oder digital)',
        'Aktuelle e-Card',
        'Eventuelle Voraufnahmen zum Vergleich'
      ]}
      imageUrl="/assets/images/mammographie_v2.avif"
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
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
        <p>
          Für uns ist bei der Mammographie die Doppelbefundung – d.h. Beurteilung jeder Mammographie durch zwei fachkundige Radiologen – selbstverständlich. Die leitenden Ärzte weisen langjährige Erfahrung in Brustdiagnostik mit laufenden Weiterbildungen auf.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Mamma-Ultraschall</h2>
        <p>
          Der Ultraschall der Brust wird als Einzeluntersuchung oder bei Bedarf in Ergänzung zur Mammographie durchgeführt. Er wird insbesondere bei jungen Frauen und Frauen mit einem dichten Brustgewebe angewendet.
        </p>
        <p>
          Der Ultraschall wird in der Brustkrebsvorsorge als Zusatzuntersuchung zur Mammographie eingesetzt, er ersetzt jedoch nicht die Mammographie bei der Brustkrebsfrüherkennung, da gewisse Veränderungen weniger gut beurteilt werden können.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">BI-RADS-Kategorien – Was bedeutet mein Befund?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Die BI-RADS-Einstufung (Breast Imaging Reporting and Data System) ist ein internationaler Standard zur einheitlichen Bewertung von Brustbildgebung. Ihr Befund erhält eine Kategorie von 0 bis 6 – hier lesen Sie, was diese für Sie bedeutet:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-[#8B2323] text-white">
                <th className="px-4 py-3 text-left font-medium">Kategorie</th>
                <th className="px-4 py-3 text-left font-medium">Bedeutung für Sie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 font-bold text-[#8B2323]">BI-RADS 0</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Ergänzende Untersuchung (z.&nbsp;B. MRT) nötig – der Befund lässt sich noch nicht abschließend beurteilen</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 font-bold text-[#8B2323]">BI-RADS 1</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Unauffälliger Befund – alles normal</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 font-bold text-[#8B2323]">BI-RADS 2</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Gutartiger Befund – keine Krebsverdacht, routinemäßige Kontrollen genügen</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 font-bold text-[#8B2323]">BI-RADS 3</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Wahrscheinlich gutartig – engmaschige Verlaufskontrolle (meist nach 6&nbsp;Monaten) empfohlen</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 font-bold text-[#8B2323]">BI-RADS 4</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Verdachtsbefund – Gewebeentnahme (Biopsie) zur Abklärung notwendig</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 font-bold text-[#8B2323]">BI-RADS 5</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Hochgradig verdächtig auf Krebs – Biopsie dringend angeraten</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 font-bold text-[#8B2323]">BI-RADS 6</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Brustkrebs bereits histologisch bestätigt – Sie befinden sich in laufender Therapie</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
          <strong>Wichtig:</strong> Diese Einstufung gilt für die <strong>Bildgebung</strong> (Mammographie, Ultraschall, MRT). 
          Die endgültige Diagnose stellt nur die Gewebeuntersuchung (Biopsie). 
          Besprechen Sie Ihren Befund immer mit Ihrem behandelnden Radiologen.
        </p>
      </section>

      <section className="bg-red-50 dark:bg-red-900/20 rounded-[32px] p-8 border border-red-100 dark:border-red-900/30 mb-20">
        <h2 className="text-2xl font-bold text-[#8B2323] dark:text-[#A52A2A] mb-4 font-[Outfit] flex items-center gap-3">
          <Info size={24} />
          Brustkrebs-Früherkennungsprogramm
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-200">
          <p>
            Bereits seit vielen Jahren sind wir zertifizierter Standort für Mamma-Screenings bzw. Brustkrebsvorsorge in Graz. Unsere Röntgeneinrichtung erfüllt alle Qualitätsanforderungen des österreichischen Screening-Programms.
          </p>
          <p>
            Im Rahmen des Programms erhalten alle Frauen zwischen 45 und 74 Jahren eine Einladung zur Brustkrebsuntersuchung als Vorsorgemaßnahme und können mit ihrer e-Card alle 2 Jahre zur Brustkrebsfrüherkennungsuntersuchung kommen. Eine Überweisung ist im Rahmen dieses Programms nicht nötig.
          </p>
          <p>
            Wenn Sie zwischen 40 und 44 Jahre bzw. über 74 Jahre alt sind, können Sie auf eigenen Wunsch ebenfalls am Programm für Brustkrebsvorsorge teilnehmen:
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white dark:bg-gray-800/50 p-4 rounded-2xl shadow-sm border border-red-50 dark:border-red-900/30">
            <div className="flex items-center gap-3">
              <Phone className="text-[#8B2323]" size={20} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Serviceline</p>
                <p className="text-xl font-extrabold text-[#8B2323]">0800 500 181</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">oder online auf</span>
            <a href="http://www.frueh-erkennen.at/" target="_blank" rel="noopener noreferrer" className="text-[#8B2323] font-bold flex items-center gap-1 hover:underline">
              www.frueh-erkennen.at
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} title="Häufige Fragen zur Mammographie" />
    </ServiceLayout>
    </>
  );
};

export default MammographiePage;
