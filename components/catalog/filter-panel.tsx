'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  BRAND_META,
  CATEGORY_META,
  CATEGORY_ACCENT,
  ACCENT_DOT_CLASS,
  type Brand,
  type Category,
} from '@/lib/mock/catalog';
import { cn } from '@/lib/utils';
import { useCatalogFilters } from './catalog-context';

const CATEGORIES = Object.keys(CATEGORY_META) as Category[];
const BRANDS = Object.keys(BRAND_META) as Brand[];

const LABEL =
  'font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground';

export function FilterPanel() {
  const { filters, setFilters, reset } = useCatalogFilters();

  const [minPrice, setMinPrice] = useState(
    filters.minPrice !== undefined ? String(filters.minPrice) : '',
  );
  const [maxPrice, setMaxPrice] = useState(
    filters.maxPrice !== undefined ? String(filters.maxPrice) : '',
  );

  useEffect(() => {
    setMinPrice(filters.minPrice !== undefined ? String(filters.minPrice) : '');
    setMaxPrice(filters.maxPrice !== undefined ? String(filters.maxPrice) : '');
  }, [filters.minPrice, filters.maxPrice]);

  const toggleCategory = (cat: Category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? undefined : cat,
    }));
  };

  const toggleBrand = (brand: Brand) => {
    setFilters((prev) => {
      const has = prev.brands.includes(brand);
      return {
        ...prev,
        brands: has ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand],
      };
    });
  };

  const applyPrice = () => {
    const min = minPrice ? Number(minPrice) : undefined;
    const max = maxPrice ? Number(maxPrice) : undefined;
    setFilters((prev) => ({
      ...prev,
      minPrice: Number.isFinite(min) ? min : undefined,
      maxPrice: Number.isFinite(max) ? max : undefined,
    }));
  };

  const toggleStock = (v: boolean) => {
    setFilters((prev) => ({ ...prev, inStockOnly: v }));
  };

  return (
    <aside className="space-y-10">
      <div>
        <div className="flex items-center justify-between">
          <h2 className={LABEL}>Categoría</h2>
          {filters.category ? (
            <button
              type="button"
              onClick={() =>
                setFilters((prev) => ({ ...prev, category: undefined }))
              }
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground"
            >
              Limpiar
            </button>
          ) : null}
        </div>
        <ul className="mt-4 space-y-1">
          {CATEGORIES.map((c) => {
            const active = filters.category === c;
            const dot = ACCENT_DOT_CLASS[CATEGORY_ACCENT[c]];
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => toggleCategory(c)}
                  className={cn(
                    'flex w-full items-center justify-between py-1.5 text-sm transition-colors',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className={cn(
                        'h-1.5 w-1.5 rounded-full transition-opacity',
                        active ? dot : 'bg-muted-foreground/40',
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
          {filters.brands.length > 0 ? (
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, brands: [] }))}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground"
            >
              Limpiar
            </button>
          ) : null}
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {BRANDS.map((b) => {
            const active = filters.brands.includes(b);
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
            checked={filters.inStockOnly}
            onCheckedChange={(v) => toggleStock(v === true)}
            className="h-4 w-4 rounded-sm border-border data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
          />
          Solo en stock
        </label>
      </div>

      <button
        type="button"
        onClick={reset}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground underline underline-offset-4 decoration-muted-foreground/40 transition hover:text-foreground hover:decoration-foreground"
      >
        Limpiar todos los filtros
      </button>
    </aside>
  );
}
