import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { collections, productsInCollection } from "@/lib/products";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Saree Collections",
  description: "Explore SAAJ saree collections — New Arrivals, Festive Edit, Zari & Buti, Embroidered and Everyday Elegance.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Saree collections"
        title={<>Curated with <span className="italic">care</span></>}
        intro="Find your drape by mood and occasion — from scattered butis to shimmering festive borders."
        crumbs={[{ label: "Collections" }]}
      />
      <div className="container-saaj space-y-20 pb-24 md:space-y-28">
        {collections.map((c, i) => {
          const count = productsInCollection(c.slug).length;
          const flip = i % 2 === 1;
          return (
            <Reveal key={c.slug}>
              <article className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <Link
                  href={`/shop?collection=${c.slug}`}
                  className={`group relative block aspect-[4/5] overflow-hidden bg-ivory-200 ${flip ? "md:order-2" : ""} ${i % 3 === 0 ? "md:rounded-t-[999px]" : ""}`}
                >
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-105"
                  />
                </Link>
                <div className={flip ? "md:order-1 md:text-right" : ""}>
                  <p className="eyebrow text-rose-600">
                    {String(i + 1).padStart(2, "0")} · {count} {count === 1 ? "saree" : "sarees"}
                  </p>
                  <h2 className="mt-4 text-4xl md:text-6xl">{c.name}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-ink-soft">{c.blurb}</p>
                  <Link href={`/shop?collection=${c.slug}`} className="btn-outline mt-8">
                    Explore {c.name} <ArrowRightIcon size={16} />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
