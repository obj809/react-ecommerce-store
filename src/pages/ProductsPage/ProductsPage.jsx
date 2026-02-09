// ProductsPage.jsx

import React from 'react';
import styles from './ProductsPage.module.scss';
import ProductContainer from '../../containers/ProductContainer/ProductContainer';
import ProductsAll from '../../components/ProductsAll/ProductsAll';
import Carousel from '../../components/Carousel/Carousel';

const imageUrls = [
  'https://i.imgur.com/d5MXDPH.png',
  'https://i.imgur.com/l95XF8m.png',
  'https://i.imgur.com/ErL2p1j.png',
];

const ProductsPage = () => {
  return (
    <>
      <Carousel slides={imageUrls} />
      <ProductContainer>
        <ProductsAll />
      </ProductContainer>
    </>
  );
};

export default ProductsPage;
