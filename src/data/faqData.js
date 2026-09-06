// Zentrale FAQ-Daten für alle Leistungsseiten.
// Eine Quelle für den sichtbaren FAQ-Block (components/FAQ.jsx) UND das
// FAQPage-JSON-LD (components/SchemaMarkup.jsx) — keine Duplikate mehr.
// Stand 06.09.2026: 1:1 aus der gesendeten HEROLD-FAQ-Mail übernommen
// (43 Q&A auf 12 Seiten; die Sets lungenroentgen, wirbelsaeulenroentgen,
// roentgenNachUnfall, mammascreening und angebot liegen für die noch zu
// bauenden Unterseiten bereit — Schema-Routen in SchemaMarkup.jsx).

export const faqData = {
  roentgen: [
    {
      question: "Brauche ich für eine Röntgenuntersuchung eine Überweisung?",
      answer: "Ja, für eine kassenfinanzierte Röntgenuntersuchung benötigen Sie einen Überweisungsschein von Ihrem Haus- oder Facharzt – in Papierform oder digital – sowie Ihre aktuelle e-Card. Eventuelle Voraufnahmen zum Vergleich helfen uns bei der Beurteilung."
    },
    {
      question: "Wie hoch ist die Strahlenbelastung beim digitalen Röntgen?",
      answer: "Das digitale Detektorfeld liefert hochaufgelöste Bilder bei deutlich geringerer Strahlenbelastung als die klassische Filmtechnik. Wiederholungsaufnahmen entfallen, weil Ihre Aufnahmen dauerhaft in unserem Bildarchiv gespeichert sind."
    },
    {
      question: "Was muss ich vor der Untersuchung beachten?",
      answer: "Bitte legen Sie Schmuck und Metallgegenstände im Untersuchungsbereich ab. Eine bestehende oder mögliche Schwangerschaft müssen Sie uns vor der Untersuchung mitteilen. Bei Aufnahmen mit Kontrastmittel informieren wir Sie vorab, was zu beachten ist."
    },
    {
      question: "Wie bekomme ich meine Bilder?",
      answer: "Ihre Aufnahmen werden digital befundet und archiviert und stehen Ihrem Haus- oder Facharzt rasch zur Verfügung – mit den steirischen Spitälern besteht über das MARC-System eine direkte Verbindung. Ihre Bilder und Befunde sind zusätzlich über ELGA sowie online unter portal.marc.at verfügbar."
    }
  ],
  ultraschall: [
    {
      question: "Muss vor der Sonographie des Bauches nüchtern sein?",
      answer: "Ja. Bitte essen Sie mindestens 6 Stunden vor der Untersuchung nichts, rauchen Sie nicht und trinken Sie keinen Kaffee. Stilles Wasser ist erlaubt."
    },
    {
      question: "Warum sollte die Harnblase beim Bauch-Ultraschall gefüllt sein?",
      answer: "Eine gefüllte Harnblase dient als natürliches Schallfenster und lässt die Organe des Unterbauchs besser darstellen."
    },
    {
      question: "Muss ich mich für eine Ultraschalluntersuchung anmelden?",
      answer: "Ja, Ultraschalluntersuchungen sind nur mit Voranmeldung möglich. Rufen Sie uns bitte telefonisch an. Für Schilddrüse, Hals, Brust und Gelenke ist keine spezielle Vorbereitung erforderlich."
    },
    {
      question: "Für welche Bereiche wird der Ultraschall eingesetzt?",
      answer: "Wir untersuchen Oberbauchorgane (Leber, Gallenblase, Milz, Bauchspeicheldrüse), Unterbauchorgane, Nieren und ableitende Harnwege, Halsorgane wie Schilddrüse und Speicheldrüsen, Lymphknoten, Brust sowie Gelenke. Mit dem Farbdoppler beurteilen wir Bauchaorta, Arm-, Becken-, Beinvenen sowie -arterien sowie die großen Halsgefäße."
    }
  ],
  mammographie: [
    {
      question: "Wann ist eine Mammographie sinnvoll?",
      answer: "Im Rahmen des österreichischen Brustkrebs-Früherkennungsprogramms ist eine Vorsorgemammographie alle 2 Jahre für Frauen zwischen 45 und 74 Jahren ohne Überweisung möglich. Das Programm ist freiwillig; auf Wunsch kann es auf alle Altersgruppen ab 40 Jahren – ohne obere Altersgrenze – ausgedehnt werden, ebenfalls ohne Überweisung. Außerhalb dieses Bereichs oder bei Beschwerden ist eine Untersuchung mit Überweisung ratsam."
    },
    {
      question: "Ist die Mammographie bei Röntgen am Kai schmerzhaft?",
      answer: "Unser Mammographiegerät passt den Kompressionsdruck individuell an und reduziert die Strahlendosis um bis zu 50 %, was die Untersuchung deutlich angenehmer macht und eine exzellente Bildqualität liefert."
    },
    {
      question: "Benötige ich für das Mammographie-Screening eine Überweisung?",
      answer: "Wenn Sie in die Altersgruppe der 45- bis 74-Jährigen fallen oder freiwillig am erweiterten Screening teilnehmen (40–44 Jahre, älter als 74 Jahre), benötigen Sie keine Überweisung. Ihre e-Card ist für das Früherkennungsprogramm alle 2 Jahre automatisch freigeschaltet."
    },
    {
      question: "Was ist der Vorteil einer Doppelbefundung?",
      answer: "Bei der für uns verpflichtenden Doppelbefundung wird jede Mammographie von zwei speziell zertifizierten RadiologInnen unabhängig voneinander beurteilt."
    }
  ],
  dvt: [
    {
      question: "Was ist eine DVT (Digitale Volumentomographie)?",
      answer: "Die DVT ist ein hochpräzises 3D-Röntgenverfahren speziell für den Kopf- und Kieferbereich. Sie ermöglicht eine räumliche Darstellung von Knochen, Zähnen und Nervenkanälen bei deutlich geringerer Strahlenbelastung als bei einem herkömmlichen CT."
    },
    {
      question: "Wofür wird die DVT eingesetzt?",
      answer: "Typische Einsatzgebiete sind die Planung von Zahnimplantaten, die Abklärung überzähliger Zahnanlagen bei Kindern, der Ausschluss entzündlicher oder tumoröser Veränderungen, die Darstellung der Kieferstrukturen sowie der Nasen-, Kiefer- und Nebenhöhlen. Auch bei Kiefergelenksbeschwerden liefert die DVT wichtige Planungsgrundlagen."
    },
    {
      question: "Bieten Sie auch klassisches Zahnröntgen an?",
      answer: "Ja, neben der 3D-DVT bieten wir auch digitales 2D-Zahnröntgen wie Panoramaaufnahmen (OPTG), Einzelzahnaufnahmen sowie Fernröntgen-Aufnahmen (Ceph) für kieferorthopädische Planungen an."
    }
  ],
  knochendichte: [
    {
      question: "Was ist eine DEXA-Knochendichtemessung?",
      answer: "Die DEXA-Methode (Dual-Energy X-ray Absorptiometry) ist der Goldstandard zur Diagnose von Osteoporose. Sie misst den Mineralgehalt der Knochen bei minimaler Strahlenbelastung."
    },
    {
      question: "Übernimmt die Krankenkasse die Kosten für die Knochendichtemessung?",
      answer: "Wir haben Direktverrechnungsverträge mit der BVAEB, SVS und KFA."
    },
    {
      question: "Muss ich für die DEXA-Untersuchung nüchtern sein?",
      answer: "Nein, für eine Knochendichtemessung oder Körperfettanalyse ist keine spezielle Vorbereitung erforderlich. Sie müssen nicht nüchtern erscheinen."
    },
    {
      question: "Wie oft sollte die Knochendichte gemessen werden?",
      answer: "In der Regel ist eine Kontrolle alle 1–2 Jahre sinnvoll, um den Erfolg einer Therapie zu überwachen oder den Verlauf einer Osteopenie/Osteoporose zu dokumentieren."
    }
  ],
  koerperfett: [
    {
      question: "Was ist eine DEXA-Körperfettmessung?",
      answer: "Die DEXA-Methode (Dual-Energy X-ray Absorptiometry) ist das genaueste und etablierteste Verfahren zur Bestimmung der Körperzusammensetzung. Sie liefert Daten zu Körperfett, Muskelmasse und Fettverteilung."
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
  phlebographie: [
    {
      question: "Was ist eine Phlebographie?",
      answer: "Die Phlebographie ist eine Venenuntersuchung mit Kontrastmittel. Nach einer Nadelpunktion – meist am Fußrücken – werden die Venen dargestellt und in mehreren Projektionen beurteilt."
    },
    {
      question: "Wann ist eine Phlebographie sinnvoll?",
      answer: "Zur Beurteilung der Venenklappen bei venöser Insuffizienz sowie zur Prüfung der Durchgängigkeit der Beinvenen zum Nachweis oder Ausschluss von Thrombosen."
    },
    {
      question: "Was muss ich vor der Phlebographie beachten?",
      answer: "Bei bekannten Nierenerkrankungen benötigen wir Ihren aktuellen Kreatinin- (bzw. GFR-)Wert, bei einer Schilddrüsenerkrankung Ihren TSH-Wert. Wenden Sie sich dafür vor der Untersuchung an Ihren Hausarzt. Die Phlebographie erfolgt nur nach telefonischer Voranmeldung."
    },
    {
      question: "Wer kann die Untersuchung nicht durchführen lassen?",
      answer: "Nicht durchgeführt werden kann die elektive Phlebographie bei einer bekannten Kontrastmittelallergie, einer Schilddrüsenüberfunktion oder in der Schwangerschaft. Sprechen Sie uns im Zweifel vor der Untersuchung an."
    }
  ],
  lungenroentgen: [
    {
      question: "Wann ist ein Lungenröntgen sinnvoll?",
      answer: "Ein Lungenröntgen zeigt krankhafte Veränderungen der Lunge, des Brustkorbs, des Rippenfells und in bestimmten Fällen auch des Herzens. Es kommt sowohl bei bestehenden Beschwerden zum Einsatz als auch als Routineuntersuchung vor Operationen."
    },
    {
      question: "Wie lange ist ein Lungenröntgen vor einer Operation gültig?",
      answer: "Brauchen Sie das Lungenröntgen für eine Narkosetauglichkeitsprüfung vor einer Operation, darf die Aufnahme nicht älter als 14 Tage sein. Planen Sie die Untersuchung daher zeitnah vor dem Eingriff."
    },
    {
      question: "Wie vereinbare ich einen Termin für das Lungenröntgen?",
      answer: "Die Untersuchung erfolgt nach telefonischer Terminvereinbarung unter +43 316 8409050. Lungenröntgen-Aufnahmen, etwa vor einer geplanten Operation, können in der Regel zeitnah durchgeführt werden."
    },
    {
      question: "Wie läuft die Lungenröntgen-Untersuchung ab?",
      answer: "Die Aufnahme erfolgt üblicherweise in zwei Ebenen, von vorne und von der Seite. Während der Aufnahme werden Sie gebeten, kurz den Atem anzuhalten; die Untersuchung selbst dauert nur wenige Minuten."
    }
  ],
  wirbelsaeulenroentgen: [
    {
      question: "Wann ist ein Wirbelsäulenröntgen sinnvoll?",
      answer: "Rückenschmerzen können verschiedenste Ursachen haben; das Wirbelsäulenröntgen ist das wichtigste erste bildgebende Verfahren zur Abklärung. Es zeigt Hals-, Brust- und Lendenwirbelsäule hinsichtlich Fehlhaltungen, Fehlstellungen, Verletzungen, Abnützungen und Knochenstrukturveränderungen wie Osteoporose."
    },
    {
      question: "Warum wird die Wirbelsäule im Stehen geröntgt?",
      answer: "Im Gegensatz zu Schnittbildverfahren wie CT oder MRT erfolgen die Aufnahmen in stehender Position. Haltungs- und Funktionsfehlstellungen lassen sich so deutlich besser beurteilen."
    },
    {
      question: "Wann werden Funktions- oder Ganzaufnahmen durchgeführt?",
      answer: "Bei Fehlhaltungen fertigen wir zur Beurteilung der Gesamtachse Wirbelsäulenganzaufnahmen an. Bei Verdacht auf Instabilität oder Gleitwirbelbildung ergänzen wir die Untersuchung durch Funktionsaufnahmen in Beugung und Streckung."
    }
  ],
  roentgenNachUnfall: [
    {
      question: "Wann ist ein Röntgen nach einem Unfall sinnvoll?",
      answer: "Röntgenaufnahmen des Skeletts sichern die Diagnose, die Ihre Ärztin oder Ihr Arzt klinisch gestellt hat. So lassen sich Knochenbrüche zuverlässig erkennen oder ausschließen."
    },
    {
      question: "Was muss ich zum Termin mitbringen?",
      answer: "Bitte bringen Sie Ihren Überweisungsschein und Ihre e-Card mit. Falls vorhanden, helfen frühere Aufnahmen oder ein ärztlicher Brief bei der Beurteilung."
    },
    {
      question: "Was steht im Befund?",
      answer: "Im schriftlichen Befund wird festgehalten, ob und welche Veränderungen erkennbar sind und welche medizinische Bedeutung sie haben. Befund und Aufnahmen stehen Ihrem zuweisenden Arzt für die weitere Behandlung zur Verfügung."
    }
  ],
  mammascreening: [
    {
      question: "Wie melde ich mich für das Brustkrebs-Früherkennungsprogramm an?",
      answer: "Frauen zwischen 45 und 74 Jahren sind mit der e-Card automatisch alle 2 Jahre freigeschaltet und erhalten rechtzeitig einen Erinnerungsbrief; die Teilnahme ist kostenfrei. Frauen zwischen 40 und 44 Jahren sowie ab 74 Jahren können sich freiwillig anmelden – telefonisch unter 0800 500 181 (Mo–Fr 8:00–17:00 Uhr) oder online unter www.frueh-erkennen.at."
    },
    {
      question: "Wann ist der beste Zeitpunkt für die Untersuchung?",
      answer: "Der optimale Zeitpunkt für eine Mammographie liegt in der Periode oder in der ersten Woche danach, weil die Brust dann weniger druckempfindlich ist."
    },
    {
      question: "Worauf sollte ich am Tag der Untersuchung achten?",
      answer: "Verwenden Sie im Brust- und Achselbereich kein Deo, keinen Puder und keine Creme. Bringen Sie Ihre e-Card und, falls vorhanden, frühere Mammographie-Aufnahmen mit. Bequemer sind Hose oder Rock statt eines Kleides, da Sie den Oberkörper für die Untersuchung freimachen."
    },
    {
      question: "Ersetzt der Ultraschall der Brust die Mammographie?",
      answer: "Nein. Der Brust-Ultraschall wird als Ergänzung zur Mammographie eingesetzt, insbesondere bei jüngeren Frauen oder dichtem Drüsengewebe. Bestimmte Veränderungen wie Mikroverkalkungen lassen sich nur mammographisch beurteilen."
    }
  ],
  angebot: [
    {
      question: "Kann ich bei Ihnen parken?",
      answer: "Ja, in der Tiefgarage direkt im Haus stehen kostenlose Parkplätze zur Verfügung."
    },
    {
      question: "Wie erreiche ich die Ordination mit öffentlichen Verkehrsmitteln?",
      answer: "Die Ordination in der Körösistraße 9 ist mit den Straßenbahnlinien 3 und 5 sowie den Buslinien 58 und 63 gut erreichbar."
    },
    {
      question: "Ist die Ordination barrierefrei?",
      answer: "Ja, der Zugang ist barrierefrei mit Lift, die Ordination ist rollstuhltauglich eingerichtet."
    }
  ]
};
