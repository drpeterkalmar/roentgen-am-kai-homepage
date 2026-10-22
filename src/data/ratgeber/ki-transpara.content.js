// KI-Ratgeberserie – Artikel „Transpara“ (ScreenPoint Medical), URL /ratgeber/ki-mammographie-transpara.
// Stand: 21.10.2026 (Praxisantworten abends eingearbeitet). Abgleich mit den Herstellerunterlagen folgt nach Eingang.
// Quellen (alle am 21.10.2026 selbst geprüft, DOIs über Crossref/PubMed verifiziert):
//   * Lång K et al., Lancet Oncol 2023 (MASAI, Sicherheitsanalyse) – doi:10.1016/S1470-2045(23)00298-X
//   * Hernström V et al., Lancet Digit Health 2025 (MASAI, Screening-Ergebnisse) – doi:10.1016/S2589-7500(24)00267-X
//   * Gommers J et al., Lancet 2026 (MASAI, Intervallkarzinome) – doi:10.1016/S0140-6736(25)02464-X
//   * Rodríguez-Ruiz A et al., Radiology 2019 (Leserstudie, Transpara-Score 1–10) – doi:10.1148/radiol.2018181371
//   * Herstellerseite screenpoint-medical.com (nur Produktbeschreibung, keine Werbezahlen)
//   * frueh-erkennen.at (Startseite, /fuer-wen-ist-das-programm/, /so-koennen-sie-teilnehmen/, /faqs/) – Programmregeln
// Leitplanken:
//   * Transpara ist bei Röntgen am Kai im Einsatz (Peter 21.10.2026 abends): läuft lokal in der Praxis, keine
//     zusätzlichen Aufnahmen, jede Aufnahme ärztlich beurteilt, Markierungen ärztlich geprüft. NICHT nennen: Vertragsdauer/
//     Lizenz, Früherkennungsprogramm/Doppelbefundung mit KI (offen), Temporal Comparison (Beta), Density, Prozentwerte.
//   * Nur 2D-Mammographie, Markierung von Bereichen, Score. Keine Module Density/Temporal Comparison, keine
//     Tomosynthese/3D (Röntgen am Kai bietet sie nicht an).
//   * KI stellt keine Diagnose, ersetzt weder Radiologin/Radiologen noch Abklärung; „zweites Paar Augen“ nur als Metapher.
//   * Keine Werbezahlen des Herstellers; Studienergebnisse nur aus den gelesenen Originalarbeiten, vorsichtig formuliert.
//   * Screening-Regeln nur so weit, wie sie frueh-erkennen.at am 21.10.2026 bestätigt (Doppelbefundung: /faqs/).
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-transpara.js

