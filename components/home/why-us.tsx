import { WHY_US } from '@/lib/mock/features';
import { ACCENT_STYLES } from '@/lib/accent';
import { SectionHeading } from './section-heading';
import { cn } from '@/lib/utils';

export function WhyUs() {
  return (
    <section className="relative border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <SectionHeading
          eyebrow="¿Por qué nosotros?"
          title="Ingeniería local que responde"
          description="No somos una tienda sin cara. Somos un equipo en Pereira que te acompaña antes, durante y después de la instalación."
          align="center"
          className="mx-auto"
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((f) => {
            const Icon = f.icon;
            const accent = ACCENT_STYLES[f.accent];
            return (
              <li
                key={f.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-background/40 p-6 backdrop-blur-sm"
              >
                <div
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-xl border',
                    accent.iconWrap,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
