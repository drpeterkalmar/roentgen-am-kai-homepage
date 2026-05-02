import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileActions = () => {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, x: '-50%', opacity: 0 }}
        animate={{ y: -20, x: '-50%', opacity: 1 }}
        exit={{ y: 100, x: '-50%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-0 left-1/2 z-[60] md:hidden w-[90%] max-w-sm"
      >
        <div className="glass px-2 py-2 rounded-full shadow-[0_20px_50px_rgba(139,35,35,0.2)] flex items-center justify-between border border-white/40">
          <a 
            href="tel:+433168409050" 
            className="flex-1 flex items-center justify-center gap-3 bg-[#8B2323] text-white py-4 rounded-full text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
          >
            <Phone size={18} />
            Anrufen
          </a>
          
          <div className="w-px h-8 bg-gray-200/50 dark:bg-gray-700/50 mx-2" />
          
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Körösistraße+9,8010+Graz" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 text-[#1f2937] dark:text-white py-4 rounded-full text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
          >
            <MapPin size={18} className="text-[#8B2323]" />
            Anfahrt
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileActions;
