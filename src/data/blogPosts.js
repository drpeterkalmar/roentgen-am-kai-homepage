// Artikeltexte des Ratgebers (HTML). Metadaten (URL, SEO-Titel, Kategorie, Datum, Zielseite, Autor):
// src/data/ratgeber.js – Titel/Kurzfassung dort identisch halten (Test prüft).
// `category`/`date` hier sind Altbestand; maßgeblich sind die Werte in ratgeber.js.
import { SARKOPENIE_TITLE, SARKOPENIE_EXCERPT, SARKOPENIE_HTML } from './ratgeber/sarkopenie.js';

export const blogPosts = [
  {
    id: 1,
    title: 'Knochendichtemessung (DEXA): Warum Vorsorge Leben schützt',
    date: '17. April 2026',
    category: 'Vorsorge',
    excerpt: 'Osteoporose verläuft lange ohne Symptome. Die DEXA-Messung ist die wissenschaftlich etablierte Standard- und Referenzmethode zur Messung der Knochendichte. Wann sie sinnvoll sein kann.',
    primaryLink: { to: '/knochendichtemessung-graz', label: 'Zur Knochendichtemessung in Graz' },
    content: `
      <p>Osteoporose verringert die Knochenmasse und verschlechtert die Knochenarchitektur. Die Knochen werden brüchiger, oft ohne Vorwarnung.</p>
      
      <h2>Die Standardmethode: DEXA-Messung</h2>
      <p>In unserer Praxis verwenden wir die DEXA-Methode (Dual-Energy X-ray Absorptiometry). Sie ist die wissenschaftlich etablierte Standard- und Referenzmethode zur Messung der Knochenmineraldichte. Die Untersuchung ist schmerzlos und arbeitet mit einer sehr geringen Röntgendosis – deutlich geringer als bei einer üblichen Röntgenaufnahme.</p>
      
      <h2>Wann ist eine Messung sinnvoll?</h2>
      <p>Nicht jede Person benötigt ab einem bestimmten Alter automatisch eine Knochendichtemessung. Ab dem 50. Lebensjahr ist aber eine persönliche Einschätzung des Osteoporoserisikos sinnvoll. Empfohlen wird die Messung etwa bei Frauen ab 65 und Männern ab 70 Jahren sowie früher bei Risikofaktoren wie einem Knochenbruch nach geringem Anlass, familiärer Belastung oder einer längeren Cortisontherapie.</p>
      
      <p>Das Ergebnis wird immer gemeinsam mit Ihren Risikofaktoren ärztlich beurteilt. Sprechen Sie mit Ihrer Ärztin oder Ihrem Arzt, ob eine DEXA-Messung für Sie sinnvoll ist. Mehr dazu auf unserer Seite zur Knochendichtemessung.</p>
    `,
    image: 'assets/images/portrait-riegler.avif',
    status: 'published'
  },
  {
    id: 2,
    title: 'KI-Unterstützung in unserer Praxis',
    date: '12. April 2026',
    category: 'Technologie',
    excerpt: 'Wie künstliche Intelligenz uns hilft, diagnostische Sicherheit zu erhöhen und kleinste Veränderungen früher zu erkennen.',
    content: `
      <p>In unserer Praxis am Kai setzen wir Softwarelösungen ein, die uns bei der Befundung unterstützen.</p>
      
      <h2>Der Radiologe und die KI</h2>
      <p>Die KI ersetzt nicht den Arzt. Sie ist ein "zweites Augenpaar", das Bilder in Sekundenschnelle auf Anomalien scannt. Besonders bei der Suche nach Lungenrundherden oder bei der Knochenstrukturanalyse hilft sie dem Radiologen.</p>
      
      <h2>Ihre Vorteile als Patient</h2>
      <p>Durch die computergestützte Analyse erreichen wir eine höhere diagnostische Sicherheit. Kleinste Veränderungen, die in frühen Stadien schwer erkennbar sind, werden markiert und vom Radiologen detailliert geprüft. Das führt zu einer schnelleren und präziseren Diagnose, der Basis für jede erfolgreiche Behandlung.</p>
    `,
    image: 'assets/images/roentgen.avif',
    status: 'published'
  },
  {
    id: 3,
    title: 'Mammascreening Österreich: Früherkennung rettet Leben',
    date: '05. April 2026',
    category: 'Frauengesundheit',
    excerpt: 'Das österreichische Brustkrebs-Früherkennungsprogramm bietet Frauen zwischen 45 und 74 Jahren kostenlose Vorsorge. Was Sie über den Ablauf wissen müssen.',
    primaryLink: { to: '/mammographie-graz', label: 'Zur Mammographie in Graz' },
    content: `
      <p>Brustkrebs ist die häufigste Krebserkrankung bei Frauen. Rechtzeitig erkannt sind die Heilungschancen heute exzellent. Das österreichische Brustkrebs-Früherkennungsprogramm "früh-erkennen" setzt hier an.</p>
      
      <h2>Zertifizierte Qualität in Graz</h2>
      <p>Als zertifizierter Standort erfüllen wir strengste Qualitätsrichtlinien. Jede Mammographie wird bei uns von zwei spezialisierten Radiologen unabhängig voneinander beurteilt (Doppelbefundung). Das garantiert ein Höchstmaß an Sicherheit.</p>
      
      <h2>Wer kann teilnehmen?</h2>
      <p>Frauen zwischen 45 und 74 Jahren werden alle zwei Jahre automatisch eingeladen. Mit der e-Card ist die Untersuchung kostenlos und ohne Überweisung möglich. Frauen ab 40 sowie ab 75 können sich aktiv zum Programm anmelden.</p>
      
      <p>Vorbereitung: Verwenden Sie am Tag der Untersuchung bitte kein Puder, Deo oder Lotion im Brustbereich, da dies das Bild stören könnte. Bringen Sie Voraufnahmen zum Vergleich mit.</p>
    `,
    image: 'assets/images/mammographie_v2.avif',
    status: 'published'
  },
  {
    id: 4,
    // Überarbeitet 27.09.2026 nach den Regeln der Gesundheitsziel-Seite „Abnehmspritze“:
    // keine Studienwerte als Erwartung, keine Präparat-/Markennamen, Magermasse ≠ Muskelmasse, Therapiehoheit ärztlich.
    title: 'Abnehmspritze und Muskelmasse: Was eine begleitende Körperanalyse zeigen kann',
    date: '20. Juni 2026',
    category: 'Vorsorge',
    excerpt: 'Unter einer Abnehmspritze sinkt vor allem die Fettmasse – doch auch Magermasse kann zurückgehen. Eine DEXA-Körperanalyse zu Beginn und im Verlauf macht sichtbar, wie sich Ihr Körper verändert.',
    primaryLink: { to: '/gesundheitsziele/abnehmspritze-koerperanalyse', label: 'Mehr zu Abnehmspritze und Körperanalyse' },
    content: `
      <p>Medikamente auf Basis von GLP-1 beziehungsweise GLP-1/GIP haben die Behandlung von Adipositas und Typ-2-Diabetes verändert. Bei entsprechender Indikation können sie eine deutliche Gewichtsreduktion unterstützen. Die Waage zeigt dabei, wie viele Kilogramm verloren wurden – aber nicht, woraus dieser Gewichtsverlust besteht.</p>

      <h2>Was Studien zur Körperzusammensetzung zeigen</h2>
      <p>In den großen Zulassungsstudien wurde die Körperzusammensetzung in Teilgruppen mit DEXA gemessen. Im Mittel nahm die Fettmasse stärker ab als die Magermasse. Gleichzeitig kann jedoch auch Magermasse zurückgehen. Wie viel davon auf einzelne Menschen zutrifft, lässt sich aus Studienmittelwerten nicht ableiten – es hängt unter anderem von Ausgangsgewicht, Alter, Ernährung, Bewegung und Tempo der Abnahme ab.</p>

      <h2>Magermasse ist nicht gleich Muskelmasse</h2>
      <p>Die „magere“ oder fettfreie Masse umfasst neben der Skelettmuskulatur auch Organe, Bindegewebe und Körperwasser. Sie ist deshalb ein Näherungswert für die Muskelmasse, keine direkte Messung. Muskelkraft wird bei einer DEXA-Messung nicht erfasst.</p>

      <h2>Warum der Erhalt der Muskulatur wichtig ist</h2>
      <p>Muskelkraft und Muskelmasse tragen zu Beweglichkeit, Stabilität und Selbstständigkeit bei – besonders im höheren Lebensalter. Ein fortschreitender Verlust von Muskelkraft und Muskelmasse wird als Sarkopenie bezeichnet; ihre Diagnose erfordert eine ärztliche Abklärung, bei der neben der Muskelmenge vor allem die Kraft geprüft wird.</p>

      <h2>Was die DEXA-Körperanalyse erfasst</h2>
      <ul>
        <li>Fettmasse und Körperfettanteil</li>
        <li>Magere Weichteilmasse als Näherungswert für die Muskelmasse, getrennt für Arme, Beine und Rumpf</li>
        <li>Knochenmineralgehalt (eine Knochendichtemessung zur Osteoporose-Abklärung ist eine eigene Untersuchung)</li>
      </ul>

      <h2>Ausgangsmessung und Verlaufskontrolle</h2>
      <p>Eine Messung zu Beginn der Behandlung hält einen Ausgangswert fest – die Referenz für spätere Vergleiche. Eine Verlaufsmessung erfolgt häufig nach mehreren Monaten; den passenden Abstand stimmen Sie mit Ihrer behandelnden Ärztin oder Ihrem behandelnden Arzt ab. Auch nach dem Absetzen kann eine weitere Messung den Verlauf dokumentieren.</p>

      <h2>Was die Messung nicht leistet</h2>
      <ul>
        <li>DEXA entscheidet nicht über Beginn, Dosis oder Absetzen eines Medikaments.</li>
        <li>Die Messung ersetzt keine ärztliche Betreuung und keine Ernährungsberatung.</li>
        <li>Änderungen der Therapie erfolgen ausschließlich durch die behandelnde Ärztin oder den behandelnden Arzt.</li>
      </ul>

      <p>Die Körperanalyse ist bei Röntgen am Kai eine Privatleistung und ohne Zuweisung buchbar; planen Sie etwa 20 Minuten ein.</p>
    `,
    image: 'assets/images/knochendichte_v3.avif',
    status: 'published'
  },
  {
    id: 5,
    title: 'Brustkrebs-Früherkennung in Österreich: Die Mammographie',
    date: '06. Juli 2026',
    category: 'Frauengesundheit',
    excerpt: 'Das österreichische Brustkrebs-Früherkennungsprogramm "früh-erkennen" bietet Frauen ab 45 Jahren kostenlose Mammographie-Screenings. Alles über Ablauf, Qualitätssicherung und warum Sie die Untersuchung in unserer Praxis in Graz durchführen lassen sollten.',
    primaryLink: { to: '/mammographie-graz', label: 'Zur Mammographie in Graz' },
    content: `
      <p>Brustkrebs ist die häufigste Krebserkrankung bei Frauen in Österreich. Jedes Jahr erhalten etwa 5.000 Frauen diese Diagnose. Wird Brustkrebs frühzeitig erkannt, liegen die Heilungschancen bei über 90 Prozent. Das österreichische Brustkrebs-Früherkennungsprogramm "früh-erkennen" bietet Frauen zwischen 45 und 74 Jahren alle zwei Jahre eine kostenlose Mammographie, ohne Überweisung, einfach mit der e-Card.</p>

      <h2>Was ist das österreichische Brustkrebs-Früherkennungsprogramm?</h2>
      <p>Das Programm "früh-erkennen" ist ein organisiertes, qualitätsgesichertes Screening-Programm der Österreichischen Agentur für Qualität und Gesundheit (ÖQG). Es wurde entwickelt, um Brustkrebs im frühestmöglichen Stadium zu entdecken, noch bevor Symptome wie Tastbefunde oder Hautveränderungen auftreten. Die teilnehmenden Frauen erhalten automatisch ein Einladungsschreiben, sobald sie das 45. Lebensjahr vollenden.</p>
      <p>Im Gegensatz zur symptomorientierten Mammographie, die nur bei konkreten Beschwerden durchgeführt wird, richtet sich das Screening an gesunde Frauen ohne Symptome. Das Ziel: die Sterblichkeit an Brustkrebs zu senken, durch Frühdetektion von Tumoren, die noch klein und lokalisiert sind.</p>

      <h2>Wer kann am Screening teilnehmen?</h2>
      <p>Das österreichische Brustkrebs-Früherkennungsprogramm richtet sich an:</p>
      <ul>
        <li>Frauen zwischen 45 und 74 Jahren: Automatische Einladung alle zwei Jahre</li>
        <li>Frauen ab 40 Jahren: Aktive Anmeldung zum Programm möglich</li>
        <li>Frauen ab 75 Jahren: Weiterhin teilnahmeberechtigt auf eigenen Wunsch</li>
        <li>Frauen mit familiärer Belastung: Engmaschigere Kontrolle ab 40 Jahren empfohlen</li>
      </ul>
      <p>Die Untersuchung ist kostenlos und wird mit der e-Card abgerechnet. Eine ärztliche Überweisung ist nicht erforderlich.</p>

      <h2>Wie läuft eine Mammographie ab?</h2>
      <p>Die Mammographie ist eine Röntgenuntersuchung der Brust, bei der jedes Bild in zwei Ebenen (von oben und schräg) aufgenommen wird. Für jede Brust werden somit zwei Aufnahmen erstellt. Die Brust wird dabei kurzzeitig zwischen zwei Platten komprimiert. Das ist notwendig, um die bestmögliche Bildqualität bei geringster Strahlendosis zu erreichen.</p>
      <p>Die eigentliche Untersuchung dauert nur wenige Minuten. Die Strahlenbelastung ist mit der heutigen digitalen Mammographie-Technologie sehr gering und steht in keinem Verhältnis zum potenziellen Nutzen der Früherkennung.</p>

      <h3>Tipps zur Vorbereitung</h3>
      <ul>
        <li>Verwenden Sie am Tag der Untersuchung kein Deo, Puder oder Lotion im Brustbereich. Diese können Artefakte auf dem Bild verursachen</li>
        <li>Bringen Sie Voraufnahmen (falls vorhanden) unbedingt mit. Vergleiche sind entscheidend</li>
        <li>Tragen Sie bequeme Kleidung, die Sie oben leicht ausziehen können</li>
        <li>Der beste Terminzeitpunkt ist in der ersten Zyklushälfte (Tag 7 bis 14), da die Brust dann weniger empfindlich ist</li>
      </ul>

      <h2>Doppelbefundung: Doppelte Sicherheit in unserer Praxis</h2>
      <p>Als zertifizierter Standort des österreichischen Brustkrebs-Früherkennungsprogramms erfüllen wir strengste Qualitätsrichtlinien. Das wichtigste Qualitätsmerkmal: Jede Mammographie wird von zwei unabhängigen, spezialisierten Radiologen beurteilt (Doppelbefundung). Nur wenn beide Ärzte unabhängig voneinander zum selben Ergebnis kommen, gilt die Untersuchung als abschließend beurteilt. Bei abweichenden Befunden wird eine zusätzliche Konsultation einberufen.</p>
      <p>Diese doppelte Auswertung ist ein zentraler Baustein der Qualitätssicherung und erhöht die Detektionsrate von Brustkrebs deutlich, wie internationale Studien zeigen.</p>

      <h2>Warum die Mammographie in unserer Praxis in Graz?</h2>
      <p>Die Röntgen am Kai in Graz ist ein zertifizierter Standort des Brustkrebs-Früherkennungsprogramms. Was Sie bei uns erwartet:</p>
      <ul>
        <li>Modernste digitale Mammographie-Technologie mit hoher Bildauflösung und minimaler Strahlendosis</li>
        <li>Doppelbefundung durch zwei erfahrene, spezialisierte Radiologen</li>
        <li>Zertifizierte Qualität nach den Kriterien des österreichischen Screening-Programms</li>
        <li>Kurze Wartezeiten und persönliche Atmosphäre</li>
        <li>Bequeme Terminvereinbarung, einfach mit der e-Card, ohne Überweisung</li>
        <li>Möglichkeit der Sonographie als ergänzende Untersuchung bei dichtem Drüsengewebe</li>
      </ul>
      <p>Wir nehmen uns Zeit, um Ihre Fragen zu beantworten und Ihnen die Untersuchung so angenehm wie möglich zu gestalten.</p>

      <h2>Was die Wissenschaft sagt: 5 wichtige Studien zur Brustkrebs-Früherkennung</h2>
      <p>Die Wirksamkeit von Mammographie-Screenings ist durch zahlreiche internationale Studien belegt. Hier sind fünf der wichtigsten PubMed-Publikationen, die die Grundlage für moderne Brustkrebs-Früherkennung bilden:</p>

      <h3>1. EUSOBI-Empfehlungen zum Brustkrebs-Screening (2024)</h3>
      <p><em>Marcon M, Fuchsjäger MH, Clauser P, Mann RM. ESR Essentials: screening for breast cancer - general recommendations by EUSOBI. Eur Radiol. 2024;34(10):6348-6357. <a href="https://pubmed.ncbi.nlm.nih.gov/38656711/" target="_blank" rel="noopener">PubMed: 38656711</a></em></p>
      <p>Die European Society of Breast Imaging (EUSOBI) empfiehlt die Mammographie alle zwei Jahre für Frauen zwischen 50 und 70 Jahren. In Österreich gilt das Programm sogar bereits ab 45 Jahren. Die Studie unterstreicht die zentrale Rolle der Mammographie als Goldstandard in der populationsbasierten Brustkrebs-Früherkennung.</p>

      <h3>2. Mammographie und Ultraschall vs. Mammographie allein (2023, Cochrane)</h3>
      <p><em>Glechner A, Wagner G, Mitus JW, et al. Mammography in combination with breast ultrasonography versus mammography for breast cancer screening in women at average risk. Cochrane Database Syst Rev. 2023;3:CD009632. <a href="https://pubmed.ncbi.nlm.nih.gov/36999589/" target="_blank" rel="noopener">PubMed: 36999589</a></em></p>
      <p>Diese systematische Cochrane-Review vergleicht die Kombination von Mammographie und Brustultraschall mit der Mammographie allein. Die Ergebnisse zeigen, dass die ergänzende Sonographie die Detektionsrate bei dichtem Drüsengewebe erhöhen kann, ein Thema, das gerade bei jüngeren Frauen relevant ist.</p>

      <h3>3. Künstliche Intelligenz in der Mammographie (2023)</h3>
      <p><em>Yoon JH, Strand F, Baltzer PAT, et al. Standalone AI for Breast Cancer Detection at Screening Digital Mammography and Digital Breast Tomosynthesis: A Systematic Review and Meta-Analysis. Radiology. 2023;307(5):e222639. <a href="https://pubmed.ncbi.nlm.nih.gov/37219445/" target="_blank" rel="noopener">PubMed: 37219445</a></em></p>
      <p>Diese Meta-Analyse untersucht den Einsatz künstlicher Intelligenz (KI) bei der Auswertung von Mammographien. Die Ergebnisse zeigen, dass KI-Systeme eine vergleichbare oder höhere Trefferquote wie erfahrene Radiologen erzielen können. Die KI-Unterstützung in der Befundung ist ein wachsendes Feld, das die diagnostische Sicherheit weiter erhöht.</p>

      <h3>4. Screening bei extrem dichtem Brustgewebe (2022, EUSOBI)</h3>
      <p><em>Mann RM, Athanasiou A, Baltzer PAT, et al. Breast cancer screening in women with extremely dense breasts recommendations of the European Society of Breast Imaging (EUSOBI). Eur Radiol. 2022;32(6):4036-4045. <a href="https://pubmed.ncbi.nlm.nih.gov/35258677/" target="_blank" rel="noopener">PubMed: 35258677</a></em></p>
      <p>Frauen mit extrem dichtem Drüsengewebe haben ein erhöhtes Brustkrebsrisiko, und der Tumor ist auf der Mammographie schwerer zu erkennen. Diese EUSOBI-Empfehlung plädiert für ergänzende Bildgebung (z. B. MRT oder Ultraschall) bei dieser Patientengruppe. Den Ultraschall bieten wir in unserer Praxis an, eine MRT nicht; ob eine ergänzende Untersuchung sinnvoll ist, wird individuell ärztlich entschieden.</p>

      <h3>5. Brustkrebs-Screening-Programme in Europa (2023)</h3>
      <p><em>Cardoso R, Hoffmeister M, Brenner H. Breast cancer screening programmes and self-reported mammography use in European countries. Int J Cancer. 2023;152(12):2512-2527. <a href="https://pubmed.ncbi.nlm.nih.gov/36883419/" target="_blank" rel="noopener">PubMed: 36883419</a></em></p>
      <p>Diese Studie vergleicht Brustkrebs-Screening-Programme in 32 europäischen Ländern. Österreich gehört dabei zu den Ländern mit einem strukturierten, qualitätsgesicherten Programm, im Gegensatz zu vielen anderen Ländern, in denen Screening nur auf eigene Initiative stattfindet.</p>

      <h2>Häufige Fragen zur Mammographie</h2>
      <h3>Ist die Strahlenbelastung gefährlich?</h3>
      <p>Nein. Die Strahlendosis bei einer modernen digitalen Mammographie ist sehr gering. Sie entspricht etwa der natürlichen Hintergrundstrahlung, der man in wenigen Wochen ausgesetzt ist. Der Nutzen der Früherkennung überwiegt das theoretische Risiko um ein Vielfaches.</p>

      <h3>Tut die Untersuchung weh?</h3>
      <p>Die Kompression der Brust kann als unangenehm, selten als schmerzhaft empfunden werden. Sie dauert jedoch nur wenige Sekunden pro Aufnahme. Am besten vereinbaren Sie den Termin in der ersten Zyklushälfte, da die Brust dann weniger empfindlich ist.</p>

      <h3>Was passiert bei einem auffälligen Befund?</h3>
      <p>Ein auffälliger Befund bedeutet nicht automatisch Brustkrebs. In den meisten Fällen handelt es sich um gutartige Veränderungen. Bei auffälligem Ergebnis wird eine weitere Abklärung (z. B. Zielfolgemammographie, Ultraschall oder in seltenen Fällen Biopsie) empfohlen. Wir begleiten Sie durch diesen Prozess.</p>

      <h3>Kann ich auch ohne Einladung zur Mammographie kommen?</h3>
      <p>Ja. Auch wenn Sie keine Einladung erhalten haben, können Sie sich aktiv zum Programm anmelden oder einfach einen Termin in unserer Praxis vereinbaren. Frauen ab 40 und ab 75 Jahren können ebenfalls teilnehmen.</p>

      <h2>Fazit: Früh erkennen</h2>
      <p>Die Brustkrebs-Früherkennung ist eine der erfolgreichsten Vorsorgemaßnahmen der modernen Medizin. Das österreichische Programm "früh-erkennen" bietet Ihnen die Möglichkeit, kostenlos, ohne Überweisung und in zertifizierter Qualität Vorsorge zu betreiben.</p>
      <p>Vereinbaren Sie Ihren Mammographie-Termin in unserer Praxis Röntgen am Kai in Graz. Unsere spezialisierten Radiologen sorgen für eine präzise und zuverlässige Untersuchung, mit Doppelbefundung und modernster Technologie.</p>
      <p>Rufen Sie uns an und vereinbaren Sie Ihren Termin. Ihre Gesundheit verdient die beste Vorsorge.</p>
    `,
    image: 'assets/images/mammographie_v2.avif',
    status: 'published'
  },
  {
    id: 6,
    title: SARKOPENIE_TITLE,
    date: '07. Oktober 2026',
    category: 'Körperanalyse',
    excerpt: SARKOPENIE_EXCERPT,
    primaryLink: { to: '/koerperanalyse-graz', label: 'Zur DEXA-Körperanalyse in Graz' },
    content: SARKOPENIE_HTML,
    image: 'assets/images/dexa-koerperanalyse-ganzkoerperscan.avif',
    status: 'published'
  }
];
