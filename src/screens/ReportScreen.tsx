import { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  MapPin,
  CheckCircle2,
  Send,
  Accessibility,
  ArrowUp,
  Ban,
  Construction,
  DoorClosed,
  Footprints,
  MoreHorizontal,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BottomNavigation } from '@/components/BottomNavigation';
import { reportIssueTypes, severityLevels } from '@/data/mockData';

const iconMap: Record<string, typeof Camera> = {
  Accessibility,
  ArrowUp,
  Ban,
  Construction,
  DoorClosed,
  Footprints,
  MoreHorizontal,
};

export function ReportScreen() {
  const { goBack, navigate, showToast } = useApp();
  const [issueType, setIssueType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<string>('medium');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueType || !description || !location) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-ink-50 flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-card-lg p-8 max-w-sm w-full text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-success-600" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-extrabold text-ink-900 mb-2">Report Submitted!</h2>
          <p className="text-ink-500 text-sm mb-6">
            Thank you! Your report helps make navigation safer for everyone.
          </p>
          <Button fullWidth size="lg" onClick={() => navigate('home')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const severityColors: Record<string, string> = {
    low: 'border-success-400 bg-success-50 text-success-700',
    medium: 'border-warning-400 bg-warning-50 text-warning-700',
    high: 'border-danger-400 bg-danger-50 text-danger-700',
    emergency: 'border-danger-600 bg-danger-600 text-white',
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
          <h1 className="text-lg font-bold text-ink-900">Report an accessibility issue</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-4 overflow-y-auto pb-32">
        <fieldset className="mb-5">
          <legend className="text-sm font-bold text-ink-700 mb-3">Issue type</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {reportIssueTypes.map((type) => {
              const Icon = iconMap[type.icon] || Camera;
              const selected = issueType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setIssueType(type.id)}
                  aria-pressed={selected}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all touch-target ${
                    selected
                      ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-200'
                      : 'border-ink-200 bg-white hover:border-ink-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${selected ? 'text-primary-600' : 'text-ink-500'}`} />
                  <span className={`text-xs font-semibold text-center ${selected ? 'text-primary-900' : 'text-ink-700'}`}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-bold text-ink-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail…"
            rows={4}
            className="w-full px-4 py-3 text-base bg-white border-2 border-ink-200 rounded-xl text-ink-900 placeholder:text-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-bold text-ink-700 mb-2">Photo (optional)</label>
          <button
            type="button"
            onClick={() => showToast('Photo upload is simulated in this prototype', 'info')}
            className="w-full flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-ink-300 hover:border-primary-400 hover:bg-primary-50/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-ink-100 flex items-center justify-center">
              <Camera className="w-6 h-6 text-ink-500" />
            </div>
            <p className="text-sm font-semibold text-ink-600">Tap to add a photo</p>
            <p className="text-xs text-ink-400">Helps verify the issue</p>
          </button>
        </div>

        <div className="mb-5">
          <Input
            label="Location"
            placeholder="Enter the location or address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            leftIcon={<MapPin className="w-5 h-5" />}
          />
        </div>

        <fieldset className="mb-6">
          <legend className="text-sm font-bold text-ink-700 mb-2">Severity</legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {severityLevels.map((level) => {
              const selected = severity === level.id;
              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSeverity(level.id)}
                  aria-pressed={selected}
                  className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-all touch-target ${
                    selected
                      ? severityColors[level.id]
                      : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                  }`}
                >
                  {level.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          <Send className="w-5 h-5" />
          Submit Report
        </Button>
      </form>

      <BottomNavigation />
    </div>
  );
}
