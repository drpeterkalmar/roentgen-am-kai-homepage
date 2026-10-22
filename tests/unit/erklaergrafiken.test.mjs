// Erklärgrafiken A001–A006 (src/components/explainers): Nummern-Hook, Werte nur aus den Datendateien,
// keine gelben Platzhalter mehr, Texte als HTML.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { importJsx } from './_jsx.mjs';
import { SCREENING } from '../../src/data/screening.js';
import { RADIATION_EXAMPLES, RADIATION_BY_AREA } from '../../src/data/examinations.js';
import { ANIMATIONS } from '../../src/data/mediaPlan.js';

const html = async (file, props = {}) => {
  const { default: C } = await importJsx(`src/components/explainers/${file}.jsx`);
  return renderToString(createElement(C, props));
};
// Text ohne Tags/Kommentare, Leerraum vereinheitlicht
const text = (h) => h.replace(/<!--.*?-->/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\u2011/g, '-').replace(/\s+/g, ' ');

const CASES = [
  ['A001', 'ScreeningTimeline', {}],
  ['A002', 'TScoreScale', {}],
  ['A003', 'BodyComponents', {}],
  ['A004', 'XrayWay', {}],
  ['A005', 'RadiationComparison', { ids: RADIATION_BY_AREA.overview }],
  ['A006', 'DentalDimensions', {}],
];

test('Erklärgrafiken: jede A-Nummer umgesetzt, mit data-media-id, Titel und Hinweis „Schematische Darstellung“ (außer Ablauf A004)', async () => {
  for (const [id, file, props] of CASES) {
    assert.ok(ANIMATIONS[id].done, `${id}: done in mediaPlan.js`);
    const h = await html(file, props);
    assert.match(h, new RegExp(`data-media-id="${id}"`), id);
    assert.match(h, new RegExp(`data-explainer="${id}"`), id);
    assert.doesNotMatch(h, /data-animation-placeholder|Grafik in Entwicklung/, id);
    const t = text(h);
    assert.ok(t.includes(ANIMATIONS[id].title), `${id}: Titel`);
    if (id !== 'A004') assert.ok(t.includes('Schematische Darstellung'), `${id}: Hinweis`); // A004 = Ablauf, kein Schema
    // Zeichnungen sind dekorativ: jedes <svg> aria-hidden
    for (const svg of h.match(/<svg[^>]*>/g) || []) assert.match(svg, /aria-hidden="true"/, `${id}: svg aria-hidden`);
  }
});

test('A001: Altersgrenzen, Intervall und Serviceline aus screening.js', async () => {
  const t = text(await html('ScreeningTimeline'));
  const young = SCREENING.optIn.find((g) => g.id === 'jung');
  const old = SCREENING.optIn.find((g) => g.id === 'alt');
  assert.ok(t.includes(`${SCREENING.ageFrom}–${SCREENING.ageTo} Jahre`));
  assert.ok(t.includes(`${young.from}–${young.to} Jahre`) && young.label.includes(`${young.from} und ${young.to}`));
  assert.ok(t.includes(`ab ${old.from} Jahren`) && old.label.includes(`ab ${old.from}`));
  assert.ok(t.includes(`alle ${SCREENING.intervalWord} Jahre`));
  assert.ok(t.includes(SCREENING.serviceline.display) && t.includes('Ohne ärztliche Zuweisung'));
  // ein Punkt je möglichem Termin
  const dots = (await html('ScreeningTimeline')).match(/data-visit=""/g).length;
  assert.equal(dots, Math.floor((SCREENING.ageTo - SCREENING.ageFrom) / SCREENING.intervalYears) + 1);
});

test('A002: nur die WHO-Grenzwerte −1 und −2,5 der Seite', async () => {
  const t = text(await html('TScoreScale'));
  for (const s of ['T-Score bis −1', 'T-Score zwischen −1 und −2,5', 'T-Score ab −2,5', 'Osteopenie', 'Osteoporose']) assert.ok(t.includes(s), s);
  const nums = [...t.matchAll(/[−-]\d+(,\d+)?/g)].map((m) => m[0].replace('-', '−'));
  assert.deepEqual([...new Set(nums)].sort(), ['−1', '−2,5']);
});

test('A003: drei Bestandteile + „Magermasse ist nicht gleich Muskelmasse“, keine Zahlen', async () => {
  const t = text(await html('BodyComponents'));
  for (const s of ['Fettmasse', 'Magere Weichteilmasse', 'Knochenmineral', 'Magermasse ist nicht gleich Muskelmasse', 'Muskelkraft und Muskelqualität werden nicht direkt gemessen']) assert.ok(t.includes(s), s);
  assert.doesNotMatch(t, /\d+\s?%|\d+\s?kg/);
});

test('A004: vier Schritte in der vorgegebenen Reihenfolge', async () => {
  const t = text(await html('XrayWay'));
  const order = ['Zuweisung und e-card', 'Anmeldung', 'Aufnahme', 'Befund und Bilder'].map((s) => t.indexOf(s));
  assert.ok(order.every((i, k) => i >= 0 && (k === 0 || i > order[k - 1])), String(order));
  assert.equal((t.match(/Schritt \d/g) || []).length, 4);
});

test('A005: Zahlen der Grafik = Zahlen im Text von RADIATION_EXAMPLES; Auswahl je Seite', async () => {
  const de = (n) => String(n).replace('.', ',');
  for (const e of RADIATION_EXAMPLES) {
    assert.ok(e.text.includes(`${e.below ? 'unter' : 'etwa'} ${de(e.mSv)} mSv`), `${e.id}: mSv`);
    assert.ok(e.text.includes(`${de(e.days)} Tagen`), `${e.id}: Tage`);
  }
  for (const [area, ids] of Object.entries({ roentgen: RADIATION_BY_AREA.roentgen, overview: RADIATION_BY_AREA.overview })) {
    const t = text(await html('RadiationComparison', { ids }));
    for (const e of RADIATION_EXAMPLES) assert.equal(t.includes(e.label), ids.includes(e.id), `${area}: ${e.id}`);
    assert.ok(t.includes('logarithmische Skala'));
  }
});

test('A006: Fläche (2D) und Volumen (3D), Verweis auf die Zuweisung', async () => {
  const t = text(await html('DentalDimensions'));
  for (const s of ['2D', '3D', 'Eine Fläche', 'Ein Volumen', 'Panoramaröntgen', 'legt Ihre Zuweisung fest']) assert.ok(t.includes(s), s);
});
