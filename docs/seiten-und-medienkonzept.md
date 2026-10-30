# Seiten- und Medienkonzept Röntgen am Kai

Stand: 12.10.2026 · Grundlage: `docs/design-grundlagen.md`, `docs/website-audit.md` (Kennungen K = kritisch, W = wichtig, O = optional)

Dieses Dokument legt pro Seite fest, was sie leisten soll und welche Bilder und Grafiken sie braucht. Es ist die verbindliche Quelle für die Bildnummern **B001 …** (Fotos) und **A001 …** (Animationen und Erklärgrafiken). Eine Aufnahme, die auf mehreren Seiten erscheint, hat **eine** Nummer; Zuschnitte (z. B. Social-Media-Vorschau) laufen unter derselben Nummer.

**Grundregeln für alle Seiten**

- **Ein primärer CTA pro Seite.** Online buchbare Leistungen (Mammographie, Knochendichte, Körperanalyse; Röntgen-Wunschzeit): „Termin buchen“ (MiraNext, neuer Tab). Nur telefonisch buchbare Leistungen (Ultraschall, Spezialröntgen, Phlebographie, Zahnröntgen/DVT): „Anrufen“ als primärer CTA. Röntgen: „Direkt vorbeikommen“ als primärer Weg. Telefon immer als zweiter, antippbarer Weg.
- **Hero:** H1 + 1 Satz + Bedingung (Kasse/Zuweisung/Termin) + CTA + Telefon. Am Desktop Bild rechts im Format **4:3**, am Handy unter den Buttons.
- **Raster:** 1 Spalte < 640 px, 2 Spalten ab 640 px, 3 Spalten ab 1024 px; 4 Spalten nur für kurze Karten ohne Fließtext. Karten gleich hoch, Link unten bündig.
- **Fließtext** maximal ca. 70 Zeichen pro Zeile, auch in Hinweis-Kästen.
- **Inhalte, die nicht verändert werden:** medizinische Aussagen, Kassen- und Screening-Regeln, Preise, Kontaktdaten, Buchungslinks, FAQ-Antworten (siehe Audit Abschnitt 6). Kürzen bedeutet hier: verschieben, zusammenführen oder anders darstellen, nicht umformulieren.
- **Platzhalter auf der Website** zeigen nur Nummer, Kurztitel und Format, z. B. „B014 – Röntgenraum, Querformat 4:3“. Die Produktionstexte stehen hier und im Fotobriefing.

---

## Teil 1: Seitenplan

### 1. Startseite `/`

- **Zweck / Zielgruppe:** Verteiler und Vertrauensaufbau; alle Patientinnen und Patienten, oft mit Zuweisung oder auf der Suche nach Vorsorge.
- **Botschaft im ersten Bildschirm:** Radiologie im Zentrum von Graz, alle Kassen und privat; Termin online oder telefonisch.
- **CTA:** primär „Termin online buchen“; sekundär „Welche Untersuchung brauche ich?“ (Anker zu den Schwerpunkten) und Telefon.
- **Abschnitte:** 1 Hero → 2 Schwerpunkte (Mammographie, Knochendichte, Körperanalyse) → 3 Weitere Untersuchungen → 4 Gesundheitsziele → 5 Vom Termin bis zum Befund → 6 Bilder und Befunde online → 7 Ihre Radiologie (Team, Praxis) → 8 Anfahrt → 9 Schluss-CTA. Reihenfolge bleibt.
- **Kacheln:** Schwerpunkte 3 (1/2/3 Spalten, letzte Reihe am Tablet als breite Karte), Weitere Untersuchungen 4 (1/2/4), Gesundheitsziele 6 (1/2/3, **gleiche Höhe**, W5), Ablauf 4 (1/2/4), Vertrauen 3, Anfahrt 3.
- **Bilder:** Hero: Eingangsfoto (vorhanden, Orientierung). Karte Mammographie: **B001** (bis dahin gekennzeichnetes KI-Bild). Karte Knochendichte: **B005** (bis dahin vorhandenes DEXA-Foto). Karte Körperanalyse: **B008** (bis dahin Platzhalter). Vertrauen: Teamfoto (vorhanden).
- **Formate:** Hero 4:5 (vorhanden, Hochformat), Karten 16:10.
- **Interaktion:** Karten-Hover/Fokus; kein Einblenden im ersten Bildschirm.
- **Kürzen / entfernen:** Öffnungszeiten im Hero entfallen (stehen in Kopfzeile und Anfahrt, O2). Startseiten-Claim nur nach Freigabe ändern (O1).

