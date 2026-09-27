// Ratgeber – ZENTRALE Metadaten für Übersicht (/ratgeber), Artikelseiten (/ratgeber/<slug>),
// Routen (routes.js → Titel, Description, Canonical, OG, Sitemap, Breadcrumbs), Article-Schema und Tests.
// Wird auch von scripts/postbuild.mjs (Node) importiert → nur .js-Importe, kein JSX, kein import.meta.
//
// Regeln (Auftrag 27.09.2026):
// * Jeder Artikel verlinkt ZUERST auf genau eine passende Gesundheitsziel- oder Leistungsseite (target).
// * CTA im Artikel und am Ende – untersuchungsspezifisch (target.service / target.bookingLabel).
// * Artikeltexte (HTML) stehen in blogPosts.js und werden erst auf der Artikelseite geladen (eigener Chunk,
//   nicht im Haupt-Bundle). Titel und Kurzfassung stehen HIER (Test prüft Gleichheit mit blogPosts.js).
//   Fehlt der endgültige Text → status 'placeholder':
//   Seite zeigt einen deutlich markierten Platzhalter, ist noindex, nicht in der Sitemap, ohne Article-Schema.
// * Autor: Solange keine Ärztin/kein Arzt als Autor bestätigt ist, erscheint die Praxis als Herausgeberin
//   (author: null) plus interner Platzhalter. Keine Namen erfinden.
// * FAQPage-Schema nur, wenn der Artikel ein sichtbares `faq`-Array hat (wird als FAQ-Block angezeigt).
import { SCREENING } from './screening.js';

export const RATGEBER_BASE = '/ratgeber';
export const PUBLISHER_NAME = 'Röntgen am Kai';

export const CATEGORIES = [
  { id: 'dexa-koerperanalyse', name: 'DEXA & Körperanalyse' },
  { id: 'knochengesundheit', name: 'Knochengesundheit' },
  { id: 'mammographie', name: 'Mammographie' },
  { id: 'roentgen', name: 'Röntgen' },
];
export const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

// Zielseiten + untersuchungsspezifische CTAs (Fakten nur aus bestätigten Praxisangaben / zentralen Dateien)
export const TARGETS = {
  abnehmspritze: {
    endTitle: 'Körperanalyse-Termin vereinbaren',
    to: '/gesundheitsziele/abnehmspritze-koerperanalyse',
    label: 'Abnehmspritze und Körperanalyse',
    service: 'koerperanalyse',
    ctaTitle: 'Körperzusammensetzung vor und während der Behandlung messen',
    ctaText: 'Die DEXA-Körperanalyse ist ohne Zuweisung als Privatleistung buchbar – als Ausgangsmessung oder Verlaufskontrolle.',
    bookingLabel: 'Körperanalyse buchen',
  },
  knochendichte: {
    endTitle: 'Termin zur Knochendichtemessung',
    to: '/knochendichtemessung-graz',
    label: 'Knochendichtemessung in Graz',
    service: 'knochendichte',
    ctaTitle: 'Knochendichtemessung mit DEXA',
    ctaText: 'Kosten, Kassenregelung und Ablauf finden Sie auf unserer Seite zur Knochendichtemessung.',
    bookingLabel: 'Knochendichtemessung buchen',
  },
  mammographie: {
    endTitle: 'Mammographie-Termin vereinbaren',
    to: '/mammographie-graz',
    label: 'Mammographie in Graz',
    service: 'mammographie',
    ctaTitle: 'Mammographie bei Röntgen am Kai',
    ctaText: `Frauen von ${SCREENING.ageFrom} bis ${SCREENING.ageTo} Jahren kommen alle ${SCREENING.intervalWord} Jahre ohne Zuweisung mit ihrer freigeschalteten e-card zur Screening-Mammographie.`,
    bookingLabel: 'Mammographie-Termin buchen',
  },
  roentgen: {
    endTitle: 'Röntgen-Termin vereinbaren',
    to: '/unser-angebot/roentgen',
    label: 'Digitales Röntgen in Graz',
    service: 'roentgen',
    ctaTitle: 'Digitales Röntgen',
    ctaText: 'Informationen zu Ablauf und Zuweisung finden Sie auf unserer Seite zum digitalen Röntgen.',
    bookingLabel: 'Röntgen-Termin buchen',
  },
};

