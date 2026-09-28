import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MapPin, Phone, CalendarCheck, Scale, ExternalLink } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Placeholder from '../components/ui/Placeholder';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import CTASection from '../components/ui/CTASection';
import Button, { buttonClasses } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/Heading';
import { BookingButton } from '../components/ui/BookingButtons';
import FAQ from '../components/FAQ';
import DexaScanFigure from '../components/DexaScanFigure';
import BoneRiskCheck from '../components/BoneRiskCheck';
import { faqData } from '../data/faqData';
import { IMAGE_BRIEFS } from '../data/imageBriefs';
import { PHONE_HREF, PHONE_DISPLAY, MAPS_ROUTE_URL, BOOKING_URL } from '../data/practice';
import { SCREENING_BADGE } from '../data/screening';
import {
  DEXA,
  DEXA_HERO_LEAD,
  DEXA_HERO_FACTS,
  DEXA_PRICE_LINE,
  DEXA_PRICE_TEXT,
  DEXA_OTHER_CARRIERS,
  DEXA_RHO_SENTENCE,
  DEXA_WHO_SHOULD_TEXT,
} from '../data/dexa';

// DEXA-Knochendichtemessung – /knochendichtemessung-graz (ersetzt /unser-angebot/knochendichte, Weiterleitung).
// Preis, Kassenregeln, Quellen und Rho-Angaben: src/data/dexa.js. FAQ: src/data/faqData.js (sichtbar = FAQPage-Schema).
// Keine Heilungsversprechen, keine automatische Therapieempfehlung, keine Aussage „beste Methode“ oder „strahlungsfrei“.

const img = (name) => `${import.meta.env.BASE_URL}assets/images/${name}`;

