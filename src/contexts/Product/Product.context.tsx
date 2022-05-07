import React from 'react';

export const ProductContext = React.createContext({
  onSubmit: (values: any) => {},
  setModalVisibility: (values: any) => {},
  setOrderModalVisibility: (values: any) => {},
  setCartItems: (values: any) => {},
  setTotalQuantity: (values: any) => {},
});
