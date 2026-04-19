import React, { useState } from 'react';
import { Calendar, User, ClipboardList, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    insurance: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const steps = [
    { title: 'Leistung wählen', icon: <ClipboardList size={20} /> },
    { title: 'Termin & Daten', icon: <User size={20} /> },
    { title: 'Bestätigung', icon: <CheckCircle2 size={20} /> }
  ];

  return (
    <section id="booking" className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          
          {/* Left Side: Info */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] mb-8 font-[Outfit]">
              Termin <span className="text-[#8B2323]">Online</span> vereinbaren
            </h2>
            <p className="text-lg text-gray-800 mb-10 leading-relaxed font-medium">
              Sparen Sie Zeit und buchen Sie Ihren Untersuchungstermin bequem von zu Hause oder unterwegs. Unser System ist direkt mit unserem Praxismanagement (CAS) verbunden.
            </p>
            
            <ul className="space-y-6">
              {[
                'Alle Kassen & Privatleistungen',
                'Echtzeit-Terminverfügbarkeit',
                'Automatisierte Terminerinnerung',
                'Sichere Datenübertragung'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-950 font-semibold">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12 p-6 glass rounded-3xl flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 text-[#8B2323] rounded-2xl flex items-center justify-center shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-950">DSGVO Konform</p>
                <p className="text-sm text-gray-700">Ihre Daten werden verschlüsselt an unser CAS-System übertragen.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-[40px] shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Progress Bar */}
              <div className="flex justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10" />
                {steps.map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step >= i + 1 ? 'bg-[#8B2323] text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {s.icon}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      step >= i + 1 ? 'text-[#8B2323]' : 'text-gray-400'
                    }`}>{s.title}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold mb-6">Wählen Sie die gewünschte Untersuchung</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Röntgen', 'Ultraschall', 'Mammographie', 'DVT', 'Knochendichte', 'Körperfettmessung', 'Phlebographie'].map((svc) => (
                        <button 
                          key={svc}
                          onClick={() => setFormData({...formData, service: svc})}
                          className={`p-6 rounded-2xl border-2 text-left transition-all ${
                            formData.service === svc 
                            ? 'border-[#8B2323] bg-red-50 shadow-md' 
                            : 'border-gray-100 hover:border-red-200'
                          }`}
                        >
                          <span className={`font-bold ${formData.service === svc ? 'text-[#8B2323]' : 'text-gray-700'}`}>
                            {svc}
                          </span>
                        </button>
                      ))}
                    </div>
                    <button 
                      disabled={!formData.service}
                      onClick={nextStep}
                      className="w-full bg-[#8B2323] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:bg-gray-200"
                    >
                      Weiter
                      <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold mb-6">Persönliche Daten & Termin</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <input 
                        type="text" 
                        placeholder="Vollständiger Name" 
                        className="p-4 rounded-xl border border-gray-200 focus:border-[#8B2323] outline-none"
                      />
                      <input 
                        type="email" 
                        placeholder="E-Mail Adresse" 
                        className="p-4 rounded-xl border border-gray-200 focus:border-[#8B2323] outline-none"
                      />
                      <input 
                        type="tel" 
                        placeholder="Telefonnummer" 
                        className="p-4 rounded-xl border border-gray-200 focus:border-[#8B2323] outline-none"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <select className="p-4 rounded-xl border border-gray-200 focus:border-[#8B2323] outline-none bg-white">
                          <option>Kasse wählen</option>
                          <option>ÖGK</option>
                          <option>SVS</option>
                          <option>BVAEB</option>
                          <option>Privat</option>
                        </select>
                        <input type="date" className="p-4 rounded-xl border border-gray-200 focus:border-[#8B2323] outline-none" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={prevStep} className="flex-1 py-4 border-2 border-gray-200 rounded-2xl font-bold">Zurück</button>
                      <button onClick={nextStep} className="flex-[2] bg-[#8B2323] text-white py-4 rounded-2xl font-bold">Anfrage senden</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-950 mb-4">Vielen Dank!</h3>
                    <p className="text-gray-900 mb-8 max-w-sm mx-auto font-medium">
                      Ihre Terminanfrage wurde an unser Team sowie das CAS-System übermittelt. Wir senden Ihnen in Kürze eine Bestätigung.
                    </p>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-[#8B2323] font-bold underline"
                    >
                      Weiteren Termin buchen
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
