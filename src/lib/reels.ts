/**
 * SAAJ's Instagram reels. Posters are the reel cover frames; the actual video
 * is played from /public/reels/<code>.mp4 when that file exists
 * (see public/reels/README.md). Without it, the full-screen viewer falls back
 * to Instagram's official embed player.
 */

export type Reel = {
  code: string;
  /** Short label under the story bubble */
  label: string;
  title: string;
  poster: string;
  /** Set at build time by getReels() when /public/reels/<code>.mp4 exists */
  video?: string;
};

export const reelList: Reel[] = [
  { code: "DXoz7VBCOD_", label: "Styling", title: "Draped in crimson", poster: "/ig/red-saree-styling.jpg" },
  { code: "DYJ5ljGIKVg", label: "At the stall", title: "Choosing together at the SAAJ stall", poster: "/ig/stall-shoppers.jpg" },
  { code: "DfJmPtNIr8o", label: "Exhibition", title: "Two more days to shop", poster: "/ig/exhibition-two-days.jpg" },
  { code: "DfEIuIJIGOC", label: "Tarang Utsav", title: "We are at Tarang Utsav, Ponda", poster: "/ig/tarang-utsav.jpg" },
  { code: "De8ikSAI4GQ", label: "Diwali", title: "SAAJ Diwali Special", poster: "/ig/diwali-special.jpg" },
  { code: "DezK1YUIDeo", label: "Stall 70", title: "Diwali Exhibition · Stall 70", poster: "/ig/diwali-exhibition.jpg" },
];

export const reelPermalink = (code: string) => `https://www.instagram.com/reel/${code}/`;
export const reelEmbedUrl = (code: string) => `https://www.instagram.com/reel/${code}/embed/`;
