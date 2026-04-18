import Link from 'next/link';
import { getProducts } from '@/lib/supabase/queries';
import { hasActiveFilters, type Filters } from '@/lib/filters';
import { ProductCard } from '@/components/shared/product-card';

export async function ProductGrid({ filters }: { filters: Filters }) {
  const products = await getProducts(filters);

  if (products.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-start justify-center gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Sin resultados
        </p>
        <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
          No encontramos productos que cumplan estos filtros.
        </h2>
        {hasActiveFilters(filters) ? (
          <Link
            href="/productos"
            className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            prefetch={false}
          >
            Limpiar filtros →
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} index={i + 1} />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton() {
  return (
    <ul
      className="grid animate-pulse gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i}>
          <div className="aspect-[4/5] rounded-sm bg-surface-1" />
          <div className="mt-5 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
            <div className="h-2 w-24 rounded-full bg-muted-foreground/15" />
          </div>
          <div className="mt-3 h-4 w-2/3 rounded-sm bg-muted-foreground/15" />
          <div className="mt-2 h-3 w-1/2 rounded-sm bg-muted-foreground/10" />
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <div className="h-3 w-20 rounded-sm bg-muted-foreground/15" />
            <div className="h-2 w-16 rounded-full bg-muted-foreground/10" />
          </div>
        </li>
      ))}
    </ul>
  );
}
