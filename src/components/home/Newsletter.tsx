"use client";

import { useState } from "react";
import { Ornament } from "@/components/ui/Ornament";

/**
 * TODO(launch): POST the email to the mailing provider (Mailchimp, Klaviyo,
 * Brevo…) via a server action or route handler. Currently validates and
 * confirms locally only.
 */
export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  return (
    <section className="bg-ivory-200" aria-labelledby="newsletter-title">
      <div className="container-saaj py-14 text-center md:py-16">
        <p className="eyebrow text-rose-600">Newsletter</p>
        <h2 id="newsletter-title" className="mt-2 text-[2.1rem] md:text-[2.6rem]">
          Be a Part of Our Story
        </h2>
        <Ornament className="mx-auto mt-5" />
        <p className="mx-auto mt-5 max-w-md text-ink-soft">
          New arrivals, restocks and exhibition dates — delivered gently to your inbox.
        </p>

        {status === "done" ? (
          <p className="mx-auto mt-6 max-w-md font-display text-2xl text-navy-800 italic" role="status">
            Thank you for joining us. Welcome to the SAAJ family.
          </p>
        ) : (
          <form
            className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const email = new FormData(e.currentTarget).get("email")?.toString() ?? "";
              setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "newsletter-error" : undefined}
              className="field flex-1 !bg-ivory-50"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        )}
        {status === "error" && (
          <p id="newsletter-error" className="mt-3 text-sm text-rose-700" role="alert">
            Please enter a valid email address.
          </p>
        )}
      </div>
    </section>
  );
}
