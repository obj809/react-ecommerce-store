// OrderSummary.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderSummary.module.scss';
import { createCheckoutSession } from '../../services/firebase-service';

const OrderSummary = ({ subtotal, itemCount, cartItems = [] }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        if (loading || cartItems.length === 0) return;
        setLoading(true);
        setError(null);
        try {
            const url = await createCheckoutSession(cartItems);
            // Redirect to Stripe's hosted checkout page.
            window.location.href = url;
        } catch (err) {
            console.error(err);
            setError('Could not start checkout. Please try again.');
            setLoading(false);
        }
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
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.actions}>
                    <button
                        className={styles.checkoutButton}
                        onClick={handleCheckout}
                        disabled={loading || cartItems.length === 0}
                    >
                        {loading ? 'REDIRECTING…' : 'CHECKOUT'}
                    </button>
                    <button className={styles.continueButton} onClick={handleContinueShopping}>CONTINUE SHOPPING</button>
                </div>
                <div className={styles.eligibleInfo}>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
