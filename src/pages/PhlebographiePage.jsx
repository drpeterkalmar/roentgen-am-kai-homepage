import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Notice from '../components/ui/Notice';
import Picture from '../components/ui/Picture';
import ReferralInfo from '../components/ui/ReferralInfo';
import { H3, P, Bullets } from '../components/ui/Text';
import { StatusBadge, AppointmentActions } from '../components/exams/ExamParts';
import FAQ, { useRouteFaq } from '../components/FAQ';
import { AREAS, EXAMS_BASE, EXAMS_CRUMB } from '../data/examinations';

// /unser-angebot/phlebographie – Venenröntgen (Termin erforderlich, wie alle Spezialröntgen-Untersuchungen).
// Designsystem: Hero, Section, Card (früher ServiceLayout). Vorgerendert (routes.js: prerender) und hydriert.

const LEGS = [
  { name: 'phlebo-leg-1', alt: 'Phlebografie Oberschenkel' },
  { name: 'phlebo-leg-2', alt: 'Phlebografie Knie' },
  { name: 'phlebo-leg-3', alt: 'Phlebografie Unterschenkel' },
];

const USES = [
  'Darstellung von Krampfadern',
  'Beurteilung der Venenklappen',
  'Prüfung der Durchgängigkeit der tiefen und oberflächlichen Beinvenen vor einer Krampfadernoperation',
  'Nachweis oder Ausschluss von Verschlüssen der tiefen Beinvenen durch Blutgerinnsel (Thrombose)',
];

const PREPARATION = [
  'Bei bekannten Nierenerkrankungen benötigen wir Ihren aktuellen Kreatinin- (bzw. GFR-)Wert.',
  'Bei einer Schilddrüsenerkrankung müssen wir Ihren TSH-Wert wissen.',
  'In beiden Fällen wenden Sie sich bitte vor der Untersuchung an Ihren Hausarzt.',
  'Termin erforderlich: bitte telefonisch vereinbaren.',
];

const REQUIREMENTS = [
  'Überweisungsschein (Papier oder digital)',
  'Aktuelle e-Card',
  'Eventuelle Voraufnahmen zum Vergleich',
];

// Terminlogik wie Spezialröntgen; Telefonhinweis für die Phlebographie
const area = { ...AREAS.spezialroentgen, key: 'phlebographie', phoneHint: '„Phlebographie“ bzw. „Venenröntgen“' };

const H2 = ({ id, children }) => (
  <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{children}</h2>
);

const PhlebographiePage = () => {
  const faq = useRouteFaq(); // FAQ laut Routentabelle (routes.js: faq) = FAQPage-Schema
  return (
    <>
      <Hero
        breadcrumbs={[
          { name: 'Startseite', href: '/' },
          { name: EXAMS_CRUMB, href: EXAMS_BASE },
          { name: 'Spezialröntgen', href: '/spezialroentgen' },
          { name: 'Venenröntgen (Phlebographie)' },
        ]}
        title="Venenröntgen (Phlebographie)"
        status={<StatusBadge area={AREAS.spezialroentgen} />}
        lead='Die Phlebographie ist eine Venenuntersuchung, bei der ein Kontrastmittel in eine Vene der zu untersuchenden Region gespritzt wird, um deren Beschaffenheit und Lage zu beurteilen.'
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="min-w-0 space-y-12 lg:col-span-2">
            <ul className="grid grid-cols-3 gap-2 md:gap-6">
              {LEGS.map((l) => (
                <li key={l.name} className="overflow-hidden rounded-xl bg-slate-950">
                  <Picture name={l.name} sizes="(max-width: 1023px) 33vw, 240px" alt={l.alt} width={1352} height={2827} className="h-auto w-full" />
                </li>
              ))}
            </ul>

            <Notice tone="important">
              <p><strong>Wichtig:</strong> Diese Untersuchung kann nicht durchgeführt werden, wenn bei Ihnen eine Kontrastmittelallergie vorliegt oder wenn Sie schwanger sind.</p>
            </Notice>

            <section aria-labelledby="einsatz-title">
              <H2 id="einsatz-title">Einsatzgebiete</H2>
              <div className="mt-6">
                <Bullets items={USES} cols />
              </div>
            </section>

            <section aria-labelledby="ablauf-title">
              <H2 id="ablauf-title">Ablauf der Untersuchung</H2>
              <div className="mt-4">
            <P>
              Meist wird die Venenuntersuchung an den Beinen durchgeführt, in einigen Fällen an den Armen. Sowohl die oberflächlichen als auch die tiefen Venen werden mit Hilfe von Kontrastmitteln dargestellt.
            </P>
            <P className="mt-4">
              Die Vorgehensweise beginnt mit einer Nadelpunktion am Fußrücken, bei der die Blutgefäße mit einem Kontrastmittel gefüllt werden. Anschließend werden Aufnahmen in verschiedenen Projektionen zur Beurteilung der Venen und Venenklappen mittels digitaler Röntgenaufnahmetechnik durchgeführt.
            </P>
            <P className="mt-4">
              Auch als Vorbereitung einer Krampfadern-Operation sowie bei der Abklärung von wiederkehrenden Varizen ist die Phlebographie eine bewährte diagnostische Methode.
            </P>
              </div>
            </section>

            <FAQ items={faq} title="Häufige Fragen zur Phlebographie" />

            <Card tone="muted" as="section" aria-labelledby="info-title">
              <H2 id="info-title">Wichtige Informationen</H2>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <div>
                  <H3 className="mb-3 !text-lg">Vorbereitung</H3>
                  <Bullets items={PREPARATION} />
                </div>
                <div>
                  <H3 className="mb-3 !text-lg">Bitte mitbringen</H3>
                  <Bullets items={REQUIREMENTS} />
                </div>
              </div>
            </Card>
          </div>

          <aside aria-label="Termin und Kosten" className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-[calc(var(--header-height)+24px)]">
              <Card tone="brand" data-exam-cta="phlebographie">
                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Termin vereinbaren</h2>
                <div className="mt-3"><StatusBadge area={AREAS.spezialroentgen} /></div>
                <div className="mt-4"><AppointmentActions area={area} /></div>
              </Card>
              <Card>
                <ReferralInfo serviceKey="phlebographie" headingLevel={2} />
              </Card>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
};

export default PhlebographiePage;
