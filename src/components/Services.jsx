import React from 'react';
import { Scan, HeartPulse, Bone, Box, MapPin, Scale, Info, CreditCard, Syringe, Waves } from 'lucide-react';
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
    description: 'Zertifizierter Screeningstandort für höchste Diagnosesicherheit.',
    microInfo: 'Brustkrebs-Früherkennung',
    href: '/unser-angebot/mammographie',
    icon: <HeartPulse size={28} />,
    color: 'bg-red-50 text-[#8B2323]',
    gridClass: 'md:col-span-4 aspect-square', // Standardized
    image: '/assets/images/mammographie_v2.avif'
  },
  {
    type: 'info',
    title: 'Alle Kassen',
    description: 'Wir sind Vertragspartner aller Kassen. Bitte bringen Sie Ihre e-Card zu jedem Termin mit.',
    icon: <CreditCard size={24} />,
    color: 'bg-blue-50 text-blue-600',
    gridClass: 'md:col-span-4 aspect-square',
  },
  {
    title: 'Knochendichte (DEXA)',
    description: 'Goldstandard zur Osteoporose-Früherkennung und Verlaufskontrolle.',
    microInfo: 'Goldstandard',
    href: '/unser-angebot/knochendichte',
    icon: <Bone size={28} />,
    color: 'bg-purple-50 text-purple-600',
    gridClass: 'md:col-span-4 aspect-square', // Standardized
    image: '/assets/images/knochendichte_v3.avif'
  },
  {
    type: 'info',
    title: 'Anreise',
    description: 'Kostenlose Tiefgaragenplätze für Patienten & gute öffentliche Anbindung mit den Straßenbahnlinien 3 und 5 und den Buslinien 58 und 63. Termine nur nach Vereinbarung.',
    icon: <MapPin size={24} />, 
    color: 'bg-green-50 text-green-600',
    gridClass: 'md:col-span-4 aspect-square',
  },
  {
    title: 'Digitales Röntgen',
    description: 'Skelett- und Lungenaufnahmen mit minimaler Strahlenbelastung.',
    microInfo: 'Sofort verfügbar',
    href: '/unser-angebot/roentgen',
    icon: <Scan size={24} />,
    color: 'bg-blue-50 text-blue-600',
    gridClass: 'md:col-span-4 aspect-square', // Standardized
    image: '/assets/images/roentgen_v3.avif'
  },

  {
    title: 'DVT 3D',
    description: 'Präzise 3D-Kieferdiagnostik für die Implantatplanung.',
    microInfo: 'Modernste Technik',
    href: '/unser-angebot/dvt',
    icon: <Box size={24} />,
    color: 'bg-orange-50 text-orange-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: '/assets/images/hero_interior.avif'
  },
  {
    title: 'Körperfett',
    description: 'DEXA-Analyse der Körperzusammensetzung.',
    microInfo: 'Fitness & Diät',
    href: '/unser-angebot/koerperfettmessung',
    icon: <Scale size={24} />,
    color: 'bg-teal-50 text-teal-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: '/assets/images/koerperfett.avif'
  },
  {
    title: 'Phlebographie',
    description: 'Venenröntgen mit Kontrastmittel.',
    microInfo: 'Präoperative Planung',
    href: '/unser-angebot/phlebographie',
    icon: <Syringe size={24} />,
    color: 'bg-rose-50 text-rose-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: '/assets/images/phlebographie_v3.avif'
  },
  {
    title: 'Sonografie',
    description: 'Gewebeschonende Diagnostik von Organen, Gelenken und Gefäßen.',
    microInfo: 'Ohne Strahlen',
    href: '/unser-angebot/ultraschall',
    icon: <Waves size={24} />,
    color: 'bg-green-50 text-green-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: '/assets/images/ultraschall.avif'
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-transparent selection:bg-red-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B2323] px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
              <Info size={14} />
              Diagnostische Präzision
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[0.95] font-[Outfit]">
              Unsere <span className="text-[#8B2323]">Leistungen</span>
            </h2>
          </div>
          <p className="text-xl text-gray-800 max-w-sm leading-relaxed font-semibold">
            Ihre Gesundheit im Fokus. Digital. Präzise. Persönlich.
          </p>
        </div>

        <div className="bento-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: 'rgba(139, 35, 35, 0.2)' }}
              className={`glass group rounded-[40px] p-8 flex flex-col relative overflow-hidden ${service.gridClass} ${
                service.type === 'info' ? 'order-last' : 
                (service.title.includes('Mammo') ? 'order-first' : 'order-none')
              }`}
            >
              {service.href && (
                <Link 
                  to={service.href} 
                  className="absolute inset-0 z-20" 
                  aria-label={`Mehr Informationen zu ${service.title}`}
                />
              )}
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner`}>
                    {service.icon}
                  </div>
                  {service.microInfo && (
                    <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                      <span className="text-[#8B2323] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                        {service.microInfo}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-black text-gray-950 mb-2 font-[Outfit] leading-tight group-hover:text-[#8B2323] transition-colors">
                    {service.title}
                  </h3>
                  <p className={`text-base text-gray-950 leading-relaxed font-semibold ${service.type === 'info' ? 'line-clamp-none' : 'line-clamp-3'}`}>
                    {service.description}
                  </p>
                </div>

                {service.type !== 'info' ? (
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[#8B2323] font-black text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-all">
                    <span>Details ansehen</span>
                    <ChevronRight size={14} />
                  </div>
                ) : (
                  <div className="mt-auto pt-4 text-xs font-black uppercase text-gray-400 tracking-[0.2em]">
                    Information
                  </div>
                )}
              </div>

              {service.image && (
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                   <img 
                    src={service.image} 
                    srcSet={`${service.image.replace('.avif', '-mobile.avif')} 800w, ${service.image.replace('.avif', '-tablet.avif')} 1200w, ${service.image} 1920w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    alt="" 
                    className="w-full h-full object-cover grayscale" 
                  />
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
