// Zentrale Routen-Metadaten — EINE Quelle für:
//   * RouteMeta.jsx (Titel/Description/Canonical zur Laufzeit)
//   * scripts/prerender.mjs (statische index.html je Route, sitemap.xml, robots.txt)
// Neue Seite = Route in App.jsx + Eintrag hier.

// Kanonische Domain (Hauptdomain ab Jan 2027: Umlaut-Domain, hier in Punycode).
import { SCREENING_META_DESCRIPTION } from './screening.js';

export const SITE_URL = 'https://www.xn--rntgen-am-kai-imb.at';

export const DEFAULT_TITLE = 'Radiologie Graz – Röntgen am Kai | Mammographie, DEXA, Röntgen';
export const DEFAULT_DESCRIPTION =
  'Radiologie in Graz: Mammographie, DEXA-Knochendichte, DEXA-Körperanalyse, digitales Röntgen und Ultraschall. Alle Kassen und privat – Termin online buchen.';

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
    path: '/mammographie-graz',
    // Vollständiger SEO-Titel (ohne automatischen Zusatz)
    fullTitle: 'Mammographie Graz ohne Zuweisung | Röntgen am Kai',
    title: 'Mammographie & Brustgesundheit',
    h1: 'Mammographie in Graz – für Ihre Brustgesundheit',
    crumb: 'Mammographie & Brustgesundheit', // → BreadcrumbList
    medicalProcedure: { name: 'Mammographie', alternateName: ['Mammografie', 'Screening-Mammographie'] },
    description: SCREENING_META_DESCRIPTION,
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
    title: 'DEXA-Körperanalyse in Graz',
    description: 'DEXA-Körperanalyse in Graz: Körperfett, Muskelmasse und Fettverteilung in etwa 15 Minuten. Privatleistung, online buchbar.',
    priority: '0.9',
  },
  {
    path: '/weitere-untersuchungen',
    title: 'Weitere Untersuchungen: Röntgen, Ultraschall, Durchleuchtung',
    description: 'Digitales Röntgen, Ultraschall, Durchleuchtung, Phlebographie sowie DVT und Zahnröntgen bei Röntgen am Kai, Körösistraße 9, Graz.',
    priority: '0.7',
  },
  {
    path: '/gesundheitsziele',
    title: 'Gesundheitsziele: Gewicht, Fitness, Wechseljahre, Osteoporose',
    description: 'Die passende Untersuchung für Ihr Anliegen: Gewichtsabnahme, Fitness, Wechseljahre, Osteoporosevorsorge und rasche Beschwerdeabklärung – Röntgen am Kai, Graz.',
    priority: '0.6',
  },
  {
    path: '/ratgeber',
    title: 'Ratgeber',
    description: 'Informationen von Röntgen am Kai rund um Vorsorge, Untersuchungen und Befunde.',
    priority: '0.6',
  },
  {
    path: '/kontakt',
    title: 'Praxis und Kontakt',
    description: 'Röntgen am Kai, Körösistraße 9, 8010 Graz: Kontakt, Öffnungszeiten, Anfahrt mit Öffis und Tiefgarage, Termin online oder unter 0316 840 90 50.',
    priority: '0.8',
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
  route.fullTitle || (route.path === '/' ? route.title : `${route.title} | Röntgen am Kai Graz`);

export const findRoute = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return routes.find((r) => r.path === clean);
};
