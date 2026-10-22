import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserRound } from 'lucide-react';
import Container from '../components/ui/Container';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Placeholder from '../components/ui/Placeholder';
import FAQ from '../components/FAQ';
import { ArticleImage, CategoryBadge, ArticleDate, InlineCTA, EndCTA, KaiWordmark } from '../components/ratgeber/ArticleParts';
import { KiMedia, KiHeroImage, ProductLogo } from '../components/ratgeber/KiMedia';
import ReviewedNote from '../components/ratgeber/ReviewedNote';
import { KI_CONTENT } from '../data/kiContent';
import { KI_SERIES_PATH } from '../data/kiSeries';
import { articleBySlug, TARGETS, PUBLISHER_NAME, formatDate, ARTICLES } from '../data/ratgeber';
import { blogPosts } from '../data/blogPosts';
import NotFoundPage from './NotFoundPage';

// Artikelseite /ratgeber/<slug>. Metadaten aus ratgeber.js, Text (HTML, redaktionell gepflegt) aus blogPosts.js.
// Der Text wird am zweiten H2 geteilt, dort steht der CTA „im Artikel“ – am Ende folgt der Abschluss-CTA.
const textById = Object.fromEntries(blogPosts.map((p) => [p.id, p.content]));

// Interne Links im Artikeltext stehen als Wurzelpfade (href="/koerperanalyse-graz"). Für GitHub Pages die Basis-URL
// davorsetzen, damit sie auch ohne JavaScript und beim Öffnen in neuem Tab stimmen.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const withBase = (html) => html.replace(/href="\/(?!\/)/g, `href="${BASE}/`);

// Medienblöcke im Artikeltext: Zeile <!--media:<schlüssel>--> → Komponente (KI-Serie: Galerie oder Platzhalter)
const ArticleHtml = ({ html, media, title }) => {
  const parts = html.split(/<!--media:([a-z]+)-->/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <KiMedia key={`m${i}`} block={media?.[part]} title={title} />
    ) : (
      part.trim() && <div key={`h${i}`} className="article-html" dangerouslySetInnerHTML={{ __html: part }} />
    )
  );
};

const splitForCTA = (html) => {
  const parts = html.split(/(?=<h2>)/);
  if (parts.length < 3) return [html, ''];
  const at = Math.min(2, parts.length - 1);
  return [parts.slice(0, at).join(''), parts.slice(at).join('')];
};

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  // Klicks auf interne Links im Artikeltext ohne Neuladen der Seite (normale Klicks; Strg/Cmd/Mittelklick bleiben Browser-Sache)
  const onTextClick = (e) => {
    const link = e.target.closest?.('a[href]');
    if (!link || link.target || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = link.getAttribute('href');
    if (!href.startsWith(`${BASE}/`)) return;
    e.preventDefault();
    navigate(href.slice(BASE.length) || '/');
  };
  const a = articleBySlug[slug];
  if (!a) return <NotFoundPage />;
  const t = TARGETS[a.target];
  const ki = a.series === 'ki' ? KI_CONTENT[a.slug] : null;
  const raw = a.id ? textById[a.id] : ki?.html;
  const html = raw ? withBase(raw) : null;
  const [before, after] = html ? splitForCTA(html) : ['', ''];
  const others = ARTICLES.filter((x) => x.slug !== a.slug && x.category === a.category && x.status === 'published').slice(0, 2);

  return (
    <>
      <article aria-labelledby="page-title">
        <header className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <Container size="narrow" className="py-8 sm:py-12">
            <Breadcrumbs
              items={[
                { name: 'Startseite', href: '/' },
                { name: 'Ratgeber', href: '/ratgeber' },
                ...(ki ? [{ name: 'Röntgen am K[AI]', href: KI_SERIES_PATH }] : []),
                { name: a.title },
              ]}
            />
            {ki && (
              <p className="mt-4 flex flex-wrap items-center gap-3">
                <Link to={KI_SERIES_PATH} className="inline-flex min-h-[44px] items-center text-sm font-semibold text-slate-700 underline-offset-4 hover:underline dark:text-slate-200" data-ki-series-link="">
                  Serie:&nbsp;<KaiWordmark />
                </Link>
                {a.logo && <ProductLogo logo={a.logo} />}
                {a.ce && (
                  <span className="text-sm text-slate-600 dark:text-slate-300" data-ce="">CE-gekennzeichnetes Medizinprodukt</span>
                )}
              </p>
            )}
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
              {ki && a.dateModified === a.datePublished && (
                <> · Stand <time dateTime={a.dateModified}>{formatDate(a.dateModified)}</time></>
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
          {/* Titelbild: KI-Serie = Ausschnitt aus dem Beispielbericht (kiHero), sonst Praxisfoto bzw. Bildplatzhalter */}
          {a.kiHero ? (
            <KiHeroImage hero={a.kiHero} />
          ) : (
            !a.noHeroImage && (
              <div className="overflow-hidden rounded-2xl">
                <ArticleImage article={a} eager sizes="(max-width: 767px) 100vw, 720px" className="aspect-[16/9] w-full" />
              </div>
            )
          )}

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
              <InlineCTA targetId={a.target} id="artikel-cta-inline" cta={a.cta} />
            </div>
          ) : (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- nur Delegation für echte Links (per Tastatur über Enter auf dem Link)
            <div className={`article-content ${a.noHeroImage && !a.kiHero ? '' : 'mt-8'}`} onClick={onTextClick}>
              <ArticleHtml html={before} media={ki?.media} title={`Beispielbericht ${a.product || ''}`.trim()} />
              <InlineCTA targetId={a.target} id="artikel-cta-inline" cta={a.cta} />
              {after && <ArticleHtml html={after} media={ki?.media} title={`Beispielbericht ${a.product || ''}`.trim()} />}
            </div>
          )}

          {a.faq?.length > 0 && (
            <div className="mt-12">
              <FAQ items={a.faq} title="Häufige Fragen" headingLevel={2} align="left" />
            </div>
          )}

          {(ki?.sources || a.sources)?.length > 0 && (
            <section aria-labelledby="quellen-title" className="mt-12">
              <h2 id="quellen-title" className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Quellen</h2>
              <ol className="article-html article-sources mt-3">
                {(ki?.sources || a.sources).map((src) => (
                  <li key={src} dangerouslySetInnerHTML={{ __html: src }} />
                ))}
              </ol>
            </section>
          )}

          <footer className="mt-12 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {/* Prüfvermerk-Platzhalter: je Artikel abschaltbar (reviewNote: false), z. B. Sarkopenie laut Praxis 07.10.2026 */}
            {a.reviewNote !== false && <ReviewedNote reviewed={a.reviewed || null} />}
            {!a.author && <Placeholder internal>Autorin/Autor des Artikels bestätigen (derzeit: Praxis als Herausgeberin).</Placeholder>}
            {a.review && <Placeholder internal>Freigabe: {a.review}</Placeholder>}
            <p>Dieser Artikel dient der allgemeinen Information und ersetzt keine ärztliche Beratung.</p>
          </footer>

          <nav aria-label="Weitere Artikel" className="mt-10">
            {others.length > 0 && (
              <ul className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to={o.path} className="card-lift flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:shadow-sm hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300">
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

      <EndCTA targetId={a.target} cta={a.cta} />
    </>
  );
};

export default ArticlePage;
