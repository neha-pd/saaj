"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/components/store/StoreProvider";
import { Overlay } from "@/components/ui/Overlay";
import { ProductPurchase } from "./ProductPurchase";
import { Swatches } from "./Swatches";

export function QuickView() {
  const { quickView, setQuickView } = useStore();
  const product = quickView ? getProduct(quickView) : undefined;
  const close = useCallback(() => setQuickView(null), [setQuickView]);

  return (
    <Overlay open={Boolean(product)} onClose={close} label="Quick view">
      {product && (
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[3/4] bg-ivory-200 md:aspect-auto md:min-h-[560px]">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 p-6 md:p-10">
            <div>
              <p className="eyebrow text-rose-600">Handloom saree</p>
              <h2 className="mt-3 text-3xl md:text-4xl">{product.name}</h2>
              <p className={`mt-3 ${product.price == null ? "text-rose-700 italic" : "text-lg"}`}>
                {formatPrice(product.price)}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>
            <div className="flex items-center gap-3">
              <span className="eyebrow text-ink-soft">Colours</span>
              <Swatches colours={product.colours} />
            </div>
            <ProductPurchase product={product} compact />
            <Link
              href={`/products/${product.slug}`}
              onClick={close}
              className="self-start text-[0.72rem] font-medium tracking-[0.22em] text-navy-800 uppercase link-underline"
            >
              View full details
            </Link>
          </div>
        </div>
      )}
    </Overlay>
  );
}
