import React from 'react';
import { toast, Slide } from 'react-toastify';
import { useStateValue } from '../context/StateProvider';
import { displayStars } from '../utils/functions';
import { toastType } from '../utils/constants';
import './Product.css';

const Toast = ({ item, type }) => {
  const { icon, text } = toastType[type];

  return (
    <div className="product__toast">
      <div className="product__toast-icon">{icon()}</div>
      <div className="product__toast-item">{`${item} was ${text} from cart.`}</div>
    </div>
  );
};

function Product({ product }) {
  const [, dispatch] = useStateValue();
  const { id, title, image, price, rating } = product;
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
    toast(<Toast item={title} type="addToast" />, {
      position: 'top-right',
      autoClose: 2000,
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
