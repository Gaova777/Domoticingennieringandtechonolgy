'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [value, setValue] = useState(search.get('q') ?? '');
  const [, startTransition] = useTransition();

  useEffect(() => {
    setValue(search.get('q') ?? '');
  }, [search]);

  useEffect(() => {
    const id = setTimeout(() => {
      const current = search.get('q') ?? '';
      if (value === current) return;
      const params = new URLSearchParams(search);
      if (value) params.set('q', value);
      else params.delete('q');
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 300);
    return () => clearTimeout(id);
  }, [value, pathname, router, search]);

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
