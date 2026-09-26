import { SCREENING, AGE_RANGE, INTERVAL_TEXT } from './screening.js';

// Leistungen — zentrale Stammdaten für Karten, Übersichten, Buchungs- und Kassenhinweise.
// Nur Angaben, die auf der bisherigen Website stehen oder von der Praxis bestätigt wurden.
// Offene Punkte sind als PLATZHALTER (null) markiert.
//
// onlineBooking: über MiraNext online buchbar (Praxis-Entscheidung 26.09.2026:
//   Mammographie, DEXA-Knochendichte, DEXA-Körperanalyse, Röntgen)
// selfPay: Selbstzahler-Preis wird online angezeigt (Praxis-Entscheidung 26.09.2026)

export const services = {
  mammographie: {
    title: 'Mammographie & Brustgesundheit',
    short: 'Mammographie',
    href: '/mammographie-graz',
    description:
      'Screening-Mammographie im Brustkrebs-Früherkennungsprogramm, diagnostische Mammographie und Brustultraschall.',
    priority: 1,
    onlineBooking: true,
    referral: {
      summary: 'Im Brustkrebs-Früherkennungsprogramm ohne Zuweisung, sonst in der Regel mit Zuweisung.',
      items: [
        `Früherkennungsprogramm (Frauen zwischen ${AGE_RANGE}, ${INTERVAL_TEXT}): e-card genügt, keine Zuweisung nötig.`,
        'Abklärung von Beschwerden oder Befunden: mit Überweisung.',
      ],
    },
    billing: 'Kassenleistung mit e-card.',
    programUrl: SCREENING.officialUrl,
  },
  knochendichte: {
    title: 'DEXA-Knochendichtemessung',
    short: 'Knochendichte',
    href: '/unser-angebot/knochendichte',
    description: 'Knochendichtemessung mit der DEXA-Methode zur Früherkennung und Verlaufskontrolle der Osteoporose.',
    priority: 2,
    onlineBooking: true,
    selfPay: true,
    priceIds: ['knochendichte'],
    referral: {
      summary: 'Mit Überweisung; Verrechnung abhängig von Ihrer Krankenkasse.',
      items: [
        'BVAEB, SVS und KFA Graz: Direktverrechnung mit Überweisung.',
        'ÖGK: keine Direktverrechnung. Sie bezahlen selbst und erhalten mit Überweisung einen Anteil von der Kasse zurück.',
      ],
    },
  },
  koerperanalyse: {
    title: 'DEXA-Körperanalyse',
    short: 'DEXA-Körperanalyse',
    href: '/unser-angebot/koerperfettmessung',
    description:
      'Messung von Körperfett, Muskelmasse und Fettverteilung mit der DEXA-Methode. Dauer etwa 15 Minuten.',
    priority: 3,
    durationMinutes: 15,
    onlineBooking: true,
    selfPay: true,
    priceIds: ['koerperanalyse'],
    referral: {
      summary: 'Reine Privatleistung, wird von der Krankenkasse nicht bezahlt.',
      items: ['Dauer etwa 15 Minuten, kein ärztliches Ergebnisgespräch.'],
    },
  },
  roentgen: {
    title: 'Digitales Röntgen',
    short: 'Röntgen',
    href: '/unser-angebot/roentgen',
    description: 'Digitale Röntgenaufnahmen von Skelett und Lunge.',
    onlineBooking: true,
    referral: { summary: 'Mit Überweisung, Kassenleistung mit e-Card.' },
  },
  ultraschall: {
    title: 'Ultraschall (Sonographie)',
    short: 'Ultraschall',
    href: '/unser-angebot/ultraschall',
    description: 'Sonographie von Organen, Gelenken, Nerven und Gefäßen.',
    onlineBooking: false,
    selfPay: true, // nur Nervenultraschall
    priceIds: ['nervenultraschall'],
    referral: { summary: 'Mit Überweisung, Kassenleistung mit e-Card.' },
  },
  durchleuchtung: {
    title: 'Durchleuchtung',
    short: 'Durchleuchtung',
    href: null, // PLATZHALTER: eigene Seite folgt (Videoschluckakt, Ösophagus, Magen, Phlebographie)
    description: 'Videoschluckakt, Speiseröhre (Ösophagus), Magen und Phlebographie.',
    onlineBooking: false,
    referral: { summary: 'Mit Überweisung.' },
  },
  phlebographie: {
    title: 'Phlebographie',
    short: 'Phlebographie',
    href: '/unser-angebot/phlebographie',
    description: 'Röntgenuntersuchung der Venen mit Kontrastmittel.',
    onlineBooking: false,
    referral: { summary: 'Mit Überweisung.' },
  },
  dvt: {
    title: 'DVT / Zahnröntgen',
    short: 'DVT / Zahnröntgen',
    href: '/unser-angebot/dvt',
    description: 'Digitale Volumentomographie und Zahnröntgen, etwa für die Implantatplanung.',
    onlineBooking: false,
    selfPay: true,
    priceIds: ['dvt', 'zahnroentgen'],
    referral: { summary: 'Mit Überweisung.' },
  },
};

// Selbstzahler-Preise — die Beträge pflegt die Praxis ein. price: null = PLATZHALTER.
export const selfPayPrices = [
  { id: 'knochendichte', label: 'DEXA-Knochendichtemessung', price: null, note: 'Für ÖGK-Versicherte; Teilerstattung mit Überweisung möglich.' },
  { id: 'koerperanalyse', label: 'DEXA-Körperanalyse', price: null, note: 'Dauer etwa 15 Minuten.' },
  { id: 'dvt', label: 'DVT (digitale Volumentomographie)', price: null },
  { id: 'zahnroentgen', label: 'Zahnröntgen', price: null },
  { id: 'nervenultraschall', label: 'Nervenultraschall', price: null },
];

export const serviceKeyByPath = (pathname) => {
  const clean = pathname.replace(/\/+$/, '');
  return Object.keys(services).find((k) => services[k].href === clean) || null;
};
