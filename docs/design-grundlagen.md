# Design-Grundlagen: Website einer radiologischen Ordination

Stand: 12.10.2026 · Projekt: Röntgen am Kai, Graz · Grundlage für `website-audit.md`, `seiten-und-medienkonzept.md` und die Umsetzung.

Diese Datei fasst zusammen, was eine moderne, vertrauenswürdige und conversionstarke Website für eine radiologische Ordination ausmacht. Sie stützt sich auf die unten genannten Quellen und auf die Regeln, die die Praxis für dieses Projekt bereits festgelegt hat (seriös, ruhig, keine KI-Optik, keine erfundenen Praxisdaten). Die Empfehlungen sind **Richtwerte je Seitentyp**, keine starren Zahlen.

---

## 1. Was Patientinnen und Patienten auf einer Radiologie-Website wollen

Wer eine Radiologie-Website öffnet, hat meist eine konkrete Aufgabe:

1. **„Bin ich hier richtig?“** Wird meine Untersuchung angeboten, brauche ich eine Zuweisung, zahlt die Kasse?
2. **„Wie komme ich zu einem Termin?“** Online buchen, anrufen, ohne Termin kommen (Röntgen)?
3. **„Was erwartet mich?“** Ablauf, Vorbereitung, Dauer, Strahlenbelastung, Befund.
4. **„Kann ich dieser Praxis vertrauen?“** Echte Ärzte, echte Räume, sachliche Sprache, Impressum, Datenschutz.

Daraus folgt die Grundregel für jede Seite: **Aufgabe vor Atmosphäre.** Bilder, Animationen und Texte sind nur dann richtig, wenn sie eine dieser vier Fragen schneller beantworten.

Medizinische Websites sind „Your Money or Your Life“-Inhalte. Google bewertet hier besonders, ob Inhalte nachvollziehbar belegt, von Fachleuten verfasst oder geprüft und nicht reißerisch sind (Q4, Q5). In Österreich verlangt § 53 Abs. 1 ÄrzteG, dass sich Ärztinnen und Ärzte „jeder unsachlichen, unwahren oder das Standesansehen beeinträchtigenden Information“ enthalten; die Werberichtlinie „Arzt und Öffentlichkeit“ der ÖÄK präzisiert das (Q6, Q7). Superlative („modernste“, „beste“, „Goldstandard“) sind daher nicht nur stilistisch, sondern auch standesrechtlich heikel.

## 2. Vertrauen: echte Fotos statt Symbolbilder

**Befund aus der Forschung:** In Eyetracking-Studien beachten Nutzer informationstragende Bilder (echte Menschen, echte Produkte) intensiv und ignorieren dekorative „Feel-good“-Bilder und generische Stockfotos fast vollständig (Q1). Für eine Ordination heißt das:

| Bildart | Wirkung | Einsatz |
|---|---|---|
| Echte Ärzte und Team | stärkstes Vertrauenssignal, wird angesehen | Startseite (Vertrauensabschnitt), Team-Seiten, Kontakt |
| Echte Räume (Empfang, Untersuchungsraum, Umkleide) | baut Unsicherheit vor dem Besuch ab | Leistungsseiten (Ablauf), Kontakt/Anfahrt |
| Echte Geräte der Praxis | zeigt, was wirklich passiert | Hero der Leistungsseiten |
| Untersuchungsablauf (gestellt, aber realistisch, mit Einwilligung) | erklärt die Untersuchung | Abschnitt „So läuft die Untersuchung ab“ |
| Erklärgrafik / Animation | erklärt Unsichtbares (Messprinzip, Befund) | Befund lesen, Messprinzip |
| Generisches Stockfoto | wird ignoriert, kann Vertrauen kosten | **nicht verwenden** |
| KI-generiertes Bild | nur als gekennzeichnete Übergangslösung, nie als „unsere Praxis“ | Übergang bis zum echten Foto |

**Regel:** Jedes Bild hat genau eine der vier Funktionen **Vertrauen schaffen · Untersuchung erklären · Orientierung geben · zur Handlung führen**. Ein Bild ohne Funktion fliegt raus.

