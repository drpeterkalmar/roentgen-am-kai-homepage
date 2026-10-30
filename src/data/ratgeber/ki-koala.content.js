// Ratgeber-Artikel „Kniearthrose objektiv beurteilen: Wie IB Lab KOALA hilft“ – URL /ratgeber/kniearthrose-ki-koala
// SEO-Titel (für ratgeber.js): „Kniearthrose im Röntgen erkennen | KI in Graz“
// Hauptkeyword: Kniearthrose Röntgen Graz; Nebenkeywords: Kniearthrose erkennen, Gelenkspalt Knie, Kellgren-Lawrence, KI Röntgen.
// Stand: 22.10.2026 (Entwurf, Freigabe durch die Praxis offen – siehe REVIEW).
// Abgleich mit IFU KOALA 2.11 + DoC (MDD Klasse I) vom 22.10.2026
//   (Gebrauchsanweisung KOALA-02-01 User Manual CE (DE), Dokumentversion 1.15, signiert 21.07.2022; DoC: MDD 93/42/EWG, Klasse I nach Regel 12,
//   Selbsterklärung ohne Benannte Stelle, erste CE 11/2019, ausgestellt 20.09.2023 – NICHT MDR. CE/Klasse/Version NICHT auf die Seite, Entscheidung Georg.)
//   IFU-Fakten: vollautomatisch, für AP/PA-Knieaufnahmen im Stehen mit gebeugtem Knie (Einzel- oder Doppelknie); Erwachsene mit Arthrose oder erhöhtem
//   Risiko; Ausgaben je Knie: KL-Grad 0–4, OARSI-Grade 0–3 für Gelenkspaltverengung, Sklerose, Osteophyten (jeweils Maximalgrad), minimale
//   Gelenkspaltbreite medial/lateral in mm, standardisierte Werte (auf einheitliche Tibiabreite), prozentuales Ungleichgewicht medial/lateral;
//   Implantat/Gelenkersatz erkannt → keine Analyse, Hinweis im Bericht; Ergebnisse in der Software nicht editierbar, müssen ärztlich geprüft werden;
//   Ergebnis hängt von Lagerung/Strahlrichtung ab (Positionierungshilfe empfohlen); trainiert an Daten einer US-Multicenter-Arthrosestudie.
//   IFU vertraulich: nur in eigenen Worten, ohne Link; Genauigkeits-/Zeitangaben aus Anhang F/C bewusst NICHT übernommen.
// Quellen (alle selbst geprüft, DOI per Crossref verifiziert):
//   - Kellgren JH, Lawrence JS. Ann Rheum Dis 1957;16(4):494–502. doi:10.1136/ard.16.4.494 (Gradeinteilung 0–4)
//   - Sakellariou G et al. EULAR-Empfehlungen Bildgebung bei Arthrose. Ann Rheum Dis 2017;76(9):1484–1494. doi:10.1136/annrheumdis-2016-210815
//     (Bildgebung bei typischem Bild nicht nötig; Knie belastet röntgen; keine routinemäßigen Verlaufsbilder; Beschwerden ≠ Bildbefund)
//   - Nehrer S et al. Cartilage 2021;13(1 Suppl):957S–965S. doi:10.1177/1947603519888793 (Leserstudie mit KOALA, 124 Bilder aus der OAI-Datenbank;
//     nur qualitativ zitiert, keine Prozentwerte)
//   - Hersteller: imagebiopsy.com/product/koala-ce (Funktionsumfang, Zweckbestimmung: Stehendaufnahmen, ersetzt keine Patientenbeurteilung)
//   - Hersteller-Gebrauchsanweisung KOALA (deutsch, Stand Juli 2022), von IB Lab am 22.10.2026 zur Verfügung gestellt (ohne Link)
// Bewusst NICHT übernommen: „300 % höhere Übereinstimmung“, „Goldstandard“, Sensitivitäts-/Spezifitäts- und Zeitangaben des Herstellers.
// Leitplanken: KI misst/markiert/standardisiert, stellt keine Diagnose; KL-Grad ≠ Schmerzstärke, OP-Notwendigkeit oder Prognose;
// ärztlicher Befund entscheidet. Praxis röntgt gestreckt im Stehen (Peter, 22.10.2026); IFU sieht gebeugt vor → Text nur „im Stehen“, intern in REVIEW.
// Brief-Hinweis: Die Studie Brejnebøl 2022 (Eur J Radiol) betrifft ein anderes Produkt (Radiobotics) und wurde deshalb nicht verwendet.
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-koala.js

