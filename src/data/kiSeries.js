// KI-Ratgeberserie „Röntgen am K[AI] – Künstliche Intelligenz, ärztlich verantwortet“ – ZENTRALE Daten.
// Übersicht /ratgeber/kuenstliche-intelligenz-radiologie (KiSeriesPage) + acht Artikel (ArticlePage, Metadaten in ratgeber.js).
// Wird von ratgeber.js → routes.js → postbuild (Node) importiert: nur .js-Importe, kein JSX, kein import.meta.
// Nur Metadaten (Titel, Kurztext, Description, FAQ, Quellen) – die langen Texte und Bildtexte liegen in
// ratgeber/ki-*.content.js und werden über kiContent.js erst auf der Artikel- bzw. Übersichtsseite geladen.
//
// Regeln (Aufträge 21.10.2026):
// * „bei uns im Einsatz“ NUR, wenn in diesem Projekt ausdrücklich bestätigt (inUse: true). Bestätigt: Rho (Praxis, 26.09.2026,
//   siehe dexa.js). IB-Lab-Module LAMA/HIPPO/KOALA/SQUIRREL/FROG/PANDA: Installation Oktober 2026 laut Mailverkehr, auf der
//   Website noch nicht bestätigt → kein Hinweis. Transpara: nicht bestätigt (Gespräche Jänner 2026).
// * Beispielberichte = Demo-Datensätze von IB Lab (keine Patientinnen/Patienten der Praxis). Kopfblock mit Name, ID,
//   Geburtsdatum, Untersuchungs- und Analysedatum vor der Veröffentlichung abgeschnitten (scratch/ibl/crop.py: oberste
//   470 px der 2382 × 3369-Seiten; HIPPO-postop hatte eine echt wirkende Patienten-ID + Geburtsdatum). Danach je Bild
//   geprüft: keine Personendaten, nur Seitenmarker (R/L, STEHEND) und Herstellerangaben. PANDA: kein Kopfblock, nur
//   Demo-Alter/Geschlecht/Größe. Bilder: assets-src/ki → npm run images:ki → public/assets/ki.
// * Nutzungsrechte der Berichte und Logos: von der Praxis zur Verfügung gestellt (Hersteller/Vertrieb) – schriftliche
//   Freigabe von IB Lab ist im review-Feld jedes Artikels als offen vermerkt.
// * Hotspots: x/y in Prozent des (zugeschnittenen) Bildes, Mittelpunkt des Markers; nur für sichtbare Elemente.
import * as UE from './ratgeber/ki-uebersicht.js';
import * as LAMA from './ratgeber/ki-lama.js';
import * as HIPPO from './ratgeber/ki-hippo.js';
import * as KOALA from './ratgeber/ki-koala.js';
import * as SQUIRREL from './ratgeber/ki-squirrel.js';
import * as FROG from './ratgeber/ki-frog.js';
import * as PANDA from './ratgeber/ki-panda.js';
import * as RHO from './ratgeber/ki-rho.js';
import * as TRANSPARA from './ratgeber/ki-transpara.js';

export const KI_SERIES_PATH = '/ratgeber/kuenstliche-intelligenz-radiologie';
export const KI_SERIES = {
  path: KI_SERIES_PATH,
  name: UE.SERIES_NAME || 'Röntgen am K[AI] – Künstliche Intelligenz, ärztlich verantwortet',
  title: UE.TITLE,
  seoTitle: 'Künstliche Intelligenz in der Radiologie | Graz',
  description: UE.DESCRIPTION,
  excerpt: UE.EXCERPT,
  can: UE.CAN || [],
  cannot: UE.CANNOT || [],
  trustNote: UE.TRUST_NOTE || null,
  review: UE.REVIEW || null,
  datePublished: '2026-10-21',
};

export const KI_SERIES_CRUMB = 'Röntgen am K[AI]';

// Logos der IB-Lab-Module (public/assets/ki/manifest.json). Bilder, Bildtexte und Hotspots: src/data/kiContent.js
const LOGOS = {
  lama: { key: 'logo-lama', width: 726, height: 87 },
  hippo: { key: 'logo-hippo', width: 738, height: 104 },
  koala: { key: 'logo-koala', width: 717, height: 87 },
  squirrel: { key: 'logo-squirrel', width: 831, height: 106 },
  frog: { key: 'logo-frog', width: 657, height: 107 },
  panda: { key: 'logo-panda', width: 767, height: 87 },
};

