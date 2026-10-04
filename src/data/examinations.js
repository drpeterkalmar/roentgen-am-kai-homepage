// „Weitere Untersuchungen“ – EINE Quelle für Übersicht, vier Hauptseiten, Terminlogik, Navigation und Tests.
//
// Grundsätze (Vorgaben der Praxis, 04.10.2026):
//   * Patientenbegriff „Röntgen“ – „digital“ nur als Qualitätsmerkmal, nie als Produktname.
//   * Röntgen: ohne vorherige Terminvereinbarung möglich – aber IMMER mit gültiger ärztlicher Zuweisung und e-card.
//   * Ultraschall, Spezialröntgen, Zahnröntgen/DVT: Termin erforderlich.
//   * Nur tatsächlich angebotene Leistungen veröffentlichen (confirmed: false = wird NICHT angezeigt).
//   * Quelle der Leistungen: bisherige Website (Leistungsseiten + FAQ) und Praxisangaben vom 26.09.2026.
//   * Offene Praxisangaben = null → sichtbarer redaktioneller Platzhalter.

export const EXAMS_BASE = '/weitere-untersuchungen';
export const EXAMS_CRUMB = 'Weitere Untersuchungen';

// ---------------------------------------------------------------------------
// Terminlogik
// ---------------------------------------------------------------------------
export const WALK_IN = {
  badge: 'Ohne vorherige Terminvereinbarung möglich',
  // Pflichtzusatz – steht IMMER unmittelbar beim Badge
  requirement: 'Mit gültiger ärztlicher Zuweisung und e-card',
  text: 'Kommen Sie mit gültiger ärztlicher Zuweisung und e-card während unserer Röntgenzeiten direkt vorbei. Alternativ können Sie eine Wunschzeit reservieren.',
  walkInLabel: 'Direkt vorbeikommen',
  walkInSub: 'Öffnungszeiten, Unterlagen und Anfahrt',
  reserveLabel: 'Wunschzeit reservieren',
};

export const APPOINTMENT_REQUIRED = {
  badge: 'Termin erforderlich',
  buttonLabel: 'Termin vereinbaren',
};

// Rückrufservice: nur anzeigen, wenn die Praxis ihn bestätigt (bisher nicht bestätigt → null)
export const CALLBACK = null;

// Röntgenzeiten: falls abweichend von den Öffnungszeiten (z. B. letzte Annahme) – PLATZHALTER
export const XRAY_HOURS_NOTE = null;

// Sprungziel „Direkt vorbeikommen“ (Öffnungszeiten, Unterlagen, Anfahrt)
export const WALK_IN_HREF = '/roentgen-graz#direkt-vorbeikommen';

