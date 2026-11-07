import type { NextConfig } from "next";

/** GitHub Pages build: a fully static export served from /<repo>. Set by the deploy workflow. */
const pages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Hide the Next.js dev-mode badge in the corner of the page.
  devIndicators: false,
  ...(pages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  }),
  // The admin is a static page in public/admin/. GitHub Pages serves its index.html
  // at /admin/ by itself; the Next server needs this redirect (not allowed in exports).
  ...(!pages && {
    async redirects() {
      return [{ source: "/admin", destination: "/admin/index.html", permanent: false }];
    },
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
