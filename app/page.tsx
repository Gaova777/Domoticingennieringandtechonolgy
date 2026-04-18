import { SITE, CONTACT } from '@/lib/constants';

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 text-left">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">
          {SITE.city}, {SITE.region} · Colombia
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {SITE.name}
        </h1>
        <p className="text-2xl font-light text-muted-foreground">{SITE.tagline}</p>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {SITE.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1 text-brand-cyan">
            Domótica
          </span>
          <span className="rounded-full border border-brand-magenta/40 bg-brand-magenta/10 px-3 py-1 text-brand-magenta">
            Cámaras de seguridad
          </span>
          <span className="rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1 text-brand-yellow">
            Puertas automáticas
          </span>
          <span className="rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-brand-green">
            Cerraduras inteligentes
          </span>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Fase 0 completa — stack base listo. Contacto provisional: {CONTACT.whatsapp}
        </p>
      </div>
    </main>
  );
}
