import React from 'react';
import { toast, Slide } from 'react-toastify';
import { useStateValue } from '../context/StateProvider';
import { displayStars } from '../utils/functions';
import { toastType } from '../utils/constants';
import './CheckoutProduct.css';

const Toast = ({ item, type }) => {
  const { icon, text } = toastType[type];

  return (
    <div className="checkout-product__toast">
      <div className="checkout-product__toast-icon">{icon()}</div>
      <div className="checkout-product__toast-item">{`${item} was ${text} from cart.`}</div>
    </div>
  );
};

function CheckoutProduct({ item }) {
  const [, dispatch] = useStateValue();
  const { id, title, price, rating, image } = item;

  const removeItem = (e) => {
    e.preventDefault();
    dispatch({
      type: 'REMOVE_FROM_CART',
      id,
    });

    toast(<Toast item={title} type="removeToast" />, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'product__toast',
      transition: Slide,
    });
  };

  return (
    <div className="checkout-product">
      <img
        className="checkout-product__image"
        src={image}
        alt=""
        width="180"
        height="180"
      />
      <div className="checkout-product__info">
        <p className="checkout-product__title">{title}</p>
        <p className="checkout-product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkout-product__rating">{displayStars(rating)}</div>
        <button onClick={(e) => removeItem(e)}>Remove from cart</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
