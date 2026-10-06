// P2-10: Strukturierte Daten aus einer DOM-freien Funktion (statisches HTML und Browser identisch).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { schemasFor, schemasForPath, jsonLd } from '../../src/data/schema.js';
import { routes, findRoute } from '../../src/data/routes.js';
import { faqData, faqSchemaItems } from '../../src/data/faqData.js';

const types = (schemas) => schemas.map((s) => s['@type']);

test('schemasFor: Knochendichte = MedicalBusiness, FAQPage, BreadcrumbList, MedicalWebPage', () => {
  const s = schemasFor(findRoute('/knochendichtemessung-graz'));
  assert.deepEqual([...types(s)].sort(), ['BreadcrumbList', 'FAQPage', 'MedicalBusiness', 'MedicalWebPage']);
  const faq = s.find((x) => x['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, faqSchemaItems(faqData.knochendichte).length);
});

test('schemasFor: je Route genau ein MedicalBusiness, FAQPage nur bei FAQ der Seite bzw. des Artikels', () => {
  for (const r of routes) {
    const t = types(schemasFor(r));
    assert.equal(t.filter((x) => x === 'MedicalBusiness').length, 1, r.path);
    if (t.includes('FAQPage')) assert.ok(r.faq || r.article, `${r.path}: FAQPage ohne sichtbare FAQ`);
    if (r.faq) assert.ok(t.includes('FAQPage'), `${r.path}: FAQPage fehlt`);
  }
  assert.deepEqual(types(schemasForPath('/gibt-es-nicht')), ['MedicalBusiness']);
  assert.deepEqual(types(schemasForPath('/koerperanalyse-graz/')), types(schemasFor(findRoute('/koerperanalyse-graz'))));
});

test('jsonLd: „<“ maskiert, Inhalt unverändert', () => {
  const x = { text: 'a </script> b' };
  assert.ok(!jsonLd(x).includes('<'));
  assert.deepEqual(JSON.parse(jsonLd(x)), x);
});
