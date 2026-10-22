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

export const REVIEW = "BEANTWORTET (Herstellerunterlagen IB Lab, 22.10.2026): Gebrauchsanweisung IB Lab HIPPO 2.0 (Dokument 2.0.0 vom 02.09.2026) und Konformitätserklärung (16.09.2026): MDR 2017/745, Klasse IIa nach Regel 11, Benannte Stelle TÜV SÜD 0123, gilt für Version 2.0.x. Zweckbestimmung: AP-Röntgenaufnahmen von Hüfte oder Becken (Beckenübersicht oder einzelne Hüfte) bei Erwachsenen mit Verdacht auf oder Diagnose von Hüftdysplasie, femoroacetabulärem Impingement oder Arthrose; ausdrücklich nicht unter 18 Jahren; Ergebnisse müssen von radiologisch ausgebildetem Fachpersonal geprüft werden. Postoperative Aufnahmen nach Hüft-Totalendoprothese sind laut IFU abgedeckt (Prothese wird automatisch erkannt; Pfanneninklination, Pfannenversion nach Lewinnek, femorales/acetabuläres/Gesamt-Offset, Kopfdurchmesser, CCD am Prothesenhals, Beinlängendifferenz am Trochanter minor) – der Slide „Nach einer Hüftprothese“ und der Abschnitt dazu stimmen damit überein. Ungenaue Pfannenmessung bei Pfannendachschale (Cage), asymmetrischer Pfanne, Hemiarthroplastik, Keramikinlay (stand schon im Text). Kontraindikationen laut IFU: unter 18, Frakturen, Fixateur externe, stark degenerierter Hüftkopf/avaskuläre Nekrose, Hüft-Spacer, Morbus Perthes, Sarkome/abnormes Knochenwachstum, seltene Erkrankungen wie Achondroplasie – jetzt im Text. Beckenschiefstand ist bei Aufnahmen im Liegen laut IFU nicht verwertbar (passt zu „im Stehen“). Lagerung: Beine 15–20° innenrotiert, Becken nicht verkippt (ehem. Punkt 5 erledigt). Kalibrierung: Kugel; wird sie nicht erkannt, fester bzw. Standard-Vergrößerungsfaktor mit Hinweis im Bericht; Skalierung muss ärztlich auf Plausibilität geprüft werden. Referenzbereiche aus der Literatur, Abweichungen orange markiert; für Offsets und Kopfdurchmesser kein Referenzbereich. Plausibilitätsprüfung/Verwerfen einzelner Werte durch die Radiologin bzw. den Radiologen ist in der IFU so vorgesehen (ehem. Punkt 7 erledigt). Frühere Peter-Antworten (21.10.2026: im Einsatz, im Stehen, Kalibrierkugel, Ganzbeinaufnahmen) eingearbeitet. KORRIGIERT: Beckenschiefstand in mm wird immer ausgegeben (vorher „nur wenn kalibriert“); Beinlängendifferenz-Messpunkt = Trochanter minor; acetabuläres Offset bezogen auf die Tränenfigur; Referenzbereich nur „bei den meisten“ Werten; Altersgrenze 18 und Kontraindikationen ergänzt; Arthrose als Fragestellung ergänzt. CE-Kennzeichnung, Klasse und Version bewusst NICHT auf der Seite (Entscheidung Georg offen). WEITER OFFEN – Fragen an die Praxis: (1) Läuft HIPPO bei uns in der Vollvariante „SI“? (In der Variante „LITE“ gibt die Software Offset, Pfannenwinkel, Kopfdurchmesser und Beinlängendifferenz nicht aus – der Artikel beschreibt sie aber.) (2) Wird HIPPO automatisch auf jede Becken-/Hüftaufnahme von vorne angewendet? Wenn ja: Sind Aufnahmen von Personen unter 18 Jahren ausgeschlossen bzw. werden deren Ergebnisse nicht verwendet? (3) Werden auch postoperative Kontrollen im Stehen gemacht? Falls manche im Liegen entstehen: Beckenschiefstand-Werte werden dann laut IFU verworfen – passt der Satz „bei diesen Fragestellungen im Stehen“ so? (4) Erhält die zuweisende Stelle den HIPPO-Bericht als Beilage (DICOM/PDF) oder nur die Werte im Befund? Text sagt nichts dazu. (5) Freigabe von IB Lab für die Veröffentlichung der beiden Demo-Berichte; Personendaten laut Sichtung nicht vorhanden. Bildtext Slide 1 sagt „Beckenübersicht im Stehen“ – ist das für den Demo-Datensatz belegt? Sonst „im Stehen“ dort streichen. (6) EndoCert bewusst nicht erwähnt (Zertifizierung von Endoprothetikzentren, für Patientinnen und Patienten ohne Mehrwert). (7) Studie Schwarz 2023 betrifft HIPPO 1.03 (frühere Version) – im Text so formuliert, keine Zahlen übernommen; Leistungs- und Genauigkeitsangaben der IFU bewusst nicht übernommen. (8) Medizinische Freigabe und Autor (author) durch die Praxis.";


export const TITLE = "Hüfte präzise vermessen: Wie IB Lab HIPPO unterstützt";
