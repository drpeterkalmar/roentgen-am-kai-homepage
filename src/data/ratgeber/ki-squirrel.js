// Ratgeber-Artikel „Skoliose präzise vermessen: Cobb-Winkel mit KI-Unterstützung“ (IB Lab SQUIRREL).
// URL /ratgeber/skoliose-cobb-winkel-ki – Stand: 22.10.2026.
// Abgleich mit IFU SQUIRREL 1.1 + DoC (MDR IIa) vom 22.10.2026 (IFU 1.1.0 vom 10.09.2026; DoC 16.09.2026,
// Klasse IIa Regel 11, Benannte Stelle 0123). CE/Klasse/Version nur intern, nicht auf der Seite.
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
    "answer": "Nein. IB Lab SQUIRREL erkennt und beschriftet die Wirbel und misst Cobb-Winkel und Gleichgewicht. Die Radiologin bzw. der Radiologe prüft jede Messung und erstellt den Befund. Stimmt ein Wert nicht, misst sie bzw. er selbst nach, im Befund steht der ärztliche Wert. Über Korsett, Übungen oder Operation entscheiden die behandelnden Ärztinnen und Ärzte."
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

export const REVIEW = "BEANTWORTET (Georg Riegler, Mail 23.10.2026): „Texte passen. Entferne das medizinisch geprüft.“ → Prüfvermerk auf dieser Seite ganz entfernt (KI_NO_REVIEW_NOTE in kiSeries.js); CE-Erwähnung: Ja → „CE-gekennzeichnetes Medizinprodukt“ im Artikelkopf, ohne Version/Klasse/Prüfstelle.\nBEANTWORTET (Peter, 22.10.2026): Bei der Wirbelsäulenganzaufnahme wird KEINE Kalibrierkugel verwendet (wurde nie verlangt) → Text: Umrechnung über die Größenangaben des Röntgengeräts bzw. einen fest eingestellten Faktor. Die KI rechnet bei jeder passenden Aufnahme automatisch mit → Text: „Die Software wertet jede passende Aufnahme automatisch aus.“ Außerhalb der Zweckbestimmung (unter 10 Jahren, Verschleiß-, neuromuskuläre oder angeborene Skoliose, Metall, nach Bruch): Messung von Hand, KI-Bericht wird nicht verwendet → Text „Dann misst die Radiologin bzw. der Radiologe von Hand.“ Stimmt ein KI-Wert nicht: selbst nachgemessen, im Befund steht der ärztliche Wert (Bericht nicht änderbar) → Text und FAQ 2. Der Bericht kommt ins Archiv, in ELGA und an die Zuweiser → passiver Satz „Der Messbericht wird mit den Bildern archiviert …, ebenso über ELGA.“ (keine Aufforderung an Patienten). \nBEANTWORTET (Herstellerunterlagen IB Lab, 22.10.2026): Gebrauchsanweisung IB Lab SQUIRREL 1.1 (Dokument 1.1.0 vom 10.09.2026) und Konformitätserklärung (16.09.2026): MDR 2017/745, Klasse IIa nach Regel 11, Benannte Stelle 0123 (TÜV SÜD), Version 1.1.x – installiert laut Salzer 1.1. Zweckbestimmung: vollautomatische Messung von Parametern der Wirbelsäulenausrichtung auf a.p./p.a.-Ganzaufnahmen, nur Personen ab 10 Jahren, Indikation idiopathische Skoliose im Jugendalter; keine Diagnose, kein Ersatz der Gesamtbeurteilung. Messwerte: Cobb-Winkel (mehrere Bögen, Seite, Endwirbel), frontale Balance (Lot C7-Mitte zu S1-Mitte, mm), Wirbelbeschriftung; Normbereich-Markierung. Kontraindikationen laut IFU: degenerative, neuromuskuläre, kongenitale, infantile und juvenile idiopathische Skoliose, Erwachsenen-Skoliose mit sekundärer Degeneration, unter 10 Jahren, jede Art Metallimplantat an der Wirbelsäule, Trauma/Wirbelbrüche, Tumoren. Ergebnisse in der Software nicht editierbar; bei weniger als 12 Brust-/5 Lendenwirbeln nur Durchnummerierung ohne frontale Balance; Kalibrierung über Kugel oder festen Faktor (Methode im Bericht). Text entsprechend präzisiert (Altersgrenze, Kontraindikationen, keine Seitaufnahmen, „korrigiert“ → „ärztlich ermittelter Wert zählt im Befund“, S1 statt „Kreuzbein“, Kalibrierung). Damit erledigt: frühere Punkte Altersgrenze ab 10 und Softwareversion/Metallimplantate (laut IFU kontraindiziert, Messung verwerfen). CE, Klasse und Version bewusst NICHT auf der Seite (Entscheidung Georg offen). BEANTWORTET (Peter, 21.10.2026): IB-Lab-Module seit Oktober 2026 im Einsatz; Fuß, Knie und Becken bei diesen Fragestellungen im Stehen mit Kalibrierkugel [KORRIGIERT 22.10.2026: Kalibrierkugel nur bei Hüfte zur OP-Planung und Fernröntgen Zahn]; Ganzbeinaufnahmen ja; Ganzaufnahme der Wirbelsäule im Stehen (examinations.js); keine zusätzlichen Aufnahmen; Auswertung lokal; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig.\nOFFEN – bitte von der Praxis beantworten: (1) Mit welchem Röntgengerät (Hersteller) entstehen die Ganzaufnahmen? Herstellertests liefen laut IFU nur mit Siemens-Geräten – nur intern. (2) Welche Mindestschwelle für die Anzeige von Cobb-Winkeln ist eingestellt (Standard: unter 3 Grad nicht angezeigt, einstellbar bis 8 Grad)? Nicht im Text. (3) FAQ „das Team erklärt jeden Schritt“ als allgemeiner Ablauf bestätigen. (4) Medizinische Freigabe (Name, Datum) und Autor laut ratgeber.js. (5) CE-Kennzeichnung/Klasse/Version auf der Seite erwähnen? Entscheidung Georg – bis dahin nicht im Text. HINWEISE: Projektion a.p. oder p.a. bewusst offen gelassen (IFU erlaubt beides). Chen et al. 2024: Interessenkonflikte/Herstellerbezug nicht geprüft – nur qualitativ zitiert, keine ICC-/Fehlerzahlen; IFU-Hinweis auf etwas niedrigere Werte bei sehr starken Krümmungen (über 40 Grad) nicht im Text.";


export const TITLE = "Skoliose präzise vermessen: Cobb-Winkel mit KI-Unterstützung";
