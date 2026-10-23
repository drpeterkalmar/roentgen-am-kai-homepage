// Herkunft durchreichen (Google-Anzeigen, Peter 23.10.2026): Steht ?quelle=gads-… in der Adresse DIESER Seite, hängt
// ein Klick auf einen Link zur eigenen Online-Buchung (termin.roentgen-am-kai.at) das Kennzeichen an. Erst im Moment
// des Klicks, nichts gespeichert (kein Cookie, kein localStorage), kein Tracking-Skript – gezählt wird nur eine
// fertige Buchung am Termin-Server (online-termin, termin/quellen.py). Links zu MiraNext bleiben unverändert.
export const TERMIN_HOST = 'termin.roentgen-am-kai.at';
const MUSTER = /^[a-z0-9-]{1,40}$/;

// Gültiges Kennzeichen aus einem Suchteil (»?quelle=…«) oder ''
export const quelleAus = (search) => {
  let wert = '';
  try {
    wert = (new URLSearchParams(search || '').get('quelle') || '').trim().toLowerCase();
  } catch {
    return '';
  }
  return MUSTER.test(wert) ? wert : '';
};

// Link zur Online-Buchung mit Kennzeichen; andere Links und Links mit eigenem Kennzeichen unverändert
export const mitQuelle = (href, quelle) => {
  if (!quelle || !MUSTER.test(quelle)) return href;
  let url;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (url.hostname !== TERMIN_HOST || url.searchParams.has('quelle')) return href;
  url.searchParams.set('quelle', quelle);
  return url.toString();
};

let installed = false;

export const installQuelleDurchreichen = () => {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  const anpassen = (e) => {
    const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
    if (!link) return;
    const neu = mitQuelle(link.href, quelleAus(window.location.search));
    if (neu !== link.href) link.href = neu;
  };
  // auch Mittelklick und „In neuem Tab öffnen“ (Kontextmenü)
  for (const art of ['click', 'auxclick', 'contextmenu']) document.addEventListener(art, anpassen, { capture: true });
};
