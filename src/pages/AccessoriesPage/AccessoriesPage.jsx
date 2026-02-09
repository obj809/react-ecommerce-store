// AccessoriesPage.jsx

import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/firebase-service';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './AccessoriesPage.module.scss';

const AccessoriesPage = () => {
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const filteredProducts = allProducts.filter((product) => product.category === 'Accessories');
        setAccessoriesProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Accessories</h1>
      <div className={styles.productsGrid}>
        {accessoriesProducts.length > 0 ? (
          accessoriesProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No accessories found.</p>
        )}
      </div>
    </div>
  );
};

export default AccessoriesPage;
