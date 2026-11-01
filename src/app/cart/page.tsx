import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CartContents } from "@/components/cart/CartContents";

export const metadata: Metadata = {
  title: "Your Bag",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader eyebrow="Checkout" title="Your Bag" crumbs={[{ label: "Bag" }]} compact />
      <div className="container-saaj flex max-w-3xl flex-col pb-24">
        <CartContents />
      </div>
    </>
  );
}
