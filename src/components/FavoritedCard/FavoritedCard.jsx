// FavoritedCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImageWithFavorite from '../ProductImageWithFavorite/ProductImageWithFavorite';
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
        <p className={styles.size}>Size: {product.size}</p>
        <p className={styles.availability}>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
        <div className={styles.priceSection}>
          {product.discountedPrice ? (
            <>
              <p className={styles.discountedPrice}>${product.discountedPrice}</p>
              <p className={styles.originalPrice}>${product.originalPrice}</p>
            </>
          ) : (
            <p className={styles.price}>${product.price}</p>
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
