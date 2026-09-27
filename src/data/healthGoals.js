// Gesundheitsziele – ZENTRALE Daten für Übersicht (/gesundheitsziele), 7 Zielseiten, Startseite,
// Routen-Metadaten (routes.js → Titel, Description, Canonical, Sitemap, Breadcrumbs) und Tests.
// Wird auch von scripts/postbuild.mjs (Node) importiert → nur .js-Importe, kein JSX, kein import.meta.
//
// Regeln (Auftrag 27.09.2026):
// * Jede Seite beantwortet EINE eigene Suchintention (keyword) – Überschneidungen über Querverlinkung lösen.
// * Zielseiten erklären Zusammenhänge und führen zu den Leistungsseiten; sie ersetzen diese nicht.
// * Preise und Kassenregeln nur aus dexa.js / bodyComposition.js / screening.js – nie hart schreiben.
// * Medizinische Kernaussagen nur aus den Quellen unten (Leitlinien, Konsensus, begutachtete Studien).
// * Bilder: nur echte Praxisfotos; fehlt eines → ImagePlaceholder mit Brief aus imageBriefs.js.

export const GOALS_BASE = '/gesundheitsziele';

// ── Medizinische Quellen (geprüft 27.09.2026) ─────────────────────────────────────────
export const SOURCES = {
  ewgsop2: {
    label: 'Cruz-Jentoft AJ, Bahat G, Bauer J, et al. Sarcopenia: revised European consensus on definition and diagnosis (EWGSOP2). Age and Ageing 2019;48(1):16–31.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6322506/',
    kind: 'Europäischer Konsensus',
  },
  ioc2023: {
    label: 'Mountjoy M, Ackerman KE, Bailey DM, et al. 2023 International Olympic Committee’s (IOC) consensus statement on Relative Energy Deficiency in Sport (REDs). British Journal of Sports Medicine 2023;57(17):1073–1097.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37752011/',
    kind: 'IOC-Konsensus',
  },
  step1: {
    label: 'Impact of Semaglutide on Body Composition in Adults With Overweight or Obesity: Exploratory Analysis of the STEP 1 Study. Journal of the Endocrine Society 2021;5(Suppl 1). DEXA-Teilauswertung (Kongressbeitrag).',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8089287/',
    kind: 'Studienauswertung',
  },
  surmount1: {
    label: 'Look M, Dunn JP, Kushner RF, et al. Body composition changes during weight reduction with tirzepatide in the SURMOUNT-1 study of adults with obesity or overweight. Diabetes, Obesity and Metabolism 2025;27(5).',
    url: 'https://pubmed.ncbi.nlm.nih.gov/39996356/',
    kind: 'Studienauswertung',
  },
  iscd: {
    label: 'International Society for Clinical Densitometry (ISCD): Official Positions – Adult, Stand 2023 (englisch).',
    url: 'https://iscd.org/official-positions-2023/',
    kind: 'Fachgesellschaft',
  },
  fruehErkennen: {
    label: 'Österreichisches Brustkrebs-Früherkennungsprogramm „früh erkennen“.',
    url: 'https://www.frueh-erkennen.at/',
    kind: 'Offizielles Programm',
  },
};

