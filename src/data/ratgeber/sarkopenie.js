// Ratgeber-Artikel „Sarkopenie“ (07.10.2026). Eigene Datei, weil der Text lang ist; blogPosts.js bindet ihn ein.
// Quellen ausschließlich: EWGSOP2 (Cruz-Jentoft 2019), Chaves 2022, Ofenheimer 2020 (LEAD).
// Interne Links als Wurzelpfade (/koerperanalyse-graz) – ArticlePage setzt die Basis-URL davor und navigiert intern.
// Leitplanken: DEXA allein diagnostiziert keine Sarkopenie; Magermasse ≠ Muskelmasse/Muskelqualität/Muskelkraft;
// Grenzwerte nur aus EWGSOP2 Tabelle 3, als Orientierungswerte gekennzeichnet; keine Heilversprechen,
// keine pauschalen Protein- oder Trainingsempfehlungen.
import { BOOKING_URL } from '../practice.js';

export const SARKOPENIE_TITLE = 'Sarkopenie: Wenn Muskelkraft und Muskelmasse unbemerkt abnehmen';
export const SARKOPENIE_EXCERPT =
  'Sarkopenie bedeutet, dass Muskeln an Kraft und an Masse verlieren. Woran Sie erste Hinweise erkennen, wie die Diagnose nach den europäischen Empfehlungen gestellt wird und was eine DEXA-Körperanalyse dazu beitragen kann.';

