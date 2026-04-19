import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-transparent overflow-hidden text-center relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] mb-6 font-[Outfit]">
            Unsere <span className="text-[#8B2323]">Ärzte</span>
          </h2>
          <p className="text-xl text-gray-800 leading-relaxed font-normal">
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
              <div className="w-full h-full rounded-[44px] overflow-hidden">
                <img 
                  src="/assets/images/team-2025.webp" 
                  alt="Priv. Doz. Dr. Georg Riegler und Priv. Doz. Dr. Peter Kalmar - Spezialisten für Radiologie in Graz" 
                  className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Priv. Doz. Dr. Georg Riegler', role: 'Facharzt für Radiologie' },
                { name: 'Priv. Doz. Dr. Peter Kalmar', role: 'Facharzt für Radiologie' }
              ].map((doc, i) => (
                <div key={i} className="glass p-8 rounded-[32px] text-center border-white/60">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 font-[Outfit] leading-tight">
                    {doc.name}
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
