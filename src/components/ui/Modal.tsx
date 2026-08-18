import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  hideClose?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  full: 'max-w-none w-full h-full',
};

export function Modal({ open, onClose, title, children, size = 'md', hideClose }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Dialog'}
    >
      <div
        className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-t-4xl sm:rounded-4xl shadow-card-lg animate-slide-up max-h-[92vh] flex flex-col overflow-hidden`}
      >
        {(title || !hideClose) && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200 shrink-0">
            <h2 className="text-lg font-bold text-navy-900">{title}</h2>
            {!hideClose && (
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 -mr-2 rounded-xl text-ink-500 hover:text-navy-900 hover:bg-cream-200 transition-colors touch-target"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
