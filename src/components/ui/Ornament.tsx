/** Fine gold rule with a lotus-bud centre, echoing the lotus crown in the logo. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 16"
      className={`h-4 w-40 text-gold-500 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden
    >
      <path d="M0 8h62M98 8h62" />
      <path d="M80 2c-3 3-3 9 0 12 3-3 3-9 0-12Z" />
      <path d="M80 14c-4-1-8-4-9-8 4 0 7 3 9 8ZM80 14c4-1 8-4 9-8-4 0-7 3-9 8Z" />
      <circle cx="66" cy="8" r="1.2" fill="currentColor" />
      <circle cx="94" cy="8" r="1.2" fill="currentColor" />
    </svg>
  );
}
