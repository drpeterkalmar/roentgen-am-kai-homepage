import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cx } from './cx';

// Neutraler Bildplatzhalter für noch fehlende Fotos. `motif` beschreibt das benötigte Motiv genau
// (für Fotograf/Praxis). Alle Vorkommen sind über [data-placeholder] auffindbar.
const ImagePlaceholder = ({ motif, className }) => (
  <div
    role="img"
    aria-label={`Bildplatzhalter: ${motif}`}
    data-placeholder={`Foto: ${motif}`}
    className={cx(
      'flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 bg-slate-100 p-5 text-center text-slate-600',
      'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300',
      className
    )}
  >
    <ImageIcon size={28} aria-hidden="true" />
    <p className="max-w-xs text-sm leading-snug">
      <span className="block font-semibold text-slate-700 dark:text-slate-200">Bildplatzhalter</span>
      {motif}
    </p>
  </div>
);

export default ImagePlaceholder;
