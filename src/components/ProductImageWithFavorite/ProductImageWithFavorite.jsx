// ProductImageWithFavorite.jsx

import React from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './ProductImageWithFavorite.module.scss';

const ProductImageWithFavorite = ({ product, onFavoriteToggle }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.imageContainer}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <div className={styles.favoriteButton} onClick={handleFavoriteClick}>
        <FavoriteButton product={product} onFavoriteToggle={onFavoriteToggle} />
      </div>
    </div>
  );
};

export default ProductImageWithFavorite;
