# Code-Gutachten „Röntgen am Kai“-Homepage – 05.10.2026

Erstellt von Claude Fable 5.1 (max) im Auftrag von Peter. Stand: Commit 4ebc486 auf `main`.
Keine Code-Änderung, nur Lesen, kurze Node-/Python-Checks und Sichtprüfung einzelner Bilddateien.
Browser-Tests wurden wegen der Leicht-Spur (paralleler Job, 8 GB RAM) nicht ausgeführt; die offenen
Browser-Checks stehen am Ende.

## Kurzurteil

1. Der Code ist im Kern gesund: eine Datenquelle je Thema (Routen, Leistungen, DEXA, Screening, Praxis), ein kleines Designsystem, Lint grün, keine Tracker, zehn Playwright-Prüfsuiten mit axe, statische HTML-Dateien je Route plus sechs vorgerenderte Seiten.
2. Größtes Risiko: Nach jedem Deploy (23 in 30 Tagen) stirbt jeder offene Tab beim nächsten Seitenwechsel mit weißem Bildschirm, und bis zu zehn Minuten lang auch frisch geladene Seiten, weil die Chunk-Namen wechseln und es weder eine Fehlergrenze noch ein Nachladen gibt (P1-1).
3. Drei weitere P1 sind kleine, sichere Eingriffe: App bleibt auf iPhones mit blockierten Cookies beim Grundgerüst hängen (P1-2), die Startseite zeigt „ca. 15 Minuten“ neben „etwa 20 Minuten“ für die Körperanalyse (P1-3), und die Arztfotos in den strukturierten Daten der Teamseiten passen nicht zu den sichtbaren Fotos (P1-4).
4. Wartbarkeit: Eine neue Seite muss an fünf Stellen eingetragen werden; Textbausteine, Bild-Helfer und Öffnungszeiten-Formatierung sind vier- bis neunfach kopiert; die Stammdaten zu Röntgen/Ultraschall/DVT liegen doppelt; die Tests sind ausschließlich schwere Browser-Läufe ohne CI.
5. Zählung: 4 × P1, 14 × P2, 15 × P3. Aufwand für P1 gesamt: ein halber Tag. Aufwand für alle P2: etwa fünf Arbeitstage in kleinen, einzeln testbaren Schritten (Umbauplan unten).

## Was gut ist (damit der Rest nicht täuscht)

- `src/data/*` ist konsequent als einzige Quelle gebaut (Preise, Kassenregeln, Screening, Öffnungszeiten, Routen-Metadaten). Platzhalter sind als Daten modelliert (`null` → sichtbarer Platzhalter) und per `[data-placeholder]` testbar.
- Barrierefreiheit ist ernst genommen: Fokusfalle und Escape im Handy-Menü, Disclosure-FAQ, Skip-Link, `aria-current`, Körpernavigator mit Tastatur und Textliste, Bewegung-reduzieren überall.
- Leistung ist für ein React-Projekt gut: Startseite lädt 46 KB + 57 KB gzip JavaScript (index + vendor), 11 KB CSS, Seitencode je Route 4–11 KB gzip, Bilder als AVIF in drei Größen, Fonts selbst gehostet.
- `scripts/postbuild.mjs` löst das GitHub-Pages-Problem (404 für Unterseiten) sauber: eigene HTML-Datei je Route, Weiterleitungsseiten, Sitemap, robots, 404.
- Die E2E-Suiten prüfen genau die Dinge, die bei diesem Projekt zählen (Pflichtsätze, verbotene Aussagen, Telefonnummer byte-genau, FAQ sichtbar = Schema, Kontrast, Touch-Ziele).

## Befunde nach Priorität

Legende: Aufwand S = unter 2 Stunden, M = halber bis ganzer Tag, L = mehrere Tage. Risiko = Gefahr, beim Umbau etwas Sichtbares zu brechen.

### P1 – drohende oder bestehende Bugs

**P1-1 Weißer Bildschirm nach jedem Deploy (Chunk-Hash wechselt, kein Fallback)**
- Wo: `src/App.jsx:13–37` (alle Seiten als `lazy(() => import(...))`), `src/main.jsx:11` (kein Error Boundary), `vite.config.js:17–22` (Chunks mit Hash im Namen), `.github/workflows/deploy.yml:13–15, 42–45` (jeder Deploy ersetzt das komplette Artefakt, alte Chunks verschwinden).
- Beleg: Live-Antwort von GitHub Pages: `cache-control: max-age=600` für `index.html` und für die Hash-Assets. 23 Commits auf `main` in den letzten 30 Tagen, jeder ein Deploy. `grep` nach `ErrorBoundary`, `componentDidCatch`, `vite:preloadError` in `src`: 0 Treffer. Ablauf: Nutzer hat die Seite offen (oder bekommt bis 10 Minuten nach dem Deploy noch die alte `index.html` aus dem Cache) → klickt „Knochendichte“ → `import('/assets/KnochendichtePage-<alterHash>.js')` → 404 → `lazy` wirft → ohne Fehlergrenze hängt React den ganzen Baum aus → `#root` ist leer, Seite weiß, kein Menü, kein Telefon.
- Vorschlag: (1) In `main.jsx` vor dem Rendern `window.addEventListener('vite:preloadError', () => window.location.reload())` – Vite feuert dieses Ereignis genau bei fehlgeschlagenen dynamischen Imports; ein Reload holt die neue `index.html`. (2) Eine kleine Fehlergrenze (`components/ErrorBoundary.jsx`) um `<Routes>` mit Text „Seite konnte nicht geladen werden“, Knopf „Neu laden“ und der Telefonnummer aus `practice.js`. (3) Optional: einmaliger Wiederholungsversuch im Lazy-Wrapper (`lazyRetry`). Aufwand S. Risiko: keines, nur zusätzliche Fehlerpfade.
- Hinweis zum Caching allgemein: Es gibt keinen Service Worker; der einzige Cache ist der GitHub-Pages-Header (10 Minuten). Damit ist P1-1 der einzige Caching-Bruch, aber ein regelmäßiger.

