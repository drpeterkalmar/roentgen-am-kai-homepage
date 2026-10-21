import { Stethoscope } from 'lucide-react';
import Placeholder from '../ui/Placeholder';

const deDate = (iso) => iso.split('-').reverse().join('.');

// „Medizinisch geprüft von … – Stand …“; reviewed = { by, at: 'YYYY-MM-DD' } oder null (dann gelber Platzhalter).
export default function ReviewedNote({ reviewed }) {
  return (
    <p className="flex flex-wrap items-center gap-2" data-reviewed={reviewed ? 'ja' : undefined}>
      <Stethoscope size={16} aria-hidden="true" />
      {reviewed ? (
        <>Medizinisch geprüft von {reviewed.by} – Stand {deDate(reviewed.at)}</>
      ) : (
        <>Medizinisch geprüft von <Placeholder inline>Dr. [NAME]</Placeholder> – Stand <Placeholder inline>[DATUM]</Placeholder></>
      )}
    </p>
  );
}
