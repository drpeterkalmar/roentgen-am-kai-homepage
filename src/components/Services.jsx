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
    description: 'Zertifizierter Screeningstandort mit Siemens Mammomat Inspiration.',
    microInfo: 'Schmerzarm & Präzise',
    href: '/unser-angebot/mammographie',
    icon: <Heart size={28} />,
    color: 'bg-[#fdf2f2] text-[#8B2323]',
    gridClass: 'md:col-span-2 md:row-span-2',
    image: '/assets/images/mammographie_v2.webp'
  },
  {
    title: 'Digitales Röntgen',
    description: 'Hochauflösende Aufnahmen bei minimaler Dosis.',
    microInfo: 'Sofort digital verfügbar',
    href: '/unser-angebot/roentgen',
    icon: <Camera size={24} />,
    color: 'bg-blue-50 text-blue-600',
    gridClass: 'md:col-span-2 md:row-span-1',
    image: '/assets/images/roentgen_v3.webp'
  },
  {
    title: 'Ultraschall',
    description: 'Schonende Diagnostik ohne Strahlenbelastung.',
    microInfo: 'Schmerzfrei & Schnell',
    href: '/unser-angebot/ultraschall',
    icon: <Activity size={24} />,
    color: 'bg-green-50 text-green-600',
    gridClass: 'md:col-span-1 md:row-span-2',
    image: '/assets/images/ultraschall.webp'
  },
  {
    title: 'Knochendichte',
    description: 'DEXA-Messung zur Osteoporose-Vorsorge.',
    microInfo: 'Goldstandard Präzision',
    href: '/unser-angebot/knochendichte',
    icon: <Maximize size={24} />,
    color: 'bg-purple-50 text-purple-600',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'DVT 3D',
    description: 'Präzise 3D-Bilder des Kiefers.',
    microInfo: 'Vorteil Implantatplanung',
    href: '/unser-angebot/dvt',
    icon: <ScanSearch size={24} />,
    color: 'bg-orange-50 text-orange-600',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Körperfett',
    description: 'Exakte Analyse der Körperzusammensetzung.',
    microInfo: 'Fokus Fitness & Diät',
    href: '/unser-angebot/koerperfettmessung',
    icon: <Scale size={24} />,
    color: 'bg-teal-50 text-teal-600',
    gridClass: 'md:col-span-2 md:row-span-1',
  },
  {
    title: 'Phlebographie',
    description: 'Spezialdiagnostik der Venen.',
    microInfo: 'Tiefe Venen-Sicherheit',
    href: '/unser-angebot/phlebographie',
    icon: <Droplets size={24} />,
    color: 'bg-rose-50 text-rose-600',
    gridClass: 'md:col-span-1 md:row-span-1',
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
            Radiologische Diagnostik auf dem Stand von 2026. Puristisch, präzise und patientenzentriert.
          </p>
        </div>

        <div className="bento-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                scale: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
              className={`glass group cursor-pointer rounded-[40px] p-8 flex flex-col justify-between transition-all duration-500 hover:border-white/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] ${service.gridClass}`}
            >
              <Link to={service.href} className="absolute inset-0 z-20" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className={`${service.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner`}>
                    {service.icon}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-[#8B2323] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest whitespace-nowrap shadow-xl">
                      {service.microInfo}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2 font-[Outfit] leading-tight group-hover:text-[#8B2323] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-[#8B2323] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                <span>Details ansehen</span>
                <ChevronRight size={14} />
              </div>

              {service.image && (
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
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
