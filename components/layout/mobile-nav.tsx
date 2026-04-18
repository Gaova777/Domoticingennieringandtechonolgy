'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NavLinks } from './nav-links';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { CONTACT } from '@/lib/constants';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menú"
          className="md:hidden"
        >
          <Menu strokeWidth={1.5} className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[88%] max-w-sm border-l border-border bg-background"
      >
        <SheetHeader className="border-b border-border pb-6">
          <SheetTitle asChild>
            <Logo asLink={false} />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-10 pt-8">
          <NavLinks orientation="vertical" onNavigate={close} />
          <div className="border-t border-border pt-6">
            <Button
              asChild
              className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
              onClick={close}
            >
              <Link href="/cotizar">Cotizar proyecto</Link>
            </Button>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Contacto
            </p>
            <p className="mt-2 text-sm">
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="text-foreground hover:underline underline-offset-4"
              >
                {CONTACT.phone}
              </a>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