### 2. Mammographie `/mammographie-graz`

- **Zweck / Zielgruppe:** Frauen ab 40, besonders 45–74 im Früherkennungsprogramm; Frauen mit Beschwerden und Zuweisung.
- **Botschaft:** Mammographie ohne Zuweisung mit e-card alle zwei Jahre; bei Beschwerden rasch mit Zuweisung.
- **CTA:** primär „Mammographie-Termin buchen“; sekundär Telefon, Textlink „So funktioniert das Screening“.
- **Abschnitte:** Hero → Brustkrebsvorsorge ohne Zuweisung → Was ist eine Mammographie? → Screening oder Abklärung (**A001**) → Beschwerden → Ablauf → Vorbereitung → Brustultraschall → Dichtes Brustgewebe → FAQ → Praxis, Anfahrt, Ratgeber → Schluss-CTA. Reihenfolge bleibt.
- **Kacheln:** keine Raster nötig; Karten paarweise (1/2).
- **Bilder:** Hero **B001**; „Was ist eine Mammographie?“ **B002**; „Ablauf“ **B003**; „Praxis“ **B004**. og:image = Zuschnitt aus B001.
- **Formate:** Hero 4:3; Abschnittsbilder 3:2; Praxis 16:9.
- **Interaktion:** FAQ-Akkordeon (vorhanden); Screening-Wegweiser **A001**.
- **Kürzen:** Hinweis-Kästen auf Lesebreite (W6). KI-Kennzeichnung bleibt, bis B001 geliefert ist.

### 3. Knochendichte `/knochendichtemessung-graz`

- **Zweck / Zielgruppe:** Frauen nach der Menopause, Männer ab ca. 70, Menschen mit Risikofaktoren oder Zuweisung; Angehörige.
- **Botschaft:** DEXA-Knochendichtemessung in Graz, schmerzlos, Preis für ÖGK-Versicherte sichtbar.
- **CTA:** primär „DEXA-Termin buchen“; sekundär Telefon und Kombi-Hinweis Mammographie.
- **Abschnitte:** Hero → Warum DEXA → Wann sinnvoll (+ Risikocheck) → Kosten → Brust und Knochen gemeinsam → Rho-Hinweis → Ablauf → **Ergebnis und Befund lesen** (bisher zwei Abschnitte, zusammenführen, W4; T-Wert-Skala **A002** als Einstieg) → FAQ → Termin und Praxis → Schluss-CTA.
- **Kacheln:** Indikationen 1/2 Spalten; Linkkarten 1/2/3 und 1/2/4 (vorhanden, gleich hoch).
- **Bilder:** Hero **B005** (bis dahin vorhandenes DEXA-Foto); „Warum DEXA“ **B006**; „Ablauf“ **B007**. og:image = Zuschnitt aus B005.
- **Formate:** Hero 4:3, Abschnittsbilder 3:2.
- **Interaktion:** Messschema (vorhanden), Befund-Slider (vorhanden), Risikocheck (vorhanden), **A002** T-Wert-Skala.
- **Kürzen:** doppelte T-/Z-Wert-Erklärung zusammenführen, ohne Inhalt zu verlieren.

### 4. Körperanalyse `/koerperanalyse-graz`

- **Zweck / Zielgruppe:** Erwachsene, die Körperfett und Muskelmasse messen wollen (Abnehmen, Training, Älterwerden); Privatleistung ohne Zuweisung.
- **Botschaft:** Medizinische Körperanalyse mit DEXA, Preis, ohne Zuweisung.
- **CTA:** primär „Körperanalyse buchen“; sekundär Telefon, Anker „So funktioniert die Messung“.
- **Abschnitte:** Hero (mit Preis und Telefon, W1) → Was zeigt die Körperanalyse? (+ **A003**) → **So sieht Ihr Messbericht aus** (Befund-Slider; bisher gleichnamige H2, W2) → Für wen → Abnehmen → Training → Sarkopenie → Methodenvergleich → Ablauf (Erklärfilm) → FAQ → Termin, Anfahrt → Schluss.
- **Kacheln:** Nutzen 6 (1/2/3), Zielgruppen 6 (1/2/3), Methodenvergleich als Tabelle, Linkkarten 1/2/3 mit voller letzter Reihe.
- **Bilder:** Hero **B008** (bis dahin vorhandenes DEXA-Foto); „Ablauf“ **B009**. Erklärfilm (vorhanden).
- **Formate:** Hero 4:3, Ablauf 3:2.
- **Interaktion:** Befund-Slider, Erklärfilm (vorhanden), **A003** Drei Bestandteile.
- **Kürzen:** Buchungsbuttons auf 4 Stellen (Hero, Preise, Ablauf, Schluss), übrige als Textlinks (W3). Doppelte Überzeile im Hero entfällt.

