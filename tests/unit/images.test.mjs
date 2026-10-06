// P2-9: Bildvarianten kommen aus assets-src/images (npm run images); das Manifest hält den Inhalts-Hash je Vorlage.
// Schlägt fehl, wenn eine Vorlage neu oder geändert ist und `npm run images` noch nicht gelaufen ist.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const SRC = new URL('../../assets-src/images/', import.meta.url);
const OUT = new URL('../../public/assets/images/', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('manifest.json', OUT), 'utf8'));

test('Bilder: jede Vorlage hat aktuelle Varianten (Manifest-Hash, 1920/1200/800 px)', () => {
  const templates = readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
  assert.ok(templates.length > 0);
  for (const file of templates) {
    const name = file.replace(/\.[^.]+$/, '');
    const hash = crypto.createHash('sha256').update(readFileSync(new URL(file, SRC))).digest('hex');
    assert.equal(manifest[name]?.source, hash, `${file}: npm run images ausführen`);
    for (const v of ['', '-tablet', '-mobile']) assert.ok(existsSync(new URL(`${name}${v}.avif`, OUT)), `${name}${v}.avif fehlt`);
  }
  assert.deepEqual(Object.keys(manifest).sort(), templates.map((f) => f.replace(/\.[^.]+$/, '')).sort(), 'Manifest ohne verwaiste Einträge');
});
