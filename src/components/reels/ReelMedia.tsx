"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Reel } from "@/lib/reels";

/**
 * Plays the reel's local video when `playing` is true (muted autoplay is
 * allowed by every mobile browser). Without a video file it shows the cover
 * frame with a slow Ken Burns drift so the stage still feels alive.
 */
export function ReelMedia({
  reel,
  playing,
  muted = true,
  loop = true,
  onEnded,
  onProgress,
  sizes = "300px",
  priority = false,
}: {
  reel: Reel;
  playing: boolean;
  muted?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  onProgress?: (ratio: number) => void;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => {
        // Autoplay with sound can be blocked — retry muted.
        video.muted = true;
        video.play().catch(() => {});
      });
    } else {
      video.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  if (reel.video) {
    return (
      <video
        ref={ref}
        src={reel.video}
        poster={reel.poster}
        muted={muted}
        loop={loop}
        playsInline
        preload={playing ? "auto" : "metadata"}
        onEnded={onEnded}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (onProgress && v.duration) onProgress(v.currentTime / v.duration);
        }}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={reel.title}
      />
    );
  }

  return (
    <Image
      src={reel.poster}
      alt={reel.title}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${playing ? "animate-kenburns" : ""}`}
    />
  );
}
