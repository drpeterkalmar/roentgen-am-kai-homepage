import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mic, FileText, Zap, Monitor, ShieldCheck, ChevronRight } from 'lucide-react';

const RaKScribeDownload = () => {
  const exeUrl = 'https://github.com/drpeterkalmar/RaKScribe26/releases/latest/download/rakscribe26.exe';
  const releaseUrl = 'https://github.com/drpeterkalmar/RaKScribe26/releases/latest';

  const features = [
    { icon: <Mic size={20} />, text: 'Diktieren per F10-Taste' },
    { icon: <FileText size={20} />, text: 'Strukturierter Befund & Beurteilung' },
    { icon: <Zap size={20} />, text: 'Befund in unter 2 Sekunden' },
    { icon: <ShieldCheck size={20} />, text: 'Datenschutz-freundlich, lauffähig ohne Installation' },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass-featured rounded-[40px] p-8 md:p-12 border-2 border-[#8B2323]/30 shadow-2xl relative overflow-hidden"
        >
          {/* Background accent */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#8B2323]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
            {/* Text + CTA */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#8B2323]/5 text-[#8B2323] dark:bg-[#8B2323]/15 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-[#8B2323]/10 mb-4">
                <Monitor size={14} />
                RaKScribe26 Desktop
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.02] font-[Outfit] tracking-tight mb-4">
                Befunden direkt am{' '}
                <span className="text-[#8B2323]">Schreibtisch</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-200 max-w-xl leading-relaxed font-medium mb-6">
                Unsere Softwarelösung für den radiologischen Befundungsalltag – als eigenständige
                Windows-Anwendung. Diktieren, strukturieren, einfügen: blitzschnell und präzise,
                ganz ohne Browser.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <a
                  href={exeUrl}
                  className="inline-flex items-center gap-2 bg-[#8B2323] hover:bg-[#A52A2A] text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.1em] shadow-lg shadow-red-900/20 transition-colors"
                >
                  <Download size={18} />
                  Download für Windows
                </a>
                <a
                  href={releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#8B2323] font-black text-sm uppercase tracking-[0.1em] hover:text-[#A52A2A] transition-colors"
                >
                  Alle Dateien & Anleitung
                  <ChevronRight size={16} />
                </a>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-lg">
                Für die vollständige Einrichtung benötigen Sie neben der EXE auch{' '}
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[#8B2323] font-mono text-[11px]">config.ini</code>,{' '}
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[#8B2323] font-mono text-[11px]">templates.json</code> und{' '}
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[#8B2323] font-mono text-[11px]">radiology_prompt.txt</code>{' '}
                – alle im Release-Bereich verfügbar. Legen Sie sie in denselben Ordner.
              </p>
            </div>

            {/* Feature chips */}
            <div className="w-full lg:w-96 grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-3.5 shadow-sm"
                >
                  <div className="w-10 h-10 shrink-0 bg-[#8B2323]/10 text-[#8B2323] rounded-xl flex items-center justify-center">
                    {f.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-snug">
                    {f.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RaKScribeDownload;
