import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ConfiguradorTeaser() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-12 md:gap-10 md:py-36">
        <div className="md:col-span-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Configurador
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Tu proyecto diseñado{' '}
            <em className="italic">a la medida.</em>
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Respondé tres preguntas sobre tu espacio y te entregamos una propuesta
            con equipos, instalación y presupuesto. Sin compromiso.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              size="lg"
              render={<Link href="/configurador" />}
              className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Iniciar configurador
            </Button>
            <Link
              href="/cotizar"
              className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 transition hover:decoration-foreground"
            >
              Prefiero hablar con alguien →
            </Link>
          </div>
        </div>

        <ol className="md:col-span-6 md:mt-12">
          {[
            { n: '01', label: 'Tipo de espacio', hint: 'Casa, local u oficina.' },
            {
              n: '02',
              label: 'Objetivo principal',
              hint: 'Seguridad, confort o ahorro.',
            },
            { n: '03', label: 'Tu propuesta', hint: 'Equipos, mano de obra y tiempos.' },
          ].map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-border py-8 last:border-b"
            >
              <span className="font-mono text-sm tabular-nums text-muted-foreground">
                {s.n}
              </span>
              <div>
                <h3 className="font-serif text-xl tracking-tight md:text-2xl">
                  {s.label}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.hint}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
