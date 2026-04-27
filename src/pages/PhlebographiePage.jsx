import React from 'react';
import { Syringe, AlertTriangle } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';

const PhlebographiePage = () => {
  const LegComposite = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {[
        { id: 1, label: "Phlebografie Oberschenkel", img: "/assets/images/phlebo-leg-1.avif", mobile: "/assets/images/phlebo-leg-1-mobile.avif", tablet: "/assets/images/phlebo-leg-1-tablet.avif" },
        { id: 2, label: "Phlebografie Knie", img: "/assets/images/phlebo-leg-2.avif", mobile: "/assets/images/phlebo-leg-2-mobile.avif", tablet: "/assets/images/phlebo-leg-2-tablet.avif" },
        { id: 3, label: "Phlebografie Unterschenkel", img: "/assets/images/phlebo-leg-3.avif", mobile: "/assets/images/phlebo-leg-3-mobile.avif", tablet: "/assets/images/phlebo-leg-3-tablet.avif" }
      ].map((segment) => (
        <div key={segment.id} className="group relative rounded-[32px] overflow-hidden shadow-xl bg-gray-100 aspect-[3/4] md:aspect-[2/3]">
          <img 
            src={segment.img} 
            srcSet={`${segment.mobile} 800w, ${segment.tablet} 1200w, ${segment.img} 1920w`}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={segment.label} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Tech Detail Overlay */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
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
      <section className="bg-red-50 rounded-[32px] p-6 border border-red-200 mb-12 flex items-start gap-4">
        <AlertTriangle className="text-red-600 shrink-0 mt-1" size={24} />
        <p className="text-sm font-medium text-red-800">
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
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
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
    </ServiceLayout>
  );
};

export default PhlebographiePage;
