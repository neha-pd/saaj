"use client";

import Link from "next/link";
import { getProduct, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { useStore } from "./StoreProvider";

export function WishlistView() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter((p): p is Product => Boolean(p));

  if (!items.length) {
    return (
      <div className="container-saaj pb-24 text-center">
        <p className="text-ink-soft">Tap the heart on any saree to save it here.</p>
        <Link href="/shop" className="btn-primary mt-8">
          Discover sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="container-saaj pb-24">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
        {items.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
