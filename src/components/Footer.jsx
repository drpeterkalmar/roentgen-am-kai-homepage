import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-transparent text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#8B2323] rounded-full blur-[120px] opacity-20" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 glass p-12 md:p-16 rounded-[48px] border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-8">
              <span className="text-3xl font-extrabold tracking-tight text-[#8B2323] font-[Outfit]">
                RÖNTGEN AM KAI
              </span>
              <span className="text-sm tracking-widest uppercase font-semibold text-gray-500">
                Radiologie Graz
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed mb-8">
              Ihre Experten für moderne Radiologie in Graz. Fachärzte für Radiologie – alle Kassen und privat.
            </p>
            <div className="flex gap-4">
              {/* Social icons removed per user request (There are none) */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 font-[Outfit]">Navigation</h4>
            <ul className="space-y-4 text-gray-800">
              <li><a href="/#home" className="hover:text-[#8B2323] transition-colors">Startseite</a></li>
              <li><a href="/#services" className="hover:text-[#8B2323] transition-colors">Leistungen</a></li>
              <li><a href="/#team" className="hover:text-[#8B2323] transition-colors">Unser Team</a></li>
              <li><a href="/#blog" className="hover:text-[#8B2323] transition-colors">Gesundheits-Blog</a></li>
              <li><a href="/#booking" className="hover:text-[#8B2323] transition-colors">Terminbuchung</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-xl font-bold mb-8 font-[Outfit]">Kontakt & Anfahrt</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-gray-800">
                  <MapPin className="text-[#8B2323] shrink-0" size={24} />
                  <div>
                    <p className="text-gray-950 font-bold">Zentrale Lage</p>
                    <p className="mb-4">Körösistraße 9<br />8010 Graz, Österreich</p>
                    
                    {/* Stylized Map View */}
                    <div className="relative group rounded-3xl overflow-hidden mb-4 shadow-xl border border-gray-700">
                      <img 
                        src="/assets/images/footer-map.webp" 
                        alt="Anfahrtsskizze Röntgen am Kai - Körösistraße 9, 8010 Graz" 
                        className="w-full h-[150px] object-cover"
                      />
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=Körösistraße+9+8010+Graz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold">Route öffnen</span>
                      </a>
                    </div>

                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=Körösistraße+9+8010+Graz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#8B2323] hover:text-[#A52A2A] font-bold text-sm transition-colors border-b-2 border-[#8B2323]/30 pb-0.5"
                    >
                      Anreise planen
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-gray-800">
                  <Phone className="text-[#8B2323] shrink-0" size={24} />
                  <div>
                    <p className="text-gray-950 font-bold">Telefon</p>
                    <a href="tel:+433168409050" className="hover:text-[#8B2323] transition-colors">0316 840 90 50</a>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 font-[Outfit]">Öffnungszeiten</h4>
              <ul className="space-y-3 text-gray-800 mb-8">
                <li className="flex justify-between">
                  <span>Mo - Do</span>
                  <span className="text-gray-950 font-medium">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Freitag</span>
                  <span className="text-gray-950 font-medium">08:00 - 13:00</span>
                </li>
              </ul>
              <div className="bg-gray-100/50 p-6 rounded-3xl border border-gray-200">
                <p className="text-sm text-gray-800 leading-relaxed italic">
                  <strong>Anreise:</strong> Kostenlose Tiefgaragenplätze für Patienten & gute öffentliche Anbindung mit den Straßenbahnlinien 3 und 5 und den Buslinien 58 und 63. Termine nur nach Vereinbarung.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © Röntgen am Kai - Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-8 text-gray-600 text-sm">
            <a href="/impressum" className="hover:text-[#8B2323]">Impressum</a>
            <a href="/datenschutz" className="hover:text-[#8B2323]">Datenschutz</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-[#8B2323] rounded-full flex items-center justify-center hover:bg-[#A52A2A] transition-all group"
          >
            <ArrowUp className="group-hover:-translate-y-1 transition-transform" size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