// Bilder: nur echte Praxisfotos (Namen = public/assets/images/<name>.avif, Varianten -mobile/-tablet),
// sonst Platzhalter aus imageBriefs.js (imageBrief).
const PHOTOS = {
  device: { name: 'dexa-messplatz-knochendichte', width: 1600, height: 1200, alt: 'DEXA-Messplatz im Untersuchungsraum von Röntgen am Kai in Graz' },
  scan: { name: 'dexa-koerperanalyse-ganzkoerperscan', width: 1416, height: 1062, alt: 'Bildschirm mit einer DEXA-Ganzkörperaufnahme: Knochenbild und Weichteilbild mit Körperregionen' },
  waiting: { name: 'wartebereich-mammographie-knochendichte', width: 1308, height: 981, alt: 'Heller Wartebereich von Röntgen am Kai mit Wegweiser zu Mammographie und Knochendichtemessung' },
};

// Metadaten je Artikel. id = Eintrag in blogPosts.js (Text); ohne id → Platzhalter-Artikel.
// review: medizinisch/rechtlich vor Veröffentlichung zu prüfen (erscheint als interner Platzhalter).
const META = [
  {
    // ERSTER Artikel laut Auftrag – endgültiger Text fehlt noch → vorbereitete Inhaltsseite
    slug: 'abnehmspritze-muskelverlust',
    status: 'placeholder',
    title: 'Abnehmspritze und Muskelverlust: Was passiert während der Gewichtsabnahme?',
    seoTitle: 'Abnehmspritze und Muskelverlust | Röntgen am Kai',
    description: 'Ratgeber in Vorbereitung: Abnehmspritze und Muskelverlust – was sich während der Gewichtsabnahme im Körper verändert.',
    excerpt: 'Dieser Artikel wird derzeit ärztlich erstellt und geprüft.',
    category: 'dexa-koerperanalyse',
    target: 'abnehmspritze',
    datePublished: null,
    contentFile: 'content/ratgeber/abnehmspritze-muskelverlust.md',
    imageBrief: 'ratgeberAbnehmspritze',
    // Suchintention überschneidet sich mit „abnehmspritze-muskelmasse-koerperanalyse“ → nach Freigabe zusammenführen
    // (älteren Artikel per Weiterleitung auf diesen umleiten), damit keine zwei Seiten um dasselbe Keyword konkurrieren.
  },
  {
    id: 1,
    title: "Knochendichtemessung (DEXA): Warum Vorsorge Leben schützt",
    excerpt: "Osteoporose verläuft lange ohne Symptome. Die DEXA-Messung ist die wissenschaftlich etablierte Standard- und Referenzmethode zur Messung der Knochendichte. Wann sie sinnvoll sein kann.",
    slug: 'knochendichtemessung-dexa-vorsorge',
    seoTitle: 'Knochendichtemessung (DEXA): Wann ist sie sinnvoll?',
    description: 'Osteoporose verläuft lange ohne Beschwerden. Wie die DEXA-Knochendichtemessung funktioniert und wann eine Messung sinnvoll sein kann.',
    category: 'knochengesundheit',
    target: 'knochendichte',
    datePublished: '2026-04-17',
    photo: 'device',
    review: 'Bestehender Artikeltext – ärztliche Freigabe (Altersangaben Frauen ab 65 / Männer ab 70).',
  },
  {
    id: 2,
    title: "KI-Unterstützung in unserer Praxis",
    excerpt: "Wie künstliche Intelligenz uns hilft, diagnostische Sicherheit zu erhöhen und kleinste Veränderungen früher zu erkennen.",
    slug: 'ki-unterstuetzung-radiologie',
    seoTitle: 'KI-Unterstützung in der Radiologie | Röntgen am Kai',
    description: 'Wie Software mit künstlicher Intelligenz bei der Befundung unterstützen kann – und warum die ärztliche Beurteilung entscheidend bleibt.',
    category: 'roentgen',
    target: 'roentgen',
    datePublished: '2026-04-12',
    imageBrief: 'ratgeberKi',
    review: 'Bestehender Artikeltext – bestätigen, welche KI-Software tatsächlich eingesetzt wird (Lungenrundherde?); Aussagen „höhere diagnostische Sicherheit“ und „schnellere und präzisere Diagnose“ belegen oder entschärfen.',
  },
  {
    id: 3,
    title: "Mammascreening Österreich: Früherkennung rettet Leben",
    excerpt: "Das österreichische Brustkrebs-Früherkennungsprogramm bietet Frauen zwischen 45 und 74 Jahren kostenlose Vorsorge. Was Sie über den Ablauf wissen müssen.",
    slug: 'mammascreening-oesterreich',
    seoTitle: 'Mammascreening in Österreich: Wer teilnehmen kann',
    description: 'Das österreichische Brustkrebs-Früherkennungsprogramm: wer teilnehmen kann, wie die Screening-Mammographie abläuft und was Sie mitbringen.',
    category: 'mammographie',
    target: 'mammographie',
    datePublished: '2026-04-05',
    photo: 'waiting',
    review: 'Bestehender Artikeltext – „zertifizierter Standort“ bestätigen; „garantiert ein Höchstmaß an Sicherheit“ ist ein Garantieversprechen (entschärfen); „automatisch eingeladen“ mit screening.js abgleichen.',
  },
  {
    id: 4,
    title: "Abnehmspritze und Muskelmasse: Was eine begleitende Körperanalyse zeigen kann",
    excerpt: "Unter einer Abnehmspritze sinkt vor allem die Fettmasse – doch auch Magermasse kann zurückgehen. Eine DEXA-Körperanalyse zu Beginn und im Verlauf macht sichtbar, wie sich Ihr Körper verändert.",
    slug: 'abnehmspritze-muskelmasse-koerperanalyse',
    seoTitle: 'Abnehmspritze und Muskelmasse: Was DEXA zeigen kann',
    description: 'Unter einer Abnehmspritze sinkt vor allem Fettmasse, doch auch Magermasse kann zurückgehen. Was eine DEXA-Körperanalyse im Verlauf sichtbar macht.',
    category: 'dexa-koerperanalyse',
    target: 'abnehmspritze',
    datePublished: '2026-06-20',
    dateModified: '2026-09-27',
    photo: 'scan',
    review: 'Am 27.09.2026 neu formuliert (ohne Studienwerte und Markennamen) – ärztlich freigeben; nach Fertigstellung des Artikels „Abnehmspritze und Muskelverlust“ zusammenführen.',
  },
  {
    id: 5,
    title: "Brustkrebs-Früherkennung in Österreich: Die Mammographie",
    excerpt: "Das österreichische Brustkrebs-Früherkennungsprogramm \"früh-erkennen\" bietet Frauen ab 45 Jahren kostenlose Mammographie-Screenings. Alles über Ablauf, Qualitätssicherung und warum Sie die Untersuchung in unserer Praxis in Graz durchführen lassen sollten.",
    slug: 'brustkrebs-frueherkennung-mammographie',
    seoTitle: 'Brustkrebs-Früherkennung in Österreich: Mammographie',
    description: 'Brustkrebs-Früherkennung in Österreich: Ablauf der Mammographie, Doppelbefundung, Vorbereitung und wichtige Studien zum Screening.',
    category: 'mammographie',
    target: 'mammographie',
    datePublished: '2026-07-06',
    photo: 'waiting',
    review: 'Bestehender Artikeltext – Zahlen prüfen (etwa 5.000 Diagnosen pro Jahr, Heilungschancen „über 90 Prozent“), Träger „ÖQG“, Einladungsschreiben ab 45 (laut Praxis nicht erforderlich), „zertifizierter Standort“, FAQ-Antwort „Nein“ zur Strahlenbelastung, Empfehlung „ab 40 bei familiärer Belastung“.',
  },
];

