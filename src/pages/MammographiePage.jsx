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
      answer: "Bei der Doppelbefundung wird jede Aufnahme von zwei spezialisierten Radiologen unabhängig voneinander beurteilt. Dies erhöht die Sicherheit und Genauigkeit der Diagnose erheblich."
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

      <section className="bg-red-50 rounded-[32px] p-8 border border-red-100 mb-20">
        <h2 className="text-2xl font-bold text-[#8B2323] mb-4 font-[Outfit] flex items-center gap-3">
          <Info size={24} />
          Brustkrebs-Früherkennungsprogramm
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-200">
          <p>
            Bereits seit vielen Jahren sind wir zertifizierter Standort für Mamma-Screenings bzw. Brustkrebsvorsorge in Graz. Unsere Röntgeneinrichtung erfüllt alle Anforderungen an die beste Qualität, so dass wir für Sie höchst zuverlässige Untersuchungen im Rahmen der Brustkrebsfrüherkennung durchführen können.
          </p>
          <p>
            Im Rahmen des Programms erhalten alle Frauen in der Altersgruppe zwischen <strong>45 und 74 Jahren</strong> eine Einladung zur Brustkrebsuntersuchung als Vorsorgemaßnahme und können mit ihrer <strong>e-card alle 2 Jahre</strong> zur Brustkrebsfrüherkennungsuntersuchung kommen. <strong>Eine Überweisung ist im Rahmen dieses Programms nicht nötig.</strong>
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

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">BI-RADS – Ihr Befund verständlich erklärt</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Jede Mammographie wird nach dem internationalen <strong>BI-RADS-System</strong> (Breast Imaging Reporting and Data System) kategorisiert. Dies schafft einheitliche Sprache zwischen Radiologen, Gynäkologen und Ihnen:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#8B2323] text-white">
                <th className="p-3 text-left font-semibold">Kategorie</th>
                <th className="p-3 text-left font-semibold">Bedeutung</th>
                <th className="p-3 text-left font-semibold">Empfohlenes Vorgehen</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                <td className="p-3 font-mono font-medium">BI-RADS 0</td>
                <td className="p-3">Unvollständig – Zusatzaufnahmen nötig</td>
                <td className="p-3">Nachuntersuchung (Zusatzaufnahmen, Ultraschall, ggf. MRT)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                <td className="p-3 font-mono font-medium">BI-RADS 1</td>
                <td className="p-3 text-green-700 dark:text-green-400">Negativ – Kein auffälliger Befund</td>
                <td className="p-3">Routine-Screening fortsetzen (alle 2 Jahre)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                <td className="p-3 font-mono font-medium">BI-RADS 2</td>
                <td className="p-3 text-green-700 dark:text-green-400">Gutartige Befunde (Zysten, Fibroadenome, Verkalkungen)</td>
                <td className="p-3">Routine-Screening fortsetzen, ggf. kurze Kontrolle bei erstmaligem Nachweis</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-amber-50 dark:bg-amber-900/20">
                <td className="p-3 font-mono font-medium">BI-RADS 3</td>
                <td className="p-3 text-amber-700 dark:text-amber-400">Wahrscheinlich gutartig (&lt; 2 % Malignitätswahrscheinlichkeit)</td>
                <td className="p-3">Kurzzeitkontrolle nach 6 Monaten (meist 2 Jahre stabil → BI-RADS 2)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-orange-50 dark:bg-orange-900/20">
                <td className="p-3 font-mono font-medium">BI-RADS 4</td>
                <td className="p-3 text-orange-700 dark:text-orange-400">Verdächtig (2–95 % Malignitätswahrscheinlichkeit, Unterkategorien 4a/4b/4c)</td>
                <td className="p-3">Gewebebiopsie (Stanze) zur Abklärung</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-red-50 dark:bg-red-900/20">
                <td className="p-3 font-mono font-medium">BI-RADS 5</td>
                <td className="p-3 text-red-700 dark:text-red-400">Hochverdächtig auf Malignität (&gt; 95 %)</td>
                <td className="p-3">Gewebebiopsie + schnelle onkologische Weiterversorgung</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="p-3 font-mono font-medium">BI-RADS 6</td>
                <td className="p-3">Biopsiebestätigtes Mammakarzinom (vor Therapiebeginn)</td>
                <td className="p-3">Onkologische Therapieplanung (Tumorboard)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
          <strong>Wichtig:</strong> Nur BI-RADS 4–6 erfordern eine Biopsie. BI-RADS 0–3 bedeuten <strong>keinen</strong> Krebsverdacht. Unsere Doppelbefundung durch zwei spezialisierte Radiologen minimiert Fehlklassifikationen.
        </p>
      </section>

      <FAQ items={faqItems} title="Häufige Fragen zur Mammographie" />
    </ServiceLayout>
    </>
  );
};

export default MammographiePage;
