// Schnelle Datenprüfungen (node:test, ohne npm-Abhängigkeiten, < 2 s): Invarianten der zentralen Daten in src/data.
// Aufruf: npm run test:unit (läuft auch in GitHub Actions vor dem Build).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { services } from '../../src/data/services.js';
import { BODY } from '../../src/data/bodyComposition.js';
import { routes, fullTitle, findRoute, LEGACY_REDIRECTS } from '../../src/data/routes.js';
import { AREAS, AREA_ORDER, XRAY_GROUPS } from '../../src/data/examinations.js';
import { OTHER_EXAMS, MAIN_NAV, isActive } from '../../src/data/navigation.js';
import { REFERRAL_TERMS, searchTerms, normalize } from '../../src/data/referralTerms.js';
import { faqData, faqSchemaItems } from '../../src/data/faqData.js';

// --- P1-3: Termindauer Körperanalyse (Startseiten-Badge) = Angabe der Praxis ---
test('Körperanalyse: Termindauer aus einer Quelle (services = bodyComposition)', () => {
  assert.equal(services.koerperanalyse.durationMinutes, BODY.durationMinutes);
});

// --- Routen ---
test('Routen: Pfade eindeutig, findRoute findet jede Route', () => {
  const paths = routes.map((r) => r.path);
  assert.equal(new Set(paths).size, paths.length, 'doppelte Pfade');
  for (const p of paths) assert.equal(findRoute(p + (p === '/' ? '' : '/'))?.path, p, p);
});

test('Routen: Seitentitel ≤ 70 Zeichen und eindeutig', () => {
  const titles = routes.map(fullTitle);
  const long = routes.filter((r) => fullTitle(r).length > 70).map((r) => [r.path, fullTitle(r).length]);
  assert.deepEqual(long, []);
  assert.equal(new Set(titles).size, titles.length, 'doppelte Titel');
});

test('Routen: Description 50–165 Zeichen und eindeutig', () => {
  const bad = routes.filter((r) => !(r.description?.length >= 50 && r.description.length <= 165)).map((r) => [r.path, r.description?.length]);
  assert.deepEqual(bad, []);
  assert.equal(new Set(routes.map((r) => r.description)).size, routes.length, 'doppelte Descriptions');
});

// --- Routentabelle: Seite, FAQ, Weiterleitungen (eine Quelle für App, Vorrendern, Schema, postbuild) ---
const pageFile = (key) => new URL(`../../src/pages/${key}.jsx`, import.meta.url);
const pageSource = (key) => readFileSync(pageFile(key), 'utf8');

test('Routentabelle: jede Route hat eine Seite (page), die Datei existiert', () => {
  const missing = routes.filter((r) => !r.page || !existsSync(pageFile(r.page))).map((r) => [r.path, r.page]);
  assert.deepEqual(missing, []);
  assert.ok(routes.filter((r) => r.prerender).length >= 6, 'vorgerenderte Seiten');
});

test('Routentabelle: FAQ-Zuordnung – jedes faq hat ein Set, jede Seite mit FAQ hat faq', () => {
  for (const r of routes.filter((x) => x.faq)) assert.ok(faqData[r.faq]?.length > 0, `${r.path}: faqData.${r.faq}`);
  for (const r of routes) {
    const src = pageSource(r.page);
    assert.ok(!/faqData(\.(?!js\b)\w+|\[)/.test(src), `${r.page}: FAQ direkt aus faqData statt über useRouteFaq()`);
    if (src.includes('<FAQ ') && src.includes('useRouteFaq()')) assert.ok(r.faq, `${r.path}: Seite zeigt FAQ, Route ohne faq`);
    if (r.faq) assert.ok(src.includes('useRouteFaq()'), `${r.path}: faq gesetzt, Seite nutzt useRouteFaq() nicht`);
  }
});

test('Weiterleitungen: alte Adressen sind keine echten Routen, Ziele (samt Anker) existieren', () => {
  const anchors = { '/': ['services'], '/roentgen-graz': XRAY_GROUPS.map((g) => g.id) };
  assert.ok(Object.keys(LEGACY_REDIRECTS).length >= 10);
  for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
    assert.ok(!findRoute(from), `${from} ist zugleich echte Route`);
    const [p, hash] = to.split('#');
    assert.ok(findRoute(p || '/'), `${from} → ${to}: Ziel ist keine Route`);
    if (hash) assert.ok(anchors[p || '/']?.includes(hash), `${from} → ${to}: Anker unbekannt`);
  }
});

// --- Weitere Untersuchungen: Stammdaten in services.js und examinations.js ---
const AREA_TO_SERVICE = { roentgen: 'roentgen', ultraschall: 'ultraschall', spezialroentgen: 'spezialroentgen', zahn: 'dvt' };