export const SARKOPENIE_HTML = `
      <p>Die Einkaufstasche fühlt sich schwerer an als früher. Beim Aufstehen aus dem Sessel helfen die Hände mit, und auf der Treppe in den zweiten Stock braucht es eine kurze Pause. Viele Menschen nehmen solche Veränderungen hin und denken: „Das ist eben das Alter.“ Manchmal steckt aber mehr dahinter, nämlich ein Verlust an Muskelkraft und Muskelmasse, der einen eigenen Namen hat: <strong>Sarkopenie</strong>.</p>

      <h2>Was ist Sarkopenie?</h2>
      <p>Sarkopenie ist eine Erkrankung der Skelettmuskulatur, also der Muskeln, mit denen wir uns bewegen. Die Europäische Arbeitsgruppe für Sarkopenie (EWGSOP2) beschreibt sie als fortschreitende Störung der gesamten Muskulatur: Die Muskeln werden schwächer, und meist nimmt auch ihre Menge ab.</p>
      <p>Seit der Überarbeitung der Empfehlungen im Jahr 2018 steht die <strong>Muskelkraft</strong> im Mittelpunkt. Wie kräftig jemand ist, sagt mehr über spätere gesundheitliche Folgen aus als die reine Muskelmenge. Die Muskelmenge bestätigt aber die Diagnose.</p>

      <h3>Nicht nur eine Frage des Alters</h3>
      <p>Sarkopenie ist im höheren Lebensalter häufig. Ihre Entwicklung beginnt aber früher im Leben, und sie kann auch jüngere Erwachsene betreffen. Fachleute unterscheiden:</p>
      <ul>
        <li><strong>Primäre Sarkopenie:</strong> Sie entsteht durch das Älterwerden, ohne andere erkennbare Ursache.</li>
        <li><strong>Sekundäre Sarkopenie:</strong> Weitere Ursachen kommen hinzu, etwa eine Erkrankung, Bettlägerigkeit oder zu geringe Nahrungsaufnahme.</li>
      </ul>
      <p>Besteht eine Sarkopenie kürzer als sechs Monate, etwa nach einer schweren Krankheit, gilt sie als akut, sonst als chronisch.</p>

      <h2>Warum ist Sarkopenie wichtig?</h2>
      <p>Muskelverlust im Alter ist mehr als ein Schönheitsfehler. Kräftige Muskeln sind die Grundlage dafür, dass wir mobil bleiben und den Alltag selbst bewältigen: aufstehen, gehen, Stiegen steigen, Einkäufe tragen.</p>
      <p>Laut EWGSOP2 hat eine Sarkopenie spürbare Folgen. Sie</p>
      <ul>
        <li>erhöht das Risiko für <strong>Stürze und Knochenbrüche</strong>,</li>
        <li>erschwert alltägliche Tätigkeiten und führt zu <strong>Einschränkungen der Beweglichkeit</strong>,</li>
        <li>ist mit häufigeren <strong>Krankenhausaufenthalten</strong> verbunden,</li>
        <li>kann zum <strong>Verlust der Selbstständigkeit</strong> bis hin zur Pflegebedürftigkeit beitragen,</li>
        <li>mindert die Lebensqualität und geht mit einer höheren Sterblichkeit einher.</li>
      </ul>
      <p>Trotzdem wird Sarkopenie oft übersehen. Die Fachgesellschaften fordern, sie früher zu erkennen, damit sich Folgen verhindern oder hinauszögern lassen.</p>
      <p>Ob bei Sturzgefahr auch die Knochen an Dichte verloren haben, zeigt eine eigene Untersuchung, die <a href="/knochendichtemessung-graz">Knochendichtemessung</a>.</p>

      <h2>Wer hat ein erhöhtes Risiko?</h2>
      <p>Ein höheres Lebensalter ist der wichtigste Faktor. Daneben nennt die Fachliteratur:</p>
      <ul>
        <li><strong>chronische Erkrankungen</strong> wie Krebs, chronische Nieren- oder Lungenerkrankungen (COPD) oder schwere Herzschwäche,</li>
        <li><strong>schwere akute Erkrankungen</strong>, etwa nach einem Intensivaufenthalt,</li>
        <li><strong>Bewegungsmangel</strong> durch sitzende Lebensweise oder krankheitsbedingte Immobilität,</li>
        <li><strong>zu wenig Energie oder Eiweiß über die Nahrung</strong>, etwa bei Appetitlosigkeit, Verdauungsstörungen oder Schwierigkeiten beim Essen,</li>
        <li><strong>ungewollter Gewichtsverlust</strong>.</li>
      </ul>
      <p>Auch Übergewicht schützt nicht. Treffen wenig Muskelmasse und viel Körperfett zusammen, spricht man von <strong>sarkopener Adipositas</strong>. Auf der Waage fällt das nicht auf.</p>

      <h2>Welche Warnzeichen gibt es?</h2>
      <p>Sarkopenie entwickelt sich meist schleichend. Folgende Hinweise sind ein guter Anlass, das Thema ärztlich anzusprechen:</p>
      <ul>
        <li>Sie fühlen sich schwächer als früher, etwa beim Tragen, Heben oder Öffnen von Gläsern.</li>
        <li>Sie gehen langsamer, oder andere müssen auf Sie warten.</li>
        <li>Das Aufstehen von einem Stuhl gelingt nur noch mit Hilfe der Arme.</li>
        <li>Treppensteigen fällt deutlich schwerer.</li>
        <li>Sie sind in letzter Zeit gestürzt, vielleicht auch mehrmals.</li>
        <li>Sie haben ungewollt an Gewicht verloren, oder Arme und Beine wirken dünner.</li>
      </ul>
      <p>Keines dieser Zeichen beweist eine Sarkopenie, aber genau danach fragen auch Ärztinnen und Ärzte zu Beginn der Abklärung.</p>

      <h2>Wie wird Sarkopenie diagnostiziert?</h2>
      <p>EWGSOP2 empfiehlt einen Ablauf in vier Schritten („Find – Assess – Confirm – Severity“):</p>
      <ol>
        <li><strong>Verdacht erkennen.</strong> Ein einfaches Hilfsmittel ist der Fragebogen <strong>SARC-F</strong>. Betroffene beantworten fünf Fragen zu Kraft, Gehen, Aufstehen, Treppensteigen und Stürzen. SARC-F erkennt vor allem ausgeprägte Fälle, ein unauffälliges Ergebnis schließt eine Sarkopenie nicht sicher aus. Auch ein ärztlicher Verdacht genügt, um weiter abzuklären.</li>
        <li><strong>Muskelkraft prüfen.</strong> Meist wird die <strong>Handkraft</strong> mit einem geeichten Messgerät bestimmt. Alternativ misst der <strong>Aufstehtest</strong> (Chair-Rise-Test), wie lange man für fünfmaliges Aufstehen vom Stuhl ohne Armeinsatz braucht. Ist die Kraft niedrig, gilt eine Sarkopenie als <em>wahrscheinlich</em>. Das reicht laut EWGSOP2 bereits, um nach Ursachen zu suchen und eine Behandlung zu beginnen.</li>
        <li><strong>Muskelmenge bestätigen.</strong> Eine niedrige Muskelmenge bestätigt die Diagnose. Für die Routine empfiehlt EWGSOP2 dafür unter anderem die <strong>DEXA-Messung</strong>.</li>
        <li><strong>Schweregrad bestimmen.</strong> Zuletzt wird die körperliche Leistungsfähigkeit geprüft, etwa die <strong>Gehgeschwindigkeit</strong> auf vier Metern oder Testreihen wie SPPB und „Timed-up-and-go“. Ist auch sie eingeschränkt, spricht man von einer <em>schweren</em> Sarkopenie.</li>
      </ol>
      <p>Kraft- und Gehtests sind nicht Teil der DEXA-Messung, sondern der ärztlichen Untersuchung, etwa in der Hausarztpraxis.</p>

      <h3>Orientierungswerte nach EWGSOP2</h3>
      <p>EWGSOP2 nennt gerundete Grenzwerte, meist abgeleitet aus dem Vergleich mit gesunden jungen Erwachsenen in Europa.</p>
      <div class="article-table">
        <table>
          <caption>EWGSOP2-Orientierungswerte (Cruz-Jentoft et al. 2019, Tabelle 3)</caption>
          <thead>
            <tr><th scope="col">Messung</th><th scope="col">Männer</th><th scope="col">Frauen</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Handkraft</th><td>unter 27&nbsp;kg</td><td>unter 16&nbsp;kg</td></tr>
            <tr><th scope="row">Aufstehtest (5-mal)</th><td colspan="2">beide: über 15&nbsp;Sekunden</td></tr>
            <tr><th scope="row">Magermasse Arme + Beine (ALM)</th><td>unter 20&nbsp;kg</td><td>unter 15&nbsp;kg</td></tr>
            <tr><th scope="row">ALMI bzw. RSMI</th><td>unter 7,0&nbsp;kg/m²</td><td>unter 5,5&nbsp;kg/m²</td></tr>
            <tr><th scope="row">Gehgeschwindigkeit</th><td colspan="2">beide: 0,8&nbsp;m/s oder langsamer</td></tr>
          </tbody>
        </table>
      </div>
      <p><strong>Bitte nicht zur Selbstdiagnose verwenden.</strong> Die Werte dienen Fachleuten als Orientierung und hängen von Messgerät, Testdurchführung, Körperbau und Gesundheitszustand ab. Ein einzelner Wert unter der Grenze bedeutet noch keine Sarkopenie.</p>

      <h2>Welche Rolle spielt DEXA?</h2>
      <p>Die DEXA-Körperanalyse ist eine Ganzkörpermessung mit schwachen Röntgenstrahlen in zwei Energiestufen. Sie unterscheidet Knochen, Fett und fettfreie Weichteile, die <strong>Magermasse</strong>. Für die Sarkopenie-Abklärung ist sie ein wichtiges Werkzeug, denn mit ihr lässt sich die Muskelmasse messen, genauer gesagt eine gut begründete Näherung dafür. Sie liefert damit den Wert für Schritt 3: die Muskelmenge.</p>

      <h3>ALM, ALMI und RSMI einfach erklärt</h3>
      <p>Aus der Messung wird die <strong>appendikuläre Magermasse (ALM)</strong> bestimmt, also die Magermasse von Armen und Beinen zusammen. Der Rumpf wird dabei ausgelassen, weil dort Organe und Flüssigkeiten die Messung stärker überlagern. In Armen und Beinen spiegelt die Magermasse die Muskulatur deshalb besser wider.</p>
      <p>Weil größere Menschen mehr Muskeln haben, wird die ALM durch das Quadrat der Körpergröße geteilt. Das Ergebnis heißt <strong>ALMI</strong>; im Befund steht es oft als <strong>RSMI</strong> (relativer Skelettmuskelmasse-Index), angegeben in kg/m².</p>

      <h3>Was für DEXA spricht</h3>
      <ul>
        <li><strong>Nichtinvasiv:</strong> keine Nadel, kein Kontrastmittel, keine Schmerzen. Sie liegen ruhig auf dem Untersuchungstisch.</li>
        <li><strong>Rasch:</strong> Die Messung liefert den ALM-Wert in wenigen Minuten.</li>
        <li><strong>Gut reproduzierbar:</strong> Am selben Gerät gemessene Werte sind gut vergleichbar, auch im Verlauf.</li>
        <li><strong>Sehr niedrige Strahlendosis:</strong> Laut Fachliteratur liegt sie bei etwa 0,001&nbsp;mSv, das ist rund ein Zehntel einer einfachen Lungenröntgenaufnahme.</li>
        <li><strong>Vergleichswerte:</strong> Die Wiener LEAD-Studie liefert Referenzwerte von über 10.000 Erwachsenen zwischen 18 und 81 Jahren.</li>
      </ul>

      <h3>Was DEXA nicht kann</h3>
      <p>So hilfreich die Messung ist, sie hat klare Grenzen:</p>
      <ul>
        <li><strong>DEXA allein diagnostiziert keine Sarkopenie.</strong> Nach EWGSOP2 begründet eine niedrige Muskelkraft den Verdacht, eine niedrige Muskelmenge bestätigt ihn.</li>
        <li><strong>Magermasse ist nicht gleich Muskelmasse.</strong> Sie enthält neben Muskulatur auch Wasser und anderes fettfreies Gewebe; DEXA misst die Muskeln nicht direkt.</li>
        <li><strong>Muskelqualität und Muskelkraft werden nicht gemessen.</strong> Zwei Menschen mit gleicher Magermasse können sehr unterschiedlich kräftig sein.</li>
        <li><strong>Wasserhaushalt und Gerätetyp beeinflussen das Ergebnis.</strong> Verlaufskontrollen deshalb möglichst am selben Gerät.</li>
      </ul>
      <p>In der Schwangerschaft wird keine DEXA-Messung durchgeführt, und nicht direkt nach einer Untersuchung mit Kontrastmittel.</p>
      <p>Mehr über Ablauf, Vorbereitung und Messwerte erfahren Sie auf unserer Seite zur <a href="/koerperanalyse-graz">DEXA-Körperanalyse in Graz</a>. Wie die Abklärung bei Röntgen am Kai abläuft, beschreibt unsere Seite <a href="/gesundheitsziele/muskelverlust-sarkopenie">Muskelverlust und Sarkopenie</a>.</p>

      <h2>Was geschieht nach einem auffälligen Ergebnis?</h2>
      <p>Ein niedriger ALM- oder RSMI-Wert ist ein Grund für ein ärztliches Gespräch, etwa mit Ihrer Hausärztin oder Ihrem Hausarzt. Dabei geht es um drei Fragen:</p>
      <ul>
        <li><strong>Wie steht es um die Muskelkraft?</strong> Fehlt ein Krafttest, ist er der nächste Schritt.</li>
        <li><strong>Wie leistungsfähig sind Sie im Alltag?</strong> Gehtests zeigen, ob eine Sarkopenie schwer ausgeprägt ist.</li>
        <li><strong>Gibt es eine Ursache, die sich behandeln lässt?</strong> Bei sekundärer Sarkopenie steht die Suche nach dem Auslöser am Anfang.</li>
      </ul>
      <p>Laut EWGSOP2 scheinen Maßnahmen rund um Ernährung und körperliches Training den Muskelabbau verlangsamen oder sogar umkehren zu können. Was im Einzelfall sinnvoll ist, hängt von Ursache, Begleiterkrankungen und Belastbarkeit ab und wird ärztlich festgelegt.</p>
      <p>Umgekehrt gilt: Bei niedriger Muskelkraft bleibt eine Sarkopenie auch mit unauffälligem DEXA-Wert wahrscheinlich. Für Menschen mit erhöhtem Risiko empfiehlt EWGSOP2 regelmäßige Kontrollen.</p>

      <h2>Fazit</h2>
      <p>Sarkopenie ist mehr als „ein bisschen schwächer werden“: eine eigenständige Muskelerkrankung, die Stürze, Knochenbrüche, Krankenhausaufenthalte und den Verlust der Selbstständigkeit begünstigt. Wer merkt, dass Kraft, Gehtempo oder das Aufstehen nachlassen, sollte das ärztlich ansprechen.</p>
      <p>Die DEXA-Körperanalyse misst rasch, schonend und gut wiederholbar die Magermasse von Armen und Beinen und liefert damit den Wert, der eine Sarkopenie bestätigen kann. Krafttest und ärztliche Beurteilung ersetzt sie nicht. Mehr zur Vorsorge finden Sie auf unserer Seite <a href="/gesundheitsziele/gesund-aelter-werden">Gesund älter werden</a>.</p>
      <p>Lassen Sie Ihre Muskelmasse als Teil der Sarkopenie-Abklärung mit einer DEXA-Körperanalyse in Graz messen: Den Termin können Sie <a href="${BOOKING_URL}" target="_blank" data-cta="booking" data-cta-service="koerperanalyse" rel="noopener noreferrer">online buchen<span class="sr-only"> (öffnet in neuem Fenster)</span></a> oder telefonisch vereinbaren.</p>

`;

