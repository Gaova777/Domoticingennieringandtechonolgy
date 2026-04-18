import { Star, Quote } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '@/lib/mock/testimonials';
import { SectionHeading } from './section-heading';

export function Testimonials() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <SectionHeading
          eyebrow="Clientes"
          title="Lo que dicen quienes ya confiaron"
          description="Proyectos reales en Risaralda. No son frases de stock."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {MOCK_TESTIMONIALS.map((t) => (
            <li
              key={t.id}
              className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <Quote
                aria-hidden
                className="h-6 w-6 text-brand-cyan/60"
              />
              <p className="text-pretty text-sm leading-relaxed text-foreground">
                {t.message}
              </p>
              <div className="flex items-center gap-1 text-brand-yellow">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan/40 via-brand-magenta/30 to-brand-yellow/40 text-sm font-bold text-background">
                  {t.name
                    .split(' ')
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.city}
                  </p>
                </div>
                <span className="ml-auto rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-2 py-0.5 text-[10px] font-medium text-brand-cyan">
                  {t.service}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
