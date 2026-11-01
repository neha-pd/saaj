import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/collections", "/our-story", "/handloom-craft", "/contact", "/shipping-returns", "/privacy-policy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, priority: 0.8 })),
  ];
}

// Generated once at build time (required for the static GitHub Pages export).
export const dynamic = "force-static";
