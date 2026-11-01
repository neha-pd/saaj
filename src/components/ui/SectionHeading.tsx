import { Ornament } from "./Ornament";
import { site } from "@/lib/site";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "dark",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 ${tone === "dark" ? "text-rose-600" : "text-gold-400"}`}>{eyebrow}</p>
      )}
      <Heading
        className={`text-4xl leading-[1.08] md:text-5xl ${tone === "light" ? "!text-ivory-50" : ""}`}
      >
        {title}
      </Heading>
      <Ornament className={`mt-5 ${centered ? "mx-auto" : ""}`} />
      {intro && (
        <p className={`mt-5 text-[0.98rem] leading-relaxed ${tone === "dark" ? "text-ink-soft" : "text-ivory-100/80"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

/** Inline marker for content that still needs real information from SAAJ. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  if (!site.showPlaceholderNotes) return null;
  return <span className="placeholder-note">{children}</span>;
}
