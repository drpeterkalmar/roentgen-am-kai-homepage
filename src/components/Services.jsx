import React from 'react';
import { Camera, Activity, Heart, Maximize, ScanSearch, Droplets, Scale, CheckCircle2, Phone, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Digitales Röntgen',
    description: 'Ausschließlich digitale Röntgenaufnahmen mit geringer Strahlenbelastung und sofortiger digitaler Verfügbarkeit für Ihre Zuweiser.',
    href: '/unser-angebot/roentgen',
    details: [
      'Skelett-, Lungen- und Magenröntgen',
      'Videoschluckakt & Irrigoskopie',
      'Digitale Archivierung & Übermittlung'
    ],
    icon: <Camera size={24} />,
    color: 'bg-blue-50 text-blue-600',
    badge: 'Überweisung & e-Card'
  },
  {
    title: 'Ultraschall',
    description: 'Schonende, schmerzfreie Diagnostik ohne Strahlenbelastung – von Abdomen über Schilddrüse bis zu den Gefäßen.',
    href: '/unser-angebot/ultraschall',
    details: [
      'Bauch-US: 6h nüchtern erforderlich',
      'Farbdoppler (Beinvenen, Carotiden)',
      'GE Logiq 9 & Logiq S8 Geräte'
    ],
    icon: <Activity size={24} />,
    color: 'bg-green-50 text-green-600',
    badge: 'Nur mit Voranmeldung'
  },
  {
    title: 'Mammographie',
    description: 'Zertifizierter Screeningstandort mit Siemens Mammomat Inspiration – bis zu 50% weniger Dosis bei höchster Bildqualität.',
    href: '/unser-angebot/mammographie',
    details: [
      '45-75 J.: Alle 2 Jahre mit e-Card',
      'Doppelbefundung durch 2 Fachärzte',
      '100.000+ befundete Mammographien'
    ],
    extraInfo: {
      label: 'Screening-Opt-in (40+ / 75+):',
      value: '0800 500 181',
      icon: <Phone size={14} />
    },
    icon: <Heart size={24} />,
    color: 'bg-[#fdf2f2] text-[#8B2323]',
    badge: 'Brustkrebs-Früherkennung'
  },
  {
    title: 'DVT',
    description: '3D-Röntgenschichtaufnahmen des Gesichtsschädels für präzise Planung bei Zahnimplantaten und Kieferchirurgie.',
    href: '/unser-angebot/dvt',
    details: [
      'Geringe Strahlenbelastung',
      'Keine Platzangst',
      'Privatleistung (keine Kasse)'
    ],
    icon: <ScanSearch size={24} />,
    color: 'bg-orange-50 text-orange-600',
    badge: 'Privatleistung'
  },
  {
    title: 'Knochendichte',
    description: 'DEXA-Messung (Goldstandard) zur Osteoporose-Vorsorge mit Bestimmung von BMD, BMC und Trabecular Bone Score.',
    href: '/unser-angebot/knochendichte',
    details: [
      'Direktverrechnung: BVA, SVA, KFA-Graz',
      'ÖGK: Wahlarzt (Rückerstattung)',
      'Auch Ganzkörperfettanalyse möglich'
    ],
    icon: <Maximize size={24} />,
    color: 'bg-purple-50 text-purple-600',
    badge: 'DEXA Goldstandard'
  },
  {
    title: 'Körperfettmessung',
    description: 'Ganzkörperfettanalyse mittels DEXA – exakte Informationen über Fett, Muskelmasse, BMI und Stoffwechselrate.',
    href: '/unser-angebot/koerperfettmessung',
    details: [
      'Körperfett, Muskelmasse, BMI, RSMI, RMR',
      'Ideal für Sport & Gewichtsoptimierung',
      'Kombinierbar mit Knochendichte-Termin'
    ],
    icon: <Scale size={24} />,
    color: 'bg-teal-50 text-teal-600',
    badge: 'Privatleistung'
  },
  {
    title: 'Phlebographie',
    description: 'Venenuntersuchung mit Kontrastmittel zur Darstellung von Krampfadern, Thrombosen und Venenklappen.',
    href: '/unser-angebot/phlebographie',
    details: [
      'Krampfadern & Venenklappen',
      'Thrombose-Nachweis/-Ausschluss',
      'Aktuelle Labor-Werte erforderlich'
    ],
    icon: <Droplets size={24} />,
    color: 'bg-rose-50 text-rose-600',
    badge: 'Telefonische Voranmeldung'
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B2323] px-4 py-2 rounded-full text-xs font-bold mb-4 uppercase tracking-widest">
            <Info size={14} />
            Unser Angebot
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] mb-6 font-[Outfit]">
            Unsere <span className="text-[#8B2323]">Leistungen</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            Wir bieten Ihnen das gesamte Spektrum der modernen Radiologie mit Fokus auf Diagnosequalität und Patientenkomfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`${service.color} w-16 h-16 rounded-[24px] flex items-center justify-center transition-transform group-hover:rotate-6 duration-300 shadow-sm`}>
                  {service.icon}
                </div>
                {service.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B2323] bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 max-w-[140px] text-right leading-tight">
                    {service.badge}
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-[Outfit]">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {service.description}
              </p>

              <div className="space-y-3 mb-8 flex-grow">
                {service.details?.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-[#8B2323] shrink-0 mt-0.5 opacity-60" />
                    <span>{detail}</span>
                  </div>
                ))}
                
                {service.extraInfo && (
                  <div className="mt-4 p-3 bg-red-50 rounded-xl flex items-center gap-3 border border-red-100">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#8B2323] shadow-sm">
                      {service.extraInfo.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#8B2323] uppercase opacity-70">{service.extraInfo.label}</p>
                      <p className="text-xs font-bold text-[#8B2323]">{service.extraInfo.value}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-50">
                <Link 
                  to={service.href}
                  className="text-[#8B2323] font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-wider"
                >
                  Mehr erfahren
                  <ChevronRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Services;
