import React from 'react';
import { ChevronRight, Calendar, ArrowLeft, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceLayout = ({ title, subtitle, children, icon, preparation, requirements, imageUrl, customImage }) => {
  return (
    <div className="pt-40 lg:pt-48 pb-24 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#8B2323] transition-colors">Startseite</Link>
          <ChevronRight size={14} />
          <span className="text-[#8B2323]">Unser Angebot</span>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-bold">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            {customImage ? (
              customImage
            ) : imageUrl ? (
              <div className="mb-12 rounded-[40px] overflow-hidden shadow-2xl relative h-[400px]">
                <img 
                  src={imageUrl.startsWith('/') ? `${import.meta.env.BASE_URL}${imageUrl.substring(1)}` : imageUrl} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ) : null}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-50 text-[#8B2323] rounded-2xl flex items-center justify-center">
                {icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] font-[Outfit] tracking-tight">
                {title}
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
              {subtitle}
            </p>

            <div className="prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed mb-12">
              {children}
            </div>

            {/* Preparation/Requirements Box */}
            {(preparation || requirements) && (
              <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 font-[Outfit]">
                  <ShieldCheck className="text-[#8B2323]" />
                  Wichtige Informationen
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {preparation && (
                    <div className="space-y-3">
                      <p className="font-bold text-[#8B2323] text-sm uppercase tracking-wider">Vorbereitung</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {preparation.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-[#8B2323] font-bold">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {requirements && (
                    <div className="space-y-3">
                      <p className="font-bold text-[#8B2323] text-sm uppercase tracking-wider">Mitzubringen</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {requirements.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-[#8B2323] font-bold">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Link to="/" className="inline-flex items-center gap-2 text-[#8B2323] font-bold hover:gap-3 transition-all uppercase text-sm tracking-wider">
              <ArrowLeft size={18} />
              Zur Übersicht
            </Link>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="bg-[#1f2937] text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B2323] rounded-full blur-[80px] opacity-20 -mr-16 -mt-16" />
                <h3 className="text-2xl font-bold mb-6 font-[Outfit] relative z-10">Termin vereinbaren</h3>
                <p className="text-gray-400 mb-8 relative z-10">
                  Nutzen Sie unsere Online-Terminvergabe oder rufen Sie uns direkt an.
                </p>
                <Link 
                  to="/#booking"
                  className="w-full bg-[#8B2323] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#A52A2A] transition-all mb-4 relative z-10"
                >
                  <Calendar size={20} />
                  Online buchen
                </Link>
                <a 
                  href="tel:+433168409050"
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all relative z-10 border border-white/10"
                >
                  <Phone size={20} />
                  0316 840 90 50
                </a>
              </div>

              <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 font-[Outfit]">Informationen</h4>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#8B2323] shrink-0" size={18} />
                    <span>Körösistraße 9, 8010 Graz</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-bold text-gray-900 mb-1">Alle Kassen & Privat</p>
                    <p>ÖGK, SVS, BVAEB, KFA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLayout;
