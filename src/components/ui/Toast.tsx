import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { Toast as ToastType } from '@/types';
import { useApp } from '@/context/AppContext';

const config = {
  success: { icon: CheckCircle2, bg: 'bg-success-50', border: 'border-success-200', text: 'text-success-800', iconColor: 'text-success-600' },
  error: { icon: AlertCircle, bg: 'bg-danger-50', border: 'border-danger-200', text: 'text-danger-800', iconColor: 'text-danger-600' },
  warning: { icon: AlertTriangle, bg: 'bg-warning-50', border: 'border-warning-200', text: 'text-warning-800', iconColor: 'text-warning-600' },
  info: { icon: Info, bg: 'bg-primary-50', border: 'border-primary-200', text: 'text-primary-800', iconColor: 'text-primary-600' },
};

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast: ToastType) => {
        const c = config[toast.type];
        const Icon = c.icon;
        return (
          <div
            key={toast.id}
            role="alert"
            className={`flex items-start gap-3 p-4 rounded-2xl border-2 ${c.bg} ${c.border} shadow-card-lg animate-slide-down pointer-events-auto`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${c.iconColor}`} />
            <p className={`flex-1 text-sm font-medium ${c.text}`}>{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="p-1 -mt-1 -mr-1 rounded-lg text-ink-400 hover:text-ink-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
