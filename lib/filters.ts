import type { Brand, Category } from '@/lib/mock/catalog';

export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

export type Filters = {
  category?: Category;
  brands: Brand[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly: boolean;
  query?: string;
  sort: SortKey;
};

export const SORT_LABELS: Record<SortKey, string> = {
  relevance: 'Relevantes',
  'price-asc': 'Precio: menor a mayor',
  'price-desc': 'Precio: mayor a menor',
  newest: 'Más nuevos',
  rating: 'Mejor calificados',
};

function toArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : v.split(',').filter(Boolean);
}

export function parseFilters(
  search: Record<string, string | string[] | undefined>,
): Filters {
  const rawBrands = toArray(search.brand);
  const category =
    typeof search.cat === 'string' ? (search.cat as Category) : undefined;
  const minPrice = search.min ? Number(search.min) : undefined;
  const maxPrice = search.max ? Number(search.max) : undefined;
  const inStockOnly = search.stock === '1';
  const query = typeof search.q === 'string' ? search.q : undefined;
  const sort =
    (typeof search.sort === 'string' ? (search.sort as SortKey) : undefined) ??
    'relevance';

  return {
    category,
    brands: rawBrands as Brand[],
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    inStockOnly,
    query,
    sort,
  };
}

export function hasActiveFilters(f: Filters): boolean {
  return (
    !!f.category ||
    f.brands.length > 0 ||
    f.minPrice !== undefined ||
    f.maxPrice !== undefined ||
    f.inStockOnly ||
    !!f.query
  );
}
