import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Notice from '../components/ui/Notice';
import PriceList from '../components/ui/PriceList';
import { SectionHeading } from '../components/ui/Heading';
import FAQ from '../components/FAQ';
import { faqData } from '../data/faqData';
import { StatusBadge, AppointmentActions, RadiationInfo, ExamCTA } from '../components/exams/ExamParts';
import { AREAS, EXAMS_BASE, EXAMS_CRUMB, confirmedDental, RADIATION_BY_AREA } from '../data/examinations';

// /zahnroentgen-dvt-graz – Zahnröntgen und 3D-DVT (Termin erforderlich).
// Nur bestätigte Leistungen (confirmed: true in examinations.js) werden veröffentlicht.
const Group = ({ id, title, lead, items }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="mt-10 first:mt-0">
    <h3 id={`${id}-title`} className="font-display text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">{title}</h3>
    {lead && <p className="mt-2 max-w-3xl text-slate-700 dark:text-slate-200">{lead}</p>}
    <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <li key={s.id} id={s.id} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900" data-dental={s.id}>
          <h4 className="font-sans text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h4>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">{s.text}</p>
        </li>
      ))}
    </ul>
  </section>
);

const ZahnroentgenDvtPage = () => {
  const area = AREAS.zahn;
  return (
    <>
      <Hero
        breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: EXAMS_CRUMB, href: EXAMS_BASE }, { name: 'Zahnröntgen und 3D-DVT' }]}
        title="Zahnröntgen und 3D-DVT in Graz"
        status={<StatusBadge area={area} />}
        lead="Zahnröntgen liefert zweidimensionale Übersichts- oder Detailaufnahmen. Die digitale Volumentomographie, kurz DVT, stellt Zähne, Kiefer und angrenzende Strukturen dreidimensional dar."
        actions={<AppointmentActions area={area} size="lg" label={area.ctaLabel} />}
      />

      <Section labelledBy="zahn-title">
        <SectionHeading id="zahn-title" title="Unser Leistungsspektrum" />
        <Notice tone="info" title="Welche Aufnahme brauche ich?" className="mb-10 max-w-3xl">
          Art und Aufnahmebereich hängen von der zahnärztlichen beziehungsweise fachärztlichen Fragestellung ab. Bitte bringen Sie
          Ihre Zuweisung mit – sie legt fest, welche Aufnahme gemacht wird.
        </Notice>
        <Group
          id="zahnroentgen"
          title="Zahnröntgen und Panoramaröntgen"
          lead="Zweidimensionale Übersichts- und Detailaufnahmen."
          items={confirmedDental.filter((s) => s.kind === '2D')}
        />
        <Group
          id="dvt"
          title="3D-Röntgen mit DVT"
          lead="DVT steht für digitale Volumentomographie: ein 3D-Röntgenverfahren für Zähne, Kiefer, Nasennebenhöhlen, Gesichtsschädel, Kiefergelenke und den Übergang vom Schädel zur Halswirbelsäule."
          items={confirmedDental.filter((s) => s.kind === '3D')}
        />
      </Section>

      <Section tone="muted" labelledBy="zahn-kosten-title" spacing="md">
        <div className="grid gap-6 lg:grid-cols-2">
          <RadiationInfo ids={RADIATION_BY_AREA.zahn} />
          <Card className="self-start">
            <h2 id="zahn-kosten-title" className="font-display text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">Zuweisung und Kosten</h2>
            <p className="mt-3 text-slate-700 dark:text-slate-200">Bitte bringen Sie Ihre zahnärztliche oder fachärztliche Zuweisung mit.</p>
            <div className="mt-5"><PriceList ids={['dvt', 'zahnroentgen']} headingLevel={3} /></div>
          </Card>
        </div>
      </Section>

      <FAQ items={faqData.dvt} title="Häufige Fragen zur DVT und zum Zahnröntgen" />

      <ExamCTA area="zahn" id="zahn-cta-title" title="Termin für Zahnröntgen oder DVT vereinbaren" label={area.ctaLabel} />
    </>
  );
};

export default ZahnroentgenDvtPage;