test('Weitere Untersuchungen: AREAS = services (Titel, Pfad, Online-Buchung)', () => {
  assert.deepEqual(Object.keys(AREAS).sort(), Object.keys(AREA_TO_SERVICE).sort());
  for (const [k, sk] of Object.entries(AREA_TO_SERVICE)) {
    assert.equal(AREAS[k].title, services[sk].title, `${k}: Titel`);
    assert.equal(AREAS[k].path, services[sk].href, `${k}: Pfad`);
    assert.equal(AREAS[k].onlineBooking, services[sk].onlineBooking, `${k}: onlineBooking`);
  }
});

test('Menü: OTHER_EXAMS = AREAS (Namen, Pfade, Reihenfolge)', () => {
  assert.deepEqual(OTHER_EXAMS, AREA_ORDER.map((k) => ({ name: AREAS[k].title, href: AREAS[k].path })));
});

// --- Zuweisungssuche (/roentgen-graz) ---
test('Zuweisungssuche: Treffer, kein Treffer, Normalisierung', () => {
  assert.match(searchTerms('HWS')[0].to, /#region-hws$/);
  assert.equal(searchTerms('Thorax')[0]?.to, '/roentgen-graz#lunge-brustkorb');
  assert.equal(searchTerms('Calcaneus')[0]?.to, '/roentgen-graz#region-fersenbein');
  assert.deepEqual(searchTerms('Qwxyz'), []);
  assert.deepEqual(searchTerms('a'), [], 'unter 2 Zeichen keine Suche');
  assert.equal(normalize('Straße Ä'), 'strasse ae');
});

test('Zuweisungssuche: jedes Sprungziel liegt auf einer bestehenden Seite', () => {
  const missing = REFERRAL_TERMS.filter((t) => !findRoute(t.to.split('#')[0])).map((t) => t.to);
  assert.deepEqual(missing, []);
});

// --- Navigation ---
test('Menü: „Weitere Untersuchungen“ aktiv auf Detailseiten (auch Phlebographie)', () => {
  const weitere = MAIN_NAV.find((i) => i.name === 'Weitere Untersuchungen');
  assert.equal(isActive(weitere, '/unser-angebot/phlebographie'), true);
  assert.equal(isActive(weitere, '/roentgen-graz/'), true);
  assert.equal(isActive(weitere, '/'), false);
  const start = MAIN_NAV.find((i) => i.href === '/');
  assert.equal(isActive(start, '/'), true);
  assert.equal(isActive(start, '/kontakt'), false);
  const kontakt = MAIN_NAV.find((i) => i.href === '/kontakt');
  assert.equal(isActive(kontakt, '/unser-team/dr-peter-kalmar'), true);
});

// --- FAQ: offene Praxisangaben (pending) nie im FAQPage-Schema ---
test('FAQ: faqSchemaItems lässt Fragen mit offener Praxisangabe weg', () => {
  const items = [{ question: 'A', answer: 'a' }, { question: 'B', answer: 'b', pending: 'offen' }];
  assert.deepEqual(faqSchemaItems(items).map((i) => i.question), ['A']);
  for (const [key, set] of Object.entries(faqData)) {
    for (const item of faqSchemaItems(set)) {
      assert.ok(item.question && item.answer && !item.pending, `${key}: ${item.question}`);
    }
  }
});

// --- P3-3: Kontaktdaten nur aus practice.js, Screening-Angaben nur aus screening.js ---
test('Kontaktdaten: Telefon, Fax und E-Mail stehen nur in practice.js', async () => {
  const { readdirSync } = await import('node:fs');
  const { PHONE_E164, EMAIL, FAX_DISPLAY, PHONE_DISPLAY_INTL } = await import('../../src/data/practice.js');
  assert.match(FAX_DISPLAY, /^\+43 316 \d{7}$/);
  assert.match(PHONE_DISPLAY_INTL, /^\+43 316 \d{7}$/);
  assert.notEqual(FAX_DISPLAY, PHONE_DISPLAY_INTL);
  const src = new URL('../../src/', import.meta.url);
  const files = readdirSync(src, { recursive: true }).filter((f) => /\.(jsx?|mjs)$/.test(f) && f !== 'data/practice.js');
  const local = PHONE_E164.slice(6);
  const hits = files.filter((f) => {
    const s = readFileSync(new URL(f, src), 'utf8');
    return s.includes(EMAIL) || s.includes(local) || s.includes(FAX_DISPLAY.slice(-7));
  });
  assert.deepEqual(hits, []);
});

test('FAQ-Set mammascreening: Alter und Serviceline aus screening.js', async () => {
  const { SCREENING, AGE_RANGE } = await import('../../src/data/screening.js');
  const a = faqData.mammascreening[0].answer;
  assert.ok(a.includes(AGE_RANGE) && a.includes(SCREENING.serviceline.display));
  for (const o of SCREENING.optIn) assert.ok(a.includes(o.label), o.label);
});