### 5. Weitere Untersuchungen `/weitere-untersuchungen`

- **Zweck / Zielgruppe:** Patientinnen und Patienten mit Zuweisung, die wissen wollen, ob sie einen Termin brauchen.
- **Botschaft:** Röntgen ohne Termin; Ultraschall, Spezialröntgen und DVT mit telefonischem Termin.
- **CTA:** primär Telefon; sekundär „Direkt vorbeikommen“ (Röntgen).
- **Abschnitte:** Hero → Ohne Termin → Termin erforderlich → Strahlenbelastung (**A005**) → Kein CT/MRT → So kommen Sie zur Untersuchung. Reihenfolge bleibt.
- **Kacheln:** 3 Karten „Termin erforderlich“ (1/2/3); keine Bilder auf diesen Karten (Icons genügen).
- **Bilder:** keine Fotos nötig. Grafik **A005**.
- **Kürzen:** Status-Zeilen im Hero einheitlich; Schreibweise „Termin erforderlich“ (W10).

### 6. Röntgen `/roentgen-graz`

- **Zweck / Zielgruppe:** Menschen mit Röntgen-Zuweisung.
- **Botschaft:** Mit Zuweisung und e-card ohne Termin vorbeikommen oder Wunschzeit reservieren.
- **CTA:** primär „Direkt vorbeikommen“; sekundär „Wunschzeit reservieren“ und Telefon.
- **Abschnitte:** Hero → So läuft Ihr Röntgen ab (**A004**) → Zeiten, Unterlagen, Anfahrt → Was steht auf Ihrer Zuweisung? (Suche) → Welche Körperregion? (Navigator) → Unsere Röntgenaufnahmen → Strahlenbelastung (**A005**) → FAQ → Schluss-CTA.
- **Kacheln:** Ablauf 3 (1/3), Navigator 1/2 Spalten (vorhanden).
- **Bilder:** Hero **B014**.
- **Formate:** Hero 4:3.
- **Interaktion:** Zuweisungssuche und Körpernavigator (vorhanden), **A004**, **A005**.
- **Kürzen:** H1-Trennung korrigieren (W9).

### 7. Ultraschall `/ultraschall-graz`

- **Zweck / Zielgruppe:** Menschen mit Ultraschall-Zuweisung oder Privatwunsch.
- **Botschaft:** Ultraschall nur mit Termin, telefonisch.
- **CTA:** primär „Anrufen“; kein Online-Buchungsknopf in der Handy-Leiste (K1).
- **Abschnitte:** Hero → Auf einen Blick (Termin, Zuweisung, Kasse/privat, Vorbereitung) → Unsere Ultraschalluntersuchungen → Strahlenbelastung → FAQ → Schluss-CTA.
- **Kacheln:** „Auf einen Blick“ 4 (1/2/4 kurz) – „Termin erforderlich“ nicht doppelt.
- **Bilder:** Hero **B015**.
- **Formate:** Hero 4:3.

### 8. Spezialröntgen `/spezialroentgen` und Phlebographie

- **Zweck / Zielgruppe:** Menschen mit Zuweisung zu einer Kontrastmittel- oder Durchleuchtungsuntersuchung.
- **Botschaft:** Spezialuntersuchungen nur mit Termin; Vorbereitung je Untersuchung.
- **CTA:** primär „Anrufen“.
- **Abschnitte:** Hero → Unsere Spezialuntersuchungen → Vorbereitung und Ablauf je Untersuchung → Strahlenbelastung (**A005**) → Schluss-CTA.
- **Kacheln:** 1/2 Spalten, **gleich hoch** (W5).
- **Bilder:** Hero **B016**. Phlebographie: drei vorhandene Bein-Aufnahmen (Bilddiagnostik, erklärend) bleiben.
- **Formate:** Hero 4:3.
- **Kürzen:** H1-Trennung (W9). Phlebographie später auf das gemeinsame Seitenlayout (O3).

