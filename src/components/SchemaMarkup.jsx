import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { schemasForPath } from '../data/schema';

// Strukturierte Daten je Seite aus src/data/schema.js. Das statische HTML enthält dieselben Schemata bereits im
// <head> (scripts/postbuild.mjs, Attribut data-schema). Beim ersten Rendern und bei jedem Seitenwechsel werden
// alle diese Skripte ersetzt – nie doppelt. Das Person-Schema der Teamseiten steht in der Seite selbst.
const SchemaMarkup = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.head.querySelectorAll('script[type="application/ld+json"][data-schema]').forEach((el) => el.remove());
    const scripts = schemasForPath(pathname).map((schema) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.dataset.schema = '';
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });
    return () => scripts.forEach((el) => el.remove());
  }, [pathname]);

  return null;
};

export default SchemaMarkup;
