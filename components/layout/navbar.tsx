import Link from 'next/link';
import { User } from 'lucide-react';
import { Logo } from './logo';
import { NavLinks } from './nav-links';
import { CartButton } from './cart-button';
import { MobileNav } from './mobile-nav';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/supabase/queries-auth';

export async function Navbar() {
  let user: Awaited<ReturnType<typeof getCurrentUser>> = null;
  try {
    user = await getCurrentUser();
  } catch {
    user = null;
  }

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
          {user ? (
            <Link
              href="/cuenta"
              aria-label="Mi cuenta"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3 text-xs font-medium text-foreground transition hover:border-foreground/40"
            >
              <User strokeWidth={1.5} className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mi cuenta</span>
            </Link>
          ) : (
            <Button
              size="sm"
              render={<Link href="/cuenta/login" />}
              className="hidden h-9 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90 md:inline-flex"
            >
              Iniciar sesión
            </Button>
          )}
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
