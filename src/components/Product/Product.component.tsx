import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import { ProductModel } from '../../util/Models';
import { ProductContext } from '../../contexts/Product';
import ProductStyle from './Product.module.scss';

const Product = ({ ...props }: ProductModel) => {
  const { id, name, description, price } = props;
  const { onSubmit } = useContext(ProductContext);

  const onFormSubmit = (formData) => {
    let tempProduct = {};
    tempProduct = { ...props, ...formData };
    onSubmit(tempProduct);
  };

  return (
    <div className={ProductStyle.product}>
      <div>
        <h3>{name}</h3>
        <i>{description}</i>
        {price && <b>${price}</b>}
      </div>

      <div>
        <Form
          onSubmit={onFormSubmit}
          initialValues={{
            quantity: 1,
          }}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field name={`quantity`}>
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor={`quantity`}>Amount</label>
                      <input
                        {...input}
                        id={`quantity`}
                        type='number'
                        min={1}
                        max={5}
                      />
                    </div>
                  )}
                </Field>

                <button type='submit'>+ Add</button>
              </form>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Product;
