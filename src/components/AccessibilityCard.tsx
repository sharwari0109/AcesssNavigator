import { Accessibility, Check, AlertTriangle, XCircle } from 'lucide-react';
import type { AccessibilityFeature } from '@/types';

const statusConfig = {
  available: { icon: Check, color: 'text-success-600 bg-success-50 border-success-200', label: 'Available' },
  unavailable: { icon: XCircle, color: 'text-danger-600 bg-danger-50 border-danger-200', label: 'Unavailable' },
  warning: { icon: AlertTriangle, color: 'text-warning-600 bg-warning-50 border-warning-200', label: 'Warning' },
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
      className="flex items-start gap-3 w-full text-left p-3.5 rounded-xl border-2 border-ink-200 bg-white hover:border-ink-300 transition-colors"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${c.color} shrink-0`}>
        <Icon className="w-4.5 h-4.5" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-ink-900 text-sm">{feature.label}</h4>
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
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-4 text-white shadow-card-lg">
      <div className="flex items-center gap-2 mb-2">
        <Accessibility className="w-5 h-5" />
        <h3 className="font-bold">Your accessibility profile</h3>
      </div>
      <p className="text-sm text-primary-100 leading-relaxed">
        {items
          .map((s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
          .join(' • ')}
      </p>
    </div>
  );
}
