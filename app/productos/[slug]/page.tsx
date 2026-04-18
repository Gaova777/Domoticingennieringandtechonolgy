import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Truck, Timer } from 'lucide-react';
import {
  getProductBySlug,
  getRelatedProducts,
  getAllProductSlugs,
} from '@/lib/supabase/queries';
import { formatCop, SITE } from '@/lib/constants';
import { ProductGallery } from '@/components/catalog/product-gallery';
import { AddToCart } from '@/components/catalog/add-to-cart';
import { ProductCard } from '@/components/shared/product-card';

type Params = { slug: string };

export const revalidate = 300;

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category.slug, product.slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand.name },
    description: product.description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'COP',
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/BackOrder',
      url: `${SITE.url}/productos/${product.slug}`,
    },
  };

  return (
    <article className="border-t border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-6xl px-6 pt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/productos" className="hover:text-foreground">
              Catálogo
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li>
            <Link
              href={`/productos?cat=${product.category.slug}`}
              className="hover:text-foreground"
            >
              {product.category.name}
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li className="truncate text-foreground">{product.sku}</li>
        </ol>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-12 md:gap-16 md:py-20">
        <div className="md:col-span-7">
          <ProductGallery sku={product.sku} name={product.name} />
        </div>

        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {product.brand.name} · {product.category.name}
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-[1.08] tracking-tight md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-2xl tabular-nums">
              {formatCop(product.price)}
            </span>
            {product.compareAtPrice ? (
              <span className="font-mono text-sm text-muted-foreground line-through tabular-nums">
                {formatCop(product.compareAtPrice)}
              </span>
            ) : null}
          </div>

          <p className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            SKU {product.sku}
            <span aria-hidden>·</span>
            {product.stock > 0 ? (
              <>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span className="text-brand-green">
                  {product.stock > 10 ? 'En stock' : `Últimas ${product.stock}`}
                </span>
              </>
            ) : (
              <span>Bajo pedido</span>
            )}
          </p>

          <p className="mt-8 text-pretty text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-10">
            <AddToCart product={product} />
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8 text-left">
            <Micro
              icon={ShieldCheck}
              label="Garantía"
              value={`${product.warrantyMonths} meses`}
            />
            <Micro icon={Truck} label="Envío" value="Toda Colombia" />
            <Micro icon={Timer} label="Despacho" value="24 – 48 h" />
          </dl>
        </div>
      </div>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Especificaciones
          </p>
          <h2 className="mt-4 font-serif text-2xl tracking-tight md:text-3xl">
            Datos técnicos
          </h2>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
            {product.specs.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline justify-between gap-6 bg-background px-5 py-4"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="text-right text-sm">{s.value}</dd>
              </div>
            ))}
          </dl>

          {product.includes.length > 0 ? (
            <div className="mt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Incluye
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.includes.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  También de {product.category.name.toLowerCase()}
                </p>
                <h2 className="mt-3 font-serif text-2xl tracking-tight md:text-3xl">
                  Productos relacionados
                </h2>
              </div>
              <Link
                href={`/productos?cat=${product.category.slug}`}
                className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
              >
                Ver toda la categoría →
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <li key={p.id}>
                  <ProductCard product={p} index={i + 1} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function Micro({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <Icon strokeWidth={1.25} className="h-4 w-4 text-foreground/70" />
      <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm">{value}</dd>
    </div>
  );
}
