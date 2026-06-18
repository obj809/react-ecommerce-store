// netlify/functions/_lib/firebaseAdmin.js
//
// Initializes firebase-admin once per warm Lambda and exposes the Firestore
// handle. Functions use the Admin SDK (not the Web SDK) because they perform
// trusted server-side reads/writes — authoritative product prices and clearing
// the cart after a verified payment.
//
// Requires the FIREBASE_SERVICE_ACCOUNT env var: the full service-account JSON
// (from the Firebase console → Project settings → Service accounts), stringified.

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT is not set — add the service-account JSON (stringified) to the environment."
    );
  }
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT is not valid JSON — paste the service-account file contents as a single string."
    );
  }
}

// getApps() guards against re-initializing on a reused (warm) function instance.
const app = getApps().length
  ? getApps()[0]
  : initializeApp({ credential: cert(getServiceAccount()) });

export const db = getFirestore(app);
