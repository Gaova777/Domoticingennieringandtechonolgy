'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PRIMARY_NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';

type Props = {
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
};

export function NavLinks({ orientation = 'horizontal', onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Principal"
      className={cn(
        'flex text-sm',
        orientation === 'horizontal' ? 'items-center gap-1' : 'flex-col gap-4',
      )}
    >
      {PRIMARY_NAV.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== '/' && pathname?.startsWith(item.href));

        if (!item.children || item.children.length === 0 || orientation === 'vertical') {
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'transition-colors focus-visible:outline-none focus-visible:underline underline-offset-4',
                orientation === 'horizontal' ? 'px-3 py-2' : 'text-lg font-serif tracking-tight',
                active
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <DropdownMenu key={item.href}>
            <DropdownMenuTrigger
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30',
                active
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
              <ChevronDown strokeWidth={1.5} className="h-3 w-3 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="min-w-64 rounded-sm border-border bg-popover p-1"
            >
              <DropdownMenuItem
                render={
                  <Link href={item.href} onClick={onNavigate}>
                    <span className="flex w-full items-center justify-between">
                      {item.children[0].label}
                      <span aria-hidden className="text-muted-foreground">
                        →
                      </span>
                    </span>
                  </Link>
                }
                className="cursor-pointer rounded-sm px-3 py-2 text-sm font-medium text-foreground focus:bg-accent"
              />
              <DropdownMenuSeparator className="my-1 bg-border" />
              {item.children.slice(1).map((child) => (
                <DropdownMenuItem
                  key={child.href}
                  render={
                    <Link href={child.href} onClick={onNavigate}>
                      {child.label}
                    </Link>
                  }
                  className="cursor-pointer rounded-sm px-3 py-2 text-sm text-muted-foreground focus:bg-accent focus:text-foreground"
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </nav>
  );
}
