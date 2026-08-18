import { useState } from 'react';
import {
  ArrowLeft,
  Accessibility,
  Navigation2,
  Settings,
  Bell,
  Shield,
  LogOut,
  Edit3,
  ChevronRight,
  Check,
  Type,
  Contrast,
  Sparkles,
  Volume2,
  Eye,
  Hand,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Button } from '@/components/ui/Button';
import {
  accessibilityNeeds,
  mobilityPreferences,
} from '@/data/mockData';

export function ProfileScreen() {
  const { user, profile, toggleNeed, togglePreference, settings, updateSetting, navigate, goBack, showToast, setUser } = useApp();
  const [editingNeeds, setEditingNeeds] = useState(false);

  const selectedNeedLabels = profile.needs.map((id) => {
    const need = accessibilityNeeds.find((n) => n.id === id);
    return need ? need.label : id;
  });

  const selectedPrefLabels = profile.preferences.map((id) => {
    const pref = mobilityPreferences.find((p) => p.id === id);
    return pref ? pref.label : id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  });

  const appSettings = [
    { key: 'largeText' as const, label: 'Large text', icon: Type, desc: 'Increase font sizes throughout' },
    { key: 'highContrast' as const, label: 'High contrast', icon: Contrast, desc: 'Maximum color contrast' },
    { key: 'reduceAnimations' as const, label: 'Reduce animations', icon: Sparkles, desc: 'Minimize motion effects' },
    { key: 'screenReaderMode' as const, label: 'Screen reader mode', icon: Eye, desc: 'Optimized for screen readers' },
    { key: 'largeButtons' as const, label: 'Extra-large buttons', icon: Hand, desc: 'Larger touch targets' },
    { key: 'voiceNavigation' as const, label: 'Voice navigation', icon: Volume2, desc: 'Spoken turn-by-turn guidance' },
  ];

  const navPrefs = [
    { id: 'most-accessible', label: 'Most accessible route' },
    { id: 'fastest-accessible', label: 'Fastest accessible route' },
    { id: 'avoid-construction', label: 'Avoid construction' },
    { id: 'avoid-crowded', label: 'Avoid crowded areas' },
  ];

  const accountItems = [
    { icon: Edit3, label: 'Edit profile', action: () => showToast('Edit profile (simulated)', 'info') },
    { icon: Bell, label: 'Notifications', action: () => showToast('Notification settings (simulated)', 'info') },
    { icon: Shield, label: 'Privacy', action: () => showToast('Privacy settings (simulated)', 'info') },
  ];

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
          <h1 className="text-lg font-bold text-ink-900">Profile & Settings</h1>
        </div>
      </header>

      <div className="flex-1 px-4 py-4 overflow-y-auto pb-24">
        {/* User card */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-5 text-white mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-extrabold border border-white/20">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <h2 className="text-xl font-extrabold">{user?.name || 'Alex Morgan'}</h2>
              <p className="text-primary-100 text-sm">{user?.email || 'alex@example.com'}</p>
            </div>
          </div>
        </div>

        {/* My Accessibility Needs */}
        <section className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                <Accessibility className="w-4.5 h-4.5 text-primary-600" />
              </div>
              <h3 className="font-bold text-ink-900">My Accessibility Needs</h3>
            </div>
            <button
              onClick={() => setEditingNeeds((e) => !e)}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              {editingNeeds ? 'Done' : 'Edit'}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4">
            {!editingNeeds ? (
              <div className="flex flex-wrap gap-2">
                {selectedNeedLabels.length === 0 && selectedPrefLabels.length === 0 ? (
                  <p className="text-sm text-ink-500">No accessibility needs selected yet.</p>
                ) : (
                  <>
                    {selectedNeedLabels.map((label) => (
                      <span key={label} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary-50 text-primary-700">
                        {label}
                      </span>
                    ))}
                    {selectedPrefLabels.map((label) => (
                      <span key={label} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-accent-50 text-accent-700">
                        {label}
                      </span>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-ink-500 uppercase mb-2">Needs</p>
                {accessibilityNeeds.map((need) => {
                  const selected = profile.needs.includes(need.id);
                  return (
                    <button
                      key={need.id}
                      onClick={() => toggleNeed(need.id)}
                      className={`flex items-center gap-3 w-full p-2.5 rounded-lg border-2 transition-all text-left ${
                        selected ? 'border-primary-500 bg-primary-50' : 'border-ink-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${selected ? 'bg-primary-600 border-primary-600' : 'border-ink-300'}`}>
                        {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm font-medium text-ink-700">{need.label}</span>
                    </button>
                  );
                })}
                <p className="text-xs font-semibold text-ink-500 uppercase mb-2 mt-3">Preferences</p>
                {mobilityPreferences.map((pref) => {
                  const selected = profile.preferences.includes(pref.id);
                  return (
                    <button
                      key={pref.id}
                      onClick={() => togglePreference(pref.id)}
                      className={`flex items-center gap-3 w-full p-2.5 rounded-lg border-2 transition-all text-left ${
                        selected ? 'border-primary-500 bg-primary-50' : 'border-ink-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${selected ? 'bg-primary-600 border-primary-600' : 'border-ink-300'}`}>
                        {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm font-medium text-ink-700">{pref.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Navigation Preferences */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
              <Navigation2 className="w-4.5 h-4.5 text-primary-600" />
            </div>
            <h3 className="font-bold text-ink-900">Navigation Preferences</h3>
          </div>
          <div className="bg-white rounded-2xl divide-y divide-ink-100">
            {navPrefs.map((pref, i) => (
              <label key={i} className="flex items-center justify-between p-4 cursor-pointer">
                <span className="text-sm font-medium text-ink-700">{pref.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={i === 0}
                  className="w-5 h-5 rounded-md border-2 border-ink-300 text-primary-600 focus:ring-primary-500"
                />
              </label>
            ))}
          </div>
        </section>

        {/* App Accessibility */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
              <Settings className="w-4.5 h-4.5 text-primary-600" />
            </div>
            <h3 className="font-bold text-ink-900">App Accessibility</h3>
          </div>
          <div className="bg-white rounded-2xl divide-y divide-ink-100">
            {appSettings.map((s) => {
              const Icon = s.icon;
              const enabled = settings[s.key];
              return (
                <label key={s.key} className="flex items-center gap-3 p-4 cursor-pointer">
                  <Icon className="w-5 h-5 text-ink-500 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-900">{s.label}</p>
                    <p className="text-xs text-ink-500">{s.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enabled}
                    aria-label={s.label}
                    onClick={() => updateSetting(s.key, !enabled)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${enabled ? 'bg-primary-600' : 'bg-ink-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </label>
              );
            })}
          </div>
        </section>

        {/* Account */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-primary-600" />
            </div>
            <h3 className="font-bold text-ink-900">Account</h3>
          </div>
          <div className="bg-white rounded-2xl divide-y divide-ink-100">
            {accountItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 p-4 hover:bg-ink-50 transition-colors text-left"
                >
                  <Icon className="w-5 h-5 text-ink-500" />
                  <span className="flex-1 text-sm font-medium text-ink-700">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-ink-300" />
                </button>
              );
            })}
            <button
              onClick={() => {
                setUser(null);
                showToast('Signed out successfully', 'info');
                navigate('welcome');
              }}
              className="w-full flex items-center gap-3 p-4 hover:bg-danger-50 transition-colors text-left"
            >
              <LogOut className="w-5 h-5 text-danger-600" />
              <span className="flex-1 text-sm font-semibold text-danger-600">Sign out</span>
            </button>
          </div>
        </section>

        <p className="text-center text-xs text-ink-400 mt-6">AccessNav v1.0.0 — Prototype</p>
      </div>

      <BottomNavigation />
    </div>
  );
}
