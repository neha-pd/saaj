import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The philosophy behind ${site.fullName} — ${site.bioLine}.`,
  alternates: { canonical: "/our-story" },
};

const pillars = [
  {
    title: "Rooted in the loom",
    text: "We believe a saree should carry the hand that made it — the slight life in the weave, the depth of a border built thread by thread.",
  },
  {
    title: "Chosen, not mass-produced",
    text: "Every piece is picked for its colour, its drape and its character. If we wouldn't treasure it ourselves, it doesn't come to you.",
  },
  {
    title: "Personal, always",
    text: "We take every order in conversation — on WhatsApp or Instagram — so you can ask, see more photos and choose with confidence.",
  },
  {
    title: "Timeless over trend",
    text: "A good handloom saree outlives seasons. We look for pieces you'll reach for for years, and perhaps pass on.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={
          <>
            The warmth of handloom,
            <span className="block italic text-rose-600">the grace of you.</span>
          </>
        }
        crumbs={[{ label: "Our Story" }]}
      />

      <section className="container-saaj grid items-center gap-12 pb-20 md:pb-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px]">
            <Image src="/ig/lilac-embroidered.jpg" alt="Woman in a lilac embroidered saree in a garden" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={100} className="prose-saaj">
          <p className="!font-display !text-2xl !leading-snug !text-navy-800 italic">
            SAAJ means adornment — and to us, the most beautiful adornment is one made slowly, by hand.
          </p>
          <Placeholder>Confirm the meaning of “SAAJ” and the brand&rsquo;s founding story</Placeholder>
          <p className="mt-6">
            <strong className="font-medium text-navy-800">{site.fullName}</strong> began with a simple love: for the
            way a handloom saree falls, for the glint of zari at its border, and for the women who wear them with quiet
            confidence. Our tagline says it best — <em>{site.bioLine.toLowerCase()}</em>.
          </p>
          <p>
            Today we share our sarees across India, and you&rsquo;ll often find us in person at exhibitions, where
            nothing makes us happier than watching someone find &ldquo;the one&rdquo;.
          </p>
          <p>
            <Placeholder>Add founder name, photo &amp; personal note</Placeholder>
          </p>
        </Reveal>
      </section>

      <section className="bg-navy-800 py-20 text-ivory-50 md:py-28">
        <div className="container-saaj">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-400">What we believe</p>
            <h2 className="mt-4 text-4xl !text-ivory-50 md:text-5xl">A philosophy woven in</h2>
            <Ornament onDark className="mx-auto mt-5" />
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden bg-ivory-50/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li key={p.title} className="bg-navy-800 p-8">
                <span className="font-display text-4xl text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl !text-ivory-50">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-100/75">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-saaj grid gap-10 py-20 md:grid-cols-2 md:py-28 lg:gap-20">
        <Reveal className="prose-saaj order-2 md:order-1">
          <h2>Why preserving the weave matters</h2>
          <p>
            Handloom weaving is among India&rsquo;s oldest living crafts. Each region has developed its own
            vocabulary of motifs, borders and techniques, passed between generations of weaving families.
          </p>
          <p>
            Every handloom saree bought is a vote for that knowledge to continue — for looms to keep working, and for
            the patience and artistry behind them to be valued.
          </p>
          <p>
            <Placeholder>Add details of the weaving clusters / artisans SAAJ works with</Placeholder>
          </p>
          <Link href="/handloom-craft" className="btn-outline mt-4">
            Discover the craft
          </Link>
        </Reveal>
        <Reveal delay={100} className="order-1 grid grid-cols-2 gap-3 md:order-2">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden">
            <Image src="/ig/embroidered-stack.jpg" alt="Stack of hand-embroidered fabrics" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src="/ig/peacock-blue-pallu.jpg" alt="Peacock blue saree with a motif pallu, draped on a stand" fill sizes="(min-width: 768px) 22vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src="/ig/rani-pink-buti.jpg" alt="Rani pink saree with gold butis" fill sizes="(min-width: 768px) 22vw, 50vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="bg-ivory-200 py-20 text-center">
        <div className="container-saaj">
          <p className="mx-auto max-w-2xl font-display text-3xl leading-snug text-navy-800 italic md:text-4xl">
            “Timeless elegance isn&rsquo;t found in trends — it&rsquo;s woven, slowly, by hand.”
          </p>
          <Link href="/shop" className="btn-primary mt-10">
            Explore the collection
          </Link>
        </div>
      </section>
    </>
  );
}
