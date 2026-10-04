import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Phone, AlertTriangle, BookOpen, MapPin } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Notice from '../components/ui/Notice';
import Placeholder from '../components/ui/Placeholder';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import CTASection from '../components/ui/CTASection';
import { SectionHeading } from '../components/ui/Heading';
import { BookingButton } from '../components/ui/BookingButtons';
import { buttonClasses } from '../components/ui/Button';
import FAQ from '../components/FAQ';
import { faqData } from '../data/faqData';
import { IMAGE_BRIEFS } from '../data/imageBriefs';
import { PHONE_HREF, PHONE_DISPLAY, MAPS_ROUTE_URL } from '../data/practice';
import {
  SCREENING,
  SCREENING_BADGE,
  SCREENING_LEAD,
  SCREENING_SECTION_TEXT,
  SCREENING_CTA_TEXT,
  SCREENING_ONLY_WITHOUT_SYMPTOMS,
} from '../data/screening';

// Mammographie & Brustgesundheit – /mammographie-graz (ersetzt /unser-angebot/mammographie, Weiterleitung).
// Programmregeln kommen aus src/data/screening.js, FAQ aus src/data/faqData.js (sichtbar = FAQPage-Schema).
// Röntgen am Kai bietet KEINE Tomosynthese/3D-Mammographie an – nicht erwähnen.

const H3 = ({ children, className = '' }) => (
  <h3 className={`font-display text-xl font-semibold tracking-tight text-slate-900 dark:text-white ${className}`}>{children}</h3>
);
const P = ({ children, className = '' }) => (
  <p className={`text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200 ${className}`}>{children}</p>
);
const Bullets = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={typeof item === 'string' ? item : item.key} className="flex gap-3 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">
        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
const extLink = 'font-semibold text-brand underline underline-offset-4 hover:text-brand-700 dark:text-brand-300';
const NewWindow = () => <span className="sr-only"> (öffnet in neuem Fenster)</span>;
const sl = SCREENING.serviceline;

const STEPS = [
  { t: 'Anmeldung', d: 'Sie melden sich an der Rezeption mit Ihrer e-card an.' },
  { t: 'Vorbereitung in der Ordination', d: 'Für die Aufnahmen machen Sie den Oberkörper frei. Unser Team erklärt Ihnen den Ablauf und beantwortet Ihre Fragen.' },
  { t: 'Positionierung der Brust', d: 'Die Brust wird auf einer Auflageplatte ausgerichtet – jede Seite in der Regel aus zwei Richtungen.' },
  { t: 'Kurze Kompression', d: 'Während der Aufnahme wird die Brust kurz zwischen zwei Platten zusammengedrückt. Das sorgt für aussagekräftige Bilder und hält die Strahlendosis gering.' },
  { t: 'Befundung', d: 'Die Aufnahmen werden von Fachärzten für Radiologie beurteilt. Im Früherkennungsprogramm wird jede Mammographie von zwei Radiologinnen oder Radiologen unabhängig befundet.' },
  { t: 'Befundübermittlung', d: 'Ihre Aufnahmen werden digital archiviert und stehen Ihrem Haus- oder Facharzt rasch zur Verfügung. Ihre Bilder und Befunde sind zusätzlich über ELGA sowie online unter portal.marc.at verfügbar.' },
];

