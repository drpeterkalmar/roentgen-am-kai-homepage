// Noch nicht produzierte Animationen und Erklärgrafiken (A-Nummern) – identisch mit
// docs/seiten-und-medienkonzept.md (Teil 3) und dem Fotobriefing. Eine Grafik = eine Nummer, auch wenn sie
// auf mehreren Seiten erscheint (A005). Inhalte dürfen nur aus bestehenden, geprüften Seitentexten bzw.
// den genannten Datendateien stammen.
export const ANIMATIONS = {
  A001: {
    id: 'A001',
    title: 'Wer kann wann zur Mammographie?',
    purpose: 'Zeitstrahl der Altersgruppen und Zugangswege (e-card, Selbstanmeldung) im Brustkrebs-Früherkennungsprogramm – Werte ausschließlich aus src/data/screening.js.',
    format: 'SVG, responsiv: Desktop 16:6, Handy gestapelt; Text als HTML',
    ratio: 'aspect-[16/6]',
    pages: ['Mammographie, Abschnitt „Screening oder diagnostische Abklärung“'],
  },
  A002: {
    id: 'A002',
    title: 'T-Wert-Skala',
    purpose: 'Die WHO-Bereiche des T-Werts (normal / verminderte Knochendichte / Osteoporose) als Skala, auf der man einen Beispielwert einordnen kann – nur die auf der Seite genannten Grenzwerte.',
    format: 'HTML/CSS oder SVG, volle Breite, max. 120 px hoch',
    ratio: 'aspect-[16/3]',
    pages: ['Knochendichte, Abschnitt „Ergebnis: T-Score und Z-Score“'],
  },
  A003: {
    id: 'A003',
    title: 'Drei Bestandteile des Körpers',
    purpose: 'Fettmasse, magere Weichteilmasse und Knochenmineral als schematische Aufteilung – mit dem Hinweis, dass Magermasse nicht gleich Muskelmasse ist.',
    format: 'SVG 4:3, Beschriftung als HTML',
    ratio: 'aspect-[4/3]',
    pages: ['Körperanalyse, Abschnitt „Was zeigt eine medizinische Körperanalyse?“'],
  },
  A004: {
    id: 'A004',
    title: 'Ihr Weg zum Röntgen ohne Termin',
    purpose: 'Vier Schritte: Zuweisung und e-card → Anmeldung → Aufnahme → Befund und Bilder; nur Schritte, die im Seitentext stehen.',
    format: 'SVG/Icons, 4 Schritte; Desktop in einer Reihe, Handy senkrecht',
    ratio: 'aspect-[16/5]',
    pages: ['Röntgen, Abschnitt „So läuft Ihr Röntgen ab“'],
  },
  A005: {
    id: 'A005',
    title: 'Strahlenbelastung im Vergleich',
    purpose: 'Orientierungswerte aus src/data/examinations.js als Balken mit Bezug zur natürlichen Strahlung (logarithmische Skala, Werte zusätzlich als Text).',
    format: 'SVG, volle Breite, 16:7; Werte als HTML-Text daneben',
    ratio: 'aspect-[16/7]',
    pages: ['Röntgen, Abschnitt „Wie hoch ist die Strahlenbelastung?“', 'Weitere Untersuchungen, Abschnitt „Wie hoch ist die Strahlenbelastung?“'],
  },
  A006: {
    id: 'A006',
    title: '2D-Zahnröntgen oder 3D-DVT?',
    purpose: 'Schematischer Vergleich: Panoramaaufnahme als Fläche, DVT als Volumen – zeigt, wann welche Aufnahme gebraucht wird, ohne neue Indikationen zu nennen.',
    format: 'SVG 16:9, Beschriftung als HTML',
    ratio: 'aspect-[16/9]',
    pages: ['Zahnröntgen und 3D-DVT, Abschnitt „Unser Leistungsspektrum“'],
  },
};
