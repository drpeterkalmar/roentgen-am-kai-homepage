# Website-Audit Röntgen am Kai

Stand: 12.10.2026 · Geprüft: lokaler Produktions-Build (Commit `5a12f16`, identisch mit dem Live-Stand auf GitHub Pages) · Grundlage: `docs/design-grundlagen.md`

In diesem Schritt wurde **kein Code geändert**. Medizinische Aussagen, Kasseninformationen, Preise, Kontaktdaten und Buchungslinks werden hier nur bewertet; Änderungsvorschläge dazu sind als „mit der Praxis klären“ markiert.

## 1. Methode

- **Alle 31 öffentlich erreichbaren Routen** aus `src/data/routes.js` (Sitemap-Stand), je in **Desktop 1440 × 900** und **Smartphone 390 × 844** (Playwright, Chromium, „Bewegung reduzieren“ aktiv, damit Momentaufnahmen stabil sind).
- **Erfasst je Seite:** Überschriften, Wortzahl im Hauptinhalt, Textblöcke und längster Block, geschätzte Zeichen pro Zeile, alle Bilder (Datei, Alt-Text, Größe, `loading`, `srcset`, erster Bildschirm), Bild- und Text-Platzhalter, Videos und Grafiken, Raster (Spalten, Anzahl, Höhenunterschiede), Buchungs- und Telefonlinks, Sichtbarkeit von CTA und Telefon im ersten Bildschirm, Seitenlänge in Bildschirmhöhen, seitliches Scrollen, JavaScript-Fehler.
- **Sichtprüfung:** Screenshots des ersten Bildschirms (Desktop und Handy) für alle Seiten, ganze Seite am Desktop. Die wichtigsten Seiten wurden zusätzlich als Kontaktbögen visuell bewertet. Befunde der Bildanalyse wurden vor der Übernahme per DOM-Messung geprüft.
- **Leistung und Technik:** Lighthouse 1 Lauf je Seite und Formfaktor für 13 Kernseiten (Labordaten, gedrosseltes Mobilprofil).
- **Rohdaten und Screenshots:** `~/Documents/Hermes-Berichte/Homepage-Tests/website-audit/` (`inventur.json`, `*-erster-bildschirm.png`, `desktop-*-ganz.png`).

## 2. Bestandsaufnahme

### 2.1 Seitentypen

| Typ | Seiten | Anzahl |
|---|---|---|
| Startseite | `/` | 1 |
| Leistungsseite groß | Mammographie, Knochendichte, Körperanalyse | 3 |
| Leistungsseite klein | Röntgen, Ultraschall, Spezialröntgen, Phlebographie (Detail), Zahnröntgen/DVT | 5 |
| Übersicht | Weitere Untersuchungen, Gesundheitsziele, Ratgeber | 3 |
| Themen-/Zielgruppenseite | 6 Gesundheitsziele + RED-S (Spezialseite, nicht im Menü) | 7 |
| Ratgeber-Artikel | 7 (davon 1 Platzhalter-Artikel, `noindex`) | 7 |
| Kontakt, Team | Kontakt, Dr. Kalmar, Dr. Riegler | 3 |
| Rechtliches | Impressum, Datenschutz | 2 |

### 2.2 Inventur je Seite (Desktop)

W = Wörter im Hauptinhalt · Bs = Seitenlänge in Bildschirmhöhen (Desktop / Handy) · Fotos = echte Fotos außerhalb der Befund-Slider · Ph = sichtbare Bildplatzhalter · Gelb = sichtbare Text-Platzhalter · CTA = Buchungslinks im Inhalt · FAQ = Fragen

