import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Handloom & Craft",
  description: "Understand the artistry of the handloom saree — warp and weft, zari borders, butis and the pallu.",
  alternates: { canonical: "/handloom-craft" },
};

// General handloom knowledge — no claims about where SAAJ's sarees are made.
const glossary = [
  {
    term: "Warp & weft",
    text: "The lengthwise warp threads are stretched on the loom; the weaver passes the weft across them, one pick at a time. On a handloom, every pass is powered by hand and foot.",
  },
  {
    term: "Zari",
    text: "Metallic thread woven into borders and motifs to give a saree its signature gleam — traditionally gold or silver-toned.",
  },
  {
    term: "Buti",
    text: "Small motifs scattered across the body of the saree — florals, dots or stars — that give it gentle rhythm and texture.",
  },
  {
    term: "Pallu",
    text: "The decorative end of the saree that falls over the shoulder. Often the most elaborate part of the weave.",
  },
  {
    term: "Border",
    text: "The edge that frames the drape. Contrast and zari borders define a saree's character as much as its colour.",
  },
  {
    term: "Hand embroidery",
    text: "Thread-work added by hand after weaving — florals, vines and sequins stitched with a needle, each one slightly unique.",
  },
];

const steps = [
  { n: "01", title: "Yarn & dye", text: "Yarn is prepared and dyed, setting the palette of the final saree." },
  { n: "02", title: "Setting the loom", text: "Thousands of warp threads are set by hand — often a full day's work before weaving can begin." },
  { n: "03", title: "Weaving", text: "Pick by pick, the body, border and pallu take shape. A single saree can take days or weeks." },
  { n: "04", title: "Finishing", text: "Ends are knotted or tasselled, and the saree is checked, folded and readied for you." },
];

export default function CraftPage() {
  return (
    <>
      <PageHeader
        eyebrow="Handloom & craft"
        title={<>The art behind <span className="italic">every drape</span></>}
        intro="A handloom saree is made at the speed of human hands. Here's what goes into the sarees you love."
        crumbs={[{ label: "Handloom & Craft" }]}
      />

      <section className="relative">
        <div className="relative h-[52vh] min-h-[340px] overflow-hidden">
          <Image src="/ig/peacock-blue-pallu.jpg" alt="Detail of a peacock blue saree with a richly woven pallu" fill sizes="100vw" className="object-cover object-[50%_60%]" />
          <div className="absolute inset-0 bg-navy-950/45" />
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <p className="max-w-3xl font-display text-3xl leading-snug text-ivory-50 italic md:text-5xl">
              “Every pass of the shuttle is a small decision.”
            </p>
          </div>
        </div>
      </section>

      <section className="container-saaj py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-rose-600">From yarn to drape</p>
          <h2 className="mt-4 text-4xl md:text-5xl">How a handloom saree is made</h2>
        </div>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 90} className="border-t border-gold-500 pt-6">
                <span className="font-display text-5xl text-gold-500">{s.n}</span>
                <h3 className="mt-3 text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-saaj grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-rose-600">A small glossary</p>
            <h2 className="mt-4 text-4xl md:text-5xl">The language of the loom</h2>
            <div className="relative mt-10 hidden aspect-square max-w-sm overflow-hidden lg:block">
              <Image src="/ig/navy-zari-buti.jpg" alt="Gold butis and zari border on a navy saree" fill sizes="30vw" className="object-cover" />
            </div>
          </div>
          <dl className="divide-y divide-sand-300">
            {glossary.map((g) => (
              <Reveal key={g.term} className="grid gap-2 py-7 sm:grid-cols-[180px_1fr] sm:gap-8">
                <dt className="font-display text-2xl text-navy-800">{g.term}</dt>
                <dd className="leading-relaxed text-ink-soft">{g.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-saaj grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="relative aspect-square overflow-hidden">
          <Image src="/ig/embroidered-stack.jpg" alt="Colourful fabrics with hand-embroidered floral vines" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="prose-saaj">
          <h2 className="!mt-0">Caring for handloom</h2>
          <p>
            Handloom is meant to be worn and loved. A little care keeps it beautiful for years — general guidance
            includes storing sarees folded in soft cotton or muslin, refolding them now and then so creases don&rsquo;t
            set, and keeping zari away from moisture and perfume.
          </p>
          <p>Specific care for each saree depends on its fabric and finish — we&rsquo;ll always share it with your order.</p>
          <Placeholder>Add SAAJ&rsquo;s verified care guide per fabric</Placeholder>
          <div className="mt-8">
            <Link href="/shop" className="btn-primary">Shop handloom</Link>
          </div>
        </div>
      </section>
    </>
  );
}
