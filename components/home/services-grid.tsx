import Link from 'next/link';
import { MOCK_SERVICES } from '@/lib/mock/services';
import { SectionHeading } from './section-heading';

export function ServicesGrid() {
  const services = MOCK_SERVICES.slice(0, 4);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionHeading
          eyebrow="Servicios"
          title="Ingeniería e instalación para cada espacio."
          description="Diseño, suministro y puesta en marcha. Sin tercerizar nada."
          action={{ href: '/servicios', label: 'Todos los servicios' }}
        />

        <ul className="mt-16 grid divide-y divide-border border-y border-border md:grid-cols-2 md:divide-y-0 md:border-b-0">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <li
                key={service.id}
                className={`group ${
                  i % 2 === 0 ? 'md:border-r md:border-border' : ''
                } ${i < 2 ? 'md:border-b md:border-border' : ''}`}
              >
                <Link
                  href={`/servicios/${service.slug}`}
                  className="flex items-start gap-8 px-2 py-10 transition-colors hover:bg-white/[0.02] md:px-8"
                >
                  <Icon
                    strokeWidth={1.25}
                    className="mt-1 h-8 w-8 shrink-0 text-foreground/70 transition-colors group-hover:text-foreground"
                  />
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      0{i + 1} · {service.tagline}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight tracking-tight md:text-3xl">
                      {service.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-2 text-foreground/40 transition group-hover:translate-x-1 group-hover:text-foreground"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
