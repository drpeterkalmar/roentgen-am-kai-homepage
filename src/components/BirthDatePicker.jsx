import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, Calendar as CalendarIcon } from 'lucide-react';

const BirthDatePicker = ({ value, onChange, label = "Geburtsdatum*" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('decade'); // decade, year, month, day
  const [tempDate, setTempDate] = useState({
    decade: null,
    year: null,
    month: null,
    day: null
  });
  
  const containerRef = useRef(null);

  const months = [
    "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", 
    "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
  ];

  const decades = [];
  const currentYear = new Date().getFullYear();
  const startDecade = Math.floor(currentYear / 10) * 10;
  for (let d = startDecade; d >= 1920; d -= 10) {
    decades.push(d);
  }

  const getYearsInDecade = (dec) => {
    const years = [];
    for (let y = dec + 9; y >= dec; y--) {
      // Don't show future years
      if (y <= currentYear) {
        years.push(y);
      }
    }
    return years;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleSelectYear = (y) => {
    setTempDate({ ...tempDate, year: y });
    setStep('month');
  };

  const handleSelectMonth = (mIdx) => {
    setTempDate({ ...tempDate, month: mIdx });
    setStep('day');
  };

  const handleSelectDay = (d) => {
    const finalDate = `${tempDate.year}-${String(tempDate.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    onChange(finalDate);
    setIsOpen(false);
    // Reset for next open
    setTimeout(() => {
        setStep('decade');
    }, 300);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split('-');
    return `${d}.${m}.${y}`;
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Hidden input for HTML5 validation */}
      <input 
        type="text" 
        tabIndex="-1"
        className="absolute opacity-0 pointer-events-none" 
        required 
        value={value || ""} 
        readOnly 
      />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[58px] px-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none text-left transition-all bg-white flex items-center justify-between shadow-sm hover:border-gray-400 ${!value ? 'text-gray-500' : 'text-gray-950'}`}
      >
        <span className="font-medium tracking-tight">
          {value ? formatDate(value) : label}
        </span>
        <CalendarIcon size={18} className="text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[100] bottom-full sm:top-full left-0 w-full sm:w-80 mb-2 sm:mb-0 sm:mt-2 glass p-4 rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100/50">
              <div className="flex items-center gap-2">
                {step !== 'decade' && (
                  <button 
                    type="button"
                    onClick={() => {
                        if (step === 'year') setStep('decade');
                        if (step === 'month') setStep('year');
                        if (step === 'day') setStep('month');
                    }}
                    className="p-1 px-2 hover:bg-red-50 text-[#8B2323] rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                  >
                    <ChevronLeft size={14} />
                    Zurück
                  </button>
                )}
                <span className="font-bold text-xs uppercase tracking-[0.1em] text-gray-400">
                  {step === 'decade' && "Jahrzehnt"}
                  {step === 'year' && "Jahr"}
                  {step === 'month' && `${tempDate.year}`}
                  {step === 'day' && `${months[tempDate.month]} ${tempDate.year}`}
                </span>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[220px] max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
              {step === 'decade' && (
                <div className="grid grid-cols-2 gap-2">
                  {decades.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setTempDate({ ...tempDate, decade: d });
                        setStep('year');
                      }}
                      className="p-3 text-sm font-bold rounded-xl hover:bg-[#8B2323] hover:text-white border border-gray-50 bg-white/50 shadow-sm transition-all text-gray-700"
                    >
                      {d}er
                    </button>
                  ))}
                </div>
              )}

              {step === 'year' && (
                <div className="grid grid-cols-3 gap-2">
                  {getYearsInDecade(tempDate.decade).map(y => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => handleSelectYear(y)}
                      className="p-2 text-sm font-bold rounded-xl hover:bg-[#8B2323] hover:text-white border border-gray-50 bg-white/50 transition-all text-gray-700"
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}

              {step === 'month' && (
                <div className="grid grid-cols-3 gap-2 text-[#4b5563]">
                  {months.map((m, i) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSelectMonth(i)}
                      className="p-3 text-sm font-extrabold rounded-xl hover:bg-[#8B2323] hover:text-white border border-gray-50 bg-white/50 transition-all"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}

              {step === 'day' && (
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: getDaysInMonth(tempDate.year, tempDate.month) }, (_, i) => i + 1).map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleSelectDay(d)}
                      className="aspect-square text-xs font-bold rounded-lg hover:bg-[#8B2323] hover:text-white border border-gray-50 bg-white/50 transition-all flex items-center justify-center text-gray-700 shadow-sm"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthDatePicker;
