// Übersichtsseite der KI-Artikelserie „Röntgen am K[AI] – Künstliche Intelligenz, ärztlich verantwortet“.
// URL: /ratgeber/kuenstliche-intelligenz-radiologie · SEO-Titel: „Künstliche Intelligenz in der Radiologie | Graz“
// Stand: 21.10.2026
// Quellen: Herstellerseiten imagebiopsy.com (IB Lab ZOO, Module LAMA/HIPPO/KOALA/SQUIRREL/FROG/PANDA), 16bit.ai (Rho),
// screenpoint-medical.com (Transpara); Funktionsumfang laut PUCmed-Produktbeschreibung – ohne Werbezahlen.
// Leitplanken: KI misst, markiert, dokumentiert; keine Diagnose, keine Therapieentscheidung; jede Messung wird ärztlich
// geprüft. IB Lab-Module werden gerade eingeführt (nicht „seit Jahren“). Rho: Einsatz bestätigt. Transpara: Einsatz
// NICHT bestätigt – die Kachel beschreibt nur, wie KI in der Mammographie unterstützen kann. Keine Tomosynthese/3D-Mammographie.
// „[AI]“ im Titel/Seriennamen wird vom Code typografisch hervorgehoben; im HTML-Fließtext steht der Serienname bewusst nicht.
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-uebersicht.js

export const HTML = `
      <p>Künstliche Intelligenz, kurz KI, begegnet uns heute in vielen Lebensbereichen – auch in der Medizin. Auf dieser Seite erklären wir, was künstliche Intelligenz in der Radiologie leistet, wie wir sie bei Röntgen am Kai in Graz einsetzen und wo ihre Grenzen liegen. Das Wichtigste vorweg: KI unterstützt unsere Fachärzte für Radiologie. Die ärztliche Beurteilung bleibt entscheidend.</p>

      <h2>Was KI in der Radiologie bedeutet</h2>
      <p>Unter KI versteht man Computerprogramme, die anhand sehr vieler Beispielbilder gelernt haben, bestimmte Muster zu erkennen. In der Radiologie analysieren solche Programme Bilddaten und Messwerte. Sie finden zum Beispiel die Ränder eines Gelenks, den Hüftkopf oder einzelne Wirbelkörper und berechnen daraus Winkel, Längen und Abstände.</p>
      <p>Das Ergebnis ist ein übersichtlicher Bericht mit Messwerten und Markierungen im Bild. Dieser Bericht ist ein Arbeitsmittel, kein Befund. Die Software sieht nur das Bild. Ihre Beschwerden, frühere Erkrankungen und Ihre Krankengeschichte kennt sie nicht. Sie stellt deshalb keine Diagnose und trifft keine eigenständige Entscheidung über eine Therapie oder Operation.</p>
      <p>Ihr Nutzen liegt vor allem in der Einheitlichkeit: Die Programme messen immer nach denselben Regeln. Das kann Vergleiche im Verlauf erleichtern, etwa wenn eine Skoliose oder eine Fehlstellung über längere Zeit beobachtet wird. Künstliche Intelligenz beim Röntgen ist also kein Ersatz für ärztliche Erfahrung, sondern ein zusätzliches Messwerkzeug.</p>

      <h2>Wie wir KI einsetzen</h2>
      <p>Derzeit führen wir schrittweise KI-Programme der Wiener Firma ImageBiopsy Lab ein. Sie unterstützen die Auswertung von Röntgenaufnahmen des Bewegungsapparats: Beinachsen und Beinlängen, das Hüftgelenk, Kniearthrose, Skoliose der Wirbelsäule, Fußfehlstellungen und die Bestimmung des Knochenalters bei Kindern. Welche Auswertung sinnvoll ist, richtet sich nach der Fragestellung auf Ihrer Zuweisung. Die Software zeigt ihre Messpunkte und Linien direkt im Bild. So ist für den Radiologen nachvollziehbar, woher jeder Wert stammt, und eine Messung lässt sich gezielt überprüfen.</p>
      <p>Am Ablauf Ihrer Untersuchung ändert sich dadurch nichts. Die Software wertet die Aufnahmen aus, die für Ihre Untersuchung ohnehin angefertigt werden. Für ein <a href="/roentgen-graz">Röntgen bei uns in Graz</a> genügen wie bisher eine gültige ärztliche Zuweisung und Ihre e-card. Während der Röntgenzeiten ist kein Termin nötig, eine Wunschzeit kann aber reserviert werden.</p>
      <p>Ein weiteres Programm heißt Rho. Es prüft geeignete Röntgenaufnahmen von Personen ab 50 Jahren zusätzlich auf Hinweise für eine möglicherweise niedrige Knochendichte. Ein solcher Hinweis ist keine Osteoporose-Diagnose. Ob eine <a href="/knochendichtemessung-graz">Knochendichtemessung mit DEXA</a> zur Abklärung sinnvoll ist, beurteilen Ärztinnen und Ärzte. DEXA ist eine Messmethode mit geringer Strahlenbelastung, die die Knochendichte direkt bestimmt.</p>
      <p>Auch für die Mammographie, die Röntgenuntersuchung der Brust, gibt es KI-Programme. Sie können Aufnahmen zusätzlich auswerten und Bereiche markieren, die genauer angesehen werden sollten. Wie KI in der Mammographie grundsätzlich unterstützen kann, erklären wir in einem eigenen Beitrag dieser Serie. Informationen zur Untersuchung selbst finden Sie auf unserer Seite <a href="/mammographie-graz">Mammographie und Brustgesundheit</a>.</p>

      <h2>Ihre Daten und die ärztliche Verantwortung</h2>
      <p>Röntgenbilder sind Gesundheitsdaten und besonders schützenswert. Auch bei der Auswertung mit KI gelten die Regeln des Datenschutzes und der ärztlichen Verschwiegenheit.</p>
      <p>Die Verantwortung bleibt bei uns. Ein Facharzt für Radiologie sieht sich jede Aufnahme selbst an, prüft die Messungen der Software und korrigiert sie, wenn nötig. Erst danach entsteht der ärztliche Befund. Er geht an Ihre zuweisende Ärztin oder Ihren zuweisenden Arzt. Befund und Bilder sind zusätzlich über ELGA und das Patientenportal portal.marc.at verfügbar.</p>
      <p>Was die Ergebnisse für Sie bedeuten und ob eine Behandlung nötig ist, besprechen Sie mit Ihrer behandelnden Ärztin oder Ihrem behandelnden Arzt. Die KI liefert dafür zusätzliche, einheitlich gemessene Werte. Die Entscheidung treffen Menschen – im Gespräch mit Ihnen.</p>
`;

export const SOURCES = [
  "ImageBiopsy Lab (IB Lab GmbH, Wien): Herstellerinformation zur KI-Plattform IB Lab ZOO und ihren Modulen für Röntgenaufnahmen des Bewegungsapparats (abgerufen am 21.10.2026). <a href=\"https://www.imagebiopsy.com/\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "16 Bit Inc. (Toronto): Herstellerinformation zu Rho, einer KI-Software zur opportunistischen Erkennung eines möglichen Osteoporoserisikos auf Röntgenaufnahmen (abgerufen am 21.10.2026). <a href=\"https://16bit.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">16bit.ai<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "ScreenPoint Medical: Herstellerinformation zu Transpara, einer KI-Software zur Unterstützung der Mammographie-Auswertung (abgerufen am 21.10.2026). <a href=\"https://screenpoint-medical.com/\" target=\"_blank\" rel=\"noopener noreferrer\">screenpoint-medical.com<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>"
];
