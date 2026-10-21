// Ratgeber-Artikel „KI-Beinachsenvermessung mit IB Lab LAMA“ – URL /ratgeber/ki-beinachsenvermessung-lama.
// Stand: 21.10.2026. Zielgruppe: Patientinnen und Patienten.
// Quellen: Herstellerseite IB Lab LAMA (Funktionsumfang, Zweckbestimmung), PUCmed-Produktbeschreibung (nur Funktionsumfang,
// ohne Werbezahlen), Simon 2022 (Skeletal Radiol), Schwarz 2022 (KSSTA), Paley 1994 (Begriffe Achsen/Winkel),
// Gordon & Davis 2019 (Beinlängendifferenz). Alle DOIs am 21.10.2026 über Crossref/PubMed geprüft.
// Leitplanken: KI misst, markiert, standardisiert, dokumentiert – keine Diagnose, kein Ersatz für radiologische Befundung,
// orthopädische Beurteilung oder Therapieplanung. Vorhergesagte Beinachse aus der Knieaufnahme nur als ergänzende
// Abschätzung, nie als pauschaler Ersatz der Ganzbeinaufnahme. Keine Genauigkeits-/Zeitangaben aus Herstellerwerbung.
// Beispielberichte = Demo-Datensätze des Herstellers, Messwerte darin werden nicht bewertet.
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-lama.js

