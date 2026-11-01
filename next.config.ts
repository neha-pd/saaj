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
