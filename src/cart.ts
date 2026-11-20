export type CartItem = {
  sku: string;
  name: string;
  priceCents: number;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  codes: string[];
};

/** Fixed-amount discounts, in cents. */
export const DISCOUNTS: Readonly<Record<string, number>> = {
  SAVE10: 1000,
  WELCOME5: 500,
};

export function subtotal(cart: Cart): number {
  return cart.items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
}

/**
 * Applies every promo code on the cart and returns the amount due.
 *
 * Each distinct code applies at most once, and the total never drops below
 * zero. See scripts/repro.ts.
 */
export function applyDiscounts(cart: Cart): number {
  const total = [...new Set(cart.codes)].reduce((running, code) => {
    const amount = DISCOUNTS[code];
    return amount === undefined ? running : running - amount;
  }, subtotal(cart));

  return Math.max(0, total);
}
