// KI-Ratgeberserie – Artikel „IB Lab FROG“ (Fußfehlstellungen, Hallux valgus). Stand: 22.10.2026.
// Abgleich mit IFU FROG 1.1 (Gebrauchsanweisung DE, Dokument V1.1.1 vom 10.09.2026) + DoC (MDR 2017/745, Klasse IIa,
//   Regel 11, Benannte Stelle 0123 TÜV SÜD; DoC V1.1.0 vom 20.11.2025, Erst-CE 05.11.2024) vom 22.10.2026.
//   IFU-Kernpunkte: Zweckbestimmung = vollautomatische Vermessung der Fußgeometrie auf Fußröntgen (DP/AP/PA inkl. Vorfuß,
//   lateral ganzer Fuß), Aufnahmen im Stehen; nur ab 18 J. (<18 kontraindiziert); Kontraindikationen: Trauma/Fraktur,
//   Implantate/Metall im Bildbereich, fehlende Knochen; Schrägaufnahmen abgelehnt; Kalibrierkugel wird von FROG NICHT
//   genutzt (Längen nur über DICOM-Pixelabstand; Kalibriervorrichtungen sollen den Fuß nicht überlagern); Feature-Set SI =
//   17 Messungen (9 DP, 8 lateral), „Lite“ = 7; Normbereichs-Hervorhebung im Bericht; Ungenauigkeit bei ausgeprägtem
//   Hallux valgus/Pes planus/Spreizfuß/Pes cavus und geriatrischen Patienten. CE/Klasse/Version NICHT auf die Seite (Georg).
// URL /ratgeber/fussfehlstellung-roentgen-ki, SEO-Titel in kiSeries.js („Fußfehlstellungen im Röntgen vermessen | Graz“).
// Quellen (alle selbst geprüft, Titel/Autoren/Jahr/DOI über PubMed/Europe PMC/Crossref):
//   * IB Lab FROG, Gebrauchsanweisung DE (vertraulich, ohne Link; nur in eigenen Worten wiedergegeben)
//   * IB Lab FROG, Herstellerseite imagebiopsy.com (Funktionsumfang, 17 Messungen, vorgesehene Verwendung, ab 18 Jahren)
//   * Saltzman CL et al., Foot Ankle Int 1994 (Messwerte schwanken zwischen Untersuchern; feste Messregeln zuverlässiger)
//   * Coughlin MJ et al., Foot Ankle Int 2002 (AOFAS-Kommission: Messmethode bei Hallux valgus festlegen und angeben)
//   * Boszczyk A et al., Skeletal Radiol 2020 (belastete vs. unbelastete Aufnahmen: Winkel und Entscheidungen unterscheiden sich)
//   * Carrara C et al., Foot Ankle Surg 2020 (Übersicht der Winkel im belasteten Röntgen; uneinheitliche Begriffe)
// Leitplanken: keine Herstellerzahlen („auf ExpertInnen-Niveau“, „100 % wiederholbar“ NICHT übernommen), keine Normbereiche
// (keine im Original gelesene Quelle mit Normwerten → weggelassen), Beispielwerte im Bericht nicht bewerten, KI stellt keine
// Diagnose und ersetzt weder Befund noch orthopädische Untersuchung oder Therapieentscheidung. Einsatz in der Praxis seit
// Oktober 2026, Auswertung lokal, keine Zusatzaufnahmen, Fuß bei Fehlstellung im Stehen: bestätigt (Peter, 21.10.2026).
// Kalibrierkugel bewusst NICHT im Text (FROG nutzt sie laut IFU nicht) → Rückfrage in REVIEW.
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-frog.js

