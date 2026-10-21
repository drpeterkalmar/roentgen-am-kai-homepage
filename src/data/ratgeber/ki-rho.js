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
// [geteilt] Metadaten; Text und Bildtexte: ki-rho.content.js

export const DESCRIPTION = "Osteoporose-Screening in Graz: Wie die KI-Software RHO geeignete Röntgenbilder ab 50 auf niedrige Knochendichte prüft und warum DEXA die Messmethode bleibt.";

export const EXCERPT = "Bei Personen ab 50 kann die Software RHO geeignete Röntgenbilder zusätzlich auf Hinweise für eine niedrige Knochendichte prüfen. Was der Score aussagt und warum er DEXA nicht ersetzt.";

export const FAQ = [
  {
    "question": "Wird für RHO eine zusätzliche Röntgenaufnahme gemacht?",
    "answer": "Nein. RHO wertet nur Aufnahmen aus, die ohnehin aus medizinischen Gründen angefertigt wurden. Durch die Analyse entsteht daher keine zusätzliche Strahlenbelastung."
  },
  {
    "question": "Wird jedes Röntgenbild mit RHO ausgewertet?",
    "answer": "Nein. In Frage kommen nur geeignete Frontalaufnahmen von Personen ab 50 nach den Kriterien der Praxis, etwa von Wirbelsäule, Brustkorb, Becken, Knie oder Hand. Andere Aufnahmen werden nicht analysiert."
  },
  {
    "question": "Was bedeutet ein hoher RHO-Score?",
    "answer": "Der Score von 1 bis 10 gibt laut Hersteller an, wie wahrscheinlich eine niedrige Knochendichte ist, also ein T-Wert unter −1 in der DEXA-Messung. Je höher der Wert, desto wahrscheinlicher. Er ist aber keine Messung und nennt keinen T-Wert."
  },
  {
    "question": "Habe ich Osteoporose, wenn im Befund ein RHO-Hinweis steht?",
    "answer": "Nicht unbedingt. Ein Hinweis ist keine Diagnose, sondern ein Anlass für eine ärztliche Beurteilung. Ob eine Knochendichtemessung sinnvoll ist, besprechen Sie mit Ihrer Ärztin oder Ihrem Arzt."
  },
  {
    "question": "Ersetzt RHO die Knochendichtemessung mit DEXA?",
    "answer": "Nein. DEXA bleibt die wissenschaftlich etablierte Standard- und Referenzmethode zur Messung der Knochendichte. RHO berechnet auch kein Risiko für Knochenbrüche."
  },
  {
    "question": "Steht kein Hinweis im Befund – sind meine Knochen dann gesund?",
    "answer": "Das lässt sich daraus nicht ableiten. Vielleicht war die Aufnahme nicht geeignet, oder der Score lag unter der Schwelle für einen Hinweis. Bei Risikofaktoren für Osteoporose ist ein Gespräch mit Ihrer Ärztin oder Ihrem Arzt sinnvoll."
  }
];

export const REVIEW = "VORLÄUFIGE FASSUNG (Stand 21.10.2026) – vor Veröffentlichung durch die Praxis zu bestätigen:\n1. Originalunterlagen anfordern (Gebrauchsanweisung/IFU 16bit.ai/rho/ifu, Softwareversion, EU-Konformität/CE-Kennzeichnung nach MDR). Die Herstellerseiten nennen nur Health Canada und FDA De Novo; ein EU-Zulassungsstatus wird im Text deshalb NICHT erwähnt.\n2. Welche Aufnahmen die Praxis tatsächlich auswertet (LWS, BWS, Thorax, Becken, Knie, Hand/Handgelenk – alle oder nur ein Teil?). Text sagt bewusst „geeignete Aufnahmen nach den Kriterien der Praxis“ und listet nur, was laut Hersteller in Frage kommt.\n3. INTERNE Praxisregel (nicht öffentlich, steht NICHT im Text): Hinweis im Befund ab RHO-Score 7, wenn keine DEXA in den letzten 2 Jahren. Bitte bestätigen, dass Schwellenwert und DEXA-Zeitraum so im System konfiguriert sind (Hersteller: Schwelle und Zeitraum frei einstellbar; in der Toronto-Studie galt Score ≥ 6 als positiv). Prüft Rho nur DEXA-Untersuchungen im eigenen Haus („im untersuchenden Zentrum“)? Text formuliert allgemein „nicht vor Kurzem eine Knochendichtemessung“.\n4. Text behauptet NICHT, dass der Hinweis automatisch im Befund steht („die Radiologin bzw. der Radiologe entscheidet …“). Bitte bestätigen, dass der Rho-Report nur der Radiologin/dem Radiologen angezeigt wird und nicht automatisch an Zuweiser/ELGA geht.\n5. Altersgrenze: Herstellerseite schreibt teils „ab 50“, teils „über 50 Jahren“ – IFU prüfen. Text: „ab 50“.\n6. Werden Patient:innen vorab über die Zusatzanalyse informiert (Aushang, Aufklärung), gibt es ein Widerspruchsrecht? Datenverarbeitung (lokal oder Cloud, Auftragsverarbeitung) ist nicht im Text – ggf. Datenschutzerklärung ergänzen.\n7. Ob die Zusatzanalyse für Patient:innen kostenfrei ist, steht bewusst nicht im Text (Kosten nur via Link /knochendichtemessung-graz#kosten für DEXA).\n8. Schreibweise vereinheitlichen: Artikel „RHO“ (wie H1), Hersteller „Rho™“, Knochendichte-Seite „Rho“. Zudem nennt src/data/dexa.js als vendor „ImageBiopsy Lab“; Hersteller ist 16 Bit Inc., IB Lab ist Vertrieb (so im Artikel) – dexa.js ggf. angleichen (nicht Teil dieses Auftrags).\n9. Studienaussagen ärztlich freigeben: „rund drei von vier“ = PPV 74 % bei nur 125 von 655 Rho-positiven Personen mit DEXA (Jayarajah 2026); Interessenkonflikte: Syme 2026 (Autor:innen bei 16 Bit angestellt/beteiligt, Bilbily und Cicero auch Autoren der Entwicklungsstudie); Toronto-Studie gefördert u. a. von CanHealth und Amgen Canada. Herstellerwerbezahlen (AUC 0,93; 90 % bestätigt; 62.023 Bildpaare; 98 % im Beispielreport) bewusst weggelassen.\n10. Strahlenschutz-Satz „Durch die Analyse entsteht keine zusätzliche Strahlenbelastung“ bestätigen.\n11. Beispielreport (KI-RHO-02): Original-Demodatei und Nutzungsrecht beim Hersteller/IB Lab anfordern; Panel „Clinical Study Results“ mit Herstellerstatistik nicht zeigen.\n12. Medizinische Prüfung/Autor und Freigabedatum eintragen.";


export const TITLE = "Knochengesundheit im Blick: KI-Screening mit RHO";

export const UPDATED = "2026-10-21";
