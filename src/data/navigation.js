// Hauptnavigation — eine Quelle für Header (Desktop + Mobil) und Footer.
export const OTHER_EXAMS = [
  { name: 'Digitales Röntgen', href: '/unser-angebot/roentgen' },
  { name: 'Ultraschall (Sonographie)', href: '/unser-angebot/ultraschall' },
  { name: 'Phlebographie', href: '/unser-angebot/phlebographie' },
  { name: 'DVT / Zahnröntgen', href: '/unser-angebot/dvt' },
];

export const MAIN_NAV = [
  { name: 'Startseite', href: '/' },
  { name: 'Mammographie', href: '/unser-angebot/mammographie' },
  { name: 'Knochendichte', href: '/unser-angebot/knochendichte' },
  { name: 'DEXA-Körperanalyse', href: '/unser-angebot/koerperfettmessung' },
  {
    name: 'Weitere Untersuchungen',
    href: '/weitere-untersuchungen',
    children: [{ name: 'Alle weiteren Untersuchungen', href: '/weitere-untersuchungen' }, ...OTHER_EXAMS],
    // Aktiv auch auf den Detailseiten der weiteren Untersuchungen
    match: OTHER_EXAMS.map((e) => e.href),
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
