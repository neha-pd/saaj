import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/wishlist", "/admin"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

// Generated once at build time (required for the static GitHub Pages export).
export const dynamic = "force-static";