**P1-2 App bleibt beim Grundgerüst hängen, wenn `localStorage` gesperrt ist (iPhone „Alle Cookies blockieren“, einzelne Privatmodi)**
- Wo: `src/App.jsx:43–50` – `localStorage.getItem('theme')` im `useState`-Initialisierer ohne `try/catch`; der Setter in Zeile 61 ist abgesichert, der Leser nicht.
- Beleg: Safari wirft beim bloßen Zugriff auf `window.localStorage` einen `SecurityError`, wenn Cookies komplett blockiert sind. Die Ausnahme passiert im ersten Render von `App`; React 18 ohne Fehlergrenze bricht den Mount ab. Für den Nutzer bleibt das statische Grundgerüst aus `index.html` stehen: Titel, ein Satz, ein Bild – kein Menü, kein Terminknopf, keine Telefonnummer (auf vorgerenderten Seiten bleibt der Inhalt, aber ohne Interaktion).
- Vorschlag: Hilfsfunktion `readStoredTheme()` in `src/lib/storage.js` mit `try/catch` (auch für `matchMedia`-Fehlen); `toggleTheme` nutzt dieselbe Datei. Aufwand S. Risiko: keines.

**P1-3 Widersprüchliche Terminangabe Körperanalyse: „ca. 15 Minuten“ neben „etwa 20 Minuten“**
- Wo: `src/data/services.js:58` (`durationMinutes: 15`) gegen `src/data/bodyComposition.js:10` (`durationMinutes: 20`, laut Kommentar Praxisangabe 27.09.2026). `services.js:56` und `:64` schreiben selbst „Termin etwa 20 Minuten“.
- Beleg: Node-Lauf über die Datenmodule: `services.koerperanalyse.durationMinutes = 15 | BODY.durationMinutes = 20`; Badge-Berechnung wie in `src/components/ServiceGrid.jsx:12` liefert `['Online buchbar', 'Privatleistung', 'ca. 15 Minuten']`. Diese Chips stehen auf der Startseite (`src/pages/Home.jsx:143`) unter dem Text der Körperanalyse-Karte; die Seite `/koerperanalyse-graz`, die FAQ und die Zielseiten sagen 20 Minuten. `ServiceLayout.jsx:63–68` würde ebenfalls „Dauer: etwa 15 Minuten“ ausgeben.
- Vorschlag: `durationMinutes: BODY.durationMinutes` in `services.js` (Import existiert dort schon), plus Node-Test „services.koerperanalyse.durationMinutes === BODY.durationMinutes“. Aufwand S. Risiko: keines.

**P1-4 Teamseiten: Arztfotos in den strukturierten Daten passen nicht zu den sichtbaren Fotos**
- Wo: `src/pages/KalmarPage.jsx:83` (Person-Schema `image: dr-kalmar.avif`) gegen `:111` (sichtbar `hero-slide-2.avif`); `src/pages/RieglerPage.jsx:93` (Schema `dr-riegler.avif`) gegen `:121` (sichtbar `knochendichte.avif`).
- Beleg (Sichtprüfung der vier Dateien, per `sharp` nach PNG gewandelt): `dr-kalmar.avif` = ein einzelner Arzt im Sessel (kurz rasiert, Bücherregal); `hero-slide-2.avif` = Arzt mit dunklem Haar am Befundplatz; `knochendichte.avif` = Porträt des kurz rasierten Arztes vor dem gelben Wirbelsäulen-Bild; `dr-riegler.avif` = beide Ärzte gehend im Gang. Commit `e1d2600` (21.04.2026, „complete Dr. Riegler profile and correct Dr. Kalmar photo“) hat `dr-kalmar.avif` auf der Kalmar-Seite bewusst durch ein anderes Foto ersetzt – das Bild unter dem Namen `dr-kalmar.avif` zeigt demnach nicht Dr. Kalmar, steht aber weiter als sein Schema-Bild im Code (Google-Personendaten). Das Riegler-Schema verweist auf ein Zwei-Personen-Foto. Zusätzlich heißt das Porträt `knochendichte.avif` und ist in `src/data/blogPosts.js:23` als Knochendichte-Artikelbild eingetragen (dort ungenutzt).
- Vorschlag: Peter bestätigt die Zuordnung (wer ist auf welchem Foto). Dann `src/data/team.js` mit je Arzt `{ name, slug, photo, alt }`; sichtbares Bild und Schema-Bild kommen aus derselben Konstante; Dateien eindeutig benennen (`portrait-kalmar`, `portrait-riegler`, `team-gang`). Aufwand S. Risiko: keines.

