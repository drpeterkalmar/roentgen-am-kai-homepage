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

// P2-14: Das Inline-Skript in index.html setzt die Klasse 'dark' vor dem ersten Bild – nach derselben Regel
// wie readTheme()/prefersDark() (gespeicherte Wahl, sonst Systemeinstellung; gesperrter Speicher → System).
test('index.html: Dunkelmodus-Inline-Skript folgt derselben Regel wie storage.js', async () => {
  const { readFileSync } = await import('node:fs');
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
  const code = html.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
  assert.ok(code && code.includes("localStorage.getItem('theme')"), 'Inline-Skript nicht gefunden');
  const run = (storage, systemDark) => {
    const classes = new Set();
    const document = { documentElement: { classList: { add: (c) => classes.add(c) } } };
    const matchMedia = (q) => ({ matches: systemDark && q === '(prefers-color-scheme: dark)' });
    new Function('localStorage', 'matchMedia', 'document', code)(storage, matchMedia, document);
    return classes.has('dark');
  };
  const blocked = { getItem() { throw securityError(); } };
  const cases = [[null, false], [null, true], ['dark', false], ['light', true], ['irgendwas', true], [blocked, true], [blocked, false]];
  for (const [saved, systemDark] of cases) {
    const storage = saved && typeof saved === 'object' ? saved : { getItem: () => saved };
    setStorage({ value: storage });
    globalThis.matchMedia = (q) => ({ matches: systemDark && q === '(prefers-color-scheme: dark)' });
    const theme = readTheme();
    const expected = theme ? theme === 'dark' : prefersDark();
    assert.equal(run(storage, systemDark), expected, `gespeichert=${typeof saved === 'string' ? saved : saved ? 'gesperrt' : 'nichts'}, System dunkel=${systemDark}`);
  }
});