**KI-Bilder:** Wo ein KI-generiertes Bild den Eindruck eines echten Praxisfotos erwecken könnte, wird es gekennzeichnet und mit einem ehrlichen Alt-Text versehen. Art. 50 der EU-KI-Verordnung regelt Transparenzpflichten für KI-generierte oder manipulierte Inhalte (Q8). Unabhängig von der genauen Rechtspflicht verlangt § 53 ÄrzteG wahre Information: Ein KI-Bild darf nie als „unser Gerät“ oder „unser Untersuchungsraum“ beschrieben werden.

## 3. Bilder je Seitentyp (begründete Richtwerte)

Keine starre Bilderzahl. Die Zahl ergibt sich aus den Aufgaben der Seite. Richtwerte für diese Website:

| Seitentyp | Fotos | Grafik/Animation | Begründung |
|---|---|---|---|
| **Startseite** | 1 Hero (Praxis/Team oder Gerät) + 1 Foto je Schwerpunkt-Karte (3) + 1 Team/Praxis im Vertrauensabschnitt → **4–5** | 0–1 | Orientierung (Karten), Vertrauen (Team/Räume). Mehr Bilder verlängern nur den Weg zur Buchung. |
| **Leistungsseite** (Mammographie, Knochendichte, Körperanalyse) | 1 Hero (Gerät) + 1 Ablauf/Raum + 0–1 Betreuung → **2–3** | 1–2 (Messprinzip, Befund lesen) | Die Seite muss erklären und beruhigen. Erklärgrafiken leisten bei unsichtbaren Vorgängen mehr als Fotos. |
| **Kleinere Leistungsseite** (Röntgen, Ultraschall, Spezialröntgen, DVT) | **1–2** (Hero + ggf. Raum) | 0–1 (z. B. Untersuchungsauswahl nach Körperregion) | Kürzere Seiten, Entscheidung „Termin nötig?“ steht im Vordergrund. |
| **Themen-/Zielgruppenseite** (Gesundheitsziele) | **1** (Situation/Zielgruppe, realistisch, kein Fitnessmodel) | 0–1 | Die Seite führt zur passenden Leistungsseite; dort sind die Gerätebilder. |
| **Übersichtsseite** (Weitere Untersuchungen, Gesundheitsziele, Ratgeber) | 0–1 je Karte, einheitliches Format | 0 | Bilder auf Karten nur, wenn sie unterscheiden; sonst Icons. |
| **Ratgeber-Artikel** | **1** Titelbild (thematisch, real) + 0–1 im Text | 0–1 Tabelle/Grafik | Text ist die Leistung; Bild nur zur Orientierung und für die Vorschau beim Teilen. |
| **Team-Seite** | 1 Porträt je Person + 0–1 Arbeitssituation | 0 | Echte Gesichter sind hier die Hauptaussage. |
| **Kontakt/Anfahrt** | 1–2 (Eingang/Gebäude von außen, Empfang) | 0–1 (Lageplan) | Wiedererkennen vor Ort. |
| **Rechtliches** | 0 | 0 | |

**Formate:** Hero 4:3 (Leistungsseite) bzw. 16:9/3:2 (Startseite), Karten 16:10 oder 3:2, Porträts 4:5, Ablauf/Raum 3:2, Social-Preview 1,91:1 (1200 × 630 JPG). Jedes Motiv braucht ruhigen Freiraum, damit mobile Zuschnitte (z. B. 4:3 → 1:1) das Wesentliche nicht abschneiden.

## 4. Aufbau und Position: Hero, Text, CTA, Kacheln, Vertrauen

**Hero (erster Bildschirm):**
- Links (bzw. oben auf dem Handy): H1 mit Ort und Leistung, ein Satz Nutzen, die wichtigste Bedingung (z. B. „Ohne Zuweisung · mit e-card“), **primärer CTA „Termin buchen“** und daneben die **antippbare Telefonnummer**.
- Rechts (bzw. unter dem Text auf dem Handy): ein echtes Foto. Auf dem Handy darf das Bild unter den CTA rutschen; die CTA-Gruppe muss im ersten Bildschirm sichtbar sein.
- Keine Slideshow/Carousel: automatisch wechselnde Bühnen senken die Sichtbarkeit von Inhalten und stören (Q9).

