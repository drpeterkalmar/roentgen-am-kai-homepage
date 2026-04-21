import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ChevronDown, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ highContrast, setHighContrast }) => {
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
      { name: 'Ultraschall', href: '/unser-angebot/ultraschall' },
      { name: 'Mammographie', href: '/unser-angebot/mammographie' },
      { name: 'DVT', href: '/unser-angebot/dvt' },
      { name: 'Knochendichte', href: '/unser-angebot/knochendichte' },
      { name: 'Körperfettmessung', href: '/unser-angebot/koerperfettmessung' },
      { name: 'Phlebographie', href: '/unser-angebot/phlebographie' },
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
            isScrolled ? 'text-[#8B2323]' : 'text-gray-900'
          } font-[Outfit]`}>
            RÖNTGEN <span className="text-[#8B2323]">AM KAI</span>
          </span>
          <div className="flex flex-col">
            <span className={`text-xs tracking-widest uppercase font-bold transition-opacity ${
              isScrolled ? 'text-gray-600' : 'text-gray-800'
            }`}>
              Fachärzte für Radiologie
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isHomeRoot = link.href === '/' && location.pathname === '/' && !location.hash;
              const isHashMatch = link.href.startsWith('/#') && location.hash === link.href.substring(1);
              const isServicePage = link.dropdown && location.pathname.startsWith('/unser-angebot');
              const isActive = isHomeRoot || isHashMatch || isServicePage;
              
              return (
                <div key={link.name} className="relative group/nav">
                  {link.href.startsWith('/#') ? (
                    <a
                      href={link.href}
                      className={`text-sm font-semibold tracking-[0.1em] uppercase hover:text-[#8B2323] transition-colors flex items-center gap-1.5 relative py-2 ${
                        isScrolled ? 'text-gray-800' : 'text-gray-950'
                      } ${isActive ? 'text-[#8B2323]' : ''}`}
                    >
                      {link.name}
                      {link.dropdown && <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform duration-300" />}
                      
                      {/* Hover/Active Underline */}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#8B2323] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
                      }`} />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`text-sm font-semibold tracking-[0.1em] uppercase hover:text-[#8B2323] transition-colors flex items-center gap-1.5 relative py-2 ${
                        isScrolled ? 'text-gray-800' : 'text-gray-950'
                      } ${isActive ? 'text-[#8B2323]' : ''}`}
                    >
                      {link.name}
                      {link.dropdown && <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform duration-300" />}
                      
                      {/* Hover/Active Underline */}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#8B2323] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
                      }`} />
                    </Link>
                  )}
                  
                  {link.dropdown && (
                    <div className="absolute top-full -left-4 pt-6 invisible opacity-0 group-hover/nav:visible group-hover/nav:opacity-100 transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 z-50">
                      <div className="bg-white/95 backdrop-blur-xl border border-gray-100/50 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 w-72 grid gap-1.5 glass-glow">
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
                                  ? 'text-[#8B2323] bg-red-50' 
                                  : 'text-gray-700 hover:text-[#8B2323] hover:bg-red-50'
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

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                highContrast ? 'bg-black text-white' : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200 hover:text-[#8B2323]'
              }`}
              title="Magic Toggle (Barrierefreiheit)"
              aria-label="Barrierefreiheit-Optionen umschalten"
            >
              <Sparkles size={20} />
            </button>
            <a
              href="tel:+433168409050"
              className="bg-[#8B2323] text-white px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#A52A2A] hover:shadow-[0_10px_30px_rgba(139,35,35,0.3)] transition-all flex items-center gap-2 active:scale-95"
            >
              <Phone size={16} />
              Termin
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Menü schließen" : "Hauptmenü öffnen"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full py-6 px-4 animate-fade shadow-xl border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-2">
                {link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    className="text-lg font-semibold text-gray-800 py-2"
                    onClick={() => !link.dropdown && setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="text-lg font-semibold text-gray-800 py-2"
                    onClick={() => !link.dropdown && setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
                {link.dropdown && (
                  <div className="pl-4 grid gap-2 border-l-2 border-red-100 mb-3">
                    {link.dropdown.map((sub) => (
                      <Link 
                        key={sub.name}
                        to={sub.href}
                        className="text-gray-600 font-medium text-sm py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="tel:+433168409050"
              className="bg-[#8B2323] text-white py-4 rounded-xl text-center font-bold text-lg mt-2 flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone size={20} />
              Termin
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
