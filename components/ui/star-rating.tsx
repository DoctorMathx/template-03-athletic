export function StarRating({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            {i < full ? (
              <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#111" />
            ) : i === full && half ? (
              <>
                <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#e5e7eb" />
                <clipPath id={`half-${i}`}><rect x="0" y="0" width="6" height="12" /></clipPath>
                <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#111" clipPath={`url(#half-${i})`} />
              </>
            ) : (
              <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#e5e7eb" />
            )}
          </svg>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-[11px] text-neutral-400">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
