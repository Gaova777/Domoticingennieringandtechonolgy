'use client';

import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SORT_LABELS, type SortKey } from '@/lib/filters';
import { useCatalogFilters } from './catalog-context';

export function SortSelector() {
  const { filters, setFilters } = useCatalogFilters();
  const active = filters.sort;

  const setSort = (key: SortKey) => {
    setFilters((prev) => ({ ...prev, sort: key }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 border-b border-border pb-1 text-sm transition hover:border-foreground">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Ordenar
        </span>
        <span>{SORT_LABELS[active]}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-56 rounded-sm border-border bg-background"
      >
        {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setSort(key)}
            className="cursor-pointer text-sm"
          >
            {SORT_LABELS[key]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
