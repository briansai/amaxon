import React from 'react';
import ReactStars from 'react-rating-stars-component';
import './Product.css';

function Product() {
  return (
    <div className="product">
      <div className="product__info">
        <p>The lean startup</p>
        <p className="product__price">
          <small>$</small>
          <strong>19.99</strong>
        </p>
        <div className="product__rating">
          <ReactStars count={5} size={24} />
        </div>
      </div>
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
        alt=""
      />
      <button>Add to Basket</button>
    </div>
  );
}

export default Product;
