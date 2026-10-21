// Ratgeber-Artikel „Skoliose präzise vermessen: Cobb-Winkel mit KI-Unterstützung“ (IB Lab SQUIRREL).
// URL /ratgeber/skoliose-cobb-winkel-ki – Stand 21.10.2026.
// Quellen (alle selbst geprüft): Cobb 1948 (Instr Course Lect, keine DOI); SOSORT-Leitlinie 2016
// (Negrini et al., Scoliosis Spinal Disord 2018); Langensiepen et al. 2013 (Eur Spine J, Messgenauigkeit
// Cobb-Winkel); Chen et al. 2024 (J Clin Med, Validierung IB Lab SQUIRREL); Herstellerseite imagebiopsy.com.
// Leitplanken: Software misst, beschriftet, standardisiert – keine Diagnose, keine Entscheidung über Korsett
// oder Operation; Radiologin/Radiologe prüft und korrigiert. Keine Herstellerwerbezahlen (kein „ICC 0,97“,
// kein „5 Sekunden“, kein „Expertenniveau“). Schwellen nur mit Quelle (10° laut SOSORT/SRS, Messfehler 5°).
// Beispielwerte im Herstellerbericht werden nicht bewertet. Ruhiger Ton gegenüber Eltern und Kindern.
// [geteilt] Metadaten; Text und Bildtexte: ki-squirrel.content.js

export const DESCRIPTION = "Skoliose-Röntgen in Graz: So läuft die Wirbelsäulenganzaufnahme ab und so misst KI den Cobb-Winkel nach einheitlichen Regeln. Die Beurteilung bleibt ärztlich.";

export const EXCERPT = "Wie eine Wirbelsäulenganzaufnahme bei Skoliose abläuft, was der Cobb-Winkel aussagt und wie eine KI-Software Messungen für die Verlaufskontrolle vergleichbar macht – die Beurteilung bleibt ärztlich.";

export const FAQ = [
  {
    "question": "Ab wie viel Grad spricht man von einer Skoliose?",
    "answer": "Nach der internationalen SOSORT-Leitlinie spricht man von einer Skoliose, wenn der Cobb-Winkel 10 Grad oder mehr beträgt und die Wirbel zusätzlich verdreht sind. Leichte Krümmungen sind häufig und brauchen oft keine Behandlung. Ob behandelt wird, hängt nicht vom Winkel allein ab, sondern auch von Alter, Wachstum, Beschwerden und klinischem Befund."
  },
  {
    "question": "Stellt die KI die Diagnose Skoliose?",
    "answer": "Nein. IB Lab SQUIRREL erkennt und beschriftet die Wirbel und misst Cobb-Winkel und Gleichgewicht. Die Radiologin oder der Radiologe prüft jede Messung, korrigiert sie bei Bedarf und erstellt den Befund. Über Korsett, Übungen oder Operation entscheiden die behandelnden Ärztinnen und Ärzte."
  },
  {
    "question": "Ist das Wirbelsäulenröntgen für mein Kind belastend?",
    "answer": "Die Aufnahme ist schmerzlos und dauert nur kurz. Ihr Kind steht dabei ruhig vor dem Röntgengerät, das Team erklärt jeden Schritt. Die Strahlenbelastung ist gering, und die KI-Auswertung braucht keine zusätzliche Aufnahme."
  },
  {
    "question": "Brauche ich für das Wirbelsäulenröntgen einen Termin?",
    "answer": "Sie brauchen eine ärztliche Zuweisung und Ihre e-card. Während der Röntgenzeiten ist die Untersuchung ohne Termin möglich, auf Wunsch kann eine Wunschzeit reserviert werden."
  },
  {
    "question": "Wie oft muss eine Skoliose kontrolliert werden?",
    "answer": "Das hängt vom Alter, vom noch zu erwartenden Wachstum, vom Ausmaß der Krümmung und vom bisherigen Verlauf ab. Den Abstand der Kontrollen legt die behandelnde Ärztin oder der behandelnde Arzt fest. Einheitlich gemessene Werte helfen, Veränderungen zwischen zwei Aufnahmen verlässlicher zu erkennen."
  }
];

export const REVIEW = "BEANTWORTET (Peter, 21.10.2026): IB-Lab-Module im Einsatz; Fuß, Knie und Becken bei diesen Fragestellungen im Stehen; Kalibrierkugel wird verwendet; Ganzbeinaufnahmen werden gemacht; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig. Text entsprechend angepasst. Übrige Punkte weiter offen: Vor Veröffentlichung von der Praxis zu bestätigen: (1) Start des Echtbetriebs von SQUIRREL („ab Oktober 2026“) und ob jede Wirbelsäulenganzaufnahme automatisch ausgewertet wird oder nur auf Anforderung/bei Skoliose-Fragestellung. (2) Ganzaufnahme im Stehen ist bestätigt (examinations.js); Projektion a.p. oder p.a. bewusst offen gelassen. (3) Wird eine Kalibrierkugel verwendet? Falls nein, Satz zur Millimeter-Genauigkeit so belassen (allgemein formuliert); falls ja, kann er positiv ergänzt werden. (4) Herstellerangabe „ab 10 Jahren“ (Zweckbestimmung imagebiopsy.com): Wie wird bei jüngeren Kindern gemessen (manuell)? Im Text nicht behauptet. (5) Eingesetzte Softwareversion: Die Studie Chen 2024 (Version 1.0) nennt fehlende Unterstützung bei Metallimplantaten; PUCmed/Hersteller nennen inzwischen Metall-/Korsett-Erkennung und Darstellung von Verlaufsänderungen bei Voraufnahmen – im Text nur als mögliche Erschwernis formuliert; Verlaufsvergleich durch die Software nicht behauptet. (6) Chen et al. 2024: Interessenkonflikte/Herstellerbezug der Autorinnen und Autoren nicht geprüft (Abschnitt nicht extrahierbar) – Studie bewusst nur qualitativ zitiert, keine ICC-/Fehlerzahlen. (7) Satz „Das Röntgenteam hilft bei der Aufstellung und erklärt …“ sowie FAQ „das Team erklärt jeden Schritt“ als allgemeiner Ablauf – bitte bestätigen. (8) Medizinische Freigabe (Name, Datum) und Autor laut ratgeber.js.";


export const TITLE = "Skoliose präzise vermessen: Cobb-Winkel mit KI-Unterstützung";
