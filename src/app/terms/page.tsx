import type { Metadata } from "next";
import { PolicyPage } from "@/components/ui/PolicyPage";
import { Placeholder } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PolicyPage title="Terms & Conditions">
      <p>
        <Placeholder>Template outline only — complete with the legal business name and have it reviewed before launch</Placeholder>
      </p>
      <h2>About these terms</h2>
      <p>
        These terms apply to purchases from {site.fullName}. By placing an order you agree to them.
      </p>
      <h2>Orders</h2>
      <ul>
        <li>Orders are confirmed personally via WhatsApp or Instagram DM.</li>
        <li>An order is accepted only once we confirm availability and receive full payment.</li>
        <li>All orders are prepaid; Cash on Delivery is not available.</li>
      </ul>
      <h2>Product images &amp; colour</h2>
      <p>
        We photograph our sarees as faithfully as we can. Screens vary, and handloom naturally carries slight variations
        in weave and shade.
      </p>
      <h2>Returns</h2>
      <p>All sales are final — we do not accept returns. See Shipping &amp; Returns for details.</p>
      <h2>Governing law</h2>
      <p>
        <Placeholder>Add jurisdiction, legal entity name &amp; registered address</Placeholder>
      </p>
    </PolicyPage>
  );
}