### 9. Zahnröntgen und 3D-DVT `/zahnroentgen-dvt-graz`

- **Zweck / Zielgruppe:** Patientinnen und Patienten mit zahnärztlicher Zuweisung; Zahnärztinnen und Zahnärzte.
- **Botschaft:** 2D-Zahnröntgen und 3D-DVT mit Termin, telefonisch.
- **CTA:** primär „Anrufen“.
- **Abschnitte:** Hero → Leistungsspektrum (+ **A006**) → Strahlenbelastung (**A005**) → Zuweisung und Kosten → FAQ → Schluss-CTA.
- **Kacheln:** 1/2/3.
- **Bilder:** Hero **B017**.
- **Formate:** Hero 4:3.
- **Kürzen:** „Preis folgt“ bleibt sichtbar, bis die Praxis Preise bestätigt.

### 10. Gesundheitsziele (Übersicht) `/gesundheitsziele`

- **Zweck / Zielgruppe:** Menschen, die von ihrer Situation aus suchen (Wechseljahre, Abnehmen, Training, Älterwerden).
- **Botschaft:** Vom Ziel zur passenden Untersuchung.
- **CTA:** primär Karten zu den Zielseiten; sekundär „Termin buchen“ am Ende.
- **Abschnitte:** Hero → Ziele im Überblick → Nicht sicher? → Weitere Situationen → Quellen → Schluss-CTA.
- **Kacheln:** 6 Ziele (1/2/3, gleich hoch).
- **Bilder:** Karten mit vorhandenen Fotos bzw. **B010**, **B011**, **B012**.
- **Formate:** Karten 4:3.

### 11. Zielseiten `/gesundheitsziele/*` (Muster, u. a. Sarkopenie)

- **Zweck / Zielgruppe:** je Situation; führen zur Leistungsseite.
- **Botschaft:** Was die Untersuchung in dieser Situation beitragen kann – und was nicht.
- **CTA:** primär „Termin buchen“ für die passende Untersuchung; sekundär Link zur Leistungsseite.
- **Abschnitte:** Hero (Einleitung 2–3 Sätze, Hinweis-Kasten danach, W16) → Inhaltsabschnitte → Passende Ziele → Quellen → Schluss-CTA.
- **Bilder (Hero 4:3):** Abnehmen **B010**, Fitness **B011**, Sarkopenie **B012**; Wechseljahre, Abnehmspritze, Älterwerden, RED-S mit vorhandenen Fotos.
- **Kürzen:** Prüfvermerk-Platzhalter bleibt bis zur Freigabe sichtbar (K4, Praxis).

### 12. Ratgeber (Übersicht) `/ratgeber`

- **Zweck / Zielgruppe:** Informationssuchende; Einstieg über Suchmaschinen.
- **Botschaft:** Verständliche, belegte Gesundheitsinformation der Praxis.
- **CTA:** Artikel; Termin am Ende.
- **Kacheln:** 1/2/3, Filter.
- **Bilder:** Kartenbilder der Artikel (vorhanden bzw. **B010**, **B013**). Am Handy kleinere Bildhöhe der ersten Karte (O6).

### 13. Ratgeber-Artikel `/ratgeber/*` (Muster, u. a. Sarkopenie)

- **Zweck / Zielgruppe:** Fragende mit konkretem Thema.
- **Botschaft:** Titel als Frage oder Aussage, Lead mit Kernantwort.
- **CTA:** passende Leistungsseite (Textlink im Kopf), Termin-Kasten am Ende.
- **Abschnitte:** Kopf → Titelbild → Inhalt mit H2 → FAQ → Quellen → Termin-Kasten.
- **Bilder:** 1 Titelbild (16:9 bzw. 4:3); Abnehmspritze **B010**, KI-Unterstützung **B013**, sonst vorhanden.
- **Kürzen:** keine Inhalte ändern; kurze ältere Artikel nach Praxisfreigabe ausbauen (W15).

