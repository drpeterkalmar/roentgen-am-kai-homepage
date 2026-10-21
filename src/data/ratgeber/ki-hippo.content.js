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
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-hippo.js

export const HTML = `
      <p>Vor einer Hüftoperation und bei der Kontrolle einer Hüftprothese zählen oft wenige Grad oder Millimeter. Damit diese Zahlen verlässlich sind, werden sie auf dem Röntgenbild nach festen Regeln gemessen. Bei Röntgen am Kai unterstützt dabei die Software IB Lab HIPPO. Für die Hüftvermessung per Röntgen in Graz heißt das: Eine künstliche Intelligenz (KI) setzt Messpunkte und berechnet Winkel und Abstände. Die Radiologin oder der Radiologe prüft jede Messung und schreibt den Befund. Dieser Artikel erklärt, was die Werte bedeuten – und was die KI nicht kann.</p>

      <h2>Wann wird die Hüfte vermessen?</h2>
      <p>Gemessen wird vor allem in drei Situationen:</p>
      <ul>
        <li><strong>Bei Hüft- oder Leistenschmerzen</strong>, wenn geklärt werden soll, ob die Form von Hüftkopf und Hüftpfanne eine Rolle spielt. Beispiele sind eine zu flache Pfanne (Hüftdysplasie) oder ein Anstoßen von Schenkelhals und Pfannenrand bei Bewegung (Impingement).</li>
        <li><strong>Vor einer geplanten Hüftoperation</strong>, damit das Behandlungsteam die Ausgangslage kennt.</li>
        <li><strong>Nach dem Einsetzen einer Hüftprothese</strong>, also eines künstlichen Hüftgelenks, um Sitz und Geometrie zu kontrollieren, oft im Vergleich mit früheren Aufnahmen.</li>
      </ul>
      <p>Welche Aufnahme nötig ist, legt Ihre zuweisende Ärztin oder Ihr zuweisender Arzt fest. Die Fragestellung steht auf der Zuweisung.</p>

      <h2>Wie läuft die Beckenaufnahme ab?</h2>
      <p>Für die Hüftvermessung im Röntgen wird meist ein <strong>Beckenröntgen</strong> angefertigt, eine sogenannte Beckenübersicht. Sie zeigt beide Hüftgelenke auf einem Bild, sodass sich rechte und linke Seite vergleichen lassen. Je nach Fragestellung entsteht die Aufnahme im Stehen oder im Liegen. Im Stehen zeigt sich ein Schiefstand so, wie er im Alltag besteht.</p>
      <p>Die Aufnahme selbst dauert nur Sekunden. Das Röntgenteam hilft Ihnen in die richtige Position, die Beine werden dabei üblicherweise leicht nach innen gedreht. Bei manchen Fragestellungen liegt zusätzlich eine kleine Kugel mit bekanntem Durchmesser im Bild, die Kalibrierkugel. Weil ein Röntgenbild den Körper etwas vergrößert darstellt, lassen sich mit ihrer Hilfe Längen in echte Millimeter umrechnen.</p>
      <p>Ein Röntgen ist bei Röntgen am Kai in Graz mit gültiger ärztlicher Zuweisung und e-card während der Röntgenzeiten ohne Termin möglich, eine Wunschzeit kann reserviert werden. Die Strahlenbelastung ist gering, es werden nur so viele Aufnahmen wie nötig gemacht. Zeiten und Ablauf finden Sie auf der Seite <a href="/roentgen-graz#becken-huefte">Röntgen von Becken und Hüfte</a>.</p>

      <h2>Was analysiert HIPPO vor einer Operation?</h2>
      <p>Bei einer Hüfte ohne Prothese misst HIPPO auf der Beckenübersicht mehrere Werte für beide Seiten. Die wichtigsten, kurz erklärt:</p>
      <ul>
        <li><strong>Beckenschiefstand:</strong> Steht eine Beckenseite höher als die andere? Angegeben wird er in Grad und, wenn das Bild kalibriert ist, in Millimetern. Ein Schiefstand kann mit unterschiedlich langen Beinen zusammenhängen, aber auch andere Ursachen haben, etwa eine Fehlhaltung der Wirbelsäule.</li>
        <li><strong>CCD-Winkel</strong> (Caput-Collum-Diaphysen-Winkel): der Winkel zwischen Schenkelhals und Oberschenkelschaft. Er beschreibt, wie steil oder flach der Schenkelhals steht.</li>
        <li><strong>LCE-Winkel</strong> (lateraler Zentrum-Ecken-Winkel): Er zeigt, wie weit das Pfannendach den Hüftkopf seitlich überdacht. Ein eher kleiner Wert spricht für eine knappe Überdachung, ein eher großer für eine sehr tiefe Pfanne.</li>
        <li><strong>Sharp-Winkel, Acetabulum-Index, Extrusionsindex und Kopfüberdachung:</strong> weitere Maße dafür, wie steil die Hüftpfanne (das Acetabulum) steht und welcher Anteil des Hüftkopfs von ihr bedeckt ist.</li>
        <li><strong>Offset:</strong> der waagrechte Abstand vom Mittelpunkt des Hüftkopfs zur Achse des Oberschenkelknochens (femorales Offset) und zu einer Bezugslinie im Becken (acetabuläres Offset). Zusammen ergeben sie das Gesamt-Offset. Diese Maße beschreiben die ursprüngliche Gelenkgeometrie, die für die Planung einer Prothese wichtig ist.</li>
      </ul>
      <p>Im Bericht stehen die Werte in einer Tabelle, daneben ein Referenzbereich. Werte außerhalb dieses Bereichs sind farbig hervorgehoben. Das ist ein Hinweis zum genauen Hinsehen, aber keine Diagnose. Ob ein Wert für Ihre Beschwerden Bedeutung hat, beurteilen Ärztinnen und Ärzte gemeinsam mit der körperlichen Untersuchung.</p>

      <h2>Was wird nach einer Hüftprothese kontrolliert?</h2>
      <p>Nach dem Einsetzen eines künstlichen Hüftgelenks möchte das Behandlungsteam wissen, wie die Prothese sitzt. Für die Kontrolle der Hüftprothese misst HIPPO unter anderem:</p>
      <ul>
        <li><strong>Beinlängendifferenz:</strong> der Höhenunterschied zwischen rechter und linker Seite, gemessen an festen Knochenpunkten nahe der Hüfte. Ob ein Unterschied spürbar ist oder ausgeglichen werden sollte, hängt nicht allein von der Zahl ab.</li>
        <li><strong>Pfannenposition:</strong> die Pfanneninklination, also wie steil die künstliche Pfanne im Becken steht, und die Pfannenversion, also wie weit sie nach vorne oder hinten gedreht ist. Die Stellung der Pfanne ist einer von mehreren Faktoren für die Stabilität des Kunstgelenks.</li>
        <li><strong>Offset im Seitenvergleich:</strong> Femorales, acetabuläres und Gesamt-Offset zeigen, ob die Geometrie der operierten Hüfte der Gegenseite ähnelt.</li>
        <li><strong>Kopfdurchmesser und CCD-Winkel</strong> ergänzen die Beschreibung von Hüftkopf und Schenkelhals.</li>
      </ul>
      <p>Das Beckenröntgen erfasst die Beinlänge nur im Hüftbereich. Geht es um die ganze Beinlänge oder die Beinachse, ist eine Ganzbeinaufnahme nötig. Wie diese vermessen wird, erklärt der Artikel <a href="/ratgeber/ki-beinachsenvermessung-lama">Beinachse und Beinlänge vermessen mit IB Lab LAMA</a>.</p>
      <p>Werden spätere Kontrollaufnahmen nach denselben Regeln vermessen, fallen Veränderungen leichter auf. Wie beweglich und belastbar das Gelenk ist, zeigt ein Röntgenbild aber nicht. Das klärt Ihre Orthopädin oder Ihr Orthopäde in der Untersuchung.</p>

<!--media:report-->

      <h2>Vorteile reproduzierbarer Messungen</h2>
      <p>Von Hand gemessen hängt ein Winkel davon ab, wo genau jemand die Messpunkte setzt. Studien berichten deshalb von Unterschieden zwischen verschiedenen Untersuchern und sogar zwischen zwei Messungen derselben Person. Eine Software, die nach festen Regeln misst, hilft hier:</p>
      <ul>
        <li><strong>Gleiche Regeln bei jeder Aufnahme:</strong> Das erleichtert den Vergleich vor und nach einer Operation oder über mehrere Jahre.</li>
        <li><strong>Nachvollziehbar:</strong> Jede Linie ist im Bild eingezeichnet. Die Radiologin oder der Radiologe sieht, worauf ein Wert beruht, und kann ihn korrigieren.</li>
        <li><strong>Vollständig:</strong> Alle Werte beider Seiten stehen in einer Übersicht. Ihre behandelnde Ärztin oder Ihr behandelnder Arzt erhält eine einheitliche Dokumentation.</li>
        <li><strong>Blick für das ganze Bild:</strong> Sind Routinemessungen vorbereitet, bleibt mehr Aufmerksamkeit für alles, was keine Zahl ist, etwa Zeichen von Gelenkverschleiß (Arthrose).</li>
      </ul>
      <p>Eine begutachtete Studie aus dem Jahr 2023 hat eine frühere Version der Software mit den Messungen von drei Orthopäden verglichen. Bei Hüften mit normaler Überdachung und leichter Arthrose waren die automatischen Werte verlässlich. Bei zu geringer Überdachung und schwerer Arthrose sahen die Autoren noch Verbesserungsbedarf. Wie KI in der Radiologie insgesamt eingesetzt wird, lesen Sie in unserer <a href="/ratgeber/kuenstliche-intelligenz-radiologie">Übersicht zu KI in der Radiologie</a>.</p>

      <h2>Grenzen der KI</h2>
      <p>HIPPO bereitet Messungen vor und standardisiert sie. Sie ersetzt kein ärztliches Urteil:</p>
      <ul>
        <li><strong>Keine Erklärung für Beschwerden:</strong> Ein Winkel außerhalb des Referenzbereichs erklärt nicht automatisch Schmerzen. Unauffällige Werte schließen eine Erkrankung nicht aus.</li>
        <li><strong>Keine Entscheidung über Operation oder Behandlung:</strong> Ob operiert wird, ob eine Prothese gut liegt und welche Behandlung sinnvoll ist, entscheiden Ärztinnen und Ärzte nach Gespräch, Untersuchung und allen Befunden, nicht die Software.</li>
        <li><strong>Abhängig von der Aufnahme:</strong> Ist das Becken verdreht oder gekippt, verändern sich manche Winkel. Fehlt die Kalibrierung, sind Millimeterwerte nur Näherungen.</li>
        <li><strong>Nicht bei jedem Implantat:</strong> Laut Hersteller kann die Pfannenmessung bei bestimmten Implantaten ungenau sein, etwa bei Teilprothesen, Stützschalen, asymmetrischen Pfannen oder Pfannen mit Keramikeinsatz.</li>
        <li><strong>Nur für Erwachsene:</strong> Das Programm ist für Erwachsene vorgesehen. Bei Kindern wird die Hüfte nach anderen Kriterien beurteilt.</li>
      </ul>
      <p>Deshalb prüft die Radiologin oder der Radiologe jede eingezeichnete Linie, verwirft unpassende Messungen und beurteilt das Bild als Ganzes. Der Befund ist ein ärztlicher Befund. Er geht an Ihre zuweisende Ärztin oder Ihren zuweisenden Arzt und ist zusätzlich über ELGA und das Patientenportal portal.marc.at verfügbar.</p>
`;

