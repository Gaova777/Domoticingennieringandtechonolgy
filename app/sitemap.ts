import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    '',
    '/productos',
    '/servicios',
    '/configurador',
    '/blog',
    '/contacto',
    '/cotizar',
    '/legal/terminos',
    '/legal/privacidad',
    '/legal/devoluciones',
    '/legal/garantia',
  ];

  return staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
