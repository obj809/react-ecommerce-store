// CardProductCard.jsx

import React from 'react';
import styles from './CartProductCard.module.scss';
import { Link } from "react-router-dom";
import {
    incrementQuantityInCart, decrementProductQuantity, decrementQuantityInCart, 
    incrementProductQuantity, removeAllFromCartAndRestore
} from '../../services/firebase-service';

const CartProductCard = ({ product, onUpdate }) => {
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
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={product.name} className={styles.image}/>
            </div>
            <div className={styles.info}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productDetails}>Colour: {product.colour}</p>
                <p className={styles.productDetails}>Size: {product.size}</p>
                <p className={styles.productPrice}>${product.price}</p>
                <div className={styles.quantityContainer}>
                    <p className={styles.quantityLabel}>Quantity:</p>
                    <select className={styles.quantitySelect} value={product.quantityInCart} onChange={(e) => onUpdate(product.id, e.target.value)}>
                        {[...Array(10).keys()].map(i => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <p className={styles.subtotal}>Subtotal: ${product.price * product.quantityInCart}</p>
                <button onClick={handleRemoveAll} className={styles.removeButton}>X</button>
            </div>
        </div>
    );
};

export default CartProductCard;