// ---------------------------------------------------------------------------
// Die vier Hauptbereiche
// ---------------------------------------------------------------------------
export const AREAS = {
  roentgen: {
    key: 'roentgen',
    title: 'Röntgen',
    path: '/roentgen-graz',
    walkIn: true,
    onlineBooking: true, // „Wunschzeit reservieren“ über MiraNext (Praxis-Entscheidung 26.09.2026)
    short: 'Röntgen von Knochen, Gelenken, Wirbelsäule und Lunge.',
    overviewText:
      'Röntgen von Knochen, Gelenken, Wirbelsäule und Lunge. Mit gültiger ärztlicher Zuweisung und e-card können Sie während unserer Röntgenzeiten direkt vorbeikommen. Alternativ können Sie eine Wunschzeit reservieren.',
  },
  ultraschall: {
    key: 'ultraschall',
    title: 'Ultraschall',
    path: '/ultraschall-graz',
    walkIn: false,
    onlineBooking: false,
    short: 'Sonographie von Bauchorganen, Nieren, Schilddrüse, Hals, Gelenken, Weichteilen, Brust und Gefäßen – ohne Röntgenstrahlung.',
    ctaLabel: 'Ultraschalltermin vereinbaren',
    phoneHint: '„Ultraschall“ und die Körperregion, die auf Ihrer Zuweisung steht (z. B. Oberbauch oder Schilddrüse)',
  },
  spezialroentgen: {
    key: 'spezialroentgen',
    title: 'Spezialröntgen mit Kontrastmittel',
    path: '/spezialroentgen',
    walkIn: false,
    onlineBooking: false,
    short: 'Schluckröntgen, Venenröntgen, Eileiterdurchgängigkeit und Nierenröntgen – mit Kontrastmittel und bewegten Röntgenaufnahmen.',
    ctaLabel: 'Termin für Spezialröntgen vereinbaren',
    phoneHint: 'die Untersuchung, die auf Ihrer Zuweisung steht (z. B. „Phlebographie“ oder „Videoschluckakt“)',
  },
  zahn: {
    key: 'zahn',
    title: 'Zahnröntgen und 3D-DVT',
    path: '/zahnroentgen-dvt-graz',
    walkIn: false,
    onlineBooking: false,
    short: 'Panoramaröntgen, Fernröntgen, Einzelzahnröntgen und 3D-Aufnahmen von Zähnen, Kiefer, Nasennebenhöhlen, Gesichtsschädel, Kiefergelenken und kraniozervikalem Übergang.',
    ctaLabel: 'Termin für Zahnröntgen oder DVT vereinbaren',
    phoneHint: '„Zahnröntgen“ oder „DVT“ und den Aufnahmebereich laut Zuweisung (z. B. Panoramaröntgen oder DVT Unterkiefer)',
  },
};

export const AREA_ORDER = ['roentgen', 'ultraschall', 'spezialroentgen', 'zahn'];
export const areaByPath = (pathname) => {
  const clean = pathname.replace(/\/+$/, '');
  return Object.values(AREAS).find((a) => a.path === clean) || null;
};

// ---------------------------------------------------------------------------
// Röntgen: Gruppen (Anker auf /roentgen-graz)
// Nur Regionen, die die Praxis anbietet (Skelett- und Lungenröntgen laut bisheriger Website;
// Regionen laut Körpernavigator-Vorgabe der Praxis).
// ---------------------------------------------------------------------------
export const XRAY_GROUPS = [
  {
    id: 'lunge-brustkorb',
    title: 'Lunge und Brustkorb',
    items: ['Lungenröntgen (Thorax), üblicherweise in zwei Ebenen', 'Brustkorb und Rippen'],
    note: 'Für eine Narkosetauglichkeitsprüfung vor einer Operation sollte das Lungenröntgen nicht älter als 14 Tage sein.',
  },
  {
    id: 'wirbelsaeule',
    title: 'Wirbelsäule',
    items: ['Halswirbelsäule (HWS)', 'Brustwirbelsäule (BWS)', 'Lendenwirbelsäule (LWS)', 'Wirbelsäulenganzaufnahmen', 'Funktionsaufnahmen in Beugung und Streckung'],
    note: 'Die Wirbelsäule wird im Stehen geröntgt – so lassen sich Haltung und Fehlstellungen besser beurteilen.',
  },
  { id: 'becken-huefte', title: 'Becken und Hüfte', items: ['Beckenübersicht', 'Hüftgelenk'] },
  { id: 'schulter-arm', title: 'Schulter und Arm', items: ['Schulter und Schlüsselbein', 'Oberarm', 'Ellenbogen und Unterarm'] },
  { id: 'hand-handgelenk', title: 'Hand und Handgelenk', items: ['Handgelenk', 'Hand', 'Finger'] },
  { id: 'knie-unterschenkel', title: 'Knie und Unterschenkel', items: ['Knie', 'Unterschenkel'] },
  { id: 'sprunggelenk-fuss', title: 'Sprunggelenk und Fuß', items: ['Sprunggelenk', 'Fersenbein', 'Fuß und Zehen'] },
  {
    id: 'weitere-regionen',
    title: 'Weitere angebotene Körperregionen',
    items: ['Oberschenkel'],
    placeholder: 'Weitere angebotene Körperregionen – von der Praxis zu bestätigen (nur tatsächlich angebotene Aufnahmen ergänzen)',
  },
];

