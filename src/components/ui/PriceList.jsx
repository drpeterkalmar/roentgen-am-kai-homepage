import { selfPayPrices } from '../../data/services';
import Placeholder from './Placeholder';
import { cx } from './cx';

const fmt = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' });

// Selbstzahler-Preise. ids = Auswahl aus data/services.js (selfPayPrices); ohne ids alle.
// Preise mit price: null erscheinen als Platzhalter.
const PriceList = ({ ids, title = 'Preise für Selbstzahler', headingLevel = 3, compact = false, className }) => {
  const items = ids ? selfPayPrices.filter((p) => ids.includes(p.id)) : selfPayPrices;
  if (!items.length) return null;
  const H = `h${headingLevel}`;
  return (
    <div className={className}>
      {title && <H className="mb-3 font-display font-semibold text-lg text-slate-900 dark:text-white">{title}</H>}
      <dl className="divide-y divide-slate-200 dark:divide-slate-700">
        {items.map((p) => (
          <div key={p.id} className={cx('flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1', compact ? 'py-2' : 'py-3')}>
            <dt className="text-slate-800 dark:text-slate-100">
              {p.label}
              {p.note && !compact && <span className="block text-sm text-slate-500 dark:text-slate-400">{p.note}</span>}
            </dt>
            <dd className="font-semibold tabular-nums text-slate-900 dark:text-white">
              {p.price == null ? <Placeholder inline>Preis folgt</Placeholder> : fmt.format(p.price)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default PriceList;
