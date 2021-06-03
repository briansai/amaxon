import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { useStateValue } from '../context/StateProvider';
import './Product.css';

function Product({ id, title, image, price, rating }) {
  const [, dispatch] = useStateValue();
  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          <ReactStars count={rating} size={24} color="rgb(238, 186, 55)" />
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
