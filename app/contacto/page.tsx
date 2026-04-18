import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { CONTACT, SITE, waLink } from '@/lib/constants';
import { getServices } from '@/lib/supabase/queries';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Habla con nosotros por WhatsApp, teléfono o correo. Visítanos en Pereira, Risaralda.',
};

export const revalidate = 600;

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31779.23!2d-75.6943!3d4.8133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUGVyZWlyYQ!5e0!3m2!1ses!2sco!4v1700000000000';

export default async function ContactPage() {
  const services = await getServices();

  return (
    <div className="border-t border-border">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Contacto
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Hablemos de{' '}
            <em className="italic">tu proyecto.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Respondemos por WhatsApp, correo o teléfono. También puedes visitarnos
            en nuestra oficina en {SITE.city}.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <aside className="md:col-span-5 md:sticky md:top-24 md:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Datos directos
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight md:text-4xl">
              Así nos encuentras.
            </h2>

            <dl className="mt-10 space-y-8">
              <ContactRow
                icon={MapPin}
                label="Dirección"
                value={CONTACT.address}
              />
              <ContactRow
                icon={Clock}
                label="Horario"
                value={CONTACT.hours}
              />
              <ContactRow
                icon={Phone}
                label="Teléfono"
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                value={CONTACT.phone}
              />
              <ContactRow
                icon={Mail}
                label="Correo"
                href={`mailto:${CONTACT.email}`}
                value={CONTACT.email}
              />
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={waLink('Hola, vengo del sitio web.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                WhatsApp directo
              </a>
              <Link
                href="/cotizar"
                className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition hover:border-foreground/40"
              >
                Cotización formal
              </Link>
            </div>

            <div className="mt-10 overflow-hidden rounded-sm border border-border">
              <iframe
                title={`Mapa de ${SITE.name}`}
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-video w-full"
                style={{
                  border: 0,
                  filter: 'invert(0.92) hue-rotate(180deg) saturate(0.4)',
                }}
              />
            </div>
          </aside>

          <section className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Escríbenos
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight md:text-4xl">
              Formulario de contacto.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Cuéntanos qué necesitas y te respondemos con una propuesta. Toda
              la información se almacena según nuestra política de privacidad.
            </p>
            <div className="mt-10">
              <ContactForm
                services={services.map((s) => ({ slug: s.slug, name: s.name }))}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <Icon strokeWidth={1.5} className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-2 text-base">
        {href ? (
          <a
            href={href}
            className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
