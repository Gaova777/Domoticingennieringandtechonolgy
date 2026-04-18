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
