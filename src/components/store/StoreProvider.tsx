"use client";

/**
 * Demo cart + wishlist kept in localStorage.
 * TODO(launch): swap for the commerce backend's cart API (Shopify Storefront,
 * Medusa, WooCommerce, etc.). Components only use the hooks below, so the
 * swap is contained to this file.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";

export type CartItem = { slug: string; colour?: string; qty: number };

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  quickView: string | null;
  toast: string | null;
};

type StoreApi = StoreState & {
  addToCart: (slug: string, colour?: string, qty?: number) => void;
  updateQty: (slug: string, colour: string | undefined, qty: number) => void;
  removeFromCart: (slug: string, colour?: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setQuickView: (slug: string | null) => void;
  cartLines: { item: CartItem; product: Product }[];
  cartCount: number;
};

const StoreContext = createContext<StoreApi | null>(null);

const CART_KEY = "saaj.cart.v1";
const WISHLIST_KEY = "saaj.wishlist.v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const sameLine = (a: CartItem, slug: string, colour?: string) =>
  a.slug === slug && (a.colour ?? "") === (colour ?? "");

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Drop items for products that no longer exist.
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from localStorage */
    setCart(read<CartItem[]>(CART_KEY, []).filter((i) => getProduct(i.slug)));
    setWishlist(read<string[]>(WISHLIST_KEY, []).filter((s) => getProduct(s)));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const addToCart = useCallback((slug: string, colour?: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => sameLine(i, slug, colour));
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: Math.min(i.qty + qty, 10) } : i));
      }
      return [...prev, { slug, colour, qty }];
    });
    setQuickView(null);
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((slug: string, colour: string | undefined, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !sameLine(i, slug, colour))
        : prev.map((i) => (sameLine(i, slug, colour) ? { ...i, qty: Math.min(qty, 10) } : i)),
    );
  }, []);

  const removeFromCart = useCallback((slug: string, colour?: string) => {
    setCart((prev) => prev.filter((i) => !sameLine(i, slug, colour)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => {
      const has = prev.includes(slug);
      setToast(has ? "Removed from wishlist" : "Saved to wishlist");
      return has ? prev.filter((s) => s !== slug) : [...prev, slug];
    });
  }, []);

  const value = useMemo<StoreApi>(() => {
    const cartLines = cart
      .map((item) => ({ item, product: getProduct(item.slug) }))
      .filter((l): l is { item: CartItem; product: Product } => Boolean(l.product));
    return {
      cart,
      wishlist,
      cartOpen,
      searchOpen,
      quickView,
      toast,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted: (slug) => wishlist.includes(slug),
      setCartOpen,
      setSearchOpen,
      setQuickView,
      cartLines,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
    };
  }, [cart, wishlist, cartOpen, searchOpen, quickView, toast, addToCart, updateQty, removeFromCart, clearCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
