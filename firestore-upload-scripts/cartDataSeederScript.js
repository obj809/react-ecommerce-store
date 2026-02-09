import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Firebase configuration
// const firebaseConfig = {
//     apiKey: "XXXXXXXXXXXXXXXX",
//     authDomain: "XXXXXXXXXXXXXXXX",
//     projectId: "XXXXXXXXXXXXXXXX",
//     storageBucket: "XXXXXXXXXXXXXXXX",
//     messagingSenderId: "XXXXXXXXXXXXXXXX",
//     appId: "XXXXXXXXXXXXXXXX"
//   };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedCartCollection = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "productIds.json");
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));

    const cartCollectionRef = collection(db, "cart");

    for (const item of data) {
      const cartItem = {
        product: `/products/${item.id}`,
        quantity: 0
      };
      const cartDocRef = doc(cartCollectionRef, item.id);
      await setDoc(cartDocRef, cartItem);
    }

    console.log("Cart collection seeded successfully!");
  } catch (error) {
    console.error("Error seeding cart collection: ", error);
  }
};

seedCartCollection();
