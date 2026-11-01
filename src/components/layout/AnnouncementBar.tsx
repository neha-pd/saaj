"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { announcements } from "@/lib/site";

/** Rotating announcements; time-limited messages hide themselves after `expiresAt`. */
export function AnnouncementBar() {
  // Expiring messages are only added on the client so prerendered HTML never shows a stale event.
  const [items, setItems] = useState(() => announcements.filter((a) => !a.expiresAt));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const now = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on the visitor's clock
    setItems(announcements.filter((a) => !a.expiresAt || new Date(a.expiresAt).getTime() > now));
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
    return () => window.clearInterval(t);
  }, [items.length]);

  const current = items[index % items.length];
  if (!current) return null;

  return (
    <div className="bg-navy-900 text-ivory-100">
      <div className="container-saaj flex min-h-9 items-center justify-center py-2 text-center text-[0.68rem] tracking-[0.2em] uppercase">
        <p key={current.text} className="animate-fade-in" aria-live="polite">
          {current.href ? (
            current.href.startsWith("http") ? (
              <a href={current.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">
                {current.text}
              </a>
            ) : (
              <Link href={current.href} className="hover:text-gold-400">
                {current.text}
              </Link>
            )
          ) : (
            current.text
          )}
        </p>
      </div>
    </div>
  );
}
