// Zentrale Routen-Metadaten — EINE Quelle für:
//   * RouteMeta.jsx (Titel/Description/Canonical zur Laufzeit)
//   * scripts/prerender.mjs (statische index.html je Route, sitemap.xml, robots.txt)
// Neue Seite = Route in App.jsx + Eintrag hier.

// Kanonische Domain (Hauptdomain ab Jan 2027: Umlaut-Domain, hier in Punycode).
export const SITE_URL = 'https://www.xn--rntgen-am-kai-imb.at';

export const DEFAULT_TITLE = 'Röntgen am Kai | Radiologie in Graz – Alle Kassen & Privat';
export const DEFAULT_DESCRIPTION =
  'Radiologie in Graz: digitales Röntgen, Sonographie, Mammographie, DEXA-Knochendichte- und Körperfettmessung, DVT und Phlebographie. Alle Kassen und privat.';

export const routes = [
  {
    path: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/unser-angebot/roentgen',
    title: 'Digitales Röntgen in Graz',
    description: 'Digitales Röntgen von Skelett und Lunge mit geringer Strahlenbelastung – Röntgen am Kai, Körösistraße 9, Graz. Alle Kassen.',
    priority: '0.8',
  },
  {
    path: '/unser-angebot/ultraschall',
    title: 'Sonographie (Ultraschall) in Graz',
    description: 'Sonographie von Organen, Gelenken, Nerven und Gefäßen in Graz – Röntgen am Kai. Termin unter 0316 840 90 50.',
    priority: '0.8',
  },
  {
    path: '/unser-angebot/mammographie',
    title: 'Mammographie & Brust-Sonographie in Graz',
    description: 'Mammographie und Brust-Sonographie in Graz. Zertifizierter Standort des österreichischen Brustkrebs-Früherkennungsprogramms mit Doppelbefundung.',
    priority: '0.9',
  },
  {
    path: '/unser-angebot/knochendichte',
    title: 'DEXA-Knochendichtemessung in Graz',
    description: 'DEXA-Knochendichtemessung zur Osteoporose-Früherkennung in Graz, inklusive FRAX-Score. Keine Vorbereitung nötig, kurze Wartezeiten.',
    priority: '0.9',
  },
  {
    path: '/unser-angebot/dvt',
    title: 'DVT / Zahnröntgen in Graz',
    description: 'Digitale Volumentomographie (DVT) und Zahnröntgen in Graz – 3D-Diagnostik von Kiefer und Zähnen, z. B. für die Implantatplanung.',
    priority: '0.8',
  },
  {
    path: '/unser-angebot/phlebographie',
    title: 'Phlebographie (Venenröntgen) in Graz',
    description: 'Phlebographie in Graz: Röntgenuntersuchung der Venen mit Kontrastmittel, etwa zur Operationsplanung. Röntgen am Kai.',
    priority: '0.7',
  },
  {
    path: '/unser-angebot/koerperfettmessung',
    title: 'Körperfettmessung (DEXA Core Scan) in Graz',
    description: 'Exakte DEXA-Körperfettmessung (Core Scan) in Graz: Körperzusammensetzung, Viszeralfett, Muskelmasse und Grundumsatz. Für Sport, Ernährung und Gesundheit.',
    priority: '0.9',
  },
  {
    path: '/unser-team/dr-peter-kalmar',
    title: 'Priv. Doz. Dr. Peter Kalmar – Facharzt für Radiologie',
    description: 'Priv. Doz. Dr. Peter Kalmar, Facharzt für Radiologie bei Röntgen am Kai in Graz: Werdegang, Schwerpunkte und Publikationen.',
    priority: '0.7',
  },
  {
    path: '/unser-team/dr-georg-riegler',
    title: 'Priv. Doz. Dr. Georg Riegler – Facharzt für Radiologie',
    description: 'Priv. Doz. Dr. Georg Riegler, Facharzt für Radiologie bei Röntgen am Kai in Graz: Werdegang, Schwerpunkte und Publikationen.',
    priority: '0.7',
  },
  {
    path: '/impressum',
    title: 'Impressum',
    description: 'Impressum von Röntgen am Kai, Fachärzte für Radiologie, Körösistraße 9, 8010 Graz.',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/datenschutz',
    title: 'Datenschutz',
    description: 'Datenschutzerklärung von Röntgen am Kai, Fachärzte für Radiologie in Graz.',
    priority: '0.3',
    changefreq: 'yearly',
  },
];

export const fullTitle = (route) =>
  route.path === '/' ? route.title : `${route.title} | Röntgen am Kai Graz`;

export const findRoute = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return routes.find((r) => r.path === clean);
};
