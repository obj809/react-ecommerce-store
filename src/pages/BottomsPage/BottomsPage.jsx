// BottomsPage.jsx

import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/firebase-service';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './BottomsPage.module.scss';

const BottomsPage = () => {
  const [bottomsProducts, setBottomsProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const filteredProducts = allProducts.filter((product) => product.category === 'Bottoms');
        setBottomsProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Bottoms</h1>
      <div className={styles.productsGrid}>
        {bottomsProducts.length > 0 ? (
          bottomsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No bottoms found.</p>
        )}
      </div>
    </div>
  );
};

export default BottomsPage;
