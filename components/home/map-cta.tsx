import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CONTACT, SITE, waLink } from '@/lib/constants';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31779.23!2d-75.6943!3d4.8133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUGVyZWlyYQ!5e0!3m2!1ses!2sco!4v1700000000000';

export function MapCta() {
  return (
    <section>
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-12 md:gap-10 md:py-36">
        <div className="md:col-span-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Visitanos
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
            Un equipo local,{' '}
            <em className="italic">a 20 minutos.</em>
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Visitas técnicas sin costo en {SITE.city} y su área metropolitana.
            Agendá por WhatsApp o pasá por la oficina.
          </p>

          <dl className="mt-10 grid gap-5 text-sm">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Dirección
              </dt>
              <dd className="mt-1 text-foreground">{CONTACT.address}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Horario
              </dt>
              <dd className="mt-1 text-foreground">{CONTACT.hours}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Teléfono
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
                >
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              size="lg"
              render={
                <a
                  href={waLink('Hola, quisiera agendar una visita técnica.')}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Agendar por WhatsApp
            </Button>
            <Link
              href="/contacto"
              className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 transition hover:decoration-foreground"
            >
              Todos los contactos →
            </Link>
          </div>
        </div>

        <figure className="md:col-span-6">
          <div className="relative aspect-square overflow-hidden rounded-sm border border-border md:aspect-[4/5]">
            <iframe
              title={`Mapa de ${SITE.name} en ${SITE.city}`}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.4)' }}
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