| Seite | W | Bs | H2 | Fotos | Ph | Grafik/Film | Gelb | CTA | FAQ |
|---|---|---|---|---|---|---|---|---|---|
| Startseite | 736 | 7,9 / 16,6 | 8 | 6 (Eingang, KI-Mammogerät, DEXA-Raum, Wartebereich, Team, Karte) + QR | 1 | – | 0 | 3 | – |
| Mammographie | 872 | 8,7 / 14,9 | 11 | 1 (KI-Mammogerät) | 3 | – | 0 | 3 | 13 |
| Knochendichte | 2.018 | 16,7 / 29,2 | 11 | 1 (DEXA-Raum) | 2 | Messschema, Befund-Slider (6 Folien) | 0 | 4 | 16 |
| Körperanalyse | 1.730 | 15,3 / 28,2 | 11 | 1 (DEXA-Raum, wie Knochendichte) | 1 | Erklärfilm, Befund-Slider (6 Folien) | 0 | 10 | 14 |
| Weitere Untersuchungen | 401 | 4,3 / 8,2 | 5 | 0 | 0 | – | 1 | 2 | – |
| Röntgen | 1.038 | 8,3 / 16,1 | 8 | 0 | 0 | Körpernavigator, Zuweisungssuche | 2 | 2 | 5 |
| Ultraschall | 418 | 4,6 / 8,1 | 5 | 0 | 0 | – | 1 | 0 | 4 |
| Spezialröntgen | 785 | 5,9 / 11,6 | 4 | 0 | 0 | – | 0 | 0 | – |
| Phlebographie | 294 | 4,1 / 7,1 | 6 | 3 (Bein-Aufnahmen) | 0 | – | 0 | 0 | 4 |
| Zahnröntgen/DVT | 421 | 4,4 / 8,3 | 5 | 0 | 0 | – | 2 | 0 | 3 |
| Gesundheitsziele (Hub) | 673 | 5,7 / 12,8 | 5 | 3 | 3 | – | 2 | 4 | – |
| 6 Zielseiten + RED-S | 403–666 | 4,8–5,8 / 8,9–11,1 | 5–7 | 0–1 | 0–1 | – | je 2 | 2–6 | – |
| Ratgeber (Übersicht) | 361 | 3,8 / 8,1 | 2 | 5 (Wiederholungen) | 2 | – | 0 | 1 | – |
| 7 Artikel | 198–1.681 | 3,3–11,4 / 5,1–19,5 | 1–11 | 0–1 | 0–1 | Tabelle (Sarkopenie) | 0–3 | 2–3 | 0–8 |
| Kontakt | 212 | 3,5 / 6,2 | 8 | Lageplan, QR | 0 | – | 4 | 2 | – |
| Team (2) | 446 / 708 | 5,2–5,8 | 2 | 1 Porträt | 0 | – | 0 | 0 | – |
| Impressum / Datenschutz | 219 / 409 | ≈ 3 | 6–7 | – | – | – | 0 | – | – |

**Gemeinsame Elemente:** Kopfzeile (Kassen, Zeiten, Telefon, Hell/Dunkel, Kontrast), Logo mit „Termin online buchen“, Hauptmenü mit 8 Punkten, Brotkrumen, Hero, Abschnitte mit `Section`, Karten (`Card`), Schluss-CTA, Fußzeile. Am Handy eine feste Leiste „Termin buchen · Anrufen · Anfahrt“.

**Bewegung und Interaktion heute:** Seitenwechsel-Blende, FAQ-Akkordeon, Karten-Hover, Menü-Animationen, DEXA-Messschema (Knochendichte, Schleife mit Anhalten), Erklärfilm (Körperanalyse, stumm, Anhalten), zwei Befund-Slider mit Hotspots, Zoom und Vollbild, Röntgen-Körpernavigator und Zuweisungssuche, Risikocheck Osteoporose, Kategorie-Filter im Ratgeber, Farbschimmer im Startseiten-Hero. Alles respektiert „Bewegung reduzieren“.

### 2.3 Technik, Barrierefreiheit, Ladezeit (gemessen)

| Prüfung | Ergebnis |
|---|---|
| Lighthouse Barrierefreiheit / Best Practices / SEO | 100 / 100 / 100 auf allen 13 Kernseiten, Desktop und Mobil |
| Lighthouse Leistung | Desktop 100 überall; Mobil 93–97 |
| LCP mobil (Labor, gedrosselt) | 2,4–3,1 s; **über 2,5 s** bei Startseite (2,9), Mammographie (2,7), Knochendichte (3,0), Körperanalyse (3,1), Röntgen (2,8), Sarkopenie-Seiten (2,7–2,8), Ratgeber (2,6), Gesundheitsziele (2,9) |
| CLS | 0 auf allen gemessenen Seiten |
| Seitengewicht | 246–346 KB (Lighthouse, inkl. Schriften) |
| Seitliches Scrollen | keines (390 px, alle Seiten) |
| JavaScript-Fehler | keine |
| Bilder | alle mit `srcset`/`sizes`, Hero `eager` + `fetchpriority="high"`, Rest `lazy` |
| Externe Hosts, Tracker | keine |

