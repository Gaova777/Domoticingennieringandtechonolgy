import Link from 'next/link';
import { Logo } from '@/components/layout/logo';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthShell({ eyebrow, title, description, children, footer }: Props) {
  return (
    <div className="relative isolate border-t border-border">
      <div
        aria-hidden
        className="brand-gradient-line pointer-events-none absolute inset-x-0 top-0 h-px opacity-40"
      />
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center gap-10 px-6 py-20 md:py-28">
        <Link href="/" aria-label="Inicio" className="w-max">
          <Logo size="md" asLink={false} />
        </Link>

        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {children}

        {footer ? (
          <div className="border-t border-border pt-6 text-sm text-muted-foreground">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
