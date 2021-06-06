import { toast, Slide } from 'react-toastify';

import React from 'react';

function Toast({ title: msg, type }) {
  const types = {
    addToast: msg,
  };
  toast(`${msg} was added to cart`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: 'product__toast',
    transition: Slide,
  });
  return <div></div>;
}

export default Toast;
