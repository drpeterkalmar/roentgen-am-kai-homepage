import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#1f2937] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#8B2323] rounded-full blur-[120px] opacity-20" />
      
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-8">
              <span className="text-3xl font-extrabold tracking-tight text-[#8B2323] font-[Outfit]">
                RÖNTGEN AM KAI
              </span>
              <span className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                Radiologie Graz
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Ihre Experten für moderne Radiologie in Graz. Fachärzte für Radiologie – alle Kassen und privat.
            </p>
            <div className="flex gap-4">
              {/* Social icons removed per user request (There are none) */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 font-[Outfit]">Navigation</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Startseite</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Leistungen</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Unser Team</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Gesundheits-Blog</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Terminbuchung</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-xl font-bold mb-8 font-[Outfit]">Kontakt</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-gray-400">
                  <MapPin className="text-[#8B2323] shrink-0" size={24} />
                  <div>
                    <p className="text-white font-bold">Anreise</p>
                    <p className="mb-2">Körösistraße 9<br />8010 Graz, Österreich</p>
                    <div className="text-xs space-y-1">
                      <p><strong className="text-gray-300">Öffentlich:</strong> Straßenbahn 3 & 5, Bus 58 & 63 (Haltestelle Keplerbrücke)</p>
                      <p><strong className="text-gray-300">Parken:</strong> Kostenlose Tiefgarage im Haus (Einfahrt via Körösistraße)</p>
                      <p><strong className="text-gray-300">Zugang:</strong> Barrierefrei mit Lift in den 1. Stock</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-gray-400">
                  <Phone className="text-[#8B2323] shrink-0" size={24} />
                  <div>
                    <p className="text-white font-bold">Telefon</p>
                    <a href="tel:+433168409050" className="hover:text-white transition-colors">0316 840 90 50</a>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-gray-400">
                  <Mail className="text-[#8B2323] shrink-0" size={24} />
                  <div>
                    <p className="text-white font-bold">E-Mail</p>
                    <a href="mailto:office@roentgen-am-kai.at" className="hover:text-white transition-colors">office@roentgen-am-kai.at</a>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 font-[Outfit]">Öffnungszeiten</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex justify-between">
                  <span>Mo - Do</span>
                  <span className="text-white font-medium">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Freitag</span>
                  <span className="text-white font-medium">08:00 - 13:00</span>
                </li>
                <li className="pt-4 text-sm italic">
                  Termine nur nach telefonischer oder Online-Vereinbarung.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Fachärzte für Radiologie OG. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="/impressum" className="hover:text-white">Impressum</a>
            <a href="/datenschutz" className="hover:text-white">Datenschutz</a>
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
