import React from 'react';
import { Camera } from 'lucide-react';
import ServiceLayout from '../components/ServiceLayout';

const RoentgenPage = () => {
  return (
    <ServiceLayout
      title="Digitales Röntgen"
      subtitle="Bei uns werden ausschließlich digitale Röntgenaufnahmen durchgeführt. Das digitale Detektorfeld liefert hochaufgelöste Bilder bei deutlich geringerer Strahlenbelastung."
      icon={<Camera size={32} />}
      preparation={[
        'Schmuck und Metallgegenstände im Untersuchungsbereich bitte ablegen.',
        'Eine Schwangerschaft sollte ausgeschlossen sein!',
        'Bei manchen Aufnahmen wird Kontrastmittel eingesetzt – wir informieren Sie im Voraus, was dabei zu beachten ist.'
      ]}
      requirements={[
        'Überweisungsschein (Papier oder digital)',
        'Aktuelle e-Card',
        'Eventuelle Voraufnahmen zum Vergleich'
      ]}
      imageUrl="/assets/images/roentgen.jpg"
    >
      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Geringe Strahlenbelastung, maximale Auflösung</h2>
        <p>
          Mit einem Lungenröntgen können krankhafte Veränderungen der Lunge, des Brustkorbs, des Rippenfells und in gewissen Fällen auch des Herzens festgestellt bzw. diagnostiziert werden. Es ist eine wichtige Maßnahme der Früherkennung sowohl zur Vorsorge als auch zur Diagnose bei bestehenden Erkrankungen.
        </p>
        <p>
          Sollten Sie ein Lungenröntgen im Rahmen einer Narkosetauglichkeitsprüfung vor einer Operation benötigen, denken Sie daran, dass Ihr Lungenröntgen in diesem Fall <strong>nicht älter als 14 Tage</strong> sein sollte.
        </p>
        <p>
          Der Vorteil der digitalen Röntgenuntersuchung liegt neben der deutlich geringeren Strahlenbelastung in der umfangreichen Bildbearbeitungsmöglichkeit und der Archivierung der digital erstellten Bilder in unserem jederzeit abrufbaren Bildarchiv.
        </p>
        <p>
          Die Bilder können digital verschickt oder auf Datenträgern gespeichert werden. So können wir die Aufnahmen rasch an Ihren Haus- oder Facharzt schicken oder Ihnen auf einem handlichen Datenträger mitgeben.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-[Outfit]">Keine Wiederholungsaufnahmen nötig</h2>
        <p>
          Diese Technik vermeidet Wiederholungsaufnahmen und senkt damit zusätzliche Strahlenbelastung. Das Ergebnis Ihrer Untersuchung wird digital gespeichert und muss nicht neu durchgeführt werden, wenn etwa Aufnahmen verloren gehen.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-[Outfit]">Unser Untersuchungsspektrum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Skelettröntgen',
            'Lungenröntgen',
            'Röntgen der Speiseröhre und der Halsorgane',
            'Videokinematographie des Schluckaktes (Videoschluckakt)',
            'Magenröntgen',
            'Magen-/Dünndarmpassage',
            'Dickdarmröntgen im Doppelkontrast (Irrigoskopie)',
            'Darstellung der Eileiter bzw. -durchgängigkeit (Hysterosalpingographie)'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-[Outfit]">Kontrastmitteluntersuchungen</h2>
        <p className="mb-6 text-gray-600">
          Die Aufnahmen werden auf einer digitalen Workstation befundet und bei uns direkt digital archiviert. Die Bilder können Ihrem behandelnden Arzt bzw. Ärztin direkt digital übermittelt werden. Auch mit den steirischen Spitälern besteht eine direkte Verbindung über das MARC-System.
        </p>
        <p className="mb-6 text-gray-600">
          Manche Aufnahmen werden erst dann aussagekräftig, wenn Kontrastmittel eingesetzt werden. Wir informieren Sie im Voraus, unter welchen Umständen dies nötig ist.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Venenröntgen (Phlebographie)',
            'Nierenröntgen (IVP, AUG)'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
              <div className="w-2 h-2 bg-[#8B2323] rounded-full shrink-0" />
              <span className="text-sm font-medium text-[#8B2323]">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </ServiceLayout>
  );
};

export default RoentgenPage;
