import type { Metadata } from "next";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to SAAJ on WhatsApp or Instagram — enquiries, orders and exhibition visits.",
  alternates: { canonical: "/contact" },
};

// Answers are limited to what SAAJ states publicly; open questions are marked.
const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I place an order?",
    a: "Add sarees to your bag and tap “Place order on WhatsApp”, or message us directly on WhatsApp or Instagram DM. We’ll confirm availability, the final price and payment details personally.",
  },
  { q: "Do you ship across India?", a: "Yes — we ship PAN India." },
  { q: "Do you offer Cash on Delivery?", a: "No. All orders are prepaid; we don’t offer COD." },
  {
    q: "Can I return or exchange a saree?",
    a: "We don’t accept returns. Please ask us for extra photos, videos or details before ordering — we’re always happy to help you choose.",
  },
  {
    q: "How long does delivery take?",
    a: (
      <>
        We’ll share the expected timeline when your order is confirmed. <Placeholder>Add standard dispatch &amp; delivery times</Placeholder>
      </>
    ),
  },
  {
    q: "Which payment methods do you accept?",
    a: (
      <>
        Payment details are shared on WhatsApp when we confirm your order. <Placeholder>List accepted methods (UPI, bank transfer…)</Placeholder>
      </>
    ),
  },
  {
    q: "Where can I see your sarees in person?",
    a: "We regularly take part in exhibitions — follow us on Instagram for dates and stall numbers.",
  },
];

export default function ContactPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => typeof f.a === "string")
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <PageHeader
        eyebrow="Contact"
        title={<>We&rsquo;d love to <span className="italic">hear from you</span></>}
        intro="Questions about a saree, an order, or where to find us next — we reply personally."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-saaj grid gap-14 pb-20 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div className="space-y-8">
          <div className="bg-navy-800 p-8 text-ivory-50 md:p-10">
            <p className="eyebrow text-gold-400">Fastest reply</p>
            <h2 className="mt-3 text-3xl !text-ivory-50">Chat on WhatsApp</h2>
            <p className="mt-3 text-sm leading-relaxed text-ivory-100/80">
              Ask for more photos, check availability or place an order.
            </p>
            <a href={whatsappLink("Hello SAAJ!")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6 w-full sm:w-auto">
              <WhatsAppIcon size={18} /> {site.phoneDisplay}
            </a>
          </div>

          <dl className="space-y-6">
            <div>
              <dt className="eyebrow text-rose-600">Instagram</dt>
              <dd className="mt-2">
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-2xl text-navy-800 hover:text-rose-600">
                  <InstagramIcon size={20} /> @{site.instagram.handle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-rose-600">Phone</dt>
              <dd className="mt-2">
                <a href={`tel:+${site.whatsappNumber}`} className="font-display text-2xl text-navy-800 hover:text-rose-600">
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-rose-600">Email</dt>
              <dd className="mt-2 space-y-1">
                <a href={`mailto:${site.email}`} className="block font-display text-xl break-all text-navy-800 hover:text-rose-600 sm:text-2xl">
                  {site.email}
                </a>
                {site.emailIsPlaceholder && <Placeholder>Placeholder — add SAAJ&rsquo;s email</Placeholder>}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-rose-600">Address</dt>
              <dd className="mt-2 space-y-1">
                <p className="font-display text-2xl text-navy-800">{site.address}</p>
                {site.addressIsPlaceholder && <Placeholder>Placeholder — add business address</Placeholder>}
              </dd>
            </div>
          </dl>
        </div>

        <div className="border border-sand-300/80 bg-ivory-100 p-6 md:p-10">
          <h2 className="text-3xl">Send us a message</h2>
          <p className="mt-2 mb-8 text-sm text-ink-soft">Fields marked * are required.</p>
          <ContactForm />
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-ivory-100 py-20 md:py-24" aria-labelledby="faq-heading">
        <div className="container-saaj max-w-3xl">
          <p className="eyebrow text-center text-rose-600">Good to know</p>
          <h2 id="faq-heading" className="mt-4 text-center text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <div className="mt-12 divide-y divide-sand-300 border-y border-sand-300">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-navy-800 md:text-2xl">
                  {f.q}
                  <span aria-hidden className="shrink-0 text-2xl text-gold-700 transition group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 leading-relaxed text-ink-soft">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
