import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIRS_TO_OPTIMIZE = [
  path.join(__dirname, '../public/assets/images'),
  path.join(__dirname, '../src/assets/images')
];
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

async function optimizeImages() {
  for (const IMAGES_DIR of DIRS_TO_OPTIMIZE) {
    if (!fs.existsSync(IMAGES_DIR)) {
      console.warn(`Directory not found: ${IMAGES_DIR}`);
      continue;
    }

    const files = fs.readdirSync(IMAGES_DIR);
    console.log(`Scanning ${files.length} files in ${IMAGES_DIR}...`);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      
      // Skip already processed variants to avoid infinite loops
      if (!SUPPORTED_FORMATS.includes(ext) || file.includes('-mobile') || file.includes('-tablet')) {
        continue;
      }

      try {
        const inputPath = path.join(IMAGES_DIR, file);
        const baseName = path.basename(file, ext);
        
        const desktopOutputPath = path.join(IMAGES_DIR, baseName + '.avif');
        const tabletOutputPath = path.join(IMAGES_DIR, baseName + '-tablet.avif');
        const mobileOutputPath = path.join(IMAGES_DIR, baseName + '-mobile.avif');

        console.log(`Processing ${file}...`);
        
        // Read into buffer to avoid "same file" errors during processing
        const inputBuffer = fs.readFileSync(inputPath);
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        // 1. Desktop Tier (1920px)
        await sharp(inputBuffer)
          .resize(1920, null, { withoutEnlargement: true })
          .avif({ quality: 50 })
          .toFile(desktopOutputPath + '.tmp');
        
        if (fs.existsSync(desktopOutputPath)) fs.unlinkSync(desktopOutputPath);
        fs.renameSync(desktopOutputPath + '.tmp', desktopOutputPath);

        // 2. Tablet Tier (1200px)
        await sharp(inputBuffer)
          .resize(1200, null, { withoutEnlargement: true })
          .avif({ quality: 45 })
          .toFile(tabletOutputPath);

        // 3. Mobile Tier (800px)
        await sharp(inputBuffer)
          .resize(800, null, { withoutEnlargement: true })
          .avif({ quality: 40 })
          .toFile(mobileOutputPath);

        // 4. Cleanup original if it was not an AVIF
        if (ext !== '.avif') {
          fs.unlinkSync(inputPath);
          console.log(`  - Original ${file} replaced by AVIF tiers.`);
        } else {
          console.log(`  - AVIF tiers generated/updated for ${file}.`);
        }

      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }
  console.log('Overall optimization complete!');
}

optimizeImages();