### 14. Kontakt `/kontakt`

- **Zweck / Zielgruppe:** Anreise, Erreichbarkeit, Öffnungszeiten.
- **Botschaft:** Adresse, Telefon, Zeiten, Anfahrt auf einen Blick.
- **CTA:** primär Telefon; sekundär Termin online, Route.
- **Abschnitte:** unverändert.
- **Bilder:** „Unsere Praxis“: **B004** (Empfang) und **B018** (Praxisteam); „Anfahrt“: **B019** (Zugang zur Praxis).
- **Formate:** 16:9 bzw. 3:2.

### 15. Team `/unser-team/*`

- **Zweck:** Vertrauen in die Fachärzte.
- **Bilder:** Porträts vorhanden.
- **CTA:** dezenter Termin-Hinweis am Ende (O5).
- **Kürzen:** Publikationsliste auf Lesebreite.

### 16. Impressum, Datenschutz

- Keine Bilder, keine CTAs. Inhalt unverändert.

---

## Teil 2: Benötigte Fotos (B-Nummern)

Allgemein für alle Aufnahmen: reale Räume, Geräte und Menschen der Ordination; natürliches, helles Licht; keine Herstellerbilder, keine Stockfotos, keine KI-Bilder; keine gestellten „Arzt zeigt auf Bildschirm“-Szenen; Personen nur mit schriftlicher Einwilligung; keine Patientendaten auf Bildschirmen, Dokumenten oder Etiketten. **Freiraum:** Bei Hero-Bildern das Hauptmotiv in den mittleren 60 % halten, damit am Handy Zuschnitte auf 1:1 und 4:5 möglich sind.

| Nr. | Kurztitel | Format | Seite(n) und Position |
|---|---|---|---|
| B001 | Mammographiegerät der Praxis | Querformat 4:3 | Mammographie Hero; Startseite Karte Mammographie; og:image Mammographie (Zuschnitt 1,91:1) |
| B002 | Mammographie-Untersuchungsraum | Querformat 3:2 | Mammographie „Was ist eine Mammographie?“ |
| B003 | Erklärung vor der Mammographie | Querformat 3:2 | Mammographie „Ablauf“ |
| B004 | Empfang der Ordination | Querformat 16:9 | Mammographie „Praxis, Anfahrt und Ratgeber“; Kontakt „Unsere Praxis“ |
| B005 | DEXA-Messplatz | Querformat 4:3 | Knochendichte Hero; Startseite Karte Knochendichte; og:image Knochendichte (Zuschnitt 1,91:1) |
| B006 | DEXA-Untersuchungsraum | Querformat 3:2 | Knochendichte „Warum DEXA?“ |
| B007 | Knochendichtemessung | Querformat 3:2 | Knochendichte „Ablauf“ |
| B008 | Körperanalyse: Ganzkörpermessung | Querformat 4:3 | Körperanalyse Hero; Startseite Karte Körperanalyse (Zuschnitt 16:10) |
| B009 | Körperanalyse: Lagerung | Querformat 3:2 | Körperanalyse „So läuft Ihre Körperanalyse ab“ |
| B010 | Gespräch vor der Körperanalyse | Querformat 4:3 | Gesundheitsziel „Gesund abnehmen“ (Hero, Karte); Ratgeber „Abnehmspritze und Muskelverlust“ (Titelbild, Karte) |
| B011 | Messung nach dem Training | Querformat 4:3 | Gesundheitsziel „Fitness und Muskelaufbau“ (Hero, Karte) |
| B012 | Gespräch vor der Muskelmessung | Querformat 4:3 | Gesundheitsziel „Muskelverlust und Sarkopenie“ (Hero, Karte) |
| B013 | Befundarbeitsplatz | Querformat 4:3 | Ratgeber „KI-Unterstützung in der Radiologie“ (Titelbild, Karte) |
| B014 | Röntgenraum | Querformat 4:3 | Röntgen Hero |
| B015 | Ultraschallplatz | Querformat 4:3 | Ultraschall Hero |
| B016 | Durchleuchtungsraum | Querformat 4:3 | Spezialröntgen Hero |
| B017 | Zahnröntgen und DVT | Querformat 4:3 | Zahnröntgen/DVT Hero |
| B018 | Praxisteam | Querformat 3:2 | Kontakt „Unsere Praxis“ |
| B019 | Zugang zur Praxis | Querformat 3:2 | Kontakt „Anfahrt“ |

