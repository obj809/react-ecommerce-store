// CardProductCard.jsx

import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './CartProductCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../StarRating/StarRating';
import {
    incrementQuantityInCart, decrementProductQuantity, decrementQuantityInCart,
    incrementProductQuantity, removeAllFromCartAndRestore
} from '../../services/firebase-service';

const CartProductCard = ({ product, onUpdate }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };
    const handleIncrement = async () => {
        try {
            const newTotalQuantity = await decrementProductQuantity(product.id);
            const newCartQuantity = await incrementQuantityInCart(product.id);
            onUpdate(product.id, newCartQuantity, newTotalQuantity);
        } catch (error) {
            alert("Error updating quantities: " + error.message);
        }
    };

    const handleDecrement = async () => {
        try {
            const newTotalQuantity = await incrementProductQuantity(product.id);
            const newCartQuantity = await decrementQuantityInCart(product.id);
            onUpdate(product.id, newCartQuantity, newTotalQuantity);
        } catch (error) {
            alert("Error updating quantities: " + error.message);
        }
    };

    const handleRemoveAll = async () => {
        try {
            const { newProductQuantity, newCartQuantity } = await removeAllFromCartAndRestore(product.id);
            onUpdate(product.id, newCartQuantity, newProductQuantity);
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={product.name} className={styles.image}/>
            </div>
            <div className={styles.info}>
                <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveAll(); }}
                    className={styles.removeButton}
                    aria-label="Remove item"
                    title="Remove item"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <h2 className={styles.productName}>{product.name}</h2>
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
                <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>
                <div className={styles.footerRow}>
                    <div className={styles.quantityContainer} onClick={(e) => e.stopPropagation()}>
                        <label className={styles.quantityLabel} htmlFor={`qty-${product.id}`}>Quantity</label>
                        <select id={`qty-${product.id}`} className={styles.quantitySelect} value={product.quantityInCart} onChange={(e) => onUpdate(product.id, e.target.value)}>
                            {[...Array(10).keys()].map(i => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <p className={styles.subtotal}>Subtotal: ${(product.price * product.quantityInCart).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default CartProductCard;
