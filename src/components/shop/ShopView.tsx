"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { collections, NOT_SPECIFIED, products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { searchProducts } from "@/components/layout/SearchDialog";
import { Overlay } from "@/components/ui/Overlay";
import { ChevronDownIcon, CloseIcon, FilterIcon, SearchIcon } from "@/components/ui/Icons";

const PRICE_BANDS = [
  { id: "under-5000", label: "Under ₹5,000", test: (p: number) => p < 5000 },
  { id: "5000-10000", label: "₹5,000 – ₹10,000", test: (p: number) => p >= 5000 && p <= 10000 },
  { id: "10000-20000", label: "₹10,000 – ₹20,000", test: (p: number) => p > 10000 && p <= 20000 },
  { id: "over-20000", label: "Above ₹20,000", test: (p: number) => p > 20000 },
  { id: "on-request", label: "Price on request", test: () => false },
] as const;

const SORTS = [
  { id: "popular", label: "Popularity" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
] as const;

type FilterKey = "collection" | "price" | "colour" | "fabric";

const unique = (values: string[]) => [...new Set(values)].sort();
const colourOptions = unique(products.flatMap((p) => p.colours.map((c) => c.name)));
const fabricOptions = unique(products.map((p) => p.fabric ?? NOT_SPECIFIED));
const colourHex = Object.fromEntries(products.flatMap((p) => p.colours.map((c) => [c.name, c.hex])));

function matchesPrice(p: Product, bands: string[]) {
  if (!bands.length) return true;
  return bands.some((id) =>
    id === "on-request" ? p.price == null : p.price != null && PRICE_BANDS.find((b) => b.id === id)?.test(p.price),
  );
}

function sortProducts(list: Product[], sort: string) {
  const byPrice = (dir: 1 | -1) => (a: Product, b: Product) => {
    // Unpriced items always sort last.
    if (a.price == null) return 1;
    if (b.price == null) return -1;
    return (a.price - b.price) * dir;
  };
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => a.listedOrder - b.listedOrder);
    case "price-asc":
      return sorted.sort(byPrice(1));
    case "price-desc":
      return sorted.sort(byPrice(-1));
    default:
      return sorted.sort((a, b) => a.rank - b.rank);
  }
}

