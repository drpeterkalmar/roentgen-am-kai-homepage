import React from 'react';
import { motion } from 'framer-motion';

const doctors = [
  {
    name: 'Priv. Doz. Dr. Peter Kalmar',
    role: 'Facharzt für Radiologie',
    image: '/assets/images/team-2025.jpg'
  },
  {
    name: 'Priv. Doz. Dr. Georg Riegler',
    role: 'Facharzt für Radiologie',
    image: '/assets/images/team-2025.jpg'
  }
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {doctors.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative mb-8 rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5]">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1 font-[Outfit]">{doc.name}</h3>
              <p className="text-[#8B2323] font-bold uppercase tracking-widest text-xs">{doc.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
