import { checkout } from "../src/checkout.js";
import type { Cart } from "../src/cart.js";

const cart: Cart = {
  items: [
    { sku: "COFFEE-1KG", name: "House blend, 1 kg", priceCents: 1500, quantity: 1 },
  ],
  codes: ["SAVE10", "SAVE10"],
};

const receipt = checkout(cart);

console.log("demo-shop checkout repro");
console.log("------------------------");
console.log(`subtotal: ${receipt.subtotalCents} cents`);
console.log(`codes:    ${cart.codes.join(", ")}`);
console.log(`total:    ${receipt.totalCents} cents (${receipt.formattedTotal})`);

if (receipt.totalCents < 0) {
  console.log("\nBUG: a repeated promo code drove the total below zero.");
  process.exitCode = 1;
} else {
  console.log("\nOK: the total is not negative.");
}