const H3 = ({ children, className = '', id }) => (
  <h3 id={id} className={`font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white ${className}`}>{children}</h3>
);
const P = ({ children, className = '' }) => (
  <p className={`text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200 ${className}`}>{children}</p>
);
const Bullets = ({ items, cols = false }) => (
  <ul className={cols ? 'grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2' : 'space-y-3'}>
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">
        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
const extLink = 'font-semibold text-brand underline underline-offset-4 hover:text-brand-700 dark:text-brand-300';
const NewWindow = () => <span className="sr-only"> (öffnet in neuem Fenster)</span>;
const linkRow =
  'flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300';

const INDICATIONS = [
  'Frauen nach der Menopause',
  'Frauen ab 65 Jahren',
  'Männer ab 70 Jahren',
  'Frauen und Männer in jüngerem Alter mit relevanten Risikofaktoren',
  'Knochenbruch nach geringem Anlass (z. B. Sturz aus dem Stand)',
  'Familiär gehäufte Osteoporose oder Hüftbrüche',
  'Längere Cortisontherapie',
  'Medikamente, die den Knochenabbau fördern können',
  'Frühe Menopause',
  'Untergewicht oder Essstörungen',
  'Längere Immobilität',
  'Chronisch-entzündliche oder andere knochenschädigende Erkrankungen',
  'Verdacht auf Osteoporose im Röntgenbild',
  'Verlaufskontrolle bei bekannter Osteoporose oder laufender Behandlung',
];

const STEPS = [
  { t: 'Anmeldung', d: 'Sie melden sich an der Rezeption an. Bitte sagen Sie uns Ihre Krankenkasse und ob eine Zuweisung vorliegt.' },
  {
    t: 'Vorbereitung',
    d: DEXA.noSpecialPreparation
      ? 'Eine besondere Vorbereitung ist nicht nötig, Sie müssen nicht nüchtern sein. Metallteile im Messbereich – etwa Gürtelschnallen, Knöpfe oder Reißverschlüsse – legen Sie gegebenenfalls ab.'
      : 'Metallteile im Messbereich – etwa Gürtelschnallen, Knöpfe oder Reißverschlüsse – legen Sie gegebenenfalls ab.',
  },
  { t: 'Messung im Liegen', figure: 'bone', d: 'Sie liegen ruhig auf dem Rücken, während der Messarm über Lendenwirbelsäule und Hüfte bzw. Oberschenkelhals fährt. Die Messung ist schmerzlos und nicht invasiv.' },
  { t: 'Befundung', d: 'Die Messwerte werden von Fachärzten für Radiologie beurteilt und gemeinsam mit Ihren Angaben zu Risikofaktoren bewertet.' },
];

const COMBINED_BENEFITS = [
  'Nur eine Terminvereinbarung',
  'Nur eine Anfahrt',
  'Mammographie und Knochendichte in derselben Ordination',
  'Kompakte Vorsorgeorganisation',
  'Klare Information zu Kasse, Privatleistung und Zuweisung',
];

const KnochendichtePage = () => (
  <div className="[&_:is(h1,h2,h3)]:hyphens-manual">
    {/* Hero – Terminbutton, Kurzfakten und Preis im ersten sichtbaren Bereich */}
    <Hero
      breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Knochendichte' }]}
      title={'Knochen\u00ADdichte\u00ADmessung in Graz mit DEXA'}
      lead={DEXA_HERO_LEAD}
      facts={[...DEXA_HERO_FACTS, { text: DEXA_PRICE_LINE, strong: true }]}
      actions={
        <>
          <BookingButton size="lg" label="DEXA-Termin buchen" />
          <a href="#gemeinsam" className={buttonClasses({ variant: 'secondary', size: 'lg', className: '!text-base leading-snug' })}>
            Mammographie und Knochendichte gemeinsam buchen
          </a>
        </>
      }
      meta={
        <a href={PHONE_HREF} className="inline-flex min-h-[44px] items-center gap-2 text-base font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-brand dark:text-white">
          <Phone size={18} aria-hidden="true" className="text-brand dark:text-brand-300" />
          Telefonisch: {PHONE_DISPLAY}
        </a>
      }
      image={{
        src: img('knochendichte_v3.avif'),
        srcSet: `${img('knochendichte_v3-mobile.avif')} 800w, ${img('knochendichte_v3-tablet.avif')} 1200w, ${img('knochendichte_v3.avif')} 1920w`,
        sizes: '(max-width: 1023px) 100vw, 50vw',
        alt: IMAGE_BRIEFS.dexaDevice.alt,
        width: 1920,
        height: 1280,
      }}
    />

    {/* Warum DEXA? */}
    <Section labelledBy="warum-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-3">
          <SectionHeading id="warum-title" title={'Warum Knochen\u00ADdichte\u00ADmessung mit DEXA?'} className="!mb-6" />
          <div className="space-y-4">
            <P>
              DEXA – oft auch DXA geschrieben – ist die international anerkannte, wissenschaftlich etablierte Standard- und
              Referenzmethode zur Messung der Knochenmineraldichte. Gemessen wird üblicherweise an der Lendenwirbelsäule und
              an der Hüfte bzw. am Oberschenkelhals.
            </P>
            <P>
              Die Messung liefert standardisierte Werte wie den T-Score und den Z-Score. Sie unterstützen Ihre Ärztin oder
              Ihren Arzt bei der Diagnose, bei der Einschätzung des Bruchrisikos und bei Verlaufskontrollen.
            </P>
            <P>
              Beurteilt wird das Ergebnis immer gemeinsam mit Alter, Risikofaktoren, Vorerkrankungen, Medikamenten und
              möglichen früheren Knochenbrüchen. Eine DEXA allein erfasst nicht alle Aspekte der Knochenqualität und
              ersetzt keine ärztliche Gesamtbeurteilung.
            </P>
          </div>
          <div className="mt-6 text-sm text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-800 dark:text-slate-100">Fachliche Quellen</p>
            <ul className="mt-2 space-y-2">
              {DEXA.sources.map((s) => (
                <li key={s.url} className="flex gap-2">
                  <ExternalLink size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={extLink}>{s.label}<NewWindow /></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-2">
          <ImagePlaceholder brief={IMAGE_BRIEFS.dexaRoom} className="aspect-[3/2] rounded-2xl" />
        </div>
      </div>
    </Section>

    {/* Wann sinnvoll? + Risikocheck */}
    <Section tone="muted" id="wann" labelledBy="wann-title">
      <SectionHeading id="wann-title" title={'Wann ist eine Knochen\u00ADdichte\u00ADmessung sinnvoll?'} className="!mb-6" />
      <P className="max-w-3xl">Eine Knochendichtemessung kann insbesondere sinnvoll sein bei:</P>
      <Card className="mt-6">
        <Bullets items={INDICATIONS} cols />
      </Card>
      <P className="mt-6 max-w-3xl">{DEXA_WHO_SHOULD_TEXT}</P>
      <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-3">
          <BoneRiskCheck />
        </div>
        <Card as="aside" aria-labelledby="beratung-title" className="lg:col-span-2 lg:sticky lg:top-[calc(var(--header-height)+24px)]">
          <H3 id="beratung-title">Unsicher, ob eine Messung sinnvoll ist?</H3>
          <P className="mt-3">
            Ob eine Knochendichtemessung für Sie angezeigt ist, entscheidet Ihre Ärztin oder Ihr Arzt anhand Ihrer persönlichen
            Risikofaktoren. Gerne beantworten wir Ihre Fragen zu Ablauf, Kosten und Zuweisung.
          </P>
          <div className="mt-5">
            <Button href={PHONE_HREF} icon={Phone} data-cta="phone" block>
              Persönliches Knochenrisiko abklären
              <span className="sr-only">: Anruf unter {PHONE_DISPLAY}</span>
            </Button>
          </div>
        </Card>
      </div>
    </Section>

    {/* Kosten und Kostenübernahme */}
    <Section id="kosten" labelledBy="kosten-title">
      <SectionHeading id="kosten-title" title="Kosten und Kostenübernahme" className="!mb-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card as="section" aria-labelledby="kosten-oegk" className="border-brand-200 dark:border-brand-900">
          <p className="text-sm font-semibold text-brand dark:text-brand-300">ÖGK-Versicherte · Privatleistung</p>
          <H3 id="kosten-oegk" className="mt-1">ÖGK: {DEXA_PRICE_TEXT}</H3>
          <P className="mt-3">{DEXA.oegk.text}</P>
        </Card>
        <Card as="section" aria-labelledby="kosten-andere">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{DEXA_OTHER_CARRIERS}</p>
          <H3 id="kosten-andere" className="mt-1">Andere Kassen: mit Zuweisung als Kassenleistung</H3>
          <P className="mt-3">{DEXA.otherCarriersText}</P>
        </Card>
      </div>
      <Card tone="muted" className="mt-6" as="section" aria-labelledby="kosten-zuweisung">
        <H3 id="kosten-zuweisung">Zuweisung und Voraussetzungen</H3>
        <div className="mt-3">
          <Bullets
            items={[
              `${DEXA_OTHER_CARRIERS}: Kassenleistung nur mit der erforderlichen ärztlichen Zuweisung. Bitte bringen Sie die Zuweisung und Ihre e-card mit.`,
              `ÖGK: Privatleistung um ${DEXA_PRICE_TEXT}. Ob und in welchem Umfang die ÖGK Kosten erstattet, hängt von Ihren individuellen Voraussetzungen ab.`,
              'Bringen Sie Voraufnahmen bzw. frühere Knochendichte-Befunde mit, sofern sie uns nicht vorliegen – sie sind für Verlaufsvergleiche wichtig.',
            ]}
          />
        </div>
        <P className="mt-4 font-semibold">{DEXA.askFirstText}</P>
        <Placeholder internal className="mt-4">
          Praxis bestätigen: Welche Unterlagen benötigt die ÖGK für eine Kostenerstattung (Zuweisung, Honorarnote)? Ist die
          ÖGK-Privatleistung auch ohne Zuweisung buchbar? Zahlungsarten vor Ort? Preis von {DEXA_PRICE_TEXT} auch in MiraNext vor
          Abschluss der Buchung anzeigen.
        </Placeholder>
      </Card>
    </Section>

    {/* Mammographie und Knochendichte an einem Termin */}
    <Section tone="brand" id="gemeinsam" labelledBy="gemeinsam-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="mb-3 text-sm font-semibold text-brand dark:text-brand-300">Mammographie und Knochendichte an einem Termin</p>
          <h2 id="gemeinsam-title" className="font-display text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Brust­gesundheit und Knochen­gesundheit gemeinsam im Blick
          </h2>
          <P className="mt-5">
            Mit zunehmendem Alter gewinnen sowohl Brustkrebsfrüherkennung als auch Knochengesundheit an Bedeutung. Bei
            Röntgen am Kai können Mammographie und DEXA-Knochendichtemessung nach Möglichkeit an einem gemeinsamen Termin
            durchgeführt werden.
          </P>
          <P className="mt-4">
            Das Angebot richtet sich besonders an Frauen ab 50 Jahren, bei denen eine Knochendichtemessung medizinisch
            sinnvoll ist oder als private Vorsorgeleistung gewünscht wird.
          </P>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={PHONE_HREF} icon={Phone} size="lg" data-cta="phone">
              Gemeinsamen Termin anfragen
              <span className="sr-only">: Anruf unter {PHONE_DISPLAY}</span>
            </Button>
            <Link to="/mammographie-graz" className={buttonClasses({ variant: 'ghost', size: 'lg', className: 'justify-start sm:justify-center' })}>
              Mammographie &amp; Brustgesundheit <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Gemeinsame Termine vereinbaren Sie derzeit telefonisch unter{' '}
            <a href={PHONE_HREF} className="whitespace-nowrap font-semibold text-slate-900 underline underline-offset-4 dark:text-white">{PHONE_DISPLAY}</a>.
          </p>
          {!DEXA.combinedOnline && (
            <Placeholder internal className="mt-4">
              Online-Kombibuchung noch nicht möglich: In MiraNext (geprüft 26.09.2026) lassen sich zwar mehrere Untersuchungen
              an einem Tag verknüpfen, DEXA ist dort aber noch nicht als Untersuchung angelegt. Bis dahin gemeinsame Termine
              telefonisch; danach auf Online-Buchung umstellen.
            </Placeholder>
          )}
        </div>
        <div className="space-y-6">
          <Card as="section" aria-labelledby="gemeinsam-vorteile">
            <H3 id="gemeinsam-vorteile">Ihre Vorteile</H3>
            <div className="mt-4"><Bullets items={COMBINED_BENEFITS} /></div>
          </Card>
          <Card as="section" aria-labelledby="gemeinsam-kasse">
            <H3 id="gemeinsam-kasse">Kasse, Privatleistung und Zuweisung</H3>
            <dl className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <div>
                <dt className="font-semibold text-slate-900 dark:text-white">Screening-Mammographie</dt>
                <dd>{SCREENING_BADGE} – für Frauen zwischen 45 und 74 Jahren ohne Beschwerden.</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 dark:text-white">DEXA für ÖGK-Versicherte</dt>
                <dd>Privatleistung um {DEXA_PRICE_TEXT}; eine Kostenerstattung ist möglich, aber nicht garantiert.</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 dark:text-white">DEXA bei {DEXA_OTHER_CARRIERS}</dt>
                <dd>Kassenleistung mit der erforderlichen ärztlichen Zuweisung.</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </Section>

    {/* KI-gestütztes opportunistisches Screening (Rho) */}
    <Section labelledBy="rho-title">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-14">
      <div className="lg:col-span-3">
        <SectionHeading
          id="rho-title"
          eyebrow="KI-gestützte Zusatzanalyse"
          title="Zusätzlicher Blick auf die Knochengesundheit bei geeigneten Röntgenaufnahmen"
          className="!mb-6"
        />
        <div className="space-y-4">
          <P>{DEXA_RHO_SENTENCE}</P>
          <P>
            Dafür setzen wir bei Patientinnen und Patienten ab {DEXA.rho.minAge} Jahren den KI-Algorithmus {DEXA.rho.product}{' '}
            ein. Geeignet können Frontalaufnahmen von {DEXA.rho.regions.slice(0, -1).join(', ')} oder{' '}
            {DEXA.rho.regions[DEXA.rho.regions.length - 1]} sein.
          </P>
          <P>
            Die Analyse nutzt die bereits angefertigten Röntgenbilder. Es ist keine zusätzliche Aufnahme und keine zusätzliche
            Strahlenexposition erforderlich.
          </P>
        </div>
      </div>
      <div className="lg:col-span-2">
        <Card tone="muted">
          <H3 className="!text-lg">Was der Hinweis bedeutet</H3>
          <div className="mt-4">
          <Bullets
            items={[
              `${DEXA.rho.product} liefert einen Risikohinweis auf eine möglicherweise niedrige Knochenmineraldichte.`,
              'Das Ergebnis ist keine Osteoporosediagnose.',
              'Ein auffälliger Risikohinweis kann Anlass für eine gezielte DEXA-Messung und eine weitere medizinische Abklärung sein.',
            ]}
          />
          </div>
        </Card>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Produktinformation des Herstellers:{' '}
          <a href={DEXA.rho.productUrl} target="_blank" rel="noopener noreferrer" className={extLink}>
            {DEXA.rho.vendor} – {DEXA.rho.product}<NewWindow />
          </a>
        </p>
      </div>
      </div>
    </Section>

    {/* Ablauf + Ergebnis */}
    <Section tone="muted" labelledBy="ablauf-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-3">
          <SectionHeading id="ablauf-title" title={'Ablauf der Knochen\u00ADdichte\u00ADmessung'} className="!mb-6" />
          <ol className="space-y-5">
            {STEPS.map((step, i) => (
              <li key={step.t} className="flex gap-4">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">{i + 1}</span>
                <div>
                  <H3 className="!text-lg">{step.t}</H3>
                  <P className="mt-1">{step.d}</P>
                  {step.figure && <DexaScanFigure mode={step.figure} className="mt-4" />}
                </div>
              </li>
            ))}
          </ol>
          <Card className="mt-6">
            <P><strong className="font-semibold">Schwangerschaft:</strong> Bitte teilen Sie uns eine mögliche Schwangerschaft vor der Untersuchung mit.</P>
          </Card>
          {DEXA.noSpecialPreparation && (
            <Placeholder internal className="mt-4">
              „Keine besondere Vorbereitung / nicht nüchtern“ stammt von der bisherigen Website – Praxis bitte bestätigen.
              Untersuchungsdauer ist nicht bestätigt und wird deshalb nicht genannt.
            </Placeholder>
          )}
        </div>
        <div className="lg:col-span-2">
          <ImagePlaceholder brief={IMAGE_BRIEFS.dexaExam} className="aspect-[3/2] rounded-2xl lg:sticky lg:top-[calc(var(--header-height)+24px)]" />
        </div>
      </div>
    </Section>

    <Section labelledBy="ergebnis-title">
      <SectionHeading id="ergebnis-title" title={'Ergebnis: T\u2011Score und Z\u2011Score verständlich erklärt'} className="!mb-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card as="section" aria-labelledby="t-score">
          <H3 id="t-score">T-Score</H3>
          <P className="mt-3">
            Der T-Score vergleicht Ihre Knochendichte mit dem Durchschnitt junger, gesunder Erwachsener. Er zeigt, wie weit Ihr
            Wert davon abweicht. Verwendet wird er vor allem bei Frauen nach der Menopause und bei Männern ab 50 Jahren.
          </P>
          <P className="mt-3">
            Nach der Definition der Weltgesundheitsorganisation gilt ein T-Score bis −1 als normal, zwischen −1 und −2,5 als
            verminderte Knochendichte (Osteopenie) und ab −2,5 als Hinweis auf eine Osteoporose.
          </P>
        </Card>
        <Card as="section" aria-labelledby="z-score">
          <H3 id="z-score">Z-Score</H3>
          <P className="mt-3">
            Der Z-Score vergleicht Ihre Knochendichte mit Menschen gleichen Alters und Geschlechts. Er ist vor allem bei
            jüngeren Frauen vor der Menopause, bei Männern unter 50 Jahren und bei Kindern aussagekräftig.
          </P>
          <P className="mt-3">
            Je nach Fragestellung enthält der Befund weitere Angaben, etwa eine Einschätzung des Bruchrisikos (FRAX).
          </P>
        </Card>
      </div>
      <Card tone="muted" className="mt-6">
        <Bullets
          items={[
            'Das Messergebnis allein ist keine Therapieempfehlung.',
            'Es wird immer gemeinsam mit Ihren klinischen Risikofaktoren beurteilt – etwa Alter, Vorerkrankungen, Medikamenten und früheren Knochenbrüchen.',
            'Ob eine Behandlung sinnvoll ist, besprechen Sie mit Ihrer behandelnden Ärztin oder Ihrem behandelnden Arzt.',
          ]}
        />
      </Card>
    </Section>

    {/* FAQ – sichtbar = FAQPage-Schema (inkl. Strahlenbelastung) */}
    <div className="bg-slate-50 dark:bg-slate-900">
      <FAQ items={faqData.knochendichte} title="Häufige Fragen zur Knochendichtemessung" align="left" />
    </div>

    {/* Weiterführend */}
    <Section labelledBy="mehr-title">
      <SectionHeading id="mehr-title" title="Termin, Praxis und weitere Informationen" />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="booking" className={linkRow}>
            <CalendarCheck size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Online-Terminbuchung<NewWindow />
          </a>
        </li>
        <li>
          <a href="#gemeinsam" className={linkRow}>
            <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Gemeinsamer Termin mit Mammographie
          </a>
        </li>
        <li>
          <Link to="/mammographie-graz" className={linkRow}>
            <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Mammographie &amp; Brustgesundheit
          </Link>
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
          <Link to="/ratgeber/knochendichtemessung-dexa-vorsorge" className={linkRow}>
            <BookOpen size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Ratgeber: Knochendichtemessung – wann sinnvoll?
          </Link>
        </li>
      </ul>

      <nav aria-labelledby="kd-ziele-title" className="mt-8">
        <h3 id="kd-ziele-title" className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Passende Gesundheitsziele</h3>
        <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['/gesundheitsziele/gesund-aelter-werden', 'Gesund älter werden'],
            ['/gesundheitsziele/frauengesundheit-wechseljahre', 'Frauengesundheit und Wechseljahre'],
            ['/gesundheitsziele/dexa-sportler-red-s', 'Knochengesundheit im Sport'],
            ['/gesundheitsziele', 'Alle Gesundheitsziele'],
          ].map(([to, label]) => (
            <li key={to}>
              <Link to={to} className={linkRow}>
                <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Card as="aside" tone="muted" className="mt-8" aria-labelledby="abgrenzung-title">
        <div className="flex gap-4">
          <Scale size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
          <div>
            <H3 id="abgrenzung-title">Nicht verwechseln: DEXA-Körperanalyse</H3>
            <P className="mt-2">
              Die DEXA-Knochendichtemessung dient der Osteoporose-Abklärung. Die Körperanalyse mit DEXA ist eine eigene
              Privatleistung und erfasst Körperfett, magere Weichteilmasse (als Näherungswert für die Muskelmasse) und deren
              Verteilung. Beide verwenden DEXA, verfolgen aber unterschiedliche Fragestellungen und können getrennte Buchungen
              erfordern.
            </P>
            <p className="mt-3">
              <Link to="/koerperanalyse-graz" className={buttonClasses({ variant: 'ghost', className: '-ml-3' })}>
                Zur Körperanalyse <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </Section>

    <CTASection
      id="dexa-cta-title"
      title="DEXA-Termin in Graz vereinbaren"
      text={`Buchen Sie Ihre Knochendichtemessung online oder rufen Sie uns an. ${DEXA_PRICE_LINE} (Privatleistung). ${DEXA_OTHER_CARRIERS}: Kassenleistung mit Zuweisung.`}
      bookingLabel="DEXA-Termin buchen"
    />
  </div>
);

export default KnochendichtePage;
