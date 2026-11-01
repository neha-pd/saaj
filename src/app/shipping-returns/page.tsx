import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/ui/PolicyPage";
import { Placeholder } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "SAAJ ships across India. Prepaid orders only; all sales are final.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <PolicyPage title="Shipping & Returns">
      <p>
        <Placeholder>Policy summary drafted from SAAJ&rsquo;s Instagram bio — have it reviewed before launch</Placeholder>
      </p>
      <h2>Shipping</h2>
      <ul>
        <li>We ship PAN India — to any deliverable address in India.</li>
        <li>Orders are confirmed personally on WhatsApp or Instagram DM, where we share the final price, shipping charges (if any) and payment details.</li>
        <li>
          Dispatch and delivery timelines are shared when your order is confirmed. <Placeholder>Add standard timelines &amp; courier partners</Placeholder>
        </li>
        <li>
          International shipping: <Placeholder>Confirm whether SAAJ ships outside India</Placeholder>
        </li>
      </ul>

      <h2>Payment</h2>
      <ul>
        <li>All orders are prepaid. We do not offer Cash on Delivery (COD).</li>
      </ul>

      <h2>Returns &amp; exchanges</h2>
      <ul>
        <li>We do not accept returns. All sales are final.</li>
        <li>
          Because handloom is made by hand, slight irregularities in weave and minor colour variation between photographs and
          the actual saree are part of its character, not defects.
        </li>
        <li>
          Please ask us for additional photos or a video before ordering — we&rsquo;re happy to help you choose with confidence.
        </li>
        <li>
          Damaged-in-transit parcels: <Placeholder>Add SAAJ&rsquo;s process (e.g. unboxing video requirement)</Placeholder>
        </li>
      </ul>

      <p className="mt-10">
        Questions? <Link href="/contact" className="text-navy-800 underline underline-offset-4">Contact us</Link>.
      </p>
    </PolicyPage>
  );
}
