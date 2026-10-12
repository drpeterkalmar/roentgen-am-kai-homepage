// Benötigte Fotos (noch nicht freigegeben) – zentrale Beschreibung für Platzhalter und Fotobriefing.
// Kein Bild darf Tomosynthese/3D-Mammographie oder ein nicht vorhandenes Gerät zeigen oder nahelegen.
export const IMAGE_BRIEFS = {
  mammoDevice: {
    id: 'B001',
    title: 'Mammographiegerät der Praxis',
    motif: 'Das reale Mammographiegerät der Praxis im Untersuchungsraum, ohne Patientin; ruhiges, helles Licht. Kein Fremd- oder Herstellerbild.',
    position: 'Mammographie-Seite, Hero (rechts bzw. unter dem Text am Handy); Startseite, Karte „Mammographie & Brustgesundheit“',
    ratio: '4:3',
    minSize: '2400 × 1800 px',
    alt: 'Mammographiegerät im Untersuchungsraum von Röntgen am Kai',
    // 11.10.2026: übergangsweise KI-generiertes Bild eingebaut (assets-src/images/mammographie-geraet.png,
    // 976 × 732, rechte Wandkante abgeschnitten) – sichtbar gekennzeichnet, Alt-Text siehe aiAlt.
    // Wird es durch ein echtes Foto ersetzt: Vorlage tauschen, npm run images, Kennzeichnung (ai) entfernen.
    aiAlt: 'KI-generierte Darstellung eines Mammographiegeräts in einem hellen Untersuchungsraum',
  },
  care: {
    id: 'B003',
    title: 'Erklärung vor der Mammographie',
    motif: 'Freundliche Betreuungssituation: Radiologietechnologin erklärt einer bekleideten Patientin den Ablauf (Gespräch, keine Untersuchungsszene, keine erkennbaren Gesichter ohne Einwilligung).',
    position: 'Mammographie-Seite, Abschnitt „Ablauf“',
    ratio: '3:2',
    minSize: '1800 × 1200 px',
    alt: 'Mitarbeiterin von Röntgen am Kai erklärt einer Patientin den Ablauf der Mammographie',
  },
  practice: {
    id: 'B004',
    title: 'Empfang der Ordination',
    motif: 'Reale Praxisaufnahme: Empfang bzw. Wartebereich von Röntgen am Kai, hell und aufgeräumt, ohne erkennbare Patientinnen.',
    position: 'Mammographie-Seite, Abschnitt „Praxis und Kontakt“',
    ratio: '16:9',
    minSize: '1920 × 1080 px',
    alt: 'Empfang der Ordination Röntgen am Kai in Graz',
  },
  room: {
    id: 'B002',
    title: 'Mammographie-Untersuchungsraum',
    motif: 'Untersuchungsraum der Mammographie als Raumaufnahme (Gerät im Hintergrund, Umkleidebereich/Sichtschutz sichtbar), ohne Personen.',
    position: 'Mammographie-Seite, Abschnitt „Was ist eine Mammographie?“',
    ratio: '3:2',
    minSize: '1800 × 1200 px',
    alt: 'Mammographie-Untersuchungsraum von Röntgen am Kai',
  },
  ogMammo: {
    id: 'B001',
    title: 'Mammographiegerät der Praxis (Zuschnitt Social Media)',
    motif: 'Social-Media-Vorschaubild für die Mammographie-Seite (z. B. reales Mammographiegerät oder Praxis), Text frei.',
    position: 'og:image der Seite /mammographie-graz (derzeit allgemeines Praxisbild als Ersatz)',
    ratio: '1,91:1',
    minSize: '1200 × 630 px (JPG)',
    alt: 'Mammographie bei Röntgen am Kai in Graz',
  },
  // ── DEXA-Knochendichtemessung ──
  dexaDevice: {
    id: 'B005',
    title: 'DEXA-Messplatz',
    motif: 'Das reale DEXA-Gerät der Praxis (GE Lunar) im Untersuchungsraum, ohne Person. Das bisherige Foto „knochendichte_v3“ zeigt ein GE-Lunar-Gerät – Praxis bitte bestätigen, dass es das eigene Gerät ist.',
    position: 'Knochendichte-Seite, Hero; Startseite, Karte „Knochendichtemessung mit DEXA“',
    ratio: '4:3',
    minSize: '2400 × 1800 px',
    alt: 'DEXA-Gerät zur Knochendichtemessung bei Röntgen am Kai in Graz',
  },
  dexaRoom: {
    id: 'B006',
    title: 'DEXA-Untersuchungsraum',
    motif: 'DEXA-Untersuchungsraum als Raumaufnahme: Messliege mit Messarm, Ablage/Umkleidemöglichkeit, helles Licht, ohne Personen.',
    position: 'Knochendichte-Seite, Abschnitt „Warum Knochendichtemessung mit DEXA?“',
    ratio: '3:2',
    minSize: '1800 × 1200 px',
    alt: 'Untersuchungsraum für die Knochendichtemessung bei Röntgen am Kai',
  },
  dexaExam: {
    id: 'B007',
    title: 'Knochendichtemessung',
    motif: 'Untersuchungssituation: bekleidete Person liegt entspannt auf dem Rücken auf der DEXA-Liege, Radiologietechnologin daneben erklärt; keine erkennbaren Gesichter ohne Einwilligung.',
    position: 'Knochendichte-Seite, Abschnitt „Ablauf“',
    ratio: '3:2',
    minSize: '1800 × 1200 px',
    alt: 'Patientin liegt während der DEXA-Knochendichtemessung auf der Untersuchungsliege',
  },
  // ── Körperanalyse (DEXA-Ganzkörpermessung) ──
  bodyHero: {
    id: 'B008',
    title: 'Körperanalyse: Ganzkörpermessung',
    motif: 'Reale Praxisaufnahme: DEXA-Messplatz von Röntgen am Kai (Übergangslösung: Foto „knochendichte_v3“ – GE-Lunar-Gerät ohne Person, identisch mit Knochendichte-Hero; „service_densitometry“ zeigt v. a. Tür und Schreibtisch und ist als Hero ungeeignet). Wunschmotiv: bekleidete Person liegt ruhig auf dem Rücken zur Ganzkörpermessung, Radiologietechnologin daneben; kein Fitnessmodel, keine Vorher-nachher-Darstellung.',
    position: 'Körperanalyse-Seite, Hero; Startseite, Karte „Körperanalyse“',
    ratio: '4:3',
    minSize: '2000 × 1500 px',
    alt: 'DEXA-Messplatz für die Körperanalyse bei Röntgen am Kai in Graz',
  },
  bodyExam: {
    id: 'B009',
    title: 'Körperanalyse: Lagerung',
    motif: 'Ganzkörpermessung: bekleidete Person (Alltagskleidung ohne Metall, kein Fitnessmodel) liegt ruhig auf dem Rücken auf der DEXA-Liege, Messarm über dem Körper, Radiologietechnologin daneben; keine erkennbaren Gesichter ohne Einwilligung.',
    position: 'Körperanalyse-Seite, Abschnitt „So läuft Ihre Körperanalyse ab“',
    ratio: '3:2',
    minSize: '1800 × 1200 px',
    alt: 'Person liegt während der Körperanalyse mit DEXA ruhig auf dem Untersuchungstisch',
  },
  // Nicht mehr benötigt (Befund-Slider zeigt anonymisierte echte Berichte) – ohne Nummer, nicht im Fotobriefing.
  bodyReport: {
    motif: 'Beispielhafter, anonymisierter Messbericht der Körperanalyse (Körperfett, magere Masse, regionale Verteilung) – echter Bericht der Praxissoftware, ohne Patientendaten.',
    position: 'Körperanalyse-Seite, Abschnitt „Was zeigt eine medizinische Körperanalyse?“',
    ratio: '4:3',
    minSize: '1200 × 900 px',
    alt: 'Anonymisierter Beispielbericht einer Körperanalyse mit DEXA',
  },
  ogDexa: {
    id: 'B005',
    title: 'DEXA-Messplatz (Zuschnitt Social Media)',
    motif: 'Social-Media-Vorschaubild für die Knochendichte-Seite (reales DEXA-Gerät der Praxis), Text frei.',
    position: 'og:image der Seite /knochendichtemessung-graz (derzeit allgemeines Praxisbild als Ersatz)',
    ratio: '1,91:1',
    minSize: '1200 × 630 px (JPG)',
    alt: 'Knochendichtemessung mit DEXA bei Röntgen am Kai in Graz',
  },
  // ── Gesundheitsziele (27.09.2026) – ruhige, glaubwürdige Motive; kein Fitnessmodel, kein Vorher-nachher ──
  goalWeight: {
    id: 'B010',
    title: 'Gespräch vor der Körperanalyse',
    motif: 'Ruhiges Gespräch vor der DEXA-Körperanalyse: Radiologietechnologin und bekleidete erwachsene Person (normale Statur, Alltagskleidung) sitzen am Messplatz; keine Spritzen, Medikamente, Waagen oder Maßbänder, kein Vorher-nachher, keine erkennbaren Gesichter ohne Einwilligung.',
    position: 'Gesundheitsziele: Karte und Seite „Gesund abnehmen“; Ratgeber: Artikel „Abnehmspritze und Muskelverlust“ (Titelbild und Übersichtskarte)',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Körperanalyse bei Röntgen am Kai als Ausgangsmessung vor einer Gewichtsabnahme',
  },
  goalFitness: {
    id: 'B011',
    title: 'Messung nach dem Training',
    motif: 'Sportlich gekleidete, erwachsene Person (kein Fitnessmodel) liegt zur Ganzkörpermessung ruhig auf der DEXA-Liege, Radiologietechnologin daneben; natürliche Praxissituation.',
    position: 'Gesundheitsziele: Karte und Seite „Fitness und Muskelaufbau“',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Körperanalyse mit DEXA zur Verlaufskontrolle beim Training',
  },
  goalSarcopenia: {
    id: 'B012',
    title: 'Gespräch vor der Muskelmessung',
    motif: 'Ältere Person (bekleidet, würdevoll dargestellt) im ruhigen Gespräch mit einer Radiologietechnologin vor der Messung; keine gebrechliche Darstellung, keine erkennbaren Gesichter ohne Einwilligung.',
    position: 'Gesundheitsziele: Karte und Seite „Muskelverlust und Sarkopenie“',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Ältere Patientin vor der Messung der Muskelmasse bei Röntgen am Kai',
  },
  ratgeberKi: {
    id: 'B013',
    title: 'Befundarbeitsplatz',
    motif: 'Befundarbeitsplatz der Praxis mit Röntgenbild am Monitor (ohne Patientendaten, ohne lesbare Namen); kein Stock- oder KI-generiertes Bild.',
    position: 'Ratgeber: Artikel „KI-Unterstützung in unserer Praxis“ (Titelbild und Übersichtskarte)',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Befundarbeitsplatz mit Röntgenbild bei Röntgen am Kai',
  },
  // ── Weitere Untersuchungen (Medienkonzept 12.10.2026) ──
  xrayRoom: {
    id: 'B014',
    title: 'Röntgenraum',
    motif: 'Röntgenraum der Praxis mit Rasterwand bzw. Aufnahmetisch und Röhre, aufgeräumt, ohne Patientinnen und Patienten.',
    position: 'Röntgen-Seite, Hero',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Röntgenraum von Röntgen am Kai in Graz',
  },
  ultrasoundRoom: {
    id: 'B015',
    title: 'Ultraschallplatz',
    motif: 'Ultraschallgerät der Praxis mit Untersuchungsliege, abgedunkelter Raum, ohne Personen.',
    position: 'Ultraschall-Seite, Hero',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Ultraschallplatz von Röntgen am Kai in Graz',
  },
  fluoroRoom: {
    id: 'B016',
    title: 'Durchleuchtungsraum',
    motif: 'Durchleuchtungsanlage der Praxis für Kontrastmittel- und Schluckuntersuchungen, aufgeräumt, ohne Personen.',
    position: 'Spezialröntgen-Seite, Hero',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Durchleuchtungsraum für Spezialröntgen bei Röntgen am Kai',
  },
  dentalDevice: {
    id: 'B017',
    title: 'Zahnröntgen und DVT',
    motif: 'Panorama- bzw. DVT-Gerät der Praxis mit Kinnstütze, frontal-schräg, ohne Personen.',
    position: 'Zahnröntgen/DVT-Seite, Hero',
    ratio: '4:3',
    minSize: '1600 × 1200 px',
    alt: 'Gerät für Zahnröntgen und 3D-DVT bei Röntgen am Kai',
  },
  // ── Kontakt ──
  team: {
    id: 'B018',
    title: 'Praxisteam',
    motif: 'Gruppenaufnahme des Praxisteams (Ärzte, Radiologietechnologinnen, Empfang) im Gang oder Wartebereich, natürlich; alle mit Einwilligung.',
    position: 'Kontakt-Seite, Abschnitt „Unsere Praxis“',
    ratio: '3:2',
    minSize: '2400 × 1600 px',
    alt: 'Das Team von Röntgen am Kai',
  },
  access: {
    id: 'B019',
    title: 'Zugang zur Praxis',
    motif: 'Weg vom Hauseingang zur Praxistür mit Beschilderung (Lift nur, falls vorhanden), ohne Personen.',
    position: 'Kontakt-Seite, Abschnitt „Anfahrt“',
    ratio: '3:2',
    minSize: '1800 × 1200 px',
    alt: 'Zugang zur Ordination Röntgen am Kai',
  },
};

// Gleiche Aufnahme, gleiche Nummer: der Ratgeber-Artikel nutzt das Motiv B010.
IMAGE_BRIEFS.ratgeberAbnehmspritze = IMAGE_BRIEFS.goalWeight;

// „Querformat 4:3“ usw. – für Platzhalter und Fotobriefing
export const formatLabel = (brief) => {
  const [w, h] = brief.ratio.split(':').map((x) => parseFloat(x.replace(',', '.')));
  const kind = w > h ? 'Querformat' : w < h ? 'Hochformat' : 'Quadrat';
  return `${kind} ${brief.ratio}`;
};
