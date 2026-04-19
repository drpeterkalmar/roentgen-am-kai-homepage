import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const FILES_TO_CHECK = [
  path.join(ROOT_DIR, 'index.html'),
  ...getAllFiles(SRC_DIR)
];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

function migrate() {
  const extensionsToReplace = /\.(webp|jpg|jpeg|png)(?=['"]|\s|>|$)/gi;

  FILES_TO_CHECK.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    
    // Only process text files
    const ext = path.extname(filePath);
    if (!['.jsx', '.js', '.css', '.html'].includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    if (extensionsToReplace.test(content)) {
      console.log(`Updating extensions in ${path.relative(ROOT_DIR, filePath)}...`);
      const newContent = content.replace(extensionsToReplace, '.avif');
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
  });

  console.log('Extension migration complete!');
}

migrate();
