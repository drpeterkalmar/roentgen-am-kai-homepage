import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] mb-6 font-[Outfit]">
            Unsere <span className="text-[#8B2323]">Ärzte</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            Erfahrene Spezialisten für Ihre Gesundheit. Dr. Kalmar und Dr. Riegler stehen für höchste fachliche Kompetenz und modernste Diagnostik.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative mb-8 rounded-[40px] overflow-hidden shadow-2xl aspect-video lg:aspect-[21/9]">
              <img 
                src="/assets/images/team-2025.jpg" 
                alt="Dr. Riegler & Dr. Kalmar" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937]/40 via-transparent to-transparent opacity-60 transition-opacity" />
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-24 items-start">
              <div className="text-right sm:text-center md:text-right">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 font-[Outfit]">Priv. Doz. Dr. Georg Riegler</h3>
                <p className="text-[#8B2323] font-bold uppercase tracking-widest text-[10px] md:text-xs">Facharzt für Radiologie</p>
              </div>
              <div className="text-left sm:text-center md:text-left">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 font-[Outfit]">Priv. Doz. Dr. Peter Kalmar</h3>
                <p className="text-[#8B2323] font-bold uppercase tracking-widest text-[10px] md:text-xs">Facharzt für Radiologie</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
