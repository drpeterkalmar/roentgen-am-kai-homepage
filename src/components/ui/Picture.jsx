// Praxisfotos aus public/assets/images: je Bild <name>.avif (1920 px) plus -tablet (1200 px) und -mobile (800 px).
// Eine Quelle für Bildadresse, srcset und Ladeverhalten (vorher je Seite kopiert).

export const imageUrl = (name, variant = '') => `${import.meta.env.BASE_URL}assets/images/${name}${variant}.avif`;
export const imageSrcSet = (name) => `${imageUrl(name, '-mobile')} 800w, ${imageUrl(name, '-tablet')} 1200w, ${imageUrl(name)} 1920w`;

// eager: Bild im ersten Bildschirm (sofort laden, hohe Priorität), sonst lazy
const Picture = ({ name, sizes, alt, width, height, eager = false, className }) => (
  <img
    src={imageUrl(name)}
    srcSet={imageSrcSet(name)}
    sizes={sizes}
    alt={alt}
    width={width}
    height={height}
    loading={eager ? 'eager' : 'lazy'}
    // nur bei eager übergeben – sonst meldet React 18 beim Vorrendern „fetchPriority“ als unbekannte Eigenschaft
    {...(eager ? { fetchPriority: 'high' } : {})}
    decoding="async"
    className={className}
  />
);

export default Picture;
