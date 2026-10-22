// Ratgeber-Artikel „Knochenalter bestimmen: Wie KI die Auswertung unterstützt“ (IB Lab PANDA). Stand: 22.10.2026.
// Abgleich mit IFU PANDA 1.06 + DoC (MDD 93/42/EWG Klasse I, Regel 12, Selbsterklärung ohne Benannte Stelle, ausgestellt 20.09.2023 – NICHT MDR) vom 22.10.2026.
//   IFU = PANDA-02-01 User Manual CE (DE), Produkt-Erscheinungsdatum 26.09.2022; dazu PANDA-02-02 User Training CE (DE). Vertraulich: nur in eigenen Worten.
//   Zweckbestimmung: Knochenalter nach Greulich & Pyle auf Handröntgen, 36–192 Monate (Mädchen) bzw. 36–204 Monate (Buben), chronologisches Alter.
//   Größenschätzung nach Bayley & Pinneau nur, wenn das Knochenalter in den Prognosetabellen liegt (je nach Geschlecht und Status
//   verzögert/normal/akzeleriert frühestens ab 6–7 J. Knochenalter, obere Grenze 13 J. bis 18 J. 6 M.), und nur mit Körpergröße.
//   PANDA-Ergebnisse sind nicht editierbar (Ärztin/Arzt weicht ggf. im Befund ab). PA-Aufnahme einer Hand; IFU nennt die nicht dominante Hand, Praxis röntgt die linke (Peter, 22.10.2026; Händigkeit nicht auf der Seite).
//   Keine CE/Klasse/MDD/Version auf der Seite (Entscheidung Georg offen).
// URL: /ratgeber/knochenalter-bestimmen-ki · SEO-Titel: „Knochenalter bei Kindern bestimmen | Röntgen Graz“
// Hauptkeyword: Knochenalter bestimmen Graz; Nebenkeywords: Knochenalter Röntgen Hand, Wachstumspotenzial Kind,
// Greulich Pyle, KI Radiologie.
// Quellen (alle selbst geprüft, 21.10.2026):
//   - Greulich & Pyle, Radiographic Atlas of Skeletal Development of the Hand and Wrist, 2. Aufl., Stanford University Press 1959 (Buch, keine DOI)
//   - Bayley & Pinneau, J Pediatr 1952;40(4):423–441, doi:10.1016/S0022-3476(52)80205-7 (PubMed 14918032, Crossref)
//   - Gaskin, Kahn, Bertozzi, Bunch, Skeletal Development of the Hand and Wrist, Oxford University Press 2011, doi:10.1093/med/9780199782055.001.0001 (Crossref)
//   - Gräfe et al., Eur Radiol 2024;34(7):4407–4413, doi:10.1007/s00330-023-10543-0 (Validierung IB Lab PANDA, 306 Kinder, Leipzig;
//     Interessenkonflikt: Chung und DiFranco bei IB Lab angestellt). Nur qualitativ zitiert, keine Kennzahlen übernommen.
//   - Herstellerseite IB Lab PANDA CE (imagebiopsy.com/product/panda-ce): Funktionsumfang, Zweckbestimmung.
//   - Gebrauchsanweisung IB Lab PANDA (deutsch), Stand September 2022 (vom Hersteller 22.10.2026 zur Verfügung gestellt, ohne Link).
// Leitplanken: keine Zeit-/Genauigkeitszahlen aus Herstellerwerbung/IFU („6,2 Sekunden“, „±4,2 Monate“, „±2,5 cm“ bewusst NICHT übernommen);
// KI misst und standardisiert, stellt keine Diagnose; Größenschätzung = Schätzung mit Unsicherheit, keine individuelle Prognose;
// Beispielbericht = Demo-Datensatz des Herstellers, Werte werden nicht bewertet; Strahlenschutz ohne Dosiszahlen.
// Praxis (Peter 21.10.2026 abends): PANDA wertet alle Knochenalter-Aufnahmen aus; sitzend, linke Hand flach, Finger leicht
// gespreizt; Eltern können mit Schutzschürze im Raum bleiben; Körpergröße wird erfragt oder gemessen und steht mit der
// Größenschätzung im Befund. Altersbereich seit 22.10.2026 konkret laut IFU (Mädchen 3–16, Buben 3–17 Jahre).
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-panda.js

