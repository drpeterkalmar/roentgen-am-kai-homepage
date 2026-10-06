import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Phone, MapPin, Pill, Bone, Scissors, UserRound, HeartHandshake, Activity, Stethoscope } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Notice from '../components/ui/Notice';
import Placeholder from '../components/ui/Placeholder';
import { SectionHeading } from '../components/ui/Heading';
import { GoalImage, MultiCTA, SourcesSection, NewWindow } from '../components/goals/GoalParts';
import { HUB, HUB_GOALS, goalById, LEGACY_GOAL_ANCHORS } from '../data/healthGoals';
import { BOOKING_URL, PHONE_HREF, PHONE_DISPLAY } from '../data/practice';

// Übersicht /gesundheitsziele – führt über die Situation (nicht das Gerät) zur passenden Zielseite.
// Karten-Texte: Wortlaut Auftrag 27.09.2026 (src/data/healthGoals.js).
// „Weitere medizinische Situationen“: bewusst nur Abschnitte, KEINE eigenen (dünnen) URLs.
// Frühere Anker (#gewicht, #fitness, #wechseljahre, #osteoporose) leiten auf die neuen Zielseiten weiter.

const rowLink =
  'flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300';
const smallLink = 'inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300';

const SITUATIONS = [
  {
    id: 'cortison',
    icon: Pill,
    title: 'Langzeit-Cortison und Knochengesundheit',
    text: 'Eine längerfristige Behandlung mit Cortison-Präparaten (Glukokortikoiden) kann das Osteoporoserisiko erhöhen. Ob und wann eine Knochendichtemessung sinnvoll ist, klären Sie mit der Ärztin oder dem Arzt, die Ihre Therapie betreuen.',
    to: '/knochendichtemessung-graz',
    link: 'Zur Knochendichtemessung',
  },
  {
    id: 'fraktur',
    icon: Bone,
    title: 'Sturz oder Knochenbruch nach geringer Krafteinwirkung',
    text: 'Ein Bruch nach einem Sturz aus dem Stand oder bei geringer Belastung gehört zuerst ärztlich abgeklärt und behandelt. Danach kann eine Beurteilung auf Osteoporose sinnvoll sein – die Knochendichtemessung ist ein Teil davon, nicht die ganze Abklärung.',
    to: '/knochendichtemessung-graz',
    link: 'Zur Knochendichtemessung',
  },
  {
    id: 'bariatrisch',
    icon: Scissors,
    title: 'Körperanalyse nach einer Adipositas-Operation',
    text: 'Nach einer bariatrischen Operation kann die Körperanalyse Veränderungen von Fett- und Magermasse im Verlauf dokumentieren. Über Therapie und Nährstoffversorgung entscheidet das behandelnde Team – aus einer DEXA-Messung allein lässt sich das nicht ableiten.',
    to: `${goalById.abnehmen.path}#bariatrisch`,
    link: 'Mehr unter „Gesund abnehmen“',
  },
  {
    id: 'maenner',
    icon: UserRound,
    title: 'Muskel- und Knochengesundheit für Männer ab 60',
    text: 'Osteoporose und der Verlust von Muskelmasse betreffen auch Männer. Ob eine Knochendichtemessung angezeigt ist, hängt bei Männern vor allem vom Alter und von persönlichen Risikofaktoren ab.',
    to: goalById.aelter.path,
    link: 'Mehr unter „Gesund älter werden“',
  },
  {
    id: 'untergewicht',
    icon: HeartHandshake,
    title: 'Untergewicht und Essstörungen',
    text: 'Bei starkem Untergewicht oder einer Essstörung können auch Knochen und Muskulatur betroffen sein. DEXA kann Knochendichte und Körperzusammensetzung erfassen, ersetzt aber keine Behandlung durch ein erfahrenes, fachübergreifendes Team. Eine gute erste Anlaufstelle ist Ihre Hausärztin oder Ihr Hausarzt.',
    to: '/knochendichtemessung-graz',
    link: 'Zur Knochendichtemessung',
  },
];

