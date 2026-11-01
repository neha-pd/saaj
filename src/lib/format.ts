import { site } from "./site";
import type { Product } from "./products";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number | null) {
  return price == null ? "Price on request" : inr.format(price);
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryMessage(product: Product, colour?: string) {
  return [
    `Hello SAAJ! I'm interested in the ${product.name}${colour ? ` (${colour})` : ""}.`,
    "Could you share the price, fabric details and availability?",
    `${site.url}/products/${product.slug}`,
  ].join("\n");
}

export type OrderLine = { product: Product; colour?: string; qty: number };

export function orderMessage(lines: OrderLine[]) {
  const items = lines.map(
    (l, i) =>
      `${i + 1}. ${l.product.name}${l.colour ? ` – ${l.colour}` : ""} × ${l.qty} (${formatPrice(l.product.price)})`,
  );
  return [
    "Hello SAAJ! I'd like to place an order:",
    "",
    ...items,
    "",
    "Please confirm availability, total and payment details. Thank you!",
  ].join("\n");
}