export const HTML = `
<p>Bei einer Mammographie entstehen Röntgenbilder der Brust, die eine Radiologin oder ein Radiologe genau durchsieht. Seit einigen Jahren gibt es Computerprogramme, die diese Bilder zusätzlich auswerten. Eines davon ist Transpara des niederländischen Herstellers ScreenPoint Medical. Bei Röntgen am Kai setzen wir Transpara bei der Mammographie ein. Wer sich über KI-Mammographie in Graz informiert, findet hier eine verständliche Erklärung: wie solche Programme arbeiten, was sie leisten können und wo ihre Grenzen liegen. Gerne wird die Software als „zweites Paar Augen“ beschrieben. Das ist ein anschauliches Bild, mehr nicht. Die Verantwortung für die Beurteilung liegt immer bei Ärztinnen und Ärzten.</p>

<h2>Was ist Transpara?</h2>
<p>Transpara ist eine Software mit künstlicher Intelligenz (KI) für die Auswertung von Mammographieaufnahmen. KI bedeutet hier: Ein Computerprogramm hat anhand sehr vieler Mammographien gelernt, Bildmuster zu erkennen, die bei Brustkrebs häufiger vorkommen. Transpara ist als Unterstützung für Radiologinnen und Radiologen gedacht. Die Software arbeitet im Hintergrund am Befundungsplatz. Die Patientin merkt davon bei der Untersuchung nichts.</p>
<p>Warum überhaupt KI? In der Früherkennung werden sehr viele Mammographien von Frauen ohne Beschwerden beurteilt. Bei den allermeisten ist alles in Ordnung. Gerade deshalb ist es anspruchsvoll, die wenigen auffälligen Bilder zuverlässig herauszufinden. Hier setzen KI-Programme an: Sie sollen helfen, dass kleine Veränderungen nicht übersehen werden.</p>

<h2>Transpara bei Röntgen am Kai</h2>
<p>Bei uns unterstützt Transpara die Auswertung der Mammographieaufnahmen. Die Software läuft auf Rechnern in unserer Praxis. Die Bilder werden dafür nicht an den Hersteller oder an andere Dritte übertragen. Für die KI-Auswertung sind keine zusätzlichen Aufnahmen nötig. Jede Aufnahme wird von einer Radiologin oder einem Radiologen beurteilt, und jede Markierung der Software wird ärztlich geprüft, bevor der Befund entsteht.</p>

<h2>Wie KI Mammographieaufnahmen analysiert</h2>
<p>Bei der üblichen Mammographie werden von jeder Brust in der Regel zwei Röntgenbilder aus unterschiedlichen Richtungen angefertigt: eines von oben und eines schräg von der Seite. Es handelt sich um zweidimensionale Aufnahmen, kurz 2D-Mammographie. Die KI wertet genau diese Bilder aus. Für die Auswertung sind keine zusätzlichen Aufnahmen und damit auch keine zusätzliche Strahlung nötig.</p>
<p>Die Software arbeitet in mehreren Schritten:</p>
<ol>
<li><strong>Bilder durchsuchen:</strong> Das Programm sucht in jedem Bild nach Auffälligkeiten, etwa nach feinen Kalkablagerungen (Mikrokalk) oder nach Verdichtungen im Brustgewebe.</li>
<li><strong>Bereiche markieren:</strong> Stellen, die genauer angesehen werden sollten, werden im Bild markiert. Zu jeder Markierung gibt das Programm einen Wert an, wie auffällig der Bereich aus seiner Sicht ist.</li>
<li><strong>Gesamteinschätzung:</strong> Aus allen Bildern einer Untersuchung berechnet die Software einen Wert auf einer Skala von 1 bis 10. Ein höherer Wert bedeutet, dass das Programm mehr Merkmale gefunden hat, die bei Brustkrebs häufiger vorkommen.</li>
</ol>
<p>Dieser Gesamtwert ist keine Diagnose und keine persönliche Krebswahrscheinlichkeit. Er hilft, die Aufmerksamkeit gezielt zu lenken. In den Studien war die Skala so eingestellt, dass sich die Untersuchungen eines Screeningprogramms etwa gleichmäßig auf die zehn Stufen verteilen. Den höchsten Wert erhalten daher auch viele Frauen, die keinen Brustkrebs haben.</p>
<!--media:ablauf-->

<h2>Was die Markierungen bedeuten – und was nicht</h2>
<p>Eine Markierung ist ein Hinweis, genauer hinzusehen. Sie bedeutet nicht, dass Krebs vorliegt. Viele markierte Stellen erweisen sich bei der ärztlichen Beurteilung als harmlos, zum Beispiel als gutartige Verkalkung oder als Überlagerung von Gewebe. Umgekehrt heißt eine fehlende Markierung nicht, dass sicher alles in Ordnung ist. Auch eine KI kann Veränderungen übersehen.</p>
<p>Deshalb gilt:</p>
<ul>
<li>Die Radiologin oder der Radiologe sieht sich alle Bilder selbst an und beurteilt sie.</li>
<li>Die Markierungen der Software werden ärztlich geprüft. Die Ärztin oder der Arzt kann ihnen folgen oder sie verwerfen.</li>
<li>Ob weitere Untersuchungen nötig sind, etwa ein Ultraschall oder eine Gewebeprobe, entscheiden Ärztinnen und Ärzte.</li>
<li>Der Befund ist ein ärztlicher Befund. Transpara ersetzt weder die Radiologin oder den Radiologen noch eine weitere Abklärung oder die Diagnose.</li>
</ul>
<!--media:report-->

<h2>Was Studien über KI in der Mammographie zeigen</h2>
<p>Zu Transpara gibt es mehrere wissenschaftliche Studien. Zwei Beispiele:</p>
<ul>
<li><strong>Leserstudie (2019):</strong> 14 Radiologinnen und Radiologen beurteilten 240 ausgewählte Mammographien einmal mit und einmal ohne KI-Unterstützung. Mit Unterstützung erkannten sie im Durchschnitt etwas mehr Brustkrebsfälle, ohne pro Untersuchung mehr Zeit zu brauchen. Die Studie war rückblickend angelegt und wurde vom Hersteller finanziell unterstützt.</li>
<li><strong>MASAI-Studie (Schweden):</strong> Rund 106.000 Frauen im schwedischen Screeningprogramm wurden nach dem Zufallsprinzip zwei Gruppen zugeteilt. In einer Gruppe unterstützte Transpara die Befundung, in der anderen beurteilten wie üblich zwei Fachleute die Bilder ohne KI. Mit KI-Unterstützung wurden mehr Brustkrebserkrankungen entdeckt, vor allem kleine Tumoren, ohne dass deutlich mehr Frauen ohne Krebs zur Abklärung einbestellt wurden. Eine spätere Auswertung zeigte, dass zwischen zwei Screeningrunden nicht häufiger Brustkrebs auftrat als bei der üblichen Doppelbefundung.</li>
</ul>
<p>In der MASAI-Studie bestimmte der KI-Wert auch, ob eine oder zwei Fachleute die Bilder lasen. Solche Ergebnisse gelten für den untersuchten Ablauf und lassen sich nicht ohne Weiteres auf jede Einrichtung übertragen. Auch mit KI-Unterstützung zeigt eine Mammographie nicht jeden Brustkrebs.</p>

<h2>Brustkrebsvorsorge in Österreich: das Früherkennungsprogramm</h2>
<p>Unabhängig von KI ist die regelmäßige Früherkennung ein wichtiger Baustein der Brustgesundheit. Das Österreichische Brustkrebs-Früherkennungsprogramm „früh erkennen“ empfiehlt die Teilnahme vor allem Frauen zwischen 45 und 74 Jahren. Laut der offiziellen Programmseite gilt:</p>
<ul>
<li><strong>45 bis 74 Jahre:</strong> Die e-card ist automatisch alle zwei Jahre für die Früherkennungs-Mammographie freigeschaltet. Eine ärztliche Zuweisung ist nicht nötig. Der Erinnerungsbrief muss nicht mitgebracht werden.</li>
<li><strong>40 bis 44 Jahre und ab 75 Jahren:</strong> Eine freiwillige Teilnahme ist nach einmaliger Anmeldung möglich, online über MeineSV mit ID Austria oder telefonisch über die kostenlose Serviceline 0800 500 181. Danach ist die e-card ebenfalls alle zwei Jahre freigeschaltet. Das Programm empfiehlt, vorher mit der Ärztin oder dem Arzt des Vertrauens zu sprechen.</li>
</ul>
<p>Im Programm werden die Mammographiebilder von zwei speziell geschulten Radiologinnen oder Radiologen nach dem Vier-Augen-Prinzip begutachtet. Den Befund erhalten Sie spätestens nach sieben Werktagen. Alle Details finden Sie auf <a href="https://www.frueh-erkennen.at/fuer-wen-ist-das-programm/" target="_blank" rel="noopener noreferrer">frueh-erkennen.at<span class="sr-only"> (öffnet in neuem Fenster)</span></a> und in unserem Ratgeber <a href="/ratgeber/mammascreening-oesterreich">Mammascreening in Österreich</a>. Wie die <a href="/mammographie-graz#screening">Screening-Mammographie in Graz</a> bei Röntgen am Kai abläuft, lesen Sie auf unserer Seite zur <a href="/mammographie-graz">Mammographie in Graz</a>.</p>

<h2>Bei Beschwerden nicht auf das Screening warten</h2>
<p>Das Screening ist für Frauen ohne Beschwerden gedacht. Wenn Sie einen Knoten tasten, Hautveränderungen wie Dellen oder Verhärtungen bemerken, sich die Brustwarze einzieht oder Flüssigkeit aus der Brustwarze austritt, warten Sie bitte nicht auf den nächsten Screening-Termin. Lassen Sie die Beschwerden ärztlich abklären. Für eine diagnostische Mammographie erhalten Sie in jedem Alter eine ärztliche Zuweisung. Mehr dazu lesen Sie im Abschnitt <a href="/mammographie-graz#beschwerden">Brustgesundheit und Beschwerden</a>.</p>

<h2>KI als Unterstützung, Verantwortung beim Menschen</h2>
<p>Brustkrebsvorsorge mit KI bedeutet nicht, dass ein Computer entscheidet. Transpara kann Mammographiebilder zusätzlich durchsehen, auffällige Bereiche markieren und eine Gesamteinschätzung abgeben. Die Studien deuten darauf hin, dass diese Unterstützung Radiologinnen und Radiologen helfen kann. Die Beurteilung der Bilder, die Entscheidung über weitere Untersuchungen und der Befund bleiben ärztliche Aufgaben. Für Frauen, die sich über KI-Mammographie in Graz informieren, heißt das: Der wichtigste Schritt bleibt die regelmäßige Teilnahme an der Früherkennung und die rasche Abklärung bei Beschwerden. Wie KI in anderen Bereichen der Radiologie eingesetzt wird, erklärt unsere <a href="/ratgeber/kuenstliche-intelligenz-radiologie">Übersicht zur künstlichen Intelligenz in der Radiologie</a>.</p>
`;

