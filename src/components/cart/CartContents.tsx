"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, orderMessage, whatsappLink } from "@/lib/format";
import { useStore } from "@/components/store/StoreProvider";
import { MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Cart lines + summary. Checkout hands the order to WhatsApp, matching how
 * SAAJ takes orders today ("DM for order").
 * TODO(launch): replace the WhatsApp hand-off with payment-gateway checkout
 * (e.g. Razorpay / Shopify) once a backend is connected.
 */
export function CartContents({ onNavigate }: { onNavigate?: () => void }) {
  const { cartLines, updateQty, removeFromCart } = useStore();

  if (cartLines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-16 text-center">
        <p className="font-display text-2xl text-navy-800">Your bag is empty</p>
        <p className="max-w-xs text-sm text-ink-soft">Every saree here is chosen with love — find the one that feels like you.</p>
        <Link href="/shop" className="btn-primary" onClick={onNavigate}>
          Explore the collection
        </Link>
      </div>
    );
  }

  const priced = cartLines.every((l) => l.product.price != null);
  const subtotal = cartLines.reduce((sum, l) => sum + (l.product.price ?? 0) * l.item.qty, 0);
  const message = orderMessage(cartLines.map((l) => ({ product: l.product, colour: l.item.colour, qty: l.item.qty })));

  return (
    <div className="flex flex-1 flex-col">
      <ul className="flex-1 divide-y divide-sand-300/70">
        {cartLines.map(({ item, product }) => (
          <li key={`${item.slug}-${item.colour ?? ""}`} className="flex gap-4 py-5">
            <Link
              href={`/products/${product.slug}`}
              onClick={onNavigate}
              className="relative h-28 w-21 shrink-0 overflow-hidden bg-ivory-200"
            >
              <Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="84px" className="object-cover" />
            </Link>
            <div className="flex flex-1 flex-col">
              <Link
                href={`/products/${product.slug}`}
                onClick={onNavigate}
                className="font-display text-lg leading-snug text-navy-800 hover:text-rose-600"
              >
                {product.name}
              </Link>
              {item.colour && <p className="text-xs text-ink-soft">{item.colour}</p>}
              <p className={`mt-1 text-sm ${product.price == null ? "text-rose-700 italic" : ""}`}>
                {formatPrice(product.price)}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center border border-sand-300">
                  <button
                    type="button"
                    className="grid size-9 place-items-center hover:bg-ivory-200"
                    onClick={() => updateQty(item.slug, item.colour, item.qty - 1)}
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="w-8 text-center text-sm" aria-label="Quantity">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    className="grid size-9 place-items-center hover:bg-ivory-200 disabled:opacity-40"
                    onClick={() => updateQty(item.slug, item.colour, item.qty + 1)}
                    disabled={item.qty >= 10}
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.slug, item.colour)}
                  className="text-xs tracking-wide text-ink-soft underline-offset-4 hover:text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-4 border-t border-sand-300 pt-5">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow text-ink-soft">Subtotal</span>
          <span className="font-display text-2xl text-navy-800">
            {priced ? formatPrice(subtotal) : "Confirmed on WhatsApp"}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-ink-soft">
          Shipping across India · Prepaid orders only (no COD) · All sales final (no returns).
        </p>
        <a className="btn-whatsapp w-full" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={18} /> Place order on WhatsApp
        </a>
      </div>
    </div>
  );
}
