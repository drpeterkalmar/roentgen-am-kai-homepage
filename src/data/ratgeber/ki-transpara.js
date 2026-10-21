// KI-Ratgeberserie – Artikel „Transpara“ (ScreenPoint Medical), URL /ratgeber/ki-mammographie-transpara.
// VORLÄUFIGE FASSUNG bis zum Erhalt der Unterlagen der Praxis. Stand: 21.10.2026.
// Quellen (alle am 21.10.2026 selbst geprüft, DOIs über Crossref/PubMed verifiziert):
//   * Lång K et al., Lancet Oncol 2023 (MASAI, Sicherheitsanalyse) – doi:10.1016/S1470-2045(23)00298-X
//   * Hernström V et al., Lancet Digit Health 2025 (MASAI, Screening-Ergebnisse) – doi:10.1016/S2589-7500(24)00267-X
//   * Gommers J et al., Lancet 2026 (MASAI, Intervallkarzinome) – doi:10.1016/S0140-6736(25)02464-X
//   * Rodríguez-Ruiz A et al., Radiology 2019 (Leserstudie, Transpara-Score 1–10) – doi:10.1148/radiol.2018181371
//   * Herstellerseite screenpoint-medical.com (nur Produktbeschreibung, keine Werbezahlen)
//   * frueh-erkennen.at (Startseite, /fuer-wen-ist-das-programm/, /so-koennen-sie-teilnehmen/, /faqs/) – Programmregeln
// Leitplanken:
//   * Einsatz von Transpara bei Röntgen am Kai ist NICHT bestätigt (Gespräche Jänner 2026) → der Text erklärt nur,
//     wie Transpara grundsätzlich arbeitet; nirgends „bei uns“ oder „wir setzen ein“.
//   * Nur 2D-Mammographie, Markierung von Bereichen, Score. Keine Module Density/Temporal Comparison, keine
//     Tomosynthese/3D (Röntgen am Kai bietet sie nicht an).
//   * KI stellt keine Diagnose, ersetzt weder Radiologin/Radiologen noch Abklärung; „zweites Paar Augen“ nur als Metapher.
//   * Keine Werbezahlen des Herstellers; Studienergebnisse nur aus den gelesenen Originalarbeiten, vorsichtig formuliert.
//   * Screening-Regeln nur so weit, wie sie frueh-erkennen.at am 21.10.2026 bestätigt (Doppelbefundung: /faqs/).
// [geteilt] Metadaten; Text und Bildtexte: ki-transpara.content.js

export const DESCRIPTION = "KI-Mammographie in Graz verständlich erklärt: Wie Transpara Aufnahmen auswertet und Bereiche markiert – und warum Radiologinnen und Radiologen entscheiden.";

export const EXCERPT = "Wie wertet eine KI Mammographiebilder aus? Wir erklären, wie Programme wie Transpara Bereiche markieren, was ein KI-Wert bedeutet und warum die Beurteilung bei der Radiologin oder beim Radiologen bleibt.";

export const FAQ = [
  {
    "question": "Stellt die KI bei der Mammographie eine Diagnose?",
    "answer": "Nein. Programme wie Transpara werten die Bilder zusätzlich aus und markieren Bereiche, die genauer angesehen werden sollten. Die Beurteilung der Bilder und der Befund sind Aufgabe der Radiologin oder des Radiologen."
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
    "answer": "Nein. Programme wie Transpara werten die Bilder aus, die bei der Mammographie ohnehin entstehen. Es sind keine zusätzlichen Aufnahmen und damit keine zusätzliche Strahlung nötig."
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

export const REVIEW = "VORLÄUFIGER ARTIKEL – vor Veröffentlichung von der Praxis bestätigen:\n1. Einsatz von Transpara bei Röntgen am Kai ist NICHT bestätigt (Stand: Gespräche Jänner 2026). Der Text behauptet keinen Einsatz („Programme wie Transpara“, „wie Transpara grundsätzlich arbeitet“). Wird Transpara eingeführt: Absatz zum Einsatz in der Praxis, bestätigte Module, Version und Ablauf ergänzen; Herstellerunterlagen abwarten.\n2. Produktdetails stammen aus Studien mit älteren Transpara-Versionen (Rodríguez-Ruiz 2019; MASAI: Version 1.7.0): Untersuchungswert 1–10, regionale Werte zu Markierungen, Markierungen für Mikrokalk und Verdichtungen. Mit den Herstellerunterlagen der aktuellen Version abgleichen (Skala, Darstellung, ob Markierungen nur ab bestimmten Werten angezeigt werden).\n3. Nicht beschrieben (bewusst): Module Transpara Density (Brustdichte) und Temporal Comparison (Vergleich mit Voraufnahmen) sowie die Tomosynthese/3D-Auswertung, die die Herstellerseite erwähnt. Röntgen am Kai bietet keine Tomosynthese an; nur aufnehmen, wenn ein Modul bestätigt ist (3D nie).\n4. Ob KI-Software im österreichischen Früherkennungsprogramm eingesetzt werden darf bzw. wie sie in die Doppelbefundung eingebunden würde, ist nicht geprüft – vor einem Einsatz mit dem Programm klären. Der Artikel sagt dazu nichts.\n5. Screening-Regeln am 21.10.2026 auf frueh-erkennen.at geprüft: 45–74 alle 2 Jahre e-card automatisch, ohne Zuweisung, Erinnerungsbrief nicht nötig (deckt screening.js); 40–44 und ab 75 einmalige Anmeldung online (MeineSV, ID Austria) oder Serviceline 0800 500 181; Doppelbefundung „zwei speziell geschulte Radiologinnen oder Radiologen nach dem Vier-Augen-Prinzip“ (/faqs/); Befund spätestens nach 7 Werktagen. Unstimmigkeit auf der offiziellen Seite: /so-koennen-sie-teilnehmen/ nennt bei der telefonischen Anmeldung „ab 74 Jahren“, sonst überall „ab 75“ – Artikel verwendet „ab 75“. Vor Veröffentlichung erneut prüfen.\n6. Studienangaben vorsichtig und ohne Prozentwerte; Werbezahlen der Herstellerseite (z. B. „29 % mehr Krebs“, „44 % weniger Arbeitsaufwand“, „30+ Länder“) bewusst nicht übernommen. Interessenkonflikte: Rodríguez-Ruiz 2019 vom Hersteller finanziert (im Text genannt); MASAI ohne Herstellerfinanzierung.\n7. „Zweites Paar Augen“ ist auch eine Formulierung des Herstellers – nur als Metapher verwendet und sofort eingeordnet.\n8. Medien: KI-TRANSPARA-01 (Auswertungsansicht) und KI-TRANSPARA-02 (Ablaufgrafik) sind Platzhalter. Keine Herstellerbilder; Auswertungsansicht als eigene schematische Zeichnung oder nach schriftlicher Freigabe vollständig anonymisiert.\n9. Autor/„Medizinisch geprüft von“ und Freigabedatum durch die Praxis.";


export const TITLE = "Mammographie mit KI-Unterstützung: Wie Transpara hilft";

export const UPDATED = "2026-10-21";
