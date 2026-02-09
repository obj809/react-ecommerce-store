//firebase-service.js

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
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
        quantity: currentCartQuantity
      });
      console.log("Cart updated: Quantity incremented");
    } else {
      await setDoc(cartRef, { quantity: 1, product: productRef });
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
          quantity: newQuantity
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
          quantity: newQuantity
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