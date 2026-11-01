import Image from "next/image";
import { instagramPermalink, instagramPosts, type InstagramPost } from "@/lib/instagram";
import { InstagramIcon } from "@/components/ui/Icons";

/**
 * Editorial mosaic of saree photographs from Instagram. Spans tile together on
 * a 2-column (mobile) and 4-column (desktop) grid with dense packing.
 */
const spans = [
  "row-span-2",
  "md:col-start-2 md:row-start-1",
  "md:col-start-2 md:row-start-2",
  "row-span-2",
  "row-span-2",
];

export function InstagramGallery() {
  return (
    <ul className="grid grid-flow-dense auto-rows-[10rem] grid-cols-2 gap-2 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-3 lg:auto-rows-[15rem]">
      {instagramPosts.map((post, i) => (
        <li key={post.code} className={spans[i % spans.length]}>
          <Tile post={post} />
        </li>
      ))}
    </ul>
  );
}

function Tile({ post }: { post: InstagramPost }) {
  return (
    <a
      href={instagramPermalink(post)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${post.alt} — open on Instagram`}
      className="group relative block h-full overflow-hidden bg-ivory-200"
    >
      <Image
        src={post.image}
        alt={post.alt}
        fill
        sizes="(min-width: 768px) 25vw, 50vw"
        className="object-cover transition duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-105"
      />
      <span className="absolute inset-0 grid place-items-center bg-navy-950/0 text-ivory-50 opacity-0 transition duration-500 group-hover:bg-navy-950/45 group-hover:opacity-100">
        <InstagramIcon size={30} />
      </span>
    </a>
  );
}
