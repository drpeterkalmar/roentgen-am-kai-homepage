// Ratgeber-Artikel „Skoliose präzise vermessen: Cobb-Winkel mit KI-Unterstützung“ (IB Lab SQUIRREL).
// URL /ratgeber/skoliose-cobb-winkel-ki – Stand 21.10.2026.
// Quellen (alle selbst geprüft): Cobb 1948 (Instr Course Lect, keine DOI); SOSORT-Leitlinie 2016
// (Negrini et al., Scoliosis Spinal Disord 2018); Langensiepen et al. 2013 (Eur Spine J, Messgenauigkeit
// Cobb-Winkel); Chen et al. 2024 (J Clin Med, Validierung IB Lab SQUIRREL); Herstellerseite imagebiopsy.com.
// Leitplanken: Software misst, beschriftet, standardisiert – keine Diagnose, keine Entscheidung über Korsett
// oder Operation; Radiologin/Radiologe prüft und korrigiert. Keine Herstellerwerbezahlen (kein „ICC 0,97“,
// kein „5 Sekunden“, kein „Expertenniveau“). Schwellen nur mit Quelle (10° laut SOSORT/SRS, Messfehler 5°).
// Beispielwerte im Herstellerbericht werden nicht bewertet. Ruhiger Ton gegenüber Eltern und Kindern.
// [geteilt] Inhalte (nur Artikel-/Übersichtsseite). Metadaten: ki-squirrel.js

