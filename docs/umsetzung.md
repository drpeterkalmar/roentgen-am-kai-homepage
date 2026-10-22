# Umsetzung (Prompt 4)

Stand: 22.10.2026 · Grundlage: `design-grundlagen.md`, `website-audit.md`, `seiten-und-medienkonzept.md`

Framework (React 18, Vite, Tailwind), Designsystem (`src/components/ui/*`), Routing (`src/data/routes.js`) und alle Funktionen (Befund-Slider, Erklärfilm, Risikocheck, Körpernavigator, Zuweisungssuche, FAQ) bleiben unverändert. **Keine** medizinischen Aussagen, Preise, Kassenregeln, Kontaktdaten oder Buchungslinks wurden neu formuliert oder erfunden. Wo neue Angaben stehen, stammen sie aus den bestehenden zentralen Datendateien.

## Geänderte Dateien

| Datei | Änderung | Audit |
|---|---|---|
| `src/data/imageBriefs.js` | Jeder fehlenden Aufnahme eine Nummer **B001–B019** und einen Kurztitel gegeben (identisch mit dem Medienkonzept). Neu: B014 Röntgenraum, B015 Ultraschallplatz, B016 Durchleuchtungsraum, B017 Zahnröntgen/DVT, B018 Praxisteam, B019 Zugang. `ratgeberAbnehmspritze` verweist jetzt auf dasselbe Motiv wie `goalWeight` (**B010**, eine Aufnahme = eine Nummer). Social-Media-Zuschnitte (`ogMammo`, `ogDexa`) laufen unter B001/B005. Mindestauflösungen an das Konzept angepasst. Neue Hilfsfunktion `formatLabel()` („Querformat 4:3“). | K3 |
| `src/components/ui/ImagePlaceholder.jsx` | Platzhalter zeigen nur noch **Nummer, Kurztitel, Format und Mindestauflösung** (z. B. „B014 – Röntgenraum, Querformat 4:3 · mind. 1600 × 1200 px“) statt des langen Briefing-Texts; das Motiv steht im Tooltip und im Fotobriefing. `data-media-id` für Tests und Nummernabgleich. Das Seitenverhältnis kommt weiterhin vom Container (`aspect-*`), damit ein später eingesetztes Foto das Layout nicht verschiebt. | K3 |
| `src/pages/Home.jsx` | Körperanalyse-Karte nutzt den Brief **B008** statt eines freien Textes. Gesundheitsziel-Karten mit gleicher Zeilenhöhe (`lg:auto-rows-fr`). | K3, W5 |
| `src/pages/RoentgenGrazPage.jsx`, `UltraschallGrazPage.jsx`, `SpezialroentgenPage.jsx`, `ZahnroentgenDvtPage.jsx` | Hero-Bildfeld mit Platzhalter **B014–B017** (4:3 bzw. 5:4 am Desktop, feste Fläche über `Hero`). Spezialröntgen: weiche Trennstelle „Kontrastmittel­untersuchungen“. | K2, W9 |
| `src/components/MobileActions.jsx` | Handy-Leiste: Auf Ultraschall, Spezialröntgen, Phlebographie und Zahnröntgen/DVT (nur telefonisch buchbar) ist „Termin telefonisch“ der hervorgehobene erste Knopf; die Online-Buchung entfällt dort. Die Liste wird aus `AREAS` (`onlineBooking: false`) abgeleitet, nicht doppelt gepflegt. | K1 |
| `src/pages/KoerperanalysePage.jsx` | Hero: Hinweis „Privatleistung ohne Zuweisung · 70 Euro“ direkt unter der H1 (Werte aus `bodyComposition.js`). Drei zusätzliche Buchungsknöpfe in den Zielgruppen-Abschnitten sind jetzt sekundär gestaltet; primär bleiben Hero, Messbericht, Preise und Schluss. Überzeile bleibt (Pflichtsatz des Körperanalyse-Auftrags). | W1, W3 |
| `src/data/dexaReportExamples.js` | Überschrift des Befund-Sliders „So sieht ein Messbericht aus“ statt der fast gleichlautenden zweiten „Was zeigt …“-Überschrift. | W2 |
| `src/pages/WeitereUntersuchungenPage.jsx` | Hero mit „Termin telefonisch: 0316 840 90 50“ (geschützte Leerzeichen) und „Röntgen: direkt vorbeikommen“. Status „Termin erforderlich“ großgeschrieben. | W10, W11 |
| `src/components/team/TeamProfile.jsx` | Ärzteseiten: „Termin online buchen“ und Telefon am Seitenende. | O5 |
| `src/index.css` | H1 ab 1024 px ohne automatische Silbentrennung (am Handy bleibt sie gegen Überlauf). Fließtext-Absätze im Hauptinhalt auf **70 Zeichen** begrenzt (zentrierte Absätze ausgenommen). | W6, W9 |
| `tests/e2e_dexa_slider.py` | Erwartete H2 auf „So sieht ein Messbericht aus“ angepasst. | – |

## Entscheidungen

