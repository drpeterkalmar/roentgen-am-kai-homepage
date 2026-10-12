// Kennzeichnung KI-generierter Bilder/Filme (Transparenz). Standard: unten links über dem Bild.
// place: eigene Positions-/Größenklassen (z. B. beim Erklärfilm, damit keine Einblendung verdeckt wird).
// aria-hidden: Alt-Text bzw. Bildtext nennen die KI-Erstellung bereits – keine doppelte Ansage.
const AiImageBadge = ({ text = 'KI-generiertes Bild', place = 'bottom-2 left-2 px-2 py-1 text-xs' }) => (
  <span
    aria-hidden="true"
    data-ai-badge=""
    className={`pointer-events-none absolute rounded-md bg-slate-900/80 font-medium leading-none text-white ${place}`}
  >
    {text}
  </span>
);

export default AiImageBadge;
