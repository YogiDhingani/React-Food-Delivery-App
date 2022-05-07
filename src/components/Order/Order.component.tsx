import React, { useContext, useState, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { ProductContext } from '../../contexts/Product';
import OrderStyle from './Order.module.scss';
import { getDatabase, ref, set } from 'firebase/database';

const Order = ({ cartItems, totalAmount }) => {
  const {
    setOrderModalVisibility,
    setModalVisibility,
    setCartItems,
    setTotalQuantity,
  } = useContext(ProductContext);
  const [status, setStatus] = useState('INIT');

  const onFormSubmit = (formData: any) => {
    setStatus('SENDING');
    formData.products = cartItems;
    formData.totalAmount = totalAmount;
    const db = getDatabase();
    var uniq = new Date().getTime();
    set(ref(db, `/orders/${uniq}`), {
      ...formData,
    }).then(() => {
      setStatus('SUBMITTED');
      setCartItems({});
      setTotalQuantity(0);
    });
  };

  const formValidate = (values: any) => {
    const form = {
      name: values.name,
      street: values.street,
      postalCode: values.postalCode && values.postalCode.length === 6,
      city: values.city,
    };

    const errors: any = {};
    Object.keys(form).forEach((item: any) => {
      if (!form[item]) {
        errors[item] = `Please Enter Valid Input`;
      }
    });
    return errors;
  };

  return (
    <>
      {status && status === 'INIT' && (
        <div className={OrderStyle.orderContainer}>
          <Form
            onSubmit={onFormSubmit}
            validate={formValidate}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field name={`name`}>
                    {({ input, meta }) => (
                      <div>
                        <label
                          className={`${
                            meta.error && meta.touched ? OrderStyle.error : ''
                          }`}
                          htmlFor={`name`}
                        >
                          Your Name
                        </label>
                        <input {...input} id='name' />
                        {meta.error && meta.touched && (
                          <span className='errorText'>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name={`street`}>
                    {({ input, meta }) => (
                      <div>
                        <label
                          className={`${
                            meta.error && meta.touched ? OrderStyle.error : ''
                          }`}
                          htmlFor={`street`}
                        >
                          Street
                        </label>
                        <input {...input} id='street' />
                        {meta.error && meta.touched && (
                          <span className='errorText'>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name={`postalCode`}>
                    {({ input, meta }) => (
                      <div>
                        <label
                          className={`${
                            meta.error && meta.touched ? OrderStyle.error : ''
                          }`}
                          htmlFor={`postalCode`}
                        >
                          Postal Code
                        </label>
                        <input {...input} id='postalCode' />
                        {meta.error && meta.touched && (
                          <span className='errorText'>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name={`city`}>
                    {({ input, meta }) => (
                      <div>
                        <label
                          className={`${
                            meta.error && meta.touched ? OrderStyle.error : ''
                          }`}
                          htmlFor={`city`}
                        >
                          City
                        </label>
                        <input {...input} id='city' />
                        {meta.error && meta.touched && (
                          <span className='errorText'>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <div className={OrderStyle.orderAction}>
                    <button
                      className={OrderStyle.outline}
                      onClick={() => {
                        setOrderModalVisibility(false);
                        setModalVisibility(true);
                      }}
                    >
                      Cancel
                    </button>
                    <button className={OrderStyle.fill} type='submit'>
                      Confirm
                    </button>
                  </div>
                </form>
              );
            }}
          />
        </div>
      )}
      {status && status === 'SENDING' && <p>Sending data to firebase</p>}
      {status && status === 'SUBMITTED' && (
        <div>
          <p>Form Submitted Successfully</p>

          <div className={OrderStyle.orderAction}>
            <button
              className={OrderStyle.outline}
              onClick={() => {
                setOrderModalVisibility(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
