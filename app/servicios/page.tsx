import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/supabase/queries';
import { ServiceIcon } from '@/components/shared/service-icon';
import { Button } from '@/components/ui/button';
import { waLink } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Instalación profesional de domótica, CCTV, cerraduras inteligentes y puertas automáticas en Pereira y Risaralda.',
};

export const revalidate = 300;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="border-t border-border">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Servicios
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Ingeniería que{' '}
            <em className="italic">se instala.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Diseño, suministro y puesta en marcha. Nos encargamos de todo el
            proyecto — desde la visita técnica hasta el soporte posventa.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              render={<Link href="/cotizar" />}
              className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Solicitar cotización
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={
                <a
                  href={waLink(
                    'Hola, quisiera información sobre los servicios de instalación.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="h-11 rounded-full border-border px-6 text-sm font-medium"
            >
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      </header>

      <ul className="mx-auto grid max-w-6xl divide-y divide-border border-b border-border px-6">
        {services.map((service, i) => (
          <li key={service.id}>
            <Link
              href={`/servicios/${service.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-6 py-12 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1fr_160px_auto] md:gap-10 md:py-16"
            >
              <span className="font-mono text-sm tabular-nums text-muted-foreground">
                0{i + 1}
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {service.tagline}
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl">
                  {service.name}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {service.description}
                </p>
              </div>
              <ServiceIcon
                name={service.icon}
                className="hidden h-10 w-10 text-foreground/50 transition-colors group-hover:text-foreground md:block"
              />
              <span
                aria-hidden
                className="self-center text-foreground/40 transition group-hover:translate-x-1 group-hover:text-foreground md:col-start-4"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="rounded-sm border border-border p-8 md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Proceso
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl">
            Así trabajamos contigo.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
            {[
              { n: '01', title: 'Visita técnica', body: 'Vamos a tu espacio y medimos lo que se necesita. Sin costo en Pereira.' },
              { n: '02', title: 'Propuesta detallada', body: 'Cotización con productos, mano de obra y tiempos. Sin sorpresas.' },
              { n: '03', title: 'Instalación', body: 'Equipo propio, no subcontratamos. Cableado limpio y documentado.' },
              { n: '04', title: 'Soporte', body: 'Capacitación, garantía y respuesta local cuando lo necesites.' },
            ].map((step) => (
              <li key={step.n}>
                <p className="font-mono text-sm tabular-nums text-muted-foreground">
                  {step.n}
                </p>
                <h3 className="mt-2 font-serif text-xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
