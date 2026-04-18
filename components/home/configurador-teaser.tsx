import Link from 'next/link';
import { ArrowRight, Wand2, Home, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STEPS = [
  { icon: Home, label: '¿Qué espacio?', hint: 'Casa, local, edificio' },
  { icon: ShieldCheck, label: '¿Qué objetivo?', hint: 'Seguridad, confort, ahorro' },
  { icon: KeyRound, label: 'Te armamos el kit', hint: 'Productos + instalación' },
];

export function ConfiguradorTeaser() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-black to-black p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-grid opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-magenta/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-brand-cyan/20 blur-3xl"
          />

          <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-magenta/30 bg-brand-magenta/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-magenta">
                <Wand2 className="h-3 w-3" />
                Configurador inteligente
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Armá tu proyecto en{' '}
                <span className="text-gradient-brand">3 minutos</span>
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Respondé unas preguntas y te proponemos el kit de productos e
                instalación ideal — con presupuesto estimado y tiempos. Sin
                compromiso.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-brand-magenta px-6 text-background shadow-lg shadow-brand-magenta/20 hover:bg-brand-magenta/90"
                >
                  <Link href="/configurador">
                    Empezar configurador
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/15 bg-white/5 px-6 hover:border-white/30 hover:bg-white/10"
                >
                  <Link href="/cotizar">Prefiero hablar con alguien</Link>
                </Button>
              </div>
            </div>

            <ol className="relative grid gap-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.label}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-background/60 p-4 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.hint}</p>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">
                      0{i + 1}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
