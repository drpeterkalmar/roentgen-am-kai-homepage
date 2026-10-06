import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Brotkrumen-Navigation. items: [{ name, href? }] – der letzte Eintrag ist die aktuelle Seite.
const Breadcrumbs = ({ items }) => (
  <nav aria-label="Brotkrumen" className="text-sm text-slate-600 dark:text-slate-300">
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={item.name} className="flex items-center gap-1.5">
            {item.href && !last ? (
              <Link to={item.href} className="-my-3 inline-flex min-h-[44px] items-center underline-offset-4 hover:text-brand hover:underline dark:hover:text-brand-300">{item.name}</Link>
            ) : (
              <span aria-current={last ? 'page' : undefined} className={last ? 'font-medium text-slate-900 dark:text-white' : undefined}>{item.name}</span>
            )}
            {!last && <ChevronRight size={14} aria-hidden="true" className="text-slate-400" />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
