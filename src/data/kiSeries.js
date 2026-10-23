// KI-Ratgeberserie „Röntgen am K[AI] – Künstliche Intelligenz, ärztlich verantwortet“ – ZENTRALE Daten.
// Übersicht /ratgeber/kuenstliche-intelligenz-radiologie (KiSeriesPage) + acht Artikel (ArticlePage, Metadaten in ratgeber.js).
// Wird von ratgeber.js → routes.js → postbuild (Node) importiert: nur .js-Importe, kein JSX, kein import.meta.
// Nur Metadaten (Titel, Kurztext, Description, FAQ, Quellen) – die langen Texte und Bildtexte liegen in
// ratgeber/ki-*.content.js und werden über kiContent.js erst auf der Artikel- bzw. Übersichtsseite geladen.
//
// Regeln (Aufträge 21.10.2026):
// * „bei uns im Einsatz“ NUR, wenn in diesem Projekt ausdrücklich bestätigt (inUse: true). Bestätigt: Rho (Praxis, 26.09.2026,
//   siehe dexa.js). IB-Lab-Module LAMA/HIPPO/KOALA/SQUIRREL/FROG/PANDA: von der Praxis bestätigt (Peter 21.10.2026)
//   → „bei uns im Einsatz“. Transpara: im Einsatz (Peter 21.10.2026 abends) → inUse: true.
// * Beispielberichte = Demo-Datensätze von IB Lab (keine Patientinnen/Patienten der Praxis). Kopfblock mit Name, ID,
//   Geburtsdatum, Untersuchungs- und Analysedatum vor der Veröffentlichung abgeschnitten (scratch/ibl/crop.py: oberste
//   470 px der 2382 × 3369-Seiten; HIPPO-postop hatte eine echt wirkende Patienten-ID + Geburtsdatum). Danach je Bild
//   geprüft: keine Personendaten, nur Seitenmarker (R/L, STEHEND) und Herstellerangaben. PANDA: kein Kopfblock, nur
//   Demo-Alter/Geschlecht/Größe. Bilder: assets-src/ki → npm run images:ki → public/assets/ki.
// * Nutzungsrechte der Berichte und Logos: von der Praxis zur Verfügung gestellt (Hersteller/Vertrieb); eine schriftliche
//   Freigabe von IB Lab ist laut Praxis nicht nötig (Peter 21.10.2026).
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

// Prüfvermerk „Medizinisch geprüft von … – Stand …“ (Aufteilung Peter 21.10.2026: Georg Riegler = LAMA/HIPPO/KOALA/
// SQUIRREL/FROG, Peter Kalmar = Übersicht/Rho/PANDA/Transpara). Erst eintragen, wenn der Arzt „gelesen“ gemeldet hat;
// ohne Eintrag zeigt die Seite den gelben Platzhalter. at = Tag der Durchsicht (ISO).
const KALMAR = 'Priv.-Doz. Dr. Peter Kalmar';
export const KI_REVIEWED = {
  uebersicht: { by: KALMAR, at: '2026-10-21' },   // Peter „gelesen“ 21.10.2026
  rho: { by: KALMAR, at: '2026-10-21' },
  panda: { by: KALMAR, at: '2026-10-21' },
  transpara: { by: KALMAR, at: '2026-10-21' },
  // Georgs fünf: Peter hat die Durchsicht übernommen und „gelesen“ gemeldet (22.10.2026, nach Herstellerabgleich)
  lama: { by: KALMAR, at: '2026-10-22' },
  hippo: { by: KALMAR, at: '2026-10-22' },
  koala: { by: KALMAR, at: '2026-10-22' },
  squirrel: { by: KALMAR, at: '2026-10-22' },
  frog: { by: KALMAR, at: '2026-10-22' },
};

// Autor (sichtbar „Von …“, Article-Schema author = Person): Peter Kalmar für seine Artikel (Peter 21.10.2026 abends).
// Georgs fünf (LAMA, HIPPO, KOALA, SQUIRREL, FROG) bleiben „Herausgegeben von Röntgen am Kai“ (author: null).
export const KI_AUTHORS = {
  uebersicht: KALMAR,
  rho: KALMAR,
  panda: KALMAR,
  transpara: KALMAR,
};

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
  reviewed: KI_REVIEWED.uebersicht || null,
  author: KI_AUTHORS.uebersicht || null,
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

