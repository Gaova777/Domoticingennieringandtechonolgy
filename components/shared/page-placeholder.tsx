import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  phase?: string;
  className?: string;
};

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  phase,
  className,
}: Props) {
  return (
    <section
      className={cn(
        'mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-start justify-center gap-8 px-6 py-28 md:py-36',
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
      {phase ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          En construcción · {phase}
        </p>
      ) : null}
      <Link
        href="/"
        className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
      >
        ← Volver al inicio
      </Link>
    </section>
  );
}
