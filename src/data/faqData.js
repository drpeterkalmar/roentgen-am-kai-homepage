// Zentrale FAQ-Daten für alle Leistungsseiten.
// Eine Quelle für den sichtbaren FAQ-Block (components/FAQ.jsx) UND das
// FAQPage-JSON-LD (components/SchemaMarkup.jsx) — keine Duplikate mehr.
// Neue Fragen hier ergänzen; Schema folgt automatisch.

export const faqData = {
  knochendichte: [
    {
      question: "Was ist eine DEXA-Knochendichtemessung?",
      answer: "Die DEXA-Methode (Dual-Energy X-ray Absorptiometry) ist der Goldstandard zur Diagnose von Osteoporose. Sie misst den Mineralgehalt der Knochen bei minimaler Strahlenbelastung."
    },
    {
      question: "Übernimmt die Krankenkasse die Kosten für die Knochendichtemessung?",
      answer: "Wir haben Direktverrechnungsverträge mit der BVAEB, SVS und KFA-Graz. Für ÖGK-Versicherte fungieren wir als Wahlarzt; Sie bezahlen die Untersuchung vorab und können den Anteil bei der ÖGK zur Rückerstattung einreichen."
    },
    {
      question: "Muss ich für die DEXA-Untersuchung nüchtern sein?",
      answer: "Nein, für eine Knochendichtemessung oder Körperfettanalyse ist keine spezielle Vorbereitung erforderlich. Sie müssen nicht nüchtern erscheinen."
    },
    {
      question: "Wie oft sollte die Knochendichte gemessen werden?",
      answer: "In der Regel ist eine Kontrolle alle 1-2 Jahre sinnvoll, um den Erfolg einer Therapie zu überwachen oder den Verlauf einer Osteopenie/Osteoporose zu dokumentieren."
    }
  ],

  mammographie: [
    {
      question: "Wann ist eine Mammographie sinnvoll?",
      answer: "Im Rahmen des österreichischen Brustkrebs-Früherkennungsprogramms ist eine Vorsorgemammographie alle 2 Jahre für Frauen zwischen 45 und 74 Jahren ohne Überweisung möglich. Außerhalb dieses Bereichs oder bei Beschwerden ist eine Untersuchung ab 40 Jahren mit Überweisung ratsam."
    },
    {
      question: "Ist die Mammographie bei Röntgen am Kai schmerzhaft?",
      answer: "Wir verwenden den modernsten Mammomat Inspiration von Siemens. Dieses Gerät passt den Kompressionsdruck individuell an und reduziert die Strahlendosis um bis zu 50%, was die Untersuchung deutlich angenehmer macht und eine exzellente Bildqualität liefert."
    },
    {
      question: "Benötige ich für das Mammographie-Screening eine Überweisung?",
      answer: "Wenn Sie in die Altersgruppe der 45- bis 74-Jährigen fallen oder freiwillig am erweiterten Screening teilnehmen (40-44 Jahre, älter als 74 Jahre), benötigen Sie keine Überweisung. Ihre e-Card ist für das Früherkennungsprogramm alle 2 Jahre automatisch freigeschaltet."
    },
    {
      question: "Was ist der Vorteil einer Doppelbefundung?",
      answer: "Bei der Doppelbefundung wird jede Aufnahme von zwei speziell zertifizierten Radiologen unabhängig voneinander beurteilt. Das erhöht die Genauigkeit der Diagnose."
    }
  ],

  koerperfett: [
    {
      question: "Was ist eine DEXA-Körperfettmessung?",
      answer: "Die DEXA-Methode (Dual-Energy X-ray Absorptiometry) ist das etablierteste Verfahren zur Bestimmung der Körperzusammensetzung. Sie liefert Daten zu Körperfett, Muskelmasse und Fettverteilung."
    },
    {
      question: "Für wen ist eine Körperfettanalyse sinnvoll?",
      answer: "Die Messung ist ideal für Sportler zur Trainingsoptimierung, bei Diäten zur Kontrolle des Fettabbaus oder für gesundheitsbewusste Menschen zur Bestimmung des viszeralen Fetts."
    },
    {
      question: "Muss ich für die Messung nüchtern sein?",
      answer: "Nein, eine spezielle Vorbereitung ist nicht nötig. Sie können die Untersuchung jederzeit ohne Fasten durchführen lassen."
    }
  ],

  roentgen: [
    {
      question: "Brauche ich für eine Röntgenuntersuchung eine Überweisung?",
      answer: "Ja, für eine kassenfinanzierte Röntgenuntersuchung benötigen Sie einen Überweisungsschein von Ihrem Haus- oder Facharzt – in Papierform oder digital – sowie Ihre aktuelle e-Card. Eventuelle Voraufnahmen zum Vergleich helfen uns bei der Beurteilung."
    },
    {
      question: "Wie hoch ist die Strahlenbelastung beim digitalen Röntgen?",
      answer: "Das digitale Detektorfeld liefert hochaufgelöste Bilder bei deutlich geringerer Strahlenbelastung als die klassische Filmentechnik. Wiederholungsaufnahmen entfallen, weil Ihre Aufnahmen dauerhaft in unserem Bildarchiv gespeichert sind."
    },
    {
      question: "Was muss ich vor der Untersuchung beachten?",
      answer: "Bitte legen Sie Schmuck und Metallgegenstände im Untersuchungsbereich ab. Eine bestehende oder mögliche Schwangerschaft müssen Sie uns vor der Untersuchung mitteilen. Bei Aufnahmen mit Kontrastmittel informieren wir Sie vorab, was zu beachten ist."
    },
    {
      question: "Wie bekomme ich meine Bilder?",
      answer: "Ihre Aufnahmen werden digital befundet und archiviert. Wir übermitteln sie rasch an Ihren Haus- oder Facharzt, geben sie Ihnen auf Wunsch auf einem Datenträger mit – und mit den steirischen Spitälern besteht über das MARC-System eine direkte Verbindung. Zusätzlich sind Ihre Bilder und Befunde über ELGA sowie im Patientenarchiv mit MARC-Anbindung verfügbar."
    }
  ],

  ultraschall: [
    {
      question: "Muss ich beim Oberbauch-Ultraschall nüchtern sein?",
      answer: "Ja. Bitte essen Sie mindestens 6 Stunden vor der Untersuchung nichts, rauchen Sie nicht und trinken Sie keinen Kaffee. Stilles Wasser ist erlaubt."
    },
    {
      question: "Warum muss die Blase beim Unterbauch-Ultraschall gefüllt sein?",
      answer: "Eine gefüllte Blase dient als natürliches Schallfenster und lässt die Organe des Unterbauchs besser darstellen. Bitte erscheinen Sie dafür mit gefüllter Blase."
    },
    {
      question: "Muss ich mich für eine Ultraschalluntersuchung anmelden?",
      answer: "Ja, Ultraschalluntersuchungen sind nur mit Voranmeldung möglich. Rufen Sie uns bitte telefonisch an. Für Schilddrüse, Hals, Brust und Gelenke ist keine spezielle Vorbereitung erforderlich."
    },
    {
      question: "Für welche Bereiche wird der Ultraschall eingesetzt?",
      answer: "Wir untersuchen Oberbauchorgane (Leber, Gallenblase, Milz, Bauchspeicheldrüse), Unterbauchorgane, Nieren und ableitende Harnwege, Halsorgane wie Schilddrüse und Speicheldrüsen, Lymphknoten, Brust sowie Weichteile und Gelenke. Mit dem Farbdoppler beurteilen wir Beinvenen und -arterien sowie die großen Halsgefäße (Carotiden)."
    }
  ],

  phlebographie: [
    {
      question: "Was ist eine Phlebographie?",
      answer: "Die Phlebographie ist eine Venenuntersuchung mit Kontrastmittel. Nach einer Nadelpunktion – meist am Fußrücken – werden die Venen dargestellt und in mehreren Projektionen beurteilt. Untersucht werden meist die Beine, in einigen Fällen auch die Arme."
    },
    {
      question: "Wann ist eine Phlebographie sinnvoll?",
      answer: "Zur Darstellung von Krampfadern, zur Beurteilung der Venenklappen, zur Prüfung der Durchgängigkeit der Beinvenen vor einer Krampfadern-Operation sowie zum Nachweis oder Ausschluss von Thrombosen der tiefen Beinvenen."
    },
    {
      question: "Was muss ich vor der Untersuchung beachten?",
      answer: "Bei bekannten Nierenerkrankungen benötigen wir Ihren aktuellen Kreatinin- (bzw. GFR-)Wert, bei einer Schilddrüsenerkrankung Ihren TSH-Wert. Wenden Sie sich dafür vor der Untersuchung an Ihren Hausarzt. Die Phlebographie erfolgt nur nach telefonischer Voranmeldung."
    },
    {
      question: "Wer kann die Untersuchung nicht durchführen lassen?",
      answer: "Nicht durchgeführt werden kann die Phlebographie bei einer bekannten Kontrastmittelallergie oder in der Schwangerschaft. Sprechen Sie uns im Zweifel vor der Untersuchung an."
    }
  ],

  dvt: [
    {
      question: "Was ist eine DVT (Digitale Volumentomographie)?",
      answer: "Die DVT ist ein hochpräzises 3D-Röntgenverfahren speziell für den Kopf- und Kieferbereich. Sie ermöglicht eine räumliche Darstellung von Knochen, Zähnen und Nervenkanälen bei deutlich geringerer Strahlenbelastung als bei einem herkömmlichen CT."
    },
    {
      question: "Wofür wird die DVT eingesetzt?",
      answer: "Typische Einsatzgebiete sind die Planung von Zahnimplantaten, die Abklärung überzähliger Zahnanlagen bei Kindern, die Darstellung der Kieferstrukturen sowie der Nasen-, Kiefer- und Nebenhöhlen. Auch bei Kiefergelenksbeschwerden liefert die DVT wichtige Planungsgrundlagen."
    },
    {
      question: "Bieten Sie auch klassisches Zahnröntgen an?",
      answer: "Ja, neben der 3D-DVT bieten wir auch digitales 2D-Zahnröntgen wie Panoramaaufnahmen (OPTG), Einzelzahnaufnahmen sowie Fernröntgen-Aufnahmen (Ceph) für kieferorthopädische Planungen an."
    }
  ]
};