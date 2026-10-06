// P1-4: Teamseiten – sichtbares Porträt und Person-Schema zeigen dasselbe Foto (Quelle: src/data/team.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { importJsx } from './_jsx.mjs';
import { TEAM, TEAM_PHOTOS } from '../../src/data/team.js';
import { routes } from '../../src/data/routes.js';

const PAGES = { kalmar: 'src/pages/KalmarPage.jsx', riegler: 'src/pages/RieglerPage.jsx' };
const unescape = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&');

for (const [id, file] of Object.entries(PAGES)) {
  test(`Teamseite ${id}: Schema-Bild = sichtbares Bild = team.js`, async () => {
    const doctor = TEAM[id];
    const { default: Page } = await importJsx(file);
    const html = renderToString(createElement(StaticRouter, { location: doctor.path }, createElement(Page)));
    const visible = html.match(/<img[^>]*\ssrc="[^"]*\/assets\/images\/([^"/]+)\.avif"/)?.[1];
    const ld = JSON.parse(unescape(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]));
    const schema = ld.image.match(/\/assets\/images\/([^/]+)\.avif$/)?.[1];
    assert.equal(visible, doctor.photo.name, 'sichtbares Bild');
    assert.equal(schema, visible, 'Person-Schema-Bild');
    assert.equal(ld['@type'], 'Person');
    assert.equal(ld.name, doctor.name);
    assert.match(html, new RegExp(`<img[^>]*alt="${doctor.photo.alt}"`), 'Alt-Text aus team.js');
  });
}

test('team.js: Pfade sind Routen, alle Bildgrößen vorhanden', () => {
  for (const d of Object.values(TEAM)) {
    assert.ok(routes.some((r) => r.path === d.path), d.path);
    assert.equal(d.path, `/unser-team/${d.slug}`);
  }
  for (const photo of [...Object.values(TEAM).map((d) => d.photo), ...Object.values(TEAM_PHOTOS)]) {
    for (const v of ['', '-tablet', '-mobile']) {
      assert.ok(existsSync(new URL(`../../public/assets/images/${photo.name}${v}.avif`, import.meta.url)), `${photo.name}${v}.avif`);
    }
    assert.ok(photo.alt && photo.width && photo.height, photo.name);
  }
});
