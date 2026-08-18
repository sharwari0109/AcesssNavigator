import { Star } from 'lucide-react';

export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 accessibility rating`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= rating ? 'fill-warning-400 text-warning-400' : 'text-cream-300'}
        />
      ))}
    </div>
  );
}
