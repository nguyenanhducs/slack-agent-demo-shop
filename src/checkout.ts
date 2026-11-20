import { applyDiscounts, subtotal, type Cart } from "./cart.js";

export type Receipt = {
  subtotalCents: number;
  totalCents: number;
  formattedTotal: string;
};

export function checkout(cart: Cart): Receipt {
  const totalCents = applyDiscounts(cart);
  return {
    subtotalCents: subtotal(cart),
    totalCents,
    formattedTotal: formatCents(totalCents),
  };
}

export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}$${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}
