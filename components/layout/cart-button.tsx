'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart, cartSelectors } from '@/lib/stores/cart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function CartButton({ className }: { className?: string }) {
  const count = useCart((state) => cartSelectors.totalItems(state));
  const isHydrated = useCart((state) => state.isHydrated);

  return (
    <Link
      href="/carrito"
      aria-label={`Carrito (${count} items)`}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-brand-cyan/60 hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan',
        className,
      )}
    >
      <ShoppingCart className="h-4 w-4" />
      {isHydrated && count > 0 ? (
        <Badge
          className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full border-background bg-brand-cyan px-1.5 text-[10px] font-bold text-background tabular-nums"
          variant="default"
        >
          {count > 99 ? '99+' : count}
        </Badge>
      ) : null}
    </Link>
  );
}
