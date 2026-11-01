"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { collections, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/components/store/StoreProvider";
import { Overlay } from "@/components/ui/Overlay";
import { SearchIcon } from "@/components/ui/Icons";

export function searchProducts(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products.filter((p) => {
    const haystack = [
      p.name,
      p.description,
      p.fabric,
      p.weave,
      ...p.colours.map((c) => c.name),
      ...p.collections.map((slug) => collections.find((c) => c.slug === slug)?.name),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query), [query]);
  const close = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, [setSearchOpen]);

  return (
    <Overlay open={searchOpen} onClose={close} label="Search" variant="top">
      <div className="container-saaj py-8 md:py-12">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="pr-12">
          <label htmlFor="site-search" className="eyebrow text-rose-600">
            Search the collection
          </label>
          <div className="mt-3 flex items-center gap-3 border-b border-navy-800 pb-3">
            <SearchIcon size={24} className="text-navy-800" />
            <input
              id="site-search"
              data-autofocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “navy”, “festive”, “embroidered”…"
              className="w-full bg-transparent font-display text-2xl text-navy-800 placeholder:text-ink-soft/50 focus:outline-none md:text-4xl"
              autoComplete="off"
            />
          </div>
        </form>

        <div className="mt-8 max-h-[55vh] overflow-y-auto" aria-live="polite">
          {query && results.length === 0 && (
            <p className="text-ink-soft">
              Nothing matches “{query}” yet. Ask us on WhatsApp — new pieces arrive often.
            </p>
          )}
          {results.length > 0 && (
            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} onClick={close} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200">
                      <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="200px" className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <p className="mt-2 font-display text-lg leading-snug text-navy-800">{p.name}</p>
                    <p className="text-xs text-ink-soft">{formatPrice(p.price)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!query && (
            <div>
              <p className="eyebrow mb-4 text-ink-soft">Browse collections</p>
              <ul className="flex flex-wrap gap-2">
                {collections.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop?collection=${c.slug}`}
                      onClick={close}
                      className="inline-block border border-sand-300 px-4 py-2 text-sm text-navy-800 transition hover:border-navy-800"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
}
