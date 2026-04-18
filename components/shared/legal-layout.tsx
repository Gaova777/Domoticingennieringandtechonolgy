import Link from 'next/link';
import { FOOTER_LEGAL } from '@/lib/nav';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function LegalLayout({
  eyebrow,
  title,
  updated,
  intro,
  children,
  className,
}: Props) {
  return (
    <div className="border-t border-border">
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Vigente desde · {updated}
          </p>
          {intro ? (
            <div className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {intro}
            </div>
          ) : null}
        </div>
      </header>

      <article
        className={cn(
          'mx-auto max-w-3xl px-6 py-16 md:py-24',
          'prose-legal',
          className,
        )}
      >
        {children}
      </article>

      <aside className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Otras políticas
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {FOOTER_LEGAL.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between border-b border-border py-3 text-sm text-muted-foreground transition hover:text-foreground"
                >
                  <span>{item.label}</span>
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

// Small helpers so each legal page reads as a clean document.

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 font-serif text-2xl tracking-tight md:text-3xl">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 font-serif text-lg tracking-tight md:text-xl">{children}</h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

export function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground marker:text-foreground/40">
      {children}
    </ul>
  );
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

export function LegalDisclaimer() {
  return (
    <aside className="mt-16 rounded-sm border border-border bg-surface-1 p-6 text-[13px] leading-relaxed text-muted-foreground">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-yellow">
        Nota importante
      </p>
      <p className="mt-3">
        Este documento es una plantilla profesional adaptada a la normativa
        colombiana vigente. Antes de publicarlo como documento legal definitivo,
        un abogado o asesor legal debe revisarlo y ajustarlo al caso específico
        de tu empresa.
      </p>
    </aside>
  );
}
