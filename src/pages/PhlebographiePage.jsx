import React from 'react';
import { Syringe, AlertTriangle } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';
import FAQ from '../components/FAQ';
import { faqData } from '../data/faqData';

const PhlebographiePage = () => {
  const LegComposite = (
    <div className="grid grid-cols-3 gap-2 md:gap-6 mb-16 px-2 md:px-0">
      {[
        { id: 1, label: "Phlebografie Oberschenkel", img: "phlebo-leg-1.avif" },
        { id: 2, label: "Phlebografie Knie", img: "phlebo-leg-2.avif" },
        { id: 3, label: "Phlebografie Unterschenkel", img: "phlebo-leg-3.avif" }
      ].map((segment) => {
        const base = import.meta.env.BASE_URL;
        const fullImg = `${base}assets/images/${segment.img}`;
        const mobileImg = fullImg.replace('.avif', '-mobile.avif');
        const tabletImg = fullImg.replace('.avif', '-tablet.avif');
        
        return (
          <div key={segment.id} className="group relative bg-[#000] border border-gray-800 flex items-center justify-center overflow-visible">
            <img 
              src={fullImg} 
              srcSet={`${mobileImg} 800w, ${tabletImg} 1200w, ${fullImg} 1920w`}
              sizes="(max-width: 768px) 33vw, 33vw"
              className="max-w-full max-h-[70vh] w-auto h-auto block transition-transform duration-700 group-hover:scale-105 shadow-2xl" 
              alt={segment.label} 
              loading="eager"
            />
            <div className="absolute inset-0 border-2 border-[#8B2323]/0 group-hover:border-[#8B2323]/20 transition-all pointer-events-none" />
          </div>
        );
      })}
    </div>
  );

  return (
    <ServiceLayout
      title="Phlebographie"
      subtitle="Die Phlebographie ist eine Venenuntersuchung, bei der ein Kontrastmittel in eine Vene der zu untersuchenden Region gespritzt wird, um deren Beschaffenheit und Lage zu beurteilen."
      icon={<Syringe size={32} />}
      preparation={[
        'Bei bekannten Nierenerkrankungen benötigen wir Ihren aktuellen Kreatinin- (bzw. GFR-)Wert.',
        'Bei einer Schilddrüsenerkrankung müssen wir Ihren TSH-Wert wissen.',
        'In beiden Fällen wenden Sie sich bitte vor der Untersuchung an Ihren Hausarzt.',
        'Telefonische Voranmeldung ist erforderlich.'
      ]}
      requirements={[
        'Überweisungsschein (Papier oder digital)',
        'Aktuelle e-Card',
        'Eventuelle Voraufnahmen zum Vergleich'
      ]}
      customImage={LegComposite}
    >
      <section className="bg-red-50 dark:bg-red-900/20 rounded-[32px] p-6 border border-red-200 dark:border-red-900/30 mb-12 flex items-start gap-4">
        <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0 mt-1" size={24} />
        <p className="text-sm font-medium text-red-800 dark:text-red-200">
          <strong>Wichtig:</strong> Diese Untersuchung kann nicht durchgeführt werden, wenn bei Ihnen eine Kontrastmittelallergie vorliegt oder wenn Sie schwanger sind.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-[Outfit]">Einsatzgebiete</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Darstellung von Krampfadern',
            'Beurteilung der Venenklappen',
            'Prüfung der Durchgängigkeit der tiefen und oberflächlichen Beinvenen vor einer Krampfadernoperation',
            'Nachweis oder Ausschluss von Verschlüssen der tiefen Beinvenen durch Blutgerinnsel (Thrombose)'
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0 mt-1.5" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Ablauf der Untersuchung</h2>
        <p>
          Meist wird die Venenuntersuchung an den Beinen durchgeführt, in einigen Fällen an den Armen. Sowohl die oberflächlichen als auch die tiefen Venen werden mit Hilfe von Kontrastmitteln dargestellt.
        </p>
        <p>
          Die Vorgehensweise beginnt mit einer Nadelpunktion am Fußrücken, bei der die Blutgefäße mit einem Kontrastmittel gefüllt werden. Anschließend werden Aufnahmen in verschiedenen Projektionen zur Beurteilung der Venen und Venenklappen mittels digitaler Röntgenaufnahmetechnik durchgeführt.
        </p>
        <p>
          Auch als Vorbereitung einer Krampfadern-Operation sowie bei der Abklärung von wiederkehrenden Varizen ist die Phlebographie eine bewährte diagnostische Methode.
        </p>
      </section>
      <FAQ items={faqData.phlebographie} title="Häufige Fragen zur Phlebographie" />
    </ServiceLayout>
  );
};

export default PhlebographiePage;