export const MEDIA = {
  "report": {
    "id": "KI-TRANSPARA-01",
    "title": "KI-TRANSPARA-01 – Auswertungsansicht (anonymisiert)",
    "format": "Querformat 4:3, mindestens 1600 × 1200 px, SVG oder AVIF; eigene schematische Darstellung, kein Herstellerbild und kein Bildschirmfoto der Herstellersoftware",
    "inhalte": [
      "Vier 2D-Mammographieansichten (rechts/links, jeweils von oben und schräg) als neutrale, schematische Graustufenbilder",
      "In einer Ansicht eine Markierung (Kreis oder Rahmen) mit einem regionalen Wert als Beispiel",
      "Gesamteinschätzung als Skala 1 bis 10 mit hervorgehobenem Beispielwert",
      "Gut lesbarer Hinweis im Bild: „Markierung = Hinweis zur ärztlichen Prüfung, keine Diagnose“",
      "Keine Namen, Geburtsdaten, Untersuchungsdaten, IDs, Gerätebezeichnungen oder Herstellerlogos",
      "Bildunterschrift-Vorschlag: „Schematische Darstellung einer KI-Auswertungsansicht (keine Patientendaten). Markierungen und Werte sind Beispiele und werden ärztlich geprüft.“"
    ],
    "zuschnitt": "Alle wichtigen Elemente (Markierung, Skala, Hinweis) im mittleren Bereich von 80 % der Breite; Text ab 390 px Breite noch lesbar; Ränder ohne Inhalt, damit Abrundung und Zuschnitt nichts abschneiden",
    "erledigt": "Grafik selbst gezeichnet (keine KI, keine Herstellerbilder) am 22.10.2026: assets-src/ki/quellen/render_ki_grafiken.py → npm run images:ki; Desktop 4:3 + Hochformat für Handys (mobile)",
    "slides": [
      {
        "key": "transpara-auswertung",
        "mobile": "transpara-auswertung-mobil",
        "label": "Auswertungsansicht",
        "caption": "Schematische Darstellung einer KI-Auswertungsansicht (keine Patientendaten). Markierungen und Werte sind Beispiele und werden ärztlich geprüft.",
        "alt": "Schematische Auswertungsansicht: vier gezeichnete Mammographieansichten (rechts und links, jeweils schräg und von oben), in einer davon ein rot markierter Bereich mit einem Beispielwert, darunter die Gesamteinschätzung als Skala von 1 bis 10 mit hervorgehobenem Beispielwert und der Hinweis „Markierung = Hinweis zur ärztlichen Prüfung, keine Diagnose“."
      }
    ]
  },
  "ablauf": {
    "id": "KI-TRANSPARA-02",
    "title": "KI-TRANSPARA-02 – Ablaufgrafik",
    "format": "Querformat 16:9 für Desktop (mindestens 1600 × 900 px), dazu Hochformat-Variante für Handys mit senkrechter Abfolge; SVG bevorzugt",
    "inhalte": [
      "1. Mammographie: zwei 2D-Aufnahmen je Brust",
      "2. Die Bilder werden gespeichert und für die Befundung bereitgestellt",
      "3. Die KI-Software wertet die Bilder aus, markiert auffällige Bereiche und berechnet eine Gesamteinschätzung (1–10)",
      "4. Radiologin oder Radiologe beurteilt alle Bilder und prüft die Markierungen",
      "5. Ärztlicher Befund; bei Auffälligkeiten entscheiden Ärztinnen und Ärzte über weitere Abklärung",
      "Hinweis in der Grafik: „Ablauf bei Röntgen am Kai – die KI-Auswertung läuft lokal in der Praxis und stellt keine Diagnose“",
      "Keine Aussage zum Früherkennungsprogramm/Doppelbefundung mit KI (bei der Praxis noch offen)",
      "Keine Tomosynthese/3D, keine Herstellerbilder oder Logos"
    ],
    "erledigt": "Grafik selbst gezeichnet (keine KI, keine Herstellerbilder) am 22.10.2026: assets-src/ki/quellen/render_ki_grafiken.py → npm run images:ki; Desktop 16:9 + Hochformat für Handys (mobile)",
    "slides": [
      {
        "key": "transpara-ablauf",
        "mobile": "transpara-ablauf-mobil",
        "label": "Ablauf",
        "caption": "Schematische Darstellung: Ablauf der Mammographie mit KI-Unterstützung bei Röntgen am Kai.",
        "alt": "Schema in fünf Schritten: Mammographie mit zwei 2D-Aufnahmen je Brust, Bereitstellung der Bilder, KI-Auswertung mit Markierungen und Gesamteinschätzung von 1 bis 10, ärztliche Beurteilung aller Bilder, ärztlicher Befund. Hinweis: Die KI-Auswertung läuft lokal in der Praxis und stellt keine Diagnose."
      }
    ]
  }
};

