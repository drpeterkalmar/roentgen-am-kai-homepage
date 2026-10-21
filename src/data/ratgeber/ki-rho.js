// Ratgeber-Artikel „Knochengesundheit im Blick: KI-Screening mit Rho“
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
// Leitplanken: Rho ist keine Osteoporosediagnose, kein Frakturrisiko-Rechner, kein DEXA-Ersatz. Keine Herstellerwerbezahlen
// (AUC 0,93, „90 % bestätigt“, 62.023 Bilder, „98 %“ im Beispielreport). Nicht „jedes Röntgen wird untersucht“.
// Zusatzanalyse kostenlos (Praxis 21.10.2026); DEXA-Kosten/Kassen nur per Link /knochendichtemessung-graz#kosten.
// Interne Schwelle (Score, DEXA-Zeitraum) NICHT nennen. Bestätigt (Peter 21.10.2026 abends): Rho-Bericht sieht nur die
// Radiologin/der Radiologe, Hinweis steht nur bei auffälligem Wert im Befund; Rho kennt nur DEXA-Messungen im eigenen Haus;
// Auswertung lokal in der Praxis. Schreibweise „Rho“ (ohne ™); Hersteller 16 Bit (Toronto), Vertrieb IB Lab.
// Altersgrenze „ab 50“ laut IFU Rev. 1.0 (17.08.2026): „patients aged 50 years and older“.
// [geteilt] Metadaten; Text und Bildtexte: ki-rho.content.js

export const DESCRIPTION = "Osteoporose-Screening in Graz: Wie die KI-Software Rho geeignete Röntgenbilder ab 50 auf niedrige Knochendichte prüft und warum DEXA die Messmethode bleibt.";

export const EXCERPT = "Bei Personen ab 50 kann die Software Rho geeignete Röntgenbilder zusätzlich auf Hinweise für eine niedrige Knochendichte prüfen. Was der Score aussagt und warum er DEXA nicht ersetzt.";

export const FAQ = [
  {
    "question": "Wird für Rho eine zusätzliche Röntgenaufnahme gemacht?",
    "answer": "Nein. Rho wertet nur Aufnahmen aus, die ohnehin aus medizinischen Gründen angefertigt wurden. Durch die Analyse entsteht daher keine zusätzliche Strahlenbelastung. Die Zusatzanalyse ist für Sie kostenlos."
  },
  {
    "question": "Wird jedes Röntgenbild mit Rho ausgewertet?",
    "answer": "Nein. In Frage kommen nur geeignete Frontalaufnahmen von Personen ab 50 nach den Kriterien der Praxis, etwa von Wirbelsäule, Brustkorb, Becken, Knie oder Hand. Andere Aufnahmen werden nicht analysiert."
  },
  {
    "question": "Was bedeutet ein hoher Rho-Score?",
    "answer": "Der Score von 1 bis 10 gibt laut Hersteller an, wie wahrscheinlich eine niedrige Knochendichte ist, also ein T-Wert unter −1 in der DEXA-Messung. Je höher der Wert, desto wahrscheinlicher. Er ist aber keine Messung und nennt keinen T-Wert."
  },
  {
    "question": "Habe ich Osteoporose, wenn im Befund ein Rho-Hinweis steht?",
    "answer": "Nicht unbedingt. Ein Hinweis ist keine Diagnose, sondern ein Anlass für eine ärztliche Beurteilung. Ob eine Knochendichtemessung sinnvoll ist, besprechen Sie mit Ihrer Ärztin oder Ihrem Arzt."
  },
  {
    "question": "Ersetzt Rho die Knochendichtemessung mit DEXA?",
    "answer": "Nein. DEXA bleibt die wissenschaftlich etablierte Standard- und Referenzmethode zur Messung der Knochendichte. Rho berechnet auch kein Risiko für Knochenbrüche."
  },
  {
    "question": "Steht kein Hinweis im Befund – sind meine Knochen dann gesund?",
    "answer": "Das lässt sich daraus nicht ableiten. Vielleicht war die Aufnahme nicht geeignet, oder der Score lag unter der Schwelle für einen Hinweis. Bei Risikofaktoren für Osteoporose ist ein Gespräch mit Ihrer Ärztin oder Ihrem Arzt sinnvoll."
  }
];

export const REVIEW = "BEANTWORTET (Peter, 21.10.2026 abends): ausgewertet wird, was die Software als geeignet annimmt (Text bleibt „geeignete Aufnahmen“); Rho kennt nur DEXA-Messungen im eigenen Haus → Satz „Befund mitbringen oder erwähnen“ ergänzt (interne Schwelle bleibt unveröffentlicht); Rho-Bericht sieht nur die Radiologin/der Radiologe, Hinweis steht nur bei auffälligem Wert im Befund; Altersgrenze „ab 50“ laut IFU Rev. 1.0 (17.08.2026); Auswertung lokal, keine Übertragung an Hersteller/Dritte; Zusatzanalyse kostenlos; Schreibweise „Rho“, Hersteller 16 Bit (Toronto), Vertrieb IB Lab (auch dexa.js); Studienaussagen freigegeben; keine zusätzliche Strahlenbelastung bestätigt; Bildplatz KI-RHO-02 vorerst aus dem Text genommen; Autor und Prüfvermerk Priv.-Doz. Dr. Peter Kalmar.\nOffen:\n1. Herstellerunterlagen (IFU, Softwareversion, CE/MDR) bei IB Lab angefragt.\n2. Demo-Bericht (KI-RHO-02) bei IB Lab angefragt – nach Eingang Bildplatz `<!--media:report-->` wieder einsetzen (Briefing unten in MEDIA.report).\n3. CE-Kennzeichnung auf der Seite erwähnen? – Georg fragen.";


export const TITLE = "Knochengesundheit im Blick: KI-Screening mit Rho";

export const UPDATED = "2026-10-21";
