import React from 'react';
import ReactStars from 'react-rating-stars-component';
import './Product.css';

function Product({ title, image, price, rating }) {
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          <ReactStars count={rating} size={24} />
        </div>
      </div>
      <img src={image} alt="" />
      <button>Add to Basket</button>
    </div>
  );
}

export default Product;
