// Schnelle Datenprüfungen (node:test, ohne npm-Abhängigkeiten, < 2 s): Invarianten der zentralen Daten in src/data.
// Aufruf: npm run test:unit (läuft auch in GitHub Actions vor dem Build).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { services } from '../../src/data/services.js';
import { BODY } from '../../src/data/bodyComposition.js';
import { routes, fullTitle, findRoute } from '../../src/data/routes.js';
import { AREAS, AREA_ORDER } from '../../src/data/examinations.js';
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

test('Routen: jede prerender-Route ist in entry-server.PAGES eingetragen', () => {
  const src = readFileSync(new URL('../../src/entry-server.jsx', import.meta.url), 'utf8');
  const block = src.match(/export const PAGES = \{([\s\S]*?)\};/)?.[1] ?? '';
  const pages = [...block.matchAll(/'([^']+)':/g)].map((m) => m[1]).sort();
  assert.deepEqual(pages, routes.filter((r) => r.prerender).map((r) => r.path).sort());
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
