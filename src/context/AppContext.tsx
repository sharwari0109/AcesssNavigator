import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type {
  Screen,
  AccessibilityProfile,
  AppSettings,
  User,
  Toast,
  ToastType,
  NavTab,
  Location,
  RouteOption,
} from '@/types';

interface AppContextValue {
  screen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  user: User | null;
  setUser: (user: User | null) => void;

  profile: AccessibilityProfile;
  setProfile: (profile: AccessibilityProfile) => void;
  toggleNeed: (id: string) => void;
  togglePreference: (id: string) => void;

  settings: AppSettings;
  updateSetting: (key: keyof AppSettings, value: boolean) => void;

  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  selectedRoute: RouteOption | null;
  setSelectedRoute: (route: RouteOption | null) => void;

  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;

  sosActive: boolean;
  setSosActive: (active: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const defaultSettings: AppSettings = {
  largeText: false,
  highContrast: false,
  reduceAnimations: false,
  screenReaderMode: false,
  largeButtons: false,
  voiceNavigation: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('splash');
  const [history, setHistory] = useState<Screen[]>([]);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AccessibilityProfile>({ needs: [], preferences: [] });
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sosActive, setSosActive] = useState(false);

  const navigate = useCallback((next: Screen) => {
    setHistory((prev) => [...prev, screen]);
    setScreen(next);
  }, [screen]);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setScreen(last);
      return prev.slice(0, -1);
    });
  }, []);

  const toggleNeed = useCallback((id: string) => {
    setProfile((prev) => ({
      ...prev,
      needs: prev.needs.includes(id)
        ? prev.needs.filter((n) => n !== id)
        : [...prev.needs, id],
    }));
  }, []);

  const togglePreference = useCallback((id: string) => {
    setProfile((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(id)
        ? prev.preferences.filter((p) => p !== id)
        : [...prev.preferences, id],
    }));
  }, []);

  const updateSetting = useCallback((key: keyof AppSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('hc-mode', settings.highContrast);
    root.classList.toggle('lg-text', settings.largeText);
    root.classList.toggle('reduce-motion', settings.reduceAnimations);
    root.classList.toggle('sr-mode', settings.screenReaderMode);
  }, [settings.highContrast, settings.largeText, settings.reduceAnimations, settings.screenReaderMode]);

  const value: AppContextValue = {
    screen,
    navigate,
    goBack,
    activeTab,
    setActiveTab,
    user,
    setUser,
    profile,
    setProfile,
    toggleNeed,
    togglePreference,
    settings,
    updateSetting,
    selectedLocation,
    setSelectedLocation,
    selectedRoute,
    setSelectedRoute,
    toasts,
    showToast,
    dismissToast,
    sosActive,
    setSosActive,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
