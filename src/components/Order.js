import React from 'react';
import OrderHeader from './OrderHeader';
import OrderItems from './OrderItems';
import './Order.css';

function Order({ order }) {
  const { id, data } = order;
  const { cart, ...rest } = data;

  return (
    <div className="order">
      <OrderHeader id={id} data={rest} />
      <OrderItems cart={cart} />
    </div>
  );
}

export default Order;
