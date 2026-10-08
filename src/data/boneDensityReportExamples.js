// Knochendichte-Beispielbefunde für den Befund-Slider der Seite /knochendichtemessung-graz – ZENTRALE Datenstruktur.
// Hier werden Folien, Hotspot-Positionen, Erklärungstexte und Quellen gepflegt; die Komponente
// src/components/dexa/DexaReportSlider.jsx liest nur hieraus (Prop „set“).
//
// Regeln (Auftrag 07.10.2026):
// - Erklärungen nur aus den Quellen in BONE_SOURCES (ISCD Official Positions 2023, DVO-Leitlinie Osteoporose 2023,
//   Gupta et al. 2021) und aus dem, was im Befund selbst gedruckt steht. Jede Erklärung nennt ihre Fundstelle.
// - Keine erfundenen Grenzwerte, keine individuellen Therapieempfehlungen, keine Bewertung der Beispielwerte.
//   Befunde werden NICHT automatisiert diagnostiziert.
// - T-Score-Bereiche immer zusammen mit dem Hinweis, dass sie nicht für alle Altersgruppen gelten (Z-Score bei Jüngeren).
//
// Befunde: anonymisierte Praxisbefunde (GE Lunar Prodigy), Stand 07.10.2026. Der Kopfbereich war bereits mit „####“
// geschwärzt; zusätzlich entfernt (echte PDF-Schwärzung): Zuweisernummer, Erstellungsdatum und -uhrzeit,
// Geräteseriennummer, Zeitpunkt der TBS-Kalibrierung, PDF-Metadaten. Jede PDF-Seite = eine Folie (eigene PDF-Datei).
// Bilder: python3 scripts/dexa_render_pages.py knochendichte, danach npm run images:knochendichte.
//
// Hotspot-Rechtecke: x, y, w, h in Prozent der Seitenbreite bzw. -höhe (Ursprung oben links), aus den Textpositionen
// der PDFs gemessen (Kanten auf den Zeilengrenzen der Wort-Rahmen, geprüft 08.10.2026: kein Rahmen schneidet Schrift).
// Ein Hotspot ist nur ein Rahmen ohne Füllung und verdeckt keine Messwerte.

export const BONE_IMAGE = { width: 2400, height: 3395, widths: [800, 1200, 1800, 2400] };

export const BONE_SOURCES = {
  iscd: {
    short: 'ISCD 2023',
    citation:
      'International Society for Clinical Densitometry (ISCD). 2023 ISCD Official Positions – Adult. Verabschiedet am 24.08.2023 (englisch).',
    url: 'https://iscd.org/official-positions-2023/',
  },
  dvo: {
    short: 'DVO-Leitlinie 2023',
    citation:
      'Dachverband Osteologie (DVO). Leitlinie zur Prophylaxe, Diagnostik und Therapie der Osteoporose bei postmenopausalen Frauen und bei Männern ab dem 50. Lebensjahr, Version 2.1, 2023.',
    url: 'https://leitlinien.dv-osteologie.org/',
  },
  gupta: {
    short: 'Gupta et al. 2021',
    citation:
      'Gupta P, Cherian KE, Kapoor N, Paul TV. Aortic Calcification Artifact Causing Spuriously High Bone Mineral Density in the Lumbar Spine. AACE Clinical Case Reports. 2021;7(4):284–286.',
    url: 'https://doi.org/10.1016/j.aace.2020.12.007',
  },
};

// Wiederkehrende Fundstellen
const ISCD_DIAG = { id: 'iscd', stelle: 'Abschnitt „Central DXA for Diagnosis“' };
const ISCD_YOUNG = { id: 'iscd', stelle: 'Abschnitt „BMD Reporting in Females Prior to Menopause and in Males Younger Than Age 50“' };
const DVO_DEF = { id: 'dvo', stelle: 'Kapitel 2' };
const DVO_MESS = { id: 'dvo', stelle: 'Kapitel 8.3.2' };

