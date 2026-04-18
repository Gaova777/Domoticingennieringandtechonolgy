'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';

export function NavLinks({
  orientation = 'horizontal',
  onNavigate,
}: {
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Principal"
      className={cn(
        'flex text-sm font-medium',
        orientation === 'horizontal' ? 'items-center gap-1' : 'flex-col gap-1',
      )}
    >
      {PRIMARY_NAV.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== '/' && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'relative rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan',
              active && 'text-foreground',
              orientation === 'vertical' && 'text-base',
            )}
          >
            {item.label}
            {active ? (
              <span
                aria-hidden
                className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent"
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
