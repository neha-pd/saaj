import type { Colour } from "@/lib/products";

/** Read-only colour dots. For a selectable picker see ColourPicker. */
export function Swatches({ colours, size = "md" }: { colours: Colour[]; size?: "sm" | "md" }) {
  const dot = size === "sm" ? "size-3.5" : "size-5";
  return (
    <ul className="flex items-center gap-1.5" aria-label={`Colours: ${colours.map((c) => c.name).join(", ")}`}>
      {colours.map((c) => (
        <li key={c.name} title={c.name}>
          <span className={`block ${dot} rounded-full ring-1 ring-ink/15`} style={{ backgroundColor: c.hex }} />
        </li>
      ))}
    </ul>
  );
}
