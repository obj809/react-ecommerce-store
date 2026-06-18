// ProductCard.jsx

import React from 'react';
import styles from './ProductCard.module.scss';
import { Link } from "react-router-dom";
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import StarRating from '../StarRating/StarRating';

const ProductCard = ({ product, onFavoriteToggle }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/products/${product.id}`}>
          <div className={styles.imageStyle}>
            <img src={product.imageUrl} alt={product.name} />
          </div>
        </Link>
      </div>
      <div className={styles.header}></div>
      <div className={styles.info}>
        <div className={styles.labels}>
          <p className={styles.unisexLabel}>UNISEX</p>
        </div>
        <h4 className={styles.productName}>{product.name}</h4>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.rating}>
          <StarRating rating={product.rating} productId={product.id} editable />
          <FavoriteButton product={product} onFavoriteToggle={onFavoriteToggle} className={styles.favoriteButton} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
