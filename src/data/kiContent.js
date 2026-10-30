// KI-Ratgeberserie: lange Texte und Bildblöcke – nur von ArticlePage/KiSeriesPage importiert (eigener Chunk,
// nicht im Haupt-Bundle). Metadaten: kiSeries.js. Bilder: public/assets/ki (npm run images:ki).
import * as UE from './ratgeber/ki-uebersicht.content.js';
import * as LAMA from './ratgeber/ki-lama.content.js';
import * as HIPPO from './ratgeber/ki-hippo.content.js';
import * as KOALA from './ratgeber/ki-koala.content.js';
import * as SQUIRREL from './ratgeber/ki-squirrel.content.js';
import * as FROG from './ratgeber/ki-frog.content.js';
import * as PANDA from './ratgeber/ki-panda.content.js';
import * as RHO from './ratgeber/ki-rho.content.js';

// Bildmaße der zugeschnittenen Vorlagen (public/assets/ki/manifest.json)
const REPORT = { width: 2382, height: 2899 };
const PANDA_IMG = { width: 1648, height: 2100 };
const RHO_IMG = { width: 1700, height: 1399 };   // Demo-PNGs IB Lab, Studienkarte + Fußzeile weggeschnitten
// Schematische Grafiken der Praxis (selbst gezeichnet, assets-src/ki/quellen/render_ki_grafiken.py): Desktop + Hochformat fürs Handy
const DIAGRAM_DIMS = {
  'rho-ablauf': { width: 2400, height: 1350 }, 'rho-ablauf-mobil': { width: 1800, height: 3416 },
};

// Hotspots: Mittelpunkt des Markers in Prozent des Bildes; nur sichtbare Elemente (geprüft per Screenshot)
const SQUIRREL_POS = { 1: { x: 8, y: 6.5 }, 2: { x: 65, y: 9.5 }, 3: { x: 64.5, y: 34 }, 4: { x: 69, y: 49 } };
const PANDA_POS = { 1: { x: 42, y: 17 }, 2: { x: 43, y: 43.5 }, 3: { x: 84, y: 47 }, 4: { x: 89, y: 15 } };

const slides = (mod, dims = REPORT) => (mod.MEDIA?.slides || []).map((s) => ({ ...dims, ...s }));
const withPos = (list, pos) => (list || []).filter((h) => pos[h.n]).map((h) => ({ ...h, ...pos[h.n] }));
const note = (mod) => mod.MEDIA?.note || mod.MEDIA_NOTE || null;
const gallery = (id, mod, dims, pos) => ({ id, slides: slides(mod, dims), note: note(mod), hotspots: pos ? withPos(mod.MEDIA?.hotspots, pos) : null });
// Medienblock mit Briefing (MEDIA.ablauf / MEDIA.report): sobald die Grafik da ist (slides), Galerie auf hellem Grund, sonst Platzhalter.
// slide.mobile = Name der Hochformat-Fassung (wird unter 640 px Breite geladen, siehe KiMedia.jsx).
const diagram = (id, b) => (b?.slides?.length
  ? {
      id, frame: 'light', note: null, hotspots: null,
      slides: b.slides.map((s) => ({ ...DIAGRAM_DIMS[s.key], ...s, mobile: s.mobile ? { key: s.mobile, ...DIAGRAM_DIMS[s.mobile] } : null })),
    }
  : b || null);

export const KI_OVERVIEW_HTML = UE.HTML;
export const KI_OVERVIEW_SOURCES = UE.SOURCES || [];

export const KI_CONTENT = {
  'ki-beinachsenvermessung-lama': { html: LAMA.HTML, sources: LAMA.SOURCES || [], media: { report: gallery('lama', LAMA) } },
  'ki-hueftvermessung-hippo': { html: HIPPO.HTML, sources: HIPPO.SOURCES || [], media: { report: gallery('hippo', HIPPO) } },
  'kniearthrose-ki-koala': { html: KOALA.HTML, sources: KOALA.SOURCES || [], media: { report: KOALA.MEDIA?.placeholder || KOALA.MEDIA?.report || null } },
  'skoliose-cobb-winkel-ki': { html: SQUIRREL.HTML, sources: SQUIRREL.SOURCES || [], media: { report: gallery('squirrel', SQUIRREL, REPORT, SQUIRREL_POS) } },
  'fussfehlstellung-roentgen-ki': { html: FROG.HTML, sources: FROG.SOURCES || [], media: { report: gallery('frog', FROG) } },
  'knochenalter-bestimmen-ki': { html: PANDA.HTML, sources: PANDA.SOURCES || [], media: { report: gallery('panda', PANDA, PANDA_IMG, PANDA_POS) } },
  'osteoporose-screening-roentgen-ki': { html: RHO.HTML, sources: RHO.SOURCES || [], media: { ablauf: diagram('rho-ablauf', RHO.MEDIA?.ablauf), report: gallery('rho', RHO, RHO_IMG) } },
};
