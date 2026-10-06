// Zentrale Routentabelle — EINE Quelle für:
//   * die App (src/routes.jsx: Seite je Route, Weiterleitungen) und das Vorrendern (src/entry-server.jsx: prerender)
//   * RouteMeta.jsx (Titel/Description/Canonical zur Laufzeit), SchemaMarkup.jsx (FAQ, Brotkrumen, Leistung)
//   * scripts/postbuild.mjs (statische index.html je Route, Weiterleitungsseiten, sitemap.xml, robots.txt)
// Neue Seite = Seitendatei in src/pages + Eintrag hier (page = Dateiname ohne .jsx, relativ zu src/pages).
// Felder: page (Seitenkomponente), faq (Schlüssel in faqData.js, nur bei sichtbarer FAQ – dieselbe Liste
// speist das FAQPage-Schema), prerender (vollständig vorgerendert, ohne JavaScript nutzbar).
// Wird auch von Node importiert (postbuild, Tests) → nur .js-Importe, kein JSX, kein import.meta.

// Kanonische Domain (Hauptdomain ab Jan 2027: Umlaut-Domain, hier in Punycode).
import { SCREENING_META_DESCRIPTION } from './screening.js';
import { DEXA_META_DESCRIPTION } from './dexa.js';
import { BODY_SEO_TITLE, BODY_META_DESCRIPTION, BODY_H1 } from './bodyComposition.js';
import { GOAL_ROUTES } from './healthGoals.js';
import { ARTICLE_ROUTES } from './ratgeber.js';

const EXAMS_PARENT = { name: 'Weitere Untersuchungen', path: '/weitere-untersuchungen' };

export const SITE_URL = 'https://www.xn--rntgen-am-kai-imb.at';

export const DEFAULT_TITLE = 'Radiologie Graz – Röntgen am Kai | Mammographie, DEXA, Röntgen';
export const DEFAULT_DESCRIPTION =
  'Radiologie in Graz: Mammographie, DEXA-Knochendichte, DEXA-Körperanalyse, Röntgen und Ultraschall. Alle Kassen und privat – Termin online buchen.';

