// P2-6: Bereiche, Menü und Fotos kommen jetzt aus einer Quelle (services.js → examinations.js → navigation.js,
// photos.js → healthGoals.js/ratgeber.js). Die Werte müssen exakt dem Stand vor dem Umbau entsprechen
// (Momentaufnahme __snapshots__/stammdaten.json, einmalig vor dem Umbau aufgenommen).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { AREAS } from '../../src/data/examinations.js';
import { OTHER_EXAMS, MAIN_NAV } from '../../src/data/navigation.js';
import { GOAL_IMAGES } from '../../src/data/healthGoals.js';
import { ARTICLES } from '../../src/data/ratgeber.js';
import { PHOTOS } from '../../src/data/photos.js';

const snap = JSON.parse(readFileSync(new URL('./__snapshots__/stammdaten.json', import.meta.url), 'utf8'));
const plain = (x) => JSON.parse(JSON.stringify(x));

test('Stammdaten unverändert: Bereiche (AREAS)', () => assert.deepStrictEqual(plain(AREAS), snap.AREAS));
test('Stammdaten unverändert: Menü (OTHER_EXAMS, MAIN_NAV)', () => {
  assert.deepStrictEqual(plain(OTHER_EXAMS), snap.OTHER_EXAMS);
  assert.deepStrictEqual(plain(MAIN_NAV), snap.MAIN_NAV);
});
test('Stammdaten unverändert: Fotos der Gesundheitsziele und Ratgeber-Artikel', () => {
  assert.deepStrictEqual(plain(GOAL_IMAGES), snap.GOAL_IMAGES);
  assert.deepStrictEqual(plain(Object.fromEntries(ARTICLES.map((a) => [a.slug, a.photo]))), snap.ARTICLE_PHOTOS);
  for (const [slug, photo] of Object.entries(snap.ARTICLE_PHOTOS)) {
    if (photo) assert.ok(Object.values(PHOTOS).some((p) => p.name === photo.name), `${slug}: Foto nicht aus photos.js`);
  }
});