// Erklärungen je Messwert (mehrere Hotspots dürfen dieselbe Erklärung verwenden).
// Felder: name, definition, beschreibt, einheit (optional), einschraenkung, quellen [{ id, stelle }]
export const BONE_EXPLANATIONS = {
  bmd: {
    name: 'Knochendichte (BMD)',
    definition:
      'BMD steht für „bone mineral density“, die Knochenmineraldichte. DEXA misst, wie viel Knochenmineral auf einer Fläche des Röntgenbildes liegt.',
    beschreibt:
      'Den eigentlichen Messwert, aus dem T-Wert und Z-Wert berechnet werden. Es ist eine Flächendichte, keine Dichte pro Volumen.',
    einheit: 'Gramm pro Quadratzentimeter (g/cm²)',
    einschraenkung:
      'Die absoluten Zahlen hängen vom Gerät ab. Werte von verschiedenen Geräten lassen sich nur vergleichen, wenn die Geräte aufeinander abgeglichen sind.',
    quellen: [
      { id: 'iscd', stelle: 'Abschnitte „Baseline DXA Report“ und „Glossary“' },
      { id: 'iscd', stelle: 'Abschnitt „BMD Comparison Between Facilities“' },
    ],
  },
  tScore: {
    name: 'T-Wert (T-Score)',
    definition:
      'Der T-Wert vergleicht Ihre Knochendichte mit dem Durchschnitt junger, gesunder Erwachsener. Er gibt an, um wie viele Standardabweichungen Ihr Wert davon abweicht.',
    beschreibt:
      'Vereinfacht gelten diese Bereiche: ein T-Wert von mindestens −1 ist unauffällig. Zwischen −1 und −2,5 spricht man von niedriger Knochendichte (Osteopenie). Bei höchstens −2,5 liegt eine Osteoporose im Sinne der WHO-Definition vor.',
    einheit: 'ohne Einheit (Standardabweichungen)',
    einschraenkung:
      'Diese Einordnung gilt nicht für alle Altersgruppen: Sie ist für Frauen nach der Menopause und Männer ab 50 Jahren gedacht. Bei jüngeren Erwachsenen ist meist der Z-Wert wichtiger. Auch dann ist der T-Wert allein keine Diagnose – sie wird ärztlich im Gesamtzusammenhang gestellt.',
    quellen: [ISCD_DIAG, { id: 'iscd', stelle: 'Abschnitt „BMD Reporting in Postmenopausal Women and in Men Age 50 and Older“' }, DVO_DEF],
  },
  zScore: {
    name: 'Z-Wert (Z-Score)',
    definition:
      'Der Z-Wert vergleicht Ihre Knochendichte mit Menschen gleichen Alters und Geschlechts. Er gibt an, um wie viele Standardabweichungen Ihr Wert vom Altersdurchschnitt abweicht.',
    beschreibt:
      'Bei Frauen vor der Menopause und bei Männern unter 50 Jahren ist der Z-Wert der bevorzugte Wert. Ein Z-Wert von −2,0 oder darunter liegt laut ISCD „unterhalb des altersentsprechenden Bereichs“.',
    einheit: 'ohne Einheit (Standardabweichungen)',
    einschraenkung:
      'Bei Männern unter 50 Jahren kann eine Osteoporose nicht allein anhand der Knochendichte diagnostiziert werden. Ein auffälliger Z-Wert ist ein Anlass für ärztliche Abklärung, keine Diagnose.',
    quellen: [ISCD_YOUNG],
  },
  prozentVergleich: {
    name: 'YA (%) und AM (%)',
    definition:
      'Die Abkürzungen stehen für „young adult“ (junge Erwachsene) und „age matched“ (gleiches Alter). Die Spalten zeigen Ihre Knochendichte in Prozent des Durchschnitts der jeweiligen Vergleichsgruppe.',
    beschreibt:
      'Dieselben Vergleiche wie T-Wert (YA) und Z-Wert (AM), nur in Prozent statt in Standardabweichungen. 100 % entspricht genau dem Durchschnitt der Vergleichsgruppe.',
    einheit: 'Prozent (%)',
    einschraenkung: 'Für die Einordnung werden T-Wert bzw. Z-Wert verwendet, nicht die Prozentwerte.',
    quellen: [{ id: 'iscd', stelle: 'Abschnitt „DXA Decimal Digits“' }, ISCD_DIAG],
  },
  lws: {
    name: 'Lendenwirbelsäule L1–L4',
    definition:
      'Gemessen werden die vier Lendenwirbel L1 bis L4, im Bild von oben nach unten beschriftet. Die Linien grenzen die einzelnen Wirbel ab.',
    beschreibt:
      'Die Tabelle zeigt jeden Wirbel einzeln und den gemeinsamen Wert L1–L4. Für die Beurteilung zählt der gemeinsame Wert aller auswertbaren Wirbel.',
    einschraenkung:
      'Arthrose (Abnützung) mit knöchernen Anbauten, Verkalkungen – etwa der Bauchschlagader – und Wirbelveränderungen wie ein eingebrochener Wirbel können die Werte an der Lendenwirbelsäule scheinbar erhöhen. Deshalb werden die Bilder ärztlich mitbeurteilt.',
    quellen: [{ id: 'iscd', stelle: 'Abschnitt „Spine Region of Interest“' }, DVO_MESS, { id: 'gupta', stelle: 'Fallbericht' }],
  },
  lwsMittelwert: {
    name: 'Gemeinsamer Wert L1–L4',
    definition: 'Der Wert der Zeile „L1-L4“ fasst die auswertbaren Lendenwirbel zusammen.',
    beschreibt:
      'Diesen Wert verwendet man für die Einordnung der Lendenwirbelsäule. Einzelne Wirbel allein reichen dafür nicht: Laut ISCD soll ein einzelner Wirbel weder für die Einordnung noch für Verlaufskontrollen verwendet werden.',
    einschraenkung:
      'Wurden Wirbel ausgeschlossen, steht im Befund ein entsprechender Bereich, zum Beispiel L1–L3. Mit weniger Wirbeln wird die Messung ungenauer.',
    quellen: [{ id: 'iscd', stelle: 'Abschnitt „Reporting Less Than Four Vertebrae“' }, DVO_MESS],
  },
  wirbelausschluss: {
    name: 'Warum einzelne Wirbel ausgeschlossen werden',
    definition:
      'Die Software berechnet die Knochendichte auch für Kombinationen einzelner Wirbel. In Klammern steht jeweils, welcher Wirbel weggelassen wurde – „L1–L4 (L2)“ bedeutet L1 bis L4 ohne L2.',
    beschreibt:
      'Ein Wirbel wird ausgeschlossen, wenn er durch örtliche Veränderungen oder Artefakte nicht auswertbar ist, zum Beispiel bei Abnützung, einem Wirbelbruch, Verkrümmung oder starken Gefäßverkalkungen. Laut ISCD kommt das auch in Frage, wenn sich sein T-Wert um mehr als 1,0 von den Nachbarwirbeln unterscheidet. Es sollen mindestens zwei Wirbel übrig bleiben.',
    einschraenkung:
      'Welche Wirbel zählen, entscheidet die befundende Ärztin bzw. der befundende Arzt anhand des Bildes. Die Kombinationen in der Tabelle sind Rechenangebote der Software, keine Auswahl.',
    quellen: [{ id: 'iscd', stelle: 'Abschnitt „Spine Region of Interest“' }, DVO_MESS],
  },
  referenzkurve: {
    name: 'Referenzkurve und farbige Bereiche',
    definition:
      'Das Diagramm zeigt die Knochendichte (links in g/cm², rechts als T-Wert) über dem Lebensalter. Das Kästchen markiert den Messwert.',
    beschreibt:
      'Die Farbfelder entsprechen den T-Wert-Bereichen, die im Diagramm beschriftet sind: Grün „Normal“, Gelb „Osteopenie“, Rot „Osteoporose“. Der hellere, schräg abfallende Streifen zeigt den altersentsprechenden Bereich der Vergleichsbevölkerung.',
    einschraenkung:
      'Die Farben beruhen auf dem T-Wert und gelten daher so nur für Frauen nach der Menopause und Männer ab 50. Die Vergleichsbevölkerung steht im Kleingedruckten des Befunds. Das Diagramm ersetzt keine ärztliche Beurteilung.',
    quellen: [ISCD_DIAG, ISCD_YOUNG, { id: 'iscd', stelle: 'Abschnitt „Reference Database for T-Scores“' }],
  },
  messgenauigkeit: {
    name: 'Messgenauigkeit und Verlauf',
    definition:
      'Das Kleingedruckte nennt in der ersten Zeile, wie stark Folgemessungen rein messbedingt schwanken – hier in g/cm². Darunter stehen die Vergleichsbevölkerung und die WHO-Einteilung.',
    beschreibt:
      'Bei einer Kontrolle zeigt der Befund die Veränderung gegenüber dem Vorwert in g/cm² und in Prozent. Aussagekräftig ist eine Veränderung erst, wenn sie größer ist als die kleinste sicher erkennbare Änderung („Least Significant Change“) der jeweiligen Praxis.',
    einschraenkung:
      'Verlaufswerte sind nur am selben bzw. abgeglichenen Gerät vergleichbar. Bringen Sie frühere Befunde daher mit. Ob und wann eine Kontrolle sinnvoll ist, hängt von Ihrer Situation ab.',
    quellen: [
      { id: 'iscd', stelle: 'Abschnitte „Precision Assessment“ und „Follow-Up DXA Report“' },
      { id: 'iscd', stelle: 'Abschnitt „BMD Comparison Between Facilities“' },
      { id: 'dvo', stelle: 'Kapitel 5.1.2' },
    ],
  },
  tBereiche: {
    name: 'WHO-Einteilung im Befund',
    definition:
      'Das Kleingedruckte nennt die Vergleichsbevölkerung und druckt die WHO-Definition mit ab: normal ab einem T-Wert von −1,0, Osteopenie zwischen −1,0 und −2,5, Osteoporose ab −2,5 und darunter.',
    beschreibt:
      'Diese Einteilung beruht auf dem Vergleich mit jungen gesunden Frauen. Sie gilt für Frauen nach der Menopause und für Männer ab 50 Jahren.',
    einschraenkung:
      'Bei jüngeren Erwachsenen ist meist der Z-Wert wichtiger. Die Einteilung ist eine Messdefinition – die Diagnose stellt die Ärztin oder der Arzt im klinischen Zusammenhang, etwa nach Ausschluss anderer Ursachen einer niedrigen Knochendichte.',
    quellen: [DVO_DEF, ISCD_YOUNG],
  },
  huefteRegionen: {
    name: 'Messbild der Hüfte',
    definition:
      'Das Bild zeigt den oberen Oberschenkelknochen mit den Messregionen: Schenkelhals, Trochanter-Region und Schaft. Zusammen ergeben sie die Gesamt-Hüfte.',
    beschreibt:
      'Für die Beurteilung zählen der Schenkelhals („Hals“) und die Gesamt-Hüfte („Gesamt“). Die DVO-Leitlinie empfiehlt die Messung an beiden Hüften.',
    einschraenkung:
      'Eine korrekte Lagerung des Beins ist wichtig für vergleichbare Werte. Ob das Bild auswertbar ist, beurteilt die Ärztin oder der Arzt.',
    quellen: [{ id: 'iscd', stelle: 'Abschnitt „Hip ROI“' }, DVO_MESS],
  },
  schenkelhals: {
    name: 'Schenkelhals („Hals“)',
    definition: 'Der Schenkelhals ist der schmale Abschnitt zwischen Hüftkopf und Oberschenkelschaft.',
    beschreibt:
      'Er ist einer der Messorte für die Einordnung nach WHO. Die Knochendichte am Schenkelhals fließt auch in die FRAX-Berechnung des Bruchrisikos ein.',
    einheit: 'BMD in g/cm², dazu T-Wert und Z-Wert',
    einschraenkung:
      'Laut ISCD zählt an der Hüfte der niedrigere Wert von Schenkelhals und Gesamt-Hüfte. Ein Wert allein ergibt keine Diagnose.',
    quellen: [{ id: 'iscd', stelle: 'Abschnitt „Hip ROI“' }, { id: 'dvo', stelle: 'Kapitel 7.6.2 (FRAX)' }],
  },
  gesamtHuefte: {
    name: 'Gesamt-Hüfte („Gesamt“)',
    definition: 'Die Gesamt-Hüfte („Total Hip“) fasst alle Messregionen des oberen Oberschenkelknochens zusammen.',
    beschreibt:
      'Neben dem Schenkelhals ist sie laut DVO-Leitlinie für die Einschätzung des Bruchrisikos und für Verlaufskontrollen am besten geeignet.',
    einheit: 'BMD in g/cm², dazu T-Wert und Z-Wert',
    einschraenkung: 'Wurden beide Hüften gemessen, wird für Verlaufskontrollen laut ISCD der Mittelwert beider Gesamt-Hüften verwendet.',
    quellen: [DVO_MESS, { id: 'iscd', stelle: 'Abschnitt „DXA Reporting: Reporting of Bilateral Hip Exams“' }],
  },
  weitereRegionen: {
    name: 'Trochanter und Schaft',
    definition: 'Teilbereiche der Hüftmessung: der Rollhügel (Trochanter) und ein Stück des Oberschenkelschafts.',
    beschreibt:
      'Sie gehen in die Gesamt-Hüfte ein. Für den Schaft weist der Befund keinen T- oder Z-Wert aus (Striche in der Tabelle).',
    einschraenkung: 'Laut ISCD werden andere Hüftregionen als Schenkelhals und Gesamt-Hüfte, etwa der Trochanter, nicht zur Diagnose verwendet.',
    quellen: [ISCD_DIAG],
  },
  beideHueften: {
    name: 'Rechte und linke Hüfte',
    definition: 'Hier wurden beide Hüften gemessen. Jede Seite hat eine eigene Befundseite.',
    beschreibt:
      'Für die Einordnung zählt laut ISCD der niedrigste T-Wert von rechtem oder linkem Schenkelhals bzw. Gesamt-Hüfte – nicht der Mittelwert beider Seiten.',
    einschraenkung:
      'Die DVO-Leitlinie 2023 weist darauf hin, dass der niedrigste T-Wert nicht immer das tatsächliche Bruchrisiko am besten beschreibt. Für die Risikoeinschätzung werden die Messorte deshalb ärztlich gemeinsam betrachtet.',
    quellen: [{ id: 'iscd', stelle: 'Abschnitt „DXA Reporting: Reporting of Bilateral Hip Exams“' }, { id: 'dvo', stelle: 'Kapitel 7.6.2 und 5.1' }],
  },
  tbs: {
    name: 'Trabecular Bone Score (TBS)',
    definition:
      'Der TBS ist ein Zusatzwert, der aus der Bildstruktur der Lendenwirbelsäulen-Messung berechnet wird. Für den TBS ist keine zusätzliche Messung notwendig.',
    beschreibt:
      'Er gibt indirekt Hinweise auf die innere Struktur des Knochens und ergänzt die Knochendichte bei der Abschätzung des Bruchrisikos. Das Farbbild zeigt den Wert örtlich an den Wirbeln.',
    einheit: 'ohne Einheit',
    einschraenkung:
      'Der TBS ist keine direkte Messung der Knochenarchitektur. Die Einteilung im Befund stammt von der Auswertungssoftware; liegt ein TBS vor, wird er bei der Bestimmung des Bruchrisikos ärztlich berücksichtigt.',
    quellen: [{ id: 'dvo', stelle: 'Kapitel 5.2' }],
  },
  tbsKurve: {
    name: 'TBS im Altersvergleich',
    definition:
      'Das Diagramm zeigt den TBS-Wert über dem Alter im Vergleich zu einer Bezugsbevölkerung. Die beschrifteten Linien markieren den Mittelwert und eine Standardabweichung darüber und darunter.',
    beschreibt:
      'Liegt ein TBS vor, soll er laut DVO-Leitlinie bei der Bestimmung des Bruchrisikos berücksichtigt werden. Dafür sollte der altersbezogene Vergleich (TBS-Z-Wert) im Befund ersichtlich sein.',
    einschraenkung: 'Die Bezugsbevölkerung steht unter dem Diagramm. Der TBS allein ergibt keine Diagnose.',
    quellen: [{ id: 'dvo', stelle: 'Kapitel 5.2' }],
  },
  knochenfestigkeit: {
    name: 'Farbfelder aus Knochendichte und TBS',
    definition:
      'Die Software ordnet die T-Wert-Gruppe (Spalten) und die TBS-Gruppe (Zeilen) in eine Farbmatrix ein. Das Kästchen zeigt, in welchem Feld das Beispiel liegt.',
    beschreibt:
      'Die Farbskala darunter reicht von „Normal“ über „Mäßig“ und „Niedrig“ bis „Extrem niedrig“. Sie ist eine vereinfachte Darstellung der Software, wie sich beide Werte gemeinsam auf das Bruchrisiko auswirken können.',
    einschraenkung:
      'Die Matrix ist keine Diagnose. Laut DVO-Leitlinie ergibt sich das Bruchrisiko aus Knochendichte, TBS und klinischen Risikofaktoren gemeinsam.',
    quellen: [{ id: 'dvo', stelle: 'Kapitel 5.2' }, DVO_DEF],
  },
  frax: {
    name: 'FRAX: 10-Jahres-Wahrscheinlichkeit eines Bruchs',
    definition:
      'FRAX ist ein Rechenmodell einer WHO-Arbeitsgruppe. Es schätzt die Wahrscheinlichkeit für einen Hüftbruch und für „große osteoporotische Brüche“ (Hüfte, Wirbelkörper, Oberarm, Unterarm) in den nächsten zehn Jahren.',
    beschreibt:
      'Grundlage sind klinische Risikofaktoren und optional die Knochendichte am Schenkelhals. Die rechte Spalte rechnet zusätzlich den TBS ein. Darunter steht, welche Risikofaktoren eingegeben wurden.',
    einheit: 'Prozent (Wahrscheinlichkeit in zehn Jahren)',
    einschraenkung:
      'FRAX berücksichtigt nur einen Teil der bekannten Risikofaktoren. Die DVO-Leitlinie verwendet für Österreich, Deutschland und die Schweiz ein eigenes Risikomodell. Das Ergebnis ist eine Schätzung, keine Therapieentscheidung.',
    quellen: [{ id: 'dvo', stelle: 'Kapitel 7.6.2' }, { id: 'iscd', stelle: 'Abschnitt „Fracture Risk Assessment“' }],
  },
  niedrigsterWert: {
    name: 'T-Ergebnis je Messort',
    definition:
      'Die Tabelle stellt die T-Werte aller Messorte nebeneinander. Die grau hinterlegte Zelle ist laut Befund der niedrigste Wert. Die rechte Spalte zeigt die von der Software für den TBS angepassten T-Werte.',
    beschreibt:
      'Für die Einordnung nach WHO wird laut ISCD der niedrigste T-Wert von Lendenwirbelsäule, Schenkelhals und Gesamt-Hüfte herangezogen.',
    einschraenkung:
      'Die TBS-Anpassung ist eine Berechnung der Software; laut Befund ist sie nur für bestimmte Bevölkerungsgruppen geprüft. Diagnose und Bruchrisiko ergeben sich nicht aus einer einzelnen Zahl.',
    quellen: [ISCD_DIAG, { id: 'dvo', stelle: 'Kapitel 5.1' }],
  },
  keineAutomatik: {
    name: 'Keine automatische Diagnose',
    definition:
      'Die Software formuliert eine Schlussfolgerung zu TBS und Knochendichte. Im Kleingedruckten steht ausdrücklich: Sie diagnostiziert keine Krankheiten und empfiehlt keine Behandlung.',
    beschreibt:
      'Die Entscheidung trifft die Ärztin oder der Arzt – unter Berücksichtigung von Alter, früheren Knochenbrüchen, Medikamenten, Erkrankungen und der gemessenen Regionen.',
    einschraenkung:
      'Eine Osteoporose-Diagnose kann laut DVO-Leitlinie nie allein aus dem Messwert gestellt werden, sondern nur im klinischen Zusammenhang.',
    quellen: [DVO_DEF],
  },
};