const MammographiePage = () => (
  <>
    {/* Hero – Terminbutton am Handy ohne Scrollen erreichbar */}
    <Hero
      breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: 'Mammographie & Brustgesundheit' }]}
      title="Mammographie in Graz – für Ihre Brustgesundheit"
      highlight={SCREENING_BADGE}
      lead={SCREENING_LEAD}
      actions={
        <>
          <BookingButton size="lg" label="Mammographie-Termin buchen" />
          <a href="#screening" className={buttonClasses({ variant: 'ghost', size: 'lg', className: 'justify-start sm:justify-center' })}>
            So funktioniert das Screening <ArrowRight size={18} aria-hidden="true" />
          </a>
        </>
      }
      meta={
        <a href={PHONE_HREF} className="inline-flex min-h-[44px] items-center gap-2 text-base font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-brand dark:text-white">
          <Phone size={18} aria-hidden="true" className="text-brand dark:text-brand-300" />
          Telefonisch: {PHONE_DISPLAY}
        </a>
      }
      imageSlot={<ImagePlaceholder brief={IMAGE_BRIEFS.mammoDevice} className="h-full w-full border-0" />}
    />

    {/* Brustkrebsvorsorge ohne Zuweisung */}
    <Section id="screening" labelledBy="screening-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
        <div className="lg:col-span-2">
          <SectionHeading id="screening-title" eyebrow="Brustkrebs-Früherkennungsprogramm" title="Brustkrebsvorsorge ohne Zuweisung" className="!mb-6" />
          <P>{SCREENING_SECTION_TEXT}</P>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookingButton label="Screening-Termin vereinbaren" />
          </div>
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
            Offizielle Informationen zum Programm:{' '}
            <a href={SCREENING.officialUrl} target="_blank" rel="noopener noreferrer" className={extLink}>
              {SCREENING.officialUrlLabel}<NewWindow />
            </a>
          </p>
        </div>
        <Card tone="muted" as="aside" aria-labelledby="optin-title" className="self-start">
          <h3 id="optin-title" className="font-display text-lg font-semibold text-slate-900 dark:text-white">Jünger als 45 oder ab 75 Jahren?</h3>
          <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-200">
            {SCREENING.optIn.map((g) => (
              <li key={g.id}>{g.label} können sich entsprechend den aktuellen Programmregeln anmelden.</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Anmeldung über die Serviceline{' '}
            <a href={sl.href} className="whitespace-nowrap font-semibold text-slate-900 underline underline-offset-4 dark:text-white">{sl.display}</a>{' '}
            ({sl.hours}) oder unter{' '}
            <a href={SCREENING.targetGroupUrl} target="_blank" rel="noopener noreferrer" className={extLink}>
              {SCREENING.officialUrlLabel}<NewWindow />
            </a>.
          </p>
        </Card>
      </div>
    </Section>

    {/* Was ist eine Mammographie? */}
    <Section tone="muted" labelledBy="was-title">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading id="was-title" title="Was ist eine Mammographie?" className="!mb-6" />
          <div className="space-y-4">
            <P>Die Mammographie – auch Mammografie geschrieben – ist eine Röntgenuntersuchung der Brust.</P>
            <P>Sie wird zur Früherkennung eingesetzt, also bei Frauen ohne Beschwerden, und zur Abklärung, wenn eine Veränderung der Brust bemerkt oder in einer Untersuchung gefunden wurde.</P>
            <P>Wie jede Untersuchung hat auch die Mammographie Grenzen: Ein unauffälliges Ergebnis kann Brustkrebs nicht mit völliger Sicherheit ausschließen. Achten Sie deshalb auch zwischen zwei Terminen auf Veränderungen Ihrer Brust.</P>
          </div>
        </div>
        <ImagePlaceholder brief={IMAGE_BRIEFS.room} className="aspect-[3/2] rounded-2xl" />
      </div>
    </Section>

    {/* Screening oder diagnostische Abklärung */}
    <Section labelledBy="abklaerung-title">
      <SectionHeading id="abklaerung-title" title="Screening oder diagnostische Abklärung" />
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <Card>
          <H3>Screening-Mammographie</H3>
          <P className="mt-3">
            Für Frauen <strong>ohne Beschwerden</strong> im Rahmen des Brustkrebs-Früherkennungsprogramms –
            ohne ärztliche Zuweisung, mit Ihrer e-card.
          </P>
        </Card>
        <Card>
          <H3>Diagnostische Mammographie</H3>
          <P className="mt-3">
            Bei Beschwerden, einem auffälligen Befund oder einer besonderen Risikosituation, etwa einer familiären
            Vorbelastung, ist ein anderer Weg nötig: eine gezielte Abklärung, in der Regel mit ärztlicher Zuweisung.
            Dafür wird manchmal auch der Begriff „kurative Mammographie“ verwendet – gemeint ist die Mammographie zur
            Abklärung, nicht zur Vorsorge.
          </P>
        </Card>
      </div>
    </Section>

    {/* Beschwerden rasch abklären */}
    <Section tone="muted" id="beschwerden" labelledBy="beschwerden-title">
      <SectionHeading id="beschwerden-title" title="Beschwerden rasch abklären" className="!mb-6" />
      <div role="note" className="flex gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-50 sm:p-7">
        <AlertTriangle size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300" />
        <div className="space-y-3 text-[1.0625rem] leading-relaxed">
          <p>
            <strong className="font-semibold">Haben Sie einen neu tastbaren Knoten, eine Sekretion aus der Brustwarze, eine Hauteinziehung oder andere
            neue Veränderungen der Brust bemerkt?</strong> Dann warten Sie bitte nicht auf einen regulären Screening-Termin.
            Lassen Sie die Beschwerden rasch ärztlich abklären.
          </p>
          <p>{SCREENING_ONLY_WITHOUT_SYMPTOMS}</p>
        </div>
      </div>
      <Card className="mt-6" as="section" aria-labelledby="kontakt-beschwerden">
        <H3><span id="kontakt-beschwerden">Kontakt bei Beschwerden</span></H3>
        <P className="mt-3">
          Rufen Sie uns an – wir besprechen mit Ihnen das weitere Vorgehen:{' '}
          <a href={PHONE_HREF} className="whitespace-nowrap font-semibold text-brand underline underline-offset-4 dark:text-brand-300">{PHONE_DISPLAY}</a>
        </P>
        <Placeholder internal className="mt-4">
          Ablauf für Patientinnen mit Beschwerden von der Praxis bestätigen (z. B. Zuweisung erforderlich? eigene
          Terminschiene? online buchbar?) – bis dahin nur telefonischer Kontakt.
        </Placeholder>
      </Card>
    </Section>

    {/* Ablauf */}
    <Section labelledBy="ablauf-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-3">
          <SectionHeading id="ablauf-title" title="Ablauf der Mammographie" className="!mb-6" />
          <ol className="space-y-5">
            {STEPS.map((step, i) => (
              <li key={step.t} className="flex gap-4">
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">{i + 1}</span>
                <div>
                  <H3 className="!text-lg">{step.t}</H3>
                  <P className="mt-1">{step.d}</P>
                </div>
              </li>
            ))}
          </ol>
          <Placeholder internal className="mt-6">Befundweg im Screening (Befundbrief, Befundbesprechung) von der Praxis bestätigen.</Placeholder>
        </div>
        <div className="lg:col-span-2">
          <ImagePlaceholder brief={IMAGE_BRIEFS.care} className="aspect-[3/2] rounded-2xl lg:sticky lg:top-[calc(var(--header-height)+24px)]" />
        </div>
      </div>
    </Section>

    {/* Vorbereitung */}
    <Section tone="muted" labelledBy="vorbereitung-title">
      <SectionHeading id="vorbereitung-title" title="Vorbereitung" className="!mb-6" />
      <Card>
        <Bullets
          items={[
            'Am Untersuchungstag möglichst kein Deo, Puder oder Körperlotion im Brust- und Achselbereich verwenden.',
            'Voraufnahmen und Vorbefunde mitbringen, sofern sie uns nicht bereits vorliegen.',
            'Eine mögliche Schwangerschaft bitte bei der Terminvereinbarung mitteilen.',
            'e-card mitbringen.',
          ]}
        />
      </Card>
    </Section>

    {/* Brustultraschall + Dichtes Brustgewebe */}
    <Section labelledBy="ultraschall-title">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card as="section" aria-labelledby="ultraschall-title">
          <h2 id="ultraschall-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Brustultraschall</h2>
          <div className="mt-4">
            <Bullets
              items={[
                'Mammographie und Ultraschall liefern unterschiedliche Informationen.',
                'Je nach Befund und Brustgewebe kann ein Ultraschall ergänzend sinnvoll sein.',
                'Im Screening ersetzt der Ultraschall die Mammographie nicht generell.',
                'Ob ein Ultraschall nötig ist, wird ärztlich beurteilt.',
              ]}
            />
          </div>
          <p className="mt-6">
            <Link to="/ultraschall-graz" className={buttonClasses({ variant: 'ghost', className: '-ml-3' })}>
              Mehr zum Ultraschall <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </p>
        </Card>
        <Card as="section" aria-labelledby="dicht-title">
          <h2 id="dicht-title" className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Dichtes Brustgewebe</h2>
          <div className="mt-4 space-y-4">
            <P>
              Die Brust besteht aus Drüsen-, Binde- und Fettgewebe. Von dichtem Brustgewebe spricht man, wenn der
              Anteil an Drüsen- und Bindegewebe hoch ist. Das ist häufig – besonders bei jüngeren Frauen – und keine Krankheit.
            </P>
            <P>
              Dichtes Gewebe kann die Beurteilung der Mammographie erschweren. Ob eine ergänzende Untersuchung sinnvoll
              ist, hängt von Ihrer persönlichen Situation ab und wird individuell ärztlich entschieden.
            </P>
          </div>
        </Card>
      </div>
    </Section>

    {/* FAQ – sichtbar = FAQPage-Schema */}
    <div className="bg-slate-50 dark:bg-slate-900">
      <FAQ items={faqData.mammographie} title="Häufige Fragen zur Mammographie" align="left" />
    </div>

    {/* Weiterführend: Praxis, Anfahrt, Ratgeber */}
    <Section labelledBy="mehr-title">
      <SectionHeading id="mehr-title" title="Praxis, Anfahrt und Ratgeber" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ImagePlaceholder brief={IMAGE_BRIEFS.practice} className="aspect-video rounded-2xl lg:col-span-1" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
          <li>
            <Link to="/kontakt" className="flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300">
              <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Praxis und Kontakt
            </Link>
          </li>
          <li>
            <a href={MAPS_ROUTE_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300">
              <MapPin size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Anfahrt planen (Google Maps)<NewWindow />
            </a>
          </li>
          <li>
            <Link to="/ratgeber/mammascreening-oesterreich" className="flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300">
              <BookOpen size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Ratgeber: Mammascreening in Österreich
            </Link>
          </li>
        </ul>
      </div>
      <p className="mt-6">
        <Link to="/gesundheitsziele/frauengesundheit-wechseljahre" className="flex min-h-[56px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:text-brand-300 sm:inline-flex">
          <ArrowRight size={20} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" /> Gesundheitsziel: Frauengesundheit und Wechseljahre
        </Link>
      </p>
      <Placeholder internal className="mt-6">
        Geplant: eigene Seite „Brustultraschall“ und eigene Ratgeber-Artikel mit URL zur Brustgesundheit – dann hier verlinken.
      </Placeholder>
      <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
        Programminformationen: <a href={SCREENING.officialUrl} target="_blank" rel="noopener noreferrer" className={extLink}>{SCREENING.officialUrlLabel}<NewWindow /></a>
        <ExternalLink size={14} aria-hidden="true" className="ml-1 inline" />
      </p>
    </Section>

    {/* Abschluss */}
    <CTASection
      id="mammo-cta-title"
      title="Mammographie-Termin in Graz vereinbaren"
      text={SCREENING_CTA_TEXT}
      bookingLabel="Mammographie-Termin buchen"
    />
  </>
);

export default MammographiePage;
