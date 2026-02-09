// SingleProduct.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SingleProduct.module.scss';
import ProductImageWithFavorite from '../ProductImageWithFavorite/ProductImageWithFavorite';
import AddToCartButton from '../AddToCartButton/AddToCartButton';

const SingleProduct = ({ product, onFavoriteToggle }) => {
    const navigate = useNavigate();

    if (!product) {
        return <div>Loading...</div>;
    }

    const {
        name = 'Product Name',
        price = 0,
        sizes = ['S', 'M', 'L', 'XL'],
        selectedSize = 'S'
    } = product;

    const [quantityState, setQuantityState] = useState(product.quantity);
    const [selectedSizeState, setSelectedSizeState] = useState(selectedSize);

    const handleBackToProducts = () => {
        navigate('/products');
    };

    const handleSizeChange = (event) => {
        setSelectedSizeState(event.target.value);
    };

    const handleDecreaseQuantity = () => {
        setQuantityState(prevQuantity => prevQuantity - 1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.productBox}>
                <div className={styles.imageWrapper}>
                    <ProductImageWithFavorite product={product} onFavoriteToggle={onFavoriteToggle} />
                </div>
                <div className={styles.textCard}>
                    <h2>{name}</h2>
                    <p className={styles.newPrice}>${price.toFixed(2)}</p>
                    <div className={styles.sizeOptions}>
                        <label htmlFor="sizes">Size: </label>
                        <select
                            id="sizes"
                            value={selectedSizeState}
                            onChange={handleSizeChange}
                            className={styles.sizeSelect}
                        >
                            {sizes.map((size, index) => (
                                <option key={index} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.quantity}>
                        <p>Quantity: {quantityState}</p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={handleBackToProducts} className={styles.backButton}>
                            BACK TO PRODUCTS
                        </button>
                        <AddToCartButton productId={product.id} onDecreaseQuantity={handleDecreaseQuantity} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
