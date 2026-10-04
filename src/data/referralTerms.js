// „Was steht auf Ihrer Zuweisung?“ – zentral gepflegte Begriffe für die Suche auf /roentgen-graz.
//
// Die Suche dient NUR der Navigation innerhalb der Website. Sie legt keine Untersuchung fest und
// gibt keine medizinische Empfehlung – welche Aufnahmen gemacht werden, bestimmt die Zuweisung.
//
// Pflege: term = Begriff, wie er auf Zuweisungen steht · label = verständliche Zuordnung ·
//         to = vorhandener Seitenabschnitt oder bestehende Detailseite · aliases = weitere Schreibweisen.
// Jeder Eintrag wird im Test (tests/e2e_weitere_untersuchungen.py) auf ein existierendes Sprungziel geprüft.

export const REFERRAL_TERMS = [
  // Röntgen – Regionen (Sprungziele: Körpernavigator-Liste bzw. Gruppen auf /roentgen-graz)
  { term: 'Thorax', label: 'Lunge und Brustkorb', to: '/roentgen-graz#lunge-brustkorb', aliases: ['Lungenröntgen', 'Lunge', 'Thoraxröntgen', 'Thorax pa', 'Thorax 2 Ebenen', 'Brustkorb'] },
  { term: 'HWS', label: 'Halswirbelsäule', to: '/roentgen-graz#region-hws', aliases: ['Halswirbelsäule', 'Halswirbel', 'Nacken'] },
  { term: 'BWS', label: 'Brustwirbelsäule', to: '/roentgen-graz#region-bws', aliases: ['Brustwirbelsäule', 'Brustwirbel'] },
  { term: 'LWS', label: 'Lendenwirbelsäule', to: '/roentgen-graz#region-lws', aliases: ['Lendenwirbelsäule', 'Lendenwirbel', 'Kreuz'] },
  { term: 'Wirbelsäulenganzaufnahme', label: 'Wirbelsäule', to: '/roentgen-graz#wirbelsaeule', aliases: ['Ganzwirbelsäule', 'Wirbelsäule', 'WS gesamt', 'Funktionsaufnahmen'] },
  { term: 'OSG', label: 'oberes Sprunggelenk', to: '/roentgen-graz#region-sprunggelenk', aliases: ['oberes Sprunggelenk', 'Sprunggelenk', 'Knöchel'] },
  { term: 'USG', label: 'unteres Sprunggelenk', to: '/roentgen-graz#region-sprunggelenk', aliases: ['unteres Sprunggelenk'] },
  { term: 'Hand ap/seitlich', label: 'Handröntgen', to: '/roentgen-graz#region-hand', aliases: ['Hand', 'Hand ap', 'Hand seitlich', 'Hand dp', 'Handgelenk', 'Finger', 'Daumen', 'Kahnbein'] },
  { term: 'Knie stehend', label: 'Knieröntgen', to: '/roentgen-graz#region-knie', aliases: ['Knie', 'Kniegelenk', 'Knie 2 Ebenen', 'Patella', 'Kniescheibe'] },
  { term: 'Beckenübersicht', label: 'Beckenröntgen', to: '/roentgen-graz#region-becken', aliases: ['Becken', 'Becken ap', 'Hüfte', 'Hüftgelenk'] },
  { term: 'Rippen', label: 'Brustkorb und Rippen', to: '/roentgen-graz#region-brustkorb', aliases: ['Rippe', 'Rippenserie'] },
  { term: 'Schulter', label: 'Schulter und Schlüsselbein', to: '/roentgen-graz#region-schulter', aliases: ['Schultergelenk', 'Schlüsselbein', 'Clavicula', 'AC-Gelenk'] },
  { term: 'Oberarm', label: 'Oberarm', to: '/roentgen-graz#region-oberarm', aliases: ['Humerus'] },
  { term: 'Ellbogen', label: 'Ellenbogen und Unterarm', to: '/roentgen-graz#region-ellenbogen', aliases: ['Ellenbogen', 'Unterarm', 'Ellbogengelenk'] },
  { term: 'Oberschenkel', label: 'Oberschenkel', to: '/roentgen-graz#region-oberschenkel', aliases: ['Femur'] },
  { term: 'Unterschenkel', label: 'Unterschenkel', to: '/roentgen-graz#region-unterschenkel', aliases: ['Schienbein', 'Tibia'] },
  { term: 'Fuß', label: 'Fuß und Zehen', to: '/roentgen-graz#region-fuss', aliases: ['Fuss', 'Vorfuß', 'Zehen', 'Zehe', 'Großzehe', 'Ferse', 'Fersenbein'] },

  // Ultraschall
  { term: 'Sonographie Abdomen', label: 'Ultraschall der Bauchorgane', to: '/ultraschall-graz#us-bauch', aliases: ['Abdomen', 'Oberbauch', 'Bauch', 'Leber', 'Gallenblase', 'Sono Abdomen', 'Ultraschall Bauch'] },
  { term: 'Nieren', label: 'Ultraschall der Nieren und Harnwege', to: '/ultraschall-graz#us-nieren', aliases: ['Niere', 'Harnwege', 'Harnblase', 'Blase'] },
  { term: 'Schilddrüse', label: 'Ultraschall der Schilddrüse', to: '/ultraschall-graz#us-schilddruese', aliases: ['Schilddrüsensonographie', 'SD-Sono', 'Thyreoidea'] },
  { term: 'Halsweichteile', label: 'Ultraschall von Hals, Speicheldrüsen und Lymphknoten', to: '/ultraschall-graz#us-hals', aliases: ['Hals', 'Lymphknoten', 'Speicheldrüse', 'Speicheldrüsen'] },
  { term: 'Weichteilsonographie', label: 'Ultraschall von Gelenken, Sehnen und Weichteilen', to: '/ultraschall-graz#us-gelenke', aliases: ['Weichteile', 'Gelenkssonographie', 'Sehne', 'Sehnen', 'Schleimbeutel', 'Muskel'] },
  { term: 'Mammasonographie', label: 'Brustultraschall', to: '/ultraschall-graz#us-brust', aliases: ['Brustultraschall', 'Mamma-Sono', 'Ultraschall Brust'] },
  { term: 'Farbdoppler', label: 'Ultraschall der Gefäße', to: '/ultraschall-graz#us-weitere', aliases: ['Duplex', 'Farbduplex', 'Carotis', 'Halsgefäße', 'Beinvenen', 'Beinarterien', 'Bauchaorta'] },
  { term: 'Nervenultraschall', label: 'Hochauflösender Nervenultraschall (über PUCmed)', to: '/ultraschall-graz#nervenultraschall', aliases: ['Nervensonographie', 'Nerv', 'Nerven'] },

  // Spezialröntgen mit Kontrastmittel
  { term: 'Videoschluckakt', label: 'Schluckröntgen und Videoschluckakt', to: '/spezialroentgen#schluckroentgen', aliases: ['Schluckakt', 'Schluckröntgen', 'Videokinematographie', 'Ösophagus', 'Speiseröhre', 'Breischluck'] },
  { term: 'Phlebographie', label: 'Venenröntgen', to: '/unser-angebot/phlebographie', aliases: ['Venenröntgen', 'Phlebografie'] },
  { term: 'HSG', label: 'Eileiterdurchgängigkeit mit Röntgen', to: '/spezialroentgen#eileiter', aliases: ['Hysterosalpingographie', 'Eileiter'] },
  { term: 'IVP', label: 'Nierenröntgen mit Kontrastmittel', to: '/spezialroentgen#nierenroentgen', aliases: ['IVU', 'AUG', 'Ausscheidungsurographie', 'Urographie', 'Nierenröntgen'] },

  // Zahnröntgen und 3D-DVT
  { term: 'OPG', label: 'Panoramaröntgen der Zähne', to: '/zahnroentgen-dvt-graz#panorama', aliases: ['OPT', 'OPTG', 'Orthopantomogramm', 'Panorama', 'Panoramaröntgen', 'Zahnpanorama'] },
  { term: 'Fernröntgen', label: 'Fernröntgen', to: '/zahnroentgen-dvt-graz#fernroentgen', aliases: ['FRS', 'Ceph', 'Cephalometrie'] },
  { term: 'Zahnfilm', label: 'Einzelzahnröntgen', to: '/zahnroentgen-dvt-graz#einzelzahn', aliases: ['Einzelzahn', 'Zahnröntgen', 'Zahn'] },
  { term: 'DVT', label: '3D-Röntgen (DVT)', to: '/zahnroentgen-dvt-graz#dvt', aliases: ['digitale Volumentomographie', 'Volumentomographie', '3D-Röntgen', 'DVT Kiefer', 'Oberkiefer', 'Unterkiefer'] },
  { term: 'DVT Implantat', label: 'DVT vor Implantationen', to: '/zahnroentgen-dvt-graz#dvt-implantat', aliases: ['Implantat', 'Implantatplanung'] },
  { term: 'NNH', label: 'DVT der Nasennebenhöhlen', to: '/zahnroentgen-dvt-graz#dvt-nnh', aliases: ['Nasennebenhöhlen', 'Nebenhöhlen', 'Kieferhöhle'] },
  { term: 'DVT Gesichtsschädel', label: 'DVT des Gesichtsschädels', to: '/zahnroentgen-dvt-graz#dvt-gesicht', aliases: ['Gesichtsschädel', 'Mittelgesicht', 'Jochbein', 'Orbita', 'Nasenbein'] },
  { term: 'DVT Kiefergelenke', label: 'DVT der Kiefergelenke', to: '/zahnroentgen-dvt-graz#dvt-kiefergelenk', aliases: ['Kiefergelenk', 'Kiefergelenke', 'TMJ', 'KG'] },
  { term: 'DVT kraniozervikaler Übergang', label: 'DVT des kraniozervikalen Übergangs', to: '/zahnroentgen-dvt-graz#dvt-kraniozervikal', aliases: ['kraniozervikaler Übergang', 'craniocervicaler Übergang', 'CCJ', 'KZÜ', 'Atlas', 'Axis', 'Dens', 'C1', 'C2'] },

  // Weitere Bereiche der Website
  { term: 'Mammographie', label: 'Mammographie und Brustgesundheit', to: '/mammographie-graz', aliases: ['Mammografie', 'Mammo', 'Mammascreening'] },
  { term: 'Knochendichte', label: 'DEXA-Knochendichtemessung', to: '/knochendichtemessung-graz', aliases: ['DEXA', 'DXA', 'Osteodensitometrie', 'Osteoporose'] },
  { term: 'CT oder MRT', label: 'Kein CT und kein MRT bei uns – Hinweis', to: '/weitere-untersuchungen#kein-ct-mrt', aliases: ['CT', 'MRT', 'MR', 'Computertomographie', 'Magnetresonanz', 'Kernspin'] },
];

