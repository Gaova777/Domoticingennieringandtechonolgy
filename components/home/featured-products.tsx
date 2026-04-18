import Link from 'next/link';
import { Star, ArrowRight, Package } from 'lucide-react';
import { MOCK_FEATURED_PRODUCTS } from '@/lib/mock/products';
import { formatCop } from '@/lib/constants';
import { SectionHeading } from './section-heading';
import { Button } from '@/components/ui/button';

export function FeaturedProducts() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Más vendidos"
            title="Productos destacados"
            description="Stock inmediato con envío a toda Colombia y asesoría por WhatsApp."
          />
          <Button
            asChild
            variant="outline"
            className="border-white/15 bg-white/5 hover:border-brand-cyan/40 hover:text-brand-cyan"
          >
            <Link href="/productos">
              Ver catálogo completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_FEATURED_PRODUCTS.map((p) => {
            const discount = p.compareAtPrice
              ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
              : 0;
            return (
              <li key={p.id}>
                <Link
                  href={`/productos/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-brand-cyan/40 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.45)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-black">
                    <div
                      aria-hidden
                      className="absolute inset-0 dot-grid opacity-60"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.18),_transparent_60%)]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="h-16 w-16 text-white/20 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {discount > 0 ? (
                      <span className="absolute left-3 top-3 rounded-full bg-brand-magenta/90 px-2 py-0.5 text-[10px] font-bold text-background">
                        -{discount}%
                      </span>
                    ) : null}
                    {p.badges[0] ? (
                      <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-background/70 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
                        {p.badges[0]}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      <span>{p.brand}</span>
                      <span className="flex items-center gap-1 text-brand-yellow">
                        <Star className="h-3 w-3 fill-current" />
                        {p.rating}
                      </span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-tight">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.shortSpec}
                    </p>
                    <div className="mt-auto pt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold tabular-nums">
                          {formatCop(p.price)}
                        </span>
                        {p.compareAtPrice ? (
                          <span className="text-xs text-muted-foreground line-through tabular-nums">
                            {formatCop(p.compareAtPrice)}
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={`mt-1 text-[11px] font-medium ${
                          p.stock > 10
                            ? 'text-brand-green'
                            : p.stock > 0
                              ? 'text-brand-yellow'
                              : 'text-muted-foreground'
                        }`}
                      >
                        {p.stock > 10
                          ? 'En stock'
                          : p.stock > 0
                            ? `Últimas ${p.stock} unidades`
                            : 'Sin stock'}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
