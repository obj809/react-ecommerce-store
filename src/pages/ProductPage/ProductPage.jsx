// ProductPage.jsx

import React from 'react'
import styles from './ProductPage.module.scss'
import SingleProduct from '../../components/SingleProduct/SingleProduct';

const ProductPage = ({ product }) => {
    return (
        <div className={styles.container}>
        <div>
            <SingleProduct key={product.id} product={product} />
        </div>
      </div>



    );
};

export default ProductPage

