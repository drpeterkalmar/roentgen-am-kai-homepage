// Strukturierte Daten (JSON-LD) je Route – DOM-frei, damit dieselben Schemata im statischen HTML stehen
// (scripts/postbuild.mjs schreibt sie in den <head>) und im Browser bei Seitenwechseln (SchemaMarkup.jsx).
// Quellen: Praxis-/Firmendaten (practice.js, company.js), FAQ (faqData.js über routes.js: faq),
// Routentabelle (Brotkrumen, MedicalWebPage, Service), Ratgeber-Artikel (ratgeber.js).
// Wird auch von Node importiert (postbuild, Tests) → nur .js-Importe, kein JSX, kein import.meta.
import { faqData, faqSchemaItems } from './faqData.js';
import { SITE_URL, findRoute, fullTitle } from './routes.js';
import { articleBySlug, categoryById, PUBLISHER_NAME } from './ratgeber.js';
import { COMPANY_NAME, FN, UID } from './company.js';
import { PHONE_E164, EMAIL, ADDRESS, OPENING_HOURS } from './practice.js';

// Reihenfolge wie bisher im Browser: Seiten-Schemas, dann MedicalBusiness, dann FAQPage
export const schemasFor = (route) => {
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

  // 2. FAQ Schema - zentrale Quelle: src/data/faqData.js; welches Set zur Seite gehört, steht in der
  // Routentabelle (routes.js: faq) – dieselbe Angabe nutzt die Seite für die sichtbare FAQ (useRouteFaq).
  const faqKey = route?.faq;
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
  // Ratgeber-Artikel: Article-Markup (nur veröffentlichte Artikel; Platzhalter-Artikel haben route.article = null)
  const article = route?.article ? articleBySlug[route.article.slug] : null;
  if (article) {
    extraSchemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${pageUrl}#artikel`,
      "mainEntityOfPage": pageUrl,
      "headline": article.title,
      "description": article.description,
      "inLanguage": "de-AT",
      "articleSection": categoryById[article.category].name,
      "datePublished": article.datePublished,
      "dateModified": article.dateModified,
      // Autor: bestätigte Person, sonst die Praxis (keine Namen erfinden)
      "author": article.author ? { "@type": "Person", "name": article.author } : { "@id": `${SITE_URL}/#praxis`, "@type": "MedicalBusiness", "name": PUBLISHER_NAME },
      "publisher": { "@id": `${SITE_URL}/#praxis` },
      "image": article.photo ? `${SITE_URL}/assets/images/${article.photo.name}.avif` : `${SITE_URL}/assets/images/og-image.jpg`
    });
    // FAQ-Markup nur, wenn der Artikel sichtbare FAQ hat
    if (article.faq?.length) {
      extraSchemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faq.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } }))
      });
    }
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

  return [...extraSchemas, baseSchema, ...(faqSchema ? [faqSchema] : [])];
};

// Für den Browser: Pfad → Schemata (unbekannte Adresse: nur die Praxis)
export const schemasForPath = (pathname) => schemasFor(findRoute(pathname));

// JSON für ein <script type="application/ld+json"> im HTML: „<“ maskieren (kein vorzeitiges </script>)
export const jsonLd = (schema) => JSON.stringify(schema).replace(/</g, '\\u003c');
