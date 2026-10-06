import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ExternalLink, Stethoscope } from 'lucide-react';
import Hero from '../ui/Hero';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Notice from '../ui/Notice';
import Placeholder from '../ui/Placeholder';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import Container from '../ui/Container';
import { SectionHeading } from '../ui/Heading';
import { BookingButton, PhoneButton } from '../ui/BookingButtons';
import { IMAGE_BRIEFS } from '../../data/imageBriefs';
import { GOAL_IMAGES, SOURCES, goalById, HUB } from '../../data/healthGoals';
import { BODY, BODY_PRICE_TEXT, BODY_PACKAGE_TEXT } from '../../data/bodyComposition';
import { OPENING_HOURS } from '../../data/practice';

// Gemeinsame Bausteine der Gesundheitsziel-Seiten (/gesundheitsziele/*).
// Texte stehen in den Seiten selbst; Fakten (Preise, Kassen, Screening) kommen aus src/data/*.

const img = (name) => `${import.meta.env.BASE_URL}assets/images/${name}`;
export const photoSrcSet = (name) =>
  `${img(`${name}-mobile.avif`)} 800w, ${img(`${name}-tablet.avif`)} 1200w, ${img(`${name}.avif`)} 1920w`;

// Foto aus GOAL_IMAGES oder Platzhalter aus IMAGE_BRIEFS
export const GoalImage = ({ imageKey, sizes = '(max-width: 767px) 100vw, 400px', className = 'aspect-[4/3] w-full', eager = false }) => {
  const photo = GOAL_IMAGES[imageKey];
  if (!photo) return <ImagePlaceholder brief={IMAGE_BRIEFS[imageKey]} className={`${className} rounded-none`} />;
  return (
    <img
      src={img(`${photo.name}.avif`)}
      srcSet={photoSrcSet(photo.name)}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      className={`${className} object-cover`}
    />
  );
};

export const H3 = ({ children, className = '', id }) => (
  <h3 id={id} className={`font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white ${className}`}>{children}</h3>
);
export const P = ({ children, className = '' }) => (
  <p className={`text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200 ${className}`}>{children}</p>
);
export const Bullets = ({ items, cols = false }) => (
  <ul className={cols ? 'grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2' : 'space-y-3'}>
    {items.map((item) => (
      <li key={typeof item === 'string' ? item : item.key} className="flex gap-3 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">
        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
        <span>{typeof item === 'string' ? item : item.content}</span>
      </li>
    ))}
  </ul>
);
export const textLink = 'inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300';
export const NewWindow = () => <span className="sr-only"> (öffnet in neuem Fenster)</span>;

// Weiche Trennstellen für lange Komposita in Überschriften (Browser trennt sonst falsch, z. B. „Körpe-ranalyse“)
const SHY = [
  ['Körperzusammensetzung', 'Körper\u00ADzusammen\u00ADsetzung'],
  ['Knochendichtemessung', 'Knochen\u00ADdichte\u00ADmessung'],
  ['Knochengesundheit', 'Knochen\u00ADgesundheit'],
  ['Körperanalyse', 'Körper\u00ADanalyse'],
  ['Muskelmasse', 'Muskel\u00ADmasse'],
  ['Muskelverlust', 'Muskel\u00ADverlust'],
  ['Wechseljahre', 'Wechsel\u00ADjahre'],
  ['Trainingserfolg', 'Trainings\u00ADerfolg'],
  ['Abnehmspritze', 'Abnehm\u00ADspritze'],
  ['Brustkrebs-Früherkennung', 'Brustkrebs-Früh\u00ADerkennung'],
  ['Verlaufskontrolle', 'Verlaufs\u00ADkontrolle'],
  ['Ausgangsmessung', 'Ausgangs\u00ADmessung'],
];
export const shy = (t) => SHY.reduce((acc, [a, b]) => acc.split(a).join(b), t);

// Seitenrahmen: manuelle Trennung in Überschriften
export const GoalPage = ({ children }) => <div className="[&_:is(h1,h2,h3,h4)]:hyphens-manual">{children}</div>;

// Hero einer Zielseite: Brotkrumen Startseite › Gesundheitsziele › Seite, H1, Einleitung, Foto
export const GoalHero = ({ goalId, eyebrow, lead, keyMessage, actions, facts }) => {
  const g = goalById[goalId];
  const photo = GOAL_IMAGES[g.image];
  return (
    <Hero
      breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: HUB.crumb, href: '/gesundheitsziele' }, { name: g.crumb }]}
      eyebrow={eyebrow}
      title={shy(g.h1)}
      lead={lead}
      keyMessage={keyMessage}
      facts={facts}
      actions={actions}
      image={photo ? { src: img(`${photo.name}.avif`), srcSet: photoSrcSet(photo.name), sizes: '(max-width: 1023px) 100vw, 600px', alt: photo.alt, width: photo.width, height: photo.height, priority: true } : undefined}
      imageSlot={photo ? undefined : <ImagePlaceholder brief={IMAGE_BRIEFS[g.image]} className="h-full w-full" />}
    />
  );
};

