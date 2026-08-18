import { type ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-soft',
  secondary: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-soft',
  outline: 'border-2 border-primary-300 text-primary-700 bg-white hover:bg-primary-50 active:bg-primary-100',
  ghost: 'text-ink-700 hover:bg-cream-200 active:bg-cream-300',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 shadow-soft',
  success: 'bg-success-500 text-white hover:bg-success-600 active:bg-success-700 shadow-soft',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-5 py-2.5 text-base rounded-2xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-2xl gap-2',
  xl: 'px-7 py-4 text-lg rounded-3xl gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, loading, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center font-semibold transition-all duration-200 touch-target disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
