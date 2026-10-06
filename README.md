# Röntgen am Kai - Homepage

Moderne, responsive Homepage für die Radiologie-Ordination "Röntgen am Kai" in Graz.

⚠️ **Urheberrechtshinweis**: Alle Inhalte dieses Repositories (Quellcode, Bilder, Logos und klinische Assets) sind urheberrechtlich geschützt und Eigentum von "Röntgen am Kai". Es werden **keinerlei Nutzungsrechte** gewährt. Das Kopieren, Verbreiten oder die Verwendung für eigene Zwecke ist streng untersagt.

## Tech Stack
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Icons**: Lucide React

## Features
- 100% Inhalts-Synchronität mit der alten Webseite.
- Integration von 51 hochauflösenden klinischen Assets (2025).
- Online-Terminvergabe Integration (Placeholder für CAS-med).
- SEO optimiert.

## Entwicklung
```bash
npm install
npm run dev
```

## Prüfen
```bash
npm test             # = npm run lint && npm run test:unit (Sekunden, läuft auch in GitHub Actions vor dem Build)
npm run test:unit    # Node-Unit-Tests in tests/unit (Daten, Routen, Suche; Build-Ausgabe nur, wenn dist/ existiert)
```
Browser-Tests (Playwright, Python) laufen gegen den Staging-Build (mit internen Platzhaltern, wie github.io) – Voraussetzung:
```bash
npm run build:staging
npx vite preview --port 4174 &      # PID merken, danach beenden
npm run test:e2e                    # zehn Suiten nacheinander, oder einzeln: python3 -u tests/e2e_site.py
```
Die Suiten nie parallel starten (ein Browser zur Zeit).

## Build/Deploy
- Zwei Varianten: `npm run build` = Release (interne Platzhalter für die Praxis ausgeblendet) und
  `npm run build:staging` = Staging (`VITE_INTERNAL_NOTES=1` aus `.env.staging`, interne Platzhalter sichtbar).
  github.io ist Staging: GitHub Actions baut mit `VITE_INTERNAL_NOTES: '1'`.
- `npm run build` = Client-Build (`vite build`) + Vorrendern (`vite build --ssr src/entry-server.jsx` nach `dist-ssr/`) + `scripts/postbuild.mjs`.
- `postbuild.mjs` schreibt aus `src/data/routes.js` je Route eine eigene HTML-Datei (Titel, Description, Canonical, OG),
  rendert die Seiten mit `prerender: true` vollständig vor (ohne JavaScript nutzbar), erzeugt die Weiterleitungsseiten
  für alte Adressen, `404.html`, `sitemap.xml` und `robots.txt`.
- Deploy automatisch per GitHub Actions (`.github/workflows/deploy.yml`) bei jedem Push auf `main`:
  Lint → Unit-Tests → Build → GitHub Pages.