// ---------------------------------------------------------------------------
// Körpernavigator (Röntgen) – 15 Regionen. view: Vorder- oder Rückansicht im Skelett.
// questions = typische Fragestellungen (neutral, Orientierung – medizinische Freigabe ausstehend).
// ---------------------------------------------------------------------------
export const BODY_REGIONS = [
  { id: 'hws', name: 'Halswirbelsäule', view: 'back', group: 'wirbelsaeule', questions: ['Nackenschmerzen', 'Beschwerden nach Sturz oder Unfall', 'Fehlhaltung oder Verlaufskontrolle'] },
  { id: 'bws', name: 'Brustwirbelsäule', view: 'back', group: 'wirbelsaeule', questions: ['Rückenschmerzen im Brustbereich', 'Fehlhaltung, etwa Rundrücken oder Skoliose', 'Beschwerden nach Sturz oder Unfall'] },
  { id: 'lws', name: 'Lendenwirbelsäule', view: 'back', group: 'wirbelsaeule', questions: ['Kreuzschmerzen', 'Abnützung oder Fehlstellung', 'Beschwerden nach Sturz oder Unfall'] },
  { id: 'schulter', name: 'Schulter und Schlüsselbein', view: 'front', group: 'schulter-arm', questions: ['Schulterschmerzen', 'Sturz auf Schulter oder Arm', 'Abklärung von Abnützung oder Verkalkungen'] },
  { id: 'oberarm', name: 'Oberarm', view: 'front', group: 'schulter-arm', questions: ['Schmerzen nach Sturz oder Unfall', 'Verdacht auf Knochenbruch', 'Verlaufskontrolle nach Knochenbruch'] },
  { id: 'ellenbogen', name: 'Ellenbogen und Unterarm', view: 'front', group: 'schulter-arm', questions: ['Sturz auf den ausgestreckten Arm', 'Schwellung oder Bewegungseinschränkung', 'Verlaufskontrolle nach Knochenbruch'] },
  { id: 'hand', name: 'Handgelenk, Hand und Finger', view: 'front', group: 'hand-handgelenk', questions: ['Sturz auf die Hand', 'Verletzung von Finger oder Daumen', 'Gelenkbeschwerden, etwa bei Arthrose'] },
  { id: 'brustkorb', name: 'Brustkorb und Rippen', view: 'front', group: 'lunge-brustkorb', questions: ['Husten oder Atembeschwerden (Lungenröntgen)', 'Schmerzen nach Prellung oder Sturz', 'Untersuchung vor einer Operation'] },
  { id: 'becken', name: 'Becken und Hüfte', view: 'front', group: 'becken-huefte', questions: ['Hüft- oder Leistenschmerzen', 'Abklärung von Abnützung (Arthrose)', 'Beschwerden nach Sturz'] },
  { id: 'oberschenkel', name: 'Oberschenkel', view: 'front', group: 'weitere-regionen', questions: ['Schmerzen nach Sturz oder Unfall', 'Verdacht auf Knochenbruch', 'Verlaufskontrolle nach Operation'] },
  { id: 'knie', name: 'Knie', view: 'front', group: 'knie-unterschenkel', questions: ['Knieschmerzen', 'Abklärung von Abnützung (Arthrose)', 'Verletzung, etwa nach Sturz oder beim Sport'] },
  { id: 'unterschenkel', name: 'Unterschenkel', view: 'front', group: 'knie-unterschenkel', questions: ['Schmerzen nach Sturz oder Unfall', 'Verdacht auf Knochenbruch', 'Verlaufskontrolle nach Knochenbruch'] },
  { id: 'sprunggelenk', name: 'Sprunggelenk', view: 'front', group: 'sprunggelenk-fuss', questions: ['Umknicken oder Verdrehen', 'Schwellung und Schmerzen nach Verletzung', 'Verlaufskontrolle nach Knochenbruch'] },
  { id: 'fuss', name: 'Fuß und Zehen', view: 'front', group: 'sprunggelenk-fuss', questions: ['Fuß- oder Zehenverletzung', 'Fehlstellung, etwa Hallux valgus', 'Belastungsschmerzen'] },
  { id: 'fersenbein', name: 'Fersenbein', view: 'back', group: 'sprunggelenk-fuss', questions: ['Fersenschmerzen, etwa bei Verdacht auf Fersensporn', 'Sturz oder Sprung aus der Höhe auf die Ferse', 'Verlaufskontrolle nach Knochenbruch'] },
];

