export const SITE = {
  name: 'Domotic E Ingeniería',
  tagline: 'Tecnología a tu alcance',
  description:
    'Instalación e e-commerce de domótica, cámaras de seguridad, cerraduras inteligentes y puertas automáticas en Pereira, Risaralda. Asesoría profesional y marcas reconocidas.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://domoticingennieringandtechonolgy.vercel.app',
  locale: 'es-CO',
  currency: 'COP',
  city: 'Pereira',
  region: 'Risaralda',
  country: 'CO',
} as const;

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+573001234567',
  email: 'contacto@domoticeingenieria.co',
  phone: '+57 300 123 4567',
  nit: '900.123.456-7',
  address: 'Carrera X # XX-XX, Pereira, Risaralda, Colombia',
  hours: 'Lunes a Viernes 8:00 – 18:00 · Sábados 9:00 – 13:00',
  social: {
    instagram: 'https://www.instagram.com/domoticeingenieria',
    facebook: 'https://www.facebook.com/domoticeingenieria',
    tiktok: 'https://www.tiktok.com/@domoticeingenieria',
  },
} as const;

export const SHIPPING = {
  flatRateCop: 15000,
  freeShippingThresholdCop: 300000,
} as const;

export function waLink(message: string): string {
  const number = CONTACT.whatsapp.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export function formatCop(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}
