// Ratgeber-Artikel „Kniearthrose objektiv beurteilen: Wie IB Lab KOALA hilft“ – URL /ratgeber/kniearthrose-ki-koala
// SEO-Titel (für ratgeber.js): „Kniearthrose im Röntgen erkennen | KI in Graz“
// Hauptkeyword: Kniearthrose Röntgen Graz; Nebenkeywords: Kniearthrose erkennen, Gelenkspalt Knie, Kellgren-Lawrence, KI Röntgen.
// Stand: 22.10.2026 (Entwurf, Freigabe durch die Praxis offen – siehe REVIEW).
// Abgleich mit IFU KOALA 2.11 + DoC (MDD Klasse I) vom 22.10.2026 (Details im Kopfkommentar von ki-koala.content.js;
//   CE/Klasse/Version nur intern, NICHT auf die Seite).
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
// ärztlicher Befund entscheidet. Aufnahme im Stehen von der Praxis bestätigt (21.10.2026); ob gebeugt (Zweckbestimmung IFU) offen – siehe REVIEW.
// Brief-Hinweis: Die Studie Brejnebøl 2022 (Eur J Radiol) betrifft ein anderes Produkt (Radiobotics) und wurde deshalb nicht verwendet.
// [geteilt] Metadaten; Text und Bildtexte: ki-koala.content.js

export const CTA_LABEL = "Knieschmerzen abklären – Röntgen mit Zuweisung";

export const DESCRIPTION = "Kniearthrose im Röntgen in Graz: Wie die KI IB Lab KOALA Gelenkspalt, Osteophyten und Kellgren-Lawrence-Grad misst und warum der ärztliche Befund zählt.";

export const EXCERPT = "Wie zeigt sich Kniearthrose im Röntgenbild? Was bedeuten Gelenkspalt, Osteophyten und Kellgren-Lawrence-Grad? Und wie unterstützt die Software IB Lab KOALA die ärztliche Beurteilung?";

export const FAQ = [
  {
    "question": "Stellt IB Lab KOALA die Diagnose Kniearthrose?",
    "answer": "Nein. KOALA misst den Gelenkspalt, stuft typische Röntgenzeichen ein und schlägt einen Kellgren-Lawrence-Grad vor. Die Radiologin bzw. der Radiologe prüft jedes Ergebnis und erstellt den Befund; bei abweichender Einschätzung gilt die ärztliche Beurteilung. Die Diagnose stellt Ihre Ärztin oder Ihr Arzt gemeinsam mit Beschwerden und Untersuchung."
  },
  {
    "question": "Heißt ein hoher Kellgren-Lawrence-Grad, dass ich operiert werden muss?",
    "answer": "Nein. Der Grad beschreibt nur, wie stark sich das Gelenk im Röntgenbild verändert hat. Röntgenbefund und Beschwerden können sehr unterschiedlich ausgeprägt sein. Ob und welche Behandlung sinnvoll ist, besprechen Sie mit Ihrer behandelnden Ärztin oder Ihrem Arzt."
  },
  {
    "question": "Warum wird das Knie bei Arthrose im Stehen geröntgt?",
    "answer": "Im Stehen trägt das Knie das Körpergewicht, so wie im Alltag. Dadurch lässt sich der Gelenkspalt realistischer beurteilen als im Liegen. Auch KOALA ist laut Hersteller für Knieaufnahmen im Stehen ausgelegt. Welche Aufnahmen gemacht werden, richtet sich nach der Fragestellung und der Zuweisung."
  },
  {
    "question": "Brauche ich für das Knie-Röntgen einen Termin?",
    "answer": "Mit gültiger ärztlicher Zuweisung und e-card können Sie während der Röntgenzeiten ohne Termin kommen. Eine Wunschzeit kann reserviert werden. Befund und Bilder gehen an die zuweisende Ärztin bzw. den Arzt."
  },
  {
    "question": "Wie oft sollte ein Knie mit Arthrose geröntgt werden?",
    "answer": "Ein festes Intervall gibt es nicht, und routinemäßige Kontrollbilder sind meist nicht nötig. Ein neues Röntgen kann sinnvoll sein, wenn sich die Beschwerden deutlich ändern oder eine Behandlung geplant wird. Das entscheidet Ihre Ärztin oder Ihr Arzt."
  }
];

