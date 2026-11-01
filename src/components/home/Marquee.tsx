const words = ["Handloom", "Zari borders", "Scattered butis", "Woven with love", "Shipping PAN India", "The grace of you"];

/** Slow-scrolling ribbon of brand words. Content is duplicated for a seamless loop. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="px-6 font-display text-2xl whitespace-nowrap text-ivory-50 italic md:px-10 md:text-4xl">{w}</span>
          <span className="text-gold-400" aria-hidden>✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="SAAJ" className="overflow-hidden border-y border-gold-500/30 bg-rose-700 py-5 md:py-7">
      <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
