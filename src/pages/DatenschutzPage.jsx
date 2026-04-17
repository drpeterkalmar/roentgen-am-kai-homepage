import React from 'react';
import { Lock } from 'lucide-react';

const DatenschutzPage = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8">
          <Lock size={18} />
          <span>Privatsphäre & Sicherheit</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1f2937] mb-12 font-[Outfit]">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Einleitung</h2>
            <p>
              Diese Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Sie richten keinen Schaden an. Wir nutzen Cookies dazu, unser Angebot nutzerfreundlich zu gestalten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verantwortlicher</h2>
            <p>
              Verantwortlicher für die Datenverarbeitung auf dieser Website ist:<br />
              <strong>Röntgen am Kai - Priv. Doz. Kalmar & Priv. Doz. Dr. Riegler Fachärzte für Radiologie OG</strong><br />
              Körösistraße 9, 8010 Graz, Österreich
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ihre Rechte</h2>
            <p>
              Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. In Österreich ist dies die Datenschutzbehörde.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Datenspeicherung bei Kontakt</h2>
            <p>
              Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen sechs Monate bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Web-Analyse und Google Analytics</h2>
            <p>
              Unsere Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Wir haben mit dem Anbieter einen entsprechenden Vertrag zur Auftragsdatenverarbeitung abgeschlossen.
            </p>
            <p>
              Ihre IP-Adresse wird erfasst, aber umgehend (z.B. durch Löschung der letzten 8 Bit) pseudonymisiert. Dadurch ist nur mehr eine grobe Lokalisierung möglich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p>
              Unsere Website verwendet so genannte Cookies. Dies sind kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Sie richten keinen Schaden an. Wir nutzen Cookies dazu, unser Angebot nutzerfreundlich zu gestalten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzPage;
