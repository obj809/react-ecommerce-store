import admin from 'firebase-admin';
import serviceAccount from './path/to/your-service-account-file.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com'
});

const db = admin.firestore();

const products = [
  {
    id: "1",
    name: "Men's Down Jacket",
    price: 199.99,
    discountedPrice: 149.99,
    size: "L",
    sizes: ["S", "M", "L", "XL"],
    availability: true,
    quantity: 10,
    imageUrl: "/images/mens_down_jacket.jpg",
    gender: "Men",
    featured: true,
    favorited: false,
    offer: "Winter Sale",
    offerEndDate: "2024-12-31"
  },
];

products.forEach(async (product) => {
  try {
    await db.collection('products').doc(product.id).set(product);
    console.log(`Product ${product.name} added successfully.`);
  } catch (error) {
    console.error('Error adding product:', error);
  }
});


