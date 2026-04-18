import Link from 'next/link';
import Image from 'next/image';
import { Package, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/lib/supabase/queries';
import { SITE, formatCop } from '@/lib/constants';

export async function Hero() {
  const featured = await getFeaturedProducts(1);
  const star = featured[0];

  return (
    <section className="relative border-b border-border">
      <div
        aria-hidden
        className="brand-gradient-line pointer-events-none absolute inset-x-0 top-0 h-px opacity-50"
      />
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 md:pb-32 md:pt-32 lg:pt-40">
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7 md:pt-4">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-brand-cyan"
              />
              {SITE.city}, {SITE.region} — Desde 2017
            </p>

            <h1 className="mt-8 text-balance font-serif text-5xl leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[84px]">
              Tecnología que se{' '}
              <em className="italic brand-gradient-text">siente</em> en cada
              espacio de tu casa.
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Diseñamos, suministramos e instalamos sistemas de domótica, seguridad
              y automatización con marcas premium. Sin intermediarios, con garantía
              real.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button
                size="lg"
                render={<Link href="/productos" />}
                className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Explorar productos
              </Button>
              <Link
                href="/cotizar"
                className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 transition hover:decoration-foreground"
              >
                Solicitar cotización →
              </Link>
            </div>

            <ul className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              <HeroStat value="300+" label="Instalaciones" accent="cyan" />
              <HeroStat value="15+" label="Marcas" accent="magenta" />
              <HeroStat value="24m" label="Garantía máx." accent="green" />
            </ul>
          </div>

          <figure className="relative md:col-span-5">
            {star ? (
              <StarFeature star={star} />
            ) : (
              <FallbackHero />
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: 'cyan' | 'magenta' | 'green';
}) {
  const dot =
    accent === 'cyan'
      ? 'bg-brand-cyan'
      : accent === 'magenta'
        ? 'bg-brand-magenta'
        : 'bg-brand-green';
  return (
    <li>
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span aria-hidden className={`inline-block h-1 w-1 rounded-full ${dot}`} />
        {label}
      </div>
      <div className="mt-2 font-serif text-2xl tracking-tight md:text-3xl">
        {value}
      </div>
    </li>
  );
}

function StarFeature({
  star,
}: {
  star: NonNullable<Awaited<ReturnType<typeof getFeaturedProducts>>[number]>;
}) {
  return (
    <Link
      href={`/productos/${star.slug}`}
      className="group relative block overflow-hidden rounded-sm border border-border bg-surface-1"
    >
      <div className="relative aspect-[4/5]">
        {star.imageUrl ? (
          <Image
            src={star.imageUrl}
            alt={star.name}
            fill
            priority
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package strokeWidth={0.75} className="h-32 w-32 text-foreground/25" />
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        />
      </div>

      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-foreground/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-background backdrop-blur-sm">
        <Shield className="h-3 w-3" />
        Destacado
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
          {star.brand.name} · {star.category.name}
        </p>
        <h2 className="mt-1 font-serif text-xl leading-tight tracking-tight text-white md:text-2xl">
          {star.name}
        </h2>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="font-mono text-sm tabular-nums text-white">
            {formatCop(star.price)}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80 transition group-hover:text-white">
            Ver ficha
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function FallbackHero() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-1">
      <div aria-hidden className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Package strokeWidth={0.75} className="h-32 w-32 text-foreground/25" />
      </div>
      <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Destacado
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
          —
        </span>
      </figcaption>
    </div>
  );
}
