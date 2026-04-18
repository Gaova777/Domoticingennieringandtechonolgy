import {
  Camera,
  KeyRound,
  Cpu,
  Radar,
  Lightbulb,
  Cog,
  Router,
  Package,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Category =
  | 'camaras'
  | 'cerraduras'
  | 'domotica'
  | 'sensores'
  | 'iluminacion'
  | 'motores'
  | 'hubs';

type Props = {
  index?: number;
  sku?: string;
  category?: Category | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const ICON_SIZE: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-10 w-10',
  md: 'h-24 w-24',
  lg: 'h-36 w-36',
};

const ICON_MAP: Record<string, LucideIcon> = {
  camaras: Camera,
  cerraduras: KeyRound,
  domotica: Cpu,
  sensores: Radar,
  iluminacion: Lightbulb,
  motores: Cog,
  hubs: Router,
};

export function ProductPlaceholder({
  index,
  sku,
  category,
  className,
  size = 'md',
}: Props) {
  const Icon = (category && ICON_MAP[category]) ?? Package;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm bg-surface-1',
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 dot-grid" />

      {/* multicolor arc — subtle nod to logo ring */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.08]"
      >
        <defs>
          <linearGradient id="brand-arc" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="55%" stopColor="#ec4899" />
            <stop offset="85%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="url(#brand-arc)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          strokeWidth={0.75}
          className={cn(ICON_SIZE[size], 'text-foreground/35')}
        />
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
