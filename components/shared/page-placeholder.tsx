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
        'relative mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-start justify-center gap-6 px-4 py-20 md:px-6',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent"
      />
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
      {phase ? (
        <p className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground">
          En construcción · {phase}
        </p>
      ) : null}
      <Link
        href="/"
        className="text-sm font-medium text-brand-cyan transition hover:underline"
      >
        ← Volver al inicio
      </Link>
    </section>
  );
}
