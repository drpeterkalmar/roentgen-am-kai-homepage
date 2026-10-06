// Hilfsfunktion für Unit-Tests: lädt eine JSX-Datei aus src/ in Node.
// esbuild (kommt mit Vite) bündelt die Datei samt relativer Importe; npm-Pakete (react, react-router-dom,
// lucide-react) bleiben extern. import.meta.env wird wie im Vite-Build ersetzt; import.meta.glob (nur Vite)
// wird zu einem leeren Objekt – die Seiten selbst werden in diesen Tests nicht geladen.
import { build } from 'esbuild';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const cacheDir = path.join(root, 'node_modules/.cache/rak-unit');
let n = 0;

const viteGlobStub = {
  name: 'vite-glob-stub',
  setup(b) {
    b.onLoad({ filter: /\/src\/.*\.jsx?$/ }, (args) => {
      const src = readFileSync(args.path, 'utf8');
      if (!src.includes('import.meta.glob(')) return undefined;
      return { contents: src.replace(/import\.meta\.glob\([^)]*\)/g, '({})'), loader: args.path.endsWith('.jsx') ? 'jsx' : 'js' };
    });
  },
};

export const importJsx = async (rel, env = {}) => {
  mkdirSync(cacheDir, { recursive: true });
  const outfile = path.join(cacheDir, `${rel.replace(/[^a-z0-9]+/gi, '_')}-${process.pid}-${n++}.mjs`);
  await build({
    entryPoints: [path.join(root, rel)],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    jsx: 'automatic',
    packages: 'external',
    loader: { '.png': 'dataurl', '.avif': 'dataurl', '.woff2': 'empty', '.css': 'empty' },
    define: {
      'import.meta.env': JSON.stringify({ BASE_URL: '/roentgen-am-kai-homepage/', MODE: 'test', DEV: false, PROD: true, SSR: true, ...env }),
    },
    plugins: [viteGlobStub],
    logLevel: 'silent',
  });
  try {
    return await import(pathToFileURL(outfile).href);
  } finally {
    rmSync(outfile, { force: true });
  }
};