## 3. Bewertung je Seite

Bewertet nach den elf Kriterien des Auftrags. Kurzform: **+** gut, **–** Problem.

### 3.1 Startseite

- **Erster Eindruck / Hauptaussage:** + H1 „Moderne Radiologie in Graz – rasch, persönlich und präzise“, Angebotszeile, „Alle Kassen und privat“, CTA und Telefon sind auf beiden Formaten im ersten Bildschirm. – Der Claim „rasch, persönlich und präzise“ ist austauschbar; die konkreten Vorteile (ohne Zuweisung zur Mammographie, Röntgen ohne Termin) stehen erst weiter unten.
- **Hierarchie / Blickführung:** + H1 → Angebot → zwei Buttons → Kontakt. – Am Desktop endet der Hero früh; darunter steht die Überzeile „Unsere Schwerpunkte“ allein am unteren Rand des ersten Bildschirms.
- **Bilder:** 6 Fotos, Funktion überwiegend klar (Eingang = Orientierung, Team = Vertrauen). – Das Gerätebild der Mammographie-Karte ist KI-generiert (gekennzeichnet); die Körperanalyse-Karte zeigt einen Bildplatzhalter; die Knochendichte-Karte nutzt dasselbe DEXA-Foto wie zwei Leistungsseiten. Das Hero-Foto (Glasfassade) ist sachlich, zeigt aber keine Menschen.
- **Texte:** + kurze Blöcke (max. 41 Wörter). – Ein Hinweistext in der Mammographie-Karte läuft am Desktop über ~136 Zeichen pro Zeile.
- **Abschnitte:** Schwerpunkte → Weitere Untersuchungen → Gesundheitsziele → Ablauf → Portal → Vertrauen → Anfahrt → CTA. Sinnvoll; am Handy aber 16,6 Bildschirmhöhen lang.
- **Kacheln:** 3 / 4 / 6 / 4 / 3 / 3 Spalten, volle Reihen. – Die 6 Karten „Was möchten Sie erreichen?“ sind unterschiedlich hoch (312–428 px).
- **Terminbuchung:** + Header, Hero, Schwerpunkt-Karten, Schluss-CTA, Handy-Leiste.
- **Vertrauen:** + echte Fotos von Team und Eingang, Kassenhinweis, ELGA/Portal. – keine Ärztenamen im ersten Bildschirm.
- **Mobil / Barrierefreiheit / Ladezeit:** + kein Überlauf, A11y 100. – LCP mobil 2,9 s.
- **Doppelt / unnötig:** Öffnungszeiten stehen in Kopfzeile, Hero und Anfahrt-Abschnitt.

### 3.2 Mammographie (`/mammographie-graz`)

- **Erster Eindruck:** + Die Bedingung „Ohne Zuweisung · mit e-card · alle 2 Jahre“ steht direkt unter der H1, CTA und Telefon sind sichtbar.
- **Bilder:** – Nur ein Foto, und das ist KI-generiert (gekennzeichnet, auf Wunsch der Praxis behalten). Drei große Bildplatzhalter (Raum, Betreuung, Empfang) dominieren drei Abschnitte. Es gibt **kein echtes Foto des Mammographiegeräts** der Praxis.
- **Texte:** + max. 46 Wörter je Block. – Einige Absätze in Hinweis-Kästen laufen über ~116 Zeichen pro Zeile (Desktop).
- **Abschnitte:** Brustkrebsvorsorge → Was ist → Screening/diagnostisch → Beschwerden → Ablauf → Vorbereitung → Brustultraschall → Dichtes Gewebe → FAQ → Praxis/Anfahrt → CTA. Logisch. – Kein Abschnitt „Quellen“ und kein Prüfvermerk, obwohl die Seite medizinische Programmregeln erklärt.
- **Kacheln:** keine Raster mit ≥ 3 Karten; Inhalte als Fließtext und Karten paarweise. Passt.
- **Termin:** + 3 Buchungslinks, Telefon.
- **Vertrauen:** + offizielles Programm verlinkt, Serviceline. – KI-Bild am Hauptgerät schwächt die Glaubwürdigkeit (Bildanalyse und Forschung Q1 stimmen überein).
- **Technik:** LCP mobil 2,7 s.

