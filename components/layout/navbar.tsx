import Link from 'next/link';
import { Logo } from './logo';
import { NavLinks } from './nav-links';
import { CartButton } from './cart-button';
import { MobileNav } from './mobile-nav';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div
        aria-hidden
        className="brand-gradient-line pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-50"
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
        <Logo />
        <div className="ml-auto hidden md:block">
          <NavLinks />
        </div>
        <div className="ml-auto flex items-center gap-3 md:ml-6">
          <Button
            size="sm"
            render={<Link href="/cotizar" />}
            className="hidden h-9 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90 md:inline-flex"
          >
            Cotizar
          </Button>
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
