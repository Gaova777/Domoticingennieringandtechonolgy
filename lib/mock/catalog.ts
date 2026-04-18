// UI label source for filter options and breadcrumbs.
// Kept hardcoded until the admin panel can manage categories/brands live.

export type Category =
  | 'camaras'
  | 'cerraduras'
  | 'domotica'
  | 'sensores'
  | 'iluminacion'
  | 'motores'
  | 'hubs';

export type Brand =
  | 'hikvision'
  | 'dahua'
  | 'ezviz'
  | 'sonoff'
  | 'tuya'
  | 'shelly'
  | 'xiaomi'
  | 'aqara';

export const CATEGORY_META: Record<Category, { label: string; description: string }> = {
  camaras: { label: 'Cámaras', description: 'IP, analógicas, PTZ y bullet' },
  cerraduras: { label: 'Cerraduras', description: 'Huella, clave, RFID y biométricas' },
  domotica: { label: 'Domótica', description: 'Interruptores y módulos WiFi/Zigbee' },
  sensores: { label: 'Sensores', description: 'Movimiento, humo, apertura, inundación' },
  iluminacion: { label: 'Iluminación', description: 'Bombillos, cintas LED, dimmers' },
  motores: { label: 'Motores', description: 'Puertas corredizas, garaje, talanqueras' },
  hubs: { label: 'Hubs & Gateways', description: 'Controladores y puentes multi-protocolo' },
};

export const BRAND_META: Record<Brand, { label: string }> = {
  hikvision: { label: 'Hikvision' },
  dahua: { label: 'Dahua' },
  ezviz: { label: 'EZVIZ' },
  sonoff: { label: 'Sonoff' },
  tuya: { label: 'Tuya' },
  shelly: { label: 'Shelly' },
  xiaomi: { label: 'Xiaomi' },
  aqara: { label: 'Aqara' },
};

// Category accent colors — each category gets a token from the logo palette.
// Used sparingly on cards (dot) and hovers to inject color without noise.
export type AccentColor = 'cyan' | 'magenta' | 'yellow' | 'green' | 'orange' | 'purple';

export const CATEGORY_ACCENT: Record<Category, AccentColor> = {
  camaras: 'cyan',
  cerraduras: 'purple',
  domotica: 'magenta',
  sensores: 'green',
  iluminacion: 'yellow',
  motores: 'orange',
  hubs: 'cyan',
};

export const ACCENT_DOT_CLASS: Record<AccentColor, string> = {
  cyan: 'bg-brand-cyan',
  magenta: 'bg-brand-magenta',
  yellow: 'bg-brand-yellow',
  green: 'bg-brand-green',
  orange: 'bg-brand-orange',
  purple: 'bg-brand-purple',
};

export const ACCENT_TEXT_CLASS: Record<AccentColor, string> = {
  cyan: 'text-brand-cyan',
  magenta: 'text-brand-magenta',
  yellow: 'text-brand-yellow',
  green: 'text-brand-green',
  orange: 'text-brand-orange',
  purple: 'text-brand-purple',
};

export const ACCENT_BORDER_CLASS: Record<AccentColor, string> = {
  cyan: 'border-brand-cyan/40',
  magenta: 'border-brand-magenta/40',
  yellow: 'border-brand-yellow/40',
  green: 'border-brand-green/40',
  orange: 'border-brand-orange/40',
  purple: 'border-brand-purple/40',
};

