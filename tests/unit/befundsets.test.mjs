// Befund-Slider-Sets (Körperanalyse + Knochendichte): Datenverträge zwischen Folien, Hotspots, Erklärungen, Quellen und Dateien.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { DEXA_REPORT_SET } from '../../src/data/dexaReportExamples.js';
import { BONE_REPORT_SET, BONE_SECTION } from '../../src/data/boneDensityReportExamples.js';
import { DEXA } from '../../src/data/dexa.js';

const SETS = { dexa: DEXA_REPORT_SET, knochendichte: BONE_REPORT_SET };
const pub = (set, f) => new URL(`../../public/${set.base}${f}`, import.meta.url);

for (const [name, set] of Object.entries(SETS)) {
  test(`Befund-Set ${name}: Folien-IDs, Hotspot-IDs eindeutig, Hotspots innerhalb der Seite`, () => {
    const slideIds = set.slides.map((s) => s.id);
    assert.equal(new Set(slideIds).size, slideIds.length);
    const hs = set.slides.flatMap((s) => s.hotspots);
    assert.equal(new Set(hs.map((h) => h.id)).size, hs.length);
    for (const h of hs) {
      assert.ok(h.x >= 0 && h.y >= 0 && h.x + h.w <= 100 && h.y + h.h <= 100, `${h.id} außerhalb`);
      assert.ok(h.w > 0 && h.h > 0, `${h.id} ohne Fläche`);
    }
  });

  test(`Befund-Set ${name}: jede Erklärung wird benutzt, jeder Hotspot hat eine, jede Quelle existiert`, () => {
    const keys = new Set(set.slides.flatMap((s) => s.hotspots.map((h) => h.key)));
    assert.deepEqual([...keys].filter((k) => !set.explanations[k]), []);
    assert.deepEqual(Object.keys(set.explanations).filter((k) => !keys.has(k)), []);
    for (const [k, e] of Object.entries(set.explanations)) {
      assert.ok(e.quellen?.length, `${k}: keine Quelle`);
      for (const q of e.quellen) assert.ok(set.sources[q.id], `${k}: Quelle ${q.id} fehlt`);
    }
  });

  test(`Befund-Set ${name}: PDF und Bildvarianten je Folie vorhanden`, () => {
    for (const s of set.slides) {
      assert.ok(existsSync(pub(set, `${s.file}.pdf`)), `${s.file}.pdf`);
      for (const w of set.image.widths) for (const ext of ['avif', 'webp']) assert.ok(existsSync(pub(set, `${s.file}-${w}.${ext}`)), `${s.file}-${w}.${ext}`);
      if (set.thumbs) assert.ok(existsSync(pub(set, `${s.file}-thumb.webp`)), `${s.file}-thumb.webp`);
    }
  });
}

test('Befund-Sets: eigene ID-Präfixe (beide Slider können auf einer Seite stehen)', () => {
  assert.notEqual(DEXA_REPORT_SET.idPrefix, BONE_REPORT_SET.idPrefix);
});

test('Knochendichte: T-Wert-Bereiche immer mit Altersgruppen-Hinweis, keine automatische Diagnose', () => {
  assert.equal(BONE_SECTION.tScoreBands.length, 3);
  assert.match(BONE_SECTION.tScoreCaveat, /nicht für alle Altersgruppen/);
  assert.match(BONE_SECTION.tScoreCaveat, /Z-Wert/);
  assert.match(BONE_SECTION.tScoreCaveat, /nicht automatisiert diagnostiziert/);
  assert.match(BONE_REPORT_SET.explanations.tScore.einschraenkung, /nicht für alle Altersgruppen/);
});

test('Knochendichte: Kombi-Hinweis mit Mammographie folgt dexa.js (online erst, wenn MiraNext DEXA kennt)', () => {
  if (DEXA.combinedOnline) assert.doesNotMatch(BONE_SECTION.combinedNote, /telefonisch/);
  else assert.match(BONE_SECTION.combinedNote, /telefonisch/);
});