export const HTML = `
<p>Kinder wachsen nicht alle im gleichen Tempo. Manche sind früh groß, andere holen erst später auf. Ob das Skelett eines Kindes seinem Alter voraus ist oder nachhinkt, zeigt das <strong>Knochenalter</strong>. Sichtbar wird es auf einer Röntgenaufnahme der linken Hand. Wenn Ihre Kinderärztin oder Ihr Kinderarzt das Knochenalter bestimmen lassen möchte, ist das in Graz bei Röntgen am Kai mit Zuweisung möglich.</p>
<p>Seit Oktober 2026 unterstützt dabei eine Software mit künstlicher Intelligenz (KI) die Auswertung: IB Lab PANDA von ImageBiopsy Lab aus Wien. Die Software wertet jede passende Aufnahme automatisch aus. Hier lesen Eltern und Jugendliche, wie die Untersuchung abläuft und was die KI tut.</p>

<h2>Anlass: Wann wird das Knochenalter bestimmt?</h2>
<p>Das <strong>kalendarische Alter</strong> zählt die Jahre seit der Geburt. Das <strong>Knochenalter</strong> beschreibt dagegen, wie weit die Knochen in ihrer Entwicklung sind. An den Enden der Finger- und Mittelhandknochen liegen die Wachstumsfugen. Von diesen knorpeligen Zonen geht das Längenwachstum aus. Im Lauf der Kindheit erscheinen die Handwurzelknochen nacheinander, die Knochenkerne werden größer und verändern ihre Form. Gegen Ende der Pubertät schließen sich die Wachstumsfugen.</p>
<h3>Warum Knochenalter und Lebensalter voneinander abweichen</h3>
<p>Eine Abweichung um einige Monate ist häufig und meist ohne Bedeutung. Wie schnell das Skelett reift, hängt unter anderem von Geschlecht, familiärer Veranlagung, Ernährung und Pubertätsbeginn ab. Auch Hormone und länger dauernde Erkrankungen können die Reifung beschleunigen oder verlangsamen. Viele Kinder, die als „Spätentwickler“ gelten, haben ein etwas jüngeres Knochenalter und wachsen dafür oft länger.</p>
<p>Veranlasst wird die Untersuchung meist von der Kinderheilkunde oder von Fachleuten für Hormonerkrankungen (Endokrinologie), zum Beispiel</p>
<ul>
<li>wenn ein Kind deutlich kleiner oder größer ist als Gleichaltrige oder sich sein Wachstumstempo verändert,</li>
<li>bei auffallend früher oder später Pubertät,</li>
<li>bei hormonellen oder chronischen Erkrankungen und zur Verlaufskontrolle während einer Behandlung,</li>
<li>in der Orthopädie, wenn der Zeitpunkt einer Behandlung vom verbleibenden Wachstum abhängt, etwa bei unterschiedlich langen Beinen oder einer Skoliose.</li>
</ul>

<h2>Ablauf: So läuft das Knochenalter-Röntgen der Hand ab</h2>
<p>Um das Knochenalter in Graz bei Röntgen am Kai bestimmen zu lassen, braucht es eine ärztliche <strong>Zuweisung</strong> und die e-card. Das ist während der Röntgenzeiten ohne Termin möglich, eine Wunschzeit kann reserviert werden. Mehr dazu auf der Seite <a href="/roentgen-graz">Röntgen in Graz</a> und im Abschnitt <a href="/roentgen-graz#region-hand">Hand und Handgelenk</a>.</p>
<p>Eine Vorbereitung ist nicht nötig. Schmuck und Uhr an der linken Hand werden abgenommen. Ihr Kind sitzt, die linke Hand liegt flach auf der Bildplatte, die Finger leicht gespreizt. Für den kurzen Moment der Aufnahme heißt es stillhalten. Es tut nicht weh. Eltern können mit Schutzschürze im Raum bleiben.</p>
<p>Geröntgt wird die linke Hand, weil auch die Referenzbilder linke Hände zeigen.</p>
<p>Für die Größenschätzung braucht es die aktuelle Körpergröße. Wir erfragen oder messen sie, sie steht mit im Befund.</p>

<h2>Ergebnis: Was steht im Befund?</h2>
<h3>Die Methode nach Greulich und Pyle</h3>
<p>Die verbreitetste Methode stammt von William Greulich und Idell Pyle. Ihr Atlas von 1959 enthält Referenzaufnahmen von Buben und Mädchen in vielen Altersstufen. Die Aufnahme des Kindes wird mit diesen Referenzbildern verglichen. Das Knochenalter entspricht der Altersstufe, deren Bild am besten passt. Ein neueres Handbuch von Gaskin und Kollegen ergänzt Tabellen zur üblichen Streuung.</p>
<h3>Der übliche Streubereich</h3>
<p>Weil Kinder unterschiedlich schnell reifen, gibt es für jedes Alter einen üblichen Streubereich. Er wird als <strong>Standardabweichung</strong> angegeben, ein statistisches Maß für die normale Schwankung. Liegt das Knochenalter innerhalb von zwei Standardabweichungen um das kalendarische Alter, gilt es als altersentsprechend. Liegt es darüber, spricht man von einem beschleunigten, darunter von einem verzögerten Knochenalter. Das ist eine Beschreibung, keine Diagnose.</p>
<h3>Wachstumspotenzial und Größenschätzung</h3>
<p>Aus dem Knochenalter lässt sich abschätzen, welcher Anteil der Erwachsenengröße schon erreicht ist. Der Rest ist das verbleibende <strong>Wachstumspotenzial</strong>. Nancy Bayley und Samuel Pinneau haben dafür 1952 Tabellen veröffentlicht, die auf den Standards von Greulich und Pyle beruhen – getrennt für Mädchen und Buben sowie für verzögerte, altersentsprechende und beschleunigte Reifung. Teilt man die aktuelle Körpergröße durch den erreichten Anteil, ergibt sich eine geschätzte Erwachsenengröße.</p>
<p>Diese Zahl ist eine <strong>Schätzung mit Unsicherheit</strong> und keine sichere Vorhersage. Die Tabellen beruhen auf Messungen von rund 200 gesunden Kindern aus Kalifornien aus der Mitte des 20. Jahrhunderts. Bei Erkrankungen, Behandlungen oder einem ungewöhnlichen Pubertätsverlauf kann die tatsächliche Größe abweichen. Deshalb nennt der Bericht einen Schwankungsbereich. Beurteilt wird sie immer mit dem bisherigen Wachstum, der Größe der Eltern und der ärztlichen Untersuchung.</p>
<p>Die Software berechnet eine Größenschätzung nur, wenn das Knochenalter in diesen Tabellen vorkommt: etwa ab 6 bis 7 Jahren bis ins Jugendalter, je nach Geschlecht und Reifung. Liefert die Software innerhalb dieses Bereichs keine Schätzung, rechnet die Radiologin bzw. der Radiologe klassisch mit dem Atlas von Greulich und Pyle.</p>

<!--media:report-->

<h2>Rolle der KI: Was die Software übernimmt</h2>
<p>IB Lab PANDA beruht auf maschinellem Lernen (Deep Learning). Die Software wertet die Handaufnahme vollautomatisch nach Greulich und Pyle aus und erstellt einen einheitlichen Bericht: Knochenalter, Streubereich, Einordnung als verzögert, altersentsprechend oder beschleunigt, erreichter Anteil der Erwachsenengröße und, wenn möglich, eine Größenschätzung nach Bayley und Pinneau.</p>
<p>Der Nutzen liegt in der Standardisierung. Beim Vergleich mit dem Atlas schätzen Fachleute mitunter leicht unterschiedlich, die Software wendet immer dieselben Kriterien an.</p>
<p>Eine Studie aus Leipzig verglich die Software an Handaufnahmen von 306 Kindern mit drei erfahrenen Fachleuten. Im Mittel stimmten die Ergebnisse gut überein, im Einzelfall gab es Abweichungen von einigen Monaten.</p>
<p>Die Software stellt keine Diagnose. Die Radiologin bzw. der Radiologe sieht sich jede Aufnahme selbst an und prüft das Ergebnis. Stimmt ein Wert nicht, misst die Radiologin bzw. der Radiologe selbst nach, im Befund steht der ärztliche Wert. Der Messbericht wird mit den Bildern archiviert und steht der zuweisenden Ärztin bzw. dem zuweisenden Arzt zur Verfügung, ebenso über ELGA. Mehr dazu in der <a href="/ratgeber/kuenstliche-intelligenz-radiologie">Übersicht zu KI in der Radiologie</a>.</p>

<h2>Grenzen: Was das Knochenalter nicht verrät</h2>
<p>Das Knochenalter ist ein Baustein, kein fertiges Urteil. Es erklärt nicht, warum ein Kind früher oder später wächst.</p>
<ul>
<li>Die Referenzbilder des Atlas stammen aus einer amerikanischen Studie aus der Mitte des 20. Jahrhunderts. Heutige Kinder unterschiedlicher Herkunft reifen teils etwas anders.</li>
<li>Die Software ist für Kinder ab 3 Jahren vorgesehen, bei Mädchen bis 16 und bei Buben bis 17 Jahre. Schlechte Bildqualität, ungünstige Lagerung, Verletzungs- oder Operationsfolgen und Fehlbildungen gleicht sie nicht aus. Solche Aufnahmen beurteilt die Radiologin bzw. der Radiologe besonders sorgfältig.</li>
</ul>
<p>Wie es nach dem Befund weitergeht, entscheidet die zuweisende Ärztin bzw. der zuweisende Arzt, bei Bedarf mit Kinderheilkunde oder Endokrinologie.</p>

<h2>Strahlenbelastung: Wie viel Strahlung bekommt mein Kind ab?</h2>
<p>Für das Knochenalter genügt in der Regel eine einzige Aufnahme der Hand. Die Strahlenbelastung ist gering, auch weil die Hand weit von strahlenempfindlichen Organen entfernt liegt. Bei Kindern achtet das Team besonders darauf, den Strahlenbereich eng auf die Hand zu begrenzen. Die KI-Auswertung braucht keine zusätzliche Aufnahme.</p>
`;

