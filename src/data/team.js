// Ärzteteam – EINE Quelle für die Teamseiten: sichtbares Porträt und Person-Schema (image) kommen aus
// derselben Konstante, damit sie nicht wieder auseinanderlaufen (Gutachten 05.10.2026, P1-4).
// Fotozuordnung von Peter bestätigt (06.10.2026). Dateien in public/assets/images, je Bild drei Größen
// (<name>.avif 1920 px, -tablet 1200 px, -mobile 800 px). Die früheren Namen waren irreführend:
//   portrait-kalmar         = früher hero-slide-2  (Dr. Kalmar am Befundungsplatz)
//   portrait-riegler        = früher knochendichte (Porträt Dr. Riegler)
//   portrait-riegler-sessel = früher dr-kalmar     (Dr. Riegler im Sessel – NICHT Dr. Kalmar)
//   team-gang               = früher dr-riegler    (beide im Praxisflur: links Riegler, rechts Kalmar)
// Wird auch von Node (Unit-Tests) importiert → nur .js-Importe, kein JSX, kein import.meta.

export const TEAM = {
  kalmar: {
    id: 'kalmar',
    name: 'Priv. Doz. Dr. Peter Kalmar',
    slug: 'dr-peter-kalmar',
    path: '/unser-team/dr-peter-kalmar',
    photo: { name: 'portrait-kalmar', width: 1920, height: 1280, alt: 'Priv.-Doz. Dr. Peter Kalmar am Befundungsplatz' },
    description: 'Facharzt für Radiologie mit Spezialisierung auf Gefäßtherapie und interventionelle Radiologie.',
  },
  riegler: {
    id: 'riegler',
    name: 'Priv. Doz. Dr. Georg Riegler',
    slug: 'dr-georg-riegler',
    path: '/unser-team/dr-georg-riegler',
    photo: { name: 'portrait-riegler', width: 1920, height: 1280, alt: 'Priv.-Doz. Dr. Georg Riegler' },
    description: 'Facharzt für Radiologie mit Spezialisierung auf hochauflösenden Ultraschall und neuromuskuläre Diagnostik.',
  },
};

// Weitere Teamfotos (derzeit auf keiner Seite eingebunden)
export const TEAM_PHOTOS = {
  gang: { name: 'team-gang', width: 1920, height: 2916, alt: 'Dr. Georg Riegler (links) und Dr. Peter Kalmar (rechts) im Praxisflur' },
  rieglerSessel: { name: 'portrait-riegler-sessel', width: 1920, height: 2880, alt: 'Priv.-Doz. Dr. Georg Riegler' },
};
