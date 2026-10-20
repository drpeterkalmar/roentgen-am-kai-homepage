// Echte Praxisfotos – EINE Quelle für Gesundheitsziele (healthGoals.js) und Ratgeber (ratgeber.js).
// name = public/assets/images/<name>.avif (zugeschnitten; dazu -tablet und -mobile), width/height = Original.
export const PHOTOS = {
  waiting: {
    name: 'wartebereich-mammographie-knochendichte',
    width: 1308,
    height: 981,
    alt: 'Heller Wartebereich von Röntgen am Kai mit Wegweiser zu Mammographie und Knochendichtemessung',
  },
  scan: {
    name: 'dexa-koerperanalyse-ganzkoerperscan',
    width: 1416,
    height: 1062,
    alt: 'Bildschirm mit einer DEXA-Ganzkörperaufnahme: Knochenbild und Weichteilbild mit Körperregionen',
  },
  device: {
    name: 'dexa-messplatz-knochendichte',
    width: 1600,
    height: 1200,
    alt: 'DEXA-Messplatz im Untersuchungsraum von Röntgen am Kai in Graz',
  },
};

// Fotos der Körperanalyse-Seite (von der Praxis geschickt, Telegram 20.10.2026; Vorlage 1280 px, zugeschnitten).
// Eigene Liste, weil PHOTOS = GOAL_IMAGES der Gesundheitsziele ist (Momentaufnahme im Unit-Test).
export const BODY_PHOTOS = {
  scanMonitor: {
    name: 'koerperanalyse-scan-monitor',
    width: 1060,
    height: 795,
    alt: 'Bildschirm mit der Auswertung einer DEXA-Ganzkörpermessung bei Röntgen am Kai: Knochenbild, Weichteilbild und Tabelle der Körperregionen',
  },
  scanDetail: {
    name: 'koerperanalyse-scan-detail',
    width: 833,
    height: 833,
    alt: 'DEXA-Ganzkörperscan am Bildschirm, schräg fotografiert: Skelett- und Weichteilbild mit eingezeichneten Körperregionen',
  },
};
