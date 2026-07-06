import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, BookOpen, Briefcase, GraduationCap, ArrowLeft, Mail, Phone, Globe, CheckCircle2, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const RieglerPage = () => {
  const sections = [
    {
      title: "Abschlüsse",
      icon: <GraduationCap className="text-[#8B2323]" size={24} />,
      items: [
        { date: "2019", text: "Venia docendi im Fach Radiologie, Medizinische Universität Wien" },
        { date: "2018", text: "Facharztdiplom für Radiologie, Medizinische Universität Wien; Auslandsaufenthalt Royal London Hospital, England" },
        { date: "2011", text: "Promotion in Humanmedizin, Medizinische Universität Wien; Auslandsaufenthalte (Medizinische Universität La Laguna Spanien, Medizinische Universität Las Palmas Spanien)" },
        { date: "2005", text: "Akademie für Physiotherapie Steyr" },
        { date: "2000", text: "Matura Bischöfliches Gymnasium Graz" }
      ]
    },
    {
      title: "Berufliche Laufbahn",
      icon: <Briefcase className="text-[#8B2323]" size={24} />,
      items: [
        { date: "Seit 2025", text: "Gesellschafter der Röntgen am Kai OG (Nachfolger Dr. Konrad Uranitsch)" },
        { date: "2017-2025", text: "Wahlarztordination Private Ultrasound Center mit Spezialisierung auf Hochauflösenden Ultraschall" },
        { date: "2017-2019", text: "Facharzt an der Univ. Klinik für Radiologie und Nuklearmedizin, Klinische Abteilung für Neuroradiologie und Muskuloskeletale Radiologie" }
      ]
    },
  ];

  const expertises = [
    "Hochauflösende Ultraschall-Diagnostik",
    "Ultraschallgezielte minimalinvasive Therapien",
    "Diagnostik des Bewegungsapparates",
    "Erkrankungen des peripheren Nervensystems",
    "Interdisziplinäre Schmerztherapie",
    "Funktionelle Nervendiagnostik"
  ];

  const diplomas = [
    "Diplom Sportmedizin",
    "Gültiges DFP Diplom",
    "ÖÄK Zertifikat Mammadiagnostik",
    "ÖÄK Zertifikat Angiologische Basisdiagnostik",
    "ÖÄK Zertifikat Sonographie Arterien",
    "ÖÄK Zertifikat Sonographie Venen",
    "ÖÄK Zertifikat Sonographie Hirnversorgende Arterien",
    "ÖÄK Zertifikat Sonographie SmallParts",
    "OAK Zertifikat Pädiatrische Sonographie",
    "ÖAK Zertifikat Abdomen",
    "ÖAK Zertifikat Sonographie Bewegungsapparat",
    "ÖAK Zertifikat Sonographie Schilddrüse",
    "ÖAK Zertifikat Urogenitale Sonographie",
    "ÖAK Zertifikat Weiblicher Unterbauch",
    "ÖGUM Zertifikat Nervensonographie",
    "ÖGUM Zertifikat Sonographie des Bewegungsapparates"
  ];

  const base = import.meta.env.BASE_URL;
  const publications = [
    { text: "Becciolini M, Tamborrini G, Pivec C, Riegler G: Ultrasound findings in 46 cases of incomplete release of the transverse carpal ligament in carpal tunnel surgery. Ultraschall Med 2026", pdf: `${base}publications/Becciolini_2026_incomplete_TCL_release.pdf` },
    { text: "Becciolini M, Pivec C, Raspanti A, Riegler G. Ultrasound of the Ulnar Nerve: A Pictorial Review: Part 2: Pathological Ultrasound Findings. J Ultrasound Med. 2024", pdf: `${base}publications/Becciolini_2024_Ulnar_Nerve_Part2_Pathological.pdf` },
    { text: "Becciolini M, Pivec C, Raspanti A, Riegler G. Ultrasound of the Ulnar Nerve: A Pictorial Review: Part 1: Normal Ultrasound Findings. J Ultrasound Med. 2024", pdf: `${base}publications/Becciolini_2024_Ulnar_Nerve_Part1_Normal.pdf` },
    { text: "Becciolini M, Pivec C, Riegler G. Ultrasound of the Lateral Femoral Cutaneous Nerve: A Review of the Literature and Pictorial Essay. J Ultrasound Med. 2022", pdf: `${base}publications/Becciolini_2022_Lateral_Femoral_Cutaneous_Nerve.pdf` },
    { text: "Becciolini M, Raspanti A, De Scisciolo G, Riegler G. Radial nerve palsy: If in doubt, use ultrasound. J Clin Ultrasound. 2022", pdf: `${base}publications/Becciolini_2022_Radial_nerve_palsy.pdf` },
    { text: "Becciolini M, Pivec C, Raspanti A, Riegler G. Ultrasound of the Radial Nerve: A Pictorial Review. J Ultrasound Med. 2021", pdf: `${base}publications/Becciolini_2021_Radial_Nerve_Pictorial_Review.pdf` },
    { text: "Becciolini M, Pivec C, Riegler G. Ultrasound Imaging of the Deep Peroneal Nerve. J Ultrasound Med. 2021", pdf: `${base}publications/Becciolini_2021_Deep_Peroneal_Nerve.pdf` },
    { text: "Riegler G, Pivec C, Jengojan S, Mayer JA, Schellen C, Trattnig S, Bodner G. Cutaneous nerve fields of the anteromedial lower limb — Determination with selective ultrasound-guided nerve blockade. Clin Anat. 2021", pdf: `${base}publications/Riegler_2021_Cutaneous_nerve_anteromedial_lower_limb.pdf` },
    { text: "Pivec C, Bodner G, Mayer JA, Brugger PC, Paraszti I, Moser V, Traxler H, Riegler G. Novel demonstration of the anterior femoral cutaneous nerves using ultrasound. Ultraschall Med. 2018", pdf: `${base}publications/Pivec_2018_Anterior_Femoral_Cutaneous_Nerves.pdf` },
    { text: "Riegler G, Brugger PC, Gruber GM, Pivec C, Jengojan S, Bodner G. High-resolution ultrasound visualization of Pacinian corpuscles. Ultrasound in Medicine and Biology. 2018", pdf: `${base}publications/Riegler_2018_Pacinian_Corpuscles.pdf` },
    { text: "Riegler G, Jengojan S, Mayer JA, Pivec C, Platzgummer H, Brugger PC, Aszmann O, Bodner G. Ultrasound anatomical demonstration of the infrapatellar nerve branches. Arthroscopy. 2018", pdf: `${base}publications/Riegler_2018_Infrapatellar_Nerve_Branches.pdf` },
    { text: "Riegler G, Lieba-Samal D, Brugger PC, Pivec C, Platzgummer H, Vierhapper M, Muschitz G, Jengojan S, Bodner G. High-resolution ultrasound visualization of the deep branch of the ulnar nerve. Muscle Nerve. 2017", pdf: `${base}publications/Riegler_2017_Deep_Branch_Ulnar_Nerve.pdf` },
    { text: "Riegler G, Pivec C, Platzgummer H, Lieba-Samal D, Brugger P, Jengojan S, Vierhapper M, Bodner G. High-resolution ultrasound visualization of the recurrent motor branch of the median nerve: normal and first pathological findings. Eur Radiol. 2017", pdf: `${base}publications/Riegler_2017_Recurrent_Motor_Branch_Median_Nerve.pdf` },
    { text: "Riegler G, Drlicek G, Kronnerwetter C, Heule R, Bieri O, Bodner G, Lieba-Samal D, Trattnig S. High-Resolution Axonal Bundle (fascicle) Assessment and Triple-Echo Steady-State T2 Mapping of the Median Nerve at 7 Tesla: Preliminary Experience. Invest Radiol. 2016", pdf: `${base}publications/Riegler_2016_Axonal_Bundle_7Tesla.pdf` }
  ];

  const grants = [
    { amount: "100.000 €", source: "Austrian National Bank, Jubilee Research Funds", title: "Early detection of cartilage damage, synovitis, and tenosynovitis in patients with rheumatoid arthritis at 7 Tesla Magnetic Resonance Imaging" },
    { amount: "10.000 €", source: "Medical Scientific Fund of the Mayor of the City of Vienna", title: "High-resolution ultrasound visualization of the cutaneous innervation at the anteromedial side of the knee" }
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
        <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-12">
          <Link to="/" className="hover:text-[#8B2323] transition-colors">Startseite</Link>
          <span className="text-gray-400 dark:text-gray-600">/</span>
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
              <h3 className="text-xl font-bold font-[Outfit] dark:text-white">Leistungen & Expertise</h3>
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

        {/* DFP Diplomas Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          transition={{ delay: 0.3 }}
          className="glass p-8 rounded-[40px] flex flex-col cursor-default mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <Award className="text-[#8B2323]" size={24} />
            </div>
            <h3 className="text-xl font-bold font-[Outfit] dark:text-white">Fortbildungsdiplome und Zertifikate</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diplomas.map((diploma, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 border border-white/60 dark:border-gray-700">
                <CheckCircle2 size={18} className="text-[#8B2323] shrink-0" />
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{diploma}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Publications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-[48px] mb-16"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
              <BookOpen className="text-[#8B2323]" size={28} />
            </div>
            <h2 className="text-3xl font-black font-[Outfit] dark:text-white">Ausgewählte Publikationen</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {publications.map((pub, i) => {
              const isObj = typeof pub === 'object';
              const pubText = isObj ? pub.text : pub;
              const pubPdf = isObj ? pub.pdf : null;
              return (
                <div key={i} className="p-6 rounded-3xl bg-white/50 dark:bg-gray-800/50 border border-white/60 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all group">
                  {pubPdf ? (
                    <a href={pubPdf} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 text-gray-800 dark:text-gray-200 leading-relaxed font-medium group-hover:text-[#8B2323] transition-colors">
                      <span>{pubText}</span>
                      <FileText className="text-gray-400 group-hover:text-[#8B2323] shrink-0 mt-1 transition-colors" size={20} />
                    </a>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">{pubText}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grants */}
          <div className="flex items-center gap-4 mb-8 mt-12">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <Award className="text-[#8B2323]" size={24} />
            </div>
            <h3 className="text-2xl font-black font-[Outfit] dark:text-white">Forschungsgelder</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grants.map((grant, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/50 dark:bg-gray-800/50 border border-white/60 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all">
                <p className="text-2xl font-black text-[#8B2323] mb-2">{grant.amount}</p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">{grant.source}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">{grant.title}</p>
              </div>
            ))}
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