export const MEDIA = {
  "slides": [
    {
      "key": "hippo-vor-op",
      "label": "Vor einer Operation",
      "caption": "Beispielbericht des Herstellers (Demo-Datensatz, Personendaten entfernt): Beckenübersicht im Stehen, beide Hüften ohne Prothese. Eingezeichnet sind eine waagrechte Bezugslinie, Messpunkte und Winkel. Die Tabelle nennt für rechts und links Beckenschiefstand, CCD-, LCE- und Sharp-Winkel, Acetabulum-Index, Extrusionsindex und Kopfüberdachung, jeweils mit Referenzbereich in eckigen Klammern. Farbig gesetzte Zahlen liegen außerhalb dieses Bereichs.",
      "alt": "KI-Messbericht IB Lab HIPPO: Beckenröntgen im Stehen mit eingezeichneten Hüftwinkeln und Tabelle der Messwerte für rechte und linke Hüfte"
    },
    {
      "key": "hippo-nach-op",
      "label": "Nach einer Hüftprothese",
      "caption": "Beispielbericht des Herstellers (Demo-Datensatz einer anderen Person, Personendaten entfernt): Beckenübersicht mit Hüftprothese auf der rechten Körperseite (im Bild links, Markierung „R“). Unten in der Bildmitte ist die Kalibrierkugel gelb umkreist. Die Tabelle nennt Beinlängendifferenz, Pfanneninklination und Pfannenversion, femorales, acetabuläres und Gesamt-Offset, Kopfdurchmesser und CCD-Winkel.",
      "alt": "KI-Messbericht IB Lab HIPPO: Beckenröntgen mit Hüftprothese rechts, Kalibrierkugel und Tabelle zu Beinlänge, Pfannenlage und Offset"
    }
  ],
  "note": "Beispielberichte des Herstellers (Demo-Datensätze verschiedener Personen, Personendaten entfernt) – kein Vorher-nachher-Vergleich einer Behandlung."
};

