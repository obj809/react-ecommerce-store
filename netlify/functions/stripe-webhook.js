// netlify/functions/stripe-webhook.js
//
// Stripe's guaranteed, signature-verified notification of payment events. This
// is the source of truth for fulfillment — NOT the browser success redirect,
// which can be missed if the customer closes the tab.
//
// On checkout.session.completed we zero the purchased cart docs. We do NOT
// restore products.quantity: stock was already decremented when the item was
// added to the cart (reserved), and a completed payment means it is now sold.

import { stripe } from "./_lib/stripe.js";
import { db } from "./_lib/firebaseAdmin.js";

export const handler = async (event) => {
  const signature = event.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set.");
    return { statusCode: 500, body: "Webhook not configured" };
  }

  // Signature verification needs the EXACT raw bytes — Netlify may base64-encode
  // the body, so reconstruct the original buffer before constructEvent.
  const rawBody = Buffer.from(
    event.body || "",
    event.isBase64Encoded ? "base64" : "utf8"
  );

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    const cartItemIds = (session.metadata?.cartItemIds || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    try {
      // Clear the purchased cart docs (quantity -> 0) without touching stock.
      const batch = db.batch();
      for (const id of cartItemIds) {
        batch.update(db.collection("cart").doc(id), { quantity: 0 });
      }

      // Record the order for history / fulfillment reference.
      batch.set(db.collection("orders").doc(session.id), {
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email ?? null,
        paymentStatus: session.payment_status,
        cartItemIds,
        createdAt: new Date().toISOString(),
      });

      await batch.commit();
      console.log(`Order ${session.id} fulfilled; cleared cart items:`, cartItemIds);
    } catch (err) {
      // Returning 500 makes Stripe retry, which is the desired behavior if the
      // Firestore write failed transiently.
      console.error("Failed to finalize order:", err);
      return { statusCode: 500, body: "Failed to finalize order" };
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
