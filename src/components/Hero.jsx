import React, { useState, useEffect } from 'react';
import { ChevronRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/assets/images/hero-home-2025.webp',
  '/assets/images/hero-slide-1.webp',
  '/assets/images/hero-slide-2.webp',
  '/assets/images/hero-slide-3.webp',
  '/assets/images/hero-slide-4.webp'
];

const animationPresets = [
  { initial: { scale: 1.3, x: 20, y: 10 }, animate: { scale: 1, x: 0, y: 0 } }, // Zoom Out + Top Right
  { initial: { scale: 1, x: 0, y: 0 }, animate: { scale: 1.3, x: -20, y: -10 } }, // Zoom In + Bottom Left
  { initial: { scale: 1.2, x: -30, y: 0 }, animate: { scale: 1.2, x: 30, y: 0 } }, // Slow Pan Right
  { initial: { scale: 1.2, x: 0, y: -30 }, animate: { scale: 1.2, x: 0, y: 30 } }, // Slow Pan Down
  { initial: { scale: 1.4, x: 10, y: 10 }, animate: { scale: 1.2, x: -10, y: -10 } }, // High Zoom Out
];

const imageAlts = [
  'Modernste radiologische Praxis Röntgen am Kai in Graz',
  'Digitale Röntgendiagnostik auf höchstem Niveau',
  'Patientenempfang und Komfort im Zentrum von Graz',
  'Interdisziplinäres Team für Ihre Gesundheit',
  'Präzise Bildgebung mit modernster Medizintechnik'
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [preset, setPreset] = useState(animationPresets[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setPreset(animationPresets[Math.floor(Math.random() * animationPresets.length)]);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fdf2f2] -z-10 rounded-l-[100px] hidden lg:block" />
      
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B2323] px-4 py-2 rounded-full text-sm font-bold">
              <ShieldCheck size={18} />
              <span>Kassenverträge für alle Kassen & Privat</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#1f2937] leading-[1.1] mb-6 font-[Outfit]">
            Moderne <br />
            <span className="text-[#8B2323]">Radiologie</span> am Kai.
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
            Spitzenmedizin in Graz unter der Leitung von <strong>Priv. Doz. Dr. Peter Kalmar</strong> und <strong>Priv. Doz. Dr. Georg Riegler</strong>. Wir bieten Ihnen präzise Diagnostik mit modernster Technik und menschlicher Fürsorge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a 
              href="#services"
              className="bg-[#8B2323] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#A52A2A] shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
            >
              Unsere Leistungen
              <ChevronRight size={20} />
            </a>
            <a 
              href="https://Termin.herold.at/p/L6pXG/roentgen-am-kai-facharzte-fur-radiologie-og/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Clock size={20} />
              Termin buchen
            </a>
          </div>
          
        </motion.div>

        {/* Visual Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl h-[400px] md:h-[600px] bg-black">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentImage}
                initial={{ ...preset.initial, opacity: 0 }}
                animate={{ 
                  ...preset.animate,
                  opacity: 1,
                  transition: { duration: 5, ease: "linear" }
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 2 }
                }}
                className="absolute inset-0"
              >
                <img 
                  src={images[currentImage]} 
                  alt={imageAlts[currentImage]} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl z-20 max-w-[240px] hidden md:block border border-red-50">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-[#8B2323] rounded-full flex items-center justify-center text-white">
                <Clock size={20} />
              </div>
              <span className="font-bold text-gray-900 leading-tight">Schnelle Termine</span>
            </div>
            <p className="text-xs text-gray-500">
              In der Regel innerhalb weniger Tage verfügbar.
            </p>
          </div>

          {/* Background element */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-100 rounded-full blur-3xl -z-10 opacity-60" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
