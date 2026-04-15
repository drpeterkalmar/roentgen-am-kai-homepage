import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
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
      isScrolled ? 'glass py-3 shadow-md' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <span className={`text-2xl font-extrabold tracking-tight transition-colors ${
            isScrolled ? 'text-[#8B2323]' : 'text-[#1f2937]'
          } font-[Outfit]`}>
            RÖNTGEN AM KAI
          </span>
          <div className="flex flex-col">
            <span className={`text-[10px] tracking-widest uppercase font-semibold ${
              isScrolled ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Radiologie Graz
            </span>
            <span className={`text-[9px] font-medium ${
              isScrolled ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Priv. Doz. Dr. Peter Kalmar & Priv. Doz. Dr. Georg Riegler
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.href.startsWith('/#') ? (
                <a
                  href={link.href}
                  className={`text-sm font-bold tracking-wide uppercase hover:text-[#8B2323] transition-colors flex items-center gap-1 ${
                    isScrolled ? 'text-gray-700' : 'text-gray-900'
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className={`text-sm font-bold tracking-wide uppercase hover:text-[#8B2323] transition-colors flex items-center gap-1 ${
                    isScrolled ? 'text-gray-700' : 'text-gray-900'
                  } ${location.pathname === link.href ? 'text-[#8B2323]' : ''}`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                </Link>
              )}
              
              {link.dropdown && (
                <div className="absolute top-full left-0 pt-4 hidden group-hover:block transition-all">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-3 w-64 grid gap-1 animate-fade">
                    {link.dropdown.map((sub) => (
                      <Link 
                        key={sub.name}
                        to={sub.href}
                        className={`text-sm font-bold p-3 rounded-xl transition-all ${
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
          <Link
            to="/#booking"
            className="bg-[#8B2323] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#A52A2A] transition-all flex items-center gap-2"
          >
            <Calendar size={16} />
            Termin buchen
          </Link>
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
