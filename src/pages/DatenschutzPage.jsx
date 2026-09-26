import React from 'react';
import { Lock } from 'lucide-react';
import { COMPANY_NAME } from '../data/company';

const H2 = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{children}</h2>
);

const DatenschutzPage = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-950">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-8">
          <Lock size={18} />
          <span>Privatsphäre & Sicherheit</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1f2937] dark:text-white mb-12 font-[Outfit]">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-8">
          <section>
            <H2>Verantwortlicher</H2>
            <p>
              <strong>{COMPANY_NAME}</strong><br />
              Körösistraße 9, 8010 Graz, Österreich<br />
              E-Mail: <a href="mailto:office@roentgen-am-kai.at" className="text-[#8B2323] hover:underline font-medium">office@roentgen-am-kai.at</a><br />
              Telefon: <a href="tel:+433168409050" className="text-[#8B2323] hover:underline font-medium">0316 840 90 50</a>
            </p>
          </section>

          <section>
            <H2>Das Wichtigste in Kürze</H2>
            <p>
              Diese Website verwendet keine Cookies, kein Tracking und keine Analyse-Werkzeuge. Beim Aufruf
              werden keine Inhalte von Drittanbietern geladen – auch die Schriften liegen auf unserem eigenen Server.
            </p>
          </section>

          <section>
            <H2>Hosting</H2>
            <p>
              Die Website wird über GitHub Pages bereitgestellt (GitHub, Inc., 88 Colin P. Kelly Jr. Street,
              San Francisco, CA 94107, USA). Beim Aufruf verarbeitet GitHub technisch notwendige Daten in
              Server-Protokollen (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp), um die Website
              auszuliefern und abzusichern. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und
              stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). GitHub ist nach dem EU-US Data Privacy Framework
              zertifiziert; damit besteht ein angemessenes Datenschutzniveau (Art. 45 DSGVO).
            </p>
          </section>

          <section>
            <H2>Speicherung in Ihrem Browser</H2>
            <p>
              Ihre Wahl zwischen hellem und dunklem Design wird im lokalen Speicher Ihres Browsers abgelegt
              (Eintrag „theme“). Dieser Eintrag bleibt auf Ihrem Gerät, wird nicht an uns übertragen und kann
              jederzeit über die Browser-Einstellungen gelöscht werden.
            </p>
          </section>

          <section>
            <H2>Links zu anderen Websites</H2>
            <p>
              Unsere Seite enthält Links, etwa zu Google Maps (Anfahrt), zum Patientenportal portal.marc.at oder
              zu Informationsseiten Dritter. Diese Dienste werden erst geladen, wenn Sie den Link anklicken; ab dann
              gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>
          </section>

          <section>
            <H2>Kontakt per E-Mail oder Telefon</H2>
            <p>
              Wenn Sie uns kontaktieren, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu bearbeiten. Betrifft Ihre
              Anfrage eine Untersuchung oder Behandlung, bewahren wir sie im Rahmen der ärztlichen
              Dokumentationspflicht auf. Wir geben Ihre Daten nicht ohne Ihre Einwilligung weiter, außer eine
              gesetzliche Verpflichtung besteht.
            </p>
          </section>

          <section>
            <H2>Ihre Rechte</H2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit und Widerspruch. Wenn Sie der Meinung sind, dass die Verarbeitung Ihrer Daten
              gegen das Datenschutzrecht verstößt, können Sie sich bei der Aufsichtsbehörde beschweren:
              Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Wien,{' '}
              <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#8B2323] hover:underline font-medium">www.dsb.gv.at</a>.
            </p>
          </section>

          <p className="text-sm text-gray-500 dark:text-gray-400">Stand: September 2026</p>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzPage;
