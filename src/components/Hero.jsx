import React, { useState, useEffect } from 'react';
import { ChevronRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/assets/images/hero-home-2025.jpg',
  '/assets/images/hero-slide-1.jpg',
  '/assets/images/hero-slide-2.jpg',
  '/assets/images/hero-slide-3.jpg',
  '/assets/images/hero-slide-4.jpg'
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000);
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
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Fully Air Conditioned</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#1f2937] leading-[1.1] mb-6">
            Moderne <span className="text-[#8B2323]">Radiologie</span> am Kai.
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
            Spitzenmedizin in Graz unter der Leitung von <strong>Priv. Doz. Dr. Peter Kalmar</strong> und <strong>Priv. Doz. Dr. Georg Riegler</strong>. Wir bieten Ihnen präzise Diagnostik mit modernster Technik und menschlicher Fürsorge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a 
              href="#booking"
              className="bg-[#8B2323] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#A52A2A] shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2"
            >
              Termin Online buchen
              <ChevronRight size={20} />
            </a>
            <a 
              href="tel:+433168409050"
              className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Clock size={20} />
              0316 840 90 50
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
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl h-[400px] md:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 3, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 1.5 }
                }}
                className="absolute inset-0"
              >
                <img 
                  src={images[currentImage]} 
                  alt="Röntgen am Kai Impressionen" 
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