export const HTML = `
<p>Die Großzehe drängt Richtung Kleinzehe, der Ballen drückt im Schuh, oder das Fußgewölbe wirkt flacher als früher. Bei solchen Beschwerden überweisen Ärztinnen und Ärzte häufig zum Röntgen. Ein <strong>Fußröntgen in Graz</strong> bei Röntgen am Kai zeigt, wie die Knochen des Fußes zueinander stehen. Aus diesen Bildern lassen sich Winkel messen, die eine Fehlstellung beschreiben. Dieser Artikel erklärt, worauf es dabei ankommt und wie Software mit künstlicher Intelligenz (KI) die Messung unterstützen kann.</p>

<h2>Warum standardisierte Aufnahmen so wichtig sind</h2>
<p>Ein Winkel im Röntgenbild ist nur so aussagekräftig wie die Aufnahme, auf der er gemessen wird. Wie der Fuß steht, ob er belastet ist und aus welcher Richtung die Strahlen kommen, verändert das Ergebnis. Eine Studie hat belastete und unbelastete Aufnahmen derselben Füße verglichen: Die Winkel beim Hallux valgus unterschieden sich deutlich, und Fachleute kamen je nach Aufnahme zu unterschiedlichen Behandlungsvorschlägen.</p>
<p>Auch die Messung selbst braucht feste Regeln. Schon erfahrene Untersucher messen auf demselben Bild leicht unterschiedliche Werte. Nach genau festgelegten Kriterien gemessen, stimmten die Ergebnisse besser überein. Fachgesellschaften empfehlen deshalb, die Messmethode einheitlich festzulegen. Nur so lassen sich eine Aufnahme von heute und eine Aufnahme in einem Jahr sinnvoll vergleichen.</p>

<h2>Welche Röntgenaufnahmen des Fußes gemacht werden</h2>
<p>Welche Aufnahmen nötig sind, richtet sich nach der Fragestellung auf der Zuweisung. Für die Beurteilung einer Fehlstellung sind zwei Ansichten üblich:</p>
<ul>
<li><strong>Dorsoplantare Aufnahme</strong> („von oben“): Die Strahlen gehen vom Fußrücken zur Fußsohle. Sie zeigt Zehen, Mittelfuß und Fußwurzel von oben und ist die Grundlage für das Röntgen bei Hallux valgus.</li>
<li><strong>Seitliche Aufnahme</strong>: Sie zeigt den Fuß von der Seite. Hier werden das Längsgewölbe, das Fersenbein und die Achse vom Sprungbein zum Mittelfuß beurteilt.</li>
</ul>
<p>Bei Fehlstellungen röntgen wir den Fuß im Stehen. Ein <strong>belastetes Fußröntgen</strong> zeigt den Fuß so, wie er unter dem eigenen Körpergewicht im Alltag steht. Mehr zu den Aufnahmen von Sprunggelenk und Fuß finden Sie auf der Seite <a href="/roentgen-graz#region-fuss">Röntgen des Fußes</a>.</p>

<h2>Was die wichtigsten Messwerte bedeuten</h2>
<p>Um eine Fußfehlstellung zu vermessen, werden Achsen durch einzelne Knochen gelegt. Der Winkel zwischen zwei Achsen beschreibt dann, wie stark ein Knochen von seiner üblichen Richtung abweicht. Fünf Werte sind besonders häufig:</p>
<h3>Hallux-Valgus-Winkel</h3>
<p>Er misst, wie stark die Großzehe zur Kleinzehe hin abknickt. Dazu wird die Achse des ersten Mittelfußknochens mit der Achse des Großzehengrundglieds verglichen. Je größer der Winkel, desto ausgeprägter die Schiefstellung der Großzehe.</p>
<h3>Intermetatarsalwinkel</h3>
<p>Dieser Winkel liegt zwischen dem ersten und dem zweiten Mittelfußknochen. Beim Hallux valgus weicht der erste Mittelfußknochen oft nach innen ab, der Vorfuß wird breiter. Zusammen mit dem Hallux-Valgus-Winkel hilft er, das Ausmaß der Fehlstellung zu beschreiben.</p>
<h3>Meary-Winkel</h3>
<p>Er wird in der seitlichen Aufnahme gemessen, zwischen der Achse des Sprungbeins und der Achse des ersten Mittelfußknochens. Knickt diese Linie nach unten oder nach oben ab, kann das auf ein abgeflachtes oder ein erhöhtes Gewölbe hinweisen.</p>
<h3>Fußlängsgewölbe</h3>
<p>Der Winkel des inneren Längsgewölbes verbindet Punkte an Ferse, Fußwurzel und Großzehenballen. Ein flacheres Gewölbe, wie beim Senk- oder Plattfuß, ergibt einen stumpferen Winkel.</p>
<h3>Fersenbein-Neigung</h3>
<p>Sie beschreibt, wie steil das Fersenbein zum Boden steht. Bei einem flachen Fuß liegt es meist flacher, bei einem Hohlfuß steiler.</p>
<p>Ob ein Wert auffällig ist, beurteilt immer die Radiologin oder der Radiologe, gemeinsam mit dem Bild und der Fragestellung. Ein einzelner Winkel ist noch keine Diagnose.</p>
<details><summary>Alle 17 Messwerte von IB Lab FROG im Überblick</summary>
<ul>
<li><strong>Aufnahme von oben (dorsoplantar):</strong>
<ul>
<li>Hallux-Valgus-Winkel (HVA)</li>
<li>Intermetatarsalwinkel zwischen 1. und 2. Mittelfußknochen (IMA)</li>
<li>Gelenkflächenwinkel am Köpfchen des 1. Mittelfußknochens (DMAA)</li>
<li>Winkel zwischen Sprungbein und Fersenbein von oben (TCA)</li>
<li>Vorfuß-Adduktionswinkel (FAA)</li>
<li>Winkel zwischen 1. und 5. Mittelfußknochen (15IMA)</li>
<li>Winkel zwischen 4. und 5. Mittelfußknochen (45IMA)</li>
<li>Winkel am Grundgelenk der Kleinzehe (5MPA)</li>
<li>Knöcherne Fußbreite (OFW)</li>
</ul>
</li>
<li><strong>Seitliche Aufnahme:</strong>
<ul>
<li>Fersenbein-Neigungswinkel (CIA)</li>
<li>Winkel des inneren Längsgewölbes nach Djian-Annonier (MAA)</li>
<li>Meary-Winkel zwischen Sprungbein und 1. Mittelfußknochen (LTMA)</li>
<li>Seitlicher Winkel zwischen Sprungbein und Fersenbein (LTCA)</li>
<li>Neigungswinkel des Sprungbeins (TDA)</li>
<li>Neigungswinkel des 1. Mittelfußknochens (MDA)</li>
<li>Höhe des Würfelbeins (CH)</li>
<li>Länge des ersten Strahls bzw. des 1. Mittelfußknochens (FRL)</li>
</ul>
</li>
</ul>
</details>

<h2>Wie IB Lab FROG die Messung unterstützt</h2>
<p>IB Lab FROG ist eine Medizinprodukt-Software der Wiener Firma IB Lab. Bei Röntgen am Kai ist sie seit Oktober 2026 im Einsatz. Sie wertet im Stehen angefertigte Fußröntgenaufnahmen von Erwachsenen aus: die Aufnahme von oben und die seitliche Aufnahme, die dafür den ganzen Fuß zeigen muss. Schrägaufnahmen misst sie nicht. Sie erkennt die Knochen, setzt die Messpunkte, zeichnet die Achsen ein und berechnet daraus Winkel und Längen. Das Ergebnis ist ein Bericht mit nummerierten, farbigen Linien im Bild und einer Tabelle der Werte.</p>
<!--media:report-->
<p>Der Vorteil liegt in der Einheitlichkeit. Die Software setzt die Messpunkte jedes Mal nach denselben Regeln. Das macht Messungen nachvollziehbar und erleichtert <strong>Verlaufskontrollen</strong>: Wird der Fuß nach Monaten oder Jahren erneut vergleichbar geröntgt, lassen sich die Werte nebeneinanderstellen, etwa im Verlauf einer Behandlung. Mehr zum Einsatz von KI in der Radiologie lesen Sie in unserer <a href="/ratgeber/kuenstliche-intelligenz-radiologie">Übersicht zu künstlicher Intelligenz</a>.</p>
<p>Wichtig: Die Software misst, markiert und dokumentiert. Sie stellt keine Diagnose. Die Radiologin oder der Radiologe prüft jede Messung am Bild und korrigiert sie, wenn ein Punkt nicht richtig sitzt. Der Befund ist ärztlich. Er ersetzt auch nicht die orthopädische Untersuchung, und über eine Einlage, Physiotherapie oder Operation entscheidet die behandelnde Ärztin oder der behandelnde Arzt.</p>

<h2>Ablauf beim Fußröntgen in Graz</h2>
<ol>
<li><strong>Zuweisung und e-card:</strong> Mit einer gültigen ärztlichen Zuweisung können Sie während der Röntgenzeiten ohne Termin kommen. Eine Wunschzeit lässt sich auch reservieren.</li>
<li><strong>Aufnahmen:</strong> Schuhe und Socken werden ausgezogen. Je nach Fragestellung entstehen Aufnahmen von oben und von der Seite, bei Fehlstellungen im Stehen. Die Strahlenbelastung ist gering, und es werden nur so viele Aufnahmen gemacht wie nötig.</li>
<li><strong>Messung und Befund:</strong> Die Winkel werden gemessen und ärztlich geprüft. Danach erstellt die Radiologin oder der Radiologe den Befund.</li>
<li><strong>Ergebnis:</strong> Befund und Bilder gehen an die zuweisende Ärztin oder den zuweisenden Arzt. Sie sind zusätzlich über ELGA und das Patientenportal portal.marc.at verfügbar.</li>
</ol>
<p>Alle Röntgenuntersuchungen der Praxis finden Sie auf der Seite <a href="/roentgen-graz">Röntgen in Graz</a>.</p>

<h2>Nutzen und Grenzen</h2>
<h3>Was die Messung leisten kann</h3>
<ul>
<li>Sie beschreibt eine Fehlstellung mit Zahlen statt nur mit Worten.</li>
<li>Gleiche Messregeln machen Werte über die Zeit vergleichbar.</li>
<li>Die eingezeichneten Linien zeigen nachvollziehbar, wo gemessen wurde.</li>
<li>Die Werte geben der Orthopädin oder dem Orthopäden eine zusätzliche Grundlage für das Gespräch über die Behandlung.</li>
</ul>
<h3>Wo die Grenzen liegen</h3>
<ul>
<li>Die Messung ist nur so gut wie die Aufnahme. Lagerung, Belastung, Bildqualität und Gegenstände, die den Fuß überdecken, beeinflussen die Werte.</li>
<li>Längen in Millimetern berechnet die Software aus Größenangaben, die das Röntgengerät im Bild mitspeichert. Fehlen diese, gibt sie keine kalibrierten Längen aus. Winkel betrifft das nicht.</li>
<li>Nicht vorgesehen ist die Software bei Metallimplantaten im Bild, nach Knochenbrüchen oder wenn ein Knochen fehlt. Dann wird ohne die Software ausgewertet.</li>
<li>Bei sehr ausgeprägten Fehlstellungen und bei älteren Menschen können laut Hersteller einzelne Werte ungenau sein. Deshalb prüft immer eine Fachärztin oder ein Facharzt für Radiologie.</li>
<li>Laut Hersteller ist die Software nur für Erwachsene ab 18 Jahren vorgesehen.</li>
<li>Beschwerden, Beweglichkeit und Gangbild zeigt kein Röntgenbild. Diese beurteilt die klinische Untersuchung.</li>
</ul>
`;

