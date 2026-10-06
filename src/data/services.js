import { SCREENING, AGE_RANGE, INTERVAL_TEXT } from './screening.js';
import { DEXA, DEXA_OTHER_CARRIERS } from './dexa.js';
import { BODY } from './bodyComposition.js';

// Leistungen — zentrale Stammdaten für Karten, Übersichten, Buchungs- und Kassenhinweise.
// Nur Angaben, die auf der bisherigen Website stehen oder von der Praxis bestätigt wurden.
// Offene Punkte sind als PLATZHALTER (null) markiert.
//
// onlineBooking: über MiraNext online buchbar (Praxis-Entscheidung 26.09.2026:
//   Mammographie, DEXA-Knochendichte, DEXA-Körperanalyse, Röntgen)
// Nervenultraschall: Buchung und Abrechnung über PUCmed (externe Weiterleitung) – kein Preis hier.
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
    href: '/knochendichtemessung-graz',
    description: 'Knochendichtemessung mit der DEXA-Methode zur Früherkennung und Verlaufskontrolle der Osteoporose.',
    priority: 2,
    onlineBooking: true,
    selfPay: true,
    priceIds: ['knochendichte'],
    // Kassenregeln zentral in src/data/dexa.js
    referral: {
      summary: 'ÖGK: Privatleistung. Andere Kassen: Kassenleistung mit ärztlicher Zuweisung.',
      items: [
        `ÖGK: Privatleistung um ${DEXA.priceEUR} Euro; eine Kostenerstattung ist je nach Voraussetzungen möglich, aber nicht garantiert.`,
        `${DEXA_OTHER_CARRIERS}: Kassenleistung bei Vorliegen der erforderlichen ärztlichen Zuweisung.`,
      ],
    },
  },
  koerperanalyse: {
    title: 'Körperanalyse mit DEXA',
    short: 'Körperanalyse',
    href: '/koerperanalyse-graz',
    description:
      'Körperfett und Muskelmasse präzise messen – mit regionaler Auswertung und für Verlaufskontrollen. Termin etwa 20 Minuten.',
    priority: 3,
    durationMinutes: BODY.durationMinutes, // Termindauer: eine Quelle (bodyComposition.js, Praxisangabe 27.09.2026)
    onlineBooking: true,
    selfPay: true,
    priceIds: ['koerperanalyse', 'koerperanalyse-paket'],
    referral: {
      summary: 'Reine Privatleistung, wird von der Krankenkasse nicht bezahlt.',
      items: ['Termin etwa 20 Minuten, kein ärztliches Ergebnisgespräch.'],
    },
  },
  // Weitere Untersuchungen – Terminlogik und Inhalte zentral in src/data/examinations.js
  roentgen: {
    title: 'Röntgen',
    short: 'Röntgen',
    href: '/roentgen-graz',
    description: 'Röntgen von Knochen, Gelenken, Wirbelsäule und Lunge – ohne vorherige Terminvereinbarung, mit Zuweisung und e-card.',
    onlineBooking: true,
    referral: { summary: 'Mit gültiger ärztlicher Zuweisung und e-card, Kassenleistung.' },
  },
  ultraschall: {
    title: 'Ultraschall',
    short: 'Ultraschall',
    href: '/ultraschall-graz',
    description: 'Sonographie von Organen, Schilddrüse, Gelenken, Brust und Gefäßen.',
    onlineBooking: false,
    referral: { summary: 'Mit Zuweisung, Kassenleistung mit e-card.' },
  },
  spezialroentgen: {
    title: 'Spezialröntgen mit Kontrastmittel',
    short: 'Spezialröntgen',
    href: '/spezialroentgen',
    description: 'Schluckröntgen, Venenröntgen, Eileiterdurchgängigkeit und Nierenröntgen mit Kontrastmittel.',
    onlineBooking: false,
    referral: { summary: 'Mit Zuweisung.' },
  },
  phlebographie: {
    title: 'Venenröntgen (Phlebographie)',
    short: 'Venenröntgen',
    href: '/unser-angebot/phlebographie',
    description: 'Röntgenuntersuchung der Venen mit Kontrastmittel.',
    onlineBooking: false,
    referral: { summary: 'Mit Zuweisung.' },
  },
  dvt: {
    title: 'Zahnröntgen und 3D-DVT',
    short: 'Zahnröntgen und DVT',
    href: '/zahnroentgen-dvt-graz',
    description: 'Panoramaröntgen, Einzelzahn- und Fernröntgen sowie 3D-DVT von Kiefer, Nasennebenhöhlen, Gesichtsschädel und Kiefergelenken.',
    onlineBooking: false,
    selfPay: true,
    priceIds: ['dvt', 'zahnroentgen'],
    referral: { summary: 'Mit Zuweisung.' },
  },
};

// Selbstzahler-Preise — die Beträge pflegt die Praxis ein. price: null = PLATZHALTER.
export const selfPayPrices = [
  { id: 'knochendichte', label: 'DEXA-Knochendichtemessung', price: DEXA.priceEUR, note: 'Privatleistung für ÖGK-Versicherte; Kostenerstattung je nach Voraussetzungen möglich, nicht garantiert.' },
  { id: 'koerperanalyse', label: 'Körperanalyse mit DEXA', price: BODY.prices.start, note: 'Termin etwa 20 Minuten.' },
  { id: 'koerperanalyse-paket', label: 'Körperanalyse Start- und Re-Check-Paket', price: BODY.prices.package, note: 'Zwei Messungen innerhalb von 2 Jahren.' },
  { id: 'dvt', label: 'DVT (digitale Volumentomographie)', price: null },
  { id: 'zahnroentgen', label: 'Zahnröntgen', price: null },
];

export const serviceKeyByPath = (pathname) => {
  const clean = pathname.replace(/\/+$/, '');
  return Object.keys(services).find((k) => services[k].href === clean) || null;
};
