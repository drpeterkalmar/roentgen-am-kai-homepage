// Router-Konfiguration (src/routes.jsx) aus der Routentabelle: jede Route zeigt ihre Seite, jede alte Adresse
// leitet per <Navigate> mit Anker weiter (Gutachten P2-11/P3-14), Unbekanntes → 404-Seite.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchRoutes, Navigate } from 'react-router-dom';
import { importJsx } from './_jsx.mjs';
import { routes, LEGACY_REDIRECTS } from '../../src/data/routes.js';

const { ROUTE_OBJECTS, pageFor } = await importJsx('src/routes.jsx');
const elementFor = (path) => matchRoutes(ROUTE_OBJECTS, path)?.at(-1)?.route.element;

test('App-Routen: jede Route der Tabelle zeigt ihre Seite', () => {
  for (const r of routes) {
    const el = elementFor(r.path);
    assert.ok(el, `${r.path}: keine App-Route`);
    assert.equal(el.type, pageFor(r.page), `${r.path}: falsche Seite`);
  }
});

test('App-Routen: alte Adressen leiten per <Navigate replace> weiter (mit Anker wie statisch)', () => {
  for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
    const el = elementFor(from);
    assert.equal(el?.type, Navigate, `${from}: keine Weiterleitung`);
    assert.equal(el.props.to, to, `${from}: Ziel`);
    assert.equal(el.props.replace, true, `${from}: replace`);
  }
  // weitere Unterseiten der alten Röntgen-Rubrik
  assert.equal(elementFor('/unser-angebot/digitales-roentgen/sonstwas').props.to, '/roentgen-graz');
});

test('App-Routen: unbekannte Adresse und unbekannter Ratgeber-Artikel', () => {
  assert.equal(elementFor('/gibt-es-nicht').type, pageFor('NotFoundPage'));
  assert.equal(elementFor('/ratgeber/gibt-es-nicht').type, pageFor('ArticlePage'), 'ArticlePage zeigt die 404-Seite');
});
