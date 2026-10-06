import { Briefcase, GraduationCap } from 'lucide-react';
import TeamProfile from '../components/team/TeamProfile';
import { TEAM } from '../data/team';

// Teamseite Priv. Doz. Dr. Georg Riegler – Inhalte hier. Layout (Designsystem) und Person-Schema:
// components/team/TeamProfile.jsx; Foto und Schema-Angaben: data/team.js.

const sections = [
  {
    title: "Abschlüsse",
    icon: GraduationCap,
    items: [
      { date: "2019", text: "Venia docendi im Fach Radiologie, Medizinische Universität Wien" },
      { date: "2018", text: "Facharztdiplom für Radiologie, Medizinische Universität Wien; Auslandsaufenthalt Royal London Hospital, England" },
      { date: "2011", text: "Promotion in Humanmedizin, Medizinische Universität Wien; Auslandsaufenthalte (Medizinische Universität La Laguna Spanien, Medizinische Universität Las Palmas Spanien)" },
      { date: "2005", text: "Akademie für Physiotherapie Steyr" },
      { date: "2000", text: "Matura Bischöfliches Gymnasium Graz" }
    ]
  },
  {
    title: "Berufliche Laufbahn",
    icon: Briefcase,
    items: [
      { date: "Seit 2025", text: "Gesellschafter der Röntgen am Kai OG (Nachfolger Dr. Konrad Uranitsch)" },
      { date: "2017-2025", text: "Wahlarztordination Private Ultrasound Center mit Spezialisierung auf Hochauflösenden Ultraschall" },
      { date: "2017-2019", text: "Facharzt an der Univ. Klinik für Radiologie und Nuklearmedizin, Klinische Abteilung für Neuroradiologie und Muskuloskeletale Radiologie" }
    ]
  },
];

const expertises = [
  "Hochauflösende Ultraschall-Diagnostik",
  "Ultraschallgezielte minimalinvasive Therapien",
  "Diagnostik des Bewegungsapparates",
  "Erkrankungen des peripheren Nervensystems",
  "Interdisziplinäre Schmerztherapie",
  "Funktionelle Nervendiagnostik"
];

const diplomas = [
  "Diplom Sportmedizin",
  "Gültiges DFP Diplom",
  "ÖÄK Zertifikat Mammadiagnostik",
  "ÖÄK Zertifikat Angiologische Basisdiagnostik",
  "ÖÄK Zertifikat Sonographie Arterien",
  "ÖÄK Zertifikat Sonographie Venen",
  "ÖÄK Zertifikat Sonographie Hirnversorgende Arterien",
  "ÖÄK Zertifikat Sonographie SmallParts",
  "OAK Zertifikat Pädiatrische Sonographie",
  "ÖAK Zertifikat Abdomen",
  "ÖAK Zertifikat Sonographie Bewegungsapparat",
  "ÖAK Zertifikat Sonographie Schilddrüse",
  "ÖAK Zertifikat Urogenitale Sonographie",
  "ÖAK Zertifikat Weiblicher Unterbauch",
  "ÖGUM Zertifikat Nervensonographie",
  "ÖGUM Zertifikat Sonographie des Bewegungsapparates"
];