export const HTML = `
      <p>Bei einer Skoliose ist die Wirbelsäule seitlich verkrümmt. Wird sie festgestellt, folgt meist eine Röntgenaufnahme der gesamten Wirbelsäule. Sie zeigt, wie stark die Krümmung ist und ob sie sich mit der Zeit verändert. Für das Skoliose-Röntgen in Graz setzt Röntgen am Kai seit Oktober 2026 eine Software mit künstlicher Intelligenz (KI) ein: IB Lab SQUIRREL. Sie misst Winkel und Abstände auf der Aufnahme und stellt sie einheitlich dar. Die Beurteilung bleibt ärztlich.</p>

      <h2>Anlass: Was ist eine Skoliose und wozu dient die Ganzaufnahme?</h2>
      <p>Eine Skoliose ist eine seitliche Verkrümmung der Wirbelsäule, bei der die Wirbel zusätzlich etwas verdreht sind. Von vorne betrachtet verläuft die Wirbelsäule dann nicht gerade, sondern in einem oder mehreren Bögen. Meist lässt sich keine eigene Ursache finden, Fachleute sprechen dann von einer idiopathischen Skoliose. Sie tritt bei sonst gesunden Kindern und Jugendlichen auf und kann sich vor allem in Wachstumsphasen verändern.</p>
      <p>Nach der internationalen Leitlinie der Fachgesellschaft SOSORT spricht man von einer Skoliose, wenn der sogenannte Cobb-Winkel auf dem Röntgenbild 10 Grad oder mehr beträgt und eine Verdrehung der Wirbel erkennbar ist. Leichte Krümmungen sind nicht selten: Die Leitlinie nennt für Jugendliche am häufigsten eine Häufigkeit von 2 bis 3 Prozent. Rund jede zehnte festgestellte Skoliose braucht eine Behandlung ohne Operation, etwa ein Korsett oder gezielte Übungen. Eine Operation ist nur sehr selten nötig.</p>
      <p>Die <a href="/roentgen-graz#wirbelsaeule">Wirbelsäulenganzaufnahme</a> zeigt die Wirbelsäule vom Hals bis zum Becken auf einem einzigen Bild. Nur so lassen sich alle Bögen und ihr Zusammenspiel beurteilen. Häufige Anlässe sind ein auffälliger Befund bei einer Vorsorgeuntersuchung, ein Schulter- oder Beckenschiefstand oder die Kontrolle einer bereits bekannten Skoliose. Welche Aufnahme nötig ist, legt die zuweisende Ärztin oder der zuweisende Arzt fest.</p>

      <h2>Ablauf: So läuft das Wirbelsäulenröntgen ab</h2>
      <p>Für ein Skoliose-Röntgen in Graz brauchen Sie bei uns eine ärztliche Zuweisung und Ihre e-card. Während der Röntgenzeiten ist die Untersuchung ohne Termin möglich, auf Wunsch kann eine Wunschzeit reserviert werden. Mehr dazu steht auf unserer Seite zum <a href="/roentgen-graz">Röntgen in Graz</a>.</p>
      <p>Die Wirbelsäule wird bei uns im Stehen geröntgt. So zeigt das Bild die Haltung unter der normalen Körperlast, also so, wie die Wirbelsäule im Alltag getragen wird. Das Röntgenteam hilft bei der Aufstellung und erklärt, wie man am besten steht. Wichtig ist nur, während der kurzen Aufnahme ruhig zu bleiben.</p>
      <p>Anschließend wertet die Software das Bild aus. Danach prüft die Radiologin oder der Radiologe Bild und Messung und erstellt den Befund. Befund und Bilder gehen an die zuweisende Ärztin oder den zuweisenden Arzt und sind zusätzlich über ELGA und das Patientenportal portal.marc.at verfügbar.</p>

      <h2>KI-Auswertung: Wie SQUIRREL Wirbel und Winkel erkennt</h2>
      <p>IB Lab SQUIRREL stammt vom Wiener Unternehmen ImageBiopsy Lab und ist für Ganzaufnahmen der Wirbelsäule von vorne oder von hinten gedacht. Laut Hersteller ist die Software für Personen ab zehn Jahren vorgesehen. Sie arbeitet in drei Schritten: Sie erkennt die einzelnen Wirbelkörper, benennt sie und berechnet daraus die Messwerte. Das Ergebnis ist ein Bericht mit Tabelle und markiertem Bild, der zusammen mit der Originalaufnahme gespeichert wird.</p>
      <h3>Wirbelzuordnung</h3>
      <p>Zuerst beschriftet die Software die Wirbel: vom untersten Halswirbel (C7) über die zwölf Brustwirbel (T1 bis T12) und die fünf Lendenwirbel (L1 bis L5) bis zum Kreuzbein (S1). Diese Zuordnung ist die Grundlage für alle weiteren Werte. Nur wenn klar ist, welcher Wirbel welcher ist, lassen sich Messungen von Kontrolle zu Kontrolle vergleichen.</p>
      <h3>Cobb-Winkel</h3>
      <p>Der Cobb-Winkel geht auf den amerikanischen Orthopäden John R. Cobb zurück, der die Methode 1948 beschrieb. Um den Cobb-Winkel zu messen, sucht man für jeden Bogen die beiden Wirbel, die am stärksten gekippt sind, die sogenannten Endwirbel. Entlang der Oberkante des oberen und der Unterkante des unteren Endwirbels werden Linien gezogen. Der Winkel zwischen diesen Linien ist der Cobb-Winkel. Je größer er ist, desto stärker ist der Bogen. SQUIRREL wählt die Endwirbel selbst aus, kann den Cobb-Winkel für mehrere Bögen messen und gibt an, zu welcher Seite ein Bogen gewölbt ist.</p>
      <h3>Koronales Gleichgewicht</h3>
      <p>„Koronal“ bedeutet: in der Ansicht von vorne. Das koronale Gleichgewicht (im Bericht „Frontale Balance“) beschreibt, ob der Oberkörper mittig über dem Becken steht. Dafür wird ein senkrechtes Lot von der Mitte des siebten Halswirbels nach unten gedacht und gemessen, wie weit es seitlich von der Mitte des Kreuzbeins entfernt liegt. Die Angabe erfolgt in Millimetern.</p>
<!--media:report-->
      <h2>Nutzen: Vergleichbare Werte für die Verlaufskontrolle</h2>
      <p>Bei einer Skoliose-Verlaufskontrolle zählt weniger der einzelne Wert als die Veränderung zwischen zwei Aufnahmen. Genau hier liegt eine Schwierigkeit: Wer den Cobb-Winkel von Hand misst, kommt auch bei erfahrenen Fachleuten nicht jedes Mal auf dasselbe Ergebnis. Selbst bei denselben Endwirbeln können Messungen um bis zu 5 Grad voneinander abweichen. Die SOSORT-Leitlinie nennt diese 5 Grad als üblichen Messfehler der Handmessung, für computergestützte Verfahren werden geringere Werte berichtet. Eine scheinbare Zunahme in dieser Größenordnung kann also auch durch die Messung selbst entstehen.</p>
      <p>Eine Software misst nach immer denselben Regeln. In einer Studie mit knapp 200 Ganzaufnahmen lieferte SQUIRREL bei wiederholter Auswertung desselben Bildes dieselben Werte, und die Ergebnisse lagen nahe an den Messungen von vier Radiologie-Fachleuten. Für die Verlaufskontrolle heißt das: Werte von verschiedenen Terminen lassen sich nach gleichem Maßstab vergleichen. Weil Linien und Zahlen im Bericht eingezeichnet sind, ist auch für die behandelnden Ärztinnen und Ärzte nachvollziehbar, woher ein Wert stammt.</p>
      <p>SQUIRREL ist eines von mehreren Programmen der KI in der Radiologie, die wir für wiederkehrende Messaufgaben nutzen. Einen Überblick gibt unser Ratgeber zur <a href="/ratgeber/kuenstliche-intelligenz-radiologie">künstlichen Intelligenz in der Radiologie</a>.</p>

      <h2>Grenzen: Was die Software nicht entscheidet</h2>
      <p>SQUIRREL ist ein Messwerkzeug. Die Software stellt keine Diagnose und entscheidet weder über ein Korsett noch über eine Operation. Laut Hersteller darf sie eine vollständige ärztliche Untersuchung nicht ersetzen. Die Radiologin oder der Radiologe kontrolliert jede Linie und jeden Wert und korrigiert sie bei Bedarf. In der genannten Studie setzte die Software in Einzelfällen eine Linie an der falschen Stelle. Solche Fehler fallen auf, weil alle Messlinien im Bild sichtbar sind.</p>
      <p>Ein Messwert allein sagt wenig. Ob eine Krümmung nur beobachtet oder behandelt wird, hängt auch vom Alter, vom noch zu erwartenden Wachstum, von Beschwerden und vom klinischen Befund ab. Diese Gesamtbeurteilung übernehmen die behandelnden Ärztinnen und Ärzte, etwa aus Orthopädie oder Kinderheilkunde. Der Cobb-Winkel beschreibt zudem nur die Ansicht von vorne. Die Verdrehung der Wirbel und das seitliche Profil der Wirbelsäule erfasst er nicht vollständig.</p>
      <p>Auch technische Grenzen gibt es: Implantate nach einer Operation, ein Korsett im Bild oder eine ungewöhnliche Form der Wirbel können die automatische Erkennung erschweren. Längenangaben in Millimetern sind nur dann genau, wenn die Aufnahme kalibriert ist, etwa mit einer Kalibrierkugel.</p>

      <h2>Strahlenschutz: Röntgen mit Augenmaß</h2>
      <p>Eine Wirbelsäulenganzaufnahme ist mit einer geringen Strahlenbelastung verbunden. Gerade bei Kindern und Jugendlichen gilt: nur so viele Aufnahmen wie nötig. Wie oft eine Skoliose kontrolliert wird, entscheidet die behandelnde Ärztin oder der behandelnde Arzt je nach Alter, Wachstum und bisherigem Verlauf.</p>
      <p>Die KI-Auswertung braucht keine zusätzliche Aufnahme. Sie arbeitet mit dem Bild, das für die Untersuchung ohnehin angefertigt wird. Liegen frühere Aufnahmen vor, lässt sich der Verlauf besser einordnen.</p>
`;

