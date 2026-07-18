import React from 'react';
import { Scan, HeartPulse, Bone, Box, MapPin, Scale, Info, CreditCard, Syringe, Waves, Search, X } from 'lucide-react';
import { ToothIcon } from './CustomIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);





const services = [
  {
    title: 'Digitales Röntgen',
    description: 'Skelett- und Lungenaufnahmen mit minimaler Strahlenbelastung.',
    microInfo: 'Sofort verfügbar',
    href: 'unser-angebot/roentgen',
    icon: <Scan size={24} />,
    color: 'bg-blue-50 text-blue-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: 'assets/images/roentgen_v3.avif'
  },
  {
    title: 'Mammographie',
    description: 'Zertifizierter Screeningstandort mit Doppelbefundung.',
    microInfo: 'Brustkrebs-Früherkennung',
    href: 'unser-angebot/mammographie',
    icon: <HeartPulse size={28} />,
    color: 'bg-red-50 text-[#8B2323]',
    gridClass: 'md:col-span-4 aspect-square',
    image: 'assets/images/mammographie_v2.avif'
  },
  {
    title: 'Knochendichte (DEXA)',
    description: 'Goldstandard zur Osteoporose-Früherkennung und Verlaufskontrolle.',
    microInfo: 'Osteoporose-Früherkennung',
    href: 'unser-angebot/knochendichte',
    icon: <Bone size={28} />,
    color: 'bg-purple-50 text-purple-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: 'assets/images/knochendichte_v3.avif'
  },
  {
    title: 'Körperfett',
    description: 'DEXA-Analyse der Körperzusammensetzung zur Optimierung von Muskelaufbau und sportlicher Leistung.',
    microInfo: 'Fitness, Sport und Longevity',
    href: 'unser-angebot/koerperfettmessung',
    icon: <Scale size={24} />,
    color: 'bg-teal-50 text-teal-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: 'assets/images/koerperfett.avif'
  },
  {
    title: 'DVT / Zahnröntgen',
    description: 'Präzise 3D-Kieferdiagnostik für die Implantatplanung und Zahnheilkunde.',
    microInfo: '3D-Kieferdiagnostik',
    href: 'unser-angebot/dvt',
    icon: <ToothIcon size={24} />,
    color: 'bg-orange-50 text-orange-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: 'assets/images/hero_interior.avif'
  },
  {
    title: 'Phlebographie',
    description: 'Venenröntgen mit Kontrastmittel.',
    microInfo: 'Präoperative Planung',
    href: 'unser-angebot/phlebographie',
    icon: <Syringe size={24} />,
    color: 'bg-rose-50 text-rose-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: 'assets/images/phlebographie_v3.avif'
  },
  {
    title: 'Sonografie',
    description: 'Gewebeschonende Diagnostik von Organen, Gelenken und Gefäßen.',
    microInfo: 'Ohne Strahlen',
    href: 'unser-angebot/ultraschall',
    icon: <Waves size={24} />,
    color: 'bg-green-50 text-green-600',
    gridClass: 'md:col-span-4 aspect-square',
    image: 'assets/images/ultraschall.avif'
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
    type: 'info',
    title: 'Anreise',
    description: 'Kostenlose Tiefgaragenplätze für Patienten & gute öffentliche Anbindung (Straßenbahn 3 & 5, Bus 58 & 63, Haltestelle Keplerbrücke).',
    icon: <MapPin size={24} />, 
    color: 'bg-green-50 text-green-600',
    gridClass: 'md:col-span-4 aspect-square',
  },
];

const Services = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (service.microInfo && service.microInfo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="services" className="py-24 bg-transparent selection:bg-red-50 dark:selection:bg-red-900/30">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-[#8B2323] dark:text-[#8B2323] px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
              <Info size={14} />
              Diagnostische Präzision
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[0.95] font-[Outfit]">
              Unsere <span className="text-[#8B2323]">Leistungen</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-end w-full md:w-auto">
            <p className="text-xl text-gray-800 dark:text-gray-200 max-w-sm leading-relaxed font-semibold">
              Ihre Gesundheit im Fokus. Digital. Präzise. Persönlich.
            </p>
            {/* Search Bar */}
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B2323] transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Leistung suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-2 border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:border-[#8B2323] dark:focus:border-[#8B2323] text-gray-900 dark:text-white font-bold transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="bento-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, borderColor: 'rgba(139, 35, 35, 0.4)' }}
                className={`glass group rounded-[40px] p-8 flex flex-col relative overflow-hidden ${service.gridClass} ${
                  service.type === 'info' ? 'order-last' : 'order-none'
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
                  <h3 className="text-2xl font-black text-gray-950 dark:text-white mb-2 font-[Outfit] leading-tight group-hover:text-[#8B2323] transition-colors">
                    {service.title}
                  </h3>
                  <p className={`text-base text-gray-950 dark:text-gray-100 leading-relaxed font-semibold ${service.type === 'info' ? 'line-clamp-none' : 'line-clamp-3'}`}>
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
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.08] dark:opacity-[0.04] group-hover:opacity-[0.16] dark:group-hover:opacity-[0.1] transition-opacity pointer-events-none">
                   <img 
                    src={`${import.meta.env.BASE_URL}${service.image}`} 
                    srcSet={`${import.meta.env.BASE_URL}${service.image.replace('.avif', '-mobile.avif')} 800w, ${import.meta.env.BASE_URL}${service.image.replace('.avif', '-tablet.avif')} 1200w, ${import.meta.env.BASE_URL}${service.image} 1920w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    alt="" 
                    className="w-full h-full object-cover grayscale" 
                  />
                </div>
              )}
            </motion.div>
            ))}
          </AnimatePresence>
          {(searchQuery.toLowerCase().includes('ct') || 
            searchQuery.toLowerCase().includes('mrt') || 
            searchQuery.toLowerCase().includes('mr') || 
            searchQuery.toLowerCase().includes('magn') || 
            searchQuery.toLowerCase().includes('kernsp') || 
            searchQuery.toLowerCase().includes('compu')) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full mb-12"
            >
              <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-[32px] border-2 border-red-100 dark:border-red-900/30 text-center shadow-xl glass-glow">
                <div className="flex items-center justify-center gap-3 text-[#8B2323] mb-4">
                  <Info size={28} />
                  <h3 className="text-2xl font-black font-[Outfit]">Wichtiger Hinweis</h3>
                </div>
                <p className="text-lg text-gray-900 dark:text-gray-100 leading-relaxed font-semibold max-w-3xl mx-auto">
                  Wir bieten <strong>kein CT</strong> (Computertomographie) und <strong>kein MRT</strong> (Magnetresonanztomographie) an. 
                  Wir empfehlen hierfür z.B. das nahegelegene <a href="https://kreuzschwestern-graz.at/ct-mr-zentrum/" target="_blank" rel="noopener noreferrer" className="text-[#8B2323] underline font-bold hover:text-red-900 transition-colors">Institut der Kreuzschwestern Graz</a>.
                </p>
              </div>
            </motion.div>
          )}

          {filteredServices.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl font-bold text-gray-500">Keine Leistungen für "{searchQuery}" gefunden.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
