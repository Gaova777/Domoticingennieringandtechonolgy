import type { DBProduct } from '@/lib/supabase/queries';
import type { Filters } from '@/lib/filters';

function escape(raw: string): string {
  return raw.trim().toLowerCase();
}

export function applyClientFilters(
  products: DBProduct[],
  filters: Filters,
): DBProduct[] {
  let out = products;

  if (filters.category) {
    out = out.filter((p) => p.category.slug === filters.category);
  }
  if (filters.brands.length > 0) {
    const brands = new Set(filters.brands as string[]);
    out = out.filter((p) => brands.has(p.brand.slug));
  }
  if (filters.minPrice !== undefined) {
    out = out.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    out = out.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.inStockOnly) {
    out = out.filter((p) => p.stock > 0);
  }
  if (filters.query) {
    const q = escape(filters.query);
    if (q.length > 0) {
      out = out.filter((p) => {
        const hay = `${p.name} ${p.sku} ${p.shortSpec ?? ''} ${p.brand.name} ${p.category.name}`.toLowerCase();
        return hay.includes(q);
      });
    }
  }

  switch (filters.sort) {
    case 'price-asc':
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      out = [...out].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case 'rating':
      out = [...out].sort((a, b) => b.rating - a.rating);
      break;
    case 'relevance':
    default:
      out = [...out].sort((a, b) => b.reviews - a.reviews);
  }

  return out;
}

export function serializeFilters(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.category) params.set('cat', filters.category);
  if (filters.brands.length > 0) params.set('brand', filters.brands.join(','));
  if (filters.minPrice !== undefined) params.set('min', String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set('max', String(filters.maxPrice));
  if (filters.inStockOnly) params.set('stock', '1');
  if (filters.query) params.set('q', filters.query);
  if (filters.sort !== 'relevance') params.set('sort', filters.sort);
  return params.toString();
}
