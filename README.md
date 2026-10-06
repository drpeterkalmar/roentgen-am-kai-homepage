# Röntgen am Kai - Homepage

Moderne, responsive Homepage für die Radiologie-Ordination "Röntgen am Kai" in Graz.

⚠️ **Urheberrechtshinweis**: Alle Inhalte dieses Repositories (Quellcode, Bilder, Logos und klinische Assets) sind urheberrechtlich geschützt und Eigentum von "Röntgen am Kai". Es werden **keinerlei Nutzungsrechte** gewährt. Das Kopieren, Verbreiten oder die Verwendung für eigene Zwecke ist streng untersagt.

- Staging (GitHub Pages): https://drpeterkalmar.github.io/roentgen-am-kai-homepage/
- Ziel-Domain: röntgen-am-kai.at (`https://www.xn--rntgen-am-kai-imb.at`, steht bereits in Canonicals, Sitemap und JSON-LD)

## Technik
- **Framework**: React 18 (Vite 5), React Router 7
- **Styling**: Tailwind CSS 3, eigenes kleines Designsystem in `src/components/ui`
- **Animationen**: CSS (`src/index.css`, „Bewegung reduzieren“ wird beachtet)
- **Icons**: lucide-react
- Keine Tracker, keine Cookies; im Browser gespeichert wird nur die Dunkelmodus-Wahl nach Klick und – nur wenn
  Seiten-Code nach einem Deploy fehlt – ein technischer Zeitstempel in `sessionStorage` (Schutz vor Endlos-Neuladen,
  `src/lib/chunkReload.js`). Schriften selbst gehostet; Online-Terminbuchung per Link ins MiraNext-Patientenportal.

## Aufbau
- `src/data/` – alle Fakten an einer Stelle: Routentabelle (`routes.js`), Leistungen (`services.js`), weitere
  Untersuchungen (`examinations.js`), Praxis- und Kontaktdaten (`practice.js`), DEXA (`dexa.js`), Körperanalyse
  (`bodyComposition.js`), Screening (`screening.js`), FAQ (`faqData.js`), Team (`team.js`), Fotos (`photos.js`),
  strukturierte Daten (`schema.js`). Diese Dateien sind auch für Node lesbar (Build, Tests): kein JSX, kein `import.meta`.
- `src/data/routes.js` – je Route Titel, Description, `page` (Datei unter `src/pages`), `faq` (sichtbare FAQ =
  FAQPage-Schema), `crumb`, `prerender`; dazu `LEGACY_REDIRECTS` (alte Adressen).
- `src/routes.jsx` – Seiten (bei Bedarf geladen) und Router-Konfiguration aus der Tabelle.
- `src/AppShell.jsx` – Seitenrahmen (Kopf, Inhalt mit Fehlergrenze, Fuß) für Browser und Vorrendern.
- **Neue Seite** = Datei in `src/pages` + Eintrag in `routes.js` (bei Bedarf Menüpunkt in `navigation.js`).

## Entwicklung
```bash
npm install
npm run dev        # interne Platzhalter sichtbar (.env.development: VITE_INTERNAL_NOTES=1)
```

## Bilder
- Vorlagen (Originalfotos) liegen in `assets-src/images`. `npm run images` erzeugt daraus
  `public/assets/images/<name>.avif` (1920 px), `-tablet` (1200 px) und `-mobile` (800 px) – nur bei neuer oder
  geänderter Vorlage (Inhalts-Hash in `public/assets/images/manifest.json`), die Vorlagen werden nie überschrieben.
- Ergebnis einchecken; der Build verarbeitet keine Bilder (`sharp` ist nur Entwicklungsabhängigkeit).
- Im Code: `components/ui/Picture.jsx` (`<Picture name=… />`, `imageUrl`, `imageSrcSet`).

## Build
- Zwei Varianten: `npm run build` = Release (interne Platzhalter und Notizen für die Praxis ausgeblendet) und
  `npm run build:staging` = Staging (`VITE_INTERNAL_NOTES=1` aus `.env.staging`, interne Platzhalter sichtbar).
- Ablauf: Client-Build (`vite build`) → Vorrendern (`vite build --ssr src/entry-server.jsx` nach `dist-ssr/`) →
  `scripts/postbuild.mjs`.
- `postbuild.mjs` schreibt aus `src/data/routes.js` je Route eine eigene HTML-Datei (Titel, Description, Canonical,
  OG, JSON-LD), rendert die Seiten mit `prerender: true` vollständig vor (ohne JavaScript nutzbar; im Browser per
  `hydrateRoot` übernommen), erzeugt die Weiterleitungsseiten für alte Adressen, `404.html`, `sitemap.xml`
  (`lastmod` = letzte Änderung der Seitendatei laut git) und `robots.txt`.

## Prüfen
```bash
npm test             # = npm run lint && npm run test:unit (Sekunden, läuft auch in GitHub Actions vor dem Build)
npm run test:unit    # Node-Unit-Tests in tests/unit (Daten, Routen, Komponenten; Build-Ausgabe nur, wenn dist/ existiert)
```
Browser-Tests (Playwright, Python) laufen gegen den Staging-Build (mit internen Platzhaltern, wie github.io) – Voraussetzung:
```bash
npm run build:staging
npx vite preview --port 4174 &      # PID merken, danach beenden
npm run test:e2e                    # elf Suiten nacheinander, oder einzeln: python3 -u tests/e2e_site.py
```
Die Suiten nie parallel starten (ein Browser zur Zeit). Screenshots und Berichte landen über `tests/_paths.py`
in `~/Documents/Hermes-Berichte/Homepage-Tests`.

## Deploy
- Automatisch per GitHub Actions (`.github/workflows/deploy.yml`) bei jedem Push auf `main`:
  `npm ci` → Lint → Unit-Tests → Build (Staging: `VITE_INTERNAL_NOTES: '1'`) → GitHub Pages.
- Nach einem Deploy fehlen die alten Seiten-Chunks; offene Tabs laden dann einmal automatisch neu
  (`src/lib/chunkReload.js`), sonst erscheint eine Fehlerseite mit „Neu laden“ und Telefonnummer.

## Domain-Umzug (röntgen-am-kai.at)
- In `.github/workflows/deploy.yml` beim Build `BASE_PATH: /` setzen – sonst laufen alle Assets ins Leere
  (Standard ist `/roentgen-am-kai-homepage/` für github.io).
- Für die öffentliche Domain den Release-Build verwenden: `VITE_INTERNAL_NOTES` im Workflow entfernen
  (interne Platzhalter und Notizen verschwinden; `tests/unit/dist.test.mjs` prüft das).
- Die Domain in den GitHub-Pages-Einstellungen eintragen. `SITE_URL` in `src/data/routes.js` zeigt bereits auf die Ziel-Domain.
- Alte Adressen sind auf GitHub Pages Meta-Refresh-Seiten (`LEGACY_REDIRECTS`); auf einem eigenen Server echte 301 einrichten.
