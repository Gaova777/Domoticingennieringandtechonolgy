import Link from 'next/link';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT, SITE, waLink } from '@/lib/constants';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31779.23!2d-75.6943!3d4.8133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUGVyZWlyYQ!5e0!3m2!1ses!2sco!4v1700000000000';

export function MapCta() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col gap-6 p-8 md:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-cyan">
                <MapPin className="h-3 w-3" />
                Visitanos en Pereira
              </span>
              <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Un equipo real, a 20 minutos de tu casa.
              </h2>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Hacemos visitas técnicas sin costo dentro de {SITE.city} y el área
                metropolitana. Agendá por WhatsApp o pasá por nuestra oficina.
              </p>

              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                  <span className="text-muted-foreground">{CONTACT.address}</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                  <span className="text-muted-foreground">{CONTACT.hours}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="text-foreground hover:underline"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>

              <div className="mt-2 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-brand-green px-6 text-background shadow-lg shadow-brand-green/20 hover:bg-brand-green/90"
                >
                  <a
                    href={waLink('Hola, quisiera agendar una visita técnica.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar por WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/15 bg-white/5 px-6 hover:border-white/30 hover:bg-white/10"
                >
                  <Link href="/contacto">Todos los contactos</Link>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[320px] border-t border-white/10 md:border-l md:border-t-0">
              <iframe
                title={`Mapa de ${SITE.name} en ${SITE.city}`}
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.4] contrast-125"
                style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
