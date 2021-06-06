import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { displayStars } from '../utils/functions';
import { toast, Slide } from 'react-toastify';
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

    toast(`${title} was added to cart`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'product__toast',
      transition: Slide,
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
