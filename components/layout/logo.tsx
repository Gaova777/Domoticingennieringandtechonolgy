import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  asLink?: boolean;
};

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn('h-6 w-6', className)}
      fill="none"
    >
      <circle
        cx="16"
        cy="16"
        r="14.5"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="1"
      />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <path
        d="M7 16h3M22 16h3M16 7v3M16 22v3"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, showWordmark = true, asLink = true }: LogoProps) {
  const content = (
    <span className={cn('flex items-center gap-2.5 text-foreground', className)}>
      <LogoMark />
      {showWordmark ? (
        <span className="font-serif text-base leading-none tracking-tight">
          Domotic<span className="italic">{' e '}</span>Ingeniería
        </span>
      ) : null}
    </span>
  );

  if (!asLink) return content;
  return (
    <Link
      href="/"
      className="inline-flex rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
    >
      {content}
    </Link>
  );
}
