import React, { useState, useEffect } from 'react';
import { ChevronRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  `${import.meta.env.BASE_URL}assets/images/hero-slide-1.avif`,
  `${import.meta.env.BASE_URL}assets/images/hero-home-2025.avif`
];

const animationPresets = [
  { initial: { scale: 1.3, x: 20, y: 10 }, animate: { scale: 1, x: 0, y: 0 } }, // Zoom Out + Top Right
  { initial: { scale: 1, x: 0, y: 0 }, animate: { scale: 1.3, x: -20, y: -10 } }, // Zoom In + Bottom Left
  { initial: { scale: 1.2, x: -30, y: 0 }, animate: { scale: 1.2, x: 30, y: 0 } }, // Slow Pan Right
  { initial: { scale: 1.2, x: 0, y: -30 }, animate: { scale: 1.2, x: 0, y: 30 } }, // Slow Pan Down
  { initial: { scale: 1.4, x: 10, y: 10 }, animate: { scale: 1.2, x: -10, y: -10 } }, // High Zoom Out
];

const imageAlts = [
  'Digitale Röntgendiagnostik auf höchstem Niveau',
  'Modernste radiologische Praxis Röntgen am Kai in Graz'
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
    <section id="home" className="relative min-h-screen flex lg:items-center pt-36 lg:pt-48 pb-12 lg:pb-0 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:items-stretch relative z-10">
        {/* Text Content in Glass Card */}
        <motion.div 
          initial={{ opacity: 1, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-20 glass p-10 md:p-16 rounded-[48px] shadow-2xl relative flex flex-col justify-center h-full"
        >
          <div className="flex flex-wrap gap-2 mb-8">
            <div className="inline-flex items-center gap-2 bg-[#8B2323]/5 text-[#8B2323] px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-[#8B2323]/10">
              <ShieldCheck size={14} />
              <span>Alle Kassen & Privat</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white leading-[0.9] mb-8 font-[Outfit] tracking-tight">
            Moderne <br />
            <span className="text-[#8B2323] dark:text-[#8B2323]">Radiologie</span> am Kai.
          </h1>
          
          <p className="text-xl text-gray-900 dark:text-gray-100 mb-12 max-w-lg leading-relaxed font-semibold">
            Radiologie in Graz. Wir bieten Ihnen präzise Diagnostik mit moderner Technik und persönlicher Betreuung.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#services"
              className="bg-[#8B2323] text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] hover:bg-[#A52A2A] shadow-xl shadow-red-900/10 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Unsere Leistungen
              <ChevronRight size={18} />
            </a>
            <a 
              href="/#booking"
              className="bg-white/60 backdrop-blur-md text-gray-950 border-2 border-white/50 px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg"
            >
              <Clock size={18} />
              Terminanfrage
            </a>
          </div>
        </motion.div>

        {/* Visual Element */}
        <div className="relative lg:h-full h-[400px]">
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl h-full bg-gray-200">
            {/* 
              LCP Optimization: 
              We always render the first image as a static base. 
              This avoids any "missing" image state during hydration or component mount.
            */}
            <img 
              src={images[0]} 
              srcSet={`${images[0].replace('.avif', '-mobile.avif')} 800w, ${images[0].replace('.avif', '-tablet.avif')} 1200w, ${images[0]} 1920w`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              alt={imageAlts[0]} 
              className="absolute inset-0 w-full h-full object-cover z-0"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              style={{ willChange: 'transform' }}
            />
            
            <AnimatePresence initial={false}>
              {currentImage !== 0 && (
                <motion.div
                  key={currentImage}
                  initial={{ ...preset.initial, opacity: 0 }}
                  animate={{ 
                    ...preset.animate,
                    opacity: 1,
                    transition: { 
                      duration: 15, 
                      ease: "linear",
                      opacity: { duration: 0.8, ease: "easeInOut" }
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 z-10"
                >
                  <img 
                    src={images[currentImage]} 
                    srcSet={`${images[currentImage].replace('.avif', '-mobile.avif')} 800w, ${images[currentImage].replace('.avif', '-tablet.avif')} 1200w, ${images[currentImage]} 1920w`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    alt={imageAlts[currentImage]} 
                    className="w-full h-full object-cover"
                    loading="eager"
                    style={{ willChange: 'transform' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20" />
          </div>
          


          {/* Background element */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-100 rounded-full blur-3xl -z-10 opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
