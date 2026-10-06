import { FileText, CreditCard } from 'lucide-react';
import { services } from '../../data/services';

// Zuweisungs- und Kasseninformation. serviceKey = Schlüssel aus data/services.js.
// Ohne serviceKey: allgemeiner Kassenhinweis.
export const INSURANCE_SUMMARY = 'Kassenpraxis mit Direktverrechnung: ÖGK, BVAEB, SVS und KFA. Privat möglich.';

const ReferralInfo = ({ serviceKey, headingLevel = 3, className }) => {
  const s = serviceKey ? services[serviceKey] : null;
  const H = `h${headingLevel}`;
  return (
    <div className={className}>
      <H className="mb-3 font-display font-semibold text-lg text-slate-900 dark:text-white">Überweisung und Kasse</H>
      <ul className="space-y-3 text-slate-700 dark:text-slate-200">
        {s?.referral?.summary && (
          <li className="flex gap-3">
            <FileText size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
            <span>{s.referral.summary}</span>
          </li>
        )}
        {(s?.referral?.items || []).map((item) => (
          <li key={item} className="flex gap-3 pl-8 text-[0.95rem] text-slate-600 dark:text-slate-300">
            <span>{item}</span>
          </li>
        ))}
        <li className="flex gap-3">
          <CreditCard size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
          <span>{INSURANCE_SUMMARY} Bitte bringen Sie Ihre e-Card mit.</span>
        </li>
      </ul>
    </div>
  );
};

export default ReferralInfo;
