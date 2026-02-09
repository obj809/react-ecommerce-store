import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { promises as fs } from "fs";


// Your web app's Firebase configuration
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


const data = [
    {
        "name": "Alpine Climbing Jacket",
        "price": 299.99,
        "imageUrl": "https://i.imgur.com/v6Cv0bJ.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 50,
        "rating": 4.8,
        "featured": true
    },
    {
        "name": "Down Insulated Vest",
        "price": 199.99,
        "imageUrl": "https://i.imgur.com/xDrxNDN.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 30,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Softshell Windbreaker",
        "price": 149.99,
        "imageUrl": "https://i.imgur.com/mLYhPpi.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 20,
        "rating": 4.4,
        "featured": false
    },
    {
        "name": "Waterproof Hiking Jacket",
        "price": 250.00,
        "imageUrl": "https://i.imgur.com/SvUgeGk.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 15,
        "rating": 4.9,
        "featured": true
    },
    {
        "name": "Thermal Fleece Vest",
        "price": 129.99,
        "imageUrl": "https://i.imgur.com/5B0eoFm.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 25,
        "rating": 4.7,
        "featured": false
    },
    {
        "name": "Convertible Hiking Jacket",
        "price": 179.99,
        "imageUrl": "https://i.imgur.com/Wq1TdbZ.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 30,
        "rating": 4.8,
        "featured": false
    },
    {
        "name": "Insulated Ski Jacket",
        "price": 329.99,
        "imageUrl": "https://i.imgur.com/PDybzA8.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 10,
        "rating": 5.0,
        "featured": true
    },
    {
        "name": "Lightweight Running Vest",
        "price": 99.99,
        "imageUrl": "https://i.imgur.com/lAfUBT2.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 50,
        "rating": 4.6,
        "featured": false
    },
    {
        "name": "Heavy Duty Work Jacket",
        "price": 219.99,
        "imageUrl": "https://i.imgur.com/I7yhDoo.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 20,
        "rating": 4.5,
        "featured": false
    },
    {
      "name": "Thermal Insulated Jacket",
      "price": 89.99,
      "imageUrl": "https://i.imgur.com/Alk8qqA.png",
      "category": "Jackets & Vests",
      "colors": ["#FFFFFF", "#000000"],
      "size": "M",
      "quantity": 25,
      "rating": 4.8,
      "featured": true
    },
    {
        "name": "Casual Quilted Jacket",
        "price": 169.99,
        "imageUrl": "https://i.imgur.com/kiJynME.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 35,
        "rating": 4.8,
        "featured": true
    },
    {
        "name": "Reflective Running Vest",
        "price": 79.99,
        "imageUrl": "https://i.imgur.com/9s2gZ2L.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 45,
        "rating": 4.5,
        "featured": false
    },
    {
        "name": "Mountain Hardwear Jacket",
        "price": 259.99,
        "imageUrl": "https://i.imgur.com/dPXGe5b.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 25,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Puffer Vest",
        "price": 139.99,
        "imageUrl": "https://i.imgur.com/60QQNGe.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 15,
        "rating": 4.6,
        "featured": false
    },
    {
        "name": "Hiking Softshell Jacket",
        "price": 189.99,
        "imageUrl": "https://i.imgur.com/rKQQ2nk.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 40,
        "rating": 4.8,
        "featured": false
    },
    {
        "name": "ThermoBall Vest",
        "price": 149.99,
        "imageUrl": "https://i.imgur.com/wZmwYxj.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 35,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Rainproof Trekking Jacket",
        "price": 269.99,
        "imageUrl": "https://i.imgur.com/fut03SU.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 30,
        "rating": 4.9,
        "featured": true
    },
    {
        "name": "Reflective Cycling Vest",
        "price": 89.99,
        "imageUrl": "https://i.imgur.com/07KEIp8.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 50,
        "rating": 4.7,
        "featured": false
    },
    {
        "name": "Winter Padded Jacket",
        "price": 299.99,
        "imageUrl": "https://i.imgur.com/UHeLAUj.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 20,
        "rating": 5.0,
        "featured": true
    },
    {
        "name": "Ultra Lightweight Vest",
        "price": 119.99,
        "imageUrl": "https://i.imgur.com/n2WeMIS.png",
        "category": "Jackets & Vests",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 40,
        "rating": 4.8,
        "featured": false
    },
    {
        "name": "Base Layer Top",
        "price": 49.99,
        "imageUrl": "https://i.imgur.com/ydOtf4V.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 50,
        "rating": 4.7,
        "featured": true
    },
    {
        "name": "Thermal Henley",
        "price": 39.99,
        "imageUrl": "https://i.imgur.com/Ef9bDvb.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 30,
        "rating": 4.6,
        "featured": false
    },
    {
        "name": "Moisture-Wicking Shirt",
        "price": 29.99,
        "imageUrl": "https://i.imgur.com/grr9rSl.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 20,
        "rating": 4.5,
        "featured": false
    },
    {
        "name": "Breathable Running Top",
        "price": 59.99,
        "imageUrl": "https://i.imgur.com/wWetcrU.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 15,
        "rating": 4.9,
        "featured": true
    },
    {
        "name": "Cotton Crewneck",
        "price": 19.99,
        "imageUrl": "https://i.imgur.com/FrFWiFO.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 25,
        "rating": 4.4,
        "featured": false
    },
    {
        "name": "Long-Sleeve Hiking Shirt",
        "price": 69.99,
        "imageUrl": "https://i.imgur.com/a02hdDL.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 30,
        "rating": 4.7,
        "featured": false
    },
    {
        "name": "Performance Polo",
        "price": 49.99,
        "imageUrl": "https://i.imgur.com/Cxe0IxF.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 10,
        "rating": 4.3,
        "featured": false
    },
    {
        "name": "Flannel Shirt",
        "price": 59.99,
        "imageUrl": "https://i.imgur.com/CiDiZ3C.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 50,
        "rating": 4.9,
        "featured": false
    },
    {
      "name": "Casual Short-Sleeve T-Shirt",
      "price": 24.99,
      "imageUrl": "https://i.imgur.com/RNewQf9.png",
      "category": "Tops",
      "colors": ["#FFFFFF", "#000000"],
      "size": "M",
      "quantity": 30,
      "rating": 4.7,
      "featured": true
    },
    {
        "name": "Zip-Up Hoodie",
        "price": 79.99,
        "imageUrl": "https://i.imgur.com/Emlezx5.png",
        "category": "Tops",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 40,
        "rating": 5.0,
        "featured": true
    },
    {
        "name": "Waterproof Hiking Pants",
        "price": 89.99,
        "imageUrl": "https://i.imgur.com/6jwjWxD.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 50,
        "rating": 4.8,
        "featured": true
    },
    {
        "name": "Convertible Cargo Pants",
        "price": 79.99,
        "imageUrl": "https://i.imgur.com/ZmClaGa.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 30,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Running Shorts",
        "price": 49.99,
        "imageUrl": "https://i.imgur.com/B25Adkc.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 20,
        "rating": 4.6,
        "featured": false
    },
    {
        "name": "Insulated Snow Pants",
        "price": 149.99,
        "imageUrl": "https://i.imgur.com/XucV1TV.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 15,
        "rating": 4.9,
        "featured": true
    },
    {
        "name": "Fleece Joggers",
        "price": 59.99,
        "imageUrl": "https://i.imgur.com/SlxlCaQ.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 25,
        "rating": 4.5,
        "featured": false
    },
    {
        "name": "Climbing Pants",
        "price": 109.99,
        "imageUrl": "https://i.imgur.com/CzpBbON.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 30,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Breathable Mesh Shorts",
        "price": 29.99,
        "imageUrl": "https://i.imgur.com/aY0LRQZ.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "S",
        "quantity": 10,
        "rating": 4.3,
        "featured": false
    },
    {
        "name": "Water-Resistant Leggings",
        "price": 79.99,
        "imageUrl": "https://i.imgur.com/MzPhdit.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "XL",
        "quantity": 50,
        "rating": 5.0,
        "featured": true
    },
    {
        "name": "Cargo Shorts",
        "price": 39.99,
        "imageUrl": "https://i.imgur.com/Gd5O8rh.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 20,
        "rating": 4.5,
        "featured": false
    },
    {
        "name": "Convertible Hiking Pants",
        "price": 89.99,
        "imageUrl": "https://i.imgur.com/RqzlWGl.png",
        "category": "Bottoms",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 40,
        "rating": 4.9,
        "featured": true
    },
    {
        "name": "Climbing Helmet",
        "price": 89.99,
        "imageUrl": "https://i.imgur.com/d23gBEA.png",
        "category": "Equipment",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 50,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Climbing Harness",
        "price": 119.99,
        "imageUrl": "https://i.imgur.com/vh6QjbI.png",
        "category": "Equipment",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 30,
        "rating": 4.9,
        "featured": true
    },
    {
        "name": "Climbing Rope",
        "price": 199.99,
        "imageUrl": "https://i.imgur.com/D4Uogte.png",
        "category": "Equipment",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 20,
        "rating": 5.0,
        "featured": false
    },
    {
        "name": "Carabiners",
        "price": 24.99,
        "imageUrl": "https://i.imgur.com/GZyNEGe.png",
        "category": "Equipment",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 100,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Quickdraws",
        "price": 29.99,
        "imageUrl": "https://i.imgur.com/KCsZ0fZ.png",
        "category": "Equipment",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 80,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Belay Device",
        "price": 49.99,
        "imageUrl": "https://i.imgur.com/6ZSqTEq.png",
        "category": "Equipment",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 40,
        "rating": 4.9,
        "featured": true
    },
    {
        "name": "Ice Axe",
        "price": 149.99,
        "imageUrl": "https://i.imgur.com/gvFI1St.png",
        "category": "Equipment",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 30,
        "rating": 5.0,
        "featured": false
    },
    {
      "name": "Lightweight Snowshoes",
      "price": 119.99,
      "imageUrl": "https://i.imgur.com/Hbig9wK.png",
      "category": "Equipment",
      "colors": ["#FFFFFF", "#000000"],
      "size": "One Size",
      "quantity": 40,
      "rating": 4.8,
      "featured": true
    },
    {
        "name": "Mountaineering Boots",
        "price": 249.99,
        "imageUrl": "https://i.imgur.com/dhaQopH.png",
        "category": "Equipment",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 20,
        "rating": 4.9,
        "featured": true
    },
    {
      "name": "All-Terrain Hiking Boots",
      "price": 99.99,
      "imageUrl": "https://i.imgur.com/hLijIL1.png",
      "category": "Equipment",
      "colors": ["#FFFFFF", "#000000"],
      "size": "Multiple Sizes",
      "quantity": 35,
      "rating": 4.9,
      "featured": true
    },
    {
        "name": "Wool Beanie",
        "price": 19.99,
        "imageUrl": "https://i.imgur.com/jbznfS9.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 100,
        "rating": 4.8,
        "featured": false
    },
    {
        "name": "Thermal Gloves",
        "price": 29.99,
        "imageUrl": "https://i.imgur.com/Jow4c0L.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 80,
        "rating": 4.8,
        "featured": false
    },
    {
        "name": "Neck Gaiter",
        "price": 14.99,
        "imageUrl": "https://i.imgur.com/DJZNyrL.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 120,
        "rating": 4.7,
        "featured": false
    },
    {
        "name": "Wool Socks",
        "price": 19.99,
        "imageUrl": "https://i.imgur.com/ExSQVG8.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 150,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Hiking Gaiters",
        "price": 29.99,
        "imageUrl": "https://i.imgur.com/MhW8udv.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 60,
        "rating": 4.8,
        "featured": true
    },
    {
        "name": "Sunglasses",
        "price": 49.99,
        "imageUrl": "https://i.imgur.com/DAguM72.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 70,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Baseball Cap",
        "price": 24.99,
        "imageUrl": "https://i.imgur.com/GwfYTwB.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "M",
        "quantity": 90,
        "rating": 4.7,
        "featured": false
    },
    {
        "name": "Insulated Gloves",
        "price": 39.99,
        "imageUrl": "https://i.imgur.com/6danKYM.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "L",
        "quantity": 50,
        "rating": 4.9,
        "featured": true
    },
    {
        "name": "Hiking Backpack",
        "price": 99.99,
        "imageUrl": "https://i.imgur.com/Nv1xCUn.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 30,
        "rating": 4.9,
        "featured": false
    },
    {
        "name": "Hiking Poles",
        "price": 59.99,
        "imageUrl": "https://i.imgur.com/iH05Upx.png",
        "category": "Accessories",
        "colors": ["#FFFFFF", "#000000"],
        "size": "One Size",
        "quantity": 40,
        "rating": 5.0,
        "featured": false
    }
  ]
  

  const uploadData = async () => {
    try {
      const collectionRef = collection(db, "products");
      const ids = [];
  
      for (const item of data) {
        const docRef = await addDoc(collectionRef, item);
        ids.push({ id: docRef.id, ...item });
      }
  
      // Write the IDs and data to a JSON file
      await fs.writeFile("productIds.json", JSON.stringify(ids, null, 2));
      console.log("Data uploaded and IDs saved successfully!");
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
  };
  
  // Run the upload function
  uploadData();