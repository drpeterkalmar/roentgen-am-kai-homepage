import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, CalendarCheck, CheckCircle2, MapPin, Phone, Scale, Activity, Dumbbell, HeartPulse,
  Syringe, TrendingDown, UserRound, PersonStanding, BarChart3, Bone, Repeat, SplitSquareHorizontal, Info,
} from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Notice from '../components/ui/Notice';
import Placeholder from '../components/ui/Placeholder';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import CTASection from '../components/ui/CTASection';
import Button, { buttonClasses } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/Heading';
import { BookingButton, PhoneButton } from '../components/ui/BookingButtons';
import FAQ, { useRouteFaq } from '../components/FAQ';
import DexaScanFigure from '../components/DexaScanFigure';
import DexaReportSlider, { DexaSources } from '../components/dexa/DexaReportSlider';
import { DEXA_SECTION } from '../data/dexaReportExamples';
import { imageUrl, imageSrcSet } from '../components/ui/Picture';
import { H3, P, Bullets, NewWindow, linkRow, textLink } from '../components/ui/Text';
import { IMAGE_BRIEFS } from '../data/imageBriefs';
import { PHONE_HREF, PHONE_DISPLAY, MAPS_ROUTE_URL, BOOKING_URL, ADDRESS, TRANSPORT } from '../data/practice';
import {
  BODY, BODY_H1, BODY_LEAD, BODY_KEY_MESSAGE, BODY_RADIATION_TEXT, BODY_LEAN_MASS_TEXT, BODY_DURATION_TEXT,
} from '../data/bodyComposition';

// Körperanalyse mit DEXA – /koerperanalyse-graz (ersetzt /unser-angebot/koerperfettmessung, Weiterleitung).
// Praxisangaben (Dauer, Preise, Paket, Vorbereitung, CoreScan, ALMI): src/data/bodyComposition.js – offen = Platzhalter.
// FAQ: src/data/faqData.js (koerperanalyseFaq). Nur vollständig beantwortete Fragen gehen ins FAQPage-Schema.
// Leitplanken: „Körperanalyse“ als Hauptbegriff; DEXA misst magere Weichteilmasse (Näherungswert), nicht Kraft;
// DEXA ist keine alleinige Sarkopenie-Diagnose; keine Abnehm-, Trainings- oder Heilversprechen; BIA nicht abwerten.

const Val = ({ value, label }) => (value != null ? <>{value}</> : <Placeholder inline>{label}</Placeholder>);

const TRUST = ['Medizinisch präzise Messung', 'Regionale Auswertung', 'Ideal für Verlaufskontrollen'];

const RESULTS = [
  { icon: Scale, t: 'Körperfettanteil und gesamte Fettmasse', d: 'Wie viel Ihres Körpergewichts aus Fett besteht – in Prozent und in Kilogramm.' },
  { icon: Activity, t: 'Fettfreie beziehungsweise magere Weichteilmasse', d: 'Alles, was weder Fett noch Knochen ist – darunter die Muskulatur. Dieser Wert dient als Näherungswert für Ihre Muskelmasse.' },
  { icon: PersonStanding, t: 'Verteilung auf Arme, Beine und Rumpf', d: 'Wo sich Fett- und Magermasse befinden – für jede Körperregion getrennt ausgewertet.' },
  { icon: SplitSquareHorizontal, t: 'Seitenvergleich links und rechts', d: 'Unterschiede zwischen linker und rechter Körperhälfte, etwa nach Verletzungen oder bei einseitiger Belastung.' },
  { icon: Bone, t: 'Knochenmineralgehalt', d: 'Der Mineralgehalt des Skeletts als Teil der Körperzusammensetzung. Er ersetzt keine Knochendichtemessung.' },
  { icon: Repeat, t: 'Vergleich mit späteren Verlaufsmessungen', d: 'Folgemessungen zeigen, ob sich Fett, Muskelmasse oder beides verändert haben.' },
];