export const HTML = `
<p>Das Knie schmerzt beim Stiegensteigen, morgens ist es steif, nach einem langen Spaziergang wird es dick. Viele Menschen denken dann an Arthrose. Ob und wie stark sich das Gelenk verändert hat, zeigt oft ein Röntgenbild. Wer ein <strong>Kniearthrose-Röntgen in Graz</strong> bei Röntgen am Kai machen lässt, profitiert seit Oktober 2026 zusätzlich von einer Software: IB Lab KOALA. Hier lesen Sie, was sie misst, was die Fachbegriffe bedeuten und wo die Grenzen liegen.</p>

<h2>Was ist Kniearthrose?</h2>
<p>Arthrose ist ein Verschleiß des Gelenks. Am Anfang steht meist der <strong>Gelenkknorpel</strong>, die glatte Schutzschicht auf den Knochenenden. Er wird dünner und rauer. Der Knochen darunter reagiert: Er verdichtet sich und bildet an den Rändern knöcherne Anbauten.</p>
<p>Typische Beschwerden sind Anlaufschmerzen, Schmerzen bei Belastung, Steifheit und manchmal Schwellungen. Arthrose entwickelt sich meist über Jahre. Alter, Übergewicht, frühere Verletzungen und eine ungünstige Beinachse können dazu beitragen.</p>

<h2>Wann ist ein Knie-Röntgen sinnvoll?</h2>
<p>Ob ein Röntgen nötig ist, entscheidet Ihre Ärztin oder Ihr Arzt nach Gespräch und Untersuchung. Bei typischen Beschwerden lässt sich Kniearthrose oft schon so erkennen. Ein Röntgen hilft, wenn die Beschwerden ungewöhnlich sind, sich rasch ändern, andere Ursachen ausgeschlossen werden sollen oder eine Behandlung geplant wird.</p>
<p>Bei Arthrose-Fragestellungen röntgen wir das Knie <strong>im Stehen</strong>, also unter Belastung durch das Körpergewicht. Das empfehlen auch europäische Fachleute. Der Grund: Im Liegen kann der Gelenkspalt breiter wirken, als er im Alltag ist. Mehr zu Knieaufnahmen unter <a href="/roentgen-graz#region-knie">Röntgen des Knies</a>.</p>

<h2>Was IB Lab KOALA macht</h2>
<p>KOALA ist eine Software der IB Lab GmbH aus Wien. Der Name steht für „Knee Osteoarthritis Labeling Assistant“, also Assistent zur Einstufung der Kniearthrose. Sie arbeitet mit <strong>künstlicher Intelligenz (KI)</strong>: Ein Rechenmodell hat an vielen Knie-Röntgenbildern aus einer US-amerikanischen Arthrose-Studie gelernt, typische Merkmale zu erkennen.</p>
<p>Laut Hersteller ist KOALA für Knieaufnahmen Erwachsener von vorne oder hinten im Stehen gedacht. Ein Bild kann ein oder beide Knie zeigen; jedes wird getrennt nach festen Regeln ausgewertet. Die Software misst den Gelenkspalt, stuft Gelenkspaltverschmälerung, Osteophyten und Sklerose nach den Kriterien der Osteoarthritis Research Society International (OARSI) von 0 bis 3 ein und schlägt einen Kellgren-Lawrence-Grad von 0 bis 4 vor. Die Ergebnisse erscheinen in einem Bericht, die Messstellen werden im Bild markiert.</p>
<p>Die Radiologin bzw. der Radiologe prüft jedes Ergebnis. Die Software-Werte lassen sich nicht verändern. Stimmt ein Wert nicht, misst die Radiologin bzw. der Radiologe selbst nach, im Befund steht der ärztliche Wert. KI im Röntgen ist hier ein Messwerkzeug, keine Diagnose.</p>
<p>In einer Studie mit 124 Knie-Röntgenbildern aus einer US-Forschungsdatenbank stimmten Ärztinnen und Ärzte mit KOALA-Bericht in ihrer Einstufung besser untereinander überein als ohne. Die Studie lief an ausgewählten Bildern, nicht im Praxisalltag, und sagt nichts über Schmerzen oder Behandlungserfolge.</p>
<!--media:report-->

<h2>Die Fachbegriffe im Befund einfach erklärt</h2>
<h3>Gelenkspaltbreite und Gelenkspaltverschmälerung</h3>
<p>Knorpel ist im Röntgenbild nicht direkt sichtbar. Man sieht aber den Abstand zwischen Oberschenkel- und Schienbeinknochen, den <strong>Gelenkspalt</strong>. Beim Gelenkspalt am Knie wird die Innenseite (medial) von der Außenseite (lateral) unterschieden. Wird der Knorpel dünner, wird der Spalt schmäler. Fachleute sprechen von Gelenkspaltverschmälerung. KOALA misst die engste Stelle, die minimale Gelenkspaltbreite, in Millimetern, getrennt für innen und außen. Dazu kommen auf eine einheitliche Knochenbreite umgerechnete Vergleichswerte und der Unterschied zwischen beiden Seiten.</p>
<h3>Osteophyten</h3>
<p>Osteophyten sind knöcherne Randzacken. Der Körper bildet sie an den Gelenkrändern, wenn das Gelenk stärker beansprucht wird. Kleine Osteophyten sind im Alter häufig und verursachen nicht unbedingt Beschwerden.</p>
<h3>Subchondrale Sklerose</h3>
<p>„Subchondral“ heißt „unter dem Knorpel“. Sklerose bedeutet eine Verdichtung des Knochens. Sie erscheint im Röntgen heller. Der Knochen reagiert damit auf die höhere Belastung, wenn der Knorpel als Puffer fehlt.</p>
<h3>Kellgren-Lawrence-Grad</h3>
<p>Die Einteilung nach Kellgren und Lawrence stammt von 1957 und wird bis heute verwendet. Sie fasst die Röntgenzeichen zu einem Grad zusammen:</p>
<ul>
<li><strong>Grad 0:</strong> keine Arthrosezeichen.</li>
<li><strong>Grad 1:</strong> fraglich; vielleicht ein kleiner Randzacken, der Gelenkspalt eventuell leicht verschmälert.</li>
<li><strong>Grad 2:</strong> geringe Arthrose; eindeutige Osteophyten, der Gelenkspalt möglicherweise verschmälert.</li>
<li><strong>Grad 3:</strong> mittelgradige Arthrose; mehrere Osteophyten, deutlich schmälerer Gelenkspalt, etwas Sklerose.</li>
<li><strong>Grad 4:</strong> ausgeprägte Arthrose; große Osteophyten, stark verschmälerter Gelenkspalt, deutliche Sklerose und veränderte Knochenform.</li>
</ul>

<h2>Röntgenbild und Beschwerden sind nicht dasselbe</h2>
<p>Das Röntgenbild zeigt den Aufbau des Gelenks, nicht den Schmerz. Manche Menschen haben deutliche Veränderungen und kaum Beschwerden. Andere haben starke Schmerzen bei geringen Röntgenzeichen. Auch Muskeln, Bänder, Menisken oder eine Entzündung können Schmerzen verursachen.</p>
<p>Ein KI-Wert ist deshalb kein Maß für die Schmerzstärke. Er sagt nicht, ob eine Operation nötig ist, und er ist keine persönliche Prognose. Über die Behandlung entscheiden Sie gemeinsam mit Ihrer behandelnden Ärztin oder Ihrem Arzt, auf Basis von Beschwerden, Untersuchung und Befund.</p>

<h2>Warum Verlaufskontrollen gleich gemessen werden sollten</h2>
<p>Ein Routine-Röntgen in festen Abständen ist bei Arthrose meist nicht nötig. Sinnvoll kann ein neues Bild sein, wenn sich die Beschwerden deutlich ändern oder eine Behandlung geplant wird. Dann sollten alte und neue Aufnahme vergleichbar ausgewertet werden. KOALA misst jedes Mal nach denselben Regeln an denselben Stellen. Das kann helfen, echte Veränderungen von Messunterschieden zu trennen. Gleiche Aufnahmebedingungen bleiben wichtig, denn auch die Lagerung beeinflusst die Messwerte.</p>

<h2>Ablauf bei Röntgen am Kai</h2>
<ol>
<li>Sie kommen mit gültiger ärztlicher Zuweisung und e-card während der Röntgenzeiten, ohne Termin. Eine Wunschzeit kann reserviert werden.</li>
<li>Die Röntgenassistentin bzw. der Röntgenassistent fertigt die Aufnahmen an, die auf der Zuweisung angegeben sind, bei Arthrose-Fragestellungen im Stehen. Es werden nur so viele Aufnahmen wie nötig gemacht; die Strahlenbelastung ist gering.</li>
<li>Die Software wertet jede passende Aufnahme automatisch aus, auf einem Rechner in der Praxis.</li>
<li>Die Radiologin bzw. der Radiologe beurteilt das Bild, prüft die KI-Messungen und erstellt den Befund.</li>
<li>Befund und Bilder gehen an die zuweisende Ärztin bzw. den Arzt. Sie sind zusätzlich über ELGA und portal.marc.at verfügbar. Den KOALA-Messbericht mit dem vorgeschlagenen Kellgren-Lawrence-Grad sehen auch Sie, gemeinsam mit Ihrem Befund. Er wird mit den Bildern archiviert und steht der zuweisenden Ärztin bzw. dem zuweisenden Arzt zur Verfügung, ebenso über ELGA.</li>
</ol>

<h2>Nutzen und Grenzen</h2>
<p><strong>Nutzen:</strong> KOALA misst nach festen Regeln und dokumentiert die Ergebnisse nachvollziehbar. Das macht die Beurteilung einheitlicher und Verlaufskontrollen besser vergleichbar.</p>
<p><strong>Grenzen:</strong> Die Software beurteilt nur, was im Röntgenbild sichtbar ist. Knorpel, Menisken und Bänder zeigt erst eine andere Untersuchung, etwa eine Magnetresonanztomographie (MRT), die Röntgen am Kai nicht anbietet. Ungewöhnliche Lagerung oder eingeschränkte Bildqualität können Messungen verfälschen. Bei einer Knieprothese oder einem anderen Implantat wertet die Software dieses Knie nicht aus und vermerkt das im Bericht. Bei Kindern und Jugendlichen ist KOALA nicht vorgesehen. Dann misst die Radiologin bzw. der Radiologe von Hand. Es gibt keinen Befund ohne ärztliche Kontrolle.</p>
<p>Wenn Ihr Knie auch durch eine X- oder O-Bein-Stellung belastet wird, lesen Sie mehr über die <a href="/ratgeber/ki-beinachsenvermessung-lama">KI-Vermessung der Beinachse</a>. Einen Überblick gibt der Artikel <a href="/ratgeber/kuenstliche-intelligenz-radiologie">Künstliche Intelligenz in der Radiologie</a>. Zum Röntgen bei Kniearthrose in Graz, etwa zu den Röntgenzeiten, informiert die Seite <a href="/roentgen-graz">Röntgen in Graz</a>.</p>
`;

