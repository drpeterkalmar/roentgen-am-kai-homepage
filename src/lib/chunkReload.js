// Nach einem Deploy gibt es die alten Seiten-Chunks nicht mehr (neuer Hash im Dateinamen). Ein offener Tab
// (oder eine bis zu 10 Minuten gecachte index.html) lädt beim Seitenwechsel dann ins Leere. Vite meldet jeden
// fehlgeschlagenen dynamischen Import als Ereignis 'vite:preloadError' → einmal neu laden; das holt die neue
// index.html mit den neuen Chunk-Namen.
// Schutz gegen eine Endlosschleife: höchstens ein automatischer Reload pro Minute (Zeitstempel in sessionStorage).
// Ist der Speicher gesperrt (Safari mit blockierten Cookies), wird nicht automatisch neu geladen – dann zeigt die
// Fehlergrenze (components/ErrorBoundary.jsx) „Neu laden“ und die Telefonnummer.
const KEY = 'rak-chunk-reload';
const MIN_INTERVAL_MS = 60_000;

export const shouldAutoReload = (storage, now = Date.now()) => {
  try {
    const last = Number(storage.getItem(KEY)) || 0;
    if (now - last < MIN_INTERVAL_MS) return false;
    storage.setItem(KEY, String(now));
    return true;
  } catch {
    return false;
  }
};

export const installChunkReload = (win = window) => {
  win.addEventListener('vite:preloadError', () => {
    let storage = null;
    try { storage = win.sessionStorage; } catch { /* gesperrt */ }
    if (storage && shouldAutoReload(storage)) win.location.reload();
  });
};
