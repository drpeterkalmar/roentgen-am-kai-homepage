import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Weicher Seitenwechsel: Nach einem Klick auf einen internen Link blendet die neue Seite kurz ein
// (nur Deckkraft, 200 ms, CSS in index.css). Beim ERSTEN Laden passiert nichts – Google misst dort,
// wann der oberste Inhalt sichtbar ist (LCP). Sprungmarken (#…) innerhalb einer Seite lösen keinen Übergang aus.
// Liegt INNERHALB von <Suspense>: die neue Seite wird erst eingeblendet, wenn ihr Code geladen ist.
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  const [prev, setPrev] = useState(pathname);
  const [navigated, setNavigated] = useState(false);
  // „Wert aus vorherigem Rendern merken“ (React-Doku: setState während des Renderns erlaubt)
  if (pathname !== prev) {
    setPrev(pathname);
    setNavigated(true);
  }
  return (
    <div key={pathname} className={navigated ? 'anim-page-in' : undefined}>
      {children}
    </div>
  );
};

export default PageTransition;