export const MEDIA = {
  "slides": [
    {
      "key": "frog-dorsoplantar",
      "label": "Aufnahme von oben (dorsoplantar)",
      "caption": "Aufnahme von oben: Rechts das Röntgenbild mit nummerierten, farbigen Linien, links die Tabelle mit neun Messwerten. Gleiche Nummer und Farbe gehören zusammen, zum Beispiel die rote 1 für den Intermetatarsalwinkel zwischen erstem und zweitem Mittelfußknochen. Den Hallux-Valgus-Winkel zeigt Zeile 2 der Tabelle. Werte außerhalb des im Bericht hinterlegten Bereichs hebt die Software farbig hervor; die Einordnung übernimmt die Radiologin oder der Radiologe.",
      "alt": "Beispielbericht IB Lab FROG: Fußröntgen von oben mit farbigen, nummerierten Messlinien an Großzehe, Mittelfuß und Fußwurzel, daneben eine Wertetabelle"
    },
    {
      "key": "frog-seitlich",
      "label": "Seitliche Aufnahme",
      "caption": "Seitliche Aufnahme eines linken Fußes im Stehen (Markierung „L“): Eingezeichnet sind unter anderem die Fersenbein-Neigung (1), der Winkel des Längsgewölbes (2) und der Meary-Winkel (3), außerdem Würfelbeinhöhe (7) und Länge des ersten Strahls (8). Darunter stehen alle Werte dieser Ansicht in einer Tabelle. Der Hinweis oben zeigt, dass die Längen nicht kalibriert sind.",
      "alt": "Beispielbericht IB Lab FROG: seitliches Röntgen eines linken Fußes im Stehen mit Messlinien an Ferse, Längsgewölbe und Mittelfuß, darunter eine Wertetabelle"
    }
  ],
  "note": "Beispielberichte des Herstellers (Demo-Datensätze, Personendaten entfernt)."
};

