import { SCREENING, AGE_RANGE, INTERVAL_TEXT } from './screening.js';
import { BODY, BODY_RADIATION_TEXT, BODY_LEAN_MASS_TEXT } from './bodyComposition.js';
import { DEXA_PRICE_TEXT, DEXA_OTHER_CARRIERS, DEXA_RADIATION_TEXT, DEXA_RHO_SENTENCE } from './dexa.js';

// FAQ Mammographie & Brustgesundheit (26.09.2026). Programmregeln aus src/data/screening.js.
// review: interne Markierung – Angabe von der Praxis / ärztlich zu bestätigen (wird NICHT angezeigt).
const sl = SCREENING.serviceline;
export const mammographieFaq = [
  {
    question: 'Brauche ich eine Überweisung?',
    answer: `Für die Screening-Mammographie im Früherkennungsprogramm nicht: Frauen zwischen ${AGE_RANGE} ohne Beschwerden kommen ohne ärztliche Zuweisung. Bei Beschwerden oder zur Abklärung eines auffälligen Befundes ist in der Regel eine ärztliche Zuweisung nötig.`,
  },
  {
    question: 'Reicht meine e-card für das Screening?',
    answer: `Ja. Für Frauen zwischen ${AGE_RANGE} ist die e-card für die Screening-Mammographie automatisch freigeschaltet. Bitte bringen Sie sie zum Termin mit.`,
  },
  {
    question: 'Wie oft kann ich zur Screening-Mammographie kommen?',
    answer: `Im Früherkennungsprogramm ${INTERVAL_TEXT}.`,
  },
  {
    question: 'Muss ich das Einladungsschreiben mitbringen?',
    answer: 'Nein. Das Erinnerungsschreiben ist für die Untersuchung nicht erforderlich – Ihre e-card genügt.',
  },
  {
    question: 'Was gilt für Frauen zwischen 40 und 44 Jahren?',
    answer: `Sie können sich entsprechend den aktuellen Programmregeln zum Früherkennungsprogramm anmelden – über die Serviceline ${sl.display} (${sl.hours}) oder unter ${SCREENING.officialUrlLabel}.`,
  },
  {
    question: 'Was gilt für Frauen ab 75 Jahren?',
    answer: `Auch Frauen ab 75 Jahren können sich entsprechend den aktuellen Programmregeln anmelden – über die Serviceline ${sl.display} (${sl.hours}) oder unter ${SCREENING.officialUrlLabel}.`,
  },
  {
    question: 'Was mache ich bei Beschwerden?',
    answer: 'Warten Sie nicht auf einen regulären Screening-Termin. Lassen Sie neue Veränderungen der Brust – etwa einen tastbaren Knoten, Sekretion aus der Brustwarze oder eine Hauteinziehung – rasch ärztlich abklären. Das Screening ist für Frauen ohne Beschwerden vorgesehen.',
  },
  {
    question: 'Tut eine Mammographie weh?',
    answer: 'Für die Aufnahme wird die Brust kurz zusammengedrückt. Das kann unangenehm und manchmal auch schmerzhaft sein, dauert aber jeweils nur kurz. Ist Ihre Brust vor der Regel empfindlich, ist ein Termin während oder in der Woche nach der Regel oft angenehmer.',
  },
  {
    question: 'Ist eine Mammographie mit Brustimplantaten möglich?',
    answer: 'In der Regel ja. Bitte teilen Sie uns bei der Terminvereinbarung mit, dass Sie Brustimplantate haben.',
    review: 'Praxis bestätigen: Mammographie bei Implantaten im Angebot? Besonderheiten bei Terminvergabe/Screening?',
  },
  {
    question: 'Wann kann ein Brustultraschall sinnvoll sein?',
    answer: 'Zum Beispiel bei dichtem Brustgewebe oder zur weiteren Abklärung eines Befundes. Ultraschall und Mammographie liefern unterschiedliche Informationen; ob ein Ultraschall nötig ist, wird ärztlich beurteilt.',
    review: 'Ärztlich freigeben.',
  },
  {
    question: 'Was bedeutet dichtes Brustgewebe?',
    answer: 'Die Brust besteht aus Drüsen-, Binde- und Fettgewebe. Von dichtem Brustgewebe spricht man, wenn der Anteil an Drüsen- und Bindegewebe hoch ist. Das ist häufig und keine Krankheit, kann aber die Beurteilung der Mammographie erschweren.',
    review: 'Ärztlich freigeben.',
  },
  {
    question: 'Was muss ich mitbringen?',
    answer: 'Ihre e-card, Voraufnahmen und Vorbefunde (sofern sie uns nicht bereits vorliegen) und – falls vorhanden – Ihre Zuweisung. Für die Screening-Mammographie ist keine Zuweisung nötig.',
  },
  {
    question: 'Wie erhalte ich meinen Befund?',
    answer: 'Ihre Aufnahmen werden digital befundet und archiviert und stehen Ihrem Haus- oder Facharzt rasch zur Verfügung. Ihre Bilder und Befunde sind zusätzlich über ELGA sowie online unter portal.marc.at verfügbar.',
    review: 'Praxis bestätigen: Befundweg im Screening (z. B. Befundbrief, Befundbesprechung) – nicht erfinden.',
  },
];