export const MEDIA = {
  "placeholder": {
    "id": "KI-KOALA-01",
    "title": "KI-KOALA-01 – anonymisiertes Beispiel einer Kniearthrose-Auswertung",
    "format": "Hochformat (z. B. 3:4 oder DIN A4), mind. 1600 px breit, PNG",
    "inhalte": [
      "Knie a.p. (von vorne) im Stand als Röntgenaufnahme, eine Seite oder beide Knie",
      "Eingezeichnete Gelenkspaltbreite medial und lateral (minimale Gelenkspaltbreite in mm)",
      "Markierte Osteophyten und subchondrale Sklerose im Bild",
      "Vorgeschlagener Kellgren-Lawrence-Grad (0–4) gut lesbar",
      "Messwert-Tabelle (Gelenkspaltbreite, OARSI-Grade für Gelenkspaltverschmälerung, Osteophyten, Sklerose)",
      "Hinweis im Bericht: KI-Ergebnis muss ärztlich geprüft und bestätigt werden"
    ],
    "zuschnitt": "Beispielbericht des Herstellers (Demo-Datensatz), kein Patient der Praxis. Sicherer Zuschnitt: Kopfbereich mit Name, ID, Geburtsdatum, Datum und Institution vollständig abschneiden, keine eingebrannten Personendaten im Röntgenbild (Ecken der Aufnahme prüfen), keine Metadaten im PNG. Bildunterschrift: „Beispielbericht des Herstellers (Demo-Datensatz, Personendaten entfernt)“."
  }
};

