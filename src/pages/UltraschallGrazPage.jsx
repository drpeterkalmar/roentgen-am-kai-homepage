import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import { SectionHeading } from '../components/ui/Heading';
import { buttonClasses } from '../components/ui/Button';
import FAQ, { useRouteFaq } from '../components/FAQ';
import { StatusBadge, AppointmentActions, RadiationInfo, ExamCTA, FactList } from '../components/exams/ExamParts';
import { AREAS, EXAMS_BASE, EXAMS_CRUMB, ULTRASOUND_AREAS, ULTRASOUND_FACTS, PUCMED } from '../data/examinations';

// /ultraschall-graz – Ultraschall (Termin erforderlich). Nervenultraschall: externe Weiterleitung zu PUCmed.
const UltraschallGrazPage = () => {
  const faq = useRouteFaq(); // FAQ laut Routentabelle (routes.js: faq) = FAQPage-Schema
  const area = AREAS.ultraschall;
  return (
    <>
      <Hero
        breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: EXAMS_CRUMB, href: EXAMS_BASE }, { name: 'Ultraschall' }]}
        title="Ultraschall in Graz"
        status={<StatusBadge area={area} />}
        lead="Ultraschall, medizinisch auch Sonographie genannt, stellt Organe und Gewebe mithilfe von Schallwellen dar und verwendet keine ionisierende Röntgenstrahlung."
        actions={<AppointmentActions area={area} size="lg" label={area.ctaLabel} />}
      >
        <h2 className="sr-only">Auf einen Blick</h2>
        <FactList
          className="mt-8"
          items={[
            { label: 'Termin', value: ULTRASOUND_FACTS.appointment },
            { label: 'Zuweisung', value: ULTRASOUND_FACTS.referral },
            { label: 'Kasse oder privat', value: ULTRASOUND_FACTS.billing, placeholder: ULTRASOUND_FACTS.billingOpen },
            { label: 'Vorbereitung', value: ULTRASOUND_FACTS.preparation },
          ]}
        />
      </Hero>

      <Section labelledBy="us-bereiche-title">
        <SectionHeading id="us-bereiche-title" title="Unsere Ultraschalluntersuchungen" lead="Welche Region untersucht wird, richtet sich nach Ihrer ärztlichen Zuweisung." />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ULTRASOUND_AREAS.map((a) => (
            <li key={a.id} id={a.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">{a.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">{a.text}</p>
              {a.link && (
                <p className="mt-auto pt-4">
                  <Link to={a.link.to} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
                    {a.link.label} <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </p>
              )}
            </li>
          ))}
        </ul>

        {/* Klar getrennt: spezialisiertes Angebot über PUCmed (keine Kassen-Sonographie von Röntgen am Kai) */}
        <article
          id="nervenultraschall"
          aria-labelledby="nerven-title"
          className="mt-12 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-600 dark:bg-slate-900 sm:p-8"
          data-pucmed
        >
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Spezialisiertes Angebot von PUCmed</p>
          <h3 id="nerven-title" className="mt-1 font-display text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
            Hochauflösender Nervenultraschall
          </h3>
          <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-200">
            Mit hochauflösendem Ultraschall können periphere Nerven und sehr feine Strukturen gezielt dargestellt und teilweise auch
            dynamisch untersucht werden. Diese spezialisierte Diagnostik wird über PUCmed angeboten.
          </p>
          <p className="mt-3 max-w-3xl text-[0.95rem] text-slate-700 dark:text-slate-200">
            Terminvereinbarung und Abrechnung erfolgen über PUCmed – nicht über Röntgen am Kai.
          </p>
          <p className="mt-4 max-w-3xl text-sm text-slate-600 dark:text-slate-300" id="pucmed-hinweis">
            Sie verlassen die Website von Röntgen am Kai und gelangen zum spezialisierten Angebot von PUCmed.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={PUCMED.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="pucmed-hinweis"
              data-cta="external_pucmed"
              className={buttonClasses({ variant: 'secondary' })}
            >
              <span>Zum hochauflösenden Nervenultraschall bei PUCmed</span>
              <ExternalLink size={18} aria-hidden="true" className="shrink-0" />
              <span className="sr-only"> (externe Website, öffnet in neuem Fenster)</span>
            </a>
            {PUCMED.bookingUrl && (
              <a href={PUCMED.bookingUrl} target="_blank" rel="noopener noreferrer" aria-describedby="pucmed-hinweis" className={buttonClasses({ variant: 'ghost' })}>
                <span>Termin bei PUCmed</span>
                <ExternalLink size={18} aria-hidden="true" className="shrink-0" />
                <span className="sr-only"> (externe Website, öffnet in neuem Fenster)</span>
              </a>
            )}
          </div>
        </article>
      </Section>

      <Section tone="muted" labelledBy="strahlung-title" spacing="md">
        <RadiationInfo ids={[]} ultrasound xray={false} />
      </Section>

      <FAQ items={faq} title="Häufige Fragen zum Ultraschall" />

      <ExamCTA area="ultraschall" id="us-cta-title" title="Ultraschalltermin vereinbaren" label={area.ctaLabel} />
    </>
  );
};

export default UltraschallGrazPage;
