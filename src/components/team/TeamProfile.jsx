import { Link } from 'react-router-dom';
import { ArrowLeft, Award, BookOpen, CheckCircle2, Download, FileText } from 'lucide-react';
import Button from '../ui/Button';
import Hero from '../ui/Hero';
import Section from '../ui/Section';
import Card from '../ui/Card';
import { H3, NewWindow, textLink } from '../ui/Text';
import { imageUrl, imageSrcSet } from '../ui/Picture';
import { SITE_URL, findRoute } from '../../data/routes';

// Teamseite im Designsystem (Hero, Section, Card) – Layout für alle Ärzte; die Inhalte stehen in der jeweiligen
// Seite (pages/KalmarPage.jsx, pages/RieglerPage.jsx). Foto und Person-Schema aus src/data/team.js,
// Brotkrumen aus der Routentabelle (routes.js: crumb). Bewegung nur über vorhandene CSS-Klassen (card-lift).

const H2 = ({ id, children }) => (
  <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{children}</h2>
);

const IconBadge = ({ icon: Icon }) => (
  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand dark:bg-slate-800 dark:text-brand-300">
    <Icon size={22} aria-hidden="true" />
  </span>
);

const CardTitle = ({ icon, children }) => (
  <div className="flex items-center gap-3">
    <IconBadge icon={icon} />
    <H3 className="hyphens-manual">{children}</H3>
  </div>
);

const TeamProfile = ({ doctor, eyebrow, title, lead, philosophy, sections, expertise, diplomas, publications, publicationsNote, grants, cv }) => {
  const route = findRoute(doctor.path);
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: doctor.name,
    jobTitle: 'Facharzt für Radiologie',
    worksFor: {
      '@type': 'MedicalBusiness',
      name: 'Röntgen am Kai',
      '@id': `${SITE_URL}/#praxis`,
    },
    url: `${SITE_URL}${doctor.path}`,
    image: `${SITE_URL}/assets/images/${doctor.photo.name}.avif`,
    alumniOf: doctor.alumniOf,
    description: doctor.description,
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>

      <Hero
        breadcrumbs={[{ name: 'Startseite', href: '/' }, { name: route.crumb }]}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        image={{
          src: imageUrl(doctor.photo.name),
          srcSet: imageSrcSet(doctor.photo.name),
          sizes: '(max-width: 1023px) 100vw, 600px',
          alt: doctor.photo.alt,
          width: doctor.photo.width,
          height: doctor.photo.height,
          priority: true,
        }}
      />

      <Section labelledBy="philosophie-title">
        <Card tone="brand" className="max-w-4xl">
          <H2 id="philosophie-title">Medizinische Philosophie</H2>
          <p className="mt-4 text-lg italic leading-relaxed text-slate-700 dark:text-slate-200">{philosophy}</p>
        </Card>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Card key={s.title} className="card-lift">
              <CardTitle icon={s.icon}>{s.title}</CardTitle>
              <ol className="mt-6 space-y-5">
                {s.items.map((item) => (
                  <li key={item.date + item.text} className="border-l-2 border-brand-100 pl-4 dark:border-slate-700">
                    <p className="text-sm font-semibold text-brand dark:text-brand-300">{item.date}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">{item.text}</p>
                  </li>
                ))}
              </ol>
            </Card>
          ))}

          <Card className="card-lift">
            <CardTitle icon={Award}>{expertise.title}</CardTitle>
            <ul className="mt-6 space-y-3">
              {expertise.items.map((x) => (
                <li key={x} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-200">
                  <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand dark:text-brand-300" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
            <CardTitle icon={Award}>Fortbildungsdiplome und Zertifikate</CardTitle>
            <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {diplomas.map((d) => (
                <li key={d} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[0.95rem] font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                  <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-brand dark:text-brand-300" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {cv && (
          <div className="mt-8 flex flex-wrap gap-3" data-cv-downloads>
            {cv.map((c) => (
              <Button key={c.href} href={c.href} external variant="secondary" icon={Download} hrefLang={c.lang} data-cta="cv">
                {c.label}
              </Button>
            ))}
          </div>
        )}
      </Section>

      <Section tone="muted" labelledBy="publikationen-title">
        <div className="flex items-center gap-3">
          <IconBadge icon={BookOpen} />
          <H2 id="publikationen-title">Ausgewählte Publikationen</H2>
        </div>
        <ul className="mt-8 space-y-3">
          {publications.map((p) => {
            const pub = typeof p === 'string' ? { text: p } : p;
            return (
              <li key={pub.text}>
                {pub.pdf ? (
                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 leading-relaxed text-slate-800 hover:border-brand-200 hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-brand-300"
                  >
                    <span>{pub.text}<NewWindow /></span>
                    <FileText size={20} aria-hidden="true" className="mt-1 shrink-0 text-slate-500 group-hover:text-brand dark:text-slate-400 dark:group-hover:text-brand-300" />
                  </a>
                ) : (
                  <p className="rounded-xl border border-slate-200 bg-white p-5 leading-relaxed text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">{pub.text}</p>
                )}
              </li>
            );
          })}
        </ul>
        {publicationsNote && <p className="mt-6 text-sm italic text-slate-600 dark:text-slate-300">{publicationsNote}</p>}

        <div className="mt-12">
          <CardTitle icon={Award}>Forschungsgelder</CardTitle>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {grants.map((g) => (
            <li key={g.title}>
              <Card padding="p-5 sm:p-6" className="h-full">
                <p className="font-display text-2xl font-semibold text-brand dark:text-brand-300">{g.amount}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{g.source}</p>
                <p className="mt-2 text-sm italic leading-relaxed text-slate-600 dark:text-slate-300">{g.title}</p>
                {g.url && (
                  <a href={g.url} target="_blank" rel="noopener noreferrer" className={`${textLink} mt-2 text-sm`}>
                    Projekt-Website →<NewWindow />
                  </a>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="sm">
        <Link to="/" className={textLink}>
          <ArrowLeft size={18} aria-hidden="true" />
          Zurück zur Startseite
        </Link>
      </Section>
    </>
  );
};

export default TeamProfile;
