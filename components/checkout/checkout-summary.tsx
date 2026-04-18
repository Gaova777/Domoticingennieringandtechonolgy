'use client';

import { useCart, cartSelectors } from '@/lib/stores/cart';
import { formatCop } from '@/lib/constants';
import { computeTotals } from '@/lib/cart';

export function CheckoutSummary() {
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
      <h2 className="mt-2 font-serif text-2xl tracking-tight">Tu pedido</h2>

      <ul className="mt-6 divide-y divide-border text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-baseline justify-between gap-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate">{item.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {item.quantity} × {formatCop(item.price)}
              </p>
            </div>
            <span className="shrink-0 font-mono text-sm tabular-nums">
              {formatCop(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
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
        <div className="flex items-baseline justify-between border-t border-border pt-4">
          <dt className="font-serif text-lg tracking-tight">Total</dt>
          <dd className="font-mono text-lg tabular-nums">
            {formatCop(totals.total)}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
