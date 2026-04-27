import React from 'react';
import { Syringe, AlertTriangle } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';

const PhlebographiePage = () => {
  const LegComposite = (
    <div className="mb-12 rounded-[40px] overflow-hidden shadow-2xl relative h-[600px] flex flex-col group border border-gray-100">
      <div className="flex-1 overflow-hidden relative border-b border-white/20">
        <img 
          src="/assets/images/phlebo-leg-1.avif" 
          srcSet="/assets/images/phlebo-leg-1-mobile.avif 800w, /assets/images/phlebo-leg-1-tablet.avif 1200w, /assets/images/phlebo-leg-1.avif 1920w"
          sizes="(max-width: 1024px) 100vw, 800px"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          alt="Phlebographie Becken & Oberschenkel" 
        />
        <div className="absolute top-4 left-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
          Segment 01: Becken / Prox. Oberschenkel
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative border-b border-white/20">
        <img 
          src="/assets/images/phlebo-leg-2.avif" 
          srcSet="/assets/images/phlebo-leg-2-mobile.avif 800w, /assets/images/phlebo-leg-2-tablet.avif 1200w, /assets/images/phlebo-leg-2.avif 1920w"
          sizes="(max-width: 1024px) 100vw, 800px"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          alt="Phlebographie Knie & Unterschenkel" 
        />
        <div className="absolute top-4 left-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
          Segment 02: Knie / Dist. Oberschenkel
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <img 
          src="/assets/images/phlebo-leg-3.avif" 
          srcSet="/assets/images/phlebo-leg-3-mobile.avif 800w, /assets/images/phlebo-leg-3-tablet.avif 1200w, /assets/images/phlebo-leg-3.avif 1920w"
          sizes="(max-width: 1024px) 100vw, 800px"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          alt="Phlebographie Unterschenkel & Fuß" 
        />
        <div className="absolute top-4 left-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
          Segment 03: Unterschenkel / Fuß
        </div>
      </div>
      
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-1 bg-[#8B2323]/50" />
      
      {/* Tech Indicator */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-white text-[10px] font-black uppercase tracking-widest">Composite Scan: Full Limb</span>
      </div>
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
