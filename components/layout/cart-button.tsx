'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart, cartSelectors } from '@/lib/stores/cart';
import { cn } from '@/lib/utils';

export function CartButton({ className }: { className?: string }) {
  const count = useCart((state) => cartSelectors.totalItems(state));
  const isHydrated = useCart((state) => state.isHydrated);

  return (
    <Link
      href="/carrito"
      aria-label={`Carrito (${count} items)`}
      className={cn(
        'relative inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30',
        className,
      )}
    >
      <ShoppingBag strokeWidth={1.5} className="h-4 w-4" />
      <span className="font-mono tabular-nums">
        {isHydrated ? String(count).padStart(2, '0') : '00'}
      </span>
    </Link>
  );
}
