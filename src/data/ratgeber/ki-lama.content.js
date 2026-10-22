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
// Kalibrierung neutral (Kugel oder Größenangaben des Röntgengeräts) – Kugel bei Ganzbein nicht routinemäßig (Peter, 22.10.2026).
// Beispielberichte = Demo-Datensätze des Herstellers, Messwerte darin werden nicht bewertet.
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-lama.js

export const HTML = `
      <p>Wenn wir stehen, läuft die Last des Körpers entlang einer gedachten Linie von der Hüfte über das Knie bis zum Sprunggelenk. Weicht diese Linie stark ab oder ist ein Bein kürzer als das andere, werden Gelenke unter Umständen ungleich belastet. Eine <strong>Beinachsenvermessung</strong> im Röntgenbild macht diese Verhältnisse messbar. Für die Beinachsenvermessung in Graz nutzt Röntgen am Kai die Software IB Lab LAMA. Sie misst Winkel und Längen nach einheitlichen Regeln und dokumentiert sie. Die Beurteilung bleibt ärztlich.</p>

      <h2>Wann Beinachse und Beinlänge wichtig sein können</h2>
      <p>Typische Anlässe für eine Vermessung sind:</p>
      <ul>
        <li>Knieschmerzen, wenn geklärt werden soll, ob ein O-Bein oder X-Bein eine Seite des Kniegelenks stärker belastet,</li>
        <li>die Planung einer Knieoperation, zum Beispiel einer Knieprothese oder einer Operation, die die Beinachse korrigiert,</li>
        <li>die Kontrolle nach dem Einsetzen einer Knieprothese,</li>
        <li>ein Beckenschiefstand oder ein auffälliges Gangbild, bei dem ein Längenunterschied der Beine vermutet wird,</li>
        <li>bei Kindern ab acht Jahren und Jugendlichen Fragen zu Beinstellung oder Beinlänge, ausgewertet an der Ganzbeinaufnahme.</li>
      </ul>
      <p>Kleine Unterschiede sind normal. Laut einer Übersichtsarbeit haben nur etwa zehn Prozent der Menschen exakt gleich lange Beine. Ob ein Messwert Bedeutung hat, hängt von Beschwerden und Untersuchung ab.</p>

      <h2>Die wichtigsten Begriffe einfach erklärt</h2>
      <p>Zum Verständnis des Messberichts reichen meist vier Begriffe:</p>
      <ul>
        <li><strong>Mechanische Achse:</strong> die gedachte Linie von der Mitte des Hüftkopfs bis zur Mitte des Sprunggelenks. Bei gerader Beinstellung verläuft sie ungefähr durch die Mitte des Knies.</li>
        <li><strong>HKA-Winkel</strong> (Hüft-Knie-Sprunggelenk-Winkel, englisch „hip-knee-ankle“): der Winkel zwischen der mechanischen Achse des Oberschenkels und der des Unterschenkels. Er beschreibt in einer Zahl, ob das Bein gerade steht oder eher zum O-Bein (Varus) oder X-Bein (Valgus) neigt.</li>
        <li><strong>Beinlängendifferenz:</strong> der Unterschied der Gesamtlänge beider Beine. Die Software misst Oberschenkelknochen und Schienbein auch einzeln.</li>
        <li><strong>Tibial Slope</strong> (Neigung des Schienbeinkopfs): Gemessen wird in der seitlichen Knieaufnahme, wie stark die Gelenkfläche des Schienbeins nach hinten abfällt. Der Wert betrifft die Stabilität des Knies und spielt bei der Planung mancher Knieoperationen eine Rolle, etwa nach Kreuzbandverletzungen.</li>
      </ul>
      <p>Daneben misst die Software weitere Winkel an Hüfte, Knie und Sprunggelenk. Sie zeigen, an welcher Stelle eine Fehlstellung entsteht. Ihre Deutung gehört ins Gespräch mit der behandelnden Ärztin oder dem behandelnden Arzt.</p>

      <h2>Ablauf: So entsteht die Röntgenaufnahme</h2>
      <p>Welche Aufnahme gemacht wird, steht auf der Zuweisung: eine Ganzbeinaufnahme, gezielte Knieaufnahmen oder beides, je nach Fragestellung. Für eine Beinachsenvermessung in Graz ist Röntgen bei Röntgen am Kai mit gültiger ärztlicher Zuweisung und e-card während der Röntgenzeiten ohne Termin möglich, eine Wunschzeit kann reserviert werden. Einen Überblick gibt die Seite <a href="/roentgen-graz">Röntgen in Graz</a>, zum Bein der Abschnitt <a href="/roentgen-graz#knie-unterschenkel">Knie und Unterschenkel</a>.</p>
      <h3>Ganzbeinaufnahme in Graz: So läuft sie ab</h3>
      <p>Die Ganzbeinaufnahme zeigt Hüfte, Knie und Sprunggelenk zugleich. Bei Röntgen am Kai entsteht sie im Stehen, weil das Bein dann das Körpergewicht trägt. Für Längen in Zentimetern gleicht die Software die Vergrößerung des Röntgenbildes aus: über eine Kalibrierkugel im Bild oder über die Größenangaben, die das Röntgengerät mitspeichert. Der Bericht nennt, welcher Weg verwendet wurde. Wichtig sind gerade Beine und nach vorn zeigende Füße, bei der Positionierung wird man angeleitet.</p>
      <h3>Knieaufnahmen</h3>
      <p>Oft wird gezielt das Knie geröntgt: von vorn (a.p.) und genau seitlich, bei Fragen zur Beinachse im Stehen. Die seitliche Aufnahme zeigt unter anderem die Neigung des Schienbeinkopfs. Knieaufnahmen wertet die Software erst ab 18 Jahren aus. Mehr dazu steht im Abschnitt <a href="/roentgen-graz#region-knie">Röntgen des Knies</a>.</p>
      <p>Die Strahlenbelastung beim Röntgen der Beine ist gering. Es werden nur so viele Aufnahmen gemacht, wie für die Fragestellung nötig sind.</p>

      <h2>Wie IB Lab LAMA die Messung unterstützt</h2>
      <p>IB Lab LAMA ist eine Software des Wiener Unternehmens ImageBiopsy Lab. Sie ist ein Beispiel für KI im Röntgen, die nicht nach Krankheiten sucht, sondern misst. Ausgewertet werden Ganzbeinaufnahmen von vorn sowie Knieaufnahmen von vorn und von der Seite. Die Software wertet jede passende Aufnahme automatisch aus. Auf der Ganzbeinaufnahme erkennt die Software Messpunkte wie die Mitte des Hüftkopfs, die Gelenkflächen am Knie und das Sprunggelenk. Daraus berechnet sie Achsen, Winkel und Längen und zeichnet die Linien ins Bild. Welche weiteren KI-Programme die Praxis nutzt, zeigt die <a href="/ratgeber/kuenstliche-intelligenz-radiologie">Übersicht zu KI in der Radiologie</a>.</p>
      <p>Das Ergebnis ist ein Messbericht: Tabellen mit den Werten beider Seiten und Referenzbereichen, daneben das Bild mit den Linien. Werte außerhalb des Referenzbereichs sind farbig markiert. Bei Kindern und Jugendlichen unter 16 Jahren fehlen die Referenzbereiche, weil sich die Werte im Wachstum noch ändern. Eine Drehung des Beins bei der Aufnahme schätzt die Software anhand des Wadenbeins ab. Auf der Ganzbeinaufnahme gibt sie für Beine ohne Knieprothese zusätzlich korrigierte Winkel aus.</p>
<!--media:report-->
      <p>Die Radiologin bzw. der Radiologe kontrolliert jede Linie und jeden Wert. Der Bericht der Software lässt sich nicht verändern. Stimmt ein Wert nicht, misst die Radiologin bzw. der Radiologe selbst nach, im Befund steht der ärztliche Wert.</p>
      <h3>Beinachse aus der Knieaufnahme: eine ergänzende Abschätzung</h3>
      <p>Eine neuere Funktion schätzt Werte der Beinachse, etwa den HKA-Winkel, aus einer Knieaufnahme von vorn ab. Hüfte und Sprunggelenk sind darauf nicht zu sehen. Die Werte werden also vorhergesagt, nicht gemessen, und der Bericht kennzeichnet sie so. Das kann eine Knieaufnahme ergänzen, ersetzt aber nicht in jedem Fall eine Ganzbeinaufnahme, etwa vor einer genau geplanten Operation.</p>

      <h2>Was die Vermessung mit KI bringen kann</h2>
      <p>Wer die Knieachse vermessen lässt, profitiert vor allem von Einheitlichkeit:</p>
      <ul>
        <li><strong>Gleiche Methode bei jeder Messung:</strong> Die Messpunkte werden nach festen Regeln gesetzt. Das erleichtert den Vergleich, etwa vor und nach einer Operation.</li>
        <li><strong>Nachvollziehbar:</strong> Jede Linie ist im Bild sichtbar.</li>
        <li><strong>Vollständige Dokumentation:</strong> Längen, Achsen und Winkel beider Beine stehen in einem Bericht.</li>
      </ul>
      <p>Ein Wiener Orthopädie-Team hat die Software, teils gemeinsam mit dem Hersteller, mit Messungen von Fachleuten an Ganzbeinaufnahmen verglichen, auch bei Knieprothesen. Die Ergebnisse stimmten insgesamt gut überein. Solche Studien beschreiben Gruppen, nicht die einzelne Messung.</p>

      <h2>Grenzen: Was die KI nicht kann</h2>
      <ul>
        <li>Die Software stellt keine Diagnose. Sie ersetzt weder die radiologische Befundung noch die orthopädische Untersuchung und entscheidet nicht über Einlagen, Therapie oder Operation.</li>
        <li>Die Messung hängt von der Aufnahme ab: Haltung, Drehung des Beins und Bildausschnitt können Messpunkte verschieben. Einzelne Werte werden dann nachgemessen oder weggelassen.</li>
        <li>Knie- und Hüftprothesen berücksichtigt die Software, bei einer Hüftprothese gibt sie aber keine Beinlängen an. Nicht vorgesehen ist sie bei Teilprothesen des Knies, Sprunggelenksprothesen, Metallplatten nahe am Knie und Tumorprothesen.</li>
        <li>Ebenfalls nicht vorgesehen ist sie bei Kindern unter acht Jahren, bei Knochenbrüchen, bei einem äußeren Haltegestell (Fixateur externe), bei Knochentumoren und bei seltenen Wachstumsstörungen wie manchen Formen des Kleinwuchses. Dann misst die Radiologin bzw. der Radiologe von Hand.</li>
        <li>Ein Wert außerhalb des Referenzbereichs ist nicht automatisch krankhaft. Eine leichte O- oder X-Bein-Stellung ist häufig und verursacht nicht immer Beschwerden.</li>
        <li>Längenangaben hängen davon ab, wie die Vergrößerung ausgeglichen wurde. Das wird ärztlich geprüft. Winkel betrifft das nicht.</li>
      </ul>

      <h2>Nach der Beinachsenvermessung: der Befund</h2>
      <p>Befund und Bilder gehen an die zuweisende Ärztin oder den zuweisenden Arzt. Dort werden die Werte besprochen und das weitere Vorgehen festgelegt. Sie sind zusätzlich über ELGA und portal.marc.at verfügbar. Der Messbericht wird mit den Bildern archiviert und steht der zuweisenden Ärztin bzw. dem zuweisenden Arzt zur Verfügung, ebenso über ELGA.</p>
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
  "IB Lab GmbH. IB Lab LAMA – Gebrauchsanweisung (deutsch), Stand September 2026. Vom Hersteller zur Verfügung gestellt.",
  "ImageBiopsy Lab: IB Lab LAMA – Produktbeschreibung und Zweckbestimmung. <a href=\"https://www.imagebiopsy.com/product/lama-ce\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)",
  "Simon S, Schwarz GM, Aichmair A, Frank BJH, Hummer A, DiFranco MD, Dominkus M, Hofstaetter JG. Fully automated deep learning for knee alignment assessment in lower extremity radiographs: a cross-sectional diagnostic study. Skeletal Radiol. 2022;51(6):1249–1259. <a href=\"https://doi.org/10.1007/s00256-021-03948-9\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00256-021-03948-9<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Schwarz GM, Simon S, Mitterer JA, Frank BJH, Aichmair A, Dominkus M, Hofstaetter JG. Artificial intelligence enables reliable and standardized measurements of implant alignment in long leg radiographs with total knee arthroplasties. Knee Surg Sports Traumatol Arthrosc. 2022;30(8):2538–2547. <a href=\"https://doi.org/10.1007/s00167-022-07037-9\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00167-022-07037-9<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Paley D, Herzenberg JE, Tetsworth K, McKie J, Bhave A. Deformity planning for frontal and sagittal plane corrective osteotomies. Orthop Clin North Am. 1994;25(3):425–465. <a href=\"https://doi.org/10.1016/S0030-5898(20)31927-1\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1016/S0030-5898(20)31927-1<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Gordon JE, Davis LE. Leg length discrepancy: the natural history (and what do we really know). J Pediatr Orthop. 2019;39(Suppl 1):S10–S13. <a href=\"https://doi.org/10.1097/BPO.0000000000001396\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1097/BPO.0000000000001396<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>"
];
