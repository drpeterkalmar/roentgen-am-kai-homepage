import { ShieldCheck, Github } from 'lucide-react';
import { COMPANY_NAME, FN, FB_GERICHT, UID, RECHTSFORM, SITZ, GEGENSTAND } from '../data/company';
import { PHONE_HREF, PHONE_DISPLAY_INTL, FAX_DISPLAY, EMAIL } from '../data/practice';

const ImpressumPage = () => {
  return (
    <div className="pt-10 sm:pt-14 pb-24 bg-white dark:bg-slate-950">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/30 text-[#8B2323] px-4 py-2 rounded-full text-sm font-bold mb-8">
          <ShieldCheck size={18} />
          <span>Rechtliche Informationen</span>
        </div>
        
        <h1 id="page-title" className="mb-10 font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          Impressum
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Offenlegung gemäß § 25 Mediengesetz</h2>
            <p>
              <strong>Vollständiger Firmenname:</strong><br />
              {COMPANY_NAME}
            </p>
            <p>
              <strong>Rechtsform:</strong> {RECHTSFORM}, Sitz: {SITZ}<br />
              <strong>Unternehmensgegenstand:</strong> {GEGENSTAND}<br />
              <strong>Grundlegende Richtung der Website:</strong> Information über das radiologische Leistungsangebot
              der Praxis sowie allgemeine Gesundheitsinformation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sitz der Gesellschaft</h2>
            <p>
              Körösistraße 9<br />
              8010 Graz<br />
              Österreich
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kontakt</h2>
            <p>
              Telefon: <a href={PHONE_HREF} className="text-[#8B2323] hover:underline font-medium">{PHONE_DISPLAY_INTL}</a><br />
              Fax: {FAX_DISPLAY}<br />
              E-Mail: <a href={`mailto:${EMAIL}`} className="text-[#8B2323] hover:underline font-medium">{EMAIL}</a>
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Unbeschränkt haftende Gesellschafter</h2>
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
              <p>FN {FN}, {FB_GERICHT}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">UID-Nummer</h3>
              <p>{UID}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Aufsichtsbehörde</h3>
              <p>Ärztekammer für Steiermark; Magistrat Graz als Bezirksverwaltungsbehörde (§ 56 ÄrzteG 1998)</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Berufsrechtliche Vorschriften</h3>
              <p>
                Ärztegesetz 1998 (ÄrzteG), abrufbar unter{' '}
                <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#8B2323] hover:underline font-medium">www.ris.bka.gv.at</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Offener Quellcode</h2>
            <p>
              Der vollständige Quellcode dieser Website ist öffentlich auf GitHub verfügbar und
              kann dort jederzeit eingesehen werden. Wir setzen auf bewährte, frei verfügbare
              Standards – ohne geschlossene Baukasten-Systeme und ohne Tracking.
            </p>
            <p className="mt-3">
              <a
                href="https://github.com/drpeterkalmar/roentgen-am-kai-homepage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#8B2323] hover:underline font-medium"
              >
                <Github size={18} />
                github.com/drpeterkalmar/roentgen-am-kai-homepage
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Haftung für Inhalte</h2>
            <p>
              Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;
