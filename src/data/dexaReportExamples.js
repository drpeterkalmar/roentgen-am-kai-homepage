// DEXA-Beispielbefunde für den Befund-Slider der Körperanalyse-Seite – ZENTRALE Datenstruktur.
// Hier werden Seiten, Hotspot-Positionen und Erklärungstexte gepflegt; die Komponente
// src/components/dexa/DexaReportSlider.jsx liest nur hieraus.
//
// Regeln (Auftrag 07.10.2026):
// - Erklärungen ausschließlich aus den beiden Publikationen in DEXA_SOURCES (plus Beschriftungen und
//   Texten, die im Befund selbst stehen). Keine Grenzwerte, keine individuelle Diagnose.
// - Magermasse ≠ direkt gemessene Muskelmasse oder Muskelkraft. VAT nur so, wie Befund und Quellen es definieren.
// - Jede Erklärung: name, definition, beschreibt, einheit, einschraenkung, quellen (mind. eine der beiden Publikationen).
//
// Befunde: anonymisierte Praxisbefunde (GE Lunar Prodigy, enCORE), Stand 07.10.2026.
// Geschwärzt (durch „####“ ersetzt): Kopfdaten, Zuweisernummer, Erstellungsdatum und -uhrzeit, Alter an den Diagrammachsen,
// Körpergröße samt kg-Skala, Geräte-Seriennummer, PDF-Metadaten. Seiten 2a/2b = die zwei Seiten des CoreScan-Berichts.
// Bilder: scripts/dexa_render_pages.py (PDF → PNG) und scripts/dexa-images.mjs (PNG → AVIF/WebP, npm run images:dexa).
//
// Hotspot-Rechtecke: x, y, w, h in Prozent der Seitenbreite bzw. -höhe (Ursprung oben links).
// Die Werte stammen aus den Textpositionen der PDFs; ein Hotspot ist nur ein Rahmen und verdeckt nichts.

export const DEXA_IMAGE = { width: 2400, height: 3395, widths: [800, 1200, 1800, 2400] };

export const DEXA_SOURCES = {
  chaves: {
    short: 'Chaves et al. 2022',
    citation:
      'Chaves LGCM, Gonçalves TJM, Bitencourt AGV, Rstom RA, Pereira TR, Velludo SF. Assessment of body composition by whole-body densitometry: what radiologists should know. Radiol Bras. 2022;55(5):305–311.',
    url: 'https://doi.org/10.1590/0100-3984.2021.0155-en',
  },
  ofenheimer: {
    short: 'Ofenheimer et al. 2020',
    citation:
      'Ofenheimer A, Breyer-Kohansal R, Hartl S, et al. Reference values of body composition parameters and visceral adipose tissue (VAT) by DXA in adults aged 18–81 years – results from the LEAD cohort. Eur J Clin Nutr. 2020;74:1181–1191.',
    url: 'https://doi.org/10.1038/s41430-020-0596-5',
  },
};