const GesundheitszielePage = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const target = LEGACY_GOAL_ANCHORS[hash.replace('#', '')];
    if (target) navigate(target, { replace: true });
  }, [hash, navigate]);

  return (
    <>
      <Hero breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: HUB.crumb }]} title={HUB.h1} lead={HUB.lead} />

      {/* 6 gleichwertige Themenkarten */}
      <Section labelledBy="ziele-title">
        <h2 id="ziele-title" className="sr-only">Gesundheitsziele im Überblick</h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HUB_GOALS.map((g, i) => (
            <li key={g.id} className="flex">
              <Card padding="p-0" className="flex w-full flex-col overflow-hidden">
                <GoalImage imageKey={g.image} eager={i < 2} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{g.card.title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-slate-600 dark:text-slate-300">{g.card.text}</p>
                  <div className="mt-auto pt-5">
                    <Link
                      to={g.path}
                      data-cta="goal"
                      data-cta-service={g.id}
                      className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-brand-50 px-5 font-semibold text-brand-800 hover:bg-brand-100 dark:bg-slate-800 dark:text-brand-200 dark:hover:bg-slate-700"
                    >
                      Mehr erfahren<span className="sr-only">: {g.card.title}</span> <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Nicht sicher? */}
      <Section tone="muted" labelledBy="unsicher-title">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading id="unsicher-title" title="Nicht sicher, welche Untersuchung Sie benötigen?" className="!mb-5" />
            <p className="text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">
              Rufen Sie uns an. Wir sagen Ihnen, welche Untersuchung bei uns für Ihr Anliegen in Frage kommt, ob Sie dafür
              eine Zuweisung benötigen und wie Sie einen Termin bekommen.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <li>
                <a href={PHONE_HREF} data-cta="phone" data-cta-service="gesundheitsziele" className={rowLink}>
                  <Phone size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" />
                  <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <Link to="/kontakt" className={rowLink}>
                  <MapPin size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Kontakt und Anfahrt
                </Link>
              </li>
              <li className="sm:col-span-2">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="booking" data-cta-service="gesundheitsziele" className={rowLink}>
                  <CalendarCheck size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Termin online buchen<NewWindow />
                </a>
              </li>
            </ul>
            <Placeholder internal className="mt-5">
              Eine eigene Terminübersicht (welche Untersuchung online, welche telefonisch buchbar) gibt es noch nicht – bis
              dahin führen die Links zur Online-Buchung und zum Telefon.
            </Placeholder>
          </div>
          <div className="flex flex-col gap-5 self-start">
            <Notice tone="important" title="Bei akuten oder unklaren Beschwerden" headingLevel={3}>
              <p>
                Diese Seite hilft bei der Orientierung und ersetzt keine ärztliche Untersuchung. Wenden Sie sich bei neuen,
                starken oder unklaren Beschwerden zuerst an Ihre Hausärztin oder Ihren Hausarzt. In Notfällen wählen Sie
                den Notruf <a href="tel:144" className="font-semibold underline underline-offset-4">144</a>.
              </p>
            </Notice>
            <Card tone="default" padding="p-5">
              <div className="flex gap-3">
                <Stethoscope size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Beschwerden mit Zuweisung abklären</h3>
                  <p className="mt-1 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">
                    Hat Ihre Ärztin oder Ihr Arzt eine Untersuchung angeordnet, finden Sie Röntgen, Ultraschall und weitere
                    Leistungen hier:
                  </p>
                  <p className="mt-1">
                    <Link to="/weitere-untersuchungen" className={smallLink}>
                      Weitere Untersuchungen <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Weitere medizinische Situationen (nur Abschnitte, keine eigenen URLs) */}
      <Section labelledBy="situationen-title">
        <SectionHeading
          id="situationen-title"
          title="Weitere medizinische Situationen"
          lead="Kurz erklärt, mit dem Weg zur passenden Untersuchung. Ob eine Messung sinnvoll ist, entscheidet Ihre behandelnde Ärztin oder Ihr behandelnder Arzt."
        />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SITUATIONS.map((s) => (
            <li key={s.id} id={s.id} className="flex">
              <Card tone="muted" className="flex w-full flex-col">
                <div className="flex items-start gap-3">
                  <s.icon size={22} aria-hidden="true" className="mt-1 shrink-0 text-brand dark:text-brand-300" />
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">{s.title}</h3>
                </div>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">{s.text}</p>
                <p className="mt-auto pt-3">
                  <Link to={s.to} className={smallLink}>
                    {s.link} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </p>
              </Card>
            </li>
          ))}
          <li id="sport" className="flex">
            <Card tone="muted" className="flex w-full flex-col">
              <div className="flex items-start gap-3">
                <Activity size={22} aria-hidden="true" className="mt-1 shrink-0 text-brand dark:text-brand-300" />
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">{goalById.sport.card.title}</h3>
              </div>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">{goalById.sport.card.text}</p>
              <p className="mt-auto pt-3">
                <Link to={goalById.sport.path} data-cta="goal" data-cta-service="sport" className={smallLink}>
                  Zum Spezialthema Sport <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </p>
            </Card>
          </li>
        </ul>
      </Section>

      <SourcesSection keys={['iscd', 'fruehErkennen']} />

      <MultiCTA
        id="ziele-cta-title"
        title="Direkt zur passenden Untersuchung"
        text="Jede Untersuchung hat ihre eigene Fragestellung und ihren eigenen Termin."
        items={[
          { service: 'mammographie', title: 'Mammographie', bookingLabel: 'Mammographie-Termin buchen', to: '/mammographie-graz', linkLabel: 'Zur Mammographie' },
          { service: 'knochendichte', title: 'Knochendichtemessung', bookingLabel: 'Knochendichtemessung buchen', to: '/knochendichtemessung-graz', linkLabel: 'Zur Knochendichtemessung' },
          { service: 'koerperanalyse', title: 'Medizinische Körperanalyse', bookingLabel: 'Körperanalyse buchen', to: '/koerperanalyse-graz', linkLabel: 'Zur Körperanalyse' },
        ]}
      />
    </>
  );
};

export default GesundheitszielePage;
