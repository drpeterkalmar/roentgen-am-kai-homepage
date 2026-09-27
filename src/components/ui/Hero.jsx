import React from 'react';
import { cx } from './cx';
import Container from './Container';
import { Eyebrow, Heading, Lead } from './Heading';
import Breadcrumbs from './Breadcrumbs';

// Wiederverwendbarer Hero-Bereich für Start- und Unterseiten.
//   image: { src, srcSet?, sizes?, alt, width?, height? } – optional; ohne Bild einspaltig.
//   actions: Schaltflächen (z. B. <BookingButton/>, <PhoneButton/>)
//   breadcrumbs: [{ name, href? }] – Brotkrumen über der Überschrift
//   highlight: gut sichtbarer Hinweis direkt unter der H1 (z. B. „Ohne Zuweisung · mit e-card …“)
//   meta: kleine Zusatzinfos unter den Schaltflächen (z. B. Öffnungszeiten)
//   facts: kurze Stichpunkte als Chips zwischen Einleitung und Schaltflächen ([string | { text, strong }])
//   keyMessage: hervorgehobene Kernbotschaft direkt unter der Einleitung
const Hero = ({ breadcrumbs, eyebrow, title, highlight, lead, keyMessage, facts, actions, meta, image, imageSlot, tone = 'muted', className, children }) => {
  const hasMedia = image || imageSlot;
  return (
    <section
      aria-labelledby="page-title"
      className={cx(tone === 'muted' ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950', 'border-b border-slate-200 dark:border-slate-800', className)}
    >
      <Container className={cx('py-8 sm:py-12 lg:py-14', hasMedia && 'grid items-start gap-10 lg:grid-cols-2 lg:gap-16')}>
        <div className={cx(!hasMedia && 'max-w-3xl')}>
          {breadcrumbs && <div className="mb-4 sm:mb-6"><Breadcrumbs items={breadcrumbs} /></div>}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading level={1} look={hasMedia ? 'display' : 'h1'} id="page-title">{title}</Heading>
          {highlight && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm font-semibold sm:mt-5 sm:px-4 sm:py-2 sm:text-base text-brand-800 dark:border-brand-800 dark:bg-slate-950 dark:text-brand-200">
              {highlight}
            </p>
          )}
          {lead && <Lead className="mt-4 max-w-2xl text-base sm:mt-5 sm:text-lg">{lead}</Lead>}
          {keyMessage && (
            <p className="mt-4 max-w-2xl border-l-4 border-brand pl-4 text-lg font-semibold leading-snug text-slate-900 sm:mt-5 sm:text-xl dark:border-brand-300 dark:text-white">
              {keyMessage}
            </p>
          )}
          {facts && facts.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5" aria-label="Auf einen Blick">
              {facts.map((f) => {
                const item = typeof f === 'string' ? { text: f } : f;
                return (
                  <li
                    key={item.text}
                    className={cx(
                      'inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold',
                      item.strong
                        ? 'border-brand-200 bg-white text-brand-800 dark:border-brand-800 dark:bg-slate-950 dark:text-brand-200'
                        : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
                    )}
                  >
                    {item.text}
                  </li>
                );
              })}
            </ul>
          )}
          {actions && <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
          {meta && <div className="mt-6 text-sm text-slate-600 dark:text-slate-300">{meta}</div>}
          {children}
        </div>
        {hasMedia && (
          <div className="relative overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 aspect-[4/3] lg:aspect-[5/4]">
            {imageSlot || (
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={image.sizes}
                alt={image.alt}
                width={image.width}
                height={image.height}
                fetchPriority={image.priority ? 'high' : undefined}
                loading={image.priority ? 'eager' : 'lazy'}
                decoding={image.priority ? 'sync' : 'async'}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Hero;
