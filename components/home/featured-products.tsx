import Link from 'next/link';
import { Package } from 'lucide-react';
import { MOCK_FEATURED_PRODUCTS } from '@/lib/mock/products';
import { formatCop } from '@/lib/constants';
import { SectionHeading } from './section-heading';

export function FeaturedProducts() {
  const products = MOCK_FEATURED_PRODUCTS.slice(0, 3);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionHeading
          eyebrow="Selección curada"
          title="Productos que usamos en nuestras instalaciones."
          description="Stock disponible, envío a toda Colombia, soporte después de la venta."
          action={{ href: '/productos', label: 'Ver catálogo completo' }}
        />

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {products.map((p, i) => (
            <li key={p.id}>
              <Link
                href={`/productos/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-1">
                  <div aria-hidden className="absolute inset-0 dot-grid" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package
                      strokeWidth={0.75}
                      className="h-24 w-24 text-foreground/20 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {p.brand} · {p.category}
                    </p>
                    <h3 className="mt-1.5 text-base font-medium leading-snug tracking-tight">
                      {p.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
                  <span className="font-mono text-sm tabular-nums">
                    {formatCop(p.price)}
                  </span>
                  {p.stock > 0 ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {p.stock > 10 ? 'Disponible' : `${p.stock} unidades`}
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Bajo pedido
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