### 3.3 Knochendichte (`/knochendichtemessung-graz`)

- **Erster Eindruck:** + H1, Preis-Chip „ÖGK 70 Euro“, CTA, Kombi-Hinweis Mammographie, Telefon.
- **Bilder:** + echtes DEXA-Foto im Hero. – Weitwinkel, überbelichtete Fenster, keine Person. Zwei Bildplatzhalter (Raum, Untersuchungssituation).
- **Texte und Länge:** – Mit **2.018 Wörtern und 29 Handy-Bildschirmen** die längste Seite. T-Wert/Z-Wert werden zweimal erklärt (Abschnitt „Ergebnis: T-Score und Z-Score verständlich erklärt“ **und** Kästen beim Befund-Slider „So lesen Sie Ihren DEXA-Befund“).
- **Abschnitte:** Warum DEXA → Wann sinnvoll (+ Risikocheck) → Kosten → Mammographie + Knochen → Rho-Hinweis → Ablauf → Ergebnis T/Z → Befund lesen → FAQ → Termin/Praxis → CTA. – Ergebnis und Befund lesen sollten ein Abschnitt sein.
- **Kacheln:** + Indikationsliste zweispaltig, Linkkarten 3er/4er-Raster gleich hoch.
- **Interaktion:** + Messschema, Befund-Slider mit Vorschaubildern, Vollbild, Hotspots, FRAX-orientierter Risikocheck.
- **Vertrauen:** + Quellen (ISCD, DVO, gesundheit.gv.at), Preis und Kassenlogik zentral gepflegt.
- **Technik:** LCP mobil 3,0 s (höchster Wert neben Körperanalyse).

### 3.4 Körperanalyse (`/koerperanalyse-graz`)

- **Erster Eindruck:** – H1 mit fünf Zeilen am Desktop („Medizinische Körperanalyse in Graz – Körperfett und Muskelmasse präzise messen“), dazu eine Überzeile, die dasselbe sagt; der CTA liegt am unteren Rand des ersten Bildschirms; **kein Preis und keine Telefonnummer im Hero**.
- **Bilder:** – Hero zeigt **dasselbe DEXA-Foto wie die Knochendichte-Seite** (bekannte Übergangslösung). + Erklärfilm (Handy- und Desktop-Fassung) und Befund-Slider erklären die Messung gut. Ein Bildplatzhalter (Ganzkörpermessung).
- **Texte und Länge:** – 1.730 Wörter, 28 Handy-Bildschirme. Zwei fast gleich lautende H2 hintereinander: „Was zeigt eine medizinische Körperanalyse?“ und „Was zeigt eine DEXA-Körperanalyse?“.
- **Abschnitte:** Nutzen → Befund-Slider → Zielgruppen → Abnehmen → Training → Sarkopenie → Methodenvergleich → Ablauf (Film) → FAQ → Termin/Anfahrt → Schluss. – Die drei Zielgruppenabschnitte (Abnehmen, Training, Sarkopenie) wiederholen Inhalte der Gesundheitsziel-Seiten.
- **Kacheln:** + 3er-Raster. – Höhen schwanken leicht (241–295 px) in zwei 6er-Rastern; das 10er-Linkraster ergibt eine unvollständige letzte Reihe (3 + 3 + 3 + 1).
- **Termin:** – **10 Buchungslinks** im Inhalt; gleichrangige Wiederholungen verwässern die Führung.
- **Vertrauen:** + Quellen, fachliche Leitplanken (Magermasse ≠ Muskelkraft, keine Sarkopenie-Diagnose allein durch DEXA).
- **Technik:** LCP mobil 3,1 s (höchster Wert der Website).

### 3.5 Sarkopenie (Zielseite `/gesundheitsziele/muskelverlust-sarkopenie` und Artikel `/ratgeber/sarkopenie-muskelverlust-dexa`)