export const REVIEW = "BEANTWORTET (Herstellerunterlagen IB Lab, 22.10.2026): Gebrauchsanweisung KOALA (Version 2.11, deutsch, signiert Juli 2022) und Konformitätserklärung liegen vor. Konformität laut DoC: Medizinprodukterichtlinie MDD 93/42/EWG, Klasse I (Regel 12), Selbsterklärung ohne Benannte Stelle, erste CE 11/2019, DoC ausgestellt 20.09.2023 – noch NICHT MDR (CE/Klasse/Version stehen bewusst NICHT auf der Seite; Entscheidung Georg offen). Zweckbestimmung: vollautomatische Messung der minimalen Gelenkspaltbreite und Vorschlag von OARSI-Graden (Gelenkspaltverengung, Sklerose, Osteophyten, je 0–3) und Kellgren-Lawrence-Grad (0–4) an Knieaufnahmen a.p./p.a. im Stehen mit gebeugtem Knie (Einzel- oder Doppelknie); nicht anstelle einer vollständigen Patientenbeurteilung und nicht allein zur Diagnose. Patientengruppe: Erwachsene mit Arthrose oder erhöhtem Risiko (keine Zahl als Altersgrenze genannt). Weitere Ausgaben: standardisierte Gelenkspaltwerte (auf einheitliche Tibiabreite) und prozentuales Ungleichgewicht innen/außen. Bei erkanntem Implantat/Gelenkersatz keine Analyse, Vermerk im Bericht. Ergebnisse sind in der Software nicht editierbar und müssen ärztlich geprüft werden. Text angepasst: „korrigiert sie, wenn nötig“ ersetzt durch „Software-Werte nicht veränderbar, bei Abweichung gilt die ärztliche Beurteilung“; Zielgruppe Erwachsene, Projektion von vorne/hinten, ein oder beide Knie, OARSI-Grade 0–3 inkl. Gelenkspaltverschmälerung, KL 0–4, Messung innen/außen + standardisierter Wert + Seitenunterschied, Implantat-Ausschluss, Lagerung/Strahlrichtung beeinflussen Messwerte, Auswertung lokal in der Praxis; Gebrauchsanweisung (ohne Link) als Quelle ergänzt. Genauigkeits- und Zeitangaben aus der Gebrauchsanweisung bewusst nicht übernommen. Erledigt: frühere Punkte zur Zweckbestimmung/Produktdetails sowie (1) Echtbetrieb seit Oktober 2026 (Praxis 21.10.). BEANTWORTET (Peter, 21.10.2026): IB-Lab-Module im Einsatz; Fuß, Knie und Becken bei diesen Fragestellungen im Stehen; Kalibrierkugel wird verwendet; Ganzbeinaufnahmen werden gemacht; keine zusätzlichen Aufnahmen für die KI; Auswertung lokal im Serverraum; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig. OFFEN – Fragen an die Praxis: (A) NEU laut Gebrauchsanweisung: KOALA ist für Knieaufnahmen im Stehen MIT GEBEUGTEM KNIE gedacht (Unterschenkel ca. 10° geneigt, Fuß ca. 10° außenrotiert, Positionierungshilfe empfohlen). Röntgen wir das Knie bei Arthrose-Fragestellungen gebeugt (z. B. fixed-flexion/Rosenberg) oder gestreckt a.p.? Wird eine Positionierungshilfe verwendet? (Text sagt nur „im Stehen“; bei gestreckter Aufnahme bitte melden.) (B) Läuft KOALA bei allen Knieaufnahmen a.p./p.a. automatisch oder nur bei Arthrose-Fragestellung? (Text: „bei passenden Aufnahmen … automatisch“.) (C) Erscheint der KOALA-Bericht oder der KL-Grad im Befund bzw. im Portal/ELGA für Patientinnen und Patienten sichtbar? (D) Werden Kinder/Jugendliche mit Knieaufnahmen von KOALA ausgeschlossen (Zweckbestimmung nur Erwachsene)? Text sagt nur „bei Kindern und Jugendlichen nicht vorgesehen“. (E) Platzhalter KI-KOALA-01: Beispielbericht des Herstellers (Demo-Datensatz) besorgen, Zuschnitt laut MEDIA; laut Gebrauchsanweisung gibt es Berichte für Einzel- und Doppelknie, hell und dunkel. (F) Studie Nehrer et al. 2021: Leserstudie an 124 OAI-Studienbildern, retrospektiv; Mitautoren vermutlich aus dem Umfeld des Herstellers (Interessenkonflikte nicht geprüft) – nur qualitativ zitiert, ohne Prozentzahlen. Brejnebøl 2022 betrifft ein anderes Produkt (Radiobotics), bewusst nicht verwendet. (G) Berufsbezeichnung „Radiologietechnologin/Radiologietechnologe“ im Ablauf passend? (H) Pflichtfeld „Medizinisch geprüft von Dr. [NAME] – Stand [DATUM]“ ergänzen; Autor offen. (I) CTA-Label „Knieschmerzen abklären – Röntgen mit Zuweisung“ als Export CTA_LABEL – im Code einbinden (Ziel /roentgen-graz bzw. #region-knie). (J) Hinweis intern: Laut Gebrauchsanweisung muss der Betreiber alle 6 Monate die Verfügbarkeit von Updates prüfen (nicht für die Seite).";


export const TITLE = "Kniearthrose objektiv beurteilen: Wie IB Lab KOALA hilft";