### P2 – Wartbarkeit, Stabilität, Go-live-Risiken

**P2-1 Vorgerenderte Seiten blinken beim Start: statischer Inhalt wird verworfen, bevor der Seitencode da ist**
- Wo: `src/main.jsx:11` (`createRoot().render`, keine Hydration), `src/App.jsx:95` (Suspense-Fallback leeres `min-h-screen`-Div), `src/entry-server.jsx:3` (Kommentar „keine Hydration“).
- Beleg: `dist/roentgen-graz/index.html` ist 141 KB und enthält die ganze Seite. Ablauf im Browser: Inhalt sichtbar → `index`-JS und `vendor` laufen → React ersetzt `#root` durch Header + leeres bildschirmhohes Div + Footer → `RoentgenGrazPage-*.js` (11 KB gzip) lädt → Inhalt wieder da. Auf Mobilfunk ein sichtbares Weißblitzen plus Layoutsprung; die Leseposition geht zusätzlich durch P2-2 verloren.
- Vorschlag: Für Routen mit `prerender: true` `hydrateRoot` verwenden und den Seiten-Chunk vor dem Rendern laden (`await route.component()` anhand von `location.pathname`, Routentabelle aus P2-5). Voraussetzung: identische Ausgabe von Server und Client → Dark-Klasse per Inline-Skript im `<head>` setzen (P2-14). Aufwand M. Risiko: Hydration-Warnungen bei Abweichungen; die E2E-Suiten prüfen bereits „keine Konsolenfehler“ je Route.

**P2-2 `ScrollToHash` scrollt bei jeder Navigation nach oben – auch bei „Zurück“, Neuladen und Erstaufruf**
- Wo: `src/components/ScrollToHash.jsx:7–22`. Der Effekt läuft beim Mount und bei jeder Pfadänderung, ohne Unterscheidung von PUSH und POP.
- Folgen: (a) Zurück-Taste landet oben statt an der alten Stelle (`BrowserRouter` hat keine Scroll-Wiederherstellung). (b) Neuladen einer vorgerenderten Seite: Der Browser stellt die Position her, danach scrollt React nach oben. (c) Erstaufruf mit Anker auf einer lazy geladenen Seite (z. B. Weiterleitung `postbuild.mjs:93` → `/roentgen-graz#lunge-brustkorb`): Zum Effektzeitpunkt existiert das Ziel noch nicht (Chunk lädt), danach passiert nichts mehr. In-App-Wechsel mit Anker (Zuweisungssuche auf eine andere Seite, `ReferralSearch.jsx:44`) dürften funktionieren, weil React Router 7 Navigationen in `startTransition` hält und die alte Seite stehen lässt, bis der Chunk da ist – das ist ein offener Browser-Check. (d) `behavior: 'smooth'` beim Seitenwechsel plus `html { scroll-behavior: smooth }` (`index.css:57`) ergibt eine sichtbare Scrollfahrt von unten nach oben.
- Vorschlag: `useNavigationType()` → bei `POP` nichts tun; beim Mount nichts tun; Anker-Ziel bis zu einer Sekunde per `requestAnimationFrame` suchen; Seitenwechsel mit `behavior: 'auto'`. Aufwand S–M. Risiko: gering; Anker-E2E vorhanden (`e2e_weitere_untersuchungen.py`).

**P2-3 Fokus nach Seitenwechsel landet auf dem Menü-Knopf statt im Inhalt**
- Wo: `src/components/Header.jsx:161–166` (Panel-Cleanup fokussiert den Menüknopf) in Kombination mit `:268` (Panel schließt bei Pfadwechsel). `main` hat `tabIndex={-1}` (`App.jsx:92`), wird aber nie fokussiert.
- Beleg: Reine Code-Lesung; Screenreader-Nutzer stehen nach einem Klick im Handy-Menü auf der neuen Seite wieder am Menüknopf. Tastaturnutzer am Desktop bleiben beim zuletzt fokussierten Link der alten Seite (der nicht mehr existiert → Fokus auf `body`).
- Vorschlag: Im Routen-Effekt (P2-2) bei PUSH ohne Hash `document.getElementById('main').focus({ preventScroll: true })`; im Panel den Fokus nur zurückgeben, wenn der Pfad unverändert ist. Aufwand S.

