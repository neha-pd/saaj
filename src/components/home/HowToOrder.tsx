import Link from "next/link";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Ordering steps — reflects how SAAJ actually sells today (Instagram bio: DM to order, PAN India, no COD, no returns). */
const steps = [
  { title: "Choose your saree", text: "Browse the collection and save the ones you love to your wishlist." },
  { title: "Message us on WhatsApp", text: "Send us the saree in one tap. We confirm price, availability and details personally." },
  { title: "Delivered to your door", text: "We ship across India, carefully packed." },
];

/**
 * Three steps joined by a single gold thread that dips and rises between them,
 * like a weft passing through the warp.
 */
export function HowToOrder() {
  return (
    <section className="relative overflow-hidden bg-ivory-100 py-20 md:py-24" aria-labelledby="order-heading">
      <div className="container-saaj">
        <div className="text-center">
          <p className="eyebrow text-rose-600">Personal shopping</p>
          <h2 id="order-heading" className="mt-3 text-4xl md:text-5xl">
            From our loom <span className="italic">to your hands</span>
          </h2>
        </div>

        <div className="relative mt-16">
          {/* the thread */}
          <svg aria-hidden viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-6 left-0 hidden h-24 w-full text-gold-500 md:block">
            <path d="M0 60 C 150 0, 250 120, 400 60 S 650 0, 800 60 S 1050 120, 1200 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 6" />
          </svg>
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <li key={s.title} className="text-center">
                <span className="relative mx-auto grid size-[4.5rem] place-items-center rounded-full border border-gold-500 bg-ivory-50 font-display text-3xl text-navy-800 italic shadow-[0_0_0_6px_var(--color-ivory-100)]">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-2xl">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink("Hello SAAJ! I'd like to order a saree.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <WhatsAppIcon size={18} /> Order on WhatsApp
            </a>
            <Link href="/shop" className="btn-outline">
              Browse sarees
            </Link>
          </div>
          <p className="text-xs tracking-wide text-ink-soft">
            {site.policies.shipping} · {site.policies.cod} · {site.policies.returns}
          </p>
        </div>
      </div>
    </section>
  );
}
