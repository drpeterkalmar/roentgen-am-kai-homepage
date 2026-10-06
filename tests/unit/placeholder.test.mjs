// P2-4: Interne Platzhalter nur mit VITE_INTERNAL_NOTES=1 (Staging/Entwicklung), Praxis-Platzhalter immer.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { importJsx } from './_jsx.mjs';

const render = (mod, props, text) => renderToString(createElement(mod.default, props, text));

test('Placeholder: Release-Build (Variable nicht gesetzt) blendet interne Notizen aus', async () => {
  const mod = await importJsx('src/components/ui/Placeholder.jsx');
  assert.equal(mod.SHOW_INTERNAL, false);
  assert.equal(render(mod, { internal: true }, 'Praxis bestätigen'), '');
  const visible = render(mod, {}, 'Preis folgt');
  assert.match(visible, /data-placeholder="Preis folgt"/);
  assert.match(visible, /<strong[^>]*>Platzhalter:<\/strong>/);
});

test('Placeholder: Staging-Build (VITE_INTERNAL_NOTES=1) zeigt interne Notizen', async () => {
  const mod = await importJsx('src/components/ui/Placeholder.jsx', { VITE_INTERNAL_NOTES: '1' });
  assert.equal(mod.SHOW_INTERNAL, true);
  assert.match(render(mod, { internal: true }, 'Praxis bestätigen'), /<strong[^>]*>Interner Platzhalter:<\/strong>/);
  assert.match(render(mod, {}, 'Preis folgt'), /<strong[^>]*>Platzhalter:<\/strong>/);
});
