// Ratgeber-Artikel „KI-Beinachsenvermessung mit IB Lab LAMA“ – URL /ratgeber/ki-beinachsenvermessung-lama.
// Stand: 22.10.2026. Zielgruppe: Patientinnen und Patienten.
// Abgleich mit IFU LAMA 3.0 (Gebrauchsanweisung DE 3.0.0 vom 14.09.2026) + DoC (MDR 2017/745 Klasse IIa, Regel 11,
// Benannte Stelle 0123, DoC ausgestellt 16.09.2026) vom 22.10.2026. CE/Klasse/Version NICHT auf der Seite (Entscheidung Georg offen).
// Quellen: Gebrauchsanweisung IB Lab LAMA (vertraulich, nur in eigenen Worten), Herstellerseite IB Lab LAMA, PUCmed-Produktbeschreibung
// (nur Funktionsumfang, ohne Werbezahlen), Simon 2022 (Skeletal Radiol), Schwarz 2022 (KSSTA), Paley 1994 (Begriffe Achsen/Winkel),
// Gordon & Davis 2019 (Beinlängendifferenz). Alle DOIs am 21.10.2026 über Crossref/PubMed geprüft.
// Leitplanken: KI misst, markiert, standardisiert, dokumentiert – keine Diagnose, kein Ersatz für radiologische Befundung,
// orthopädische Beurteilung oder Therapieplanung. Vorhergesagte Beinachse aus der Knieaufnahme nur als ergänzende
// Abschätzung, nie als pauschaler Ersatz der Ganzbeinaufnahme. Keine Genauigkeits-/Zeitangaben aus Herstellerunterlagen.
// IFU: Ganzbein a.p. ab 8 Jahren, Knie a.p./seitlich ab 18 Jahren; Normbereiche erst ab 16 Jahren im Bericht; Ergebnisse in der
// Software nicht editierbar; Kontraindikationen (< 8 J., Frakturen/Trauma, Fixateur externe, Sarkom/abnormes Knochenwachstum,
// seltene Erkrankungen wie Achondroplasie); nicht unterstützt: Knie-Teilprothese, Sprunggelenkprothese, kniegelenksnahes Metall
// (z. B. HTO), Megaprothese; bei H-TEP keine Femur-/Beinlänge/LLD; Rotationskorrektur nur Ganzbein ohne Knieimplantat.
// Beispielberichte = Demo-Datensätze des Herstellers, Messwerte darin werden nicht bewertet.
// [geteilt] Metadaten; Text und Bildtexte: ki-lama.content.js

export const DESCRIPTION = "Beinachsenvermessung in Graz: Ablauf der Röntgenaufnahme, wichtige Begriffe wie HKA und Beinlängendifferenz und wie die KI IB Lab LAMA standardisiert misst.";

export const EXCERPT = "O-Bein, X-Bein oder ein kürzeres Bein? Wie eine Röntgenaufnahme der Beinachse abläuft, was HKA-Winkel und Tibial Slope bedeuten und wie die Software IB Lab LAMA die Messung unterstützt.";

