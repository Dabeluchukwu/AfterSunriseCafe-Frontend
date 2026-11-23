import { WHATSAPP_LINK } from "./constants";

/**
 * Build the WhatsApp order message.
 * Intentionally omits prices and totals — the owner computes pricing.
 */
export function buildOrderMessage(items, customerName = "") {
  const lines = items.map((i) => `• ${i.qty} × ${i.title}`).join("\n");
  const nameLine = customerName.trim() ? `\n\n— from ${customerName.trim()}` : "";
  return `Hi After Sunrise Bakery! I'd like to order:\n\n${lines}${nameLine}`;
}

/**
 * Build the full wa.me URL with the encoded message.
 */
export function buildOrderUrl(items, customerName = "") {
  const text = buildOrderMessage(items, customerName);
  const base = WHATSAPP_LINK.split("?")[0]; // strip any existing query
  return `${base}?text=${encodeURIComponent(text)}`;
}