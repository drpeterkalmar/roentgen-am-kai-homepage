import React from 'react';
import Container from './Container';
import { BookingButton, PhoneButton } from './BookingButtons';
import { OPENING_HOURS } from '../../data/practice';

// Einheitlicher Abschluss-Aufruf „Termin vereinbaren“ (online + telefonisch).
const CTASection = ({
  title = 'Termin vereinbaren',
  text = 'Buchen Sie Ihren Termin online oder rufen Sie uns an.',
  id = 'cta-title',
  showHours = true,
  bookingLabel,
  phoneLabel,
}) => (
  <section aria-labelledby={id} className="bg-brand-800 text-white">
    <Container className="py-14 sm:py-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          <h2 id={id} className="font-display font-semibold tracking-tight text-2xl sm:text-3xl text-white">{title}</h2>
          <p className="mt-3 text-lg text-brand-50">{text}</p>
          {showHours && (
            <p className="mt-3 text-sm text-white">
              Öffnungszeiten: {OPENING_HOURS.map((h) => `${h.short} ${h.opens}–${h.closes}`).join(', ')} Uhr
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <BookingButton variant="inverse" size="lg" label={bookingLabel} />
          <PhoneButton label={phoneLabel} variant="secondary" size="lg" className="!border-white/60 !bg-transparent !text-white hover:!bg-white/10" />
        </div>
      </div>
    </Container>
  </section>
);

export default CTASection;
