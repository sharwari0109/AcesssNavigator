import { ArrowLeft, Clock, Flag, Accessibility } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AccessibilityCard } from '@/components/AccessibilityCard';
import { AccessibilityScore } from '@/components/ui/AccessibilityScore';
import { Button } from '@/components/ui/Button';
import { BottomNavigation } from '@/components/BottomNavigation';
import { accessibilityDetails } from '@/data/mockData';

export function AccessibilityDetailsScreen() {
  const { selectedLocation, navigate, goBack, showToast } = useApp();

  const score = selectedLocation?.accessibilityScore || 92;
  const label = selectedLocation?.accessibilityLabel || 'Highly Accessible';

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
            <p className="text-2xs font-semibold text-ink-500">Accessibility Details</p>
            <h1 className="text-base font-bold text-ink-900 truncate">
              {selectedLocation?.name || 'Location'}
            </h1>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 py-4 overflow-y-auto pb-24">
        {/* Score card */}
        <div className="bg-white rounded-2xl shadow-card p-5 mb-4">
          <div className="flex items-center gap-4">
            <AccessibilityScore score={score} size="lg" />
            <div className="flex-1">
              <h2 className="text-xl font-extrabold text-ink-900">{label}</h2>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-ink-500">
                <Clock className="w-4 h-4" />
                Last verified 2 hours ago
              </div>
              <p className="text-sm text-ink-600 mt-2">
                {selectedLocation?.address}
              </p>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <h3 className="text-sm font-bold text-ink-500 uppercase tracking-wide mb-3">
          Accessibility Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {accessibilityDetails.map((feature) => (
            <AccessibilityCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Report outdated */}
        <div className="bg-warning-50 border-2 border-warning-200 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <Flag className="w-5 h-5 text-warning-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-warning-800 text-sm">
                Something changed?
              </p>
              <p className="text-sm text-warning-700 mt-0.5 mb-3">
                Help others by reporting outdated accessibility information.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('report')}
                className="border-warning-400 text-warning-700 hover:bg-warning-100"
              >
                <Flag className="w-4 h-4" />
                Report outdated information
              </Button>
            </div>
          </div>
        </div>

        {/* Overall summary */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Accessibility className="w-5 h-5" />
            <h3 className="font-bold">Overall Assessment</h3>
          </div>
          <p className="text-primary-100 text-sm leading-relaxed">
            This location is {label.toLowerCase()} with step-free entrance, ramps, and elevators available. Minor sidewalk narrowing reported for 100 m. Construction 200 m ahead — plan accordingly.
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