// ── Fotos (echte Praxisfotos, zugeschnitten; Varianten -mobile/-tablet erzeugt der Prebuild) ─────
export const GOAL_IMAGES = {
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

// ── Seiten ────────────────────────────────────────────────────────────────────────────
// keyword = Haupt-Suchintention (natürlich in H1/Einleitung/H2/Meta/Links, kein Stuffing)
// card = Hub-Karte (Wortlaut Auftrag), image = GOAL_IMAGES-Schlüssel oder imageBrief-Schlüssel (Platzhalter)
export const HEALTH_GOALS = [
  {
    id: 'wechseljahre',
    slug: 'frauengesundheit-wechseljahre',
    keyword: 'Wechseljahre Vorsorge Graz · Frauengesundheit Graz',
    navName: 'Frauengesundheit und Wechseljahre',
    card: { title: 'Frauengesundheit und Wechseljahre', text: 'Brustvorsorge, Knochen und Körperzusammensetzung im Blick behalten.' },
    fullTitle: 'Wechseljahre-Vorsorge in Graz: Brust, Knochen, Muskeln',
    h1: 'Gesund durch die Wechseljahre – Brust, Knochen und Muskelmasse im Blick',
    crumb: 'Frauengesundheit und Wechseljahre',
    description:
      'Frauengesundheit in Graz: Brustkrebs-Früherkennung, Knochendichtemessung und Körperanalyse rund um die Wechseljahre – drei getrennte Untersuchungen, jede mit eigener Fragestellung.',
    image: 'waiting',
    about: ['Menopause', 'Brustkrebs-Früherkennung', 'Osteoporose'],
  },
  {
    id: 'abnehmen',
    slug: 'gesund-abnehmen',
    keyword: 'gesund abnehmen Graz',
    navName: 'Gesund abnehmen',
    card: { title: 'Gesund abnehmen', text: 'Erkennen, ob sich Fettmasse, Magermasse oder beides verändert.' },
    fullTitle: 'Gesund abnehmen in Graz: Fett und Muskelmasse unterscheiden',
    h1: 'Gesund abnehmen – Fettverlust und Muskelmasse unterscheiden',
    crumb: 'Gesund abnehmen',
    description:
      'Gesund abnehmen in Graz: Eine DEXA-Körperanalyse zeigt, ob Sie Fettmasse, magere Masse oder beides verlieren – als Ausgangsmessung und zum Vergleich im Verlauf.',
    image: 'goalWeight',
    about: ['Gewichtsreduktion', 'Körperzusammensetzung'],
  },
  {
    id: 'abnehmspritze',
    slug: 'abnehmspritze-koerperanalyse',
    keyword: 'Abnehmspritze Muskelverlust · Körperanalyse Abnehmspritze',
    navName: 'Abnehmspritze und Muskelverlust',
    card: { title: 'Abnehmspritzen', text: 'Die Körperzusammensetzung während einer ärztlich begleiteten Gewichtsreduktion dokumentieren.' },
    fullTitle: 'Abnehmspritze & Muskelverlust: Körperanalyse mit DEXA',
    h1: 'Abnehmspritze und Muskelverlust – was verändert sich wirklich?',
    crumb: 'Abnehmspritze und Muskelverlust',
    description:
      'Abnehmspritze und Muskelverlust: Eine Körperanalyse mit DEXA dokumentiert vor und während der Behandlung, wie sich Fettmasse und Magermasse verändern.',
    image: 'scan',
    about: ['GLP-1-Rezeptoragonisten', 'Körperzusammensetzung'],
  },
  {
    id: 'fitness',
    slug: 'fitness-muskelaufbau',
    keyword: 'Körperanalyse Fitness Graz',
    navName: 'Fitness und Muskelaufbau',
    card: { title: 'Fitness und Muskelaufbau', text: 'Trainingserfolge objektiver beurteilen als nur mit Gewicht oder BMI.' },
    fullTitle: 'Körperanalyse für Fitness in Graz: Trainingserfolg messen',
    h1: 'Trainingserfolg messen – Körperfett und Muskelmasse objektiv vergleichen',
    crumb: 'Fitness und Muskelaufbau',
    description:
      'Körperanalyse für Fitness und Muskelaufbau in Graz: Körperfett und magere Masse mit DEXA messen und Trainingsfortschritte standardisiert vergleichen.',
    image: 'goalFitness',
    about: ['Krafttraining', 'Körperzusammensetzung'],
  },
  {
    id: 'aelter',
    slug: 'gesund-aelter-werden',
    keyword: 'Knochengesundheit im Alter',
    navName: 'Gesund älter werden',
    card: { title: 'Gesund älter werden', text: 'Knochenstabilität und Muskelmasse rechtzeitig beachten.' },
    fullTitle: 'Knochengesundheit im Alter: Knochen und Muskelmasse erhalten',
    h1: 'Gesund älter werden – Knochen und Muskelmasse erhalten',
    crumb: 'Gesund älter werden',
    description:
      'Knochengesundheit im Alter: warum Knochenstabilität, Muskelkraft und Muskelmasse für Mobilität zählen – und welche DEXA-Untersuchung welche Frage beantwortet.',
    image: 'device',
    about: ['Osteoporose', 'Altersbedingter Muskelverlust'],
  },
  {
    id: 'sarkopenie',
    slug: 'muskelverlust-sarkopenie',
    keyword: 'Muskelmasse messen Graz · Sarkopenie Graz',
    navName: 'Muskelverlust und Sarkopenie',
    card: { title: 'Muskelverlust und Sarkopenie', text: 'Niedrige Muskelmasse als Teil einer medizinischen Abklärung erfassen.' },
    fullTitle: 'Muskelmasse messen in Graz: Sarkopenie abklären',
    h1: 'Muskelmasse messen in Graz – Sarkopenie frühzeitig abklären',
    crumb: 'Muskelverlust und Sarkopenie',
    description:
      'Sarkopenie in Graz abklären: Die DEXA-Messung erfasst die Magermasse von Armen und Beinen als Näherung für die Muskelmasse – ein Teil der ärztlichen Abklärung, keine Diagnose.',
    image: 'goalSarcopenia',
    about: ['Sarkopenie'],
  },
  {
    // Spezialthema – nicht im Hauptmenü und nicht als Hub-Karte; dezent verlinkt (Hub, Fitness, Knochendichte)
    id: 'sport',
    slug: 'dexa-sportler-red-s',
    special: true,
    keyword: 'DEXA für Sportler Graz',
    navName: 'Knochengesundheit im Sport (RED-S)',
    card: { title: 'Knochengesundheit und Körperzusammensetzung im Sport', text: 'RED-S: Wann bei Sportlerinnen und Sportlern eine Messung sinnvoll sein kann.' },
    fullTitle: 'DEXA für Sportler in Graz: Knochen und RED-S',
    h1: 'Knochengesundheit und Körperzusammensetzung im Sport',
    crumb: 'Knochengesundheit im Sport',
    description:
      'DEXA für Sportlerinnen und Sportler in Graz: Knochendichte und Körperzusammensetzung bei Verdacht auf RED-S messen – als Teil einer sportmedizinischen Abklärung.',
    image: 'device',
    about: ['Relative Energy Deficiency in Sport (REDs)', 'Knochendichte'],
  },
];

export const goalPath = (g) => `${GOALS_BASE}/${g.slug}`;
export const goalById = Object.fromEntries(HEALTH_GOALS.map((g) => [g.id, { ...g, path: goalPath(g) }]));
// Frühere Anker der alten Einzelseite → neue Zielseiten (Links von außen/aus alten Artikeln)
export const LEGACY_GOAL_ANCHORS = {
  gewicht: '/gesundheitsziele/gesund-abnehmen',
  fitness: '/gesundheitsziele/fitness-muskelaufbau',
  wechseljahre: '/gesundheitsziele/frauengesundheit-wechseljahre',
  osteoporose: '/gesundheitsziele/gesund-aelter-werden',
  abklaerung: '/weitere-untersuchungen',
};

export const HUB_GOALS = HEALTH_GOALS.filter((g) => !g.special).map((g) => goalById[g.id]);

// Übersicht /gesundheitsziele
export const HUB = {
  fullTitle: 'Gesundheitsziele: passende Untersuchung finden | Röntgen am Kai',
  title: 'Gesundheitsziele',
  h1: 'Welche Untersuchung passt zu Ihrem Gesundheitsziel?',
  lead: 'Ob Brustvorsorge, Knochengesundheit, Gewichtsabnahme oder Erhalt der Muskelmasse: Finden Sie den passenden medizinischen Zugang zu Ihrem persönlichen Anliegen.',
  crumb: 'Gesundheitsziele',
  description:
    'Welche Untersuchung passt zu Ihrem Gesundheitsziel? Wechseljahre, Abnehmen, Abnehmspritze, Fitness, Älterwerden und Sarkopenie – Orientierung von Röntgen am Kai in Graz.',
};

// Routen-Einträge für routes.js (Titel, Description, Canonical, Sitemap, Breadcrumbs, MedicalWebPage)
export const GOAL_ROUTES = [
  {
    path: GOALS_BASE,
    fullTitle: HUB.fullTitle,
    title: HUB.title,
    h1: HUB.h1,
    crumb: HUB.crumb,
    description: HUB.description,
    priority: '0.7',
  },
  ...HEALTH_GOALS.map((g) => ({
    path: goalPath(g),
    fullTitle: `${g.fullTitle} | Röntgen am Kai`.length <= 70 ? `${g.fullTitle} | Röntgen am Kai` : g.fullTitle,
    title: g.crumb,
    h1: g.h1,
    crumb: g.crumb,
    parent: { name: HUB.crumb, path: GOALS_BASE },
    description: g.description,
    medicalPage: { about: g.about },
    priority: g.special ? '0.5' : '0.7',
  })),
];