// Titelbilder (16:9) am Artikelanfang: Ausschnitt aus dem Beispielbericht, der im Artikel steht – nur das Röntgenbild mit
// den eingezeichneten Messlinien, ohne Tabellen, Textspalten und Personenangaben (Auftrag Peter + Georg 22.10.2026:
// „mehr Bilder am Seitenanfang“). Erzeugt mit assets-src/ki/quellen/render_ki_titelbilder.py (KOALA: eigene
// Schemagrafik, render_ki_grafiken.py titel-koala, weil es noch keinen KOALA-Beispielbericht gibt) → npm run images:ki.
// Keine KI-generierten Bilder. Bildunterschrift = Herkunft, Alt-Text = Bildinhalt.
const HERO_SIZE = { width: 1920, height: 1080 };
const CAP_REPORT = 'Ausschnitt aus einem Beispielbericht des Herstellers (Demo-Datensatz)';
const CAP_SCHEMA = 'Schematische Darstellung';
export const KI_HEROES = {
  lama: {
    key: 'titel-lama', caption: CAP_REPORT,
    alt: 'Röntgenaufnahme beider Beine von der Hüfte bis zum Sprunggelenk mit farbig eingezeichneten Beinachsen und Gelenklinien, daneben vergrößert die beiden Kniegelenke, eines davon mit Knieprothese',
  },
  hippo: {
    key: 'titel-hippo', caption: CAP_REPORT,
    alt: 'Beckenröntgen mit eingezeichneter Bezugslinie, Messpunkten und Winkeln an beiden Hüftgelenken',
  },
  koala: {
    key: 'titel-koala', caption: `${CAP_SCHEMA} (kein Röntgenbild)`, light: true,
    alt: 'Zeichnung eines rechten Kniegelenks von vorne mit Oberschenkelknochen, Kniescheibe, Schienbein und Wadenbein; der Gelenkspalt innen und außen ist rot markiert',
  },
  squirrel: {
    key: 'titel-squirrel', caption: CAP_REPORT,
    alt: 'Röntgenaufnahme der ganzen Wirbelsäule von vorne mit beschrifteten Wirbeln und drei eingezeichneten Cobb-Winkeln (21°, 45° und 31°), daneben vergrößert die Brust- und Lendenwirbelsäule',
  },
  frog: {
    key: 'titel-frog', caption: 'Ausschnitte aus zwei Beispielberichten des Herstellers (Demo-Datensätze)',
    alt: 'Fußröntgen von oben und von der Seite mit farbig eingezeichneten, nummerierten Messlinien und Winkeln',
  },
  panda: {
    key: 'titel-panda', caption: CAP_REPORT,
    alt: 'Röntgenaufnahme der linken Hand eines Jugendlichen mit noch offenen Wachstumsfugen, wie sie für die Bestimmung des Knochenalters verwendet wird',
  },
  rho: {
    key: 'titel-rho', caption: 'Röntgen-Vorschaubilder aus drei Beispielberichten des Herstellers (Demo-Datensätze)',
    alt: 'Drei Röntgen-Vorschaubilder nebeneinander: Brustkorb, Brustwirbelsäule und beide Hände',
  },
  transpara: {
    key: 'titel-transpara', caption: `${CAP_SCHEMA} einer KI-Auswertungsansicht (Ausschnitt)`, light: true,
    alt: 'Schema einer Auswertungsansicht: vier Mammographie-Ansichten, in einer ein rot markierter Bereich mit dem Wert 58, darunter die Skala von 1 bis 10 mit hervorgehobenem Wert 7',
  },
  uebersicht: {
    key: 'titel-ki', caption: 'Ausschnitte aus Beispielberichten der Hersteller (Demo-Datensätze)',
    alt: 'Collage aus vier Röntgenbildern mit eingezeichneten Messlinien: Becken mit Hüftwinkeln, Fuß von der Seite, beide Kniegelenke mit Beinachsen und Wirbelsäule mit Cobb-Winkeln',
  },
};
for (const h of Object.values(KI_HEROES)) Object.assign(h, HERO_SIZE);