**Inhalt danach (bewährte Reihenfolge für Leistungsseiten):**
1. Für wen / wann sinnvoll
2. Kosten und Kassen / Zuweisung
3. Ablauf in Schritten (mit Bild oder Grafik)
4. Vorbereitung
5. Ergebnis/Befund (ggf. interaktiv erklärt)
6. FAQ (Akkordeon)
7. Quellen und Prüfvermerk
8. Abschluss-CTA (Termin + Telefon)

**Vertrauenselemente** dort, wo Zweifel entstehen: neben dem CTA (Kassen, Zuweisung), beim Ablauf (echter Raum), am Seitenende (Team, Quellen, Prüfdatum). Keine erfundenen Bewertungen, Siegel oder Auszeichnungen.

**Kacheln/Karten:** Karten fassen wenige zusammengehörige Informationen zusammen und verlinken auf Details; die ganze Karte sollte klickbar sein (Q10). Für gleichartige Listen sind einfache Listen besser als Karten.

| Bildschirm | Spalten | Hinweise |
|---|---|---|
| Smartphone (< 640 px) | 1 | volle Breite, Bild oben, Titel, 1–2 Sätze, Link. Bei vielen kleinen Kacheln (z. B. Körperregionen) 2 Spalten. |
| Tablet (640–1023 px) | 2 | gleiche Kartenhöhe pro Reihe |
| Desktop (≥ 1024 px) | 3 | Standard für Leistungs- und Themenkarten |
| Großer Desktop (≥ 1280 px) | max. 4 | nur bei kurzen Karten ohne Fließtext (z. B. Weitere Untersuchungen, Kurzfakten) |

Ungerade Anzahlen (5, 7) erzeugen Löcher → Raster so wählen, dass Reihen voll sind, oder die letzte Karte als breite Hinweis-/Telefonkarte gestalten.

## 5. Textlängen und visuelle Hierarchie

- **Zeilenlänge Fließtext:** 50–75 Zeichen (Q11) → `max-w-prose`/`max-w-3xl` (ca. 65–75 Zeichen bei 17 px).
- **Absätze:** 2–4 Sätze. Wichtigstes zuerst; die ersten zwei Absätze einer Seite werden am ehesten gelesen (Q2).
- **Überschriften** beginnen mit dem tragenden Wort („Kosten …“, „Ablauf …“), damit das Scannen nach dem Layer-Cake-Muster funktioniert (Q2, Q3).
- **Eine H1** je Seite, H2 je Abschnitt, H3 in Karten. Keine Sprünge.
- **Richtwerte Seitenlänge:** Startseite kurz und verteilend (Abschnitte mit je 1–3 Sätzen); Leistungsseite 900–1.800 Wörter inkl. FAQ ist für ein erklärungsbedürftiges Thema angemessen, solange sie gegliedert ist; Ratgeber-Artikel 1.000–2.000 Wörter.
- **Sprache:** verständlich, sachlich, ohne Übertreibung (ÖPGK „Gute Gesundheitsinformation“: verständlich, unverzerrt, belegt, transparent über Verantwortliche und Aktualität, Q12). Zahlen mit Bezugsgröße, keine Heilversprechen.

## 6. Weißraum, Bild, Text und Interaktion

Richtwert pro Leistungsseite (sichtbare Fläche): **~40–50 % Weißraum, ~30 % Text, ~15–20 % Bild/Grafik, ~5 % Bedienelemente.** Weißraum trennt Abschnitte (Gestalt-Nähe) und macht Karten als Gruppe erkennbar (Q3). Abschnittsabstände einheitlich (z. B. 64–96 px Desktop, 48–64 px Handy), Hintergrundwechsel (weiß / sehr hellgrau) statt Linien.

## 7. Blickführung bis zur Terminbuchung

