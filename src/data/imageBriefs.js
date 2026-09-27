// Benötigte Fotos (noch nicht freigegeben) – zentrale Beschreibung für Platzhalter und Fotobriefing.
// Kein Bild darf Tomosynthese/3D-Mammographie oder ein nicht vorhandenes Gerät zeigen oder nahelegen.
export const IMAGE_BRIEFS = {
  mammoDevice: {
    motif: 'Das reale Mammographiegerät der Praxis im Untersuchungsraum, ohne Patientin; ruhiges, helles Licht. Kein Fremd- oder Herstellerbild.',
    position: 'Mammographie-Seite, Hero (rechts bzw. unter dem Text am Handy); Startseite, Karte „Mammographie & Brustgesundheit“',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Mammographiegerät im Untersuchungsraum von Röntgen am Kai',
  },
  care: {
    motif: 'Freundliche Betreuungssituation: Radiologietechnologin erklärt einer bekleideten Patientin den Ablauf (Gespräch, keine Untersuchungsszene, keine erkennbaren Gesichter ohne Einwilligung).',
    position: 'Mammographie-Seite, Abschnitt „Ablauf“',
    ratio: '3:2',
    minSize: '1500 × 1000 px',
    alt: 'Mitarbeiterin von Röntgen am Kai erklärt einer Patientin den Ablauf der Mammographie',
  },
  practice: {
    motif: 'Reale Praxisaufnahme: Empfang bzw. Wartebereich von Röntgen am Kai, hell und aufgeräumt, ohne erkennbare Patientinnen.',
    position: 'Mammographie-Seite, Abschnitt „Praxis und Kontakt“',
    ratio: '16:9',
    minSize: '1920 × 1080 px',
    alt: 'Empfang der Ordination Röntgen am Kai in Graz',
  },
  room: {
    motif: 'Untersuchungsraum der Mammographie als Raumaufnahme (Gerät im Hintergrund, Umkleidebereich/Sichtschutz sichtbar), ohne Personen.',
    position: 'Mammographie-Seite, Abschnitt „Was ist eine Mammographie?“',
    ratio: '3:2',
    minSize: '1500 × 1000 px',
    alt: 'Mammographie-Untersuchungsraum von Röntgen am Kai',
  },
  ogMammo: {
    motif: 'Social-Media-Vorschaubild für die Mammographie-Seite (z. B. reales Mammographiegerät oder Praxis), Text frei.',
    position: 'og:image der Seite /mammographie-graz (derzeit allgemeines Praxisbild als Ersatz)',
    ratio: '1,91:1',
    minSize: '1200 × 630 px (JPG)',
    alt: 'Mammographie bei Röntgen am Kai in Graz',
  },
  // ── DEXA-Knochendichtemessung ──
  dexaDevice: {
    motif: 'Das reale DEXA-Gerät der Praxis (GE Lunar) im Untersuchungsraum, ohne Person. Das bisherige Foto „knochendichte_v3“ zeigt ein GE-Lunar-Gerät – Praxis bitte bestätigen, dass es das eigene Gerät ist.',
    position: 'Knochendichte-Seite, Hero; Startseite, Karte „Knochendichtemessung mit DEXA“',
    ratio: '3:2',
    minSize: '1600 × 1067 px',
    alt: 'DEXA-Gerät zur Knochendichtemessung bei Röntgen am Kai in Graz',
  },
  dexaRoom: {
    motif: 'DEXA-Untersuchungsraum als Raumaufnahme: Messliege mit Messarm, Ablage/Umkleidemöglichkeit, helles Licht, ohne Personen.',
    position: 'Knochendichte-Seite, Abschnitt „Warum Knochendichtemessung mit DEXA?“',
    ratio: '3:2',
    minSize: '1500 × 1000 px',
    alt: 'Untersuchungsraum für die Knochendichtemessung bei Röntgen am Kai',
  },
  dexaExam: {
    motif: 'Untersuchungssituation: bekleidete Person liegt entspannt auf dem Rücken auf der DEXA-Liege, Radiologietechnologin daneben erklärt; keine erkennbaren Gesichter ohne Einwilligung.',
    position: 'Knochendichte-Seite, Abschnitt „Ablauf“',
    ratio: '3:2',
    minSize: '1500 × 1000 px',
    alt: 'Patientin liegt während der DEXA-Knochendichtemessung auf der Untersuchungsliege',
  },
  // ── Körperanalyse (DEXA-Ganzkörpermessung) ──
  bodyHero: {
    motif: 'Reale Praxisaufnahme: DEXA-Messplatz von Röntgen am Kai (Übergangslösung: Foto „knochendichte_v3“ – GE-Lunar-Gerät ohne Person, identisch mit Knochendichte-Hero; „service_densitometry“ zeigt v. a. Tür und Schreibtisch und ist als Hero ungeeignet). Wunschmotiv: bekleidete Person liegt ruhig auf dem Rücken zur Ganzkörpermessung, Radiologietechnologin daneben; kein Fitnessmodel, keine Vorher-nachher-Darstellung.',
    position: 'Körperanalyse-Seite, Hero; Startseite, Karte „Körperanalyse“',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'DEXA-Messplatz für die Körperanalyse bei Röntgen am Kai in Graz',
  },
  bodyExam: {
    motif: 'Ganzkörpermessung: bekleidete Person (Alltagskleidung ohne Metall, kein Fitnessmodel) liegt ruhig auf dem Rücken auf der DEXA-Liege, Messarm über dem Körper, Radiologietechnologin daneben; keine erkennbaren Gesichter ohne Einwilligung.',
    position: 'Körperanalyse-Seite, Abschnitt „So läuft Ihre Körperanalyse ab“',
    ratio: '3:2',
    minSize: '1500 × 1000 px',
    alt: 'Person liegt während der Körperanalyse mit DEXA ruhig auf dem Untersuchungstisch',
  },
  bodyReport: {
    motif: 'Beispielhafter, anonymisierter Messbericht der Körperanalyse (Körperfett, magere Masse, regionale Verteilung) – echter Bericht der Praxissoftware, ohne Patientendaten.',
    position: 'Körperanalyse-Seite, Abschnitt „Was zeigt eine medizinische Körperanalyse?“',
    ratio: '4:3',
    minSize: '1200 × 900 px',
    alt: 'Anonymisierter Beispielbericht einer Körperanalyse mit DEXA',
  },
  ogDexa: {
    motif: 'Social-Media-Vorschaubild für die Knochendichte-Seite (reales DEXA-Gerät der Praxis), Text frei.',
    position: 'og:image der Seite /knochendichtemessung-graz (derzeit allgemeines Praxisbild als Ersatz)',
    ratio: '1,91:1',
    minSize: '1200 × 630 px (JPG)',
    alt: 'Knochendichtemessung mit DEXA bei Röntgen am Kai in Graz',
  },
  // ── Gesundheitsziele (27.09.2026) – ruhige, glaubwürdige Motive; kein Fitnessmodel, kein Vorher-nachher ──
  goalWeight: {
    motif: 'Ruhige Beratungs- oder Messsituation: bekleidete erwachsene Person (normale Statur, Alltagskleidung) auf der DEXA-Liege oder im Gespräch am Empfang; keine Waage-Nahaufnahme, kein Maßband, kein Vorher-nachher.',
    position: 'Gesundheitsziele: Karte und Seite „Gesund abnehmen“',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Körperanalyse bei Röntgen am Kai als Ausgangsmessung vor einer Gewichtsabnahme',
  },
  goalFitness: {
    motif: 'Sportlich gekleidete, erwachsene Person (kein Fitnessmodel) liegt zur Ganzkörpermessung ruhig auf der DEXA-Liege, Radiologietechnologin daneben; natürliche Praxissituation.',
    position: 'Gesundheitsziele: Karte und Seite „Fitness und Muskelaufbau“',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Körperanalyse mit DEXA zur Verlaufskontrolle beim Training',
  },
  goalSarcopenia: {
    motif: 'Ältere Person (bekleidet, würdevoll dargestellt) im ruhigen Gespräch mit einer Radiologietechnologin vor der Messung; keine gebrechliche Darstellung, keine erkennbaren Gesichter ohne Einwilligung.',
    position: 'Gesundheitsziele: Karte und Seite „Muskelverlust und Sarkopenie“',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Ältere Patientin vor der Messung der Muskelmasse bei Röntgen am Kai',
  },
};
