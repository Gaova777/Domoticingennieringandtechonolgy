import {
  Home,
  Camera,
  KeyRound,
  DoorClosed,
  Lightbulb,
  Cable,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Home,
  Camera,
  KeyRound,
  DoorClosed,
  Lightbulb,
  Cable,
  Cpu,
};

export function resolveServiceIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Cpu;
  return ICONS[name] ?? Cpu;
}

type Props = {
  name: string | null | undefined;
  className?: string;
  strokeWidth?: number;
};

export function ServiceIcon({ name, className, strokeWidth = 1.25 }: Props) {
  const Icon = resolveServiceIcon(name);
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
