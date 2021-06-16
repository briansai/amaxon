import React, { useState, useEffect } from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { CircularProgress } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useStateValue } from '../context/StateProvider';
import { db } from '../firebase';
import Order from '../components/Order';
import './Orders.css';

function Orders() {
  const [{ user }] = useStateValue();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    setLoading(true);
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
            setLoading(false);
          })
      : setOrders([]);
  }, [user]);

  return (
    <div className="orders">
      <div className="orders__title">Your Orders</div>
      {loading ? (
        <div className="loading">
          <CircularProgress size={80} />
        </div>
      ) : (
        <div className="orders">
          {orders.length ? (
            orders.map((order, index) => (
              <Order order={order} key={`${order.id}-${index}`} />
            ))
          ) : (
            <div className="orders__empty">
              <div className="orders__empty-container">
                <AssignmentIcon
                  className="orders__empty-clipboard"
                  style={{ fontSize: 200 }}
                />
                <CancelOutlinedIcon
                  className="orders__empty-x"
                  style={{ color: red[500], fontSize: 270 }}
                />
                <div className="orders__empty-text">
                  You have not placed any orders yet.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
