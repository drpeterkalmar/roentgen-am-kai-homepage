// Ratgeber-Artikel „Knochenalter bestimmen: Wie KI die Auswertung unterstützt“ (IB Lab PANDA). Stand 21.10.2026.
// URL: /ratgeber/knochenalter-bestimmen-ki · SEO-Titel: „Knochenalter bei Kindern bestimmen | Röntgen Graz“
// Hauptkeyword: Knochenalter bestimmen Graz; Nebenkeywords: Knochenalter Röntgen Hand, Wachstumspotenzial Kind,
// Greulich Pyle, KI Radiologie.
// Quellen (alle selbst geprüft, 21.10.2026):
//   - Greulich & Pyle, Radiographic Atlas of Skeletal Development of the Hand and Wrist, 2. Aufl., Stanford University Press 1959 (Buch, keine DOI)
//   - Bayley & Pinneau, J Pediatr 1952;40(4):423–441, doi:10.1016/S0022-3476(52)80205-7 (PubMed 14918032, Crossref)
//   - Gaskin, Kahn, Bertozzi, Bunch, Skeletal Development of the Hand and Wrist, Oxford University Press 2011, doi:10.1093/med/9780199782055.001.0001 (Crossref)
//   - Gräfe et al., Eur Radiol 2024;34(7):4407–4413, doi:10.1007/s00330-023-10543-0 (Validierung IB Lab PANDA, 306 Kinder, Leipzig;
//     Interessenkonflikt: Chung und DiFranco bei IB Lab angestellt). Nur qualitativ zitiert, keine Kennzahlen übernommen.
//   - Herstellerseite IB Lab PANDA CE (imagebiopsy.com/product/panda-ce): Funktionsumfang, Zweckbestimmung.
// Leitplanken: keine Zeit-/Genauigkeitszahlen aus Herstellerwerbung („6,2 Sekunden“, „±4,2 Monate“ bewusst NICHT übernommen);
// KI misst und standardisiert, stellt keine Diagnose; Größenschätzung = Schätzung mit Unsicherheit, keine individuelle Prognose;
// Beispielbericht = Demo-Datensatz des Herstellers, Werte werden nicht bewertet; Strahlenschutz ohne Dosiszahlen.
// Praxis (Peter 21.10.2026 abends): PANDA wertet alle Knochenalter-Aufnahmen aus; sitzend, linke Hand flach, Finger leicht
// gespreizt; Eltern können mit Schutzschürze im Raum bleiben; Körpergröße wird erfragt oder gemessen und steht mit der
// Größenschätzung im Befund. Altersbereich bleibt allgemein (IFU-Bereich bei IB Lab angefragt).
// [geteilt] Metadaten; Text und Bildtexte: ki-panda.content.js

export const DESCRIPTION = "Knochenalter bestimmen in Graz: Röntgen der linken Hand, Auswertung nach Greulich und Pyle mit KI-Unterstützung und ärztlichem Befund. Ablauf und Grenzen.";

export const EXCERPT = "Ein Röntgenbild der linken Hand zeigt, wie weit das Skelett eines Kindes entwickelt ist. Wann die Untersuchung sinnvoll ist, wie sie abläuft und wie KI bei der Auswertung hilft.";

export const FAQ = [
  {
    "question": "Braucht mein Kind für das Knochenalter-Röntgen eine Zuweisung?",
    "answer": "Ja, für das Röntgen der Hand braucht es eine ärztliche Zuweisung und die e-card. Bei Röntgen am Kai ist die Aufnahme während der Röntgenzeiten ohne Termin möglich. Eine Wunschzeit kann reserviert werden."
  },
  {
    "question": "Muss sich mein Kind vorbereiten, und tut die Untersuchung weh?",
    "answer": "Eine Vorbereitung ist nicht nötig, Schmuck und Uhr an der linken Hand werden vorher abgenommen. Ihr Kind sitzt, die linke Hand liegt flach auf der Bildplatte und muss nur für einen kurzen Moment stillgehalten werden. Die Aufnahme tut nicht weh. Eltern können mit einer Schutzschürze im Raum bleiben."
  },
  {
    "question": "Kann man aus dem Knochenalter genau sagen, wie groß mein Kind wird?",
    "answer": "Nein. Die Größenschätzung nach Bayley und Pinneau ist eine Schätzung mit Unsicherheit und keine garantierte Vorhersage. Sie wird immer zusammen mit dem Wachstumsverlauf und der ärztlichen Untersuchung beurteilt."
  },
  {
    "question": "Entscheidet die KI über das Ergebnis?",
    "answer": "Nein. Die Software wertet die Aufnahme standardisiert nach Greulich und Pyle aus und erstellt einen Bericht. Die Radiologin bzw. der Radiologe prüft das Ergebnis, kann es korrigieren und erstellt den ärztlichen Befund."
  },
  {
    "question": "Wer bespricht das Ergebnis mit uns?",
    "answer": "Befund und Bilder gehen an die zuweisende Ärztin bzw. den zuweisenden Arzt und sind zusätzlich über ELGA und portal.marc.at verfügbar. Die Besprechung und mögliche weitere Schritte übernimmt die zuweisende Ärztin bzw. der zuweisende Arzt, bei Bedarf gemeinsam mit Fachleuten für Kinderheilkunde oder Endokrinologie."
  }
];

export const REVIEW = "BEANTWORTET (Peter, 21.10.2026 abends): PANDA wertet alle Knochenalter-Aufnahmen aus; Lagerung sitzend, linke Hand dorsopalmar flach, Finger leicht gespreizt; Eltern können mit Schutzschürze im Raum bleiben; Körpergröße wird erfragt oder gemessen und steht mit der Größenschätzung im Befund; Altersbereich bleibt allgemein; keine Zeit-/Genauigkeitszahlen; Bildfreigabe IB Lab nicht nötig; target Röntgen ok; Autor und Prüfvermerk Priv.-Doz. Dr. Peter Kalmar. Text entsprechend angepasst.\nOffen:\n1. (7) Kinder ohne Termin: Mindestalter, Wartezeiten, Begleitperson – unbeantwortet, Text bleibt allgemein.\n2. Herstellerunterlagen (IFU inkl. Altersbereich, Version, CE) bei IB Lab angefragt; Vorgehen außerhalb des Altersbereichs nicht auf der Seite.\n3. CE-Kennzeichnung auf der Seite erwähnen? – Georg fragen.";


export const TITLE = "Knochenalter bestimmen: Wie KI die Auswertung unterstützt";