const AUDIENCES = [
  { icon: TrendingDown, t: 'Gewichtsabnahme', d: 'Fettverlust und mögliche Veränderungen der fettfreien Masse nachvollziehen.', href: '#abnehmen', link: 'Mehr zum Abnehmen' },
  { icon: Syringe, t: 'Behandlung mit einer Abnehmspritze', d: 'Ausgangsmessung und Verlaufskontrolle während einer ärztlich begleiteten Therapie.', href: '#abnehmen', link: 'Mehr zu Verlaufsmessungen' },
  { icon: Dumbbell, t: 'Fitness und Muskelaufbau', d: 'Trainingserfolge objektiver beurteilen, auch wenn sich das Körpergewicht kaum verändert.', href: '#training', link: 'Mehr zum Training' },
  { icon: HeartPulse, t: 'Ausdauer- und Leistungssport', d: 'Körperzusammensetzung und regionale Verteilung im Verlauf dokumentieren.', href: '#training', link: 'Mehr zu Messvarianten' },
  { icon: UserRound, t: 'Wechseljahre und gesundes Älterwerden', d: 'Veränderungen von Fettverteilung und Muskelmasse frühzeitig erkennen.', to: '/gesundheitsziele/frauengesundheit-wechseljahre', link: 'Zum Gesundheitsziel Wechseljahre' },
  { icon: BarChart3, t: 'Muskelverlust und Sarkopenie', d: 'Niedrige Muskelmasse als Bestandteil einer weiterführenden medizinischen Abklärung erfassen.', href: '#sarkopenie', link: 'Mehr zur Sarkopenie' },
];

const WEIGHT_GROUPS = [
  'Sie stellen Ihre Ernährung um.',
  'Sie erhalten ärztlich verordnete GLP-1- oder GIP-basierte Medikamente.',
  'Sie stehen vor oder mitten in einer größeren Gewichtsabnahme.',
  'Sie möchten Fett reduzieren und Ihre Muskelmasse möglichst erhalten.',
];

const WEIGHT_STEPS = [
  { t: 'Ausgangsmessung zu Beginn', d: 'Die erste Messung hält Ihre Körperzusammensetzung vor oder zu Beginn der Gewichtsabnahme fest.' },
  { t: 'Verlaufsmessung nach einem medizinisch sinnvollen Zeitraum', d: 'Häufig nach mehreren Monaten. Der geeignete Abstand hängt von Ihrem individuellen Verlauf ab.' },
  { t: 'Verständlicher Ergebnisvergleich', d: 'Der Messbericht stellt die Werte gegenüber: Wie haben sich Fettmasse und fettfreie Masse verändert?' },
];

const TRAINING_USES = [
  'Krafttraining und Muskelaufbau',
  'Ausdauersport',
  'Trainingsbeginn und Trainingsumstellung',
  'Langfristige Fitnessprogramme',
  'Objektive Vorher-nachher-Vergleiche',
];

const SARCO_SIGNS = [
  'Nachlassende Kraft',
  'Schwierigkeiten beim Aufstehen oder Treppensteigen',
  'Wiederholte Stürze',
  'Ungewollter Gewichtsverlust',
  'Längere Immobilität oder Krankenhausaufenthalte',
  'Deutlich reduzierte körperliche Belastbarkeit',
];

const COMPARISON = [
  {
    method: 'Körpergewicht / BMI',
    shows: 'Zeigt das Gewicht beziehungsweise das Verhältnis von Gewicht und Größe.',
    note: 'Unterscheidet nicht zwischen Fett- und Muskelmasse.',
  },
  {
    method: 'Körperfettwaage / BIA',
    shows: 'Schätzt die Körperzusammensetzung über den elektrischen Widerstand und Berechnungsmodelle.',
    note: 'Ergebnisse können unter anderem von Gerät, Algorithmus und Flüssigkeitshaushalt beeinflusst werden. Für Vergleiche am besten immer dasselbe Gerät unter ähnlichen Bedingungen verwenden.',
  },
  {
    method: 'DEXA',
    shows: 'In der klinischen Praxis etablierte, sehr präzise und gut reproduzierbare Referenzmethode.',
    note: 'Liefert eine regionale Auswertung von Fettmasse, magerer Weichteilmasse und Knochenmineral – gut geeignet für standardisierte Verlaufskontrollen.',
  },
];

