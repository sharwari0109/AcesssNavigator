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
    score >= 85 ? 'text-success-700 bg-success-50 border-success-200'
    : score >= 70 ? 'text-warning-700 bg-warning-50 border-warning-200'
    : 'text-danger-700 bg-danger-50 border-danger-200';

  const sizeClasses = {
    sm: 'w-14 h-14 text-lg rounded-2xl',
    md: 'w-18 h-18 text-2xl rounded-3xl',
    lg: 'w-24 h-24 text-3xl rounded-3xl',
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex flex-col items-center justify-center border-2 ${color} ${sizeClasses[size]} font-extrabold`}
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
