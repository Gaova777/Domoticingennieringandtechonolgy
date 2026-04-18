import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-between gap-6 md:flex-row md:items-end',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 transition hover:decoration-foreground"
        >
          {action.label} →
        </Link>
      ) : null}
    </div>
  );
}
