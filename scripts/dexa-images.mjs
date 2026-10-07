// DEXA-Beispielbefunde: PNG-Vorlagen (assets-src/dexa) → Webdarstellungen in public/assets/dexa.
// Je Seite AVIF und WebP in 800/1200/1800/2400 px Breite (<name>-<breite>.avif|webp).
// Aufruf: npm run images:dexa – lokal, Ergebnis wird eingecheckt (wie scripts/optimize-images.js).
// - Text muss scharf bleiben: AVIF mit 4:4:4-Farbauflösung (keine Farbunterabtastung), WebP mit hoher Qualität.
// - Übersprungen wird per Inhalts-Hash der Vorlage (public/assets/dexa/manifest.json).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets-src/dexa');
const OUT = path.join(root, 'public/assets/dexa');
const MANIFEST = path.join(OUT, 'manifest.json');
export const DEXA_WIDTHS = [800, 1200, 1800, 2400];

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
fs.mkdirSync(OUT, { recursive: true });

for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith('.png')).sort()) {
  const name = path.basename(file, '.png');
  const input = fs.readFileSync(path.join(SRC, file));
  const hash = sha256(input);
  const outputs = DEXA_WIDTHS.flatMap((w) => ['avif', 'webp'].map((ext) => path.join(OUT, `${name}-${w}.${ext}`)));
  if (manifest[name]?.source === hash && outputs.every((o) => fs.existsSync(o))) continue;
  const { width, height } = await sharp(input).metadata();
  for (const w of DEXA_WIDTHS) {
    const img = sharp(input).resize(w, null, { withoutEnlargement: true });
    fs.writeFileSync(path.join(OUT, `${name}-${w}.avif`), await img.clone().avif({ quality: 62, chromaSubsampling: '4:4:4', effort: 6 }).toBuffer());
    fs.writeFileSync(path.join(OUT, `${name}-${w}.webp`), await img.clone().webp({ quality: 82, smartSubsample: true }).toBuffer());
  }
  manifest[name] = { file, source: hash, width, height };
  console.log(`erzeugt: ${name} (${width}×${height})`);
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
