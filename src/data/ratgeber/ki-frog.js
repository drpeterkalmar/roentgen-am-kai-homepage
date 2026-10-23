// KI-Ratgeberserie – Artikel „IB Lab FROG“ (Fußfehlstellungen, Hallux valgus). Stand: 22.10.2026.
// Abgleich mit IFU FROG 1.1 (Gebrauchsanweisung DE, Dokument V1.1.1 vom 10.09.2026) + DoC (MDR 2017/745, Klasse IIa,
//   Regel 11, Benannte Stelle 0123) vom 22.10.2026. Details zu IFU-Fakten im Kopfkommentar von ki-frog.content.js.
// URL /ratgeber/fussfehlstellung-roentgen-ki, SEO-Titel in kiSeries.js („Fußfehlstellungen im Röntgen vermessen | Graz“).
// Quellen: Gebrauchsanweisung IB Lab FROG (vertraulich, ohne Link), Herstellerseite imagebiopsy.com, Saltzman 1994,
// Coughlin 2002, Boszczyk 2020, Carrara 2020 (alle selbst geprüft).
// Leitplanken: keine Herstellerzahlen („auf ExpertInnen-Niveau“, „100 % wiederholbar“ NICHT übernommen), keine Normbereiche,
// keine CE-/Klassen-/Versionsangabe auf der Seite, Beispielwerte im Bericht nicht bewerten, KI stellt keine Diagnose und
// ersetzt weder Befund noch orthopädische Untersuchung oder Therapieentscheidung. Einsatz seit Oktober 2026 bestätigt.
// [geteilt] Metadaten; Text und Bildtexte: ki-frog.content.js

export const DESCRIPTION = "Fußröntgen in Graz: Wie Hallux valgus und Fußfehlstellungen im Röntgen vermessen werden, was die Winkel bedeuten und wie KI die Messung unterstützt.";

export const EXCERPT = "Ob Hallux valgus, Senkfuß oder Hohlfuß: Im Röntgen lassen sich Fußfehlstellungen über Winkel vermessen. Was die wichtigsten Messwerte bedeuten und wie die KI-Software IB Lab FROG die Messung unterstützt.";

export const FAQ = [
  {
    "question": "Brauche ich für das Fußröntgen einen Termin?",
    "answer": "Nein. Mit einer gültigen ärztlichen Zuweisung und e-card können Sie während der Röntgenzeiten ohne Termin kommen. Wenn Sie lieber zu einer fixen Zeit kommen möchten, lässt sich eine Wunschzeit reservieren."
  },
  {
    "question": "Warum wird der Fuß bei Fehlstellungen im Stehen geröntgt?",
    "answer": "Unter dem eigenen Körpergewicht zeigt der Fuß seine Stellung so, wie sie im Alltag ist. Unbelastet können Winkel anders ausfallen. Deshalb röntgen wir den Fuß bei Fehlstellungen im Stehen."
  },
  {
    "question": "Stellt die KI die Diagnose Hallux valgus?",
    "answer": "Nein. Die Software setzt Messpunkte und berechnet Winkel. Die Radiologin bzw. der Radiologe prüft jede Messung, misst bei Bedarf selbst nach und erstellt den Befund. Über die Behandlung entscheidet die behandelnde Ärztin oder der behandelnde Arzt."
  },
  {
    "question": "Kann man mit den Messwerten den Verlauf beobachten?",
    "answer": "Ja, wenn die Aufnahmen vergleichbar entstehen, also mit gleicher Ansicht und gleicher Belastung. Dann lassen sich Winkel von früheren und späteren Aufnahmen gegenüberstellen. Sind nach einer Operation Schrauben oder Platten im Fuß, ist die KI-Software nicht vorgesehen, dann wird von Hand gemessen. Wie eine Veränderung einzuordnen ist, beurteilen Ärztinnen und Ärzte."
  },
  {
    "question": "Wird die KI-Messung auch bei Kindern verwendet?",
    "answer": "Nein. IB Lab FROG ist laut Hersteller nur für im Stehen angefertigte Fußröntgenaufnahmen von Erwachsenen ab 18 Jahren vorgesehen. Bei Kindern und Jugendlichen misst die Radiologin bzw. der Radiologe die Winkel von Hand."
  }
];

