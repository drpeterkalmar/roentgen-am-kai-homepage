// P3-8 und P3-9: eindeutige SVG-IDs im DEXA-Schema, konsistente Sortierung im Ratgeber.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement, Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { importJsx } from './_jsx.mjs';
import { ARTICLES, byArticleOrder } from '../../src/data/ratgeber.js';

test('DEXA-Schema: zwei Figuren desselben Modus haben verschiedene IDs, url(#…) verweist auf vorhandene IDs', async () => {
  const { default: DexaScanFigure } = await importJsx('src/components/DexaScanFigure.jsx');
  const html = renderToString(createElement(Fragment, null, createElement(DexaScanFigure, { mode: 'bone' }), createElement(DexaScanFigure, { mode: 'bone' })));
  const clips = [...html.matchAll(/<clipPath id="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(clips.length, 2);
  assert.notEqual(clips[0], clips[1]);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, ref] of html.matchAll(/url\(#([^)]+)\)/g)) assert.ok(ids.has(ref), `url(#${ref}) ohne Ziel`);
  for (const [, refs] of html.matchAll(/aria-labelledby="([^"]+)"/g)) for (const r of refs.split(' ')) assert.ok(ids.has(r), r);
});

test('Ratgeber-Sortierung: ohne Datum zuerst (nach Titel), dann neueste zuerst, Gleichstand nach Titel', () => {
  const x = [
    { title: 'B alt', datePublished: '2026-01-01' },
    { title: 'Z ohne', datePublished: null },
    { title: 'A neu', datePublished: '2026-05-01' },
    { title: 'A ohne', datePublished: null },
    { title: 'A alt', datePublished: '2026-01-01' },
  ];
  assert.deepEqual([...x].sort(byArticleOrder).map((a) => a.title), ['A ohne', 'Z ohne', 'A neu', 'A alt', 'B alt']);
  for (const a of x) for (const b of x) assert.ok(Math.sign(byArticleOrder(a, b)) === -Math.sign(byArticleOrder(b, a)), `${a.title}/${b.title}`);
  assert.equal([...ARTICLES].sort(byArticleOrder)[0].slug, 'abnehmspritze-muskelverlust', 'Artikel in Vorbereitung bleibt zuerst');
});