**P2-4 Interne Platzhalter sind sichtbar für Patienten und Google – ohne Abschalter**
- Wo: 21 × `<Placeholder internal>` in zehn Dateien (`FAQ.jsx`, `BodyNavigator.jsx:439`, `ArticlePage.jsx`, `GesundheitszielePage.jsx`, `KnochendichtePage.jsx:221–225`, `KoerperanalysePage.jsx:198–205`, `MammographiePage.jsx`, `SpezialroentgenPage.jsx`, `goals/AbnehmenPage.jsx`, `goals/SportPage.jsx`).
- Beleg: `dist/roentgen-graz/index.html` enthält „Interner Platzhalter“ statisch; der Körperanalyse-Hero zeigt öffentlich „Konfiguration Buchung: Die Körperanalyse ist in MiraNext noch nicht als Untersuchung angelegt …“. Es gibt keine Build-Variable, die Staging und Live unterscheidet; beim Domain-Umzug gehen die Texte 1:1 mit.
- Vorschlag: `Placeholder` mit `internal` rendert nur, wenn `import.meta.env.VITE_INTERNAL_NOTES === '1'`; lokal und auf dem github.io-Staging per `.env.staging` an, im Release-Build aus. Node-Smoke-Test nach dem Build: kein „Interner Platzhalter“ in `dist/**/*.html` und keiner im JS-Bundle. Die Texte bleiben im Code als Dokumentation. Aufwand S. Risiko: E2E-Tests, die Platzhalter zählen (`e2e_site.py:153`, `e2e_mammographie.py:99`), müssen die Variable kennen.

**P2-5 Neue Seite = fünf Stellen (fragile Kopplung der Routen)**
- Wo: `src/App.jsx:13–37, 97–134` (Lazy-Import und `<Route>`), `src/data/routes.js` (Meta), `src/entry-server.jsx:17–24` (`PAGES` für das Vorrendern), `src/components/SchemaMarkup.jsx:60–70` (`PATH_TO_FAQ`), `src/data/navigation.js` (Menü).
- Beleg: Drift bereits vorhanden: `routes.js:3` verweist auf `scripts/prerender.mjs` (gibt es nicht, heißt `postbuild.mjs`); FAQ-Zuordnung existiert zweimal (Seite wählt `faqData.x`, Schema wählt `PATH_TO_FAQ[path]`) und wird nur per E2E synchron gehalten.
- Vorschlag: `routes.js` bekommt je Route `component: () => import('../pages/X')`, `faq: 'roentgen'`, `prerender: true`. `App.jsx` erzeugt die `<Route>`s aus der Tabelle, `entry-server.jsx` importiert die Komponenten der `prerender`-Routen daraus, `SchemaMarkup` liest `route.faq`, die Seiten rendern `<FAQ items={faqData[route.faq]}>` über einen kleinen `useRouteFaq()`-Hook. Aufwand M. Risiko: mittel, weil zentral – die Endkontrolle prüft alle Routen automatisch.

**P2-6 Doppelte Stammdaten: `services.js` gegen `examinations.js` gegen `navigation.js`, Fotos doppelt**
- Wo: `src/data/services.js:68–109` und `src/data/examinations.js:44–85` führen für Röntgen, Ultraschall, Spezialröntgen und DVT jeweils Pfad, Titel, Kurztext und `onlineBooking`; `src/data/navigation.js:3–8` nochmals Namen und Pfade. `src/data/healthGoals.js:49–68` (`GOAL_IMAGES`) und `src/data/ratgeber.js:70–74` (`PHOTOS`) beschreiben dieselben drei Fotos.
- Beleg: Node-Vergleich heute noch gleich (`onlineBooking` und Pfade stimmen überein) – P1-3 ist das erste Drift-Symptom derselben Bauart.
- Vorschlag: `AREAS` aus `services` ableiten (`...services.roentgen`) oder umgekehrt; `OTHER_EXAMS = AREA_ORDER.map(...)`; Fotos nach `src/data/photos.js`. Node-Test: Pfade und Titel identisch. Aufwand S–M. Risiko: gering.

**P2-7 Dieselben Textbausteine in vier Dateien, Bild-Helfer in neun, Öffnungszeiten-Format in fünf**
- Wo: `src/components/goals/GoalParts.jsx:45–62` exportiert `H3`, `P`, `Bullets`, `textLink`, `NewWindow`; `src/pages/KoerperanalysePage.jsx:34–54`, `src/pages/KnochendichtePage.jsx:37–56` und `src/pages/MammographiePage.jsx:31–48` definieren sie erneut mit kleinen Abweichungen (`Bullets` mit/ohne `cols`, andere `key`-Logik). `srcSet`-Helfer in `ServiceLayout.jsx`, `GoalParts.jsx`, `ArticleParts.jsx`, `Home.jsx`, `KalmarPage.jsx`, `KnochendichtePage.jsx`, `KoerperanalysePage.jsx`, `PhlebographiePage.jsx`, `RieglerPage.jsx`. Öffnungszeiten-Formatierung: `Header.jsx:280`, `CTASection.jsx:24`, `GoalParts.jsx:229`, `Home.jsx:47`, `WeitereUntersuchungenPage.jsx:19`. `listDE`: `dexa.js:61` und `Home.jsx:48`.
- Vorschlag: `components/ui/Text.jsx` (H3, P, Bullets, NewWindow, textLink, linkRow), `components/ui/Picture.jsx` (Name → `src`, `srcSet`, `sizes`, `width`, `height`, `loading`), `practice.js` → `OPENING_HOURS_SHORT`, `lib/text.js` → `listDE`. Aufwand M. Risiko: gering, rein mechanisch; Sichtbares deckt die E2E ab.

