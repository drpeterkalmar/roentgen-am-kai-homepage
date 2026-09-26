// DEXA-Knochendichtemessung – ZENTRALE Angaben zu Preis, Abrechnung, Ablauf, Quellen und KI-Hinweis (Rho).
// Alle Texte auf Leistungsseite, FAQ, Startseite, Preisliste und Metadaten werden hieraus gebildet.
// Bei Änderungen (Preis, Kassenregeln, Ablauf) NUR hier anpassen.
// Stand: Praxisangaben 26.09.2026 (Telegram-Gruppe „Homepage“).
// Keine Kostenübernahmen, Zertifizierungen oder Bewertungen ergänzen, die die Praxis nicht bestätigt hat.

export const DEXA = {
  // ── Preis & Abrechnung ─────────────────────────────────────────────
  priceEUR: 70, // ÖGK-Versicherte, Privatleistung (von der Praxis bestätigt)
  oegk: {
    carrier: 'ÖGK',
    billing: 'Privatleistung',
    // Wortlaut von der Praxis vorgegeben (26.09.2026)
    text: 'Für ÖGK-Versicherte wird die DEXA-Knochendichtemessung als Privatleistung angeboten. Der Preis beträgt 70 Euro. Abhängig von den individuellen Voraussetzungen kann eine teilweise oder vollständige Kostenerstattung möglich sein. Eine Rückerstattung kann nicht garantiert werden.',
  },
  // Übrige von Röntgen am Kai betreute Träger (Direktverrechnung) – Kassenleistung nur mit Zuweisung
  otherCarriers: ['BVAEB', 'SVS', 'KFA Graz'],
  otherCarriersText:
    'Bei den übrigen von uns betreuten Krankenversicherungsträgern kann die Untersuchung bei Vorliegen der erforderlichen ärztlichen Zuweisung als Kassenleistung abgerechnet werden.',
  askFirstText:
    'Bitte informieren Sie sich bei Unsicherheit vor der Terminvereinbarung bei unserer Ordination oder Ihrem Versicherungsträger.',

  // ── Ablauf ─────────────────────────────────────────────────────────
  durationMinutes: null, // PLATZHALTER: Untersuchungsdauer von der Praxis NICHT bestätigt → nirgends anzeigen
  noSpecialPreparation: true, // lt. bisheriger Website („Keine spezielle Vorbereitung“, nicht nüchtern) – Praxis bitte bestätigen

  // ── Online-Buchung / Kombitermin ───────────────────────────────────
  // MiraNext geprüft am 26.09.2026: „Weitere Untersuchung hinzufügen“ (Termine am selben Tag werden verknüpft)
  // ist vorhanden, als Untersuchungsart aber nur Röntgen, Sonographie, Mammographie – KEINE DEXA.
  // → Kombitermin derzeit telefonisch. Praxis klärt Online-Kombitermin mit MiraNext (26.09.2026).
  //   Sobald DEXA in MiraNext angelegt ist: combinedOnline = true.
  combinedOnline: false,

  // ── Quellen ────────────────────────────────────────────────────────
  sources: [
    {
      label: 'Österreichisches Gesundheitsportal: Knochendichtemessung',
      url: 'https://www.gesundheit.gv.at/labor/untersuchungen/mrt-ct-roentgen/knochendichtemessung.html',
    },
    {
      label: 'International Society for Clinical Densitometry (ISCD): Official Positions für Erwachsene (aktueller Stand 2023, englisch)',
      url: 'https://iscd.org/official-positions-2023/',
    },
  ],

  // ── KI-gestütztes opportunistisches Screening (Rho, ImageBiopsy Lab) ──
  // Angaben lt. Herstellerseite (geprüft 26.09.2026). Einsatz in der Praxis bestätigt (Praxis, 26.09.2026).
  rho: {
    product: 'Rho',
    vendor: 'ImageBiopsy Lab',
    minAge: 50,
    regions: ['Lendenwirbelsäule', 'Brustwirbelsäule', 'Brustkorb', 'Becken', 'Knie', 'Hand bzw. Handgelenk'],
    productUrl: 'https://www.imagebiopsy.com/de-product/rho',
  },
};

const fmtEUR = (n) => `${n} Euro`;
export const DEXA_PRICE_TEXT = fmtEUR(DEXA.priceEUR); // „70 Euro“
export const DEXA_PRICE_SHORT = `${DEXA.priceEUR} €`; // „70 €“
export const DEXA_PRICE_LINE = `Preis für ÖGK-Versicherte: ${DEXA_PRICE_TEXT}`;
const listDE = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} und ${a[a.length - 1]}`);
export const DEXA_OTHER_CARRIERS = listDE(DEXA.otherCarriers); // „BVAEB, SVS und KFA Graz“

export const DEXA_META_DESCRIPTION =
  `DEXA-Knochendichtemessung in Graz zur Osteoporose-Früherkennung. ÖGK-Privatleistung um ${DEXA_PRICE_TEXT}, andere Kassen nach den jeweiligen Voraussetzungen.`;

export const DEXA_HERO_LEAD =
  'Osteoporose früh erkennen und das persönliche Knochenrisiko besser einschätzen – mit der wissenschaftlich etablierten DEXA-Methode.';

// Kurzfakten im ersten sichtbaren Bereich (Dauer nur, wenn bestätigt)
export const DEXA_HERO_FACTS = [
  'Untersuchung mit DEXA',
  'Schmerzlos',
  'Geringe Strahlenbelastung',
  ...(DEXA.durationMinutes ? [`Dauer etwa ${DEXA.durationMinutes} Minuten`] : []),
];

export const DEXA_RHO_SENTENCE =
  `Geeignete Röntgenaufnahmen werden bei Personen ab ${DEXA.rho.minAge} zusätzlich auf Hinweise für eine möglicherweise niedrige Knochendichte analysiert.`;

// Wortlaut von der Praxis vorgegeben (26.09.2026)
export const DEXA_RADIATION_TEXT =
  'Die DEXA arbeitet mit einer sehr geringen Röntgendosis. Eine typische Messung liegt ungefähr im Bereich weniger Mikrosievert. Als anschaulicher Vergleich entsprechen etwa 0,001 mSv ungefähr drei Stunden natürlicher Hintergrundstrahlung. Der genaue Wert hängt vom Gerät und Untersuchungsprotokoll ab.';

export const DEXA_WHO_SHOULD_TEXT =
  'Nicht jede Person benötigt automatisch ab einem bestimmten Alter eine DEXA. Ab dem 50. Lebensjahr ist jedoch eine persönliche Einschätzung des Osteoporoserisikos sinnvoll. Bei erhöhtem Risiko kann eine Knochendichtemessung zur weiteren Abklärung angezeigt sein.';