const KoerperanalysePage = () => {
  const faq = useRouteFaq(); // FAQ laut Routentabelle (routes.js: faq) = FAQPage-Schema
  const variants = [
    {
      id: 'start',
      t: 'Startmessung',
      d: 'Ihre Ausgangswerte zu Beginn – als Referenz für alle späteren Vergleiche.',
      price: BODY.prices.start,
      cta: 'Startmessung buchen',
    },
    {
      id: 'single',
      t: 'Einzelne Verlaufskontrolle',
      d: 'Eine Folgemessung, die mit Ihrer letzten Messung verglichen wird.',
      price: BODY.prices.single,
      cta: 'Verlaufskontrolle buchen',
    },
    {
      id: 'package',
      t: 'Start- und Re-Check-Paket',
      d: 'Ausgangsmessung und eine spätere Verlaufsmessung zum Paketpreis.',
      price: BODY.prices.package,
      interval: true,
      cta: 'Paket telefonisch anfragen',
    },
  ];

  return (
    <div className="[&_:is(h1,h2,h3,h4)]:hyphens-manual">
      {/* 1. Hero – Nutzen zuerst, Termin im ersten Bildschirm */}
      <Hero
        ambient={['scan']}
        breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Körperanalyse' }]}
        eyebrow="Medizinische Ganzkörperanalyse mit DEXA"
        // weiche Trennstellen nur an Wortfugen (automatische Trennung lieferte „Körpe-ranalyse“)
        title={BODY_H1.replace(/Körper(analyse|fett)/g, 'Körper\u00AD$1').replace('Muskelmasse', 'Muskel\u00ADmasse')}
        lead={BODY_LEAD}
        keyMessage={BODY_KEY_MESSAGE}
        actions={
          <>
            <BookingButton size="lg" label="Körperanalyse buchen" />
            <a href="#ablauf" className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
              So funktioniert die Messung
            </a>
          </>
        }
        meta={
          <a href={PHONE_HREF} className="inline-flex min-h-[44px] items-center gap-2 text-base font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-brand dark:text-white">
            <Phone size={18} aria-hidden="true" className="text-brand dark:text-brand-300" />
            Telefonisch: {PHONE_DISPLAY}
          </a>
        }
        // Hochformat-Praxisfoto: Ausschnitt auf die DEXA-Liege (unteres Bilddrittel) statt auf Tür/Fenster
        // Übergang: dasselbe reale GE-Lunar-Foto wie Knochendichte (Gerät dominant). service_densitometry
        // zeigte vor allem Tür/Schreibtisch. Wunschmotiv (Person bei der Messung) → IMAGE_BRIEFS.bodyHero.
        imageSlot={
          <img
            src={imageUrl('knochendichte_v3')}
            srcSet={imageSrcSet('knochendichte_v3')}
            sizes="(max-width: 1023px) 100vw, 50vw"
            alt={IMAGE_BRIEFS.bodyHero.alt}
            width={1920}
            height={1280}
            fetchPriority="high"
            loading="eager"
            className="h-full w-full object-cover"
          />
        }
      >
        <ul className="mt-6 grid gap-2 sm:grid-cols-3 sm:gap-3" aria-label="Ihre Vorteile">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> {t}
            </li>
          ))}
        </ul>
        {!BODY.booking.serviceInMiraNext && (
          <Placeholder internal className="mt-5">
            Konfiguration Buchung: Die Körperanalyse ist in MiraNext noch nicht als Untersuchung angelegt (geprüft 27.09.2026).
            Die Buchungsbuttons führen bis dahin zur allgemeinen Online-Buchung; das Paket wird telefonisch angefragt, bis
            geklärt ist, ob MiraNext es abbilden kann. Nach dem Anlegen in src/data/bodyComposition.js
            „serviceInMiraNext: true“ setzen.
          </Placeholder>
        )}
      </Hero>

      {/* 2. Was zeigt eine medizinische Körperanalyse? */}
      <Section labelledBy="zeigt-title">
        <SectionHeading
          id="zeigt-title"
          title="Was zeigt eine medizinische Körperanalyse?"
          lead="Ob Sie Ihr Körperfett messen oder Ihre Muskelmasse messen lassen möchten: Die Körperanalyse zeigt, woraus Ihr Gewicht besteht und wo es sitzt – nicht nur, wie viel Sie wiegen."
          className="!mb-6"
        />
        <P className="max-w-3xl">
          Dafür setzen wir die medizinische DEXA-Methode ein (Dual-Röntgen-Absorptiometrie). Sie liegen dabei ruhig auf dem
          Untersuchungstisch, während das Gerät Ihren Körper mit zwei sehr schwachen Röntgenenergien abtastet. Weil Fett,
          fettfreies Gewebe und Knochen diese Energien unterschiedlich abschwächen, lassen sie sich voneinander trennen.
        </P>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map(({ icon: Icon, t, d }) => (
            <li key={t}>
              <Card className="h-full" padding="p-6">
                <Icon size={24} aria-hidden="true" className="text-brand dark:text-brand-300" />
                <H3 className="mt-3 !text-lg">{t}</H3>
                <P className="mt-2">{d}</P>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Notice title="Muskelmasse – fachlich genau" tone="info">
            <p>{BODY_LEAN_MASS_TEXT}</p>
          </Notice>
          <div className="rounded-2xl bg-brand-800 p-6 text-white sm:p-8" role="note">
            <p className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              DEXA macht sichtbar, was Körpergewicht und BMI nicht unterscheiden können.
            </p>
          </div>
        </div>
        {BODY.visceralFat ? (
          <P className="mt-6 max-w-3xl">Zusätzlich wertet die Software unseres Geräts das viszerale Fett (inneres Bauchfett) aus.</P>
        ) : (
          <Placeholder internal className="mt-6">
            Viszerales Fett wird nicht versprochen: Am GE Lunar Prodigy liefert nur die lizenzpflichtige Zusatzsoftware CoreScan
            (enCORE) diesen Wert. Praxis bestätigen, ob CoreScan freigeschaltet ist – dann in bodyComposition.js
            „visceralFat: true“ setzen.
          </Placeholder>
        )}
      </Section>

      {/* 2b. Befund-Slider: anonymisierte Beispielbefunde mit erklärten Messwerten (src/data/dexaReportExamples.js) */}
      <Section tone="muted" id="beispielbefund" labelledBy="befund-title">
        <SectionHeading id="befund-title" title={DEXA_SECTION.title} lead={DEXA_SECTION.lead} className="!mb-6" />
        <DexaReportSlider />
        <Notice tone="info" className="mt-8 max-w-3xl">
          <p data-dexa-notice="">{DEXA_SECTION.notice}</p>
        </Notice>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <BookingButton size="lg" label={DEXA_SECTION.cta} service="koerperanalyse" />
          <PhoneButton service="koerperanalyse" />
        </div>
        <DexaSources className="mt-10 max-w-3xl border-t border-slate-200 pt-6 dark:border-slate-700" />
      </Section>

      {/* 3. Für wen? */}
      <Section tone="muted" id="fuer-wen" labelledBy="wen-title">
        <SectionHeading id="wen-title" title="Für wen ist eine DEXA-Körperanalyse interessant?" className="!mb-8" />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map(({ icon: Icon, t, d, href, to, link }) => (
            <li key={t}>
              <Card className="flex h-full flex-col" padding="p-6">
                <Icon size={24} aria-hidden="true" className="text-brand dark:text-brand-300" />
                <H3 className="mt-3 !text-lg">{t}</H3>
                <P className="mt-2">{d}</P>
                <p className="mt-auto pt-3">
                  {to ? (
                    <Link to={to} className={textLink}>{link} <ArrowRight size={16} aria-hidden="true" /></Link>
                  ) : (
                    <a href={href} className={textLink}>{link} <ArrowRight size={16} aria-hidden="true" /></a>
                  )}
                </p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a href="#faq" className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
            Welche Messung passt zu meinem Ziel?
          </a>
        </div>
      </Section>

      {/* 4. Abnehmen – hervorgehoben */}
      <Section tone="brand" id="abnehmen" labelledBy="abnehmen-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-3 text-sm font-semibold text-brand dark:text-brand-300">Gewichtsabnahme und Abnehmspritze</p>
            <h2 id="abnehmen-title" className="font-display text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Abnehmen: Verlieren Sie Fett – oder auch wertvolle Muskelmasse?
            </h2>
            <P className="mt-5">
              Die Waage zeigt nur die gesamte Gewichtsveränderung. Bei einer deutlichen Gewichtsabnahme können sich sowohl die
              Fettmasse als auch die fettfreie Masse verändern. Eine DEXA-Körperanalyse dokumentiert diese Entwicklung objektiv.
            </P>
            <H3 className="mt-6 !text-lg">Interessant für Sie, wenn …</H3>
            <div className="mt-3"><Bullets items={WEIGHT_GROUPS} /></div>
            <Notice tone="important" className="mt-6" title="Keine Kontrolle der Medikamentendosis">
              <p>
                Die Messung dokumentiert Ihre Körperzusammensetzung. Sie dient nicht der Kontrolle der Medikamentendosis.
                Änderungen einer medikamentösen Behandlung erfolgen ausschließlich durch die behandelnde Ärztin oder den
                behandelnden Arzt.
              </p>
            </Notice>
          </div>
          <Card as="section" aria-labelledby="verlauf-title">
            <H3 id="verlauf-title">So funktioniert die Verlaufskontrolle</H3>
            <ol className="mt-5 space-y-5">
              {WEIGHT_STEPS.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{s.t}</p>
                    <P className="mt-1">{s.d}</P>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-col gap-3">
              <BookingButton size="lg" label="Ausgangsmessung oder Verlaufskontrolle buchen" className="!text-base" />
              <Link to="/gesundheitsziele/abnehmspritze-koerperanalyse" className={textLink}>
                Gesundheitsziel Abnehmspritze und Muskelverlust <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      {/* 5. Training */}
      <Section id="training" labelledBy="training-title">
        <SectionHeading
          id="training-title"
          title="Trainingserfolg sichtbar machen"
          lead="Mehr Muskelmasse und weniger Fett können sich gleichzeitig entwickeln. Deshalb kann sich der Körper deutlich verändern, obwohl das Gewicht auf der Waage nahezu gleich bleibt."
          className="!mb-6"
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <P>Eine Körperanalyse macht diese Veränderungen messbar – hilfreich bei:</P>
            <div className="mt-4"><Bullets items={TRAINING_USES} cols /></div>
          </div>
          <div className="lg:col-span-2">
            <Notice tone="info" title="Was DEXA nicht misst">
              <p>
                DEXA dokumentiert die Körperzusammensetzung, misst aber weder Muskelkraft noch Ausdauer oder sportliche
                Leistungsfähigkeit. Die Untersuchung selbst verbessert keine Leistung.
              </p>
            </Notice>
          </div>
        </div>

        <H3 className="mt-12" id="varianten-title">Drei Möglichkeiten für Ihre Messung</H3>
        <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3" aria-labelledby="varianten-title">
          {variants.map((v) => (
            <li key={v.id}>
              <Card className="flex h-full flex-col" padding="p-6">
                <h4 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{v.t}</h4>
                <P className="mt-2">{v.d}</P>
                <dl className="mt-4 space-y-2 text-slate-700 dark:text-slate-200">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <dt>Preis</dt>
                    <dd className="font-semibold"><Val value={v.price != null ? `${v.price} Euro` : null} label="[PREIS]" /></dd>
                  </div>
                  {v.interval && (
                    <>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <dt>Abstand der Messungen</dt>
                        <dd className="font-semibold"><Val value={BODY.recheckInterval} label="[MESSINTERVALL]" /></dd>
                      </div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <dt>Gültigkeit</dt>
                        <dd className="font-semibold"><Val value={BODY.packageConditions} label="[PAKETBEDINGUNGEN]" /></dd>
                      </div>
                    </>
                  )}
                </dl>
                <div className="mt-auto pt-5">
                  {v.id === 'package' ? (
                    <Button href={PHONE_HREF} variant="secondary" icon={Phone} block data-cta="phone">
                      {v.cta}<span className="sr-only">: Anruf unter {PHONE_DISPLAY}</span>
                    </Button>
                  ) : (
                    <BookingButton label={v.cta} variant="secondary" block />
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
        {(BODY.packageConditions == null || BODY.prices.start == null) && (
          <Placeholder internal className="mt-5">
            Praxis liefern: Preise für Startmessung, Verlaufskontrolle und Paket, Messintervall und Paketbedingungen (Gültigkeit,
            Buchung). Ob MiraNext ein Paket abbilden kann, ist offen – bis dahin Paket telefonisch.
          </Placeholder>
        )}
        <Card tone="muted" className="mt-8">
          <H3 className="!text-lg">Vergleichbar messen</H3>
          <P className="mt-2">
            Verlaufsmessungen sind am aussagekräftigsten, wenn sie möglichst am selben Gerät und unter vergleichbaren
            Bedingungen erfolgen: etwa zu einer ähnlichen Tageszeit, nüchtern und mit entleerter Harnblase.
          </P>
        </Card>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <BookingButton size="lg" label="Meinen Fortschritt objektiv messen" />
          <Link to="/gesundheitsziele/fitness-muskelaufbau" className={buttonClasses({ variant: 'ghost', size: 'lg', className: 'justify-start sm:justify-center' })}>
            Gesundheitsziel Fitness und Muskelaufbau <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* 6. Sarkopenie */}
      <Section tone="muted" id="sarkopenie" labelledBy="sarko-title">
        <SectionHeading id="sarko-title" title="Muskelverlust und Sarkopenie frühzeitig abklären" className="!mb-6" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4">
            <P>
              Sarkopenie bezeichnet einen fortschreitenden Verlust von Muskelkraft und Muskelmasse. Das Risiko steigt unter
              anderem im höheren Lebensalter, kann aber auch durch längere Inaktivität, Erkrankungen, Unterernährung oder eine
              ausgeprägte Gewichtsabnahme beeinflusst werden.
            </P>
            <H3 className="!text-lg">Mögliche Hinweise</H3>
            <Bullets items={SARCO_SIGNS} />
          </div>
          <div className="space-y-5">
            <Card as="section" aria-labelledby="sarko-dexa">
              <H3 id="sarko-dexa">Die Rolle der DEXA</H3>
              <P className="mt-3">
                Mit DEXA lässt sich die magere Masse der Arme und Beine bestimmen.{' '}
                {BODY.appendicularIndex
                  ? 'Ihr Bericht enthält daraus den RSMI – einen Index der mageren Masse von Armen und Beinen im Verhältnis zur Körpergröße.'
                  : 'Daraus können – sofern die Praxissoftware dies ausgibt – Werte wie die appendikuläre Magermasse oder der RSMI beziehungsweise ALMI berechnet werden.'}
              </P>
              {BODY.appendicularIndex == null && (
                <Placeholder internal className="mt-4">
                  Praxis bestätigen: Gibt der Bericht der enCORE-Software appendikuläre Magermasse bzw. ALMI/RSMI aus?
                  (Ein anonymisierter Beispielbericht klärt das.)
                </Placeholder>
              )}
            </Card>
            <Notice tone="important" title="Wichtig">
              <p>
                DEXA allein bestätigt oder widerlegt keine Sarkopenie. Zu einer vollständigen Beurteilung gehören zusätzlich die
                Muskelkraft, beispielsweise Handkraft oder Aufstehtest, und gegebenenfalls die körperliche Leistungsfähigkeit.
                Diese Beurteilung erfolgt durch Ihre behandelnde Ärztin oder Ihren behandelnden Arzt.
              </p>
            </Notice>
            <BookingButton size="lg" label="Muskelmasse als Teil der Abklärung messen" className="!text-base" />
          </div>
        </div>
      </Section>

      {/* 7. Vergleich DEXA / BIA / BMI */}
      <Section id="vergleich" labelledBy="vergleich-title">
        <SectionHeading id="vergleich-title" title="DEXA, Körperfettwaage oder BIA – was ist der Unterschied?" className="!mb-6" />
        {/* Handy: Karten (dieselben Inhalte), ab Tablet: echte Tabelle */}
        <ul className="space-y-4 md:hidden">
          {COMPARISON.map((c) => (
            <li key={c.method}>
              <Card padding="p-5" tone={c.method === 'DEXA' ? 'brand' : 'default'}>
                <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">{c.method}</p>
                <dl className="mt-3 space-y-3">
                  <div>
                    <dt className="text-sm font-semibold text-slate-600 dark:text-slate-300">Was die Methode zeigt</dt>
                    <dd className="mt-1 text-slate-800 dark:text-slate-100">{c.shows}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-slate-600 dark:text-slate-300">Gut zu wissen</dt>
                    <dd className="mt-1 text-slate-800 dark:text-slate-100">{c.note}</dd>
                  </div>
                </dl>
              </Card>
            </li>
          ))}
        </ul>
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block dark:border-slate-700">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Vergleich von Körpergewicht/BMI, Körperfettwaage/BIA und DEXA</caption>
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th scope="col" className="w-1/5 p-4 font-semibold text-slate-900 dark:text-white">Methode</th>
                <th scope="col" className="p-4 font-semibold text-slate-900 dark:text-white">Was die Methode zeigt</th>
                <th scope="col" className="p-4 font-semibold text-slate-900 dark:text-white">Gut zu wissen</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((c) => (
                <tr key={c.method} className={c.method === 'DEXA' ? 'bg-brand-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'}>
                  <th scope="row" className="border-t border-slate-200 p-4 align-top font-semibold text-slate-900 dark:border-slate-700 dark:text-white">{c.method}</th>
                  <td className="border-t border-slate-200 p-4 align-top text-slate-700 dark:border-slate-700 dark:text-slate-200">{c.shows}</td>
                  <td className="border-t border-slate-200 p-4 align-top text-slate-700 dark:border-slate-700 dark:text-slate-200">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <P>
            Körperfettwaagen und BIA-Geräte sind praktisch und breit verfügbar und können für den Alltag hilfreiche Hinweise
            geben. DEXA bietet einen höheren medizinischen Informationsgehalt: Die Methode trennt Fett, fettfreie Weichteilmasse
            und Knochenmineral, wertet jede Körperregion einzeln aus und liefert gut reproduzierbare Werte – deshalb eignet sie
            sich besonders für standardisierte Verlaufskontrollen.
          </P>
          <Notice tone="info" title="Bioimpedanz ist nicht Bioresonanz">
            <p>
              Bioimpedanz (BIA) und Bioresonanz sind unterschiedliche Verfahren. Eine Bioresonanzbehandlung ersetzt keine
              quantitative DEXA-Körperanalyse.
            </p>
          </Notice>
        </div>
      </Section>

      {/* 8. Ablauf */}
      <Section tone="muted" id="ablauf" labelledBy="ablauf-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <SectionHeading id="ablauf-title" title="So läuft Ihre Körperanalyse ab" className="!mb-6" />
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">1</span>
                <div>
                  <H3 className="!text-lg">Termin auswählen</H3>
                  <P className="mt-1">
                    Buchen Sie Ihren Termin direkt online oder rufen Sie uns an unter{' '}
                    <a href={PHONE_HREF} className="whitespace-nowrap font-semibold text-slate-900 underline underline-offset-4 dark:text-white">{PHONE_DISPLAY}</a>.
                  </P>
                  <div className="mt-3"><BookingButton label="Körperanalyse online buchen" variant="secondary" /></div>
                </div>
              </li>
              <li className="flex gap-4">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">2</span>
                <div>
                  <H3 className="!text-lg">Kurze Vorbereitung</H3>
                  {BODY.preparation ? (
                    <>
                      <div className="mt-2"><Bullets items={BODY.preparation} /></div>
                      <P className="mt-2">
                        Metallteile im Messbereich – etwa Gürtelschnallen, Reißverschlüsse, Knöpfe oder Schmuck – können die
                        Messung stören. Bitte teilen Sie uns eine mögliche Schwangerschaft vor der Untersuchung mit.
                      </P>
                    </>
                  ) : (
                    <>
                      <P className="mt-1">
                        Metallteile im Messbereich – etwa Gürtelschnallen, Reißverschlüsse, Knöpfe oder Schmuck – können die
                        Messung stören. Bitte teilen Sie uns eine mögliche Schwangerschaft vor der Untersuchung mit.
                      </P>
                      <Placeholder internal className="mt-3">
                        Praxisabhängige Hinweise zu Kleidung, Mahlzeiten und Flüssigkeitszufuhr bestätigen (bodyComposition.js →
                        „preparation“). Bisherige Website: „keine spezielle Vorbereitung, nicht nüchtern“.
                      </Placeholder>
                    </>
                  )}
                </div>
              </li>
              <li className="flex gap-4">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">3</span>
                <div>
                  <H3 className="!text-lg">DEXA-Ganzkörpermessung</H3>
                  <P className="mt-1">
                    Sie liegen ruhig auf dem Untersuchungstisch, während das Gerät Ihren Körper abtastet. Die Untersuchung ist
                    schmerzfrei. {BODY_DURATION_TEXT}
                  </P>
                  <DexaScanFigure mode="body" visceral={Boolean(BODY.visceralFat)} className="mt-4" />
                </div>
              </li>
              <li className="flex gap-4">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">4</span>
                <div>
                  <H3 className="!text-lg">Verständliche Auswertung</H3>
                  <P className="mt-1">
                    Sie erhalten einen übersichtlichen Messbericht mit Ihren Werten und deren Verteilung auf die Körperregionen.
                    {!BODY.resultConsultation && ' Ein ärztliches Beratungsgespräch ist bei der Körperanalyse nicht vorgesehen. Bei medizinischen Fragen wenden Sie sich an Ihre behandelnde Ärztin oder Ihren behandelnden Arzt.'}
                  </P>
                  {BODY.reportDelivery && <P className="mt-2">{BODY.reportDelivery}</P>}
                  {BODY.reportDelivery == null && (
                    <Placeholder internal className="mt-3">
                      Praxis bestätigen: Wie erhalten Patient:innen den Bericht (Ausdruck vor Ort, E-Mail, Portal)?
                    </Placeholder>
                  )}
                </div>
              </li>
            </ol>
            <Notice tone="info" className="mt-8" title="Niedrige Strahlendosis">
              <p>{BODY_RADIATION_TEXT}</p>
            </Notice>
          </div>
          <div className="space-y-6 lg:col-span-2">
            <ImagePlaceholder brief={IMAGE_BRIEFS.bodyExam} className="aspect-[3/2] rounded-2xl" />
            <Card as="aside" aria-labelledby="abgrenzung-title">
              <div className="flex gap-4">
                <Info size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
                <div>
                  <H3 id="abgrenzung-title" className="!text-lg">Nicht verwechseln: Knochendichtemessung</H3>
                  <P className="mt-2">
                    Körperanalyse und diagnostische Knochendichtemessung verwenden beide DEXA, verfolgen aber unterschiedliche
                    Fragestellungen: Die Körperanalyse erfasst Fett- und Magermasse, die Knochendichtemessung dient der
                    Osteoporose-Abklärung. Beide können getrennte Buchungen erfordern.
                  </P>
                  <p className="mt-2">
                    <Link to="/knochendichtemessung-graz" className={textLink}>
                      Zur Knochendichtemessung <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* 9. FAQ – sichtbar; Schema nur für vollständig beantwortete Fragen */}
      <FAQ items={faq} title="Häufige Fragen zur Körperanalyse" align="left" />

      {/* 10. Termin, Praxis, weiterführende Themen */}
      <Section tone="muted" labelledBy="mehr-title">
        <SectionHeading
          id="mehr-title"
          title="Körperanalyse in Graz: Termin, Anfahrt und weitere Themen"
          lead={`Röntgen am Kai, ${ADDRESS.street}, ${ADDRESS.zip} ${ADDRESS.city}. ${TRANSPORT.parking}. Öffis: ${TRANSPORT.public}.`}
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="booking" className={linkRow}>
              <CalendarCheck size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Online-Terminbuchung<NewWindow />
            </a>
          </li>
          <li>
            <Link to="/kontakt" className={linkRow}>
              <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Praxis und Kontakt
            </Link>
          </li>
          <li>
            <a href={MAPS_ROUTE_URL} target="_blank" rel="noopener noreferrer" className={linkRow}>
              <MapPin size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Anfahrt planen (Google Maps)<NewWindow />
            </a>
          </li>
          <li>
            <Link to="/knochendichtemessung-graz" className={linkRow}>
              <Bone size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Knochendichtemessung mit DEXA
            </Link>
          </li>
          <li>
            <Link to="/gesundheitsziele/gesund-abnehmen" className={linkRow}>
              <TrendingDown size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Gesund abnehmen
            </Link>
          </li>
          <li>
            <Link to="/gesundheitsziele/abnehmspritze-koerperanalyse" className={linkRow}>
              <Syringe size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Abnehmspritze und Muskelverlust
            </Link>
          </li>
          <li>
            <Link to="/gesundheitsziele/fitness-muskelaufbau" className={linkRow}>
              <Dumbbell size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Fitness und Muskelaufbau
            </Link>
          </li>
          <li>
            <Link to="/gesundheitsziele/muskelverlust-sarkopenie" className={linkRow}>
              <BarChart3 size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Muskelverlust und Sarkopenie
            </Link>
          </li>
          <li>
            <Link to="/gesundheitsziele/frauengesundheit-wechseljahre" className={linkRow}>
              <UserRound size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Frauengesundheit und Wechseljahre
            </Link>
          </li>
          <li>
            <Link to="/ratgeber/abnehmspritze-muskelmasse-koerperanalyse" className={linkRow}>
              <BookOpen size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Ratgeber: Abnehmspritze und Muskelmasse
            </Link>
          </li>
        </ul>
      </Section>

      {/* 11. Abschluss */}
      <CTASection
        id="koerper-cta-title"
        title="Wissen, was sich im Körper wirklich verändert"
        text="Lassen Sie Körperfett und Muskelmasse medizinisch präzise erfassen – als Ausgangswert oder zur objektiven Verlaufskontrolle."
        bookingLabel="Körperanalyse in Graz buchen"
        phoneLabel="Frage zur Untersuchung stellen"
      />
    </div>
  );
};

export default KoerperanalysePage;
