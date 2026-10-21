// Ratgeber-Artikel „KI-Hüftvermessung mit IB Lab HIPPO“ – Stand 21.10.2026.
// URL /ratgeber/ki-hueftvermessung-hippo · SEO-Titel „KI-Hüftvermessung und Hüftprothese | Graz“
// Hauptkeyword: Hüftvermessung Röntgen Graz · Nebenkeywords: Hüftprothese Kontrolle, Beinlängendifferenz,
// Beckenröntgen, KI Radiologie.
// Quellen (selbst geprüft): Herstellerseite IB Lab HIPPO + Release-Notiz HIPPO 2.0 (imagebiopsy.com),
// Schwarz et al. 2023 (Int Orthop, doi:10.1007/s00264-023-05722-z), Tannast et al. 2007 (AJR,
// doi:10.2214/AJR.06.0921), Lewinnek et al. 1978 (JBJS Am, doi:10.2106/00004623-197860020-00014).
// Leitplanken: KI misst/markiert/standardisiert, keine Diagnose, keine OP- oder Therapieentscheidung,
// jede Messung ärztlich geprüft; keine Herstellerwerbezahlen (Sekunden, Genauigkeit, Faktor);
// Beispielberichte = Demo-Datensätze verschiedener Personen, kein Vorher-nachher-Vergleich, Werte nicht bewerten.
// EndoCert bewusst weggelassen (Zertifikat für Endoprothetikzentren, für Patient:innen dieser Praxis ohne Nutzen).
// [geteilt] Metadaten; Text und Bildtexte: ki-hippo.content.js

export const DESCRIPTION = "Hüftvermessung per Röntgen in Graz: Wie IB Lab HIPPO Winkel, Offset und Beinlängendifferenz vor und nach einer Hüftprothese misst – ärztlich geprüft.";

export const EXCERPT = "Vor einer Hüftoperation und bei der Kontrolle einer Hüftprothese zählen Grad und Millimeter. Wie die Software IB Lab HIPPO das Beckenröntgen vermisst und was die Werte in Ihrem Befund bedeuten.";

export const FAQ = [
  {
    "question": "Entscheidet die KI, ob ich eine Hüftprothese brauche?",
    "answer": "Nein. IB Lab HIPPO misst Winkel und Abstände auf dem Röntgenbild und stellt sie übersichtlich dar. Ob eine Operation sinnvoll ist, entscheiden Ihre Orthopädin oder Ihr Orthopäde gemeinsam mit Ihnen, nach Gespräch, Untersuchung und allen Befunden."
  },
  {
    "question": "Was bedeutet es, wenn ein Wert im Bericht farbig markiert ist?",
    "answer": "Die Farbe zeigt, dass der Wert außerhalb des in der Software hinterlegten Referenzbereichs liegt. Das ist ein Hinweis zum genauen Hinsehen, aber keine Diagnose. Was der Wert für Sie bedeutet, besprechen Sie mit Ihrer behandelnden Ärztin oder Ihrem behandelnden Arzt."
  },
  {
    "question": "Brauche ich für das Beckenröntgen einen Termin?",
    "answer": "Röntgen ist bei Röntgen am Kai mit gültiger ärztlicher Zuweisung und e-card während der Röntgenzeiten ohne Termin möglich. Wenn Sie lieber zu einer fixen Zeit kommen, kann eine Wunschzeit reserviert werden."
  },
  {
    "question": "Bekomme ich durch die KI-Auswertung mehr Strahlung ab?",
    "answer": "Nein. Die Software wertet das Röntgenbild aus, das für Ihre Fragestellung ohnehin angefertigt wird. Für die Vermessung selbst ist keine zusätzliche Aufnahme nötig."
  },
  {
    "question": "Zeigt das Beckenröntgen meine gesamte Beinlängendifferenz?",
    "answer": "Nicht ganz. Auf der Beckenübersicht wird der Längenunterschied an Knochenpunkten nahe der Hüfte gemessen. Unterschiede am Ober- oder Unterschenkel und die Beinachse zeigt erst eine Ganzbeinaufnahme im Stehen, falls Ihre Ärztin oder Ihr Arzt diese zuweist."
  }
];

export const REVIEW = "BEANTWORTET (Peter, 21.10.2026): IB-Lab-Module im Einsatz; Fuß, Knie und Becken bei diesen Fragestellungen im Stehen; Kalibrierkugel wird verwendet; Ganzbeinaufnahmen werden gemacht; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig. Text entsprechend angepasst. Übrige Punkte weiter offen: Vor Veröffentlichung von der Praxis zu bestätigen: (1) HIPPO ist im Einsatz (Start Oktober 2026) und in Version 2.0 inkl. postoperativem Modul (Pfanne, Offset, Beinlängendifferenz) lizenziert. (2) Bei welchen Aufnahmen läuft HIPPO – automatisch bei jeder Beckenübersicht oder nur bei passender Fragestellung? Text sagt neutral „unterstützt dabei“. (3) Beckenübersicht im Stehen und/oder im Liegen? Text: „je nach Fragestellung“. (4) Wird eine Kalibrierkugel verwendet und wann? Text: „bei manchen Fragestellungen“. (5) Lagerung mit leicht innengedrehten Beinen („üblicherweise“) – entspricht das dem Standard der Praxis? (6) Erhält die zuweisende Stelle den HIPPO-Bericht als Beilage (DICOM/PDF) oder nur die Werte im Befund? Text sagt nichts dazu. (7) Satz „verwirft unpassende Messungen“ – entspricht das dem Ablauf (Korrektur/Verwerfen im Viewer)? (8) Freigabe von IB Lab für die Veröffentlichung der beiden Demo-Berichte; Personendaten auf beiden Bildern laut Sichtung nicht vorhanden. (9) EndoCert bewusst nicht erwähnt (Zertifizierung von Endoprothetikzentren, für Patient:innen ohne Mehrwert). (10) Studie Schwarz 2023 betrifft HIPPO 1.03 (frühere Version) – im Text so formuliert, keine Zahlen übernommen. (11) Medizinische Freigabe und Autor (author) durch die Praxis.";


export const TITLE = "Hüfte präzise vermessen: Wie IB Lab HIPPO unterstützt";
