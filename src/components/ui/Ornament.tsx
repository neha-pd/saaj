import { asset } from "@/lib/asset";

/**
 * Fine gold rule with the SAAJ lady motif at its centre. The motif is a mask
 * (public/brand/saaj-motif.png) filled with the current colour over a solid disc:
 * a white figure on light sections, a navy one on navy sections (`onDark`).
 */
export function Ornament({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  const motif = `url(${asset("/brand/saaj-motif.png")})`;
  return (
    <span aria-hidden className={`flex w-44 items-center gap-2 text-gold-500 ${className}`}>
      <span className="h-px flex-1 bg-current" />
      <span className="size-1 rounded-full bg-current" />
      <span className="relative size-7 shrink-0">
        <span className={`absolute inset-px rounded-full ${onDark ? "bg-navy-800" : "bg-white"}`} />
        <span
          className="absolute inset-0 bg-current"
          style={{ maskImage: motif, WebkitMaskImage: motif, maskSize: "contain", WebkitMaskSize: "contain" }}
        />
      </span>
      <span className="size-1 rounded-full bg-current" />
      <span className="h-px flex-1 bg-current" />
    </span>
  );
}
