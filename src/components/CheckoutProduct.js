import React from 'react';
import ReactStars from 'react-rating-stars-component';

import './CheckoutProduct.css';

function CheckoutProduct({ item }) {
  const { title, price, rating, image } = item;
  return (
    <div className="checkout-product">
      <img className="checkout-product__image" src={image} alt="" />
      <div className="checkout-product__info">
        <p className="checkout-product__title">{title}</p>
        <p className="checkout-product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkout-product__rating">
          <ReactStars count={rating} size={24} color="orange" />
        </div>
        <button>Remove from cart</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
