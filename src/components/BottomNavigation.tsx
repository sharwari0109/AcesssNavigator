import { Home, Navigation2, Bookmark, Bell, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { NavTab } from '@/types';
import { SOSButton } from './SOSButton';

const tabs: { id: NavTab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'navigate', label: 'Navigate', icon: Navigation2 },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNavigation() {
  const { activeTab, setActiveTab, navigate } = useApp();

  const handleTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'home') navigate('home');
    else if (tab === 'navigate') navigate('search');
    else if (tab === 'saved') navigate('home');
    else if (tab === 'alerts') navigate('home');
    else if (tab === 'profile') navigate('profile');
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-cream-200 px-2 pb-[env(safe-area-inset-bottom)]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around max-w-2xl mx-auto h-16">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all touch-target ${active ? 'text-primary-600 bg-primary-50' : 'text-ink-500 hover:text-ink-700'}`}
            >
              <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
              <span className="text-2xs font-semibold">{tab.label}</span>
            </button>
          );
        })}

        <div className="flex items-center justify-center -mt-8">
          <SOSButton />
        </div>

        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all touch-target ${active ? 'text-primary-600 bg-primary-50' : 'text-ink-500 hover:text-ink-700'}`}
            >
              <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
              <span className="text-2xs font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
