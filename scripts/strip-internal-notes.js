// Vite-Plugin: Interne Praxis-Notizen nicht ins öffentliche Bundle (Gutachten P3-11).
// Im Release-Build (ohne VITE_INTERNAL_NOTES=1) entfernt es aus src/data die Objektfelder
//   review – Freigabe-Notizen an FAQ-Einträgen und Ratgeber-Artikeln
//   device – nur in bodyComposition.js (BODY.device = Gerätebezeichnung, „nur intern“)
// Staging behält sie (interne Platzhalter zeigen z. B. die Freigabe-Notiz der Ratgeber-Artikel).
// Die Daten selbst bleiben unverändert; Node (postbuild, Tests) liest weiter die vollständigen Dateien.
import path from 'node:path';

const FIELDS = [
  { file: /\/src\/data\/[^/]+\.js$/, keys: ['review'] },
  { file: /\/src\/data\/bodyComposition\.js$/, keys: ['device'] },
];

const walk = (node, visit) => {
  if (!node || typeof node.type !== 'string') return;
  visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((v) => walk(v, visit));
    else if (value && typeof value.type === 'string') walk(value, visit);
  }
};

export const stripInternalNotes = ({ enabled }) => ({
  name: 'rak-strip-internal-notes',
  enforce: 'pre',
  transform(code, id) {
    if (!enabled) return null;
    const file = id.split('?')[0].split(path.sep).join('/');
    const keys = FIELDS.filter((f) => f.file.test(file)).flatMap((f) => f.keys);
    if (!keys.length || !keys.some((k) => code.includes(k))) return null;
    const ranges = [];
    walk(this.parse(code), (node) => {
      if (node.type === 'Property' && !node.computed && keys.includes(node.key.name ?? node.key.value)) {
        let end = node.end;
        let i = end;
        while (/\s/.test(code[i] ?? '')) i++;
        if (code[i] === ',') end = i + 1;
        ranges.push([node.start, end]);
      }
    });
    if (!ranges.length) return null;
    let out = code;
    for (const [s, e] of ranges.sort((a, b) => b[0] - a[0])) out = out.slice(0, s) + out.slice(e);
    return { code: out, map: null };
  },
});
