import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="py-24 bg-transparent overflow-hidden text-center relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] mb-6 font-[Outfit]">
            Unsere <span className="text-[#8B2323]">Ärzte</span>
          </h2>
          <p className="text-xl text-gray-950 leading-relaxed font-normal">
            Erfahrene Spezialisten für Ihre Gesundheit. Dr. Kalmar und Dr. Riegler stehen für höchste fachliche Kompetenz und modernste Diagnostik.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="relative mb-12 rounded-[48px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)] aspect-[16/9] md:aspect-[21/9] glass p-1">
              <div className="w-full h-full rounded-[44px] overflow-hidden relative group">
                <img 
                  src="/assets/images/team-2025.avif" 
                  srcSet="/assets/images/team-2025-mobile.avif 800w, /assets/images/team-2025-tablet.avif 1200w, /assets/images/team-2025.avif 1920w"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  alt="Priv. Doz. Dr. Georg Riegler und Priv. Doz. Dr. Peter Kalmar - Spezialisten für Radiologie in Graz" 
                  className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                
                {/* Clickable Area: Dr. Riegler (Left) */}
                <Link 
                  to="/unser-team/dr-georg-riegler" 
                  className="absolute inset-y-0 left-0 w-1/2 z-30 group/riegler cursor-pointer"
                  title="Zu Dr. Georg Riegler"
                >
                  <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 opacity-0 group-hover/riegler:opacity-100 transition-opacity hidden md:block">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Dr. Riegler Profil</span>
                  </div>
                </Link>

                {/* Clickable Area: Dr. Kalmar (Right) */}
                <Link 
                  to="/unser-team/dr-peter-kalmar" 
                  className="absolute inset-y-0 right-0 w-1/2 z-30 group/kalmar cursor-pointer"
                  title="Zu Dr. Peter Kalmar"
                >
                  <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 opacity-0 group-hover/kalmar:opacity-100 transition-opacity hidden md:block">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Dr. Kalmar Profil</span>
                  </div>
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Priv. Doz. Dr. Georg Riegler', role: 'Facharzt für Radiologie', link: '/unser-team/dr-georg-riegler' },
                { name: 'Priv. Doz. Dr. Peter Kalmar', role: 'Facharzt für Radiologie', link: '/unser-team/dr-peter-kalmar' }
              ].map((doc, i) => (
                <div key={i} className="glass p-8 rounded-[32px] text-center border-white/60">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 font-[Outfit] leading-tight transition-colors">
                    {doc.link ? (
                      <Link to={doc.link} className="hover:text-[#8B2323] transition-colors cursor-pointer">
                        {doc.name}
                      </Link>
                    ) : (
                      doc.name
                    )}
                  </h3>
                  <div className="h-0.5 w-12 bg-[#8B2323] mx-auto mb-4 opacity-30" />
                  <p className="text-[#8B2323] font-black uppercase tracking-[0.2em] text-xs">
                    {doc.role}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