export const ARTICLES = META.map((m) => {
  return {
    status: 'published',
    author: null,
    faq: null,
    ...m,
    dateModified: m.dateModified || m.datePublished,
    photo: m.photo ? PHOTOS[m.photo] : null,
    path: `${RATGEBER_BASE}/${m.slug}`,
  };
});

export const articleBySlug = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
export const isIndexable = (a) => a.status === 'published';

// ISO-Datum → „17. April 2026“
const MONTHS = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
export const formatDate = (iso) => {
  if (!iso) return null;
  const [y, mo, d] = iso.split('-').map(Number);
  return `${d}. ${MONTHS[mo - 1]} ${y}`;
};

export const ARTICLE_ROUTES = ARTICLES.map((a) => ({
  path: a.path,
  fullTitle: a.seoTitle,
  title: a.title,
  h1: a.title,
  crumb: a.title,
  parent: { name: 'Ratgeber', path: RATGEBER_BASE },
  description: a.description,
  priority: '0.6',
  noindex: !isIndexable(a),
  lastmod: a.dateModified || undefined,
  og: {
    type: 'article',
    publishedTime: a.datePublished,
    modifiedTime: a.dateModified,
    section: categoryById[a.category].name,
  },
  article: isIndexable(a) ? { slug: a.slug } : null,
}));
