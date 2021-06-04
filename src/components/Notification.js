import React from 'react';
import './Notification.css';

function Notification({ notification }) {
  return (
    <div className="notification">{`${notification.title} was added to cart.`}</div>
  );
}

export default Notification;
