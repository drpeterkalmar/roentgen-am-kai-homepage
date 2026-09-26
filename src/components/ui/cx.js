// Mini-Helfer zum Zusammensetzen von Klassennamen (ohne zusätzliche Abhängigkeit).
export const cx = (...parts) => parts.flat().filter(Boolean).join(' ');
