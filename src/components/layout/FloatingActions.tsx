"use client";

import { whatsappLink } from "@/lib/format";
import { useStore } from "@/components/store/StoreProvider";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Floating WhatsApp shortcut (desktop; phones use the tab bar) + transient toast. */
export function FloatingActions() {
  const { toast } = useStore();
  return (
    <>
      <a
        href={whatsappLink("Hello SAAJ! I'd like to know more about your sarees.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SAAJ on WhatsApp"
        className="fixed right-6 bottom-6 z-40 hidden size-14 place-items-center rounded-full bg-[#1f7a4d] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition hover:scale-105 lg:grid"
      >
        <WhatsAppIcon size={28} />
      </a>
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4">
        {toast && (
          <p className="animate-fade-up bg-navy-900 px-5 py-3 text-xs tracking-[0.15em] text-ivory-50 uppercase shadow-lg">{toast}</p>
        )}
      </div>
    </>
  );
}
