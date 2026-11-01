/**
 * Product catalogue.
 *
 * Every product below is built ONLY from what is visible in SAAJ's own Instagram
 * photographs. Names are descriptive working titles; price, fabric, weave,
 * length, blouse piece and care are left `null` until SAAJ supplies them.
 * The UI renders `null` fields as "Details on request" rather than guessing.
 *
 * TODO(launch): replace this file with the e-commerce backend / CMS feed.
 */

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

const empty = {
  price: null,
  fabric: null,
  weave: null,
  length: null,
  blousePiece: null,
  care: null,
} as const;

export const products: Product[] = [
  {
    ...empty,
    slug: "midnight-navy-zari-buti-saree",
    name: "Midnight Navy Zari Buti Saree",
    nameIsPlaceholder: true,
    images: [
      {
        src: "/ig/navy-zari-buti.jpg",
        alt: "Navy saree with small gold floral butis, a broad zari-toned border and tasselled ends",
        width: 480,
        height: 640,
      },
    ],
    colours: [
      { name: "Navy", hex: "#1f2a8a" },
      { name: "Gold", hex: "#c5a059" },
    ],
    description:
      "A deep navy drape scattered with small gold-toned floral butis, framed by a broad zari-toned border and finished with tasselled ends. Marked “Back in stock” on our Instagram.",
    collections: ["new-arrivals", "zari-and-buti", "everyday-elegance"],
    listedOrder: 1,
    rank: 1,
    instagramUrl: "https://www.instagram.com/p/DfHopIliJju/",
  },
  {
    ...empty,
    slug: "rani-pink-buti-saree",
    name: "Rani Pink Buti Saree",
    nameIsPlaceholder: true,
    images: [
      {
        src: "/ig/rani-pink-buti.jpg",
        alt: "Woman wearing a rani pink saree with gold butis, gold border and a lustrous pallu",
        width: 480,
        height: 640,
      },
    ],
    colours: [
      { name: "Rani Pink", hex: "#c8186b" },
      { name: "Gold", hex: "#c5a059" },
    ],
    description:
      "Vivid rani pink with a lustrous finish, dotted with gold-toned butis and edged with a gleaming gold border — shown here styled with traditional gold jewellery.",
    collections: ["festive-edit", "zari-and-buti"],
    listedOrder: 2,
    rank: 2,
    instagramUrl: "https://www.instagram.com/p/DfBgJyniIN5/",
  },
  {
    ...empty,
    slug: "peacock-blue-motif-pallu-saree",
    name: "Peacock Blue Motif Pallu Saree",
    nameIsPlaceholder: true,
    images: [
      {
        src: "/ig/peacock-blue-pallu.jpg",
        alt: "Peacock blue saree with silver-toned butis, a silver border and a pallu woven with colourful motifs",
        width: 480,
        height: 640,
      },
    ],
    colours: [
      { name: "Peacock Blue", hex: "#1f7fb0" },
      { name: "Silver", hex: "#c9ccd1" },
    ],
    description:
      "A peacock blue drape with silver-toned butis and border, opening into a richly patterned pallu woven with multicolour motifs and finished with tassels.",
    collections: ["festive-edit", "zari-and-buti"],
    listedOrder: 3,
    rank: 3,
    instagramUrl: "https://www.instagram.com/p/DezNEKhCHOp/",
  },
  {
    ...empty,
    slug: "lilac-tonal-embroidered-saree",
    name: "Lilac Tonal Embroidered Saree",
    nameIsPlaceholder: true,
    images: [
      {
        src: "/ig/lilac-embroidered.jpg",
        alt: "Woman in a soft lilac saree covered in tonal floral embroidery, standing in a garden",
        width: 480,
        height: 640,
      },
    ],
    colours: [{ name: "Lilac", hex: "#b99aa6" }],
    description:
      "A soft lilac drape covered in delicate tonal floral embroidery — understated, airy and easy to wear from day to evening.",
    collections: ["embroidered", "everyday-elegance"],
    listedOrder: 4,
    rank: 4,
    instagramUrl: "https://www.instagram.com/p/DUycAjDCJ7u/",
  },
];

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