// ---------------------------------------------------------------------------
// Ultraschall: Bereiche (alle laut bisheriger Website / Kassenberechtigung Sonographie)
// ---------------------------------------------------------------------------
export const ULTRASOUND_AREAS = [
  { id: 'us-bauch', title: 'Bauchorgane und Oberbauch', text: 'Leber, Gallenblase, Milz und Bauchspeicheldrüse werden beurteilt. Für den Oberbauch kommen Sie bitte nüchtern.' },
  { id: 'us-nieren', title: 'Nieren und ableitende Harnwege', text: 'Darstellung der Nieren und der ableitenden Harnwege einschließlich der Harnblase.' },
  { id: 'us-schilddruese', title: 'Schilddrüse', text: 'Größe und Gewebe der Schilddrüse sowie Knoten lassen sich gut beurteilen. Keine spezielle Vorbereitung nötig.' },
  { id: 'us-hals', title: 'Hals, Speicheldrüsen und Lymphknoten', text: 'Untersuchung der Halsweichteile, der Speicheldrüsen und von Lymphknoten. Keine spezielle Vorbereitung nötig.' },
  { id: 'us-gelenke', title: 'Gelenke, Sehnen und Weichteile', text: 'Darstellung von Sehnen, Schleimbeuteln, Muskulatur und Gelenken. Keine spezielle Vorbereitung nötig.' },
  { id: 'us-brust', title: 'Brustultraschall', text: 'Ergänzend zur Mammographie oder zur Abklärung, wenn ärztlich angeordnet.', link: { to: '/mammographie-graz#ultraschall-title', label: 'Zum Bereich Brustgesundheit' } },
  {
    id: 'us-weitere',
    title: 'Weitere Ultraschalluntersuchungen',
    text: 'Unterbauchorgane (Harnblase, Gebärmutter, Eierstöcke) sowie Farbdoppler der Gefäße: Bauchaorta, große Halsgefäße und Arm-, Becken- und Beinvenen und -arterien.',
  },
];

export const ULTRASOUND_FACTS = {
  appointment: 'Termin erforderlich – Ultraschall nur mit Voranmeldung.',
  referral: 'Als Kassenleistung mit ärztlicher Zuweisung und e-card.',
  billing: 'Kassenleistung mit ärztlicher Zuweisung und e-card – Verträge mit allen Kassen. Ohne Zuweisung auf Wunsch auch privat.',
  billingOpen: 'Preis für Ultraschall als Privatleistung',
  preparation: 'Oberbauch: nüchtern (6 Stunden nichts essen, nicht rauchen, kein Kaffee; stilles Wasser erlaubt). Unterbauch: mit gefüllter Harnblase. Schilddrüse, Hals, Brust und Gelenke: keine spezielle Vorbereitung.',
};

// Hochauflösender Nervenultraschall – angeboten über PUCmed (externe Weiterleitung)
export const PUCMED = {
  url: 'https://pucmed.at/',
  // Direkte Buchungsadresse NUR eintragen, wenn von PUCmed bzw. der Praxis bestätigt. null → nur Hauptseite.
  bookingUrl: null,
};

