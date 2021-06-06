import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import './OrderItems.css';

function OrderItems({ cart }) {
  return (
    <div className="order-items">
      {cart?.map((item, index) => (
        <div className="order-items__product" key={`${item.id}-${index}`}>
          <CheckoutProduct item={item} hideButton={true} />
        </div>
      ))}
    </div>
  );
}

export default OrderItems;
