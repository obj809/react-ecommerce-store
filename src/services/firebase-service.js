//firebase-service.js

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firestore.js";



  export const getAllProducts = async () => {
    const collectionRef = collection(db, "products");
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  };


// Live count of favorited products. Calls `callback(count)` immediately and on
// every change. Returns the onSnapshot unsubscribe function.
export const subscribeToFavoritesCount = (callback) => {
  const productsRef = collection(db, "products");
  return onSnapshot(productsRef, (snapshot) => {
    const count = snapshot.docs.filter((doc) => doc.data().favorited).length;
    callback(count);
  });
};


// Live total number of items in the cart (sum of cart quantities). Calls
// `callback(count)` immediately and on every change; returns the unsubscribe.
export const subscribeToCartCount = (callback) => {
  const cartRef = collection(db, "cart");
  return onSnapshot(cartRef, (snapshot) => {
    const total = snapshot.docs.reduce(
      (sum, doc) => sum + (doc.data().quantity || 0),
      0
    );
    callback(total);
  });
};



  export const getProductById = async (id) => {
  
    const docRef = doc(db, "products", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      throw new Error("Could not find product with id " + id);
    }
    console.log("Product data:", snapshot.data());
    return { id: snapshot.id, ...snapshot.data() };
  };


  export const toggleFavorite = async (product) => {
    const docRef = doc(db, "products", product.id);
    const newFavoritedState = !product.favourited;
    await updateDoc(docRef, {
        favourited: newFavoritedState
    });
    return newFavoritedState;
};


  export const decreaseProductQuantity = async (id) => {
    const docRef = doc(db, "products", id);
    const snapshot = await getDoc(docRef);
    const currentQuantity = snapshot.data().quantity;
    if (currentQuantity > 0) {
        await updateDoc(docRef, {
            quantity: currentQuantity - 1
        });
    } else {
        console.log("No more products in stock");
    }
};


export const incrementCartProductQuantity = async (productId) => {
  const productRef = doc(db, "products", productId);
  const cartRef = doc(db, "cart", productId);

  const productSnapshot = await getDoc(productRef);
  if (!productSnapshot.exists()) {
    throw new Error("Product does not exist");
  }
  const productData = productSnapshot.data();
  
  if (productData.quantity > 0) {
    const cartSnapshot = await getDoc(cartRef);
    if (cartSnapshot.exists()) {
      let currentCartQuantity = cartSnapshot.data().quantity;
      currentCartQuantity += 1;
      await updateDoc(cartRef, {
        quantity: currentCartQuantity,
        updatedAt: serverTimestamp()
      });
      console.log("Cart updated: Quantity incremented");
    } else {
      await setDoc(cartRef, { quantity: 1, product: productRef, updatedAt: serverTimestamp() });
      console.log("New cart item created with quantity set to 1");
    }
  } else {
    console.log("Product quantity is 0, not updating cart.");
  }
};


export const getCartProducts = async () => {
  const cartRef = collection(db, "cart");
  const cartSnapshot = await getDocs(cartRef);

  const filteredCartDocs = cartSnapshot.docs.filter(doc => doc.data().quantity > 0);
  const productIds = filteredCartDocs.map(doc => doc.id);

  const products = await Promise.all(productIds.map(id => getProductById(id)));
  return products.map((product, index) => ({
    ...product,
    quantityInCart: filteredCartDocs[index].data().quantity
  }));
};


export const incrementQuantityInCart = async (productId) => {
  const cartRef = doc(db, "cart", productId);
  const cartSnap = await getDoc(cartRef);
  if (cartSnap.exists()) {
      let newQuantity = cartSnap.data().quantity + 1;
      await updateDoc(cartRef, {
          quantity: newQuantity,
          updatedAt: serverTimestamp()
      });
      console.log("Cart quantity incremented to", newQuantity);
      return newQuantity;
  } else {
      console.log("No cart item found for this product");
      throw new Error("No cart item found");
  }
};

export const decrementProductQuantity = async (productId) => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);
  if (productSnap.exists() && productSnap.data().quantity > 0) {
      let newQuantity = productSnap.data().quantity - 1;
      await updateDoc(productRef, {
          quantity: newQuantity
      });
      console.log("Product stock decremented to", newQuantity);
      return newQuantity;
  } else {
      console.log("No stock available or product does not exist");
      throw new Error("Product out of stock or does not exist");
  }
};


export const decrementQuantityInCart = async (productId) => {
  const cartRef = doc(db, "cart", productId);
  const cartSnap = await getDoc(cartRef);
  if (cartSnap.exists() && cartSnap.data().quantity > 0) {
      let newQuantity = cartSnap.data().quantity - 1;
      await updateDoc(cartRef, {
          quantity: newQuantity,
          updatedAt: serverTimestamp()
      });
      console.log("Cart quantity decremented to", newQuantity);
      return newQuantity;
  } else {
      console.log("No cart item found or quantity is zero");
      throw new Error("No cart item found or quantity is zero");
  }
};

