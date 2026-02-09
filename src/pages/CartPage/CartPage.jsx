// CartPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import { getCartProducts } from '../../services/firebase-service';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const items = await getCartProducts();
            setCartItems(items.filter(item => item.quantityInCart > 0));
        };

        fetchCartItems();
    }, []);

    const handleQuantityUpdate = (productId, newQuantityInCart, newTotalQuantity) => {
        setCartItems(currentItems => 
            currentItems.map(item => 
                item.id === productId ? {...item, quantityInCart: newQuantityInCart, quantity: newTotalQuantity} : item
            ).filter(item => item.quantityInCart > 0)
        );
    };

    const redirectToProducts = () => {
        navigate('/products');
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantityInCart), 0);
    const itemCount = cartItems.reduce((total, item) => total + item.quantityInCart, 0);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Shopping Cart</h1>
            <div className={styles.container}>
                {cartItems.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <p className={styles.itemCount}>0 Item(s)</p>
                        <h2 className={styles.emptyTitle}>YOUR SHOPPING CART IS EMPTY.</h2>
                        <button className={styles.shopButton} onClick={redirectToProducts}>Shop Now</button>
                    </div>
                ) : (
                    <div className={styles.populatedContainer}>
                        <div className={styles.contents}>
                            {cartItems.map(item => (
                                <CartProductCard key={item.id} product={item} onUpdate={handleQuantityUpdate} />
                            ))}
                        </div>
                        <div className={styles.rightSide}>
                            <OrderSummary subtotal={subtotal} itemCount={itemCount} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