// Reihenfolge = Reihenfolge der Kacheln laut Auftrag
export const KI_MODULES = [
  {
    id: 'lama', product: 'LAMA', vendor: 'IB Lab', topic: 'Beinachsen', slug: 'ki-beinachsenvermessung-lama', mod: LAMA, inUse: false,
    seoTitle: 'KI-Beinachsenvermessung in Graz | IB Lab LAMA', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Röntgenuntersuchung in Graz – mit Zuweisung direkt vorbeikommen oder Termin vereinbaren.' },
    logo: { ...LOGOS.lama, alt: 'Logo IB Lab LAMA' },
  },
  {
    id: 'hippo', product: 'HIPPO', vendor: 'IB Lab', topic: 'Hüftvermessung', slug: 'ki-hueftvermessung-hippo', mod: HIPPO, inUse: false,
    seoTitle: 'KI-Hüftvermessung und Hüftprothese | Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Hüft- oder Beckenröntgen in Graz' },
    logo: { ...LOGOS.hippo, alt: 'Logo IB Lab HIPPO' },
  },
  {
    id: 'koala', product: 'KOALA', vendor: 'IB Lab', topic: 'Kniearthrose', slug: 'kniearthrose-ki-koala', mod: KOALA, inUse: false,
    seoTitle: 'Kniearthrose im Röntgen erkennen | KI in Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Knieschmerzen abklären – Röntgen mit Zuweisung' },
    logo: { ...LOGOS.koala, alt: 'Logo IB Lab KOALA' },
  },
  {
    id: 'squirrel', product: 'SQUIRREL', vendor: 'IB Lab', topic: 'Skoliose', slug: 'skoliose-cobb-winkel-ki', mod: SQUIRREL, inUse: false,
    seoTitle: 'Skoliose und Cobb-Winkel mit KI vermessen | Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Wirbelsäulenröntgen in Graz anfragen' },
    logo: { ...LOGOS.squirrel, alt: 'Logo IB Lab SQUIRREL' },
  },
  {
    id: 'frog', product: 'FROG', vendor: 'IB Lab', topic: 'Fußfehlstellungen', slug: 'fussfehlstellung-roentgen-ki', mod: FROG, inUse: false,
    seoTitle: 'Fußfehlstellungen im Röntgen vermessen | Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Fußröntgen in Graz – mit Zuweisung direkt vorbeikommen oder Termin vereinbaren.' },
    logo: { ...LOGOS.frog, alt: 'Logo IB Lab FROG' },
  },
  {
    id: 'panda', product: 'PANDA', vendor: 'IB Lab', topic: 'Knochenalter', slug: 'knochenalter-bestimmen-ki', mod: PANDA, inUse: false,
    seoTitle: 'Knochenalter bei Kindern bestimmen | Röntgen Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Knochenalter-Röntgen in Graz anfragen' },
    logo: { ...LOGOS.panda, alt: 'Logo IB Lab PANDA' },
  },
  {
    id: 'rho', product: 'RHO', vendor: '16 Bit', topic: 'Knochengesundheit', slug: 'osteoporose-screening-roentgen-ki', mod: RHO, inUse: true,
    seoTitle: 'Osteoporose-Risiko im Röntgen erkennen | Graz', target: 'knochendichte', category: 'knochengesundheit',
    cta: { title: 'Knochendichtemessung in Graz vereinbaren' },
    logo: null,
    dateModified: RHO.UPDATED || '2026-10-21',
  },
  {
    id: 'transpara', product: 'Transpara', vendor: 'ScreenPoint Medical', topic: 'Mammographie', slug: 'ki-mammographie-transpara', mod: TRANSPARA, inUse: false,
    seoTitle: 'KI bei der Mammographie in Graz | Transpara', target: 'mammographie', category: 'mammographie',
    cta: { title: 'Screening-Mammographie in Graz vereinbaren' },
    logo: null,
    dateModified: TRANSPARA.UPDATED || '2026-10-21',
  },
].map((m) => ({ ...m, tile: UE.TILES?.[m.id] || { title: `${m.product} – ${m.topic}`, text: m.mod.EXCERPT } }));

export const kiModuleBySlug = Object.fromEntries(KI_MODULES.map((m) => [m.slug, m]));

// Einträge für ratgeber.js (META-Format)
export const KI_ARTICLE_META = KI_MODULES.map((m) => ({
  slug: m.slug,
  title: m.mod.TITLE,
  excerpt: m.mod.EXCERPT,
  seoTitle: m.seoTitle,
  description: m.mod.DESCRIPTION,
  category: m.category,
  target: m.target,
  cta: m.cta,
  datePublished: '2026-10-21',
  dateModified: m.dateModified,
  faq: m.mod.FAQ,
  review: [m.mod.REVIEW, m.logo && 'Bildrechte: schriftliche Freigabe von IB Lab für Beispielberichte und Logo einholen.'].filter(Boolean).join(' '),
  series: 'ki',
  product: m.vendor === 'IB Lab' ? `IB Lab ${m.product}` : m.product,
  inUse: m.inUse,
  logo: m.logo,
  noHeroImage: true,
}));