**P2-8 Tests: nur Browser-Schwergewicht, nichts in CI, keine Unit-Tests, Lint übersieht ungenutzte Importe**
- Wo: `package.json:12` (`npm test` = zehn Playwright-Skripte, Voraussetzung manuell `npm run build` und `vite preview`, nirgends dokumentiert), `.github/workflows/deploy.yml:30–34` (nur `npm ci` und `npm run build`, kein Lint, kein Test), `eslint.config.js:27` (`varsIgnorePattern: '^[A-Z_]'` ignoriert jeden ungenutzten Komponenten- oder Icon-Import).
- Beleg: `npx eslint . --max-warnings 0` ist grün, obwohl `KalmarPage.jsx:3` `Calendar`, `Mail`, `Phone`, `MapPin` und `RieglerPage.jsx:3` `Calendar`, `Mail`, `Phone`, `Globe`, `Clock` ungenutzt importieren. Datenlogik (`searchTerms`, `normalize`, `findRoute`, `isActive`, `faqSchemaItems`, `postbuild`-Ausgabe) hat keinen schnellen Test; die Datenabweichung P1-3 wäre mit einer Zeile Test aufgefallen.
- Vorschlag: `tests/unit/*.test.mjs` mit `node --test` (unter 2 s, ohne npm-Abhängigkeit): Dateninvarianten (P1-3, P2-6), Routen eindeutig und Titel ≤ 70 Zeichen, Suche (Treffer für HWS, Thorax, Calcaneus, kein Treffer für Unsinn), `postbuild`-Smoke gegen `dist` (Sitemap = indexierbare Routen, Weiterleitungen vorhanden, Anzahl vorgerenderter Seiten, kein „Interner Platzhalter“ im Release). CI-Schritte `npm run lint` und `node --test tests/unit` vor dem Build. `varsIgnorePattern` auf `^_` begrenzen und die toten Importe entfernen. Aufwand M. Risiko: keines.

**P2-9 `optimize-images.js` überschreibt AVIF-Vorlagen verlustbehaftet, Cache hängt an Dateizeiten, läuft in CI**
- Wo: `scripts/optimize-images.js:38` (Desktop-Ziel = Eingabedatei bei `.avif`), `:82–86` (Neucodierung mit Qualität 50 in dieselbe Datei), `:44–65` (Überspringen nur, wenn alle Varianten jünger als die Vorlage sind), `package.json:8` (`prebuild`, also auch in GitHub Actions), `package.json:21` (`sharp` als Laufzeit-Abhängigkeit, 30 MB nativ).
- Beleg: Fehlt eine Variante oder liegen die Dateizeiten nach einem Checkout falsch, wird die Vorlage neu codiert – jede Runde verliert Qualität (Generationsverlust), und `git status` zeigt geänderte Binärdateien.
- Vorschlag: Vorlagen nach `assets-src/` (jpg/png/avif), Ausgabe nur nach `public/assets/images`, nie in-place; Überspringen per Inhalts-Hash-Manifest (`public/assets/images/manifest.json`); `sharp` nach `devDependencies`; `prebuild` entfernen, Erzeugung als `npm run images` lokal, Ergebnis eingecheckt. Aufwand M. Risiko: Build-Zeit sinkt, keine Verhaltensänderung.

**P2-10 Kein JSON-LD im statischen HTML**
- Wo: `src/components/SchemaMarkup.jsx:174–198` (alle Schemata erst im `useEffect`).
- Beleg: `dist/weitere-untersuchungen/index.html`, `dist/roentgen-graz/index.html`, `dist/mammographie-graz/index.html` enthalten 0 × `application/ld+json`. Google rendert JavaScript, Bing und Link-Vorschau-Dienste nur teilweise.
- Vorschlag: Die Schema-Erzeugung aus `SchemaMarkup.jsx` in eine DOM-freie Funktion `schemasFor(route)` (`src/data/schema.js`) auslegen; `postbuild.mjs` schreibt sie je Route in den `<head>`; der Client ersetzt sie nur bei Routenwechsel. Aufwand M. Risiko: gering; `e2e_endkontrolle.py` prüft JSON-LD je Route weiter.

**P2-11 Weiterleitungen doppelt gepflegt: statisch mit Anker, in der App ohne**
- Wo: `scripts/postbuild.mjs:89–107` (Tabelle `legacy`, z. B. `…/lungenroentgen` → `/roentgen-graz#lunge-brustkorb`) gegen `src/App.jsx:104–116` (`<Navigate>`-Routen; `:107` leitet `…/digitales-roentgen/*` ohne Anker um).
- Vorschlag: `LEGACY_REDIRECTS` in `routes.js`; `postbuild` und `App` lesen dieselbe Tabelle (App: eine Route pro Eintrag mit `Navigate to={ziel}`). Aufwand S. Risiko: keines.

