import { Briefcase, GraduationCap } from 'lucide-react';
import TeamProfile from '../components/team/TeamProfile';
import { TEAM } from '../data/team';

// Teamseite Priv. Doz. Dr. Peter Kalmar – Inhalte hier. Layout (Designsystem) und Person-Schema:
// components/team/TeamProfile.jsx; Foto und Schema-Angaben: data/team.js.

const sections = [
  {
    title: "Abschlüsse",
    icon: GraduationCap,
    items: [
      { date: "2016", text: "Venia docendi im Fach Radiologie, Medizinische Universität Graz" },
      { date: "2014", text: "Facharztdiplom für Radiologie, Medizinische Universität Graz" },
      { date: "2011", text: "Master of Health Business Administration (MHBA), Friedrich-Alexander-Universität, Nürnberg" },
      { date: "2007", text: "Promotion in Humanmedizin, Medizinische Universität Graz. Dissertation: \"Das kindliche Schädel-Hirn-Trauma unter besonderer Berücksichtigung des Screenings mit S-100B\" Gesamtnote: Sehr gut" },
      { date: "2000", text: "Matura, Kollegium Aloisianum Linz" }
    ]
  },
  {
    title: "Berufliche Laufbahn",
    icon: Briefcase,
    items: [
      { date: "seit 2023", text: "Gesellschafter der Röntgen am Kai OG (Nachfolger von Dr. Günter Porsch)" },
      { date: "2022-2023", text: "Primararzt der Institute für Radiologie im Krankenhaus der Elisabethinen Graz und Marienkrankenhaus Vorau" },
      { date: "2021-2022", text: "Primararzt des Instituts für Radiologie im Marienkrankenhaus Vorau" },
      { date: "2019-2020", text: "Weiterbildung im Fach Nuklearmedizin an der Univ.-Klinik für Radiologie Graz" },
      { date: "2015-2021", text: "Wahlarztordination für Radiologie mit Spezialisierung auf Gefäßtherapie" },
      { date: "2014-2019", text: "Oberarzt an der Univ.-Klinik für Radiologie Graz, Abt. für Vaskuläre und Interventionelle Radiologie" }
    ]
  }
];

const expertises = [
  "Minimal-invasive perkutane aortale/arterielle und venöse Therapie",
  "Minimal-invasive Tumortherapie: RFA, SIRT, TACE",
  "Endovaskuläre Aortenprothesenimplantation (EVAR/TEVAR)",
  "Becken-Bein-Angiographie & Rekanalisation",
  "Therapie venöser Malformationen",
  "Computertomographie & Interventionelle CT",
  "Magnetresonanztomographie (Neuro, Cardio, Ortho)",
  "Farbcodierte Duplexsonographie der Gefäße"
];

const diplomas = [
  "Gültiges DFP Diplom",
  "ÖÄK Diplom Kur-, Präventivmedizin und Wellness",
  "ÖÄK Zertifikat Mammadiagnostik",
  "ÖÄK Zertifikat Angiologische Basisdiagnostik",
  "ÖÄK Zertifikat Sonographie Arterien",
  "ÖÄK Zertifikat Sonographie Venen",
  "ÖÄK Zertifikat Sonographie Hirnversorgende Arterien",
  "ÖÄK Zertifikat Sonographie SmallParts",
  "ÖGIR Qualifizierung und Spezialisierung in Interventioneller Radiologie (Stufe 1 und 2)"
];

const publications = [
  "Kalmar, P; et al. (2014). Placement of hemoparin-coated stents in the iliac arteries. Eur J Radiol.",
  "Kalmar, P; et al. (2015). Is Embolization an Effective Treatment for Recurrent Hemorrhage After Arthroplasty? CORR.",
  "Tschauner S, Kalmar P, et al. (2015). European Guidelines for AP/PA chest X-rays: routinely satisfiable in a paediatric radiology division? Eur. Radiol",
  "Kalmar, P; et al. (2016). Gadolinium-free MR in coarctation. Clinical Imaging.",
  "Mahmud, E; Kalmar, P; et al. (2016). Feasibility and Safety of Robotic Peripheral Vascular Interventions: Results of the RAPID Trial. JACC. Cardiovasc. Interv.",
  "Weir, P; Kalmar, P; et al. (2018). Go-Smart: Open-Ended, Web-Based Modelling of Minimally Invasive Cancer Treatments. Plos One.",
  "Belyavskaya, T; Kalmar, P; et al. (2019). Aortic Stenting in Symptomatic Infrarenal Aortic Stenosis. Vasc Endovasc Surg.",
  "Mahmud, E; Kalmar, P; et al. (2020). Robotic Peripheral Vascular Intervention. J Invasive Cardiol.",
  "Hatzl, S; Kalmar, P; et al. (2021). Prognostic Value of Baseline and Interim PET Markers in DLBCL. Hemasphere."
];

const grants = [
  { amount: "50.000 €", source: "EU Commission", title: "Generic Open-End Simulation Environment For Minimally Invasive Cancer Treatment (GoSMART)", url: "http://www.gosmart-project.eu/partners.html" }
];

const KalmarPage = () => (
  <TeamProfile
    doctor={TEAM.kalmar}
    eyebrow="Facharzt für Radiologie"
    title={<>Priv. Doz. Dr. med. univ. <br />Peter Kalmar, MHBA</>}
    lead="Gesellschafter der Röntgen am Kai OG"
    philosophy={'"Innovative Radiologie mit Wertschätzung. Mein Ziel: Diagnostische Sicherheit durch moderne Technik, vermittelt mit Ruhe und Respekt."'}
    sections={sections}
    expertise={{ title: 'Akademische Schwerpunkte', items: expertises }}
    diplomas={diplomas}
    publications={publications}
    publicationsNote="Zahlreiche internationale Kongressbeiträge und Publikationen in internationalen Fachzeitschriften."
    grants={grants}
  />
);

export default KalmarPage;
