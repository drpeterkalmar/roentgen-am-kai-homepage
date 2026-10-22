// Ratgeber-Artikel „Knochenalter bestimmen: Wie KI die Auswertung unterstützt“ (IB Lab PANDA). Stand: 22.10.2026.
// Abgleich mit IFU PANDA 1.06 + DoC (MDD 93/42/EWG Klasse I, Regel 12, Selbsterklärung ohne Benannte Stelle, ausgestellt 20.09.2023 – NICHT MDR) vom 22.10.2026.
//   IFU = PANDA-02-01 User Manual CE (DE), Produkt-Erscheinungsdatum 26.09.2022; dazu PANDA-02-02 User Training CE (DE). Vertraulich: nur in eigenen Worten.
//   Zweckbestimmung: Knochenalter nach Greulich & Pyle auf Handröntgen, 36–192 Monate (Mädchen) bzw. 36–204 Monate (Buben), chronologisches Alter.
//   Größenschätzung nach Bayley & Pinneau nur, wenn das Knochenalter in den Prognosetabellen liegt (je nach Geschlecht und Status
//   verzögert/normal/akzeleriert frühestens ab 6–7 J. Knochenalter, obere Grenze 13 J. bis 18 J. 6 M.), und nur mit Körpergröße.
//   PANDA-Ergebnisse sind nicht editierbar (Ärztin/Arzt weicht ggf. im Befund ab). PA-Aufnahme einer Hand; IFU nennt die nicht dominante Hand.
//   Keine CE/Klasse/MDD/Version auf der Seite (Entscheidung Georg offen).
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
//   - Gebrauchsanweisung IB Lab PANDA (deutsch), Stand September 2022 (vom Hersteller 22.10.2026 zur Verfügung gestellt, ohne Link).
// Leitplanken: keine Zeit-/Genauigkeitszahlen aus Herstellerwerbung/IFU („6,2 Sekunden“, „±4,2 Monate“, „±2,5 cm“ bewusst NICHT übernommen);
// KI misst und standardisiert, stellt keine Diagnose; Größenschätzung = Schätzung mit Unsicherheit, keine individuelle Prognose;
// Beispielbericht = Demo-Datensatz des Herstellers, Werte werden nicht bewertet; Strahlenschutz ohne Dosiszahlen.
// Praxis (Peter 21.10.2026 abends): PANDA wertet alle Knochenalter-Aufnahmen aus; sitzend, linke Hand flach, Finger leicht
// gespreizt; Eltern können mit Schutzschürze im Raum bleiben; Körpergröße wird erfragt oder gemessen und steht mit der
// Größenschätzung im Befund. Altersbereich seit 22.10.2026 konkret laut IFU (Mädchen 3–16, Buben 3–17 Jahre).
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
    "answer": "Nein. Die Größenschätzung nach Bayley und Pinneau ist eine Schätzung mit Unsicherheit und keine sichere Vorhersage. Sie ist nur möglich, wenn das Knochenalter in den Tabellen vorkommt, also etwa ab 6 bis 7 Jahren bis ins Jugendalter. Beurteilt wird sie immer zusammen mit dem Wachstumsverlauf und der ärztlichen Untersuchung."
  },
  {
    "question": "Entscheidet die KI über das Ergebnis?",
    "answer": "Nein. Die Software wertet die Aufnahme standardisiert nach Greulich und Pyle aus und erstellt einen Bericht. Die Radiologin bzw. der Radiologe prüft das Ergebnis, kann im Befund davon abweichen und erstellt den ärztlichen Befund."
  },
  {
    "question": "Wer bespricht das Ergebnis mit uns?",
    "answer": "Befund und Bilder gehen an die zuweisende Ärztin bzw. den zuweisenden Arzt und sind zusätzlich über ELGA und portal.marc.at verfügbar. Die Besprechung und mögliche weitere Schritte übernimmt die zuweisende Ärztin bzw. der zuweisende Arzt, bei Bedarf gemeinsam mit Fachleuten für Kinderheilkunde oder Endokrinologie."
  }
];

