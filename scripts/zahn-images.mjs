// Zahnröntgen/DVT-Erklärgrafik (A006): Blender-Render assets-src/zahn/dvt-volumen.png → public/assets/zahn
// als AVIF + WebP in 800/1200/1600 px Breite. Aufruf: npm run images:zahn (lokal, Ergebnis wird eingecheckt).
// Render neu erzeugen: Blender -b -P assets-src/zahn/render_dvt.py -- <roh.png> 256, dann
// python3 assets-src/zahn/composite.py <roh.png> assets-src/zahn/dvt-volumen.png
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets-src/zahn');
const OUT = path.join(root, 'public/assets/zahn');
export const ZAHN_WIDTHS = [800, 1200, 1600];
fs.mkdirSync(OUT, { recursive: true });

for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith('.png'))) {
  const name = path.basename(file, '.png');
  const input = fs.readFileSync(path.join(SRC, file));
  for (const w of ZAHN_WIDTHS) {
    const img = sharp(input).resize(w, null, { withoutEnlargement: true });
    fs.writeFileSync(path.join(OUT, `${name}-${w}.avif`), await img.clone().avif({ quality: 62, effort: 6 }).toBuffer());
    fs.writeFileSync(path.join(OUT, `${name}-${w}.webp`), await img.clone().webp({ quality: 82 }).toBuffer());
  }
  console.log(`zahn: ${name}`);
}
