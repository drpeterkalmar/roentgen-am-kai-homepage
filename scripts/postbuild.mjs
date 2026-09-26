// Läuft nach `vite build` (npm run build). Erzeugt aus src/data/routes.js:
//   1. dist/<route>/index.html  – je Route eine echte Datei mit eigenem <title>, Description,
//      Canonical und OG-Tags. GitHub Pages liefert Unterseiten dadurch mit HTTP 200 statt 404
//      (vorher: jede Unterseite = 404 + JS-Umleitung auf die Startseite → für Google unsichtbar).
//   2. Weiterleitungsseiten für die alten HEROLD-URLs (Ranking bleibt beim Domain-Umzug erhalten).
//   3. dist/404.html, dist/sitemap.xml, dist/robots.txt – passend zu Basis-Pfad und Domain.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes, fullTitle, SITE_URL } from '../src/data/routes.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const base = process.env.BASE_PATH || '/roentgen-am-kai-homepage/';
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const urlFor = (p) => SITE_URL + (p === '/' ? '/' : p);

const replaceOnce = (html, re, value, label) => {
  if (!re.test(html)) throw new Error(`postbuild: Platzhalter nicht gefunden: ${label}`);
  return html.replace(re, value);
};

const renderRoute = (route) => {
  const title = esc(fullTitle(route));
  const desc = esc(route.description);
  const url = urlFor(route.path);
  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, 'title');
  html = replaceOnce(html, /(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`, 'description');
  html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`, 'og:title');
  html = replaceOnce(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`, 'og:description');
  html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, 'og:url');
  html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, 'canonical');
  if (route.path !== '/') {
    // Unterseiten: kein Startseiten-Titelbild vorladen, statt Startseiten-Skelett den Seitentitel zeigen
    html = replaceOnce(html, /\s*<!-- identisch zu srcset[\s\S]*?imagesizes="[^"]*">/, '', 'hero-preload');
    html = replaceOnce(html, /<div id="root">[\s\S]*<\/div>(\s*<\/body>)/,
      `<div id="root"><main style="padding:160px 24px 48px;max-width:800px;margin:0 auto">`
      + `<h1 class="lcp-text" style="font-size:2.5rem;line-height:1.1;margin:0 0 16px">${esc(route.title)}</h1>`
      + `<p style="font-size:1.125rem;color:#4b5563;margin:0">${desc}</p></main></div>$1`, 'skeleton');
  }
  return html;
};

let written = 0;
for (const route of routes) {
  const html = renderRoute(route);
  const out = route.path === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, route.path.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  written++;
  // Zusätzlich <route>.html: GitHub Pages liefert /foo dann direkt (200) statt 301 → /foo/.
  // So bleiben die URLs identisch mit den bisherigen HEROLD-URLs (ohne Schrägstrich).
  if (route.path !== '/') {
    fs.writeFileSync(path.join(dist, route.path.replace(/^\//, '') + '.html'), html);
    written++;
  }
}

// Alte HEROLD-Pfade → neue Seiten. GitHub Pages kann kein 301; Meta-Refresh 0 s + Canonical
// wertet Google als permanente Weiterleitung.
const legacy = {
  '/unser-angebot': '/#services',
  '/unser-angebot/digitales-roentgen': '/unser-angebot/roentgen',
  '/unser-angebot/digitales-roentgen/lungenroentgen': '/unser-angebot/roentgen',
  '/unser-angebot/digitales-roentgen/wirbelsaeulenroentgen': '/unser-angebot/roentgen',
  '/unser-angebot/digitales-roentgen/roentgen-nach-unfall': '/unser-angebot/roentgen',
  '/unser-angebot/mammographie/mammascreening': '/unser-angebot/mammographie',
  '/datenschutzerklarung': '/datenschutz',
};
for (const [from, to] of Object.entries(legacy)) {
  const target = base.replace(/\/$/, '') + to;
  const canonical = urlFor(to.split('#')[0] || '/');
  const html = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Weiterleitung – Röntgen am Kai</title>`
    + `<link rel="canonical" href="${canonical}">`
    + `<meta http-equiv="refresh" content="0; url=${target}"></head>`
    + `<body><p>Diese Seite ist umgezogen: <a href="${target}">weiter</a></p></body></html>`;
  const out = path.join(dist, from.replace(/^\//, ''), 'index.html');
  if (fs.existsSync(out)) throw new Error(`postbuild: Legacy-Pfad kollidiert mit echter Route: ${from}`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  fs.writeFileSync(path.join(dist, from.replace(/^\//, '') + '.html'), html);
  written += 2;
}

// Unbekannte Pfade: echte 404 mit Weg zurück (kein stilles Umleiten mehr).
fs.writeFileSync(path.join(dist, '404.html'),
  `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">`
  + `<meta name="robots" content="noindex"><title>Seite nicht gefunden – Röntgen am Kai</title>`
  + `<style>body{font-family:system-ui,sans-serif;background:#f8fafc;color:#111827;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:24px}`
  + `a{display:inline-block;margin-top:16px;background:#8B2323;color:#fff;padding:14px 28px;border-radius:16px;text-decoration:none;font-weight:700}</style></head>`
  + `<body><main><h1>Seite nicht gefunden</h1><p>Diese Adresse gibt es auf unserer Website nicht (mehr).</p>`
  + `<a href="${base}">Zur Startseite</a><p style="margin-top:24px">Termine: <a style="background:none;color:#8B2323;padding:0;margin:0" href="tel:+433168409050">0316 840 90 50</a></p></main></body></html>`);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + routes.map((r) => `  <url><loc>${urlFor(r.path)}</loc><lastmod>${today}</lastmod>`
    + `<changefreq>${r.changefreq || 'monthly'}</changefreq><priority>${r.priority}</priority></url>`).join('\n')
  + `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`postbuild: ${routes.length} Routen + ${Object.keys(legacy).length} Weiterleitungen (${written} Dateien), 404.html, sitemap.xml, robots.txt – base ${base}`);