const base = import.meta.env.BASE_URL;
const publications = [
  { text: "Becciolini M, Tamborrini G, Pivec C, Riegler G: Ultrasound findings in 46 cases of incomplete release of the transverse carpal ligament in carpal tunnel surgery. Ultraschall Med 2026", pdf: `${base}publications/Becciolini_2026_incomplete_TCL_release.pdf` },
  { text: "Becciolini M, Pivec C, Raspanti A, Riegler G. Ultrasound of the Ulnar Nerve: A Pictorial Review: Part 2: Pathological Ultrasound Findings. J Ultrasound Med. 2024", pdf: `${base}publications/Becciolini_2024_Ulnar_Nerve_Part2_Pathological.pdf` },
  { text: "Becciolini M, Pivec C, Raspanti A, Riegler G. Ultrasound of the Ulnar Nerve: A Pictorial Review: Part 1: Normal Ultrasound Findings. J Ultrasound Med. 2024", pdf: `${base}publications/Becciolini_2024_Ulnar_Nerve_Part1_Normal.pdf` },
  { text: "Becciolini M, Pivec C, Riegler G. Ultrasound of the Lateral Femoral Cutaneous Nerve: A Review of the Literature and Pictorial Essay. J Ultrasound Med. 2022", pdf: `${base}publications/Becciolini_2022_Lateral_Femoral_Cutaneous_Nerve.pdf` },
  { text: "Becciolini M, Raspanti A, De Scisciolo G, Riegler G. Radial nerve palsy: If in doubt, use ultrasound. J Clin Ultrasound. 2022", pdf: `${base}publications/Becciolini_2022_Radial_nerve_palsy.pdf` },
  { text: "Becciolini M, Pivec C, Raspanti A, Riegler G. Ultrasound of the Radial Nerve: A Pictorial Review. J Ultrasound Med. 2021", pdf: `${base}publications/Becciolini_2021_Radial_Nerve_Pictorial_Review.pdf` },
  { text: "Becciolini M, Pivec C, Riegler G. Ultrasound Imaging of the Deep Peroneal Nerve. J Ultrasound Med. 2021", pdf: `${base}publications/Becciolini_2021_Deep_Peroneal_Nerve.pdf` },
  { text: "Riegler G, Pivec C, Jengojan S, Mayer JA, Schellen C, Trattnig S, Bodner G. Cutaneous nerve fields of the anteromedial lower limb — Determination with selective ultrasound-guided nerve blockade. Clin Anat. 2021", pdf: `${base}publications/Riegler_2021_Cutaneous_nerve_anteromedial_lower_limb.pdf` },
  { text: "Pivec C, Bodner G, Mayer JA, Brugger PC, Paraszti I, Moser V, Traxler H, Riegler G. Novel demonstration of the anterior femoral cutaneous nerves using ultrasound. Ultraschall Med. 2018", pdf: `${base}publications/Pivec_2018_Anterior_Femoral_Cutaneous_Nerves.pdf` },
  { text: "Riegler G, Brugger PC, Gruber GM, Pivec C, Jengojan S, Bodner G. High-resolution ultrasound visualization of Pacinian corpuscles. Ultrasound in Medicine and Biology. 2018", pdf: `${base}publications/Riegler_2018_Pacinian_Corpuscles.pdf` },
  { text: "Riegler G, Jengojan S, Mayer JA, Pivec C, Platzgummer H, Brugger PC, Aszmann O, Bodner G. Ultrasound anatomical demonstration of the infrapatellar nerve branches. Arthroscopy. 2018", pdf: `${base}publications/Riegler_2018_Infrapatellar_Nerve_Branches.pdf` },
  { text: "Riegler G, Lieba-Samal D, Brugger PC, Pivec C, Platzgummer H, Vierhapper M, Muschitz G, Jengojan S, Bodner G. High-resolution ultrasound visualization of the deep branch of the ulnar nerve. Muscle Nerve. 2017", pdf: `${base}publications/Riegler_2017_Deep_Branch_Ulnar_Nerve.pdf` },
  { text: "Riegler G, Pivec C, Platzgummer H, Lieba-Samal D, Brugger P, Jengojan S, Vierhapper M, Bodner G. High-resolution ultrasound visualization of the recurrent motor branch of the median nerve: normal and first pathological findings. Eur Radiol. 2017", pdf: `${base}publications/Riegler_2017_Recurrent_Motor_Branch_Median_Nerve.pdf` },
  { text: "Riegler G, Drlicek G, Kronnerwetter C, Heule R, Bieri O, Bodner G, Lieba-Samal D, Trattnig S. High-Resolution Axonal Bundle (fascicle) Assessment and Triple-Echo Steady-State T2 Mapping of the Median Nerve at 7 Tesla: Preliminary Experience. Invest Radiol. 2016", pdf: `${base}publications/Riegler_2016_Axonal_Bundle_7Tesla.pdf` }
];

const grants = [
  { amount: "100.000 €", source: "Austrian National Bank, Jubilee Research Funds", title: "Early detection of cartilage damage, synovitis, and tenosynovitis in patients with rheumatoid arthritis at 7 Tesla Magnetic Resonance Imaging" },
  { amount: "10.000 €", source: "Medical Scientific Fund of the Mayor of the City of Vienna", title: "High-resolution ultrasound visualization of the cutaneous innervation at the anteromedial side of the knee" }
];

const RieglerPage = () => (
  <TeamProfile
    doctor={TEAM.riegler}
    eyebrow="Facharzt für Radiologie"
    title={<>Priv. Doz. Dr. med. univ. <br />Georg Riegler</>}
    lead="Gesellschafter der Röntgen am Kai OG"
    philosophy={'"Bestmögliche Beschwerdefreiheit meiner Patientinnen und Patienten. Ein hohes Ziel, das von Anfang an meine medizinische Laufbahn und mein Handeln prägte."'}
    sections={sections}
    expertise={{ title: 'Leistungen & Expertise', items: expertises }}
    diplomas={diplomas}
    publications={publications}
    grants={grants}
  />
);

export default RieglerPage;
