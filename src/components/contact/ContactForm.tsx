"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/format";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Works today by handing the message to WhatsApp (SAAJ's existing channel).
 * TODO(launch): optionally also POST to a form backend / email service
 * (Formspree, Resend, etc.) via a server action.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = data.get("name")?.toString().trim() ?? "";
        const phone = data.get("phone")?.toString().trim() ?? "";
        const topic = data.get("topic")?.toString() ?? "";
        const message = data.get("message")?.toString().trim() ?? "";

        const next: Record<string, string> = {};
        if (!name) next.name = "Please tell us your name.";
        if (!message) next.message = "Please write a short message.";
        setErrors(next);
        if (Object.keys(next).length) return;

        const header = [`Hello SAAJ! I'm ${name}.`, topic && `Topic: ${topic}`, phone && `Phone: ${phone}`].filter(Boolean);
        const text = [...header, "", message].join("\n");
        window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={errors.name} autoComplete="name" required />
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="topic" className="eyebrow mb-2 block text-navy-800">
          I&rsquo;d like to ask about
        </label>
        <select id="topic" name="topic" className="field">
          <option>A saree I saw</option>
          <option>Placing an order</option>
          <option>An existing order</option>
          <option>Exhibitions &amp; events</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="eyebrow mb-2 block text-navy-800">
          Message <span className="text-rose-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="field resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-rose-700" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      <button type="submit" className="btn-whatsapp w-full sm:w-auto">
        <WhatsAppIcon size={18} /> Send via WhatsApp
      </button>
      <p className="text-xs text-ink-soft">Your message opens in WhatsApp, ready to send to us.</p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block text-navy-800">
        {label} {required && <span className="text-rose-700">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="field"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