export const HTML = `
      <p>Wenn wir stehen, läuft die Last des Körpers entlang einer gedachten Linie von der Hüfte über das Knie bis zum Sprunggelenk. Weicht diese Linie stark ab oder ist ein Bein kürzer als das andere, werden Gelenke unter Umständen ungleich belastet. Eine <strong>Beinachsenvermessung</strong> im Röntgenbild macht diese Verhältnisse messbar. Für die Beinachsenvermessung in Graz nutzt Röntgen am Kai die Software IB Lab LAMA. Sie misst Winkel und Längen nach einheitlichen Regeln und dokumentiert sie übersichtlich. Die Beurteilung bleibt ärztliche Aufgabe.</p>

      <h2>Wann Beinachse und Beinlänge wichtig sein können</h2>
      <p>Eine Vermessung wird meist aus einem konkreten Grund veranlasst. Typische Anlässe sind:</p>
      <ul>
        <li>Knieschmerzen, wenn geklärt werden soll, ob ein O-Bein oder X-Bein eine Seite des Kniegelenks stärker belastet,</li>
        <li>die Planung einer Knieoperation, zum Beispiel einer Knieprothese oder einer Operation, die die Beinachse korrigiert,</li>
        <li>die Kontrolle nach einer solchen Operation,</li>
        <li>ein Beckenschiefstand oder ein auffälliges Gangbild, bei dem ein Längenunterschied der Beine vermutet wird,</li>
        <li>bei Kindern und Jugendlichen Fragen zu Wachstum und Beinstellung.</li>
      </ul>
      <p>Kleine Unterschiede sind dabei normal. Laut einer Übersichtsarbeit haben nur etwa zehn Prozent der Menschen exakt gleich lange Beine. Ob ein Messwert eine Bedeutung hat, hängt immer von den Beschwerden und der körperlichen Untersuchung ab.</p>

      <h2>Die wichtigsten Begriffe einfach erklärt</h2>
      <p>Ein Messbericht enthält viele Abkürzungen. Für das Verständnis reichen meist vier Begriffe:</p>
      <ul>
        <li><strong>Mechanische Achse:</strong> die gedachte Linie von der Mitte des Hüftkopfs bis zur Mitte des Sprunggelenks. Sie zeigt, wie die Last durch das Bein läuft. Bei gerader Beinstellung verläuft sie ungefähr durch die Mitte des Knies.</li>
        <li><strong>HKA-Winkel</strong> (Hüft-Knie-Sprunggelenk-Winkel, englisch „hip-knee-ankle angle“): der Winkel zwischen der Achse des Oberschenkels und der des Unterschenkels. Er beschreibt in einer Zahl, ob das Bein gerade steht oder eher zum O-Bein (Varus) oder X-Bein (Valgus) neigt.</li>
        <li><strong>Beinlängendifferenz:</strong> der Unterschied der Gesamtlänge beider Beine. Die Software misst Oberschenkelknochen und Schienbein auch einzeln.</li>
        <li><strong>Tibial Slope</strong> (Neigung des Schienbeinkopfs): Gemessen wird, wie stark die Gelenkfläche des Schienbeins nach hinten abfällt, und zwar in der seitlichen Knieaufnahme. Der Wert spielt bei der Planung mancher Knieoperationen eine Rolle, etwa nach Kreuzbandverletzungen.</li>
      </ul>
      <p>Daneben misst die Software weitere Winkel an Hüfte, Knie und Sprunggelenk. Sie zeigen, an welcher Stelle eine Fehlstellung entsteht. Ihre Deutung gehört ins Gespräch mit der behandelnden Ärztin oder dem behandelnden Arzt.</p>

      <h2>Ablauf: So entsteht die Röntgenaufnahme</h2>
      <p>Welche Aufnahme gemacht wird, steht auf der Zuweisung: eine Ganzbeinaufnahme, gezielte Knieaufnahmen oder beides. Die zuweisende Ärztin oder der zuweisende Arzt wählt sie nach der Fragestellung aus. Für eine Beinachsenvermessung in Graz ist Röntgen bei Röntgen am Kai mit gültiger ärztlicher Zuweisung und e-card während der Röntgenzeiten ohne Termin möglich, eine Wunschzeit kann reserviert werden. Einen Überblick gibt die Seite <a href="/roentgen-graz">Röntgen in Graz</a>, zum Bein der Abschnitt <a href="/roentgen-graz#knie-unterschenkel">Knie und Unterschenkel</a>.</p>
      <h3>Ganzbeinaufnahme in Graz: So läuft sie ab</h3>
      <p>Für die vollständige Beinachse braucht es ein Bild, das Hüfte, Knie und Sprunggelenk zugleich zeigt. Eine solche Ganzbeinaufnahme entsteht in der Regel im Stehen, weil das Bein dann das Körpergewicht trägt. Häufig liegt ein Maßstab oder eine kleine Kalibrierkugel bekannter Größe mit im Bild. Daran kann die Software die Vergrößerung des Röntgenbildes ausgleichen und Längen in Zentimetern angeben. Wichtig ist eine ruhige, gerade Haltung, bei der Positionierung wird man angeleitet.</p>
      <h3>Knieaufnahmen</h3>
      <p>Oft wird gezielt das Knie geröntgt: von vorn (a.p.) und seitlich, je nach Fragestellung auch im Stehen. Die seitliche Aufnahme zeigt unter anderem die Neigung des Schienbeinkopfs. Mehr dazu steht im Abschnitt <a href="/roentgen-graz#region-knie">Röntgen des Knies</a>.</p>
      <p>Die Strahlenbelastung beim Röntgen der Beine ist gering. Es werden nur so viele Aufnahmen gemacht, wie für die Fragestellung nötig sind.</p>

      <h2>Wie IB Lab LAMA die Messung unterstützt</h2>
      <p>IB Lab LAMA ist eine CE-gekennzeichnete Medizinprodukt-Software des Wiener Unternehmens ImageBiopsy Lab. Sie ist ein Beispiel für KI im Röntgen, die nicht nach Krankheiten sucht, sondern misst. Die Software erkennt im Bild Messpunkte wie die Mitte des Hüftkopfs, die Gelenkflächen am Knie und das Sprunggelenk. Daraus berechnet sie Achsen, Winkel und Längen und zeichnet die Linien sichtbar ins Bild. Welche weiteren KI-Programme die Praxis nutzt, zeigt die <a href="/ratgeber/kuenstliche-intelligenz-radiologie">Übersicht zu KI in der Radiologie</a>.</p>
      <p>Das Ergebnis ist ein Messbericht: Tabellen mit den Werten beider Seiten und üblichen Referenzbereichen, daneben das Bild mit den eingezeichneten Linien. Werte außerhalb des Referenzbereichs sind farbig markiert. Ist das Bein bei der Aufnahme etwas gedreht, erkennt die Software das und kann zusätzlich rechnerisch korrigierte Werte ausgeben.</p>
<!--media:report-->
      <p>Die Radiologin oder der Radiologe kontrolliert jede Linie und jeden Wert, korrigiert bei Bedarf und übernimmt nur geprüfte Messungen in den schriftlichen Befund. Auch der Bericht selbst weist darauf hin, dass die Ergebnisse von einer medizinischen Fachkraft bestätigt werden müssen.</p>
      <h3>Beinachse aus der Knieaufnahme: eine ergänzende Abschätzung</h3>
      <p>Eine neuere Funktion schätzt Werte der Beinachse, etwa den HKA-Winkel, aus einer Knieaufnahme von vorn ab. Hüfte und Sprunggelenk sind darauf nicht zu sehen. Die Werte werden also nicht gemessen, sondern vorhergesagt, und der Bericht kennzeichnet sie entsprechend. Eine solche Abschätzung kann eine Knieaufnahme sinnvoll ergänzen. Sie ersetzt aber nicht in jedem Fall eine Ganzbeinaufnahme, etwa wenn eine Operation genau geplant werden soll. Welche Aufnahme nötig ist, entscheidet die zuweisende Ärztin oder der zuweisende Arzt.</p>

      <h2>Was die Vermessung mit KI bringen kann</h2>
      <p>Wer die Knieachse vermessen lässt, profitiert vor allem von Einheitlichkeit:</p>
      <ul>
        <li><strong>Gleiche Methode bei jeder Messung:</strong> Die Messpunkte werden nach festen Regeln gesetzt. Das erleichtert den Vergleich von Aufnahmen, zum Beispiel vor und nach einer Operation.</li>
        <li><strong>Nachvollziehbar:</strong> Jede Linie ist im Bild sichtbar. Ärztinnen und Ärzte sehen, wie ein Wert zustande kommt.</li>
        <li><strong>Vollständige Dokumentation:</strong> Längen, Achsen und Winkel beider Beine stehen übersichtlich in einem Bericht, der mit dem Befund weitergegeben werden kann.</li>
      </ul>
      <p>Ein Wiener Orthopädie-Team hat die Software in Studien, teils gemeinsam mit dem Hersteller, mit den Messungen von Fachleuten an Ganzbeinaufnahmen verglichen, auch bei Knieprothesen. Die Ergebnisse stimmten insgesamt gut überein. Solche Studien beschreiben Gruppen, nicht die einzelne Messung. Deshalb bleibt die ärztliche Kontrolle Teil jeder Auswertung.</p>

      <h2>Grenzen: Was die KI nicht kann</h2>
      <ul>
        <li>Die Software stellt keine Diagnose. Sie ersetzt weder die radiologische Befundung noch die orthopädische Untersuchung und entscheidet nicht über Einlagen, Therapie oder Operation.</li>
        <li>Die Messung hängt von der Aufnahme ab. Haltung, Drehung des Beins, Bildausschnitt und Implantate können Messpunkte verdecken oder verschieben. Dann misst die Ärztin oder der Arzt selbst nach oder lässt einzelne Werte weg.</li>
        <li>Ein Wert außerhalb des Referenzbereichs ist nicht automatisch krankhaft. Eine leichte O- oder X-Bein-Stellung ist häufig und verursacht nicht immer Beschwerden.</li>
        <li>Nicht jeder Wert ist für jede Altersgruppe vorgesehen. Bei Kindern berechnet die Software laut Hersteller einzelne Winkel nicht.</li>
        <li>Ohne Kalibrierung im Bild sind Längenangaben nur eingeschränkt verwertbar. Winkel sind davon nicht betroffen.</li>
      </ul>

      <h2>Nach der Beinachsenvermessung: der Befund</h2>
      <p>Befund und Bilder gehen an die zuweisende Ärztin oder den zuweisenden Arzt. Dort werden die Werte mit Beschwerden und Untersuchung besprochen und das weitere Vorgehen festgelegt. Befund und Bilder sind zusätzlich über ELGA sowie online unter portal.marc.at verfügbar.</p>
`;

