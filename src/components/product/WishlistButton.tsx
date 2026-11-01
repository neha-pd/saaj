"use client";

import { useStore } from "@/components/store/StoreProvider";
import { HeartIcon } from "@/components/ui/Icons";

export function WishlistButton({
  slug,
  name,
  className = "",
  withLabel = false,
}: {
  slug: string;
  name: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { isWishlisted, toggleWishlist } = useStore();
  const active = isWishlisted(slug);

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={() => toggleWishlist(slug)}
        aria-pressed={active}
        className={`btn border border-sand-300 text-navy-800 hover:border-navy-800 ${className}`}
      >
        <HeartIcon size={18} filled={active} className={active ? "text-rose-600" : ""} />
        {active ? "Saved" : "Wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(slug)}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`z-10 grid size-11 place-items-center rounded-full bg-ivory-50/85 text-navy-800 backdrop-blur transition hover:text-rose-600 ${className}`}
    >
      <HeartIcon size={19} filled={active} className={active ? "text-rose-600" : ""} />
    </button>
  );
}
