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
    
    if (SUPPORTED_FORMATS.includes(ext) && !file.includes('-mobile')) {
      try {
        const inputPath = path.join(IMAGES_DIR, file);
        const mobileOutputName = path.basename(file, ext) + '-mobile.avif';
        const mobileOutputPath = path.join(IMAGES_DIR, mobileOutputName);
        const desktopOutputName = path.basename(file, ext) + '.avif';
        const desktopOutputPath = path.join(IMAGES_DIR, desktopOutputName);

        console.log(`Processing ${file}...`);
        
        const transform = sharp(inputPath);
        const metadata = await transform.metadata();

        // 1. Generate Desktop Version (only if not already AVIF or if we want to re-process)
        if (ext !== '.avif' || inputPath !== desktopOutputPath) {
          console.log(`  - Generating desktop AVIF...`);
          let desktopTransform = sharp(inputPath);
          if (metadata.width > 1920) {
            desktopTransform = desktopTransform.resize(1920);
          }
          await desktopTransform
            .avif({ quality: 70 })
            .toFile(desktopOutputPath + '.tmp'); // Use tmp to avoid same-file error
          
          if (fs.existsSync(desktopOutputPath)) fs.unlinkSync(desktopOutputPath);
          fs.renameSync(desktopOutputPath + '.tmp', desktopOutputPath);
        }

        // 2. Generate Mobile Version (max 800px)
        if (!fs.existsSync(mobileOutputPath)) {
          console.log(`  - Generating mobile AVIF...`);
          let mobileTransform = sharp(inputPath);
          if (metadata.width > 800) {
            mobileTransform = mobileTransform.resize(800);
          }
          await mobileTransform
            .avif({ quality: 60 })
            .toFile(mobileOutputPath);
        }

        // 3. Delete original if it was not an AVIF
        if (ext !== '.avif') {
          fs.unlinkSync(inputPath);
          console.log(`  - Original ${file} deleted.`);
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
    }
  }

  console.log('Overall optimization complete!');
}

optimizeImages();
