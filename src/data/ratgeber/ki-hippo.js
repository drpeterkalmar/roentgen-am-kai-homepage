// Ratgeber-Artikel „KI-Hüftvermessung mit IB Lab HIPPO“ – Stand: 22.10.2026.
// Abgleich mit IFU HIPPO 2.0 + DoC (MDR 2017/745, Klasse IIa nach Regel 11, Benannte Stelle 0123) vom 22.10.2026
// (CE/Klasse/Version NICHT auf der Seite – Entscheidung Georg offen).
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
    "answer": "Die Farbe zeigt, dass der Wert außerhalb des in der Software hinterlegten Referenzbereichs aus der Fachliteratur liegt. Für manche Werte, etwa das Offset, gibt es keinen solchen Bereich. Die Markierung ist ein Hinweis zum genauen Hinsehen, aber keine Diagnose. Was der Wert für Sie bedeutet, besprechen Sie mit Ihrer behandelnden Ärztin oder Ihrem behandelnden Arzt."
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
    "answer": "Nicht ganz. Auf der Beckenübersicht wird der Längenunterschied am kleinen Rollhügel (Trochanter minor) gemessen, einem Knochenvorsprung nahe der Hüfte. Unterschiede am Ober- oder Unterschenkel und die Beinachse zeigt erst eine Ganzbeinaufnahme im Stehen, falls Ihre Ärztin oder Ihr Arzt diese zuweist."
  }
];

export const REVIEW = "BEANTWORTET (Georg Riegler, Mail 23.10.2026): „Texte passen. Entferne das medizinisch geprüft.“ → Prüfvermerk auf dieser Seite ganz entfernt (KI_NO_REVIEW_NOTE in kiSeries.js); CE-Erwähnung: Ja → „CE-gekennzeichnetes Medizinprodukt“ im Artikelkopf, ohne Version/Klasse/Prüfstelle.\nBEANTWORTET (Peter, 22.10.2026): HIPPO läuft in der Vollversion (alle beschriebenen Werte inkl. Offset, Pfannenwinkel, Kopfdurchmesser, Beinlängendifferenz). Die KI rechnet bei jeder passenden Aufnahme automatisch mit → Text: „Die Software wertet jede passende Aufnahme automatisch aus.“ Außerhalb der Zweckbestimmung (unter 18, Metall, nach Bruch …): Messung von Hand, KI-Bericht wird nicht verwendet → Text. Stimmt ein KI-Wert nicht: selbst nachgemessen, im Befund steht der ärztliche Wert (Bericht nicht änderbar) → Text („kann ihn korrigieren“ und „verwirft“ ersetzt). Kontrollen nach Hüftprothese ebenfalls im Stehen → Text. Der Bericht kommt ins Archiv, in ELGA und an die Zuweiser → passiver Satz „Der Messbericht wird mit den Bildern archiviert …, ebenso über ELGA.“ (keine Aufforderung an Patienten). Kalibrierkugel nur „bei Aufnahmen zur Planung einer Hüftoperation“ → Text; sonst voreingestellter Faktor mit Hinweis im Bericht (stand schon in den Grenzen). Bildtext/Alt-Text Folie 2 beschreiben die Kugel im Demo-Bild und bleiben.\nBEANTWORTET (Herstellerunterlagen IB Lab, 22.10.2026): Gebrauchsanweisung IB Lab HIPPO 2.0 (Dokument 2.0.0 vom 02.09.2026) und Konformitätserklärung (16.09.2026): MDR 2017/745, Klasse IIa nach Regel 11, Benannte Stelle TÜV SÜD 0123, gilt für Version 2.0.x. Zweckbestimmung: AP-Röntgenaufnahmen von Hüfte oder Becken (Beckenübersicht oder einzelne Hüfte) bei Erwachsenen mit Verdacht auf oder Diagnose von Hüftdysplasie, femoroacetabulärem Impingement oder Arthrose; ausdrücklich nicht unter 18 Jahren; Ergebnisse müssen von radiologisch ausgebildetem Fachpersonal geprüft werden. Postoperative Aufnahmen nach Hüft-Totalendoprothese sind laut IFU abgedeckt (Prothese wird automatisch erkannt; Pfanneninklination, Pfannenversion nach Lewinnek, femorales/acetabuläres/Gesamt-Offset, Kopfdurchmesser, CCD am Prothesenhals, Beinlängendifferenz am Trochanter minor) – der Slide „Nach einer Hüftprothese“ und der Abschnitt dazu stimmen damit überein. Ungenaue Pfannenmessung bei Pfannendachschale (Cage), asymmetrischer Pfanne, Hemiarthroplastik, Keramikinlay (stand schon im Text). Kontraindikationen laut IFU: unter 18, Frakturen, Fixateur externe, stark degenerierter Hüftkopf/avaskuläre Nekrose, Hüft-Spacer, Morbus Perthes, Sarkome/abnormes Knochenwachstum, seltene Erkrankungen wie Achondroplasie – jetzt im Text. Beckenschiefstand ist bei Aufnahmen im Liegen laut IFU nicht verwertbar (passt zu „im Stehen“). Lagerung: Beine 15–20° innenrotiert, Becken nicht verkippt (ehem. Punkt 5 erledigt). Kalibrierung: Kugel; wird sie nicht erkannt, fester bzw. Standard-Vergrößerungsfaktor mit Hinweis im Bericht; Skalierung muss ärztlich auf Plausibilität geprüft werden. Referenzbereiche aus der Literatur, Abweichungen orange markiert; für Offsets und Kopfdurchmesser kein Referenzbereich. Plausibilitätsprüfung/Verwerfen einzelner Werte durch die Radiologin bzw. den Radiologen ist in der IFU so vorgesehen (ehem. Punkt 7 erledigt). Frühere Peter-Antworten (21.10.2026: im Einsatz, im Stehen, Kalibrierkugel [KORRIGIERT 22.10.2026: Kalibrierkugel nur bei Hüfte zur OP-Planung und Fernröntgen Zahn], Ganzbeinaufnahmen) eingearbeitet. KORRIGIERT: Beckenschiefstand in mm wird immer ausgegeben (vorher „nur wenn kalibriert“); Beinlängendifferenz-Messpunkt = Trochanter minor; acetabuläres Offset bezogen auf die Tränenfigur; Referenzbereich nur „bei den meisten“ Werten; Altersgrenze 18 und Kontraindikationen ergänzt; Arthrose als Fragestellung ergänzt. CE-Kennzeichnung, Klasse und Version bewusst NICHT auf der Seite (Entscheidung Georg offen).\nOFFEN – Fragen an die Praxis: (1) Bildtext Folie 1 sagt „Beckenübersicht im Stehen“ – ist das für den Demo-Datensatz belegt? Sonst „im Stehen“ dort streichen. (2) Medizinische Freigabe und Autor (author) durch die Praxis. (3) CE-Kennzeichnung/Klasse/Version auf der Seite erwähnen? Entscheidung Georg – bis dahin nicht im Text. HINWEISE: Freigabe der Demo-Berichte durch IB Lab laut Peter (21.10.2026) nicht nötig, Personendaten laut Sichtung nicht vorhanden. EndoCert bewusst nicht erwähnt (Zertifizierung von Endoprothetikzentren, für Patientinnen und Patienten ohne Mehrwert). Studie Schwarz 2023 betrifft HIPPO 1.03 (frühere Version) – so formuliert, keine Zahlen übernommen; Leistungs- und Genauigkeitsangaben der IFU bewusst nicht übernommen.";


export const TITLE = "Hüfte präzise vermessen: Wie IB Lab HIPPO unterstützt";