export const incrementProductQuantity = async (productId) => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);
  if (productSnap.exists()) {
      let newQuantity = productSnap.data().quantity + 1;
      await updateDoc(productRef, {
          quantity: newQuantity
      });
      console.log("Product stock incremented to", newQuantity);
      return newQuantity;
  } else {
      console.log("Product does not exist");
      throw new Error("Product does not exist");
  }
};


// Submits a user's star rating (1–5) and returns the new running average.
// Tracks ratingSum + ratingCount on the product and keeps the denormalized
// `rating` field as the average, so all existing display code keeps working.
// Runs in a transaction so concurrent votes don't clobber each other. Products
// that predate this (no ratingCount) seed their existing `rating` as one vote
// so the preassigned value isn't lost on the first real vote.
export const submitProductRating = async (productId, value) => {
  const productRef = doc(db, "products", productId);

  return await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(productRef);
    if (!snapshot.exists()) {
      throw new Error("Product does not exist");
    }

    const data = snapshot.data();
    const tracked = typeof data.ratingCount === "number";
    const count = tracked
      ? data.ratingCount
      : typeof data.rating === "number"
        ? 1
        : 0;
    const sum = tracked
      ? data.ratingSum
      : typeof data.rating === "number"
        ? data.rating
        : 0;

    const newCount = count + 1;
    const newSum = sum + value;
    const newRating = newSum / newCount;

    transaction.update(productRef, {
      ratingSum: newSum,
      ratingCount: newCount,
      rating: newRating,
    });

    console.log(
      `Rating submitted for ${productId}: ${newRating.toFixed(2)} avg over ${newCount} votes`
    );
    return { rating: newRating, ratingCount: newCount };
  });
};


// Calls the Netlify function that creates a Stripe Checkout Session and returns
// its hosted URL. Only ids + quantities are sent — the function re-reads prices
// from Firestore server-side, so the browser's amounts are never trusted.
export const createCheckoutSession = async (items) => {
  const payload = items.map(({ id, quantityInCart }) => ({ id, quantityInCart }));

  const response = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: payload }),
  });

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({}));
    throw new Error(error || "Failed to create checkout session");
  }

  const { url } = await response.json();
  return url;
};


// Sets a cart item to an absolute quantity, keeping product stock in sync.
// Compares the requested increase against the product's CURRENT available
// stock and refuses if there isn't enough. Runs in a transaction so stock and
// cart stay consistent. Returns the new stock + cart quantities.
export const setCartItemQuantity = async (productId, newCartQuantity) => {
  const productRef = doc(db, "products", productId);
  const cartRef = doc(db, "cart", productId);

  return await runTransaction(db, async (transaction) => {
    const productSnap = await transaction.get(productRef);
    const cartSnap = await transaction.get(cartRef);
    if (!productSnap.exists() || !cartSnap.exists()) {
      throw new Error("Product or cart item does not exist");
    }

    const currentStock = productSnap.data().quantity;
    const currentCartQuantity = cartSnap.data().quantity;
    const delta = newCartQuantity - currentCartQuantity;

    // Only an increase consumes stock; compare it against what's available.
    if (delta > currentStock) {
      throw new Error(
        `Only ${currentStock} more in stock for this item.`
      );
    }

    const newStock = currentStock - delta;
    transaction.update(productRef, { quantity: newStock });
    transaction.update(cartRef, {
      quantity: newCartQuantity,
      updatedAt: serverTimestamp(),
    });

    console.log(
      `Cart quantity set to ${newCartQuantity}; stock now ${newStock}`
    );
    return { newProductQuantity: newStock, newCartQuantity };
  });
};


export const removeAllFromCartAndRestore = async (productId) => {
  const cartRef = doc(db, "cart", productId);
  const productRef = doc(db, "products", productId);
  const cartSnap = await getDoc(cartRef);
  const productSnap = await getDoc(productRef);

  if (cartSnap.exists() && productSnap.exists()) {
      const cartQuantity = cartSnap.data().quantity;
      const productQuantity = productSnap.data().quantity;
      
      await updateDoc(productRef, {
          quantity: productQuantity + cartQuantity
      });

      await updateDoc(cartRef, {
          quantity: 0
      });

      console.log("All items removed from cart and restored to stock.");
      return {newProductQuantity: productQuantity + cartQuantity, newCartQuantity: 0};
  } else {
      console.log("Error: Cart item or product does not exist.");
      throw new Error("Cart item or product does not exist");
  }
};