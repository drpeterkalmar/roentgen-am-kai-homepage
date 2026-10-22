// Kontaktseite: Hinweis „Termin absagen“ (Ausfallgebühr, Entscheidung der Praxis 22.10.2026) – Text aus practice.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { importJsx } from './_jsx.mjs';
import { CANCELLATION, PHONE_HREF } from '../../src/data/practice.js';

const text = (html) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;|\u00A0/g, ' ').replace(/<!-- -->/g, '').replace(/\s+/g, ' ');

test('Kontaktseite: Abschnitt „Termin absagen“ mit 24 Stunden, 50 Euro und tel:-Link der Praxis', async () => {
  const { default: Page } = await importJsx('src/pages/KontaktPage.jsx');
  const html = renderToString(createElement(StaticRouter, { location: '/kontakt' }, createElement(Page)));
  const block = html.match(/<section[^>]*aria-labelledby="k-absage"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(block, 'Abschnitt mit aria-labelledby="k-absage" fehlt');
  assert.match(block, /<h2[^>]*id="k-absage"[^>]*>Termin absagen<\/h2>/);
  const t = text(block);
  for (const w of ['24 Stunden', '50 Euro', 'ABSAGE', 'Erinnerungs-SMS', 'Ausfallgebühr']) assert.ok(t.includes(w), w);
  const tels = [...block.matchAll(/href="(tel:[^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(tels, [PHONE_HREF], 'genau ein tel:-Link = Praxisnummer');
  assert.match(block, /<a[^>]*href="tel:[^"]+"[^>]*class="[^"]*whitespace-nowrap/, 'Telefonnummer bricht nicht um');
  assert.ok(!/uppercase/.test(block), 'ABSAGE steht im Text, kein CSS-uppercase');
});

test('practice.js: Absagetext enthält den freigegebenen Wortlaut', () => {
  assert.equal(CANCELLATION.title, 'Termin absagen');
  assert.ok(text(CANCELLATION.beforePhone).endsWith('spätestens 24 Stunden vorher ab – telefonisch unter'));
  assert.ok(text(CANCELLATION.afterPhone).startsWith('oder mit der Antwort ABSAGE auf unsere Erinnerungs-SMS.'));
  assert.ok(text(CANCELLATION.afterPhone).endsWith('verrechnen wir eine Ausfallgebühr von 50 Euro.'));
});
