"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collections, type CollectionSlug } from "@/lib/products";
import { ArrowRightIcon } from "@/components/ui/Icons";

/** How each photo sits in the arch. The navy photo is zoomed from its hem so the text printed at its top is cropped away. */
const framing: Record<CollectionSlug, { at: string; zoom?: number }> = {
  "new-arrivals": { at: "50% 100%", zoom: 1.2 },
  "festive-edit": { at: "50% 45%" },
  "zari-and-buti": { at: "50% 35%" },
  embroidered: { at: "50% 50%" },
  "everyday-elegance": { at: "50% 35%" },
};

const CYCLE = 4000;

/**
 * Lookbook: an index of collection names beside a single arched frame. Hovering
 * or focusing a name brings its photograph into the arch.
 */
export function CollectionPanels() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = collections[active];

  // Turn the pages slowly on their own (phones have no hover) until someone takes over.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % collections.length), CYCLE);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,24rem)] md:gap-16 lg:grid-cols-[1fr_minmax(0,28rem)] lg:gap-24">
      {/* Index */}
      <ol className="order-2 border-t border-sand-300 text-left md:order-1">
        {collections.map((c, i) => {
          const on = i === active;
          return (
            <li key={c.slug} className="border-b border-sand-300">
              <Link
                href={`/shop?collection=${c.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-baseline gap-5 py-5 md:py-6"
              >
                <span className={`w-7 shrink-0 font-display text-base italic transition-colors ${on ? "text-rose-600" : "text-gold-700"}`}>
                  0{i + 1}
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-display text-[1.9rem] leading-tight transition-all duration-500 md:text-[2.3rem] ${
                      on ? "translate-x-1 text-navy-800" : "text-navy-800/45 group-hover:text-navy-800/70"
                    }`}
                  >
                    {c.name}
                  </span>
                  <span
                    className={`grid text-sm text-ink-soft transition-all duration-500 ${on ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <span className="overflow-hidden">{c.blurb}</span>
                  </span>
                </span>
                <ArrowRightIcon
                  size={20}
                  className={`shrink-0 self-center transition-all duration-500 ${on ? "translate-x-0 text-rose-600 opacity-100" : "-translate-x-2 text-navy-800 opacity-0"}`}
                />
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Arched frame */}
      <Link href={`/shop?collection=${current.slug}`} className="relative order-1 mx-auto block w-full max-w-[19rem] md:order-2 md:max-w-none" aria-label={`Shop ${current.name}`}>
        <span aria-hidden className="absolute -inset-3 rounded-t-[999px] border border-gold-500/70 md:-inset-4" />
        <span aria-hidden className="absolute -inset-1.5 rounded-t-[999px] border border-gold-500/30 md:-inset-2" />
        <span className="relative block aspect-[4/5] overflow-hidden rounded-t-[999px] bg-ivory-200 shadow-[0_30px_60px_-30px_rgba(29,42,79,0.55)]">
          {collections.map((c, i) => (
            <span
              key={c.slug}
              className={`absolute inset-0 transition-all duration-[900ms] ease-[var(--ease-silk)] ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
            >
              <Image
                src={c.image.src}
                alt={i === active ? c.image.alt : ""}
                fill
                sizes="(min-width: 1024px) 28rem, (min-width: 768px) 24rem, 19rem"
                style={{
                  objectPosition: framing[c.slug].at,
                  transformOrigin: framing[c.slug].at,
                  transform: framing[c.slug].zoom ? `scale(${framing[c.slug].zoom})` : undefined,
                }}
                className="object-cover"
              />
            </span>
          ))}
        </span>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-navy-800 px-5 py-2 text-[0.62rem] tracking-[0.24em] whitespace-nowrap text-ivory-50 uppercase shadow-lg">
          {current.name}
        </span>
      </Link>
    </div>
  );
}
