import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { StoreProvider } from "@/components/store/StoreProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickView } from "@/components/product/QuickView";
import { ReelViewerProvider } from "@/components/reels/ReelViewer";
import { getReels } from "@/lib/reels.server";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Handloom Sarees`,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  keywords: ["handloom sarees", "SAAJ", "Threads of Tradition", "Indian sarees", "zari border saree", "buy sarees online India"],
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_IN",
    images: [{ url: "/ig/rani-pink-buti.jpg", width: 480, height: 640, alt: "Rani pink saree by SAAJ" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1d2a4f",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.fullName,
  url: site.url,
  logo: `${site.url}/brand/saaj-logo.jpg`,
  sameAs: [site.instagram.url],
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Sanquelim", addressRegion: "Goa", addressCountry: "IN" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${site.whatsappNumber}`,
    email: site.email,
    contactType: "customer service",
    areaServed: "IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(3.75rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only z-[100] bg-navy-800 px-4 py-3 text-ivory-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <StoreProvider>
          <ReelViewerProvider reels={getReels()}>
            <AnnouncementBar />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <SearchDialog />
            <QuickView />
            <FloatingActions />
            <MobileTabBar />
          </ReelViewerProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