// Sichtbare FAQ (zugleich FAQPage-Schema). Antworten als Klartext.
export const SARKOPENIE_FAQ = [
  {
    question: 'Ist Sarkopenie einfach normaler Muskelabbau im Alter?',
    answer:
      'Nein. Etwas Muskelabbau im Alter ist normal. Von Sarkopenie spricht man erst, wenn die Muskelkraft niedrig ist und eine niedrige Muskelmenge den Verdacht bestätigt. EWGSOP2 versteht sie als eigenständige Muskelerkrankung mit erhöhtem Risiko für Stürze, Knochenbrüche und Verlust der Selbstständigkeit.',
  },
  {
    question: 'Können auch jüngere Menschen eine Sarkopenie haben?',
    answer:
      'Ja. Sie ist im Alter häufig, kann aber auch früher auftreten, etwa nach schwerer Krankheit, bei Bettlägerigkeit, chronischen Erkrankungen oder Mangelernährung.',
  },
  {
    question: 'Kann eine DEXA-Messung allein eine Sarkopenie feststellen?',
    answer:
      'Nein. Nach EWGSOP2 begründet eine niedrige Muskelkraft den Verdacht, eine niedrige Muskelmenge bestätigt ihn. DEXA misst die Magermasse von Armen und Beinen, nicht aber Muskelkraft oder Muskelqualität. Die Diagnose stellt die Ärztin oder der Arzt aus allen Befunden.',
  },
  {
    question: 'Was bedeuten ALM, ALMI und RSMI im DEXA-Befund?',
    answer:
      'ALM ist die Magermasse von Armen und Beinen in Kilogramm. Geteilt durch das Quadrat der Körpergröße ergibt sie den ALMI in kg/m², im Befund oft RSMI genannt. Magermasse ist eine Näherung, nicht direkt gemessene Muskulatur.',
  },
  {
    question: 'Wie hoch ist die Strahlenbelastung einer DEXA-Körperanalyse?',
    answer:
      'Sehr gering: etwa 0,001&nbsp;mSv, rund ein Zehntel einer einfachen Lungenröntgenaufnahme. In der Schwangerschaft wird DEXA trotzdem nicht durchgeführt.',
  },
  {
    question: 'Kann ich trotz Übergewicht eine Sarkopenie haben?',
    answer:
      'Ja. Wenig Muskelmasse bei viel Körperfett heißt sarkopene Adipositas; das Gewicht kann dabei normal oder hoch sein. DEXA zeigt Fett- und Magermasse getrennt.',
  },
  {
    question: 'Kann ich die Grenzwerte aus dem Artikel selbst anwenden?',
    answer:
      'Bitte nicht. Die EWGSOP2-Werte sind Orientierungswerte für Fachleute und hängen von Messgerät, Testdurchführung und Gesundheitszustand ab. Ein einzelner Wert unter der Grenze ist keine Diagnose. Besprechen Sie Ihre Ergebnisse ärztlich.',
  },
  {
    question: 'Brauche ich für die DEXA-Körperanalyse eine Zuweisung?',
    answer:
      'Nein. Die DEXA-Körperanalyse ist bei Röntgen am Kai eine Privatleistung und ohne Zuweisung online oder telefonisch buchbar.',
  },
];

