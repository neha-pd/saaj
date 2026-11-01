import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, getProduct, products, relatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductCard } from "@/components/product/ProductCard";
import { Swatches } from "@/components/product/Swatches";
import { Placeholder, SectionHeading } from "@/components/ui/SectionHeading";
import { Ornament } from "@/components/ui/Ornament";
import { InstagramIcon } from "@/components/ui/Icons";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map((i) => ({ url: i.src, width: i.width, height: i.height, alt: i.alt })),
    },
  };
}

const DETAILS_ON_REQUEST = "Details on request";

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
  const primaryCollection = collections.find((c) => c.slug === product.collections[0]);

  const specs = [
    { label: "Fabric", value: product.fabric },
    { label: "Weaving technique", value: product.weave },
    { label: "Saree length", value: product.length },
    { label: "Blouse piece", value: product.blousePiece },
  ];

  // Only include `offers` when a real price exists — never publish an invented price.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => `${site.url}${i.src}`),
    brand: { "@type": "Brand", name: site.fullName },
    color: product.colours.map((c) => c.name).join(", "),
    ...(product.fabric && { material: product.fabric }),
    ...(product.price != null && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${site.url}/products/${product.slug}`,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="container-saaj pt-6 pb-20 md:pt-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap gap-2 text-[0.7rem] tracking-[0.18em] text-ink-soft uppercase">
            <li>
              <Link href="/" className="hover:text-navy-800">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/shop" className="hover:text-navy-800">Shop</Link>
            </li>
            {primaryCollection && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`/shop?collection=${primaryCollection.slug}`} className="hover:text-navy-800">
                    {primaryCollection.name}
                  </Link>
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            {product.badge && <p className="eyebrow mb-4 text-rose-600">{product.badge}</p>}
            <h1 className="text-4xl leading-[1.08] md:text-5xl">{product.name}</h1>
            {product.nameIsPlaceholder && (
              <p className="mt-2">
                <Placeholder>Working title — replace with SAAJ&rsquo;s product name</Placeholder>
              </p>
            )}
            <p className={`mt-5 text-2xl ${product.price == null ? "font-display text-rose-700 italic" : "text-ink"}`}>
              {formatPrice(product.price)}
            </p>
            <Ornament className="mt-6" />

            <p className="mt-6 leading-[1.85] text-ink-soft">{product.description}</p>

            <div className="mt-7 flex items-center gap-4">
              <span className="eyebrow text-navy-800">Colours</span>
              <Swatches colours={product.colours} />
              <span className="text-sm text-ink-soft">{product.colours.map((c) => c.name).join(" · ")}</span>
            </div>
            <p className="mt-2 text-xs text-ink-soft">Looking for another colour? Ask us on WhatsApp.</p>

            <div className="mt-8">
              <ProductPurchase product={product} />
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-sand-300 pt-8">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt className="eyebrow text-navy-800">{s.label}</dt>
                  <dd className={`mt-1.5 text-sm ${s.value ? "text-ink" : "text-ink-soft italic"}`}>{s.value ?? DETAILS_ON_REQUEST}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 divide-y divide-sand-300 border-y border-sand-300">
              <details className="group py-5" open>
                <summary className="flex cursor-pointer list-none items-center justify-between eyebrow text-navy-800">
                  Care instructions
                  <span aria-hidden className="text-lg transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {product.care ?? (
                    <>
                      Care guidance for this saree will be shared with your order. <Placeholder>Add verified care instructions</Placeholder>
                    </>
                  )}
                </p>
              </details>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between eyebrow text-navy-800">
                  Delivery &amp; policies
                  <span aria-hidden className="text-lg transition group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
                  <li>{site.policies.shipping} — we ship across India.</li>
                  <li>Prepaid orders only — {site.policies.cod.toLowerCase()}.</li>
                  <li>All sales are final — {site.policies.returns.toLowerCase()}.</li>
                  <li>
                    Delivery timelines are shared when your order is confirmed. <Placeholder>Add standard dispatch &amp; delivery times</Placeholder>
                  </li>
                </ul>
                <Link href="/shipping-returns" className="mt-3 inline-block text-xs tracking-wide text-navy-800 underline underline-offset-4">
                  Read shipping &amp; returns
                </Link>
              </details>
            </div>

            {product.instagramUrl && (
              <a
                href={product.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] text-navy-800 uppercase hover:text-rose-600"
              >
                <InstagramIcon size={16} /> See this saree on Instagram
              </a>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-ivory-100 py-20" aria-labelledby="related-heading">
          <div className="container-saaj">
            <SectionHeading eyebrow="You may also love" title={<span id="related-heading">More from SAAJ</span>} />
            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
