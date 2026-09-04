import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { faqData } from '../data/faqData';

const SchemaMarkup = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. MedicalBusiness Schema (Base)
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Röntgen am Kai",
      "image": "https://roentgen-am-kai.at/assets/images/hero-home-2025.avif",
      "@id": "https://roentgen-am-kai.at",
      "url": "https://roentgen-am-kai.at",
      "telephone": "+433168409050",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Körösistraße 9",
        "addressLocality": "Graz",
        "postalCode": "8010",
        "addressCountry": "AT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 47.0788,
        "longitude": 15.4326
      },
      "hasMap": "https://www.google.com/maps/@47.0788842,15.4326856,226m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "08:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Friday",
          "opens": "08:00",
          "closes": "13:00"
        }
      ],
      "medicalSpecialty": ["Radiology", "DiagnosticImaging"],
      "founder": [
        { "@type": "Person", "name": "Priv. Doz. Dr. Peter Kalmar" },
        { "@type": "Person", "name": "Priv. Doz. Dr. Georg Riegler" }
      ],
      "memberOf": [
        { "@type": "Organization", "name": "ÖGIR" },
        { "@type": "Organization", "name": "ÖRG" }
      ],
      "knowsAbout": ["Mammographie", "Knochendichtemessung", "Ultraschall", "DEXA", "Röntgendiagnostik", "DVT", "Zahnröntgen", "Core Scan", "Körperfettanalyse", "Viszeralfettmessung", "Brustkrebs-Screening", "Osteoporose-Vorsorge", "FRAX-Score", "Manitoba-Klassifikation"],
      "isAcceptingNewPatients": true,
      "healthcareReportingData": "Alle Kassen: BVAEB, SVS, KFA | Wahlarzt für ÖGK"
    };

    // 2. FAQ Schema - zentrale Quelle: src/data/faqData.js
    // Eine Quelle fuer sichtbaren FAQ-Block UND JSON-LD (kein Drift mehr moeglich).
    const PATH_TO_FAQ = {
      '/unser-angebot/knochendichte': 'knochendichte',
      '/unser-angebot/mammographie': 'mammographie',
      '/unser-angebot/koerperfettmessung': 'koerperfett',
      '/unser-angebot/roentgen': 'roentgen',
      '/unser-angebot/ultraschall': 'ultraschall',
      '/unser-angebot/phlebographie': 'phlebographie',
      '/unser-angebot/dvt': 'dvt'
    };
    const faqKey = PATH_TO_FAQ[location.pathname];
    const faqItems = faqKey ? faqData[faqKey] : null;
    const faqSchema = faqItems ? {
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

    // Inject Scripts
    const scripts = [];
    
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
