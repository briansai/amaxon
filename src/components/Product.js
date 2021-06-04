import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { displayStars } from '../utils/functions';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
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
    dispatch({
      type: 'ADD_NOTIFICATION',
      item: {
        id,
        title,
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
        <div className="product__rating">{displayStars(rating)}</div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