1. **H1 → Bedingung → CTA** im ersten Bildschirm.
2. **Wiederholung des CTA** nach dem Abschnitt, in dem die Entscheidung fällt (Kosten/Ablauf), und am Seitenende.
3. **Mobil:** feste Schnellzugriffsleiste (Termin · Anrufen · Anfahrt) – nicht zusätzlich weitere schwebende Buttons.
4. **Ein primärer CTA pro Abschnitt.** Sekundäre Wege (Telefon, „Mehr erfahren“) sind sichtbar, aber zurückhaltender.
5. **Kein CTA ins Leere:** Online-Buchung nur für Leistungen, die im Buchungssystem tatsächlich angelegt sind; sonst Telefon.

## 8. Animationen und Mikrointeraktionen

Animation ist nur sinnvoll als **Rückmeldung, Zustandswechsel oder Erklärung**; sie zieht Aufmerksamkeit und stört schnell (Q13).

| Erlaubt (Informationswert) | Nicht gewünscht |
|---|---|
| Fokus- und Hover-Zustände an Karten und Buttons | Parallax, Partikel, Glas-/Blur-Effekte |
| Akkordeon (FAQ) mit kurzem Aufgleiten | Auto-Slider, Auto-Video mit Ton |
| Ablaufgrafik, die Schritte nacheinander zeigt | Dauerbewegung ohne Anhalten |
| Interaktive Befund-Erklärung (Hotspots) | Einblend-Animationen im ersten Bildschirm (LCP) |
| Sanftes Einblenden von Abschnitten beim Scrollen (einmalig, kurz) | „Zähler“, Typewriter, springende Elemente |

Pflicht: `prefers-reduced-motion` respektieren (Q14); alles, was sich automatisch länger als 5 s bewegt, braucht Anhalten (WCAG 2.2.2, Q15); keine Layoutverschiebung durch Animation (CLS ≤ 0,1, Q16).

## 9. Barrierefreiheit, Ladezeit, mobile Bedienung

- **WCAG 2.2 AA** als Ziel: Kontrast 4,5:1 für Text, sichtbarer Fokus, Tastaturbedienung, sinnvolle Alt-Texte, Zielgrößen ≥ 24 × 24 px (2.5.8, Q17); für Haupt-CTAs 44–48 px.
- Das österreichische Barrierefreiheitsgesetz (BaFG, seit 28.06.2025) betrifft bestimmte Produkte und Dienstleistungen, besonders im elektronischen Geschäftsverkehr (Q18). Ob eine Ordinationswebsite darunter fällt, ist im Einzelfall zu prüfen; WCAG AA ist unabhängig davon der fachliche Standard.
- **Core Web Vitals:** LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms. LCP-Bild nie lazy laden, mit `fetchpriority="high"`; Bilder unterhalb des ersten Bildschirms `loading="lazy"` (Q16, Q19).
- **Bilder ohne Layoutsprung:** feste `width`/`height` oder `aspect-ratio`; `srcset` + `sizes`; moderne Formate (AVIF/WebP) mit `src`-Fallback (Q19, Q20, Q21).
- **Mobil:** 360 px ohne seitliches Scrollen, Telefonnummer als `tel:`-Link, Formulare und Menüs mit dem Daumen bedienbar.
- **Bild-SEO:** echtes `<img>` (keine CSS-Hintergründe für Inhaltsbilder), beschreibender Alt-Text, sprechender Dateiname (Q20).

## 10. Die zehn wichtigsten Prüfkriterien für die bestehende Website

1. **Erster Bildschirm:** Sind H1 (Leistung + Graz), wichtigste Bedingung, Termin-CTA und Telefonnummer auf 390 × 844 und 1280 × 720 sichtbar?
2. **Buchungsweg:** Führt jeder „Termin buchen“-Button zu einer Leistung, die online wirklich buchbar ist, und ist für alle anderen das Telefon der primäre Weg?
3. **Bildfunktion:** Erfüllt jedes Bild eine der vier Funktionen? Gibt es dekorative, doppelte oder fremde Bilder (Stock, Fremdgerät, unmarkierte KI)?
4. **Echte Praxis:** Sind Team, Räume und Geräte mit echten Fotos zu sehen, oder klar als Platzhalter markiert?
5. **Gliederung:** Folgen Leistungsseiten der Reihenfolge „für wen → Kosten/Zuweisung → Ablauf → Vorbereitung → Befund → FAQ → Quellen → CTA“, mit aussagekräftigen H2?
6. **Lesbarkeit:** Zeilenlänge ≤ 75 Zeichen, Absätze ≤ 4 Sätze, keine Textwände, keine Übertreibungen.
7. **Kachelraster:** max. 4 Spalten, volle Reihen, gleiche Höhe, ganze Karte klickbar, sinnvolle Umbrüche (1/2/3).
8. **Vertrauen und Transparenz:** Quellen, Prüfvermerk mit Datum, Impressum/Datenschutz, keine erfundenen Bewertungen oder Siegel.
9. **Barrierefreiheit:** axe ohne Befund (hell/dunkel), Tastatur und Fokus, Zielgrößen, reduced motion, Alt-Texte.
10. **Ladezeit und Stabilität:** LCP ≤ 2,5 s mobil, CLS ≈ 0, Bilder mit `srcset`/`sizes`, Lazy Loading unterhalb des ersten Bildschirms, keine externen Hosts.

