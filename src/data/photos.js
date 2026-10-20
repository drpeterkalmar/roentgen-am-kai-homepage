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

// Fotos der Körperanalyse-Seite (Fotoshooting 07.07.2025, Originale aus Drive „Röntgen am Kai/Marketing/Fotos Praxis“:
// scanMonitor = 2025-07-07_19-06-56_Nik_DXO.jpg, scanDetail = 2025-07-07_19-06-07_DXO.jpg; zugeschnitten, Vorlage 2400 px).
// Eigene Liste, weil PHOTOS = GOAL_IMAGES der Gesundheitsziele ist (Momentaufnahme im Unit-Test).
export const BODY_PHOTOS = {
  scanMonitor: {
    name: 'koerperanalyse-scan-monitor',
    width: 1920,
    height: 1440,
    alt: 'Bildschirm mit der Auswertung einer DEXA-Ganzkörpermessung bei Röntgen am Kai: Knochenbild, Weichteilbild und Tabelle der Körperregionen',
  },
  scanDetail: {
    name: 'koerperanalyse-scan-detail',
    width: 1920,
    height: 1920,
    alt: 'DEXA-Ganzkörperscan am Bildschirm, schräg fotografiert: Skelett- und Weichteilbild mit eingezeichneten Körperregionen',
  },
};
