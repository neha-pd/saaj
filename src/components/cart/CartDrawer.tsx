"use client";

import Link from "next/link";
import { useCallback } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { Overlay } from "@/components/ui/Overlay";
import { CartContents } from "./CartContents";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cartCount } = useStore();
  const close = useCallback(() => setCartOpen(false), [setCartOpen]);

  return (
    <Overlay open={cartOpen} onClose={close} label="Shopping bag" variant="right">
      <div className="flex min-h-full flex-col px-6 pt-6 pb-8">
        <div className="mb-2 flex items-baseline gap-3 pr-10">
          <h2 className="text-3xl">Your bag</h2>
          <span className="text-sm text-ink-soft">({cartCount})</span>
        </div>
        <Link href="/cart" onClick={close} className="mb-4 self-start text-xs tracking-wide text-ink-soft underline-offset-4 hover:underline">
          View full bag
        </Link>
        <CartContents onNavigate={close} />
      </div>
    </Overlay>
  );
}