export function ShopView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const closeFilters = useCallback(() => setFiltersOpen(false), []);

  const selected = useMemo(
    () => ({
      collection: params.getAll("collection"),
      price: params.getAll("price"),
      colour: params.getAll("colour"),
      fabric: params.getAll("fabric"),
    }),
    [params],
  );
  const sort = params.get("sort") ?? "popular";
  const query = params.get("q") ?? "";
  const [draftQuery, setDraftQuery] = useState(query);
  // Keep the box in step when the URL's query changes from elsewhere (header search, back button).
  const [syncedQuery, setSyncedQuery] = useState(query);
  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setDraftQuery(query);
  }

  const results = useMemo(() => {
    const pool = query.trim() ? searchProducts(query) : products;
    const filtered = pool.filter(
      (p) =>
        (!selected.collection.length || p.collections.some((c) => selected.collection.includes(c))) &&
        matchesPrice(p, selected.price) &&
        (!selected.colour.length || p.colours.some((c) => selected.colour.includes(c.name))) &&
        (!selected.fabric.length || selected.fabric.includes(p.fabric ?? NOT_SPECIFIED)),
    );
    return sortProducts(filtered, sort);
  }, [selected, sort, query]);

  const update = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = (key: FilterKey, value: string) =>
    update((next) => {
      const values = next.getAll(key);
      next.delete(key);
      (values.includes(value) ? values.filter((v) => v !== value) : [...values, value]).forEach((v) => next.append(key, v));
    });

  const setQuery = (value: string) =>
    update((next) => (value.trim() ? next.set("q", value.trim()) : next.delete("q")));

  const clearAll = () => {
    setDraftQuery("");
    update((next) => (["collection", "price", "colour", "fabric", "q"] as const).forEach((k) => next.delete(k)));
  };

  const activeCount = Object.values(selected).reduce((n, v) => n + v.length, 0) + (query ? 1 : 0);

  // Removable chips for everything currently applied.
  const chips = [
    ...(query ? [{ key: "q", label: `“${query}”`, remove: () => (setDraftQuery(""), setQuery("")) }] : []),
    ...selected.collection.map((v) => ({ key: `c-${v}`, label: collections.find((c) => c.slug === v)?.name ?? v, remove: () => toggle("collection", v) })),
    ...selected.price.map((v) => ({ key: `p-${v}`, label: PRICE_BANDS.find((b) => b.id === v)?.label ?? v, remove: () => toggle("price", v) })),
    ...selected.colour.map((v) => ({ key: `col-${v}`, label: v, remove: () => toggle("colour", v) })),
    ...selected.fabric.map((v) => ({ key: `f-${v}`, label: v, remove: () => toggle("fabric", v) })),
  ];
  const activeCollection = selected.collection.length === 1 ? collections.find((c) => c.slug === selected.collection[0]) : undefined;

  const filters = (
    <div className="divide-y divide-sand-300/70">
      <form
        role="search"
        className="pb-6"
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(draftQuery);
        }}
      >
        <label className="relative block">
          <span className="sr-only">Search sarees</span>
          <input
            type="search"
            value={draftQuery}
            onChange={(e) => {
              setDraftQuery(e.target.value);
              if (!e.target.value) setQuery("");
            }}
            onBlur={() => draftQuery !== query && setQuery(draftQuery)}
            placeholder="Search sarees…"
            className="field !py-2.5 pr-10 text-sm"
          />
          <button type="submit" aria-label="Search" className="absolute inset-y-0 right-0 grid w-10 place-items-center text-navy-800">
            <SearchIcon size={18} />
          </button>
        </label>
      </form>
      <FilterGroup title="Collection" count={selected.collection.length} defaultOpen>
        {collections.map((c) => (
          <Check key={c.slug} label={c.name} checked={selected.collection.includes(c.slug)} onChange={() => toggle("collection", c.slug)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price" count={selected.price.length} defaultOpen>
        {PRICE_BANDS.map((b) => (
          <Check key={b.id} label={b.label} checked={selected.price.includes(b.id)} onChange={() => toggle("price", b.id)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Colour" count={selected.colour.length} defaultOpen={selected.colour.length > 0}>
        {colourOptions.map((name) => (
          <Check
            key={name}
            label={name}
            swatch={colourHex[name]}
            checked={selected.colour.includes(name)}
            onChange={() => toggle("colour", name)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Fabric" count={selected.fabric.length} defaultOpen={selected.fabric.length > 0}>
        {fabricOptions.map((f) => (
          <Check key={f} label={f} checked={selected.fabric.includes(f)} onChange={() => toggle("fabric", f)} />
        ))}
      </FilterGroup>
      {activeCount > 0 && (
        <div className="pt-5">
          <button type="button" onClick={clearAll} className="text-xs tracking-[0.18em] text-rose-700 uppercase underline underline-offset-4">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );

  const resultLabel = `${results.length} ${results.length === 1 ? "saree" : "sarees"}`;

  return (
    <div className="container-saaj pb-24">
      {activeCollection && (
        <p className="mb-8 max-w-xl text-ink-soft">
          <span className="font-display text-2xl text-navy-800">{activeCollection.name}</span> — {activeCollection.blurb}
        </p>
      )}

      <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-12">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-28 border border-sand-300/70 bg-white p-6">{filters}</div>
        </aside>

        <div>
          {/* Toolbar: result count + sort; on phones also the Filters button */}
          <div className="sticky top-18 z-30 -mx-5 mb-5 border-b border-sand-300/70 bg-ivory-50/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 md:top-20 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
            <div className="flex items-center justify-between gap-3">
              <p className="hidden text-sm text-ink-soft sm:block" aria-live="polite">
                Showing {results.length === products.length ? resultLabel : `${results.length} of ${products.length} sarees`}
              </p>
              <div className="grid flex-1 grid-cols-2 gap-3 sm:flex sm:flex-none">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="flex min-h-11 items-center justify-center gap-2 border border-sand-300 bg-white px-4 text-sm text-navy-800 lg:hidden"
                >
                  <FilterIcon size={17} /> Filters {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-rose-600 text-[0.65rem] text-ivory-50">{activeCount}</span>}
                </button>
                <label className="relative flex min-h-11 items-center border border-sand-300 bg-white text-sm text-navy-800">
                  <span className="sr-only">Sort products</span>
                  <select
                    value={sort}
                    onChange={(e) => update((next) => (e.target.value === "popular" ? next.delete("sort") : next.set("sort", e.target.value)))}
                    className="h-full w-full cursor-pointer appearance-none bg-transparent py-2 pr-9 pl-4 focus:outline-none"
                  >
                    {SORTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        Sort: {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon size={16} className="pointer-events-none absolute right-3" />
                </label>
              </div>
            </div>
            <p className="mt-2 text-xs text-ink-soft sm:hidden" aria-hidden>
              Showing {results.length === products.length ? resultLabel : `${results.length} of ${products.length} sarees`}
            </p>
          </div>

          {chips.length > 0 && (
            <ul className="mb-6 flex flex-wrap items-center gap-2" aria-label="Applied filters">
              {chips.map((chip) => (
                <li key={chip.key}>
                  <button
                    type="button"
                    onClick={chip.remove}
                    className="flex items-center gap-1.5 rounded-full border border-navy-800/20 bg-white py-1.5 pr-2.5 pl-3.5 text-xs text-navy-800 transition hover:border-rose-600 hover:text-rose-700"
                    aria-label={`Remove filter: ${chip.label}`}
                  >
                    {chip.label} <CloseIcon size={13} />
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={clearAll} className="px-2 text-xs text-rose-700 underline underline-offset-4">
                  Clear all
                </button>
              </li>
            </ul>
          )}

          {results.length ? (
            <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 xl:grid-cols-3">
              {results.map((p, i) => (
                <li key={p.slug}>
                  <ProductCard product={p} priority={i < 2} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-sand-300 px-6 py-20 text-center">
              <p className="font-display text-2xl text-navy-800">No sarees match these filters</p>
              <p className="mt-2 text-sm text-ink-soft">Try removing a filter — or ask us on WhatsApp, new pieces arrive often.</p>
              <button type="button" onClick={clearAll} className="btn-outline mt-6">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Overlay open={filtersOpen} onClose={closeFilters} label="Filters" variant="left">
        <div className="flex min-h-full flex-col">
          <div className="px-7 pt-8 pb-6">
            <h2 className="mb-6 text-3xl">Filters</h2>
            {filters}
          </div>
          <div className="sticky bottom-0 mt-auto grid grid-cols-2 gap-3 border-t border-sand-300/70 bg-ivory-50 px-7 py-4">
            <button type="button" onClick={clearAll} className="btn-outline" disabled={activeCount === 0}>
              Clear all
            </button>
            <button type="button" onClick={closeFilters} className="btn-primary">
              Show {resultLabel}
            </button>
          </div>
        </div>
      </Overlay>
    </div>
  );
}

function FilterGroup({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group py-4">
      <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
        <span className="eyebrow text-navy-800">
          {title}
          {count > 0 && <span className="ml-2 text-rose-600">({count})</span>}
        </span>
        <ChevronDownIcon size={16} className="text-navy-800 transition group-open:rotate-180" />
      </summary>
      <fieldset className="mt-2 space-y-0.5">
        <legend className="sr-only">{title}</legend>
        {children}
      </fieldset>
    </details>
  );
}

function Check({ label, checked, onChange, swatch }: { label: string; checked: boolean; onChange: () => void; swatch?: string }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-3 text-sm text-ink-soft hover:text-navy-800">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-navy-800" />
      {swatch && <span className="size-3.5 rounded-full ring-1 ring-ink/15" style={{ backgroundColor: swatch }} aria-hidden />}
      <span className={checked ? "text-navy-800" : ""}>{label}</span>
    </label>
  );
}
