import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#8B2323] dark:text-[#A52A2A]' : 'text-gray-900 dark:text-white group-hover:text-[#8B2323] dark:group-hover:text-[#A52A2A]'}`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#8B2323] text-white rotate-180' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-700 dark:text-gray-200 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = ({ items, title = "Häufig gestellte Fragen" }) => {
  return (
    <section id="faq" className="py-24 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-[#8B2323] dark:text-[#A52A2A]">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-[Outfit]">
            {title}
          </h2>
        </div>

        <div className="glass rounded-[40px] p-8 md:p-12">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;