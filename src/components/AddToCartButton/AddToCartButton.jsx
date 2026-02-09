// AddToCartButton.jsx

import React from 'react';
import { decreaseProductQuantity, incrementCartProductQuantity, getProductById } from '../../services/firebase-service';
import styles from './AddToCartButton.module.scss';

const AddToCartButton = ({ productId, onDecreaseQuantity }) => {
    const handleClick = async () => {
        try {
            const product = await getProductById(productId);
            if (product.quantity > 0) {
                await decreaseProductQuantity(productId);
                onDecreaseQuantity();
                await incrementCartProductQuantity(productId);
                console.log('Product added to cart and quantity updated.');
            } else {
                alert("This product is currently out of stock and cannot be added to your cart.");
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            alert("Failed to update cart: " + error.message);
        }
    };

    return (
        <div>
            <button onClick={handleClick} className={`btn btn-warning ${styles.button}`}>
                Add to Cart
            </button>
        </div>
    );
}

export default AddToCartButton;
