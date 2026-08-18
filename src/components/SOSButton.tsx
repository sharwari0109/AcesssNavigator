import { Siren } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function SOSButton({ className = '' }: { className?: string }) {
  const { navigate } = useApp();

  return (
    <button
      onClick={() => navigate('sos')}
      aria-label="SOS Emergency Assistance"
      className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-danger-500 text-white shadow-card-lg hover:bg-danger-600 active:scale-95 transition-all duration-200 touch-target ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-danger-400 animate-pulse-ring opacity-50" aria-hidden="true" />
      <Siren className="w-6 h-6 relative z-10" strokeWidth={2.5} />
    </button>
  );
}
