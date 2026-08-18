import { Check, AlertTriangle, Clock, MapPin, Zap, Accessibility, Waves } from 'lucide-react';
import type { RouteOption } from '@/types';
import { StarRating } from './ui/StarRating';
import { Button } from './ui/Button';

const typeConfig = {
  accessible: { icon: Accessibility, color: 'text-success-600 bg-success-50' },
  fastest: { icon: Zap, color: 'text-primary-600 bg-primary-50' },
  'low-sensory': { icon: Waves, color: 'text-accent-600 bg-accent-50' },
};

export function RouteCard({
  route,
  onSelect,
  selected,
}: {
  route: RouteOption;
  onSelect?: () => void;
  selected?: boolean;
}) {
  const c = typeConfig[route.type];
  const Icon = c.icon;

  return (
    <div
      className={`rounded-2xl border-2 bg-white p-4 transition-all duration-200 ${selected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-ink-200 hover:border-ink-300'}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color}`}>
            <Icon className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bold text-ink-900 flex items-center gap-2">
              {route.title}
              {route.isRecommended && (
                <span className="text-2xs font-bold uppercase tracking-wide text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded-md">
                  Recommended
                </span>
              )}
            </h3>
            <div className="flex items-center gap-3 mt-0.5 text-sm text-ink-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {route.duration}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {route.distance}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating rating={route.accessibilityStars} />
          <span className="text-2xs font-semibold text-ink-500">Accessibility</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {route.features.map((f, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
              f.type === 'good'
                ? 'bg-success-50 text-success-700'
                : 'bg-warning-50 text-warning-700'
            }`}
          >
            {f.type === 'good' ? (
              <Check className="w-3 h-3" strokeWidth={3} />
            ) : (
              <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
            )}
            {f.label}
          </span>
        ))}
      </div>

      {onSelect && (
        <Button
          fullWidth
          size="md"
          variant={selected ? 'primary' : 'outline'}
          onClick={onSelect}
        >
          {selected ? 'Route Selected' : 'Start Navigation'}
        </Button>
      )}
    </div>
  );
}
