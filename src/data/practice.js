// Zentrale Praxisdaten — EINE Quelle für Header, Footer, Kontaktseite, CTAs und Schema.
// Alles, was die Praxis noch liefern muss, ist als PLATZHALTER markiert (Wert = null + Hinweis)
// und wird auf der Seite sichtbar als „Platzhalter“ angezeigt (siehe components/ui/Placeholder.jsx).

export const PRACTICE_NAME = 'Röntgen am Kai';
export const PRACTICE_TAGLINE = 'Fachärzte für Radiologie in Graz';

// Telefonnummer: aus Teilen zusammengesetzt, damit sie nie aus (maskierter) Tool-Ausgabe kopiert wird.
export const PHONE_DISPLAY = '0316 840 90 50';
export const PHONE_E164 = '+43' + '316' + '8409050';
export const PHONE_HREF = `tel:${PHONE_E164}`;
// Internationale Schreibweise (Impressum): „+43 316 …“ – aus PHONE_E164 abgeleitet
const intl = (cc, area, local) => `${cc} ${area} ${local}`;
export const PHONE_DISPLAY_INTL = intl(PHONE_E164.slice(0, 3), PHONE_E164.slice(3, 6), PHONE_E164.slice(6));
// Fax (Impressum) – Nummer ebenfalls aus Teilen, nie aus Tool-Ausgabe übernehmen
export const FAX_DISPLAY = intl(PHONE_E164.slice(0, 3), PHONE_E164.slice(3, 6), '8409052');

export const EMAIL = 'office@roentgen-am-kai.at';

export const ADDRESS = {
  street: 'Körösistraße 9',
  zip: '8010',
  city: 'Graz',
  country: 'Österreich',
};

export const MAPS_ROUTE_URL =
  'https://www.google.com/maps/dir/?api=1&destination=K%C3%B6r%C3%B6sistra%C3%9Fe+9%2C+8010+Graz';

// Online-Terminbuchung über MiraNext (Patientenportal der Praxis).
// Die Seite verbietet das Einbetten (X-Frame-Options: SAMEORIGIN) → Link in neuem Tab.
export const BOOKING_URL = 'https://patient-portal.miranext.ai/patient-booking?c_Id=23';

export const PORTAL_URL = 'https://portal.marc.at';

// Öffnungszeiten (von der Praxis bestätigt, 26.09.2026)
export const OPENING_HOURS = [
  { days: 'Montag – Donnerstag', short: 'Mo – Do', opens: '08:00', closes: '17:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'] },
  { days: 'Freitag', short: 'Fr', opens: '08:00', closes: '13:00', schema: ['Friday'] },
];

// Kurzform für Kopfzeile, Startseite und Terminblöcke: „Mo – Do 08:00–17:00, Fr 08:00–13:00“ (ohne „Uhr“)
export const OPENING_HOURS_SHORT = OPENING_HOURS.map((h) => `${h.short} ${h.opens}–${h.closes}`).join(', ');

// Anreise (von der Praxis bestätigt, 26.09.2026)
export const TRANSPORT = {
  public: 'Straßenbahn 3 und 5, Bus 58 und 63 (Haltestelle Keplerbrücke)',
  parking: 'Kostenlose Tiefgarage im Haus (Einfahrt über die Körösistraße)',
};

// Barrierefreiheit vor Ort – Wortlaut von der Praxis freigegeben (Peter, 12.10.2026).
// Behindertenparkplatz in der Tiefgarage unbestätigt → nicht nennen.
export const ACCESSIBILITY = {
  title: 'Barrierefrei',
  text: 'Der Weg von der Haltestelle Keplerbrücke bis in die Ordination ist barrierefrei, mit Lift. Die Ordination ist rollstuhlgerecht und hat ein barrierefreies Patienten-WC.',
};

// Terminabsage und Ausfallgebühr – Wortlaut laut Entscheidung der Praxis vom 22.10.2026.
// Die Telefonnummer steht zwischen beforePhone und afterPhone (auf der Seite als tel:-Link).
// Zahl und Einheit mit geschütztem Leerzeichen, damit „24 Stunden“ / „50 Euro“ nicht umbrechen.
export const CANCELLATION = {
  title: 'Termin absagen',
  beforePhone: 'Sie können einen Termin nicht wahrnehmen? Bitte sagen Sie spätestens 24\u00A0Stunden vorher ab – telefonisch unter',
  afterPhone:
    'oder mit der Antwort ABSAGE auf unsere Erinnerungs-SMS. So können wir den Termin an andere Patientinnen und Patienten weitergeben. Für Termine, die ohne rechtzeitige Absage nicht wahrgenommen werden, verrechnen wir eine Ausfallgebühr von 50\u00A0Euro.',
};
// Derselbe Hinweis als reiner Text (z. B. für FAQ oder Prüfungen)
export const CANCELLATION_TEXT = `${CANCELLATION.beforePhone} ${PHONE_DISPLAY} ${CANCELLATION.afterPhone}`;

// PLATZHALTER — von der Praxis zu liefern
export const PLACEHOLDERS = {
  phoneHours: 'Telefonische Erreichbarkeit, falls abweichend von den Öffnungszeiten',
  holidays: 'Hinweis auf Urlaubs- und Schließzeiten',
  logoSvg: 'Logo als Vektordatei (SVG)',
};
