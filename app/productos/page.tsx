import type { Metadata } from 'next';
import { CATALOG, CATEGORY_META } from '@/lib/mock/catalog';
import { applyFilters, parseFilters, hasActiveFilters } from '@/lib/filters';
import { FilterPanel } from '@/components/catalog/filter-panel';
import { SortSelector } from '@/components/catalog/sort-selector';
import { SearchInput } from '@/components/catalog/search-input';
import { ProductCard } from '@/components/shared/product-card';

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Catálogo de domótica, cámaras, cerraduras y accesorios. Envío a toda Colombia con soporte local en Pereira.',
};

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const products = applyFilters(filters);
  const total = CATALOG.length;
  const shown = products.length;

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
                {String(shown).padStart(2, '0')} / {String(total).padStart(2, '0')}{' '}
                productos
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
            {shown === 0 ? (
              <EmptyState
                resetHref={hasActiveFilters(filters) ? '/productos' : undefined}
              />
            ) : (
              <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p, i) => (
                  <li key={p.id}>
                    <ProductCard product={p} index={i + 1} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ resetHref }: { resetHref?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-start justify-center gap-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Sin resultados
      </p>
      <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
        No encontramos productos que cumplan estos filtros.
      </h2>
      {resetHref ? (
        <a
          href={resetHref}
          className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
        >
          Limpiar filtros →
        </a>
      ) : null}
    </div>
  );
}
