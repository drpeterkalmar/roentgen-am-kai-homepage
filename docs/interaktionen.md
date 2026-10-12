# Interaktionen und Medien (Prompt 5)

Stand: 12.10.2026 · Grundlage: `design-grundlagen.md` (Kap. 8), `seiten-und-medienkonzept.md` (Teil 3)

Leitfrage: **Verbessert die Bewegung oder Interaktion das Verständnis?** Nur dann wurde sie umgesetzt oder behalten. Keine automatisch startenden Videos mit Ton, keine Dauerbewegung ohne Anhalten, kein Parallax, keine Animation im ersten Bildschirm, die das LCP-Bild verzögert.

## 1. Bestand und Bewertung

| Element | Seite | Informationswert | Status |
|---|---|---|---|
| FAQ-Akkordeon (`FAQ.jsx`) | alle Leistungsseiten, Sarkopenie-Artikel | lange Antworten bleiben auffindbar, Seite kürzer | behalten; `aria-expanded`/`aria-controls`, Enter/Leertaste |
| Hover-/Fokuszustände an Karten (`card-lift`, Fokusrahmen 3 px) | Startseite, Übersichten | zeigt, dass die ganze Karte klickbar ist | behalten; Anheben nur mit Maus und ohne „Bewegung reduzieren“ |
| Menü (Handy-Panel, Desktop-Untermenü) | global | Orientierung | behalten; Enter öffnet, Escape schließt, Fokus kehrt zurück |
| DEXA-Befund-Slider mit Hotspots, Vorschaubildern, Zoom, Vollbild | Knochendichte `#befund-lesen`, Körperanalyse `#beispielbefund` | erklärt einen echten (anonymisierten) Befund Wert für Wert | behalten; Pfeiltasten/Knöpfe, beschriftete Hotspots, Escape schließt Vollbild |
| DEXA-Messschema (Messarm fährt einmal über) | Knochendichte | zeigt das Messprinzip | behalten; Schleife mit Anhalten, Endbild bei „Bewegung reduzieren“ |
| Erklärfilm Körperanalyse (Handy-/Desktop-Fassung) | Körperanalyse „Ablauf“ | zeigt den Ablauf der Ganzkörpermessung | behalten; stumm, lädt erst bei Bedarf, spielt nur im sichtbaren Bereich, Anhalten-Knopf, Textfassung, Poster bei „Bewegung reduzieren“ |
| Untersuchungsauswahl nach Körperregion (`BodyNavigator`) | Röntgen | „Welche Aufnahme ist das?“ | behalten; per Tastatur wählbar, `aria-pressed`, Textliste als Alternative |
| Zuweisungssuche (`ReferralSearch`) | Röntgen | übersetzt Begriffe der Zuweisung | behalten |
| Risikocheck Osteoporose (FRAX-orientiert) | Knochendichte „Wann sinnvoll?“ | Selbsteinschätzung, Link zum offiziellen FRAX-Rechner | behalten; alle Felder beschriftet; ärztliche Freigabe der Texte offen |
| Ablaufdarstellungen (nummerierte Schritte) | Mammographie, Knochendichte, Startseite | Ablauf in Schritten | behalten (statisch, keine Animation nötig) |
| Farbschimmer im Startseiten-Hero | Startseite | gering, rein dekorativ | behalten (sehr langsam, nur transform/opacity, ruht bei „Bewegung reduzieren“) |
| Seitenwechsel-Blende (200 ms) | global | Rückmeldung beim Seitenwechsel | behalten |

## 2. Neu umgesetzt

| Element | Umsetzung | Informationswert |
|---|---|---|
| **Sanftes Einblenden von Inhaltsabschnitten** | `Section` → `Container.section-reveal`; reines CSS über die Scroll-Zeitleiste (`animation-timeline: view()`), einmalig über die ersten 200 px Scrollweg, nur `opacity`/`transform`. Der erste Abschnitt nach dem Hero ist ausgenommen (steht oft schon im ersten Bildschirm). Ohne Browser-Unterstützung, bei „Bewegung reduzieren“ und im Druck: sofort sichtbar. Kein JavaScript, daher keine unsichtbaren Inhalte, wenn Skripte fehlen. | Lenkt den Blick auf den neu erscheinenden Abschnitt; keine Wirkung auf LCP und CLS. |
| **Sichtbare Entwicklungsplatzierungen A001–A006** | `AnimationPlaceholder.jsx` + `src/data/mediaPlan.js`: Nummer, Titel, Funktion, benötigtes Format; feste Fläche je Seitenverhältnis (mind. 220 px), damit die fertige Grafik nichts verschiebt. | Macht offene Medien für Praxis und Grafik sichtbar. |

