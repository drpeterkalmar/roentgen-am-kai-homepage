import { FileText, Send, Clock, MapPin, Images, Stethoscope } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Placeholder from '../components/ui/Placeholder';
import { SectionHeading } from '../components/ui/Heading';
import { OpeningHours, Directions, ContactDetails } from '../components/ui/PracticeInfo';
import FAQ from '../components/FAQ';
import { faqData } from '../data/faqData';
import { StatusBadge, AppointmentActions, RadiationInfo, ExamCTA } from '../components/exams/ExamParts';
import BodyNavigator from '../components/exams/BodyNavigator';
import ReferralSearch from '../components/exams/ReferralSearch';
import { AREAS, EXAMS_BASE, EXAMS_CRUMB, XRAY_GROUPS, XRAY_HOURS_NOTE, RADIATION_BY_AREA } from '../data/examinations';

// /roentgen-graz – Röntgen: direkt vorbeikommen (mit Zuweisung + e-card) oder Wunschzeit reservieren.
const Bullet = ({ children }) => (
  <li className="flex gap-3">
    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
    <span>{children}</span>
  </li>
);

const RoentgenGrazPage = () => {
  const area = AREAS.roentgen;
  return (
    <>
      <Hero
        breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: EXAMS_CRUMB, href: EXAMS_BASE }, { name: 'Röntgen' }]}
        title="Röntgen in Graz – direkt vorbeikommen oder Wunschzeit reservieren"
        status={<StatusBadge area={area} text="Röntgen ohne vorherige Terminvereinbarung möglich" />}
        lead="Benötigen Sie ein Röntgen von Knochen, Gelenken, Wirbelsäule oder Lunge? Mit gültiger ärztlicher Zuweisung und e-card können Sie während unserer Röntgenzeiten ohne vorherige Terminvereinbarung vorbeikommen."
        actions={<AppointmentActions area={area} size="lg" />}
      />

      {/* Kurz erklärt: digital als Qualitätsmerkmal */}
      <Section spacing="sm" labelledBy="ablauf-kurz-title">
        <h2 id="ablauf-kurz-title" className="sr-only">So läuft Ihr Röntgen ab</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Images, title: 'Digital aufgenommen', text: 'Die Aufnahmen werden digital erstellt und in unserem Bildarchiv gespeichert.' },
            { icon: Stethoscope, title: 'Fachärztlich beurteilt', text: 'Jede Aufnahme wird von einem Facharzt für Radiologie beurteilt.' },
            { icon: Send, title: 'Digital übermittelt', text: 'Befund und Bilder erhält Ihre zuweisende Ärztin oder Ihr zuweisender Arzt digital – mit den steirischen Spitälern über das MARC-System. Zusätzlich über ELGA und online unter portal.marc.at.' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <Icon size={24} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
              <div>
                <h3 className="font-sans text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Direkt vorbeikommen: Öffnungszeiten, Unterlagen, Anfahrt (Ziel der Schaltfläche „Direkt vorbeikommen“) */}
      <Section id="direkt-vorbeikommen" tone="muted" labelledBy="vorbeikommen-title">
        <SectionHeading
          id="vorbeikommen-title"
          title="Direkt vorbeikommen: Zeiten, Unterlagen und Anfahrt"
          lead="Für ein Röntgen brauchen Sie keine vorherige Terminvereinbarung – aber eine gültige ärztliche Zuweisung und Ihre e-card."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card as="section" aria-labelledby="rz-title">
            <h3 id="rz-title" className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-slate-900 dark:text-white">
              <Clock size={20} aria-hidden="true" className="text-brand dark:text-brand-300" /> Röntgenzeiten
            </h3>
            <OpeningHours withIcon={false} />
            {XRAY_HOURS_NOTE ? <p className="mt-3 text-sm">{XRAY_HOURS_NOTE}</p> : (
              <Placeholder className="mt-4">Röntgenzeiten, falls abweichend von den Öffnungszeiten (z. B. letzte Annahme vor Ordinationsschluss)</Placeholder>
            )}
          </Card>
          <Card as="section" aria-labelledby="mitbringen-title">
            <h3 id="mitbringen-title" className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-slate-900 dark:text-white">
              <FileText size={20} aria-hidden="true" className="text-brand dark:text-brand-300" /> Bitte mitbringen
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              <Bullet>Gültige ärztliche Zuweisung (Papier oder digital)</Bullet>
              <Bullet>Ihre e-card</Bullet>
              <Bullet>Frühere Aufnahmen zum Vergleich, falls vorhanden</Bullet>
            </ul>
            <h4 className="mb-2 mt-6 font-sans text-base font-semibold text-slate-900 dark:text-white">Vor der Aufnahme</h4>
            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
              <Bullet>Schmuck und Metallgegenstände im Untersuchungsbereich bitte ablegen.</Bullet>
              <Bullet>Wenn Sie schwanger sind oder schwanger sein könnten, sagen Sie es uns bitte vorher.</Bullet>
            </ul>
          </Card>
          <Card className="md:col-span-2 lg:col-span-1">
            <h3 id="anfahrt-title" className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-slate-900 dark:text-white">
              <MapPin size={20} aria-hidden="true" className="text-brand dark:text-brand-300" /> Anfahrt
            </h3>
            <ContactDetails />
            <Directions className="mt-5" />
          </Card>
        </div>
      </Section>

      {/* Zuweisungssuche + Körpernavigator */}
      <Section labelledBy="zuweisung-title">
        <ReferralSearch />
        <div className="mt-14 border-t border-slate-200 pt-14 dark:border-slate-800">
          <BodyNavigator />
        </div>
      </Section>

      {/* Angebotene Aufnahmen nach Gruppen */}
      <Section tone="muted" labelledBy="aufnahmen-title">
        <SectionHeading
          id="aufnahmen-title"
          title="Unsere Röntgenaufnahmen"
          lead="Die ärztliche Zuweisung bestimmt Art und Umfang der Aufnahmen."
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {XRAY_GROUPS.map((g) => (
            <li key={g.id} id={g.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{g.title}</h3>
              <ul className="mt-3 space-y-1.5 text-[0.95rem] text-slate-700 dark:text-slate-200">
                {g.items.map((i) => <Bullet key={i}>{i}</Bullet>)}
              </ul>
              {g.note && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{g.note}</p>}
              {g.placeholder && <Placeholder className="mt-3">{g.placeholder}</Placeholder>}
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="strahlung-title" spacing="md">
        <RadiationInfo
          ids={RADIATION_BY_AREA.roentgen}
          lead="Zur Orientierung einige typische Werte:"
        />
      </Section>

      <FAQ items={faqData.roentgen} title="Häufige Fragen zum Röntgen" />

      <ExamCTA
        area="roentgen"
        id="roentgen-cta-title"
        title="Röntgen: direkt vorbeikommen oder Wunschzeit reservieren"
      />
    </>
  );
};

export default RoentgenGrazPage;
