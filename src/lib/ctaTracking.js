// CTA-Messung ohne Drittanbieter: Klicks auf Termin-, Telefon- und Themen-Schaltflächen werden als
// Browser-Ereignis „rak:cta“ gemeldet und – nur falls die Praxis später ein datenschutzkonformes
// Statistik-Werkzeug einbindet – zusätzlich in window.dataLayer geschrieben.
// Es werden KEINE Daten an Dritte gesendet, nichts gespeichert, keine Cookies (Datenschutzerklärung unverändert).
//   data-cta="booking"  → Buchungsbeginn (Absprung ins MiraNext-Portal)
//   data-cta="phone"    → Anruf
//   data-cta="goal"     → Weg zu einer Gesundheitsziel-Seite
//   data-cta-service    → Untersuchung bzw. Ziel (z. B. koerperanalyse, knochendichte, mammographie)
let installed = false;

export const installCtaTracking = () => {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  document.addEventListener(
    'click',
    (e) => {
      const el = e.target instanceof Element ? e.target.closest('[data-cta]') : null;
      if (!el) return;
      const detail = {
        event: el.dataset.cta === 'booking' ? 'booking_start' : 'cta_click',
        cta: el.dataset.cta,
        service: el.dataset.ctaService || null,
        page: window.location.pathname,
        label: (el.textContent || '').trim().slice(0, 80),
      };
      window.dispatchEvent(new CustomEvent('rak:cta', { detail }));
      if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
    },
    { capture: true }
  );
};
