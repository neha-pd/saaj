/**
 * Builds the product catalogue from content/products/*.json (the files the
 * /admin page edits) into src/lib/catalogue.generated.json, which the site imports.
 *
 * - The file name is the product's URL slug.
 * - Hidden products are left out.
 * - Image width/height are read from the files in public/.
 * - "Newest" order comes from each product's `added` date.
 *
 * Runs automatically before `npm run dev` and `npm run build`.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const dir = join(root, "content/products");
const out = join(root, "src/lib/catalogue.generated.json");

const COLLECTIONS = ["new-arrivals", "festive-edit", "zari-and-buti", "embroidered", "everyday-elegance"];
const blank = (v) => (typeof v === "string" && v.trim() !== "" ? v.trim() : null);

const problems = [];
const entries = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const slug = file.replace(/\.json$/, "");
  const where = `content/products/${file}`;
  let p;
  try {
    p = JSON.parse(readFileSync(join(dir, file), "utf8"));
  } catch (e) {
    problems.push(`${where}: not valid JSON (${e.message})`);
    continue;
  }
  if (p.hidden) continue;

  if (!blank(p.name)) problems.push(`${where}: missing name`);
  if (!Array.isArray(p.images) || p.images.length === 0) problems.push(`${where}: needs at least one photo`);
  const unknown = (p.collections ?? []).filter((c) => !COLLECTIONS.includes(c));
  if (unknown.length) problems.push(`${where}: unknown collection(s) ${unknown.join(", ")}`);

  const images = [];
  for (const img of p.images ?? []) {
    try {
      const { width, height } = await sharp(join(root, "public", img.src)).metadata();
      images.push({ src: img.src, alt: blank(img.alt) ?? p.name, width, height });
    } catch {
      problems.push(`${where}: photo not found in public/: ${img.src}`);
    }
  }

  const price = p.price === "" || p.price == null ? null : Number(p.price);
  entries.push({
    slug,
    name: p.name,
    nameIsPlaceholder: Boolean(p.nameIsPlaceholder),
    price: Number.isFinite(price) ? price : null,
    images,
    colours: (p.colours ?? []).filter((c) => blank(c.name)).map((c) => ({ name: c.name, hex: c.hex || "#c5a059" })),
    description: p.description ?? "",
    fabric: blank(p.fabric),
    weave: blank(p.weave),
    length: blank(p.length),
    blousePiece: blank(p.blousePiece),
    care: blank(p.care),
    collections: p.collections ?? [],
    added: String(p.added ?? ""),
    rank: Number(p.featuredOrder) || 99,
    ...(blank(p.badge) && { badge: blank(p.badge) }),
    ...(blank(p.instagramUrl) && { instagramUrl: blank(p.instagramUrl) }),
  });
}

if (problems.length) {
  console.error(`\nCatalogue has problems:\n  - ${problems.join("\n  - ")}\n`);
  process.exit(1);
}

// newest first → listedOrder 1, 2, 3…
entries.sort((a, b) => b.added.localeCompare(a.added) || a.slug.localeCompare(b.slug));
const products = entries.map((p, i) => {
  delete p.added;
  return { ...p, listedOrder: i + 1 };
});

writeFileSync(out, JSON.stringify(products, null, 2) + "\n");
console.log(`Catalogue: ${products.length} sarees → src/lib/catalogue.generated.json`);
