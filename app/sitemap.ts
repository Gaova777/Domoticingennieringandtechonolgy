import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { getAllProductSlugs } from '@/lib/supabase/queries';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const slugs = await getAllProductSlugs();
  const productEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/productos/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