export const MEDIA = {
  "slides": [
    {
      "key": "panda-knochenalter",
      "caption": "Beispielbericht des Herstellers (Demo-Datensatz, Personendaten entfernt): KI-gestützte Knochenalter-Auswertung mit IB Lab PANDA.",
      "alt": "Beispielbericht von IB Lab PANDA auf dunklem Hintergrund: links oben kalendarisches Alter, Geschlecht, Knochenalter, Standardabweichung und ein Balken für den Streubereich, rechts oben Wachstumspotenzial und Größenrechnung, rechts mittig ein Röntgenbild der linken Hand, unten Literaturangaben und ein Hinweis zur KI-Auswertung."
    }
  ],
  "hotspots": [
    {
      "n": 1,
      "label": "Alter und Knochenalter",
      "text": "Hier stehen das kalendarische Alter und das Geschlecht, darunter das Knochenalter, das die Software nach Greulich und Pyle ermittelt. Beide Angaben erscheinen in Jahren und Monaten, damit sie sich direkt vergleichen lassen."
    },
    {
      "n": 2,
      "label": "Streubereich",
      "text": "Der Balken zeigt den üblichen Streubereich um das kalendarische Alter, von zwei Standardabweichungen darunter bis zwei darüber. Die Markierung zeigt, wo das ermittelte Knochenalter liegt, das Feld darüber ordnet es als verzögert, altersentsprechend oder beschleunigt ein."
    },
    {
      "n": 3,
      "label": "Handröntgen",
      "text": "Das ist die ausgewertete Röntgenaufnahme der linken Hand mit Handgelenk. Die Radiologin bzw. der Radiologe beurteilt immer auch dieses Originalbild selbst."
    },
    {
      "n": 4,
      "label": "Wachstumspotenzial und Größenschätzung",
      "text": "Hier steht, welcher Anteil der Erwachsenengröße laut den Tabellen nach Bayley und Pinneau schon erreicht ist, und die daraus berechnete Erwachsenengröße. Das ist eine Schätzung mit Unsicherheit und keine sichere Vorhersage, deshalb ist ein Schwankungsbereich angegeben."
    }
  ]
};

