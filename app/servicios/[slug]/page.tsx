import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Clock, Users, Wrench } from 'lucide-react';
import {
  getServiceBySlug,
  getAllServiceSlugs,
  getServices,
} from '@/lib/supabase/queries';
import { Button } from '@/components/ui/button';
import { ServiceIcon } from '@/components/shared/service-icon';
import { waLink, SITE } from '@/lib/constants';

type Params = { slug: string };

export const revalidate = 600;

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Servicio no encontrado' };
  return {
    title: service.name,
    description: service.description ?? undefined,
  };
}

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Instalación garantizada',
    body: '6 meses sobre la mano de obra, más la garantía del fabricante sobre equipos.',
  },
  {
    icon: Users,
    title: 'Equipo propio',
    body: 'No subcontratamos. Los mismos técnicos que cotizan son los que instalan.',
  },
  {
    icon: Clock,
    title: 'Respuesta local',
    body: 'Atención en Pereira y área metropolitana en menos de 30 minutos.',
  },
  {
    icon: Wrench,
    title: 'Capacitación incluida',
    body: 'Te enseñamos a usar cada equipo y cada aplicación. Dejamos guías escritas.',
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = (await getServices())
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const faqs = [
    {
      q: '¿Cuánto demora la instalación?',
      a: 'Depende del tamaño del proyecto, pero la mayoría se completa entre 1 y 3 días laborales. En la cotización te damos un cronograma exacto.',
    },
    {
      q: '¿Hacen mantenimiento después?',
      a: 'Sí. Ofrecemos planes de mantenimiento preventivo trimestral o anual, y atención bajo demanda por WhatsApp o llamada.',
    },
    {
      q: '¿Qué marcas recomiendan?',
      a: 'Trabajamos con las marcas más confiables del mercado: Hikvision, Dahua, EZVIZ, Aqara, Sonoff, Tuya, Shelly, Xiaomi. Te asesoramos según tu presupuesto y necesidad.',
    },
    {
      q: '¿Pueden instalar en conjuntos residenciales?',
      a: 'Sí, trabajamos con administraciones de propiedad horizontal. Manejamos facturación con copropiedad y coordinamos con los permisos de la copropiedad.',
    },
  ];

  return (
    <article className="border-t border-border">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-6xl px-6 pt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/servicios" className="hover:text-foreground">
              Servicios
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li className="truncate text-foreground">{service.name}</li>
        </ol>
      </nav>

      <header className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-cyan">
              {service.tagline}
            </p>
            <h1 className="mt-4 text-balance font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
              {service.name}
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {service.longDescription ?? service.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                render={<Link href={`/cotizar?servicio=${service.slug}`} />}
                className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Cotizar este servicio
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={
                  <a
                    href={waLink(
                      `Hola, me interesa el servicio de ${service.name}. ¿Pueden darme más información?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="h-11 rounded-full border-border px-6 text-sm font-medium"
              >
                Preguntar por WhatsApp
              </Button>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="sticky top-24 flex aspect-square items-center justify-center rounded-sm border border-border bg-surface-1 p-10">
              <ServiceIcon
                name={service.icon}
                strokeWidth={0.75}
                className="h-28 w-28 text-foreground/50"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Beneficios
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl">
            Lo que obtienes cuando instalamos nosotros.
          </h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.title} className="flex gap-5">
                  <Icon
                    strokeWidth={1.25}
                    className="h-6 w-6 shrink-0 text-foreground/70"
                  />
                  <div>
                    <h3 className="font-serif text-xl tracking-tight">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {b.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Proceso
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl">
            De la primera llamada a la entrega.
          </h2>
          <ol className="mt-12 grid gap-0 border-y border-border md:grid-cols-4">
            {[
              {
                n: '01',
                title: 'Contacto',
                body: 'Nos escribes por WhatsApp o el formulario. Respondemos en el día.',
              },
              {
                n: '02',
                title: 'Visita técnica',
                body: 'Vamos a tu espacio, medimos y recomendamos equipos adecuados.',
              },
              {
                n: '03',
                title: 'Propuesta',
                body: 'Enviamos cotización escrita con productos, instalación y tiempos.',
              },
              {
                n: '04',
                title: 'Instalación',
                body: 'Ejecutamos en fecha acordada, capacitamos y entregamos documentado.',
              },
            ].map((s, idx) => (
              <li
                key={s.n}
                className={`py-8 md:px-8 md:py-10 ${
                  idx < 3 ? 'md:border-r md:border-border' : ''
                }`}
              >
                <p className="font-mono text-sm tabular-nums text-muted-foreground">
                  {s.n}
                </p>
                <h3 className="mt-3 font-serif text-xl tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl">
            Lo que más nos preguntan.
          </h2>
          <dl className="mt-12 divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-8">
                <dt className="font-serif text-lg tracking-tight md:text-xl">
                  {faq.q}
                </dt>
                <dd className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {otherServices.length > 0 ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Otros servicios
                </p>
                <h2 className="mt-3 font-serif text-2xl tracking-tight md:text-3xl">
                  Seguir explorando.
                </h2>
              </div>
              <Link
                href="/servicios"
                className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
              >
                Ver todos →
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {otherServices.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-sm border border-border p-6 transition-colors hover:border-foreground/40"
                  >
                    <ServiceIcon
                      name={s.icon}
                      className="h-7 w-7 text-foreground/60 group-hover:text-foreground"
                    />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {s.tagline}
                      </p>
                      <h3 className="mt-2 font-serif text-lg tracking-tight">
                        {s.name}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="rounded-sm border border-border bg-surface-1 p-10 md:p-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            ¿Listo para empezar?
          </p>
          <h2 className="mt-4 max-w-2xl text-balance font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            Cuéntanos tu proyecto y te enviamos una propuesta.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground">
            Atendemos proyectos en {SITE.city}, Dosquebradas, La Virginia, Cartago
            y Santa Rosa de Cabal.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              render={<Link href={`/cotizar?servicio=${service.slug}`} />}
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
                    `Hola, quisiera cotizar ${service.name.toLowerCase()}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="h-11 rounded-full border-border px-6 text-sm font-medium"
            >
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
