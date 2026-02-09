// TopsPage.jsx

import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/firebase-service';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './TopsPage.module.scss';

const TopsPage = () => {
  const [topsProducts, setTopsProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const filteredProducts = allProducts.filter((product) => product.category === 'Tops');
        setTopsProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Tops</h1>
      <div className={styles.productsGrid}>
        {topsProducts.length > 0 ? (
          topsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No tops found.</p>
        )}
      </div>
    </div>
  );
};

export default TopsPage;