export const MEDIA = {
  "slides": [
    {
      "key": "lama-ganzbein-1",
      "caption": "Ganzbeinaufnahme mit eingezeichneten Achsen. Links stehen Beinlängen und Achswinkel für beide Seiten, farbig markiert sind Werte außerhalb des Referenzbereichs.",
      "alt": "Messbericht IB Lab LAMA: Ganzbein-Röntgen mit Maßstab, Kalibrierkugel und Knieprothese rechts, eingezeichnete Achsen, Tabellen zu Beinlänge und Beinachse"
    },
    {
      "key": "lama-ganzbein-2",
      "caption": "Zweite Seite desselben Berichts: Für ein Bein gibt die Software zusätzlich Werte aus, die rechnerisch um die Drehung des Beins bei der Aufnahme korrigiert sind. Sie sind hellblau hinterlegt.",
      "alt": "Zweite Berichtsseite IB Lab LAMA: Ganzbein-Röntgen und Tabellen für eine Seite, rotationskorrigierte Winkel hellblau hinterlegt, CPAK-Raster und Rotationswinkel"
    },
    {
      "key": "lama-knie-ap",
      "caption": "Knieaufnahme beider Seiten von vorn: Aus diesem Bild schätzt die Software Werte der Beinachse wie den HKA-Winkel ab. Der Bericht vermerkt, dass sie mit prädiktiver KI ermittelt wurden.",
      "alt": "Bericht IB Lab LAMA zur Knieaufnahme von vorn: beide Knie, eines mit Prothese, eingezeichnete Gelenklinien und Tabelle mit vorhergesagten Beinachsenwerten"
    },
    {
      "key": "lama-knie-seitlich",
      "caption": "Seitliche Knieaufnahme: Die Software legt eine Achse durch den oberen Schienbeinschaft und misst daran die Neigung des Schienbeinkopfs nach hinten (Posterior Tibial Slope).",
      "alt": "Bericht IB Lab LAMA zur seitlichen Knieaufnahme: eingezeichnete Schienbeinachse mit Hilfskreisen und Winkel des hinteren Tibial Slope, Tabelle mit Normbereich"
    }
  ]
};