// ---------------------------------------------------------------------------
// Spezialröntgen mit Kontrastmittel – vier Untersuchungen.
// Vorbereitung, Kontrastmittel, Laborwerte, Medikamente, Schwangerschaft und Dauer werden je
// Untersuchung gepflegt. null = von der Praxis noch zu liefern (sichtbarer Platzhalter).
// ---------------------------------------------------------------------------
export const SPECIAL_EXAMS = [
  {
    id: 'schluckroentgen',
    name: 'Schluckröntgen und Videoschluckakt',
    term: 'Videokinematographie des Schluckaktes',
    purpose: 'Zeigt in bewegten Röntgenbildern, wie Mund, Rachen und Speiseröhre beim Schlucken zusammenarbeiten – etwa bei Schluckbeschwerden.',
    details: {
      preparation: 'Bitte kommen Sie nüchtern: 4 Stunden vor der Untersuchung nichts mehr essen und trinken.',
      contrast: 'Sie trinken unter Anleitung schluckweise ein Kontrastmittel. Es wird nicht gespritzt.',
      lab: 'Keine Laborwerte erforderlich.',
      medication: 'Ihre Medikamente können Sie wie gewohnt einnehmen.',
      pregnancy: 'Bei bestehender oder möglicher Schwangerschaft wird die Untersuchung nur in begründeten Ausnahmefällen gemacht – bitte informieren Sie uns vorher.',
      duration: 'Die Untersuchung selbst dauert meist 5 bis 10 Minuten.',
    },
  },
  {
    id: 'venenroentgen',
    name: 'Venenröntgen',
    term: 'Phlebographie',
    purpose: 'Stellt die Venen mit Kontrastmittel dar, etwa zur Beurteilung der Venenklappen oder vor einer Krampfadernoperation.',
    detailPage: '/unser-angebot/phlebographie',
    details: {
      preparation: 'Sie müssen nicht nüchtern sein. Bitte essen Sie vorher eine leichte Mahlzeit und trinken Sie ausreichend – das schont den Kreislauf.',
      contrast: 'Das Kontrastmittel wird meist über eine Vene am Fußrücken gegeben.',
      lab: 'Bei bekannten Nierenerkrankungen benötigen wir Ihren aktuellen Kreatinin- bzw. GFR-Wert, bei einer Schilddrüsenerkrankung Ihren TSH-Wert. Wenden Sie sich dafür vor der Untersuchung an Ihre Hausärztin oder Ihren Hausarzt.',
      medication: 'Metformin (Diabetes) dürfen Sie in der Regel weiter einnehmen; nur bei stark eingeschränkter Nierenfunktion (eGFR unter 30) wird es nach Rücksprache für 48 Stunden pausiert. Blutverdünner nehmen Sie wie gewohnt. Bitte bringen Sie eine aktuelle Medikamentenliste mit.',
      pregnancy: 'In der Schwangerschaft wird die Untersuchung nicht durchgeführt. Auch bei bekannter Kontrastmittelallergie oder Schilddrüsenüberfunktion ist sie nicht möglich.',
      duration: 'Mit Aufklärung und Vorbereitung etwa 30 bis 45 Minuten.',
    },
  },
  {
    id: 'eileiter',
    name: 'Eileiterdurchgängigkeit mit Röntgen',
    term: 'Hysterosalpingographie, HSG',
    purpose: 'Prüft mit Kontrastmittel, ob die Eileiter durchgängig sind – etwa im Rahmen einer Kinderwunschabklärung.',
    details: {
      preparation: 'Der Termin liegt in der ersten Zyklushälfte, nach dem Ende der Regelblutung und vor dem Eisprung (etwa 7. bis 12. Zyklustag). Bitte melden Sie sich am ersten Tag Ihrer Regel zur Terminvereinbarung. Nüchtern müssen Sie nicht sein.',
      contrast: 'Das Kontrastmittel wird über einen dünnen Katheter durch den Muttermund in die Gebärmutter gegeben – nicht in die Vene.',
      lab: 'In der Regel keine. Bei einer Schilddrüsenerkrankung bringen Sie bitte Ihren aktuellen TSH-Wert mit.',
      medication: 'Gegen krampfartige Beschwerden kann ein gewohntes Schmerzmittel etwa eine Stunde vorher helfen – bitte nur, wenn Sie es vertragen. Ihre übrigen Medikamente nehmen Sie wie gewohnt.',
      pregnancy: 'Eine Schwangerschaft muss sicher ausgeschlossen sein. Deshalb findet die Untersuchung in der ersten Zyklushälfte statt.',
      duration: 'Die Untersuchung selbst dauert meist 15 bis 30 Minuten.',
    },
  },
  {
    id: 'nierenroentgen',
    name: 'Nierenröntgen mit Kontrastmittel',
    term: 'Ausscheidungsurographie, IVP oder IVU',
    purpose: 'Zeigt nach Gabe von Kontrastmittel in die Vene, wie Nieren, Harnleiter und Blase den Harn ausscheiden.',
    details: {
      preparation: 'Bitte kommen Sie nüchtern (5 Stunden vorher nichts essen) und meiden Sie am Vortag blähende Speisen. Unmittelbar vor der Untersuchung bitte die Blase entleeren.',
      contrast: 'Ein jodhaltiges Kontrastmittel wird in eine Armvene gespritzt.',
      lab: 'Bitte bringen Sie einen aktuellen Kreatinin- bzw. eGFR-Wert mit, bei einer Schilddrüsenerkrankung auch Ihren TSH-Wert. Bei bekannter Kontrastmittelallergie oder Schilddrüsenüberfunktion ist die Untersuchung nicht möglich.',
      medication: 'Metformin (Diabetes) dürfen Sie in der Regel weiter einnehmen; nur bei stark eingeschränkter Nierenfunktion (eGFR unter 30) wird es nach Rücksprache für 48 Stunden pausiert. Blutverdünner nehmen Sie wie gewohnt. Bitte bringen Sie eine aktuelle Medikamentenliste mit.',
      pregnancy: 'In der Schwangerschaft wird die Untersuchung nicht durchgeführt.',
      duration: 'Etwa 30 bis 45 Minuten, weil mehrere Aufnahmen im Abstand einiger Minuten gemacht werden. Manchmal ist eine spätere Zusatzaufnahme nötig.',
    },
  },
];

