import { Navigation2 } from 'lucide-react';

export function Logo({ size = 'md', showText = true }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
  const sizes = {
    sm: { box: 'w-9 h-9', icon: 'w-5 h-5', text: 'text-lg' },
    md: { box: 'w-12 h-12', icon: 'w-7 h-7', text: 'text-2xl' },
    lg: { box: 'w-20 h-20', icon: 'w-11 h-11', text: 'text-4xl' },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.box} rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-glow`}>
        <Navigation2 className={`${s.icon} text-white`} strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={`${s.text} font-extrabold text-ink-900 tracking-tight`}>
          Access<span className="text-primary-600">Nav</span>
        </span>
      )}
    </div>
  );
}
