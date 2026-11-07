import Link from "next/link";
import { site } from "@/lib/site";
import { collections } from "@/lib/products";
import { whatsappLink } from "@/lib/format";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      ...collections.slice(0, 4).map((c) => ({ label: c.name, href: `/shop?collection=${c.slug}` })),
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "About SAAJ",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Handloom & Craft", href: "/handloom-craft" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/contact#faq" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-ivory-100">
      <div className="container-saaj grid gap-12 py-16 md:py-20 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-6 font-display text-2xl leading-snug text-ivory-50 italic">“{site.bioLine}”</p>
          <div className="mt-7 flex gap-3">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SAAJ on Instagram"
              className="grid size-11 place-items-center rounded-full border border-ivory-50/25 transition hover:border-gold-400 hover:text-gold-400"
            >
              <InstagramIcon size={19} />
            </a>
            <a
              href={whatsappLink("Hello SAAJ!")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with SAAJ on WhatsApp"
              className="grid size-11 place-items-center rounded-full border border-ivory-50/25 transition hover:border-gold-400 hover:text-gold-400"
            >
              <WhatsAppIcon size={19} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow mb-5 font-sans !text-gold-400">{col.title}</h2>
              <ul className="space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-ivory-100/80 transition hover:text-ivory-50">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="eyebrow mb-5 font-sans !text-gold-400">Contact</h2>
            <ul className="space-y-3 text-sm text-ivory-100/80">
              <li>
                <a href={`tel:+${site.whatsappNumber}`} className="hover:text-ivory-50">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all hover:text-ivory-50">
                  {site.email}
                </a>
                {site.emailIsPlaceholder && <span className="block text-[0.7rem] text-gold-400/80">(placeholder)</span>}
              </li>
              <li>{site.address}</li>
              <li>{site.policies.shipping}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory-50/10">
        <div className="container-saaj flex flex-col gap-2 py-6 text-[0.72rem] tracking-wide text-ivory-100/60 sm:flex-row sm:justify-between">
          <p>© 2026 {site.fullName}. All rights reserved.</p>
          <p>Handloom · Made with love in India</p>
        </div>
      </div>
    </footer>
  );
}
