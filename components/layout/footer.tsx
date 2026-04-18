import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Logo } from './logo';
import { Separator } from '@/components/ui/separator';
import { FOOTER_SERVICES, FOOTER_LEGAL } from '@/lib/nav';
import { CONTACT, SITE, waLink } from '@/lib/constants';

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition hover:border-brand-magenta hover:text-brand-magenta"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition hover:border-brand-cyan hover:text-brand-cyan"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition hover:border-brand-yellow hover:text-brand-yellow"
              >
                <TiktokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-brand-cyan"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition hover:text-brand-cyan"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="hover:text-foreground"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-foreground"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
            <a
              href={waLink('Hola, vengo del sitio web.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1.5 text-xs font-medium text-brand-green transition hover:border-brand-green"
            >
              WhatsApp directo
            </a>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name} · NIT {CONTACT.nit} · {SITE.city}, {SITE.region} ·
            Colombia
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            Tecnología a tu alcance
          </p>
        </div>
      </div>
    </footer>
  );
}
