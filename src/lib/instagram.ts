/**
 * Saree photographs from @saaj_threadsoftradition, saved locally so the site
 * does not depend on Instagram's expiring CDN links. Reels live in reels.ts.
 *
 * TODO(launch): connect the Instagram Graph API (or a feed service such as
 * Behold / EmbedSocial) to keep this in sync automatically, and replace these
 * 640px thumbnails with full-resolution originals.
 */

export type InstagramPost = {
  code: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

export const instagramPosts: InstagramPost[] = [
  { code: "DfBgJyniIN5", image: "/ig/rani-pink-buti.jpg", alt: "Rani pink saree with gold butis", width: 480, height: 640 },
  { code: "DfHopIliJju", image: "/ig/navy-zari-buti.jpg", alt: "Navy saree with gold butis, back in stock", width: 480, height: 640 },
  { code: "DebJc_2IYWK", image: "/ig/embroidered-stack.jpg", alt: "Stack of hand-embroidered fabrics in bright colours", width: 640, height: 640 },
  { code: "DezNEKhCHOp", image: "/ig/peacock-blue-pallu.jpg", alt: "Peacock blue saree with motif pallu", width: 480, height: 640 },
  { code: "DUycAjDCJ7u", image: "/ig/lilac-embroidered.jpg", alt: "Lilac embroidered saree in a garden", width: 480, height: 640 },
];

export const instagramPermalink = (post: Pick<InstagramPost, "code">) => `https://www.instagram.com/p/${post.code}/`;
