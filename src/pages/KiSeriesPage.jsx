import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, CircleSlash, Stethoscope, UserRound } from 'lucide-react';
import Container from '../components/ui/Container';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Placeholder from '../components/ui/Placeholder';
import { KaiWordmark, KaiTitle, EndCTA } from '../components/ratgeber/ArticleParts';
import { KI_SERIES, KI_MODULES, KI_SERIES_CRUMB, KI_HEROES } from '../data/kiSeries';
import { KiHeroImage } from '../components/ratgeber/KiMedia';
import { KI_OVERVIEW_HTML, KI_OVERVIEW_SOURCES } from '../data/kiContent';
import { PUBLISHER_NAME, formatDate } from '../data/ratgeber';

// Übersicht der KI-Ratgeberserie „Röntgen am K[AI] – Künstliche Intelligenz, ärztlich verantwortet“
// (/ratgeber/kuenstliche-intelligenz-radiologie). Texte: src/data/ratgeber/ki-uebersicht*.js, Kacheln: kiSeries.js.
// „bei uns im Einsatz“ nur bei bestätigtem Einsatz (KI_MODULES[].inUse).

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const withBase = (html) => html.replace(/href="\/(?!\/)/g, `href="${BASE}/`);
const LOGO_BASE = `${import.meta.env.BASE_URL}assets/ki/`;

const RELATED = [
  { to: '/roentgen-graz', title: 'Röntgen in Graz', text: 'Mit Zuweisung und e-card ohne Termin – oder Wunschzeit reservieren.' },
  { to: '/mammographie-graz', title: 'Mammographie & Brustgesundheit', text: 'Screening-Mammographie und Abklärung bei Beschwerden.' },
  { to: '/knochendichtemessung-graz', title: 'Knochendichtemessung (DEXA)', text: 'Die etablierte Messung der Knochendichte – Ablauf und Kosten.' },
];

const Tile = ({ m }) => (
  <li className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900" data-ki-tile={m.id}>
    <div className="flex h-10 items-center">
      {m.logo ? (
        <span className="inline-flex rounded-md bg-white px-2 py-1 ring-1 ring-slate-200 dark:ring-slate-600">
          <img src={`${LOGO_BASE}${m.logo.key}.png`} width={m.logo.width} height={m.logo.height} alt={m.logo.alt} loading="lazy" decoding="async" className="h-5 w-auto max-w-[9.5rem] object-contain object-left" />
        </span>
      ) : (
        <span className="font-display text-xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">{m.product}</span>
      )}
    </div>
    <h3 className="mt-3 hyphens-none font-display text-lg font-semibold leading-snug text-slate-900 dark:text-white">
      <Link to={`/ratgeber/${m.slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-brand focus-visible:outline-none dark:hover:text-brand-300" data-cta="ki-tile">
        {m.tile.title}
      </Link>
    </h3>
    <p className="mt-2 flex-1 text-base leading-relaxed text-slate-800 dark:text-slate-200">{m.tile.text}</p>
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {m.inUse && (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" data-in-use="">
          <Check size={14} aria-hidden="true" /> bei uns im Einsatz
        </span>
      )}
      <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-brand dark:text-brand-300" aria-hidden="true">
        Mehr erfahren <ArrowRight size={16} />
      </span>
    </div>
  </li>
);

const KiSeriesPage = () => {
  const navigate = useNavigate();
  const onTextClick = (e) => {
    const link = e.target.closest?.('a[href]');
    if (!link || link.target || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = link.getAttribute('href');
    if (!href.startsWith(`${BASE}/`)) return;
    e.preventDefault();
    navigate(href.slice(BASE.length) || '/');
  };
  const S = KI_SERIES;

  return (
    <>
      <article aria-labelledby="page-title">
        <header className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <Container size="narrow" className="py-8 sm:py-12">
            <Breadcrumbs items={[{ name: 'Startseite', href: '/' }, { name: 'Ratgeber', href: '/ratgeber' }, { name: KI_SERIES_CRUMB }]} />
            <p className="mt-5 text-sm font-semibold text-slate-700 dark:text-slate-200" data-ki-series-name="">
              <KaiWordmark /> – Künstliche Intelligenz, ärztlich verantwortet
            </p>
            <h1 id="page-title" className="mt-3 hyphens-manual text-balance font-display text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[2.75rem]">
              <KaiTitle text={S.title} />
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{S.excerpt}</p>
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <UserRound size={16} aria-hidden="true" /> {S.author ? <>Von {S.author}</> : <>Herausgegeben von {PUBLISHER_NAME}</>} · Stand <time dateTime={S.datePublished}>{formatDate(S.datePublished)}</time>
            </p>
          </Container>
        </header>

        <Container size="narrow" className="py-8 sm:py-12">
          <KiHeroImage hero={KI_HEROES.uebersicht} />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- nur Delegation für echte Links */}
          <div className="article-content mt-8" onClick={onTextClick}>
            <div className="article-html" dangerouslySetInnerHTML={{ __html: withBase(KI_OVERVIEW_HTML) }} />
          </div>
        </Container>

        <section aria-labelledby="ki-artikel-title" className="border-y border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900/60 sm:py-16">
          <Container>
            <h2 id="ki-artikel-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Die Artikel der Serie</h2>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">Acht Programme, acht Fragestellungen – jeweils verständlich erklärt, mit Ablauf, Nutzen und Grenzen.</p>
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" data-ki-tiles="">
              {KI_MODULES.map((m) => <Tile key={m.id} m={m} />)}
            </ul>
          </Container>
        </section>

        <Container size="narrow" className="py-12 sm:py-16">
          <section aria-labelledby="ki-kann-title">
            <h2 id="ki-kann-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Was KI kann – und was nicht</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Was KI kann</h3>
                <ul className="mt-3 space-y-2.5">
                  {S.can.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">
                      <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Was KI nicht kann</h3>
                <ul className="mt-3 space-y-2.5">
                  {S.cannot.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">
                      <CircleSlash size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-slate-500 dark:text-slate-400" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {S.trustNote && (
              <p className="mt-5 flex gap-2.5 rounded-2xl bg-brand-50 p-4 font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                <Stethoscope size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" /> {S.trustNote}
              </p>
            )}
          </section>

          <section aria-labelledby="ki-untersuchungen-title" className="mt-12">
            <h2 id="ki-untersuchungen-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Passende Untersuchungen</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {RELATED.map((r) => (
                <li key={r.to} className="relative rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-200 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <Link to={r.to} className="font-semibold text-slate-900 after:absolute after:inset-0 hover:text-brand dark:text-white dark:hover:text-brand-300">
                    {r.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{r.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {KI_OVERVIEW_SOURCES.length > 0 && (
            <section aria-labelledby="quellen-title" className="mt-12">
              <h2 id="quellen-title" className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Quellen</h2>
              <ol className="article-html article-sources mt-3">
                {KI_OVERVIEW_SOURCES.map((src) => <li key={src} dangerouslySetInnerHTML={{ __html: src }} />)}
              </ol>
            </section>
          )}

          <footer className="mt-12 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {S.review && <Placeholder internal>Freigabe: {S.review}</Placeholder>}
            <p>Diese Seite dient der allgemeinen Information und ersetzt keine ärztliche Beratung.</p>
          </footer>
        </Container>
      </article>
      <EndCTA targetId="roentgen" />
    </>
  );
};

export default KiSeriesPage;
