import type { Metadata } from "next";
import { PolicyPage } from "@/components/ui/PolicyPage";
import { Placeholder } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy Policy">
      <p>
        <Placeholder>Template outline only — must be completed and legally reviewed (incl. India&rsquo;s DPDP Act, 2023) before launch</Placeholder>
      </p>
      <h2>What this site stores</h2>
      <p>
        Your bag and wishlist are saved only in your own browser (local storage) so they are still there when you return.
        They are not sent to us until you choose to place an order on WhatsApp.
      </p>
      <h2>Information you send us</h2>
      <p>
        When you contact us on WhatsApp, Instagram or by email, we receive the details you share (such as your name, phone
        number and delivery address) and use them only to answer your enquiry and fulfil your order.
      </p>
      <h2>Newsletter</h2>
      <p>
        <Placeholder>Describe the email provider, what is stored, and how to unsubscribe</Placeholder>
      </p>
      <h2>Third-party services</h2>
      <p>
        This site links to WhatsApp and Instagram and may embed Instagram content, which is governed by Meta&rsquo;s own privacy
        policies. <Placeholder>List analytics / payment providers once connected</Placeholder>
      </p>
      <h2>Contact</h2>
      <p>
        <Placeholder>Add grievance officer / privacy contact details</Placeholder>
      </p>
    </PolicyPage>
  );
}