export const FAQ = [
  {
    "question": "Brauche ich für die Röntgenaufnahme der Beinachse eine Zuweisung?",
    "answer": "Ja. Röntgen ist bei Röntgen am Kai mit gültiger ärztlicher Zuweisung und e-card während der Röntgenzeiten ohne Termin möglich. Eine Wunschzeit kann reserviert werden. Welche Aufnahme gemacht wird, steht auf der Zuweisung."
  },
  {
    "question": "Kann eine Knieaufnahme die Ganzbeinaufnahme ersetzen?",
    "answer": "Nicht pauschal. IB Lab LAMA kann bei Erwachsenen aus einer Knieaufnahme von vorn Werte der Beinachse abschätzen, Hüfte und Sprunggelenk sind darauf aber nicht abgebildet. Diese Abschätzung ist eine Ergänzung. Ob eine Ganzbeinaufnahme nötig ist, entscheidet die zuweisende Ärztin oder der zuweisende Arzt."
  },
  {
    "question": "Stellt die KI eine Diagnose?",
    "answer": "Nein. Die Software misst Winkel und Längen, zeichnet die Linien ins Bild und dokumentiert die Werte. Die Radiologin oder der Radiologe prüft jede Messung und erstellt den Befund. Über Behandlung oder Operation entscheidet die behandelnde Ärztin oder der behandelnde Arzt."
  },
  {
    "question": "Ist ein kleiner Unterschied in der Beinlänge bedenklich?",
    "answer": "Nicht unbedingt. Nur wenige Menschen haben exakt gleich lange Beine, kleine Unterschiede sind häufig. Ob ein gemessener Unterschied eine Bedeutung hat, beurteilt die behandelnde Ärztin oder der behandelnde Arzt zusammen mit Beschwerden und Untersuchung."
  },
  {
    "question": "Wie hoch ist die Strahlenbelastung?",
    "answer": "Die Strahlenbelastung beim Röntgen der Beine ist gering. Es werden nur so viele Aufnahmen gemacht, wie für die Fragestellung nötig sind. Die Auswertung durch die Software erfolgt am bereits vorhandenen Bild und bedeutet keine zusätzliche Strahlung."
  }
];

