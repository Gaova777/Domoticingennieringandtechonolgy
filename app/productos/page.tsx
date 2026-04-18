import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CATEGORY_META } from '@/lib/mock/catalog';
import { parseFilters } from '@/lib/filters';
import { getCatalogStats } from '@/lib/supabase/queries';
import { FilterPanel } from '@/components/catalog/filter-panel';
import { SortSelector } from '@/components/catalog/sort-selector';
import { SearchInput } from '@/components/catalog/search-input';
import {
  ProductGrid,
  ProductGridSkeleton,
} from '@/components/catalog/product-grid';

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Catálogo de domótica, cámaras, cerraduras y accesorios. Envío a toda Colombia con soporte local en Pereira.',
};

export const revalidate = 60;

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const stats = await getCatalogStats();

  const categoryLabel = filters.category
    ? CATEGORY_META[filters.category].label
    : 'Todos los productos';

  return (
    <div className="border-t border-border">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Catálogo
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
            {categoryLabel}
            {filters.category ? (
              <span className="block font-sans text-base font-normal text-muted-foreground">
                {CATEGORY_META[filters.category].description}
              </span>
            ) : null}
          </h1>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <SearchInput />
            <div className="flex items-center gap-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
                {String(stats.total).padStart(2, '0')} productos
              </p>
              <SortSelector active={filters.sort} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <FilterPanel />

          <div>
            <Suspense
              key={JSON.stringify(filters)}
              fallback={<ProductGridSkeleton />}
            >
              <ProductGrid filters={filters} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