// Normalisierung: Kleinbuchstaben, Umlaute ausgeschrieben, Satzzeichen als Leerzeichen
export const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const INDEX = REFERRAL_TERMS.map((t, order) => ({
  ...t,
  order,
  keys: [t.term, t.label, ...(t.aliases || [])].map(normalize),
}));

// Treffer sortiert nach Güte: exakt > Wortanfang > enthalten > Begriff steckt in der Eingabe
export const searchTerms = (query, limit = 8) => {
  const q = normalize(query || '');
  if (q.length < 2) return [];
  const qTokens = q.split(' ');
  const scored = [];
  for (const t of INDEX) {
    let best = 0;
    for (const k of t.keys) {
      let s = 0;
      if (k === q) s = 100;
      else if (k.startsWith(q)) s = 80;
      else if (k.split(' ').some((w) => w.startsWith(q))) s = 70;
      else if (k.includes(q)) s = 55;
      else if (k.length >= 3 && (` ${q} `).includes(` ${k} `)) s = 50;
      else if (qTokens.length > 1 && qTokens.every((qt) => k.split(' ').some((w) => w.startsWith(qt)))) s = 45;
      if (s > best) best = s;
    }
    if (best) scored.push({ ...t, score: best });
  }
  return scored.sort((a, b) => b.score - a.score || a.order - b.order).slice(0, limit);
};

// Alphabetische Liste für die Ansicht ohne JavaScript („Alle Begriffe anzeigen“)
export const TERMS_ALPHABETICAL = [...REFERRAL_TERMS].sort((a, b) => a.term.localeCompare(b.term, 'de'));