// Erklärungen je Messwert (mehrere Hotspots dürfen dieselbe Erklärung verwenden)
export const DEXA_EXPLANATIONS = {
  koerperfettanteil: {
    name: 'Körperfettanteil (% Fett)',
    definition: 'Anteil der Fettmasse an der gemessenen Masse – für den ganzen Körper oder für einzelne Körperregionen.',
    beschreibt:
      'Wie groß der Fettanteil ist, unabhängig vom Körpergewicht. Zeigt ein Befund zwei Spalten, bezieht „Gewebe (%Fett)“ das Fett auf das Weichteilgewebe und „Bereich (%Fett)“ auf die gesamte Masse der Region einschließlich Knochenmineral.',
    einheit: 'Prozent (%)',
    einschraenkung:
      'Vergleichswerte hängen von Alter, Geschlecht und Herkunft ab und gelten nur für dasselbe DEXA-Gerät mit derselben Software.',
    quellen: [{ id: 'ofenheimer', seiten: '1184' }],
  },
  fettmasse: {
    name: 'Fettmasse',
    definition:
      'Gewicht des Fetts im ganzen Körper oder in einer Region. DEXA zerlegt den Körper in drei Bestandteile: Fettmasse, Magermasse und Knochenmineral.',
    beschreibt:
      'Die Menge an Fett, nicht nur den Anteil. Für das gesundheitliche Risiko ist nach der Studienlage die Verteilung des Fetts wichtiger als seine Gesamtmenge.',
    einheit: 'Gramm (g)',
    einschraenkung:
      'Fettmasse ist nicht dasselbe wie Fettgewebe: Fettgewebe besteht nur zum Teil aus Fett, der Rest ist Wasser, Eiweiß und Mineralstoffe.',
    quellen: [{ id: 'ofenheimer', seiten: '1181–1182' }, { id: 'chaves', seiten: '305–306' }],
  },
  magermasse: {
    name: 'Magermasse (fettfreie Weichteilmasse)',
    definition: 'Das gesamte Weichgewebe, das kein Fett ist. Zusammen mit dem Knochenmineral ergibt sie die fettfreie Masse.',
    beschreibt:
      'Skelettmuskulatur, innere Organe und Körperflüssigkeit gemeinsam. DEXA kann sie nicht voneinander trennen, weil sie im Röntgenbild eine ähnliche Dichte haben.',
    einheit: 'Gramm (g)',
    einschraenkung:
      'Die Magermasse ist keine direkt gemessene Muskelmasse und sagt nichts über die Muskelkraft aus. Der Wassergehalt des Körpers beeinflusst den Wert, vor allem bei Verlaufsmessungen.',
    quellen: [{ id: 'chaves', seiten: '306, 310' }, { id: 'ofenheimer', seiten: '1182' }],
  },
  regionaleMagermasse: {
    name: 'Regionale Magermasse (Arme, Beine, Rumpf)',
    definition:
      'Die Magermasse getrennt nach Körperregionen. Die Grenzen der Regionen legt die Auswertung über Linien im Scanbild fest.',
    beschreibt:
      'Die Magermasse an Armen und Beinen gilt als Marker der Skelettmuskelmasse. Am Rumpf überlagern sich Muskulatur, Organe und Flüssigkeit stärker.',
    einheit: 'Gramm (g)',
    einschraenkung: 'Auch regional bleibt es Magermasse – keine direkt gemessene Muskelmasse und keine Aussage über die Muskelkraft.',
    quellen: [{ id: 'chaves', seiten: '307, 310' }, { id: 'ofenheimer', seiten: '1182' }],
  },
  fettfreieMasse: {
    name: 'Fettfreie Masse',
    definition: 'Magermasse plus Knochenmineralgehalt.',
    beschreibt: 'Alles, was nicht Fett ist: das fettfreie Weichgewebe und das Mineral der Knochen.',
    einheit: 'Gramm (g)',
    einschraenkung: 'Sie enthält auch Organe, Körperflüssigkeit und Knochenmineral und ist deshalb nicht mit Muskelmasse gleichzusetzen.',
    quellen: [{ id: 'ofenheimer', seiten: '1182' }, { id: 'chaves', seiten: '310' }],
  },
  weichteilgewebe: {
    name: 'Weichteilgewebe („Gewebe“)',
    definition: 'Fettmasse und Magermasse zusammen – alles außer dem Knochenmineral.',
    beschreibt: 'Die Bezugsgröße für den Fettanteil in der Spalte „Gewebe (%Fett)“.',
    einheit: 'Gramm (g)',
    einschraenkung:
      'DEXA geht bei der Magermasse von einem gleichbleibenden Wassergehalt aus. Der Wassergehalt schwankt aber mit Alter, Geschlecht und Erkrankungen.',
    quellen: [{ id: 'ofenheimer', seiten: '1181' }, { id: 'chaves', seiten: '306' }],
  },
  bmc: {
    name: 'Knochenmineralgehalt (BMC)',
    definition: 'Die Masse des Minerals in den Knochen – der dritte Bestandteil neben Fettmasse und Magermasse.',
    beschreibt: 'Wie viel Knochenmineral im ganzen Körper und in den einzelnen Regionen gemessen wurde.',
    einheit: 'Gramm (g)',
    einschraenkung:
      'Für die Körperzusammensetzung ist der Knochenmineralgehalt weniger wichtig als Fett- und Magermasse. Für die Diagnose einer Osteoporose braucht es eine gezielte Knochendichtemessung.',
    quellen: [{ id: 'chaves', seiten: '307' }, { id: 'ofenheimer', seiten: '1181' }],
  },
  gesamtmasse: {
    name: 'Gesamtmasse',
    definition: 'Die Summe aus Fettmasse, Magermasse und Knochenmineral – für den ganzen Körper oder eine Region.',
    beschreibt: 'Das im Scan erfasste Gewicht, aufgeteilt in seine Bestandteile.',
    einheit: 'Kilogramm (kg)',
    einschraenkung:
      'Die Gesamtmasse allein sagt nichts über die Zusammensetzung aus. Aussagekräftig sind die Anteile von Fett und Magermasse und ihre Verteilung.',
    quellen: [{ id: 'ofenheimer', seiten: '1181–1182' }],
  },
  seitenvergleich: {
    name: 'Seitenvergleich rechts – links (Diff.)',
    definition: 'Der Unterschied zwischen rechter und linker Körperhälfte, je Spalte: rechter Wert minus linker Wert.',
    beschreibt: 'Ob Fett, Magermasse und Knochenmineral an Armen, Beinen, Rumpf und insgesamt auf beiden Seiten ähnlich verteilt sind.',
    einheit: 'wie die jeweilige Spalte (%, g oder kg)',
    einschraenkung:
      'Die Seitenwerte hängen von der Lagerung und der Linienführung im Scanbild ab. Bei sehr großen oder breiten Personen wird eine Körperseite teilweise aus der anderen gespiegelt – dann ist der Seitenvergleich nicht aussagekräftig.',
    quellen: [{ id: 'chaves', seiten: '307' }],
  },
  androidGynoid: {
    name: 'Android- und Gynoid-Region',
    definition:
      'Zwei Messfelder für die Fettverteilung. Die Android-Region liegt am Bauch knapp oberhalb der Beckenkämme; ihre Höhe beträgt 20 % des Abstands vom Beckenkamm zur Schädelbasis. Die Gynoid-Region liegt an Hüften und Oberschenkeln.',
    beschreibt:
      'Wie viel Fett am Bauch („Apfelform“) im Vergleich zu Hüften und Oberschenkeln („Birnenform“) liegt – so beschreibt es auch der Befundtext.',
    einheit: 'Prozent Fett (%); Massen in Gramm (g) bzw. Kilogramm (kg)',
    einschraenkung: 'Die Messfelder legt die Software automatisch fest. Die Fettverteilung allein ist keine Diagnose.',
    quellen: [{ id: 'ofenheimer', seiten: '1181' }, { id: 'chaves', seiten: '309' }],
  },
  agVerhaeltnis: {
    name: 'Android-/Gynoid-Verhältnis (A/G)',
    definition: 'Das Verhältnis von Bauchfett (android) zu Hüft- und Oberschenkelfett (gynoid).',
    beschreibt: 'Ein indirektes Maß dafür, wie stark sich Fett am Bauch ansammelt.',
    einheit: 'Verhältniszahl ohne Einheit',
    einschraenkung:
      'In diesem Befund ist das Verhältnis aus den Fettanteilen der beiden Regionen gebildet (33,5 % zu 39,8 % ergibt 0,84). Die LEAD-Studie berechnet es aus den Fettmassen in Kilogramm – die Zahlen sind daher nicht direkt vergleichbar.',
    quellen: [{ id: 'ofenheimer', seiten: '1182–1183' }],
  },
  vat: {
    name: 'Viszerales Fettgewebe (VAT), geschätzt',
    definition:
      'Fettgewebe im Bauchraum („Bauchfettgewebe“ laut Befund), getrennt vom Fett unter der Haut. Die Zusatzsoftware CoreScan schätzt es in der Android-Region, also am Bauch knapp oberhalb des Beckens.',
    beschreibt:
      'Volumen, Masse und Fläche des geschätzten viszeralen Fettgewebes. Eine vermehrte Menge davon ist laut Studienlage mit Insulinresistenz, Typ-2-Diabetes, Bluthochdruck und Herz-Kreislauf-Erkrankungen verbunden. „(MwSt.)“ in der Überschrift ist ein Übersetzungsfehler der Gerätesoftware – gemeint ist VAT.',
    einheit: 'Volumen in cm³, Masse in Gramm (g), Fläche in cm²',
    einschraenkung:
      'Es ist eine Schätzung aus dem DEXA-Bild, keine Schnittbildmessung wie bei CT oder MRT. Die DEXA-Schätzung stimmt laut Studienlage gut mit der CT überein. Laut Befund ist CoreScan für Erwachsene von 18 bis 90 Jahren mit einem BMI von 18,5 bis 40 validiert.',
    quellen: [{ id: 'chaves', seiten: '309' }, { id: 'ofenheimer', seiten: '1181–1182' }],
  },
  sat: {
    name: 'Subkutanes Fettgewebe (SAT), geschätzt',
    definition: 'Fettgewebe unter der Haut im selben Messfeld am Bauch (Android-Region), ebenfalls von CoreScan geschätzt.',
    beschreibt:
      'Volumen, Masse und Fläche des Bauchfetts unter der Haut. Zusammen mit dem viszeralen Fettgewebe zeigt es, wie sich das Bauchfett auf innen und außen verteilt.',
    einheit: 'Volumen in cm³, Masse in Gramm (g), Fläche in cm²',
    einschraenkung: 'Ebenfalls eine Schätzung aus dem DEXA-Bild, keine direkte Schnittbildmessung.',
    quellen: [{ id: 'chaves', seiten: '309' }],
  },
  fettverteilung: {
    name: 'Fettmasse-Verhältnisse',
    definition:
      'Verhältnisse der Fettmassen verschiedener Regionen: Rumpf zu Gesamtfett, Beine zu Gesamtfett sowie Arme und Beine (Extremitäten) zu Rumpf.',
    beschreibt:
      'Ob das Fett eher am Rumpf oder an Armen und Beinen liegt. Fett am Rumpf zählt in der LEAD-Studie zu den Kennzahlen für eine zentrale Fettansammlung.',
    einheit: 'Verhältniszahl ohne Einheit',
    einschraenkung:
      'Die LEAD-Studie verwendet das umgekehrte Verhältnis (Rumpffett zu Extremitätenfett). Die Werte sind deshalb nicht direkt mit deren Referenzwerten vergleichbar.',
    quellen: [{ id: 'ofenheimer', seiten: '1183–1184' }],
  },
  verlauf: {
    name: 'Verlauf (Zusammensetzungstrend)',
    definition: 'Ein Diagramm, das die Werte mehrerer Messungen über das Alter aufträgt. Bei einer ersten Messung zeigt es nur einen Punkt.',
    beschreibt:
      'Wie sich die Werte zwischen zwei Messungen verändern – etwa nach einer Gewichtsabnahme, durch Training oder unter einer Therapie.',
    einheit: 'Masse in Gramm (g) bzw. Prozent (%), Alter in Jahren',
    einschraenkung:
      'Verlaufsmessungen sind nur am selben Gerät mit derselben Software sinnvoll vergleichbar. Schwankungen des Wassergehalts können Veränderungen der Magermasse vortäuschen oder verdecken.',
    quellen: [{ id: 'chaves', seiten: '306' }, { id: 'ofenheimer', seiten: '1182, 1184' }],
  },
  perzentile: {
    name: 'Centile (Perzentile)',
    definition:
      'Die Lage des Messwerts innerhalb einer Referenzbevölkerung gleichen Geschlechts, abhängig vom Alter. Die Kurven im Diagramm sind solche Perzentilen; die Referenzbevölkerung nennt der Befund in der Fußzeile.',
    beschreibt: 'Wo der gemessene Fettanteil im Vergleich zu Gleichaltrigen gleichen Geschlechts in der Referenzbevölkerung liegt.',
    einheit: 'Centile (ohne Einheit)',
    einschraenkung:
      'Referenzwerte hängen von Alter, Geschlecht, Herkunft, Bevölkerung, Gerät und Software ab. Grenzwerte für auffällige Fett- oder Magermasse-Indizes sind laut LEAD-Studie noch nicht validiert – eine Centile ist keine Diagnose.',
    quellen: [{ id: 'ofenheimer', seiten: '1184, 1188' }],
  },
  bmi: {
    name: 'Body-Mass-Index (BMI)',
    definition: 'Eine Kennzahl aus Körpergewicht und Körpergröße, eingeteilt nach den BMI-Kategorien der Weltgesundheitsorganisation.',
    beschreibt: 'Das Gewicht im Verhältnis zur Größe – nicht, woraus das Gewicht besteht.',
    einheit: 'kg/m²',
    einschraenkung:
      'Der BMI beruht auf dem gesamten Körpergewicht und unterscheidet nicht zwischen Fett und Magermasse. Der Fettmasse-Index der DEXA beruht dagegen nur auf dem Fett.',
    quellen: [{ id: 'chaves', seiten: '307' }, { id: 'ofenheimer', seiten: '1188' }],
  },
  rsmi: {
    name: 'RSMI (relativer Skelettmuskelindex)',
    definition:
      'Die Magermasse von Armen und Beinen zusammen, geteilt durch die Körpergröße zum Quadrat (Berechnung nach Baumgartner). In der Fachliteratur heißt dieser Index auch ALMI (appendikulärer Magermasse-Index).',
    beschreibt: 'Die Magermasse der Gliedmaßen im Verhältnis zur Körpergröße – ein Näherungswert für die Skelettmuskelmasse.',
    einheit: 'kg/m²',
    einschraenkung:
      'Der Befund spricht von „Muskelmasse“. Gemessen wird aber die Magermasse der Arme und Beine, nicht die Skelettmuskulatur direkt und nicht die Muskelkraft. Für die Diagnose einer Sarkopenie ist zuerst eine verminderte Muskelkraft entscheidend.',
    quellen: [{ id: 'chaves', seiten: '306, 308, 310' }],
  },
  grundumsatz: {
    name: 'Grundumsatz (RMR) – berechnet, nicht gemessen',
    definition:
      'Eine Schätzung der Kalorien in Ruhe, die die Gerätesoftware nach der Harris-Benedict-Formel aus Alter, Gewicht und Größe berechnet – so steht es im Befund.',
    beschreibt: 'Einen Rechenwert, keinen DEXA-Messwert. Gemessen werden bei der DEXA Fettmasse, Magermasse und Knochenmineral.',
    einheit: 'Kalorien pro Tag (Kal./Tag)',
    einschraenkung:
      'Die Formel verwendet die DEXA-Messwerte nicht. Die beiden Fachpublikationen behandeln den Grundumsatz nicht, daher wird er hier nicht weiter erklärt.',
    quellen: [{ id: 'ofenheimer', seiten: '1181' }],
  },
  scanRegionen: {
    name: 'Scanbild mit Messregionen',
    definition: 'Das Ganzkörperbild der DEXA-Messung. Linien teilen den Körper in Kopf, Rumpf, Becken, Arme und Beine.',
    beschreibt: 'Aus diesem Bild berechnet die Software Fett, Magermasse und Knochenmineral für den ganzen Körper und für jede Region.',
    einheit: 'Bild ohne eigene Einheit',
    einschraenkung:
      'Die Regionswerte hängen von der richtigen Lagerung und Linienführung ab. Bei sehr großen oder breiten Personen kann eine Körperseite aus der anderen gespiegelt werden.',
    quellen: [{ id: 'chaves', seiten: '307' }, { id: 'ofenheimer', seiten: '1181' }],
  },
  bmdGanzkoerper: {
    name: 'Ganzkörper-Knochendichte (BMD)',
    definition: 'Die Knochendichte aus dem Ganzkörperscan, für die einzelnen Regionen und insgesamt.',
    beschreibt: 'Die Mineraldichte der Knochen in Kopf, Armen, Beinen, Rumpf, Rippen, Wirbelsäule und Becken.',
    einheit: 'g/cm²',
    einschraenkung:
      'Ganzkörper-Knochendichtewerte werden bei Erwachsenen nicht zur Diagnose von Osteopenie oder Osteoporose verwendet. Dafür braucht es eine gezielte Knochendichtemessung an Lendenwirbelsäule, Hüfte oder Unterarm.',
    quellen: [{ id: 'chaves', seiten: '307' }],
  },
  vergleichswerteKnochen: {
    name: 'Vergleichswerte YA und AM (T-Wert, Z-Wert)',
    definition:
      'Spalten, in denen die Gerätesoftware die Ganzkörper-Knochendichte mit ihren Referenzgruppen vergleicht – als Prozentwert und als T- bzw. Z-Wert.',
    beschreibt: 'Wie der Gesamtwert im Vergleich zu den Referenzgruppen der Software liegt. Für die einzelnen Regionen gibt der Befund keine Vergleichswerte aus.',
    einheit: 'Prozent (%); T- und Z-Wert ohne Einheit',
    einschraenkung:
      'Weil Ganzkörperwerte bei Erwachsenen nicht zur Osteoporose-Diagnose dienen, gilt das auch für diese Vergleichswerte. Die Fachpublikationen erläutern die Spalten nicht näher.',
    quellen: [{ id: 'chaves', seiten: '307' }],
  },
  messgenauigkeit: {
    name: 'Messgenauigkeit bei Folgemessungen',
    definition:
      'Die Angabe der Gerätesoftware zur Wiederholbarkeit: 68 % der Folgemessungen liegen innerhalb der genannten Spanne, zum Beispiel ± 0,8 % Fett.',
    beschreibt:
      'Wie stark Messwerte bei einer Wiederholung schwanken. Die LEAD-Studie nennt für ihr Gerät Variationskoeffizienten von 0,71 % (Magermasse gesamt) bis 3,80 % (Fett der Android-Region).',
    einheit: 'wie der jeweilige Messwert (% Fett, g oder g/cm²)',
    einschraenkung:
      'Kleine Veränderungen zwischen zwei Messungen können innerhalb dieser Schwankung liegen. Auch der Wassergehalt des Körpers beeinflusst Verlaufsmessungen.',
    quellen: [{ id: 'ofenheimer', seiten: '1183' }, { id: 'chaves', seiten: '306' }],
  },
};

