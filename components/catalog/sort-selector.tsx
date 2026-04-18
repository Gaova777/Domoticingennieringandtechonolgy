'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SORT_LABELS, type SortKey } from '@/lib/filters';

export function SortSelector({ active }: { active: SortKey }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const setSort = (key: SortKey) => {
    const params = new URLSearchParams(search);
    if (key === 'relevance') params.delete('sort');
    else params.set('sort', key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
