import Link from 'next/link';
import { Logo } from './logo';
import { NavLinks } from './nav-links';
import { CartButton } from './cart-button';
import { MobileNav } from './mobile-nav';
import { Button } from '@/components/ui/button';
import { waLink } from '@/lib/constants';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent opacity-60"
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Logo />
        <div className="ml-6 hidden md:block">
          <NavLinks />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden bg-brand-cyan text-background hover:bg-brand-cyan/90 md:inline-flex"
          >
            <Link href="/cotizar">Cotizar servicio</Link>
          </Button>
          <CartButton />
          <a
            href={waLink('Hola, me interesa Domotic E Ingeniería.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1.5 text-xs font-medium text-brand-green transition hover:border-brand-green md:inline-flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>
            En línea
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
