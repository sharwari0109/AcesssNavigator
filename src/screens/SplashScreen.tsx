import { useEffect, useState } from 'react';
import { Navigation2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function SplashScreen() {
  const { navigate } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 4;
      });
    }, 40);

    const timer = setTimeout(() => navigate('welcome'), 2500);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-navy-900 flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center animate-bounce-soft">
        <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-glow border border-white/20 mb-6">
          <Navigation2 className="w-14 h-14 text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Access<span className="text-primary-200">Nav</span>
        </h1>
        <p className="text-lg text-primary-100 mt-2 font-medium">Navigate without barriers.</p>
      </div>

      <div className="absolute bottom-16 w-full max-w-xs px-6">
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-primary-100 text-sm mt-3 font-medium">
          Loading accessibility data…
        </p>
      </div>
    </div>
  );
}