export const MEDIA = {
  "slides": [
    {
      "key": "squirrel-wirbelsaeule",
      "caption": "Beispielbericht des Herstellers (Demo-Datensatz, Personendaten entfernt): links die Messwerte, rechts die Wirbelsäulenganzaufnahme mit Wirbelbeschriftung, Cobb-Linien und senkrechtem Lot.",
      "alt": "Bericht von IB Lab SQUIRREL: links eine Tabelle mit drei Cobb-Winkeln und der frontalen Balance, rechts eine Röntgen-Ganzaufnahme der Wirbelsäule mit Wirbelbeschriftung von C7 bis S1, farbigen Messlinien mit Gradangaben und einer senkrechten Linie."
    }
  ],
  "hotspots": [
    {
      "n": 1,
      "label": "Messwerte",
      "text": "Die Tabelle nennt für jede Messung den gemessenen Wirbelabschnitt, die Seite, zu der der Bogen gewölbt ist, einen Normbereich und den Wert. Werte außerhalb des Normbereichs hebt die Software farbig hervor; die ärztliche Bewertung ersetzt das nicht."
    },
    {
      "n": 2,
      "label": "Wirbelbeschriftung",
      "text": "Die Software benennt jeden erkannten Wirbel vom untersten Halswirbel (C7) bis zum Kreuzbein (S1). Diese Zuordnung macht Messungen bei späteren Kontrollen vergleichbar."
    },
    {
      "n": 3,
      "label": "Cobb-Winkel",
      "text": "Für jeden Bogen zieht die Software Linien an den beiden am stärksten gekippten Wirbeln und gibt den Winkel dazwischen in Grad an. Die Farbe der Linien entspricht der Zeile in der Tabelle."
    },
    {
      "n": 4,
      "label": "Lot und Gleichgewicht",
      "text": "Die senkrechte Linie ist das Lot vom siebten Halswirbel nach unten. Ihr seitlicher Abstand zur Mitte des Kreuzbeins beschreibt das frontale (koronale) Gleichgewicht."
    }
  ]
};

