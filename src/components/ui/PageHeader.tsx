import Link from "next/link";
import { Ornament } from "./Ornament";

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs = [],
  compact = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: { label: string; href?: string }[];
  /** Tighter spacing and no ornament, for listing pages where products should show sooner. */
  compact?: boolean;
}) {
  return (
    <header className={`container-saaj text-center ${compact ? "pt-6 pb-8 md:pt-8 md:pb-10" : "pt-10 pb-12 md:pt-14 md:pb-16"}`}>
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className={compact ? "mb-4" : "mb-8"}>
          <ol className="flex flex-wrap justify-center gap-2 text-[0.7rem] tracking-[0.18em] text-ink-soft uppercase">
            <li>
              <Link href="/" className="hover:text-navy-800">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex gap-2">
                <span aria-hidden>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-navy-800">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-navy-800">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      {eyebrow && <p className="eyebrow text-rose-600">{eyebrow}</p>}
      <h1 className={`mx-auto max-w-3xl leading-[1.05] ${compact ? "mt-2 text-4xl md:text-5xl" : "mt-4 text-[2.7rem] md:text-6xl"}`}>{title}</h1>
      {!compact && <Ornament className="mx-auto mt-6" />}
      {intro && <p className={`mx-auto max-w-xl leading-relaxed text-ink-soft ${compact ? "mt-3 text-sm" : "mt-6"}`}>{intro}</p>}
    </header>
  );
}
