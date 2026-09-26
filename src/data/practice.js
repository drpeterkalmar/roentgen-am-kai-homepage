// Zentrale Praxisdaten — EINE Quelle für Header, Footer, Kontaktseite, CTAs und Schema.
// Alles, was die Praxis noch liefern muss, ist als PLATZHALTER markiert (Wert = null + Hinweis)
// und wird auf der Seite sichtbar als „Platzhalter“ angezeigt (siehe components/ui/Placeholder.jsx).

export const PRACTICE_NAME = 'Röntgen am Kai';
export const PRACTICE_TAGLINE = 'Fachärzte für Radiologie in Graz';

// Telefonnummer: aus Teilen zusammengesetzt, damit sie nie aus (maskierter) Tool-Ausgabe kopiert wird.
export const PHONE_DISPLAY = '0316 840 90 50';
export const PHONE_E164 = '+43' + '316' + '8409050';
export const PHONE_HREF = `tel:${PHONE_E164}`;

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

// Anreise (von der Praxis bestätigt, 26.09.2026)
export const TRANSPORT = {
  public: 'Straßenbahn 3 und 5, Bus 58 und 63 (Haltestelle Keplerbrücke)',
  parking: 'Kostenlose Tiefgarage im Haus (Einfahrt über die Körösistraße)',
};

// PLATZHALTER — von der Praxis zu liefern
export const PLACEHOLDERS = {
  accessibility: 'Barrierefreiheit vor Ort (Lift, Rollstuhlzugang, Behindertenparkplatz)',
  phoneHours: 'Telefonische Erreichbarkeit, falls abweichend von den Öffnungszeiten',
  holidays: 'Hinweis auf Urlaubs- und Schließzeiten',
  logoSvg: 'Logo als Vektordatei (SVG)',
};
