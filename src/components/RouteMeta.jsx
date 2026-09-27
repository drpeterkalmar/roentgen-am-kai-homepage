import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findRoute, fullTitle, routes, SITE_URL } from '../data/routes';

const home = routes[0];

const setMeta = (selector, attr, key, content) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

// Setzt Titel, Description, Canonical und OG-Tags je Route aus src/data/routes.js.
// Dieselben Werte stehen dank scripts/postbuild.mjs schon im statischen HTML
// (für Crawler/Link-Vorschauen ohne JavaScript).
const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Unbekannte Adresse: eigener Titel, noindex, kein Canonical auf die Startseite
    const route = findRoute(pathname) || { ...home, path: pathname, fullTitle: 'Seite nicht gefunden | Röntgen am Kai', description: home.description, noindex: true };
    const title = fullTitle(route);
    const url = SITE_URL + (route.path === '/' ? '/' : route.path);

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', route.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', route.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:type"]', 'property', 'og:type', route.og?.type || 'website');

    // Artikel-Datum/Rubrik (Open Graph) – bei anderen Seiten entfernen
    const og = route.og || {};
    [['article:published_time', og.publishedTime], ['article:modified_time', og.modifiedTime], ['article:section', og.section]]
      .forEach(([key, value]) => {
        const el = document.head.querySelector(`meta[property="${key}"]`);
        if (value) setMeta(`meta[property="${key}"]`, 'property', key, value);
        else if (el) el.remove();
      });

    // Noch nicht freigegebene Inhalte: noindex (sonst Tag entfernen)
    const robots = document.head.querySelector('meta[name="robots"]');
    if (route.noindex) setMeta('meta[name="robots"]', 'name', 'robots', 'noindex, follow');
    else if (robots) robots.remove();

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
};

export default RouteMeta;
