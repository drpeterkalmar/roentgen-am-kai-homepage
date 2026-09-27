import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import { BookingButton, PhoneButton } from '../ui/BookingButtons';
import { IMAGE_BRIEFS } from '../../data/imageBriefs';
import { TARGETS, categoryById, formatDate } from '../../data/ratgeber';

// Gemeinsame Bausteine für Ratgeber-Übersicht und Artikelseiten.

const img = (name) => `${import.meta.env.BASE_URL}assets/images/${name}`;

// Echtes Praxisfoto (mit -mobile/-tablet-Varianten) oder Bildplatzhalter mit Motivbeschreibung
export const ArticleImage = ({ article, sizes, eager = false, className = 'aspect-[4/3] w-full' }) => {
  const p = article.photo;
  if (!p) return <ImagePlaceholder brief={IMAGE_BRIEFS[article.imageBrief]} className={className} />;
  return (
    <img
      src={img(`${p.name}.avif`)}
      srcSet={`${img(`${p.name}-mobile.avif`)} 800w, ${img(`${p.name}-tablet.avif`)} 1200w, ${img(`${p.name}.avif`)} 1920w`}
      sizes={sizes}
      alt={p.alt}
      width={p.width}
      height={p.height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      className={`${className} object-cover`}
    />
  );
};

export const CategoryBadge = ({ id }) => (
  <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800 dark:bg-slate-800 dark:text-brand-200">
    {categoryById[id].name}
  </span>
);

export const ArticleDate = ({ article }) =>
  article.datePublished ? (
    <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
      <CalendarDays size={16} aria-hidden="true" />
      <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
    </span>
  ) : (
    <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">In Vorbereitung</span>
  );

// Untersuchungsspezifischer CTA-Kasten (im Artikel). Primär: genau EINE passende Ziel-/Leistungsseite.
export const InlineCTA = ({ targetId, id }) => {
  const t = TARGETS[targetId];
  return (
    <aside aria-labelledby={id} className="not-prose my-10 rounded-2xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-slate-900 sm:p-6">
      <p id={id} className="font-display text-lg font-semibold text-slate-900 dark:text-white">{t.ctaTitle}</p>
      <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-200">{t.ctaText}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          to={t.to}
          data-cta="article-target"
          data-cta-service={t.service}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-brand px-5 font-semibold text-white hover:bg-brand-700"
        >
          Zur Seite {t.label} <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <BookingButton variant="secondary" label={t.bookingLabel} service={t.service} />
      </div>
    </aside>
  );
};

// Abschluss-CTA am Artikelende (Buchung + Telefon + Zielseite)
export const EndCTA = ({ targetId }) => {
  const t = TARGETS[targetId];
  return (
    <section aria-labelledby="artikel-cta-title" className="bg-brand-800 text-white">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-16">
        <h2 id="artikel-cta-title" className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{t.endTitle}</h2>
        <p className="mt-3 text-lg text-brand-50">Buchen Sie online oder rufen Sie uns an – wir beantworten gerne Ihre Fragen zur Untersuchung.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <BookingButton variant="inverse" size="lg" label={t.bookingLabel} service={t.service} />
          <PhoneButton label="Telefonisch vereinbaren" service={t.service} variant="secondary" size="lg" className="!border-white/60 !bg-transparent !text-white hover:!bg-white/10" />
        </div>
        <p className="mt-6">
          <Link to={t.to} data-cta="article-target" data-cta-service={t.service} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-white underline underline-offset-4">
            Mehr zu {t.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
};
