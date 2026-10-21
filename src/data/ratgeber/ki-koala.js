// Ratgeber-Artikel „Kniearthrose objektiv beurteilen: Wie IB Lab KOALA hilft“ – URL /ratgeber/kniearthrose-ki-koala
// SEO-Titel (für ratgeber.js): „Kniearthrose im Röntgen erkennen | KI in Graz“
// Hauptkeyword: Kniearthrose Röntgen Graz; Nebenkeywords: Kniearthrose erkennen, Gelenkspalt Knie, Kellgren-Lawrence, KI Röntgen.
// Stand: 21.10.2026 (Entwurf, Freigabe durch die Praxis offen – siehe REVIEW).
// Quellen (alle selbst geprüft, DOI per Crossref verifiziert):
//   - Kellgren JH, Lawrence JS. Ann Rheum Dis 1957;16(4):494–502. doi:10.1136/ard.16.4.494 (Gradeinteilung 0–4)
//   - Sakellariou G et al. EULAR-Empfehlungen Bildgebung bei Arthrose. Ann Rheum Dis 2017;76(9):1484–1494. doi:10.1136/annrheumdis-2016-210815
//     (Bildgebung bei typischem Bild nicht nötig; Knie belastet röntgen; keine routinemäßigen Verlaufsbilder; Beschwerden ≠ Bildbefund)
//   - Nehrer S et al. Cartilage 2021;13(1 Suppl):957S–965S. doi:10.1177/1947603519888793 (Leserstudie mit KOALA, 124 Bilder aus der OAI-Datenbank;
//     nur qualitativ zitiert, keine Prozentwerte)
//   - Hersteller: imagebiopsy.com/product/koala-ce (Funktionsumfang, Zweckbestimmung: Stehendaufnahmen, ersetzt keine Patientenbeurteilung)
// Bewusst NICHT übernommen: „300 % höhere Übereinstimmung“, „Goldstandard“, Sensitivitäts-/Spezifitäts- und Zeitangaben des Herstellers.
// Leitplanken: KI misst/markiert/standardisiert, stellt keine Diagnose; KL-Grad ≠ Schmerzstärke, OP-Notwendigkeit oder Prognose;
// ärztlicher Befund entscheidet. Aufnahme im Stehen nur vorsichtig („wenn auf der Zuweisung angegeben bzw. üblicherweise“).
// Brief-Hinweis: Die Studie Brejnebøl 2022 (Eur J Radiol) betrifft ein anderes Produkt (Radiobotics) und wurde deshalb nicht verwendet.
// [geteilt] Metadaten; Text und Bildtexte: ki-koala.content.js

export const CTA_LABEL = "Knieschmerzen abklären – Röntgen mit Zuweisung";

export const DESCRIPTION = "Kniearthrose im Röntgen in Graz: Wie die KI IB Lab KOALA Gelenkspalt, Osteophyten und Kellgren-Lawrence-Grad misst und warum der ärztliche Befund zählt.";

export const EXCERPT = "Wie zeigt sich Kniearthrose im Röntgenbild? Was bedeuten Gelenkspalt, Osteophyten und Kellgren-Lawrence-Grad? Und wie unterstützt die Software IB Lab KOALA die ärztliche Beurteilung?";

export const FAQ = [
  {
    "question": "Stellt IB Lab KOALA die Diagnose Kniearthrose?",
    "answer": "Nein. KOALA misst den Gelenkspalt, markiert Röntgenzeichen und schlägt einen Kellgren-Lawrence-Grad vor. Die Radiologin bzw. der Radiologe prüft jede Messung und erstellt den Befund. Die Diagnose stellt Ihre Ärztin oder Ihr Arzt gemeinsam mit Beschwerden und Untersuchung."
  },
  {
    "question": "Heißt ein hoher Kellgren-Lawrence-Grad, dass ich operiert werden muss?",
    "answer": "Nein. Der Grad beschreibt nur, wie stark sich das Gelenk im Röntgenbild verändert hat. Röntgenbefund und Beschwerden können sehr unterschiedlich ausgeprägt sein. Ob und welche Behandlung sinnvoll ist, besprechen Sie mit Ihrer behandelnden Ärztin oder Ihrem Arzt."
  },
  {
    "question": "Warum wird das Knie bei Arthrose im Stehen geröntgt?",
    "answer": "Im Stehen trägt das Knie das Körpergewicht, so wie im Alltag. Dadurch lässt sich der Gelenkspalt realistischer beurteilen als im Liegen. Welche Aufnahmen gemacht werden, richtet sich nach der Fragestellung und der Zuweisung."
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

export const REVIEW = "BEANTWORTET (Peter, 21.10.2026): IB-Lab-Module im Einsatz; Fuß, Knie und Becken bei diesen Fragestellungen im Stehen; Kalibrierkugel wird verwendet; Ganzbeinaufnahmen werden gemacht; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig. Text entsprechend angepasst. Übrige Punkte weiter offen: Vor Veröffentlichung durch die Praxis zu bestätigen: (1) Start von KOALA im Echtbetrieb „ab Oktober 2026“ und ob KOALA bei allen passenden Knieaufnahmen automatisch läuft („bei passenden Aufnahmen läuft die Auswertung im Hintergrund“). (2) Aufnahmetechnik: Wird das Knie bei Arthrose-Fragestellungen standardmäßig im Stehen geröntgt oder nur, wenn auf der Zuweisung angegeben? Text formuliert vorsichtig „üblicherweise im Stehen“ / „was auf der Zuweisung angegeben ist“. Laut Hersteller-Zweckbestimmung (CE-Seite) ist KOALA für Stehendaufnahmen (standing, fixed-flexion) gedacht – passt die Technik der Praxis (z. B. a.p. gestreckt vs. Rosenberg/fixed-flexion) dazu? (3) Erscheint der KOALA-Bericht oder der KL-Grad im Befund bzw. im Portal/ELGA für Patientinnen und Patienten sichtbar? Text sagt nur, dass die Radiologin/der Radiologe die Messungen prüft und den Befund erstellt. (4) Platzhalter KI-KOALA-01: Es liegt noch kein KOALA-Report vor; Beispielbericht des Herstellers (Demo-Datensatz) besorgen, Zuschnitt laut MEDIA. (5) Studie Nehrer et al. 2021: Leserstudie an 124 OAI-Studienbildern, retrospektiv; Mitautoren vermutlich aus dem Umfeld des Herstellers (Interessenkonflikte nicht geprüft) – nur qualitativ zitiert, ohne Prozentzahlen. Die externe Validierung Brejnebøl 2022 betrifft ein anderes Produkt (Radiobotics) und wurde bewusst nicht verwendet. (6) Berufsbezeichnung „Radiologietechnologin/Radiologietechnologe“ im Ablauf passend? (7) Pflichtfeld „Medizinisch geprüft von Dr. [NAME] – Stand [DATUM]“ ergänzen; Autor offen. (8) CTA-Label „Knieschmerzen abklären – Röntgen mit Zuweisung“ als Export CTA_LABEL – im Code einbinden (Ziel /roentgen-graz bzw. #region-knie).";


export const TITLE = "Kniearthrose objektiv beurteilen: Wie IB Lab KOALA hilft";
