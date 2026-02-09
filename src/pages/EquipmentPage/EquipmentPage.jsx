// EquipmentPage.jsx

import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/firebase-service';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './EquipmentPage.module.scss';

const EquipmentPage = () => {
  const [equipmentProducts, setEquipmentProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const filteredProducts = allProducts.filter((product) => product.category === 'Equipment');
        setEquipmentProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Equipment</h1>
      <div className={styles.productsGrid}>
        {equipmentProducts.length > 0 ? (
          equipmentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No equipment found.</p>
        )}
      </div>
    </div>
  );
};

export default EquipmentPage;
