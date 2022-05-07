import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../../contexts/Product';
import { CartItem } from '../../components';
import CartListStyle from './CartList.module.scss';

const CartList = ({ cartItems, totalAmount }) => {
  const [cartList, setCartList] = useState({});
  const { setModalVisibility, setOrderModalVisibility } =
    useContext(ProductContext);

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  return (
    <>
      <div className={CartListStyle.cartList}>
        <div className={CartListStyle.cartListContainer}>
          {cartList &&
            Object.keys(cartList).map((item) => {
              return <CartItem {...cartList[item]} key={cartItems[item].id} />;
            })}
        </div>

        <div className={CartListStyle.cartTotal}>
          <span>Total Amount</span>
          <span>${totalAmount}</span>
        </div>

        <div className={CartListStyle.cartAction}>
          <button
            className={CartListStyle.outline}
            onClick={() => setModalVisibility(false)}
          >
            Close
          </button>
          {totalAmount && totalAmount > 0 ? (
            <button
              className={CartListStyle.fill}
              onClick={() => {
                setOrderModalVisibility(true);
                setModalVisibility(false);
              }}
            >
              Order
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default CartList;
