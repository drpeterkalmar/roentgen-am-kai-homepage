// Körperanalyse mit DEXA (DEXA-Körperanalyse, „DEXA Body Check“) – ZENTRALE Praxisangaben.
// Seite /koerperanalyse-graz, FAQ, Preisliste, Metadaten und Tests lesen NUR hieraus.
// Regel: Nur von der Praxis bestätigte Angaben eintragen. null = offen → wird auf der Seite als
// gelber Platzhalter gezeigt und NICHT ins FAQPage-Schema übernommen.
// Stand: Praxisangaben 26.09.2026 (Telegram-Gruppe „Homepage“), MiraNext geprüft 27.09.2026.
import { BOOKING_URL } from './practice.js';

export const BODY = {
  // ── Bestätigt ─────────────────────────────────────────────────────
  durationMinutes: 20, // Praxis 27.09.2026: TERMINDAUER 20 Minuten; reine Messdauer bewusst nicht nennen
  resultConsultation: false, // Praxis 26.09.2026: KEIN ärztliches Ergebnisgespräch
  selfPay: true, // Privatleistung, Selbstzahlerpreis wird online angezeigt (Praxis 26.09.2026)
  device: 'GE Lunar Prodigy (Software enCORE)', // nur intern, nicht auf der Seite

  // ── Praxisangaben 27.09.2026 (Telegram „Homepage“) ───────────────
  prices: {
    start: 70, // Startmessung / einzelne Messung in Euro
    single: 70, // einzelne Verlaufskontrolle in Euro
    package: 130, // Start- und Re-Check-Paket in Euro
  },
  recheckInterval: 'je nach Trainingsumfang und Ziel', // bewusst KEIN fixes Intervall
  packageConditions: 'Beide Messungen innerhalb von 2 Jahren',
  referralRequired: false, // ohne Zuweisung als Privatleistung buchbar
  preparation: [
    'Am besten kommen Sie nüchtern zur Messung.',
    'Bitte entleeren Sie vor der Messung die Harnblase.',
    'Tragen Sie leichte Kleidung.',
  ],
  reportDelivery: 'Ihren Bericht erhalten Sie über das Patientenportal, zusätzlich ist er in ELGA abrufbar.',
  // RSMI (relativer Skelettmuskelindex) steht im Bericht (Praxis 27.09.2026).
  appendicularIndex: 'RSMI',

  // ── Offen – von der Praxis zu liefern (null = Platzhalter) ────────
  // Viszerales Fett: am GE Lunar Prodigy nur mit lizenzierter Zusatzsoftware CoreScan.
  // true NUR, wenn CoreScan freigeschaltet ist → dann darf der Wert genannt werden. Praxis 27.09.: „weiß ich nicht“.
  // Bestätigt 28.09.2026: Die Ganzkörper-Berichte der Praxis enthalten VAT – DEXAbot liest es aus der Seite
  // „8(DXA) Ganzkörper untergeordnete“ (ROI_VAT) und schreibt „Viszerales Fettgewebe (VAT)“ in den Befund.
  visceralFat: true,

  // ── Buchung ──────────────────────────────────────────────────────
  booking: {
    url: BOOKING_URL,
    // MiraNext geprüft 27.09.2026: „Privattermin“ bietet nur Röntgen, Sonographie, Mammographie –
    // die Körperanalyse ist dort noch NICHT angelegt. Sobald angelegt: true.
    serviceInMiraNext: false,
  },
};

const eur = (n) => `${n} Euro`;
export const BODY_PRICE_TEXT = BODY.prices.start != null ? eur(BODY.prices.start) : null;
export const BODY_PACKAGE_TEXT = BODY.prices.package != null ? eur(BODY.prices.package) : null;

// SEO (Vorgabe Auftrag 27.09.2026)
export const BODY_SEO_TITLE = 'Körperanalyse Graz: Körperfett & Muskelmasse messen';
export const BODY_META_DESCRIPTION =
  'Medizinische Körperanalyse mit DEXA in Graz: Körperfett, Muskelmasse und deren Verteilung präzise erfassen und Veränderungen objektiv vergleichen.';

export const BODY_H1 = 'Medizinische Körperanalyse in Graz – Körperfett und Muskelmasse präzise messen';
export const BODY_LEAD =
  'Die Waage zeigt nur Ihr Gewicht. Eine DEXA-Körperanalyse zeigt, wie sich Ihr Körper aus Fettmasse, fettfreier Masse und Knochenmineral zusammensetzt – einschließlich der Verteilung auf unterschiedliche Körperregionen.';
export const BODY_KEY_MESSAGE = 'Sehen Sie, was sich wirklich verändert: Fett, Muskelmasse oder beides.';

// Strahlenschutz – keine exakte Dosis, solange Gerät/Protokoll nicht bestätigt sind (Vorgabe).
export const BODY_RADIATION_TEXT =
  'DEXA arbeitet mit einer sehr niedrigen Röntgendosis. Eine mögliche Schwangerschaft muss trotzdem vor der Untersuchung angegeben werden.';

// Fachliche Klarstellung Muskelmasse (Vorgabe)
export const BODY_LEAN_MASS_TEXT =
  'Fachlich genau misst DEXA die magere beziehungsweise fettfreie Weichteilmasse. Sie wird als aussagekräftiger Näherungswert für die Muskelmasse verwendet. Muskelkraft und Muskelqualität werden nicht direkt gemessen.';

export const BODY_DURATION_TEXT = BODY.durationMinutes
  ? `Planen Sie für Ihren Termin etwa ${BODY.durationMinutes} Minuten ein.`
  : null;
