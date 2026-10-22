import { IdCard, ClipboardCheck, Bone, Images } from 'lucide-react';
import ExplainerFigure, { keepEcard } from './ExplainerFigure';

// A004 – Ihr Weg zum Röntgen ohne Termin. Nur Schritte und Aussagen aus dem Seitentext von /roentgen-graz
// (Hero, „Bitte mitbringen“, „Vor der Aufnahme“, Kacheln „Digital aufgenommen / Fachärztlich beurteilt /
// Digital übermittelt“). Desktop: vier Schritte in einer Reihe; Handy: senkrecht mit Verbindungslinie.
const STEPS = [
  {
    icon: IdCard,
    title: 'Zuweisung und e-card',
    text: 'Bitte mitbringen: gültige ärztliche Zuweisung (Papier oder digital) und Ihre e-card.',
  },
  {
    icon: ClipboardCheck,
    title: 'Anmeldung',
    text: 'Während unserer Röntgenzeiten ohne vorherige Terminvereinbarung – oder zur reservierten Wunschzeit.',
  },
  {
    icon: Bone,
    title: 'Aufnahme',
    text: 'Schmuck und Metall im Untersuchungsbereich ablegen. Die Aufnahmen werden digital erstellt.',
  },
  {
    icon: Images,
    title: 'Befund und Bilder',
    text: 'Fachärztlich beurteilt. Ihre zuweisende Ärztin oder Ihr zuweisender Arzt erhält Befund und Bilder digital – zusätzlich über ELGA und portal.marc.at.',
  },
];

const XrayWay = ({ className }) => (
  <ExplainerFigure id="A004" className={className} subtitle="In vier Schritten vom Zuweisungsschein zum Befund" schematic={false}>
    <ol className="grid grid-cols-1 md:grid-cols-4 md:gap-8" data-xray-steps="">
      {STEPS.map(({ icon: Icon, title, text }, i) => (
        <li key={title} className="relative flex min-w-0 gap-4 pb-6 last:pb-0 md:block md:pb-0" data-step={i + 1}>
          {i < STEPS.length - 1 && (
            <>
              <span aria-hidden="true" className="absolute bottom-1 left-[1.4375rem] top-14 w-0.5 rounded-full bg-slate-300 dark:bg-slate-600 md:hidden" />
              <span aria-hidden="true" className="absolute left-[3.75rem] right-[-1.25rem] top-6 hidden h-0.5 rounded-full bg-slate-300 dark:bg-slate-600 md:block" />
            </>
          )}
          <span
            aria-hidden="true"
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand ring-1 ring-brand-200 dark:bg-brand-950 dark:text-brand-300 dark:ring-brand-800"
          >
            <Icon size={24} />
          </span>
          <div className="min-w-0 md:mt-3">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Schritt {i + 1}</p>
            <p className="font-semibold text-slate-900 dark:text-white">{keepEcard(title)}</p>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">{keepEcard(text)}</p>
          </div>
        </li>
      ))}
    </ol>
  </ExplainerFigure>
);

export default XrayWay;
