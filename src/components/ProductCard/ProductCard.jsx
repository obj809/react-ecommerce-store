// ProductCard.jsx

import React from 'react';
import styles from './ProductCard.module.scss';
import { Link } from "react-router-dom";
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const ProductCard = ({ product, onFavoriteToggle }) => {
  const handleVariantChange = (event) => {
    console.log("Selected Variant:", event.target.value);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const renderStars = (rating) => {
    const totalStars = 5;
    const validRating = Math.min(Math.max(parseFloat(rating), 0), totalStars);
    const filledStars = Math.floor(validRating);
    const halfStar = validRating % 1 !== 0 && filledStars < totalStars;
    const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0);

    const filledArray = Array.from({ length: filledStars }, (_, index) => index);
    const emptyArray = Array.from({ length: emptyStars }, (_, index) => index);

    return (
      <div className={styles.stars}>
        {filledArray.map((_, index) => (
          <span key={index} className={styles.filledStar}>★</span>
        ))}
        {halfStar && <span className={styles.halfStar}>★</span>}
        {emptyArray.map((_, index) => (
          <span key={index} className={styles.emptyStar}>☆</span>
        ))}
      </div>
    );
  };

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
      {product.colors && (
        <div className={styles.productColors}>
          {product.colors.map((color, index) => (
            <div key={index} className={styles.colorSwatch} style={{ backgroundColor: color }}></div>
          ))}
        </div>
      )}
      <div className={styles.info}>
        <div className={styles.labels}>
          <p className={styles.unisexLabel}>UNISEX</p>
        </div>
        <h4 className={styles.productName}>{product.name}</h4>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.rating}>
          {renderStars(product.rating)}
          <FavoriteButton product={product} onFavoriteToggle={onFavoriteToggle} className={styles.favoriteButton} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