export const SPECIAL_DETAIL_LABELS = {
  preparation: 'Vorbereitung',
  contrast: 'Kontrastmittel',
  lab: 'Laborwerte',
  medication: 'Medikamente',
  pregnancy: 'Schwangerschaft',
  duration: 'Untersuchungsdauer',
};

// Bisher auf der Website genannt, aber nicht unter den vier Untersuchungen – Praxis entscheidet
export const SPECIAL_OPEN = 'Bisher auf der Website genannt: Magenröntgen und Magen-/Dünndarmpassage. Bitte bestätigen, ob weiterhin angeboten – dann als eigene Karte ergänzen, sonst streichen.';

// ---------------------------------------------------------------------------
// Zahnröntgen und 3D-DVT – nur bestätigte Leistungen werden angezeigt
// ---------------------------------------------------------------------------
export const DENTAL_SERVICES = [
  { id: 'panorama', title: 'Panoramaröntgen (OPG)', kind: '2D', confirmed: true, text: 'Übersichtsaufnahme aller Zähne, beider Kiefer und der Kiefergelenke in einem Bild.' },
  { id: 'fernroentgen', title: 'Fernröntgen', kind: '2D', confirmed: true, text: 'Seitliche Aufnahme des Schädels für die Vermessung bei kieferorthopädischen Behandlungen.' },
  { id: 'einzelzahn', title: 'Einzelzahnröntgen', kind: '2D', confirmed: true, text: 'Gezielte Detailaufnahme einzelner Zähne und ihrer Wurzeln.' },
  { id: 'dvt-kiefer', title: '3D-DVT des Ober- oder Unterkiefers', kind: '3D', confirmed: true, text: 'Räumliche Darstellung von Zähnen, Kieferknochen und Nervenkanälen – etwa auch zur Abklärung überzähliger Zahnanlagen.' },
  { id: 'dvt-implantat', title: 'DVT vor Implantationen', kind: '3D', confirmed: true, text: 'Planungsgrundlage für Zahnimplantate: Knochenangebot und Lage der Nervenkanäle werden sichtbar.' },
  { id: 'dvt-verlagert', title: 'DVT bei verlagerten Zähnen', kind: '3D', confirmed: false, text: 'Lage verlagerter Zähne zu Nachbarzähnen und Nervenkanälen.' },
  { id: 'dvt-nnh', title: 'DVT der Nasennebenhöhlen', kind: '3D', confirmed: true, text: 'Dreidimensionale Darstellung der Nasen-, Kiefer- und Nebenhöhlen.' },
  { id: 'dvt-gesicht', title: 'DVT des Gesichtsschädels', kind: '3D', confirmed: true, text: 'Dreidimensionale Darstellung der Knochen des Gesichtsschädels, etwa von Augenhöhlen, Jochbein und Nasengerüst.' },
  { id: 'dvt-kiefergelenk', title: 'DVT der Kiefergelenke', kind: '3D', confirmed: true, text: 'Räumliche Darstellung der knöchernen Kiefergelenke, etwa bei Kiefergelenksbeschwerden oder zur Behandlungsplanung.' },
  { id: 'dvt-kraniozervikal', title: 'DVT des kraniozervikalen Übergangs', kind: '3D', confirmed: true, text: 'Dreidimensionale Darstellung des Übergangs vom Schädel zur Halswirbelsäule mit den beiden obersten Halswirbeln (Atlas und Axis).' },
];
export const confirmedDental = DENTAL_SERVICES.filter((s) => s.confirmed);

