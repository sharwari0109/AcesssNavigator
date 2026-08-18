import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

type Level = 'full' | 'partial' | 'barrier';

const config: Record<Level, { label: string; bg: string; text: string; border: string; Icon: typeof CheckCircle2 }> = {
  full: { label: 'Accessible', bg: 'bg-success-50', text: 'text-success-700', border: 'border-success-200', Icon: CheckCircle2 },
  partial: { label: 'Partial', bg: 'bg-warning-50', text: 'text-warning-700', border: 'border-warning-200', Icon: AlertTriangle },
  barrier: { label: 'Barrier', bg: 'bg-danger-50', text: 'text-danger-700', border: 'border-danger-200', Icon: XCircle },
};

export function AccessibilityBadge({
  level,
  label,
  size = 'md',
}: {
  level: Level;
  label?: string;
  size?: 'sm' | 'md';
}) {
  const c = config[level];
  const Icon = c.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${c.bg} ${c.text} ${c.border} ${size === 'sm' ? 'px-2 py-0.5 text-2xs' : 'px-2.5 py-1 text-xs'}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {label || c.label}
    </span>
  );
}
