// ProductContainer.jsx

import React from 'react';
import styles from './ProductContainer.module.scss';

const ProductContainer = ({ children }) => {
    return (
      <div className={styles.container}>
            {children}
      </div>
    );
};

export default ProductContainer;
