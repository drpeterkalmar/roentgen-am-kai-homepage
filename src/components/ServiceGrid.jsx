import React from 'react';
import { services } from '../data/services';
import { serviceIcons } from './serviceIcons';
import ServiceCard from './ui/ServiceCard';
import { cx } from './ui/cx';

// Kartenraster aus den zentralen Leistungsdaten. keys = Reihenfolge der Leistungen.
export const badgesFor = (s) => {
  const b = [];
  if (s.onlineBooking) b.push('Online buchbar');
  if (s.referral?.summary?.startsWith('Reine Privatleistung')) b.push('Privatleistung');
  if (s.durationMinutes) b.push(`ca. ${s.durationMinutes} Minuten`);
  return b;
};

const ServiceGrid = ({ keys, featured = false, headingLevel = 3, columns = 3, className }) => (
  <ul className={cx('grid gap-5 sm:gap-6', { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns], className)}>
    {keys.map((k) => {
      const s = services[k];
      return (
        <li key={k}>
          <ServiceCard
            title={s.title}
            description={s.description}
            href={s.href}
            icon={serviceIcons[k]}
            badges={badgesFor(s)}
            featured={featured}
            headingLevel={headingLevel}
          />
        </li>
      );
    })}
  </ul>
);

export default ServiceGrid;
