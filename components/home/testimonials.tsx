import { MOCK_TESTIMONIALS } from '@/lib/mock/testimonials';

export function Testimonials() {
  const t = MOCK_TESTIMONIALS[0];
  if (!t) return null;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-28 text-left md:py-36">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Testimonios
        </p>
        <blockquote className="mt-8">
          <p className="text-balance font-serif text-3xl leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-foreground/40">“</span>
            {t.message}
            <span className="text-foreground/40">”</span>
          </p>
          <footer className="mt-10 flex items-center gap-4 border-t border-border pt-6">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t.role} · {t.city}
              </p>
            </div>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {t.service}
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
