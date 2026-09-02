import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Image, FileText } from 'lucide-react';

const PORTAL_URL = 'https://portal.marc.at';

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
              <Image size={28} className="text-white" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
              <h3 className="text-lg md:text-xl font-black text-gray-950 dark:text-white font-[Outfit] tracking-tight">
                Ihre Bilder und Befunde online
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-md">
              Ihre Bilder und Befunde sind online verfügbar unter{' '}
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B2323] hover:text-[#A52A2A] dark:text-red-400 dark:hover:text-red-300 font-bold underline decoration-[#8B2323]/40 underline-offset-2 hover:decoration-[#A52A2A] transition-colors break-all"
              >
                portal.marc.at
              </a>
            </p>
          </div>

          {/* QR Code — scannable from the screen */}
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex flex-col items-center gap-1.5 group"
            title="QR-Code scannen und direkt zum Portal gelangen"
          >
            <div className="bg-white rounded-2xl p-2 shadow-md group-hover:shadow-lg transition-shadow">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/portal-qr.avif`}
                alt="QR-Code zum Patientenportal portal.marc.at"
                width="96"
                height="96"
                className="w-24 h-24 rounded-lg"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
              Zum Portal
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PatientPortal;