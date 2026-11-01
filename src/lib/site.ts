/**
 * Brand-wide configuration.
 *
 * VERIFIED = taken from the public Instagram profile @saaj_threadsoftradition (Oct 2026).
 * PLACEHOLDER = not yet provided by the brand — must be replaced before launch.
 */

export const site = {
  /**
   * Shows dashed "placeholder" markers wherever real brand info is still
   * missing. Set to false once all placeholders are replaced.
   */
  showPlaceholderNotes: true,
  name: "SAAJ",
  fullName: "SAAJ – Threads of Tradition",
  tagline: "Threads of Tradition",
  // VERIFIED — Instagram bio
  bioLine: "The Warmth of Handloom, The Grace of You",
  description:
    "SAAJ – Threads of Tradition: handloom sarees chosen with love. Shipping across India. Enquire and order on WhatsApp or Instagram.",
  // PLACEHOLDER — set to the production domain before launch
  url: "https://www.saaj.example",

  instagram: {
    handle: "saaj_threadsoftradition",
    url: "https://www.instagram.com/saaj_threadsoftradition/",
  },

  // VERIFIED — WhatsApp contact number confirmed by the brand.
  phoneDisplay: "+91 84469 69189",
  whatsappNumber: "918446969189",

  // VERIFIED — email and address provided by the brand.
  email: "saajthreadsoftradition@gmail.com",
  emailIsPlaceholder: false,
  address: "Sanquelim, Goa",
  addressIsPlaceholder: false,

  // VERIFIED — Instagram bio
  policies: {
    shipping: "Shipping PAN India",
    cod: "No Cash on Delivery",
    returns: "No returns",
    ordering: "Order via Instagram DM or WhatsApp",
  },
} as const;

export type Announcement = {
  text: string;
  href?: string;
  /** ISO date-time; the message is hidden after this moment. */
  expiresAt?: string;
};

export const announcements: Announcement[] = [
  { text: "Shipping across India" },
  {
    text: "Diwali Exhibition · Krantivira Maidan, Ponda, Goa · Stall 70 · till 1 Nov, 11am–8pm",
    href: "https://www.instagram.com/saaj_threadsoftradition/",
    // VERIFIED from the brand's Diwali exhibition posts
    expiresAt: "2026-11-01T20:00:00+05:30",
  },
  { text: "Order on WhatsApp or Instagram DM", href: "/contact" },
];

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Saree Collections", href: "/collections" },
  { label: "Our Story", href: "/our-story" },
  { label: "Handloom & Craft", href: "/handloom-craft" },
  { label: "Contact", href: "/contact" },
] as const;
