import React from 'react';
import CheckoutProduct from '../components/CheckoutProduct';
import { useStateValue } from '../context/StateProvider';
import Subtotal from '../components/Subtotal';
import './Checkout.css';

function Checkout() {
  const [{ cart }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h2 className="checkout__title">Your Shopping Cart</h2>
          {cart.map((item, index) => (
            <CheckoutProduct
              key={`${item.id}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