// „Auf dieser Seite“ – Sprungnavigation (mobil hilfreich bei langen Seiten)
export const OnThisPage = ({ items }) => (
  <nav aria-label="Auf dieser Seite" className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <Container className="py-3">
      <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[0.95rem]">
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} className="inline-flex min-h-[44px] items-center rounded-lg px-2 font-medium text-slate-700 underline-offset-4 hover:text-brand hover:underline dark:text-slate-200 dark:hover:text-brand-300">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  </nav>
);

// Leistungsseiten-Verweis (Karte mit Link + optionaler Buchung)
export const ServiceLinkCard = ({ icon: Icon, title, text, to, linkLabel, bookingLabel, service, children, id }) => (
  <Card className="flex h-full flex-col" aria-labelledby={id}>
    <div className="flex items-start gap-3">
      {Icon && <Icon size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />}
      <H3 id={id}>{title}</H3>
    </div>
    <P className="mt-3">{text}</P>
    {children}
    <div className="mt-auto flex flex-col gap-2 pt-5">
      {bookingLabel && <BookingButton label={bookingLabel} service={service} className="!justify-start sm:!justify-center" />}
      <Link to={to} className={textLink}>
        {linkLabel} <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  </Card>
);

// Preise der Körperanalyse – ausschließlich aus bodyComposition.js
export const BodyPriceNote = ({ className = '' }) => (
  <p className={`text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300 ${className}`}>
    Die Körperanalyse ist eine Privatleistung und ohne Zuweisung buchbar: {BODY_PRICE_TEXT} je Messung
    {BODY_PACKAGE_TEXT && <>, Paket aus Start- und Folgemessung {BODY_PACKAGE_TEXT} ({BODY.packageConditions.replace(/^B/, 'b')})</>}.
    {' '}Das Paket vereinbaren Sie derzeit telefonisch.
  </p>
);

// Verwandte Gesundheitsziele (Querverlinkung statt doppeltem Text)
export const RelatedGoals = ({ ids, title = 'Passende Gesundheitsziele' }) => (
  <Section labelledBy="verwandt-title" spacing="sm">
    <h2 id="verwandt-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
    <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ids.map((id) => {
        const g = goalById[id];
        return (
          <li key={id}>
            <Link
              to={g.path}
              data-cta="goal"
              data-cta-service={id}
              className="card-lift flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:shadow-sm hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300"
            >
              <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> {g.navName}
            </Link>
          </li>
        );
      })}
      <li>
        <Link to="/gesundheitsziele" className="card-lift flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:shadow-sm hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300">
          <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Alle Gesundheitsziele
        </Link>
      </li>
    </ul>
  </Section>
);

// Ärztliche Prüfung + Quellen (ruhig, am Seitenende)
export const SourcesSection = ({ keys }) => (
  <Section tone="muted" spacing="sm" labelledBy="quellen-title">
    <h2 id="quellen-title" className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Medizinische Quellen</h2>
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">
      {keys.map((k) => (
        <li key={k}>
          {SOURCES[k].label}{' '}
          <a href={SOURCES[k].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-brand underline underline-offset-4 dark:text-brand-300">
            Quelle öffnen<NewWindow /> <ExternalLink size={14} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ol>
    <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <Stethoscope size={16} aria-hidden="true" />
      Medizinisch geprüft von <Placeholder inline>Dr. [NAME]</Placeholder> – Stand <Placeholder inline>[DATUM]</Placeholder>
    </p>
    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
      Diese Seite dient der allgemeinen Information und ersetzt keine ärztliche Beratung.
    </p>
  </Section>
);

// Ratgeber-Verweis
export const RatgeberLink = ({ to = '/ratgeber', children }) => (
  <Link to={to} className={textLink}>
    <BookOpen size={18} aria-hidden="true" /> {children}
  </Link>
);

// Abschluss mit mehreren untersuchungsspezifischen Buchungswegen (jede Leistung eigener Button)
export const MultiCTA = ({ id, title, text, items }) => (
  <section aria-labelledby={id} className="bg-brand-800 text-white">
    <Container className="py-14 sm:py-16">
      <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      {text && <p className="mt-3 max-w-2xl text-lg text-brand-50">{text}</p>}
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li key={i.service} className="flex flex-col gap-3 rounded-2xl border border-white/25 p-5">
            <p className="font-display text-lg font-semibold text-white">{i.title}</p>
            {i.note && <p className="text-sm text-brand-50">{i.note}</p>}
            <div className="mt-auto flex flex-col gap-2">
              <BookingButton variant="inverse" label={i.bookingLabel} service={i.service} />
              <Link to={i.to} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-white underline-offset-4 hover:underline">
                {i.linkLabel} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <PhoneButton label="Telefonisch vereinbaren" variant="secondary" size="lg" className="!border-white/60 !bg-transparent !text-white hover:!bg-white/10" />
        <p className="text-sm text-white">Öffnungszeiten: {OPENING_HOURS.map((h) => `${h.short} ${h.opens}–${h.closes}`).join(', ')} Uhr</p>
      </div>
    </Container>
  </section>
);

// Hinweis bei Warnzeichen
export const SeeDoctor = ({ title = 'Bitte zuerst ärztlich abklären lassen', children, className }) => (
  <Notice tone="important" title={title} className={className}>{children}</Notice>
);

export { Section, Card, Notice, Placeholder, SectionHeading, BookingButton, PhoneButton, goalById };
