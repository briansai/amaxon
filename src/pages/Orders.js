import React, { useState, useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { db } from '../firebase';
import Order from '../components/Order';
import './Orders.css';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    user
      ? db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot((snapshot) => {
            setOrders(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          })
      : setOrders([]);
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order, index) => (
          <Order order={order} key={`${order.id}-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
