// FeaturedProductsCarousel.jsx

import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/firebase-service';
import styles from './FeaturedProductsCarousel.module.scss';

const FeaturedProductsCarousel = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const featured = allProducts.filter(product => product.featured);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredProducts.map((product, index) => (
          <div className={styles.carouselItem} key={index}>
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
            <div className={styles.info}>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductsCarousel;