export const SOURCES = [
  "Greulich WW, Pyle SI. Radiographic Atlas of Skeletal Development of the Hand and Wrist. 2. Auflage. Stanford (CA): Stanford University Press; 1959.",
  "Bayley N, Pinneau SR. Tables for predicting adult height from skeletal age: revised for use with the Greulich-Pyle hand standards. J Pediatr. 1952;40(4):423–441. <a href=\"https://doi.org/10.1016/S0022-3476(52)80205-7\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1016/S0022-3476(52)80205-7<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Gaskin CM, Kahn SL, Bertozzi JC, Bunch PM. Skeletal Development of the Hand and Wrist: A Radiographic Atlas and Digital Bone Age Companion. New York: Oxford University Press; 2011. <a href=\"https://doi.org/10.1093/med/9780199782055.001.0001\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1093/med/9780199782055.001.0001<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Gräfe D, Beeskow AB, Pfäffle R, Rosolowski M, Chung TS, DiFranco MD. Automated bone age assessment in a German pediatric cohort: agreement between an artificial intelligence software and the manual Greulich and Pyle method. Eur Radiol. 2024;34(7):4407–4413. Zwei Mitautoren sind bei IB Lab angestellt. <a href=\"https://doi.org/10.1007/s00330-023-10543-0\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00330-023-10543-0<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "ImageBiopsy Lab. IB Lab PANDA – Produktbeschreibung und Zweckbestimmung. <a href=\"https://www.imagebiopsy.com/product/panda-ce\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com/product/panda-ce<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)",
  "IB Lab GmbH. IB Lab PANDA – Gebrauchsanweisung (deutsch), Stand September 2022. Vom Hersteller zur Verfügung gestellt."
];
