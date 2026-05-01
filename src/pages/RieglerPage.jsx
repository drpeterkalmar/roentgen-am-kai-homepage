import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, BookOpen, Briefcase, GraduationCap, ArrowLeft, Mail, Phone, Globe, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RieglerPage = () => {
  const sections = [
    {
      title: "Werdegang & Ausbildung",
      icon: <GraduationCap className="text-[#8B2323]" size={24} />,
      items: [
        { date: "Facharztausbildung", text: "Medizinische Universität Wien und Royal London Hospital, England" },
        { date: "Medizinstudium", text: "Studium der Humanmedizin in Wien und Spanien" },
        { date: "Berufsstart", text: "Ausbildung zum Physiotherapeuten am LKH Steyr" }
      ]
    },
    {
      title: "Forschung & Wissenschaft",
      icon: <BookOpen className="text-[#8B2323]" size={24} />,
      items: [
        { date: "Leitung", text: "Leiter der Forschungsgruppe „Neuromuskulärer Ultraschall“" },
        { date: "Wissenschaft", text: "Treibende wissenschaftliche Kraft des PUC (Percutaneous Ultrasound Center)" },
        { date: "Publikationen", text: "Veröffentlichung zahlreicher wissenschaftlicher Artikel in internationalen Journalen" }
      ]
    }
  ];

  const expertises = [
    "Hochauflösende Ultraschall-Diagnostik",
    "Ultraschallgezielte minimalinvasive Therapien",
    "Diagnostik des Bewegungsapparates",
    "Erkrankungen des peripheren Nervensystems",
    "Interdisziplinäre Schmerztherapie",
    "Funktionelle Nervendiagnostik"
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Priv. Doz. Dr. Georg Riegler",
    "jobTitle": "Facharzt für Radiologie",
    "worksFor": {
      "@type": "MedicalBusiness",
      "name": "Röntgen am Kai"
    },
    "url": "https://roentgen-am-kai.at/unser-team/dr-georg-riegler",
    "image": "https://roentgen-am-kai.at/assets/images/knochendichte.avif",
    "alumniOf": "Medizinische Universität Wien",
    "description": "Facharzt für Radiologie mit Spezialisierung auf hochauflösenden Ultraschall und neuromuskuläre Diagnostik."
  };

  return (
    <div className="pt-40 lg:pt-48 pb-24 bg-transparent min-h-screen relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[60px]"
          style={{ willChange: 'transform' }}
        />
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -left-20 w-[450px] h-[450px] bg-blue-50/20 rounded-full blur-[60px]"
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-12">
          <Link to="/" className="hover:text-[#8B2323] transition-colors">Startseite</Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#8B2323] font-bold">Georg Riegler</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div className="glass p-2 rounded-[48px] shadow-2xl relative aspect-[4/5] overflow-hidden">
               <img 
                src={`${import.meta.env.BASE_URL}assets/images/knochendichte.avif`} 
                alt="Priv. Doz. Dr. Georg Riegler" 
                className="w-full h-full object-cover rounded-[40px] grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937]/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            <div className="inline-block px-4 py-1.5 bg-red-50 text-[#8B2323] rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
              Facharzt für Radiologie
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 font-[Outfit] leading-tight">
              Priv. Doz. Dr. med. univ. <br/>
              Georg <span className="text-[#8B2323]">Riegler</span>
            </h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 font-light italic">
              Gesellschafter der Röntgen am Kai OG
            </p>
            
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-[48px] mb-16 border-white/60"
        >
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 font-[Outfit]">Medizinische Philosophie</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium italic">
            "Bestmögliche Beschwerdefreiheit meiner Patientinnen und Patienten. Ein hohes Ziel, das von Anfang an meine medizinische Laufbahn und mein Handeln prägte."
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-[40px] flex flex-col cursor-default"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold font-[Outfit] dark:text-white">{section.title}</h3>
              </div>
              <div className="space-y-6 flex-grow">
                {section.items.map((item, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-red-100 last:border-0 pb-1">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#8B2323]" />
                    <p className="text-xs font-bold text-[#8B2323] uppercase tracking-wider mb-1">{item.date}</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-[40px] flex flex-col cursor-default"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <Award className="text-[#8B2323]" size={24} />
              </div>
              <h3 className="text-xl font-bold font-[Outfit]">Leistungen & Expertise</h3>
            </div>
            <div className="space-y-3">
              {expertises.map((exp, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#8B2323] mt-1 shrink-0" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">{exp}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-[48px] mb-16"
        >
          <div className="prose prose-red dark:prose-invert max-w-none text-gray-700 dark:text-gray-200">
            <h2 className="text-3xl font-black font-[Outfit] text-gray-900 dark:text-white mb-8">Hochauflösender Nervenultraschall</h2>
            <div className="space-y-6 text-base md:text-lg leading-relaxed">
              <p>
                Der hochauflösende Ultraschall ist für mich die perfekte Methode, um die oft komplexen Fragestellungen bei Erkrankungen des Bewegungsapparates und peripherer Nerven beantworten zu können. Er ist auch das optimale Mittel, um Therapien minimalinvasiv und somit schonend ultraschallgezielt durchführen zu können.
              </p>
              <p>
                Durch meinen Forschungsdrang bin ich ständig auf der Suche nach exakten Diagnosen und erfolgsversprechenden Therapien. Den Fortschritt auf dem Gebiet des hochauflösenden Ultraschalls versuche ich durch die Veröffentlichung zahlreicher wissenschaftlicher Artikel voranzutreiben. Als treibende wissenschaftliche Kraft des PUC und Leiter unserer Forschungsgruppe „Neuromuskulärer Ultraschall“ konnte ich in den letzten Jahren ein erfolgreiches motiviertes Team aufbauen.
              </p>
              <p>
                Die regelmäßige Teilnahme an Kongressen und Durchführung von Fortbildungen ermöglichen es mir, mein diagnostisches und therapeutisches Wissen ständig zu erweitern. Der konstante Austausch mit anderen Fachärztinnen und Fachärzten ist mir sehr wichtig, da er die Grundlage einer vollständigen Betreuung darstellt.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Link */}
        <div className="mt-16 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-[#8B2323] font-bold hover:gap-3 transition-all uppercase text-sm tracking-wider">
            <ArrowLeft size={18} />
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RieglerPage;
