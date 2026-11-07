import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { CollectionPanels } from "@/components/home/CollectionPanels";
import { HowToOrder } from "@/components/home/HowToOrder";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Marquee } from "@/components/home/Marquee";
import { ReelTheatre } from "@/components/reels/ReelTheatre";
import { Newsletter } from "@/components/home/Newsletter";
import { ProductCard } from "@/components/product/ProductCard";
import { Placeholder, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { InstagramIcon } from "@/components/ui/Icons";

export default function HomePage() {
  const featured = [...products].sort((a, b) => a.rank - b.rank).slice(0, 4);

  return (
    <>
      <Hero />

      <section className="py-12 md:py-16" aria-labelledby="collections-heading">
        <div className="container-saaj text-center">
          <p className="eyebrow text-rose-600">Our collections</p>
          <h2 id="collections-heading" className="mt-2 text-[2.1rem] md:text-[2.6rem]">
            Shop by <span className="italic">collection</span>
          </h2>
          <Ornament className="mx-auto mt-4" />
          <div className="mt-8 md:mt-10">
            <CollectionPanels />
          </div>
        </div>
      </section>

      <Marquee />

      <section className="bg-ivory-100 py-14 md:py-16" aria-labelledby="featured-heading">
        <div className="container-saaj">
          <SectionHeading
            eyebrow="Featured"
            title={<span id="featured-heading">Loved on the loom</span>}
            intro="A few of the sarees our community has been asking about. Prices and details are shared personally on WhatsApp."
          />
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-4">
            {featured.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 90}>
                  <ProductCard product={p} />
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/shop" className="btn-outline">
              Shop all sarees
            </Link>
          </div>
        </div>
      </section>

      <HowToOrder />

      {/* Brand story */}
      <section className="relative overflow-hidden bg-navy-800 text-ivory-50" aria-labelledby="story-heading">
        <div className="container-saaj grid items-center gap-10 py-14 md:py-16 lg:grid-cols-[minmax(0,22rem)_1fr] lg:justify-center lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[18rem] lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px]">
              <Image
                src="/ig/lilac-embroidered.jpg"
                alt="Woman in a soft lilac embroidered saree in a garden"
                fill
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-4 -bottom-5 hidden w-32 border-[6px] border-navy-800 sm:block md:w-36">
              <div className="relative aspect-square">
                <Image src="/ig/embroidered-stack.jpg" alt="Close-up of hand-embroidered fabrics" fill sizes="200px" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-gold-400">Our story</p>
            <h2 id="story-heading" className="mt-2 text-[2.1rem] leading-tight !text-ivory-50 md:text-[2.6rem]">
              The warmth of handloom,
              <span className="block italic text-gold-300">the grace of you.</span>
            </h2>
            <Ornament onDark className="mt-4" />
            <div className="mt-5 max-w-xl space-y-4 leading-[1.75] text-ivory-100/85">
              <p>
                A handloom saree is made one line at a time — each pass of the shuttle a small decision, each border
                a quiet act of patience. It carries something a machine cannot: the rhythm of the hands that wove it.
              </p>
              <p>
                SAAJ exists to bring that warmth to you. We choose sarees we would treasure ourselves — rich zari
                borders, scattered butis, soft everyday drapes — and share them personally, one conversation at a time.
              </p>
              <p>
                <Placeholder>Add SAAJ&rsquo;s founder story &amp; weaver partnerships here</Placeholder>
              </p>
            </div>
            <Link href="/our-story" className="btn-outline-light mt-7">
              Read our story
            </Link>
          </Reveal>
        </div>
      </section>

      <ReelTheatre />

      {/* Saree photographs from Instagram */}
      <section className="py-14 md:py-16" aria-labelledby="instagram-heading">
        <div className="container-saaj">
          <SectionHeading
            eyebrow={`@${site.instagram.handle}`}
            title={<span id="instagram-heading">From our Instagram</span>}
            intro="Sarees as they arrive — photographed by us, loved by you."
          />
          <div className="mt-8">
            <InstagramGallery />
          </div>
          <div className="mt-8 text-center">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <InstagramIcon size={18} /> Follow us on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials — placeholders until genuine reviews are supplied */}
      <section className="bg-ivory-100 py-14 md:py-16" aria-labelledby="reviews-heading">
        <div className="container-saaj">
          <SectionHeading eyebrow="Kind words" title={<span id="reviews-heading">From the SAAJ family</span>} />
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <li key={n}>
                <figure className="flex h-full flex-col border border-sand-300/80 bg-ivory-50 p-8">
                  <span aria-hidden className="font-display text-6xl leading-none text-gold-500">“</span>
                  <blockquote className="mt-2 flex-1 font-display text-xl leading-relaxed text-ink-soft italic">
                    Customer review {n} will appear here.
                  </blockquote>
                  <figcaption className="mt-6 space-y-2">
                    <p className="eyebrow text-navy-800">Customer name</p>
                    <Placeholder>Replace with a genuine review (see the “customer reviews” highlight on Instagram)</Placeholder>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
