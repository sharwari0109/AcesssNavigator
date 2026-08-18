import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CornerDownLeft,
  ArrowUp,
  MapPin,
  Pause,
  Play,
  RefreshCw,
  Flag,
  Info,
  Accessibility,
  Volume2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MapView } from '@/components/MapView';
import { SOSButton } from '@/components/SOSButton';
import { Button } from '@/components/ui/Button';
import { navigationInstructions } from '@/data/mockData';

const iconMap: Record<string, typeof ArrowUp> = {
  CornerDownLeft,
  ArrowUp,
  MapPin,
};

export function ActiveNavigationScreen() {
  const { selectedLocation, selectedRoute, navigate, goBack, showToast } = useApp();
  const [active, setActive] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (progress > 0 && progress < 25) setCurrentStep(0);
    else if (progress >= 25 && progress < 50) setCurrentStep(1);
    else if (progress >= 50 && progress < 80) setCurrentStep(2);
    else if (progress >= 80) setCurrentStep(3);
  }, [progress]);

  const instruction = navigationInstructions[currentStep];
  const Icon = iconMap[instruction.icon] || ArrowUp;

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <header className="bg-white/95 backdrop-blur-lg border-b border-cream-200 px-4 py-2.5 flex items-center gap-3 sticky top-0 z-30">
        <button
          onClick={goBack}
          aria-label="Exit navigation"
          className="p-2 -ml-2 rounded-xl text-ink-600 hover:bg-cream-200 transition-colors touch-target"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-2xs font-semibold text-ink-500">Navigating to</p>
          <h1 className="text-sm font-bold text-navy-900 truncate">
            {selectedLocation?.name || 'Destination'}
          </h1>
        </div>
        <div className="flex items-center gap-1.5 bg-primary-50 px-3 py-1.5 rounded-xl">
          <span className="text-sm font-bold text-primary-700">
            {selectedRoute?.duration || '12 min'}
          </span>
        </div>
      </header>

      {/* Map */}
      <div className="relative flex-1 min-h-[250px]">
        <MapView selectedLocation={selectedLocation} showRoute />

        {/* SOS */}
        <div className="absolute right-4 top-4 z-30">
          <SOSButton />
        </div>

        {/* Progress bar on map */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-cream-300 z-20">
          <div
            className="h-full bg-primary-600 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation instruction card */}
      <div className="bg-white rounded-t-4xl shadow-card-lg -mt-6 relative z-20 pb-20 border-t border-cream-200">
        <div className="px-5 pt-4 pb-4">
          <div className="w-10 h-1.5 bg-cream-300 rounded-full mx-auto mb-4" />

          {/* Current instruction */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-4 text-white mb-4 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Icon className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-extrabold leading-tight">{instruction.text}</p>
                {instruction.detail && (
                  <p className="text-primary-100 text-sm mt-1">{instruction.detail}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary-100">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm font-medium">Voice guidance active</span>
            </div>
          </div>

          {/* Accessibility info card */}
          <div className="bg-accent-50 border-2 border-accent-200 rounded-3xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Accessibility className="w-5 h-5 text-accent-700" />
              <h3 className="font-bold text-accent-900">Accessibility</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-accent-800">
                <div className="w-2 h-2 rounded-full bg-success-500" />
                Ramp available
              </div>
              <div className="flex items-center gap-2 text-sm text-accent-800">
                <div className="w-2 h-2 rounded-full bg-success-500" />
                Elevator 30 m ahead
              </div>
              <div className="flex items-center gap-2 text-sm text-accent-800">
                <div className="w-2 h-2 rounded-full bg-success-500" />
                Accessible entrance on the left
              </div>
            </div>
          </div>

          {/* Upcoming steps */}
          <div className="space-y-2 mb-4">
            {navigationInstructions.slice(currentStep + 1, currentStep + 3).map((step) => {
              const StepIcon = iconMap[step.icon] || ArrowUp;
              return (
                <div key={step.id} className="flex items-center gap-3 p-3 rounded-2xl bg-cream-50">
                  <StepIcon className="w-5 h-5 text-ink-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink-700">{step.text}</p>
                  </div>
                  <span className="text-xs font-semibold text-ink-500">{step.distance}</span>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              variant={active ? 'outline' : 'primary'}
              size="md"
              onClick={() => setActive((a) => !a)}
            >
              {active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {active ? 'Pause' : 'Resume'}
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setProgress(0);
                showToast('Route recalculated', 'info');
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Recalculate
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('report')}
            >
              <Flag className="w-4 h-4" />
              Report Issue
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('accessibility-details')}
            >
              <Info className="w-4 h-4" />
              Details
            </Button>
          </div>

          {progress >= 100 && (
            <div className="mt-4 bg-success-50 border-2 border-success-200 rounded-3xl p-4 text-center animate-bounce-soft">
              <MapPin className="w-10 h-10 text-success-600 mx-auto mb-2" />
              <p className="font-bold text-success-800 text-lg">You've arrived!</p>
              <p className="text-sm text-success-700 mt-1">
                {selectedLocation?.name}
              </p>
              <Button
                fullWidth
                variant="success"
                size="md"
                className="mt-3"
                onClick={() => navigate('home')}
              >
                End Navigation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