export const routes = [
  {
    path: '/',
    page: 'Home',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/mammographie-graz',
    page: 'MammographiePage',
    faq: 'mammographie',
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
    path: '/knochendichtemessung-graz',
    page: 'KnochendichtePage',
    faq: 'knochendichte',
    fullTitle: 'Knochendichtemessung Graz mit DEXA | Röntgen am Kai',
    title: 'Knochendichtemessung mit DEXA',
    h1: 'Knochendichtemessung in Graz mit DEXA',
    crumb: 'Knochendichte',
    medicalProcedure: { name: 'DEXA-Knochendichtemessung', alternateName: ['DXA', 'Knochendichtemessung', 'Osteodensitometrie'] },
    description: DEXA_META_DESCRIPTION,
    priority: '0.9',
  },
  {
    path: '/koerperanalyse-graz',
    page: 'KoerperanalysePage',
    faq: 'koerperanalyse',
    fullTitle: BODY_SEO_TITLE,
    title: 'Körperanalyse',
    h1: BODY_H1,
    crumb: 'Körperanalyse',
    medicalProcedure: {
      name: 'DEXA-Körperanalyse',
      alternateName: ['Körperanalyse', 'Körperfettmessung', 'Ganzkörperanalyse', 'DXA-Körperzusammensetzung'],
      procedureType: 'https://schema.org/NoninvasiveProcedure',
    },
    service: {
      name: 'Körperanalyse mit DEXA',
      serviceType: 'Messung der Körperzusammensetzung (DEXA)',
      description: BODY_META_DESCRIPTION,
    },
    description: BODY_META_DESCRIPTION,
    priority: '0.9',
  },
  // Weitere Untersuchungen: Übersicht + vier Hauptbereiche (Daten: src/data/examinations.js)
  {
    path: '/weitere-untersuchungen',
    page: 'WeitereUntersuchungenPage',
    fullTitle: 'Weitere Untersuchungen: Röntgen, Ultraschall, DVT | Röntgen am Kai',
    title: 'Weitere Untersuchungen',
    h1: 'Weitere radiologische Untersuchungen in Graz',
    crumb: 'Weitere Untersuchungen',
    prerender: true,
    description: 'Röntgen ohne vorherige Terminvereinbarung, Ultraschall, Spezialröntgen mit Kontrastmittel sowie Zahnröntgen und 3D-DVT bei Röntgen am Kai in Graz.',
    priority: '0.8',
  },
  {
    path: '/roentgen-graz',
    page: 'RoentgenGrazPage',
    faq: 'roentgen',
    fullTitle: 'Röntgen Graz ohne Termin – mit Zuweisung | Röntgen am Kai',
    title: 'Röntgen in Graz',
    h1: 'Röntgen in Graz – direkt vorbeikommen oder Wunschzeit reservieren',
    crumb: 'Röntgen',
    parent: EXAMS_PARENT,
    prerender: true,
    medicalProcedure: { name: 'Röntgen', alternateName: ['Röntgenuntersuchung', 'Skelettröntgen', 'Lungenröntgen'] },
    description: 'Röntgen in Graz ohne vorherige Terminvereinbarung: mit gültiger ärztlicher Zuweisung und e-card direkt vorbeikommen oder Wunschzeit reservieren.',
    priority: '0.9',
  },
  {
    path: '/ultraschall-graz',
    page: 'UltraschallGrazPage',
    faq: 'ultraschall',
    fullTitle: 'Ultraschall Graz – Sonographie | Röntgen am Kai',
    title: 'Ultraschall in Graz',
    h1: 'Ultraschall in Graz',
    crumb: 'Ultraschall',
    parent: EXAMS_PARENT,
    prerender: true,
    medicalProcedure: { name: 'Ultraschall', alternateName: ['Sonographie', 'Ultraschalluntersuchung'], procedureType: 'https://schema.org/NoninvasiveProcedure' },
    description: 'Ultraschall in Graz: Bauchorgane, Nieren, Schilddrüse, Hals, Gelenke, Brust und Gefäße. Termin erforderlich – Röntgen am Kai, Körösistraße 9.',
    priority: '0.8',
  },
  {
    path: '/spezialroentgen',
    page: 'SpezialroentgenPage',
    fullTitle: 'Spezialröntgen mit Kontrastmittel in Graz | Röntgen am Kai',
    title: 'Spezialröntgen und Kontrastmitteluntersuchungen',
    h1: 'Spezialröntgen und Kontrastmitteluntersuchungen in Graz',
    crumb: 'Spezialröntgen',
    parent: EXAMS_PARENT,
    prerender: true,
    description: 'Schluckröntgen, Venenröntgen (Phlebographie), Eileiterdurchgängigkeit (HSG) und Nierenröntgen mit Kontrastmittel in Graz. Termin erforderlich.',
    priority: '0.7',
  },
  {
    path: '/unser-angebot/phlebographie',
    page: 'PhlebographiePage',
    faq: 'phlebographie',
    title: 'Venenröntgen (Phlebographie) in Graz',
    h1: 'Venenröntgen (Phlebographie)',
    prerender: true,
    description: 'Phlebographie in Graz: Röntgenuntersuchung der Venen mit Kontrastmittel, etwa zur Operationsplanung. Termin erforderlich – Röntgen am Kai.',
    priority: '0.6',
  },
  {
    path: '/zahnroentgen-dvt-graz',
    page: 'ZahnroentgenDvtPage',
    faq: 'dvt',
    fullTitle: 'Zahnröntgen und 3D-DVT in Graz | Röntgen am Kai',
    title: 'Zahnröntgen und 3D-DVT',
    h1: 'Zahnröntgen und 3D-DVT in Graz',
    crumb: 'Zahnröntgen und 3D-DVT',
    parent: EXAMS_PARENT,
    prerender: true,
    medicalProcedure: { name: 'Digitale Volumentomographie', alternateName: ['DVT', '3D-Röntgen', 'Zahnröntgen', 'Panoramaröntgen'] },
    description: 'Zahnröntgen, Panoramaröntgen (OPG), Fernröntgen und 3D-DVT von Kiefer, Nebenhöhlen, Gesichtsschädel und Kiefergelenken in Graz. Termin erforderlich – Röntgen am Kai.',
    priority: '0.8',
  },
  // Gesundheitsziele: Übersicht + Zielseiten (Daten: src/data/healthGoals.js)
  ...GOAL_ROUTES,
  {
    path: '/ratgeber',
    page: 'RatgeberPage',
    fullTitle: 'Ratgeber: DEXA, Knochen, Mammographie | Röntgen am Kai',
    title: 'Ratgeber',
    h1: 'Ratgeber',
    crumb: 'Ratgeber',
    description: 'Ratgeber von Röntgen am Kai in Graz: verständliche Artikel zu DEXA-Körperanalyse, Knochengesundheit, Mammographie und Röntgen.',
    priority: '0.6',
  },
  // Ratgeber-Artikel (Daten: src/data/ratgeber.js; Platzhalter-Artikel sind noindex und nicht in der Sitemap)
  ...ARTICLE_ROUTES,
  {
    path: '/kontakt',
    page: 'KontaktPage',
    title: 'Praxis und Kontakt',
    description: 'Röntgen am Kai, Körösistraße 9, 8010 Graz: Kontakt, Öffnungszeiten, Anfahrt mit Öffis und Tiefgarage, Termin online oder unter 0316 840 90 50.',
    priority: '0.8',
  },
  {
    path: '/unser-team/dr-peter-kalmar',
    page: 'KalmarPage',
    title: 'Priv. Doz. Dr. Peter Kalmar – Facharzt für Radiologie',
    fullTitle: 'Priv. Doz. Dr. Peter Kalmar – Facharzt für Radiologie | Röntgen am Kai',
    description: 'Priv. Doz. Dr. Peter Kalmar, Facharzt für Radiologie bei Röntgen am Kai in Graz: Werdegang, Schwerpunkte und Publikationen.',
    priority: '0.7',
  },
  {
    path: '/unser-team/dr-georg-riegler',
    page: 'RieglerPage',
    title: 'Priv. Doz. Dr. Georg Riegler – Facharzt für Radiologie',
    fullTitle: 'Priv. Doz. Dr. Georg Riegler – Radiologe in Graz | Röntgen am Kai',
    description: 'Priv. Doz. Dr. Georg Riegler, Facharzt für Radiologie bei Röntgen am Kai in Graz: Werdegang, Schwerpunkte und Publikationen.',
    priority: '0.7',
  },
  {
    path: '/impressum',
    page: 'ImpressumPage',
    title: 'Impressum',
    description: 'Impressum von Röntgen am Kai, Fachärzte für Radiologie, Körösistraße 9, 8010 Graz.',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/datenschutz',
    page: 'DatenschutzPage',
    title: 'Datenschutz',
    description: 'Datenschutzerklärung von Röntgen am Kai, Fachärzte für Radiologie in Graz.',
    priority: '0.3',
    changefreq: 'yearly',
  },
];

