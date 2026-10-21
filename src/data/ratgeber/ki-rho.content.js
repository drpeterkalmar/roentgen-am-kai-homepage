// Ratgeber-Artikel „Knochengesundheit im Blick: KI-Screening mit RHO“
// URL: /ratgeber/osteoporose-screening-roentgen-ki · SEO-Titel: „Osteoporose-Risiko im Röntgen erkennen | Graz“
// Stand: 21.10.2026 – VORLÄUFIGE Fassung bis zum Erhalt der Originalunterlagen (Gebrauchsanweisung/IFU,
// Konformitätsunterlagen, Konfiguration der Praxis).
//
// Quellen (alle am 21.10.2026 selbst gelesen, DOIs über PubMed/Crossref geprüft):
//   - ImageBiopsy Lab, Produktseite Rho (imagebiopsy.com/de-product/rho): Score 1–10 = Wahrscheinlichkeit einer
//     niedrigen Knochenmineraldichte (DXA-T-Score < −1); Frontalaufnahmen LWS, BWS, Brustkorb, Becken, Knie,
//     Hand/Handgelenk; ab 50; Schwellenwert und DXA-Zeitraum legt die Einrichtung fest; „kein diagnostisches Hilfsmittel“.
//   - 16 Bit Inc. (16bit.ai): Hersteller, Toronto.
//   - Bilbily et al., J Am Coll Radiol 2024;21(4):633–639, doi:10.1016/j.jacr.2023.07.024 (Entwicklung/Validierung;
//     Eingaben: Röntgenbild, Alter, Geschlecht).
//   - Jayarajah et al. (Sunnybrook, Univ. Toronto), Can Assoc Radiol J 2026;77(2):348–353,
//     doi:10.1177/08465371251380240 (prospektiv; PPV 74 % bei 125 von 655 Rho-positiven Personen mit DXA).
//   - Syme et al., Skeletal Radiol 2026;55(6):1321–1327, doi:10.1007/s00256-026-05148-9 (Praxisalltag;
//     Autor:innen mit 16 Bit verbunden – Interessenkonflikt laut Artikel).
//   - Kanis et al., Osteoporos Int 2019;30(1):3–44, doi:10.1007/s00198-018-4704-5 (Definition Osteoporose über DXA-T-Score).
//
// Leitplanken: RHO ist keine Osteoporosediagnose, kein Frakturrisiko-Rechner, kein DEXA-Ersatz. Keine Herstellerwerbezahlen
// (AUC 0,93, „90 % bestätigt“, 62.023 Bilder, „98 %“ im Beispielreport). Nicht „jedes Röntgen wird untersucht“.
// Keine Kosten/Kassen (stehen auf /knochendichtemessung-graz#kosten). Keinen Schwellenwert nennen.
// Nicht behaupten, dass der Hinweis automatisch im Befund steht.
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-rho.js