### Produktionstexte

**B001 – Mammographiegerät der Praxis.** Motiv: das eigene Mammographiegerät im Untersuchungsraum, leicht schräg von vorne, Kompressionsplatte und Detektor erkennbar. Personen: keine. Umgebung: aufgeräumter Raum, Ablagen leer, keine Kabel, keine Patientendaten am Monitor. Perspektive: Augenhöhe (ca. 1,4 m), 35–50 mm KB. Format: Querformat 4:3, mind. 2400 × 1800 px (für den 1,91:1-Zuschnitt). Freiraum: Gerät rechts der Mitte, links ruhige Wand für Text im Social-Media-Zuschnitt. Einsatz: ersetzt das gekennzeichnete KI-Bild auf Mammographie-Seite und Startseite.

**B002 – Mammographie-Untersuchungsraum.** Motiv: Raumüberblick mit Gerät im Hintergrund, Umkleide oder Sichtschutz sichtbar, ruhige Atmosphäre. Personen: keine. Perspektive: aus der Tür bzw. Raumecke, Augenhöhe, kein extremer Weitwinkel (≥ 24 mm KB). Format: Querformat 3:2, mind. 1800 × 1200 px. Freiraum: Bildmitte frei von angeschnittenen Möbeln. Einsatz: zeigt, wie der Raum aussieht, nimmt Unsicherheit vor dem ersten Besuch.

**B003 – Erklärung vor der Mammographie.** Motiv: Röntgenassistentin erklärt einer bekleideten Patientin (Model oder Mitarbeiterin mit Einwilligung) im Sitzen den Ablauf; keine Untersuchungsszene, kein entblößter Oberkörper. Personen: 2. Perspektive: seitlich, Gesichter höchstens im Profil oder unscharf, Hände und Gestik im Fokus. Format: Querformat 3:2, mind. 1800 × 1200 px. Freiraum: Personen im linken oder rechten Drittel. Einsatz: Abschnitt „Ablauf“, vermittelt Betreuung.

**B004 – Empfang der Ordination.** Motiv: Empfangstheke mit einer Mitarbeiterin bei der Arbeit, Wartebereich im Anschnitt. Personen: 1 Mitarbeiterin (Einwilligung), keine Patientinnen. Umgebung: Bildschirme ohne lesbare Daten, keine Zettel mit Namen. Perspektive: Augenhöhe aus Patientensicht. Format: Querformat 16:9, mind. 1920 × 1080 px. Freiraum: obere Bildhälfte ruhig. Einsatz: Mammographie „Praxis“ und Kontakt „Unsere Praxis“.

**B005 – DEXA-Messplatz.** Motiv: das eigene DEXA-Gerät (Liege mit Messarm), schräg von der Fußseite, Bedienplatz im Anschnitt. Personen: keine. Umgebung: Liege mit frischem Papier, Fenster abgeblendet (keine Überstrahlung). Perspektive: Augenhöhe, moderater Weitwinkel (≥ 28 mm KB). Format: Querformat 4:3, mind. 2400 × 1800 px (für 1,91:1-Zuschnitt). Freiraum: Gerät mittig, oben 15 % ruhig. Einsatz: ersetzt das bisherige Weitwinkelfoto auf Knochendichte und Startseite.

**B006 – DEXA-Untersuchungsraum.** Motiv: Raumüberblick mit Liege, Ablage für Kleidung, Sitzgelegenheit. Personen: keine. Perspektive: aus der Tür. Format: Querformat 3:2, mind. 1800 × 1200 px. Einsatz: Knochendichte „Warum DEXA?“.

**B007 – Knochendichtemessung.** Motiv: bekleidete Person liegt entspannt auf dem Rücken auf der DEXA-Liege, Messarm über der Hüfte bzw. Wirbelsäule, Röntgenassistentin daneben am Bedienplatz. Lagerungshilfen nur so, wie sie in der Praxis tatsächlich verwendet werden. Personen: 2 (Einwilligung). Perspektive: seitlich, leicht erhöht; Gesicht der liegenden Person nicht erkennbar. Format: Querformat 3:2, mind. 1800 × 1200 px. Einsatz: Knochendichte „Ablauf“.

