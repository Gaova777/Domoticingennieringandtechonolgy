'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BRAND_META, CATEGORY_META, type Brand } from '@/lib/mock/catalog';
import { cn } from '@/lib/utils';

const CATEGORIES = Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>;
const BRANDS = Object.keys(BRAND_META) as Brand[];

const LABEL =
  'font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground';

export function FilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [minPrice, setMinPrice] = useState(search.get('min') ?? '');
  const [maxPrice, setMaxPrice] = useState(search.get('max') ?? '');

  useEffect(() => {
    setMinPrice(search.get('min') ?? '');
    setMaxPrice(search.get('max') ?? '');
  }, [search]);

  const updateParam = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(search);
      mutate(params);
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [search, router, pathname],
  );

  const setSingle = (key: string, value: string | null) =>
    updateParam((p) => {
      if (value === null || value === '') p.delete(key);
      else p.set(key, value);
    });

  const toggleBrand = (brand: Brand) =>
    updateParam((p) => {
      const current = (p.get('brand') ?? '').split(',').filter(Boolean);
      const next = current.includes(brand)
        ? current.filter((b) => b !== brand)
        : [...current, brand];
      if (next.length === 0) p.delete('brand');
      else p.set('brand', next.join(','));
    });

  const activeCategory = search.get('cat');
  const activeBrands = (search.get('brand') ?? '').split(',').filter(Boolean);
  const inStockOnly = search.get('stock') === '1';

  const applyPrice = () =>
    updateParam((p) => {
      if (minPrice) p.set('min', minPrice);
      else p.delete('min');
      if (maxPrice) p.set('max', maxPrice);
      else p.delete('max');
    });

  const clearAll = () =>
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });

  return (
    <aside
      className={cn(
        'space-y-10',
        isPending && 'opacity-70 transition-opacity',
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className={LABEL}>Categoría</h2>
          {activeCategory ? (
            <button
              type="button"
              onClick={() => setSingle('cat', null)}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground"
            >
              Limpiar
            </button>
          ) : null}
        </div>
        <ul className="mt-4 space-y-1">
          {CATEGORIES.map((c) => {
            const active = activeCategory === c;
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setSingle('cat', active ? null : c)}
                  className={cn(
                    'flex w-full items-center justify-between py-1.5 text-sm transition-colors',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        'h-1 w-1 rounded-full transition-colors',
                        active ? 'bg-brand-cyan' : 'bg-muted-foreground/40',
                      )}
                    />
                    {CATEGORY_META[c].label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className={LABEL}>Marca</h2>
          {activeBrands.length > 0 ? (
            <button
              type="button"
              onClick={() => setSingle('brand', null)}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground"
            >
              Limpiar
            </button>
          ) : null}
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {BRANDS.map((b) => {
            const active = activeBrands.includes(b);
            return (
              <li key={b}>
                <button
                  type="button"
                  onClick={() => toggleBrand(b)}
                  className={cn(
                    'rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors',
                    active
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground',
                  )}
                >
                  {BRAND_META[b].label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className={LABEL}>Precio COP</h2>
        <div className="mt-4 flex gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-9 rounded-sm border-border bg-transparent font-mono text-xs tabular-nums"
          />
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-9 rounded-sm border-border bg-transparent font-mono text-xs tabular-nums"
          />
        </div>
        <Button
          type="button"
          onClick={applyPrice}
          variant="outline"
          size="sm"
          className="mt-2 h-8 w-full rounded-sm border-border font-mono text-[10px] uppercase tracking-[0.22em]"
        >
          Aplicar
        </Button>
      </div>

      <div>
        <h2 className={LABEL}>Disponibilidad</h2>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(v) => setSingle('stock', v ? '1' : null)}
            className="h-4 w-4 rounded-sm border-border data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
          />
          Solo en stock
        </label>
      </div>

      <button
        type="button"
        onClick={clearAll}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 transition hover:text-foreground hover:decoration-foreground"
      >
        Limpiar todos los filtros
      </button>
    </aside>
  );
}