// Reihenfolge = Reihenfolge der Kacheln laut Auftrag
export const KI_MODULES = [
  {
    id: 'lama', product: 'LAMA', vendor: 'IB Lab', topic: 'Beinachsen', slug: 'ki-beinachsenvermessung-lama', mod: LAMA, inUse: true, dateModified: '2026-10-22',
    seoTitle: 'KI-Beinachsenvermessung in Graz | IB Lab LAMA', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Röntgenuntersuchung in Graz – mit Zuweisung direkt vorbeikommen oder Termin vereinbaren.' },
    logo: { ...LOGOS.lama, alt: 'Logo IB Lab LAMA' },
  },
  {
    id: 'hippo', product: 'HIPPO', vendor: 'IB Lab', topic: 'Hüftvermessung', slug: 'ki-hueftvermessung-hippo', mod: HIPPO, inUse: true, dateModified: '2026-10-22',
    seoTitle: 'KI-Hüftvermessung und Hüftprothese | Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Hüft- oder Beckenröntgen in Graz' },
    logo: { ...LOGOS.hippo, alt: 'Logo IB Lab HIPPO' },
  },
  {
    id: 'koala', product: 'KOALA', vendor: 'IB Lab', topic: 'Kniearthrose', slug: 'kniearthrose-ki-koala', mod: KOALA, inUse: true, dateModified: '2026-10-22',
    seoTitle: 'Kniearthrose im Röntgen erkennen | KI in Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Knieschmerzen abklären – Röntgen mit Zuweisung' },
    logo: { ...LOGOS.koala, alt: 'Logo IB Lab KOALA' },
  },
  {
    id: 'squirrel', product: 'SQUIRREL', vendor: 'IB Lab', topic: 'Skoliose', slug: 'skoliose-cobb-winkel-ki', mod: SQUIRREL, inUse: true, dateModified: '2026-10-22',
    seoTitle: 'Skoliose und Cobb-Winkel mit KI vermessen | Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Wirbelsäulenröntgen in Graz anfragen' },
    logo: { ...LOGOS.squirrel, alt: 'Logo IB Lab SQUIRREL' },
  },
  {
    id: 'frog', product: 'FROG', vendor: 'IB Lab', topic: 'Fußfehlstellungen', slug: 'fussfehlstellung-roentgen-ki', mod: FROG, inUse: true, dateModified: '2026-10-22',
    seoTitle: 'Fußfehlstellungen im Röntgen vermessen | Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Fußröntgen in Graz – mit Zuweisung direkt vorbeikommen oder Termin vereinbaren.' },
    logo: { ...LOGOS.frog, alt: 'Logo IB Lab FROG' },
  },
  {
    id: 'panda', product: 'PANDA', vendor: 'IB Lab', topic: 'Knochenalter', slug: 'knochenalter-bestimmen-ki', mod: PANDA, inUse: true, dateModified: '2026-10-22',
    seoTitle: 'Knochenalter bei Kindern bestimmen | Röntgen Graz', target: 'roentgen', category: 'roentgen',
    cta: { title: 'Knochenalter-Röntgen in Graz anfragen' },
    logo: { ...LOGOS.panda, alt: 'Logo IB Lab PANDA' },
  },
  {
    id: 'rho', product: 'Rho', vendor: '16 Bit', topic: 'Knochengesundheit', slug: 'osteoporose-screening-roentgen-ki', mod: RHO, inUse: true,
    seoTitle: 'Osteoporose-Risiko im Röntgen erkennen | Graz', target: 'knochendichte', category: 'knochengesundheit',
    cta: { title: 'Knochendichtemessung in Graz vereinbaren' },
    logo: null,
    dateModified: RHO.UPDATED || '2026-10-21',
  },
  {
    id: 'transpara', product: 'Transpara', vendor: 'ScreenPoint Medical', topic: 'Mammographie', slug: 'ki-mammographie-transpara', mod: TRANSPARA, inUse: true,
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
  review: m.mod.REVIEW || '',   // IB-Lab-Freigabe für Berichte/Logos laut Praxis nicht nötig (Peter 21.10.2026)
  series: 'ki',
  product: m.vendor === 'IB Lab' ? `IB Lab ${m.product}` : m.product,
  inUse: m.inUse,
  reviewed: KI_REVIEWED[m.id] || null,
  author: KI_AUTHORS[m.id] || null,
  logo: m.logo,
  ce: true,   // CE-gekennzeichnetes Medizinprodukt (Nachweise IB Lab 22.10.2026, Transpara 2.1.1 laut Handbuch Rev. B: MDR IIb, CE 0344, 23.10.2026); Peter 22.10.2026: erwähnen
  kiHero: KI_HEROES[m.id],   // Titelbild am Artikelanfang (statt früher noHeroImage)
}));
