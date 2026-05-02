import React from 'react';
import { ShieldCheck } from 'lucide-react';

const ImpressumPage = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-950">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="inline-flex items-center gap-2 bg-red-50 text-[#8B2323] px-4 py-2 rounded-full text-sm font-bold mb-8">
          <ShieldCheck size={18} />
          <span>Rechtliche Informationen</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1f2937] mb-12 font-[Outfit]">
          Impressum
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Offenlegung gemäß § 25 Mediengesetz</h2>
            <p>
              <strong>Vollständiger Firmenname:</strong><br />
              Röntgen am Kai - Priv. Doz. Kalmar & Priv. Doz. Dr. Riegler Fachärzte für Radiologie OG
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sitz der Gesellschaft</h2>
            <p>
              Körösistraße 9<br />
              8010 Graz<br />
              Österreich
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kontakt</h2>
            <p>
              Telefon: <a href="tel:+433168409050" className="text-[#8B2323] hover:underline font-medium">+43 316 8409050</a><br />
              Fax: +43 316 8409052<br />
              E-Mail: <a href="mailto:office@roentgen-am-kai.at" className="text-[#8B2323] hover:underline font-medium">office@roentgen-am-kai.at</a>
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Geschäftsführer</h2>
            <p className="text-xl text-[#8B2323] font-bold">
              Dr. Georg Riegler und Dr. Peter Kalmar
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Gesetzliche Berufsbezeichnung</h3>
              <p>Facharzt für Radiologie (verliehen in Österreich)</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Zugehörige Kammer</h3>
              <p>Ärztekammer für Steiermark</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Firmenbuchnummer</h3>
              <p>FN 544837 w</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">UID-Nummer</h3>
              <p>ATU76189537</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Haftung für Inhalte</h2>
            <p>
              Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Online-Streitbeilegung</h2>
            <p>
              Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der EU zu richten: <a href="http://ec.europa.eu/odr" className="text-[#8B2323] hover:underline" target="_blank" rel="noopener noreferrer">http://ec.europa.eu/odr</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;
