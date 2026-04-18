import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { waLink, SITE } from '@/lib/constants';

const STATS = [
  { label: 'Proyectos entregados', value: '300+' },
  { label: 'Marcas disponibles', value: '15+' },
  { label: 'Tiempo en Pereira', value: '8 años' },
  { label: 'Garantía mínima', value: '12 meses' },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* ambient layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-tight mask-radial-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.10),_transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-brand-magenta/15 blur-[120px] animate-drift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] bottom-[-12%] -z-10 h-[360px] w-[360px] rounded-full bg-brand-cyan/15 blur-[120px] animate-drift"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-20 md:grid-cols-[1.2fr_1fr] md:px-6 md:pb-32 md:pt-28 lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-cyan">
            <Sparkles className="h-3 w-3" />
            {SITE.city}, {SITE.region} · Colombia
          </span>

          <h1 className="text-balance text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Tu espacio, <span className="text-gradient-brand">inteligente.</span>
            <br />
            Tu seguridad, <span className="text-gradient-brand">integral.</span>
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Instalamos domótica, cámaras, cerraduras y puertas automáticas con marcas
            reconocidas y soporte técnico local. {SITE.tagline}.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-brand-cyan px-6 text-background shadow-lg shadow-brand-cyan/20 hover:bg-brand-cyan/90"
            >
              <Link href="/cotizar">
                Cotizar mi proyecto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/15 bg-white/5 px-6 hover:border-white/30 hover:bg-white/10"
            >
              <Link href="/productos">Ver catálogo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 px-4 text-brand-green hover:bg-brand-green/10 hover:text-brand-green"
            >
              <a
                href={waLink('Hola, me interesa una cotización.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp directo
              </a>
            </Button>
          </div>

          <dl className="mt-6 grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur-sm"
              >
                <dt className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 text-xl font-bold tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative hidden md:block">
      {/* frame */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.03] p-1 shadow-2xl shadow-black/40">
        <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-black">
          <div aria-hidden className="absolute inset-0 dot-grid opacity-80" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(6,182,212,0.22),_transparent_60%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(236,72,153,0.18),_transparent_55%)]"
          />

          {/* CCTV grid overlay */}
          <div className="absolute inset-4 grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <FeedTile key={i} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* floating chips */}
      <div className="absolute -left-6 top-10 hidden rounded-2xl border border-white/10 bg-background/80 px-3 py-2 text-xs font-medium shadow-xl backdrop-blur-xl xl:flex xl:items-center xl:gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
        </span>
        Sistema en línea
      </div>
      <div className="absolute -right-4 bottom-8 hidden rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-left text-xs shadow-xl backdrop-blur-xl xl:block">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Respuesta WhatsApp
        </div>
        <div className="mt-0.5 text-sm font-semibold text-brand-green">
          &lt; 10 minutos
        </div>
      </div>
    </div>
  );
}

function FeedTile({ index }: { index: number }) {
  const labels = ['Garaje', 'Frente', 'Patio', 'Sala'];
  const tints = [
    'from-brand-cyan/30 to-transparent',
    'from-brand-magenta/25 to-transparent',
    'from-brand-yellow/25 to-transparent',
    'from-brand-green/25 to-transparent',
  ];
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${tints[index]}`}
      />
      <div aria-hidden className="absolute inset-0 dot-grid opacity-60" />
      <div className="absolute left-2 top-2 flex items-center gap-1.5 text-[10px] font-medium text-white/80">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        REC
      </div>
      <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
        {labels[index]}
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/60 tabular-nums">
        {String(index + 1).padStart(2, '0')}:4K
      </div>
    </div>
  );
}
