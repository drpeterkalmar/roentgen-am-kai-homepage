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
    const route = findRoute(pathname) || home;
    const title = fullTitle(route);
    const url = SITE_URL + (route.path === '/' ? '/' : route.path);

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', route.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', route.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);

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
