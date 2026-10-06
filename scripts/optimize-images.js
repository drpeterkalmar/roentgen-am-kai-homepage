// Bildvarianten erzeugen: Vorlagen in assets-src/images (jpg, png, webp, avif) →
// public/assets/images/<name>.avif (1920 px), <name>-tablet.avif (1200 px), <name>-mobile.avif (800 px).
// Aufruf: npm run images – lokal, das Ergebnis wird eingecheckt; der Build (auch in GitHub Actions)
// verarbeitet keine Bilder.
// - Die Vorlagen werden nie überschrieben: Ausgabe ausschließlich nach public/assets/images.
// - Übersprungen wird per Inhalts-Hash der Vorlage (public/assets/images/manifest.json), nicht per Dateizeit.
// - Erstlauf ohne Manifest-Eintrag: vorhandene Varianten werden übernommen, nicht neu codiert
//   (jede Neucodierung kostet Bildqualität).
import sharp from 'sharp';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets-src/images');
const OUT = path.join(root, 'public/assets/images');
const MANIFEST = path.join(OUT, 'manifest.json');
const FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const TIERS = [
  { suffix: '', width: 1920, quality: 50 },
  { suffix: '-tablet', width: 1200, quality: 45 },
  { suffix: '-mobile', width: 800, quality: 40 },
];

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const count = { made: 0, adopted: 0, skipped: 0 };

for (const file of fs.readdirSync(SRC).sort()) {
  if (!FORMATS.includes(path.extname(file).toLowerCase())) continue;
  const name = path.basename(file, path.extname(file));
  const source = path.join(SRC, file);
  const input = fs.readFileSync(source);
  const hash = sha256(input);
  const outputs = TIERS.map((t) => path.join(OUT, `${name}${t.suffix}.avif`));
  if (outputs.some((o) => path.resolve(o) === path.resolve(source))) throw new Error(`Vorlage = Ausgabe: ${file}`);
  const complete = outputs.every((o) => fs.existsSync(o));

  if (complete && manifest[name]?.source === hash) {
    count.skipped++;
    continue;
  }
  if (complete && !manifest[name]) {
    manifest[name] = { file, source: hash };
    count.adopted++;
    continue;
  }
  for (const [i, t] of TIERS.entries()) {
    const buf = await sharp(input).resize(t.width, null, { withoutEnlargement: true }).avif({ quality: t.quality }).toBuffer();
    fs.writeFileSync(outputs[i], buf);
  }
  manifest[name] = { file, source: hash };
  count.made++;
  console.log(`erzeugt: ${name}.avif, ${name}-tablet.avif, ${name}-mobile.avif`);
}

// Einträge gelöschter Vorlagen entfernen (die Ausgaben bleiben – Bilder löscht man bewusst von Hand)
for (const [name, entry] of Object.entries(manifest)) {
  if (!fs.existsSync(path.join(SRC, entry.file))) delete manifest[name];
}
const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
console.log(`Bilder: ${count.made} erzeugt, ${count.adopted} übernommen, ${count.skipped} unverändert – Manifest ${path.relative(root, MANIFEST)}`);
