import { Image as ImageIcon } from 'lucide-react';
import { cx } from './cx';
import { formatLabel } from '../../data/imageBriefs';

// Platzhalter für ein noch fehlendes Foto (Medienkonzept docs/seiten-und-medienkonzept.md).
// Zeigt nur Nummer, Kurztitel und Format – z. B. „B014 – Röntgenraum, Querformat 4:3“.
// Das ausführliche Motiv steht im Fotobriefing; hier nur als title-Tooltip.
// Das Seitenverhältnis kommt vom Elternelement bzw. der className (aspect-*), damit ein später
// eingesetztes Foto das Layout nicht verschiebt. Auffindbar über [data-placeholder] und [data-media-id].
const ImagePlaceholder = ({ brief, className }) => {
  const label = `${brief.id} – ${brief.title}, ${formatLabel(brief)}`;
  return (
    <div
      role="img"
      aria-label={`Bildplatzhalter ${label}`}
      title={brief.motif}
      data-placeholder={`Foto: ${label}`}
      data-media-id={brief.id}
      className={cx(
        'flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 bg-slate-100 p-4 text-center text-slate-600',
        'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300',
        className
      )}
    >
      <ImageIcon size={26} aria-hidden="true" />
      <p className="max-w-xs leading-snug" aria-hidden="true">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-wider">Bildplatzhalter</span>
        <span className="block font-display text-2xl font-bold tracking-wide text-slate-800 dark:text-slate-100">{brief.id}</span>
        <span className="mt-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{brief.title}</span>
        <span className="mt-1 block text-sm">{formatLabel(brief)} · mind. {brief.minSize}</span>
      </p>
    </div>
  );
};

export default ImagePlaceholder;
