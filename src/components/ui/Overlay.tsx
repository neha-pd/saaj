"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";

/**
 * Accessible modal surface: traps Escape, locks scroll, restores focus.
 * `variant` controls placement (centered dialog, right drawer, left drawer, top sheet).
 */
export function Overlay({
  open,
  onClose,
  label,
  variant = "center",
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  variant?: "center" | "right" | "left" | "top";
  children: React.ReactNode;
  className?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    (panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ?? focusable()[0])?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const els = focusable();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const placement = {
    center: "items-end sm:items-center justify-center sm:p-6",
    right: "justify-end",
    left: "justify-start",
    top: "items-start justify-center",
  }[variant];

  const panel = {
    center: "w-full max-w-5xl max-h-[92vh] animate-fade-up",
    right: "h-full w-full max-w-md animate-slide-in-right",
    left: "h-full w-[86%] max-w-sm animate-slide-in-left",
    top: "w-full animate-fade-in",
  }[variant];

  return (
    <div className={`fixed inset-0 z-[60] flex ${placement}`}>
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 animate-fade-in bg-navy-950/55 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`relative overflow-y-auto bg-ivory-50 shadow-2xl ${panel} ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${label.toLowerCase()}`}
          className="absolute top-3 right-3 z-10 grid size-11 place-items-center text-navy-800 transition hover:text-rose-600"
        >
          <CloseIcon size={22} />
        </button>
        {children}
      </div>
    </div>
  );
}
