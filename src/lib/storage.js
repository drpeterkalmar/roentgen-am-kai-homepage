// Dunkelmodus-Einstellung im Browser-Speicher – jeder Zugriff abgesichert: Safari wirft schon beim Lesen von
// localStorage einen SecurityError, wenn „Alle Cookies blockieren“ aktiv ist (die App blieb sonst beim
// statischen Grundgerüst hängen). Gespeichert wird nur nach aktivem Umschalten (Datenschutzerklärung,
// § 165 Abs 3 TKG 2021: kein Eintrag ohne Nutzeraktion).
const KEY = 'theme';

// 'dark' | 'light' | null (nichts gespeichert oder Speicher gesperrt). Jeder andere gespeicherte Wert gilt wie bisher als hell.
export const readTheme = () => {
  try {
    const saved = globalThis.localStorage.getItem(KEY);
    if (!saved) return null;
    return saved === 'dark' ? 'dark' : 'light';
  } catch {
    return null;
  }
};

export const writeTheme = (value) => {
  try {
    globalThis.localStorage.setItem(KEY, value);
  } catch {
    /* privater Modus / Speicher gesperrt */
  }
};

// Systemeinstellung „Dunkel“ – ohne matchMedia (alte Browser, Tests) hell
export const prefersDark = () => {
  try {
    return typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};
