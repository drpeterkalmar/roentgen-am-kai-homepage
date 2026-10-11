// Kennzeichnung KI-generierter Bilder (Transparenz). Liegt unten links über dem Bild.
// aria-hidden: Der Alt-Text des Bildes nennt die KI-Erstellung bereits – keine doppelte Ansage.
const AiImageBadge = ({ text = 'KI-generiertes Bild' }) => (
  <span
    aria-hidden="true"
    data-ai-badge=""
    className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-slate-900/80 px-2 py-1 text-xs font-medium leading-none text-white"
  >
    {text}
  </span>
);

export default AiImageBadge;