export const SOURCES = [
  "IB Lab GmbH. IB Lab FROG – Gebrauchsanweisung (deutsch), Stand September 2026. Vom Hersteller zur Verfügung gestellt.",
  "IB Lab GmbH: IB Lab FROG – Produktbeschreibung, Messparameter und vorgesehene Verwendung. <a href=\"https://www.imagebiopsy.com/de-product/ib-lab-frog\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)",
  "Saltzman CL, Brandser EA, Berbaum KS, DeGnore L, Holmes JR, Katcherian DA, Teasdall RD, Alexander IJ. Reliability of standard foot radiographic measurements. Foot Ankle Int. 1994;15(12):661–665. <a href=\"https://doi.org/10.1177/107110079401501206\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1177/107110079401501206<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Coughlin MJ, Saltzman CL, Nunley JA. Angular measurements in the evaluation of hallux valgus deformities: a report of the ad hoc committee of the American Orthopaedic Foot &amp; Ankle Society on angular measurements. Foot Ankle Int. 2002;23(1):68–74. <a href=\"https://doi.org/10.1177/107110070202300114\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1177/107110070202300114<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Boszczyk A, Kwapisz S, Kiciński M, Kordasiewicz B, Liszka H. Non-weightbearing compared with weightbearing x-rays in hallux valgus decision-making. Skeletal Radiol. 2020;49(9):1441–1447. <a href=\"https://doi.org/10.1007/s00256-020-03441-9\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00256-020-03441-9<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Carrara C, Caravaggi P, Belvedere C, Leardini A. Radiographic angular measurements of the foot and ankle in weight-bearing: a literature review. Foot Ankle Surg. 2020;26(5):509–517. <a href=\"https://doi.org/10.1016/j.fas.2019.07.008\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1016/j.fas.2019.07.008<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>"
];