// Die sechs Beispielseiten. hotspots: { id, key (→ DEXA_EXPLANATIONS), label (kurz, für Liste/Screenreader), x, y, w, h }
export const DEXA_REPORT_EXAMPLES = [
  {
    id: '1',
    file: 'dexa-beispielbefund-1',
    title: 'Übersicht mit RSMI und BMI',
    alt: 'Anonymisierter DEXA-Beispielbefund, Übersichtsseite: berechneter Grundumsatz, RSMI (relativer Skelettmuskelindex) mit Berechnungsformel, BMI mit Einteilung der Weltgesundheitsorganisation und Körperfettanteil.',
    hotspots: [
      { id: 's1-rmr', key: 'grundumsatz', label: 'Grundumsatz (berechnet)', x: 50.6, y: 28.9, w: 44.6, h: 8.2 },
      { id: 's1-rsmi', key: 'rsmi', label: 'RSMI', x: 50.0, y: 46.7, w: 45.5, h: 7.2 },
      { id: 's1-bmi', key: 'bmi', label: 'BMI', x: 7.8, y: 72.2, w: 35.5, h: 3.7 },
      { id: 's1-fett', key: 'koerperfettanteil', label: 'Körperfettanteil', x: 20.8, y: 75.9, w: 22.5, h: 1.8 },
      { id: 's1-bmi-skala', key: 'bmi', label: 'BMI-Skala', x: 50.3, y: 62.8, w: 45.5, h: 11.4 },
    ],
  },
  {
    id: '2a',
    file: 'dexa-beispielbefund-2a',
    title: 'Bauchgewebe: gesamt, Android- und Gynoid-Region',
    alt: 'Anonymisierter DEXA-Beispielbefund, CoreScan Seite 1: Zusammensetzung des Bauchgewebes mit Gesamt-, Mager- und Fettmasse, Werten der Android- und Gynoid-Region, A/G-Verhältnis und zwei Verlaufsdiagrammen.',
    hotspots: [
      { id: 's2a-bild', key: 'vat', label: 'Bild viszeral / subkutan', x: 4.3, y: 30.0, w: 10.8, h: 14.2 },
      { id: 's2a-gesamt', key: 'gesamtmasse', label: 'Gesamtmasse', x: 57.6, y: 50.1, w: 8.0, h: 4.5 },
      { id: 's2a-mager', key: 'magermasse', label: 'Magermasse', x: 70.3, y: 50.1, w: 9.4, h: 4.5 },
      { id: 's2a-fett', key: 'fettmasse', label: 'Fettmasse', x: 84.5, y: 50.1, w: 7.8, h: 4.5 },
      { id: 's2a-trend-gesamt', key: 'verlauf', label: 'Verlauf gesamt', x: 4.6, y: 49.7, w: 37.0, h: 16.7 },
      { id: 's2a-android', key: 'androidGynoid', label: 'Android- und Gynoid-Region', x: 55.3, y: 70.5, w: 32.4, h: 5.6 },
      { id: 's2a-ag', key: 'agVerhaeltnis', label: 'A/G-Verhältnis', x: 88.2, y: 71.8, w: 7.0, h: 4.3 },
      { id: 's2a-trend-android', key: 'verlauf', label: 'Verlauf android', x: 4.6, y: 69.9, w: 37.0, h: 16.6 },
    ],
  },
  {
    id: '2b',
    file: 'dexa-beispielbefund-2b',
    title: 'Viszerales und subkutanes Fettgewebe',
    alt: 'Anonymisierter DEXA-Beispielbefund, CoreScan Seite 2: geschätztes viszerales Fettgewebe und subkutanes Fettgewebe mit Volumen, Masse und Fläche sowie je einem Verlaufsdiagramm.',
    hotspots: [
      { id: 's2b-titel', key: 'vat', label: 'Überschrift „MwSt.“', x: 4.7, y: 10.3, w: 35.3, h: 2.4 },
      { id: 's2b-vat', key: 'vat', label: 'Viszerales Fettgewebe', x: 58.3, y: 12.6, w: 33.0, h: 4.5 },
      { id: 's2b-trend-vat', key: 'verlauf', label: 'Verlauf viszeral', x: 4.6, y: 13.0, w: 37.4, h: 15.7 },
      { id: 's2b-sat-titel', key: 'sat', label: 'Überschrift SAT', x: 4.7, y: 30.6, w: 51.3, h: 2.2 },
      { id: 's2b-sat', key: 'sat', label: 'Subkutanes Fettgewebe', x: 58.3, y: 32.8, w: 33.0, h: 4.5 },
      { id: 's2b-trend-sat', key: 'verlauf', label: 'Verlauf subkutan', x: 4.6, y: 33.0, w: 37.4, h: 16.0 },
    ],
  },
  {
    id: '3',
    file: 'dexa-beispielbefund-3',
    title: 'Ganzkörper-Zusammensetzung nach Regionen',
    alt: 'Anonymisierter DEXA-Beispielbefund, Körperzusammensetzung Ganzkörper (erweiterte Analyse): Tabelle mit Fettanteil, Gewebe, Fett, Mager, Knochenmineral und Gesamtmasse für Arme, Beine, Rumpf, Android- und Gynoid-Region mit Seitenvergleich, darunter Fettmasse-Verhältnisse sowie geschätztes viszerales und subkutanes Fettgewebe.',
    hotspots: [
      { id: 's3-prozent', key: 'koerperfettanteil', label: 'Fettanteil (%)', x: 25.2, y: 31.0, w: 17.0, h: 25.9 },
      { id: 's3-gewebe', key: 'weichteilgewebe', label: 'Gewebe (g)', x: 47.2, y: 31.0, w: 5.8, h: 25.9 },
      { id: 's3-fett', key: 'fettmasse', label: 'Fettmasse', x: 58.4, y: 31.0, w: 5.2, h: 25.9 },
      { id: 's3-mager', key: 'regionaleMagermasse', label: 'Regionale Magermasse', x: 69.2, y: 31.0, w: 5.2, h: 25.9 },
      { id: 's3-bmc', key: 'bmc', label: 'Knochenmineral (BMC)', x: 80.2, y: 31.0, w: 4.7, h: 25.9 },
      { id: 's3-gesamt', key: 'gesamtmasse', label: 'Gesamtmasse', x: 87.5, y: 31.0, w: 7.8, h: 25.9 },
      { id: 's3-android', key: 'androidGynoid', label: 'Android- und Gynoid-Region', x: 6.2, y: 49.1, w: 6.2, h: 2.5 },
      { id: 's3-seiten', key: 'seitenvergleich', label: 'Seitenvergleich rechts – links', x: 6.2, y: 52.8, w: 10.2, h: 4.0 },
      { id: 's3-verhaeltnis', key: 'fettverteilung', label: 'Fettmasse-Verhältnisse', x: 4.4, y: 57.8, w: 63.6, h: 6.3 },
      { id: 's3-vat', key: 'vat', label: 'Viszerales Fettgewebe', x: 4.4, y: 65.1, w: 56.0, h: 4.9 },
      { id: 's3-sat', key: 'sat', label: 'Subkutanes Fettgewebe', x: 4.4, y: 71.0, w: 56.0, h: 5.1 },
      { id: 's3-genauigkeit', key: 'messgenauigkeit', label: 'Messgenauigkeit', x: 4.4, y: 89.6, w: 79.0, h: 1.3 },
    ],
  },
  {
    id: '4',
    file: 'dexa-beispielbefund-4',
    title: 'Körperzusammensetzung mit Referenzkurven',
    alt: 'Anonymisierter DEXA-Beispielbefund, Ganzkörper Menge des Gewebes: Scanbild, Tabelle für Beine, Rumpf und gesamt mit Fettanteil, Centile, Gesamtmasse, Fett, Mager und Knochenmineral, Referenzkurven, Verlaufstabellen und BMI-Skala.',
    hotspots: [
      { id: 's4-bild', key: 'scanRegionen', label: 'Scanbild', x: 4.7, y: 30.0, w: 18.0, h: 38.6 },
      { id: 's4-prozent', key: 'koerperfettanteil', label: 'Fettanteil (%)', x: 35.4, y: 31.4, w: 9.3, h: 4.9 },
      { id: 's4-centile', key: 'perzentile', label: 'Centile', x: 50.4, y: 31.4, w: 4.5, h: 4.9 },
      { id: 's4-gesamt', key: 'gesamtmasse', label: 'Gesamtmasse', x: 58.2, y: 30.3, w: 6.6, h: 6.0 },
      { id: 's4-fett', key: 'fettmasse', label: 'Fettmasse', x: 71.0, y: 30.3, w: 3.9, h: 6.0 },
      { id: 's4-mager', key: 'magermasse', label: 'Magermasse', x: 80.8, y: 30.3, w: 4.2, h: 6.0 },
      { id: 's4-bmc', key: 'bmc', label: 'Knochenmineral (BMC)', x: 91.8, y: 30.3, w: 3.5, h: 6.0 },
      { id: 's4-kurven', key: 'perzentile', label: 'Referenzkurven', x: 23.8, y: 36.2, w: 35.3, h: 20.3 },
      { id: 's4-aenderung', key: 'verlauf', label: 'Verlauf', x: 59.4, y: 36.2, w: 36.0, h: 20.3 },
      { id: 's4-gewebe', key: 'weichteilgewebe', label: 'Gewebe (g)', x: 62.8, y: 58.8, w: 4.9, h: 3.8 },
      { id: 's4-fettfrei', key: 'fettfreieMasse', label: 'Fettfreie Masse', x: 90.6, y: 58.8, w: 4.7, h: 3.8 },
      { id: 's4-android', key: 'androidGynoid', label: 'Android- und Gynoid-Region', x: 55.0, y: 64.9, w: 16.8, h: 3.8 },
      { id: 's4-ag', key: 'agVerhaeltnis', label: 'A/G-Verhältnis', x: 74.9, y: 64.9, w: 8.6, h: 3.8 },
      { id: 's4-bmi', key: 'bmi', label: 'BMI', x: 23.5, y: 69.6, w: 72.0, h: 10.7 },
      { id: 's4-genauigkeit', key: 'messgenauigkeit', label: 'Messgenauigkeit', x: 4.4, y: 88.6, w: 90.0, h: 1.3 },
    ],
  },
  {
    id: '5',
    file: 'dexa-beispielbefund-5',
    title: 'Ganzkörper-Knochendichte',
    alt: 'Anonymisierter DEXA-Beispielbefund, Ganzkörper Knochendichte: Scanbilder, Diagramm der Knochendichte über das Alter und Tabelle mit Knochendichte für Kopf, Arme, Beine, Rumpf, Rippen, Wirbelsäule, Becken und gesamt mit Vergleichswerten.',
    hotspots: [
      { id: 's5-bild', key: 'scanRegionen', label: 'Scanbilder', x: 4.9, y: 30.2, w: 35.8, h: 38.6 },
      { id: 's5-kurve', key: 'bmdGanzkoerper', label: 'Diagramm Knochendichte', x: 41.8, y: 29.0, w: 52.6, h: 22.5 },
      { id: 's5-bmd', key: 'bmdGanzkoerper', label: 'Knochendichte je Region', x: 42.8, y: 53.9, w: 21.5, h: 13.2 },
      { id: 's5-vergleich', key: 'vergleichswerteKnochen', label: 'Vergleichswerte', x: 68.8, y: 53.9, w: 26.4, h: 13.2 },
      { id: 's5-genauigkeit', key: 'messgenauigkeit', label: 'Messgenauigkeit', x: 4.4, y: 88.6, w: 91.0, h: 1.3 },
    ],
  },
];

export const DEXA_SECTION = {
  title: 'Was zeigt eine DEXA-Körperanalyse?',
  lead: 'Blättern Sie durch einen anonymisierten Beispielbefund und erfahren Sie, was die einzelnen Messwerte bedeuten.',
  notice:
    'Die dargestellten Werte dienen als Beispiel. Die individuelle Beurteilung erfolgt im Zusammenhang mit Alter, Geschlecht, Körperbau und medizinischer Fragestellung.',
  cta: 'DEXA-Körperanalyse buchen',
};