export const SOURCES = [
  "Kellgren JH, Lawrence JS. Radiological assessment of osteo-arthrosis. Annals of the Rheumatic Diseases. 1957;16(4):494–502. <a href=\"https://doi.org/10.1136/ard.16.4.494\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1136/ard.16.4.494<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Sakellariou G, Conaghan PG, Zhang W, et al. EULAR recommendations for the use of imaging in the clinical management of peripheral joint osteoarthritis. Annals of the Rheumatic Diseases. 2017;76(9):1484–1494. <a href=\"https://doi.org/10.1136/annrheumdis-2016-210815\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1136/annrheumdis-2016-210815<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Nehrer S, Ljuhar R, Steindl P, et al. Automated knee osteoarthritis assessment increases physicians’ agreement rate and accuracy: data from the Osteoarthritis Initiative. Cartilage. 2021;13(1 Suppl):957S–965S. <a href=\"https://doi.org/10.1177/1947603519888793\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1177/1947603519888793<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "IB Lab GmbH (ImageBiopsy Lab). IB Lab KOALA – Produktinformation und Zweckbestimmung. <a href=\"https://www.imagebiopsy.com/product/koala-ce\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com/product/koala-ce<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "IB Lab GmbH. IB Lab KOALA – Gebrauchsanweisung (deutsch), Stand Juli 2022. Vom Hersteller zur Verfügung gestellt."
];
