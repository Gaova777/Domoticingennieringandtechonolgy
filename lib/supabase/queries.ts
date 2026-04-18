import { supabasePublic } from './public';
import type { Filters } from '@/lib/filters';

export type DBProduct = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  reviews: number;
  stock: number;
  badges: string[];
  shortSpec: string | null;
  protocol: string | null;
  warrantyMonths: number;
  specs: Array<{ label: string; value: string }>;
  includes: string[];
  imageUrl: string | null;
  galleryUrls: string[];
  isFeatured: boolean;
  createdAt: string;
  brand: { slug: string; name: string };
  category: { slug: string; name: string; description: string | null };
};

type RawJoined = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  rating: number | string;
  reviews: number;
  stock: number;
  badges: string[] | null;
  short_spec: string | null;
  protocol: string | null;
  warranty_months: number;
  specs: unknown;
  includes: string[] | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  is_featured: boolean;
  created_at: string;
  category: { slug: string; name: string; description: string | null } | null;
  brand: { slug: string; name: string } | null;
};

const PRODUCT_SELECT = `
  id, slug, sku, name, description, price, compare_at_price, rating, reviews, stock,
  badges, short_spec, protocol, warranty_months, specs, includes,
  image_url, gallery_urls, is_featured, created_at,
  category:categories!inner(slug, name, description),
  brand:brands!inner(slug, name)
`;

function mapProduct(row: RawJoined): DBProduct {
  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    name: row.name,
    description: row.description ?? '',
    price: row.price,
    compareAtPrice: row.compare_at_price,
    rating: typeof row.rating === 'string' ? Number(row.rating) : row.rating,
    reviews: row.reviews,
    stock: row.stock,
    badges: row.badges ?? [],
    shortSpec: row.short_spec,
    protocol: row.protocol,
    warrantyMonths: row.warranty_months,
    specs: Array.isArray(row.specs)
      ? (row.specs as Array<{ label: string; value: string }>)
      : [],
    includes: row.includes ?? [],
    imageUrl: row.image_url,
    galleryUrls: row.gallery_urls ?? [],
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    brand: row.brand ?? { slug: '', name: '' },
    category: row.category ?? { slug: '', name: '', description: null },
  };
}

function escapePattern(raw: string): string {
  return raw.replace(/[%_,()]/g, '').trim();
}

export async function getProducts(filters: Filters): Promise<DBProduct[]> {
  const sb = supabasePublic();
  let q = sb
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_active', true);

  if (filters.category) {
    // filter on embedded resource
    q = q.eq('category.slug' as never, filters.category);
  }
  if (filters.brands.length > 0) {
    q = q.in('brand.slug' as never, filters.brands);
  }
  if (filters.minPrice !== undefined) {
    q = q.gte('price', filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    q = q.lte('price', filters.maxPrice);
  }
  if (filters.inStockOnly) {
    q = q.gt('stock', 0);
  }
  if (filters.query) {
    const safe = escapePattern(filters.query);
    if (safe.length > 0) {
      const pattern = `%${safe}%`;
      q = q.or(
        `name.ilike.${pattern},sku.ilike.${pattern},short_spec.ilike.${pattern}`,
      );
    }
  }

  switch (filters.sort) {
    case 'price-asc':
      q = q.order('price', { ascending: true });
      break;
    case 'price-desc':
      q = q.order('price', { ascending: false });
      break;
    case 'newest':
      q = q.order('created_at', { ascending: false });
      break;
    case 'rating':
      q = q.order('rating', { ascending: false });
      break;
    default:
      q = q.order('reviews', { ascending: false });
  }

  const { data, error } = await q;
  if (error) {
    console.error('[queries.getProducts]', error);
    throw error;
  }
  return (data as unknown as RawJoined[]).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<DBProduct | null> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('[queries.getProductBySlug]', error);
    throw error;
  }
  if (!data) return null;
  return mapProduct(data as unknown as RawJoined);
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 3,
): Promise<DBProduct[]> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_active', true)
    .eq('category.slug' as never, categorySlug)
    .neq('slug', excludeSlug)
    .limit(limit);

  if (error) {
    console.error('[queries.getRelatedProducts]', error);
    return [];
  }
  return (data as unknown as RawJoined[]).map(mapProduct);
}

export async function getFeaturedProducts(limit = 4): Promise<DBProduct[]> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('reviews', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[queries.getFeaturedProducts]', error);
    return [];
  }
  return (data as unknown as RawJoined[]).map(mapProduct);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from('products')
    .select('slug')
    .eq('is_active', true);
  if (error) {
    console.error('[queries.getAllProductSlugs]', error);
    return [];
  }
  return (data ?? []).map((r) => r.slug);
}

export async function getCatalogStats(): Promise<{ total: number }> {
  const sb = supabasePublic();
  const { count, error } = await sb
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
  if (error) return { total: 0 };
  return { total: count ?? 0 };
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export type DBService = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  longDescription: string | null;
  icon: string | null;
  accent: 'cyan' | 'magenta' | 'yellow' | 'green' | null;
  imageUrl: string | null;
  sortOrder: number;
};

function mapService(row: {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  long_description: string | null;
  icon: string | null;
  accent: string | null;
  image_url: string | null;
  sort_order: number;
}): DBService {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    longDescription: row.long_description,
    icon: row.icon,
    accent: (row.accent as DBService['accent']) ?? null,
    imageUrl: row.image_url,
    sortOrder: row.sort_order,
  };
}

export async function getServices(): Promise<DBService[]> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from('services')
    .select(
      'id, slug, name, tagline, description, long_description, icon, accent, image_url, sort_order',
    )
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('[queries.getServices]', error);
    return [];
  }
  return (data ?? []).map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<DBService | null> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from('services')
    .select(
      'id, slug, name, tagline, description, long_description, icon, accent, image_url, sort_order',
    )
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (error) {
    console.error('[queries.getServiceBySlug]', error);
    throw error;
  }
  if (!data) return null;
  return mapService(data);
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from('services')
    .select('slug')
    .eq('is_active', true);
  if (error) return [];
  return (data ?? []).map((r) => r.slug);
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export type DBTestimonial = {
  id: string;
  name: string;
  role: string | null;
  city: string | null;
  message: string;
  rating: number | null;
  service: string | null;
};

export async function getTestimonials(limit = 3): Promise<DBTestimonial[]> {
  const sb = supabasePublic();
  const { data, error } = await sb
    .from('testimonials')
    .select('id, name, role, city, message, rating, service')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(limit);
  if (error) return [];
  return data ?? [];
}
