import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ChevronDown, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
            <span className={`text-[10px] tracking-widest uppercase font-bold transition-opacity ${
              isScrolled ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Radiologie Graz precision
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    className={`text-xs font-black tracking-[0.1em] uppercase hover:text-[#8B2323] transition-colors flex items-center gap-1.5 ${
                      isScrolled ? 'text-gray-700' : 'text-gray-900'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-xs font-black tracking-[0.1em] uppercase hover:text-[#8B2323] transition-colors flex items-center gap-1.5 ${
                      isScrolled ? 'text-gray-700' : 'text-gray-900'
                    } ${location.pathname === link.href ? 'text-[#8B2323]' : ''}`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                  </Link>
                )}
                
                {link.dropdown && (
                  <div className="absolute top-full -left-4 pt-6 hidden group-hover:block transition-all duration-300">
                    <div className="bg-white/95 backdrop-blur-xl border border-gray-100/50 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 w-72 grid gap-1.5 animate-fade glass-glow">
                      {link.dropdown.map((sub) => (
                        <Link 
                          key={sub.name}
                          to={sub.href}
                          className={`text-xs font-bold p-4 rounded-2xl transition-all ${
                            location.pathname === sub.href 
                              ? 'text-[#8B2323] bg-red-50' 
                              : 'text-gray-700 hover:text-[#8B2323] hover:bg-red-50'
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                highContrast ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-[#8B2323]'
              }`}
              title="Magic Toggle (Barrierefreiheit)"
            >
              <Sparkles size={20} />
            </button>
            <Link
              to="/#booking"
              className="bg-[#8B2323] text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#A52A2A] hover:shadow-[0_10px_30px_rgba(139,35,35,0.3)] transition-all flex items-center gap-2 active:scale-95"
            >
              <Calendar size={16} />
              Termin
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                    className="text-lg font-bold text-gray-800 py-2"
                    onClick={() => !link.dropdown && setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="text-lg font-bold text-gray-800 py-2"
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
            <Link
              to="/#booking"
              className="bg-[#8B2323] text-white py-4 rounded-xl text-center font-bold text-lg mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Termin buchen
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
