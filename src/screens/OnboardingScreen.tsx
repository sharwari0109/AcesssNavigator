import { useState } from 'react';
import {
  Accessibility,
  Move,
  Footprints,
  EyeOff,
  Eye,
  EarOff,
  Ear,
  Brain,
  Lightbulb,
  Waves,
  Heart,
  Bandage,
  Settings,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import {
  accessibilityNeeds,
  mobilityPreferences,
  visualPreferences,
  hearingPreferences,
} from '@/data/mockData';
import type { AccessibilityCategory } from '@/types';

const iconMap: Record<string, typeof Accessibility> = {
  Accessibility, Move, Footprints, EyeOff, Eye, EarOff, Ear,
  Brain, Lightbulb, Waves, Heart, Bandage, Settings,
};

const categoryConfig: { id: AccessibilityCategory; label: string; icon: typeof Accessibility }[] = [
  { id: 'mobility', label: 'Mobility', icon: Accessibility },
  { id: 'visual', label: 'Visual', icon: Eye },
  { id: 'hearing', label: 'Hearing', icon: Ear },
  { id: 'cognitive', label: 'Cognitive / Neurodivergent', icon: Brain },
  { id: 'other', label: 'Other', icon: Heart },
];

export function OnboardingScreen() {
  const { profile, toggleNeed, togglePreference, navigate, showToast } = useApp();
  const [step, setStep] = useState<'needs' | 'preferences'>('needs');

  const handleSave = () => {
    showToast('Preferences saved successfully!', 'success');
    navigate('home');
  };

  const handleSkip = () => {
    showToast('You can configure preferences later in Profile', 'info');
    navigate('home');
  };

  const selectedMobilityNeeds = profile.needs.filter((n) =>
    accessibilityNeeds.find((a) => a.id === n)?.category === 'mobility'
  );
  const selectedVisualNeeds = profile.needs.filter((n) =>
    accessibilityNeeds.find((a) => a.id === n)?.category === 'visual'
  );
  const selectedHearingNeeds = profile.needs.filter((n) =>
    accessibilityNeeds.find((a) => a.id === n)?.category === 'hearing'
  );

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      <div className="bg-white border-b border-ink-100 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          {step === 'preferences' ? (
            <button
              onClick={() => setStep('needs')}
              className="flex items-center gap-1 text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <span className="text-sm font-semibold text-ink-500">
              Step 1 of 2
            </span>
          )}
          <button
            onClick={handleSkip}
            className="text-sm font-semibold text-ink-500 hover:text-ink-700 transition-colors"
          >
            Skip
          </button>
        </div>
        <div className="flex gap-2">
          <div className={`h-1.5 rounded-full flex-1 transition-colors ${step === 'needs' ? 'bg-primary-600' : 'bg-primary-600'}`} />
          <div className={`h-1.5 rounded-full flex-1 transition-colors ${step === 'preferences' ? 'bg-primary-600' : 'bg-ink-200'}`} />
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto pb-32">
        {step === 'needs' ? (
          <>
            <h1 className="text-2xl font-extrabold text-ink-900 mb-2">
              Tell us what accessibility means for you
            </h1>
            <p className="text-ink-500 mb-6">
              We'll personalize routes based on your needs. Select all that apply.
            </p>

            <div className="space-y-6">
              {categoryConfig.map((cat) => {
                const needs = accessibilityNeeds.filter((n) => n.category === cat.id);
                const CatIcon = cat.icon;
                return (
                  <div key={cat.id}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <CatIcon className="w-4.5 h-4.5 text-primary-600" />
                      </div>
                      <h3 className="font-bold text-ink-900">{cat.label}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {needs.map((need) => {
                        const Icon = iconMap[need.icon] || Accessibility;
                        const selected = profile.needs.includes(need.id);
                        return (
                          <button
                            key={need.id}
                            onClick={() => toggleNeed(need.id)}
                            aria-pressed={selected}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-200 text-left touch-target ${
                              selected
                                ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-200'
                                : 'border-ink-200 bg-white hover:border-ink-300'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? 'bg-primary-600 text-white' : 'bg-ink-100 text-ink-500'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`flex-1 font-semibold text-sm ${selected ? 'text-primary-900' : 'text-ink-700'}`}>
                              {need.label}
                            </span>
                            {selected && <Check className="w-5 h-5 text-primary-600 shrink-0" strokeWidth={2.5} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button
                fullWidth
                size="lg"
                onClick={() => setStep('preferences')}
                disabled={profile.needs.length === 0}
              >
                Continue to Preferences
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-ink-900 mb-2">
              Fine-tune your preferences
            </h1>
            <p className="text-ink-500 mb-6">
              Additional preferences based on your selected needs.
            </p>

            {selectedMobilityNeeds.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Accessibility className="w-4.5 h-4.5 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-ink-900">Mobility preferences</h3>
                </div>
                <div className="space-y-2">
                  {mobilityPreferences.map((pref) => {
                    const selected = profile.preferences.includes(pref.id);
                    return (
                      <button
                        key={pref.id}
                        onClick={() => togglePreference(pref.id)}
                        aria-pressed={selected}
                        className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-2 transition-all text-left touch-target ${
                          selected
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-ink-200 bg-white hover:border-ink-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${selected ? 'bg-primary-600 border-primary-600' : 'border-ink-300'}`}>
                          {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${selected ? 'text-primary-900' : 'text-ink-700'}`}>
                            {pref.label}
                          </p>
                          {pref.description && (
                            <p className="text-xs text-ink-500 mt-0.5">{pref.description}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedVisualNeeds.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Eye className="w-4.5 h-4.5 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-ink-900">Visual preferences</h3>
                </div>
                <div className="space-y-2">
                  {visualPreferences.map((pref) => {
                    const selected = profile.preferences.includes(pref.id);
                    return (
                      <button
                        key={pref.id}
                        onClick={() => togglePreference(pref.id)}
                        aria-pressed={selected}
                        className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-2 transition-all text-left touch-target ${
                          selected
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-ink-200 bg-white hover:border-ink-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${selected ? 'bg-primary-600 border-primary-600' : 'border-ink-300'}`}>
                          {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${selected ? 'text-primary-900' : 'text-ink-700'}`}>
                            {pref.label}
                          </p>
                          {pref.description && (
                            <p className="text-xs text-ink-500 mt-0.5">{pref.description}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedHearingNeeds.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Ear className="w-4.5 h-4.5 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-ink-900">Hearing preferences</h3>
                </div>
                <div className="space-y-2">
                  {hearingPreferences.map((pref) => {
                    const selected = profile.preferences.includes(pref.id);
                    return (
                      <button
                        key={pref.id}
                        onClick={() => togglePreference(pref.id)}
                        aria-pressed={selected}
                        className={`flex items-start gap-3 w-full p-3.5 rounded-xl border-2 transition-all text-left touch-target ${
                          selected
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-ink-200 bg-white hover:border-ink-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${selected ? 'bg-primary-600 border-primary-600' : 'border-ink-300'}`}>
                          {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${selected ? 'text-primary-900' : 'text-ink-700'}`}>
                            {pref.label}
                          </p>
                          {pref.description && (
                            <p className="text-xs text-ink-500 mt-0.5">{pref.description}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {profile.needs.length === 0 && (
              <div className="bg-ink-50 rounded-xl p-6 text-center text-ink-500">
                No needs selected. You can configure these later in your Profile.
              </div>
            )}
          </>
        )}
      </div>

      {step === 'preferences' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-ink-100 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="max-w-2xl mx-auto">
            <Button fullWidth size="lg" onClick={handleSave}>
              <Check className="w-5 h-5" />
              Save Preferences & Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
