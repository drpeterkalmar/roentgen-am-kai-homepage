// „Was möchten Sie erreichen?“ – Einstieg über das Anliegen statt über das Verfahren.
// services = Schlüssel aus src/data/services.js. Kurztexte beschreiben nur, WAS gemessen/untersucht wird
// (keine Heilversprechen); ausführliche Texte je Ziel sind noch ärztlich freizugeben – ausführlich auf den Zielseiten unter /gesundheitsziele/…
export const goals = [
  {
    id: 'gewicht',
    goalPath: '/gesundheitsziele/gesund-abnehmen', // Zielseite (Gesundheitsziele, 27.09.2026)
    title: 'Gewichtsabnahme',
    text: 'Veränderungen von Körperfett und fettfreier Masse im Verlauf messbar machen – auch während einer ärztlich begleiteten Therapie mit einer Abnehmspritze.',
    services: ['koerperanalyse'],
  },
  {
    id: 'fitness',
    goalPath: '/gesundheitsziele/fitness-muskelaufbau', // Zielseite (Gesundheitsziele, 27.09.2026)
    title: 'Fitness und Muskelaufbau',
    text: 'Körperzusammensetzung und die regionale Verteilung von Fett- und Magermasse erfassen.',
    services: ['koerperanalyse'],
  },
  {
    id: 'wechseljahre',
    goalPath: '/gesundheitsziele/frauengesundheit-wechseljahre', // Zielseite (Gesundheitsziele, 27.09.2026)
    title: 'Wechseljahre und gesundes Älterwerden',
    text: 'Knochendichte und Brustvorsorge im Blick behalten – und Veränderungen von Fettverteilung und Muskelmasse erfassen.',
    services: ['knochendichte', 'mammographie', 'koerperanalyse'],
  },
  {
    id: 'osteoporose',
    goalPath: '/gesundheitsziele/gesund-aelter-werden', // Zielseite (Gesundheitsziele, 27.09.2026)
    title: 'Osteoporosevorsorge',
    text: 'Die Knochendichte mit der DEXA-Methode messen – zur Früherkennung und Verlaufskontrolle.',
    services: ['knochendichte'],
  },
  {
    id: 'abklaerung',
    title: 'Rasche Beschwerdeabklärung',
    text: 'Röntgen ohne vorherige Terminvereinbarung (mit Zuweisung und e-card) und Ultraschall mit Termin.',
    services: ['roentgen', 'ultraschall'],
  },
];