**P2-12 `framer-motion` nur für zwei Teamseiten (36 KB gzip Chunk), Teamseiten im alten Design**
- Wo: `src/pages/KalmarPage.jsx:2`, `src/pages/RieglerPage.jsx:2`; `vite.config.js:19` (eigener `motion`-Chunk); `dist/assets/motion-*.js` 109 KB roh, 36 KB gzip. Beide Seiten nutzen `glass`, `font-black`, Literalfarbe `#8B2323`, eigene Brotkrumen ohne `BreadcrumbList` (keine `crumb` in `routes.js:154–167`), kein `Hero`/`Section`/`Card`.
- Vorschlag: Teamseiten auf das Designsystem umstellen (Hero mit Foto, Section, Card), Animationen über die vorhandenen CSS-Klassen (`index.css:159–211`), `framer-motion` entfernen (`package.json:16`, `vite.config.js:19`). Aufwand M. Risiko: Optik; `e2e_site.py` prüft Titel, H1, Publikationen.

**P2-13 Gefährliches Einmal-Skript im Repo**
- Wo: `scripts/migrate-extensions.js:31–45` ersetzt in allen `src`-Dateien `.png|.jpg|.jpeg|.webp` durch `.avif`.
- Beleg: Ein versehentlicher Aufruf macht aus `import logo from '../assets/images/rak-logo-128.png'` (`Header.jsx:5`) einen Import einer nicht existierenden Datei → Build bricht; Favicon-Pfade in `index.html` ebenso.
- Vorschlag: löschen; die Git-Historie bewahrt es. Aufwand S.

**P2-14 Dark-Mode-Blitz beim Laden (kein Inline-Skript)**
- Wo: `src/App.jsx:54–56` setzt die `dark`-Klasse erst im Effekt; `index.html:23` erzwingt weißen Hintergrund.
- Beleg: Nutzer mit Dunkelmodus sehen bei jedem Seitenaufruf zuerst weiß. Zudem ist die unterschiedliche `dark`-Klasse der Grund, warum man auf Hydration verzichtet hat (P2-1).
- Vorschlag: Vier Zeilen Inline-Skript im `<head>` von `index.html` (`try { … localStorage.theme … matchMedia … classList.add('dark') } catch {}`), `App` liest denselben Startwert. Aufwand S. Risiko: keines. Erledigt zusammen mit P2-1.

### P3 – Kosmetik, Hygiene, Kleinigkeiten

**P3-1 Totes Material im Repo:** `GoogleAppsScript_Backend.js` (Backend der entfernten Terminanfrage, Commit `0a740d7`, enthält eine Spreadsheet-ID), `vercel.json` (Vercel-Rewrites, Hosting ist GitHub Pages), `src/logo.svg` (unreferenziert), `schönephlebo/` (drei PNG, 9,4 MB, unreferenziert), `scripts/verify_impressum_build.py` und das untrackte `scripts/verify_impressum_live.py` (Einmal-Prüfungen für einen alten Commit). Vorschlag: löschen bzw. nach `docs/archiv/`. S.

**P3-2 Unreferenzierte Bilder und aufgeblähter SSR-Build:** 11 von 38 Basisbildern (1,3 MB) sind nirgends referenziert (`about-team`, `dvt_v3`, `glass-bg`, `hero-clinic`, `hero-home-2025`, `hero-slide-3`, `hero-slide-4`, `hero_building`, `knochendichte_v2`, `phlebographie_v3`, `roentgen_v3`) und werden in `dist` und `dist-ssr` kopiert; `dist-ssr` (45 MB) enthält die komplette `public`-Kopie inklusive 41 MB Publikations-PDFs. Vorschlag: für den SSR-Build `--outDir dist-ssr` mit `build.copyPublicDir=false` (eigene `vite.config.ssr.js` oder Umgebungsvariable), Bilder nach Bestätigung löschen. S.

**P3-3 Harte Kontaktdaten außerhalb `practice.js`:** `ImpressumPage.jsx:45–47` (Telefon, Fax, E-Mail), `DatenschutzPage.jsx:28–29`; ein Fax gibt es zentral gar nicht. `faqData.js:316` nennt die Telefonnummer im ungenutzten Set `lungenroentgen`; `faqData.js:354` (`mammascreening`, ungenutzt) sagt „ab 74 Jahren“, `screening.js:20` „ab 75 Jahren“. Vorschlag: `FAX` in `practice.js`, Seiten importieren; ungenutzte FAQ-Sets entweder an `screening.js` koppeln oder entfernen. S.

**P3-4 Veraltete Dokumentation:** `README.md` nennt eine CAS-med-Terminvergabe und verschweigt Build-Schritte, Vorrendern und Tests; `routes.js:3` (`prerender.mjs`); `tests/e2e_faq_sync.py:13` (alter Skriptpfad); `tests/e2e_weitere_untersuchungen.py:150` liest ein nie existierendes `dist-ssr/terms.json`. Vorschlag: README mit Abschnitten Entwicklung, Build, Tests (Voraussetzung Preview), Deploy, Domain-Umzug. S.

**P3-5 Sitemap-`lastmod` = Build-Datum:** `scripts/postbuild.mjs:132–136` setzt für alle Nicht-Artikel das heutige Datum; jeder Deploy „ändert“ damit 25 Seiten, Google gewichtet `lastmod` dann weniger. Vorschlag: `lastmod` je Route aus `git log -1 --format=%cs -- <Seitendatei> <Datendateien>` oder manuell in `routes.js`. S.

