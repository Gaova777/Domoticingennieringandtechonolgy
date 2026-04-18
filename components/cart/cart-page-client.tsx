'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart, cartSelectors } from '@/lib/stores/cart';
import { CartItems } from './cart-items';
import { CartSummary } from './cart-summary';
import { Button } from '@/components/ui/button';

export function CartPageClient() {
  const items = useCart((s) => s.items);
  const count = useCart((s) => cartSelectors.totalItems(s));
  const isHydrated = useCart((s) => s.isHydrated);

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Cargando…
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-24 md:py-32">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground">
          <ShoppingBag strokeWidth={1.5} className="h-5 w-5" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Carrito
        </p>
        <h1 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
          Tu carrito está <em className="italic">vacío.</em>
        </h1>
        <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
          Explora el catálogo y agrega productos. El carrito se guarda en tu
          dispositivo, así que puedes volver cuando quieras.
        </p>
        <Button
          size="lg"
          render={<Link href="/productos" />}
          className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
        >
          Explorar productos
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Carrito · {String(count).padStart(2, '0')} items
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
          Revisa tu orden.
        </h1>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
        <section>
          <CartItems />
        </section>
        <CartSummary />
      </div>
    </div>
  );
}
