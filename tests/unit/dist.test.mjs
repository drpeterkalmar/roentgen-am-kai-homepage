// Prüft die Build-Ausgabe (dist/ aus npm run build). Läuft nur, wenn dist/ existiert – sonst übersprungen
// (in GitHub Actions laufen die Unit-Tests vor dem Build).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes, fullTitle, SITE_URL, LEGACY_REDIRECTS } from '../../src/data/routes.js';
import { schemasFor } from '../../src/data/schema.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dist = path.join(root, 'dist');
const skip = existsSync(path.join(dist, 'index.html')) ? false : 'dist/ fehlt – vorher npm run build';
const read = (rel) => readFileSync(path.join(dist, rel), 'utf8');
const htmlFiles = () => (skip ? [] : readdirSync(dist, { recursive: true }).filter((f) => f.endsWith('.html')));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

test('dist: jede Route hat eine eigene HTML-Datei mit Titel und Canonical (plus <route>.html)', { skip }, () => {
  for (const r of routes) {
    const rel = r.path === '/' ? 'index.html' : `${r.path.slice(1)}/index.html`;
    const html = read(rel);
    assert.ok(html.includes(`<title>${esc(fullTitle(r))}</title>`), `${r.path}: <title>`);
    assert.ok(html.includes(`<link rel="canonical" href="${SITE_URL}${r.path === '/' ? '/' : r.path}"`), `${r.path}: canonical`);
    if (r.path !== '/') assert.equal(read(`${r.path.slice(1)}.html`), html, `${r.path}.html = ${rel}`);
  }
});

test('dist: strukturierte Daten im statischen HTML = schemasFor(route), genau ein MedicalBusiness je Seite', { skip }, () => {
  for (const r of routes) {
    const rel = r.path === '/' ? 'index.html' : `${r.path.slice(1)}/index.html`;
    const head = read(rel).split('</head>')[0];
    const lds = [...head.matchAll(/<script type="application\/ld\+json" data-schema>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    assert.deepEqual(lds, schemasFor(r), `${r.path}: JSON-LD im HTML`);
    assert.equal(lds.filter((x) => x['@type'] === 'MedicalBusiness').length, 1, `${r.path}: MedicalBusiness`);
  }
});

test('dist: Sitemap enthält genau die indexierbaren Routen', { skip }, () => {
  const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const want = routes.filter((r) => !r.noindex).map((r) => SITE_URL + (r.path === '/' ? '/' : r.path));
  assert.deepEqual([...locs].sort(), [...want].sort());
});

test('dist: Sitemap-lastmod = letzte Änderung der Seitendatei (git), Artikel mit eigenem Datum', { skip }, async () => {
  const { execFileSync } = await import('node:child_process');
  const sm = read('sitemap.xml');
  for (const r of routes.filter((x) => !x.noindex)) {
    const loc = SITE_URL + (r.path === '/' ? '/' : r.path);
    const lastmod = sm.match(new RegExp(`<loc>${loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc><lastmod>([^<]+)</lastmod>`))?.[1];
    assert.match(lastmod ?? '', /^\d{4}-\d{2}-\d{2}$/, r.path);
    let git = '';
    try { git = execFileSync('git', ['log', '-1', '--format=%cs', '--', `src/pages/${r.page}.jsx`], { cwd: root, encoding: 'utf8' }).trim(); } catch { /* ohne git */ }
    if (r.lastmod) assert.equal(lastmod, r.lastmod, `${r.path}: Artikeldatum`);
    else if (git) assert.equal(lastmod, git, `${r.path}: git-Datum der Seitendatei`);
  }
});

test('dist: alte Adressen leiten per Meta-Refresh weiter', { skip }, () => {
  for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
    const html = read(`${from.slice(1)}/index.html`);
    assert.match(html, /http-equiv="refresh"/, from);
    assert.ok(html.includes(`${to}"></head>`), `${from} → ${to}`);
    assert.ok(html.includes(`<link rel="canonical" href="${SITE_URL}${to.split('#')[0] || '/'}">`), `${from}: canonical`);
    assert.equal(read(`${from.slice(1)}.html`), html, `${from}.html`);
    assert.ok(!routes.some((r) => r.path === from), `${from} ist zugleich echte Route`);
  }
});

test('dist: 404.html mit noindex, Startseiten-Link und Telefon', { skip }, () => {
  const html = read('404.html');
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.match(html, /Zur Startseite/);
  assert.ok(html.includes('href="tel:+43' + '3168409050"'));
});

// Build-Variante aus dem SSR-Bundle desselben Builds (gleicher Modus wie der Client-Build)
const ssrEntry = path.join(root, 'dist-ssr/entry-server.js');
const variant = !skip && existsSync(ssrEntry) ? await import(ssrEntry) : null;

test('dist: Release-Build ohne „Interner Platzhalter“ (HTML und JavaScript), Staging-Build mit', { skip: skip || (!variant && 'dist-ssr/ fehlt') }, () => {
  const files = [...htmlFiles(), ...readdirSync(path.join(dist, 'assets')).filter((f) => f.endsWith('.js')).map((f) => `assets/${f}`)];
  const hits = files.filter((f) => read(f).includes('Interner Platzhalter'));
  if (variant.SHOW_INTERNAL) assert.ok(hits.length > 0, 'Staging-Build: interne Platzhalter erwartet');
  else assert.deepEqual(hits, [], 'Release-Build enthält „Interner Platzhalter“');
});

test('dist-ssr: vorgerendert werden genau die prerender-Routen der Routentabelle', { skip: skip || (!variant && 'dist-ssr/ fehlt') }, () => {
  assert.deepEqual(Object.keys(variant.PAGES).sort(), routes.filter((r) => r.prerender).map((r) => r.path).sort());
});

test('dist: vorgerenderte Seiten enthalten den Seiteninhalt (Körpernavigator nur auf /roentgen-graz)', { skip }, () => {
  for (const r of routes.filter((x) => x.prerender)) {
    const html = read(`${r.path.slice(1)}/index.html`);
    assert.ok(html.includes('<main id="main"'), `${r.path}: kein vorgerendertes <main>`);
    // Hydration (main.jsx): Marker am äußeren Div, Suspense-Grenze wie in der App (AppShell)
    assert.ok(html.includes('<div id="root"><div data-prerendered="true"'), `${r.path}: data-prerendered fehlt`);
    assert.ok(html.includes('<!--$-->') && html.includes('<!--/$-->'), `${r.path}: Suspense-Marker fehlen`);
  }
  const nav = htmlFiles().filter((f) => f.endsWith('index.html') && read(f).includes('data-body-navigator'));
  assert.deepEqual(nav, ['roentgen-graz/index.html']);
});
