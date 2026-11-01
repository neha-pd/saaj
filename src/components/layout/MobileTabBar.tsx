"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/components/store/StoreProvider";
import { whatsappLink } from "@/lib/format";
import { BagIcon, HeartIcon, HomeIcon, ShopIcon, WhatsAppIcon } from "@/components/ui/Icons";

/**
 * App-style bottom navigation on phones and tablets: the five things shoppers
 * reach for most, always one thumb-tap away.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  const { cartCount, wishlist, setCartOpen } = useStore();

  const tab = "relative flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-1.5 text-[0.62rem] tracking-[0.08em] uppercase transition";
  const state = (active: boolean) => (active ? "text-rose-600" : "text-navy-800/80");

  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-sand-300/80 bg-ivory-50/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto flex max-w-xl">
        <li className="flex flex-1">
          <Link href="/" className={`${tab} ${state(pathname === "/")}`} aria-current={pathname === "/" ? "page" : undefined}>
            <HomeIcon size={22} /> Home
          </Link>
        </li>
        <li className="flex flex-1">
          <Link
            href="/shop"
            className={`${tab} ${state(pathname.startsWith("/shop") || pathname.startsWith("/products"))}`}
            aria-current={pathname.startsWith("/shop") ? "page" : undefined}
          >
            <ShopIcon size={22} /> Shop
          </Link>
        </li>
        <li className="flex flex-1">
          <Link href="/wishlist" className={`${tab} ${state(pathname === "/wishlist")}`} aria-label={`Wishlist (${wishlist.length} items)`}>
            <HeartIcon size={22} /> Wishlist
            {wishlist.length > 0 && <Count n={wishlist.length} />}
          </Link>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={() => setCartOpen(true)} className={`${tab} ${state(false)}`} aria-label={`Shopping bag (${cartCount} items)`}>
            <BagIcon size={22} /> Bag
            {cartCount > 0 && <Count n={cartCount} />}
          </button>
        </li>
        <li className="flex flex-1">
          <a
            href={whatsappLink("Hello SAAJ! I'd like to know more about your sarees.")}
            target="_blank"
            rel="noopener noreferrer"
            className={`${tab} text-[#1f7a4d]`}
          >
            <WhatsAppIcon size={22} /> Chat
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Count({ n }: { n: number }) {
  return (
    <span className="absolute top-1 left-1/2 ml-1.5 grid min-w-4.5 place-items-center rounded-full bg-rose-600 px-1 text-[0.6rem] leading-[1.15rem] font-medium tracking-normal text-ivory-50">
      {n}
    </span>
  );
}
