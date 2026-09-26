import React from 'react';
import { cx } from './cx';
import Container from './Container';
import { Eyebrow, Heading, Lead } from './Heading';
import Breadcrumbs from './Breadcrumbs';

// Wiederverwendbarer Hero-Bereich für Start- und Unterseiten.
//   image: { src, srcSet?, sizes?, alt, width?, height? } – optional; ohne Bild einspaltig.
//   actions: Schaltflächen (z. B. <BookingButton/>, <PhoneButton/>)
//   breadcrumbs: [{ name, href? }] – Brotkrumen über der Überschrift
//   meta: kleine Zusatzinfos unter den Schaltflächen (z. B. Öffnungszeiten)
const Hero = ({ breadcrumbs, eyebrow, title, lead, actions, meta, image, imageSlot, tone = 'muted', className, children }) => {
  const hasMedia = image || imageSlot;
  return (
    <section
      aria-labelledby="page-title"
      className={cx(tone === 'muted' ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950', 'border-b border-slate-200 dark:border-slate-800', className)}
    >
      <Container className={cx('py-8 sm:py-12 lg:py-14', hasMedia && 'grid items-center gap-10 lg:grid-cols-2 lg:gap-16')}>
        <div className={cx(!hasMedia && 'max-w-3xl')}>
          {breadcrumbs && <div className="mb-6"><Breadcrumbs items={breadcrumbs} /></div>}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading level={1} look={hasMedia ? 'display' : 'h1'} id="page-title">{title}</Heading>
          {lead && <Lead className="mt-5 max-w-2xl">{lead}</Lead>}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
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
