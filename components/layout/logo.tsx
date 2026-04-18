import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
};

const DIMENSIONS: Record<NonNullable<LogoProps['size']>, { w: number; h: number }> = {
  sm: { w: 110, h: 44 },
  md: { w: 140, h: 56 },
  lg: { w: 200, h: 80 },
};

export function Logo({ className, size = 'sm', asLink = true }: LogoProps) {
  const { w, h } = DIMENSIONS[size];

  const content = (
    <Image
      src="/logo.png"
      alt="Domotic E Ingeniería — Tecnología a tu alcance"
      width={w}
      height={h}
      priority={size !== 'sm'}
      className={cn('select-none', className)}
      style={{ height: h, width: 'auto' }}
    />
  );

  if (!asLink) return content;
  return (
    <Link
      href="/"
      aria-label="Inicio — Domotic E Ingeniería"
      className="inline-flex rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
    >
      {content}
    </Link>
  );
}
