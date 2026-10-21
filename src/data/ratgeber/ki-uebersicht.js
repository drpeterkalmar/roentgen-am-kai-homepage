// Übersichtsseite der KI-Artikelserie „Röntgen am K[AI] – Künstliche Intelligenz, ärztlich verantwortet“.
// URL: /ratgeber/kuenstliche-intelligenz-radiologie · SEO-Titel: „Künstliche Intelligenz in der Radiologie | Graz“
// Stand: 21.10.2026
// Quellen: Herstellerseiten imagebiopsy.com (IB Lab ZOO, Module LAMA/HIPPO/KOALA/SQUIRREL/FROG/PANDA), 16bit.ai (Rho),
// screenpoint-medical.com (Transpara); Funktionsumfang laut PUCmed-Produktbeschreibung – ohne Werbezahlen.
// Leitplanken: KI misst, markiert, dokumentiert; keine Diagnose, keine Therapieentscheidung; jede Messung wird ärztlich
// geprüft. IB Lab-Module werden gerade eingeführt (nicht „seit Jahren“). Rho: Einsatz bestätigt. Transpara: Einsatz
// NICHT bestätigt – die Kachel beschreibt nur, wie KI in der Mammographie unterstützen kann. Keine Tomosynthese/3D-Mammographie.
// „[AI]“ im Titel/Seriennamen wird vom Code typografisch hervorgehoben; im HTML-Fließtext steht der Serienname bewusst nicht.
// [geteilt] Metadaten; Text und Bildtexte: ki-uebersicht.content.js

export const CAN = [
  "KI misst Winkel, Längen und Abstände auf Röntgenbildern nach einheitlichen Regeln.",
  "KI markiert Bereiche im Bild, die genauer angesehen werden sollten.",
  "KI fasst Messwerte übersichtlich in einem strukturierten Bericht zusammen.",
  "KI kann Verlaufskontrollen erleichtern, weil immer gleich gemessen wird.",
  "KI kann Hinweise geben, die eine weitere Abklärung sinnvoll machen."
];

export const CANNOT = [
  "KI stellt keine Diagnose – den Befund erstellt der Radiologe.",
  "KI entscheidet nicht über Therapie oder Operation.",
  "KI kennt Ihre Beschwerden und Ihre Krankengeschichte nicht.",
  "KI ersetzt nicht das Gespräch und die Untersuchung bei Ihrer Ärztin oder Ihrem Arzt.",
  "KI kann sich irren – deshalb wird jede Messung ärztlich geprüft."
];

export const DESCRIPTION = "Künstliche Intelligenz in der Radiologie in Graz: wie KI beim Röntgen und in der Mammographie hilft und warum die ärztliche Beurteilung entscheidend bleibt.";

export const EXCERPT = "KI kann Röntgenbilder vermessen und auffällige Bereiche markieren. Wie wir sie einsetzen, wo ihre Grenzen liegen und warum die ärztliche Beurteilung entscheidend bleibt.";

export const REVIEW = "BEANTWORTET (Peter, 21.10.2026): IB-Lab-Module im Einsatz; Fuß, Knie und Becken bei diesen Fragestellungen im Stehen; Kalibrierkugel wird verwendet; Ganzbeinaufnahmen werden gemacht; keine schriftliche IB-Lab-Freigabe für Berichte/Logos nötig. Text entsprechend angepasst. Übrige Punkte weiter offen: Vor Veröffentlichung von der Praxis zu bestätigen:\n1. Einführung der IB Lab-Module: Formulierung „Derzeit führen wir schrittweise … ein“ – stimmt der Stand (welche Module sind bei Veröffentlichung schon aktiv)? Text später aktualisieren, sobald alle laufen.\n2. Transpara: Einsatz NICHT bestätigt. Text und Kachel behaupten keinen Einsatz in der Praxis. Externe Quelle screenpoint-medical.com prüfen (Herstellerseite erwähnt auch DBT/Tomosynthese, die die Praxis nicht anbietet) – ggf. Quelle streichen. Falls die Praxis Transpara nicht einführt: Kachel ggf. neutral „KI – Mammographie“ benennen.\n3. „Am Ablauf ändert sich nichts“ / „Die Software wertet die Aufnahmen aus, die ohnehin angefertigt werden“: Bestätigen, dass für die KI keine zusätzlichen Aufnahmen gemacht werden (z. B. keine zusätzliche Ganzbein- oder Wirbelsäulenaufnahme, keine Kalibrierkugel nötig).\n4. KOALA-Kachel nennt „Knieaufnahmen im Stehen“ (laut Produktbeschreibung). Bestätigen, dass die Praxis Knieaufnahmen für diese Fragestellung im Stehen anfertigt.\n5. Rho: Altersgrenze 50 und Formulierung aus dexa.js übernommen. Klären, wie ein Rho-Hinweis an die Zuweiserin bzw. den Zuweiser kommuniziert wird (im Befund?).\n6. PANDA: Bestätigen, dass Knochenalter-Aufnahmen (linke Hand) bei Kindern in der Praxis angefertigt werden.\n7. Datenschutz bewusst nur allgemein formuliert. Klären: Wo läuft die KI-Auswertung (lokal oder Cloud), Auftragsverarbeitungsvertrag mit IB Lab/16 Bit, Datenschutzerklärung um KI-Verarbeitung ergänzen?\n8. „Ein Facharzt für Radiologie sieht sich jede Aufnahme selbst an“ – Praxis hat zwei Radiologen (männliche Form daher bewusst). Bestätigen.\n9. Serienname mit „K[AI]“ steht nur in TITLE/SERIES_NAME (Code hebt „AI“ hervor); im HTML-Fließtext nicht verwendet, damit keine Klammern sichtbar werden.\n10. Zulassungsstatus (CE-Kennzeichnung als Medizinprodukt) bewusst nicht erwähnt – bei Wunsch je Modul belegen.\n11. „Medizinisch geprüft von Dr. [NAME] – Stand [DATUM]“ ergänzen, sobald freigegeben.";

