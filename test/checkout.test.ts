import test from "node:test";
import assert from "node:assert/strict";
import { checkout, formatCents } from "../src/checkout.js";
import type { Cart } from "../src/cart.js";

const cart: Cart = {
  items: [
    { sku: "COFFEE-1KG", name: "House blend, 1 kg", priceCents: 1500, quantity: 1 },
  ],
  codes: ["SAVE10"],
};

test("checkout reports subtotal and total", () => {
  const receipt = checkout(cart);
  assert.equal(receipt.subtotalCents, 1500);
  assert.equal(receipt.totalCents, 500);
  assert.equal(receipt.formattedTotal, "$5.00");
});

test("formatCents renders whole dollars and cents", () => {
  assert.equal(formatCents(0), "$0.00");
  assert.equal(formatCents(5), "$0.05");
  assert.equal(formatCents(1234), "$12.34");
});
