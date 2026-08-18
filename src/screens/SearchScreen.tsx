import { useState } from 'react';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SearchBar } from '@/components/SearchBar';
import { LocationCard } from '@/components/LocationCard';
import { SOSButton } from '@/components/SOSButton';
import { BottomNavigation } from '@/components/BottomNavigation';
import { locations, recentSearches } from '@/data/mockData';

export function SearchScreen() {
  const { navigate, setSelectedLocation, goBack } = useApp();
  const [query, setQuery] = useState('');

  const filtered = query
    ? locations.filter((l) =>
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.address.toLowerCase().includes(query.toLowerCase())
      )
    : locations;

  const handleSelect = (location: typeof locations[0]) => {
    setSelectedLocation(location);
    navigate('routes');
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <header className="bg-white/95 backdrop-blur-lg border-b border-cream-200 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={goBack}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-xl text-ink-600 hover:bg-cream-200 transition-colors touch-target"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-navy-900">Search Destination</h1>
        </div>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Where would you like to go?"
          autoFocus
        />
      </header>

      <div className="flex-1 px-4 py-4 overflow-y-auto pb-32">
        {!query && (
          <>
            <h2 className="text-sm font-bold text-ink-500 uppercase tracking-wide mb-3">
              Recent destinations
            </h2>
            <div className="space-y-2 mb-6">
              {recentSearches.map((search, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(search)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-cream-200 hover:border-primary-300 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center">
                    <Clock className="w-4.5 h-4.5 text-ink-500" />
                  </div>
                  <span className="font-medium text-ink-700 text-sm">{search}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <h2 className="text-sm font-bold text-ink-500 uppercase tracking-wide mb-3">
          {query ? `Results (${filtered.length})` : 'Nearby accessible places'}
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8 text-ink-400" />
            </div>
            <p className="font-semibold text-navy-800">No places found</p>
            <p className="text-sm text-ink-500 mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((loc) => (
              <LocationCard key={loc.id} location={loc} onClick={() => handleSelect(loc)} />
            ))}
          </div>
        )}
      </div>

      <div className="fixed right-4 bottom-24 z-40">
        <SOSButton />
      </div>

      <BottomNavigation />
    </div>
  );
}