// Alte Adressen → neue Seiten (eine Tabelle für App und Build): scripts/postbuild.mjs schreibt je Eintrag eine
// Weiterleitungsseite (GitHub Pages kann kein HTTP-301; Meta-Refresh 0 s + Canonical wertet Google als dauerhafte
// Weiterleitung), src/routes.jsx leitet in der App per <Navigate> weiter – beide mit Anker.
export const LEGACY_REDIRECTS = {
  '/unser-angebot': '/#services',
  // Weitere Untersuchungen neu strukturiert (04.10.2026): Röntgen, Ultraschall, Spezialröntgen, Zahnröntgen/DVT
  '/unser-angebot/digitales-roentgen': '/roentgen-graz',
  '/unser-angebot/digitales-roentgen/lungenroentgen': '/roentgen-graz#lunge-brustkorb',
  '/unser-angebot/digitales-roentgen/wirbelsaeulenroentgen': '/roentgen-graz#wirbelsaeule',
  '/unser-angebot/digitales-roentgen/roentgen-nach-unfall': '/roentgen-graz',
  '/unser-angebot/roentgen': '/roentgen-graz',
  '/unser-angebot/ultraschall': '/ultraschall-graz',
  '/unser-angebot/dvt': '/zahnroentgen-dvt-graz',
  // Mammographie-Seite ist nach /mammographie-graz umgezogen (26.09.2026)
  '/unser-angebot/mammographie': '/mammographie-graz',
  '/unser-angebot/mammographie/mammascreening': '/mammographie-graz',
  // Knochendichte-Seite ist nach /knochendichtemessung-graz umgezogen (26.09.2026)
  '/unser-angebot/knochendichte': '/knochendichtemessung-graz',
  // Körperanalyse-Seite ist nach /koerperanalyse-graz umgezogen (27.09.2026)
  '/unser-angebot/koerperfettmessung': '/koerperanalyse-graz',
  '/datenschutzerklarung': '/datenschutz',
};

export const fullTitle = (route) =>
  route.fullTitle || (route.path === '/' ? route.title : `${route.title} | Röntgen am Kai Graz`);

export const findRoute = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return routes.find((r) => r.path === clean);
};