// Quellen (als HTML, werden auf der Artikelseite nach der FAQ ausgegeben)
export const SARKOPENIE_SOURCES = [
  `Cruz-Jentoft AJ, Bahat G, Bauer J, et al.; Writing Group for the European Working Group on Sarcopenia in Older People 2 (EWGSOP2). Sarcopenia: revised European consensus on definition and diagnosis. <em>Age and Ageing</em>. 2019;48:16–31. <a href="https://doi.org/10.1093/ageing/afy169" target="_blank" rel="noopener noreferrer">doi:10.1093/ageing/afy169<span class="sr-only"> (öffnet in neuem Fenster)</span></a>`,
  `Chaves LGCM, Gonçalves TJM, Bitencourt AGV, Rstom RA, Pereira TR, Velludo SF. Assessment of body composition by whole-body densitometry: what radiologists should know. <em>Radiologia Brasileira</em>. 2022;55(5):305–311. <a href="https://doi.org/10.1590/0100-3984.2021.0155-en" target="_blank" rel="noopener noreferrer">doi:10.1590/0100-3984.2021.0155-en<span class="sr-only"> (öffnet in neuem Fenster)</span></a>`,
  `Ofenheimer A, Breyer-Kohansal R, Hartl S, et al. Reference values of body composition parameters and visceral adipose tissue (VAT) by DXA in adults aged 18–81 years – results from the LEAD cohort. <em>European Journal of Clinical Nutrition</em>. 2020;74:1181–1191. <a href="https://doi.org/10.1038/s41430-020-0596-5" target="_blank" rel="noopener noreferrer">doi:10.1038/s41430-020-0596-5<span class="sr-only"> (öffnet in neuem Fenster)</span></a>`,
];
