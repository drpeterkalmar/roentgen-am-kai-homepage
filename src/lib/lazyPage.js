import { createElement, lazy, useState } from 'react';

// Seiten-Code erst bei Bedarf laden (React.lazy) – mit preload(): Ist der Code schon da (main.jsx lädt ihn vor
// der Hydration einer vorgerenderten Seite), rendert die Seite sofort, statt kurz zu „suspendieren“.
// Welche Variante (geladen oder lazy) gilt, bleibt je Einhängen fest – ein Wechsel würde die Seite beim
// nächsten Rendern (z. B. Dunkelmodus umschalten) neu einhängen und ihren Zustand verlieren.
export const lazyPage = (load) => {
  let Loaded = null;
  const remember = (m) => {
    Loaded = m.default;
    return m;
  };
  const Lazy = lazy(() => load().then(remember));
  const Page = (props) => {
    const [Component] = useState(() => Loaded || Lazy);
    return createElement(Component, props);
  };
  Page.preload = () => load().then(remember);
  return Page;
};
