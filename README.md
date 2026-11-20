# demo-shop

A tiny storefront used as the disposable target repo for the Slack collaborative-agent POC.
It is intentionally small: one cart module, one checkout module, one test suite.

```bash
pnpm install
pnpm test      # green on main
pnpm repro     # demonstrates the seeded bug
```

## The seeded bug

`applyDiscounts()` in `src/cart.ts` folds over `cart.codes` without deduping.
A fixed-amount promo listed twice is therefore applied twice, and on a small cart the
total goes negative:

```
subtotal: 1500 cents
codes:    SAVE10, SAVE10
total:    -500 cents (-$5.00)
```

`main` stays green because no test covers a repeated code. The repro script is the
only thing that surfaces it.

## Layout

- `src/cart.ts` — cart types, subtotal, discounts.
- `src/checkout.ts` — receipt assembly and money formatting.
- `test/` — `node:test` suites run through `tsx`.
- `scripts/repro.ts` — the negative-total reproduction.
- `approvers.yaml` — Slack user id → GitHub login map used by the bridge.
