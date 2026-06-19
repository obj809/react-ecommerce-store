// netlify/functions/create-checkout-session.js
//
// Creates a Stripe Checkout Session (hosted) for the current cart and returns
// its redirect URL. Prices are read from Firestore SERVER-SIDE — amounts sent
// by the browser are never trusted. Test-mode only (see _lib/stripe.js).

import { FieldValue } from "firebase-admin/firestore";
import { stripe } from "./_lib/stripe.js";
import { db } from "./_lib/firebaseAdmin.js";

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let items;
  try {
    ({ items } = JSON.parse(event.body || "{}"));
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return json(400, { error: "No items provided" });
  }

  try {
    // Build line items from authoritative Firestore data. We re-read each
    // product and use its stored name/price/image — never the client's values.
    const lineItems = [];
    const purchasedIds = [];

    for (const item of items) {
      const id = item?.id;
      const quantity = Number(item?.quantityInCart);

      if (!id || !Number.isInteger(quantity) || quantity <= 0) {
        return json(400, { error: `Invalid cart item: ${id ?? "unknown"}` });
      }

      const snap = await db.collection("products").doc(id).get();
      if (!snap.exists) {
        return json(400, { error: `Product not found: ${id}` });
      }

      const product = snap.data();
      const price = Number(product.price);
      if (!Number.isFinite(price) || price <= 0) {
        return json(400, { error: `Product has no valid price: ${id}` });
      }

      lineItems.push({
        quantity,
        price_data: {
          currency: "usd",
          // Stripe expects the smallest currency unit (cents).
          unit_amount: Math.round(price * 100),
          product_data: {
            name: product.name,
            ...(product.imageUrl ? { images: [product.imageUrl] } : {}),
          },
        },
      });
      purchasedIds.push(id);
    }

    // Touch each purchased cart doc so the reservation sweep treats this cart as
    // active — an in-progress checkout must not be swept back to stock while the
    // customer is on Stripe's hosted page (see cart-reservation-sweep.js).
    const touch = db.batch();
    for (const id of purchasedIds) {
      touch.update(db.collection("cart").doc(id), {
        updatedAt: FieldValue.serverTimestamp(),
      });
    }
    await touch.commit();

    // Origin of the request, used to build absolute return URLs.
    const origin =
      event.headers.origin ||
      (event.headers.host ? `https://${event.headers.host}` : "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      // The webhook reads this to know which cart docs to clear on success.
      metadata: { cartItemIds: purchasedIds.join(",") },
    });

    return json(200, { url: session.url });
  } catch (err) {
    console.error("create-checkout-session failed:", err);
    return json(500, { error: "Could not create checkout session" });
  }
};