export const SOURCES = [
  "Lång K, Josefsson V, Larsson AM, Larsson S, Högberg C, Sartor H, Hofvind S, Andersson I, Rosso A. Artificial intelligence-supported screen reading versus standard double reading in the Mammography Screening with Artificial Intelligence trial (MASAI): a clinical safety analysis of a randomised, controlled, non-inferiority, single-blinded, screening accuracy study. Lancet Oncol. 2023;24(8):936–944. <a href=\"https://doi.org/10.1016/S1470-2045(23)00298-X\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1016/S1470-2045(23)00298-X<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Hernström V, Josefsson V, Sartor H, Schmidt D, Larsson AM, Hofvind S, Andersson I, Rosso A, Hagberg O, Lång K. Screening performance and characteristics of breast cancer detected in the Mammography Screening with Artificial Intelligence trial (MASAI): a randomised, controlled, parallel-group, non-inferiority, single-blinded, screening accuracy study. Lancet Digit Health. 2025;7(3):e175–e183. <a href=\"https://doi.org/10.1016/S2589-7500(24)00267-X\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1016/S2589-7500(24)00267-X<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Gommers J, Hernström V, Josefsson V, Sartor H, Schmidt D, Hjelmgren A, Larsson AM, Hofvind S, Andersson I, Rosso A, Hagberg O, Lång K. Interval cancer, sensitivity, and specificity comparing AI-supported mammography screening with standard double reading without AI in the MASAI study: a randomised, controlled, non-inferiority, single-blinded, population-based, screening-accuracy trial. Lancet. 2026;407(10527):505–514. <a href=\"https://doi.org/10.1016/S0140-6736(25)02464-X\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1016/S0140-6736(25)02464-X<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Rodríguez-Ruiz A, Krupinski E, Mordang JJ, Schilling K, Heywang-Köbrunner SH, Sechopoulos I, Mann RM. Detection of breast cancer with mammography: effect of an artificial intelligence support system. Radiology. 2019;290(2):305–314. <a href=\"https://doi.org/10.1148/radiol.2018181371\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1148/radiol.2018181371<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "ScreenPoint Medical (Nijmegen, Niederlande): Herstellerinformation zu Transpara, einer KI-Software zur Unterstützung der Mammographie-Auswertung (abgerufen am 21.10.2026). <a href=\"https://screenpoint-medical.com/\" target=\"_blank\" rel=\"noopener noreferrer\">screenpoint-medical.com<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Österreichisches Brustkrebs-Früherkennungsprogramm „früh erkennen“: Für wen ist das Programm?, So können Sie teilnehmen, FAQs (abgerufen am 21.10.2026). <a href=\"https://www.frueh-erkennen.at/fuer-wen-ist-das-programm/\" target=\"_blank\" rel=\"noopener noreferrer\">frueh-erkennen.at<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>"
];
