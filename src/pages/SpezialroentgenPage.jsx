import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Placeholder from '../components/ui/Placeholder';
import { SectionHeading } from '../components/ui/Heading';
import { buttonClasses } from '../components/ui/Button';
import { StatusBadge, AppointmentActions, RadiationInfo, ExamCTA } from '../components/exams/ExamParts';
import { AREAS, EXAMS_BASE, EXAMS_CRUMB, SPECIAL_EXAMS, SPECIAL_DETAIL_LABELS, SPECIAL_OPEN } from '../data/examinations';

// /spezialroentgen – Spezialröntgen und Kontrastmitteluntersuchungen (Termin erforderlich).
// Jede Untersuchung hat eigene Angaben (Vorbereitung, Kontrastmittel, Laborwerte, Medikamente, Schwangerschaft, Dauer);
// nicht gelieferte Angaben erscheinen als redaktioneller Platzhalter – nichts wird pauschal übertragen.
const SpezialroentgenPage = () => {
  const area = AREAS.spezialroentgen;
  return (
    <>
      <Hero
        breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: EXAMS_CRUMB, href: EXAMS_BASE }, { name: 'Spezialröntgen' }]}
        title="Spezialröntgen und Kontrastmitteluntersuchungen in Graz"
        status={<StatusBadge area={area} />}
        lead="Bei bestimmten medizinischen Fragestellungen werden Gefäße, Organe oder Bewegungsabläufe mithilfe von Kontrastmittel und dynamischen Röntgenaufnahmen untersucht."
        actions={<AppointmentActions area={area} size="lg" />}
      />

      <Section labelledBy="spezial-title">
        <SectionHeading id="spezial-title" title="Unsere Spezialuntersuchungen" lead="Welche Untersuchung durchgeführt wird, bestimmt Ihre ärztliche Zuweisung." />
        <ul className="grid gap-5 md:grid-cols-2">
          {SPECIAL_EXAMS.map((e) => {
            const target = e.detailPage || `#details-${e.id}`;
            const btnCls = buttonClasses({ variant: 'secondary', block: true });
            const btnContent = (
              <>
                Untersuchung ansehen<span className="sr-only">: {e.name}</span>
                {e.detailPage ? <ArrowRight size={18} aria-hidden="true" className="shrink-0" /> : <ArrowDown size={18} aria-hidden="true" className="shrink-0" />}
              </>
            );
            return (
              <li key={e.id} id={e.id}>
                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-7" data-special={e.id}>
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-[1.375rem]">{e.name}</h3>
                  <p className="mt-1 text-[0.95rem] font-medium text-slate-600 dark:text-slate-300">
                    <span className="sr-only">Fachbegriff: </span>{e.term}
                  </p>
                  <StatusBadge area={area} size="sm" className="mt-4" />
                  <p className="mt-4 text-slate-700 dark:text-slate-200">{e.purpose}</p>
                  <div className="mt-auto pt-6">
                    {e.detailPage ? <Link to={target} className={btnCls}>{btnContent}</Link> : <a href={target} className={btnCls}>{btnContent}</a>}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <Placeholder internal className="mt-8">{SPECIAL_OPEN}</Placeholder>
      </Section>

      {/* Untersuchungsspezifische Angaben – je Untersuchung getrennt gepflegt */}
      <Section tone="muted" labelledBy="details-title">
        <SectionHeading
          id="details-title"
          title="Vorbereitung und Ablauf je Untersuchung"
          lead="Jede Untersuchung hat eigene Hinweise. Bitte beachten Sie nur die Angaben zu Ihrer Untersuchung – wir informieren Sie bei der Terminvereinbarung."
        />
        <div className="space-y-6">
          {SPECIAL_EXAMS.map((e) => (
            <section key={e.id} id={`details-${e.id}`} aria-labelledby={`details-${e.id}-title`} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8">
              <h3 id={`details-${e.id}-title`} className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                {e.name} <span className="font-sans text-base font-medium text-slate-600 dark:text-slate-300">({e.term})</span>
              </h3>
              <dl className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
                {Object.entries(SPECIAL_DETAIL_LABELS).map(([key, label]) => (
                  <div key={key}>
                    <dt className="font-semibold text-slate-900 dark:text-white">{label}</dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">
                      {e.details[key] || <Placeholder inline>{`${label} – Angabe der Praxis folgt`}</Placeholder>}
                    </dd>
                  </div>
                ))}
              </dl>
              {e.detailPage && (
                <p className="mt-5">
                  <Link to={e.detailPage} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-300">
                    Ausführlich: {e.name} ({e.term}) <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </p>
              )}
            </section>
          ))}
        </div>
      </Section>

      <Section labelledBy="strahlung-title" spacing="md">
        <RadiationInfo ids={[]} />
      </Section>

      <ExamCTA area="spezialroentgen" id="spezial-cta-title" title="Termin für Spezialröntgen vereinbaren" label={area.ctaLabel} />
    </>
  );
};

export default SpezialroentgenPage;