export const REVIEW = "BEANTWORTET (Herstellerunterlagen IB Lab, 22.10.2026): Gebrauchsanweisung PANDA 1.06 (Stand 09/2022), Schulungsunterlage und Konformitätserklärung liegen vor. Zweckbestimmung: vollautomatische Unterstützung der Knochenalter-Schätzung nach Greulich & Pyle auf dem Handröntgen, für Kinder von 36 bis 192 Monaten (Mädchen) bzw. 36 bis 204 Monaten (Buben) → auf der Seite jetzt „ab 3 Jahren, bei Mädchen bis 16 und bei Buben bis 17 Jahre“ statt „etwa vom dritten Lebensjahr bis ins Jugendalter“. Größenschätzung nach Bayley & Pinneau nur, wenn das Knochenalter in den Prognosetabellen liegt (getrennt nach Geschlecht und verzögert/normal/beschleunigt; frühestens ab 6–7 Jahren Knochenalter, obere Grenze je nach Tabelle 13 bis 18½ Jahre) → im Text vereinfacht „etwa ab 6 bis 7 Jahren bis ins Jugendalter“, ebenso FAQ 3. PANDA-Ergebnisse sind laut IFU nicht editierbar → „kann im Befund davon abweichen“ statt „kann es korrigieren“ (Text und FAQ 4). Software gleicht schlechte Bildqualität, Lagerung, Verletzungs-/OP-Folgen und Fehlbildungen nicht aus → im Text. Konformität laut DoC: MDD 93/42/EWG, Klasse I (Regel 12), Selbsterklärung ohne Benannte Stelle, ausgestellt 20.09.2023 – noch nicht MDR; steht bewusst NICHT auf der Seite. Erledigt: bisheriger Punkt 2 (IFU, Altersbereich, Version). „keine garantierte Vorhersage“ → „keine sichere Vorhersage“ (Wortliste).\nWeiterhin gültig (Peter, 21.10.2026 abends): Lagerung sitzend, linke Hand flach, Finger leicht gespreizt; Eltern können mit Schutzschürze im Raum bleiben; Körpergröße wird erfragt oder gemessen und steht mit der Größenschätzung im Befund; keine Zeit-/Genauigkeitszahlen; Bildfreigabe IB Lab nicht nötig; target Röntgen ok; Autor und Prüfvermerk Priv.-Doz. Dr. Peter Kalmar.\nOffen:\n1. (7) Kinder ohne Termin: Mindestalter, Wartezeiten, Begleitperson – unbeantwortet, Text bleibt allgemein.\n2. NEU: Wie bestimmen Sie das Knochenalter bei Kindern unter 3 Jahren bzw. bei Mädchen ab 16 und Buben ab 17 Jahren (außerhalb der Zweckbestimmung; die Software rechnet dort teils noch, aber ohne Validierung und ohne Streubereich) – manuell nach Greulich & Pyle ohne PANDA? Darf das auf die Seite? Bis zur Antwort steht dazu nichts im Text; „bei allen Knochenalter-Aufnahmen“ wurde zu „bei Knochenalter-Aufnahmen“.\n3. NEU: Wenn PANDA keine Größenschätzung liefert (Knochenalter außerhalb der Bayley-Pinneau-Tabellen, z. B. jünger als 6–7 Jahre Knochenalter): Schätzen Sie die Erwachsenengröße dann manuell oder gar nicht? (Nicht auf der Seite.)\n4. NEU: Die Gebrauchsanweisung verlangt die nicht dominante Hand. Wird bei linkshändigen Kindern trotzdem die linke Hand geröntgt? Der Satz „egal, ob ein Kind Rechts- oder Linkshänder ist“ ist bis zur Antwort gestrichen.\n5. CE-Kennzeichnung auf der Seite erwähnen? – Georg fragen. Achtung: PANDA 1.06 ist nur nach MDD Klasse I selbst erklärt (nicht MDR wie LAMA/HIPPO/FROG/SQUIRREL); vor einer Erwähnung bei IB Lab den aktuellen Status nach MDR klären.";


export const TITLE = "Knochenalter bestimmen: Wie KI die Auswertung unterstützt";
