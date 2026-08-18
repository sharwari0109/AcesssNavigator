import { useState } from 'react';
import { ArrowLeft, MapPin, Filter } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RouteCard } from '@/components/RouteCard';
import { SOSButton } from '@/components/SOSButton';
import { BottomNavigation } from '@/components/BottomNavigation';
import { routeOptions, routeFilters } from '@/data/mockData';

export function RouteOptionsScreen() {
  const { selectedLocation, setSelectedRoute, navigate, goBack } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('most-accessible');
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const handleSelectRoute = (routeId: string) => {
    setSelectedRouteId(routeId);
    const route = routeOptions.find((r) => r.id === routeId);
    if (route) {
      setSelectedRoute(route);
      setTimeout(() => navigate('navigation'), 300);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      <header className="bg-white border-b border-ink-100 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-lg text-ink-600 hover:bg-ink-100 transition-colors touch-target"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-2xs font-semibold text-ink-500">Route to</p>
            <h1 className="text-base font-bold text-ink-900 truncate">
              {selectedLocation?.name || 'Destination'}
            </h1>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 py-4 overflow-y-auto pb-32">
        <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0 text-ink-500">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Filter</span>
          </div>
          {routeFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              aria-pressed={selectedFilter === f.id}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === f.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-ink-600 border-2 border-ink-200 hover:border-ink-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {routeOptions.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              selected={selectedRouteId === route.id}
              onSelect={() => handleSelectRoute(route.id)}
            />
          ))}
        </div>

        <div className="mt-6 bg-primary-50 rounded-2xl p-4 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary-900 text-sm">Route preferences</p>
            <p className="text-sm text-primary-700 mt-0.5">
              Routes are personalized based on your accessibility profile. You can change your preferences in Profile settings.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed right-4 bottom-24 z-40">
        <SOSButton />
      </div>

      <BottomNavigation />
    </div>
  );
}
