'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCart, cartSelectors } from '@/lib/stores/cart';
import { formatCop } from '@/lib/constants';
import { computeTotals } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { PromoInput } from './promo-input';

export function CartSummary() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => cartSelectors.subtotal(s));
  const promo = useCart((s) => s.promo);

  const totals = computeTotals({
    subtotal,
    discount: promo?.discount ?? 0,
  });

  return (
    <aside className="rounded-sm border border-border bg-surface-1 p-6 md:sticky md:top-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Resumen
      </p>
      <h2 className="mt-2 font-serif text-2xl tracking-tight">Tu orden</h2>

      <dl className="mt-8 space-y-3 text-sm">
        <div className="flex items-baseline justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-mono tabular-nums">{formatCop(totals.subtotal)}</dd>
        </div>
        {totals.discount > 0 ? (
          <div className="flex items-baseline justify-between text-brand-green">
            <dt>Descuento {promo ? `· ${promo.code}` : ''}</dt>
            <dd className="font-mono tabular-nums">
              −{formatCop(totals.discount)}
            </dd>
          </div>
        ) : null}
        <div className="flex items-baseline justify-between">
          <dt className="text-muted-foreground">
            Envío
            {totals.freeShipping ? (
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-green">
                Gratis
              </span>
            ) : null}
          </dt>
          <dd className="font-mono tabular-nums">
            {totals.shipping === 0 ? '—' : formatCop(totals.shipping)}
          </dd>
        </div>

        <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
          <dt className="font-serif text-lg tracking-tight">Total</dt>
          <dd className="font-mono text-lg tabular-nums">
            {formatCop(totals.total)}
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <PromoInput subtotal={subtotal} />
      </div>

      <Button
        size="lg"
        render={<Link href="/checkout" />}
        disabled={items.length === 0}
        className="mt-8 h-11 w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90"
      >
        Ir a pagar
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Envíos a toda Colombia
      </p>
    </aside>
  );
}