// Zentrale FAQ-Daten für alle Leistungsseiten.
// Eine Quelle für den sichtbaren FAQ-Block (components/FAQ.jsx) UND das
// FAQPage-JSON-LD (components/SchemaMarkup.jsx) — keine Duplikate mehr.
// Stand 06.09.2026: 1:1 aus der gesendeten HEROLD-FAQ-Mail übernommen
// (43 Q&A auf 12 Seiten; die Sets lungenroentgen, wirbelsaeulenroentgen,
// roentgenNachUnfall, mammascreening und angebot liegen für die noch zu
// bauenden Unterseiten bereit — Schema-Routen in SchemaMarkup.jsx).

// FAQ DEXA-Knochendichtemessung (26.09.2026). Preis/Kassenregeln/Rho aus src/data/dexa.js.
// review: interne Markierung – Angabe von der Praxis / ärztlich zu bestätigen (wird NICHT angezeigt).
export const dexaFaq = [
  {
    question: 'Was ist eine DEXA-Knochendichtemessung?',
    answer: 'DEXA (auch DXA, „Dual-Energy X-ray Absorptiometry“) ist eine Röntgenmessung mit sehr geringer Dosis. Sie bestimmt den Mineralgehalt des Knochens – meist an der Lendenwirbelsäule und an der Hüfte bzw. am Oberschenkelhals. Das Ergebnis hilft, eine Osteoporose zu erkennen und das Bruchrisiko einzuschätzen.',
  },
  {
    question: 'Warum wird DEXA als Standardmethode verwendet?',
    answer: 'DEXA ist die wissenschaftlich etablierte Standard- und Referenzmethode zur Messung der Knochenmineraldichte. Die Messwerte sind standardisiert (T-Score, Z-Score), international vergleichbar und eignen sich für Diagnose, Risikoeinschätzung und Verlaufskontrollen.',
  },
  {
    question: 'Wann ist die Untersuchung sinnvoll?',
    answer: 'Zum Beispiel bei Frauen nach der Menopause mit Risikofaktoren, bei Frauen ab 65 und Männern ab 70 Jahren, nach einem Knochenbruch bei geringem Anlass, bei längerer Cortisontherapie oder bei Erkrankungen, die den Knochen schwächen können. Nicht jede Person braucht ab einem bestimmten Alter automatisch eine DEXA – ab 50 ist aber eine persönliche Einschätzung des Osteoporoserisikos sinnvoll.',
  },
  {
    question: 'Brauche ich eine ärztliche Zuweisung?',
    answer: `Für die Abrechnung als Kassenleistung bei ${DEXA_OTHER_CARRIERS} ist eine ärztliche Zuweisung erforderlich. Für ÖGK-Versicherte ist die Messung eine Privatleistung. Ob Sie für eine mögliche Kostenerstattung durch die ÖGK eine Zuweisung benötigen, klären Sie bitte vorab mit der ÖGK oder mit uns.`,
    review: 'Praxis bestätigen: ÖGK-Privatleistung auch ohne Zuweisung buchbar? Welche Unterlagen braucht die ÖGK für eine Erstattung (Zuweisung, Honorarnote)?',
  },
  {
    question: 'Was kostet die Untersuchung bei der ÖGK?',
    answer: `Für ÖGK-Versicherte wird die DEXA-Knochendichtemessung als Privatleistung angeboten. Der Preis beträgt ${DEXA_PRICE_TEXT}.`,
  },
  {
    question: 'Kann die ÖGK Kosten rückerstatten?',
    answer: 'Abhängig von den individuellen Voraussetzungen kann eine teilweise oder vollständige Kostenerstattung möglich sein. Eine Rückerstattung kann nicht garantiert werden. Bitte informieren Sie sich im Zweifel vorab bei der ÖGK.',
  },
  {
    question: 'Welche anderen Kassen übernehmen die Untersuchung?',
    answer: `Mit ${DEXA_OTHER_CARRIERS} kann die Untersuchung bei Vorliegen der erforderlichen ärztlichen Zuweisung als Kassenleistung abgerechnet werden. Bei Unsicherheit informieren Sie sich bitte vor der Terminvereinbarung bei uns oder Ihrem Versicherungsträger.`,
  },
  {
    question: 'Wie läuft die Messung ab?',
    answer: 'Sie liegen ruhig auf dem Rücken auf einer Untersuchungsliege, während ein Messarm über Lendenwirbelsäule und Hüfte fährt. Metallteile im Messbereich – etwa Gürtelschnallen, Knöpfe oder Reißverschlüsse – müssen gegebenenfalls abgelegt werden. Eine besondere Vorbereitung ist nicht nötig; Sie müssen nicht nüchtern sein.',
    review: 'Praxis bestätigen: keine besondere Vorbereitung / nicht nüchtern (lt. bisheriger Website).',
  },
  {
    question: 'Tut die Untersuchung weh?',
    answer: 'Nein. Die Messung ist schmerzlos und nicht invasiv – es gibt keine Spritze und keine Röhre. Sie liegen lediglich ruhig auf der Liege.',
  },
  {
    question: 'Wie hoch ist die Strahlenbelastung?',
    answer: `${DEXA_RADIATION_TEXT} Die Belastung ist damit deutlich geringer als bei einer üblichen Röntgenaufnahme. Weil es sich dennoch um Röntgenstrahlung handelt, teilen Sie uns eine mögliche Schwangerschaft bitte vorher mit.`,
  },
  {
    question: 'Was bedeuten T-Score und Z-Score?',
    answer: 'Der T-Score vergleicht Ihre Knochendichte mit dem Durchschnitt junger, gesunder Erwachsener. Er wird vor allem bei Frauen nach der Menopause und Männern ab 50 Jahren verwendet. Der Z-Score vergleicht Ihren Wert mit Menschen gleichen Alters und Geschlechts – er ist vor allem bei jüngeren Personen aussagekräftig. Beide Werte werden immer gemeinsam mit Ihren Risikofaktoren ärztlich beurteilt.',
  },
  {
    question: 'Wie oft soll die Messung wiederholt werden?',
    answer: 'Dafür gibt es kein fixes Intervall für alle. Ob und wann eine Kontrolle sinnvoll ist, hängt vom Ausgangswert, von Ihren Risikofaktoren, einer laufenden Therapie und der medizinischen Fragestellung ab. Das legt Ihre behandelnde Ärztin oder Ihr behandelnder Arzt fest.',
  },
  {
    question: 'Kann ich Mammographie und DEXA gemeinsam buchen?',
    answer: 'Ja, nach Möglichkeit führen wir Mammographie und Knochendichtemessung an einem gemeinsamen Termin durch. Einen gemeinsamen Termin vereinbaren Sie derzeit am einfachsten telefonisch. Bitte sagen Sie uns dabei Ihre Krankenkasse und ob eine Zuweisung vorliegt.',
    review: 'Online-Kombibuchung erst möglich, wenn DEXA in MiraNext angelegt ist – dann Antwort anpassen (DEXA.combinedOnline).',
  },
  {
    question: 'Was macht das KI-Screening Rho?',
    answer: `${DEXA_RHO_SENTENCE} Das Programm Rho nutzt dafür bereits angefertigte Aufnahmen – ohne zusätzliche Aufnahme und ohne zusätzliche Strahlung. Es liefert einen Risikohinweis auf eine möglicherweise niedrige Knochenmineraldichte, aber keine Diagnose.`,
  },
  {
    question: 'Ersetzt ein Rho-Hinweis die DEXA?',
    answer: 'Nein. Ein Rho-Hinweis ist keine Osteoporosediagnose. Ein auffälliger Hinweis kann Anlass für eine gezielte DEXA-Messung und eine weitere ärztliche Abklärung sein. Die Knochendichte selbst wird mit der DEXA gemessen.',
  },
  {
    question: 'Darf eine DEXA in der Schwangerschaft erfolgen?',
    answer: 'In der Schwangerschaft wird eine DEXA in der Regel nicht durchgeführt, auch wenn die Dosis sehr gering ist. Teilen Sie uns eine mögliche oder bestehende Schwangerschaft bitte vor der Untersuchung mit – wir besprechen dann mit Ihnen das weitere Vorgehen.',
    review: 'Ärztlich freigeben.',
  },
];

