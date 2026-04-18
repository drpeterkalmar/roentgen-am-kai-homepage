import React from 'react';
import { Camera, Activity, Heart, Maximize, ScanSearch, Droplets, Scale, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const services = [
  {
    title: 'Mammographie',
    description: 'Zertifizierter Screeningstandort mit Siemens Mammomat Inspiration für höchste Diagnosesicherheit.',
    microInfo: 'Schmerzarm & Präzise',
    href: '/unser-angebot/mammographie',
    icon: <Heart size={28} />,
    color: 'bg-red-50 text-[#8B2323]',
    gridClass: 'md:col-span-8 aspect-[2/1]',
    image: '/assets/images/mammographie_v2.webp'
  },
  {
    type: 'info',
    title: 'Alle Kassen',
    description: 'Wir sind Vertragspartner aller Kassen. Bitte bringen Sie Ihre e-Card zu jedem Termin mit.',
    icon: <Info size={24} />,
    color: 'bg-blue-50 text-blue-600',
    gridClass: 'md:col-span-4 aspect-square',
  },
  {
    title: 'Knochendichte (DEXA)',
    description: 'Goldstandard zur Osteoporose-Früherkennung und Verlaufskontrolle.',
    microInfo: 'Präzise Messung',
    href: '/unser-angebot/knochendichte',
    icon: <Maximize size={28} />,
    color: 'bg-purple-50 text-purple-600',
    gridClass: 'md:col-span-8 aspect-[2/1]',
  },
  {
    type: 'info',
    title: 'Parken & Anfahrt',
    description: 'Kostenlose Tiefgaragenplätze für die Aufenthaltsdauer in unserer Praxis. Zudem profitieren Sie von einer hervorragenden Straßenbahnanbindung direkt vor der Tür.',
    icon: <Droplets size={24} />, // Reusing icon as visual placeholder
    color: 'bg-green-50 text-green-600',
    gridClass: 'md:col-span-4 aspect-square',
  },
  {
    title: 'Digitales Röntgen',
    description: 'Skelett- und Lungenaufnahmen mit minimaler Strahlenbelastung.',
    microInfo: 'Sofort verfügbar',
    href: '/unser-angebot/roentgen',
    icon: <Camera size={24} />,
    color: 'bg-blue-50 text-blue-600',
    gridClass: 'md:col-span-6 aspect-[3/2]',
  },
  {
    title: 'Ultraschall',
    description: 'Gewebeschonende Diagnostik von Organen, Gelenken und Gefäßen.',
    microInfo: 'Ohne Strahlen',
    href: '/unser-angebot/ultraschall',
    icon: <Activity size={24} />,
    color: 'bg-green-50 text-green-600',
    gridClass: 'md:col-span-6 aspect-[3/2]',
  },
  {
    title: 'DVT 3D',
    description: 'Präzise 3D-Kieferdiagnostik für die Implantatplanung.',
    microInfo: 'Modernste Technik',
    href: '/unser-angebot/dvt',
    icon: <ScanSearch size={24} />,
    color: 'bg-orange-50 text-orange-600',
    gridClass: 'md:col-span-4 aspect-square',
  },
  {
    title: 'Körperfett',
    description: 'DEXA-Analyse der Körperzusammensetzung.',
    microInfo: 'Fitness & Diät',
    href: '/unser-angebot/koerperfettmessung',
    icon: <Scale size={24} />,
    color: 'bg-teal-50 text-teal-600',
    gridClass: 'md:col-span-4 aspect-square',
  },
  {
    title: 'Phlebographie',
    description: 'Spezialuntersuchung der tiefen Beinvenen.',
    microInfo: 'Thrombose-Check',
    href: '/unser-angebot/phlebographie',
    icon: <Droplets size={24} />,
    color: 'bg-rose-50 text-rose-600',
    gridClass: 'md:col-span-4 aspect-square',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white selection:bg-red-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B2323] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Info size={14} />
              Diagnostische Präzision
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[0.95] font-[Outfit]">
              Unsere <span className="text-[#8B2323]">Leistungen</span>
            </h2>
          </div>
          <p className="text-lg text-gray-500 max-w-sm leading-relaxed">
            Radiologie auf Dashboard-Niveau. Ein aufgeräumtes System für Ihre Gesundheit.
          </p>
        </div>

        <div className="bento-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`glass group rounded-[40px] p-10 flex flex-col transition-all duration-500 hover:border-[#8B2323]/30 hover:shadow-[0_40px_80px_rgba(139,35,35,0.1)] relative overflow-hidden ${service.gridClass} ${
                service.type === 'info' ? 'order-last' : 
                (service.title.includes('Mammo') || service.title.includes('Ultra') ? 'order-first' : 'order-none')
              }`}
            >
              {service.href && <Link to={service.href} className="absolute inset-0 z-20" />}
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner`}>
                    {service.icon}
                  </div>
                  {service.microInfo && (
                    <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                      <span className="text-[#8B2323] text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                        {service.microInfo}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 font-[Outfit] leading-tight group-hover:text-[#8B2323] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                {service.type !== 'info' ? (
                  <div className="mt-auto pt-6 flex items-center gap-2 text-[#8B2323] font-black text-[10px] uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-all">
                    <span>Details ansehen</span>
                    <ChevronRight size={14} />
                  </div>
                ) : (
                  <div className="mt-auto pt-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                    Information
                  </div>
                )}
              </div>

              {service.image && (
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                   <img src={service.image} alt="" className="w-full h-full object-cover grayscale" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