export const SOURCES = [
  "ImageBiopsy Lab (IB Lab GmbH, Wien): IB Lab HIPPO – Produktbeschreibung und Zweckbestimmung. <a href=\"https://www.imagebiopsy.com/product/hippo-ce\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com/product/hippo-ce<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)",
  "ImageBiopsy Lab: Automated Arthroplasty Measurements for Hip and Knee – IB Lab Releases HIPPO 2.0 and LAMA 3.0. <a href=\"https://www.imagebiopsy.com/blog-posts/hippo-2-lama-3-arthroplasty-ai-release\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)",
  "Schwarz GM, Simon S, Mitterer JA, Huber S, Frank BJ, Aichmair A, Dominkus M, Hofstaetter JG. Can an artificial intelligence powered software reliably assess pelvic radiographs? International Orthopaedics. 2023;47(4):945–953. <a href=\"https://doi.org/10.1007/s00264-023-05722-z\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00264-023-05722-z<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Tannast M, Siebenrock KA, Anderson SE. Femoroacetabular impingement: radiographic diagnosis – what the radiologist should know. American Journal of Roentgenology. 2007;188(6):1540–1552. <a href=\"https://doi.org/10.2214/AJR.06.0921\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.2214/AJR.06.0921<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Lewinnek GE, Lewis JL, Tarr R, Compere CL, Zimmerman JR. Dislocations after total hip-replacement arthroplasties. Journal of Bone and Joint Surgery (American Volume). 1978;60(2):217–220. <a href=\"https://doi.org/10.2106/00004623-197860020-00014\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.2106/00004623-197860020-00014<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>"
];
