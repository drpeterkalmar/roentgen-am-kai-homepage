// P1-1: Fehlergrenze und automatischer Reload nach einem Deploy (Chunk weg).
// react-dom/server führt keine Fehlergrenzen aus (Server-Rendering bricht bei einem Fehler ab) – daher wird der
// Fehlerzustand über getDerivedStateFromError hergestellt und die Ausgabe von render() geprüft.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { importJsx } from './_jsx.mjs';
import { shouldAutoReload } from '../../src/lib/chunkReload.js';

const { default: ErrorBoundary } = await importJsx('src/components/ErrorBoundary.jsx');

const renderFailed = (props = {}) => {
  const b = new ErrorBoundary({ resetKey: '/a', ...props });
  b.state = { ...b.state, ...ErrorBoundary.getDerivedStateFromError(new Error('Failed to fetch dynamically imported module')) };
  return renderToString(b.render());
};

test('Fehlergrenze: ohne Fehler nur der Seiteninhalt', () => {
  const html = renderToString(createElement(ErrorBoundary, { resetKey: '/a' }, createElement('p', null, 'Seiteninhalt')));
  assert.equal(html, '<p>Seiteninhalt</p>');
});

test('Fehlergrenze: Fallback mit „Neu laden“, Startseite und Telefonnummer', () => {
  const html = renderFailed();
  assert.match(html, /<h1[^>]*>Diese Seite konnte nicht geladen werden<\/h1>/);
  assert.match(html, /<button type="button"[^>]*>.*Neu laden/);
  assert.ok(html.includes('href="tel:+43' + '3168409050"'), 'tel:-Link');
  assert.ok(html.includes('0316 840 90 50'), 'Telefonnummer sichtbar');
  assert.ok(html.includes('href="/roentgen-am-kai-homepage/"'), 'Link zur Startseite');
});

test('Fehlergrenze: Seitenwechsel (neuer resetKey) setzt den Fehler zurück', () => {
  assert.deepEqual(ErrorBoundary.getDerivedStateFromProps({ resetKey: '/b' }, { failed: true, resetKey: '/a' }), { failed: false, resetKey: '/b' });
  assert.equal(ErrorBoundary.getDerivedStateFromProps({ resetKey: '/a' }, { failed: true, resetKey: '/a' }), null);
});

const memoryStorage = () => {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) };
};

test('Chunk-Reload: höchstens einmal pro Minute', () => {
  const s = memoryStorage();
  const t0 = 1_000_000;
  assert.equal(shouldAutoReload(s, t0), true, 'erster Fehler → neu laden');
  assert.equal(shouldAutoReload(s, t0 + 30_000), false, 'erneut binnen einer Minute → Fehlergrenze');
  assert.equal(shouldAutoReload(s, t0 + 61_000), true, 'nach einer Minute wieder erlaubt');
});

test('Chunk-Reload: gesperrter Speicher → kein automatischer Reload (kein Schleifenrisiko)', () => {
  const blocked = { getItem: () => { throw new Error('SecurityError'); }, setItem: () => { throw new Error('SecurityError'); } };
  assert.equal(shouldAutoReload(blocked), false);
});
