import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Camera,
  KeyRound,
  DoorClosed,
  Cable,
  Lightbulb,
} from 'lucide-react';

export type ServiceTeaser = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: 'cyan' | 'magenta' | 'yellow' | 'green';
};

export const MOCK_SERVICES: ServiceTeaser[] = [
  {
    id: 'domotica',
    slug: 'domotica',
    name: 'Domótica residencial',
    tagline: 'Tu casa te escucha',
    description:
      'Iluminación, clima y escenas automatizadas con control por voz, app o sensores.',
    icon: Home,
    accent: 'cyan',
  },
  {
    id: 'camaras',
    slug: 'camaras',
    name: 'Cámaras y CCTV',
    tagline: 'Vigilancia 24/7',
    description:
      'Cámaras IP/analógicas, NVR, visión nocturna y acceso remoto desde el celular.',
    icon: Camera,
    accent: 'magenta',
  },
  {
    id: 'cerraduras',
    slug: 'cerraduras',
    name: 'Cerraduras inteligentes',
    tagline: 'Llaves que no se pierden',
    description:
      'Huella, clave, tarjeta RFID y app. Adiós a duplicar llaves cada semana.',
    icon: KeyRound,
    accent: 'yellow',
  },
  {
    id: 'puertas',
    slug: 'puertas',
    name: 'Puertas automáticas',
    tagline: 'Entra sin bajarte',
    description:
      'Corredizas, batientes, motores para garaje y talanqueras para conjuntos.',
    icon: DoorClosed,
    accent: 'green',
  },
  {
    id: 'iluminacion',
    slug: 'iluminacion',
    name: 'Iluminación inteligente',
    tagline: 'Escenas a tu medida',
    description:
      'Bombillos, cintas LED, dimmers con color y escenas programadas.',
    icon: Lightbulb,
    accent: 'cyan',
  },
  {
    id: 'cableado',
    slug: 'cableado',
    name: 'Cableado y redes',
    tagline: 'La base de todo',
    description:
      'Cableado estructurado, certificación, redes WiFi profesionales y switches PoE.',
    icon: Cable,
    accent: 'magenta',
  },
];
