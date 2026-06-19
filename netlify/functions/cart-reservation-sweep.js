// netlify/functions/cart-reservation-sweep.js
//
// Scheduled sweep that returns abandoned cart reservations to stock.
//
// Stock is reserved at add-to-cart time (products.quantity is decremented), so a
// cart that is never checked out leaves that stock locked indefinitely. Every
// cart mutation stamps `updatedAt`; this job restores any reservation that has
// gone stale (older than RESERVATION_TTL_MS) and zeroes its cart doc.
//
// Scheduled via netlify.toml ([functions."cart-reservation-sweep"].schedule).
// Trigger locally with: netlify functions:invoke cart-reservation-sweep

import { FieldValue } from "firebase-admin/firestore";
import { db } from "./_lib/firebaseAdmin.js";

// How long a reservation may sit untouched before it's swept back to stock.
const RESERVATION_TTL_MS = 30 * 60 * 1000; // 30 minutes

export const handler = async () => {
  const cutoffMs = Date.now() - RESERVATION_TTL_MS;

  // Only docs that actually hold a reservation. Zeroed carts hold no stock.
  const snapshot = await db.collection("cart").where("quantity", ">", 0).get();

  let restored = 0;
  let stamped = 0;
  let skipped = 0;

  for (const cartDoc of snapshot.docs) {
    const updatedAt = cartDoc.get("updatedAt");

    // Legacy reservations made before timestamps existed (or a mutation that
    // somehow skipped the stamp) have no `updatedAt`. Don't nuke them blindly —
    // stamp them now so they age out normally on a later run. This also keeps a
    // deploy from instantly clearing a shopper's current cart.
    if (!updatedAt) {
      await cartDoc.ref.update({ updatedAt: FieldValue.serverTimestamp() });
      stamped += 1;
      continue;
    }

    if (updatedAt.toMillis() > cutoffMs) {
      skipped += 1; // still fresh
      continue;
    }

    const productRef = db.collection("products").doc(cartDoc.id);

    // Transaction so a concurrent add-to-cart or a parallel sweep can't double
    // count: we re-read both docs and re-check staleness inside the lock.
    await db.runTransaction(async (t) => {
      const cartSnap = await t.get(cartDoc.ref);
      const productSnap = await t.get(productRef);

      const cartQuantity = cartSnap.get("quantity") || 0;
      const cartUpdatedAt = cartSnap.get("updatedAt");
      if (cartQuantity <= 0) return; // already cleared
      if (cartUpdatedAt && cartUpdatedAt.toMillis() > cutoffMs) return; // touched since

      if (productSnap.exists) {
        const stock = productSnap.get("quantity") || 0;
        t.update(productRef, { quantity: stock + cartQuantity });
      }
      // Zero the reservation either way; if the product is gone, the stock it
      // held is gone too, but we still release the cart doc.
      t.update(cartDoc.ref, { quantity: 0 });
    });

    restored += 1;
  }

  // Scheduled functions aren't HTTP-invoked, so a statusCode/body return is
  // ignored by Netlify (and warned about). The summary goes to the logs.
  console.log("cart-reservation-sweep:", { scanned: snapshot.size, restored, stamped, skipped });
};
