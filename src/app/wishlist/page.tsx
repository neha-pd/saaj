import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WishlistView } from "@/components/store/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader eyebrow="Saved for later" title="Your Wishlist" crumbs={[{ label: "Wishlist" }]} compact />
      <WishlistView />
    </>
  );
}
