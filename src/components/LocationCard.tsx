import { MapPin, Clock, Star, ChevronRight, Navigation2 } from 'lucide-react';
import type { Location } from '@/types';
import { AccessibilityScore } from './ui/AccessibilityScore';

export function LocationCard({
  location,
  onClick,
  showScore = true,
}: {
  location: Location;
  onClick?: () => void;
  showScore?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-3xl border border-cream-200 p-4 hover:border-primary-300 hover:shadow-card transition-all duration-200 active:scale-[0.99] group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-navy-900 truncate">{location.name}</h3>
          <p className="text-sm text-ink-500 truncate mt-0.5">{location.address}</p>

          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-sm font-medium text-ink-600">
              <MapPin className="w-3.5 h-3.5 text-primary-500" />
              {location.distance}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-ink-600">
              <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" />
              {location.rating}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {location.features.slice(0, 3).map((f, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-primary-50 text-primary-700">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0">
          {showScore && <AccessibilityScore score={location.accessibilityScore} size="sm" />}
          <div className="flex items-center gap-1">
            <span className="text-2xs font-bold text-primary-600">Navigate</span>
            <ChevronRight className="w-4 h-4 text-primary-500 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </button>
  );
}
