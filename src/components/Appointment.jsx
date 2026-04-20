import React, { useState } from 'react';
import { Calendar, User, ClipboardList, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthDatePicker from './BirthDatePicker';

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    insurance: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    svnr: '',
    birthDate: '',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setSubmitError("Bitte geben Sie sowohl Ihren Vor- als auch Ihren Nachnamen an.");
      return;
    }

    if (formData.email && (!formData.email.includes('@') || !formData.email.includes('.'))) {
      setSubmitError("Bitte geben Sie eine gültige E-Mail-Adresse an.");
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if it's a weekend (0 = Sunday, 6 = Saturday)
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setSubmitError("Wochenend-Termine sind leider nicht möglich. Bitte wählen Sie einen Werktag (Mo-Fr).");
      return;
    }
    
    if (selectedDate < today) {
      setSubmitError("Bitte wählen Sie ein Datum in der Gegenwart oder Zukunft.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Google Apps Script Integration (Unlimited & Free)
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbznb2GPULIdd_xAYLLUAdahnN1eie-GHx_C6m-skRy6eXTg4w5UyUEFjSjfeln-KiQBHQ/exec";
    
    // Metadata fields for Google Sheet/Email notification
    const fullName = `${formData.firstName} ${formData.lastName}`;
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'text/plain' // Keep text/plain for CORS bypass
        },
        body: JSON.stringify({
          ...formData,
          name: fullName // Keep 'name' as a combined field for a cleaner sheet if needed, or split below
        })
      });

      // Google Scripts sometimes return opaque responses due to redirects
      // We check if the request was at least sent
      if (response.ok || response.type === 'opaque') {
        nextStep();
      } else {
        const errorText = await response.text();
        setSubmitError(`Google Server Fehler: ${response.status}. ${errorText.substring(0, 50)}`);
      }
    } catch (error) {
      setSubmitError(`Übertragungsfehler: ${error.message}. Bitte stellen Sie sicher, dass Sie den Google-Script-Zugriff für 'Jeder' (Anyone) erlaubt haben.`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Sparen Sie Zeit und senden Sie uns Ihre Terminanfrage bequem von zu Hause oder unterwegs. Wir rufen Sie umgehend zur Terminbestätigung zurück.
            </p>
            
            <ul className="space-y-6">
              {[
                'Alle Kassen & Privatleistungen',
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
                <p className="text-sm text-gray-700">Ihre Daten werden verschlüsselt übertragen.</p>
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
                      {['Röntgen', 'Ultraschall', 'Mammographie', 'DVT / Zahnröntgen', 'Knochendichte / Fettmessung', 'Sonstige Anfrage'].map((svc) => (
                        <button 
                          key={svc}
                          type="button"
                          onClick={() => setFormData({...formData, service: svc})}
                          aria-pressed={formData.service === svc}
                          className={`p-6 rounded-2xl border-2 text-left transition-all ${
                            formData.service === svc 
                            ? 'border-[#8B2323] bg-red-50 shadow-md' 
                            : 'border-gray-100 hover:border-red-200'
                          }`}
                        >
                          <span className={`font-bold ${formData.service === svc ? 'text-[#8B2323]' : 'text-gray-900'}`}>
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
                    <form 
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="sr-only">Vorname*</label>
                          <input 
                            id="firstName"
                            name="firstName"
                            type="text" 
                            placeholder="Vorname*" 
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full h-[58px] px-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none placeholder:text-gray-500 text-gray-950"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="sr-only">Nachname*</label>
                          <input 
                            id="lastName"
                            name="lastName"
                            type="text" 
                            placeholder="Nachname*" 
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full h-[58px] px-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none placeholder:text-gray-500 text-gray-950"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        <BirthDatePicker 
                          value={formData.birthDate} 
                          onChange={(val) => setFormData({...formData, birthDate: val})} 
                        />
                        <div>
                          <label htmlFor="svnr" className="sr-only">SVNr. (erste 4 Ziffern)*</label>
                          <input 
                            id="svnr"
                            name="svnr"
                            type="text" 
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="4"
                            placeholder="SVNr. (erste 4 Ziffern)*" 
                            required
                            value={formData.svnr}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val.length <= 4) {
                                setFormData({...formData, svnr: val});
                              }
                            }}
                            className="w-full h-[58px] px-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none placeholder:text-gray-500 text-gray-950"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        <div>
                          <label htmlFor="phone" className="sr-only">Telefonnummer*</label>
                            <input 
                              id="phone"
                              name="phone"
                              type="tel" 
                              placeholder="Telefonnummer*" 
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^0-9+]/g, '')})}
                              className="w-full h-[58px] px-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none placeholder:text-gray-500 text-gray-950"
                            />
                        </div>
                        <div>
                          <label htmlFor="email" className="sr-only">E-Mail Adresse</label>
                          <input 
                            id="email"
                            name="email"
                            type="email" 
                            placeholder="E-Mail Adresse" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-[58px] px-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none placeholder:text-gray-500 text-gray-950"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        <div>
                          <label htmlFor="insurance" className="sr-only">Kasse wählen*</label>
                          <select 
                            id="insurance" 
                            name="insurance"
                            required
                            value={formData.insurance}
                            onChange={(e) => setFormData({...formData, insurance: e.target.value})}
                            className="w-full h-[58px] px-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none bg-white text-gray-950"
                          >
                            <option value="">Kasse wählen*</option>
                            <option>ÖGK</option>
                            <option>SVS</option>
                            <option>BVAEB</option>
                            <option>KFA</option>
                            <option>Privat</option>
                          </select>
                        </div>
                        <div className="relative">
                          <label htmlFor="date" className="sr-only">Wunschdatum</label>
                          <input 
                            id="date" 
                            name="date"
                            type="date" 
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={(e) => {
                              const dateVal = e.target.value;
                              if (dateVal) {
                                const day = new Date(dateVal).getDay();
                                if (day === 0 || day === 6) {
                                  setSubmitError("Bitte wählen Sie einen Werktag (Mo-Fr). Samstage und Sonntage sind nicht möglich.");
                                  setFormData({...formData, date: ''});
                                  return;
                                }
                              }
                              setSubmitError(null);
                              setFormData({...formData, date: dateVal});
                            }}
                            className={`w-full h-[58px] px-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none transition-all ${!formData.date ? 'text-transparent' : 'text-gray-950'}`} 
                          />
                          {!formData.date && (
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                              Wunschdatum
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="comments" className="sr-only">Infos oder Kommentare</label>
                        <textarea 
                          id="comments"
                          name="comments"
                          placeholder="Infos oder Kommentare (z.B. bevorzugte Tageszeit, Beschwerden)" 
                          value={formData.comments}
                          onChange={(e) => setFormData({...formData, comments: e.target.value})}
                          className="w-full h-32 p-4 rounded-xl border border-gray-300 focus:border-[#8B2323] outline-none placeholder:text-gray-500 text-gray-950 resize-none"
                        />
                      </div>

                      {submitError && (
                        <p className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100 italic">
                          {submitError}
                        </p>
                      )}

                      <div className="flex gap-4">
                        <button type="button" onClick={prevStep} className="flex-1 py-4 border-2 border-gray-200 rounded-2xl font-bold">Zurück</button>
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="flex-[2] bg-[#8B2323] text-white py-4 rounded-2xl font-bold disabled:bg-gray-400 transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? 'Sende Anfrage...' : 'Anfrage senden'}
                        </button>
                      </div>
                    </form>
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
                      Ihre Terminanfrage wurde erfolgreich übermittelt. Wir rufen Sie umgehend zur Terminbestätigung unter der angegebenen Nummer zurück.
                    </p>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-[#8B2323] font-bold underline"
                    >
                      Weitere Terminanfrage
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
