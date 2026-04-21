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
  let totalSkipped = 0;
  let totalProcessed = 0;

  for (const IMAGES_DIR of DIRS_TO_OPTIMIZE) {
    if (!fs.existsSync(IMAGES_DIR)) {
      continue;
    }

    const files = fs.readdirSync(IMAGES_DIR);
    console.log(`Scanning ${files.length} files in ${IMAGES_DIR}...`);

    const imagePromises = files.map(async (file) => {
      const ext = path.extname(file).toLowerCase();
      
      // Skip already processed variants, logos, or specific icons to avoid build issues
      if (!SUPPORTED_FORMATS.includes(ext) || file.includes('-mobile') || file.includes('-tablet') || file.includes('logo')) {
        return;
      }

      const inputPath = path.join(IMAGES_DIR, file);
      const baseName = path.basename(file, ext);
      
      const desktopOutputPath = path.join(IMAGES_DIR, baseName + '.avif');
      const tabletOutputPath = path.join(IMAGES_DIR, baseName + '-tablet.avif');
      const mobileOutputPath = path.join(IMAGES_DIR, baseName + '-mobile.avif');

      // --- Cache Check ---
      let shouldSkip = false;
      if (fs.existsSync(tabletOutputPath) && fs.existsSync(mobileOutputPath)) {
        const inputStat = fs.statSync(inputPath);
        const tabletStat = fs.statSync(tabletOutputPath);
        const mobileStat = fs.statSync(mobileOutputPath);
        
        let desktopUpToDate = true;
        if (ext !== '.avif') {
           if (fs.existsSync(desktopOutputPath)) {
             const desktopStat = fs.statSync(desktopOutputPath);
             if (desktopStat.mtimeMs < inputStat.mtimeMs) {
                desktopUpToDate = false;
             }
           } else {
             desktopUpToDate = false;
           }
        }

        // Allow 1000ms difference due to FS precision
        if (desktopUpToDate && tabletStat.mtimeMs >= inputStat.mtimeMs - 1000 && mobileStat.mtimeMs >= inputStat.mtimeMs - 1000) {
           shouldSkip = true;
        }
      }

      if (shouldSkip) {
        totalSkipped++;
        return;
      }
      
      try {
        totalProcessed++;
        console.log(`Processing ${file}...`);
        
        // Read into buffer to avoid "same file" errors during processing
        const inputBuffer = await fs.promises.readFile(inputPath);
        
        // Process images concurrently
        const sharpPromises = [
          // 1. Desktop Tier (1920px)
          sharp(inputBuffer)
            .resize(1920, null, { withoutEnlargement: true })
            .avif({ quality: 50 })
            .toBuffer()
            .then(buf => fs.promises.writeFile(desktopOutputPath, buf)),
            
          // 2. Tablet Tier (1200px)
          sharp(inputBuffer)
            .resize(1200, null, { withoutEnlargement: true })
            .avif({ quality: 45 })
            .toFile(tabletOutputPath),
            
          // 3. Mobile Tier (800px)
          sharp(inputBuffer)
            .resize(800, null, { withoutEnlargement: true })
            .avif({ quality: 40 })
            .toFile(mobileOutputPath)
        ];

        await Promise.all(sharpPromises);

        // 4. Cleanup original if it was not an AVIF
        if (ext !== '.avif') {
          await fs.promises.unlink(inputPath);
        }

      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    });

    await Promise.all(imagePromises);
  }
  
  console.log(`\nOverall optimization complete!`);
  console.log(`✅ Processed: ${totalProcessed}`);
  console.log(`⏭️  Skipped:   ${totalSkipped}`);
}

optimizeImages();
