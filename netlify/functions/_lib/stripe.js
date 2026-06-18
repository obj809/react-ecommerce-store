// netlify/functions/_lib/stripe.js
//
// Shared Stripe client with a TEST-MODE GUARDRAIL.
//
// This store is intentionally test-only: no real money may be exchanged. The
// guardrail refuses to start unless STRIPE_SECRET_KEY is a test key
// (sk_test_...). Going live later is a deliberate key swap to sk_live_... and
// nothing else — there is no code path here that can charge a real card by
// accident.

import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set.");
}

if (!secretKey.startsWith("sk_test_")) {
  throw new Error(
    "TEST-MODE GUARDRAIL: STRIPE_SECRET_KEY must be a test key (sk_test_...). " +
      "This store is configured for Stripe test mode only — live keys are refused on purpose."
  );
}

export const stripe = new Stripe(secretKey);
