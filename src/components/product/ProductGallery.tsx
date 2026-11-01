"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { ProductImage } from "@/lib/products";
import { Overlay } from "@/components/ui/Overlay";
import { ZoomIcon } from "@/components/ui/Icons";

/**
 * Main image with cursor-follow zoom on desktop and a tap-to-open
 * full-screen view on every device.
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const image = images[active];
  const close = useCallback(() => setFullscreen(false), []);

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      {images.length > 1 && (
        <ul className="flex gap-3 md:flex-col" aria-label="Product images">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === active}
                className={`relative block h-24 w-18 overflow-hidden ring-1 transition ${
                  i === active ? "ring-navy-800" : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="72px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setFullscreen(true)}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          onMouseLeave={() => setZoom(null)}
          aria-label={`Open full-screen view of ${name}`}
          className="relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-ivory-200"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-200 ease-out"
            style={
              zoom
                ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                : { transform: "scale(1)" }
            }
          />
          <span className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 bg-ivory-50/90 px-3 py-2 text-[0.65rem] tracking-[0.18em] text-navy-800 uppercase">
            <ZoomIcon size={15} /> <span className="hidden md:inline">Hover to zoom ·</span> Tap to expand
          </span>
        </button>
      </div>

      <Overlay open={fullscreen} onClose={close} label="Image viewer" variant="center" className="!max-w-3xl bg-navy-950">
        <div className="relative h-[88vh] w-full">
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
        </div>
      </Overlay>
    </div>
  );
}
