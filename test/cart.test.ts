import test from "node:test";
import assert from "node:assert/strict";
import { applyDiscounts, subtotal, type Cart } from "../src/cart.js";

const coffee: Cart = {
  items: [
    { sku: "COFFEE-1KG", name: "House blend, 1 kg", priceCents: 1500, quantity: 1 },
  ],
  codes: [],
};

test("an empty cart costs nothing", () => {
  assert.equal(subtotal({ items: [], codes: [] }), 0);
  assert.equal(applyDiscounts({ items: [], codes: [] }), 0);
});

test("subtotal multiplies price by quantity", () => {
  const cart: Cart = {
    items: [
      { sku: "COFFEE-1KG", name: "House blend, 1 kg", priceCents: 1500, quantity: 2 },
      { sku: "MUG", name: "Ceramic mug", priceCents: 900, quantity: 1 },
    ],
    codes: [],
  };
  assert.equal(subtotal(cart), 3900);
});

test("SAVE10 takes ten dollars off", () => {
  assert.equal(applyDiscounts({ ...coffee, codes: ["SAVE10"] }), 500);
});

test("WELCOME5 takes five dollars off", () => {
  assert.equal(applyDiscounts({ ...coffee, codes: ["WELCOME5"] }), 1000);
});

test("stacked codes each apply once", () => {
  assert.equal(applyDiscounts({ ...coffee, codes: ["SAVE10", "WELCOME5"] }), 0);
});

test("an unknown code is ignored", () => {
  assert.equal(applyDiscounts({ ...coffee, codes: ["NOT-A-CODE"] }), 1500);
});

test("a repeated code is applied only once", () => {
  assert.equal(applyDiscounts({ ...coffee, codes: ["SAVE10", "SAVE10"] }), 500);
});

test("a discount larger than the subtotal floors the total at zero", () => {
  const cheap: Cart = {
    items: [
      { sku: "MUG", name: "Ceramic mug", priceCents: 500, quantity: 1 },
    ],
    codes: ["SAVE10"],
  };
  assert.equal(applyDiscounts(cheap), 0);
});