export const HTML = `
      <p>Osteoporose entwickelt sich meist still. Oft fällt sie erst auf, wenn ein Knochen bei einem harmlosen Sturz bricht. Bei Röntgen am Kai gibt es deshalb einen zusätzlichen Baustein für das Osteoporose-Screening in Graz: Bei Personen ab 50 Jahren kann die Software RHO geeignete Röntgenbilder, die ohnehin aus medizinischen Gründen angefertigt werden, auf Hinweise für eine niedrige Knochendichte prüfen. Dieser Ratgeber erklärt, wie das funktioniert, was der RHO-Score aussagt und wo seine Grenzen liegen.</p>

      <h2>Was bedeutet opportunistisches Screening?</h2>
      <p>Ein Screening ist eine Suchuntersuchung bei Menschen, bei denen kein konkreter Verdacht besteht. „Opportunistisch“ heißt: Eine Gelegenheit wird genutzt. Sie kommen zum Beispiel wegen Rückenschmerzen, Husten oder Knieschmerzen mit einer Zuweisung zum <a href="/roentgen-graz">Röntgen</a>. Die Aufnahme wird für genau diese Fragestellung angefertigt und befundet. Ist sie geeignet, kann eine Software sie zusätzlich auf Merkmale auswerten, die mit einer niedrigen Knochendichte zusammenhängen.</p>
      <p>Wichtig: Für RHO wird keine eigene, zusätzliche Röntgenaufnahme gemacht. Die Analyse nutzt das vorhandene Bild. Durch sie entsteht also keine zusätzliche Strahlenbelastung. Laut der Entwicklungsstudie berücksichtigt die Software neben dem Bild auch Alter und Geschlecht.</p>
      <p>RHO wurde vom kanadischen Unternehmen 16 Bit entwickelt und wird in Europa über ImageBiopsy Lab (Wien) angeboten. Wie die Praxis künstliche Intelligenz (KI) im Röntgen sonst einsetzt, zeigt unsere <a href="/ratgeber/kuenstliche-intelligenz-radiologie">Übersicht zu KI in der Radiologie</a>.</p>

      <h2>Für wen und für welche Aufnahmen ist RHO gedacht?</h2>
      <p>Laut Hersteller ist RHO für Personen ab 50 Jahren vorgesehen. Die Software kann Frontalaufnahmen auswerten, also Bilder, die den Körper von vorne oder von hinten zeigen. In Frage kommen Aufnahmen von:</p>
      <ul>
        <li>Lendenwirbelsäule und Brustwirbelsäule,</li>
        <li>Brustkorb,</li>
        <li>Becken,</li>
        <li>Knie,</li>
        <li>Hand bzw. Handgelenk.</li>
      </ul>
      <p>Das heißt nicht, dass jedes Röntgenbild untersucht wird. Ausgewertet werden nur geeignete Aufnahmen nach den Kriterien der Praxis. Seitliche Aufnahmen, andere Körperregionen oder Bilder, die sich technisch nicht eignen, bleiben außen vor. Die Software prüft vorab selbst, ob eine passende Aufnahme vorliegt. Laut Hersteller ist die Analyse außerdem für Menschen gedacht, bei denen nicht vor Kurzem eine Knochendichtemessung gemacht wurde. Dann ist der Zustand der Knochen ja bereits bekannt.</p>

      <h2>So läuft die Zusatzanalyse ab</h2>
      <ol>
        <li><strong>Röntgen wie gewohnt:</strong> Die Aufnahme wird mit Zuweisung und e-card für die Fragestellung angefertigt, die auf der Zuweisung steht.</li>
        <li><strong>Automatische Prüfung:</strong> Handelt es sich um eine geeignete Aufnahme einer Person ab 50, berechnet RHO im Hintergrund einen Score.</li>
        <li><strong>Ärztliche Beurteilung:</strong> Die Radiologin bzw. der Radiologe sieht das Ergebnis bei der Befundung, prüft, ob die richtige Aufnahme ausgewertet wurde, und entscheidet, ob ein Hinweis in den Befund aufgenommen wird.</li>
        <li><strong>Befund:</strong> Der Befund geht an die zuweisende Ärztin bzw. den zuweisenden Arzt. Befund und Bilder sind zusätzlich über ELGA und das Patientenportal portal.marc.at verfügbar.</li>
      </ol>
<!--media:ablauf-->
      <p>Ab welchem Score ein Ergebnis als auffällig gilt, legt laut Hersteller jede Einrichtung selbst fest. Eine kurze Zusammenfassung finden Sie auch auf unserer Seite zur <a href="/knochendichtemessung-graz#rho-title">Knochendichtemessung im Abschnitt zu RHO</a>.</p>

      <h2>Was der RHO-Score von 1 bis 10 aussagt</h2>
      <p>RHO gibt einen Wert zwischen 1 und 10 aus. Laut Hersteller beschreibt er, wie wahrscheinlich eine niedrige Knochenmineraldichte ist. Je höher der Wert, desto wahrscheinlicher. Gemeint ist ein T-Wert unter −1 in einer DEXA-Messung.</p>
      <p>Der <strong>T-Wert</strong> vergleicht die gemessene Knochendichte mit dem Durchschnitt junger, gesunder Erwachsener. Ein Wert unter −1 umfasst zwei Bereiche: eine leicht verminderte Knochendichte (Osteopenie) zwischen −1 und −2,5 und eine Osteoporose ab −2,5 oder darunter. Ein hoher Score sagt also nicht, welcher der beiden Bereiche zutreffen könnte.</p>
      <p>Die Knochendichte lässt sich auf einem gewöhnlichen Röntgenbild nicht direkt messen. Der Score ist deshalb eine Wahrscheinlichkeitsangabe, keine Messung. Er nennt keinen T-Wert und keinen Grad der Verminderung. Ein niedriger Score schließt eine Osteoporose nicht aus.</p>
<!--media:report-->
      <p>Im Beispielbericht des Herstellers stehen neben dem Score ein kleines Vorschaubild der ausgewerteten Aufnahme und die erkannte Körperregion. Daran prüft die Radiologin bzw. der Radiologe, ob das richtige Bild analysiert wurde.</p>

      <h2>Was RHO nicht ist</h2>
      <ul>
        <li><strong>Keine Osteoporosediagnose:</strong> Der Hersteller beschreibt RHO ausdrücklich nicht als diagnostisches Hilfsmittel. Die Diagnose stellt eine Ärztin oder ein Arzt, in der Regel mithilfe einer Knochendichtemessung und weiterer Befunde.</li>
        <li><strong>Kein Frakturrisiko-Rechner:</strong> Der Score sagt nicht, wie hoch Ihr persönliches Risiko für einen Knochenbruch ist. Dafür werden Knochendichte und klinische Risikofaktoren gemeinsam bewertet.</li>
        <li><strong>Kein Ersatz für DEXA:</strong> Die Knochendichtemessung mit DEXA (Dual-Energy-Röntgen-Absorptiometrie) bleibt die wissenschaftlich etablierte Standard- und Referenzmethode. Nach der europäischen Leitlinie wird Osteoporose über den T-Wert einer DEXA-Messung an Schenkelhals oder Wirbelsäule definiert.</li>
        <li><strong>Keine Therapieentscheidung:</strong> Ob und wie behandelt wird, entscheidet Ihre behandelnde Ärztin bzw. Ihr behandelnder Arzt.</li>
      </ul>

      <h2>Wenn ein Hinweis im Befund steht</h2>
      <p>Ein Hinweis bedeutet nicht, dass eine Osteoporose vorliegt. Er ist ein Anlass, die Knochengesundheit ärztlich beurteilen zu lassen. Ihre Hausärztin bzw. Ihr Hausarzt oder Ihre Fachärztin bzw. Ihr Facharzt bespricht mit Ihnen, ob weitere Abklärung sinnvoll ist, gegebenenfalls eine Knochendichtemessung. Um Osteoporose sicher zu erkennen, braucht es diese Messung; ein Röntgenbild allein reicht dafür nicht.</p>
      <p>Wie eine DEXA-Untersuchung in Graz bei uns abläuft, lesen Sie auf der Seite <a href="/knochendichtemessung-graz">Knochendichtemessung</a>. Dort finden Sie auch Informationen zu <a href="/knochendichtemessung-graz#kosten">Kosten und Kassen</a>.</p>
      <p>Steht kein Hinweis im Befund, heißt das umgekehrt nicht automatisch, dass Ihre Knochen gesund sind. Vielleicht war die Aufnahme nicht geeignet, oder der Score lag unter der Schwelle. Haben Sie Risikofaktoren, etwa einen Knochenbruch nach einem leichten Sturz oder eine längere Kortisonbehandlung, sprechen Sie Ihre Ärztin oder Ihren Arzt darauf an.</p>

      <h2>Was die Studien bisher zeigen</h2>
      <p>In der Entwicklungsstudie wurde RHO an Röntgenbildern mit einer DEXA-Messung aus demselben Zeitraum trainiert und in drei unabhängigen Gruppen aus Kanada und den USA getestet. Die Software unterschied dort gut, aber nicht fehlerfrei zwischen Personen mit und ohne niedrige Knochendichte – über alle untersuchten Körperregionen hinweg.</p>
      <p>Eine prospektive Studie am Sunnybrook-Krankenhaus der Universität Toronto prüfte RHO im Klinikalltag. Von den markierten Personen ließ nur ein kleiner Teil innerhalb von sechs Monaten eine DEXA machen. Bei rund drei von vier dieser Personen bestätigte die Messung eine niedrige Knochendichte, bei einer von vier nicht. Eine weitere Auswertung aus einem kanadischen Röntgeninstitut zeigt, dass nach Einführung der Software deutlich mehr erstmalige Knochendichtemessungen stattfanden. Mehrere Autoren dieser Auswertung sind mit dem Hersteller verbunden.</p>
      <p>Offen ist bisher, ob durch das Screening am Ende weniger Knochenbrüche auftreten. Das wurde in diesen Studien nicht untersucht. Die Ergebnisse stammen zudem aus dem kanadischen Gesundheitssystem und lassen sich nicht eins zu eins auf Österreich übertragen.</p>

      <h2>Kurz zusammengefasst</h2>
      <p>RHO ergänzt das Osteoporose-Screening in Graz: Die Software nutzt geeignete Röntgenbilder, die ohnehin angefertigt werden, für einen zusätzlichen Blick auf die Knochengesundheit. Das kann helfen, eine niedrige Knochendichte früher zu bemerken. Der Score ist ein Hinweis, keine Diagnose. Die Entscheidung über weitere Schritte treffen Ärztinnen und Ärzte, und die Messung der Knochendichte bleibt Aufgabe der DEXA.</p>
`;

