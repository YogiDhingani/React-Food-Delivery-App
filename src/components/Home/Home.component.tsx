import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../util/constants';
import { getUser } from '../../util/helper';
import { ProductContext } from '../../contexts/Product';
import { Header, ProductCard, Dialog, CartList, Order } from '../../components';
import BackgroundImage from '../../../public/assets/images/background.jpg';
import HomeStyle from './Home.module.scss';

const Home = () => {
  const [cartItems, setCartItems] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [orderModalVisibility, setOrderModalVisibility] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const user = getUser();

  if (!user) {
    navigate(ROUTES.SIGN_IN);
  }

  useEffect(() => {
    let tempTotal = 0;
    Object.keys(cartItems).map((key) => {
      tempTotal += cartItems[key].quantity * cartItems[key].price;
    });
    setTotal(Math.round(tempTotal * 100) / 100);
  }, [cartItems]);

  const onSubmit = (values: any) => {
    let quantity: string | number = totalQuantity;
    let tempCartItems = cartItems;
    if (Object.keys(tempCartItems).includes(values.id)) {
      Object.keys(tempCartItems).map((key) => {
        if (tempCartItems[key].id === values.id) {
          tempCartItems[key].quantity =
            parseInt(tempCartItems[key].quantity) + parseInt(values.quantity);
        }
        if (tempCartItems[key].quantity === 0) {
          delete tempCartItems[key];
        }
      });
    } else {
      tempCartItems[values.id] = { ...values };
    }
    quantity = parseInt(quantity.toString()) + parseInt(values.quantity);
    setCartItems({ ...tempCartItems });
    setTotalQuantity(parseInt(quantity.toString()));
  };

  return (
    <ProductContext.Provider
      value={{
        onSubmit,
        setModalVisibility,
        setOrderModalVisibility,
        setCartItems,
        setTotalQuantity,
      }}
    >
      <div className={HomeStyle.homeContainer}>
        <Header quantity={totalQuantity} />
        <div className={HomeStyle.imageContainer}>
          <img src={BackgroundImage} alt='Food Background' />
        </div>

        <div className={HomeStyle.mainContainer}>
          <div className={HomeStyle.foodCaptionDialog}>
            <h2>Delicious Food, Delivered To You</h2>

            <p>
              Choose your favorite meal from our broad selection of available
              meals and enjoy a delicious lunch or dinner at home.
            </p>

            <p>
              All our meals are cooked with high-quality ingredients,
              just-in-time and of course by experienced chefs!
            </p>
          </div>
        </div>

        <ProductCard />
      </div>

      {modalVisibility && (
        <Dialog>
          <CartList cartItems={cartItems} totalAmount={total} />
        </Dialog>
      )}

      {orderModalVisibility && (
        <Dialog>
          <Order cartItems={cartItems} totalAmount={total} />
        </Dialog>
      )}
    </ProductContext.Provider>
  );
};

export default Home;
