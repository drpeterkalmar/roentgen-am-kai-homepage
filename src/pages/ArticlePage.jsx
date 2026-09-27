import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Stethoscope, UserRound } from 'lucide-react';
import Container from '../components/ui/Container';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Placeholder from '../components/ui/Placeholder';
import FAQ from '../components/FAQ';
import { ArticleImage, CategoryBadge, ArticleDate, InlineCTA, EndCTA } from '../components/ratgeber/ArticleParts';
import { articleBySlug, TARGETS, PUBLISHER_NAME, formatDate, ARTICLES } from '../data/ratgeber';
import { blogPosts } from '../data/blogPosts';
import NotFoundPage from './NotFoundPage';

// Artikelseite /ratgeber/<slug>. Metadaten aus ratgeber.js, Text (HTML, redaktionell gepflegt) aus blogPosts.js.
// Der Text wird am zweiten H2 geteilt, dort steht der CTA „im Artikel“ – am Ende folgt der Abschluss-CTA.
const textById = Object.fromEntries(blogPosts.map((p) => [p.id, p.content]));

const splitForCTA = (html) => {
  const parts = html.split(/(?=<h2>)/);
  if (parts.length < 3) return [html, ''];
  const at = Math.min(2, parts.length - 1);
  return [parts.slice(0, at).join(''), parts.slice(at).join('')];
};

const ArticlePage = () => {
  const { slug } = useParams();
  const a = articleBySlug[slug];
  if (!a) return <NotFoundPage />;
  const t = TARGETS[a.target];
  const html = a.id ? textById[a.id] : null;
  const [before, after] = html ? splitForCTA(html) : ['', ''];
  const others = ARTICLES.filter((x) => x.slug !== a.slug && x.category === a.category && x.status === 'published').slice(0, 2);

  return (
    <>
      <article aria-labelledby="page-title">
        <header className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <Container size="narrow" className="py-8 sm:py-12">
            <Breadcrumbs items={[{ name: 'Startseite', href: '/' }, { name: 'Ratgeber', href: '/ratgeber' }, { name: a.title }]} />
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <CategoryBadge id={a.category} />
              <ArticleDate article={a} />
            </div>
            <h1 id="page-title" className="mt-4 hyphens-manual text-balance font-display text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[2.75rem]">
              {a.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{a.excerpt}</p>
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <UserRound size={16} aria-hidden="true" />
              {a.author ? <>Von {a.author}</> : <>Herausgegeben von {PUBLISHER_NAME}</>}
              {a.dateModified && a.dateModified !== a.datePublished && (
                <> · aktualisiert am <time dateTime={a.dateModified}>{formatDate(a.dateModified)}</time></>
              )}
            </p>
            {/* Primärer Weg: genau eine passende Ziel- bzw. Leistungsseite */}
            <p className="mt-5">
              <Link to={t.to} data-cta="article-target" data-cta-service={t.service} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
                Passende Seite: {t.label} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </Container>
        </header>

        <Container size="narrow" className="py-8 sm:py-12">
          <div className="overflow-hidden rounded-2xl">
            <ArticleImage article={a} eager sizes="(max-width: 767px) 100vw, 720px" className="aspect-[16/9] w-full" />
          </div>

          {a.status === 'placeholder' ? (
            <div className="mt-8 space-y-4">
              <Placeholder>
                Dieser Artikel ist in Vorbereitung. Der endgültige, ärztlich geprüfte Text fehlt noch – bewusst keine selbst
                formulierte Kurzfassung. Inhaltsdatei: <code>{a.contentFile}</code>
              </Placeholder>
              <Placeholder internal>
                Vor Veröffentlichung: Artikeltext, Autorin/Autor, Veröffentlichungsdatum, Meta-Description, Titelbild. Bis dahin ist die Seite
                „noindex“, nicht in der Sitemap und ohne Article-Markup.
              </Placeholder>
              <InlineCTA targetId={a.target} id="artikel-cta-inline" />
            </div>
          ) : (
            <div className="article-content mt-8">
              <div className="article-html" dangerouslySetInnerHTML={{ __html: before }} />
              <InlineCTA targetId={a.target} id="artikel-cta-inline" />
              {after && <div className="article-html" dangerouslySetInnerHTML={{ __html: after }} />}
            </div>
          )}

          {a.faq?.length > 0 && (
            <div className="mt-12">
              <FAQ items={a.faq} title="Häufige Fragen" headingLevel={2} align="left" />
            </div>
          )}

          <footer className="mt-12 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <p className="flex flex-wrap items-center gap-2">
              <Stethoscope size={16} aria-hidden="true" />
              Medizinisch geprüft von <Placeholder inline>Dr. [NAME]</Placeholder> – Stand <Placeholder inline>[DATUM]</Placeholder>
            </p>
            {!a.author && <Placeholder internal>Autorin/Autor des Artikels bestätigen (derzeit: Praxis als Herausgeberin).</Placeholder>}
            {a.review && <Placeholder internal>Freigabe: {a.review}</Placeholder>}
            <p>Dieser Artikel dient der allgemeinen Information und ersetzt keine ärztliche Beratung.</p>
          </footer>

          <nav aria-label="Weitere Artikel" className="mt-10">
            {others.length > 0 && (
              <ul className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to={o.path} className="flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300">
                      <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link to="/ratgeber" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
              <ArrowLeft size={16} aria-hidden="true" /> Alle Ratgeber-Artikel
            </Link>
          </nav>
        </Container>
      </article>

      <EndCTA targetId={a.target} />
    </>
  );
};

export default ArticlePage;
