// Hauptnavigation — eine Quelle für Header (Desktop + Mobil) und Footer.
// Vier Hauptbereiche (Daten: src/data/examinations.js). „Digitales Röntgen“ ist kein Menüpunkt mehr (04.10.2026).
export const OTHER_EXAMS = [
  { name: 'Röntgen', href: '/roentgen-graz' },
  { name: 'Ultraschall', href: '/ultraschall-graz' },
  { name: 'Spezialröntgen mit Kontrastmittel', href: '/spezialroentgen' },
  { name: 'Zahnröntgen und 3D-DVT', href: '/zahnroentgen-dvt-graz' },
];

export const MAIN_NAV = [
  { name: 'Startseite', href: '/' },
  { name: 'Mammographie & Brustgesundheit', href: '/mammographie-graz' },
  { name: 'Knochendichte', href: '/knochendichtemessung-graz' },
  { name: 'Körperanalyse', href: '/koerperanalyse-graz' },
  {
    name: 'Weitere Untersuchungen',
    href: '/weitere-untersuchungen',
    children: [{ name: 'Alle weiteren Untersuchungen', href: '/weitere-untersuchungen' }, ...OTHER_EXAMS],
    // Aktiv auch auf den Detailseiten der weiteren Untersuchungen
    match: [...OTHER_EXAMS.map((e) => e.href), '/unser-angebot/phlebographie'],
  },
  { name: 'Gesundheitsziele', href: '/gesundheitsziele' },
  { name: 'Ratgeber', href: '/ratgeber' },
  { name: 'Praxis und Kontakt', href: '/kontakt', match: ['/unser-team'] },
];

export const LEGAL_NAV = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
];

export const isActive = (item, pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (item.href === '/') return clean === '/';
  if (clean === item.href) return true;
  return (item.match || []).some((p) => clean === p || clean.startsWith(p + '/'));
};
