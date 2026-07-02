import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowUpRight, Image, FileText } from 'lucide-react';

const PatientPortal = () => {
  return (
    <section className="relative -mt-4 z-30">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="glass rounded-3xl shadow-xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 md:gap-8"
        >
          {/* Icon Cluster */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 bg-[#8B2323] rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/20">
              <Lock size={28} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-700">
              <Image size={16} className="text-[#8B2323]" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
              <h3 className="text-lg md:text-xl font-black text-gray-950 dark:text-white font-[Outfit] tracking-tight">
                Bilder & Befunde Online
              </h3>
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border border-amber-200/50 dark:border-amber-700/30">
                Bald verfügbar
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-md">
              Zugriff auf Ihre radiologischen Bilder und Befundberichte – sicher und jederzeit.
            </p>
          </div>

          {/* CTA Button (placeholder) */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="shrink-0 inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-800/80 text-gray-400 dark:text-gray-500 px-6 py-3.5 rounded-2xl text-sm font-bold border border-gray-100 dark:border-gray-700 cursor-not-allowed select-none"
            aria-disabled="true"
            title="Das Patientenportal ist derzeit noch in Entwicklung."
          >
            <FileText size={18} />
            <span className="uppercase tracking-[0.1em]">Zum Portal</span>
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PatientPortal;