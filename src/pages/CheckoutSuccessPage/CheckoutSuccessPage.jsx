// CheckoutSuccessPage.jsx
//
// Cosmetic confirmation shown after Stripe redirects back from hosted checkout.
// Fulfillment (clearing the cart) is handled by the Stripe webhook, not here —
// this page just confirms and links the customer back into the store.

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CheckoutSuccessPage.module.scss';

const CheckoutSuccessPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Thank you for your order!</h1>
                <p className={styles.message}>
                    Your payment was successful and your order is being processed.
                    A confirmation has been sent by Stripe to your email.
                </p>
                <Link to="/products" className={styles.button}>CONTINUE SHOPPING</Link>
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;
