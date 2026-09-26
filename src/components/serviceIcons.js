// Symbole je Leistung (Schlüssel wie in src/data/services.js)
import { HeartPulse, Bone, Scale, Scan, Waves, Monitor, Syringe } from 'lucide-react';
import { ToothIcon } from './CustomIcons';

export const serviceIcons = {
  mammographie: HeartPulse,
  knochendichte: Bone,
  koerperanalyse: Scale,
  roentgen: Scan,
  ultraschall: Waves,
  durchleuchtung: Monitor,
  phlebographie: Syringe,
  dvt: ToothIcon,
};
