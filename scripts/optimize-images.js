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
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

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
    
    if (SUPPORTED_FORMATS.includes(ext)) {
      const inputPath = path.join(IMAGES_DIR, file);
      const outputName = path.basename(file, ext) + '.avif';
      const outputPath = path.join(IMAGES_DIR, outputName);

      try {
        console.log(`Converting ${file} to AVIF...`);
        
        let transform = sharp(inputPath);
        const metadata = await transform.metadata();

        // Resize if it's a huge hero image (> 1920px)
        if (metadata.width > 1920) {
          transform = transform.resize(1920);
        }

        await transform
          .avif({ quality: 70 })
          .toFile(outputPath);

        // Delete the original if conversion was successful and it's not the same name
        if (inputPath !== outputPath) {
          fs.unlinkSync(inputPath);
          console.log(`Original ${file} deleted.`);
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
