import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { CATALOG } from '@/lib/mock/catalog';

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

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = CATALOG.map((p) => ({
    url: `${base}/productos/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
