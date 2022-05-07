import React, { useContext, useEffect, useState } from 'react';
import { CartProductModel } from '../../util/Models';
import { ProductContext } from '../../contexts/Product';
import CartItemStyle from './CartItem.module.scss';

const CartItem = (props: CartProductModel) => {
  const [cartItem, setCartItem] = useState(props);
  const { onSubmit } = useContext(ProductContext);

  useEffect(() => {
    setCartItem(props);
  }, [props]);

  const onQuantityChange = (operation) => {
    let tempQuantity = cartItem.quantity;
    switch (operation) {
      case '+':
        onSubmit({ ...cartItem, quantity: 1 });
        break;
      case '-':
        if (cartItem.quantity > 0) {
          onSubmit({ ...cartItem, quantity: -1 });
        }
        break;
    }
  };

  return (
    <>
      <div className={CartItemStyle.cartItem}>
        {cartItem && (
          <div>
            <h2>{cartItem.name}</h2>
            <div className={CartItemStyle.cartItemDetails}>
              {cartItem.price && (
                <span className={CartItemStyle.cartItemPrice}>
                  ${cartItem.price}
                </span>
              )}
              {cartItem.quantity && (
                <span className={CartItemStyle.cartItemQuantity}>
                  x {cartItem.quantity}
                </span>
              )}
            </div>
          </div>
        )}

        <div className={CartItemStyle.cartItemAction}>
          <button onClick={() => onQuantityChange('-')}>-</button>
          <button onClick={() => onQuantityChange('+')}>+</button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