// ---------------------------------------------------------------------------
// Strahleninformation – typische Orientierungswerte (Vorgabe der Praxis)
// ---------------------------------------------------------------------------
export const RADIATION_EXAMPLES = [
  { id: 'peripher', label: 'Röntgen von Hand, Fuß oder einem peripheren Gelenk', text: 'typischerweise unter 0,01 mSv, entsprechend weniger als etwa 1,5 Tagen natürlicher Hintergrundstrahlung.' },
  { id: 'panorama', label: 'Panoramaröntgen der Zähne', text: 'typischerweise etwa 0,01 mSv, entsprechend ungefähr 1,5 Tagen natürlicher Hintergrundstrahlung.' },
  { id: 'lunge', label: 'Einzelne Lungenröntgenaufnahme', text: 'typischerweise etwa 0,02 mSv, entsprechend ungefähr 3 Tagen natürlicher Hintergrundstrahlung.' },
];
export const RADIATION_DISCLAIMER =
  'Dabei handelt es sich um typische Orientierungswerte. Die tatsächliche Dosis hängt unter anderem von Untersuchungsregion, Anzahl der Aufnahmen, Körperbau, Gerät und Untersuchungsprotokoll ab.';
export const RADIATION_DEPENDS =
  'Die Strahlendosis hängt unter anderem von Untersuchungsregion, Anzahl der Aufnahmen, Körperbau, Gerät und Untersuchungsprotokoll ab. Ihre Fragen dazu beantworten wir gerne vor der Untersuchung.';
export const ULTRASOUND_RADIATION = 'Ultraschall verwendet keine ionisierende Röntgenstrahlung.';
export const PREGNANCY_NOTE =
  'Wenn Sie schwanger sind oder schwanger sein könnten, teilen Sie uns das bitte vor der Untersuchung mit.';

// Detailseiten zeigen nur die zur Seite passenden Beispiele (keine zusätzlichen Werte erfinden)
export const RADIATION_BY_AREA = {
  overview: ['peripher', 'panorama', 'lunge'],
  roentgen: ['peripher', 'lunge'],
  zahn: ['panorama'],
  spezialroentgen: [],
};
