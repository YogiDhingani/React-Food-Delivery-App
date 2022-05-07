import React, { useContext } from 'react';
import DialogStyle from './Dialog.module.scss';

const Dialog = ({ children }) => {
  return (
    <>
      <div className={DialogStyle.modalContainer}>
        <div className={DialogStyle.modal}>{children}</div>
      </div>
    </>
  );
};

export default Dialog;
