import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME } from '../data/company';
import { PHONE_HREF, PHONE_DISPLAY, EMAIL, ONLINE_TERMIN_URL } from '../data/practice';

const H2 = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{children}</h2>
);

const DatenschutzPage = () => {
  return (
    <div className="pt-10 sm:pt-14 pb-24 bg-white dark:bg-slate-950">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-8">
          <Lock size={18} />
          <span>Privatsphäre & Sicherheit</span>
        </div>

        <h1 id="page-title" className="mb-10 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-8">
          <section>
            <H2>Verantwortlicher</H2>
            <p>
              <strong>{COMPANY_NAME}</strong><br />
              Körösistraße 9, 8010 Graz, Österreich<br />
              E-Mail: <a href={`mailto:${EMAIL}`} className="text-[#8B2323] hover:underline font-medium">{EMAIL}</a><br />
              Telefon: <a href={PHONE_HREF} className="text-[#8B2323] hover:underline font-medium">{PHONE_DISPLAY}</a>
            </p>
          </section>

          <section>
            <H2>Das Wichtigste in Kürze</H2>
            <p>
              Diese Website verwendet keine Cookies, kein Tracking und keine Analyse-Werkzeuge. Beim Aufruf
              werden keine Inhalte von Drittanbietern geladen – auch die Schriften werden vom selben Server wie die Website ausgeliefert.
              Die Online-Terminbuchung läuft auf einem eigenen Server der Ordination; was dort verarbeitet wird, steht
              unten unter „Online-Terminbuchung“.
            </p>
          </section>

          <section>
            <H2>Hosting</H2>
            <p>
              Die Website wird über GitHub Pages bereitgestellt (GitHub, Inc., 88 Colin P. Kelly Jr. Street,
              San Francisco, CA 94107, USA). Beim Aufruf verarbeitet GitHub technisch notwendige Daten in
              Server-Protokollen (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp), um die Website
              auszuliefern und abzusichern. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und
              stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Laut GitHub werden diese Protokolle nur so lange aufbewahrt, wie es für Betrieb und Sicherheit erforderlich ist; auf die Protokolle selbst haben wir keinen Zugriff. GitHub ist nach dem EU-US Data Privacy Framework
              zertifiziert; damit besteht ein angemessenes Datenschutzniveau (Art. 45 DSGVO).
            </p>
          </section>

          <section>
            <H2>Speicherung in Ihrem Browser</H2>
            <p>
              Nur wenn Sie selbst zwischen hellem und dunklem Design umschalten, wird Ihre Wahl im lokalen Speicher
              Ihres Browsers abgelegt (Eintrag „theme“), damit sie beim nächsten Besuch erhalten bleibt. Ohne diesen
              Klick wird nichts gespeichert. Der Eintrag bleibt auf Ihrem Gerät, wird nicht an uns übertragen und kann
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
              Wenn Sie uns kontaktieren, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu bearbeiten
              (Art. 6 Abs. 1 lit. b DSGVO – Anbahnung bzw. Durchführung des Behandlungsvertrags; bei
              Gesundheitsdaten Art. 9 Abs. 2 lit. h DSGVO). Allgemeine Anfragen löschen wir, sobald sie erledigt
              sind und keine Rückfragen mehr zu erwarten sind. Betrifft Ihre Anfrage eine Untersuchung oder
              Behandlung, wird sie Teil der ärztlichen Dokumentation und 10 Jahre aufbewahrt
              (§ 51 ÄrzteG 1998, Art. 6 Abs. 1 lit. c DSGVO). Wir geben Ihre Daten nicht ohne Ihre Einwilligung weiter, außer eine
              gesetzliche Verpflichtung besteht.
            </p>
          </section>

          <section id="online-terminbuchung">
            <H2>Online-Terminbuchung</H2>
            <p>
              Für das Mammographie-Screening und die DEXA-Messung können Sie online einen Termin buchen
              (<a href={ONLINE_TERMIN_URL} target="_blank" rel="noopener noreferrer" className="text-[#8B2323] hover:underline font-medium">termin.roentgen-am-kai.at<span className="sr-only"> (öffnet in neuem Fenster)</span></a>).
              Dabei verarbeiten wir Vorname, Nachname und Geburtsdatum (damit wir Sie eindeutig zuordnen können),
              Handynummer und E-Mail-Adresse (für die Terminbestätigung, Rückfragen und die Erinnerung), freiwillig
              Ihre Sozialversicherungsnummer (sie erleichtert Anmeldung und Abrechnung), die gewählte Untersuchung,
              den Termin und bei der DEXA-Messung die Abrechnungsart. Die gewählte Untersuchung ist eine
              Gesundheitsangabe; ein Freitextfeld für Beschwerden gibt es bewusst nicht.
            </p>
            <p className="mt-4">
              Wir verwenden die Daten, um Ihren Termin zu vergeben, vorzubereiten und zu bestätigen (Art. 6 Abs. 1
              lit. b DSGVO, für Gesundheitsdaten Art. 9 Abs. 2 lit. h DSGVO – wir unterliegen der ärztlichen
              Verschwiegenheitspflicht). Zum Schutz vor Missbrauch der Buchung verarbeiten wir Ihre IP-Adresse kurz im
              Arbeitsspeicher, ohne sie zu speichern (Art. 6 Abs. 1 lit. f DSGVO). Die Buchungsseite setzt nur
              technisch notwendige Cookies (Schutz der Formulare, im Bereich der Ordination ein Anmelde-Cookie), es gibt
              keine Analyse-Werkzeuge und keine Inhalte fremder Server. Die Daten der Online-Buchung löschen wir
              automatisch 90 Tage nach dem Termin, auch bei abgesagten Terminen; Sicherungskopien werden nach 14 Tagen
              überschrieben. Übernehmen wir den Termin in unser Ordinationssystem, gilt dort die gesetzliche
              Aufbewahrungspflicht für die ärztliche Dokumentation (10 Jahre, § 51 ÄrzteG 1998).
            </p>
          </section>

          <section id="terminerinnerung">
            <H2>Erinnerung an Ihren Termin per SMS und E-Mail</H2>
            <p>
              Haben Sie bei uns einen Termin, erinnern wir Sie zwei Werktage vorher an Tag und Uhrzeit – per SMS,
              wenn eine Handynummer bei uns gespeichert ist, und per E-Mail, wenn eine E-Mail-Adresse gespeichert ist.
              Die Erinnerung enthält keine Angaben zur Untersuchung. Sie können den Termin mit der Antwort „ABSAGE“
              (auf die SMS oder die E-Mail) oder über den Link in der Erinnerung absagen und mit „STOP“ jede weitere
              Erinnerung abbestellen – oder uns das jederzeit telefonisch sagen. Rechtsgrundlage ist die Durchführung
              Ihrer Behandlung (Art. 6 Abs. 1 lit. b und Art. 9 Abs. 2 lit. h DSGVO). Die Daten zur Erinnerung löschen
              wir spätestens 30 Tage nach dem Termin.
            </p>
          </section>

          <section id="dienstleister">
            <H2>Dienstleister für Online-Buchung und Erinnerung</H2>
            <p>
              Diese Dienstleister verarbeiten Daten ausschließlich in unserem Auftrag und nach unseren Weisungen
              (Auftragsverarbeitung nach Art. 28 DSGVO); eine Übermittlung in Länder außerhalb der EU findet nicht statt:
            </p>
            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>Server der Online-Buchung: netcup GmbH, Emmy-Noether-Straße 10, 76131 Karlsruhe, Deutschland – der Server steht im Rechenzentrum in Wien, Österreich. Für den Absage-Link speichert er nur einen Prüfwert des Links, Tag und Uhrzeit, keinen Namen.</li>
              <li>SMS-Versand: Missus GmbH (firmensms.at), Ulrichsweg 53/2, 8045 Graz, Österreich – Verarbeitung in der EU (Frankfurt). Sie erhält nur Ihre Handynummer und den Text der SMS, speichert den Text nicht und kürzt die Nummer sofort um die letzten drei Ziffern.</li>
              <li>E-Mail: über das Postfach der Ordination bei HEROLD Business Data GmbH, Canettistraße 5, 1100 Wien (Rechenzentrum: dogado GmbH, Dortmund, Deutschland).</li>
            </ul>
          </section>

          <section>
            <H2>Auswertung von Röntgenbildern mit KI-Software</H2>
            <p>
              Zur Auswertung von Röntgenbildern setzen wir KI-Software ein, die ausschließlich lokal in der Praxis läuft.
              Die Bilder werden dafür nicht an die Hersteller der Software oder an andere Dritte übertragen. Mehr dazu
              in unserem Ratgeber{' '}
              <Link to="/ratgeber/kuenstliche-intelligenz-radiologie" className="text-[#8B2323] hover:underline font-medium">Künstliche Intelligenz in der Radiologie</Link>.
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

          <p className="text-sm text-gray-500 dark:text-gray-400">Stand: Oktober 2026</p>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzPage;
