import Image from "next/image";
import Link from "next/link";

/**
 * Official SAAJ roundel (unaltered) + typographic wordmark.
 * TODO(launch): replace /brand/saaj-logo.jpg (a 150px Instagram avatar) with
 * the original vector/high-res logo file.
 */
export function Logo({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const text = tone === "dark" ? "text-navy-800" : "text-ivory-50";
  const sub = tone === "dark" ? "text-gold-700" : "text-gold-400";
  return (
    <Link href="/" aria-label="SAAJ – Threads of Tradition, home" className="group flex items-center gap-3">
      <Image
        src="/brand/saaj-logo.jpg"
        alt=""
        width={150}
        height={150}
        priority
        className={`rounded-full ${compact ? "size-10" : "size-11 md:size-12"} ring-1 ring-gold-500/40`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.65rem] font-medium tracking-[0.32em] ${text}`}>SAAJ</span>
        {!compact && (
          <span className={`mt-1 text-[0.55rem] font-medium tracking-[0.22em] whitespace-nowrap uppercase xl:tracking-[0.34em] ${sub}`}>
            Threads of Tradition
          </span>
        )}
      </span>
    </Link>
  );
}