- **Zielseite:** – Im ersten Bildschirm stehen eine dreistufige Brotkrume, Überzeile, H1, ein sechszeiliger Absatz und ein fünfzeiliger Hinweis; der CTA „Muskelmasse als Teil der Abklärung messen“ liegt am Rand. **Bildplatzhalter im Hero** (ältere Person im Gespräch). Gelber Prüfvermerk „Dr. [NAME] – [DATUM]“ sichtbar. + Klare fachliche Struktur (EWGSOP2, was DEXA beiträgt und was nicht), Quellen vorhanden.
- **Artikel:** + 1.681 Wörter, gut gegliedert (11 H2), Tabelle, 8 FAQ, Quellen, kein Platzhalter. – Titelbild (DEXA-Scan am Monitor) erscheint erst am unteren Rand des ersten Bildschirms und ist identisch mit Bildern auf Ratgeber-Übersicht, Gesundheitsziel-Hub und zwei weiteren Artikeln.
- **Doppelt:** Zielseite, Artikel und Abschnitt auf der Körperanalyse-Seite behandeln dasselbe Thema. Die Rollen sind festgelegt (Artikel erklärt, Zielseite führt, Leistungsseite verkauft), die Querverweise fehlen aber teilweise im ersten Bildschirm.

### 3.6 Röntgen (`/roentgen-graz`)

- **Erster Eindruck:** + Klarste Botschaft der Website: „direkt vorbeikommen oder Wunschzeit reservieren“, grüner Hinweis „ohne vorherige Terminvereinbarung“, Zuweisung und e-card direkt darunter.
- **Bilder:** – **Kein Bild.** Rechts neben dem Hero bleibt am Desktop eine große Leerfläche. Es gibt kein echtes Foto des Röntgenraums.
- **H1:** – Am Desktop wird „vorbeikommen“ automatisch getrennt („vorbeikom-men“).
- **Texte:** + kurze Blöcke. – Hinweis-Absätze laufen über ~136 Zeichen pro Zeile.
- **Kacheln:** + Körpernavigator (42 Regionen, 2 Spalten am Desktop) und Aufnahmeliste.
- **Termin:** + zwei Wege (vorbeikommen / reservieren). – Telefon im Hero nur als Text, nicht als Button.
- **Gelb:** Röntgenzeiten und weitere Körperregionen noch von der Praxis zu bestätigen.

### 3.7 Ultraschall (`/ultraschall-graz`)

- + „Termin erforderlich“ und telefonische Buchung klar. – **Kein Bild**, rechte Hero-Hälfte leer. – **Widerspruch:** Am Handy führt die feste Leiste „Termin buchen“ und am Desktop der Kopf-Button „Termin online buchen“ ins Online-Portal, obwohl die Seite „nicht online buchbar“ sagt. – „Termin erforderlich“ steht doppelt (Hinweis und erste Karte). Gelb: Preis für Ultraschall als Privatleistung offen.

### 3.8 Spezialröntgen (`/spezialroentgen`) und Phlebographie

- + Untersuchungen in Karten, Vorbereitung je Untersuchung. – **Kein Bild** (Durchleuchtungsraum fehlt). – H1 trennt „Kontrastmittel-untersuchungen“ unglücklich. – Gleicher Widerspruch zur Online-Buchung wie bei Ultraschall. – 4 Raster mit je 2 Spalten und ungleichen Höhen (Karten mit unterschiedlich langer Vorbereitung).
- **Phlebographie:** 3 echte Bein-Aufnahmen (Bilddiagnostik, erklärend), FAQ. – Seite noch im alten Seitenlayout (`ServiceLayout`), nicht im Design der übrigen Leistungsseiten (Code-Gutachten 05.10., P3-12).

### 3.9 Zahnröntgen und 3D-DVT (`/zahnroentgen-dvt-graz`)

- + Klare H1, Hinweis „Welche Aufnahme brauche ich?“. – **Kein Bild** (DVT-Gerät fehlt; die vorhandene Datei `dvt.avif` zeigt tatsächlich den DEXA-Raum und wird zu Recht nicht verwendet). – Zwei sichtbare Platzhalter „Preis folgt“. – Online-Buchungs-Widerspruch wie bei Ultraschall.

### 3.10 Blog / Ratgeber

- **Übersicht:** + Kategorie-Filter mit Zählern, Karten mit Bild. – Erste Karte zeigt einen **Bildplatzhalter mit internem Briefing-Text**; zwei Fotos wiederholen sich mehrfach; keine Artikeltitel im ersten Bildschirm (Handy).
- **Artikel:** + einheitliche CTA-Kästen, Zielseite verlinkt. – Vier ältere Artikel sind **kurz (198–491 Wörter)** und tragen den gelben Prüfvermerk; `ratgeber/abnehmspritze-muskelverlust` ist ein Platzhalter-Artikel (`noindex`, korrekt). – Kein Autor genannt („Herausgegeben von Röntgen am Kai“) – für Gesundheitsinhalte schwächeres Vertrauenssignal.