// Die sechs Folien (jede PDF-Seite = eine Folie).
// hotspots: { id, key (→ BONE_EXPLANATIONS), label (kurz, für Liste/Screenreader), x, y, w, h in % }
export const BONE_REPORT_EXAMPLES = [
  {
    id: 'lws',
    file: 'knochendichte-beispielbefund-lws',
    title: 'Lendenwirbelsäule L1–L4',
    alt: 'Anonymisierter Knochendichte-Beispielbefund der Lendenwirbelsäule: Messbild mit den Wirbeln L1 bis L4, Diagramm der Knochendichte über das Alter mit grünem, gelbem und rotem Bereich und eine Tabelle mit Knochendichte, T-Wert und Z-Wert je Wirbel und für L1 bis L4.',
    hotspots: [
      { id: 'kd-lws-bild', key: 'lws', label: 'Wirbel L1–L4 im Bild', x: 5, y: 29.25, w: 35.05, h: 27.75 },
      { id: 'kd-lws-kurve', key: 'referenzkurve', label: 'Referenzkurve und Farbbereiche', x: 41.8, y: 30.7, w: 53.5, h: 17.3 },
      { id: 'kd-lws-bmd', key: 'bmd', label: 'Knochendichte (BMD)', x: 53.8, y: 55.2, w: 5.4, h: 9.45 },
      { id: 'kd-lws-t', key: 'tScore', label: 'T-Wert', x: 71.9, y: 55.45, w: 5.6, h: 9.2 },
      { id: 'kd-lws-z', key: 'zScore', label: 'Z-Wert', x: 89.9, y: 55.35, w: 5.6, h: 9.45 },
      { id: 'kd-lws-ya', key: 'prozentVergleich', label: 'YA (%)', x: 65.3, y: 55.45, w: 3, h: 9.2 },
      { id: 'kd-lws-am', key: 'prozentVergleich', label: 'AM (%)', x: 83.3, y: 55.2, w: 3, h: 9.45 },
      { id: 'kd-lws-gesamt', key: 'lwsMittelwert', label: 'Zeile L1–L4', x: 41.4, y: 63.07, w: 3.3, h: 1.26 },
      { id: 'kd-lws-who', key: 'tBereiche', label: 'Kleingedrucktes: WHO-Einteilung', x: 4.5, y: 86.88, w: 91.0, h: 3.75 },
    ],
  },
  {
    id: 'huefte-links',
    file: 'knochendichte-beispielbefund-femur-links',
    title: 'Hüfte links: Schenkelhals und Gesamt-Hüfte',
    alt: 'Anonymisierter Knochendichte-Beispielbefund der linken Hüfte: Messbild des oberen Oberschenkelknochens, Diagramm der Knochendichte über das Alter mit Farbbereichen und eine Tabelle für Hals, Trochanter, Schaft und Gesamt mit Knochendichte, T-Wert und Z-Wert.',
    hotspots: [
      { id: 'kd-hl-bild', key: 'huefteRegionen', label: 'Messbild der Hüfte', x: 5.2, y: 29.25, w: 34.85, h: 24.85 },
      { id: 'kd-hl-kurve', key: 'referenzkurve', label: 'Referenzkurve und Farbbereiche', x: 41.8, y: 30.7, w: 53.5, h: 17.3 },
      { id: 'kd-hl-hals', key: 'schenkelhals', label: 'Hals (Schenkelhals)', x: 41.4, y: 57.98, w: 5.9, h: 1.27 },
      { id: 'kd-hl-weitere', key: 'weitereRegionen', label: 'Trochanter und Schaft', x: 41.4, y: 59.27, w: 7.0, h: 2.53 },
      { id: 'kd-hl-gesamt', key: 'gesamtHuefte', label: 'Gesamt (Gesamt-Hüfte)', x: 41.4, y: 61.8, w: 7.8, h: 1.27 },
      { id: 'kd-hl-bmd', key: 'bmd', label: 'Knochendichte (BMD)', x: 53.8, y: 55.2, w: 5.4, h: 8.15 },
      { id: 'kd-hl-t', key: 'tScore', label: 'T-Wert', x: 71.9, y: 55.45, w: 5.6, h: 7.9 },
      { id: 'kd-hl-z', key: 'zScore', label: 'Z-Wert', x: 89.9, y: 55.35, w: 5.6, h: 8.15 },
      { id: 'kd-hl-genauigkeit', key: 'messgenauigkeit', label: 'Kleingedrucktes: Messgenauigkeit und Verlauf', x: 4.5, y: 86.88, w: 90.5, h: 3.75 },
    ],
  },
  {
    id: 'huefte-rechts',
    file: 'knochendichte-beispielbefund-femur-rechts',
    title: 'Hüfte rechts: zweite Seite der Hüftmessung',
    alt: 'Anonymisierter Knochendichte-Beispielbefund der rechten Hüfte: Messbild, Diagramm der Knochendichte über das Alter mit Farbbereichen und Tabelle für Hals, Trochanter, Schaft und Gesamt.',
    hotspots: [
      { id: 'kd-hr-titel', key: 'beideHueften', label: 'Rechte und linke Hüfte', x: 58.4, y: 29.1, w: 19.4, h: 1.6 },
      { id: 'kd-hr-kurve', key: 'referenzkurve', label: 'Referenzkurve und Farbbereiche', x: 41.8, y: 30.7, w: 53.5, h: 17.3 },
      { id: 'kd-hr-hals', key: 'schenkelhals', label: 'Hals (Schenkelhals)', x: 41.4, y: 57.98, w: 6.8, h: 1.27 },
      { id: 'kd-hr-gesamt', key: 'gesamtHuefte', label: 'Gesamt (Gesamt-Hüfte)', x: 41.4, y: 61.8, w: 8.8, h: 1.27 },
      { id: 'kd-hr-t', key: 'tScore', label: 'T-Wert', x: 71.9, y: 55.45, w: 5.6, h: 7.9 },
      { id: 'kd-hr-z', key: 'zScore', label: 'Z-Wert', x: 89.9, y: 55.35, w: 5.6, h: 8.15 },
    ],
  },
  {
    id: 'tbs-1',
    file: 'knochendichte-beispielbefund-tbs-1',
    title: 'Knochengesundheitsbericht 1/3: Trabecular Bone Score',
    alt: 'Anonymisierter Knochengesundheitsbericht, Seite 1 von 3: farbiges TBS-Bild der Lendenwirbelsäule, TBS-Ergebnis für L1 bis L4 und Diagramm des TBS über das Alter.',
    hotspots: [
      { id: 'kd-t1-bild', key: 'tbs', label: 'TBS-Farbbild', x: 9, y: 35.05, w: 39.4, h: 21.75 },
      { id: 'kd-t1-wert', key: 'tbs', label: 'TBS-Ergebnis', x: 55.1, y: 35.3, w: 36.8, h: 1.3 },
      { id: 'kd-t1-kurve', key: 'tbsKurve', label: 'TBS im Altersvergleich', x: 52.6, y: 36.82, w: 42, h: 17.03 },
    ],
  },
  {
    id: 'tbs-2',
    file: 'knochendichte-beispielbefund-tbs-2',
    title: 'Knochengesundheitsbericht 2/3: Farbmatrix und FRAX',
    alt: 'Anonymisierter Knochengesundheitsbericht, Seite 2 von 3: Farbmatrix aus T-Wert- und TBS-Gruppe mit Farbskala, Tabelle der FRAX-10-Jahres-Wahrscheinlichkeit und Tabelle der T-Werte je Messort mit TBS-Anpassung.',
    hotspots: [
      { id: 'kd-t2-matrix', key: 'knochenfestigkeit', label: 'Farbmatrix BMD und TBS', x: 5.0, y: 52.86, w: 43.5, h: 11.34 },
      { id: 'kd-t2-legende', key: 'knochenfestigkeit', label: 'Farbskala', x: 5, y: 70.0, w: 43.5, h: 3.0 },
      { id: 'kd-t2-frax', key: 'frax', label: 'FRAX-Tabelle', x: 51.7, y: 35.1, w: 43.5, h: 14.1 },
      { id: 'kd-t2-t', key: 'niedrigsterWert', label: 'T-Ergebnis je Messort', x: 51.7, y: 50.1, w: 43.5, h: 16.2 },
    ],
  },
  {
    id: 'tbs-3',
    file: 'knochendichte-beispielbefund-tbs-3',
    title: 'Knochengesundheitsbericht 3/3: Wirbel-Kombinationen',
    alt: 'Anonymisierter Knochengesundheitsbericht, Seite 3 von 3: Tabellen mit TBS und Knochendichte für einzelne Lendenwirbel und Wirbelkombinationen, Schlussfolgerung der Software sowie Anmerkungen und Literaturangaben.',
    hotspots: [
      { id: 'kd-t3-tbs', key: 'tbs', label: 'TBS je Wirbelbereich', x: 5.2, y: 35.1, w: 20.4, h: 27.8 },
      { id: 'kd-t3-bmd', key: 'wirbelausschluss', label: 'BMD-Wirbelkombinationen', x: 27.4, y: 35.1, w: 20, h: 27.9 },
      { id: 'kd-t3-schluss', key: 'keineAutomatik', label: 'Schlussfolgerung der Software', x: 51.6, y: 32.0, w: 43.0, h: 20.1 },
      { id: 'kd-t3-hinweis', key: 'messgenauigkeit', label: 'Kleingedrucktes: Messgenauigkeit', x: 4.8, y: 74.5, w: 90.0, h: 10.8 },
    ],
  },
];

