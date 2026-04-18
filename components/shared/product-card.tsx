import Link from 'next/link';
import { formatCop } from '@/lib/constants';
import { ProductPlaceholder } from './product-placeholder';
import type { DBProduct } from '@/lib/supabase/queries';

type Props = {
  product: DBProduct;
  index?: number;
};

export function ProductCard({ product, index }: Props) {
  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
      )
    : 0;

  const stockStatus =
    product.stock === 0
      ? { label: 'Bajo pedido', tone: 'muted' as const }
      : product.stock > 10
        ? { label: 'Disponible', tone: 'ok' as const }
        : { label: `${product.stock} unidades`, tone: 'low' as const };

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div className="relative">
        <ProductPlaceholder
          sku={product.sku}
          index={index}
          category={product.category.slug}
          size="md"
          className="aspect-[4/5]"
        />
        {product.isStar ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-foreground px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-background">
            <span aria-hidden>★</span> Destacado
          </span>
        ) : null}
        {discount > 0 ? (
          <span className="absolute right-3 top-3 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
            -{discount}%
          </span>
        ) : null}
      </div>

      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {product.brand.name} · {product.category.name}
        </p>
        <h3 className="mt-1.5 text-base font-medium leading-snug tracking-tight">
          {product.name}
        </h3>
        {product.shortSpec ? (
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            {product.shortSpec}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-border pt-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm tabular-nums">
            {formatCop(product.price)}
          </span>
          {product.compareAtPrice ? (
            <span className="font-mono text-[10px] text-muted-foreground line-through tabular-nums">
              {formatCop(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
        <span
          className={
            'font-mono text-[10px] uppercase tracking-[0.18em] ' +
            (stockStatus.tone === 'ok'
              ? 'text-brand-green'
              : stockStatus.tone === 'low'
                ? 'text-brand-yellow'
                : 'text-muted-foreground')
          }
        >
          {stockStatus.tone === 'ok' ? (
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-green align-middle" />
          ) : null}
          {stockStatus.label}
        </span>
      </div>
    </Link>
  );
}
