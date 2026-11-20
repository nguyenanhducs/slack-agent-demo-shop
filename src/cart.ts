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
 * NOTE: this is the deliberately seeded bug. It folds over `cart.codes`
 * as-is, so a code listed twice is discounted twice. See scripts/repro.ts.
 */
export function applyDiscounts(cart: Cart): number {
  return cart.codes.reduce((total, code) => {
    const amount = DISCOUNTS[code];
    return amount === undefined ? total : total - amount;
  }, subtotal(cart));
}
