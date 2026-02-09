// JacketsAndVests.jsx

import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/firebase-service';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './JacketsAndVests.module.scss';

const JacketsAndVests = () => {
  const [jacketsAndVestsProducts, setJacketsAndVestsProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const filteredProducts = allProducts.filter((product) => product.category === 'Jackets & Vests');
        setJacketsAndVestsProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Jackets & Vests</h1>
      <div className={styles.productsGrid}>
        {jacketsAndVestsProducts.length > 0 ? (
          jacketsAndVestsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No Jackets & Vests products found.</p>
        )}
      </div>
    </div>
  );
};

export default JacketsAndVests;
