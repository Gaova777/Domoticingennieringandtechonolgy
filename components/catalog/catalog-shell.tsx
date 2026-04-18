'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CATEGORY_META,
  type Category,
} from '@/lib/mock/catalog';
import {
  applyClientFilters,
  serializeFilters,
} from '@/lib/client-filters';
import { hasActiveFilters, type Filters } from '@/lib/filters';
import type { DBProduct } from '@/lib/supabase/queries';
import { CatalogProvider } from './catalog-context';
import { FilterPanel } from './filter-panel';
import { SearchInput } from './search-input';
import { SortSelector } from './sort-selector';
import { ProductCard } from '@/components/shared/product-card';

type Props = {
  allProducts: DBProduct[];
  initialFilters: Filters;
};

export function CatalogShell({ allProducts, initialFilters }: Props) {
  const [filters, setFiltersState] = useState<Filters>(initialFilters);

  // Sync filters → URL via history.replaceState (no server round-trip).
  useEffect(() => {
    const qs = serializeFilters(filters);
    const url = qs ? `/productos?${qs}` : '/productos';
    window.history.replaceState(null, '', url);
  }, [filters]);

  const setFilters = useCallback(
    (updater: (prev: Filters) => Filters) => {
      setFiltersState(updater);
    },
    [],
  );

  const reset = useCallback(() => {
    setFiltersState({
      brands: [],
      inStockOnly: false,
      sort: 'relevance',
    });
  }, []);

  const filtered = useMemo(
    () => applyClientFilters(allProducts, filters),
    [allProducts, filters],
  );

  const categoryLabel = filters.category
    ? CATEGORY_META[filters.category as Category].label
    : 'Todos los productos';

  const total = allProducts.length;
  const shown = filtered.length;

  return (
    <CatalogProvider value={{ filters, setFilters, reset }}>
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
                  {CATEGORY_META[filters.category as Category].description}
                </span>
              ) : null}
            </h1>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <SearchInput />
              <div className="flex items-center gap-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
                  {String(shown).padStart(2, '0')} / {String(total).padStart(2, '0')} productos
                </p>
                <SortSelector />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            <FilterPanel />

            <div>
              {filtered.length === 0 ? (
                <EmptyState showReset={hasActiveFilters(filters)} onReset={reset} />
              ) : (
                <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p, i) => (
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
    </CatalogProvider>
  );
}

function EmptyState({
  showReset,
  onReset,
}: {
  showReset: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-start justify-center gap-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Sin resultados
      </p>
      <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
        No encontramos productos que cumplan estos filtros.
      </h2>
      {showReset ? (
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
        >
          Limpiar filtros →
        </button>
      ) : (
        <Link
          href="/"
          className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
        >
          Volver al inicio →
        </Link>
      )}
    </div>
  );
}