**P3-6 E2E-Skripte schreiben Screenshots nach `/tmp`:** `e2e_site.py:121–152`, `e2e_mammographie.py:69`, `e2e_knochendichte.py:80`, `e2e_koerperanalyse.py:94` – entgegen Peters Regel; die neueren Suiten schreiben nach `~/Documents/Hermes-Berichte/Homepage-Tests`. Vorschlag: gemeinsamer Pfad in einer `tests/_paths.py`. S.

**P3-7 Header-Höhe als Zahlen in CSS:** `index.css:50, 90–95` (`--header-height` 176/130/70 px) müssen zur echten Header-Höhe passen; `scroll-padding-top` und die klebenden Seitenleisten (`ServiceLayout.jsx:110`, `KnochendichtePage.jsx:178`) hängen daran. Eine Änderung am Header verschiebt Anker still. Vorschlag: `ResizeObserver` im Header setzt die Variable, oder ein Test vergleicht die Werte mit der gemessenen Höhe. S.

**P3-8 SVG-IDs im DEXA-Schema:** `DexaScanFigure.jsx:95` (`uid = dexa-${mode}`) – zwei Figuren desselben Modus auf einer Seite ergäben doppelte `clipPath`-IDs. `useId` nutzen. S.

**P3-9 Sortierung im Ratgeber:** `RatgeberPage.jsx:14–18` – der Komparator ist für zwei Artikel ohne Datum nicht konsistent (beide liefern −1). Heute nur ein Platzhalter-Artikel. S.

**P3-10 Globale Fokus-Rundung und Header-Blur:** `index.css:78–82` setzt `border-radius: 6px` auf jedes `:focus-visible`-Element (ändert die Form von Elementen ohne eigene Tailwind-Rundung); `Header.jsx:273` nutzt `backdrop-blur-sm` bei 95 % Deckkraft – auf iPhones GPU-Last beim Scrollen für einen kaum sichtbaren Effekt. S.

**P3-11 Interne Notizen im öffentlichen Bundle:** `review`-Felder in `faqData.js`, `BODY.device` (`bodyComposition.js:13`, „nur intern“), Kommentare zu MiraNext – alles lesbar im JS. Kein Datenschutzproblem (das Repo ist ohnehin öffentlich), aber Praxis-Interna. Vorschlag: Felder beim Build entfernen (kleines Vite-Plugin) oder in eine nicht importierte `*.notes.js`. S.

**P3-12 Alte Vorlage `ServiceLayout` nur noch für die Phlebographie:** `src/components/ServiceLayout.jsx` wird allein von `PhlebographiePage.jsx` genutzt; die Seite selbst ist im alten Stil (`font-[Outfit]`, `bg-[#000]`, drei Bilder `loading="eager"`, `sizes="33vw"` auch am Desktop). Vorschlag: Phlebographie auf Hero/Section umstellen und `ServiceLayout` entfernen. M.

**P3-13 Schriften ohne Preload:** `index.css:3–34` lädt vier Font-Dateien mit `font-display: swap`; die beiden Latin-Dateien (48 + 32 KB) werden erst nach dem CSS entdeckt → sichtbarer Schriftwechsel (FOUT). Vorschlag: zwei `<link rel="preload" as="font">` in `index.html` für die Latin-Dateien. S.

**P3-14 Zwei Kopien der Weiterleitungstabelle:** siehe P2-11 – zusätzlich bleiben die `<Navigate>`-Routen in `App.jsx:104–116` ohne Test. S.

**P3-15 Abhängigkeiten:** `lucide-react 0.344` (Februar 2024) und `@types/react*` in einem reinen JS-Projekt; kein `npm audit` im Prozess. Vorschlag: vierteljährlicher Update-Lauf mit E2E, `@types` entfernen. S.

## Umbauplan – kleine, einzeln testbare Schritte

Reihenfolge so gewählt, dass jeder Schritt allein deploybar ist und die Tests davor grün bleiben. Jeder Schritt = ein Commit mit Test, dann Push.

