// KI-Ratgeber (Serie „Röntgen am K[AI]“): Vorlagen assets-src/ki → public/assets/ki.
// Berichte (Name ohne „logo-“): AVIF + WebP in 800/1200/1800 px Breite (<name>-<breite>.avif|webp) + Vorschau <name>-thumb.webp.
// Logos (logo-*.png, mit Transparenz): eine WebP- und eine PNG-Datei in Originalgröße.
// Aufruf: npm run images:ki (lokal, Ergebnis wird eingecheckt). Übersprungen wird per Inhalts-Hash (manifest.json).
// Datenschutz: Vorlagen sind bereits zugeschnitten (Kopfblock mit Personenangaben entfernt) – siehe src/data/kiSeries.js.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets-src/ki');
const OUT = path.join(root, 'public/assets/ki');
const MANIFEST = path.join(OUT, 'manifest.json');
export const KI_WIDTHS = [800, 1200, 1800];

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
fs.mkdirSync(OUT, { recursive: true });

for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith('.png')).sort()) {
  const name = path.basename(file, '.png');
  const input = fs.readFileSync(path.join(SRC, file));
  const hash = sha256(input);
  const logo = name.startsWith('logo-');
  const outputs = logo
    ? [path.join(OUT, `${name}.webp`), path.join(OUT, `${name}.png`)]
    : [...KI_WIDTHS.flatMap((w) => ['avif', 'webp'].map((ext) => path.join(OUT, `${name}-${w}.${ext}`))), path.join(OUT, `${name}-thumb.webp`)];
  if (manifest[name]?.source === hash && outputs.every((o) => fs.existsSync(o))) continue;
  const { width, height } = await sharp(input).metadata();
  if (logo) {
    fs.writeFileSync(path.join(OUT, `${name}.webp`), await sharp(input).webp({ quality: 90, alphaQuality: 100 }).toBuffer());
    fs.writeFileSync(path.join(OUT, `${name}.png`), await sharp(input).png({ compressionLevel: 9, palette: true }).toBuffer());
  } else {
    for (const w of KI_WIDTHS) {
      const img = sharp(input).resize(w, null, { withoutEnlargement: true });
      fs.writeFileSync(path.join(OUT, `${name}-${w}.avif`), await img.clone().avif({ quality: 60, chromaSubsampling: '4:4:4', effort: 6 }).toBuffer());
      fs.writeFileSync(path.join(OUT, `${name}-${w}.webp`), await img.clone().webp({ quality: 80, smartSubsample: true }).toBuffer());
    }
    fs.writeFileSync(path.join(OUT, `${name}-thumb.webp`), await sharp(input).resize(240, null).webp({ quality: 70 }).toBuffer());
  }
  manifest[name] = { file, source: hash, width, height };
  console.log(`ki: ${name} (${width}×${height})`);
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