export const SOURCES = [
  "Cobb JR. Outline for the study of scoliosis. Instructional Course Lectures (American Academy of Orthopaedic Surgeons). 1948;5:261–275. (Keine DOI vorhanden.)",
  "Negrini S, Donzelli S, Aulisa AG, et al. 2016 SOSORT guidelines: orthopaedic and rehabilitation treatment of idiopathic scoliosis during growth. Scoliosis and Spinal Disorders. 2018;13:3. <a href=\"https://doi.org/10.1186/s13013-017-0145-8\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1186/s13013-017-0145-8<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Langensiepen S, Semler O, Sobottke R, et al. Measuring procedures to determine the Cobb angle in idiopathic scoliosis: a systematic review. European Spine Journal. 2013;22(11):2360–2371. <a href=\"https://doi.org/10.1007/s00586-013-2693-9\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.1007/s00586-013-2693-9<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "Chen K, Stotter C, Klestil T, Mitterer JA, Lepenik C, Nehrer S. Fully Automated Measurement of Cobb Angles in Coronal Plane Spine Radiographs. Journal of Clinical Medicine. 2024;13(14):4122. <a href=\"https://doi.org/10.3390/jcm13144122\" target=\"_blank\" rel=\"noopener noreferrer\">doi:10.3390/jcm13144122<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a>",
  "ImageBiopsy Lab (IB Lab GmbH, Wien): IB Lab SQUIRREL – Produktbeschreibung und Zweckbestimmung. <a href=\"https://www.imagebiopsy.com/product/squirrel\" target=\"_blank\" rel=\"noopener noreferrer\">imagebiopsy.com/product/squirrel<span class=\"sr-only\"> (öffnet in neuem Fenster)</span></a> (abgerufen am 21.10.2026)"
];
