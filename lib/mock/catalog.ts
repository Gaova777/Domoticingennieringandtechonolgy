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

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badges: string[];
  shortSpec: string;
  protocol?: string;
  createdAt: string;
  warrantyMonths: number;
  description: string;
  specs: Array<{ label: string; value: string }>;
  includes?: string[];
};

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

export const CATALOG: Product[] = [
  {
    id: 'p-001',
    slug: 'hikvision-ds-2cd2043g2-ip-4mp',
    sku: 'HIK-2043G2',
    name: 'Cámara IP 4MP AcuSense',
    brand: 'hikvision',
    category: 'camaras',
    price: 480000,
    compareAtPrice: 550000,
    rating: 4.8,
    reviews: 124,
    stock: 12,
    badges: ['Envío gratis', 'AcuSense'],
    shortSpec: '4MP · IR 30m · IP67 · PoE',
    protocol: 'PoE',
    createdAt: '2026-02-10',
    warrantyMonths: 24,
    description:
      'Cámara IP bullet de 4MP con tecnología AcuSense — filtrado inteligente de alertas por humano/vehículo. Ideal para frente de vivienda o comercio.',
    specs: [
      { label: 'Resolución', value: '4 MP (2688 × 1520)' },
      { label: 'Visión nocturna', value: 'IR hasta 30 m' },
      { label: 'Protección', value: 'IP67' },
      { label: 'Alimentación', value: 'PoE 802.3af' },
      { label: 'Audio', value: 'Entrada/salida integrada' },
      { label: 'Codec', value: 'H.265+ · H.264' },
    ],
    includes: ['Cámara', 'Adaptador estanco', 'Kit de fijación', 'Manual'],
  },
  {
    id: 'p-002',
    slug: 'dahua-ipc-hfw2431s',
    sku: 'DAH-2431S',
    name: 'Dahua 4MP Color Night',
    brand: 'dahua',
    category: 'camaras',
    price: 520000,
    rating: 4.7,
    reviews: 89,
    stock: 8,
    badges: ['Color nocturno'],
    shortSpec: '4MP · Full color · IP67 · PoE',
    protocol: 'PoE',
    createdAt: '2026-03-01',
    warrantyMonths: 24,
    description:
      'Cámara bullet Dahua con visión nocturna a todo color gracias a su lente de apertura ampliada.',
    specs: [
      { label: 'Resolución', value: '4 MP' },
      { label: 'Visión nocturna', value: 'Color hasta 40 m' },
      { label: 'Protección', value: 'IP67' },
      { label: 'Alimentación', value: 'PoE' },
      { label: 'Codec', value: 'H.265' },
    ],
  },
  {
    id: 'p-003',
    slug: 'ezviz-c3n-exterior',
    sku: 'EZV-C3N',
    name: 'EZVIZ C3N Exterior',
    brand: 'ezviz',
    category: 'camaras',
    price: 265000,
    rating: 4.5,
    reviews: 198,
    stock: 23,
    badges: ['Color noche'],
    shortSpec: '1080p · IP67 · WiFi · App',
    protocol: 'WiFi',
    createdAt: '2026-01-20',
    warrantyMonths: 12,
    description:
      'Cámara WiFi exterior con visión a color en la noche y detección humana. Ideal para casa sin cableado.',
    specs: [
      { label: 'Resolución', value: '1080p Full HD' },
      { label: 'Conectividad', value: 'WiFi 2.4 GHz' },
      { label: 'Visión nocturna', value: 'Color hasta 25 m' },
      { label: 'Protección', value: 'IP67' },
      { label: 'Almacenamiento', value: 'microSD hasta 256 GB · Cloud' },
    ],
  },
  {
    id: 'p-004',
    slug: 'hikvision-ds-2de4425iw-ae',
    sku: 'HIK-PTZ4425',
    name: 'PTZ Hikvision 4MP 25x',
    brand: 'hikvision',
    category: 'camaras',
    price: 2850000,
    rating: 4.9,
    reviews: 42,
    stock: 3,
    badges: ['PTZ', 'AutoTracking'],
    shortSpec: '4MP · Zoom 25x · Auto-tracking · IP66',
    protocol: 'PoE+',
    createdAt: '2026-03-15',
    warrantyMonths: 36,
    description:
      'Cámara PTZ profesional con zoom óptico 25x y seguimiento automático. Para parqueaderos, bodegas y perímetros amplios.',
    specs: [
      { label: 'Resolución', value: '4 MP' },
      { label: 'Zoom', value: '25x óptico' },
      { label: 'Pan/Tilt', value: '360° / -15°–90°' },
      { label: 'Protección', value: 'IP66' },
    ],
  },
  {
    id: 'p-005',
    slug: 'sonoff-mini-r2',
    sku: 'SON-MINI-R2',
    name: 'Sonoff Mini R2 WiFi',
    brand: 'sonoff',
    category: 'domotica',
    price: 75000,
    rating: 4.7,
    reviews: 312,
    stock: 48,
    badges: ['Best seller'],
    shortSpec: '10 A · WiFi · Alexa/Google · eWeLink',
    protocol: 'WiFi',
    createdAt: '2025-11-01',
    warrantyMonths: 12,
    description:
      'Módulo relé WiFi para esconder detrás del interruptor físico. Conserva el control manual y agrega control por app/voz.',
    specs: [
      { label: 'Corriente máx.', value: '10 A' },
      { label: 'Conectividad', value: 'WiFi 2.4 GHz' },
      { label: 'Asistentes', value: 'Alexa · Google · SmartThings' },
      { label: 'API', value: 'eWeLink · Home Assistant' },
    ],
  },
  {
    id: 'p-006',
    slug: 'sonoff-basic-r4',
    sku: 'SON-BAS-R4',
    name: 'Sonoff Basic R4',
    brand: 'sonoff',
    category: 'domotica',
    price: 58000,
    rating: 4.6,
    reviews: 178,
    stock: 32,
    badges: [],
    shortSpec: '10 A · WiFi · Botón físico',
    protocol: 'WiFi',
    createdAt: '2026-01-08',
    warrantyMonths: 12,
    description: 'El clásico reinventado — relé WiFi económico para automatizar equipos.',
    specs: [
      { label: 'Corriente máx.', value: '10 A' },
      { label: 'Conectividad', value: 'WiFi 2.4 GHz' },
    ],
  },
  {
    id: 'p-007',
    slug: 'shelly-pro-4pm',
    sku: 'SHE-PRO4PM',
    name: 'Shelly Pro 4PM',
    brand: 'shelly',
    category: 'domotica',
    price: 420000,
    rating: 4.9,
    reviews: 67,
    stock: 5,
    badges: ['Profesional', 'DIN rail'],
    shortSpec: '4 canales · 16 A · Medición · WiFi/LAN',
    protocol: 'WiFi/LAN',
    createdAt: '2026-02-20',
    warrantyMonths: 24,
    description:
      'Módulo profesional de 4 canales con medición de consumo energético. Montaje en riel DIN.',
    specs: [
      { label: 'Canales', value: '4 independientes' },
      { label: 'Corriente', value: '16 A por canal' },
      { label: 'Conectividad', value: 'WiFi · LAN · BLE' },
      { label: 'Medición', value: 'Consumo en tiempo real' },
    ],
  },
  {
    id: 'p-008',
    slug: 'tuya-smart-lock-x7-huella',
    sku: 'TUY-X7',
    name: 'Cerradura Smart X7 Huella',
    brand: 'tuya',
    category: 'cerraduras',
    price: 620000,
    compareAtPrice: 720000,
    rating: 4.6,
    reviews: 87,
    stock: 6,
    badges: ['Instalación incluida'],
    shortSpec: 'Huella · Clave · RFID · App · Llave',
    protocol: 'BLE/WiFi',
    createdAt: '2026-01-15',
    warrantyMonths: 18,
    description:
      'Cerradura inteligente con 5 métodos de apertura. App Tuya con gestión de usuarios temporales.',
    specs: [
      { label: 'Apertura', value: 'Huella · Clave · RFID · App · Llave' },
      { label: 'Batería', value: '4 AA · 8 meses' },
      { label: 'App', value: 'Tuya Smart / Smart Life' },
    ],
    includes: ['Cerradura', '2 tarjetas RFID', '2 llaves', '4 pilas AA'],
  },
  {
    id: 'p-009',
    slug: 'aqara-u100-smart-lock',
    sku: 'AQA-U100',
    name: 'Aqara U100 Smart Lock',
    brand: 'aqara',
    category: 'cerraduras',
    price: 980000,
    rating: 4.8,
    reviews: 54,
    stock: 4,
    badges: ['Premium'],
    shortSpec: 'Huella · HomeKit · Zigbee · Apple Home Key',
    protocol: 'Zigbee',
    createdAt: '2026-03-05',
    warrantyMonths: 24,
    description:
      'Cerradura premium con soporte nativo Apple HomeKit y compatibilidad Matter.',
    specs: [
      { label: 'Apertura', value: 'Huella · Clave · NFC · App · HomeKey' },
      { label: 'Protocolo', value: 'Zigbee 3.0 · BLE' },
      { label: 'Matter', value: 'Soportado vía hub' },
    ],
  },
  {
    id: 'p-010',
    slug: 'aqara-motion-sensor-p1',
    sku: 'AQA-MS-P1',
    name: 'Sensor de movimiento P1',
    brand: 'aqara',
    category: 'sensores',
    price: 120000,
    rating: 4.7,
    reviews: 145,
    stock: 40,
    badges: [],
    shortSpec: 'PIR · Zigbee · 5 años batería',
    protocol: 'Zigbee',
    createdAt: '2025-12-10',
    warrantyMonths: 24,
    description:
      'Sensor PIR de alta precisión con ajuste de sensibilidad. Ideal para automatizaciones de iluminación.',
    specs: [
      { label: 'Protocolo', value: 'Zigbee 3.0' },
      { label: 'Batería', value: 'CR2450 · hasta 5 años' },
      { label: 'Alcance', value: '7 m · 170°' },
    ],
  },
  {
    id: 'p-011',
    slug: 'aqara-door-window-t1',
    sku: 'AQA-DW-T1',
    name: 'Sensor apertura T1',
    brand: 'aqara',
    category: 'sensores',
    price: 95000,
    rating: 4.8,
    reviews: 230,
    stock: 55,
    badges: [],
    shortSpec: 'Zigbee · 2 años batería · Ultra delgado',
    protocol: 'Zigbee',
    createdAt: '2025-10-22',
    warrantyMonths: 24,
    description:
      'Sensor magnético para puerta o ventana. Integra con escenas de seguridad y ahorro.',
    specs: [
      { label: 'Protocolo', value: 'Zigbee 3.0' },
      { label: 'Batería', value: 'CR1632' },
    ],
  },
  {
    id: 'p-012',
    slug: 'xiaomi-smoke-alarm',
    sku: 'XIA-SMOKE',
    name: 'Sensor de humo WiFi',
    brand: 'xiaomi',
    category: 'sensores',
    price: 180000,
    rating: 4.6,
    reviews: 98,
    stock: 18,
    badges: ['Certificado'],
    shortSpec: 'Detector foto-eléctrico · WiFi · 85 dB',
    protocol: 'WiFi',
    createdAt: '2026-02-28',
    warrantyMonths: 12,
    description:
      'Detector fotoeléctrico con sirena y notificación al celular. Certificación internacional.',
    specs: [
      { label: 'Detección', value: 'Fotoeléctrica' },
      { label: 'Sirena', value: '85 dB' },
      { label: 'Batería', value: '10 años' },
    ],
  },
  {
    id: 'p-013',
    slug: 'sonoff-water-leak',
    sku: 'SON-WATER',
    name: 'Sensor de inundación',
    brand: 'sonoff',
    category: 'sensores',
    price: 110000,
    rating: 4.5,
    reviews: 73,
    stock: 22,
    badges: [],
    shortSpec: 'Zigbee · Alarma inmediata · IP67',
    protocol: 'Zigbee',
    createdAt: '2026-03-10',
    warrantyMonths: 12,
    description:
      'Sensor de fuga de agua para colocar debajo de lavamanos, tanques o lavadoras.',
    specs: [
      { label: 'Protocolo', value: 'Zigbee' },
      { label: 'Protección', value: 'IP67' },
    ],
  },
  {
    id: 'p-014',
    slug: 'xiaomi-mi-led-smart-bulb',
    sku: 'XIA-BULB-E27',
    name: 'Bombillo LED WiFi E27',
    brand: 'xiaomi',
    category: 'iluminacion',
    price: 65000,
    rating: 4.5,
    reviews: 420,
    stock: 100,
    badges: ['16 millones de colores'],
    shortSpec: '9 W · RGB+CCT · WiFi · Mi Home',
    protocol: 'WiFi',
    createdAt: '2025-09-18',
    warrantyMonths: 12,
    description:
      'Bombillo inteligente con 16 millones de colores y temperatura ajustable.',
    specs: [
      { label: 'Potencia', value: '9 W (equiv. 60 W)' },
      { label: 'Base', value: 'E27' },
      { label: 'App', value: 'Mi Home · Alexa · Google' },
    ],
  },
  {
    id: 'p-015',
    slug: 'tuya-led-strip-rgbic',
    sku: 'TUY-STRIP-5M',
    name: 'Cinta LED RGBIC 5m',
    brand: 'tuya',
    category: 'iluminacion',
    price: 145000,
    rating: 4.6,
    reviews: 156,
    stock: 28,
    badges: [],
    shortSpec: '5m · RGBIC · Efectos · Música',
    protocol: 'WiFi',
    createdAt: '2026-01-28',
    warrantyMonths: 12,
    description:
      'Cinta LED con control por dirección (RGBIC) — permite efectos de onda y reactivos a la música.',
    specs: [
      { label: 'Longitud', value: '5 metros' },
      { label: 'Tipo', value: 'RGBIC' },
      { label: 'Control', value: 'WiFi · Control remoto · Mic' },
    ],
  },
  {
    id: 'p-016',
    slug: 'shelly-rgbw2-dimmer',
    sku: 'SHE-DIMMER2',
    name: 'Shelly Dimmer 2',
    brand: 'shelly',
    category: 'iluminacion',
    price: 285000,
    rating: 4.8,
    reviews: 91,
    stock: 11,
    badges: ['Sin neutro'],
    shortSpec: 'Dimmer · Sin neutro · WiFi · 200 W',
    protocol: 'WiFi',
    createdAt: '2026-02-05',
    warrantyMonths: 24,
    description:
      'Dimmer WiFi que funciona sin cable neutro — ideal para casas antiguas en Colombia.',
    specs: [
      { label: 'Potencia', value: '200 W máx' },
      { label: 'Neutro', value: 'No requerido' },
      { label: 'Conectividad', value: 'WiFi · BLE' },
    ],
  },
  {
    id: 'p-017',
    slug: 'motor-garaje-dks-500kg',
    sku: 'MOT-DKS500',
    name: 'Motor garaje DKS 500kg',
    brand: 'dahua',
    category: 'motores',
    price: 1450000,
    rating: 4.7,
    reviews: 38,
    stock: 4,
    badges: ['Instalación incluida'],
    shortSpec: 'Corrediza · 500 kg · Control remoto · Batería backup',
    createdAt: '2026-02-12',
    warrantyMonths: 24,
    description:
      'Motor para puerta corrediza de hasta 500 kg. Incluye instalación en Pereira y área metropolitana.',
    specs: [
      { label: 'Peso máx.', value: '500 kg' },
      { label: 'Tipo puerta', value: 'Corrediza' },
      { label: 'Control', value: '2 controles remotos incluidos' },
    ],
    includes: ['Motor', '2 controles', 'Ojo infrarrojo', 'Instalación'],
  },
  {
    id: 'p-018',
    slug: 'motor-portero-corredizo-ac2000',
    sku: 'MOT-AC2000',
    name: 'Motor corredizo AC2000',
    brand: 'dahua',
    category: 'motores',
    price: 2100000,
    rating: 4.8,
    reviews: 19,
    stock: 2,
    badges: ['Pesado', 'Industrial'],
    shortSpec: '2000 kg · Corrediza · 24 V DC · Uso intensivo',
    createdAt: '2026-03-20',
    warrantyMonths: 36,
    description:
      'Motor industrial para conjuntos residenciales o entradas de uso intensivo.',
    specs: [
      { label: 'Peso máx.', value: '2000 kg' },
      { label: 'Ciclos/día', value: '200+' },
      { label: 'Voltaje', value: '24 V DC' },
    ],
  },
  {
    id: 'p-019',
    slug: 'aqara-hub-m2',
    sku: 'AQA-HUB-M2',
    name: 'Aqara Hub M2',
    brand: 'aqara',
    category: 'hubs',
    price: 320000,
    rating: 4.7,
    reviews: 112,
    stock: 9,
    badges: ['Matter', 'HomeKit'],
    shortSpec: 'Zigbee · Matter · HomeKit · Alexa · Google',
    protocol: 'Zigbee+WiFi',
    createdAt: '2026-01-10',
    warrantyMonths: 24,
    description:
      'Gateway central Aqara con soporte multi-asistente. Puente entre Zigbee y red WiFi/Matter.',
    specs: [
      { label: 'Protocolos', value: 'Zigbee 3.0 · WiFi · BLE' },
      { label: 'Matter', value: 'Soportado' },
      { label: 'Plataformas', value: 'HomeKit · Alexa · Google' },
    ],
  },
  {
    id: 'p-020',
    slug: 'tuya-zigbee-gateway',
    sku: 'TUY-GW-ZB',
    name: 'Gateway Zigbee Tuya',
    brand: 'tuya',
    category: 'hubs',
    price: 175000,
    rating: 4.4,
    reviews: 88,
    stock: 14,
    badges: [],
    shortSpec: 'Zigbee · App Tuya · 128 dispositivos',
    protocol: 'Zigbee',
    createdAt: '2025-11-22',
    warrantyMonths: 12,
    description: 'Puente Zigbee para dispositivos Tuya/Smart Life. Hasta 128 dispositivos conectados.',
    specs: [
      { label: 'Protocolo', value: 'Zigbee 3.0' },
      { label: 'Capacidad', value: '128 dispositivos' },
    ],
  },
  {
    id: 'p-021',
    slug: 'ezviz-db1-doorbell',
    sku: 'EZV-DB1',
    name: 'Timbre con video DB1',
    brand: 'ezviz',
    category: 'camaras',
    price: 430000,
    rating: 4.5,
    reviews: 76,
    stock: 7,
    badges: ['Video + audio'],
    shortSpec: '2K · PIR · WiFi · Audio bidireccional',
    protocol: 'WiFi',
    createdAt: '2026-02-18',
    warrantyMonths: 18,
    description:
      'Timbre con cámara 2K, detección PIR y llamada bidireccional al celular.',
    specs: [
      { label: 'Resolución', value: '2K (1600p)' },
      { label: 'Campo de visión', value: '180°' },
      { label: 'Audio', value: 'Bidireccional' },
    ],
  },
  {
    id: 'p-022',
    slug: 'aqara-switch-dual-zigbee',
    sku: 'AQA-SWD2',
    name: 'Interruptor doble Zigbee',
    brand: 'aqara',
    category: 'domotica',
    price: 210000,
    rating: 4.8,
    reviews: 64,
    stock: 16,
    badges: ['Sin neutro'],
    shortSpec: '2 canales · Zigbee · Sin neutro · Premium',
    protocol: 'Zigbee',
    createdAt: '2026-03-08',
    warrantyMonths: 24,
    description:
      'Interruptor inteligente doble sin necesidad de cable neutro — instalación directa sobre el cableado existente.',
    specs: [
      { label: 'Canales', value: '2' },
      { label: 'Neutro', value: 'No requerido' },
      { label: 'Protocolo', value: 'Zigbee 3.0' },
    ],
  },
];

export function findProductBySlug(slug: string): Product | undefined {
  return CATALOG.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 3): Product[] {
  return CATALOG.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, limit);
}
