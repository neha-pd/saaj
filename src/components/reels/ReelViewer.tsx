"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { reelEmbedUrl, reelPermalink, type Reel } from "@/lib/reels";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/format";
import { CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { ReelMedia } from "./ReelMedia";

type ReelsApi = { reels: Reel[]; open: (index: number) => void };

const ReelsContext = createContext<ReelsApi | null>(null);

export function useReels() {
  const ctx = useContext(ReelsContext);
  if (!ctx) throw new Error("useReels must be used inside <ReelViewerProvider>");
  return ctx;
}

export function ReelViewerProvider({ reels, children }: { reels: Reel[]; children: React.ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  return (
    <ReelsContext.Provider value={{ reels, open: setIndex }}>
      {children}
      {index !== null && <Viewer reels={reels} index={index} setIndex={setIndex} onClose={close} />}
    </ReelsContext.Provider>
  );
}

/** Full-screen, Instagram-Stories-style viewer with progress bars, tap/swipe navigation and sound. */
function Viewer({
  reels,
  index,
  setIndex,
  onClose,
}: {
  reels: Reel[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const reel = reels[index];
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const next = useCallback(() => {
    setProgress(0);
    if (index < reels.length - 1) setIndex(index + 1);
    else onClose();
  }, [index, reels.length, setIndex, onClose]);

  const prev = useCallback(() => {
    setProgress(0);
    setIndex(Math.max(0, index - 1));
  }, [index, setIndex]);

  // Scroll lock, focus and keyboard.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  // Reels without a local video are watched in Instagram's player: no auto-advance.
  const hasVideo = Boolean(reel.video);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`SAAJ reels — ${reel.title}`}
      className="fixed inset-0 z-[80] flex animate-fade-in flex-col items-center justify-center bg-navy-950/96 backdrop-blur-sm"
    >
      {/* Ambient blurred backdrop of the current reel */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <Image src={reel.poster} alt="" fill sizes="100vw" className="scale-125 object-cover blur-3xl" />
      </div>

      <div className="relative flex h-dvh w-full max-w-[440px] flex-col px-3 pt-3 pb-4 md:h-[min(94dvh,880px)] md:px-0">
        {/* Progress */}
        <div className="flex gap-1" aria-hidden>
          {reels.map((r, i) => (
            <span key={r.code} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ivory-50/25">
              <span
                className="block h-full bg-gold-400 transition-[width] duration-200 ease-linear"
                style={{ width: i < index ? "100%" : i === index ? `${(hasVideo ? progress : 1) * 100}%` : "0%" }}
              />
            </span>
          ))}
        </div>

        {/* Header */}
        <div className="mt-3 flex items-center gap-3 text-ivory-50">
          <Image src="/brand/saaj-logo.jpg" alt="" width={36} height={36} className="rounded-full ring-1 ring-gold-500/60" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{site.instagram.handle}</p>
            <p className="truncate text-xs text-ivory-100/70">{reel.title}</p>
          </div>
          {hasVideo && (
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="grid size-10 place-items-center rounded-full text-ivory-50 hover:bg-ivory-50/10"
              aria-label={muted ? "Unmute" : "Mute"}
              aria-pressed={!muted}
            >
              <SoundIcon muted={muted} />
            </button>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full text-ivory-50 hover:bg-ivory-50/10"
            aria-label="Close reels"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        {/* Media */}
        <div className="relative mt-3 min-h-0 flex-1">
          <div className="relative mx-auto aspect-[9/16] h-full max-w-full overflow-hidden rounded-2xl bg-navy-900 shadow-2xl ring-1 ring-gold-500/30">
            {hasVideo ? (
              <>
                <ReelMedia
                  key={reel.code}
                  reel={reel}
                  playing={!paused}
                  muted={muted}
                  loop={false}
                  onEnded={next}
                  onProgress={setProgress}
                  sizes="440px"
                  priority
                />
                {/* Tap zones: left = previous, right = next, hold = pause */}
                <div
                  className="absolute inset-0 grid grid-cols-[1fr_2fr]"
                  onTouchStart={(e) => {
                    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                    setPaused(true);
                  }}
                  onTouchEnd={(e) => {
                    setPaused(false);
                    const start = touch.current;
                    if (!start) return;
                    const dx = e.changedTouches[0].clientX - start.x;
                    const dy = e.changedTouches[0].clientY - start.y;
                    if (dy > 90) onClose();
                    else if (dx < -50) next();
                    else if (dx > 50) prev();
                  }}
                >
                  <button type="button" onClick={prev} aria-label="Previous reel" className="h-full" />
                  <button type="button" onClick={next} aria-label="Next reel" className="h-full" />
                </div>
              </>
            ) : (
              <iframe
                key={reel.code}
                src={reelEmbedUrl(reel.code)}
                title={`Instagram reel: ${reel.title}`}
                className="absolute inset-0 h-full w-full bg-white"
                allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                allowFullScreen
              />
            )}
          </div>

          {/* Desktop arrows */}
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous reel"
            className="absolute top-1/2 -left-16 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-ivory-50/30 text-ivory-50 transition hover:bg-ivory-50 hover:text-navy-900 disabled:opacity-20 md:grid"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={index === reels.length - 1 ? "Close reels" : "Next reel"}
            className="absolute top-1/2 -right-16 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-ivory-50/30 text-ivory-50 transition hover:bg-ivory-50 hover:text-navy-900 md:grid"
          >
            <span aria-hidden>→</span>
          </button>
          {!hasVideo && (
            <div className="absolute inset-x-0 -bottom-1 flex justify-between px-1 md:hidden">
              <button type="button" onClick={prev} disabled={index === 0} className="rounded-full bg-navy-950/70 px-3 py-1.5 text-xs text-ivory-50 disabled:opacity-30">
                ← Prev
              </button>
              <button type="button" onClick={next} className="rounded-full bg-navy-950/70 px-3 py-1.5 text-xs text-ivory-50">
                Next →
              </button>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href="/shop" onClick={onClose} className="btn-gold !min-h-11 !px-3 !text-[0.68rem]">
            Shop sarees
          </Link>
          <a
            href={whatsappLink(`Hello SAAJ! I saw your reel “${reel.title}” (${reelPermalink(reel.code)}) and would love to know more.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !min-h-11 !px-3 !text-[0.68rem]"
          >
            <WhatsAppIcon size={16} /> Ask about this
          </a>
        </div>
      </div>
    </div>
  );
}

export function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      {muted ? <path d="m16 9.5 5 5m0-5-5 5" /> : <path d="M16 9a4 4 0 0 1 0 6m2.5-8.5a7.5 7.5 0 0 1 0 11" />}
    </svg>
  );
}
