// Herkunft (?quelle=gads-…) an Links zur eigenen Online-Buchung durchreichen – ohne Speicherung (src/lib/quelleDurchreichen.js)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { quelleAus, mitQuelle } from '../../src/lib/quelleDurchreichen.js';

test('quelleAus: nur [a-z0-9-]{1,40}, sonst leer', () => {
  assert.equal(quelleAus('?quelle=gads-knochendichte'), 'gads-knochendichte');
  assert.equal(quelleAus('?x=1&quelle=GADS-Brust'), 'gads-brust');
  assert.equal(quelleAus(''), '');
  assert.equal(quelleAus('?quelle='), '');
  assert.equal(quelleAus('?quelle=gads_brust'), '');
  assert.equal(quelleAus('?quelle=%22%3E%3Cscript%3E'), '');
  assert.equal(quelleAus(`?quelle=${'a'.repeat(41)}`), '');
});

test('mitQuelle: hängt nur an Links zu termin.roentgen-am-kai.at an', () => {
  assert.equal(mitQuelle('https://termin.roentgen-am-kai.at/buchen/dexa?art=knochendichte', 'gads-knochendichte'),
    'https://termin.roentgen-am-kai.at/buchen/dexa?art=knochendichte&quelle=gads-knochendichte');
  assert.equal(mitQuelle('https://termin.roentgen-am-kai.at', 'gads-brust'),
    'https://termin.roentgen-am-kai.at/?quelle=gads-brust');
  const mira = 'https://patient-portal.miranext.ai/patient-booking?c_Id=23';
  assert.equal(mitQuelle(mira, 'gads-brust'), mira);
  assert.equal(mitQuelle('tel:+433168409050', 'gads-brust'), 'tel:+433168409050');
  const eigenes = 'https://termin.roentgen-am-kai.at/buchen/mammographie?quelle=flyer';
  assert.equal(mitQuelle(eigenes, 'gads-brust'), eigenes);
  assert.equal(mitQuelle('https://termin.roentgen-am-kai.at/', ''), 'https://termin.roentgen-am-kai.at/');
  assert.equal(mitQuelle('https://termin.roentgen-am-kai.at/', '<x>'), 'https://termin.roentgen-am-kai.at/');
});

test('kein Speicher, kein Cookie im Modul', () => {
  const code = readFileSync(new URL('../../src/lib/quelleDurchreichen.js', import.meta.url), 'utf8')
    .split('\n').filter((z) => !z.trim().startsWith('//')).join('\n');
  assert.doesNotMatch(code, /document\.cookie|localStorage|sessionStorage|fetch\(|sendBeacon/);
});
