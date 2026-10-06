// P1-2: Dunkelmodus-Startwert ohne Absturz, auch wenn der Browser-Speicher gesperrt ist
// (Safari mit „Alle Cookies blockieren“ wirft schon beim Zugriff auf localStorage einen SecurityError).
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readTheme, writeTheme, prefersDark } from '../../src/lib/storage.js';

const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const setStorage = (descriptor) => Object.defineProperty(globalThis, 'localStorage', { configurable: true, ...descriptor });
const securityError = () => Object.assign(new Error('The operation is insecure.'), { name: 'SecurityError' });

afterEach(() => {
  if (original) Object.defineProperty(globalThis, 'localStorage', original);
  else delete globalThis.localStorage;
  delete globalThis.matchMedia;
});

test('readTheme: gesperrter Speicher (Getter wirft SecurityError) → null, kein Fehler', () => {
  setStorage({ get() { throw securityError(); } });
  assert.equal(readTheme(), null);
  assert.doesNotThrow(() => writeTheme('dark'));
});

test('readTheme: getItem wirft → null', () => {
  setStorage({ value: { getItem() { throw securityError(); }, setItem() { throw securityError(); } } });
  assert.equal(readTheme(), null);
  assert.doesNotThrow(() => writeTheme('light'));
});

test('readTheme: gespeicherte Werte wie bisher (dark, light, leer; anderer Wert = hell)', () => {
  const store = new Map();
  setStorage({ value: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) } });
  assert.equal(readTheme(), null);
  writeTheme('dark');
  assert.equal(readTheme(), 'dark');
  writeTheme('light');
  assert.equal(readTheme(), 'light');
  store.set('theme', 'irgendwas');
  assert.equal(readTheme(), 'light');
});

test('prefersDark: ohne matchMedia hell, sonst Systemeinstellung', () => {
  assert.equal(prefersDark(), false);
  globalThis.matchMedia = (q) => ({ matches: q === '(prefers-color-scheme: dark)' });
  assert.equal(prefersDark(), true);
  globalThis.matchMedia = () => { throw new Error('kaputt'); };
  assert.equal(prefersDark(), false);
});
