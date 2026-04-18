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
      className={cn('h-7 w-7', className)}
      fill="none"
    >
      <defs>
        <linearGradient id="domotic-ring" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="url(#domotic-ring)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="6" fill="#06b6d4" fillOpacity="0.2" />
      <circle cx="16" cy="16" r="3" fill="#06b6d4" />
      <path
        d="M6 16h4M22 16h4M16 6v4M16 22v4"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, showWordmark = true, asLink = true }: LogoProps) {
  const content = (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-bold tracking-wider">
            DOMOTIC<span className="text-brand-cyan">·</span>E
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Ingeniería
          </span>
        </span>
      ) : null}
    </span>
  );

  if (!asLink) return content;
  return (
    <Link
      href="/"
      className="group/logo inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
    >
      {content}
    </Link>
  );
}
