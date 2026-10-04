import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { services, serviceKeyByPath } from '../data/services';
import { OTHER_EXAMS } from '../data/navigation';
import Container from './ui/Container';
import Breadcrumbs from './ui/Breadcrumbs';
import Card from './ui/Card';
import { Lead } from './ui/Heading';
import { BookingButton, PhoneButton } from './ui/BookingButtons';
import ReferralInfo from './ui/ReferralInfo';
import PriceList from './ui/PriceList';

// Vorlage für Leistungsseiten. Die Seiten (src/pages/*Page.jsx) liefern Titel, Einleitung und Inhalt;
// Termin-, Kassen- und Preisangaben kommen zentral aus src/data/services.js.
const ListBlock = ({ title, items }) => (
  <div>
    <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
    <ul className="space-y-2 text-slate-700 dark:text-slate-200">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-brand-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ServiceLayout = ({ title, subtitle, children, icon, preparation, requirements, imageUrl, customImage, crumbs: crumbsProp, status, bookingNote }) => {
  const { pathname } = useLocation();
  const key = serviceKeyByPath(pathname);
  const service = key ? services[key] : null;
  const isOther = OTHER_EXAMS.some((e) => pathname.replace(/\/+$/, '') === e.href);

  const crumbs = crumbsProp || [
    { name: 'Startseite', href: '/' },
    ...(isOther ? [{ name: 'Weitere Untersuchungen', href: '/weitere-untersuchungen' }] : []),
    { name: title },
  ];

  const imgSrc = imageUrl
    ? imageUrl.startsWith('/') ? `${import.meta.env.BASE_URL}${imageUrl.substring(1)}` : imageUrl
    : null;

  return (
    <article className="pb-16 sm:pb-24">
      <div className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Container className="py-8 sm:py-12">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 flex items-start gap-4">
            {icon && (
              <div aria-hidden="true" className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm dark:bg-slate-800 dark:text-brand-300 sm:flex">
                {React.cloneElement(icon, { size: 28 })}
              </div>
            )}
            <div className="min-w-0">
              <h1 id="page-title" className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {status && <div className="mt-4">{status}</div>}
              {subtitle && <Lead className="mt-4 max-w-3xl">{subtitle}</Lead>}
              {service?.durationMinutes && (
                <p className="mt-4 inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <Clock size={18} aria-hidden="true" className="text-brand dark:text-brand-300" />
                  Dauer: etwa {service.durationMinutes} Minuten
                </p>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="min-w-0 lg:col-span-2">
            {customImage ||
              (imgSrc && (
                <div className="mb-10 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={imgSrc}
                    srcSet={imgSrc.endsWith('.avif') ? `${imgSrc.replace(/\.avif$/, '-mobile.avif')} 800w, ${imgSrc.replace(/\.avif$/, '-tablet.avif')} 1200w, ${imgSrc} 1920w` : undefined}
                    sizes="(max-width: 1023px) 100vw, 740px"
                    alt=""
                    width="1200"
                    height="600"
                    className="h-56 w-full object-cover sm:h-80"
                  />
                </div>
              ))}

            <div className="service-content text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-200">
              {children}
            </div>

            {(preparation || requirements) && (
              <Card tone="muted" as="section" aria-labelledby="info-title" className="mt-12">
                <h2 id="info-title" className="mb-6 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Wichtige Informationen
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {preparation && <ListBlock title="Vorbereitung" items={preparation} />}
                  {requirements && <ListBlock title="Bitte mitbringen" items={requirements} />}
                </div>
              </Card>
            )}
          </div>

          <aside aria-label="Termin und Kosten" className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-[calc(var(--header-height)+24px)]">
              <Card tone="brand" data-exam-cta={key || undefined}>
                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Termin vereinbaren</h2>
                {status && <div className="mt-3">{status}</div>}
                {bookingNote ? (
                  <div className="mt-4">{bookingNote}</div>
                ) : (
                  <>
                    <p className="mt-2 text-slate-700 dark:text-slate-200">
                      {service?.onlineBooking
                        ? 'Buchen Sie Ihren Termin online oder rufen Sie uns an.'
                        : 'Termine für diese Untersuchung vereinbaren Sie bitte telefonisch.'}
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      {service?.onlineBooking && <BookingButton block />}
                      <PhoneButton block variant={service?.onlineBooking ? 'secondary' : 'primary'} />
                    </div>
                  </>
                )}
              </Card>

              <Card>
                <ReferralInfo serviceKey={key} headingLevel={2} />
              </Card>

              {service?.priceIds && (
                <Card>
                  <PriceList ids={service.priceIds} headingLevel={2} />
                </Card>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
};

export default ServiceLayout;
