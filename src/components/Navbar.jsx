import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ highContrast, setHighContrast, isDark, setIsDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Unser Angebot', href: '/#services', dropdown: [
      { name: 'Digitales Röntgen', href: '/unser-angebot/roentgen' },
      { name: 'Mammographie', href: '/unser-angebot/mammographie' },
      { name: 'Knochendichte', href: '/unser-angebot/knochendichte' },
      { name: 'Körperfettmessung', href: '/unser-angebot/koerperfettmessung' },
      { name: 'DVT / Zahnröntgen', href: '/unser-angebot/dvt' },
      { name: 'Phlebographie', href: '/unser-angebot/phlebographie' },
      { name: 'Ultraschall', href: '/unser-angebot/ultraschall' },
    ]},
    { name: 'Unsere Ärzte', href: '/#about' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Kontakt', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass py-4 shadow-xl' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex flex-col group">
          <span className={`text-2xl font-extrabold tracking-tight transition-colors ${
            isScrolled ? 'text-[#8B2323]' : 'text-gray-900 dark:text-white'
          } font-[Outfit]`}>
            RÖNTGEN <span className="text-[#8B2323]">AM KAI</span>
          </span>
          <div className="flex flex-col">
            <span className={`text-xs tracking-widest uppercase font-bold transition-opacity ${
              isScrolled ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-300'
            }`}>
              Fachärzte für Radiologie
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-10">
          <div className="flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => {
              const isHomeRoot = link.href === '/' && location.pathname === '/' && !location.hash;
              const isHashMatch = link.href.startsWith('/#') && location.hash === link.href.substring(1);
              const isServicePage = link.dropdown && location.pathname.startsWith('/unser-angebot');
              const isActive = isHomeRoot || isHashMatch || isServicePage;
              
              return (
                <div key={link.name} className="relative group/nav">
                  <Link
                    to={link.href}
                    className={`text-sm font-semibold tracking-[0.1em] uppercase hover:text-[#8B2323] transition-colors flex items-center gap-1.5 relative py-2 ${
                      isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-gray-950 dark:text-white'
                    } ${isActive ? 'text-[#8B2323]' : ''}`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform duration-300" />}
                    
                    {/* Hover/Active Underline */}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#8B2323] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
                    }`} />
                  </Link>
                  
                  {link.dropdown && (
                    <div className="absolute top-full -left-4 pt-6 invisible opacity-0 group-hover/nav:visible group-hover/nav:opacity-100 transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 z-50">
                      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 w-72 grid gap-1.5 glass-glow">
                        {link.dropdown.map((sub, idx) => (
                          <motion.div
                            key={sub.name}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link 
                              to={sub.href}
                              className={`text-sm font-bold p-4 rounded-2xl transition-all flex items-center justify-between group/item ${
                                location.pathname === sub.href 
                                  ? 'text-[#8B2323] bg-red-50 dark:bg-red-900/20' 
                                  : 'text-gray-700 dark:text-gray-300 hover:text-[#8B2323] hover:bg-red-50 dark:hover:bg-red-900/20'
                              }`}
                            >
                              {sub.name}
                              <div className={`w-1.5 h-1.5 rounded-full bg-[#8B2323] transition-all duration-300 ${
                                location.pathname === sub.href ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100'
                              }`} />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600 hover:text-[#8B2323]'
              }`}
              title="Theme umschalten"
              aria-label="Dunkelmodus umschalten"
            >
              {isDark ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                highContrast ? 'bg-black text-white' : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200 hover:text-[#8B2323]'
              }`}
              title="Hoher Kontrast"
              aria-label="Barrierefreiheit-Optionen umschalten"
            >
              <Sparkles size={20} />
            </button>
            <a
              href="tel:+433168409050"
              className="bg-[#8B2323] text-white px-4 lg:px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#A52A2A] hover:shadow-[0_10px_30px_rgba(139,35,35,0.3)] transition-all flex items-center gap-2 active:scale-95"
            >
              <Phone size={16} />
              Termin
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 text-gray-900 dark:text-white`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Menü schließen" : "Hauptmenü öffnen"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass absolute top-full left-0 w-full shadow-2xl border-t border-gray-100/50 dark:border-gray-800 overflow-hidden z-50"
          >
            <div className="py-8 px-6 space-y-8 max-h-[85vh] overflow-y-auto">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col border-b border-gray-100/50 dark:border-gray-800/50 last:border-0">
                    <Link
                      to={link.href}
                      className="text-xl font-black text-gray-900 dark:text-white py-4 flex items-center justify-between group"
                      onClick={() => !link.dropdown && setIsMenuOpen(false)}
                    >
                      {link.name}
                      {link.dropdown && <ChevronDown size={20} className="text-gray-400" />}
                    </Link>
                    {link.dropdown && (
                      <div className="pl-4 pb-4 grid gap-4 border-l-2 border-red-100 dark:border-red-900/30">
                        {link.dropdown.map((sub) => (
                          <Link 
                            key={sub.name}
                            to={sub.href}
                            className="text-gray-600 dark:text-gray-400 font-bold text-sm hover:text-[#8B2323] transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Additional Mobile Links */}
                <Link
                  to="/#booking"
                  className="text-xl font-black text-gray-900 dark:text-white py-4 border-b border-gray-100/50 dark:border-gray-800/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Terminanfrage
                </Link>
              </div>

              {/* Settings Toggles */}
              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Einstellungen</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsDark(!isDark)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl transition-all duration-300 border ${
                      isDark 
                      ? 'bg-gray-800 border-gray-700 text-yellow-400' 
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="text-sm font-bold">{isDark ? 'Hell' : 'Dunkel'}</span>
                  </button>
                  <button 
                    onClick={() => setHighContrast(!highContrast)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl transition-all duration-300 border ${
                      highContrast 
                      ? 'bg-black border-gray-800 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    <Sparkles size={20} />
                    <span className="text-sm font-bold">Kontrast</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <a
                  href="tel:+433168409050"
                  className="bg-[#8B2323] text-white py-5 rounded-2xl text-center font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(139,35,35,0.3)] active:scale-95 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone size={20} />
                  Anrufen
                </a>
                
                <div className="flex justify-center gap-6 text-gray-400 text-xs font-bold py-2">
                  <Link to="/impressum" onClick={() => setIsMenuOpen(false)}>Impressum</Link>
                  <span className="opacity-30">•</span>
                  <Link to="/datenschutz" onClick={() => setIsMenuOpen(false)}>Datenschutz</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