export const SERIES_NAME = "Röntgen am K[AI] – Künstliche Intelligenz, ärztlich verantwortet";


export const TILES = {
  "lama": {
    "title": "LAMA – Beinachsen",
    "text": "Bei Ganzbein- und Knieaufnahmen misst LAMA Beinachse, Beinlängen und Gelenkwinkel. So lassen sich O- oder X-Beine und Beinlängenunterschiede einheitlich dokumentieren und im Verlauf vergleichen."
  },
  "hippo": {
    "title": "HIPPO – Hüftvermessung",
    "text": "Auf Röntgenbildern des Beckens vermisst HIPPO Winkel und Abstände am Hüftgelenk, etwa die Überdachung des Hüftkopfs. Bei Hüftprothesen unterstützt es die Kontrolle der Prothesenlage im Verlauf."
  },
  "koala": {
    "title": "KOALA – Kniearthrose",
    "text": "Bei Knieaufnahmen im Stehen beurteilt KOALA Zeichen einer Kniearthrose, etwa einen verschmälerten Gelenkspalt oder knöcherne Anbauten, und ordnet den Schweregrad nach einer international üblichen Einteilung ein."
  },
  "squirrel": {
    "title": "SQUIRREL – Skoliose",
    "text": "Auf Röntgenaufnahmen der ganzen Wirbelsäule misst SQUIRREL den Cobb-Winkel, das übliche Maß für eine seitliche Verkrümmung. So lässt sich eine Skoliose einheitlich im Verlauf beobachten."
  },
  "frog": {
    "title": "FROG – Fußfehlstellungen",
    "text": "Bei Fußaufnahmen von oben und von der Seite misst FROG Winkel an Vorfuß und Fußgewölbe. Das unterstützt die Beurteilung von Fehlstellungen wie Hallux valgus, Spreizfuß, Plattfuß oder Hohlfuß."
  },
  "panda": {
    "title": "PANDA – Knochenalter",
    "text": "Bei Kindern und Jugendlichen schätzt PANDA anhand eines Röntgenbilds der linken Hand das Knochenalter. Das gibt der behandelnden Ärztin oder dem Arzt eine zusätzliche Grundlage, um das Wachstum einzuschätzen."
  },
  "rho": {
    "title": "RHO – Knochengesundheit",
    "text": "RHO prüft geeignete Röntgenaufnahmen von Personen ab 50 Jahren zusätzlich auf Hinweise für eine möglicherweise niedrige Knochendichte. Ob eine Knochendichtemessung sinnvoll ist, klärt die ärztliche Beurteilung."
  },
  "transpara": {
    "title": "Transpara – Mammographie",
    "text": "KI-Programme wie Transpara können Mammographiebilder zusätzlich auswerten und Bereiche markieren, die genauer angesehen werden sollten. Die Beurteilung jeder Aufnahme bleibt Aufgabe der Radiologin oder des Radiologen."
  }
};

export const TITLE = "Röntgen am K[AI]: Wie KI unsere Radiologie unterstützt";

export const TRUST_NOTE = "Jede KI-Auswertung wird von unseren Fachärzten für Radiologie geprüft, bei Bedarf korrigiert und fließt erst dann in den ärztlichen Befund ein.";
