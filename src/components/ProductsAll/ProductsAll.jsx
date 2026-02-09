// ProductsAll.jsx

import React, { useState, useEffect } from 'react';
import styles from './ProductsAll.module.scss';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { getAllProducts } from '../../services/firebase-service';

const ProductsAll = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
      getAllProducts()
        .then((data) => setProducts(data))
        .catch((e) => console.warn(e.message));
    }, []);

    return (
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
  );
};

export default ProductsAll;
