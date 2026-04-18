import Link from 'next/link';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 md:pb-32 md:pt-32 lg:pt-40">
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7 md:pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {SITE.city}, {SITE.region} — Desde 2017
            </p>

            <h1 className="mt-8 text-balance font-serif text-5xl leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[84px]">
              Tecnología que se <em className="italic">siente</em> en cada
              espacio de tu casa.
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Diseñamos, suministramos e instalamos sistemas de domótica, seguridad
              y automatización con marcas premium. Sin intermediarios, con garantía
              real.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
              >
                <Link href="/productos">Explorar productos</Link>
              </Button>
              <Link
                href="/cotizar"
                className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 transition hover:decoration-foreground"
              >
                Solicitar cotización →
              </Link>
            </div>
          </div>

          <figure className="relative md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-1">
              <div aria-hidden className="absolute inset-0 dot-grid" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Package
                  strokeWidth={0.75}
                  className="h-32 w-32 text-foreground/25"
                />
              </div>
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Edición 01 — Kit Seguridad
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                  SKU 001
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
