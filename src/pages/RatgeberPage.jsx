import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';
import { cx } from '../components/ui/cx';
import { ArticleImage, CategoryBadge, ArticleDate } from '../components/ratgeber/ArticleParts';
import { ARTICLES, CATEGORIES } from '../data/ratgeber';

// Ratgeber-Übersicht: Artikel als echte Links (/ratgeber/<slug>), Filter nach Rubrik (?rubrik=<id>).
// Reihenfolge: Artikel in Vorbereitung zuerst (Auftrag: „erster Artikel“), dann neueste zuerst.
// Die frühere Modal-Ansicht (components/Blog.jsx) ist ersetzt – Artikel haben jetzt eigene URLs.
const sorted = [...ARTICLES].sort((a, b) => {
  if (!a.datePublished) return -1;
  if (!b.datePublished) return 1;
  return b.datePublished.localeCompare(a.datePublished);
});

const RatgeberPage = () => {
  const [params, setParams] = useSearchParams();
  const active = CATEGORIES.some((c) => c.id === params.get('rubrik')) ? params.get('rubrik') : null;
  const list = active ? sorted.filter((a) => a.category === active) : sorted;
  const count = (id) => ARTICLES.filter((a) => a.category === id).length;

  const chip = (isOn) =>
    cx(
      'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors',
      isOn
        ? 'border-brand bg-brand text-white'
        : 'border-slate-300 bg-white text-slate-800 hover:border-brand-200 hover:text-brand dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-brand-300'
    );

  return (
    <>
      <Hero
        breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Ratgeber' }]}
        title="Ratgeber"
        lead="Verständliche Informationen zu DEXA-Körperanalyse, Knochengesundheit, Mammographie und Röntgen – von Ihrer Radiologie in Graz. Die Artikel ersetzen keine ärztliche Beratung."
      />

      <Section labelledBy="artikel-title" spacing="md">
        <h2 id="artikel-title" className="sr-only">Artikel</h2>
        <div role="group" aria-label="Artikel nach Rubrik filtern" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={!active} onClick={() => setParams({}, { replace: true })} className={chip(!active)}>
            Alle <span className="text-xs">({ARTICLES.length})</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setParams({ rubrik: c.id }, { replace: true })}
              className={chip(active === c.id)}
            >
              {c.name} <span className="text-xs">({count(c.id)})</span>
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{list.length} Artikel angezeigt</p>

        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <li key={a.slug}>
              <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-brand dark:border-slate-700 dark:bg-slate-900">
                <ArticleImage article={a} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 380px" />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <CategoryBadge id={a.category} />
                    <ArticleDate article={a} />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
                    <Link to={a.path} className="after:absolute after:inset-0 focus:outline-none group-hover:text-brand dark:group-hover:text-brand-300">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 leading-relaxed text-slate-600 dark:text-slate-300">{a.excerpt}</p>
                  <p aria-hidden="true" className="mt-auto flex items-center gap-2 pt-4 font-semibold text-brand dark:text-brand-300">
                    Weiterlesen <ArrowRight size={18} />
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection />
    </>
  );
};

export default RatgeberPage;
