import { cx } from './cx';

// Einheitliche Inhaltsbreiten:
//   narrow  – Fließtext (≈ 70 Zeichen pro Zeile)
//   default – Standardseiten
//   wide    – Übersichten mit Kartenrastern
const widths = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
};

const Container = ({ as: Tag = 'div', size = 'default', className, children, ...rest }) => (
  <Tag className={cx('mx-auto w-full px-5 sm:px-6 lg:px-8', widths[size], className)} {...rest}>
    {children}
  </Tag>
);

export default Container;