---

## Quellen (abgerufen am 12.10.2026)

- **Q1** Nielsen Norman Group: *Photos as Web Content.* https://www.nngroup.com/articles/photos-as-web-content/
- **Q2** Nielsen Norman Group: *F-Shaped Pattern of Reading: Misunderstood, But Still Relevant.* https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- **Q3** Nielsen Norman Group: *The Layer-Cake Pattern of Scanning Content on the Web.* https://www.nngroup.com/articles/layer-cake-pattern-scanning/
- **Q4** Google Search Central: *Creating helpful, reliable, people-first content.* https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- **Q5** Google Search Central: Abschnitt „Expertise questions“ in Q4 (E-E-A-T).
- **Q6** RIS: *Ärztegesetz 1998, § 53.* https://www.ris.bka.gv.at/eli/bgbl/i/1998/169/P53/NOR40022870
- **Q7** Österreichische Ärztekammer: *Arzt und Öffentlichkeit (Werberichtlinie).* https://www.aerztekammer.at/kundmachungen/-/asset_publisher/KSydEGNV6Ajn/content/arzt-und-c3-96ffentlichkeit-werberichtlinie-/261766
- **Q8** EU AI Act, Artikel 50 (Transparenzpflichten). https://artificialintelligenceact.eu/article/50/
- **Q9** Nielsen Norman Group: *Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility.* https://www.nngroup.com/articles/auto-forwarding/
- **Q10** Nielsen Norman Group: *Cards: UI-Component Definition.* https://www.nngroup.com/articles/cards-component/
- **Q11** Baymard Institute: *Readability: The Optimal Line Length.* https://baymard.com/blog/line-length-readability
- **Q12** ÖPGK: *Gute Gesundheitsinformation Österreich – 15 Qualitätskriterien.* https://oepgk.at/ressourcen/ueberblick-15-qualitaetskriterien/ und https://oepgk.at/schwerpunkte/gute-gesundheitsinformation-oesterreich/
- **Q13** Nielsen Norman Group: *The Role of Animation and Motion in UX.* https://www.nngroup.com/articles/animation-purpose-ux/
- **Q14** W3C WAI: *Understanding SC 2.3.3 Animation from Interactions* (Technik C39 `prefers-reduced-motion`). https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- **Q15** W3C WAI: *Understanding SC 2.2.2 Pause, Stop, Hide.* https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- **Q16** web.dev: *Optimize Cumulative Layout Shift.* https://web.dev/articles/optimize-cls
- **Q17** W3C WAI: *Understanding SC 2.5.8 Target Size (Minimum).* https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- **Q18** Sozialministerium: *Barrierefreiheitsgesetz.* https://www.sozialministerium.gv.at/Themen/Soziales/Menschen-mit-Behinderungen/Barrierefreiheitsgesetz.html
- **Q19** web.dev: *Optimize Largest Contentful Paint* und *Browser-level image lazy loading.* https://web.dev/articles/optimize-lcp · https://web.dev/articles/browser-level-image-lazy-loading
- **Q20** Google Search Central: *Google image SEO best practices.* https://developers.google.com/search/docs/appearance/google-images
- **Q21** web.dev: *Responsive images.* https://web.dev/articles/responsive-images
