/**
 * Product catalogue.
 *
 * Sarees live in content/products/<slug>.json and are edited through the /admin
 * page (Sveltia CMS). scripts/build-catalogue.mjs turns them into
 * catalogue.generated.json before every dev/build run.
 *
 * Empty price, fabric, weave, length, blouse piece and care become `null`, which
 * the UI renders as "Details on request" rather than guessing.
 */
import catalogue from "./catalogue.generated.json";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Colour = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  /** true while the name is a working title rather than SAAJ's own product name */
  nameIsPlaceholder: boolean;
  /** INR. null = price not yet published ("Price on request"). */
  price: number | null;
  images: ProductImage[];
  colours: Colour[];
  /** What can be seen in the photograph — no claims about material or origin. */
  description: string;
  fabric: string | null;
  weave: string | null;
  length: string | null;
  blousePiece: string | null;
  care: string | null;
  collections: CollectionSlug[];
  /** Lower = more recently posted on Instagram. Used for "Newest". */
  listedOrder: number;
  /** Manual ranking used for "Popularity" until real sales/analytics data exist. */
  rank: number;
  badge?: string;
  instagramUrl?: string;
};

/** Keep in sync with COLLECTIONS in scripts/build-catalogue.mjs and public/admin/config.yml. */
export type CollectionSlug =
  | "new-arrivals"
  | "festive-edit"
  | "zari-and-buti"
  | "embroidered"
  | "everyday-elegance";

export type Collection = {
  slug: CollectionSlug;
  name: string;
  blurb: string;
  image: ProductImage;
};

/**
 * PLACEHOLDER taxonomy, grouped by what is visible in the photographs.
 * Rename / regroup once SAAJ confirms its own collection names.
 */
export const collections: Collection[] = [
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    blurb: "Fresh from the loom and newly restocked.",
    image: {
      src: "/ig/navy-zari-buti.jpg",
      alt: "Navy saree with gold butis and a zari-toned border laid on a jute mat",
      width: 480,
      height: 640,
    },
  },
  {
    slug: "festive-edit",
    name: "Festive Edit",
    blurb: "Rich colour and gleaming borders for celebrations.",
    image: {
      src: "/ig/peacock-blue-pallu.jpg",
      alt: "Peacock blue saree with a silver-toned border and colourful motif pallu draped on a mannequin",
      width: 480,
      height: 640,
    },
  },
  {
    slug: "zari-and-buti",
    name: "Zari & Buti",
    blurb: "Scattered motifs and shimmering borders.",
    image: {
      src: "/ig/rani-pink-buti.jpg",
      alt: "Woman wearing a rani pink saree with gold butis and a gold border",
      width: 480,
      height: 640,
    },
  },
  {
    slug: "embroidered",
    name: "Embroidered",
    blurb: "Thread-work florals with a handmade touch.",
    image: {
      src: "/ig/embroidered-stack.jpg",
      alt: "Stack of colourful fabrics with hand-embroidered floral vines and sequins",
      width: 640,
      height: 640,
    },
  },
  {
    slug: "everyday-elegance",
    name: "Everyday Elegance",
    blurb: "Soft drapes for days that deserve grace.",
    image: {
      src: "/ig/lilac-embroidered.jpg",
      alt: "Woman in a soft lilac saree with tonal embroidery standing in a garden",
      width: 480,
      height: 640,
    },
  },
];

/** Built from content/products/*.json by scripts/build-catalogue.mjs (edit sarees at /admin). */
export const products = catalogue as Product[];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function productsInCollection(slug: CollectionSlug) {
  return products.filter((p) => p.collections.includes(slug));
}

export function relatedProducts(product: Product, limit = 4) {
  const shared = products.filter(
    (p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)),
  );
  const rest = products.filter((p) => p.slug !== product.slug && !shared.includes(p));
  return [...shared, ...rest].slice(0, limit);
}

export const NOT_SPECIFIED = "Not yet specified";
