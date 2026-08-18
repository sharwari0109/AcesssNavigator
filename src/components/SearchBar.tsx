import { Search, X } from 'lucide-react';
import { type ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, placeholder = 'Search destination', onSubmit, autoFocus }: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="relative w-full"
    >
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label={placeholder}
        className="w-full pl-12 pr-10 py-3.5 text-base bg-white border-2 border-cream-300 rounded-2xl text-ink-900 placeholder:text-ink-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all shadow-soft touch-target"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-ink-400 hover:text-primary-600 hover:bg-cream-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