### 3.11 Weitere Seiten (kurz)

- **Weitere Untersuchungen:** + Gliederung nach Terminlogik. – Kein CTA und keine Telefonnummer im Hero; Schreibfehler „termin erforderlich“ (klein) im Status-Hinweis; drei unterschiedlich gestaltete Statuszeilen.
- **Gesundheitsziele (Hub und Zielseiten):** + einheitliche Bausteine, Quellen. – Drei Bildplatzhalter im Hub, Platzhalter in drei Zielseiten-Heros, Prüfvermerk-Platzhalter auf allen 8 Seiten. Fließtext in Info-Kästen bis ~155 Zeichen pro Zeile.
- **Kontakt:** + Adresse, Zeiten, Lageplan, Portal-QR. – **4 gelbe Platzhalter**, darunter „Barrierefreiheit vor Ort (Lift, Rollstuhlzugang)“ – für viele Patientinnen und Patienten eine Entscheidungsfrage.
- **Team:** + echte Porträts, Publikationen. – Kein Termin-CTA; Publikationsliste ~136 Zeichen pro Zeile.
- **Impressum / Datenschutz:** + vollständig. – Datenschutz-Absätze bis 102 Wörter.

## 4. Seitenübergreifende Befunde

1. **Fehlende echte Fotos:** Röntgen, Ultraschall, Spezialröntgen, DVT und Mammographie haben kein echtes Foto des eigenen Raums oder Geräts; Knochendichte und Körperanalyse teilen ein Foto. Vorhandene, aber ungeeignete Dateien: `roentgen.avif` (Stock-MRT), `ultraschall.avif` (Stock), `koerperfett.avif` (Stock), `dvt.avif` und `mammographie.avif` (zeigen den DEXA-Raum), `mammographie_v2.avif` (vermutlich Fremdgerät). Sie werden derzeit nicht verwendet.
2. **Leere Hero-Hälfte:** Röntgen, Ultraschall, Spezialröntgen, DVT, Weitere Untersuchungen – am Desktop ~45 % leere Fläche im wichtigsten Bereich.
3. **Online-Buchung auf Telefon-Seiten:** Kopf-Button und Handy-Leiste führen überall ins Online-Portal, auch dort, wo die Seite „nicht online buchbar“ sagt.
4. **Sichtbare interne Platzhalter:** Prüfvermerk „Dr. [NAME] – [DATUM]“ auf 14 Seiten, Preise „folgt“, Kontakt-Lücken, Bildplatzhalter mit langem Briefing-Text. Für die Testphase gewollt, vor dem Domain-Umzug aber vertrauensschädigend.
5. **Ausrichtung:** Logo/Kopfzeile beginnen am Desktop 64 px weiter links als H1 und Inhalt (Kopf `max-w-7xl`, Inhalt `max-w-6xl`).
6. **Zeilenlänge:** Hinweis-Kästen und einige volle Breiten laufen über 75 Zeichen (bis ~155).
7. **Lange Leistungsseiten:** Knochendichte und Körperanalyse ≈ 29 Handy-Bildschirme, mit Doppelungen.
8. **Ungleiche Kartenhöhen** in einzelnen Rastern (Startseite „Ziele“, Spezialröntgen, Körperanalyse).
9. **LCP mobil > 2,5 s** auf den wichtigsten Seiten (Labor). CLS und Barrierefreiheit sind sehr gut.
10. **Bild-Wiederholungen:** dasselbe DEXA-Foto auf 6 Seiten, derselbe Monitor-Scan auf 5 Seiten.

## 5. Prioritätenliste

Je Empfehlung: **Problem → Änderung → Nutzen.** „Praxis“ = braucht Angaben oder Freigabe der Praxis.

### 5.1 Kritisch

