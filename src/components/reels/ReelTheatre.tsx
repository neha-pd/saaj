"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reelPermalink } from "@/lib/reels";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/Icons";
import { Ornament } from "@/components/ui/Ornament";
import { ReelMedia } from "./ReelMedia";
import { SoundIcon, useReels } from "./ReelViewer";

const POSTER_DWELL = 6000;

/**
 * 3D cover-flow stage. The centre reel plays muted while the section is on
 * screen and hands over to the next one when it finishes; side reels wait in
 * perspective. Tap the centre reel for the full-screen viewer with sound.
 */
export function ReelTheatre() {
  const { reels, open } = useReels();
  const n = reels.length;
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((delta: number) => setActive((a) => (a + delta + n) % n), [n]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    return () => io.disconnect();
  }, []);

  const playing = inView && !reducedMotion;
  const current = reels[active];

  // Cover frames (no video yet) advance on a timer; videos advance when they end.
  useEffect(() => {
    if (!playing || hovered || current.video) return;
    const t = window.setTimeout(() => go(1), POSTER_DWELL);
    return () => window.clearTimeout(t);
  }, [playing, hovered, current, go]);

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="SAAJ reels"
      className="relative overflow-hidden bg-navy-900 py-20 text-ivory-50 md:py-28"
    >
      {/* Oversized editorial word behind the stage */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[28vw] leading-none text-ivory-50/[0.035] italic select-none"
      >
        in motion
      </p>

      <div className="container-saaj relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-400">@{site.instagram.handle}</p>
          <h2 className="mt-4 text-4xl !text-ivory-50 md:text-6xl">
            SAAJ <span className="italic text-gold-300">in motion</span>
          </h2>
          <Ornament className="mx-auto mt-5" />
          <p className="mt-5 text-ivory-100/75">The drape, the shimmer, the stalls and the smiles — straight from our reels.</p>
        </div>

        <div
          className="relative mx-auto mt-14 h-[460px] max-w-5xl [perspective:1600px] md:h-[580px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {reels.map((reel, i) => {
            // Signed distance from the active card on a circular track.
            let off = (i - active + n) % n;
            if (off > n / 2) off -= n;
            const abs = Math.abs(off);
            const visible = abs <= 2;
            const isActive = off === 0;
            return (
              <div
                key={reel.code}
                aria-hidden={!isActive}
                className="absolute top-0 left-1/2 aspect-[9/16] h-[410px] transition-all duration-700 ease-[var(--ease-silk)] md:h-[520px]"
                style={{
                  transform: `translateX(calc(-50% + ${off * 64}%)) scale(${1 - abs * 0.17}) rotateY(${off * -14}deg)`,
                  zIndex: 10 - abs,
                  opacity: visible ? 1 - abs * 0.28 : 0,
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <button
                  type="button"
                  tabIndex={visible ? 0 : -1}
                  onClick={() => (isActive ? open(i) : setActive(i))}
                  aria-label={isActive ? `Open “${reel.title}” full screen` : `Show reel: ${reel.title}`}
                  className={`group relative block h-full w-full overflow-hidden rounded-[1.4rem] bg-navy-950 text-left shadow-[0_30px_80px_-25px_rgba(0,0,0,0.7)] transition ${
                    isActive ? "ring-2 ring-gold-400 ring-offset-4 ring-offset-navy-900" : "ring-1 ring-ivory-50/10"
                  }`}
                >
                  <ReelMedia
                    reel={reel}
                    playing={isActive && playing}
                    muted={muted}
                    loop={false}
                    onEnded={() => go(1)}
                    sizes="(min-width: 768px) 300px, 240px"
                  />
                  <span className={`absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-navy-950/30 transition ${isActive ? "opacity-100" : "opacity-60"}`} />
                  {!isActive && <span className="absolute inset-0 bg-navy-950/40" />}
                  <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-navy-950/60 px-2.5 py-1 text-[0.6rem] tracking-[0.16em] uppercase backdrop-blur">
                    <span className={`size-1.5 rounded-full ${isActive && playing ? "animate-pulse bg-rose-500" : "bg-ivory-50/60"}`} />
                    {isActive && playing ? "Playing" : "Reel"}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block font-display text-xl leading-snug md:text-2xl">{reel.title}</span>
                    {isActive && (
                      <span className="mt-2 inline-block text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase">Tap to watch full screen</span>
                    )}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Previous reel" className="grid size-12 place-items-center rounded-full border border-ivory-50/30 transition hover:bg-ivory-50 hover:text-navy-900">
            ←
          </button>
          <p className="min-w-20 text-center font-display text-xl" aria-live="polite">
            <span className="text-gold-300">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-ivory-100/50"> / {String(n).padStart(2, "0")}</span>
          </p>
          <button type="button" onClick={() => go(1)} aria-label="Next reel" className="grid size-12 place-items-center rounded-full border border-ivory-50/30 transition hover:bg-ivory-50 hover:text-navy-900">
            →
          </button>
          {current.video && (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              aria-pressed={!muted}
              className="grid size-12 place-items-center rounded-full border border-ivory-50/30 transition hover:bg-ivory-50 hover:text-navy-900"
            >
              <SoundIcon muted={muted} />
            </button>
          )}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <InstagramIcon size={18} /> Follow us on Instagram
          </a>
          <a href={reelPermalink(current.code)} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
            Open this reel ↗
          </a>
        </div>
      </div>
    </section>
  );
}
