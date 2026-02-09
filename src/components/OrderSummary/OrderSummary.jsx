// OrderSummary.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderSummary.module.scss';

const OrderSummary = ({ subtotal, itemCount }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        alert('Stripe checkout functionality is not yet implemented.');
    };

    const handleContinueShopping = () => {
        navigate('/products');
    };

    return (
        <div className={styles.orderSummary}>
            <div className={styles.summaryHeader}>
                <h2>ORDER SUMMARY</h2>
                <span>{itemCount} ITEM(S)</span>
            </div>
            <div className={styles.summaryDetails}>
                <div className={styles.detailRow}>
                    <span>Item(s) subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.detailRow}>
                    <span>SUBTOTAL</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.detailRow}>
                    <span>ORDER TOTAL</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.deliveryInfo}>
                </div>
                <div className={styles.actions}>
                    <button className={styles.checkoutButton} onClick={handleCheckout}>CHECKOUT</button>
                    <button className={styles.continueButton} onClick={handleContinueShopping}>CONTINUE SHOPPING</button>
                </div>
                <div className={styles.eligibleInfo}>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
