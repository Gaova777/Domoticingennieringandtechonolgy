export type ProductTeaser = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badges: string[];
  shortSpec: string;
  image?: string;
};

export const MOCK_FEATURED_PRODUCTS: ProductTeaser[] = [
  {
    id: 'hik-ds-2cd2043g2',
    slug: 'hikvision-ds-2cd2043g2-ip-4mp',
    name: 'Cámara IP 4MP AcuSense',
    brand: 'Hikvision',
    category: 'Cámaras',
    price: 480000,
    compareAtPrice: 550000,
    rating: 4.8,
    reviews: 124,
    stock: 12,
    badges: ['Envío gratis', 'AcuSense'],
    shortSpec: '4MP · IR 30m · IP67 · PoE',
  },
  {
    id: 'sonoff-mini-r2',
    slug: 'sonoff-mini-r2',
    name: 'Sonoff Mini R2 WiFi',
    brand: 'Sonoff',
    category: 'Domótica',
    price: 75000,
    rating: 4.7,
    reviews: 312,
    stock: 48,
    badges: ['Best seller'],
    shortSpec: '10A · WiFi · Alexa/Google · eWeLink',
  },
  {
    id: 'tuya-smartlock-x7',
    slug: 'tuya-smart-lock-x7-huella',
    name: 'Cerradura Smart X7 Huella',
    brand: 'Tuya',
    category: 'Cerraduras',
    price: 620000,
    compareAtPrice: 720000,
    rating: 4.6,
    reviews: 87,
    stock: 6,
    badges: ['Instalación incluida'],
    shortSpec: 'Huella · Clave · RFID · App · Llave física',
  },
  {
    id: 'ezviz-c3n',
    slug: 'ezviz-c3n-exterior',
    name: 'EZVIZ C3N Exterior',
    brand: 'EZVIZ',
    category: 'Cámaras',
    price: 265000,
    rating: 4.5,
    reviews: 198,
    stock: 23,
    badges: ['Visión nocturna color'],
    shortSpec: '1080p · IP67 · Color Night · Detección humana',
  },
];

export type CameraCompareRow = {
  id: string;
  name: string;
  brand: string;
  resolution: string;
  nightRangeM: number;
  ipRating: string;
  has4k: boolean;
  hasColorNight: boolean;
  priceFrom: number;
};

export const MOCK_CAMERA_COMPARE: CameraCompareRow[] = [
  {
    id: 'hik-ds-2cd2043g2',
    name: 'DS-2CD2043G2 4MP',
    brand: 'Hikvision',
    resolution: '4 MP',
    nightRangeM: 30,
    ipRating: 'IP67',
    has4k: false,
    hasColorNight: false,
    priceFrom: 480000,
  },
  {
    id: 'dahua-ipc-hfw2431s',
    name: 'IPC-HFW2431S 4MP',
    brand: 'Dahua',
    resolution: '4 MP',
    nightRangeM: 40,
    ipRating: 'IP67',
    has4k: false,
    hasColorNight: true,
    priceFrom: 520000,
  },
  {
    id: 'ezviz-c3n',
    name: 'C3N Color Night',
    brand: 'EZVIZ',
    resolution: '2 MP',
    nightRangeM: 25,
    ipRating: 'IP67',
    has4k: false,
    hasColorNight: true,
    priceFrom: 265000,
  },
];