| Nr. | Problem | Änderung | Nutzen |
|---|---|---|---|
| K1 | Kopf-Button und Handy-Leiste bieten „Termin (online) buchen“ auch auf Ultraschall, Spezialröntgen, Phlebographie und DVT, die nur telefonisch buchbar sind. | Auf diesen Seiten wird in der Handy-Leiste „Anrufen“ zum ersten, farbig hervorgehobenen Knopf; „Termin buchen“ entfällt dort. Der Kopf-Button bleibt (gilt für andere Leistungen), der Seiten-CTA nennt „telefonisch“. | Kein toter Buchungsweg, keine widersprüchliche Aussage. |
| K2 | Leistungsseiten ohne jedes Bild (Röntgen, Ultraschall, Spezialröntgen, DVT); rechte Hero-Hälfte leer. | Hero-Bildfeld mit nummeriertem Platzhalter (B-Nummer laut Medienkonzept) und festem Seitenverhältnis; später echtes Foto. | Einheitliches Seitenbild, sichtbarer Auftrag für das Fotoshooting, kein Layoutsprung beim Tausch. |
| K3 | Bildplatzhalter zeigen lange interne Briefing-Texte ohne Nummer; kein Bezug zu einer Fotoliste. | Platzhalter einheitlich: Nummer, kurzes Motiv, Format („B014 – DEXA-Untersuchung, Querformat 3:2“); Briefing-Details ins Medienkonzept/Fotobriefing. | Ruhigeres Erscheinungsbild, eindeutige Zuordnung für Fotograf und Praxis. |
| K4 | Prüfvermerk-Platzhalter „Dr. [NAME] – [DATUM]“ auf 14 Seiten öffentlich sichtbar. | **Praxis:** Namen und Prüfdatum je Seite liefern. Bis dahin vor dem Domain-Umzug ausblenden (Schalter im Build), in der Testphase sichtbar lassen. | Vertrauenswürdigkeit medizinischer Inhalte (E-E-A-T, ÖPGK „Transparenz über Verantwortliche“). |
| K5 | Mammographie ohne echtes Gerätefoto; das KI-Bild steht an der wichtigsten Stelle der wichtigsten Leistung. | Echtes Foto des Mammographiegeräts produzieren (B-Nummer im Konzept); KI-Bild bis dahin wie gewünscht gekennzeichnet lassen. | Glaubwürdigkeit der Hauptleistung. |

### 5.2 Wichtig