// FAQ Körperanalyse (27.09.2026). Zentrale Praxisangaben: src/data/bodyComposition.js.
// pending: Angabe der Praxis fehlt → Antwort zeigt einen gelben Platzhalter und die Frage wird
// NICHT ins FAQPage-Schema übernommen (siehe SchemaMarkup.jsx / faqSchemaItems).
const eur = (n) => `${n} Euro`;
export const koerperanalyseFaq = [
  {
    question: 'Was ist eine DEXA-Körperanalyse?',
    answer:
      'Eine medizinische Messung Ihrer Körperzusammensetzung. DEXA (Dual-Röntgen-Absorptiometrie) arbeitet mit zwei sehr schwachen Röntgenenergien und unterscheidet so zwischen Fettmasse, fettfreier Weichteilmasse und Knochenmineral – für den ganzen Körper und getrennt nach Armen, Beinen und Rumpf.',
  },
  {
    question: 'Was ist der Unterschied zur Körperfettwaage oder BIA?',
    answer:
      'Körperfettwaagen und die bioelektrische Impedanzanalyse (BIA) schätzen die Körperzusammensetzung über den elektrischen Widerstand und Berechnungsmodelle. Das Ergebnis hängt unter anderem vom Gerät, vom Algorithmus und vom Flüssigkeitshaushalt ab. DEXA misst die Gewebe direkt, liefert eine regionale Auswertung und eignet sich gut für standardisierte Verlaufskontrollen.',
  },
  {
    question: 'Misst DEXA tatsächlich die Muskelmasse?',
    answer: `Nicht direkt. ${BODY_LEAN_MASS_TEXT}`,
  },
  {
    question: 'Kann DEXA Sarkopenie feststellen?',
    answer:
      'DEXA allein bestätigt oder widerlegt keine Sarkopenie. Die Messung zeigt die magere Masse von Armen und Beinen. Für eine vollständige Beurteilung gehören zusätzlich die Muskelkraft – etwa Handkraft oder Aufstehtest – und gegebenenfalls die körperliche Leistungsfähigkeit dazu. Ihr Bericht enthält den RSMI, einen Index der mageren Masse von Armen und Beinen im Verhältnis zur Körpergröße. Die Beurteilung erfolgt durch Ihre behandelnde Ärztin oder Ihren behandelnden Arzt.',
  },
  {
    question: 'Wie lange dauert die Untersuchung?',
    answer: `Planen Sie für Ihren Termin etwa ${BODY.durationMinutes} Minuten ein. Die Messung ist schmerzfrei, Sie liegen dabei ruhig auf dem Untersuchungstisch.`,
  },
  {
    question: 'Wie hoch ist die Strahlenbelastung?',
    answer: `${BODY_RADIATION_TEXT} Die genaue Dosis hängt vom Gerät und vom Untersuchungsprotokoll ab.`,
  },
  {
    question: 'Wie bereite ich mich auf die Messung vor?',
    answer:
      'Am besten kommen Sie nüchtern, mit entleerter Harnblase und in leichter Kleidung. Metallteile im Messbereich – etwa Gürtelschnallen, Reißverschlüsse, Knöpfe oder Schmuck – können die Messung stören. Für Verlaufsmessungen sind möglichst gleiche Bedingungen wichtig, etwa eine ähnliche Tageszeit.',
  },
  {
    question: 'Wie oft ist eine Verlaufsmessung sinnvoll?',
    answer:
      'Dafür gibt es kein fixes Intervall. Veränderungen der Körperzusammensetzung brauchen Zeit, eine Verlaufsmessung erfolgt deshalb häufig nach mehreren Monaten. Der geeignete Abstand hängt von Ihrem Ziel und Ihrem individuellen Verlauf ab. Aussagekräftig ist der Vergleich vor allem am selben Gerät und unter vergleichbaren Bedingungen.',
  },
  {
    question: 'Brauche ich eine ärztliche Zuweisung?',
    answer: 'Nein. Die Körperanalyse ist eine Privatleistung und ohne ärztliche Zuweisung buchbar. Die Krankenkasse übernimmt die Kosten nicht.',
  },
  {
    question: 'Was kostet die Körperanalyse?',
    answer:
      BODY.prices.start != null
        ? `Die Körperanalyse ist eine Privatleistung. Eine Messung kostet ${eur(BODY.prices.start)}, das Paket aus Start- und Verlaufsmessung ${eur(BODY.prices.package)} (beide Messungen innerhalb von 2 Jahren).`
        : 'Die Körperanalyse ist eine Privatleistung und wird von der Krankenkasse nicht bezahlt.',
    pending: BODY.prices.start != null ? undefined : '[PREIS] für Startmessung, Verlaufskontrolle und Paket.',
  },
  {
    question: 'Ist die Untersuchung während einer Schwangerschaft möglich?',
    answer:
      'Bitte teilen Sie uns eine mögliche oder bestehende Schwangerschaft unbedingt vor der Untersuchung mit. Eine Körperanalyse ist eine Untersuchung ohne medizinische Dringlichkeit und wird in der Schwangerschaft in der Regel nicht durchgeführt.',
  },
  {
    question: 'Ist Körperanalyse dasselbe wie Knochendichtemessung?',
    answer:
      'Nein. Beide Untersuchungen verwenden DEXA, verfolgen aber unterschiedliche Fragestellungen: Die Körperanalyse erfasst Fettmasse, magere Weichteilmasse und deren Verteilung. Die Knochendichtemessung dient der Abklärung einer Osteoporose. Beide können getrennte Buchungen erfordern.',
  },
  {
    question: 'Kann ich damit den Verlauf während einer Abnehmtherapie kontrollieren?',
    answer:
      'Ja, eine Ausgangsmessung und spätere Verlaufsmessungen zeigen, wie sich Fettmasse und fettfreie Masse verändern. Die Messung ist aber keine Kontrolle der Medikamentendosis. Änderungen einer medikamentösen Behandlung erfolgen ausschließlich durch die behandelnde Ärztin oder den behandelnden Arzt.',
  },
  {
    question: 'Wird auch viszerales Fett ausgewertet?',
    answer: BODY.visceralFat
      ? 'Ja. Die Software unseres DEXA-Geräts wertet zusätzlich das viszerale Fett (inneres Bauchfett) aus.'
      : 'Ein Wert für das viszerale Fett (inneres Bauchfett) setzt eine eigene, validierte Auswertungssoftware voraus. Ob diese Auswertung Teil Ihres Berichts ist, beantworten wir Ihnen gerne vor der Terminbuchung.',
    pending: BODY.visceralFat ? undefined : 'Praxis bestätigen: Ist CoreScan (viszerales Fett) in der enCORE-Software freigeschaltet?',
  },
];

// Nur vollständig beantwortete Fragen gehen ins FAQPage-Schema.
export const faqSchemaItems = (items) => items.filter((i) => !i.pending);

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
  mammographie: mammographieFaq,
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
  knochendichte: dexaFaq,
  koerperanalyse: koerperanalyseFaq,
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
