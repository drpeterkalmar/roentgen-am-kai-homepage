// Österreichisches Brustkrebs-Früherkennungsprogramm („früh erkennen“) – ZENTRALE Regeln.
// Alle Texte auf Website, FAQ, strukturierten Daten und Startseite werden hieraus gebildet.
// Bei Programmänderungen NUR hier anpassen.
// Quelle: https://www.frueh-erkennen.at/ (Serviceline + Altersgruppe geprüft am 26.09.2026)
// Keine eigenen Freischaltungsregeln ergänzen – Sonderfälle verweisen auf das Programm.

export const SCREENING = {
  programName: 'Österreichisches Brustkrebs-Früherkennungsprogramm',
  programShort: 'früh erkennen',
  ageFrom: 45,
  ageTo: 74,
  intervalYears: 2,
  intervalWord: 'zwei', // ausgeschrieben für Fließtext („alle zwei Jahre“)
  referralNeeded: false, // keine ärztliche Zuweisung im Programm
  invitationLetterNeeded: false, // Erinnerungsschreiben nicht erforderlich (Praxisangabe 26.09.2026)
  ecardAutoEnabled: true, // e-card automatisch freigeschaltet
  // Anmeldung außerhalb der Kernzielgruppe – Details regelt das Programm, nicht die Praxis
  optIn: [
    { id: 'jung', label: 'Frauen zwischen 40 und 44 Jahren' },
    { id: 'alt', label: 'Frauen ab 75 Jahren' },
  ],
  officialUrl: 'https://www.frueh-erkennen.at/',
  officialUrlLabel: 'www.frueh-erkennen.at',
  targetGroupUrl: 'https://www.frueh-erkennen.at/fuer-wen-ist-das-programm/',
  serviceline: {
    display: '0800 500 181',
    href: 'tel:' + '0800' + '500181',
    hours: 'Mo–Fr 8:00–17:00 Uhr',
    email: 'serviceline@frueh-erkennen.at',
  },
};

const S = SCREENING;
export const AGE_RANGE = `${S.ageFrom} und ${S.ageTo} Jahren`; // „zwischen 45 und 74 Jahren“
export const INTERVAL_TEXT = `alle ${S.intervalWord} Jahre`;

// Kurzformel für Hinweis-Badges
export const SCREENING_BADGE = `Ohne Zuweisung · mit e-card · alle ${S.intervalYears} Jahre`;

// Vorgegebene Sätze (Wortlaut von der Praxis, 26.09.2026) – Zahlen aus SCREENING
export const SCREENING_LEAD =
  `Brustkrebsvorsorge einfach und unkompliziert: Frauen zwischen ${AGE_RANGE} können ${INTERVAL_TEXT} ohne ärztliche Zuweisung mit ihrer automatisch freigeschalteten e-card zur Screening-Mammographie kommen.`;

export const SCREENING_SECTION_TEXT =
  `Frauen zwischen ${AGE_RANGE} können im österreichischen Brustkrebs-Früherkennungsprogramm ${INTERVAL_TEXT} zur Screening-Mammographie kommen. Ihre e-card ist dafür automatisch freigeschaltet. Eine ärztliche Zuweisung und das Erinnerungsschreiben sind für die Untersuchung nicht erforderlich. Vereinbaren Sie lediglich einen Termin und bringen Sie Ihre e-card mit.`;

export const SCREENING_HOME_LINE =
  `Brustkrebsvorsorge in Graz: Alle ${S.intervalWord} Jahre ohne Zuweisung – für Frauen von ${S.ageFrom} bis ${S.ageTo} mit automatisch freigeschalteter e-card.`;

export const SCREENING_HOME_CARD =
  `Früherkennung gibt Sicherheit: Frauen zwischen ${AGE_RANGE} können ${INTERVAL_TEXT} ohne ärztliche Zuweisung mit ihrer automatisch freigeschalteten e-card zur Screening-Mammographie kommen.`;

export const SCREENING_CTA_TEXT =
  `Sie möchten einen Termin zur Brustkrebsvorsorge vereinbaren? Frauen zwischen ${AGE_RANGE} benötigen für die Screening-Mammographie grundsätzlich keine ärztliche Zuweisung. Vereinbaren Sie Ihren Termin und bringen Sie Ihre freigeschaltete e-card mit.`;

export const SCREENING_META_DESCRIPTION =
  `Mammographie in Graz: Frauen von ${S.ageFrom} bis ${S.ageTo} Jahren können ${INTERVAL_TEXT} ohne Zuweisung mit ihrer freigeschalteten e-card zum Screening kommen.`;

export const SCREENING_ONLY_WITHOUT_SYMPTOMS = 'Das Brustkrebs-Screening ist für Frauen ohne Beschwerden vorgesehen.';
