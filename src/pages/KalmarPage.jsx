import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, BookOpen, Briefcase, GraduationCap, ArrowLeft, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const KalmarPage = () => {
  const sections = [
    {
      title: "Ausbildung",
      icon: <GraduationCap className="text-[#8B2323]" size={24} />,
      items: [
        { date: "2016", text: "Venia docendi im Fach Radiologie, Medizinische Universität Graz" },
        { date: "2014", text: "Facharztdiplom für Radiologie, Medizinische Universität Graz" },
        { date: "2011", text: "Master of Health Business Administration (MHBA), Friedrich-Alexander-Universität, Nürnberg" },
        { date: "2000-2007", text: "Studium der Humanmedizin, Medizinische Universität Graz. Promotion mit Dissertation: \"Das kindliche Schädel-Hirn-Trauma unter besonderer Berücksichtigung des Screenings mit S-100B\" Gesamtnote: Sehr gut" },
        { date: "2000", text: "Matura, Kollegium Aloisianum Linz" }
      ]
    },
    {
      title: "Berufliche Laufbahn",
      icon: <Briefcase className="text-[#8B2323]" size={24} />,
      items: [
        { date: "seit 2023", text: "Gesellschafter der Röntgen am Kai OG (Nachfolger von Dr. Günter Porsch)" },
        { date: "2022-2023", text: "Primararzt der Institute für Radiologie im Krankenhaus der Elisabethinen Graz und Marienkrankenhaus Vorau" },
        { date: "2021-2022", text: "Primararzt des Instituts für Radiologie im Marienkrankenhaus Vorau" },
        { date: "2015-2021", text: "Wahlarztordination für Radiologie mit Spezialisierung auf Gefäßtherapie" },
        { date: "2014-2019", text: "Oberarzt an der Univ.-Klinik für Radiologie Graz, Abt. für Vaskuläre und Interventionelle Radiologie" }
      ]
    }
  ];

  const expertises = [
    "Interventionelle Radiologie (lokale Tumortherapie: RF, SIRT, TACE)",
    "Endovaskuläre Aortenprothesenimplantation (EVAR/TEVAR)",
    "Becken-Bein-Angiographie & Rekanalisation",
    "Therapie venöser Malformationen",
    "Computertomographie & Interventionelle CT",
    "Magnetresonanztomographie (Neuro, Cardio, Ortho)",
    "Farbcodierte Duplexsonographie der Gefäße",
    "Minimal Invasive perkutane aortale, arterielle und venöse Therapie"
  ];

  const publications = [
    "Tschauner S, Kalmar P, et al. (2015). European Guidelines for AP/PA chest X-rays: routinely satisfiable in a paediatric radiology division? Eur. Radiol",
    "Hatzl, S; Kalmar, P; et al. (2021). Prognostic Value of Baseline and Interim PET Markers in DLBCL. Hemasphere.",
    "Mahmud, E; Kalmar, P; et al. (2020). Robotic Peripheral Vascular Intervention. J Invasive Cardiol.",
    "Belyavskaya, T; Kalmar, P; et al. (2019). Aortic Stenting in Symptomatic Infrarenal Aortic Stenosis. Vasc Endovasc Surg.",
    "Weir, P; Kalmar, P; et al. (2018). Go-Smart: Open-Ended, Web-Based Modelling of Minimally Invasive Cancer Treatments. Plos One.",
    "Kalmar, P; et al. (2016). Gadolinium-free MR in coarctation. Clinical Imaging.",
    "Kalmar, P; et al. (2015). Is Embolization an Effective Treatment for Recurrent Hemorrhage After Arthroplasty? CORR.",
    "Kalmar, P; et al. (2014). Placement of hemoparin-coated stents in the iliac arteries. Eur J Radiol."
  ];

  const diplomas = [
    "Gültiges DFP Diplom",
    "ÖÄK Zertifikat Mammadiagnostik",
    "ÖÄK Zertifikat Angiologische Basisdiagnostik",
    "ÖÄK Zertifikat Sonographie Arterien",
    "ÖÄK Zertifikat Sonographie Venen",
    "ÖÄK Zertifikat Sonographie Hirnversorgende Arterien",
    "ÖÄK Zertifikat Sonographie SmallParts"
  ];

  return (
    <div className="pt-32 pb-24 bg-transparent min-h-screen relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[60px]"
          style={{ willChange: 'transform' }}
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-blue-50/20 rounded-full blur-[60px]"
          style={{ willChange: 'transform' }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-12">
          <Link to="/" className="hover:text-[#8B2323] transition-colors">Startseite</Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#8B2323] font-bold">Peter Kalmar</span>
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
                src="/assets/images/hero-slide-2.avif" 
                alt="Prim. a. D. Priv. Doz. Dr. Peter Kalmar" 
                className="w-full h-full object-cover object-[20%_center] rounded-[40px] grayscale hover:grayscale-0 transition-all duration-700"
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
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 font-[Outfit] leading-tight">
              Prim. a. D. Priv. Doz. Dr. med. univ. <br/>
              Peter <span className="text-[#8B2323]">Kalmar</span>, MHBA
            </h1>
            <p className="text-2xl text-gray-700 mb-8 font-light italic">
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
          <h2 className="text-2xl font-black text-gray-900 mb-6 font-[Outfit]">Medizinische Philosophie</h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
            "Innovative High-End-Radiologie mit Wertschätzung. Mein Ziel: Diagnostische Sicherheit durch modernste Technik, vermittelt mit Ruhe und Respekt."
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
                <h3 className="text-xl font-bold font-[Outfit]">{section.title}</h3>
              </div>
              <div className="space-y-6 flex-grow">
                {section.items.map((item, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-red-100 last:border-0 pb-1">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#8B2323]" />
                    <p className="text-xs font-bold text-[#8B2323] uppercase tracking-wider mb-1">{item.date}</p>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">{item.text}</p>
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
              <h3 className="text-xl font-bold font-[Outfit]">Akademische Schwerpunkte</h3>
            </div>
            <div className="space-y-3">
              {expertises.map((exp, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#8B2323] mt-1 shrink-0" />
                  <span className="text-sm font-medium text-gray-800 leading-relaxed">{exp}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* DFP Diplomas Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-3 glass p-8 rounded-[40px] flex flex-col cursor-default"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <Award className="text-[#8B2323]" size={24} />
              </div>
              <h3 className="text-xl font-bold font-[Outfit]">Fortbildungsdiplome und Zertifikate</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diplomas.map((diploma, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 border border-white/60">
                  <CheckCircle2 size={18} className="text-[#8B2323] shrink-0" />
                  <span className="text-sm font-bold text-gray-800">{diploma}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Publications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-[48px]"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
              <BookOpen className="text-[#8B2323]" size={28} />
            </div>
            <h2 className="text-3xl font-black font-[Outfit]">Ausgewählte Publikationen</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {publications.map((pub, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/50 border border-white/60 hover:bg-white/80 transition-all group">
                <p className="text-gray-800 leading-relaxed font-medium">
                  {pub}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm italic">Zahlreiche internationale Kongressbeiträge und Publikationen in internationalen Fachzeitschriften.</p>
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

export default KalmarPage;