**B008 – Körperanalyse: Ganzkörpermessung.** Motiv: bekleidete erwachsene Person (normale Statur, Alltagskleidung ohne Metall) liegt ruhig auf dem Rücken, Messarm über dem Körper, Röntgenassistentin am Bedienplatz. Personen: 2 (Einwilligung); kein Fitnessmodel, keine Vorher-nachher-Darstellung. Perspektive: von der Fußseite schräg, Augenhöhe. Format: Querformat 4:3, mind. 2000 × 1500 px. Freiraum: Person liegt diagonal durchs Bild, für 16:10 und 1:1 zuschneidbar. Einsatz: Körperanalyse Hero, Startseite Karte.

**B009 – Körperanalyse: Lagerung.** Motiv: Röntgenassistentin richtet die liegende Person mittig aus (Hände an Schulter oder Arm), Detailaufnahme. Personen: 2, Gesichter nicht im Bild. Perspektive: halbnah, leicht erhöht. Format: Querformat 3:2, mind. 1800 × 1200 px. Einsatz: Körperanalyse „Ablauf“ (ergänzt den Erklärfilm).

**B010 – Gespräch vor der Körperanalyse.** Motiv: Röntgenassistentin und bekleidete erwachsene Person sitzen am Messplatz oder Bedienplatz und sprechen über die Messung; keine Spritzen, Medikamente, Waagen oder Maßbänder. Personen: 2 (Einwilligung), Gesichter im Profil. Perspektive: seitlich, Augenhöhe. Format: Querformat 4:3, mind. 1600 × 1200 px. Einsatz: Gesundheitsziel „Gesund abnehmen“, Ratgeber „Abnehmspritze“.

**B011 – Messung nach dem Training.** Motiv: sportlich gekleidete erwachsene Person (kein Fitnessmodel, kein Metall) liegt zur Ganzkörpermessung auf der Liege, Röntgenassistentin daneben. Personen: 2 (Einwilligung). Perspektive: wie B008, aber andere Person und Kleidung. Format: Querformat 4:3, mind. 1600 × 1200 px. Einsatz: Gesundheitsziel „Fitness und Muskelaufbau“.

**B012 – Gespräch vor der Muskelmessung.** Motiv: ältere Person (bekleidet, würdevoll, nicht gebrechlich) im ruhigen Gespräch mit einer Röntgenassistentin, sitzend. Personen: 2 (Einwilligung). Perspektive: Augenhöhe, halbnah. Format: Querformat 4:3, mind. 1600 × 1200 px. Einsatz: Gesundheitsziel „Muskelverlust und Sarkopenie“.

**B013 – Befundarbeitsplatz.** Motiv: Befundmonitore mit einem anonymisierten Röntgenbild, Arbeitsplatz im Halbdunkel; keine Namen, keine Patientendaten, kein KI-Werbelogo. Personen: optional ein Radiologe von hinten. Format: Querformat 4:3, mind. 1600 × 1200 px. Einsatz: Ratgeber „KI-Unterstützung“.

**B014 – Röntgenraum.** Motiv: Röntgenraum mit Rasterwand bzw. Aufnahmetisch und Röhre, aufgeräumt. Personen: keine (optional Röntgenassistentin bei der Vorbereitung). Perspektive: Augenhöhe, Raumecke. Format: Querformat 4:3, mind. 1600 × 1200 px. Einsatz: Röntgen Hero.

**B015 – Ultraschallplatz.** Motiv: Ultraschallgerät mit Liege, abgedunkelter Raum, Papier auf der Liege. Personen: keine. Format: Querformat 4:3, mind. 1600 × 1200 px. Einsatz: Ultraschall Hero.

**B016 – Durchleuchtungsraum.** Motiv: Durchleuchtungsanlage (für Kontrastmittel- und Schluckuntersuchungen), aufgeräumt. Personen: keine. Format: Querformat 4:3, mind. 1600 × 1200 px. Einsatz: Spezialröntgen Hero.

**B017 – Zahnröntgen und DVT.** Motiv: Panorama- bzw. DVT-Gerät der Praxis mit Kinnstütze, frontal-schräg. Personen: keine. Format: Querformat 4:3, mind. 1600 × 1200 px. Einsatz: Zahnröntgen/DVT Hero.

