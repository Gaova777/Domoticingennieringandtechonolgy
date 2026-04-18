import Link from 'next/link';
import Image from 'next/image';
import { formatCop } from '@/lib/constants';
import { ProductPlaceholder } from './product-placeholder';
import type { DBProduct } from '@/lib/supabase/queries';
import {
  CATEGORY_ACCENT,
  ACCENT_DOT_CLASS,
  type Category,
} from '@/lib/mock/catalog';
import { cn } from '@/lib/utils';

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

  const categorySlug = product.category.slug as Category;
  const accent = CATEGORY_ACCENT[categorySlug];
  const dotClass = accent ? ACCENT_DOT_CLASS[accent] : 'bg-muted-foreground/40';

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div className="relative">
        <ProductMedia product={product} index={index} />
        {product.isStar ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-foreground px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-background shadow-sm">
            <span aria-hidden>★</span> Destacado
          </span>
        ) : null}
        {discount > 0 ? (
          <span className="absolute right-3 top-3 rounded-full border border-border bg-background/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
            -{discount}%
          </span>
        ) : null}
      </div>

      <div className="mt-5">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', dotClass)} />
          {product.brand.name} · {product.category.name}
        </p>
        <h3 className="mt-1.5 text-base font-medium leading-snug tracking-tight transition-colors group-hover:text-foreground">
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

function ProductMedia({
  product,
  index,
}: {
  product: DBProduct;
  index?: number;
}) {
  if (!product.imageUrl) {
    return (
      <ProductPlaceholder
        sku={product.sku}
        index={index}
        category={product.category.slug}
        size="md"
        className="aspect-[4/5]"
      />
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-1">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
      />
      {index !== undefined ? (
        <span className="absolute left-3 bottom-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
          {String(index).padStart(2, '0')}
        </span>
      ) : null}
      <span className="absolute right-3 bottom-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
        {product.sku}
      </span>
    </div>
  );
}