export const MEDIA = {
  "ablauf": {
    "id": "KI-RHO-01",
    "title": "KI-RHO-01 – Ablaufgrafik opportunistisches Screening",
    "format": "Infografik, Querformat 16:9 (Desktop), mobil als senkrechte Abfolge 4:5; vier Schritte mit Pfeilen, schlichte Linien-Piktogramme in Markenrot (#8B2323) und Grau auf Weiß, kurze Texte, keine Personenfotos, keine echten Röntgenbilder; als SVG oder 2400 px breites PNG, Text auch im Fließtext vorhanden (Alt-Text kurz).",
    "inhalte": [
      "Schritt 1 „Röntgen wie gewohnt“: Piktogramm Röntgengerät + Zuweisung; Untertitel „Aufnahme für die Fragestellung auf der Zuweisung“.",
      "Schritt 2 „Geeignete Aufnahme?“: Piktogramm Bild mit Häkchen; Untertitel „Person ab 50, geeignete Frontalaufnahme nach den Kriterien der Praxis“.",
      "Schritt 3 „RHO-Score 1–10“: Piktogramm Skala; Untertitel „Software berechnet im Hintergrund einen Wahrscheinlichkeitswert“.",
      "Schritt 4 „Ärztliche Beurteilung“: Piktogramm Ärztin/Arzt am Befundmonitor; Untertitel „Die Radiologin bzw. der Radiologe entscheidet, ob ein Hinweis in den Befund kommt“.",
      "Nebenast nach Schritt 4 (gestrichelt): „Bei Hinweis: Gespräch mit der Ärztin bzw. dem Arzt – gegebenenfalls Knochendichtemessung (DEXA)“.",
      "Fußzeile in zwei Kästchen: „Keine zusätzliche Röntgenaufnahme“ und „Keine Diagnose – kein Ersatz für DEXA“.",
      "NICHT darstellen: Schwellenwert, DEXA-Zeitraum, Prozentzahlen, Aussage „jedes Röntgen wird untersucht“.",
      "Alt-Text-Vorschlag: „Schema: Röntgenaufnahme, Prüfung auf Eignung, RHO-Score 1 bis 10, ärztliche Beurteilung und gegebenenfalls Knochendichtemessung.“"
    ]
  },
  "report": {
    "id": "KI-RHO-02",
    "title": "KI-RHO-02 – anonymisierter Beispielreport",
    "format": "Bildschirmfoto bzw. Export des Hersteller-Beispielberichts (Demo-Datensatz, Beckenaufnahme), Hochformat, mind. 1600 px Höhe; Originaldatei von 16 Bit/IB Lab anfordern statt der Website-Grafik; bei Bedarf mit 2–3 nummerierten Markierungen, die nur erklären, wo was steht.",
    "inhalte": [
      "Markierung 1 – Score-Feld „Patient Rho Score“ (Wert 1–10) mit Erklärtext des Herstellers zur Skala.",
      "Markierung 2 – Vorschaubild der ausgewerteten Aufnahme mit erkannter Körperregion („Pelvis“ = Becken): Hier prüft die Radiologin bzw. der Radiologe, ob das richtige Bild analysiert wurde.",
      "Markierung 3 – Abschnitt „About Rho“: Hinweis des Herstellers, dass RHO keine Osteoporose diagnostiziert.",
      "Bildunterschrift: „Beispielbericht des Herstellers (Demo-Datensatz, Personendaten entfernt)“.",
      "Den Beispielwert NICHT medizinisch bewerten (kein „bei dieser Person liegt … vor“), nur erklären, wo was steht.",
      "Alt-Text-Vorschlag: „Beispielbericht der Software RHO mit Score-Feld, Vorschaubild einer Beckenaufnahme und Herstellerhinweisen (Demo-Datensatz).“"
    ],
    "zuschnitt": "Oben Kopfzeile, darunter Score-Feld und Vorschaubild mit Körperregion, unten Abschnitt „About Rho“; das Feld „Clinical Study Results“ (Herstellerstatistik mit Prozentangabe und Balkendiagramm) wegschneiden oder abdecken; angeschnittene Beschriftung am oberen Rand des Vorschaubilds auf Restdaten prüfen und ggf. abdecken; Fußzeile mit Versionsnummer optional."
  }
};

