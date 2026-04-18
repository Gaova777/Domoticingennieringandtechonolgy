import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MOCK_SERVICES } from '@/lib/mock/services';
import { ACCENT_STYLES } from '@/lib/accent';
import { SectionHeading } from './section-heading';
import { cn } from '@/lib/utils';

export function ServicesGrid() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow="Servicios"
          title="Instalamos tecnología que funciona"
          description="Diseño, suministro y puesta en marcha. Nos encargamos de todo — vos solo disfrutás."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_SERVICES.map((service) => {
            const Icon = service.icon;
            const accent = ACCENT_STYLES[service.accent];
            return (
              <li key={service.id}>
                <Link
                  href={`/servicios/${service.slug}`}
                  className={cn(
                    'group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300',
                    accent.ring,
                    accent.glow,
                  )}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <div className="absolute inset-0 dot-grid" />
                  </div>
                  <div
                    className={cn(
                      'inline-flex h-11 w-11 items-center justify-center rounded-xl border',
                      accent.iconWrap,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={cn('text-xs font-semibold uppercase tracking-widest', accent.text)}>
                      {service.tagline}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      Ver detalle
                    </span>
                    <ArrowUpRight
                      className={cn(
                        'h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                        accent.text,
                      )}
                    />
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
