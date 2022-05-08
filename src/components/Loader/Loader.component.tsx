import React from 'react';
import LoaderStyle from './Loader.module.scss';

const Loader = () => {
  return (
    <>
      <div className={LoaderStyle.loader}>
        <div className={LoaderStyle.spinner}></div>
      </div>
    </>
  );
};

export default Loader;
