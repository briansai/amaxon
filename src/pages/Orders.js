import React, { useState, useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { db } from '../firebase';
import Order from '../components/Order';
import './Orders.css';

function Orders() {
  const [{ cart, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    user
      ? db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot((snapshot) => {
            const p = snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            console.log(p);
            setOrders(p);
          })
      : setOrders([]);
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