## 3. Medien: umgesetzt und offen

### Animationen und Erklärgrafiken

| Nr. | Titel | Seite und Position | Status |
|---|---|---|---|
| – | Erklärfilm Körperanalyse | Körperanalyse „So läuft Ihre Körperanalyse ab“ | **umgesetzt** (Videos der Praxis) |
| – | DEXA-Messschema | Knochendichte „Warum DEXA?“ | **umgesetzt** |
| – | Befund-Slider Knochendichte (6 Folien) | Knochendichte `#befund-lesen` | **umgesetzt** |
| – | Befund-Slider Körperanalyse (6 Folien) | Körperanalyse `#beispielbefund` | **umgesetzt** |
| – | Körpernavigator Röntgen | Röntgen „Welche Körperregion?“ | **umgesetzt** |
| A001 | Wer kann wann zur Mammographie? | Mammographie „Screening oder diagnostische Abklärung“ | offen – Platzhalter sichtbar |
| A002 | T-Wert-Skala | Knochendichte „Ergebnis: T-Score und Z-Score“ | offen – Platzhalter sichtbar |
| A003 | Drei Bestandteile des Körpers | Körperanalyse „Was zeigt eine medizinische Körperanalyse?“ | offen – Platzhalter sichtbar |
| A004 | Ihr Weg zum Röntgen ohne Termin | Röntgen „So läuft Ihr Röntgen ab“ | offen – Platzhalter sichtbar |
| A005 | Strahlenbelastung im Vergleich | Röntgen und Weitere Untersuchungen „Wie hoch ist die Strahlenbelastung?“ | offen – Platzhalter sichtbar (eine Nummer, zwei Stellen) |
| A006 | 2D-Zahnröntgen oder 3D-DVT? | Zahnröntgen/DVT „Unser Leistungsspektrum“ | offen – Platzhalter sichtbar |

A001–A006 sollen als SVG/HTML gebaut werden (Text als HTML, nicht im Bild), statisch oder mit einmaligem, anhaltbarem Aufbau. Sie werden erst umgesetzt, wenn die Inhalte ärztlich freigegeben sind – die Werte stammen ausschließlich aus `screening.js`, `examinations.js`, `bodyComposition.js` und den bestehenden Seitentexten.

### Fotos

Alle Fotos B001–B019 sind offen (Shooting). Sichtbar als Platzhalter: B002, B003, B004 (Mammographie), B006, B007 (Knochendichte), B008 (Startseite), B009 (Körperanalyse), B010–B012 (Gesundheitsziele, Ratgeber), B013 (Ratgeber), B014–B017 (Leistungsseiten). Ohne Platzhalter, weil ein Übergangsbild steht: B001 (KI-Bild, gekennzeichnet), B005 und B008 im Hero (vorhandenes DEXA-Foto). B018 und B019 sind für die Kontaktseite geplant; dort stehen derzeit Text-Platzhalter der Praxis. Details: `Fotobriefing-Roentgen-am-Kai.pdf`.

## 4. Tests

Neu: `tests/e2e_interaktionen.py` (Desktop 1440 × 900 und Handy 390 × 844, alle 31 Routen):

- A-Platzhalter an den geplanten Stellen, mit Titel, Funktion, Format und fester Fläche; Nummern B001–B019 und A001–A006 lückenlos und nicht doppelt vergeben; keine unbekannten Nummern auf der Website.
- **Layoutstabilität:** CLS beim Durchscrollen jeder Seite < 0,02 (gemessen: 0).
- **Buchungslinks:** alle MiraNext-Links in neuem Tab mit `noopener`; Telefonnummern als `tel:`-Links.
- **Videos:** kein Autoplay mit Ton.
- **Menü:** Handy-Menü per Enter auf, per Escape zu; Desktop-Untermenü ebenso.
- **FAQ:** Enter und Leertaste klappen um (`aria-expanded`).
- **Befund-Slider:** Blättern per Tastatur, alle Knöpfe und Hotspots beschriftet.
- **Körpernavigator:** Region per Enter wählbar.
- **Risikocheck:** alle Felder beschriftet.
- **Einblenden:** aktiv ohne „Bewegung reduzieren“, aus mit „Bewegung reduzieren“; axe WCAG AA ohne Befund nach vollständigem Einblenden.

Ergebnis: 366 OK, 0 Fehler. Bestehende E2E-Tests (Endkontrolle mit axe auf allen Routen, Animationen, Slider, Navigation usw.) laufen weiter.
