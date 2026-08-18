import { Navigation2, MapPin, Construction, Waves } from 'lucide-react';
import type { Location } from '@/types';
import { locations as mockLocations } from '@/data/mockData';

interface MapViewProps {
  selectedLocation?: Location | null;
  showRoute?: boolean;
  interactive?: boolean;
  onSelectLocation?: (loc: Location) => void;
  className?: string;
}

export function MapView({ selectedLocation, showRoute, interactive, onSelectLocation, className = '' }: MapViewProps) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-cream-100 ${className}`}
      role="img"
      aria-label="Map showing accessibility markers for nearby locations"
    >
      {/* Map background grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#e6efec" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="#f5f8f7" />
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Roads */}
          <path d="M 0 45 L 100 45" stroke="#e6efec" strokeWidth="3" fill="none" />
          <path d="M 0 45 L 100 45" stroke="#fff" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          <path d="M 30 0 L 30 100" stroke="#e6efec" strokeWidth="3" fill="none" />
          <path d="M 30 0 L 30 100" stroke="#fff" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          <path d="M 65 0 L 65 100" stroke="#e6efec" strokeWidth="2.5" fill="none" />
          <path d="M 0 70 L 100 70" stroke="#e6efec" strokeWidth="2.5" fill="none" />
          <path d="M 15 20 Q 40 30 55 15" stroke="#e6efec" strokeWidth="2" fill="none" />
          <path d="M 50 50 Q 70 60 85 80" stroke="#e6efec" strokeWidth="2" fill="none" />

          {/* Buildings */}
          <rect x="5" y="5" width="18" height="35" fill="#edf2f0" rx="1.5" />
          <rect x="35" y="5" width="25" height="35" fill="#edf2f0" rx="1.5" />
          <rect x="70" y="5" width="25" height="35" fill="#edf2f0" rx="1.5" />
          <rect x="5" y="50" width="20" height="45" fill="#edf2f0" rx="1.5" />
          <rect x="35" y="50" width="25" height="15" fill="#edf2f0" rx="1.5" />
          <rect x="35" y="72" width="25" height="23" fill="#edf2f0" rx="1.5" />
          <rect x="70" y="50" width="25" height="45" fill="#edf2f0" rx="1.5" />

          {/* Park / green area */}
          <rect x="35" y="50" width="25" height="15" fill="#cde7d3" rx="1.5" opacity="0.6" />

          {/* Construction zone */}
          <rect x="72" y="52" width="12" height="10" fill="#fff0d9" rx="1.5" opacity="0.7" />

          {/* Route line */}
          {showRoute && (
            <>
              <path
                d="M 50 90 Q 35 70 30 50 Q 25 35 35 42"
                stroke="#199e91"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="0"
              />
              <path
                d="M 50 90 Q 35 70 30 50 Q 25 35 35 42"
                stroke="#53a99c"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                opacity="0.3"
              />
            </>
          )}
        </svg>
      </div>

      {/* Current location */}
      <div className="absolute left-1/2 bottom-[12%] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-primary-400/30 animate-ping" aria-hidden="true" />
          <div className="relative w-5 h-5 rounded-full bg-primary-600 border-2 border-white shadow-card" />
        </div>
      </div>

      {/* Location markers */}
      {mockLocations.map((loc) => {
        const isSelected = selectedLocation?.id === loc.id;
        const markerColor =
          loc.accessibilityScore >= 85 ? 'bg-success-500'
          : loc.accessibilityScore >= 70 ? 'bg-warning-500'
          : 'bg-danger-500';
        return (
          <button
            key={loc.id}
            onClick={() => interactive && onSelectLocation?.(loc)}
            aria-label={`${loc.name}, ${loc.accessibilityLabel}`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} ${isSelected ? 'z-20 scale-125' : 'z-10'}`}
            style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
          >
            <div className={`w-7 h-7 rounded-full ${markerColor} border-2 border-white shadow-card flex items-center justify-center`}>
              <MapPin className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            {isSelected && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-9 bg-white px-2.5 py-1 rounded-xl shadow-card-lg whitespace-nowrap text-2xs font-bold text-navy-900 animate-bounce-soft">
                {loc.name}
              </div>
            )}
          </button>
        );
      })}

      {/* Construction marker */}
      <div className="absolute left-[78%] top-[57%] -translate-x-1/2 -translate-y-1/2 z-10" aria-label="Construction zone">
        <div className="w-7 h-7 rounded-full bg-warning-500 border-2 border-white shadow-card flex items-center justify-center">
          <Construction className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Low sensory marker */}
      <div className="absolute left-[20%] top-[75%] -translate-x-1/2 -translate-y-1/2 z-10" aria-label="Low sensory zone">
        <div className="w-7 h-7 rounded-full bg-accent-500 border-2 border-white shadow-card flex items-center justify-center">
          <Waves className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 z-20">
        <button
          aria-label="Zoom in"
          className="w-11 h-11 rounded-2xl bg-white shadow-card-lg flex items-center justify-center text-navy-800 hover:bg-cream-50 active:scale-95 transition-all touch-target"
        >
          <span className="text-xl font-bold leading-none">+</span>
        </button>
        <button
          aria-label="Zoom out"
          className="w-11 h-11 rounded-2xl bg-white shadow-card-lg flex items-center justify-center text-navy-800 hover:bg-cream-50 active:scale-95 transition-all touch-target"
        >
          <span className="text-xl font-bold leading-none">−</span>
        </button>
        <button
          aria-label="Recenter map to current location"
          className="w-11 h-11 rounded-2xl bg-primary-600 shadow-card-lg flex items-center justify-center text-white hover:bg-primary-700 active:scale-95 transition-all touch-target"
        >
          <Navigation2 className="w-5 h-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute left-3 bottom-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-card px-3.5 py-2.5 flex flex-col gap-2 z-20 decorative">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-success-500" />
          <span className="text-2xs font-semibold text-navy-800">Accessible</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-warning-500" />
          <span className="text-2xs font-semibold text-navy-800">Partial</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-danger-500" />
          <span className="text-2xs font-semibold text-navy-800">Barrier</span>
        </div>
      </div>
    </div>
  );
}
