// FavoritedCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImageWithFavorite from '../ProductImageWithFavorite/ProductImageWithFavorite';
import StarRating from '../StarRating/StarRating';
import styles from './FavoritedCard.module.scss';

const FavoritedCard = ({ product, onFavoriteToggle }) => {
  const navigate = useNavigate();

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageWrapper}>
        <ProductImageWithFavorite product={product} onFavoriteToggle={onFavoriteToggle} />
      </div>
      <div className={styles.info}>
        <h4 className={styles.productName}>{product.name}</h4>
        {(product.category || product.size) && (
          <div className={styles.productDetails}>
            {product.category && <span>{product.category}</span>}
            {product.size && <span>Size: {product.size}</span>}
          </div>
        )}
        <StarRating rating={product.rating} />
        <p className={product.quantity > 0 ? styles.availability : styles.outOfStock}>
          {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
        <div className={styles.priceSection}>
          {product.discountedPrice ? (
            <>
              <p className={styles.discountedPrice}>${Number(product.discountedPrice).toFixed(2)}</p>
              <p className={styles.originalPrice}>${Number(product.originalPrice).toFixed(2)}</p>
            </>
          ) : (
            <p className={styles.price}>${Number(product.price).toFixed(2)}</p>
          )}
        </div>
        {product.offer && (
          <p className={styles.offer}>Limited Time Offer Until {product.offerEndDate}</p>
        )}
      </div>
    </div>
  );
};

export default FavoritedCard;
