// Ratgeber-Artikel „KI-Beinachsenvermessung mit IB Lab LAMA“ – URL /ratgeber/ki-beinachsenvermessung-lama.
// Stand: 21.10.2026. Zielgruppe: Patientinnen und Patienten.
// Quellen: Herstellerseite IB Lab LAMA (Funktionsumfang, Zweckbestimmung), PUCmed-Produktbeschreibung (nur Funktionsumfang,
// ohne Werbezahlen), Simon 2022 (Skeletal Radiol), Schwarz 2022 (KSSTA), Paley 1994 (Begriffe Achsen/Winkel),
// Gordon & Davis 2019 (Beinlängendifferenz). Alle DOIs am 21.10.2026 über Crossref/PubMed geprüft.
// Leitplanken: KI misst, markiert, standardisiert, dokumentiert – keine Diagnose, kein Ersatz für radiologische Befundung,
// orthopädische Beurteilung oder Therapieplanung. Vorhergesagte Beinachse aus der Knieaufnahme nur als ergänzende
// Abschätzung, nie als pauschaler Ersatz der Ganzbeinaufnahme. Keine Genauigkeits-/Zeitangaben aus Herstellerwerbung.
// Beispielberichte = Demo-Datensätze des Herstellers, Messwerte darin werden nicht bewertet.
// [geteilt] Metadaten; Text und Bildtexte: ki-lama.content.js

export const DESCRIPTION = "Beinachsenvermessung in Graz: Ablauf der Röntgenaufnahme, wichtige Begriffe wie HKA und Beinlängendifferenz und wie die KI IB Lab LAMA standardisiert misst.";

export const EXCERPT = "O-Bein, X-Bein oder ein kürzeres Bein? Wie eine Röntgenaufnahme der Beinachse abläuft, was HKA-Winkel und Tibial Slope bedeuten und wie die Software IB Lab LAMA die Messung unterstützt.";

export const FAQ = [
  {
    "question": "Brauche ich für die Röntgenaufnahme der Beinachse eine Zuweisung?",
    "answer": "Ja. Röntgen ist bei Röntgen am Kai mit gültiger ärztlicher Zuweisung und e-card während der Röntgenzeiten ohne Termin möglich. Eine Wunschzeit kann reserviert werden. Welche Aufnahme gemacht wird, steht auf der Zuweisung."
  },
  {
    "question": "Kann eine Knieaufnahme die Ganzbeinaufnahme ersetzen?",
    "answer": "Nicht pauschal. IB Lab LAMA kann aus einer Knieaufnahme von vorn Werte der Beinachse abschätzen, Hüfte und Sprunggelenk sind darauf aber nicht abgebildet. Diese Abschätzung ist eine Ergänzung. Ob eine Ganzbeinaufnahme nötig ist, entscheidet die zuweisende Ärztin oder der zuweisende Arzt."
  },
  {
    "question": "Stellt die KI eine Diagnose?",
    "answer": "Nein. Die Software misst Winkel und Längen, zeichnet die Linien ins Bild und dokumentiert die Werte. Die Radiologin oder der Radiologe prüft jede Messung und erstellt den Befund. Über Behandlung oder Operation entscheidet die behandelnde Ärztin oder der behandelnde Arzt."
  },
  {
    "question": "Ist ein kleiner Unterschied in der Beinlänge bedenklich?",
    "answer": "Nicht unbedingt. Nur wenige Menschen haben exakt gleich lange Beine, kleine Unterschiede sind häufig. Ob ein gemessener Unterschied eine Bedeutung hat, beurteilt die behandelnde Ärztin oder der behandelnde Arzt zusammen mit Beschwerden und Untersuchung."
  },
  {
    "question": "Wie hoch ist die Strahlenbelastung?",
    "answer": "Die Strahlenbelastung beim Röntgen der Beine ist gering. Es werden nur so viele Aufnahmen gemacht, wie für die Fragestellung nötig sind. Die Auswertung durch die Software erfolgt am bereits vorhandenen Bild und bedeutet keine zusätzliche Strahlung."
  }
];

export const REVIEW = "BEANTWORTET (Peter, 21.10.2026): IB-Lab-Module im Einsatz; Fuß, Knie und Becken bei diesen Fragestellungen im Stehen; Kalibrierkugel wird verwendet; Ganzbeinaufnahmen werden gemacht; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig. Text entsprechend angepasst. Übrige Punkte weiter offen: Ganzbeinaufnahmen: Bestätigen, dass die Praxis Ganzbeinaufnahmen anbietet (Keyword „Ganzbeinaufnahme Graz“ setzt das voraus). Ob im Stehen und mit Maßstab/Kalibrierkugel aufgenommen wird, ist nicht bestätigt – Text formuliert das bewusst allgemein („in der Regel“, „häufig“). Falls bestätigt, konkret formulieren.\nEinsatz von LAMA: Start ab Oktober 2026 laut Brief. Bestätigen, welche Teile genutzt werden (Ganzbein, Knie a.p. mit vorhergesagter Beinachse, seitliches Knie/Tibial Slope, Rotationskorrektur) – der Text nennt alle vier.\nAblauf der Prüfung: Text sagt, dass die Radiologin/der Radiologe jede Linie und jeden Wert kontrolliert, bei Bedarf korrigiert und nur geprüfte Werte in den Befund übernimmt. Bitte bestätigen. Ebenso, ob der LAMA-Bericht dem Befund beigelegt bzw. an Zuweiser weitergegeben wird („kann weitergegeben werden“).\nKnieaufnahme „je nach Fragestellung auch im Stehen“: bestätigen, dass stehende Knieaufnahmen gemacht werden.\nVorhergesagte Beinachse aus der Knieaufnahme: bewusst als ergänzende Abschätzung formuliert, nicht als Alternative zur Ganzbeinaufnahme (Herstellerwerbung). Ärztliche Freigabe dieser Formulierung.\nKinder: Satz „bei Kindern berechnet die Software laut Hersteller einzelne Winkel nicht“ beruht auf der PUCmed-Beschreibung (HKA/AMA nicht bei pädiatrischen Patient:innen); Zweckbestimmung laut Herstellerseite ab 8 Jahren. Bestätigen, ob LAMA bei Kindern überhaupt eingesetzt wird.\nTibial Slope „etwa nach Kreuzbandverletzungen“ und Anlässe-Liste (Prothese, Umstellungsoperation, Kinder/Wachstum): ärztliche Freigabe.\nStudienaussage („stimmten insgesamt gut überein“) beruht auf Simon 2022 (Abstract gelesen, Mitautoren vom Hersteller) und dem Titel von Schwarz 2022 (Volltext hinter Bezahlschranke, Abstract nicht gelesen). Keine Zahlen übernommen.\nBildtexte: Beispielberichte sind laut Brief Demo-Datensätze des Herstellers; Personendaten per Vision geprüft (keine sichtbar), PDF-/Bildmetadaten der Originale vor Veröffentlichung lokal prüfen.\nMedizinisch geprüft von Dr. [NAME] – Stand [DATUM] fehlt noch.";


export const TITLE = "Beinachsen mit KI vermessen: Was IB Lab LAMA zeigt";
