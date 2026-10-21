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
// [geteilt] Metadaten; Text und Bildtexte: ki-transpara.content.js

export const DESCRIPTION = "KI-Mammographie in Graz verständlich erklärt: Wie Transpara Aufnahmen auswertet und Bereiche markiert – und warum Radiologinnen und Radiologen entscheiden.";

export const EXCERPT = "Bei der Mammographie setzen wir die KI-Software Transpara ein. Wie sie Bereiche markiert, was ein KI-Wert bedeutet und warum die Beurteilung bei der Radiologin oder beim Radiologen bleibt.";

export const FAQ = [
  {
    "question": "Stellt die KI bei der Mammographie eine Diagnose?",
    "answer": "Nein. Transpara wertet die Bilder zusätzlich aus und markiert Bereiche, die genauer angesehen werden sollten. Die Beurteilung der Bilder und der Befund sind Aufgabe der Radiologin oder des Radiologen."
  },
  {
    "question": "Was bedeutet es, wenn die Software einen Bereich markiert?",
    "answer": "Eine Markierung ist ein Hinweis, diese Stelle genauer anzusehen, aber kein Krebsbefund. Viele markierte Bereiche erweisen sich bei der ärztlichen Beurteilung als harmlos. Ob weitere Untersuchungen sinnvoll sind, entscheiden Ärztinnen und Ärzte."
  },
  {
    "question": "Heißt „keine Markierung“, dass alles in Ordnung ist?",
    "answer": "Nicht automatisch. Auch eine KI kann Veränderungen übersehen, und keine Mammographie zeigt jeden Brustkrebs. Deshalb sieht sich die Radiologin oder der Radiologe alle Bilder selbst an."
  },
  {
    "question": "Braucht es für die KI-Auswertung zusätzliche Aufnahmen?",
    "answer": "Nein. Transpara wertet nur die Bilder aus, die bei der Mammographie ohnehin entstehen. Es sind keine zusätzlichen Aufnahmen und damit keine zusätzliche Strahlung nötig."
  },
  {
    "question": "Wer kann in Österreich zur Screening-Mammographie kommen?",
    "answer": "Frauen zwischen 45 und 74 Jahren können alle zwei Jahre ohne ärztliche Zuweisung mit ihrer automatisch freigeschalteten e-card teilnehmen. Frauen zwischen 40 und 44 Jahren und ab 75 Jahren können sich einmalig anmelden, online über MeineSV oder über die Serviceline 0800 500 181. Aktuelle Details finden Sie auf frueh-erkennen.at."
  },
  {
    "question": "Was soll ich tun, wenn ich einen Knoten in der Brust bemerke?",
    "answer": "Warten Sie nicht auf den nächsten Screening-Termin, sondern lassen Sie die Beschwerden ärztlich abklären. Das gilt auch für Hautveränderungen, eine eingezogene Brustwarze oder Flüssigkeit aus der Brustwarze. Für eine diagnostische Mammographie erhalten Sie in jedem Alter eine ärztliche Zuweisung."
  }
];

export const REVIEW = "BEANTWORTET (Peter, 21.10.2026 abends): Transpara ist bei uns im Einsatz → Absatz „Transpara bei Röntgen am Kai“ (lokal in der Praxis, keine zusätzlichen Aufnahmen, jede Aufnahme ärztlich beurteilt, Markierungen ärztlich geprüft), Distanzierungen entfernt, Kachel „bei uns im Einsatz“; kein Temporal Comparison, keine Tomosynthese, Density nicht erwähnt; Früherkennungsprogramm/KI: Artikel sagt nichts; „ab 75“ korrekt; Studien ohne Prozentwerte; „zweites Paar Augen“ so ok; Medien als eigene schematische Zeichnung; Autor und Prüfvermerk Priv.-Doz. Dr. Peter Kalmar.\nOffen:\n1. Herstellerunterlagen (IFU aktuelle Version, Versionsnummer, CE) über Siemens angefragt.\n2. Nach Eingang: Abgleich Skala (1–10), Darstellung und Schwelle der Markierungen mit der aktuellen Version (Text beruht auf Studien mit älteren Versionen).\n3. CE-Kennzeichnung auf der Seite erwähnen? – Georg fragen.\n4. Ob/wie KI im Früherkennungsprogramm (Doppelbefundung) eingesetzt werden darf, ist nicht geprüft – Artikel sagt dazu bewusst nichts.\n5. Bildplätze KI-TRANSPARA-01/-02 (eigene schematische Zeichnungen) noch offen.";


export const TITLE = "Mammographie mit KI-Unterstützung: Wie Transpara hilft";

export const UPDATED = "2026-10-21";
