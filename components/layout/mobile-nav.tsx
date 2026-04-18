'use client';

import { useState } from 'react';
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
import { Separator } from '@/components/ui/separator';
import { CONTACT, waLink } from '@/lib/constants';

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
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85%] max-w-sm border-l border-white/10 bg-background/95 backdrop-blur-xl"
      >
        <SheetHeader className="border-b border-white/10 pb-4">
          <SheetTitle asChild>
            <Logo asLink={false} />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 pt-6">
          <NavLinks orientation="vertical" onNavigate={close} />
          <Separator className="bg-white/10" />
          <div className="flex flex-col gap-2">
            <Button
              asChild
              className="w-full bg-brand-cyan text-background hover:bg-brand-cyan/90"
              onClick={close}
            >
              <a
                href={waLink('Hola, quiero cotizar un servicio de Domotic E Ingeniería.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotizar por WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full" onClick={close}>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>
                Llamar {CONTACT.phone}
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
