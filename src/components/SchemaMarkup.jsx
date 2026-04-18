import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SchemaMarkup = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. MedicalBusiness Schema (Base)
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Röntgen am Kai",
      "image": "https://roentgen-am-kai.at/assets/images/hero-home-2025.webp",
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
      "knowsAbout": ["Mammographie", "Knochendichtemessung", "Ultraschall", "DEXA", "Röntgendiagnostik"],
      "isAcceptingNewPatients": true,
      "healthcareReportingData": "Alle Kassen: BVAEB, SVS, KFA | Wahlarzt für ÖGK"
    };

    // 2. FAQ Schemas
    let faqSchema = null;

    if (location.pathname === '/unser-angebot/knochendichte') {
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Was ist eine DEXA-Knochendichtemessung?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die DEXA-Methode (Dual-Energy X-ray Absorptiometry) ist der weltweite Goldstandard zur Diagnose von Osteoporose. Sie misst präzise den Mineralgehalt der Knochen bei minimaler Strahlenbelastung."
            }
          },
          {
            "@type": "Question",
            "name": "Übernimmt die Krankenkasse die Kosten für die Knochendichtemessung?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wir haben Direktverrechnungsverträge mit der BVAEB, SVS und KFA-Graz. Für ÖGK-Versicherte fungieren wir als Wahlarzt; Sie bezahlen die Untersuchung vorab und können den Anteil bei der ÖGK zur Rückerstattung einreichen."
            }
          },
          {
            "@type": "Question",
            "name": "Muss ich für die DEXA-Untersuchung nüchtern sein?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nein, für eine Knochendichtemessung oder Körperfettanalyse ist keine spezielle Vorbereitung erforderlich. Sie müssen nicht nüchtern erscheinen."
            }
          }
        ]
      };
    } else if (location.pathname === '/unser-angebot/mammographie') {
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Wann ist eine Mammographie sinnvoll?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Im Rahmen des österreichischen Brustkrebs-Früherkennungsprogramms ist eine Vorsorgemammographie alle 2 Jahre für Frauen zwischen 45 und 74 Jahren ohne Überweisung möglich. Außerhalb dieses Bereichs oder bei Beschwerden ist eine Untersuchung ab 40 Jahren mit Überweisung ratsam."
            }
          },
          {
            "@type": "Question",
            "name": "Ist die Mammographie bei Röntgen am Kai schmerzhaft?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wir verwenden den modernsten Mammomat Inspiration von Siemens. Dieses Gerät passt den Kompressionsdruck individuell an und reduziert die Strahlendosis um bis zu 50%, was die Untersuchung deutlich angenehmer macht."
            }
          },
          {
            "@type": "Question",
            "name": "Benötige ich für das Mammographie-Screening eine Überweisung?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wenn Sie in die Altersgruppe der 45- bis 74-Jährigen fallen, benötigen Sie keine Überweisung. Ihre e-Card ist für das Früherkennungsprogramm alle 2 Jahre freigeschaltet."
            }
          }
        ]
      };
    }

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
