import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/lib/products";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShopView } from "@/components/shop/ShopView";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Shop All Sarees",
  description: "Browse SAAJ handloom sarees — zari borders, butis, embroidered and festive drapes. Shipping across India.",
  alternates: { canonical: "/shop" },
};

/** Static, unfiltered grid used as the prerendered fallback while filters hydrate. */
function ShopFallback() {
  return (
    <div className="container-saaj pb-24">
      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:ml-[298px] xl:grid-cols-3">
        {products.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="Shop All Sarees"
        intro="Every drape, chosen with love. Filter to find yours — prices and availability are confirmed on WhatsApp."
        crumbs={[{ label: "Shop" }]}
        compact
      />
      <Suspense fallback={<ShopFallback />}>
        <ShopView />
      </Suspense>
    </>
  );
}
