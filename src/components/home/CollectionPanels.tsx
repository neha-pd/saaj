import Image from "next/image";
import Link from "next/link";
import { collections, productsInCollection, type CollectionSlug } from "@/lib/products";
import { ArrowRightIcon } from "@/components/ui/Icons";

/** How each photo sits in its arch. The navy photo is zoomed from its hem so the text printed at its top is cropped away. */
const framing: Record<CollectionSlug, { at: string; zoom?: number }> = {
  "new-arrivals": { at: "50% 100%", zoom: 1.25 },
  "festive-edit": { at: "50% 45%" },
  "zari-and-buti": { at: "50% 30%" },
  embroidered: { at: "50% 50%" },
  "everyday-elegance": { at: "50% 30%" },
};

/**
 * All collections at a glance: a row of small arched frames, each with its
 * photograph, name and saree count. Swipes sideways on phones.
 */
export function CollectionPanels() {
  return (
    <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:scroll-px-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0 lg:gap-7">
      {collections.map((c) => {
        const count = productsInCollection(c.slug).length;
        const f = framing[c.slug];
        return (
          <li key={c.slug} className="w-[40vw] max-w-[13rem] shrink-0 snap-start md:w-auto md:max-w-none">
            <Link href={`/shop?collection=${c.slug}`} className="group block text-center">
              <span className="relative block p-1.5">
                {/* fine gold arch outline */}
                <span aria-hidden className="absolute inset-0 rounded-t-[999px] border border-gold-500/50 transition-colors duration-500 group-hover:border-gold-500" />
                <span className="relative block aspect-[3/4] overflow-hidden rounded-t-[999px] bg-ivory-200">
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 1280px) 15rem, (min-width: 768px) 19vw, 42vw"
                    style={{ objectPosition: f.at, transformOrigin: f.at, transform: f.zoom ? `scale(${f.zoom})` : undefined }}
                    className="object-cover transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-105"
                  />
                </span>
              </span>
              <span className="mt-3 block font-display text-xl leading-tight text-navy-800 transition-colors group-hover:text-rose-600 md:text-[1.35rem]">
                {c.name}
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.18em] text-ink-soft uppercase">
                {count} {count === 1 ? "saree" : "sarees"}
                <ArrowRightIcon size={12} className="-translate-x-1 text-rose-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
