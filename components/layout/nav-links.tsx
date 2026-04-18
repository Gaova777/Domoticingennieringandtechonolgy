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
        'flex text-sm',
        orientation === 'horizontal' ? 'items-center gap-7' : 'flex-col gap-4',
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
              'text-muted-foreground transition-colors hover:text-foreground',
              'focus-visible:outline-none focus-visible:underline underline-offset-4',
              active && 'text-foreground',
              orientation === 'vertical' && 'text-lg font-serif tracking-tight',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
