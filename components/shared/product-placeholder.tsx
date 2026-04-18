import { Package } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  index?: number;
  sku?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const ICON_SIZE: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-10 w-10',
  md: 'h-20 w-20',
  lg: 'h-32 w-32',
};

export function ProductPlaceholder({
  index,
  sku,
  className,
  size = 'md',
}: Props) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm bg-surface-1',
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Package strokeWidth={0.75} className={cn(ICON_SIZE[size], 'text-foreground/20')} />
      </div>
      {index !== undefined ? (
        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {String(index).padStart(2, '0')}
        </span>
      ) : null}
      {sku ? (
        <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {sku}
        </span>
      ) : null}
    </div>
  );
}