export const SOURCES = [
  "ImageBiopsy Lab: Rho™ – Produktbeschreibung und vorgesehene Verwendung. <a href=\"https://www.imagebiopsy.com/de-product/rho\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com/de-product/rho<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)",
  "16 Bit Inc. (Toronto): Rho™ – AI-driven opportunistic screening. <a href=\"https://www.16bit.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">16bit.ai<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)",
  "Bilbily A, Syme CA, Adachi JD, Berger C, Morin SN, Goltzman D, Cicero MD. Opportunistic Screening of Low Bone Mineral Density From Standard X-Rays. J Am Coll Radiol. 2024;21(4):633–639. <a href=\"https://doi.org/10.1016/j.jacr.2023.07.024\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1016/j.jacr.2023.07.024<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Jayarajah AN, Atinga A, Probyn L, Sivakumaran T, Christakis M, Oikonomou A. AI Screening Tool Based on X-Rays Improves Early Detection of Decreased Bone Density in a Clinical Setting. Can Assoc Radiol J. 2026;77(2):348–353. <a href=\"https://doi.org/10.1177/08465371251380240\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1177/08465371251380240<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Syme CA, Lopes M, Bilbily A, Cicero MD. Clinical impact of adopting an AI-driven opportunistic bone health screening software using routine X-ray. Skeletal Radiol. 2026;55(6):1321–1327. <a href=\"https://doi.org/10.1007/s00256-026-05148-9\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00256-026-05148-9<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Kanis JA, Cooper C, Rizzoli R, Reginster JY; Scientific Advisory Board of ESCEO and Committees of IOF. European guidance for the diagnosis and management of osteoporosis in postmenopausal women. Osteoporos Int. 2019;30(1):3–44. <a href=\"https://doi.org/10.1007/s00198-018-4704-5\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00198-018-4704-5<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>"
];