export const MEDIA_NOTE = `Beispielbericht des Herstellers (Demo-Datensatz, Personendaten entfernt).`;

export const SOURCES = [
  "ImageBiopsy Lab: IB Lab LAMA (CE) – Produktbeschreibung und Zweckbestimmung. <a href=\"https://www.imagebiopsy.com/product/lama-ce\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)",
  "Simon S, Schwarz GM, Aichmair A, Frank BJH, Hummer A, DiFranco MD, Dominkus M, Hofstaetter JG. Fully automated deep learning for knee alignment assessment in lower extremity radiographs: a cross-sectional diagnostic study. Skeletal Radiol. 2022;51(6):1249–1259. <a href=\"https://doi.org/10.1007/s00256-021-03948-9\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00256-021-03948-9<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Schwarz GM, Simon S, Mitterer JA, Frank BJH, Aichmair A, Dominkus M, Hofstaetter JG. Artificial intelligence enables reliable and standardized measurements of implant alignment in long leg radiographs with total knee arthroplasties. Knee Surg Sports Traumatol Arthrosc. 2022;30(8):2538–2547. <a href=\"https://doi.org/10.1007/s00167-022-07037-9\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00167-022-07037-9<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Paley D, Herzenberg JE, Tetsworth K, McKie J, Bhave A. Deformity planning for frontal and sagittal plane corrective osteotomies. Orthop Clin North Am. 1994;25(3):425–465. <a href=\"https://doi.org/10.1016/S0030-5898(20)31927-1\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1016/S0030-5898(20)31927-1<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Gordon JE, Davis LE. Leg length discrepancy: the natural history (and what do we really know). J Pediatr Orthop. 2019;39(Suppl 1):S10–S13. <a href=\"https://doi.org/10.1097/BPO.0000000000001396\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1097/BPO.0000000000001396<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>"
];