**B018 – Praxisteam.** Motiv: Gruppenaufnahme des Teams (Ärzte, Röntgenassistentinnen, Empfang) im Gang oder Wartebereich, natürlich, nicht gestellt-steif. Personen: alle mit Einwilligung, Namen nur mit Zustimmung. Format: Querformat 3:2, mind. 2400 × 1600 px. Freiraum: oben ruhig. Einsatz: Kontakt „Unsere Praxis“.

**B019 – Zugang zur Praxis.** Motiv: Weg vom Hauseingang zur Praxistür (Beschilderung, Tür, Lift nur falls vorhanden). Personen: keine. Format: Querformat 3:2, mind. 1800 × 1200 px. Einsatz: Kontakt „Anfahrt“, Wiedererkennen vor Ort.

---

## Teil 3: Animationen und Erklärgrafiken (A-Nummern)

Bereits vorhanden und ohne Nummer: Erklärfilm Körperanalyse, DEXA-Messschema (Knochendichte), zwei Befund-Slider, Röntgen-Körpernavigator und Zuweisungssuche, Risikocheck Osteoporose.

| Nr. | Titel | Seite und Position | Funktion | Format |
|---|---|---|---|---|
| A001 | Wer kann wann zur Mammographie? | Mammographie, Abschnitt „Screening oder diagnostische Abklärung“ | Altersgruppen und Zugang (Einladung/e-card, Selbstanmeldung) als Zeitstrahl, Werte ausschließlich aus `src/data/screening.js` | SVG, responsiv (Desktop 16:6, Handy gestapelt), Text als HTML |
| A002 | T-Wert-Skala | Knochendichte, Abschnitt „Ergebnis und Befund lesen“ | WHO-Bereiche (≥ −1 / −1 bis −2,5 / ≤ −2,5) als Skala; Bereiche, die auf der Seite bereits stehen | HTML/CSS oder SVG, 100 % Breite, max. 120 px hoch |
| A003 | Drei Bestandteile des Körpers | Körperanalyse, Abschnitt „Was zeigt die Körperanalyse?“ | Fettmasse, magere Weichteilmasse, Knochenmineral; Hinweis „Magermasse ist nicht gleich Muskelmasse“ | SVG 4:3, Text als HTML |
| A004 | Ihr Weg zum Röntgen ohne Termin | Röntgen, Abschnitt „So läuft Ihr Röntgen ab“ | Zuweisung + e-card → Anmeldung → Aufnahme → Befund und Bilder; Schritte aus dem bestehenden Seitentext | SVG/Icons, 4 Schritte, Desktop 1 Reihe, Handy senkrecht |
| A005 | Strahlenbelastung im Vergleich | Röntgen, Weitere Untersuchungen (Abschnitt „Wie hoch ist die Strahlenbelastung?“) | Orientierungswerte aus `src/data/examinations.js` als Balken mit Bezug zur natürlichen Strahlung | SVG, logarithmische Skala, Werte als Text daneben |
| A006 | 2D-Zahnröntgen oder 3D-DVT? | Zahnröntgen/DVT, Abschnitt „Leistungsspektrum“ | Schematischer Vergleich Panorama (Fläche) und DVT (Volumen) | SVG 16:9, Text als HTML |

Für alle A-Nummern gilt: Inhalte nur aus bestehenden, geprüften Seitentexten; keine Dauerbewegung; mit „Bewegung reduzieren“ statisch; Text nicht im Bild, sondern als HTML (barrierefrei, übersetzbar); Farben aus dem Designsystem.

---

## Teil 4: Umsetzungsumfang für Prompt 4

**Umsetzen (ohne neue Praxisdaten möglich):** K1, K2, K3, W1 (Preis aus `bodyComposition.js`, Telefon), W2, W3, W5, W6, W8, W9, W10, W11, W16 (nur Anordnung), O2, O5, O6. W4 (Zusammenführung Knochendichte) und W12 (Vorladen des Hero-Bilds) werden geprüft und umgesetzt, wenn sie ohne Inhaltsverlust bzw. ohne Risiko für den Build möglich sind.

**Nicht umsetzen ohne Praxis:** K4 (Prüfvermerk), K5 und alle B-Fotos (Shooting), W14 (Barrierefreiheit vor Ort), W15 (Artikel ausbauen), O1 (Claim), O4 (Dateien löschen).
