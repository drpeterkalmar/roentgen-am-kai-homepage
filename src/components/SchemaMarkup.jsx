import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { faqData, faqSchemaItems } from '../data/faqData';
import { SITE_URL, findRoute, fullTitle } from '../data/routes';
import { COMPANY_NAME, FN, UID } from '../data/company';
import { PHONE_E164, EMAIL, ADDRESS, OPENING_HOURS } from '../data/practice';

const SchemaMarkup = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. MedicalBusiness Schema (Base)
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Röntgen am Kai",
      "image": `${SITE_URL}/assets/images/og-image.jpg`,
      "@id": `${SITE_URL}/#praxis`,
      "url": `${SITE_URL}/`,
      "legalName": COMPANY_NAME,
      "vatID": UID,
      "identifier": { "@type": "PropertyValue", "propertyID": "Firmenbuchnummer", "value": `FN ${FN}` },
      "telephone": PHONE_E164,
      "email": EMAIL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": ADDRESS.street,
        "addressLocality": ADDRESS.city,
        "postalCode": ADDRESS.zip,
        "addressCountry": "AT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 47.0788,
        "longitude": 15.4326
      },
      "hasMap": "https://www.google.com/maps/@47.0788842,15.4326856,226m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D",
      "openingHoursSpecification": OPENING_HOURS.map((h) => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": h.schema,
        "opens": h.opens,
        "closes": h.closes
      })),
      "medicalSpecialty": "Radiography",
      "founder": [
        { "@type": "Person", "name": "Priv. Doz. Dr. Peter Kalmar" },
        { "@type": "Person", "name": "Priv. Doz. Dr. Georg Riegler" }
      ],
      "memberOf": [
        { "@type": "Organization", "name": "ÖGIR" },
        { "@type": "Organization", "name": "ÖRG" }
      ],
      "knowsAbout": ["Mammographie", "Brustkrebs-Früherkennung", "Knochendichtemessung", "DEXA", "DEXA-Körperanalyse", "Röntgendiagnostik", "Ultraschall", "Durchleuchtung", "Phlebographie", "DVT", "Zahnröntgen", "Körperanalyse", "Körperzusammensetzung", "Brustkrebs-Screening", "Osteoporose-Vorsorge", "FRAX-Score", "Manitoba-Klassifikation"],
      "isAcceptingNewPatients": true
    };

    // 2. FAQ Schema - zentrale Quelle: src/data/faqData.js
    // Eine Quelle fuer sichtbaren FAQ-Block UND JSON-LD (kein Drift mehr moeglich).
    const PATH_TO_FAQ = {
      '/knochendichtemessung-graz': 'knochendichte',
      '/mammographie-graz': 'mammographie',
      '/koerperanalyse-graz': 'koerperanalyse',
      '/unser-angebot/roentgen': 'roentgen',
      '/unser-angebot/ultraschall': 'ultraschall',
      '/unser-angebot/phlebographie': 'phlebographie',
      '/unser-angebot/dvt': 'dvt',
      // Weitere Sets (lungenroentgen, mammascreening, …) liegen in faqData.js bereit.
      // Nur Routen mit SICHTBAREM FAQ eintragen – Weiterleitungsseiten nie.
    };
    const cleanPath = location.pathname.replace(/\/+$/, '') || '/';
    const faqKey = PATH_TO_FAQ[cleanPath];
    // Fragen mit offener Praxisangabe (pending) bleiben sichtbar, gehen aber nicht ins Schema.
    const faqItems = faqKey ? faqSchemaItems(faqData[faqKey]) : null;
    const faqSchema = faqItems?.length ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    } : null;

    // 3. Seiten-Schemas: BreadcrumbList (nur Routen mit `crumb` in routes.js – deckungsgleich mit den
    //    sichtbaren Brotkrumen) und MedicalWebPage für Leistungsseiten mit `medicalProcedure`.
    const route = findRoute(cleanPath);
    const pageUrl = route ? `${SITE_URL}${route.path === '/' ? '/' : route.path}` : null;
    const extraSchemas = [];
    if (route?.crumb) {
      extraSchemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Startseite", "item": `${SITE_URL}/` },
          // Zielseiten: Elternseite „Gesundheitsziele“ als zweite Ebene (wie die sichtbaren Brotkrumen)
          ...(route.parent ? [{ "@type": "ListItem", "position": 2, "name": route.parent.name, "item": `${SITE_URL}${route.parent.path}` }] : []),
          { "@type": "ListItem", "position": route.parent ? 3 : 2, "name": route.crumb, "item": pageUrl }
        ]
      });
    }
    if (route?.medicalProcedure) {
      extraSchemas.push({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": fullTitle(route),
        "description": route.description,
        "inLanguage": "de-AT",
        "about": { "@type": "MedicalProcedure", ...route.medicalProcedure },
        "publisher": { "@id": `${SITE_URL}/#praxis` }
      });
    }
    // Gesundheitsziel-Seiten: MedicalWebPage mit Thema (ohne Prüfdatum, solange die ärztliche Freigabe offen ist)
    if (route?.medicalPage) {
      extraSchemas.push({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": fullTitle(route),
        "description": route.description,
        "inLanguage": "de-AT",
        "about": route.medicalPage.about.map((name) => ({ "@type": "Thing", "name": name })),
        "isPartOf": { "@id": `${SITE_URL}${route.parent.path}` },
        "publisher": { "@id": `${SITE_URL}/#praxis` }
      });
    }
    // Leistungs-Markup (nur für Seiten mit `service` in routes.js – ohne Preis, solange keiner bestätigt ist)
    if (route?.service) {
      extraSchemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#leistung`,
        "url": pageUrl,
        ...route.service,
        "provider": { "@id": `${SITE_URL}/#praxis` },
        "areaServed": { "@type": "City", "name": "Graz" }
      });
    }

    // Inject Scripts
    const scripts = [];
    extraSchemas.forEach((schema) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.innerHTML = JSON.stringify(schema);
      document.head.appendChild(el);
      scripts.push(el);
    });
    
    // Base Script
    const baseScript = document.createElement('script');
    baseScript.type = 'application/ld+json';
    baseScript.innerHTML = JSON.stringify(baseSchema);
    document.head.appendChild(baseScript);
    scripts.push(baseScript);

    // FAQ Script
    if (faqSchema) {
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.innerHTML = JSON.stringify(faqSchema);
      document.head.appendChild(faqScript);
      scripts.push(faqScript);
    }

    // Cleanup
    return () => {
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [location.pathname]);

  return null;
};

export default SchemaMarkup;
