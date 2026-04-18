import type { LucideIcon } from 'lucide-react';
import { ShieldCheck, MapPin, Truck, Headphones } from 'lucide-react';

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: 'cyan' | 'magenta' | 'yellow' | 'green';
};

export const WHY_US: Feature[] = [
  {
    id: 'warranty',
    title: 'Garantía real',
    description: '12 a 24 meses en equipos y 6 meses en instalación.',
    icon: ShieldCheck,
    accent: 'cyan',
  },
  {
    id: 'local',
    title: 'Soporte local',
    description: 'Técnico en Pereira a menos de 30 minutos en caso de falla.',
    icon: MapPin,
    accent: 'magenta',
  },
  {
    id: 'shipping',
    title: 'Envío a toda Colombia',
    description: 'Gratis en pedidos superiores a $300.000 COP.',
    icon: Truck,
    accent: 'yellow',
  },
  {
    id: 'support',
    title: 'Asesoría sin costo',
    description: 'Te ayudamos a elegir el producto correcto antes de comprar.',
    icon: Headphones,
    accent: 'green',
  },
];
