import { Check, AlertTriangle, Clock, MapPin, Zap, Accessibility, Waves } from 'lucide-react';
import type { RouteOption } from '@/types';
import { StarRating } from './ui/StarRating';
import { Button } from './ui/Button';

const typeConfig = {
  accessible: { icon: Accessibility, color: 'text-primary-700 bg-primary-50 border-primary-200', badge: 'bg-primary-600 text-white' },
  fastest: { icon: Zap, color: 'text-accent-700 bg-accent-50 border-accent-200', badge: 'bg-accent-500 text-white' },
  'low-sensory': { icon: Waves, color: 'text-success-700 bg-success-50 border-success-200', badge: 'bg-success-600 text-white' },
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
      className={`rounded-3xl border-2 bg-white p-5 transition-all duration-200 ${selected ? 'border-primary-500 ring-2 ring-primary-200 shadow-card-lg' : 'border-cream-200 hover:border-primary-300 hover:shadow-card'}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${c.color}`}>
            <Icon className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bold text-navy-900 flex items-center gap-2">
              {route.title}
              {route.isRecommended && (
                <span className="text-2xs font-bold uppercase tracking-wide text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              )}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-ink-500">
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

      <div className="flex flex-wrap gap-1.5 mb-4">
        {route.features.map((f, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
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
