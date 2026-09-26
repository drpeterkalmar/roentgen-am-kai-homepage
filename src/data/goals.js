// „Was möchten Sie erreichen?“ – Einstieg über das Anliegen statt über das Verfahren.
// services = Schlüssel aus src/data/services.js. Kurztexte beschreiben nur, WAS gemessen/untersucht wird
// (keine Heilversprechen); ausführliche Texte je Ziel sind noch ärztlich freizugeben (Platzhalter auf /gesundheitsziele).
export const goals = [
  {
    id: 'gewicht',
    title: 'Gewichtsabnahme',
    text: 'Veränderungen von Körperfett und Magermasse im Verlauf messbar machen.',
    services: ['koerperanalyse'],
  },
  {
    id: 'fitness',
    title: 'Fitness',
    text: 'Körperzusammensetzung und die regionale Verteilung von Fett- und Magermasse erfassen.',
    services: ['koerperanalyse'],
  },
  {
    id: 'wechseljahre',
    title: 'Wechseljahre',
    text: 'Knochendichte und Brustvorsorge im Blick behalten.',
    services: ['knochendichte', 'mammographie'],
  },
  {
    id: 'osteoporose',
    title: 'Osteoporosevorsorge',
    text: 'Die Knochendichte mit der DEXA-Methode messen – zur Früherkennung und Verlaufskontrolle.',
    services: ['knochendichte'],
  },
  {
    id: 'abklaerung',
    title: 'Rasche Beschwerdeabklärung',
    text: 'Digitales Röntgen und Ultraschall – mit Überweisung Ihrer Ärztin oder Ihres Arztes.',
    services: ['roentgen', 'ultraschall'],
  },
];
