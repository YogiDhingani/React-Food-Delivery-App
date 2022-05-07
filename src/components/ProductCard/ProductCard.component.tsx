import React from 'react';
import { PRODUCT_LIST } from '../../util/MockData';
import { Product } from '../../components';
import ProductCardStyle from './ProductCard.module.scss';

const ProductCard = () => {
  return (
    <>
      <div className={ProductCardStyle.cardContainer}>
        <div className={ProductCardStyle.card}>
          <div>
            {Object.keys(PRODUCT_LIST).map((key) => {
              return <Product key={key} {...PRODUCT_LIST[key]} id={key} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
