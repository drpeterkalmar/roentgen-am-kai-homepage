import { Clapperboard } from 'lucide-react';
import { cx } from './cx';
import { ANIMATIONS } from '../../data/mediaPlan';

// Sichtbare Entwicklungsplatzierung für eine noch nicht produzierte Animation/Erklärgrafik (A-Nummer).
// Zeigt Nummer, Titel, kurze Funktionsbeschreibung und benötigtes Format. Feste Fläche (ratio aus
// mediaPlan.js, am Handy mindestens 220 px hoch), damit die fertige Grafik das Layout nicht verschiebt.
// Auffindbar über [data-media-id] und [data-animation-placeholder].
const AnimationPlaceholder = ({ id, className }) => {
  const a = ANIMATIONS[id];
  return (
    <figure
      data-animation-placeholder=""
      data-media-id={a.id}
      aria-label={`Platzhalter Grafik ${a.id}: ${a.title}`}
      className={cx(
        'not-prose my-8 flex min-h-[220px] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-5 text-center text-amber-950',
        'dark:border-amber-600 dark:bg-slate-900 dark:text-amber-100',
        a.ratio,
        className
      )}
    >
      <Clapperboard size={26} aria-hidden="true" />
      <figcaption className="max-w-lg leading-snug">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-wider">Grafik in Entwicklung</span>
        <span className="block font-display text-2xl font-bold">{a.id}</span>
        <span className="mt-1 block font-semibold">{a.title}</span>
        <span className="mt-1 block text-sm">{a.purpose}</span>
        <span className="mt-1 block text-sm font-semibold">Format: {a.format}</span>
      </figcaption>
    </figure>
  );
};

export default AnimationPlaceholder;
