import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { useStateValue } from '../context/StateProvider';
import './CheckoutProduct.css';

function CheckoutProduct({ item }) {
  const [, dispatch] = useStateValue();
  const { id, title, price, rating, image } = item;
  const removeItem = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id,
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
        <div className="checkout-product__rating">
          <ReactStars count={rating} size={24} color="orange" />
        </div>
        <button onClick={(e) => removeItem(e)}>Remove from cart</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
