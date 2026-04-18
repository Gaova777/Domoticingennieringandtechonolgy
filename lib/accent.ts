export type Accent = 'cyan' | 'magenta' | 'yellow' | 'green';

type AccentStyles = {
  text: string;
  bg: string;
  border: string;
  ring: string;
  glow: string;
  iconWrap: string;
};

export const ACCENT_STYLES: Record<Accent, AccentStyles> = {
  cyan: {
    text: 'text-brand-cyan',
    bg: 'bg-brand-cyan/10',
    border: 'border-brand-cyan/30',
    ring: 'hover:border-brand-cyan/60',
    glow: 'hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.5)]',
    iconWrap: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30',
  },
  magenta: {
    text: 'text-brand-magenta',
    bg: 'bg-brand-magenta/10',
    border: 'border-brand-magenta/30',
    ring: 'hover:border-brand-magenta/60',
    glow: 'hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.5)]',
    iconWrap: 'bg-brand-magenta/10 text-brand-magenta border-brand-magenta/30',
  },
  yellow: {
    text: 'text-brand-yellow',
    bg: 'bg-brand-yellow/10',
    border: 'border-brand-yellow/30',
    ring: 'hover:border-brand-yellow/60',
    glow: 'hover:shadow-[0_0_30px_-10px_rgba(250,204,21,0.5)]',
    iconWrap: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30',
  },
  green: {
    text: 'text-brand-green',
    bg: 'bg-brand-green/10',
    border: 'border-brand-green/30',
    ring: 'hover:border-brand-green/60',
    glow: 'hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.5)]',
    iconWrap: 'bg-brand-green/10 text-brand-green border-brand-green/30',
  },
};