0. **Test-Gerüst (P2-8, Teil 1).** `tests/unit/` mit `node --test`: Dateninvarianten, Routen, Suche, `postbuild`-Smoke gegen `dist`. CI: Lint + Unit-Tests vor dem Build. Test: `node --test tests/unit` grün, Workflow grün.
1. **P1-1 Chunk-Fehler abfangen.** `vite:preloadError` → Reload; `ErrorBoundary` um `<Routes>`. Test: Unit-Test für die Boundary (wirft → Fallback mit Telefonnummer); E2E `e2e_site.py` unverändert grün.
2. **P1-2 Sicheres Lesen des Themes.** `lib/storage.js` mit `try/catch`. Test: Unit-Test mit geworfenem `localStorage`-Zugriff → App-Startwert `false`.
3. **P1-3 Dauer aus einer Quelle.** `services.js` → `BODY.durationMinutes`. Test: Unit-Test Gleichheit; `e2e_koerperanalyse.py` grün.
4. **P1-4 Teamfotos.** Nach Peters Bestätigung `src/data/team.js`, Dateien umbenennen, Schema = sichtbares Bild. Test: Unit-Test „Schema-Bild = sichtbares Bild“; `e2e_site.py` (Teamseiten) grün.
5. **P2-4 Interne Platzhalter schaltbar.** `VITE_INTERNAL_NOTES`; Smoke-Test „kein interner Platzhalter im Release-Build“. Test: beide Build-Varianten.
6. **P2-2 + P2-3 Scroll- und Fokusverhalten.** `ScrollToHash` → `RouteEffects` (PUSH/POP, Mount, Anker-Suche, Fokus auf `#main`). Test: `e2e_weitere_untersuchungen.py` (Anker) und `e2e_site.py` grün; neuer Browser-Check „Zurück behält Position“ als kurzes Skript.
7. **P2-14 + P2-1 Dark-Inline-Skript und Hydration der vorgerenderten Seiten.** Test: `e2e_animationen.py` (Dunkelmodus) und `e2e_endkontrolle.py` (keine Konsolenfehler, also keine Hydration-Warnungen) grün.
8. **P2-5 + P2-11 zentrale Routentabelle inklusive Weiterleitungen.** Test: `e2e_endkontrolle.py` (alle Routen), `e2e_faq_sync.py` (FAQ sichtbar = Schema), Unit-Test Weiterleitungen.
9. **P2-6 Stammdaten entdoppeln.** Test: Unit-Test Gleichheit, `e2e_weitere_untersuchungen.py` grün.
10. **P2-7 Bausteine zusammenführen.** Test: `e2e_knochendichte.py`, `e2e_koerperanalyse.py`, `e2e_mammographie.py`, `e2e_gesundheitsziele.py` grün (Pflichtsätze unverändert).
11. **P2-10 JSON-LD statisch.** Test: Smoke-Test „jede HTML-Datei hat MedicalBusiness-Schema“, `e2e_endkontrolle.py` grün.
12. **P2-9 Bildpipeline.** Test: Build ohne `prebuild` identisch (Datei-Hashes der Bilder unverändert), `e2e_endkontrolle.py` Bildgrößen grün.
13. **P2-12 Teamseiten ohne `framer-motion`.** Test: `e2e_site.py` Teamseiten, axe hell/dunkel; `dist/assets` ohne `motion`-Chunk.
14. **P2-13 + P3-1 Aufräumen.** Test: Lint, Build, `e2e_site.py` grün.
15. **P3 nach Bedarf** (README, Sitemap-`lastmod`, Screenshot-Pfade, Header-Höhe, Fonts-Preload, `ServiceLayout`).

## Offene Browser-Checks (nicht ausgeführt, Leicht-Spur)

1. **Stale-Chunk-Szenario (P1-1):** `npm run build`, Preview starten, Startseite laden, erneut bauen (anderer Hash) → in der offenen Seite „Knochendichte“ klicken → erwartet heute: weißer Bildschirm; nach Schritt 1: Reload bzw. Fehlerseite.
2. **Erstaufruf mit Anker (P2-2c):** `/roentgen-graz#lunge-brustkorb` bei gedrosseltem Netz („Slow 3G“, leerer Cache) → steht die Gruppe „Lunge und Brustkorb“ im Bild?
3. **Blinken der vorgerenderten Seiten (P2-1):** `/roentgen-graz` bei Drosselung filmen (Playwright-Trace) → verschwindet der Inhalt zwischen JS-Start und Chunk-Ankunft? Lighthouse-CLS vorher/nachher.
4. **Zurück-Taste (P2-2a):** Startseite → ganz nach unten → „Knochendichte“ → Zurück → Position?
5. **iPhone mit „Alle Cookies blockieren“ (P1-2):** echtes Gerät; erwartet heute: nur Grundgerüst.

## Vorgehen und Belege

- Gelesen: alle 112 getrackten Quelldateien außer Binärdaten (Seiten, Komponenten, Daten, Skripte, Tests, Workflow, Konfiguration).
- `npx eslint . --max-warnings 0`: Exit 0.
- Node-Lauf über `services.js`, `bodyComposition.js`, `routes.js`, `referralTerms.js`, `navigation.js`, `examinations.js`: Dauer 15/20 (P1-3), 30 Routen ohne Duplikate, 8 Seitentitel über 60 Zeichen (alle ≤ 70), Suche liefert für „Ferse“, „ct“, „knie“, „zahn“ sinnvolle Treffer, `AREAS`/`services` heute deckungsgleich.
- Bildprüfung: sechs AVIF-Dateien per `sharp` nach PNG gewandelt und angesehen (P1-4). Temporäre Dateien gelöscht.
- Build-Ausgabe (`dist`, Stand 04.10.): JS gesamt 739 KB roh, 246 KB gzip; größte Dateien vendor 57 KB, index 46 KB, motion 36 KB gzip; vorgerenderte HTML-Dateien ohne JSON-LD, `roentgen-graz` mit internem Platzhalter.
- Live: `cache-control: max-age=600` für HTML und Assets; Live-`index.html` verweist auf denselben Chunk wie das lokale `dist`; die Ziel-Domain `www.xn--rntgen-am-kai-imb.at` liefert für `/koerperanalyse-graz` noch 404 (Umzug steht aus – Canonicals zeigen bereits dorthin, das ist gewollt).
- Git: 23 Commits in 30 Tagen auf `main`, jeder ein Deploy.
