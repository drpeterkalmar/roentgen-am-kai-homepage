import { cx } from './cx';
import Container from './Container';

// Einheitliche vertikale Abstände und ruhige Hintergrundtöne.
const tones = {
  white: 'bg-white dark:bg-slate-950',
  muted: 'bg-slate-50 dark:bg-slate-900',
  brand: 'bg-brand-50 dark:bg-slate-900',
};
const spacings = {
  sm: 'py-10 sm:py-12',
  md: 'py-14 sm:py-20',
  lg: 'py-20 sm:py-28',
};

const Section = ({ id, tone = 'white', spacing = 'md', size = 'default', labelledBy, className, children }) => (
  <section id={id} aria-labelledby={labelledBy} className={cx(tones[tone], spacings[spacing], className)}>
    <Container size={size}>{children}</Container>
  </section>
);

export default Section;
