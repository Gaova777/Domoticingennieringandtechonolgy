'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCatalogFilters } from './catalog-context';

export function SearchInput() {
  const { filters, setFilters } = useCatalogFilters();
  const [value, setValue] = useState(filters.query ?? '');

  // Debounced sync → filters
  useEffect(() => {
    const id = setTimeout(() => {
      setFilters((prev) =>
        prev.query === value ? prev : { ...prev, query: value || undefined },
      );
    }, 200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // If filters changed externally (reset), mirror back into local input.
  useEffect(() => {
    if ((filters.query ?? '') !== value) {
      setValue(filters.query ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.query]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar SKU, nombre, spec..."
        className="h-9 rounded-sm border-border bg-transparent pl-9 font-mono text-xs tracking-tight"
      />
    </div>
  );
}
