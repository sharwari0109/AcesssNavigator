import { Bell, MapPin, Home, Briefcase, HeartPulse, TrainFront, ChevronRight, Accessibility } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MapView } from '@/components/MapView';
import { SearchBar } from '@/components/SearchBar';
import { SOSButton } from '@/components/SOSButton';
import { BottomNavigation } from '@/components/BottomNavigation';
import { AccessibilitySummaryCard } from '@/components/AccessibilityCard';
import { quickDestinations } from '@/data/mockData';
import { useState } from 'react';

const quickIcons: Record<string, typeof Home> = {
  Home, Briefcase, HeartPulse, TrainFront,
};

export function HomeScreen() {
  const { user, profile, navigate, setSelectedLocation, showToast } = useApp();
  const [search, setSearch] = useState('');

  const handleQuickDest = (id: string) => {
    if (id === 'station') {
      setSelectedLocation(null);
      navigate('search');
    } else {
      showToast(`Routing to ${id}…`, 'info');
      navigate('search');
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-ink-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
            <Accessibility className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-2xs font-semibold text-ink-500">Current Location</p>
            <p className="text-sm font-bold text-ink-900 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              Bandra West, Mumbai
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => showToast('No new notifications', 'info')}
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-ink-600 hover:bg-ink-100 transition-colors touch-target"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500" />
          </button>
          <button
            onClick={() => navigate('profile')}
            aria-label="Profile"
            className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm hover:bg-primary-200 transition-colors touch-target"
          >
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </button>
        </div>
      </header>

      {/* Map */}
      <div className="relative flex-1 min-h-[300px]">
        <MapView interactive onSelectLocation={(loc) => { setSelectedLocation(loc); navigate('accessibility-details'); }} />

        {/* Floating SOS */}
        <div className="absolute right-4 top-4 z-30">
          <SOSButton />
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-3xl shadow-card-lg -mt-6 relative z-20 pb-20">
        <div className="px-5 pt-3 pb-5">
          <div className="w-10 h-1.5 bg-ink-200 rounded-full mx-auto mb-4" />

          <h2 className="text-xl font-extrabold text-ink-900 mb-3">Where do you want to go?</h2>

          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={() => navigate('search')}
            placeholder="Search destination"
          />

          <div className="flex gap-2.5 mt-4 overflow-x-auto no-scrollbar pb-1">
            {quickDestinations.map((dest) => {
              const Icon = quickIcons[dest.icon] || MapPin;
              return (
                <button
                  key={dest.id}
                  onClick={() => handleQuickDest(dest.id)}
                  className="flex flex-col items-center gap-1.5 shrink-0 w-20 p-3 rounded-2xl bg-ink-50 hover:bg-primary-50 transition-colors touch-target"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-card">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-xs font-semibold text-ink-700">{dest.label}</span>
                </button>
              );
            })}
          </div>

          {profile.needs.length > 0 && (
            <div className="mt-4">
              <AccessibilitySummaryCard needs={profile.needs} preferences={profile.preferences} />
            </div>
          )}

          <button
            onClick={() => navigate('search')}
            className="w-full flex items-center justify-between p-4 mt-4 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-ink-900">Explore nearby places</p>
                <p className="text-sm text-ink-500">Find accessible destinations</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-primary-600" />
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
