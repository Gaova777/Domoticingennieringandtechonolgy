'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/stores/cart';
import { formatCop } from '@/lib/constants';
import { ProductPlaceholder } from '@/components/shared/product-placeholder';
import { cn } from '@/lib/utils';

export function CartItems() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);

  return (
    <ul className="divide-y divide-border">
      {items.map((item, i) => {
        const max = item.maxStock ?? 99;
        const lineSubtotal = item.price * item.quantity;
        return (
          <li key={item.id} className="grid grid-cols-[96px_1fr] gap-4 py-6 md:grid-cols-[120px_1fr_auto] md:gap-8 md:py-8">
            <Link
              href={`/productos/${item.slug}`}
              className="block"
              aria-label={`Ver ${item.name}`}
            >
              <ProductPlaceholder
                sku={`#${String(i + 1).padStart(2, '0')}`}
                size="sm"
                className="aspect-[4/5]"
              />
            </Link>

            <div className="min-w-0">
              <Link
                href={`/productos/${item.slug}`}
                className="font-serif text-base tracking-tight hover:underline underline-offset-4 md:text-lg"
              >
                {item.name}
              </Link>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {formatCop(item.price)} / unidad
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    aria-label="Disminuir"
                    className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground transition hover:text-foreground"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm tabular-nums">
                    {String(item.quantity).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, Math.min(max, item.quantity + 1))}
                    aria-label="Aumentar"
                    disabled={item.quantity >= max}
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center text-muted-foreground transition',
                      item.quantity >= max
                        ? 'opacity-40'
                        : 'hover:text-foreground',
                    )}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Eliminar
                </button>
              </div>
            </div>

            <div className="col-start-2 md:col-start-3 md:self-start md:text-right">
              <p className="font-mono text-sm tabular-nums">
                {formatCop(lineSubtotal)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
