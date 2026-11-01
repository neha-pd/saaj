"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { orderMessage, productEnquiryMessage, whatsappLink } from "@/lib/format";
import { useStore } from "@/components/store/StoreProvider";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { WishlistButton } from "./WishlistButton";

export function ProductPurchase({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="eyebrow text-ink-soft" id={`qty-${product.slug}`}>
          Quantity
        </span>
        <div className="flex items-center border border-sand-300" role="group" aria-labelledby={`qty-${product.slug}`}>
          <button
            type="button"
            className="grid size-11 place-items-center text-navy-800 hover:bg-ivory-200 disabled:opacity-40"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            <MinusIcon size={16} />
          </button>
          <output className="w-10 text-center text-sm" aria-live="polite">
            {qty}
          </output>
          <button
            type="button"
            className="grid size-11 place-items-center text-navy-800 hover:bg-ivory-200 disabled:opacity-40"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            disabled={qty >= 10}
            aria-label="Increase quantity"
          >
            <PlusIcon size={16} />
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" className="btn-primary" onClick={() => addToCart(product.slug, undefined, qty)}>
          Add to bag
        </button>
        <a
          className="btn-gold"
          href={whatsappLink(orderMessage([{ product, qty }]))}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy now
        </a>
      </div>

      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-[1fr_auto]"}`}>
        <a
          className="btn-whatsapp"
          href={whatsappLink(productEnquiryMessage(product))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={18} /> Enquire on WhatsApp
        </a>
        {!compact && <WishlistButton slug={product.slug} name={product.name} withLabel />}
      </div>

      <p className="text-xs leading-relaxed text-ink-soft">
        Orders are confirmed personally on WhatsApp — we&rsquo;ll share availability, the final price and
        payment details. Prepaid orders only (no COD).
      </p>
    </div>
  );
}