export const REVIEW = "BEANTWORTET (Georg Riegler, Mail 23.10.2026): „Texte passen. Entferne das medizinisch geprüft.“ → Prüfvermerk auf dieser Seite ganz entfernt (KI_NO_REVIEW_NOTE in kiSeries.js); CE-Erwähnung: Ja → „CE-gekennzeichnetes Medizinprodukt“ im Artikelkopf, ohne Version/Klasse/Prüfstelle.\nBEANTWORTET (Peter, 22.10.2026): Beim Fußröntgen wird KEINE Kalibrierkugel verwendet („sry für Missverständnis“) – Text erwähnt keine Kugel. FROG läuft in der Vollversion (17 Messwerte) → „Alle 17 Messwerte“ bleibt. Die KI rechnet bei jeder passenden Aufnahme automatisch mit → Text: „Die Software wertet jede passende Aufnahme automatisch aus.“ Außerhalb der Zweckbestimmung (unter 18, Metall, nach Bruch, fehlender Knochen): Messung von Hand, KI-Bericht wird nicht verwendet → Text und FAQ 4/5. Stimmt ein KI-Wert nicht: selbst nachgemessen, im Befund steht der ärztliche Wert (Bericht nicht änderbar) → Text und FAQ 3 („korrigiert“ ersetzt). Der Bericht kommt ins Archiv, in ELGA und an die Zuweiser → passiver Satz „Der Messbericht wird mit den Bildern archiviert …, ebenso über ELGA.“ (keine Aufforderung an Patienten). \nBEANTWORTET (Herstellerunterlagen IB Lab, 22.10.2026): IFU FROG 1.1 (Dokument V1.1.1, 10.09.2026) und DoC (MDR 2017/745, Klasse IIa, Regel 11, Benannte Stelle 0123 TÜV SÜD, Erst-CE 05.11.2024) liegen vor. Geklärt: nur Erwachsene ab 18 Jahren (unter 18 kontraindiziert); nur Fußröntgen im Stehen, dorsoplantar (auch Vorfuß, auch beidseits auf einem Bild) und seitlich (ganzer Fuß), Schrägaufnahmen werden abgelehnt; 17 Messungen im Feature-Set „SI“ (9 dorsoplantar: IMA, HVA, DMAA, TCA, FAA, 1-5IMA, 4-5IMA, 5MPA, OFW; 8 seitlich: CIA, MLA/MAA, LTMA/Meary, LTCA, MDA, TDA, CH, FRL); Werte außerhalb des Normalbereichs (Literatur, v. a. Waldt/Woertler) werden im Bericht hervorgehoben; Kontraindikationen Trauma/Fraktur, Metall/Implantate im Bildbereich, fehlende Knochen; laut Hersteller ungenauer bei ausgeprägtem Hallux valgus, Plattfuß, Spreizfuß, Hohlfuß und bei geriatrischen Patienten; Längen nur über DICOM-Pixelabstand kalibriert, Kalibrierkugel wird von FROG nicht genutzt. Text entsprechend angepasst (Altersgrenze, Projektionen, Kontraindikationen, Längenkalibrierung, Ungenauigkeiten, „zertifizierte“ gestrichen, IFU als Quelle ohne Link). BEANTWORTET (Peter, 21.10.2026): FROG seit Oktober 2026 im Einsatz (Text sagt das jetzt); Fuß bei Fehlstellung im Stehen; Auswertung lokal; keine Zusatzaufnahmen; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig. ERLEDIGT: frühere Punkte (1) Stehen, (2) Routinebetrieb, (3) Kalibrierung (keine Kugel, siehe BEANTWORTET 22.10.2026).\nOFFEN – Fragen an die Praxis: (A) Deutsche Kurzbezeichnungen in der aufklappbaren Liste sind eigene Übersetzungen, mit der IFU abgeglichen (FRL „Länge des ersten Strahls bzw. des 1. Mittelfußknochens“) – fachlich gegenlesen. (B) CE-Kennzeichnung/Klasse/Version auf der Seite erwähnen? Entscheidung Georg – bis dahin nicht im Text. HINWEISE: Bewusst keine Normbereiche und keine Performancezahlen aus der IFU genannt; Herstelleraussagen „auf Expertenniveau“, „100 % wiederholbar“, „spart Zeit“ nicht übernommen. Altersangabe in der IFU leicht uneinheitlich („über 18“ bzw. „mindestens 18“) – Text sagt „ab 18 Jahren“. Hinweis „Beispielberichte des Herstellers (Demo-Datensätze, Personendaten entfernt)“ steht nur in MEDIA.note. Beispielberichte: Demo-Datensätze, Bildmaße 900 × 1095 px; Bildtexte mit IFU abgeglichen (Nummerierung seitlich 1 CIA … 7 CH, 8 FRL passt), unverändert.";


export const TITLE = "Hallux valgus und Fußfehlstellungen präzise vermessen";
