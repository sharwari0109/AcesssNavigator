import { Accessibility, Check, AlertTriangle, XCircle } from 'lucide-react';
import type { AccessibilityFeature } from '@/types';

const statusConfig = {
  available: { icon: Check, color: 'text-success-700 bg-success-50 border-success-200', label: 'Available' },
  unavailable: { icon: XCircle, color: 'text-danger-700 bg-danger-50 border-danger-200', label: 'Unavailable' },
  warning: { icon: AlertTriangle, color: 'text-warning-700 bg-warning-50 border-warning-200', label: 'Warning' },
};

export function AccessibilityCard({
  feature,
  onClick,
}: {
  feature: AccessibilityFeature;
  onClick?: () => void;
}) {
  const c = statusConfig[feature.status];
  const Icon = c.icon;

  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 w-full text-left p-4 rounded-2xl border border-cream-200 bg-white hover:border-primary-300 hover:shadow-soft transition-all"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${c.color} shrink-0`}>
        <Icon className="w-5 h-5" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-navy-900 text-sm">{feature.label}</h4>
        <p className="text-xs text-ink-500 mt-0.5">{feature.detail}</p>
      </div>
    </button>
  );
}

export function AccessibilitySummaryCard({
  needs,
  preferences,
}: {
  needs: string[];
  preferences: string[];
}) {
  const items = [...needs, ...preferences];
  if (items.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-4 text-white shadow-card-lg">
      <div className="flex items-center gap-2 mb-2">
        <Accessibility className="w-5 h-5" />
        <h3 className="font-bold">Your accessibility profile</h3>
      </div>
      <p className="text-sm text-primary-50 leading-relaxed">
        {items
          .map((s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
          .join(' • ')}
      </p>
    </div>
  );
}