export const REVIEW = "BEANTWORTET (Georg Riegler, Mail 23.10.2026): „Texte passen. Entferne das medizinisch geprüft.“ → Prüfvermerk auf dieser Seite ganz entfernt (KI_NO_REVIEW_NOTE in kiSeries.js); CE-Erwähnung: Ja → „CE-gekennzeichnetes Medizinprodukt“ im Artikelkopf, ohne Version/Klasse/Prüfstelle. Frage „Setzen wir LAMA auch bei Kindern ein?“: Ja → Anlässe-Liste: „Auch bei ihnen setzen wir LAMA ein, ausgewertet wird die Ganzbeinaufnahme.“ (Altersgrenze ab 8 Jahren laut Gebrauchsanweisung bleibt).\nBEANTWORTET (Peter, 22.10.2026): Ganzbeinaufnahmen von Kindern ab 8 Jahren werden ausgewertet (Anlass bleibt im Text). Die KI rechnet bei jeder passenden Aufnahme automatisch mit → Text: „Die Software wertet jede passende Aufnahme automatisch aus.“ Außerhalb der Zweckbestimmung (Kinder unter der Altersgrenze, Metall/Platten, nach Bruch): Messung von Hand, KI-Bericht wird nicht verwendet → Text „Dann misst die Radiologin bzw. der Radiologe von Hand.“ Stimmt ein KI-Wert nicht: selbst nachgemessen, im Befund steht der ärztliche Wert (Bericht nicht änderbar) → Text. Der Bericht kommt ins Archiv, in ELGA und an die Zuweiser → passiver Satz „Der Messbericht wird mit den Bildern archiviert …, ebenso über ELGA.“ (keine Aufforderung an Patienten). Kalibrierung jetzt neutral: Die Software gleicht die Vergrößerung über eine Kalibrierkugel im Bild oder über die vom Röntgengerät mitgespeicherten Größenangaben aus, der Bericht nennt den Weg (kein „bei uns liegt eine Kugel“). Alt-Text Folie 1 beschreibt die Kugel im Demo-Bild und bleibt.\nBEANTWORTET (Herstellerunterlagen IB Lab, 22.10.2026): Gebrauchsanweisung LAMA 3.0 (Stand 14.09.2026) und Konformitätserklärung (MDR Klasse IIa, Regel 11, Benannte Stelle TÜV SÜD 0123, erste CE-Kennzeichnung 18.06.2025, DoC vom 16.09.2026, gilt für 3.0.x). Geklärt und im Text umgesetzt: Altersgrenzen (Ganzbeinaufnahme ab 8 Jahren, Knieaufnahmen von vorn und seitlich ab 18 Jahren; unter 16 Jahren zeigt der Bericht keine Normbereiche). Der frühere Satz „bei Kindern berechnet die Software einzelne Winkel nicht“ (PUCmed) steht so nicht in der Gebrauchsanweisung und ist ersetzt. Ausgewertete Aufnahmen: Ganzbein a.p., Knie a.p. (HKA, AMA, mLDFA, mMPTA vorhergesagt, JLCA gemessen), Knie seitlich (Tibial Slope). Messwerte: Femur-, Tibia-, Ganzbeinlänge, Beinlängendifferenz, HKA, Achsabweichung (MAD), AMA, JLCA, mLPFA, mLDFA, mMPTA, mLDTA, CPAK, Rotationswinkel, Tibial Slope. Drehkorrektur nur auf Ganzbeinaufnahmen ohne Knieimplantat (passt zur Bildunterschrift Folie 2). Ergebnisse sind in der Software nicht veränderbar → Text: Radiologin/Radiologe misst bei Bedarf selbst nach, statt „korrigiert“. Grenzen laut Gebrauchsanweisung ergänzt: nicht vorgesehen unter 8 Jahren, bei Frakturen/Unfallverletzungen, Fixateur externe, Knochentumoren/abnormem Knochenwachstum, seltenen Erkrankungen wie Achondroplasie; Implantate: Knie-TEP und Hüft-TEP unterstützt (bei Hüft-TEP keine Beinlängen), NICHT unterstützt: Knie-Teilprothese, Sprunggelenkprothese, kniegelenksnahes Metall (z. B. nach Umstellungsosteotomie), Megaprothese. Kalibrierung: Bericht nennt die Skalierungsmethode, Plausibilität ist ärztlich zu prüfen. „CE-gekennzeichnete Medizinprodukt-Software“ und „(CE)“ in der Quelle von der Seite entfernt (CE-Erwähnung: Georg 23.10.2026 ja, nur im Artikelkopf); Gebrauchsanweisung als Quelle ohne Link ergänzt. Erledigt aus früheren Listen: Ganzbeinaufnahmen im Stehen mit Kalibrierkugel [KORRIGIERT 22.10.2026: Kalibrierkugel nur bei Hüfte zur OP-Planung und Fernröntgen Zahn] und Knieaufnahmen im Stehen (Peter, 21.10.2026).\nBEANTWORTET (Peter, 21.10.2026): IB-Lab-Module im Einsatz; Fuß, Knie und Becken bei diesen Fragestellungen im Stehen; Kalibrierkugel wird verwendet [KORRIGIERT 22.10.2026: Kalibrierkugel nur bei Hüfte zur OP-Planung und Fernröntgen Zahn]; Ganzbeinaufnahmen werden gemacht; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig.\nOFFEN – Fragen an die Praxis:\n1. Welche Auswertungen sind eingeschaltet: Ganzbein, Knie von vorn mit vorhergesagter Beinachse, Knie seitlich mit Tibial Slope, Drehkorrektur? Der Text nennt alle vier (laut Gebrauchsanweisung einzeln einstellbar). Tibial Slope: Methode „Two-Circle“ (Standard, wie im Demo-Bericht) oder „Anterior Cortical“?\n2. Ärztliche Freigabe der Anlässe-Liste („Kontrolle nach dem Einsetzen einer Knieprothese“, weil Metall nach Umstellungsoperation nicht unterstützt ist) und des Satzes zum Tibial Slope („etwa nach Kreuzbandverletzungen“).\n3. Vorhergesagte Beinachse aus der Knieaufnahme bewusst als ergänzende Abschätzung formuliert, nicht als Alternative zur Ganzbeinaufnahme – ärztliche Freigabe.\n4. erledigt: CE ja (Georg 23.10.2026) – nur „CE-gekennzeichnetes Medizinprodukt“ im Artikelkopf, Klasse/Version nicht.\nWeiter offen (unverändert): Studienaussage („stimmten insgesamt gut überein“) beruht auf Simon 2022 (Abstract gelesen, Mitautoren vom Hersteller) und dem Titel von Schwarz 2022 (Volltext hinter Bezahlschranke). Keine Zahlen übernommen. Bildtexte: Beispielberichte sind Demo-Datensätze des Herstellers; PDF-/Bildmetadaten der Originale vor Veröffentlichung lokal prüfen. Prüfvermerk: erledigt, entfernt (Georg 23.10.2026).";


export const TITLE = "Beinachsen mit KI vermessen: Was IB Lab LAMA zeigt";
