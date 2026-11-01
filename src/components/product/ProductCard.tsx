"use client";

import Image from "next/image";
import Link from "next/link";
import { collections, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/components/store/StoreProvider";
import { EyeIcon } from "@/components/ui/Icons";
import { WishlistButton } from "./WishlistButton";
import { Swatches } from "./Swatches";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { setQuickView } = useStore();
  const [image] = product.images;
  const href = `/products/${product.slug}`;
  // Short category label above the name, e.g. "Zari & Buti".
  const category = collections.find((c) => c.slug === product.collections.find((s) => s !== "new-arrivals"))?.name ?? "Handloom saree";

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200">
        <Link href={href} tabIndex={-1} aria-hidden>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-navy-800 px-2.5 py-1 text-[0.62rem] font-medium tracking-[0.18em] text-ivory-50 uppercase">
            {product.badge}
          </span>
        )}
        <WishlistButton slug={product.slug} name={product.name} className="absolute top-2 right-2" />
        <button
          type="button"
          onClick={() => setQuickView(product.slug)}
          className="absolute inset-x-3 bottom-3 hidden items-center justify-center gap-2 bg-ivory-50/95 py-3 text-[0.7rem] font-medium tracking-[0.2em] text-navy-800 uppercase opacity-0 transition-all duration-500 group-hover:opacity-100 focus-visible:opacity-100 md:flex md:translate-y-2 md:group-hover:translate-y-0"
        >
          <EyeIcon size={16} /> Quick view
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[0.62rem] font-medium tracking-[0.2em] text-gold-700 uppercase">{category}</p>
        <h3 className="mt-1.5 font-display text-lg leading-snug text-navy-800 md:text-xl">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] md:after:hidden">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className={`text-[0.95rem] ${product.price == null ? "text-rose-700 italic" : "font-medium text-ink"}`}>
            {formatPrice(product.price)}
          </p>
          <Swatches colours={product.colours} size="sm" />
        </div>
      </div>
    </article>
  );
}
