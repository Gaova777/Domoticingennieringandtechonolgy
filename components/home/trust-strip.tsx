import { MOCK_BRANDS } from '@/lib/mock/brands';

export function TrustStrip() {
  return (
    <section
      aria-label="Marcas con las que trabajamos"
      className="border-y border-white/10 bg-white/[0.02]"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trabajamos con marcas líderes
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {MOCK_BRANDS.map((b) => (
            <li
              key={b.id}
              className="text-lg font-bold uppercase tracking-tight text-muted-foreground/80 transition hover:text-foreground"
            >
              {b.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