- **Hero-Platzhalter statt Wiederholung:** Röntgen, Ultraschall, Spezialröntgen und DVT bekommen keinen Ersatz aus vorhandenen Dateien. Die vorhandenen Dateien `roentgen`, `ultraschall`, `dvt` zeigen Stock-Motive bzw. den DEXA-Raum und wären irreführend.
- **Bestehende echte Fotos bleiben** (DEXA-Raum auf Knochendichte und Körperanalyse, KI-Bild Mammographie mit Kennzeichnung), bis B001/B005/B008 geliefert sind. Für sie gibt es keinen Platzhalter, damit die Seiten nicht schlechter aussehen als heute.
- **Kopf-Button „Termin online buchen“ bleibt** auf allen Seiten (er gilt für Mammographie, Knochendichte, Körperanalyse und Röntgen-Wunschzeit). Nur die Handy-Leiste wechselt auf telefonische Seiten, weil sie dort den sichtbarsten Weg darstellt.
- **Lesebreite global statt pro Seite:** eine CSS-Regel für `main p` deckt Hinweis-Kästen, FAQ-Antworten und Karten ab; Karten sind ohnehin schmaler, dort ändert sich nichts.
- **Nicht umgesetzt (Praxisangaben nötig):** Fotos (K5, B001–B019), Praxisvorstellung (W14; Entwurf liegt der Praxis zur Freigabe vor; Barrierefreiheit seit 12.10.2026, Urlaubs-/Schließzeiten und Prüfvermerk seit 22.10.2026 eingetragen), Ausbau älterer Artikel (W15), Startseiten-Claim (O1), Löschen ungenutzter Bilddateien (O4).
- **Zurückgestellt:** Zusammenführen „Ergebnis“ und „Befund lesen“ auf der Knochendichte-Seite (W4) – betrifft medizinische Texte; ohne ärztliche Durchsicht nur Anordnung, nicht Inhalt. Vorladen des Hero-Bilds je Route (W12) – eigener Schritt mit Lighthouse-Vergleich.

## Praxisantworten 22.10.2026

| Thema | Umsetzung |
|---|---|
| Röntgen ohne Termin | `XRAY_HOURS_NOTE` in `examinations.js`: während der gesamten Öffnungszeiten bis Ordinationsschluss, Zeiten aus `OPENING_HOURS` (`/roentgen-graz`, `/weitere-untersuchungen`). |
| Urlaubs- und Schließzeiten | `HOLIDAYS` + `MAPS_PLACE_URL` in `practice.js` (Kontakt): wechseln, etwa an Fenstertagen; Link auf das Google-Unternehmensprofil (Maps-Suche Praxisname + Adresse, kein eigener Profil-Link bekannt). |
| Mammographie bei Beschwerden | Zuweisung nötig, Termin telefonisch (nicht online): Karte „Kontakt bei Beschwerden“, Karte „Diagnostische Mammographie“, FAQ, `services.js`. Screening-Befund in ELGA abrufbar (Ablauf, FAQ). |
| Knochendichte | Privat bezahlt ohne Zuweisung buchbar (`DEXA.privateWithoutReferralText`, Liste + FAQ). Vorbereitung bestätigt, Hinweis entfernt; Dauer weiter nicht genannt. ÖGK-Unterlagen: nichts ergänzt. Offen: Zahlungsarten vor Ort (interner Hinweis). |
| DEXA-Gewichtsgrenze | `DEXA_MAX_PATIENT_KG = 159` (`bodyComposition.js`), Quelle GE Pre-installation Manual LU46003EN Rev. 2 und enCORE Safety and Specification Manual LU43618EN (Prodigy Primo: 159 kg / 350 lb). Breite ohne Zahl (Messfeld 60 cm nur beim großen Tisch, Tischgröße der Praxis nicht belegt). |
| Prüfvermerk | Überall „Priv.-Doz. Dr. Peter Kalmar – Stand 22.10.2026“: `GOALS_REVIEWED` (Hub + 8 Zielseiten), `ARTICLES_REVIEWED` (alle veröffentlichten Ratgeber-Artikel ohne eigenen Vermerk; Platzhalter-Artikel ohne Text ausgenommen). |
| Ratgeber-Autor | Bleibt „Herausgegeben von Röntgen am Kai“; Autor-Platzhalter entfernt. |
| Entfernt | Kasten Sportmedizin-Kooperationen (RED-S), „Geplant: eigene Seite Brustultraschall“, MiraNext-Kästen (Knochendichte-Kombibuchung, Körperanalyse-Konfiguration, Terminübersicht Gesundheitsziele); Buchungs-URLs und -Logik unverändert. |
| Spezialröntgen | Neue Karte „Magenröntgen und Dünndarmpassage“ (Magen-Darm-Passage, Termin erforderlich, Zuweisung); Vorbereitung „besprechen wir bei der Terminvereinbarung“, keine Detailangaben. |

## Kontrolle

- `npx eslint . --max-warnings 0`, `npm run test:unit` (62/62), `npm run build`.
- E2E: alle `tests/e2e_*.py` gegen den Produktions-Build.
- Sichtprüfung erster Bildschirm Desktop 1440 px und Handy 390 px für Startseite, alle Leistungsseiten, Weitere Untersuchungen, Team, Artikel und Kontakt: kein seitliches Scrollen, Platzhalter lesbar, Handy-Leiste korrekt. Screenshots: `~/Documents/Hermes-Berichte/Homepage-Tests/umsetzung-p4/`.
