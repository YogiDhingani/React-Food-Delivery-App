import React, { useEffect, useState, useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../util/constants';
import { ProductContext } from '../../contexts/Product';
import HeaderStyle from './Header.module.scss';

const HeaderComponent = ({ quantity }) => {
  const [className, setClassName] = useState('');
  const { setModalVisibility } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (quantity > 0) {
      setClassName(HeaderStyle.bump);
    }

    setTimeout(() => {
      setClassName('');
    }, 200);
  }, [quantity]);

  const onSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        navigate(ROUTES.SIGN_IN);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className={HeaderStyle.header}>
      <h1>React Meal</h1>

      {/* <button onClick={onSignOut}>Sign out</button> */}

      <button className={className} onClick={() => setModalVisibility(true)}>
        <b>Your Cart</b>

        <span>{quantity}</span>
      </button>
    </div>
  );
};

export default HeaderComponent;
