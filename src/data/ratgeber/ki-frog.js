// KI-Ratgeberserie – Artikel „IB Lab FROG“ (Fußfehlstellungen, Hallux valgus). Stand 21.10.2026.
// URL /ratgeber/fussfehlstellung-roentgen-ki, SEO-Titel in kiSeries.js („Fußfehlstellungen im Röntgen vermessen | Graz“).
// Quellen (alle selbst geprüft, Titel/Autoren/Jahr/DOI über PubMed/Europe PMC/Crossref):
//   * IB Lab FROG, Herstellerseite imagebiopsy.com (Funktionsumfang, 17 Messungen, vorgesehene Verwendung, ab 18 Jahren)
//   * Saltzman CL et al., Foot Ankle Int 1994 (Messwerte schwanken zwischen Untersuchern; feste Messregeln zuverlässiger)
//   * Coughlin MJ et al., Foot Ankle Int 2002 (AOFAS-Kommission: Messmethode bei Hallux valgus festlegen und angeben)
//   * Boszczyk A et al., Skeletal Radiol 2020 (belastete vs. unbelastete Aufnahmen: Winkel und Entscheidungen unterscheiden sich)
//   * Carrara C et al., Foot Ankle Surg 2020 (Übersicht der Winkel im belasteten Röntgen; uneinheitliche Begriffe)
// Leitplanken: keine Herstellerzahlen („auf ExpertInnen-Niveau“, „100 % wiederholbar“ NICHT übernommen), keine Normbereiche
// (keine im Original gelesene Quelle mit Normwerten → weggelassen), Beispielwerte im Bericht nicht bewerten, KI stellt keine
// Diagnose und ersetzt weder Befund noch orthopädische Untersuchung oder Therapieentscheidung. FROG ist laut kiSeries.js
// (inUse: false) auf der Website noch nicht als „bei uns im Einsatz“ bestätigt → neutral formuliert.
// Aufnahme im Stehen in dieser Praxis NICHT bestätigt → „je nach Fragestellung, bei Fehlstellungen häufig im Stehen“ (REVIEW).
// [geteilt] Metadaten; Text und Bildtexte: ki-frog.content.js

export const DESCRIPTION = "Fußröntgen in Graz: Wie Hallux valgus und Fußfehlstellungen im Röntgen vermessen werden, was die Winkel bedeuten und wie KI die Messung unterstützt.";

export const EXCERPT = "Ob Hallux valgus, Senkfuß oder Hohlfuß: Im Röntgen lassen sich Fußfehlstellungen über Winkel vermessen. Was die wichtigsten Messwerte bedeuten und wie die KI-Software IB Lab FROG die Messung unterstützt.";

export const FAQ = [
  {
    "question": "Brauche ich für das Fußröntgen einen Termin?",
    "answer": "Nein. Mit einer gültigen ärztlichen Zuweisung und e-card können Sie während der Röntgenzeiten ohne Termin kommen. Wenn Sie lieber zu einer fixen Zeit kommen möchten, lässt sich eine Wunschzeit reservieren."
  },
  {
    "question": "Warum wird der Fuß bei Fehlstellungen oft im Stehen geröntgt?",
    "answer": "Unter dem eigenen Körpergewicht zeigt der Fuß seine Stellung so, wie sie im Alltag ist. Unbelastet können Winkel anders ausfallen. Ob eine Aufnahme im Stehen nötig ist, richtet sich nach der Fragestellung auf der Zuweisung."
  },
  {
    "question": "Stellt die KI die Diagnose Hallux valgus?",
    "answer": "Nein. Die Software setzt Messpunkte und berechnet Winkel. Die Radiologin oder der Radiologe prüft jede Messung, korrigiert sie bei Bedarf und erstellt den Befund. Über die Behandlung entscheidet die behandelnde Ärztin oder der behandelnde Arzt."
  },
  {
    "question": "Kann man mit den Messwerten den Verlauf beobachten?",
    "answer": "Ja, wenn die Aufnahmen vergleichbar entstehen, also mit gleicher Ansicht und gleicher Belastung. Dann lassen sich Winkel von früheren und späteren Aufnahmen gegenüberstellen. Wie eine Veränderung einzuordnen ist, beurteilen Ärztinnen und Ärzte."
  },
  {
    "question": "Wird die KI-Messung auch bei Kindern verwendet?",
    "answer": "IB Lab FROG ist laut Hersteller für Fußröntgenaufnahmen von Personen ab 18 Jahren vorgesehen. Bei Kindern und Jugendlichen werden Röntgenbilder des Fußes ärztlich ohne diese Software ausgewertet."
  }
];

export const REVIEW = "Vor Veröffentlichung von der Praxis zu bestätigen: (1) Wird bei Fehlstellungen standardmäßig belastet im Stehen geröntgt (einbeinig/beidbeinig), oder nur, wenn es auf der Zuweisung steht? Text sagt vorsichtig „je nach Fragestellung, bei Fehlstellungen häufig im Stehen“. (2) Ab wann ist IB Lab FROG im Routinebetrieb, und wird es bei jedem Fußröntgen mit Fehlstellungsfrage oder nur auf Anforderung genutzt? Derzeit neutral formuliert (kein „bei uns im Einsatz“, kiSeries inUse: false). (3) Wird eine Kalibrierung für Längenmessungen verwendet (z. B. Kalibrierkugel)? Im Text nur allgemein „Längen hängen von der Vergrößerung ab“. (4) Stehen die FROG-Messwerte im schriftlichen Befund bzw. wird der FROG-Bericht mitgeschickt (ELGA/portal.marc.at)? Text sagt nur „Befund und Bilder“. (5) Deutsche Kurzbezeichnungen in der aufklappbaren Liste sind eigene Übersetzungen (Herstellerbericht nutzt teils andere, z. B. „Metatarsal-1-Basisreferenzwinkel“ für MDA) – fachlich gegenlesen. (6) Bewusst keine Normbereiche genannt (nur der Herstellerbericht enthält welche; keine im Original geprüfte Leitlinie mit Normwerten). (7) Herstelleraussagen „auf ExpertInnen-Niveau“, „100 % wiederholbar“, „spart Zeit“ bewusst nicht übernommen. (8) Hinweis „Beispielberichte des Herstellers (Demo-Datensätze, Personendaten entfernt)“ steht nur in MEDIA.note (KiMedia rendert ihn unter jeder Bildunterschrift), nicht doppelt in den captions. Beispielberichte: Demo-Datensätze, Bildmaße 900 × 1095 px (gleiches Seitenverhältnis wie REPORT in kiSeries.js); Freigabe der Abbildungen durch IB Lab.";


export const TITLE = "Hallux valgus und Fußfehlstellungen präzise vermessen";