| Nr. | Problem | Änderung | Nutzen |
|---|---|---|---|
| W1 | Körperanalyse: Hero mit fünfzeiliger H1, doppelter Überzeile, ohne Preis und Telefon; CTA am Bildschirmrand. | Überzeile kürzen, Preis-Chip (aus `bodyComposition.js`) und Telefonlink im Hero ergänzen; H1-Wortlaut bleibt (Vorgabe). | CTA und Preis im ersten Bildschirm. |
| W2 | Körperanalyse: zwei fast gleich lautende H2 („medizinische“ / „DEXA-Körperanalyse“). | Zweiten Abschnitt eindeutig benennen („So sieht Ihr Messbericht aus“). | Klare Gliederung, Scannbarkeit. |
| W3 | Körperanalyse: 10 gleichrangige Buchungslinks. | Auf 4 Stellen reduzieren (Hero, nach Preisen, nach Ablauf, Schluss); übrige als Textlinks. | Klarere Blickführung. |
| W4 | Knochendichte: T-/Z-Wert zweimal erklärt; 29 Handy-Bildschirme. | Abschnitt „Ergebnis“ und „Befund lesen“ zusammenführen (Ergebnis-Text als Einleitung des Sliders); keine Inhalte löschen ohne Prüfung. | Kürzere Seite, keine Doppelung. |
| W5 | Ungleiche Kartenhöhen (Startseite „Ziele“, Spezialröntgen, Körperanalyse). | Karten als `flex flex-col h-full`, Link/CTA unten ausgerichtet; Raster `items-stretch`. | Ruhiges Raster. |
| W6 | Zeilenlängen bis ~155 Zeichen in Hinweis-Kästen und Listen. | Fließtext in Kästen und Notices auf `max-w-prose` (~70 Zeichen) begrenzen. | Lesbarkeit (Q11). |
| W7 | Kopf und Inhalt am Desktop 64 px versetzt. | Container angleichen (Kopfzeile an Inhaltsbreite oder umgekehrt) – nur nach Prüfung der Menüzeile bei 1280 px. | Ruhiger, professioneller Eindruck. |
| W8 | Telefonnummer fehlt im Hero mehrerer Seiten (Körperanalyse, Zielseiten, Röntgen als Button). | Einheitliche „Meta“-Zeile im Hero: „Telefonisch: 0316 …“ als `tel:`-Link. | Zweiter Kanal immer sichtbar. |
| W9 | H1-Trennungen am Desktop („vorbeikom-men“, „Kontrastmittel-untersuchungen“). | Weiche Trennstellen an Wortfugen statt automatischer Trennung. | Saubere Überschriften. |
| W10 | „termin erforderlich“ klein geschrieben (Weitere Untersuchungen). | Schreibweise korrigieren. | Sorgfaltseindruck. |
| W11 | Weitere Untersuchungen ohne CTA/Telefon im Hero. | Telefon-CTA ergänzen (Röntgen: „Direkt vorbeikommen“ bleibt). | Handlung möglich ohne Scrollen. |
| W12 | LCP mobil 2,7–3,1 s auf Kernseiten. | Hero-Bild je Route vorab laden (`<link rel="preload" imagesrcset>` im statischen HTML), Bildqualität der Mobilvariante prüfen. | Schnellerer erster Eindruck, bessere Core Web Vitals. |
| W13 | Gleiches DEXA-Foto auf 6 Seiten, gleicher Monitor-Scan auf 5. | Medienkonzept mit eigener Aufnahme je Zweck; bis dahin Platzhalter statt Wiederholung in Heros. | Seiten unterscheidbar. |
| W14 | Kontakt: Barrierefreiheit vor Ort, Urlaubszeiten, Praxisvorstellung fehlen. | **Praxis:** Angaben liefern. | Entscheidungsrelevant für ältere und mobilitätseingeschränkte Patienten. |
| W15 | Ältere Ratgeber-Artikel kurz (198–491 Wörter), ohne Quellen. | **Praxis:** ausbauen nach Muster Sarkopenie oder zusammenführen; bis dahin unverändert. | Hilfreicher Inhalt, SEO. |
| W16 | Zielseiten (Sarkopenie u. a.): lange Einleitung vor dem CTA. | Einleitung auf 2–3 Sätze, Hinweis-Kasten nach dem ersten Abschnitt. | CTA im ersten Bildschirm. |

### 5.3 Optional

| Nr. | Problem | Änderung | Nutzen |
|---|---|---|---|
| O1 | Startseiten-Claim austauschbar. | **Praxis:** konkretere Unterzeile prüfen (z. B. Vorteile ohne Zuweisung/ohne Termin). | Schärferes Profil. |
| O2 | Öffnungszeiten dreifach auf der Startseite. | Im Hero kürzen oder entfernen (Kopfzeile + Anfahrt genügen). | Weniger Wiederholung. |
| O3 | Phlebographie im alten Layout. | Auf Hero/Section umstellen, `ServiceLayout` entfernen. | Einheitliches Design. |
| O4 | Ungenutzte, teils irreführende Bilddateien im Repo (`roentgen`, `ultraschall`, `koerperfett`, `dvt`, `mammographie`, `mammographie_v2`). | Nach Bestätigung löschen. | Kein versehentlicher Einsatz. |
| O5 | Team-Seiten ohne Termin-CTA. | Dezenten CTA am Ende ergänzen. | Weg zur Buchung von jeder Seite. |
| O6 | Ratgeber-Übersicht ohne Artikeltitel im ersten Handy-Bildschirm. | Bildhöhe der ersten Karte am Handy reduzieren. | Schnellere Orientierung. |
| O7 | Sanftes Einblenden von Abschnitten fehlt. | Optional einmaliges Einblenden ab dem zweiten Bildschirm (nur mit Bewegung), nicht im ersten. | Ruhige Blickführung ohne LCP-Nachteil. |

## 6. Nicht ändern ohne Bestätigung

Preise (DEXA 70 €, Körperanalyse 70 €/Paket 130 €), Kassenregeln (ÖGK/BVAEB/SVS/KFA), Screening-Regeln (`screening.js`), Kontaktdaten, Öffnungszeiten, Buchungslink (MiraNext), alle FAQ-Antworten, FRAX-Risikocheck, Befund-Erklärungen und Quellen. Diese Inhalte werden in der Umsetzung nur verschoben oder anders dargestellt, nicht umformuliert.
