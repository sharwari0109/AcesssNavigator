import { Star } from 'lucide-react';

export function AccessibilityScore({
  score,
  label,
  size = 'md',
}: {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const color =
    score >= 85 ? 'text-success-600 bg-success-50 border-success-200'
    : score >= 70 ? 'text-warning-600 bg-warning-50 border-warning-200'
    : 'text-danger-600 bg-danger-50 border-danger-200';

  const sizeClasses = {
    sm: 'w-12 h-12 text-base',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex flex-col items-center justify-center rounded-2xl border-2 ${color} ${sizeClasses[size]} font-extrabold`}
      >
        {score}
      </div>
      {label && (
        <span className="text-xs font-semibold text-ink-600 flex items-center gap-0.5">
          <Star className="w-3 h-3 fill-warning-400 text-warning-400" />
          {label}
        </span>
      )}
    </div>
  );
}