// Texte rund um den Slider (Seite /knochendichtemessung-graz, Abschnitt #befund-lesen)
export const BONE_SECTION = {
  title: 'So lesen Sie Ihren DEXA-Befund',
  lead:
    'Blättern Sie durch anonymisierte Beispielbefunde aus unserer Praxis. Markierte Bereiche erklären, was die einzelnen Angaben bedeuten.',
  sliderLabel: 'Anonymisierte Knochendichte-Beispielbefunde',
  tScoreTitle: 'T-Wert vereinfacht eingeordnet',
  tScoreBands: [
    { range: 'mindestens −1', text: 'unauffällig' },
    { range: 'zwischen −1 und −2,5', text: 'niedrige Knochendichte (Osteopenie)' },
    { range: 'höchstens −2,5', text: 'Osteoporose im Sinne der WHO-Definition' },
  ],
  tScoreCaveat:
    'Diese Einordnung gilt nicht für alle Altersgruppen. Sie ist für Frauen nach der Menopause und Männer ab 50 Jahren gedacht – bei jüngeren Erwachsenen ist meist der Z-Wert wichtiger. Befunde werden nicht automatisiert diagnostiziert: Die Werte werden immer ärztlich beurteilt.',
  diagnosisTitle: 'Keine Diagnose aus einer einzelnen Zahl',
  diagnosisText:
    'Die Diagnose und das Frakturrisiko ergeben sich nicht aus einer einzelnen Zahl. Alter, frühere Knochenbrüche, Medikamente, Erkrankungen und die gemessenen Regionen werden ärztlich berücksichtigt. Arthrose, Verkalkungen oder Wirbelveränderungen können die Werte an der Lendenwirbelsäule scheinbar erhöhen.',
  forearmTitle: 'Unterarm',
  forearmText:
    'In diesen Beispielbefunden wurde der Unterarm nicht gemessen. Laut ISCD wird er nur in bestimmten Situationen ergänzt – etwa wenn Wirbelsäule oder Hüfte nicht messbar oder nicht auswertbar sind oder bei einer Überfunktion der Nebenschilddrüse. Verwendet wird dann ein festgelegter Abschnitt der Speiche des nicht dominanten Arms.',
  notice:
    'Die Werte stammen aus einem Beispiel und sind keine Bewertung. Ihre persönlichen Ergebnisse besprechen Sie mit Ihrer Ärztin oder Ihrem Arzt.',
  dexaText:
    'DEXA ist das wissenschaftlich etablierte Standardverfahren zur Messung der Knochendichte. Die Untersuchung ist schnell, nicht invasiv und mit einer sehr geringen Strahlenbelastung verbunden.',
  cta: 'Knochendichtemessung in Graz vereinbaren',
  combinedNote:
    'Ab 50 Jahren können Sie die Knochendichtemessung gemeinsam mit einer Mammographie an einem Termin buchen – derzeit telefonisch.',
  sourcesTitle: 'Quellen der Erklärungen',
};

// Komplettes Set für den Slider (Prop „set“ von DexaReportSlider)
export const BONE_REPORT_SET = {
  idPrefix: 'kd',
  base: 'assets/knochendichte/',
  label: BONE_SECTION.sliderLabel,
  image: BONE_IMAGE,
  slides: BONE_REPORT_EXAMPLES,
  explanations: BONE_EXPLANATIONS,
  sources: BONE_SOURCES,
  thumbs: true,
};
